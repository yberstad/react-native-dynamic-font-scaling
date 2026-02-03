import { useCallback, useEffect, useState } from 'react';
import {
  AppState,
  AppStateStatus,
  Dimensions,
  PixelRatio,
} from 'react-native';

export interface UseFontScaleOptions {
  minScale?: number;
  maxScale?: number;
  listenToDimensions?: boolean;
  listenToAppState?: boolean;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function useFontScale(options: UseFontScaleOptions = {}): number {
  const {
    minScale = 0.8,
    maxScale = 2.0,
    listenToDimensions = true,
    listenToAppState = true,
  } = options;

  const [fontScale, setFontScale] = useState<number>(() => {
    const scale = PixelRatio.getFontScale();
    return clamp(scale, minScale, maxScale);
  });

  const refreshFontScale = useCallback(() => {
    const newScale = clamp(PixelRatio.getFontScale(), minScale, maxScale);
    setFontScale(newScale);
  }, [minScale, maxScale]);

  // Listen for app state changes (foreground/background)
  useEffect(() => {
    if (!listenToAppState) return;

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        setTimeout(refreshFontScale, 100);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [listenToAppState, refreshFontScale]);

  // Listen for dimension changes
  useEffect(() => {
    if (!listenToDimensions) return;

    const handleDimensionChange = () => {
      refreshFontScale();
    };

    const subscription = Dimensions.addEventListener('change', handleDimensionChange);
    return () => subscription.remove();
  }, [listenToDimensions, refreshFontScale]);

  return fontScale;
}
