# IRRIT8

A satirical soundboard of the most commonly agreed-upon annoying noises, plus Gen Z / Gen Alpha slang shouted through the browser speech engine.

## Admin version

Owner override lives at `admin.html`. It unlocks every pack in this browser.

- Open [admin.html](admin.html)
- Or add `?admin=1` to any page
- Or tap the logo 7 times
- Turn it off with `?admin=0`

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

Open `index.html` or `admin.html` in a browser.

```bash
python3 -m http.server 8080
```
