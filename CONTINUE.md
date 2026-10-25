# Continue Ajdaam

Recorded: 2026-10-25. Project target: D:/Ajdaam-Website/ajdaam-website.

## Read first

1. PRODUCT.md: confirmed business facts and unresolved information.
2. DESIGN.md: agreed visual seed, not extracted implementation tokens.
3. surface-briefs/homepage.md: composition, motion proposals and acceptance criteria.
4. ONBOARDING.md: both visitor journeys and enquiry states.

## Visual references

- references/homepage-concept.png: latest paired homepage composition; illustrative, not a pixel-exact approved implementation contract.
- references/moodboard.png: user-approved aesthetic direction.
- references/logo-reference.png: supplied raster logo; obtain original vector/high-resolution artwork before production.

Keep original logo artwork intact in implementation; generated depictions of it are not the master asset. Concept images were made with the built-in image tool, not product photography.

## Current implementation

Revision 1 now implements a responsive homepage with daisyUI 5, both division sections, engineering disclosures and a local enquiry-brief download. Read REVISION-1.md for verification and limits. Product catalogue and live enquiry delivery are not implemented. Keep generated images labelled as illustrative.

## Start here

1. Confirm actual capabilities (including 'dyi casting'), product categories and item-level manufacturer/supplier records.
2. Obtain real logo, workshop/product photography, specifications and enquiry destination.
3. Build a responsive homepage against the agreed paired direction; preserve equal access on mobile.
4. Implement one capability, one product detail and genuine enquiry handling before expanding.
5. Test accessibility, states, performance and image fallback; then re-run $impeccable document to extract actual tokens and generate its sidecar.

## Tools and workflow

Use Impeccable for contextual design work and verification. daisyUI plus its usage/colour guidance are required by the current environment when writing HTML/JSX. The first-party image tool can make concept imagery; real catalogue and facility evidence must be verified. HyperFrames informed motion guidance; a website build does not require a rendered video.

The user selected image-first builds for future landing pages and showcase surfaces. The authoritative setting is .impeccable/config.json; read buildPath there. App screens and documents remain code-first. The latest homepage concept remains a visual reference; this workflow choice does not separately approve it as a pixel-exact contract.

Impeccable context, detector and storage helpers previously failed because engine 0.1.17 was unavailable and its cache directory could not be created. Direct reading was used. No detector-clean claim, critique storage snapshot or design sidecar exists. Do not silently install tools or repair drift as part of continuation.

## Scope of this handoff

Documentation and asset preservation only. No dependencies, hooks, runtime configuration, analytics or production integration added. The Impeccable design-workflow preference was subsequently saved with user approval. No deployment or publication performed.



Latest refinement: read REVISION-2.md for the independent revision-1 critique and neutral palette/motion changes. Current preview remains http://127.0.0.1:3100.

Latest motion pass: read REVISION-3.md. Hero/chapter motion and engineering hover/focus previews with click/tap pinning are now implemented; preserve reduced-motion and native disclosure semantics.

Latest polish: REVISION-4.md documents smooth measured disclosure height, hover intent and single selected domain. No parallax added; do not confuse viewport entrances with parallax.

Latest polish: REVISION-5.md. Keyboard focus now overrides old pins; hover respects focused domains. Small desktop photographic parallax implemented with named CSS view timelines; stationary fallback on narrow/coarse/reduced-motion/unsupported setups.

Latest: REVISION-6.md supersedes prior engine-unavailable status: Impeccable 4.7.0 context and manual scan now work. Hook configured enabled but not active automatically this session. Hero uses separate 1536x1024 assets with object-fit:cover, image-only 3px/720ms blur settling and ±12px photo parallax. If an incremental build emits stale CSS, clear only generated .next and rebuild.

Hero sequence update: intro fades for 600ms. Each hero photo waits for decode and 12% viewport intersection, then fades/lightly clears blur over 800ms; data-hero-state progresses fading -> ready. Parallax gain stays zero during entrance and blends to one over 360ms afterward. Browser verified fading photo had gain0/zero translation; both settled ready/gain1/opacity1. Build/lint/manual detector pass. Reduced-motion skips entrance and depth. Existing no-JS/default visible content is preserved.
