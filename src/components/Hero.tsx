import { Fragment } from "react";
import { hero } from "@/content/site";
import { BrowserFrame } from "./BrowserFrame";
import { HeroParallax } from "./HeroParallax";
import { Icon } from "./Icon";

/** Rubriken delas upp i ord så att hjälten kan byggas upp i en enda koreograferad rörelse. */
function Words({ text }: { text: string }) {
  return text.split(" ").map((w, i) => (
    <Fragment key={i}>
      <span className="hw" style={{ "--i": i } as React.CSSProperties}>
        <span>{w}</span>
      </span>{" "}
    </Fragment>
  ));
}

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-glow" />
      </div>
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <h1 id="hero-title" aria-label={hero.title}>
            <span aria-hidden="true"><Words text={hero.title} /></span>
          </h1>
          <p className="hero-lead">{hero.lead}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={hero.primary.href}>
              {hero.primary.label}
              <Icon name="arrow" />
            </a>
            <a className="btn btn-ghost" href={hero.secondary.href}>{hero.secondary.label}</a>
          </div>
        </div>

        <HeroParallax className="stage">
          <svg className="orbit" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
            <ellipse cx="300" cy="300" rx="290" ry="118" transform="rotate(-24 300 300)" />
            <ellipse cx="300" cy="300" rx="220" ry="84" transform="rotate(-24 300 300)" className="inner" />
            <ellipse cx="300" cy="300" rx="290" ry="118" transform="rotate(-24 300 300)" className="sat" pathLength="1000" />
          </svg>
          <div className="stage-layer l1" data-depth="1"><BrowserFrame slug="nordhem-residens" label="Nordhem Residens · konceptprojekt" /></div>
          <div className="stage-layer l2" data-depth="2"><BrowserFrame slug="vektor" label="Vektor · konceptprojekt" /></div>
          <div className="stage-layer l3" data-depth="3"><BrowserFrame slug="kvadrat" label="Kvadrat · konceptprojekt" /></div>
          <span className="tick t1" aria-hidden="true">1440 × 900</span>
          <span className="tick t2" aria-hidden="true">390 × 844</span>
        </HeroParallax>
      </div>
    </section>
  );
}
