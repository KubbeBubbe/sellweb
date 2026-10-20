import { packages } from "@/content/packages";
import { Icon } from "./Icon";
import { SelectLink } from "./SelectLink";

function formatPrice(p: (typeof packages)[number]["price"]) {
  if (p.from == null) return { main: p.placeholder, prefix: "" };
  return { main: `${p.from.toLocaleString("sv-SE")} ${p.unit}`, prefix: "Från " };
}

export function Pricing() {
  return (
    <section className="section pricing" id="priser" aria-labelledby="pricing-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="pricing-title" data-reveal="words">Tre nivåer. En som passar dig.</h2>
          <p data-reveal="up">Alla paket bygger på samma grund: skräddarsydd design, mobilanpassning och en tydlig process. Skillnaden är hur långt vi tar designen och funktionerna.</p>
        </div>

        <div className="plans" data-stagger>
          {packages.map((p) => {
            const price = formatPrice(p.price);
            return (
              <article key={p.id} className="plan" data-reveal="tilt" data-plan={p.id} data-recommended={p.recommended ? "true" : undefined} aria-labelledby={`plan-${p.id}`}>
                {p.recommended && <span className="plan-badge">Rekommenderad</span>}
                <header>
                  <h3 id={`plan-${p.id}`}>{p.name}</h3>
                  <p className="plan-tagline">{p.tagline}</p>
                </header>
                <p className="plan-audience">{p.audience}</p>
                <ul className="plan-for" aria-label={`${p.name} passar`}>
                  {p.audienceList.map((a) => <li key={a}>{a}</li>)}
                </ul>
                <div className="plan-price">
                  {price.prefix && <small>{price.prefix}</small>}
                  <strong>{price.main}</strong>
                </div>
                <p className="plan-lead">{p.includesLead}</p>
                <ul className="plan-features">
                  {p.features.map((f) => (
                    <li key={f}><Icon name="check" />{f}</li>
                  ))}
                </ul>
                <p className="plan-benefit">{p.keyBenefit}</p>
                <SelectLink pkg={p.id} className={`btn btn-block ${p.recommended ? "btn-primary" : "btn-ghost"}`}>
                  {p.cta.label}
                  <Icon name="arrow" />
                </SelectLink>
              </article>
            );
          })}
        </div>
        <p className="pricing-note">Slutpriset bestäms av omfattning och behov och bekräftas i en offert innan något arbete börjar.</p>
      </div>
    </section>
  );
}
