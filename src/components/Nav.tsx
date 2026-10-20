"use client";

import { useEffect, useRef, useState } from "react";
import { nav, navCta, site } from "@/content/site";
import { LogoMark } from "./Icon";

function useActiveSection() {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const ids = nav.map((n) => n.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.1, 0.5] },
    );
    els.forEach((el) => obs.observe(el));
    const onScroll = () => { if (window.scrollY < 200) setActive(""); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { obs.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);
  return active;
}

export function Nav({ home = true }: { home?: boolean }) {
  const prefix = home ? "" : "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const linksRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animerat streck under aktiv länk
  useEffect(() => {
    const box = linksRef.current;
    if (!box) return;
    const el = box.querySelector<HTMLElement>(`a[data-id="${active}"]`);
    if (el) {
      box.style.setProperty("--x", `${el.offsetLeft + 14}px`);
      box.style.setProperty("--w", `${el.offsetWidth - 28}px`);
      box.style.setProperty("--o", "1");
    } else {
      box.style.setProperty("--o", "0");
    }
  }, [active]);

  // Mobilmeny: Esc stänger, fokus fångas, bakgrunden låses
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const menu = menuRef.current;
    const focusables = () => Array.from(menu?.querySelectorAll<HTMLElement>("a[href]") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); return; }
      if (e.key !== "Tab") return;
      const items = [btnRef.current!, ...focusables()];
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <header className="nav" data-scrolled={scrolled || open}>
        <div className="wrap nav-inner">
          <a href={`${prefix}#top`} className="logo" aria-label={`${site.name} – till toppen`} onClick={() => setOpen(false)}>
            <LogoMark />
            {site.name}
            <small>{site.descriptor}</small>
          </a>
          <nav aria-label="Huvudmeny">
            <div className="nav-links" ref={linksRef}>
              {nav.map((n) => (
                <a key={n.id} href={`${prefix}#${n.id}`} data-id={n.id} aria-current={active === n.id ? "true" : undefined}>
                  {n.label}
                </a>
              ))}
              <span className="nav-indicator" aria-hidden="true" />
            </div>
          </nav>
          <a href={`${prefix}${navCta.href}`} className="btn btn-primary nav-cta">{navCta.label}</a>
          <button
            ref={btnRef}
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>
      <div id="mobile-menu" ref={menuRef} className="mobile-menu" data-open={open} aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobilmeny">
          {nav.map((n) => (
            <a key={n.id} href={`${prefix}#${n.id}`} aria-current={active === n.id ? "true" : undefined} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href={`${prefix}${navCta.href}`} className="btn btn-primary btn-block" onClick={() => setOpen(false)}>{navCta.label}</a>
      </div>
    </>
  );
}
