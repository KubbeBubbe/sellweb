"use client";

import { useId, useState } from "react";
import { faq } from "@/content/faq";
import { Icon } from "./Icon";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <section className="section faq" id="fragor" aria-labelledby="faq-title">
      <div className="wrap faq-layout">
        <div className="faq-head">
          <h2 id="faq-title">Vanliga frågor.</h2>
          <p>Hittar du inte svaret? Berätta om projektet i formuläret längst ned, så svarar vi.</p>
        </div>
        <div className="accordion">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className="acc-item" key={item.q} data-open={isOpen}>
                <h3>
                  <button id={`${uid}-b${i}`} aria-expanded={isOpen} aria-controls={`${uid}-p${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                    <span>{item.q}</span>
                    <Icon name="plus" />
                  </button>
                </h3>
                <div className="acc-panel" id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-b${i}`}>
                  <div>
                    {item.a.map((para, k) => <p key={k}>{para}</p>)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
