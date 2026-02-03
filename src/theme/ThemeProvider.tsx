import React, { createContext, useContext, useMemo } from 'react';
import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';
import { useFontScale } from '../hooks';
import { createScaledTheme, Theme } from './theme';

const FontScaleContext = createContext(1);

export interface ScaledThemeProviderProps {
  children?: React.JSX.Element | React.JSX.Element[] | null;
  minScale?: number;
  maxScale?: number;
  listenToDimensions?: boolean;
  listenToAppState?: boolean;
}

export function ScaledThemeProvider({
  children,
  minScale = 0.8,
  maxScale = 2.0,
  listenToDimensions = true,
  listenToAppState = true,
}: ScaledThemeProviderProps) {
  const fontScale = useFontScale({
    minScale,
    maxScale,
    listenToDimensions,
    listenToAppState,
  });

  const scaledTheme = useMemo(() => {
    return createScaledTheme(fontScale);
  }, [fontScale]);

  return (
    <FontScaleContext.Provider value={fontScale}>
      <RestyleThemeProvider theme={scaledTheme}>
        {children}
      </RestyleThemeProvider>
    </FontScaleContext.Provider>
  );
}

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

export type { Theme };

export { createScaledTheme };

export default ScaledThemeProvider;
