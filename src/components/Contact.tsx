import { contact, site } from "@/content/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section className="section contact" id="kontakt" aria-labelledby="contact-title">
      <div className="wrap contact-layout">
        <div className="contact-intro">
          <h2 id="contact-title" data-reveal="words">Berätta om ditt projekt.</h2>
          <p>Fyll i formuläret så hör vi av oss för att prata igenom vad du behöver och föreslå ett paket. Det är kostnadsfritt att fråga och du förbinder dig inte till något.</p>
          <ul className="contact-points">
            <li>Du får svar från en människa som läst din förfrågan.</li>
            <li>Valt paket följer med – du kan ändra dig när som helst.</li>
            <li>Offert med omfattning och tidsplan innan något arbete börjar.</li>
          </ul>
          {(contact.email || contact.phone) && (
            <p className="contact-direct">
              Föredrar du att skriva direkt?{" "}
              {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
              {contact.email && contact.phone && " eller "}
              {contact.phone && <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>}
            </p>
          )}
          <span className="sr-only">{site.name}</span>
        </div>
        <div className="contact-card" data-reveal="up">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
