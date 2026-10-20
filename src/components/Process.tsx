"use client";

import { useEffect, useRef } from "react";
import { steps } from "@/content/process";

export function Process() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = Array.from(listRef.current?.children ?? []) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).dataset.on = "true"; obs.unobserve(e.target); } }),
      { rootMargin: "0px 0px -35% 0px", threshold: 0.2 },
    );
    items.forEach((i) => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section process" id="process" aria-labelledby="process-title">
      <div className="wrap process-layout">
        <div className="process-head">
          <h2 id="process-title">Från första samtalet till lansering.</h2>
          <p>Fyra steg, tydlig kommunikation hela vägen. Du vet alltid var vi är och vad som händer härnäst.</p>
        </div>
        <ol className="timeline" ref={listRef}>
          {steps.map((s) => (
            <li key={s.n} className="step">
              <span className="step-n" aria-hidden="true">{s.n}</span>
              <div>
                <h3><span className="sr-only">Steg {s.n}: </span>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
