import type { Metadata } from "next";
import Script from "next/script";
import {
  Bebas_Neue,
  Exo_2,
  Inter,
  Montserrat,
  Orbitron,
  Outfit,
  Poppins,
  Rajdhani,
  Space_Grotesk,
  Syne,
} from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { FaqChatbot } from "@/components/FaqChatbot";
import { getSiteContent } from "@/lib/get-site-content";
import { generateThemeCss, mergeTheme } from "@/lib/theme-css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin", "latin-ext"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const exo2 = Exo_2({
  subsets: ["latin", "latin-ext"],
  variable: "--font-exo-2",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
  weight: "400",
});

const fontVariables = [
  outfit.variable,
  syne.variable,
  inter.variable,
  poppins.variable,
  montserrat.variable,
  spaceGrotesk.variable,
  orbitron.variable,
  rajdhani.variable,
  exo2.variable,
  bebasNeue.variable,
].join(" ");

export const metadata: Metadata = {
  title: "jeuLumi — Interactive LED Game Floor | LaSalle, QC",
  description:
    "Interactive LED game floor in LaSalle, Quebec. Book your session — open by reservation only.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** CMS content (logo size, branding) must load fresh — not baked at build time */
export const dynamic = "force-dynamic";

const themeInitScript = `(function(){try{var t=localStorage.getItem("jl_theme");document.documentElement.setAttribute("data-theme",t==="light"||t==="dark"?t:"dark");}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialContent = await getSiteContent();
  const themeCss = generateThemeCss(mergeTheme(initialContent.theme));

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <style id="jl-theme-ssr">{themeCss}</style>
      </head>
      <body
        className={`${fontVariables} ju-body-root font-sans antialiased overflow-x-hidden text-[15px] sm:text-base`}
      >
        <Script id="jl-theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <AppProviders initialContent={initialContent}>
          {children}
          <FaqChatbot />
        </AppProviders>
      </body>
    </html>
  );
}
