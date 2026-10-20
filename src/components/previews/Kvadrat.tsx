export function Kvadrat() {
  const tiles = [
    { c: "#ff6a3d", n: "Vas Båge", p: "490 kr", shape: "arch" },
    { c: "#2b3cff", n: "Ljusstake Ring", p: "320 kr", shape: "ring" },
    { c: "#ffd23f", n: "Fat Sol", p: "410 kr", shape: "sun" },
    { c: "#1f1f1f", n: "Skål Block", p: "380 kr", shape: "block" },
  ];
  return (
    <div className="pv pv-kvadrat">
      <header>
        <b>kvadrat</b>
        <span>Nyheter</span><span>Hem</span><span>Bord</span><span>Present</span>
        <em>Varukorg · 2</em>
      </header>
      <div className="pv-kvadrat-body">
        <div className="pv-kvadrat-copy">
          <h3>Form som får vardagen att kännas.</h3>
          <p>Designade föremål för hem och bord. Fri frakt över 800 kr.</p>
          <span className="pv-kvadrat-btn">Se nyheterna</span>
        </div>
        <ul className="pv-kvadrat-grid">
          {tiles.map((t) => (
            <li key={t.n}>
              <div className="pv-kvadrat-tile" style={{ background: t.c }}>
                <i className={`shape ${t.shape}`} />
              </div>
              <span>{t.n}</span>
              <b>{t.p}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
