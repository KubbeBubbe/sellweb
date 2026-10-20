import { isPackageId, packageOptions } from "@/content/packages";
import { industryOptions } from "@/content/industries";

export const budgetOptions = [
  { value: "", label: "Vill inte ange" },
  { value: "under-25k", label: "Under 25 000 kr" },
  { value: "25-60k", label: "25 000 – 60 000 kr" },
  { value: "60-120k", label: "60 000 – 120 000 kr" },
  { value: "over-120k", label: "Över 120 000 kr" },
  { value: "vet-ej", label: "Vet inte ännu" },
] as const;

export const timelineOptions = [
  { value: "", label: "Vill inte ange" },
  { value: "snarast", label: "Så snart som möjligt" },
  { value: "1-2-man", label: "Inom 1–2 månader" },
  { value: "3-6-man", label: "Inom 3–6 månader" },
  { value: "ingen-bradska", label: "Ingen brådska" },
] as const;

export interface InquiryInput {
  name: string;
  company: string;
  email: string;
  industry: string;
  package: string;
  budget: string;
  message: string;
  timeline: string;
  /** Honeypot – ska alltid vara tomt för riktiga besökare. */
  website?: string;
}

export type InquiryField = keyof Omit<InquiryInput, "website">;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const allowed = {
  industry: new Set<string>(industryOptions.map((o) => o.value)),
  package: new Set<string>(packageOptions.map((o) => o.value)),
  budget: new Set<string>(budgetOptions.map((o) => o.value)),
  timeline: new Set<string>(timelineOptions.map((o) => o.value)),
};

export const limits = { name: 100, company: 120, email: 200, message: 4000 } as const;

/** Delad validering – körs både i webbläsaren och på servern. */
export function validateInquiry(input: InquiryInput): InquiryErrors {
  const e: InquiryErrors = {};
  const name = input.name.trim();
  const company = input.company.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name) e.name = "Ange ditt namn.";
  else if (name.length > limits.name) e.name = `Namnet får vara högst ${limits.name} tecken.`;

  if (!company) e.company = "Ange företagets namn.";
  else if (company.length > limits.company) e.company = `Företagsnamnet får vara högst ${limits.company} tecken.`;

  if (!email) e.email = "Ange din e-postadress.";
  else if (!EMAIL.test(email) || email.length > limits.email) e.email = "Ange en giltig e-postadress, till exempel namn@foretag.se.";

  if (!input.industry) e.industry = "Välj vilken typ av verksamhet du driver.";
  else if (!allowed.industry.has(input.industry)) e.industry = "Välj ett av alternativen i listan.";

  if (!input.package) e.package = "Välj det paket som verkar passa bäst – du kan ändra dig senare.";
  else if (!allowed.package.has(input.package)) e.package = "Välj ett av alternativen i listan.";

  if (input.budget && !allowed.budget.has(input.budget)) e.budget = "Välj ett av alternativen i listan.";
  if (input.timeline && !allowed.timeline.has(input.timeline)) e.timeline = "Välj ett av alternativen i listan.";

  if (!message) e.message = "Beskriv kort vad hemsidan ska göra för ditt företag.";
  else if (message.length < 10) e.message = "Skriv gärna lite mer, minst en mening.";
  else if (message.length > limits.message) e.message = `Beskrivningen får vara högst ${limits.message} tecken.`;

  return e;
}

export function labelFor(
  options: readonly { value: string; label: string }[],
  value: string,
) {
  return options.find((o) => o.value === value)?.label ?? value;
}

export { isPackageId };
