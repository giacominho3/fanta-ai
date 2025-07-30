// src/theme/theme.js
export const theme = {
  colors: {
    // Primary palette
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7', 
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    
    // Secondary palette
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff', 
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    
    // Accent colors
    accent: {
      orange: '#fb923c',
      blue: '#60a5fa',
      cyan: '#22d3ee',
      red: '#ef4444',
      yellow: '#fcd34d',
    },
    
    // Neutral palette
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    
    // Dark mode specific
    dark: {
      bg: {
        primary: '#171717',
        secondary: '#404040', 
        tertiary: '#525252',
      },
      surface: {
        primary: 'rgba(255, 255, 255, 0.1)',
        secondary: 'rgba(255, 255, 255, 0.05)',
        elevated: 'rgba(255, 255, 255, 0.2)',
      },
      text: {
        primary: '#f5f5f5',
        secondary: '#d4d4d4',
        tertiary: '#a3a3a3',
        muted: 'rgba(245, 245, 245, 0.7)',
      },
      border: {
        primary: 'rgba(255, 255, 255, 0.2)',
        secondary: 'rgba(255, 255, 255, 0.1)',
        accent: 'rgba(34, 197, 94, 0.5)',
      }
    }
  },
  
  typography: {
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      mono: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem', 
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    }
  },
  
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem', 
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  transitions: {
    fast: '0.15s ease-in-out',
    base: '0.2s ease-in-out', 
    slow: '0.3s ease-in-out',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }
};

// Gradients
export const gradients = {
  primary: `linear-gradient(135deg, ${theme.colors.dark.bg.primary}, ${theme.colors.dark.bg.secondary}, ${theme.colors.dark.bg.tertiary})`,
  card: `linear-gradient(135deg, ${theme.colors.secondary[400]}, ${theme.colors.primary[500]})`,
  surface: 'rgba(255, 255, 255, 0.1)',
  elevated: 'rgba(255, 255, 255, 0.2)',
};

// Helper functions
export const rgba = (color, opacity) => `rgba(${color}, ${opacity})`;

export const getSpacing = (size) => theme.spacing[size] || size;

export const getFontSize = (size) => theme.typography.fontSize[size] || size;