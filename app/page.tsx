"use client";

import Image from "next/image";
import { ProductCarousel } from "@/components/ui/product-carousel";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

function Arrow() { return <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>; }
const capabilities = [
  ["Engineering & development", "Turn a requirement into a practical manufacturing discussion. Share your concept, drawing or existing component to outline the engineering and product development work you need."],
  ["CNC machining", "Discuss component geometry, material, quantity and required tolerances. Process suitability and inspection requirements are confirmed against your individual drawing."],
  ["Metal & sand casting", "Explore a casting requirement from shape and material through to subsequent machining. Share the application and quantity so the appropriate process can be discussed."],
];

function SmoothDomain({ title, body, expanded, onPreview, onFocusPreview, onLeave, onPin, onDismiss, onEnquire }: {
  title: string; body: string; expanded: boolean; onPreview: () => void; onFocusPreview: () => void; onLeave: () => void;
  onPin: () => void; onDismiss: () => void; onEnquire: () => void;
}) {
  const root = useRef<HTMLDetailsElement>(null);
  const animation = useRef<Animation | null>(null);
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const start = el.getBoundingClientRect().height;
    animation.current?.cancel();
    if (preference.matches) { el.open = expanded; el.style.height = ""; return; }
    if (!el.open && !expanded) return;
    el.open = true;
    const summary = el.querySelector("summary")!;
    const bodyElement = el.querySelector<HTMLElement>(".detail-body")!;
    const border = parseFloat(getComputedStyle(el).borderBottomWidth) || 0;
    const end = summary.getBoundingClientRect().height + (expanded ? bodyElement.getBoundingClientRect().height : 0) + border;
    el.style.height = `${start}px`;
    const movement = el.animate([{ height: `${start}px` }, { height: `${end}px` }], {
      duration: 420, easing: "cubic-bezier(.25,.1,.25,1)", fill: "forwards"
    });
    animation.current = movement;
    const finish = () => { movement.cancel(); el.open = expanded; el.style.height = ""; animation.current = null; };
    movement.onfinish = finish;
    function reduce() { if (preference.matches) finish(); }
    preference.addEventListener("change", reduce);
    return () => { preference.removeEventListener("change", reduce); movement.onfinish = null; };
  }, [expanded]);
  useEffect(() => () => animation.current?.cancel(), []);
  return <details ref={root} className="domain-preview smooth-domain" data-domain={title} data-expanded={expanded}
    onPointerEnter={event => { if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) onPreview(); }}
    onPointerLeave={event => { if (!event.currentTarget.contains(document.activeElement)) onLeave(); }}
    onFocus={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onFocusPreview(); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onLeave(); }}
    onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); onDismiss(); event.currentTarget.querySelector("summary")?.focus(); } }}>
    <summary onClick={event => { event.preventDefault(); onPin(); }}>{title}<span aria-hidden="true">+</span></summary>
    <div className="detail-body" inert={!expanded}><p>{body}</p><a href="#enquire" onClick={onEnquire} className="text-link">Discuss this requirement<Arrow /></a></div>
  </details>;
}
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const [pinnedDomain, setPinnedDomain] = useState<string | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function clearHover() { if (hoverTimer.current) clearTimeout(hoverTimer.current); }
  function previewDomain(title: string) {
    clearHover();
    const focused = document.activeElement?.closest(".smooth-domain");
    if (focused && focused.getAttribute("data-domain") !== title) return;
    hoverTimer.current = setTimeout(() => setActiveDomain(title), 120);
  }
  function focusDomain(title: string) {
    clearHover();
    setPinnedDomain(current => current === title ? current : null);
    setActiveDomain(title);
  }
  function leaveDomain() { clearHover(); hoverTimer.current = setTimeout(() => { if (!document.activeElement?.closest(".smooth-domain")) setActiveDomain(null); }, 200); }
  function pinDomain(title: string) { clearHover(); setActiveDomain(null); setPinnedDomain(current => current === title ? null : title); }
  function dismissDomain() { clearHover(); setActiveDomain(null); setPinnedDomain(null); }
  useEffect(() => () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); }, []);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        animations.push(entry.target.animate([
          { opacity: 0.82, transform: "translateY(16px)" },
          { opacity: 1, transform: "translateY(0)" }
        ], { duration: 540, easing: "cubic-bezier(.16,1,.3,1)" }));
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.2 });
    document.querySelectorAll(".section-heading, .about > h2, .enquiry-heading > h2").forEach(el => observer.observe(el));
    function reduceMotion() { if (preference.matches) { observer.disconnect(); animations.forEach(a => a.cancel()); } }
    preference.addEventListener("change", reduceMotion);
    return () => { observer.disconnect(); animations.forEach(a => a.cancel()); preference.removeEventListener("change", reduceMotion); };
  }, []);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const frames = [...document.querySelectorAll<HTMLElement>(".division-photo:not(.machinery-video)")];
    const animations: Animation[] = [];
    let disposed = false;
    const observers: IntersectionObserver[] = [];
    function settle() {
      animations.forEach(animation => animation.cancel());
      frames.forEach(frame => { frame.dataset.heroState = "ready"; frame.style.setProperty("--photo-gain", "0"); });
    }
    if (reduced.matches || !("IntersectionObserver" in window)) { settle(); return; }
    const intro = document.querySelector<HTMLElement>(".intro");
    if (intro) animations.push(intro.animate([{ opacity: .25 }, { opacity: 1 }], { duration: 600, easing: "cubic-bezier(.23,1,.32,1)" }));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const frame = entry.target as HTMLElement;
        observer.unobserve(frame);
        const images = [...frame.querySelectorAll("img")];
        Promise.all(images.map(image => image.decode().catch(() => undefined))).then(() => {
          if (disposed || reduced.matches) return;
          const layer = frame.querySelector<HTMLElement>(".photo-entrance");
          if (!layer) return;
          frame.dataset.heroState = "fading";
          const entrance = layer.animate([{ opacity: .15, filter: "blur(3px)" }, { opacity: 1, filter: "blur(0px)" }], { duration: 800, easing: "cubic-bezier(.23,1,.32,1)" });
          animations.push(entrance);
          entrance.onfinish = () => {
            if (disposed || reduced.matches) return;
            frame.dataset.heroState = "ready";
            frame.style.setProperty("--photo-gain", "1");
          };
        });
      });
    }, { threshold: .12 });
    frames.forEach(frame => observer.observe(frame));
    observers.push(observer);
    function preferenceChanged() { if (reduced.matches) { observers.forEach(item => item.disconnect()); settle(); } }
    reduced.addEventListener("change", preferenceChanged);
    return () => { disposed = true; observers.forEach(item => item.disconnect()); animations.forEach(animation => { animation.onfinish = null; animation.cancel(); }); reduced.removeEventListener("change", preferenceChanged); };
  }, []);  const [division, setDivision] = useState("Engineering & Manufacturing");
  const [status, setStatus] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    function escapeMenu(event: KeyboardEvent) { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } }
    document.addEventListener("keydown", escapeMenu);
    return () => document.removeEventListener("keydown", escapeMenu);
  }, [menuOpen]);
  function navigateMobile(id: string) {
    setMenuOpen(false);
    const section = document.getElementById(id);
    section?.focus({ preventScroll: true });
  }
  function choose(value: string) { setDivision(value); setStatus(""); }
  function download(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `AJDAAM — ENQUIRY BRIEF\n\nDivision: ${division}\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nCompany: ${data.get("company") || "Not provided"}\n\nRequirement:\n${data.get("message")}\n\nPrepared locally. This enquiry has not been sent to Ajdaam.`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "ajdaam-enquiry.txt"; link.click();
    URL.revokeObjectURL(url); setStatus("Your brief is ready to download. Nothing has been sent; your details remain in this form.");
  }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a href="#" className="brand" aria-label="Ajdaam home"><Image src="/images/ajdaam-logo.png" alt="Ajdaam" width={82} height={82} priority /><span>AJDAAM<small>MACHINE CRAFT</small></span></a>
      <nav aria-label="Main navigation" className="desktop-nav"><a href="#engineering">Engineering & Manufacturing</a><a href="#sanitary">Bath & Sanitary</a><a href="#about">About</a></nav>
      <div className="header-actions"><a className="btn btn-primary" href="#enquire">Enquire <Arrow /></a><button ref={menuButton} className="btn btn-ghost menu-button" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button></div>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{[["Engineering & Manufacturing", "engineering"], ["Bath & Sanitary", "sanitary"], ["About Ajdaam", "about"]].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => navigateMobile(id)}>{label}<Arrow /></a>)}</nav>}
    </header>
    <main id="main">
      <section className="intro"><h1>Precision in making.<br className="mobile-break" /> Refinement in living.</h1><div className="intro-bottom"><p>Engineering, manufacturing and sanitary products.</p><span>Two divisions. One Ajdaam.</span></div>
        <nav className="mobile-divisions" aria-label="Explore our divisions"><a href="#engineering">Engineering <Arrow /></a><a href="#sanitary">Bath & Sanitary <Arrow /></a></nav>
      </section>
      <section className="division-grid" aria-label="Our divisions">
        {[{title:"Engineering & Manufacturing", sub:"Engineering · CNC machining · Casting", action:"Explore capabilities", id:"engineering", side:"left"}, {title:"Bath & Sanitary", sub:"Manufactured and supplied products", action:"Explore Bath & Sanitary", id:"sanitary", side:"right"}].map(item => <article className="division" key={item.id}>{item.side === "left" ? <div className="division-photo machinery-video"><video autoPlay muted loop playsInline preload="auto" poster="/images/engineering-hero-v2.png" aria-label="Five-axis CNC machining, from cutting to finished part"><source src="/videos/Five-Axis%20CNC%20Machining%20%E2%80%94%20From%20Cutting%20to%20Finished%20Part.mp4" type="video/mp4" />Your browser does not support this video. <a href="/videos/Five-Axis%20CNC%20Machining%20%E2%80%94%20From%20Cutting%20to%20Finished%20Part.mp4">Download the machinery video</a>.</video></div> : <div className="division-photo machinery-video sanitary-video"><video autoPlay muted loop playsInline preload="auto" poster="/images/sanitary-hero-v2.png" aria-label="Sanitary products and bath fittings promotional video"><source src="/videos/Tap%2C%20Sanitaryware%2C%20Bath%20fitting%203D%20promotional%20video%20achieved%20marketing%20goal%209810922496%20OneSetVision.mp4" type="video/mp4" />Your browser does not support this video.</video></div>}<div className="division-caption"><h2>{item.title}</h2><p>{item.sub}</p><a className="btn btn-primary" href={`#${item.id}`}>{item.action}<Arrow /></a></div></article>)}
      </section>
      <section id="engineering" tabIndex={-1} className="engineering section-pad"><div className="section-heading"><h2>Engineering &<br />manufacturing.</h2><p>Engineering and manufacturing begin with the details. Explore the work you need, then bring us your requirements.</p></div><p className="domain-hint">Hover to preview. Select a domain to keep its details open.</p><div className="capability-list">{capabilities.map(([title, body]) => <SmoothDomain key={title} title={title} body={body} expanded={(pinnedDomain ?? activeDomain) === title} onPreview={() => previewDomain(title)} onFocusPreview={() => focusDomain(title)} onLeave={leaveDomain} onPin={() => pinDomain(title)} onDismiss={dismissDomain} onEnquire={() => choose("Engineering & Manufacturing")} />)}</div><p className="fine-print">Materials, tolerances and process suitability are confirmed for each enquiry.</p></section>
      <section id="sanitary" tabIndex={-1} className="sanitary section-pad"><div className="section-heading"><h2>Bath & sanitary<br />products.</h2><p>Bath and sanitary products, manufactured by Ajdaam or sourced from other manufacturers. Find the right starting point for your space.</p></div><div className="sanitary-content"><ProductCarousel /><div className="sanitary-copy"><h3>A place for<br />every detail.</h3><p>Discuss a product, a finish or a project requirement. We’ll help establish the product information you need before you decide.</p><dl><div><dt>Manufactured</dt><dd>Products made by Ajdaam.</dd></div><div><dt>Supplied</dt><dd>Products sourced from other manufacturers.</dd></div></dl><a href="#enquire" onClick={() => choose("Bath & Sanitary")} className="btn btn-primary">Discuss sanitary products<Arrow /></a><p className="fine-print">Ask for the manufacturer, dimensions and available finishes of the specific product.</p></div></div></section>
      <section id="about" tabIndex={-1} className="about section-pad"><h2>The craft connects us.</h2><div><p className="about-lead">The precision behind a component.<br />The finish you experience every day.</p><p>Ajdaam brings engineering and manufacturing together with bath and sanitary products. Two areas of work, with a shared attention to material, purpose and detail.</p><a className="text-link" href="#enquire">Start a conversation<Arrow /></a></div></section>
      <section id="enquire" className="enquiry section-pad"><div className="enquiry-heading"><h2>What are you<br />working on?</h2><p>Start with a few details about your requirement.</p><div className="prototype-note"><strong>First revision preview</strong><p>Prepare and download your enquiry brief. Online delivery will be connected once Ajdaam’s contact details are confirmed. This form does not send your information.</p></div></div><form ref={form} onSubmit={download} className="enquiry-form"><label>Area of interest<select className="select" value={division} onChange={e => choose(e.target.value)}><option>Engineering & Manufacturing</option><option>Bath & Sanitary</option><option>Both divisions</option></select></label><div className="form-pair"><label>Your name<input className="input" name="name" autoComplete="name" required maxLength={120} /></label><label>Email address<input className="input" type="email" name="email" autoComplete="email" required maxLength={254} /></label></div><label>Company <span className="optional">(optional)</span><input className="input" name="company" autoComplete="organization" maxLength={160} /></label><label>Your requirement<textarea className="textarea" name="message" rows={4} required maxLength={5000} placeholder={division === "Bath & Sanitary" ? "Tell us about a product, quantity, finish or project." : "Tell us about your component, material, quantity or project."} /></label><button className="btn btn-primary" type="submit">Download enquiry brief<Arrow /></button><p className="form-status" role="status">{status || "Your information stays in this browser until you download it."}</p></form></section>
    </main>
    <footer><a className="footer-brand" href="#">Ajdaam<span>Machine Craft</span></a><nav aria-label="Footer navigation"><a href="#engineering">Engineering & Manufacturing</a><a href="#sanitary">Bath & Sanitary</a><a href="#enquire">Enquire</a></nav><div className="footer-bottom"><span>© 2026 Ajdaam</span><span>Design preview · Photographs are AI-generated illustrations.</span><a href="#">Back to top</a></div></footer>
  </>;
}













