import { Kallaren } from "./Kallaren";
import { Vektor } from "./Vektor";

const map = {
  "kallaren-14": Kallaren,
  vektor: Vektor,
} as const;

export type PreviewSlug = keyof typeof map;

/** Skalar en förhandsvisning (1200×750 px) till containerns bredd. Dekorativ – dold för skärmläsare. */
export function ProjectPreview({ slug }: { slug: string }) {
  const Preview = map[slug as PreviewSlug];
  if (!Preview) return null;
  return (
    <div className="pv-frame" aria-hidden="true" inert>
      <Preview />
    </div>
  );
}
