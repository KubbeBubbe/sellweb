import Link from "next/link";
import { contact, legalLinks, nav, site, socials } from "@/content/site";
import { LogoMark } from "./Icon";

export function Footer() {
  const hasContact = contact.email || contact.phone || contact.location || contact.hours;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <a href="#top" className="logo" aria-label={`${site.name} – till toppen`}><LogoMark />{site.name}</a>
            <p style={{ marginTop: "var(--s-4)", maxWidth: "32ch" }}>{site.shortDescription}</p>
          </div>
          <div>
            <h2>Navigation</h2>
            <ul>
              {nav.map((n) => <li key={n.id}><Link href={`/#${n.id}`}>{n.label}</Link></li>)}
              <li><Link href="/#fragor">Vanliga frågor</Link></li>
            </ul>
          </div>
          <div>
            <h2>Tjänster</h2>
            <ul>
              <li><Link href="/#priser">Regular</Link></li>
              <li><Link href="/#priser">Premium</Link></li>
              <li><Link href="/#priser">Exclusive</Link></li>
            </ul>
          </div>
          <div>
            <h2>Kontakt</h2>
            <address>
              {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
              {contact.phone && <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>}
              {contact.location && <span>{contact.location}</span>}
              {contact.hours && <span>{contact.hours}</span>}
              {!hasContact && <span>Hör av dig via formuläret så svarar vi.</span>}
              <Link href="/#kontakt">Starta ditt projekt</Link>
              {socials.map((s) => <a key={s.href} href={s.href} rel="noopener noreferrer" target="_blank">{s.label}</a>)}
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.name}. Alla rättigheter förbehållna.</span>
          {legalLinks.length > 0 && (
            <span style={{ display: "flex", gap: "var(--s-4)" }}>
              {legalLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
