"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";

const previewCount = 14;
const step = 360 / previewCount;

export function ProductCarousel() {
  const [position, setPosition] = useState(0);
  const start = useRef<{ x: number; y: number } | null>(null);
  const active = ((position % previewCount) + previewCount) % previewCount;
  function move(direction: number) { setPosition(value => value + direction); }
  return <section className="product-carousel" aria-roledescription="carousel" aria-label="Sanitary product previews">
    <div className="product-carousel-heading"><h3>Product previews</h3><span>Imagery coming soon</span></div>
    <div className="product-carousel-stage" tabIndex={0} aria-label="Product previews. Use left and right arrow keys to browse."
      onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}
      onPointerDown={event => { if (event.button !== 0) return; start.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); }}
      onPointerUp={event => { if (!start.current) return; const dx = event.clientX - start.current.x; const dy = event.clientY - start.current.y; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1); start.current = null; }}
      onPointerCancel={() => { start.current = null; }}>
      <div className="product-carousel-ring" style={{ "--rotation": `${-position * step}deg` } as CSSProperties}>
        {Array.from({ length: previewCount }, (_, index) => <article key={index} className="product-preview" data-active={index === active} aria-hidden={index !== active} style={{ "--card-angle": `${index * step}deg` } as CSSProperties}>
          <div className="product-preview-image"><Image src="/images/sanitary-hero-v2.png" alt="Shared illustrative brass fitting placeholder" fill sizes="(max-width: 760px) 140px, 220px" draggable={false} /></div>
          <div className="product-preview-caption"><span>Preview {index + 1}</span><p>Bath & Sanitary</p></div>
        </article>)}
      </div>
    </div>
    <div className="product-carousel-controls"><button type="button" className="btn btn-ghost" aria-label="Previous product preview" onClick={() => move(-1)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20 12H5m6-6-6 6 6 6" /></svg></button><p role="status" aria-live="polite" aria-atomic="true">Preview {active + 1} of {previewCount}</p><button type="button" className="btn btn-ghost" aria-label="Next product preview" onClick={() => move(1)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></button></div>
    <p className="product-carousel-note">All previews share one illustrative placeholder. Product names and specifications will be added with the confirmed range.</p>
  </section>;
}

