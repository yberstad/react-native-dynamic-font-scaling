import React, { createContext, useContext, useMemo } from 'react';
import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';
import { useFontScale, UseFontScaleOptions } from '../hooks/useFontScale';
import { createScaledTheme, Theme } from './theme';

/**
 * Context to provide the raw font scale value to components.
 */
const FontScaleContext = createContext(1);

/**
 * Props for the ScaledThemeProvider component.
 */
export interface ScaledThemeProviderProps extends UseFontScaleOptions {
  /**
   * Children to render within the theme provider.
   */
  children?: React.JSX.Element | React.JSX.Element[] | null;
}

/**
 * A theme provider that automatically recreates the @shopify/restyle theme
 * when the device font scale changes.
 * 
 * This provider:
 * - Uses a native module on Android to bypass React Native's cached font scale
 * - Listens for app state changes to detect when the user returns from settings
 * - Recreates the theme with scaled values when font scale changes
 * - Provides the raw fontScale value via context for components that need it
 * 
 * @example
 * ```tsx
 * // In your App.tsx
 * import { ScaledThemeProvider } from './src/theme/ThemeProvider';
 * 
 * export default function App() {
 *   return (
 *     <ScaledThemeProvider minScale={0.85} maxScale={1.5}>
 *       <MyApp />
 *     </ScaledThemeProvider>
 *   );
 * }
 * 
 * // In any component, use restyle components normally:
 * import { Box, Text } from './src/components';
 * 
 * function MyComponent() {
 *   return (
 *     <Box padding="lg">
 *       <Text variant="h1">This scales automatically!</Text>
 *       <Text variant="body">
 *         When the user changes font size in settings,
 *         the entire UI updates on return to the app.
 *       </Text>
 *     </Box>
 *   );
 * }
 * ```
 */
export function ScaledThemeProvider({
  children,
  minScale = 0.8,
  maxScale = 2.0,
  listenToDimensions = true,
  listenToAppState = true,
}: ScaledThemeProviderProps) {
  // Get the current font scale using the hook
  const { fontScale, updateCount } = useFontScale({
    minScale,
    maxScale,
    listenToDimensions,
    listenToAppState,
  });

  console.log('[ThemeProvider] fontScale:', fontScale, 'updateCount:', updateCount);

  // Create theme with manually scaled font sizes
  // We disable allowFontScaling on Text and scale fonts ourselves
  const scaledTheme = useMemo(() => {
    console.log('[ThemeProvider] Creating theme with fontScale:', fontScale);
    return createScaledTheme(fontScale, updateCount);
  }, [fontScale, updateCount]);

  return (
    <FontScaleContext.Provider value={fontScale}>
      <RestyleThemeProvider theme={scaledTheme}>
        {children}
      </RestyleThemeProvider>
    </FontScaleContext.Provider>
  );
}

/**
 * Hook to access the current font scale value.
 * 
 * Use this when you need the raw font scale for custom calculations
 * outside of the standard theme values.
 * 
 * @returns The current font scale value (clamped between minScale and maxScale)
 * 
 * @example
 * ```tsx
 * function CustomScaledComponent() {
 *   const fontScale = useFontScaleValue();
 *   
 *   // Use fontScale for custom calculations
 *   const customSize = 100 * Math.min(fontScale, 1.3);
 *   
 *   return (
 *     <View style={{ width: customSize, height: customSize }}>
 *       <Text>Custom scaled content</Text>
 *     </View>
 *   );
 * }
 * ```
 */
export function useFontScaleValue(): number {
  const fontScale = useContext(FontScaleContext);
  
  if (fontScale === undefined) {
    console.warn(
      'useFontScaleValue must be used within a ScaledThemeProvider. ' +
      'Falling back to default scale of 1.'
    );
    return 1;
  }
  
  return fontScale;
}

/**
 * Re-export the Theme type for convenience.
 */
export type { Theme };

/**
 * Re-export createScaledTheme for cases where manual theme creation is needed.
 */
export { createScaledTheme };

export default ScaledThemeProvider;
