// lib/shell-notify.ts
//
// 壳（FloatShell）原生系统通知的网页侧出口。
// 转交给壳注入的原生桥：window.AndroidShell.notify(title, body, avatarUrl, sessionId) -> Boolean
// 壳侧用 NotificationManager 发到「角色消息」渠道，并尽量把角色头像作为大图标。

type ShellNotificationBridge = {
    notify?: (title: string, body: string, avatarUrl: string, sessionId?: string) => boolean;
};

const MAX_AVATAR_URL_CHARS = 2_000_000;

function getBridge(): ShellNotificationBridge | null {
    if (typeof window === "undefined") return null;
    const bridge = (window as unknown as { AndroidShell?: ShellNotificationBridge }).AndroidShell;
    return bridge && typeof bridge.notify === "function" ? bridge : null;
}

export function canSendShellNotification(): boolean {
    return getBridge() !== null;
}

function normalizeAvatar(avatar?: string | null): string {
    const value = typeof avatar === "string" ? avatar.trim() : "";
    if (!value || value.length > MAX_AVATAR_URL_CHARS) return "";
    // 相对路径补全为完整 URL，方便 Android 原生壳 OkHttp 下载作为大图标
    if (value.startsWith("/") && typeof window !== "undefined" && window.location?.origin) {
        try {
            return new URL(value, window.location.origin).toString();
        } catch {
            return "";
        }
    }
    // SVG 无法被 Android 原生 BitmapFactory 直接解码为 Bitmap，若为 svg 则不作为大图标传给原生
    if (value.startsWith("data:image/svg+xml")) {
        return "";
    }
    if (value.startsWith("data:image/") || value.startsWith("http://") || value.startsWith("https://")) {
        return value;
    }
    return "";
}

let lastNoticeKey = "";
let lastNoticeAt = 0;
const NOTICE_DEDUPE_WINDOW_MS = 250;

export function sendShellNotification(
    title: string,
    body: string,
    avatar?: string | null,
    sessionId?: string | null,
): boolean {
    const bridge = getBridge();
    if (!bridge) return false;
    const noticeKey = `${title}\u0000${body}`;
    const now = Date.now();
    if (noticeKey === lastNoticeKey && now - lastNoticeAt < NOTICE_DEDUPE_WINDOW_MS) return true;
    lastNoticeKey = noticeKey;
    lastNoticeAt = now;
    try {
        return bridge.notify?.(title || "Float", body || "", normalizeAvatar(avatar), sessionId || "") === true;
    } catch {
        return false;
    }
}
