# Figma Rules For This Project

Use this document when recreating, extending, or aligning this site inside Figma.

## Project Structure

- `index.html` contains the page structure and all on-page copy.
- `styles.css` contains the visual system, layout rules, responsive behavior, and motion.
- `script.js` contains reveal-on-scroll behavior, sticky header state, and the hero tilt interaction.
- `assets/brand-mark.svg` contains the placeholder brand mark used in the header and favicon.

## Core Visual Direction

- Overall mood: cinematic, premium, calm, editorial, and quietly confident.
- Primary impression: the first viewport should feel like a poster, not a template.
- Section philosophy: one dominant idea per section, minimal clutter, no dashboard-card mosaic.
- Motion philosophy: restrained, smooth, and atmospheric rather than decorative.

## Token Definitions

These values are currently defined in the `:root` block of `styles.css` and should be mirrored in Figma variables.

### Color Tokens

- `--bg`: `#071116`
- `--text`: `#f3efe8`
- `--muted`: `rgba(243, 239, 232, 0.72)`
- `--soft`: `rgba(243, 239, 232, 0.45)`
- `--line`: `rgba(243, 239, 232, 0.12)`
- `--accent`: `#f0a36b`
- `--accent-strong`: `#ffbe85`

### Shadow / Depth

- `--shadow`: `0 24px 80px rgba(0, 0, 0, 0.38)`

### Layout Tokens

- `--site-width`: `min(1180px, calc(100vw - 2rem))`
- `--header-height`: `84px`

## Typography

- Primary sans: `Sora`
- Display serif: `Instrument Serif`

### Type Usage

- Hero headline and major section headings use the sans family with tight tracking.
- Accent words inside the hero use `Instrument Serif` in italic for contrast and premium flavor.
- Eyebrows are uppercase, small, high-letter-spacing labels in the accent color.
- Body copy stays restrained and readable with muted contrast.

## Layout Patterns

### Header

- Floating, rounded, translucent shell
- Fixed positioning
- Gains background blur and border only after scroll

### Hero

- Full-bleed section with layered ambient gradients
- Two-column desktop layout, single-column mobile stack
- Left side holds the message and CTA
- Right side holds one large dominant visual plane

### Content Sections

- Avoid cards by default
- Use lines, spacing, and type hierarchy before adding containers
- Process content is split into sticky intro plus scrolling steps
- Results content uses clean metric columns with top borders

## Component Guidance

### Buttons

- Primary button uses warm copper gradient fill with dark text
- Ghost button uses a translucent background and soft border
- Both use fully rounded pill geometry

### Hero Stage

- Rounded large visual container
- Dark layered gradients
- Two glow zones
- Subtle perspective tilt based on pointer movement
- Internal content separated with fine borders, not heavy boxes

### Showcase Panel

- Large single visual block
- Internal detailing comes from bars, labels, spacing, and contrast
- Preserve the feeling of one composed object, not multiple floating cards

## Responsive Rules

- At `980px` and below, switch main section grids to one column.
- At `720px` and below, compress paddings, hide the header CTA, and simplify lower visual notes.
- Keep the hero large and dramatic on mobile without forcing tiny text or crowded overlays.

## Motion Rules

- Reveal animation: upward fade on first view
- Header reacts to scroll with blur and background shell
- Hero stage reacts to pointer movement unless reduced-motion is enabled
- All motion must degrade cleanly when `prefers-reduced-motion` is active

## Asset Rules

- Brand mark lives in `assets/brand-mark.svg`
- Any future imagery should preserve the same midnight, copper, ivory, and soft aqua palette
- Avoid bright neons, purple-heavy accents, and overly busy textures

## Build Notes For Designers

- Keep the first screen brand-forward.
- Preserve a narrow text column in the hero for readability.
- Do not replace the hero with generic SaaS cards or floating analytics panels.
- If adding screenshots or photography later, choose calm, low-clutter imagery with clear tonal space for text.
