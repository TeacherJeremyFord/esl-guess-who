# ESL Guess Who — Mode 1 vertical slice (IMA-13)

Head to Head only, per spec IMA-12 / design IMA-10. Client-side, no
backend — each browser tab/device is its own independent session.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL in Chrome (Chromebook) or Safari (iPad).
For a two-player round, open the same URL on a second device/tab —
each tap "Start Game" independently and draw their own secret card.

## What's implemented

- One embedded vocab pack: 16 animal words (emoji placeholders, no
  real art pipeline yet — see game-design.md §2 for the real model).
- Mode 1 board: shared 4x4 card grid (PixiJS canvas), own secret card
  in a side panel, three-state tap-to-mark cycle (in play → eliminated
  → maybe → in play), touch and mouse both supported.
- Guess flow: pick a card, self-reported correct/incorrect (honor
  system per design v4 §6, no cross-device verification in v1), win/lose
  result screen, play again / main menu.

## What's deliberately not here (per IMA-13 scope)

Mode 2 / Team Relay, stats capture, real content/manifest pipeline,
TTS audio, teacher console, auth.
