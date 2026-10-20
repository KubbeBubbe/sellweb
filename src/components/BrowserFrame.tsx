import { ProjectPreview } from "./previews";

export function BrowserFrame({ slug, label, className = "" }: { slug: string; label: string; className?: string }) {
  return (
    <div className={`browser ${className}`}>
      <div className="browser-bar" aria-hidden="true">
        <i /><i /><i />
        <span>{label}</span>
      </div>
      <ProjectPreview slug={slug} />
    </div>
  );
}
