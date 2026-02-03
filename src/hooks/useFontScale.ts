import { useCallback, useEffect, useState } from 'react';
import {
  AppState,
  AppStateStatus,
  Dimensions,
  NativeModules,
  PixelRatio,
  Platform,
} from 'react-native';

/**
 * Options for the useFontScale hook.
 */
export interface UseFontScaleOptions {
  /**
   * Minimum font scale to return (default: 0.8).
   * Values below this will be clamped.
   */
  minScale?: number;
  
  /**
   * Maximum font scale to return (default: 2.0).
   * Values above this will be clamped.
   */
  maxScale?: number;
  
  /**
   * Whether to listen for dimension changes (default: true).
   * Can help catch font scale changes on some devices.
   */
  listenToDimensions?: boolean;
  
  /**
   * Whether to listen for app state changes (default: true).
   * When the app comes to foreground, the font scale is re-read.
   */
  listenToAppState?: boolean;
}

/**
 * Return type for useFontScale hook.
 */
export interface FontScaleResult {
  /**
   * The actual font scale from the native module.
   */
  fontScale: number;
  
  /**
   * Correction factor to apply to font sizes to compensate for RN's cached scale.
   * Use this when allowFontScaling is enabled: fontSize = baseFontSize * fontScaleCorrection
   * This ensures: (baseFontSize * correction) * cachedScale = baseFontSize * actualScale
   */
  fontScaleCorrection: number;
  
  /**
   * The cached font scale that React Native's PixelRatio.getFontScale() returns.
   */
  cachedFontScale: number;
  
  /**
   * A counter that increments every time the font scale is re-read.
   * Use this as a key to force re-renders even when values are the same.
   */
  updateCount: number;
}

/**
 * Interface for the FontScaleModule native module.
 */
interface FontScaleModuleInterface {
  getFontScale(): Promise<number>;
  getFontScaleSync?(): number;
}

// Access the native module
const FontScaleModule = NativeModules.FontScaleModule as FontScaleModuleInterface | undefined;

// Module-level counter that persists across component remounts
let globalUpdateCount = 0;

/**
 * Gets the font scale from the native module on Android,
 * or from PixelRatio on iOS (which doesn't have the caching issue).
 */
async function getNativeFontScale(): Promise<number> {
  if (Platform.OS === 'android' && FontScaleModule?.getFontScale) {
    try {
      return await FontScaleModule.getFontScale();
    } catch (error) {
      console.warn('FontScaleModule.getFontScale() failed, falling back to PixelRatio:', error);
      return PixelRatio.getFontScale();
    }
  }
  
  // iOS doesn't have the caching issue, use PixelRatio directly
  return PixelRatio.getFontScale();
}

/**
 * Gets the font scale synchronously (for initial value).
 * Uses the sync method on Android if available, otherwise falls back to PixelRatio.
 */
function getFontScaleSync(): number {
  if (Platform.OS === 'android' && FontScaleModule?.getFontScaleSync) {
    try {
      return FontScaleModule.getFontScaleSync();
    } catch {
      return PixelRatio.getFontScale();
    }
  }
  return PixelRatio.getFontScale();
}

/**
 * Gets the cached font scale from PixelRatio (what RN's Text uses internally).
 */
function getCachedFontScale(): number {
  return PixelRatio.getFontScale();
}

/**
 * Clamps a value between min and max.
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Hook that provides the current font scale and a correction factor.
 * 
 * On Android with New Architecture, React Native's PixelRatio.getFontScale() 
 * returns a cached value that doesn't update when the user changes font size.
 * This hook reads the actual value from the native module and provides a
 * correction factor to compensate.
 * 
 * @param options Configuration options for scale clamping and event listening
 * @returns FontScaleResult with fontScale, fontScaleCorrection, and cachedFontScale
 * 
 * @example
 * ```tsx
 * const { fontScale, fontScaleCorrection } = useFontScale();
 * 
 * // Use fontScaleCorrection to adjust font sizes when allowFontScaling is true
 * const theme = useMemo(() => createScaledTheme(fontScaleCorrection), [fontScaleCorrection]);
 * ```
 */
export function useFontScale(options: UseFontScaleOptions = {}): FontScaleResult {
  const {
    minScale = 0.8,
    maxScale = 2.0,
    listenToDimensions = true,
    listenToAppState = true,
  } = options;

  // Initialize with sync values for immediate render
  const [state, setState] = useState<FontScaleResult>(() => {
    const actualScale = getFontScaleSync();
    const cachedScale = getCachedFontScale();
    const clampedScale = clamp(actualScale, minScale, maxScale);
    
    // Correction = actual / cached
    // When RN applies: (fontSize * correction) * cached = fontSize * actual
    const correction = cachedScale !== 0 ? clampedScale / cachedScale : 1;
    
    // Use global counter for initial value to persist across remounts
    return {
      fontScale: clampedScale,
      fontScaleCorrection: correction,
      cachedFontScale: cachedScale,
      updateCount: globalUpdateCount,
    };
  });

  // Function to update the font scale
  const updateFontScale = useCallback(async () => {
    const actualScale = await getNativeFontScale();
    const cachedScale = getCachedFontScale();
    const clampedScale = clamp(actualScale, minScale, maxScale);
    
    // Correction = actual / cached
    const correction = cachedScale !== 0 ? clampedScale / cachedScale : 1;
    
    // Increment global counter - persists across component remounts
    globalUpdateCount++;
    
    console.log('[useFontScale] Actual:', actualScale, 'Cached:', cachedScale, 'globalUpdateCount:', globalUpdateCount);
    
    setState({
      fontScale: clampedScale,
      fontScaleCorrection: correction,
      cachedFontScale: cachedScale,
      updateCount: globalUpdateCount,
    });
  }, [minScale, maxScale]);

  // Listen for app state changes
  useEffect(() => {
    if (!listenToAppState) return;

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        // App came to foreground - check for font scale changes
        updateFontScale();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Also update on mount in case the font scale changed while app was in background
    updateFontScale();

    return () => {
      subscription.remove();
    };
  }, [listenToAppState, updateFontScale]);

  // Listen for dimension changes
  useEffect(() => {
    if (!listenToDimensions) return;

    const handleDimensionChange = () => {
      // Dimension changes can sometimes indicate font scale changes
      updateFontScale();
    };

    const subscription = Dimensions.addEventListener('change', handleDimensionChange);

    return () => {
      subscription.remove();
    };
  }, [listenToDimensions, updateFontScale]);

  return state;
}

/**
 * Non-hook version for getting the font scale imperatively.
 * Useful for one-off reads outside of React components.
 * 
 * @param options Scale clamping options
 * @returns Promise resolving to FontScaleResult
 */
export async function getFontScale(
  options: Pick<UseFontScaleOptions, 'minScale' | 'maxScale'> = {}
): Promise<FontScaleResult> {
  const { minScale = 0.8, maxScale = 2.0 } = options;
  const actualScale = await getNativeFontScale();
  const cachedScale = getCachedFontScale();
  const clampedScale = clamp(actualScale, minScale, maxScale);
  const correction = cachedScale !== 0 ? clampedScale / cachedScale : 1;
  
  return {
    fontScale: clampedScale,
    fontScaleCorrection: correction,
    cachedFontScale: cachedScale,
  };
}

export default useFontScale;
