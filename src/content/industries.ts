export type IconName =
  | "cart" | "utensils" | "briefcase" | "building" | "pulse" | "gem" | "chip" | "pin";

export interface Industry {
  id: string;
  title: string;
  text: string;
  icon: IconName;
  /** Projektsida att länka till; annars går kortet till kontaktformuläret med branschen förvald. */
  projectSlug?: string;
}

export const industries: Industry[] = [
  { id: "ehandel", title: "E-handel", text: "Produktsidor, kassaflöden och kategoristruktur som gör det enkelt att hitta och köpa.", icon: "cart", projectSlug: "kvadrat" },
  { id: "restaurang-hotell", title: "Restauranger och hotell", text: "Meny, bokning och atmosfär som gör besökaren sugen på att komma.", icon: "utensils", projectSlug: "kallaren-14" },
  { id: "konsult", title: "Konsultverksamheter", text: "Tydliga erbjudanden och förtroende som gör det enkelt att ta första kontakten.", icon: "briefcase", projectSlug: "lindgren-redovisning" },
  { id: "fastigheter", title: "Fastigheter", text: "Objekt och miljöer som visas upp med den kvalitet de förtjänar.", icon: "building", projectSlug: "nordhem-residens" },
  { id: "traning-halsa", title: "Träning och hälsa", text: "Scheman, medlemskap och energi som får besökaren att boka första passet.", icon: "pulse" },
  { id: "lyx-livsstil", title: "Lyx och livsstil", text: "Berättande design som speglar ett varumärkes känsla ned i detaljerna.", icon: "gem" },
  { id: "teknik-startup", title: "Teknik och startups", text: "Produkten förklaras snabbt och tydligt – med ett uttryck som matchar ambitionen.", icon: "chip", projectSlug: "vektor" },
  { id: "lokala-foretag", title: "Lokala företag", text: "Hittas lokalt, känns lokalt och gör det lätt att ringa, boka eller hitta dit.", icon: "pin" },
];

export const industryOptions = [
  ...industries.map((i) => ({ value: i.id, label: i.title })),
  { value: "annat", label: "Annat" },
] as const;
