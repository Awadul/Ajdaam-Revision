# Ajdaam hero fixes and Impeccable status

## Confirmed choices

The user chose larger separate matching images, retained scroll-linked parallax and a light image-only blur-to-clear entrance. Both divisions remain equally prominent on a white/neutral interface.

## Delivered

Replaced the stretched diptych backgrounds with independent responsive Next Image elements using object-fit:cover and deliberate object positions. Each image source is 1536 x 1024, versus 887 x 887 per panel previously. Existing sources are retained. Removed old duplicate photographic backgrounds and competing hero clip entrance. One image layer handles bounded ±12px parallax inside a clipped frame; a separate wrapper clears 3px blur over 720ms. Headline and controls are sharp and stationary. Still fallback remains for narrow/coarse-pointer/reduced-motion/unsupported environments.

## Impeccable status

Rechecked after the user update: installed skill/CLI reports 4.7.0 and context loads successfully. hooks status reports enabled configuration, while context reports no active automatic design hook for this session. No hook install/config changes were made. Per context instructions, manual detector ran once on app and returned [] with exit 0. This is a clean mechanical source scan, not proof of accessibility or visual quality.

## Verification

Production build, TypeScript/static generation and lint pass. Initial browser verification exposed a stale generated stylesheet despite an incremental build; only the generated .next cache was cleared and a clean build produced the new stylesheet. Verified object-fit:cover on all three photographs; desktop hero frames remain equally wide. Settled entrance filter:none, heading animation:none. Desktop parallax changed from approximately +5.4px to +12px after scrolling. At 390px viewport, document width 375px, object-fit:cover, parallax:none, settled filter:none. Temporary viewport override reset; local preview retained at http://127.0.0.1:3100. Screenshot: ajdaam-corrected-hero.png.

Reduced-motion handling is implemented and source-inspected but not emulated in the browser. Exact entrance frames, DPR2 quality, broad cross-browser performance and full screen-reader behaviour were not audited. Real product assets and live enquiry delivery remain outstanding. Illustrative labels remain visible.

## Generated assets and final prompts

Built-in Imagegen tool used; no CLI/API fallback. Project-bound assets:

- D:/Ajdaam-Website/ajdaam-website/public/images/engineering-hero-v2.png
- D:/Ajdaam-Website/ajdaam-website/public/images/sanitary-hero-v2.png

Engineering final prompt:

Use case: photorealistic-natural. Single high resolution website engineering hero photograph, landscape 3:2, ideally 2304x1536 or larger. Credible CNC end mill machining a precisely clamped metal workpiece with recessed pockets. Tool cutting contact visible near center, metal chips with crisp edges and realistic stream of coolant, dark warm graphite workshop, restrained natural industrial light, sharp foreground flutes and machined surfaces with subtle background depth of field. Composition keeps machining contact and surrounding workpiece legible in a wide website crop. Match Ajdaam industrial craft aesthetic: real steel, charcoal, very restrained warm reflections. No sparks, no text, logos, watermarks, diagrams or UI. High fidelity geometry, documentary detail, not theatrical. Illustrative concept asset, no claim to depict actual Ajdaam machinery.

Sanitary final prompt:

Use case: product-mockup. Single high resolution website sanitary hero photograph, landscape 3:2, ideally 2304x1536 or larger. A sculptural contemporary brushed brass basin mixer, normal slender proportions, horizontal curved spout extending left, knurled cylindrical control, beside a white porcelain basin against warm pale limestone. Natural architectural daylight, restrained quiet luxury, extremely clear brass brushing, knurling, porcelain edge and soft stone texture. Keep entire tap silhouette near center with generous room above and around it for wide desktop and taller mobile crops. Faucet fits safely inside middle 60 percent of image, basin partially visible left, no plant clutter. Match warm editorial material aesthetic while retaining neutral accurate colours. No text, logos, watermarks, certifications or UI. Illustrative concept product, not actual Ajdaam catalogue.

Actual generated size is 1536 x 1024 for each; the requested larger dimensions in the prompts were not guaranteed by the built-in tool. These are concept images, not actual catalogue evidence.
