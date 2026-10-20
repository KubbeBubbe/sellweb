/**
 * Paketen. Ändra text, punktlistor och priser här – pris- och formulärsektionerna
 * läser allt härifrån. Sätt `price.from` till ett tal (kronor) när priset är fastställt.
 */

export type PackageId = "regular" | "premium" | "exclusive";

export interface ServicePackage {
  id: PackageId;
  name: string;
  tagline: string;
  audience: string;
  audienceList: string[];
  /** Text ovanför punktlistan, t.ex. "Allt i Regular, plus:" */
  includesLead: string;
  features: string[];
  keyBenefit: string;
  price: { from: number | null; unit: string; placeholder: string };
  cta: { label: string };
  recommended?: boolean;
}

export const packages: ServicePackage[] = [
  {
    id: "regular",
    name: "Regular",
    tagline: "Professionellt och enkelt",
    audience: "För företag som behöver en snygg och professionell hemsida.",
    audienceList: ["Småföretag", "Lokala tjänsteföretag", "Enskilda konsulter", "Nystartade verksamheter"],
    includesLead: "Det här ingår:",
    features: [
      "Professionellt designad hemsida",
      "Responsiv design för mobil, surfplatta och dator",
      "Grundläggande sidor och navigation",
      "Kontaktformulär",
      "Grundläggande SEO-inställningar",
      "Prestandaanpassad implementation",
      "Tydliga knappar och kontaktvägar",
      "Grundläggande stöd inför lansering",
    ],
    keyBenefit: "En ren, snabb och trovärdig webbplats – redo att ta emot kunder.",
    price: { from: null, unit: "kr", placeholder: "Pris på förfrågan" },
    cta: { label: "Välj Regular" },
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Mer design, mer möjligheter",
    audience: "För företag som vill sticka ut och utveckla sin digitala närvaro.",
    audienceList: ["Etablerade företag", "Växande varumärken", "Premiumtjänster", "Högre krav på design och funktion"],
    includesLead: "Allt i Regular, plus:",
    features: [
      "Mer avancerad och skräddarsydd design",
      "Genomarbetade animationer och interaktioner",
      "Mer avancerade sidlayouter",
      "Genomtänkta kundresor och konverteringsflöden",
      "Utökad SEO-konfiguration",
      "Relevanta integrationer",
      "Mer omfattande innehållsstruktur",
      "Extra designförfining och lanseringsstöd",
    ],
    keyBenefit: "En hemsida med eget uttryck som är byggd för att leda besökare till nästa steg.",
    price: { from: null, unit: "kr", placeholder: "Pris på förfrågan" },
    cta: { label: "Välj Premium" },
    recommended: true,
  },
  {
    id: "exclusive",
    name: "Exclusive",
    tagline: "En digital upplevelse utan kompromisser",
    audience: "För varumärken som kräver en helt skräddarsydd digital upplevelse.",
    audienceList: ["Lyxvarumärken", "Etablerade företag med höga krav", "Ambitiösa varumärken", "Avancerade funktionella eller visuella behov"],
    includesLead: "Allt i Premium, plus:",
    features: [
      "Helt skräddarsydd visuell identitet för webbplatsen",
      "Avancerade interaktiva upplevelser",
      "Specialbyggda animationer och rörelsesystem",
      "Genomarbetad visuell storytelling",
      "Anpassade funktioner och integrationer",
      "Noggrann prestandaoptimering",
      "Personlig projektplanering och samarbete",
      "Utökad kvalitetssäkring",
      "Anpassade alternativ för support efter lansering",
    ],
    keyBenefit: "Ett unikt digitalt projekt som formas runt ert varumärke – inte en större mall.",
    price: { from: null, unit: "kr", placeholder: "Offereras efter samtal" },
    cta: { label: "Diskutera ditt projekt" },
  },
];

export const packageOptions = [
  ...packages.map((p) => ({ value: p.id, label: p.name })),
  { value: "osaker", label: "Jag är osäker – hjälp mig välja" },
] as const;

export function isPackageId(value: unknown): value is PackageId {
  return packages.some((p) => p.id === value);
}
