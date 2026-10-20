/**
 * Byråns identitet och konfigurerbara uppgifter.
 * Allt som är `null` eller en tom lista visas inte på webbplatsen.
 */

export const site = {
  name: "Ljusår",
  descriptor: "Webbstudio",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "sv_SE",
  title: "Ljusår – webbyrå för skräddarsydda hemsidor",
  description:
    "Ljusår bygger hemsidor som får företag att sticka ut. Välj mellan Regular, Premium och Exclusive – från stilrena företagssidor till exklusiva digitala upplevelser.",
  shortDescription:
    "Vi designar och bygger hemsidor efter verksamhetens mål, målgrupp och behov – inga generiska mallar.",
} as const;

/** Kontaktuppgifter. Fyll i riktiga värden, då visas de i sidfoten. */
export const contact: {
  email: string | null;
  phone: string | null;
  location: string | null;
  hours: string | null;
} = {
  email: null,
  phone: null,
  location: null,
  hours: null,
};

/** Sociala länkar. Lägg bara till poster när det finns riktiga URL:er. */
export const socials: { label: string; href: string }[] = [
  // { label: "LinkedIn", href: "https://www.linkedin.com/company/…" },
];

/** Juridiska sidor. Lägg till här först när sidorna faktiskt finns. */
export const legalLinks: { label: string; href: string }[] = [
  // { label: "Integritetspolicy", href: "/integritet" },
  // { label: "Användarvillkor", href: "/villkor" },
];

export const nav = [
  { id: "tjanster", label: "Tjänster" },
  { id: "projekt", label: "Våra projekt" },
  { id: "priser", label: "Priser" },
  { id: "process", label: "Så fungerar det" },
  { id: "om-oss", label: "Om oss" },
] as const;

export const navCta = { label: "Starta ditt projekt", href: "#kontakt" } as const;

export const hero = {
  title: "VI BYGGER HEMSIDOR SOM TAR FÖRETAG TILL NÄSTA NIVÅ.",
  lead: "Från stilrena företagssidor till exklusiva digitala upplevelser. Vi förvandlar idéer till hemsidor som får ditt företag att sticka ut.",
  primary: { label: "Bygg min hemsida", href: "#kontakt" },
  secondary: { label: "Utforska våra projekt", href: "#projekt" },
} as const;

export const closing = {
  title: "DIN NÄSTA HEMSIDA SKA GÖRA MER ÄN ATT BARA FINNAS.",
  lead: "Låt oss skapa en digital upplevelse som speglar kvaliteten i ditt företag.",
  cta: { label: "Starta ditt projekt", href: "#kontakt" },
} as const;
