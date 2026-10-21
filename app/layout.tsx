import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// DEPLOY STEP: set metadataBase to the live URL so og:url and og:image become absolute.
export const metadata: Metadata = {
  title: "Vinicius Ogawa | Desenvolvedor front-end",
  description:
    "Vinicius Ogawa, desenvolvedor front-end. Interfaces em React e TypeScript, APIs em Node.js e Django, bancos PostgreSQL.",
  openGraph: {
    title: "Vinicius Ogawa | Desenvolvedor front-end",
    description: "Interfaces em React e TypeScript que as pessoas entendem de primeira.",
    images: ["/assets/hero-ending.jpg"],
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d131d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
