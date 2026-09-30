// lib/browser-notification.ts
// Browser Notification API wrapper for background alerts.

import { loadChatAppSettings } from "./chat-storage";

let _notifCounter = 0;

/** Check if notifications are enabled in app settings. */
export function isNotificationEnabled(): boolean {
    if (typeof window === "undefined") return false;
    if (!("Notification" in window)) return false;
    const settings = loadChatAppSettings();
    return settings.browserNotificationsEnabled === true && Notification.permission === "granted";
}

/** Request notification permission from the browser. Returns true if granted. */
export async function requestNotificationPermission(): Promise<boolean> {
    if (typeof window === "undefined" || !("Notification" in window)) return false;
    if (Notification.permission === "granted") return true;
    if (Notification.permission === "denied") return false;

    const result = await new Promise<NotificationPermission>((resolve) => {
        let settled = false;
        const finish = (permission: NotificationPermission) => {
            if (settled) return;
            settled = true;
            resolve(permission);
        };

        try {
            const request = Notification.requestPermission(finish);
            if (request && typeof request.then === "function") {
                request.then(finish).catch(() => finish(Notification.permission));
            }
        } catch {
            finish(Notification.permission);
        }

        window.setTimeout(() => finish(Notification.permission), 3000);
    });

    return result === "granted";
}

function constructNotification(title: string, payload: NotificationOptions): void {
    try {
        const notification = new Notification(title, payload);
        notification.onclick = () => {
            window.focus();
            notification.close();
        };
    } catch {
        // Android Chrome/Edge: "Illegal constructor" — handled by the SW path below.
    }
}

/**
 * Send a browser notification if enabled and page is hidden.
 * Does nothing if page is visible, permission denied, or setting is off.
 *
 * Android Chrome/Edge does NOT support the `new Notification()` constructor in
 * pages (throws Illegal constructor) — notifications there must go through the
 * service worker's showNotification(). We prefer the SW path everywhere and fall
 * back to the constructor (desktop / dev where the SW isn't registered).
 */
export function sendBrowserNotification(
    title: string,
    options?: { body?: string; icon?: string },
): void {
    if (!isNotificationEnabled()) return;
    if (!document.hidden) return;

    const payload: NotificationOptions = {
        body: options?.body,
        icon: options?.icon || "/icon-192.png",
        tag: `ai-phone-${Date.now()}-${_notifCounter++}`,
    };

    if ("serviceWorker" in navigator) {
        // `ready` never rejects and may hang forever when no SW is registered
        // (dev mode) — race it with a short timeout, then fall back.
        const timeout = new Promise<null>((resolve) => window.setTimeout(() => resolve(null), 800));
        Promise.race([navigator.serviceWorker.ready, timeout])
            .then((registration) => {
                if (registration && typeof registration.showNotification === "function") {
                    return registration.showNotification(title, payload);
                }
                constructNotification(title, payload);
            })
            .catch(() => constructNotification(title, payload));
        return;
    }
    constructNotification(title, payload);
}

/**
 * 发送一条测试通知（无视 document.hidden，只要用户授权即弹出）
 */
export async function sendTestBrowserNotification(
    title = "Float",
    options?: { body?: string; icon?: string },
): Promise<{ ok: boolean; message?: string }> {
    if (typeof window === "undefined" || !("Notification" in window)) {
        return { ok: false, message: "当前浏览器不支持 Notification API" };
    }

    if (Notification.permission !== "granted") {
        const granted = await requestNotificationPermission();
        if (!granted || Notification.permission !== "granted") {
            return {
                ok: false,
                message: `通知权限未开启（当前状态：${Notification.permission}）。请在浏览器地址栏或系统设置中允许通知。`,
            };
        }
    }

    const payload: NotificationOptions = {
        body: options?.body || "这是一条测试通知。收到此横幅说明浏览器弹窗通知正常可用！",
        icon: options?.icon || "/icon-192.png",
        tag: `ai-phone-test-${Date.now()}-${_notifCounter++}`,
    };

    if ("serviceWorker" in navigator) {
        try {
            const timeout = new Promise<null>((resolve) => window.setTimeout(() => resolve(null), 800));
            const registration = await Promise.race([navigator.serviceWorker.ready, timeout]);
            if (registration && typeof registration.showNotification === "function") {
                await registration.showNotification(title, payload);
                return { ok: true };
            }
        } catch {
            // fall back to Notification constructor
        }
    }

    try {
        constructNotification(title, payload);
        return { ok: true };
    } catch (e) {
        return { ok: false, message: e instanceof Error ? e.message : String(e) };
    }
}
