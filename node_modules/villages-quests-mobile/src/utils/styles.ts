import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#22c55e',
  primaryDark: '#16a34a',
  primaryLight: '#86efac',
  background: '#f8fafc',
  white: '#ffffff',
  text: '#1f2937',
  textSecondary: '#6b7280',
  textLight: '#9ca3af',
  border: '#e5e7eb',
  error: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981',
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: COLORS.text,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: COLORS.text,
  },
  body: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    color: COLORS.textLight,
  },
};

export const COMMON_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutlineText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  inputFocused: {
    borderColor: COLORS.primary,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});