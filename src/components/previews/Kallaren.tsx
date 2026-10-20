export function Kallaren() {
  const menu = [
    ["Rimmad lax, pepparrot, dillolja", "165"],
    ["Oxfilé, rödvinssky, rotselleri", "345"],
    ["Svamprisotto, brynt smör", "225"],
    ["Brända mandlar, vit choklad", "135"],
  ];
  return (
    <div className="pv pv-kallaren">
      <header>
        <span>Meny</span><span>Vinkällaren</span>
        <b>Källaren 14</b>
        <span>Hitta hit</span><span>Boka bord</span>
      </header>
      <div className="pv-kallaren-body">
        <i className="plate left" aria-hidden="true" />
        <i className="plate right" aria-hidden="true" />
        <p className="pv-kallaren-kicker">Middag tisdag till lördag</p>
        <h3>Kvällen börjar i källaren.</h3>
        <ul>
          {menu.map(([d, p]) => (
            <li key={d}><span>{d}</span><i /><b>{p}</b></li>
          ))}
        </ul>
        <span className="pv-kallaren-btn">Boka bord</span>
      </div>
    </div>
  );
}
