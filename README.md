# Ljusår – webbyrå (Next.js)

Komplett hemsida för en webbyrå med paketen **Regular**, **Premium** och **Exclusive**. Allt innehåll är på svenska.
Byråns namn "Ljusår" är ett tillfälligt textbaserat varumärke – byt i `src/content/site.ts`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint && npm run typecheck && npm run build
```

## Redigera innehåll (inga komponenter behöver röras)

| Fil | Innehåll |
| --- | --- |
| `src/content/site.ts` | Namn, metadata, navigation, hero- och avslutstexter, **kontaktuppgifter**, **sociala länkar**, juridiska länkar |
| `src/content/packages.ts` | Paketens text, punktlistor och **priser** (`price.from: null` visar "Pris på förfrågan") |
| `src/content/projects.ts` | Portfolio (alla är markerade som konceptprojekt) |
| `src/content/industries.ts`, `process.ts`, `why.ts`, `faq.ts` | Branscher, processteg, fördelar, vanliga frågor |
| `src/styles/tokens.css` | Färger, typografi, mellanrum, radier |

Kontaktuppgifter, sociala länkar och juridiska länkar är tomma tills riktiga värden finns – inget visas då i sidfoten.

## Ta emot förfrågningar

Formuläret skickar till `POST /api/forfragan` (`src/app/api/forfragan/route.ts`). Bekräftelsen visas först när servern svarat OK.

1. **`INQUIRY_WEBHOOK_URL`** – förfrågan POSTas som JSON (valfritt `INQUIRY_WEBHOOK_SECRET` skickas som `Authorization: Bearer`). Koppla till Zapier, Make, n8n eller egen endpoint som skickar e-post/CRM. Svarar den med fel får besökaren ett felmeddelande.
2. **Utveckling** – med `npm run dev` sparas förfrågningar i `.data/forfragningar.jsonl` (och formuläret säger det). Tvingas på med `INQUIRY_FILE_STORE=1` (kräver skrivbart filsystem).
3. **Ingen konfiguration i produktion** → servern svarar 503 och formuläret säger tydligt att inget skickats.

Ingen e-post, analys eller betalning är inkopplad i projektet. Se `.env.example`.

## Struktur

```
src/app            sidor (startsida, /projekt/[slug]), API, sitemap, robots
src/components     sektioner och UI (previews/ = skräddarsydda CSS-förhandsvisningar)
src/content        allt redigerbart innehåll
src/lib            formulärvalidering (delad klient/server), förvalsstore
src/styles         tokens, bas, layout, sektioner, förhandsvisningar
design-system      designbeslut (se MASTER.md)
```

## Kvalitet

Verifierat lokalt: lint, typkontroll, produktionsbygge, samt ett Playwright-flöde som testar navigation, paketval → formulär, validering, tangentbordsinskickning, FAQ, portföljfilter, projektsidor, mobilmeny, horisontell scroll (320–1920 px) och reducerad rörelse.
