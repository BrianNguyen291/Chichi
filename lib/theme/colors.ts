export const colors = {
  primary: '#B17F4A',
  secondary: '#8B633A',
  accent: '#2A5C3F',
  light: '#F5F2EB',
  dark: '#3A3A3A'
} as const;

// Derived semantic colors
export const semanticColors = {
  text: {
    primary: colors.dark,
    secondary: colors.secondary,
    accent: colors.accent,
  },
  background: {
    primary: colors.light,
    accent: colors.accent,
  },
  button: {
    primary: colors.accent,
    primaryHover: '#1E4630',
    secondary: 'white',
  }
} as const; 