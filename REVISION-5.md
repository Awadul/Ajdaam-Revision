# Interaction polish and photographic depth

## Delivered

Fixed the focus/selection conflict: entering a different domain with the keyboard releases the previous pin and previews the focused domain immediately. Pointer previews cannot override a different domain containing focus. Pending hover dismissal respects focus inside the list. Click/tap pinning, smooth 420ms geometry transitions and Escape remain.

Added small photographic parallax as a progressive CSS enhancement: each photo frame defines a named view timeline; its clipped background layer moves between -12px and +12px. Frames, text, actions and labels remain stationary. Effect requires a fine hover pointer, viewport at least 900px, no reduced-motion preference, and CSS scroll-timeline support. Fallback is the original still image. No scroll interception, continuous JavaScript loop, new dependency or video runtime.

## Verification

Build, TypeScript/static generation and lint pass. Browser verified pinned CNC -> Tab to internal enquiry -> Tab to casting summary: casting selected and CNC released. Escape closed casting. Desktop photo transform changed from approximately +5.4px near the top to +12px after scroll, with named timeline --photo-frame. At 390px the pseudo image layer is absent and document width is 375px, so no horizontal overflow. Screenshot: ajdaam-photographic-polish.png.

Physical hover, touchscreen hardware, reduced-motion emulation, screen-reader behaviour and frame-rate profiling were not independently tested. CSS gates and focus logic are source-verified; no whole-site accessibility/performance certification is claimed. Real catalogue content and enquiry delivery remain pending.

Local preview retained at http://127.0.0.1:3100. Temporary viewport override reset. Project implementation: app/page.tsx and app/globals.css. This is a scoped polish pass, not a new formal critique/detector run.
