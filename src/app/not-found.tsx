import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav home={false} />
      <main id="main" className="detail">
        <div className="wrap detail-head" style={{ paddingTop: "calc(var(--nav-h) + var(--s-9))", paddingBottom: "var(--s-9)" }}>
          <h1>Sidan finns inte.</h1>
          <p>Länken kan vara felskriven eller så har sidan flyttats. Gå tillbaka till startsidan och hitta rätt därifrån.</p>
          <Link className="btn btn-primary" href="/" style={{ marginTop: "var(--s-5)" }}>Till startsidan</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
