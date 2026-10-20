export function Vektor() {
  return (
    <div className="pv pv-vektor">
      <header>
        <b>vektor<i>/</i></b>
        <span>Produkt</span><span>Dokumentation</span><span>Priser</span>
        <em>Boka demo</em>
      </header>
      <div className="pv-vektor-body">
        <div>
          <p className="pv-vektor-kicker">v2.4 · nu i beta</p>
          <h3>Bygg. Skicka. Sov gott.</h3>
          <p className="pv-vektor-lead">Vektor kör dina tester, rullar ut ändringarna och larmar när något avviker.</p>
          <div className="pv-vektor-actions">
            <span className="pv-vektor-btn">Starta demo</span>
            <span className="pv-vektor-ghost">Läs dokumentationen</span>
          </div>
        </div>
        <div className="pv-vektor-term" aria-hidden="true">
          <div className="bar"><i /><i /><i /><span>deploy.ts</span></div>
          <pre>
            <span className="c">{"// rulla ut med skyddsnät"}</span>{"\n"}
            <span className="k">await</span> vektor.<span className="f">deploy</span>({"{"}{"\n"}
            {"  "}miljo: <span className="s">&quot;produktion&quot;</span>,{"\n"}
            {"  "}tester: <span className="k">true</span>,{"\n"}
            {"  "}rollback: <span className="s">&quot;automatisk&quot;</span>,{"\n"}
            {"}"});{"\n"}
            {"\n"}
            <span className="ok">✓ 128 tester godkända</span>{"\n"}
            <span className="ok">✓ utrullad till produktion</span>
          </pre>
        </div>
      </div>
    </div>
  );
}
