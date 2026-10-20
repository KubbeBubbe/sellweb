export function Lindgren() {
  const services = [
    ["Löpande bokföring", "Månadsvis, enkelt och i tid."],
    ["Bokslut och deklaration", "Vi tar hand om årets alla delar."],
    ["Lön och personal", "Rätt lön, rätt dag."],
  ];
  return (
    <div className="pv pv-lindgren">
      <header>
        <b><i />Lindgren</b>
        <span>Tjänster</span><span>Om oss</span><span>Priser</span>
        <em>Kontakta oss</em>
      </header>
      <div className="pv-lindgren-body">
        <div>
          <h3>Redovisning du kan lita på.</h3>
          <p>Vi hjälper småföretag att ha ordning på siffrorna, så att du kan lägga tiden på det du är bäst på.</p>
          <div className="pv-lindgren-actions">
            <span className="pv-lindgren-btn">Boka ett samtal</span>
            <span className="pv-lindgren-link">Se våra tjänster</span>
          </div>
        </div>
        <ul>
          {services.map(([t, d]) => (
            <li key={t}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <div><b>{t}</b><span>{d}</span></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
