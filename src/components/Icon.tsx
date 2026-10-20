import type { IconName } from "@/content/industries";
import type { WhyIcon } from "@/content/why";

const paths: Record<IconName | WhyIcon | "arrow" | "check" | "plus" | "external", React.ReactNode> = {
  cart: <><path d="M3 4h2.2l2 11h10.3l2-8H6.2" /><circle cx="9" cy="19.5" r="1.4" /><circle cx="17" cy="19.5" r="1.4" /></>,
  utensils: <><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10" /><path d="M17 21V3c-2.5 1.5-3.5 4-3.5 7v3H17" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" /></>,
  building: <><path d="M5 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17M15 9h3a1 1 0 0 1 1 1v11M3 21h18" /><path d="M9 7h2M9 11h2M9 15h2" /></>,
  pulse: <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />,
  gem: <><path d="M6 3h12l3 6-9 12L3 9z" /><path d="M3 9h18M9.5 3 8 9l4 12 4-12-1.5-6" /></>,
  chip: <><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="10" y="10" width="4" height="4" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></>,
  phone: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></>,
  gauge: <><path d="M4 17a9 9 0 1 1 16 0" /><path d="m12 13 4-5" /><circle cx="12" cy="14" r="1.2" /></>,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  stack: <><rect x="4" y="4" width="16" height="6" rx="1.5" /><rect x="4" y="14" width="16" height="6" rx="1.5" /><path d="M8 7h.01M8 17h.01" /></>,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  external: <path d="M7 17 17 7M8 7h9v9" />,
};

export function Icon({ name, className }: { name: keyof typeof paths; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <ellipse cx="16" cy="16" rx="12" ry="5.2" fill="none" stroke="var(--accent-text)" strokeWidth="1.6" transform="rotate(-24 16 16)" />
      <circle cx="16" cy="16" r="3.6" fill="currentColor" />
      <circle cx="26.8" cy="11.2" r="1.8" fill="var(--accent-hi)" />
    </svg>
  );
}
