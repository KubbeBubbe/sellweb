import { industries } from "@/content/industries";

/** Stora textremsor som glider i sidled när du scrollar förbi. Rent dekorativ. */
export function Marquee() {
  const items = [...industries, ...industries];
  const row = (cls: string) => (
    <div className={`marquee-row ${cls}`}>
      <div className="marquee-track">
        {items.map((i, k) => (
          <span key={k}>{i.title}<i /></span>
        ))}
      </div>
    </div>
  );
  return (
    <div className="marquee" aria-hidden="true" data-par>
      {row("fill")}
      {row("line rev")}
    </div>
  );
}
