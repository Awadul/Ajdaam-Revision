# Engineering smoothing and parallax critique

Two independent assessments reviewed current source. A findings arrived before B was released. Scope: engineering disclosure polish and parallax suitability, not a whole-site redesign or usability score.

## Findings

1. P1: native open-state changes instantly inserted/removed body height; the separate copy entrance did not animate layout. Rows jumped before text settled.
2. P2: immediate hover changes and separate pinned/preview states could open multiple rows and move targets beneath the pointer. There was no parallax implementation; existing reveals were one-time entrances.

## Delivered correction

Measured whole-disclosure height animates in both directions for 420ms with cubic-bezier(.25,.1,.25,1), then returns to automatic layout. Reversals start from current rendered height. Removed copy entrance and summary padding motion. Hover intent waits 120ms before preview and 200ms before dismissing. Explicit selection takes precedence over transient preview, so only one domain is selected. Focus in content preserves access; closing content becomes inert. Escape returns to the summary. Reduced motion settles directly and a preference change cancels running disclosure motion.

## Parallax recommendation

Do not add parallax to the engineering list, text, controls or section boundaries. It cannot solve geometry snapping and adds motion to precision tasks. If explored separately, restrict it to a small scroll-linked displacement inside a clipped photographic frame, keeping copy stationary and disabling spatial movement on touch/reduced-motion preferences. No parallax was added in this pass.

## Verification and limits

Build, TypeScript/static generation and lint pass. Browser observed an intermediate closing height around 169px between the expanded 245px and collapsed 82px states, confirming interpolated geometry rather than an immediate close. Verified Enter reopening, Tab reaching the internal enquiry action, and Escape from that action closing the panel and returning focus without reopening. Desktop screenshot saved as ajdaam-smooth-engineering.png. Physical pointer hover and reduced-motion emulation were not independently exercised; source paths are implemented. No whole-site accessibility or performance certification.

Detector attempted by independent assessment: unavailable because engine 0.1.17 is missing and cache directory cannot be created. Counts unavailable, not zero. Storage/slug/trend use the same unavailable engine, so this standalone report preserves the review. No overlay or detector server; website server restarted and retained for user review. Viewport override reset. No temporary scan files created. No score trend claimed.

Questions skipped: two scoped priority issues, both addressed; parallax remains a recommendation rather than an unsolicited effect.
