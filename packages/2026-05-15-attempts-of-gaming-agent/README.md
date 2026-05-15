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
Yeah, so I am here, the AI VTuber, not the digital human.
</AiriSpeak>
```

- `at` is the Slidev click count to wait for. Reading it does not affect `v-click` ordering.
- Slot text is wrapped as a direct speaking request by default, so write only the words AIRI should say. Set `:direct-speak="false"` to send the slot text unchanged.
- `url` defaults to `ws://localhost:6121/ws` or `VITE_AIRI_WS_URL`.
- `token` is required when the AIRI websocket runtime uses `AUTHENTICATION_TOKEN`; set it as a prop or `VITE_AIRI_WS_TOKEN`. For local development, create `.env.local` in this package:

```dotenv
VITE_AIRI_WS_URL=ws://localhost:6121/ws
VITE_AIRI_WS_TOKEN=your-authentication-token
```

Restart the Slidev dev server after changing `.env.local`.
- `destinations` defaults to `['proj-airi:stage-*']` so stage-web and stage-tamagotchi receive the event without broadcasting to every module.
- Speaker cues run in the normal slide window by default and are skipped during print/export. Use `context="presenter"` or `context="both"` only when that is intentional.

Learn more about Slidev on [documentations](https://sli.dev/).
