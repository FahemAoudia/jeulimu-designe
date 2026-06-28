import type { SiteFontKey } from "@/lib/font-catalog";

export type SectionFontKey = SiteFontKey | "inherit";

export type SectionButtonStyle = {
  visible?: boolean;
  background?: string;
  textColor?: string;
};

export type SectionItemStyle = {
  visible?: boolean;
  background?: string;
  titleColor?: string;
  textColor?: string;
  iconColor?: string;
  borderColor?: string;
  fontFamily?: SectionFontKey;
  /** Emoji override (e.g. 🏃) */
  iconEmoji?: string;
  /** Lucide key (run, coop, gamepad, users, …) */
  iconLucide?: string;
  /** Uploaded image URL */
  iconImage?: string;
};

export type SectionStyle = {
  /** Hide entire section on the public site */
  visible?: boolean;
  background?: string;
  borderColor?: string;
  fontFamily?: SectionFontKey;
  /** Generic heading (fallback) */
  headingColor?: string;
  /** Hero line 1 e.g. STEP IN */
  headingLine1Color?: string;
  /** Hero line 2 e.g. BECOME THE GAME */
  headingLine2Color?: string;
  /** Small uppercase labels */
  labelColor?: string;
  /** Section titles */
  titleColor?: string;
  textColor?: string;
  bodyColor?: string;
  subtextColor?: string;
  iconColor?: string;
  accentColor?: string;
  cardBackground?: string;
  cardHeadingColor?: string;
  cardTextColor?: string;
  cardIconColor?: string;
  primaryButton?: SectionButtonStyle;
  secondaryButton?: SectionButtonStyle;
  /** Per-item overrides keyed by index string "0", "1", … */
  items?: Record<string, SectionItemStyle>;
};

export type SectionStylesMap = Record<string, SectionStyle>;
