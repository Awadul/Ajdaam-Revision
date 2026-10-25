"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const previewCount = 14;
const step = 360 / previewCount;

export function ProductCarousel() {
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const motion = useRef({ current: 0, target: 0, hover: false, focus: false, visible: false, dragging: false, reduced: false, pause: false });
  const start = useRef<{ x: number; y: number; angle: number } | null>(null);
  const active = ((position % previewCount) + previewCount) % previewCount;
  function syncPosition() { setPosition(Math.round(-motion.current.target / step)); }
  function move(direction: number) { motion.current.target = (Math.round(motion.current.target / step) - direction) * step; syncPosition(); }
  useEffect(() => { motion.current.pause = paused; }, [paused]);
  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => { motion.current.reduced = media.matches; };
    preference(); media.addEventListener('change', preference);
    const observer = new IntersectionObserver(([entry]) => { motion.current.visible = entry.isIntersecting; }, { threshold: .15 });
    observer.observe(node);
    const wheel = (event: WheelEvent) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.shiftKey ? event.deltaY : 0;
      if (!delta) return;
      event.preventDefault(); motion.current.target -= Math.max(-100, Math.min(100, delta)) * .15; syncPosition();
    };
    node.addEventListener('wheel', wheel, { passive: false });
    let frame = 0, previous = 0;
    const tick = (time: number) => {
      const dt = Math.min((time - previous) / 1000 || 0, .04); previous = time;
      const m = motion.current;
      if (m.visible && !document.hidden) {
        if (!m.reduced && !m.hover && !m.focus && !m.dragging && !m.pause) m.target -= dt * 3;
        m.current = m.reduced ? m.target : m.current + (m.target - m.current) * (1 - Math.exp(-dt * 12));
        ring.current?.style.setProperty('--rotation', `${m.current}deg`);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); media.removeEventListener('change', preference); node.removeEventListener('wheel', wheel); };
  }, []);
  return <section onFocusCapture={() => { motion.current.focus = true; }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) motion.current.focus = false; }} className="product-carousel" aria-roledescription="carousel" aria-label="Sanitary product previews">
    <div className="product-carousel-heading"><h3>Product previews</h3><span>Imagery coming soon</span></div>
    <div ref={stage} className="product-carousel-stage" tabIndex={0} aria-label="Product previews. Drag, scroll horizontally, or use left and right arrow keys to browse."
      onPointerEnter={() => { motion.current.hover = true; }} onPointerLeave={() => { motion.current.hover = false; }}
      onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}
      onPointerDown={event => { if (event.button !== 0) return; start.current = { x: event.clientX, y: event.clientY, angle: motion.current.target }; motion.current.dragging = true; event.currentTarget.setPointerCapture(event.pointerId); }}
      onPointerMove={event => { if (!start.current) return; const dx = event.clientX - start.current.x; if (Math.abs(dx) > Math.abs(event.clientY - start.current.y)) motion.current.target = start.current.angle + dx * .16; }}
      onPointerUp={() => { start.current = null; motion.current.dragging = false; motion.current.target = Math.round(motion.current.target / step) * step; syncPosition(); }}
      onPointerCancel={() => { start.current = null; motion.current.dragging = false; }}>
      <div ref={ring} className="product-carousel-ring">
        {Array.from({ length: previewCount }, (_, index) => <article key={index} className="product-preview" data-active={index === active} aria-hidden={index !== active} style={{ "--card-angle": `${index * step}deg` } as CSSProperties}>
          <div className="product-preview-image"><Image src="/images/sanitary-hero-v2.png" alt="Shared illustrative brass fitting placeholder" fill sizes="(max-width: 760px) 140px, 220px" draggable={false} /></div>
          <div className="product-preview-caption"><span>Preview {index + 1}</span><p>Bath & Sanitary</p></div>
        </article>)}
      </div>
    </div>
    <div className="product-carousel-controls"><button type="button" className="btn btn-ghost" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "Resume motion" : "Pause motion"}</button><button type="button" className="btn btn-ghost" aria-label="Previous product preview" onClick={() => move(-1)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20 12H5m6-6-6 6 6 6" /></svg></button><p role="status" aria-live="polite" aria-atomic="true">Preview {active + 1} of {previewCount}</p><button type="button" className="btn btn-ghost" aria-label="Next product preview" onClick={() => move(1)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></button></div>
    <p className="product-carousel-note">Drag or scroll horizontally to explore. All previews share one illustrative placeholder. Product names and specifications will be added with the confirmed range.</p>
  </section>;
}

