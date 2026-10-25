# Ajdaam — first website revision

Local preview: http://127.0.0.1:3100

Implemented in D:/Ajdaam-Website/ajdaam-website: responsive paired homepage, original raster logo, custom daisyUI 5 theme, Geist and Cormorant Garamond fonts, engineering disclosures, sanitary information, company section and an enquiry-brief download. Both divisions have matching opening panels and visible mobile shortcuts. This is a design prototype, not a published product catalogue.

## Verification

- Production build passes, including TypeScript and static generation.
- ESLint passes.
- Desktop checked at 1440 x 1000: division widths equal at approximately 712 px each; no horizontal overflow.
- Mobile checked at 390 x 844 and a narrower default browser view: both shortcuts visible before imagery; no horizontal overflow at 390 px.
- Mobile menu opens and closes; CNC disclosure opens; sanitary enquiry action selects the correct division.
- Form tested using non-personal sample values. Download action reaches its acknowledgement and preserves form input. No information is sent to Ajdaam.
- Reduced-motion stylesheet disables animation and smooth scrolling; not independently emulated in the browser.
- No complete screen-reader, cross-browser, contrast or performance audit performed. Impeccable detector remains unavailable due to its missing engine.

## Before publication

Replace generated imagery with actual workshop and product assets; obtain original vector logo; confirm sanitary inventory, product manufacturers and provenance; connect a genuine contact/submission destination and privacy handling; add verified specifications and any actual warranty information. Preview metadata currently requests no indexing. Do not remove that setting until launch readiness is confirmed.

## Image provenance

Generated with the built-in Imagegen tool. Project asset: public/images/divisions.png. Actual logo copied unchanged to public/images/ajdaam-logo.png.

Final prompt: 'Use case: photorealistic-natural. Website editorial image asset, no text, no logo, no UI. A panoramic diptych with exactly equal left and right halves and a straight vertical midpoint. LEFT HALF: close crop of a credible CNC end mill cutting a precisely clamped metal workpiece with machined recesses, visible metal chips and a controlled stream of coolant, no sparks, warm dark graphite workshop, beautiful high detail, actual process physics. RIGHT HALF: sculptural brushed brass modern basin mixer with horizontal spout above a white porcelain basin on pale warm limestone in architectural daylight, product fully within right half. Both halves equally strong and same eye-level quality, warm yet natural colour, quiet luxury editorial photography. This is illustrative imagery for a design prototype, no claims about a real manufacturer's products. Frame each half as independently usable square-ish image, no central objects crossing seam. Avoid gold fantasy ornaments, olive branches, text, watermarks, excessive cinematic glow.'

HyperFrames motion principles were applied as restrained native website motion; no video or HyperFrames runtime was added.

## Next revision

Add actual sanitary categories and a real product detail; add verified engineering evidence and a capability detail; connect enquiry delivery; then perform keyboard, screen-reader, reduced-motion, contrast, network and failure-state checks.
