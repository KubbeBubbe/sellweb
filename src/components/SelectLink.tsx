"use client";

import { setPreselect } from "@/lib/contact-store";
import type { PackageId } from "@/content/packages";

/** Länk till kontaktformuläret som samtidigt förväljer paket och/eller bransch. */
export function SelectLink({
  children,
  className,
  pkg,
  industry,
}: {
  children: React.ReactNode;
  className?: string;
  pkg?: PackageId | "osaker";
  industry?: string;
}) {
  const params = new URLSearchParams();
  if (pkg) params.set("paket", pkg);
  if (industry) params.set("bransch", industry);
  const qs = params.toString();
  return (
    <a
      className={className}
      href={`/${qs ? `?${qs}` : ""}#kontakt`}
      onClick={() => setPreselect({ ...(pkg ? { package: pkg } : {}), ...(industry ? { industry } : {}) })}
    >
      {children}
    </a>
  );
}
