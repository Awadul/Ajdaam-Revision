# Ajdaam motion and engineering disclosure review

## Independent critique

Two independent source reviews; design review also used the neutral revision screenshot. Findings from evidence review were withheld until design review finished.

Two priority issues: (P2) hero arrival effects were disconnected from subsequent chapter transitions; (P2) engineering domains offered click-only disclosures rather than hover/focus previews. Both were addressed in this pass. The review proposed an additional header dropdown, but the implementation deliberately applies previews to the engineering domain list the user identified, preserving the existing top-level navigation.

The white canvas, equal division hierarchy and honest manufactured/supplied distinction remain strengths. Further decorative loops or an image unrelated to each domain would weaken technical clarity.

Scoped pre-change heuristic review: real-world match 3/4; consistency 3/4; recognition 3/4; aesthetic restraint 3/4; control 3/4. Total 15/20. Status, prevention, efficiency, recovery and help were not reassessed in this narrowly scoped review. This is not a whole-site usability grade.

## Implemented

- Hero title settles over 620ms; paired material reveal runs 900ms and finishes still.
- Chapter heading groups animate once on viewport entry, moving 16px over 540ms. No section is hidden before enhancement; normal scrolling and default visible content remain.
- Hover on fine mouse pointers and entering keyboard focus preview a domain. Click/Enter/tap pins it; another click closes it. Pointer leave does not dismiss a pinned or focused disclosure.
- Escape clears preview/pin and focuses its summary. Native details communicate actual expanded state.
- Reduced-motion preferences suppress CSS motion, skip observer animation setup and cancel running observer animations if the preference changes.
- No video runtime or animation dependency added. Existing enquiry and product-content limits remain.

## Verification

Production build including TypeScript/static generation and lint pass. Browser checked opening CNC, Escape closing, and Enter reopening. Mobile layout at 390px viewport has 375px document width: no horizontal overflow. Hero animation name confirmed in computed style. Screenshot saved as ajdaam-domain-preview.png. Physical hover movement, touchscreen hardware, frame timing, emulated reduced motion and full accessibility/performance review were not independently tested.

## Run notes

Source target: D:/Ajdaam-Website/ajdaam-website/app/page.tsx. Detector attempted and failed: Impeccable engine 0.1.17 missing, cache directory not writable. No automated findings count or clean scan. Slug/storage/trend helpers unavailable through that engine; standalone report retained instead. No ignore list consumed or overlay injected. Website preview restarted for the changed build and retained at http://127.0.0.1:3100. Temporary browser sizing reset. No detector live server or temporary scan files created.

Questions skipped: two scoped priority issues, both addressed within the requested motion/disclosure work.
