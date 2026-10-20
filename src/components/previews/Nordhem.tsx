export function Nordhem() {
  return (
    <div className="pv pv-nordhem">
      <header>
        <b>NORDHEM</b>
        <span>Bostäder</span><span>Läge</span><span>Arkitektur</span><span>Kontakt</span>
      </header>
      <div className="pv-nordhem-body">
        <div>
          <p className="pv-nordhem-kicker">Residens vid vattnet</p>
          <h3>Ett hem med utsikt över det som varar.</h3>
          <p className="pv-nordhem-lead">Fjorton bostäder i natursten och ek, ritade för långsamma morgnar.</p>
          <dl>
            <div><dt>Boarea</dt><dd>212 m²</dd></div>
            <div><dt>Rum</dt><dd>5</dd></div>
            <div><dt>Tomt</dt><dd>Sjönära</dd></div>
          </dl>
          <span className="pv-nordhem-btn">Boka visning</span>
        </div>
        <div className="pv-nordhem-arch" aria-hidden="true">
          <i className="sun" />
          <i className="b1" /><i className="b2" /><i className="b3" />
          <i className="water" />
        </div>
      </div>
    </div>
  );
}
