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
    slug: "nordhem-residens",
    title: "Nordhem Residens",
    category: "Fastigheter",
    industry: "fastigheter",
    concept: true,
    summary: "Lyxig fastighetswebbplats med lugn, stor typografi och objekt i fokus.",
    story: [
      "Konceptet utgår från känslan av att kliva in i ett välkomponerat hem: varma stenfärger, stora marginaler och en serifftypografi som ger tyngd utan att bli stel.",
      "Objektsidan är byggd runt det som en köpare faktiskt jämför – läge, yta och rum – med tydlig väg till visningsbokning.",
    ],
    direction: [
      { label: "Uttryck", value: "Lugn, arkitektonisk, generös" },
      { label: "Typografi", value: "Serif med hög kontrast" },
      { label: "Färg", value: "Sten, sand och mörk skiffer" },
    ],
    highlights: ["Objektkort med nyckeltal", "Filtrering på område och storlek", "Visningsbokning i tre steg"],
    suggestedPackage: "exclusive",
    tone: "#c8b79a",
  },
  {
    slug: "kvadrat",
    title: "Kvadrat",
    category: "E-handel",
    industry: "ehandel",
    concept: true,
    summary: "Modern e-handelsbutik med kraftfulla färgblock och snabb produktupptäckt.",
    story: [
      "En butik för designade vardagsföremål, där färg och form får bära varumärket. Produkterna ligger i ett tydligt rutnät och varje kort visar det besökaren behöver för att ta ett beslut.",
      "Konceptet visar hur kategorier, filter och varukorg kan hållas lätta att använda på mobil.",
    ],
    direction: [
      { label: "Uttryck", value: "Lekfullt, tydligt, kontrastrikt" },
      { label: "Typografi", value: "Kompakt grotesk i feta snitt" },
      { label: "Färg", value: "Ljust underlag med starka färgblock" },
    ],
    highlights: ["Produktrutnät med snabbval", "Tydlig kategorinavigering", "Kassaflöde utan omvägar"],
    suggestedPackage: "premium",
    tone: "#ff6a3d",
  },
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
    slug: "lindgren-redovisning",
    title: "Lindgren Redovisning",
    category: "Tjänsteföretag",
    industry: "konsult",
    concept: true,
    summary: "Professionell hemsida för ett tjänsteföretag som vill skapa förtroende direkt.",
    story: [
      "Ett lugnt, ljust och strukturerat uttryck för en verksamhet där trygghet är produkten. Tjänsterna förklaras på vanlig svenska och kontaktvägen är alltid synlig.",
      "Konceptet visar hur ett Regular-paket kan se rent och trovärdigt ut utan att kännas som en mall.",
    ],
    direction: [
      { label: "Uttryck", value: "Tryggt, tydligt, välordnat" },
      { label: "Typografi", value: "Humanistisk sans med god läsbarhet" },
      { label: "Färg", value: "Vitt, marinblått och mjuk grön accent" },
    ],
    highlights: ["Tjänster förklarade enkelt", "Tydlig kontaktväg i varje sektion", "Snabb och lättläst på mobil"],
    suggestedPackage: "regular",
    tone: "#2f6fed",
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
