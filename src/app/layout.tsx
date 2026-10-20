import type { Metadata, Viewport } from "next";
import { Sora, Manrope, Fraunces, Bricolage_Grotesque } from "next/font/google";
import { site } from "@/content/site";
import "@/styles/globals.css";

const display = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["500", "600", "700"] });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
// Typsnitt som bara används i de konceptuella förhandsvisningarna.
const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap", style: ["normal", "italic"], axes: ["opsz"] });
const grotesk = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-grotesk", display: "swap", weight: ["600", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#040a1c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={`${display.variable} ${body.variable} ${serif.variable} ${grotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
