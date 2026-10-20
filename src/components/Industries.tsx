import { industries } from "@/content/industries";
import { Icon } from "./Icon";
import { SelectLink } from "./SelectLink";

export function Industries() {
  return (
    <section className="section" id="tjanster" aria-labelledby="industries-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="industries-title" data-reveal="words">En hemsida för just din verksamhet.</h2>
          <p data-reveal="up">Varje hemsida utformas efter verksamheten, målgruppen och företagets behov. Välj din bransch för att se ett exempel eller starta ett förslag.</p>
        </div>
        <ul className="industry-list" data-stagger>
          {industries.map((i) => {
            const inner = (
              <>
                <h3>{i.title}</h3>
                <p>{i.text}</p>
                <span className="industry-more">
                  {i.projectSlug ? "Se konceptexempel" : "Starta ett förslag"}
                  <Icon name="arrow" />
                </span>
              </>
            );
            return (
              <li key={i.id} className="industry-row" data-reveal="side">
                {i.projectSlug ? (
                  <a href={`/projekt/${i.projectSlug}`} className="industry-link">{inner}</a>
                ) : (
                  <SelectLink industry={i.id} className="industry-link">{inner}</SelectLink>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
