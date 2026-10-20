import { why } from "@/content/why";
import { site } from "@/content/site";
import { Icon } from "./Icon";

export function Why() {
  return (
    <section className="section why" id="om-oss" aria-labelledby="why-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="why-title">Därför bygger vi annorlunda.</h2>
          <p>
            {site.name} är en webbstudio där design och utveckling sitter ihop. Det gör att idén du godkänner är den hemsida som lanseras – utan översättningsled.
          </p>
        </div>
        <ul className="why-grid">
          {why.map((w) => (
            <li key={w.title}>
              <Icon name={w.icon} className="why-icon" />
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
