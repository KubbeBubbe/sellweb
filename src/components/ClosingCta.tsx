import { closing } from "@/content/site";
import { Icon } from "./Icon";

export function ClosingCta() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="closing-bg" aria-hidden="true" data-par><i /><i /><i /></div>
      <div className="wrap closing-inner">
        <h2 id="closing-title" data-reveal="words">{closing.title}</h2>
        <p data-reveal="up">{closing.lead}</p>
        <a className="btn btn-primary" href={closing.cta.href}>
          {closing.cta.label}
          <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
}
