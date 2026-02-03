package com.testscale2

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * Native module that provides direct access to Android's font scale setting.
 * 
 * This bypasses React Native's cached PixelRatio.getFontScale() which can return
 * stale values on the New Architecture when the user changes font size in settings.
 * 
 * See: https://github.com/facebook/react-native/issues/50916
 */
class FontScaleModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = NAME

    /**
     * Gets the current font scale directly from Android's configuration.
     * 
     * Attempts to read from the current activity's resources first (most accurate),
     * falling back to application context if activity is null.
     * 
     * @param promise Promise that resolves with the font scale as a Double
     */
    @ReactMethod
    fun getFontScale(promise: Promise) {
        try {
            val fontScale = reactApplicationContext.currentActivity?.resources?.configuration?.fontScale
                ?: reactApplicationContext.resources.configuration.fontScale
            promise.resolve(fontScale.toDouble())
        } catch (e: Exception) {
            // Fall back to 1.0 if we can't read the font scale
            promise.resolve(1.0)
        }
    }

    /**
     * Synchronous version for turbo modules (if needed in the future).
     * Returns the font scale directly without a promise.
     */
    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getFontScaleSync(): Double {
        return try {
            val fontScale = reactApplicationContext.currentActivity?.resources?.configuration?.fontScale
                ?: reactApplicationContext.resources.configuration.fontScale
            fontScale.toDouble()
        } catch (e: Exception) {
            1.0
        }
    }

    companion object {
        const val NAME = "FontScaleModule"
    }
}
