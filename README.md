# Northline Studio Redesign

This repo contains a premium single-page website concept built to replace a flatter, more generic layout with something cleaner, smoother, and more visually magnetic.

## Files

- `index.html`: page structure and copy
- `styles.css`: visual system, layout, motion, and responsive styling
- `script.js`: reveal animations, sticky header state, and hero tilt interaction
- `assets/brand-mark.svg`: simple brand mark used in the header and favicon

## Quick Preview

From this folder, run a basic static server such as:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Fast Edits

The fastest places to customize are:

1. Update the brand name and copy in `index.html`.
2. Swap the contact email in the final CTA section.
3. Adjust colors in the `:root` variables at the top of `styles.css`.
4. Replace the placeholder brand mark in `assets/brand-mark.svg` if needed.

## Design Direction

- Full-bleed hero with stronger visual gravity
- Cleaner content flow with less clutter
- Premium typography pairing
- Motion used for atmosphere and hierarchy, not noise
- Lightweight static structure that is easy to push to GitHub and publish
