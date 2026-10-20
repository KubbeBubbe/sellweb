import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BrowserFrame } from "@/components/BrowserFrame";
import { Icon } from "@/components/Icon";
import { SelectLink } from "@/components/SelectLink";
import { getProject, projects } from "@/content/projects";
import { packages } from "@/content/packages";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} – ${p.concept ? "konceptprojekt" : "projekt"}`,
    description: p.summary,
    alternates: { canonical: `/projekt/${p.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const pkg = packages.find((p) => p.id === project.suggestedPackage)!;
  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <>
      <a className="skip-link" href="#main">Hoppa till innehållet</a>
      <Nav home={false} />
      <main id="main" className="detail" style={{ "--tone": project.tone } as React.CSSProperties}>
        <div className="wrap">
          <nav aria-label="Brödsmulor" className="crumbs">
            <Link href="/#projekt">Våra projekt</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.title}</span>
          </nav>

          <header className="detail-head">
            <div className="project-tags">
              <span>{project.category}</span>
              {project.concept && <span className="concept-badge">Konceptprojekt</span>}
            </div>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </header>

          {project.concept && (
            <p className="concept-note">
              <Icon name="pin" />
              Det här är ett konceptprojekt som vi tagit fram själva för att visa en designriktning. Det är inget riktigt kunduppdrag och företaget finns inte på riktigt.
            </p>
          )}

          <div className="detail-visual">
            <BrowserFrame slug={project.slug} label={`${project.title} · konceptprojekt`} />
          </div>

          <div className="detail-grid">
            <section aria-labelledby="idea">
              <h2 id="idea">Idén bakom konceptet</h2>
              {project.story.map((s, i) => <p key={i}>{s}</p>)}
            </section>
            <section aria-labelledby="direction">
              <h2 id="direction">Visuell riktning</h2>
              <dl className="spec">
                {project.direction.map((d) => (
                  <div key={d.label}><dt>{d.label}</dt><dd>{d.value}</dd></div>
                ))}
              </dl>
              <h2 id="highlights" style={{ marginTop: "var(--s-6)" }}>Det här visar konceptet</h2>
              <ul className="plan-features">
                {project.highlights.map((h) => <li key={h}><Icon name="check" />{h}</li>)}
              </ul>
            </section>
          </div>

          <aside className="detail-cta" aria-labelledby="detail-cta-title">
            <div>
              <h2 id="detail-cta-title">Vill du ha något liknande?</h2>
              <p>En hemsida i den här riktningen passar oftast paketet <strong>{pkg.name}</strong>: {pkg.audience.toLowerCase()}</p>
            </div>
            <SelectLink pkg={pkg.id} industry={project.industry} className="btn btn-primary">
              Starta ditt projekt <Icon name="arrow" />
            </SelectLink>
          </aside>

          <section className="more" aria-labelledby="more-title">
            <h2 id="more-title">Fler koncept</h2>
            <ul>
              {others.map((o) => (
                <li key={o.slug}>
                  <a href={`/projekt/${o.slug}`}>
                    <span>{o.category}</span>
                    <strong>{o.title}</strong>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
