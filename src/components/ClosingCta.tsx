import { closing } from "@/content/site";
import { Icon } from "./Icon";

export function ClosingCta() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="closing-bg" aria-hidden="true"><i /><i /><i /></div>
      <div className="wrap closing-inner">
        <h2 id="closing-title">{closing.title}</h2>
        <p>{closing.lead}</p>
        <a className="btn btn-primary" href={closing.cta.href}>
          {closing.cta.label}
          <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
}
