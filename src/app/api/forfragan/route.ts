import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { validateInquiry, type InquiryInput } from "@/lib/inquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Tar emot en förfrågan från kontaktformuläret.
 *
 * Leveransen är en integrationspunkt – tre lägen, i den här ordningen:
 *   1. INQUIRY_WEBHOOK_URL satt  → förfrågan POSTas som JSON dit. Svarar webhooken med fel
 *      får besökaren ett felmeddelande (ingen falsk bekräftelse).
 *   2. Utveckling (eller INQUIRY_FILE_STORE=1) → förfrågan läggs i .data/forfragningar.jsonl.
 *   3. Annars → 503: ingenting har sparats och formuläret säger det.
 */

const MAX_BODY = 20_000;

// Enkel in-memory-begränsning per IP. Räcker som skydd mot enkla missbruk; byt mot en
// delad lagring (t.ex. Redis) om flera serverinstanser används.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

function str(v: unknown) {
  return typeof v === "string" ? v : "";
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) {
    return NextResponse.json({ ok: false, message: "Förfrågan är för stor." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, message: "Förfrågan kunde inte läsas." }, { status: 400 });
  }

  const input: InquiryInput = {
    name: str(body.name),
    company: str(body.company),
    email: str(body.email),
    industry: str(body.industry),
    package: str(body.package),
    budget: str(body.budget),
    message: str(body.message),
    timeline: str(body.timeline),
    website: str(body.website),
  };

  // Honeypot: låtsas lyckas för botar men spara ingenting.
  if (input.website) return NextResponse.json({ ok: true });

  const errors = validateInquiry(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, message: "Kontrollera de markerade fälten.", errors }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "okand";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, message: "Du har skickat många förfrågningar på kort tid. Vänta en stund och försök igen." }, { status: 429 });
  }

  const record = {
    receivedAt: new Date().toISOString(),
    name: input.name.trim(),
    company: input.company.trim(),
    email: input.email.trim(),
    industry: input.industry,
    package: input.package,
    budget: input.budget,
    timeline: input.timeline,
    message: input.message.trim(),
  };

  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.INQUIRY_WEBHOOK_SECRET
            ? { Authorization: `Bearer ${process.env.INQUIRY_WEBHOOK_SECRET}` }
            : {}),
        },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`Webhook svarade ${res.status}`);
      return NextResponse.json({ ok: true, delivery: "webhook" });
    } catch (err) {
      console.error("[forfragan] Webhook misslyckades:", err);
      return NextResponse.json({ ok: false, message: "Det gick inte att skicka förfrågan just nu. Försök igen om en stund." }, { status: 502 });
    }
  }

  if (process.env.NODE_ENV === "development" || process.env.INQUIRY_FILE_STORE === "1") {
    try {
      const dir = path.join(process.cwd(), ".data");
      await mkdir(dir, { recursive: true });
      await appendFile(path.join(dir, "forfragningar.jsonl"), JSON.stringify(record) + "\n", "utf8");
      return NextResponse.json({ ok: true, delivery: "file" });
    } catch (err) {
      console.error("[forfragan] Kunde inte spara fil:", err);
      return NextResponse.json({ ok: false, message: "Förfrågan kunde inte sparas." }, { status: 500 });
    }
  }

  console.error("[forfragan] Ingen leverans konfigurerad. Sätt INQUIRY_WEBHOOK_URL.");
  return NextResponse.json(
    { ok: false, message: "Formuläret är inte kopplat till någon mottagare ännu, så ingenting har skickats." + " Kontakta oss på annat sätt tills det är klart." },
    { status: 503 },
  );
}
