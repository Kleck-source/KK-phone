package app.floatphone.shell

import android.content.Context
import org.json.JSONObject

/**
 * 健康桥（轻量桩实现）：
 * 避免引入 Google Health Connect 导致的 compileSdk 36 与 AGP 8.9+ 构建锁死。
 * vivo / 国行机无 Google Health 服务时优雅返回不可用，保证全工程稳定编译通过。
 */
class HealthBridge(private val context: Context) {

    companion object {
        const val PERM_SLEEP = "android.permission.health.READ_SLEEP"
    }

    fun sdkStatus(): Int = 3 // SDK_UNAVAILABLE
    fun isAvailable(): Boolean = false
    fun hasSleepPermission(): Boolean = false
    fun openHealthSettings(): Boolean = false

    fun refresh() {}

    fun readJson(): JSONObject = JSONObject()

    fun capabilitiesJson(): String = JSONObject()
        .put("health", false)
        .put("healthAvailable", false)
        .put("healthGranted", false)
        .put("healthSdkStatus", 3)
        .toString()

    fun diagnosticsJson(): String = JSONObject()
        .put("available", false)
        .put("granted", false)
        .put("refreshing", false)
        .put("refreshCount", 0)
        .put("hasCache", false)
        .put("cacheAgeMs", -1)
        .put("lastError", "国行机未启用 Health Connect")
        .toString()
}
