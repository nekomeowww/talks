# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow"]
# ///
"""Build the community avatar wall and stats for the talk.

Run from the package root:

    uv run scripts/build-community-wall.py

Needs an authenticated `gh` CLI. Writes:

    public/community/wall.webp       seamless tile (repeats horizontally and vertically)
    public/community/wall.png        same tile, PNG
    public/community/stats.json      counts
    public/community/members.json    logins on the wall (login + avatar_url)

Avatar downloads are cached in $AVATAR_CACHE (default: <tmp>/airi-community-avatars).
"""

from __future__ import annotations

import json
import os
import tempfile
import random
import subprocess
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "community"
CACHE = Path(os.environ.get("AVATAR_CACHE", Path(tempfile.gettempdir()) / "airi-community-avatars"))

ORGS = ["proj-airi", "moeru-ai"]
MAIN_REPO = ("moeru-ai", "airi")
STARGAZER_CAP = 3000

# Tile layout: COLS x ROWS avatars, AVATAR px circles with GAP px between them.
# Width and height are exact multiples of the pitch, so the tile repeats seamlessly.
AVATAR = 40
GAP = 4
COLS = 72
ROWS = 41
SUPERSAMPLE = 2


def gh(*args: str) -> str:
    return subprocess.run(["gh", *args], check=True, capture_output=True, text=True).stdout


def gh_json(*args: str):
    return json.loads(gh(*args))


def gh_paginate(path: str) -> list[dict]:
    # --slurp gives one array of pages.
    pages = gh_json("api", "--paginate", "--slurp", path)
    return [item for page in pages for item in page]


def org_followers(org: str) -> list[dict]:
    try:
        return gh_paginate(f"/users/{org}/followers?per_page=100")
    except subprocess.CalledProcessError as e:
        print(f"warn: followers of {org} failed: {e.stderr}", file=sys.stderr)
        return []


def recent_stargazers(owner: str, name: str, cap: int) -> list[dict]:
    query = """
    query($owner: String!, $name: String!, $cursor: String) {
      repository(owner: $owner, name: $name) {
        stargazers(first: 100, after: $cursor, orderBy: {field: STARRED_AT, direction: DESC}) {
          pageInfo { hasNextPage endCursor }
          nodes { login avatarUrl }
        }
      }
    }"""
    out: list[dict] = []
    cursor = None
    while len(out) < cap:
        args = ["api", "graphql", "-f", f"query={query}", "-F", f"owner={owner}", "-F", f"name={name}"]
        if cursor:
            args += ["-F", f"cursor={cursor}"]
        data = gh_json(*args)["data"]["repository"]["stargazers"]
        out += [{"login": n["login"], "avatar_url": n["avatarUrl"]} for n in data["nodes"]]
        if not data["pageInfo"]["hasNextPage"]:
            break
        cursor = data["pageInfo"]["endCursor"]
    return out[:cap]


def top_repos(org: str, n: int = 10) -> list[dict]:
    repos = gh_paginate(f"/orgs/{org}/repos?per_page=100&type=public")
    repos.sort(key=lambda r: r["stargazers_count"], reverse=True)
    return [
        {"full_name": r["full_name"], "stars": r["stargazers_count"], "description": r.get("description")}
        for r in repos[:n]
    ]


def avatar_src(url: str, size: int) -> str:
    sep = "&" if "?" in url else "?"
    return f"{url}{sep}s={size}"


