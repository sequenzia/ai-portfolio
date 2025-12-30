/**
 * Theme configuration
 * Defines available themes and the default theme setting
 */

export const themes = ["light", "dark"] as const;

export type Theme = (typeof themes)[number];

export const themeConfig = {
  /** Default theme to use when no preference is stored */
  defaultTheme: "dark" as Theme,

  /** Key used for localStorage persistence */
  storageKey: "ai-portfolio-theme",

  /** Whether to use system preference as fallback */
  useSystemPreference: true,
} as const;
