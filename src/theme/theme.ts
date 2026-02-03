import { createTheme } from '@shopify/restyle';

const palette = {
  // Primary colors
  primary: '#007AFF',
  primaryLight: '#4DA3FF',
  primaryDark: '#0055B3',
  
  // Secondary colors
  secondary: '#5856D6',
  secondaryLight: '#8583E1',
  secondaryDark: '#3D3B9E',
  
  // Semantic colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5AC8FA',
  
  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  
  // Grays
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Transparent
  transparent: 'transparent',
};

const baseFontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 30,
  '5xl': 36,
  '6xl': 48,
};

const baseSpacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

const lineHeightMultipliers = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
};

const scaleCaps = {
  heading: 1.4,
  body: 2.0,
  button: 1.3,
  caption: 1.8,
  spacing: 1.5,
};

function applyScale(baseValue: number, fontScale: number, cap: number): number {
  const effectiveScale = Math.min(fontScale, cap);
  return Math.round(baseValue * effectiveScale);
}

function createScaledFontSizes(fontScale: number) {
  return {
    xs: applyScale(baseFontSizes.xs, fontScale, scaleCaps.caption),
    sm: applyScale(baseFontSizes.sm, fontScale, scaleCaps.caption),
    md: applyScale(baseFontSizes.md, fontScale, scaleCaps.body),
    lg: applyScale(baseFontSizes.lg, fontScale, scaleCaps.body),
    xl: applyScale(baseFontSizes.xl, fontScale, scaleCaps.heading),
    '2xl': applyScale(baseFontSizes['2xl'], fontScale, scaleCaps.heading),
    '3xl': applyScale(baseFontSizes['3xl'], fontScale, scaleCaps.heading),
    '4xl': applyScale(baseFontSizes['4xl'], fontScale, scaleCaps.heading),
    '5xl': applyScale(baseFontSizes['5xl'], fontScale, scaleCaps.heading),
    '6xl': applyScale(baseFontSizes['6xl'], fontScale, scaleCaps.heading),
  };
}

function createScaledSpacing(fontScale: number) {
  const scaledSpacing: Record<string, number> = {};
  
  for (const [key, value] of Object.entries(baseSpacing)) {
    if (value === 0) {
      scaledSpacing[key] = 0;
    } else {
      scaledSpacing[key] = applyScale(value, fontScale, scaleCaps.spacing);
    }
  }
  
  scaledSpacing['-xs'] = -scaledSpacing.xs;
  scaledSpacing['-sm'] = -scaledSpacing.sm;
  scaledSpacing['-md'] = -scaledSpacing.md;
  scaledSpacing['-lg'] = -scaledSpacing.lg;
  scaledSpacing['-xl'] = -scaledSpacing.xl;
  scaledSpacing['-2xl'] = -scaledSpacing['2xl'];
  
  return scaledSpacing;
}