def fetch_avatar(member: dict, size: int) -> Image.Image | None:
    path = CACHE / f"{member['login'].lower()}-{size}.png"
    if path.exists():
        try:
            return Image.open(path).convert("RGB")
        except Exception:
            path.unlink(missing_ok=True)
    try:
        req = urllib.request.Request(avatar_src(member["avatar_url"], size), headers={"User-Agent": "airi-talk-wall"})
        with urllib.request.urlopen(req, timeout=20) as r:
            img = Image.open(BytesIO(r.read())).convert("RGB").resize((size, size), Image.LANCZOS)
        img.save(path)
        return img
    except Exception as e:
        print(f"warn: avatar {member['login']}: {e}", file=sys.stderr)
        return None


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    CACHE.mkdir(parents=True, exist_ok=True)

    org_info = {org: gh_json("api", f"/users/{org}") for org in ORGS}
    repo = gh_json("api", f"/repos/{MAIN_REPO[0]}/{MAIN_REPO[1]}")

    followers = {org: org_followers(org) for org in ORGS}
    contributors = [c for c in gh_paginate(f"/repos/{MAIN_REPO[0]}/{MAIN_REPO[1]}/contributors?per_page=100")
                    if c.get("type") == "User"]
    stargazers = recent_stargazers(*MAIN_REPO, STARGAZER_CAP)
    print(f"followers: { {k: len(v) for k, v in followers.items()} }, contributors: {len(contributors)}, "
          f"stargazers: {len(stargazers)}")

    # Unique members, priority order: contributors, org followers, recent stargazers.
    members: dict[str, dict] = {}
    for group in [contributors, *followers.values(), stargazers]:
        for m in group:
            key = m["login"].lower()
            if key not in members and not key.endswith("[bot]"):
                members[key] = {"login": m["login"], "avatar_url": m["avatar_url"]}
    member_list = list(members.values())
    print(f"unique members: {len(member_list)}")

    px = AVATAR * SUPERSAMPLE
    with ThreadPoolExecutor(max_workers=24) as pool:
        avatars = list(pool.map(lambda m: (m, fetch_avatar(m, px)), member_list))
    avatars = [(m, img) for m, img in avatars if img is not None]

    # Fill the tile in priority order: contributors, then people with a custom avatar, then people
    # with GitHub's default identicon (a flat two-colour pattern). Shuffle deterministically so
    # contributors are spread over the tile rather than packed in the first rows.
    slots = COLS * ROWS
    rng = random.Random(20261017)
    contributor_keys = {c["login"].lower() for c in contributors}

    def is_identicon(img: Image.Image) -> bool:
        # GitHub identicons draw a pattern on a #F0F0F0 background that covers 30-90% of the image.
        small = img.resize((20, 20), Image.NEAREST)
        px = [small.getpixel((x, y)) for y in range(20) for x in range(20)]
        bg = sum(1 for p in px if all(abs(v - 240) <= 4 for v in p)) / len(px)
        return 0.25 <= bg <= 0.95

    ranked = sorted(
        avatars,
        key=lambda a: 0 if a[0]["login"].lower() in contributor_keys else (2 if is_identicon(a[1]) else 1),
    )
    chosen = ranked[:slots]
    rng.shuffle(chosen)
    # If there are fewer people than slots, repeat to fill the tile.
    fill = list(chosen)
    while len(fill) < slots and chosen:
        extra = list(chosen)
        rng.shuffle(extra)
        fill += extra
    fill = fill[:slots]

    pitch = (AVATAR + GAP) * SUPERSAMPLE
    W, H = COLS * pitch, ROWS * pitch
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    mask = Image.new("L", (px, px), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, px - 1, px - 1), fill=255)
    off = GAP * SUPERSAMPLE // 2
    for i, (_, img) in enumerate(fill):
        x, y = (i % COLS) * pitch + off, (i // COLS) * pitch + off
        canvas.paste(img, (x, y), mask)
    tile = canvas.resize((W // SUPERSAMPLE, H // SUPERSAMPLE), Image.LANCZOS)
    tile.save(OUT / "wall.webp", "WEBP", quality=82, method=6)
    tile.save(OUT / "wall.png", optimize=True)

    (OUT / "members.json").write_text(
        json.dumps([m for m, _ in chosen], ensure_ascii=False, indent=1) + "\n"
    )

    stats = {
        "proj_airi_followers": org_info["proj-airi"]["followers"],
        "moeru_ai_followers": org_info["moeru-ai"]["followers"],
        "airi_stars": repo["stargazers_count"],
        "airi_forks": repo["forks_count"],
        "airi_contributors": len(contributors),
        "top_repos": {org: top_repos(org) for org in ORGS},
        "org_public_stars_total": {org: sum(r["stargazers_count"] for r in
                                            gh_paginate(f"/orgs/{org}/repos?per_page=100&type=public"))
                                   for org in ORGS},
        "fetched_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "wall_avatar_count": len(chosen),
        "unique_people_collected": len(avatars),
        "wall_sources": {
            "contributors": len(contributors),
            **{f"{org}_followers_listed": len(v) for org, v in followers.items()},
            "recent_airi_stargazers": len(stargazers),
        },
        "wall_tile": {"width": W // SUPERSAMPLE, "height": H // SUPERSAMPLE, "cols": COLS, "rows": ROWS,
                      "avatar_px": AVATAR, "gap_px": GAP},
    }
    (OUT / "stats.json").write_text(json.dumps(stats, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({k: v for k, v in stats.items() if k != "top_repos"}, indent=2))


if __name__ == "__main__":
    main()
