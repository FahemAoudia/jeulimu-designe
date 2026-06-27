/** Per-section visual overrides (colors, fonts, buttons) — edited in Admin → Page styles. */
export type SectionButtonStyle = {
  visible?: boolean;
  background?: string;
  textColor?: string;
};

export type SectionStyle = {
  /** Hide entire section on the public site */
  visible?: boolean;
  background?: string;
  headingColor?: string;
  textColor?: string;
  subtextColor?: string;
  iconColor?: string;
  fontFamily?: "inherit" | "outfit" | "syne" | "system";
  cardBackground?: string;
  cardHeadingColor?: string;
  cardTextColor?: string;
  cardIconColor?: string;
  primaryButton?: SectionButtonStyle;
  secondaryButton?: SectionButtonStyle;
};

export type SectionStylesMap = Record<string, SectionStyle>;
