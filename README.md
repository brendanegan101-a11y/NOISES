# IRRIT8

A satirical soundboard of the most commonly agreed-upon annoying noises, plus Gen Z / Gen Alpha slang shouted through the browser speech engine.

## Admin version

Owner override lives at [`admin.html`](admin.html). It unlocks every pack in this browser.

- Open [admin.html](admin.html)
- Or add `?admin=1` to any page
- Turn it off with `?admin=0`

The public board stays locked. Admin mode is local to the browser (`localStorage` key `irrit8-admin-v1`).

## Packs (in-app purchases, simulated)

| Pack | Price | Contents |
| --- | --- | --- |
| Starter Chirps | Free | Low-battery chirp, group-chat pile-on, midnight drip, Windows error |
| Classic Torture | $0.99 | Fire alarm T-3, chalkboard, fork-on-glass, dentist drill, rough scream, brakes |
| Brainrot Vocals | $1.99 | SKIBIDI, 6-7, RIZZ, Ohio, sigma, Fanum tax, GYATT, delulu, unc, brainrot dump |
| Domestic Hell | $1.49 | Chewing, snoring, yap, fly, knife on plate, car alarm, speakerphone guy |
| Chaos Pass | $4.99 | Everything, permanently |

Checkout is fake. Purchases persist in `localStorage` under `irrit8-owned-v1`.

## Run it

```bash
python3 -m http.server 8080
```

Then open:

- Public board: `http://localhost:8080/`
- Admin board: `http://localhost:8080/admin.html`

Audio engines require a user gesture. Tap any pad after load. Use **STOP ALL** if loop mode gets away from you.

## Technical notes

- No third-party sound files. Tones, scrapes, and household noises are synthesized with the Web Audio API.
- Slang pads use the Web Speech API (`speechSynthesis`) so the vocal pack works without copyrighted clips.
- `admin-override.js` unlocks every pack when `admin.html` is open or `?admin=1` is set.
- This is a web prototype of a mobile soundboard with IAP packs, not a shipped App Store binary.
