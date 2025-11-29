export const COLORS = {
  // Primary Green (Nature/Villages theme)
  primary50: '#f0fdf4',
  primary100: '#dcfce7',
  primary200: '#bbf7d0',
  primary300: '#86efac',
  primary400: '#4ade80',
  primary500: '#22c55e',
  primary600: '#16a34a',
  primary700: '#15803d',
  primary800: '#166534',
  primary900: '#14532d',

  // Secondary (Earth tones)
  secondary50: '#fefce8',
  secondary100: '#fef9c3',
  secondary200: '#fef08a',
  secondary300: '#fde047',
  secondary400: '#facc15',
  secondary500: '#eab308',
  secondary600: '#ca8a04',
  secondary700: '#a16207',
  secondary800: '#854d0e',
  secondary900: '#713f12',

  // Gray Scale
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',

  // Semantic Colors
  success: '#10b981',
  successLight: '#d1fae5',
  successDark: '#047857',

  warning: '#f59e0b',
  warningLight: '#fef3c7',
  warningDark: '#d97706',

  error: '#ef4444',
  errorLight: '#fee2e2',
  errorDark: '#dc2626',

  info: '#3b82f6',
  infoLight: '#dbeafe',
  infoDark: '#1d4ed8',

  // Backgrounds
  backgroundLight: '#ffffff',
  backgroundDark: '#0f172a',
  backgroundGray: '#f8fafc',

  // Text
  textPrimary: '#1f2937',
  textSecondary: '#6b7280',
  textLight: '#9ca3af',
  textInverted: '#ffffff',
} as const;

export type ColorPalette = keyof typeof COLORS;