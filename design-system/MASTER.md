# Designsystem – Kvantum

Framtaget med **Anthropic Frontend Design** (egen riktning, inga standardmönster) och **UI/UX Pro Max** (`nextlevelbuilder/ui-ux-pro-max-skill`, sökningar på stil, färg, typografi, UX och Next.js-stack). Rekommendationerna användes som underlag – där de krockade med briefen (ljus guld/svart-palett, Orbitron/Space Grotesk) valdes en riktning som passar ett mörkt, filmiskt uttryck.

## Riktning
Mörk, filmisk studio. Bredd, lugn och precision: stora rubriker i en kantig, teknisk display-font, tunna rutnätslinjer, en elektrisk ultramarin som enda accent. Det minnesvärda är hjältens överlappande webbläsarfönster med riktiga CSS-byggda förhandsvisningar och en liten omloppsbana (namnet Kvantum).

## Tokens (`src/styles/tokens.css`)
- Yta: `#04050a` · `#080a12` · `#0e111d` · `#161a2b`
- Text: `#eceffa` / `#a9b0c8` / `#8089a6` (kontrast mot bakgrund ≥ 4.5:1 för brödtext)
- Accent: `#5b5bff` (knappar, vit text 4.8:1), `#98a0ff` (länkar/ikoner), violett `#9b7bff` endast för Exclusive
- Typ: Inter Tight (rubriker, fet och tät) + Manrope (brödtext). Fraunces och Bricolage Grotesque används bara inne i konceptförhandsvisningarna.
- Radier: 0.5 / 0.9 / 1.5 rem. Rymd: 4-punktsskala.

## Principer
- Rörelse: en koreograferad hjälteintro, orbit/float i hjälten, tidslinjen som tänds vid scroll, FAQ-expansion, knappåterkoppling. Allt avstängt vid `prefers-reduced-motion`; parallax bara för fin pekare.
- Förhandsvisningarna är riktiga komponenter (`src/components/previews`) med olika layout, typografi och färg – inte samma mall.
- Alla portföljprojekt märks "Konceptprojekt". Inga påhittade omdömen, loggor, resultat, priser eller kontaktuppgifter.
- Tillgänglighet: skip-link, synlig fokus, 44 px+ klickytor, formulär med labels/felkoppling, mobilmeny med fokusfälla och Esc.
