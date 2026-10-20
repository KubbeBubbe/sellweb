"use client";

import { useState } from "react";
import { projects } from "@/content/projects";
import { BrowserFrame } from "./BrowserFrame";
import { Icon } from "./Icon";

export function Portfolio() {
  const categories = ["Alla", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [filter, setFilter] = useState("Alla");
  const shown = projects.filter((p) => filter === "Alla" || p.category === filter);

  return (
    <section className="section portfolio" id="projekt" aria-labelledby="projects-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="projects-title" data-reveal="words">Två riktningar, två helt olika uttryck.</h2>
          <p data-reveal="up">Det här är konceptprojekt som vi tagit fram för att visa hur olika en hemsida kan se ut beroende på verksamhet. De är inte riktiga kunduppdrag.</p>
        </div>

        <div className="filters" role="group" aria-label="Filtrera projekt efter kategori">
          {categories.map((c) => (
            <button key={c} className="chip" aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>

        <ul className="project-grid" data-stagger data-filter={filter === "Alla" ? "all" : "one"} aria-live="polite">
          {shown.map((p) => (
            <li key={p.slug} className="project" data-reveal="up" style={{ "--tone": p.tone } as React.CSSProperties}>
              <div className="project-visual" data-par>
                <BrowserFrame slug={p.slug} label={`${p.title} · konceptprojekt`} />
              </div>
              <div className="project-meta">
                <div className="project-tags">
                  <span>{p.category}</span>
                  <span className="concept-badge">Konceptprojekt</span>
                </div>
                <h3>
                  <a href={`/projekt/${p.slug}`} className="project-link">{p.title}</a>
                </h3>
                <p>{p.summary}</p>
                <span className="project-more" aria-hidden="true">Läs om konceptet <Icon name="arrow" /></span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
