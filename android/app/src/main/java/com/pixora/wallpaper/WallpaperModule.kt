package com.wallpaper

import android.app.WallpaperManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.Build
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import java.io.InputStream
import java.net.URL


class WallpaperModule(private val reactContext: ReactApplicationContext) :
    NativeWallpaperSpec(reactContext) {

    override fun getName() = NAME

    override fun setWallpaper(
        uri: String,
        location: String,
        promise: Promise
    ) {
        try {
            val wallpaperManager = WallpaperManager.getInstance(reactContext)
            val bitmap = downloadBitmap(uri)

            when (location.lowercase()) {
                "home" -> {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                        wallpaperManager.setBitmap(
                            bitmap,
                            null,
                            true,
                            WallpaperManager.FLAG_SYSTEM
                        )
                    } else {
                        wallpaperManager.setBitmap(bitmap)
                    }
                }

                "lock" -> {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                        wallpaperManager.setBitmap(
                            bitmap,
                            null,
                            true,
                            WallpaperManager.FLAG_LOCK
                        )
                    } else {
                        promise.reject(
                            "UNSUPPORTED",
                            "Lock screen wallpaper requires Android N or higher"
                        )
                        return
                    }
                }

                "both" -> {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                        wallpaperManager.setBitmap(
                            bitmap,
                            null,
                            true,
                            WallpaperManager.FLAG_SYSTEM or WallpaperManager.FLAG_LOCK
                        )
                    } else {
                        wallpaperManager.setBitmap(bitmap)
                    }
                }

                else -> {
                    promise.reject("INVALID_LOCATION", "Use 'home', 'lock', or 'both'")
                    return
                }
            }

            bitmap.recycle()
            promise.resolve(null)

        } catch (e: Exception) {
            promise.reject("SET_WALLPAPER_FAILED", e.message)
        }
    }

    override fun isSupported(): Boolean {
        return try {
            WallpaperManager.getInstance(reactContext).isWallpaperSupported
        } catch (e: Exception) {
            false
        }
    }

    override fun isSetAllowed(): Boolean {
        return try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                WallpaperManager.getInstance(reactContext).isSetWallpaperAllowed
            } else {
                true // Older versions generally allowed it if supported
            }
        } catch (e: Exception) {
            false
        }
    }

    private fun downloadBitmap(uri: String): Bitmap {
        val stream: InputStream? = URL(uri).openStream()
        val bitmap = BitmapFactory.decodeStream(stream)
            ?: throw Exception("Could not decode image. Ensure the URI is correct.")
        return bitmap
    }

    companion object {
        const val NAME = "wallpaper"
    }
}
