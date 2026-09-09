# The Central Bank — Interactive Explainer

A single-page site on a warm beige background that explains the Standard Reserve central bank mechanic through one big toggle: **Expansion** (positive net flow) or **Contraction** (negative net flow). Flipping the switch changes the animation, the colors, and every piece of explanatory text on the page.

## The page, top to bottom

1. **Opening line** — short headline naming the idea: all volume passes through the pool, and net flow decides the epoch state.
2. **The flow map** — a clean diagram, redrawn in the site's own style, showing Entries → Pool → Exits, with trading fees feeding the central bank and net flow deciding the state. Lines are thin, labels small and uppercase, matching the reference sketches.
3. **The toggle + animation (the centerpiece)**
   - A single switch labelled Positive / Negative, sitting right under the animation.
   - Center of the canvas: a simple geometric "bank" building drawn as line art.
   - **Positive:** soft green particles drift inward from the edges and are absorbed into the building; the building glows faintly warm-green, and its reserve level rises.
   - **Negative:** particles turn red, reverse direction, and stream outward from the building; the glow cools to red and the reserve level drops.
   - The color/direction change eases over about a second rather than snapping, so the flip feels physical.
4. **The state panel** — text that swaps with the toggle, one state visible at a time, cross-fading:
   - *Positive → Expansion:* issuance of $STANDARD runs higher to incentivize growth; fees route to the **expansion vault**, buying tokenized gold and deepening protocol-owned liquidity.
   - *Negative → Contraction:* issuance rate drops to prevent dilution; fees route to the **contraction vault**, fully used for buybacks and burns to defend $STANDARD.
   - Under each, the little pill chain from the reference: `fees → expansion vault → gold + liquidity` / `fees → contraction vault → buyback + burn`, with the pills animating in one after another.
5. **Closing** — one-line summary and a link out to the full whitepaper.

## Look and feel

- Beige paper background (#F7F4EE family), near-black ink for type, thin hairline rules and outlined pills — the reference images' restrained editorial style.
- Accent color is state-driven: a muted forest green in expansion, a deep brick red in contraction. Only accents shift; the beige page stays constant.
- Typography: a grotesque with tight uppercase small labels for diagram terms and larger regular-weight body copy.
- Motion is restrained everywhere except the particle canvas — quiet fades and slides, no bouncing.

## Technical notes

- Single route at `/`, built as sections in one page.
- Particle animation: HTML canvas driven by `requestAnimationFrame`, a few hundred lightweight particles with a per-particle target (inward vs outward) and an interpolated color; direction and hue lerp toward the active state rather than switching instantly. Respects reduced-motion by falling back to a static state.
- Design tokens (beige surface, ink, green/red accents) go in `src/styles.css`; components read them semantically, and a single `state` value ("expansion" | "contraction") drives copy, accent, and animation.
- Head metadata for the page: its own title and description about the Standard Reserve central bank mechanic.

## Content source

Copy is written from the two reference diagrams you shared. I will also read the whitepaper page to keep terminology accurate; if anything can't be confirmed from it, I'll stick to exactly what the diagrams state rather than inventing mechanics.
