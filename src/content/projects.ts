/**
 * Portfolio. Alla projekt här är KONCEPTPROJEKT som byrån själv tagit fram för att visa
 * designriktningar – inga riktiga kunduppdrag. Byt ut mot verkliga projekt (med kundens
 * godkännande) när sådana finns, och sätt `concept: false`.
 */
import type { PackageId } from "./packages";

export interface Project {
  slug: string;
  title: string;
  category: string;
  industry: string;
  concept: boolean;
  summary: string;
  story: string[];
  direction: { label: string; value: string }[];
  highlights: string[];
  suggestedPackage: PackageId;
  /** Färg som används för projektkortets glöd. */
  tone: string;
}

export const projects: Project[] = [
  {
    slug: "kallaren-14",
    title: "Källaren 14",
    category: "Restaurang",
    industry: "restaurang-hotell",
    concept: true,
    summary: "Elegant restaurangwebbplats där meny och stämning möter bordsbokning.",
    story: [
      "Mörka vinröda toner, kursiv serif och en meny som läses som en meny – inte som en prislista. Besökaren ska känna kvällen innan de bokat bord.",
      "Konceptet visar hur öppettider, adress och bokning kan hållas inom räckhåll hela vägen ned på sidan.",
    ],
    direction: [
      { label: "Uttryck", value: "Intimt, varmt, redigerat" },
      { label: "Typografi", value: "Kursiv serif och diskret sans" },
      { label: "Färg", value: "Vinrött, mässing och benvitt" },
    ],
    highlights: ["Meny med tydliga rubriker", "Bordsbokning inom räckhåll", "Öppettider och vägbeskrivning"],
    suggestedPackage: "premium",
    tone: "#b0405a",
  },
  {
    slug: "vektor",
    title: "Vektor",
    category: "Teknikstartup",
    industry: "teknik-startup",
    concept: true,
    summary: "Futuristisk startupwebbplats som förklarar en produkt på några sekunder.",
    story: [
      "Ett mörkt, tekniskt gränssnitt där produkten visas direkt i hjälten. Terminalinspirerade detaljer och ett tydligt rutnät ger precision utan att dränka budskapet.",
      "Konceptet visar hur interaktiva produktvisningar och en lugn rörelse kan göra något abstrakt begripligt.",
    ],
    direction: [
      { label: "Uttryck", value: "Precist, tekniskt, fokuserat" },
      { label: "Typografi", value: "Grotesk med monospace i detaljer" },
      { label: "Färg", value: "Djupt svart med en kall cyan signal" },
    ],
    highlights: ["Produkten i hjälten", "Interaktiv kodvisning", "Tydlig väg till demo"],
    suggestedPackage: "exclusive",
    tone: "#35d6e0",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
