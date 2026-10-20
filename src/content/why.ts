import type { IconName } from "./industries";

export type WhyIcon = IconName | "layers" | "phone" | "gauge" | "chat" | "target" | "stack";

export const why: { title: string; text: string; icon: WhyIcon }[] = [
  { title: "Skräddarsydd design", text: "Varje hemsida formas efter verksamheten. Vi utgår aldrig från en färdig mall.", icon: "layers" },
  { title: "Mobilanpassad utveckling", text: "Vi bygger för den minsta skärmen först och låter layouten växa uppåt.", icon: "phone" },
  { title: "Fokus på prestanda", text: "Snabba sidor är bättre för besökarna, och bättre att jobba med för sökmotorerna.", icon: "gauge" },
  { title: "Tydlig kommunikation", text: "Du vet vad som händer, vad som är nästa steg och vad du behöver bidra med.", icon: "chat" },
  { title: "Genomtänkt användarupplevelse", text: "Strukturen gör det enkelt att hitta rätt – och enkelt att ta kontakt.", icon: "target" },
  { title: "Teknik som passar behovet", text: "Vi väljer lösning efter vad företaget behöver, inte efter vad som är trendigt.", icon: "stack" },
];
