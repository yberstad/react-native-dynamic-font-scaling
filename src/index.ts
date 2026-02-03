// Main entry point for the design system

// Theme
export { 
  ScaledThemeProvider, 
  useFontScaleValue,
  createScaledTheme,
  defaultTheme,
} from './theme';
export type { Theme, ScaledThemeProviderProps } from './theme';

// Hooks
export { useFontScale, getFontScale } from './hooks';
export type { UseFontScaleOptions } from './hooks';

// Components
export {
  Box,
  Text,
  Card,
  Pressable,
  Container,
  SafeArea,
  Input,
  Divider,
  Spacer,
} from './components';
export type {
  BoxProps,
  TextProps,
  CardProps,
  PressableProps,
  ContainerProps,
  SafeAreaProps,
  InputProps,
} from './components';
