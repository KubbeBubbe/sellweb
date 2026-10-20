"use client";

import { useSyncExternalStore } from "react";
import { isPackageId, type PackageId } from "@/content/packages";

/**
 * Liten delad store för förvalen i kontaktformuläret. Paketknappar, branschkort och
 * URL-parametrar (?paket=premium&bransch=ehandel) skriver hit; formuläret läser härifrån.
 */
export interface Preselect {
  package: PackageId | "osaker" | "";
  industry: string;
  /** Räknas upp vid varje nytt val så att formuläret kan reagera även på samma värde. */
  version: number;
}

let state: Preselect = { package: "", industry: "", version: 0 };
const listeners = new Set<() => void>();

export function setPreselect(next: Partial<Omit<Preselect, "version">>) {
  state = { ...state, ...next, version: state.version + 1 };
  listeners.forEach((l) => l());
}

export function readPreselectFromUrl(search: string) {
  const params = new URLSearchParams(search);
  const pkg = params.get("paket");
  const industry = params.get("bransch");
  const next: Partial<Omit<Preselect, "version">> = {};
  if (pkg && (isPackageId(pkg) || pkg === "osaker")) next.package = pkg;
  if (industry) next.industry = industry;
  if (Object.keys(next).length) setPreselect(next);
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

const serverSnapshot: Preselect = { package: "", industry: "", version: 0 };

export function usePreselect() {
  return useSyncExternalStore(subscribe, () => state, () => serverSnapshot);
}
