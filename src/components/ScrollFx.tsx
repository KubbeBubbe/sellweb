"use client";

import { useEffect } from "react";
import { initScrollFx } from "@/lib/scrollfx";

/** Startar scrollanimationerna och visar en förloppslinje högst upp. */
export function ScrollFx() {
  useEffect(() => initScrollFx(), []);
  return <div className="progress" aria-hidden="true" />;
}
