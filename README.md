# Saturn Data Systems Redesign

This repo contains a premium single-page redesign for Saturn Data Systems, built around the real brand files in `SATURN-FILES` rather than a placeholder concept.

## Files

- `index.html`: brand-aligned page structure and service copy
- `styles.css`: Saturn visual system, layout, motion, and responsive styling
- `script.js`: reveal animations, sticky header state, and hero tilt interaction
- `assets/saturn-logo.svg`: Saturn master logo imported from the supplied asset pack
- `assets/saturn-favicon.png`: favicon imported from the supplied asset pack
## Quick Preview

From this folder, run a basic static server such as:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Fast Edits

The fastest places to customize are:

1. Update service copy, coverage details, and contact details in `index.html`.
2. Replace placeholder onboarding details such as the WhatsApp number if needed.
3. Adjust colors in the `:root` variables at the top of `styles.css`.
4. Swap or refine the imported Saturn logo files inside `assets/` if you want a different logo variant.

## Design Direction

- Full-bleed hero centered around the real Saturn logo and the "Connecting Liberia" message
- Dark space-inspired palette with magenta brand highlights from the supplied Saturn assets
- Smoother, more premium single-page structure for plans, network explanation, coverage, and contact
- Motion used for atmosphere and hierarchy, not noise
- Lightweight static structure that is easy to push to GitHub and publish
