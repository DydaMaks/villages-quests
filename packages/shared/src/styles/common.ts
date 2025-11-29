import { THEME } from './theme';

export const COMMON_STYLES = {
  // Container styles
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  
  containerSm: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 1rem',
  },

  // Card styles
  card: {
    backgroundColor: THEME.colors.backgroundLight,
    borderRadius: THEME.borderRadius.lg,
    boxShadow: THEME.shadows.base,
    border: `1px solid ${THEME.colors.gray200}`,
  },

  cardHover: {
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      boxShadow: THEME.shadows.md,
      transform: 'translateY(-2px)',
    },
  },

  // Button styles
  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: THEME.spacing[2],
      padding: `${THEME.spacing[3]} ${THEME.spacing[6]}`,
      border: 'none',
      borderRadius: THEME.borderRadius.base,
      fontSize: THEME.typography.fontSize.base,
      fontWeight: THEME.typography.fontWeight.medium,
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      position: 'relative',
      overflow: 'hidden',
    },
    primary: {
      backgroundColor: THEME.colors.primary600,
      color: THEME.colors.textInverted,
      '&:hover:not(:disabled)': {
        backgroundColor: THEME.colors.primary700,
        transform: 'translateY(-1px)',
        boxShadow: THEME.shadows.lg,
      },
    },
    secondary: {
      backgroundColor: THEME.colors.backgroundLight,
      color: THEME.colors.gray700,
      border: `1px solid ${THEME.colors.gray300}`,
      '&:hover:not(:disabled)': {
        backgroundColor: THEME.colors.gray50,
        borderColor: THEME.colors.gray400,
      },
    },
    outline: {
      backgroundColor: 'transparent',
      color: THEME.colors.primary600,
      border: `1px solid ${THEME.colors.primary600}`,
      '&:hover:not(:disabled)': {
        backgroundColor: THEME.colors.primary50,
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: THEME.colors.gray600,
      border: '1px solid transparent',
      '&:hover:not(:disabled)': {
        backgroundColor: THEME.colors.gray100,
        color: THEME.colors.gray700,
      },
    },
    danger: {
      backgroundColor: THEME.colors.error,
      color: THEME.colors.textInverted,
      '&:hover:not(:disabled)': {
        backgroundColor: THEME.colors.errorDark,
      },
    },
    disabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none !important',
    },
  },

  // Form styles
  form: {
    group: {
      marginBottom: THEME.spacing[5],
    },
    label: {
      display: 'block',
      marginBottom: THEME.spacing[2],
      fontWeight: THEME.typography.fontWeight.medium,
      color: THEME.colors.gray700,
    },
    input: {
      width: '100%',
      padding: `${THEME.spacing[3]} ${THEME.spacing[4]}`,
      border: `1px solid ${THEME.colors.gray300}`,
      borderRadius: THEME.borderRadius.base,
      fontSize: THEME.typography.fontSize.base,
      transition: 'all 0.2s ease-in-out',
      backgroundColor: THEME.colors.backgroundLight,
      '&:focus': {
        outline: 'none',
        borderColor: THEME.colors.primary500,
        boxShadow: `0 0 0 3px ${THEME.colors.primary100}`,
      },
      '&.error': {
        borderColor: THEME.colors.error,
        boxShadow: `0 0 0 3px ${THEME.colors.errorLight}`,
      },
    },
    error: {
      color: THEME.colors.error,
      fontSize: THEME.typography.fontSize.sm,
      marginTop: THEME.spacing[1],
    },
    select: {
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
      backgroundPosition: 'right 0.5rem center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '1.5em 1.5em',
      paddingRight: '2.5rem',
    },
  },

  // Badge styles
  badge: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: `${THEME.spacing[1]} ${THEME.spacing[3]}`,
      borderRadius: THEME.borderRadius.xl,
      fontSize: THEME.typography.fontSize.xs,
      fontWeight: THEME.typography.fontWeight.medium,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    primary: {
      backgroundColor: THEME.colors.primary100,
      color: THEME.colors.primary700,
    },
    success: {
      backgroundColor: THEME.colors.successLight,
      color: THEME.colors.successDark,
    },
    warning: {
      backgroundColor: THEME.colors.warningLight,
      color: THEME.colors.warningDark,
    },
    error: {
      backgroundColor: THEME.colors.errorLight,
      color: THEME.colors.errorDark,
    },
    gray: {
      backgroundColor: THEME.colors.gray100,
      color: THEME.colors.gray700,
    },
  },

  // Loading states
  loading: {
    spinner: {
      width: '2rem',
      height: '2rem',
      border: `2px solid ${THEME.colors.gray200}`,
      borderLeftColor: THEME.colors.primary500,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    screen: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: THEME.spacing[16],
      color: THEME.colors.gray500,
    },
  },

  // Utility classes
  utility: {
    srOnly: {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: '0',
    },
    textCenter: {
      textAlign: 'center',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
    flexCenter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    flexBetween: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
} as const;

// Keyframes for animations
export const KEYFRAMES = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      transform: translate3d(0, -30px, 0);
    }
    70% {
      transform: translate3d(0, -15px, 0);
    }
    90% {
      transform: translate3d(0, -4px, 0);
    }
  }
`;