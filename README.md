# IRRIT8

A satirical soundboard of the most commonly agreed-upon annoying noises, plus Gen Z / Gen Alpha slang shouted through the browser speech engine.

Live files live at the repo root. Open `index.html` or enable GitHub Pages on `main`.

## Premise

People broadly agree on a short list of acoustic crimes:

- High-frequency smoke / fire alarm beeps (~3100 Hz), including the Temporal-3 fire-alarm pattern
- Acoustically "rough" alarm textures (amplitude fluctuation around 40-80 Hz)
- Knife or fork on glass, nails on chalkboard (roughly 2-5 kHz)
- Chewing, snoring, small-dog yapping, flies, knife-on-plate, 2am car alarms

Then there is the other consensus nuisance: hearing "skibidi," "6-7," "rizz," and "that's so Ohio" at full volume.

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

Open `index.html` in a desktop or mobile browser.

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

Audio engines require a user gesture. Tap any pad after load. Use **STOP ALL** if loop mode gets away from you.

## Technical notes

- No third-party sound files. Tones, scrapes, and household noises are synthesized with the Web Audio API.
- Slang pads use the Web Speech API (`speechSynthesis`) so the vocal pack works without copyrighted clips.
- This is a high-fidelity web prototype of a mobile soundboard with IAP packs, not a shipped App Store binary.
