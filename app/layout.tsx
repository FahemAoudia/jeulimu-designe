import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { FaqChatbot } from "@/components/FaqChatbot";
import { getSiteContent } from "@/lib/get-site-content";

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

export const metadata: Metadata = {
  title: "jeuLumi — Interactive LED Game Floor | LaSalle, QC",
  description:
    "Interactive LED game floor in LaSalle, Quebec. Book your session — open by reservation only.",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("jl_theme");document.documentElement.setAttribute("data-theme",t==="light"||t==="dark"?t:"dark");}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialContent = await getSiteContent();

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${syne.variable} ju-body-root font-sans antialiased overflow-x-hidden text-[15px] sm:text-base`}
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
