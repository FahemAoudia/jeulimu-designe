/** Site-wide font keys — loaded in app/layout.tsx; applied only when chosen in Admin → Theme. */
export type SiteFontKey =
  | "outfit"
  | "syne"
  | "inter"
  | "poppins"
  | "montserrat"
  | "space-grotesk"
  | "orbitron"
  | "rajdhani"
  | "exo-2"
  | "bebas-neue"
  | "system";

export const SITE_FONT_OPTIONS: { value: SiteFontKey; label: string }[] = [
  { value: "outfit", label: "Outfit — modern sans (default body)" },
  { value: "syne", label: "Syne — bold display (default headings)" },
  { value: "inter", label: "Inter — clean UI" },
  { value: "poppins", label: "Poppins — friendly rounded" },
  { value: "montserrat", label: "Montserrat — geometric sans" },
  { value: "space-grotesk", label: "Space Grotesk — tech / futuristic" },
  { value: "orbitron", label: "Orbitron — gaming / sci-fi" },
  { value: "rajdhani", label: "Rajdhani — sporty condensed" },
  { value: "exo-2", label: "Exo 2 — dynamic tech" },
  { value: "bebas-neue", label: "Bebas Neue — poster display" },
  { value: "system", label: "System UI" },
];

export function normalizeSiteFontKey(key: string | undefined): SiteFontKey {
  const k = key?.trim().toLowerCase();
  if (SITE_FONT_OPTIONS.some((o) => o.value === k)) return k as SiteFontKey;
  if (k === "outfit" || k === "syne" || k === "system") return k;
  return "outfit";
}

export function siteFontFamilyCss(key: SiteFontKey | undefined): string {
  switch (key) {
    case "syne":
      return "var(--font-syne), system-ui, sans-serif";
    case "inter":
      return "var(--font-inter), system-ui, sans-serif";
    case "poppins":
      return "var(--font-poppins), system-ui, sans-serif";
    case "montserrat":
      return "var(--font-montserrat), system-ui, sans-serif";
    case "space-grotesk":
      return "var(--font-space-grotesk), system-ui, sans-serif";
    case "orbitron":
      return "var(--font-orbitron), system-ui, sans-serif";
    case "rajdhani":
      return "var(--font-rajdhani), system-ui, sans-serif";
    case "exo-2":
      return "var(--font-exo-2), system-ui, sans-serif";
    case "bebas-neue":
      return "var(--font-bebas-neue), system-ui, sans-serif";
    case "system":
      return "system-ui, sans-serif";
    default:
      return "var(--font-outfit), system-ui, sans-serif";
  }
}