export function createScaledTheme(fontScale: number = 1) {
  const fontSizes = createScaledFontSizes(fontScale);
  const spacing = createScaledSpacing(fontScale);
  
  return createTheme({
    colors: {
      ...palette,
      background: palette.white,
      foreground: palette.gray900,
      
      cardBackground: palette.white,
      cardForeground: palette.gray900,
      
      inputBackground: palette.gray100,
      inputBorder: palette.gray300,
      inputText: palette.gray900,
      inputPlaceholder: palette.gray400,
      
      buttonPrimaryBackground: palette.primary,
      buttonPrimaryText: palette.white,
      buttonSecondaryBackground: palette.gray200,
      buttonSecondaryText: palette.gray800,
      buttonDisabledBackground: palette.gray200,
      buttonDisabledText: palette.gray400,
      
      textPrimary: palette.gray900,
      textSecondary: palette.gray600,
      textTertiary: palette.gray400,
      textInverse: palette.white,
      textLink: palette.primary,
      
      borderDefault: palette.gray200,
      borderFocused: palette.primary,
      borderError: palette.error,
      
      divider: palette.gray200,
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    
    spacing: spacing as typeof baseSpacing & {
      '-xs': number;
      '-sm': number;
      '-md': number;
      '-lg': number;
      '-xl': number;
      '-2xl': number;
    },
    
    borderRadii: {
      none: 0,
      xs: 2,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      '2xl': 24,
      full: 9999,
    },
    
    zIndices: {
      base: 0,
      dropdown: 100,
      sticky: 200,
      modal: 300,
      popover: 400,
      toast: 500,
      tooltip: 600,
    },
    
    breakpoints: {
      phone: 0,
      tablet: 768,
      largeTablet: 1024,
    },
    
    textVariants: {
      defaults: {
        color: 'textPrimary',
        fontSize: fontSizes.md,
        lineHeight: Math.round(fontSizes.md * lineHeightMultipliers.normal),
      },
      
      h1: {
        fontSize: fontSizes['6xl'],
        lineHeight: Math.round(fontSizes['6xl'] * lineHeightMultipliers.tight),
        fontWeight: '700' as const,
        color: 'textPrimary',
      },
      h2: {
        fontSize: fontSizes['5xl'],
        lineHeight: Math.round(fontSizes['5xl'] * lineHeightMultipliers.tight),
        fontWeight: '700' as const,
        color: 'textPrimary',
      },
      h3: {
        fontSize: fontSizes['4xl'],
        lineHeight: Math.round(fontSizes['4xl'] * lineHeightMultipliers.tight),
        fontWeight: '600' as const,
        color: 'textPrimary',
      },
      h4: {
        fontSize: fontSizes['3xl'],
        lineHeight: Math.round(fontSizes['3xl'] * lineHeightMultipliers.tight),
        fontWeight: '600' as const,
        color: 'textPrimary',
      },
      h5: {
        fontSize: fontSizes['2xl'],
        lineHeight: Math.round(fontSizes['2xl'] * lineHeightMultipliers.tight),
        fontWeight: '600' as const,
        color: 'textPrimary',
      },
      h6: {
        fontSize: fontSizes.xl,
        lineHeight: Math.round(fontSizes.xl * lineHeightMultipliers.tight),
        fontWeight: '600' as const,
        color: 'textPrimary',
      },
      
      body: {
        fontSize: fontSizes.md,
        lineHeight: Math.round(fontSizes.md * lineHeightMultipliers.normal),
        color: 'textPrimary',
      },
      bodyLarge: {
        fontSize: fontSizes.lg,
        lineHeight: Math.round(fontSizes.lg * lineHeightMultipliers.normal),
        color: 'textPrimary',
      },
      bodySmall: {
        fontSize: fontSizes.sm,
        lineHeight: Math.round(fontSizes.sm * lineHeightMultipliers.normal),
        color: 'textSecondary',
      },
      
      button: {
        fontSize: applyScale(baseFontSizes.md, fontScale, scaleCaps.button),
        lineHeight: Math.round(applyScale(baseFontSizes.md, fontScale, scaleCaps.button) * lineHeightMultipliers.normal),
        fontWeight: '600' as const,
        color: 'textPrimary',
      },
      buttonLarge: {
        fontSize: applyScale(baseFontSizes.lg, fontScale, scaleCaps.button),
        lineHeight: Math.round(applyScale(baseFontSizes.lg, fontScale, scaleCaps.button) * lineHeightMultipliers.normal),
        fontWeight: '600' as const,
        color: 'textPrimary',
      },
      buttonSmall: {
        fontSize: applyScale(baseFontSizes.sm, fontScale, scaleCaps.button),
        lineHeight: Math.round(applyScale(baseFontSizes.sm, fontScale, scaleCaps.button) * lineHeightMultipliers.normal),
        fontWeight: '600' as const,
        color: 'textPrimary',
      },
      
      caption: {
        fontSize: fontSizes.xs,
        lineHeight: Math.round(fontSizes.xs * lineHeightMultipliers.normal),
        color: 'textTertiary',
      },
      captionMedium: {
        fontSize: fontSizes.sm,
        lineHeight: Math.round(fontSizes.sm * lineHeightMultipliers.normal),
        color: 'textSecondary',
      },
      
      label: {
        fontSize: fontSizes.sm,
        lineHeight: Math.round(fontSizes.sm * lineHeightMultipliers.normal),
        fontWeight: '500' as const,
        color: 'textPrimary',
      },
      labelLarge: {
        fontSize: fontSizes.md,
        lineHeight: Math.round(fontSizes.md * lineHeightMultipliers.normal),
        fontWeight: '500' as const,
        color: 'textPrimary',
      },
      
      link: {
        fontSize: fontSizes.md,
        lineHeight: Math.round(fontSizes.md * lineHeightMultipliers.normal),
        color: 'textLink',
        textDecorationLine: 'underline' as const,
      },
    },
    
    cardVariants: {
      defaults: {
        backgroundColor: 'cardBackground',
        borderRadius: 'md',
        padding: 'lg',
      },
      elevated: {
        backgroundColor: 'cardBackground',
        borderRadius: 'md',
        padding: 'lg',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
      outlined: {
        backgroundColor: 'cardBackground',
        borderRadius: 'md',
        padding: 'lg',
        borderWidth: 1,
        borderColor: 'borderDefault',
      },
    },
    
    buttonVariants: {
      defaults: {
        paddingVertical: 'md',
        paddingHorizontal: 'xl',
        borderRadius: 'md',
        backgroundColor: 'buttonPrimaryBackground',
      },
      primary: {
        paddingVertical: 'md',
        paddingHorizontal: 'xl',
        borderRadius: 'md',
        backgroundColor: 'buttonPrimaryBackground',
      },
      secondary: {
        paddingVertical: 'md',
        paddingHorizontal: 'xl',
        borderRadius: 'md',
        backgroundColor: 'buttonSecondaryBackground',
      },
      outlined: {
        paddingVertical: 'md',
        paddingHorizontal: 'xl',
        borderRadius: 'md',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'primary',
      },
      ghost: {
        paddingVertical: 'md',
        paddingHorizontal: 'xl',
        borderRadius: 'md',
        backgroundColor: 'transparent',
      },
      disabled: {
        paddingVertical: 'md',
        paddingHorizontal: 'xl',
        borderRadius: 'md',
        backgroundColor: 'buttonDisabledBackground',
      },
    },
    
    inputVariants: {
      defaults: {
        paddingVertical: 'md',
        paddingHorizontal: 'lg',
        borderRadius: 'md',
        borderWidth: 1,
        borderColor: 'inputBorder',
        backgroundColor: 'inputBackground',
        color: 'inputText',
        fontSize: fontSizes.md,
      },
      outlined: {
        paddingVertical: 'md',
        paddingHorizontal: 'lg',
        borderRadius: 'md',
        borderWidth: 1,
        borderColor: 'inputBorder',
        backgroundColor: 'transparent',
        color: 'inputText',
        fontSize: fontSizes.md,
      },
      focused: {
        paddingVertical: 'md',
        paddingHorizontal: 'lg',
        borderRadius: 'md',
        borderWidth: 2,
        borderColor: 'borderFocused',
        backgroundColor: 'inputBackground',
        color: 'inputText',
        fontSize: fontSizes.md,
      },
      error: {
        paddingVertical: 'md',
        paddingHorizontal: 'lg',
        borderRadius: 'md',
        borderWidth: 2,
        borderColor: 'borderError',
        backgroundColor: 'inputBackground',
        color: 'inputText',
        fontSize: fontSizes.md,
      },
    },
  });
}

export type Theme = ReturnType<typeof createScaledTheme>;

export const defaultTheme = createScaledTheme(1);

export default createScaledTheme;
