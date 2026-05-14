# Attempts of Gaming Agent, What We Learned 2026

To start the slide show:

- `pnpm install`
- `pnpm -F 2026-05-15-attempts-of-gaming-agent dev`

- visit http://localhost:3030

Edit the [slides.md](./slides.md) to see the changes.

## AIRI speaker cues

Use the renderless `AiriSpeak` component when a slide or click step should ask AIRI to speak. The component text is the line sent to AIRI:

```md
<AiriSpeak :at="2" headline="Minecraft section">
AIRI, introduce why Minecraft is useful for game-agent experiments.
</AiriSpeak>
```

- `at` is the Slidev click count to wait for. Reading it does not affect `v-click` ordering.
- `url` defaults to `ws://localhost:6121/ws` or `VITE_AIRI_WS_URL`.
- `token` is required when the AIRI websocket runtime uses `AUTHENTICATION_TOKEN`; set it as a prop or `VITE_AIRI_WS_TOKEN`.
- `destinations` defaults to `['proj-airi:stage-*']` so stage-web and stage-tamagotchi receive the event without broadcasting to every module.
- Speaker cues run in the normal slide window by default and are skipped during print/export. Use `context="presenter"` or `context="both"` only when that is intentional.

Learn more about Slidev on [documentations](https://sli.dev/).
