"use client";

import { useEffect, useId, useRef, useState } from "react";
import { packageOptions, packages, type PackageId } from "@/content/packages";
import { industryOptions } from "@/content/industries";
import {
  budgetOptions, timelineOptions, validateInquiry, labelFor, limits,
  type InquiryErrors, type InquiryField, type InquiryInput,
} from "@/lib/inquiry";
import { readPreselectFromUrl, usePreselect } from "@/lib/contact-store";
import { Icon } from "./Icon";

type Values = Omit<InquiryInput, "website">;
const empty: Values = { name: "", company: "", email: "", industry: "", package: "", budget: "", message: "", timeline: "" };

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "error"; message: string }
  | { kind: "sent"; delivery?: string; email: string; pkg: string };

const order: InquiryField[] = ["name", "company", "email", "industry", "package", "budget", "message", "timeline"];

export function ContactForm() {
  const uid = useId();
  const preselect = usePreselect();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [seenVersion, setSeenVersion] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  // Förval från paketknappar, branschkort eller URL (?paket=premium&bransch=ehandel)
  if (preselect.version !== seenVersion) {
    setSeenVersion(preselect.version);
    setValues((v) => ({
      ...v,
      package: preselect.package || v.package,
      industry: preselect.industry || v.industry,
    }));
  }
  useEffect(() => { readPreselectFromUrl(window.location.search); }, []);
  useEffect(() => { if (status.kind === "sent") sentRef.current?.focus(); }, [status.kind]);

  const set = (field: InquiryField) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const found = validateInquiry(values);
    setErrors(found);
    const firstBad = order.find((f) => found[f]);
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/forfragan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot.current?.value ?? "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus({ kind: "sent", delivery: data.delivery, email: values.email.trim(), pkg: labelFor(packageOptions, values.package) });
        setValues(empty);
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        const bad = order.find((f) => data.errors[f]);
        if (bad) formRef.current?.querySelector<HTMLElement>(`[name="${bad}"]`)?.focus();
      }
      setStatus({ kind: "error", message: data.message ?? "Något gick fel. Försök igen om en stund." });
    } catch {
      setStatus({ kind: "error", message: "Vi nådde inte servern. Kontrollera din anslutning och försök igen." });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="form-sent" ref={sentRef} tabIndex={-1} role="status">
        <span className="sent-icon"><Icon name="check" /></span>
        <h3>Tack – din förfrågan är mottagen.</h3>
        <p>Vi återkommer till {status.email} för att prata igenom projektet. Du valde: {status.pkg}.</p>
        {status.delivery === "file" && (
          <p className="dev-note">Utvecklingsläge: förfrågan sparades lokalt i <code>.data/forfragningar.jsonl</code>. Inget e-postmeddelande har skickats.</p>
        )}
        <button className="btn btn-ghost" onClick={() => setStatus({ kind: "idle" })}>Skicka en till förfrågan</button>
      </div>
    );
  }

  const sending = status.kind === "sending";
  const errorCount = order.filter((f) => errors[f]).length;
  const f = (name: InquiryField) => ({
    id: `${uid}-${name}`,
    name,
    value: values[name],
    onChange: set(name),
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `${uid}-${name}-err` : undefined,
  });
  const err = (name: InquiryField) =>
    errors[name] ? <p className="field-error" id={`${uid}-${name}-err`}>{errors[name]}</p> : null;

  const chosen = packages.find((p) => p.id === (values.package as PackageId));

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="form" aria-describedby={errorCount ? `${uid}-summary` : undefined}>
      {errorCount > 0 && (
        <p className="form-summary" id={`${uid}-summary`} role="alert">
          {errorCount === 1 ? "Ett fält behöver rättas innan du kan skicka." : `${errorCount} fält behöver rättas innan du kan skicka.`}
        </p>
      )}

      <div className="field-row">
        <div className="field">
          <label htmlFor={`${uid}-name`}>Namn</label>
          <input {...f("name")} type="text" autoComplete="name" required maxLength={limits.name} />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-company`}>Företagsnamn</label>
          <input {...f("company")} type="text" autoComplete="organization" required maxLength={limits.company} />
          {err("company")}
        </div>
      </div>

      <div className="field">
        <label htmlFor={`${uid}-email`}>E-postadress</label>
        <input {...f("email")} type="email" inputMode="email" autoComplete="email" required maxLength={limits.email} />
        {err("email")}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor={`${uid}-industry`}>Typ av verksamhet</label>
          <select {...f("industry")} required>
            <option value="">Välj verksamhet</option>
            {industryOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {err("industry")}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-package`}>Önskat paket</label>
          <select {...f("package")} required>
            <option value="">Välj paket</option>
            {packageOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {err("package")}
        </div>
      </div>
      {chosen && <p className="field-hint pkg-hint">{chosen.name}: {chosen.audience}</p>}

      <div className="field-row">
        <div className="field">
          <label htmlFor={`${uid}-budget`}>Ungefärlig budget <span className="opt">(frivilligt)</span></label>
          <select {...f("budget")}>
            {budgetOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${uid}-timeline`}>Önskad tidsplan <span className="opt">(frivilligt)</span></label>
          <select {...f("timeline")}>
            {timelineOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor={`${uid}-message`}>Beskriv projektet</label>
        <textarea {...f("message")} rows={6} required maxLength={limits.message} />
        <p className="field-hint" id={`${uid}-message-hint`}>Vad gör ditt företag, vem vänder du dig till och vad ska hemsidan uppnå? Länka gärna till din nuvarande sida.</p>
        {err("message")}
      </div>

      {/* Honeypot: dold för människor, lockar botar */}
      <div className="hp" aria-hidden="true">
        <label>Lämna detta fält tomt<input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {status.kind === "error" && <p className="form-error" role="alert">{status.message}</p>}

      <button className="btn btn-primary btn-block" type="submit" disabled={sending} aria-disabled={sending}>
        {sending ? "Skickar…" : "Skicka förfrågan"}
        {!sending && <Icon name="arrow" />}
      </button>
      <p className="form-fine">Fälten utan &quot;frivilligt&quot; krävs. Vi använder dina uppgifter enbart för att svara på förfrågan.</p>
    </form>
  );
}
