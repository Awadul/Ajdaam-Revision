# Sanitary product preview animation

Implemented a shallow 3D product carousel in the Bath & Sanitary section, preserving the white theme, division copy and hero videos.

All five slides intentionally reuse sanitary-hero-v2.png. They are labelled as illustrative previews, with no invented products or specifications.

## Critique and corrections
- The supplied reference relied on dragging. Added visible previous/next buttons, arrow-key navigation and horizontal swipe handling.
- Reusing an image URL as an animation identity would collide with the requested shared placeholder. Each slide now has a unique index and one rotation state; no image overlay is used.

Motion uses a 650ms eased rotation. Reduced-motion styling replaces rotation with a flat active slide. The gallery does not spin automatically.

## Validation
- Production build and lint passed.
- Impeccable detector returned no findings for app and components.
- Browser verified next, previous, keyboard navigation and wraparound.
- At a 390px viewport, document width was 375px: no horizontal page overflow.
- Swipe is implemented; a touch-device check remains advisable.

Questions skipped: two scoped issues, both addressed.

## Continuation
Replace the shared placeholder and preview labels with confirmed product photography and names. Keep specifications and availability tied to the approved catalogue.
