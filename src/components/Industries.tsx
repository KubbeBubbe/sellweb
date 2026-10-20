import { industries } from "@/content/industries";
import { Icon } from "./Icon";
import { SelectLink } from "./SelectLink";

export function Industries() {
  return (
    <section className="section" id="tjanster" aria-labelledby="industries-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="industries-title">En hemsida för just din verksamhet.</h2>
          <p>Varje hemsida utformas efter verksamheten, målgruppen och företagets behov. Välj din bransch för att se ett exempel eller starta ett förslag.</p>
        </div>
        <ul className="industry-grid">
          {industries.map((i) => (
            <li key={i.id} className="industry">
              {i.projectSlug ? (
                <a href={`/projekt/${i.projectSlug}`} className="industry-link">
                  <Icon name={i.icon} className="industry-icon" />
                  <h3>{i.title}</h3>
                  <p>{i.text}</p>
                  <span className="industry-more">Se konceptexempel <Icon name="arrow" /></span>
                </a>
              ) : (
                <SelectLink industry={i.id} className="industry-link">
                  <Icon name={i.icon} className="industry-icon" />
                  <h3>{i.title}</h3>
                  <p>{i.text}</p>
                  <span className="industry-more">Starta ett förslag <Icon name="arrow" /></span>
                </SelectLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
