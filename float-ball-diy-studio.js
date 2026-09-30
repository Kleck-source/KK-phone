/**
 * 悬浮球 DIY 工作台 (Float Ball DIY Studio)
 * 自带随身球实装DIY + 黄金比例微胖圆润爱心 + 原厂初始底稿(图2) ⇋ 自定义DIY秒切 + Ins白底深灰图标
 * API Version: 1
 */

const STORAGE_KEY = "float_ball_diy_custom_balls_permanent";
const ACTIVE_BALL_STORAGE_KEY = "float_ball_diy_active_id_permanent";
const SCROLL_POS_STORAGE_KEY = "float_ball_diy_scroll_pos_permanent";
const SLIDERS_LOCK_STORAGE_KEY = "float_ball_diy_sliders_locked_permanent";

// 65 款 Ins 极简矢量图标
const INS_WHITE_ICONS = [
  { id: "sparkles", name: "星芒", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>` },
  { id: "star_sharp", name: "四芒星", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2"/></svg>` },
  { id: "moon", name: "弯月", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>` },
  { id: "sun", name: "日光", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>` },
  { id: "cloud", name: "云朵", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>` },
  { id: "heart", name: "爱心", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>` },
  { id: "diamond", name: "钻石", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M11 3 8 9l4 12 4-12-3-6"/><path d="M2 9h20"/></svg>` },
  { id: "wand", name: "魔杖", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 4-2 2"/><path d="m15 9-2 2"/><path d="m19 8-2 2"/><path d="M20 3a1 1 0 0 0-1-1c-4 0-7 3-7 7a1 1 0 0 0 1 1c4 0 7-3 7-7Z"/><path d="m2 22 10-10"/></svg>` },
  { id: "zap", name: "闪电", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>` },
  { id: "flame", name: "火苗", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>` },
  { id: "flower", name: "樱花", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m4.5 3a4.5 4.5 0 1 1-4.5 4.5M16.5 12H15m-3 4.5a4.5 4.5 0 1 1-4.5-4.5M12 16.5V15m-4.5-3H9"/></svg>` },
  { id: "clover", name: "四叶草", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 3.5a3.5 3.5 0 0 0-3.5 3.5 3.5 3.5 0 0 0-3.5-3.5 3.5 3.5 0 0 0 0 7 3.5 3.5 0 0 0-3.5 3.5 3.5 3.5 0 0 0 7 0 3.5 3.5 0 0 0 3.5 3.5 3.5 3.5 0 0 0 0-7 3.5 3.5 0 0 0 3.5-3.5 3.5 3.5 0 0 0-3.5-3.5z"/><path d="M12 12v9"/></svg>` },
  { id: "message", name: "气泡", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>` },
  { id: "music", name: "音符", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>` },
  { id: "crown", name: "皇冠", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/></svg>` },
  { id: "planet", name: "行星", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12A9 9 0 0 0 9 3m0 0A9 9 0 0 0 3 12m18 0a9 9 0 0 1-9 9m0 0A9 9 0 0 1 3 12m0 0c3.5-3 14.5-3 18 0m-18 0c3.5 3 14.5 3 18 0"/></svg>` },
  { id: "coffee", name: "咖啡", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>` },
  { id: "ghost", name: "幽灵", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/></svg>` },
  { id: "camera", name: "相机", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>` },
  { id: "feather", name: "羽毛", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>` },
  { id: "compass", name: "罗盘", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>` },
  { id: "palette", name: "画板", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"/></svg>` },
  { id: "rocket", name: "火箭", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>` },
  { id: "butterfly", name: "蝴蝶", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 12 7.5-7.5a4.24 4.24 0 0 0-6 0L12 6l-1.5-1.5a4.24 4.24 0 0 0-6 0L12 12Z"/><path d="m12 12 6 6a3.54 3.54 0 0 0 0-5L12 12Z"/><path d="m12 12-6 6a3.54 3.54 0 0 1 0-5L12 12Z"/></svg>` },
  { id: "shield", name: "盾牌", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>` },
  { id: "bell", name: "风铃", svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>` },
];

function parseColorToHexAlpha(colorStr, fallbackHex = "#6366f1") {
  if (!colorStr) return { hex: fallbackHex, alpha: 0.85 };
  const str = colorStr.trim().toLowerCase();
  if (str.startsWith("#")) {
    let hex = str;
    if (hex.length === 4) hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    return { hex: hex.slice(0, 7), alpha: 0.9 };
  }
  const match = str.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s\/]+([\d.]+))?\)/);
  if (match) {
    const r = parseInt(match[1], 10).toString(16).padStart(2, "0");
    const g = parseInt(match[2], 10).toString(16).padStart(2, "0");
    const b = parseInt(match[3], 10).toString(16).padStart(2, "0");
    const alpha = match[4] !== undefined ? parseFloat(match[4]) : 0.9;
    return { hex: `#${r}${g}${b}`, alpha: Math.min(1, Math.max(0, alpha)) };
  }
  return { hex: fallbackHex, alpha: 0.85 };
}

function formatCleanWhiteSvg(rawSvg) {
  if (!rawSvg) return "";
  let clean = rawSvg.replace(/stroke="[^"]*"/g, `stroke="#ffffff"`);
  clean = clean.replace(/fill="((?!none)[^"]*)"/g, `fill="#ffffff"`);
  return clean;
}

function formatDarkIconSvg(rawSvg, darkColor = "#334155") {
  if (!rawSvg) return "";
  let clean = rawSvg.replace(/stroke="[^"]*"/g, `stroke="${darkColor}"`);
  clean = clean.replace(/fill="((?!none)[^"]*)"/g, `fill="${darkColor}"`);
  return clean;
}

// 💖 黄金比例微胖圆润饱满爱心 clip-path (自然舒展饱满，拒绝瘦长)
function ensureHeartClipPathSvg() {
  if (typeof document === "undefined") return;
  let existing = document.getElementById("fbd-svg-defs");
  if (existing) existing.remove();

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.id = "fbd-svg-defs";
  svg.style.cssText = "position: absolute; width: 0; height: 0; pointer-events: none;";
  svg.innerHTML = `
    <defs>
      <clipPath id="fbd-heart-clip" clipPathUnits="objectBoundingBox">
        <path d="M 0.5, 0.22 C 0.5, 0.075, 0.35, 0, 0.22, 0 C 0.08, 0, 0, 0.13, 0, 0.31 C 0, 0.55, 0.23, 0.71, 0.5, 1 C 0.77, 0.71, 1, 0.55, 1, 0.31 C 1, 0.13, 0.92, 0, 0.78, 0 C 0.65, 0, 0.5, 0.075, 0.5, 0.22 Z"/>
      </clipPath>
    </defs>
  `;
  document.body.appendChild(svg);
}

function toRgba(hex, alpha = 1) {
  if (!hex) return "transparent";
  if (hex.startsWith("rgba") || hex.startsWith("rgb")) return hex;
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map((x) => x + x).join("");
  const num = parseInt(c, 16);
  if (isNaN(num)) return hex;
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

// ─── 经典纯净 CSS 渐变渲染 ───
function getBackgroundRule(ball) {
  let gradBg = "";
  if (ball.gradientMode === "solid") {
    gradBg = toRgba(ball.solidColor, ball.solidAlpha);
  } else if (ball.gradientMode === "linear") {
    const c1 = toRgba(ball.linearColor1, ball.linearAlpha1);
    const c2 = toRgba(ball.linearColor2, ball.linearAlpha2);
    const c3 = toRgba(ball.linearColor3, ball.linearAlpha3);
    gradBg = `linear-gradient(${ball.linearAngle || 135}deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`;
  } else {
    const cCenter = toRgba(ball.radialCenterColor, ball.radialCenterAlpha);
    const cMid = toRgba(ball.radialMidColor, ball.radialMidAlpha);
    const cEdge = toRgba(ball.radialEdgeColor, ball.radialEdgeAlpha);
    const r = ball.spreadRadius ?? 75;
    gradBg = `radial-gradient(circle at 50% 50%, ${cCenter} 0%, ${cMid} ${Math.round(r * 0.55)}%, ${cEdge} ${r}%)`;
  }

  if (ball.bgImageUrl && ball.bgImageUrl.trim()) {
    const overlayRgba = toRgba("#000000", 1 - (ball.bgImageOpacity ?? 0.85));
    return `background-image: linear-gradient(${overlayRgba}, ${overlayRgba}), url("${ball.bgImageUrl.trim()}"), ${gradBg} !important; background-size: cover !important; background-position: center !important;`;
  }

  return `background: ${gradBg} !important;`;
}

// 形状规则
function getShapeRule(ball) {
  if (ball.shape === "native") {
    return `border-radius: ${ball.rawSnapshotRadius || "50%"} !important; clip-path: none !important; overflow: hidden !important;`;
  }
  if (ball.shape === "circle") {
    return `border-radius: 50% !important; clip-path: none !important; overflow: hidden !important;`;
  }
  if (ball.shape === "squircle") {
    return `border-radius: ${ball.radiusPct || 24}% !important; clip-path: none !important; overflow: hidden !important;`;
  }
  if (ball.shape === "heart") {
    return `border-radius: 0 !important; clip-path: url(#fbd-heart-clip) !important;`;
  }
  if (ball.shape === "hexagon") {
    return `border-radius: 0 !important; clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%) !important;`;
  }
  if (ball.shape === "star") {
    return `border-radius: 0 !important; clip-path: polygon(50% 0%, 63% 34%, 98% 36%, 71% 59%, 80% 95%, 50% 75%, 20% 95%, 29% 59%, 2% 36%, 37% 34%) !important;`;
  }
  if (ball.shape === "diamond") {
    return `border-radius: 0 !important; clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%) !important;`;
  }
  return `border-radius: 50% !important; clip-path: none !important;`;
}

// 构造单球初始数据（封存原厂高质感初始底稿 initialDraft，图2 模样）
const createNewBallRecord = (name, selector, elementTag = "", rawSnapshotObj = {}) => {
  const c1 = parseColorToHexAlpha(rawSnapshotObj.color1, "#bfdbfe");
  const c2 = parseColorToHexAlpha(rawSnapshotObj.color2, "#c084fc");
  const c3 = parseColorToHexAlpha(rawSnapshotObj.color3, "#6366f1");
  const whiteSvg = formatCleanWhiteSvg(rawSnapshotObj.svg);

  // 封存抓取到的初始高质感底稿 (图2)
  const initialDraft = {
    shape: "native",
    sizeScale: 1.0,
    radiusPct: 24,
    opacity: 0.95,
    dockOpacity: 0.55,
    dockOffsetRatio: 30,
    gradientMode: "radial_spread",
    radialCenterColor: c1.hex,
    radialCenterAlpha: c1.alpha,
    radialMidColor: c2.hex,
    radialMidAlpha: c2.alpha,
    radialEdgeColor: c3.hex,
    radialEdgeAlpha: c3.alpha,
    spreadRadius: 75,
    linearAngle: 135,
    linearColor1: c1.hex,
    linearAlpha1: c1.alpha,
    linearColor2: c2.hex,
    linearAlpha2: c2.alpha,
    linearColor3: c3.hex,
    linearAlpha3: c3.alpha,
    solidColor: c3.hex,
    solidAlpha: c3.alpha,
    bgImageUrl: "",
    bgImageOpacity: 0.85,
    blur: 24,
    borderWidth: 1.5,
    borderColor: "#ffffff",
    borderAlpha: 0.75,
    shadowColor: c3.hex,
    shadowAlpha: 0.35,
    shadowBlur: 18,
    insetGlowColor: "#ffffff",
    insetGlowAlpha: 0.45,
    selectedIconId: "", // 保持纯白原生图标
    customEmoji: "",
    customImageUrl: "",
    iconColor: "#ffffff",
    iconOffsetX: 0,
    iconOffsetY: 0,
    iconSizeScale: 1.0,
    animation: "none",
  };

  return {
    id: "ball_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6),
    name: name || "新悬浮球",
    selector: selector || "",
    elementTag: elementTag || "",
    rawSnapshotRadius: rawSnapshotObj.radius || "50%",
    rawSnapshotIconSvg: whiteSvg,
    rawNativeIconName: rawSnapshotObj.customIconName || name || "原生图标",
    customized: true, // 刚收录时开启定制
    initialDraft,
    ...JSON.parse(JSON.stringify(initialDraft)),
  };
};

export default {
  manifest: {
    id: "float-ball-diy-studio",
    name: "悬浮球 DIY 工作台",
    apiVersion: 1,
    version: "21.0.0",
    author: "小坊",
    description: "自带随身球实装DIY，微胖圆润饱满爱心，原厂初始纯净质感(图2) ⇋ 自定义DIY动态切换！",
    permissions: [],
    settings: [
      { key: "showHelperBall", label: "在屏幕侧边显示工作台快捷悬浮球", type: "boolean", default: true },
    ],
  },

  setup(ctx) {
    ensureHeartClipPathSvg();
    let ballList = loadBallList();
    let injectedStyleRemover = null;
    let syncInterval = null;
    let helperBallEl = null;

    function loadBallList() {
      try {
        const raw = ctx.system.storage.get(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
        for (let v = 20; v >= 1; v--) {
          const oldKey = `float_ball_diy_custom_balls_v${v}`;
          const oldRaw = ctx.system.storage.get(oldKey) || localStorage.getItem(oldKey);
          if (oldRaw) {
            const oldParsed = typeof oldRaw === "string" ? JSON.parse(oldRaw) : oldRaw;
            if (Array.isArray(oldParsed) && oldParsed.length > 0) {
              try {
                ctx.system.storage.set(STORAGE_KEY, oldParsed);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(oldParsed));
              } catch (e) {}
              return oldParsed;
            }
          }
        }
      } catch (e) {}
      return [];
    }

    function saveBallList(list) {
      ballList = list;
      try {
        ctx.system.storage.set(STORAGE_KEY, list);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (e) {}
      applyCustomStyles();
    }

    function getActiveBallId() {
      try {
        return localStorage.getItem(ACTIVE_BALL_STORAGE_KEY) || ballList[0]?.id || "";
      } catch (e) {
        return ballList[0]?.id || "";
      }
    }

    function setActiveBallId(id) {
      try {
        localStorage.setItem(ACTIVE_BALL_STORAGE_KEY, id);
      } catch (e) {}
    }

    function loadLockedSliders() {
      try {
        const raw = localStorage.getItem(SLIDERS_LOCK_STORAGE_KEY);
        return new Set(raw ? JSON.parse(raw) : []);
      } catch (e) {
        return new Set();
      }
    }

    function saveLockedSliders(lockedSet) {
      try {
        localStorage.setItem(SLIDERS_LOCK_STORAGE_KEY, JSON.stringify(Array.from(lockedSet)));
      } catch (e) {}
    }

    function ensureDomTags() {
      if (typeof document === "undefined") return;
      ballList.forEach((ball) => {
        if (!ball.selector) return;
        try {
          const el = document.querySelector(ball.selector);
          if (el && ball.elementTag && !el.getAttribute("data-fb-diy-id")) {
            el.setAttribute("data-fb-diy-id", ball.elementTag);
          }
        } catch (e) {}
      });
    }

    function applyCustomStyles() {
      if (injectedStyleRemover) {
        try {
          injectedStyleRemover();
        } catch (e) {}
        injectedStyleRemover = null;
      }

      ensureDomTags();

      const activeCustomBalls = ballList.filter((b) => b.customized && b.selector);
      if (activeCustomBalls.length === 0) return;

      let css = `
        @keyframes fbd-soft-breathe { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.15); } }
        @keyframes fbd-soft-pulse { 0%, 100% { filter: brightness(1) drop-shadow(0 0 2px rgba(255,255,255,0.2)); } 50% { filter: brightness(1.28) drop-shadow(0 0 8px rgba(255,255,255,0.7)); } }
        @keyframes fbd-soft-rainbow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
      `;

      activeCustomBalls.forEach((ball) => {
        const borderRgba = toRgba(ball.borderColor, ball.borderAlpha);
        const shadowRgba = toRgba(ball.shadowColor, ball.shadowAlpha);
        const insetRgba = toRgba(ball.insetGlowColor, ball.insetGlowAlpha);

        let animRule = "";
        if (ball.animation === "breathe") animRule = "animation: fbd-soft-breathe 3.2s ease-in-out infinite !important;";
        if (ball.animation === "pulse") animRule = "animation: fbd-soft-pulse 2.2s ease-in-out infinite !important;";
        if (ball.animation === "rainbow") animRule = "animation: fbd-soft-rainbow 5s linear infinite !important;";

        const isMascot = ball.selector.includes("mascot");
        const isHelper = ball.selector.includes("fbd-helper-ball");
        const scaleVal = ball.sizeScale || 1.0;
        const iconScale = ball.iconSizeScale || 1.0;
        const ox = ball.iconOffsetX || 0;
        const oy = ball.iconOffsetY || 0;

        if (isMascot) {
          css += `
            ${ball.selector}, .mascot-flight-img {
              opacity: ${ball.opacity} !important;
              filter: drop-shadow(0 4px ${ball.shadowBlur}px ${shadowRgba}) !important;
              ${animRule}
            }
          `;
          if (ball.customImageUrl && ball.customImageUrl.trim()) {
            css += `
              .mascot-float-img, .mascot-flight-img {
                content: url("${ball.customImageUrl.trim()}") !important;
                object-fit: contain !important;
              }
            `;
          } else if (ball.customEmoji && ball.customEmoji.trim()) {
            css += `
              .mascot-float-img { display: none !important; }
              .mascot-float::before {
                content: "${ball.customEmoji.trim()}";
                display: flex; align-items: center; justify-content: center;
                width: 100%; height: 100%; font-size: ${Math.round(30 * scaleVal * iconScale)}px;
              }
            `;
          }
        } else {
          const hasClip = ball.shape === "hexagon" || ball.shape === "star" || ball.shape === "diamond" || ball.shape === "heart";

          const shadowProp = hasClip
            ? `filter: drop-shadow(0 4px ${ball.shadowBlur}px ${shadowRgba}) !important;`
            : `box-shadow: 0 4px ${ball.shadowBlur}px 2px ${shadowRgba}, inset 0 0 14px ${insetRgba} !important; border: ${ball.borderWidth}px solid ${borderRgba} !important;`;

          const sizeRule = scaleVal !== 1.0
            ? `width: calc(56px * ${scaleVal}) !important; height: calc(56px * ${scaleVal}) !important;`
            : ``;

          const hasCustomIconReplacement = (ball.selectedIconId && ball.selectedIconId !== "native_self" && !ball.selectedIconId.startsWith("native_")) || ball.customEmoji || ball.customImageUrl;

          // 若自定义了自带随身球，彻底去除其自带伪元素与动画干扰
          const helperOverride = isHelper ? `
            .fbd-helper-ball::after { display: none !important; }
          ` : ``;

          css += `
            ${ball.selector} {
              position: fixed !important;
              ${getShapeRule(ball)}
              ${getBackgroundRule(ball)}
              opacity: ${ball.opacity} !important;
              backdrop-filter: blur(${ball.blur}px) saturate(160%) !important;
              -webkit-backdrop-filter: blur(${ball.blur}px) saturate(160%) !important;
              ${shadowProp}
              ${sizeRule}
              color: ${ball.iconColor || "#ffffff"} !important;
              ${animRule}
            }

            ${helperOverride}

            ${ball.selector}.is-docked, ${ball.selector}[data-docked] {
              opacity: ${ball.dockOpacity || 0.55} !important;
            }

            ${ball.selector}::after {
              display: none !important;
            }
          `;

          if (ball.selectedIconId === "none") {
            css += `
              ${ball.selector} svg, ${ball.selector} img, ${ball.selector} i, ${ball.selector} > * {
                display: none !important;
              }
              ${ball.selector}::before {
                display: none !important;
              }
            `;
          } else {
            if (!hasCustomIconReplacement) {
              css += `
                ${ball.selector} svg, ${ball.selector} img, ${ball.selector} i, ${ball.selector} > * {
                  color: ${ball.iconColor || "#ffffff"} !important;
                  stroke: ${ball.iconColor || "#ffffff"} !important;
                  transform: translate(${ox}px, ${oy}px) scale(${iconScale}) !important;
                  transform-origin: center center !important;
                  position: relative !important;
                  z-index: 10 !important;
                  display: inline-flex !important;
                  pointer-events: none !important;
                }
              `;
            } else {
              let iconSvg = "";
              const matchedIns = INS_WHITE_ICONS.find((i) => i.id === ball.selectedIconId);
              if (matchedIns) iconSvg = matchedIns.svg;

              if (iconSvg) {
                let formattedSvg = iconSvg.replace(/stroke="[^"]*"/g, `stroke="${ball.iconColor || "#ffffff"}"`);
                formattedSvg = formattedSvg.replace(/fill="((?!none)[^"]*)"/g, `fill="${ball.iconColor || "#ffffff"}"`);
                const svgEncoded = encodeURIComponent(formattedSvg);
                css += `
                  ${ball.selector} svg, ${ball.selector} img { display: none !important; }
                  ${ball.selector}::before {
                    content: "" !important;
                    position: absolute !important;
                    left: 50% !important;
                    top: 50% !important;
                    transform: translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px)) scale(${iconScale}) !important;
                    width: calc(24px * ${scaleVal}) !important;
                    height: calc(24px * ${scaleVal}) !important;
                    background: url("data:image/svg+xml,${svgEncoded}") center/contain no-repeat !important;
                    pointer-events: none !important;
                    z-index: 10 !important;
                  }
                `;
              } else if (ball.customImageUrl && ball.customImageUrl.trim()) {
                css += `
                  ${ball.selector} svg, ${ball.selector} img { display: none !important; }
                  ${ball.selector}::before {
                    content: "" !important;
                    position: absolute !important;
                    left: 50% !important;
                    top: 50% !important;
                    transform: translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px)) scale(${iconScale}) !important;
                    width: calc(34px * ${scaleVal}) !important;
                    height: calc(34px * ${scaleVal}) !important;
                    background: url("${ball.customImageUrl.trim()}") center/contain no-repeat !important;
                    pointer-events: none !important;
                    z-index: 10 !important;
                  }
                `;
              } else if (ball.customEmoji && ball.customEmoji.trim()) {
                css += `
                  ${ball.selector} svg, ${ball.selector} img { display: none !important; }
                  ${ball.selector}::before {
                    content: "${ball.customEmoji.trim()}" !important;
                    position: absolute !important;
                    left: 50% !important;
                    top: 50% !important;
                    transform: translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px)) scale(${iconScale}) !important;
                    font-size: ${Math.round(20 * scaleVal)}px !important;
                    line-height: 1 !important;
                    pointer-events: none !important;
                    z-index: 10 !important;
                  }
                `;
              }
            }
          }
        }
      });

      injectedStyleRemover = ctx.ui.injectCSS(css);
    }

    function startTargetPicker(onPicked) {
      const overlay = document.createElement("div");
      overlay.id = "fbd-picker-layer";
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 999999;
        background: rgba(15, 23, 42, 0.45);
        cursor: crosshair;
        display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
        padding-top: 50px; font-family: system-ui, sans-serif;
      `;

      const tip = document.createElement("div");
      tip.style.cssText = `
        padding: 10px 22px; border-radius: 999px;
        background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
        color: #fff; font-size: 13px; font-weight: 700;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3); pointer-events: none;
      `;
      tip.textContent = "🎯 准星拾取：请点击屏幕上的悬浮球（按 ESC 退出）";
      overlay.appendChild(tip);

      const highLightBox = document.createElement("div");
      highLightBox.style.cssText = `
        position: fixed; pointer-events: none; border: 2px dashed #6366f1;
        background: rgba(99, 102, 241, 0.25); border-radius: 50%; z-index: 999999;
        transition: all 0.08s ease; display: none;
      `;
      document.body.appendChild(highLightBox);

      function findFloatingBallElement(el) {
        let cur = el;
        while (cur && cur !== document.body && cur !== document.documentElement) {
          if (cur.classList.contains("app-icon") || cur.closest("[data-ui='app-icon']") || cur.closest(".desktop-app-grid")) {
            return null;
          }
          const rect = cur.getBoundingClientRect();
          const aspect = rect.width / (rect.height || 1);
          if (rect.width >= 24 && rect.width <= 140 && rect.height >= 24 && rect.height <= 140 && aspect >= 0.65 && aspect <= 1.5) {
            return cur;
          }
          cur = cur.parentElement;
        }
        return el;
      }

      const handlePointerMove = (e) => {
        overlay.style.pointerEvents = "none";
        const rawTarget = document.elementFromPoint(e.clientX, e.clientY);
        overlay.style.pointerEvents = "auto";
        const target = findFloatingBallElement(rawTarget);

        if (target && target !== document.body && target !== document.documentElement && !target.closest("#fbd-picker-layer")) {
          const r = target.getBoundingClientRect();
          highLightBox.style.display = "block";
          highLightBox.style.left = `${r.left - 3}px`;
          highLightBox.style.top = `${r.top - 3}px`;
          highLightBox.style.width = `${r.width + 6}px`;
          highLightBox.style.height = `${r.height + 6}px`;
        } else {
          highLightBox.style.display = "none";
        }
      };

      const handlePointerDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        overlay.style.pointerEvents = "none";
        const rawTarget = document.elementFromPoint(e.clientX, e.clientY);
        const target = findFloatingBallElement(rawTarget);
        cleanup();

        if (target && target !== document.body && target !== document.documentElement) {
          let selector = "";
          let name = "新拾取悬浮球";
          let tag = "fb_" + Date.now().toString(36);

          const computed = window.getComputedStyle(target);
          const bgStr = computed.backgroundImage || computed.background || computed.backgroundColor || "";
          const svgEl = target.querySelector("svg");
          const colorsFound = bgStr.match(/rgba?\([^)]+\)/g) || [];

          const rawSnapshotObj = {
            html: target.innerHTML || "",
            bg: bgStr,
            radius: computed.borderRadius || "50%",
            svg: svgEl ? svgEl.outerHTML : "",
            color1: colorsFound[0] || computed.backgroundColor || "#bfdbfe",
            color2: colorsFound[1] || colorsFound[0] || "#c084fc",
            color3: colorsFound[2] || colorsFound[1] || colorsFound[0] || "#6366f1",
          };

          if (target.classList.contains("fbd-helper-ball") || target.closest(".fbd-helper-ball")) {
            selector = ".fbd-helper-ball";
            name = "🔮 工作台随身球";
          } else if (target.classList.contains("mascot-float") || target.querySelector(".mascot-float-img")) {
            selector = ".mascot-float";
            name = "🐱 小卷 / AI助手";
          } else if (target.classList.contains("quick-action-float-button")) {
            selector = ".quick-action-float-button";
            name = "⚡ 快捷操作球";
          } else if (target.classList.contains("prompt-viewer-float-button")) {
            selector = ".prompt-viewer-float-button:not(.quick-action-float-button)";
            name = "📄 提示词查看器";
          } else {
            target.setAttribute("data-fb-diy-id", tag);
            selector = `[data-fb-diy-id="${tag}"]`;
            if (target.id) {
              name = `悬浮球 (#${target.id})`;
            } else if (target.className && typeof target.className === "string") {
              const mainCls = target.className.trim().split(/\s+/)[0];
              name = `悬浮球 (.${mainCls})`;
            } else {
              name = `悬浮球 (${tag})`;
            }
          }

          onPicked(name, selector, tag, rawSnapshotObj);
        }
      };

      const handleKeyDown = (e) => {
        if (e.key === "Escape") cleanup();
      };

      function cleanup() {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("keydown", handleKeyDown);
        overlay.remove();
        highLightBox.remove();
      }

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("keydown", handleKeyDown);
      overlay.addEventListener("pointerdown", handlePointerDown);
      document.body.appendChild(overlay);
    }

    function renderHelperBall() {
      if (helperBallEl) {
        helperBallEl.remove();
        helperBallEl = null;
      }
      if (ctx.system.settings.get("showHelperBall") === false) return;

      const helperCss = `
        .fbd-helper-ball {
          position: fixed; z-index: 100001; width: 56px; height: 56px;
          display: grid; place-items: center; padding: 0; border: 0; border-radius: 999px;
          color: #fff;
          background: radial-gradient(circle at 45% 40%, rgba(251, 211, 141, 0.85) 0%, rgba(246, 173, 85, 0.6) 32%, rgba(254, 240, 138, 0.22) 58%, transparent 74%);
          box-shadow: 0 0 20px 4px rgba(245, 158, 11, 0.18), 0 4px 12px rgba(217, 119, 6, 0.14);
          cursor: grab; pointer-events: auto; touch-action: none;
          transform: scale(.75); animation: fbd-helper-idle 3s ease-in-out infinite;
          transition: transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease;
          -webkit-tap-highlight-color: transparent;
        }
        .fbd-helper-ball::after {
          content: ""; position: absolute; inset: -6px; border-radius: inherit;
          background: radial-gradient(circle at 45% 40%, rgba(254, 240, 138, 0.18) 0%, transparent 66%);
          pointer-events: none;
        }
        .fbd-helper-ball svg { width: 23px; height: 23px; pointer-events: none; }
        .fbd-helper-ball:active, .fbd-helper-ball[data-dragging] {
          cursor: grabbing; transform: scale(.94); animation: none;
          box-shadow: 0 0 28px 6px rgba(245, 158, 11, 0.25), 0 5px 15px rgba(217, 119, 6, 0.18);
        }
        .fbd-helper-ball[data-docked] {
          opacity: .55; transform: translateX(36px) scale(.75); animation: none;
          transition: transform 320ms cubic-bezier(.25,.8,.25,1), opacity 240ms ease, box-shadow 180ms ease;
        }
        .fbd-helper-ball[data-docked][data-dock-side="left"] { transform: translateX(-36px) scale(.75); }
        .fbd-helper-ball[data-docked]:hover { opacity: .9; transform: translateX(24px) scale(.78); }
        .fbd-helper-ball[data-docked][data-dock-side="left"]:hover { transform: translateX(-24px) scale(.78); }
        @keyframes fbd-helper-idle { 0%,100% { transform:scale(.75) } 50% { transform:scale(.78) } }
      `;
      ctx.ui.injectCSS(helperCss);

      helperBallEl = document.createElement("button");
      helperBallEl.type = "button";
      helperBallEl.className = "fbd-helper-ball";
      helperBallEl.setAttribute("aria-label", "悬浮球 DIY 工作台");
      helperBallEl.title = "打开 DIY 工作台";
      helperBallEl.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`;

      const getViewport = () => ({
        width: window.visualViewport?.width || document.documentElement.clientWidth || window.innerWidth,
        height: window.visualViewport?.height || document.documentElement.clientHeight || window.innerHeight,
      });

      const clampPos = (pos) => {
        const { width, height } = getViewport();
        return {
          left: Math.min(Math.max(8, Number(pos?.left) || 8), Math.max(8, width - 64)),
          top: Math.min(Math.max(8, Number(pos?.top) || 8), Math.max(8, height - 64)),
        };
      };

      const setPos = (pos) => {
        const next = clampPos(pos);
        helperBallEl.style.left = `${next.left}px`;
        helperBallEl.style.top = `${next.top}px`;
        helperBallEl.style.right = "auto";
        helperBallEl.style.bottom = "auto";
        return next;
      };

      const undock = () => {
        delete helperBallEl.dataset.docked;
        delete helperBallEl.dataset.dockSide;
      };

      const dock = (pos) => {
        const { width } = getViewport();
        const next = clampPos(pos);
        const side = next.left + 28 < width / 2 ? "left" : "right";
        setPos({ left: side === "left" ? 18 : Math.max(18, width - 56 - 18), top: next.top });
        helperBallEl.dataset.docked = "";
        helperBallEl.dataset.dockSide = side;
      };

      const { width, height } = getViewport();
      dock({ left: width - 74, top: height - 226 });

      let drag = null;
      let suppressClick = false;

      helperBallEl.addEventListener("pointerdown", (e) => {
        e.stopPropagation();
        drag = {
          id: e.pointerId,
          startX: e.clientX,
          startY: e.clientY,
          left: parseFloat(helperBallEl.style.left) || helperBallEl.getBoundingClientRect().left,
          top: parseFloat(helperBallEl.style.top) || helperBallEl.getBoundingClientRect().top,
          moved: false,
        };
        undock();
        helperBallEl.setPointerCapture(e.pointerId);
      });

      helperBallEl.addEventListener("pointermove", (e) => {
        if (!drag || drag.id !== e.pointerId) return;
        const dx = e.clientX - drag.startX;
        const dy = e.clientY - drag.startY;
        if (!drag.moved && Math.abs(dx) <= 4 && Math.abs(dy) <= 4) return;
        drag.moved = true;
        drag.hasMoved = true;
        helperBallEl.dataset.dragging = "";
        e.preventDefault();
        setPos({ left: drag.left + dx, top: drag.top + dy });
      });

      const finishDrag = (e) => {
        if (!drag || drag.id !== e.pointerId) return;
        if (drag.moved) {
          suppressClick = true;
          const rect = helperBallEl.getBoundingClientRect();
          dock({ left: rect.left, top: rect.top });
        } else {
          dock({ left: drag.left, top: drag.top });
        }
        delete helperBallEl.dataset.dragging;
        drag = null;
        if (helperBallEl.hasPointerCapture(e.pointerId)) helperBallEl.releasePointerCapture(e.pointerId);
      };

      helperBallEl.addEventListener("pointerup", finishDrag);
      helperBallEl.addEventListener("pointercancel", finishDrag);

      helperBallEl.addEventListener("click", (e) => {
        e.stopPropagation();
        if (suppressClick) {
          suppressClick = false;
          return;
        }
        openStudioModal();
      });

      document.body.appendChild(helperBallEl);
    }

    function openRenameDialog(container, currentName, onConfirm) {
      const renameOverlay = document.createElement("div");
      renameOverlay.style.cssText = `
        position: absolute; inset: 0; z-index: 200;
        background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center;
        padding: 16px; box-sizing: border-box; animation: fbd-fade-in 0.15s ease-out;
      `;

      renameOverlay.innerHTML = `
        <div style="
          width: min(320px, 86vw); border-radius: 20px; background: #ffffff;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.2); padding: 18px;
          display: flex; flex-direction: column; gap: 12px; box-sizing: border-box;
        ">
          <div style="font-size: 14.5px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 6px;">
            <span>✏️ 设置原生图标自定义备注名</span>
          </div>
          <span style="font-size: 11.5px; color: #64748b; line-height: 1.4;">
            原名: ${currentName || "原生图标"} (留空则恢复默认)
          </span>
          <input id="fbd-rename-input" type="text" value="${currentName || ""}" placeholder="输入新备注名" style="
            width: 100%; padding: 9px 12px; border-radius: 12px; border: 1.5px solid #6366f1;
            background: #f8fafc; color: #0f172a; font-size: 13px; font-weight: 600; outline: none; box-sizing: border-box;
          " />
          <div style="display: flex; gap: 10px; margin-top: 4px;">
            <button id="fbd-rename-cancel" style="
              flex: 1; padding: 9px 0; border-radius: 12px; border: none;
              background: #f1f5f9; color: #475569; font-size: 13px; font-weight: 700; cursor: pointer;
            ">取消</button>
            <button id="fbd-rename-save" style="
              flex: 1; padding: 9px 0; border-radius: 12px; border: none;
              background: #0f172a; color: #ffffff; font-size: 13px; font-weight: 700; cursor: pointer;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            ">确定保存</button>
          </div>
        </div>
      `;

      const closeRename = () => renameOverlay.remove();
      renameOverlay.querySelector("#fbd-rename-cancel")?.addEventListener("click", closeRename);
      renameOverlay.querySelector("#fbd-rename-save")?.addEventListener("click", () => {
        const val = renameOverlay.querySelector("#fbd-rename-input")?.value?.trim();
        onConfirm(val);
        closeRename();
      });

      const inp = renameOverlay.querySelector("#fbd-rename-input");
      setTimeout(() => {
        inp?.focus();
        inp?.select();
      }, 50);

      container.appendChild(renameOverlay);
    }

    function openInnerIconPicker(modalEl, currentBall, onSelected) {
      const pickerLayer = document.createElement("div");
      pickerLayer.style.cssText = `
        position: absolute; inset: 0; z-index: 100;
        background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(30px);
        display: flex; flex-direction: column; overflow: hidden;
        animation: fbd-fade-in 0.15s ease-out; box-sizing: border-box; width: 100%;
      `;

      const renderPickerContent = () => {
        const nativeIcons = ballList.filter((b) => b.rawSnapshotIconSvg);

        pickerLayer.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px 12px;border-bottom:1px solid rgba(0,0,0,0.06);flex-shrink:0;">
            <span style="font-size:15px;font-weight:800;color:#0f172a;">✨ 挑选图标 / 原生图标</span>
            <button id="fbd-picker-close-btn" style="background:rgba(0,0,0,0.06);border:none;width:30px;height:30px;border-radius:50%;cursor:pointer;color:#64748b;font-size:14px;">✕</button>
          </div>
          <div style="flex:1;overflow-y:auto;overflow-x:hidden;padding:14px;display:flex;flex-direction:column;gap:14px;box-sizing:border-box;width:100%;">
            <button class="fbd-modal-icon-btn" data-icon-id="none" style="
              width: 100%; padding: 12px 14px; border-radius: 14px; border: 1.5px dashed ${currentBall.selectedIconId === "none" ? "#6366f1" : "rgba(0,0,0,0.12)"};
              background: ${currentBall.selectedIconId === "none" ? "#f5f3ff" : "#ffffff"};
              color: ${currentBall.selectedIconId === "none" ? "#6366f1" : "#475569"};
              display: flex; align-items: center; justify-content: space-between; cursor: pointer;
            ">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:18px;">🚫</span>
                <span style="font-size:13px;font-weight:700;">不使用图标 (仅纯粹展示背景图片)</span>
              </div>
              <span style="font-size:11px;font-weight:600;opacity:0.7;">点击选定</span>
            </button>

            ${
              nativeIcons.length > 0
                ? `
              <div style="display:flex;flex-direction:column;gap:8px;">
                <span style="font-size:12px;font-weight:800;color:#64748b;">⭐ 已收录悬浮球原生图标 (点击名字可改名)</span>
                <div style="display:grid;grid-template-columns:repeat(4, minmax(0, 1fr));gap:10px;width:100%;box-sizing:border-box;">
                  ${nativeIcons.map((b) => {
                    const isCurrent = currentBall.selectedIconId === "native_" + b.id || (currentBall.id === b.id && (currentBall.selectedIconId === "native_self" || !currentBall.selectedIconId));
                    const displayName = b.rawNativeIconName || b.name || "原生图标";
                    const formattedSvg = formatDarkIconSvg(b.rawSnapshotIconSvg, isCurrent ? "#ffffff" : "#334155");
                    return `
                      <div style="
                        width: 100%; aspect-ratio: 1; border-radius: 14px; border: 1px solid ${isCurrent ? "#6366f1" : "rgba(0,0,0,0.06)"};
                        background: ${isCurrent ? "#6366f1" : "#f8fafc"};
                        color: ${isCurrent ? "#ffffff" : "#334155"};
                        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
                        cursor: pointer; padding: 4px; box-sizing: border-box; transition: all 0.15s ease;
                      ">
                        <div class="fbd-native-icon-select" data-icon-id="native_${b.id}" style="width:100%;flex:1;display:grid;place-items:center;">
                          <div style="width:20px;height:20px;display:grid;place-items:center;">${formattedSvg}</div>
                        </div>
                        <span class="fbd-native-icon-rename" data-ball-id="${b.id}" style="font-size:9.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90%;text-decoration:underline;text-underline-offset:2px;">${displayName}</span>
                      </div>
                    `;
                  }).join("")}
                </div>
              </div>
            `
                : ""
            }

            <div style="display:flex;flex-direction:column;gap:8px;">
              <span style="font-size:12px;font-weight:800;color:#64748b;">✨ Ins 极简矢量图标 (65款)</span>
              <div style="display:grid;grid-template-columns:repeat(4, minmax(0, 1fr));gap:10px;width:100%;box-sizing:border-box;">
                ${INS_WHITE_ICONS.map(
                  (i) => `
                  <button class="fbd-modal-icon-btn" data-icon-id="${i.id}" title="${i.name}" style="
                    width: 100%; aspect-ratio: 1; border-radius: 14px; border: 1px solid ${i.id === currentBall.selectedIconId ? "#6366f1" : "rgba(0,0,0,0.06)"};
                    background: ${i.id === currentBall.selectedIconId ? "#6366f1" : "#f8fafc"};
                    color: ${i.id === currentBall.selectedIconId ? "#ffffff" : "#334155"};
                    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
                    cursor: pointer; padding: 4px; box-sizing: border-box; transition: all 0.15s ease;
                  ">
                    <div style="width:20px;height:20px;">${i.svg}</div>
                    <span style="font-size:10px;font-weight:600;opacity:0.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;">${i.name}</span>
                  </button>
                `
                ).join("")}
              </div>
            </div>
          </div>
          <div style="padding:12px 18px;border-top:1px solid rgba(0,0,0,0.06);display:flex;justify-content:space-between;align-items:center;background:#fafafa;flex-shrink:0;">
            <button id="fbd-clear-icon-btn" style="padding:7px 16px;border-radius:10px;border:none;background:rgba(0,0,0,0.06);color:#64748b;font-size:12px;font-weight:600;cursor:pointer;">还原原生图标</button>
            <span style="font-size:11.5px;color:#94a3b8;">点击图标即可秒选</span>
          </div>
        `;

        const closePicker = () => pickerLayer.remove();
        pickerLayer.querySelector("#fbd-picker-close-btn")?.addEventListener("click", closePicker);

        pickerLayer.querySelectorAll(".fbd-modal-icon-btn, .fbd-native-icon-select").forEach((btn) => {
          btn.addEventListener("click", () => {
            const iconId = btn.getAttribute("data-icon-id");
            onSelected(iconId);
            closePicker();
          });
        });

        pickerLayer.querySelectorAll(".fbd-native-icon-rename").forEach((labelEl) => {
          labelEl.addEventListener("click", (e) => {
            e.stopPropagation();
            const targetBallId = labelEl.getAttribute("data-ball-id");
            const targetBall = ballList.find((b) => b.id === targetBallId);
            if (!targetBall) return;
            openRenameDialog(pickerLayer, targetBall.rawNativeIconName || targetBall.name, (newName) => {
              targetBall.rawNativeIconName = newName || targetBall.name;
              saveBallList(ballList);
              renderPickerContent();
            });
          });
        });

        pickerLayer.querySelector("#fbd-clear-icon-btn")?.addEventListener("click", () => {
          onSelected("");
          closePicker();
        });
      };

      renderPickerContent();
      modalEl.appendChild(pickerLayer);
    }

    // ─── 打开悬浮球 DIY 工作台 ───
    function openStudioModal() {
      ctx.ui.openModal((modalEl, { close }) => {
        let tempBallList = JSON.parse(JSON.stringify(ballList));
        let activeBallId = getActiveBallId();

        const lockedSliders = loadLockedSliders();

        modalEl.style.cssText = `
          width: min(440px, 92vw); max-height: 86vh;
          display: flex; flex-direction: column; border-radius: 26px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(35px) saturate(200%);
          -webkit-backdrop-filter: blur(35px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 20px 60px rgba(31, 38, 135, 0.16), 0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 1px #fff;
          color: #1e293b; font-family: system-ui, -apple-system, sans-serif;
          overflow: hidden; position: relative;
        `;

        function render() {
          let currentBall = tempBallList.find((b) => b.id === activeBallId);
          if (!currentBall && tempBallList.length > 0) {
            currentBall = tempBallList[0];
            activeBallId = currentBall.id;
            setActiveBallId(activeBallId);
          }

          let matchedIconSvg = "";
          let matchedIconName = "";
          if (currentBall) {
            if (currentBall.selectedIconId === "none") {
              matchedIconSvg = `<span style="font-size:16px;">🚫</span>`;
              matchedIconName = "不使用图标 (纯背景图)";
            } else if (currentBall.selectedIconId === "native_self" || !currentBall.selectedIconId) {
              matchedIconSvg = currentBall.rawSnapshotIconSvg;
              matchedIconName = (currentBall.rawNativeIconName || currentBall.name) + " (原生图标)";
            } else if (currentBall.selectedIconId && currentBall.selectedIconId.startsWith("native_")) {
              const originBall = tempBallList.find((b) => "native_" + b.id === currentBall.selectedIconId);
              if (originBall && originBall.rawSnapshotIconSvg) {
                matchedIconSvg = originBall.rawSnapshotIconSvg;
                matchedIconName = (originBall.rawNativeIconName || originBall.name) + " (原生图标)";
              }
            } else {
              const matchedIns = INS_WHITE_ICONS.find((i) => i.id === currentBall.selectedIconId);
              if (matchedIns) {
                matchedIconSvg = matchedIns.svg;
                matchedIconName = matchedIns.name;
              }
            }
          }

          let previewTriggerSvg = "";
          if (matchedIconSvg) {
            if (currentBall && currentBall.selectedIconId === "none") {
              previewTriggerSvg = matchedIconSvg;
            } else {
              previewTriggerSvg = formatDarkIconSvg(matchedIconSvg, "#334155");
            }
          }

          const renderLockBtn = (fieldKey) => {
            const isLocked = lockedSliders.has(fieldKey);
            return `
              <button class="fbd-slider-lock-btn ${isLocked ? "is-locked" : ""}" data-lock-key="${fieldKey}" title="${isLocked ? "已锁定(防误触)" : "未锁定(点击锁定)"}">
                ${isLocked ? "🔒" : "🔓"}
              </button>
            `;
          };

          const renderResetBtn = (fieldKey) => {
            const isLocked = lockedSliders.has(fieldKey);
            return `
              <button class="fbd-slider-reset-btn" data-reset-key="${fieldKey}" ${isLocked ? "disabled" : ""} title="恢复默认值">
                ↺ 恢复默认
              </button>
            `;
          };

          modalEl.innerHTML = `
            <style>
              @keyframes fbd-fade-in { from { opacity: 0; } to { opacity: 1; } }
              @keyframes fbd-prev-breathe { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.18); } }
              @keyframes fbd-prev-pulse { 0%, 100% { filter: brightness(1) drop-shadow(0 0 2px rgba(255,255,255,0.2)); } 50% { filter: brightness(1.3) drop-shadow(0 0 10px rgba(255,255,255,0.8)); } }
              @keyframes fbd-prev-rainbow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }

              .fbd-head {
                display: flex; align-items: center; justify-content: space-between;
                padding: 16px 20px 14px; border-bottom: 1px solid rgba(0, 0, 0, 0.05); flex-shrink: 0;
              }
              .fbd-title { font-size: 16px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 8px; }
              .fbd-close-btn {
                background: rgba(0, 0, 0, 0.05); border: none; color: #64748b;
                width: 30px; height: 30px; border-radius: 50%; cursor: pointer; display: grid; place-items: center;
                transition: all 0.15s ease;
              }
              .fbd-close-btn:hover { background: rgba(0, 0, 0, 0.1); color: #0f172a; }

              .fbd-sticky-header {
                padding: 12px 18px; display: flex; flex-direction: column; gap: 10px;
                background: rgba(255, 255, 255, 0.92); backdrop-filter: blur(20px);
                border-bottom: 1px solid rgba(0, 0, 0, 0.06); flex-shrink: 0; z-index: 10;
              }

              .fbd-select-bar {
                display: flex; align-items: center; gap: 10px;
              }
              .fbd-ball-select {
                flex: 1; min-width: 0; padding: 8px 12px; border-radius: 12px;
                border: 1px solid rgba(0, 0, 0, 0.1); background: #ffffff; color: #0f172a;
                font-size: 13px; font-weight: 700; outline: none; cursor: pointer;
              }
              .fbd-pick-btn {
                padding: 8px 16px; border-radius: 12px; border: none;
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                color: #fff; font-size: 12px; font-weight: 700; cursor: pointer;
                box-shadow: 0 3px 10px rgba(99, 102, 241, 0.3); transition: transform 0.1s;
                white-space: nowrap; flex-shrink: 0;
              }
              .fbd-pick-btn:active { transform: scale(0.96); }

              .fbd-preview-card {
                display: flex; align-items: center; justify-content: space-between;
                padding: 10px 16px; border-radius: 16px; background: rgba(255, 255, 255, 0.85);
                border: 1px solid rgba(255, 255, 255, 0.95); box-shadow: 0 4px 16px rgba(0,0,0,0.03);
              }
              .fbd-preview-ball-wrap {
                width: 64px; height: 64px; display: grid; place-items: center; position: relative;
                flex-shrink: 0;
              }
              .fbd-preview-ball {
                width: 54px; height: 54px; display: grid; place-items: center; font-size: 22px;
                transition: all 0.15s ease; position: relative;
              }

              .fbd-scroll-container {
                flex: 1; overflow-y: auto; overflow-x: hidden; padding: 14px 18px;
                display: flex; flex-direction: column; gap: 14px; box-sizing: border-box;
                touch-action: pan-y;
              }
              .fbd-scroll-container::-webkit-scrollbar { width: 4px; }
              .fbd-scroll-container::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 2px; }

              .fbd-form-group {
                display: flex; flex-direction: column; gap: 12px;
                background: rgba(255, 255, 255, 0.7); border: 1px solid rgba(255, 255, 255, 0.95);
                padding: 16px; border-radius: 18px; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.02);
                box-sizing: border-box; width: 100%;
              }
              .fbd-item { display: flex; flex-direction: column; gap: 6px; width: 100%; box-sizing: border-box; }
              .fbd-label-row {
                display: flex; align-items: center; justify-content: space-between; gap: 6px;
              }
              .fbd-label { font-size: 12.5px; font-weight: 700; color: #334155; white-space: nowrap; }

              .fbd-slider-lock-btn {
                background: rgba(0, 0, 0, 0.04); border: none; font-size: 11px; padding: 2px 6px;
                border-radius: 6px; cursor: pointer; color: #64748b; transition: all 0.15s;
              }
              .fbd-slider-lock-btn.is-locked {
                background: rgba(239, 68, 68, 0.12); color: #ef4444; font-weight: 700;
              }

              .fbd-slider-reset-btn {
                align-self: flex-end; font-size: 10.5px; font-weight: 600; color: #6366f1;
                background: transparent; border: none; cursor: pointer; padding: 2px 4px;
                opacity: 0.85; transition: opacity 0.15s; margin-top: -2px;
              }
              .fbd-slider-reset-btn:hover:not(:disabled) { opacity: 1; text-decoration: underline; }
              .fbd-slider-reset-btn:disabled { opacity: 0.35; cursor: not-allowed; }

              .fbd-input, .fbd-select {
                width: 100%; padding: 9px 12px; border-radius: 12px; border: 1px solid rgba(0, 0, 0, 0.08);
                background: #ffffff; color: #0f172a; font-size: 13px; outline: none; box-sizing: border-box;
                transition: border-color 0.15s;
              }
              .fbd-input:focus, .fbd-select:focus { border-color: #6366f1; }

              .fbd-color-item {
                display: flex; flex-direction: column; gap: 6px; padding: 10px 12px;
                background: #ffffff; border: 1px solid rgba(0, 0, 0, 0.06); border-radius: 12px;
                box-sizing: border-box; width: 100%;
              }
              .fbd-color-box { display: flex; align-items: center; gap: 10px; width: 100%; box-sizing: border-box; }
              .fbd-color-box input[type="color"] {
                width: 28px; height: 28px; border: none; border-radius: 8px; cursor: pointer; padding: 0; background: none; flex-shrink: 0;
              }
              .fbd-range {
                flex: 1; accent-color: #6366f1; cursor: pointer; min-width: 0;
              }
              .fbd-range:disabled {
                opacity: 0.45; cursor: not-allowed; pointer-events: none;
              }
              .fbd-val-text { font-size: 11.5px; color: #64748b; width: 44px; text-align: right; font-variant-numeric: tabular-nums; flex-shrink: 0; }

              .fbd-upload-btn {
                padding: 8px 14px; border-radius: 10px; border: 1px dashed #6366f1;
                background: rgba(99, 102, 241, 0.08); color: #6366f1; font-size: 12px; font-weight: 700;
                cursor: pointer; display: inline-flex; align-items: center; gap: 6px;
              }

              .fbd-icon-drawer-trigger {
                display: flex; align-items: center; justify-content: space-between; padding: 10px 14px;
                border-radius: 14px; background: #ffffff; border: 1px solid rgba(0,0,0,0.08); cursor: pointer;
              }
              .fbd-icon-drawer-trigger:hover { border-color: #6366f1; }

              .fbd-foot {
                padding: 14px 20px; border-top: 1px solid rgba(0, 0, 0, 0.05);
                display: flex; align-items: center; justify-content: space-between; background: rgba(255, 255, 255, 0.5);
                flex-shrink: 0;
              }
              .fbd-btn {
                padding: 9px 18px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; border: none;
              }
              .fbd-btn-gray { background: rgba(0, 0, 0, 0.05); color: #475569; }
              .fbd-btn-gray:hover { background: rgba(0, 0, 0, 0.08); }
              .fbd-btn-primary {
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #fff;
                box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
              }
            </style>

            <div class="fbd-head">
              <div class="fbd-title"><span>🔮 悬浮球独立 DIY 工作台</span></div>
              <button class="fbd-close-btn" id="fbd-close">✕</button>
            </div>

            <!-- 常驻吸顶选球与实时预览栏 -->
            <div class="fbd-sticky-header">
              <div class="fbd-select-bar">
                <select class="fbd-ball-select" id="fbd-select-ball-dropdown">
                  ${
                    tempBallList.length === 0
                      ? `<option value="">库中暂无悬浮球 (请点拾取)</option>`
                      : tempBallList
                          .map(
                            (b) => `
                      <option value="${b.id}" ${b.id === activeBallId ? "selected" : ""}>
                        ${b.customized ? "✨ " : ""}${b.name}
                      </option>
                    `
                          )
                          .join("")
                  }
                </select>
                <button class="fbd-pick-btn" id="fbd-start-pick">🎯 准星拾取新球</button>
              </div>

              ${
                currentBall
                  ? `
                <div class="fbd-preview-card">
                  <div style="display:flex;flex-direction:column;gap:2px;">
                    <label style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:800;color:#0f172a;cursor:pointer;">
                      <input type="checkbox" id="fbd-customized-toggle" ${currentBall.customized ? "checked" : ""} />
                      <span>开启此球的 DIY 样式</span>
                    </label>
                    <span style="font-size:11px;color:#64748b;">${currentBall.customized ? "正在实时生效自定义 DIY 样式" : "已还原初始纯净原生质感 (图2)"}</span>
                  </div>
                  <div class="fbd-preview-ball-wrap">
                    <div class="fbd-preview-ball" id="fbd-live-sphere"></div>
                  </div>
                </div>
              `
                  : ""
              }
            </div>

            <!-- 独立滚动配置表单 -->
            <div class="fbd-scroll-container" id="fbd-main-scroll">
              ${
                currentBall
                  ? `
                <!-- 悬浮球备注名 -->
                <div class="fbd-form-group">
                  <div class="fbd-item">
                    <span class="fbd-label">悬浮球备注名</span>
                    <input type="text" class="fbd-input" id="fbd-ball-name" value="${currentBall.name}" />
                  </div>
                </div>

                <!-- 形状外观与尺寸大小 -->
                <div class="fbd-form-group">
                  <div class="fbd-item">
                    <span class="fbd-label">外观形状</span>
                    <select class="fbd-select" id="fbd-shape">
                      <option value="native" ${currentBall.shape === "native" ? "selected" : ""}>🔘 保留原球原生形状 (默认)</option>
                      <option value="circle" ${currentBall.shape === "circle" ? "selected" : ""}>🌕 经典正圆 (Circle)</option>
                      <option value="squircle" ${currentBall.shape === "squircle" ? "selected" : ""}>🔲 优雅圆角方块 (Squircle)</option>
                      <option value="heart" ${currentBall.shape === "heart" ? "selected" : ""}>💖 饱满可爱胖爱心 (Heart)</option>
                      <option value="hexagon" ${currentBall.shape === "hexagon" ? "selected" : ""}>⬡ 正六边形 (Hexagon)</option>
                      <option value="star" ${currentBall.shape === "star" ? "selected" : ""}>⭐ 胖萌五角星 (Star)</option>
                      <option value="diamond" ${currentBall.shape === "diamond" ? "selected" : ""}>💠 优雅菱形 (Diamond)</option>
                    </select>
                  </div>

                  <div class="fbd-item">
                    <div class="fbd-label-row">
                      <span class="fbd-label">悬浮球尺寸大小缩放 (<span id="fbd-scale-text">${currentBall.sizeScale || 1.0}x</span>)</span>
                      ${renderLockBtn("sizeScale")}
                    </div>
                    <div class="fbd-color-item">
                      <div class="fbd-color-box">
                        <input type="range" class="fbd-range" id="fbd-scale" min="0.6" max="2.0" step="0.05" value="${currentBall.sizeScale || 1.0}" ${lockedSliders.has("sizeScale") ? "disabled" : ""} />
                      </div>
                      ${renderResetBtn("sizeScale")}
                    </div>
                  </div>

                  ${
                    currentBall.shape === "squircle"
                      ? `
                    <div class="fbd-item">
                      <div class="fbd-label-row">
                        <span class="fbd-label">方块圆角弧度 (<span id="fbd-radius-text">${currentBall.radiusPct || 24}%</span>)</span>
                        ${renderLockBtn("radiusPct")}
                      </div>
                      <div class="fbd-color-item">
                        <div class="fbd-color-box">
                          <input type="range" class="fbd-range" id="fbd-radius" min="0" max="50" value="${currentBall.radiusPct || 24}" ${lockedSliders.has("radiusPct") ? "disabled" : ""} />
                        </div>
                        ${renderResetBtn("radiusPct")}
                      </div>
                    </div>
                  `
                      : ""
                  }
                </div>

                <!-- 色彩模式与由中心向四周扩散晕染 -->
                <div class="fbd-form-group">
                  <div class="fbd-item">
                    <span class="fbd-label">色彩晕染模式</span>
                    <select class="fbd-select" id="fbd-gradient-mode">
                      <option value="radial_spread" ${currentBall.gradientMode === "radial_spread" ? "selected" : ""}>🔘 球中心向外均匀扩散晕染</option>
                      <option value="linear" ${currentBall.gradientMode === "linear" ? "selected" : ""}>🌈 线性旋转渐变</option>
                      <option value="solid" ${currentBall.gradientMode === "solid" ? "selected" : ""}>✨ 纯色半透</option>
                    </select>
                  </div>

                  <!-- 由中心向四周均匀扩散晕染 -->
                  ${
                    currentBall.gradientMode === "radial_spread"
                      ? `
                    <div class="fbd-item">
                      <div class="fbd-label-row">
                        <span class="fbd-label">① 球正中心核心颜色与浓度</span>
                        ${renderLockBtn("radialCenterAlpha")}
                      </div>
                      <div class="fbd-color-item">
                        <div class="fbd-color-box">
                          <input type="color" id="fbd-rc-c" value="${currentBall.radialCenterColor || "#bfdbfe"}" />
                          <input type="range" class="fbd-range" id="fbd-rc-a" min="0" max="1" step="0.05" value="${currentBall.radialCenterAlpha ?? 1.0}" ${lockedSliders.has("radialCenterAlpha") ? "disabled" : ""} />
                          <span class="fbd-val-text" id="fbd-rc-a-val">${Math.round((currentBall.radialCenterAlpha ?? 1.0) * 100)}%</span>
                        </div>
                        ${renderResetBtn("radialCenterAlpha")}
                      </div>
                    </div>

                    <div class="fbd-item">
                      <div class="fbd-label-row">
                        <span class="fbd-label">② 中圈过渡扩散色与浓度</span>
                        ${renderLockBtn("radialMidAlpha")}
                      </div>
                      <div class="fbd-color-item">
                        <div class="fbd-color-box">
                          <input type="color" id="fbd-rm-c" value="${currentBall.radialMidColor || "#c084fc"}" />
                          <input type="range" class="fbd-range" id="fbd-rm-a" min="0" max="1" step="0.05" value="${currentBall.radialMidAlpha ?? 0.85}" ${lockedSliders.has("radialMidAlpha") ? "disabled" : ""} />
                          <span class="fbd-val-text" id="fbd-rm-a-val">${Math.round((currentBall.radialMidAlpha ?? 0.85) * 100)}%</span>
                        </div>
                        ${renderResetBtn("radialMidAlpha")}
                      </div>
                    </div>

                    <div class="fbd-item">
                      <div class="fbd-label-row">
                        <span class="fbd-label">③ 最外圈边缘色与浓度</span>
                        ${renderLockBtn("radialEdgeAlpha")}
                      </div>
                      <div class="fbd-color-item">
                        <div class="fbd-color-box">
                          <input type="color" id="fbd-re-c" value="${currentBall.radialEdgeColor || "#6366f1"}" />
                          <input type="range" class="fbd-range" id="fbd-re-a" min="0" max="1" step="0.05" value="${currentBall.radialEdgeAlpha ?? 0.7}" ${lockedSliders.has("radialEdgeAlpha") ? "disabled" : ""} />
                          <span class="fbd-val-text" id="fbd-re-a-val">${Math.round((currentBall.radialEdgeAlpha ?? 0.7) * 100)}%</span>
                        </div>
                        ${renderResetBtn("radialEdgeAlpha")}
                      </div>
                    </div>

                    <div class="fbd-item">
                      <div class="fbd-label-row">
                        <span class="fbd-label">中心光晕扩散半径 (<span id="fbd-spread-r-val">${currentBall.spreadRadius ?? 75}%</span>)</span>
                        ${renderLockBtn("spreadRadius")}
                      </div>
                      <div class="fbd-color-item">
                        <div class="fbd-color-box">
                          <input type="range" class="fbd-range" id="fbd-spread-r" min="30" max="120" value="${currentBall.spreadRadius ?? 75}" ${lockedSliders.has("spreadRadius") ? "disabled" : ""} />
                        </div>
                        ${renderResetBtn("spreadRadius")}
                      </div>
                    </div>
                  `
                      : ""
                  }

                  <!-- 线性色盘 -->
                  ${
                    currentBall.gradientMode === "linear"
                      ? `
                    <div class="fbd-item">
                      <div class="fbd-label-row">
                        <span class="fbd-label">旋转角度 (<span id="fbd-lin-ang-val">${currentBall.linearAngle || 135}°</span>)</span>
                        ${renderLockBtn("linearAngle")}
                      </div>
                      <div class="fbd-color-item">
                        <div class="fbd-color-box">
                          <input type="range" class="fbd-range" id="fbd-lin-ang" min="0" max="360" value="${currentBall.linearAngle || 135}" ${lockedSliders.has("linearAngle") ? "disabled" : ""} />
                        </div>
                        ${renderResetBtn("linearAngle")}
                      </div>
                    </div>
                    <div class="fbd-item">
                      <div class="fbd-label-row">
                        <span class="fbd-label">① 起始色</span>
                        ${renderLockBtn("linearAlpha1")}
                      </div>
                      <div class="fbd-color-item">
                        <div class="fbd-color-box">
                          <input type="color" id="fbd-lc1" value="${currentBall.linearColor1 || "#f472b6"}" />
                          <input type="range" class="fbd-range" id="fbd-la1" min="0" max="1" step="0.05" value="${currentBall.linearAlpha1 ?? 0.9}" ${lockedSliders.has("linearAlpha1") ? "disabled" : ""} />
                          <span class="fbd-val-text" id="fbd-la1-val">${Math.round((currentBall.linearAlpha1 ?? 0.9) * 100)}%</span>
                        </div>
                        ${renderResetBtn("linearAlpha1")}
                      </div>
                    </div>
                    <div class="fbd-item">
                      <div class="fbd-label-row">
                        <span class="fbd-label">② 中间色</span>
                        ${renderLockBtn("linearAlpha2")}
                      </div>
                      <div class="fbd-color-item">
                        <div class="fbd-color-box">
                          <input type="color" id="fbd-lc2" value="${currentBall.linearColor2 || "#c084fc"}" />
                          <input type="range" class="fbd-range" id="fbd-la2" min="0" max="1" step="0.05" value="${currentBall.linearAlpha2 ?? 0.8}" ${lockedSliders.has("linearAlpha2") ? "disabled" : ""} />
                          <span class="fbd-val-text" id="fbd-la2-val">${Math.round((currentBall.linearAlpha2 ?? 0.8) * 100)}%</span>
                        </div>
                        ${renderResetBtn("linearAlpha2")}
                      </div>
                    </div>
                    <div class="fbd-item">
                      <div class="fbd-label-row">
                        <span class="fbd-label">③ 结束色</span>
                        ${renderLockBtn("linearAlpha3")}
                      </div>
                      <div class="fbd-color-item">
                        <div class="fbd-color-box">
                          <input type="color" id="fbd-lc3" value="${currentBall.linearColor3 || "#60a5fa"}" />
                          <input type="range" class="fbd-range" id="fbd-la3" min="0" max="1" step="0.05" value="${currentBall.linearAlpha3 ?? 0.7}" ${lockedSliders.has("linearAlpha3") ? "disabled" : ""} />
                          <span class="fbd-val-text" id="fbd-la3-val">${Math.round((currentBall.linearAlpha3 ?? 0.7) * 100)}%</span>
                        </div>
                        ${renderResetBtn("linearAlpha3")}
                      </div>
                    </div>
                  `
                      : ""
                  }

                  <!-- 纯色 -->
                  ${
                    currentBall.gradientMode === "solid"
                      ? `
                    <div class="fbd-item">
                      <div class="fbd-label-row">
                        <span class="fbd-label">纯色底色与透明度</span>
                        ${renderLockBtn("solidAlpha")}
                      </div>
                      <div class="fbd-color-item">
                        <div class="fbd-color-box">
                          <input type="color" id="fbd-solid-c" value="${currentBall.solidColor || "#8b5cf6"}" />
                          <input type="range" class="fbd-range" id="fbd-solid-a" min="0" max="1" step="0.05" value="${currentBall.solidAlpha ?? 0.85}" ${lockedSliders.has("solidAlpha") ? "disabled" : ""} />
                          <span class="fbd-val-text" id="fbd-solid-a-val">${Math.round((currentBall.solidAlpha ?? 0.85) * 100)}%</span>
                        </div>
                        ${renderResetBtn("solidAlpha")}
                      </div>
                    </div>
                  `
                      : ""
                  }
                </div>

                <!-- 背景图与取景微调 -->
                <div class="fbd-form-group">
                  <div class="fbd-item">
                    <span class="fbd-label">🌌 自定义背景图</span>
                    <div style="display:flex;gap:8px;align-items:center;">
                      <input type="text" class="fbd-input" id="fbd-bg-img" value="${currentBall.bgImageUrl || ""}" placeholder="输入图片 URL 或点右侧上传" style="flex:1;" />
                      <label class="fbd-upload-btn">
                        <span>📁 上传图片</span>
                        <input type="file" id="fbd-bg-file-input" accept="image/*" style="display:none;" />
                      </label>
                    </div>
                  </div>

                  <div class="fbd-item">
                    <div class="fbd-label-row">
                      <span class="fbd-label">背景图显隐透明度 (<span id="fbd-bg-img-opacity-val">${Math.round((currentBall.bgImageOpacity ?? 0.85) * 100)}%</span>)</span>
                      ${renderLockBtn("bgImageOpacity")}
                    </div>
                    <div class="fbd-color-item">
                      <div class="fbd-color-box">
                        <input type="range" class="fbd-range" id="fbd-bg-img-opacity" min="0.0" max="1.0" step="0.05" value="${currentBall.bgImageOpacity ?? 0.85}" ${lockedSliders.has("bgImageOpacity") ? "disabled" : ""} />
                      </div>
                      ${renderResetBtn("bgImageOpacity")}
                    </div>
                  </div>

                  <!-- 背景图取景微调 -->
                  <div class="fbd-item">
                    <div class="fbd-label-row">
                      <span class="fbd-label">背景图大小缩放 (<span id="fbd-bg-scale-val">${currentBall.bgScale || 1.0}x</span>)</span>
                      ${renderLockBtn("bgScale")}
                    </div>
                    <div class="fbd-color-item">
                      <div class="fbd-color-box">
                        <input type="range" class="fbd-range" id="fbd-bg-scale" min="0.5" max="3.0" step="0.05" value="${currentBall.bgScale || 1.0}" ${lockedSliders.has("bgScale") ? "disabled" : ""} />
                      </div>
                      ${renderResetBtn("bgScale")}
                    </div>
                  </div>

                  <div class="fbd-item">
                    <div class="fbd-label-row">
                      <span class="fbd-label">背景图左右平移 (<span id="fbd-bg-ox-val">${currentBall.bgOffsetX || 0}px</span>)</span>
                      ${renderLockBtn("bgOffsetX")}
                    </div>
                    <div class="fbd-color-item">
                      <div class="fbd-color-box">
                        <input type="range" class="fbd-range" id="fbd-bg-ox" min="-50" max="50" step="1" value="${currentBall.bgOffsetX || 0}" ${lockedSliders.has("bgOffsetX") ? "disabled" : ""} />
                      </div>
                      ${renderResetBtn("bgOffsetX")}
                    </div>
                  </div>

                  <div class="fbd-item">
                    <div class="fbd-label-row">
                      <span class="fbd-label">背景图上下平移 (<span id="fbd-bg-oy-val">${currentBall.bgOffsetY || 0}px</span>)</span>
                      ${renderLockBtn("bgOffsetY")}
                    </div>
                    <div class="fbd-color-item">
                      <div class="fbd-color-box">
                        <input type="range" class="fbd-range" id="fbd-bg-oy" min="-50" max="50" step="1" value="${currentBall.bgOffsetY || 0}" ${lockedSliders.has("bgOffsetY") ? "disabled" : ""} />
                      </div>
                      ${renderResetBtn("bgOffsetY")}
                    </div>
                  </div>
                </div>

                <!-- 图标选择与微调 -->
                <div class="fbd-form-group">
                  <span class="fbd-label">✨ 图标选择与微调</span>
                  <div class="fbd-icon-drawer-trigger" id="fbd-open-icon-modal">
                    <div style="display:flex;align-items:center;gap:12px;">
                      <div style="
                        width:36px; height:36px; border-radius:10px;
                        background: #f8fafc; border: 1px solid rgba(0,0,0,0.06);
                        color: #334155; display: grid; place-items: center; flex-shrink: 0;
                      ">
                        ${previewTriggerSvg ? previewTriggerSvg : `<span style="font-size:16px;">＋</span>`}
                      </div>
                      <div style="display:flex;flex-direction:column;">
                        <span style="font-size:13px;font-weight:700;color:#0f172a;">${matchedIconName ? matchedIconName : "点击挑选图标"}</span>
                        <span style="font-size:11px;color:#64748b;">支持原生图、Ins 65款白标与纯背景模式</span>
                      </div>
                    </div>
                    <span style="font-size:12.5px;color:#6366f1;font-weight:700;flex-shrink:0;">选择图标 →</span>
                  </div>

                  <div class="fbd-item" style="margin-top:6px;">
                    <div class="fbd-label-row">
                      <span class="fbd-label">图标尺寸大小 (<span id="fbd-icon-scale-text">${currentBall.iconSizeScale || 1.0}x</span>)</span>
                      ${renderLockBtn("iconSizeScale")}
                    </div>
                    <div class="fbd-color-item">
                      <div class="fbd-color-box">
                        <input type="range" class="fbd-range" id="fbd-icon-scale" min="0.4" max="2.0" step="0.05" value="${currentBall.iconSizeScale || 1.0}" ${lockedSliders.has("iconSizeScale") ? "disabled" : ""} />
                      </div>
                      ${renderResetBtn("iconSizeScale")}
                    </div>
                  </div>

                  <div class="fbd-item">
                    <div class="fbd-label-row">
                      <span class="fbd-label">图标左右水平位置 (<span id="fbd-icon-ox-text">${currentBall.iconOffsetX || 0}px</span>)</span>
                      ${renderLockBtn("iconOffsetX")}
                    </div>
                    <div class="fbd-color-item">
                      <div class="fbd-color-box">
                        <input type="range" class="fbd-range" id="fbd-icon-ox" min="-30" max="30" step="1" value="${currentBall.iconOffsetX || 0}" ${lockedSliders.has("iconOffsetX") ? "disabled" : ""} />
                      </div>
                      ${renderResetBtn("iconOffsetX")}
                    </div>
                  </div>

                  <div class="fbd-item">
                    <div class="fbd-label-row">
                      <span class="fbd-label">图标上下垂直位置 (<span id="fbd-icon-oy-text">${currentBall.iconOffsetY || 0}px</span>)</span>
                      ${renderLockBtn("iconOffsetY")}
                    </div>
                    <div class="fbd-color-item">
                      <div class="fbd-color-box">
                        <input type="range" class="fbd-range" id="fbd-icon-oy" min="-30" max="30" step="1" value="${currentBall.iconOffsetY || 0}" ${lockedSliders.has("iconOffsetY") ? "disabled" : ""} />
                      </div>
                      ${renderResetBtn("iconOffsetY")}
                    </div>
                  </div>

                  <div class="fbd-item">
                    <span class="fbd-label">或自定义 Emoji / 单字</span>
                    <input type="text" class="fbd-input" id="fbd-emoji" value="${currentBall.customEmoji || ""}" placeholder="如 🔮 / 🌸 / ⚡" />
                  </div>

                  <div class="fbd-item">
                    <span class="fbd-label">图标着色 (默认纯白)</span>
                    <div class="fbd-color-item">
                      <div class="fbd-color-box">
                        <input type="color" id="fbd-icon-color" value="${currentBall.iconColor || "#ffffff"}" />
                        <span style="font-size:12px;color:#64748b;">支持任意纯白或专属色彩</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 边框光影与动态光效 -->
                <div class="fbd-form-group">
                  <div class="fbd-item">
                    <span class="fbd-label">动态光效</span>
                    <select class="fbd-select" id="fbd-anim">
                      <option value="none" ${currentBall.animation === "none" ? "selected" : ""}>静止无动效 (默认)</option>
                      <option value="breathe" ${currentBall.animation === "breathe" ? "selected" : ""}>柔和起伏呼吸</option>
                      <option value="pulse" ${currentBall.animation === "pulse" ? "selected" : ""}>赛博霓虹脉冲</option>
                      <option value="rainbow" ${currentBall.animation === "rainbow" ? "selected" : ""}>彩虹流光</option>
                    </select>
                  </div>

                  <div class="fbd-item">
                    <div class="fbd-label-row">
                      <span class="fbd-label">高光边框色与浓度</span>
                      ${renderLockBtn("borderAlpha")}
                    </div>
                    <div class="fbd-color-item">
                      <div class="fbd-color-box">
                        <input type="color" id="fbd-border-c" value="${currentBall.borderColor || "#ffffff"}" />
                        <input type="range" class="fbd-range" id="fbd-border-a" min="0" max="1" step="0.05" value="${currentBall.borderAlpha ?? 0.75}" ${lockedSliders.has("borderAlpha") ? "disabled" : ""} />
                        <span class="fbd-val-text" id="fbd-border-a-val">${Math.round((currentBall.borderAlpha ?? 0.75) * 100)}%</span>
                      </div>
                      ${renderResetBtn("borderAlpha")}
                    </div>
                  </div>

                  <div class="fbd-item">
                    <div class="fbd-label-row">
                      <span class="fbd-label">外发光光晕色与浓度</span>
                      ${renderLockBtn("shadowAlpha")}
                    </div>
                    <div class="fbd-color-item">
                      <div class="fbd-color-box">
                        <input type="color" id="fbd-shadow-c" value="${currentBall.shadowColor || "#a855f7"}" />
                        <input type="range" class="fbd-range" id="fbd-shadow-a" min="0" max="1" step="0.05" value="${currentBall.shadowAlpha ?? 0.35}" ${lockedSliders.has("shadowAlpha") ? "disabled" : ""} />
                        <span class="fbd-val-text" id="fbd-shadow-a-val">${Math.round((currentBall.shadowAlpha ?? 0.35) * 100)}%</span>
                      </div>
                      ${renderResetBtn("shadowAlpha")}
                    </div>
                  </div>

                  <div style="display:flex;justify-content:flex-end;margin-top:6px;">
                    <button class="fbd-btn fbd-btn-gray" id="fbd-del-btn" style="color:#ef4444;font-size:12px;font-weight:700;">🗑️ 从库中彻底删除此球</button>
                  </div>
                </div>
              `
                  : `
                <div style="padding:48px 16px;text-align:center;color:#94a3b8;font-size:13.5px;line-height:1.6;">
                  库中暂无悬浮球<br />请点击上方【🎯 准星拾取新球】收录屏幕悬浮球！
                </div>
              `
              }
            </div>

            <!-- 底部栏 -->
            <div class="fbd-foot">
              <span style="font-size:11.5px;color:#64748b;font-weight:600;">原厂纯净质感(图2) ⇋ 自定义DIY动态切换</span>
              <div style="display:flex;gap:10px;">
                <button class="fbd-btn fbd-btn-gray" id="fbd-cancel">取消</button>
                <button class="fbd-btn fbd-btn-primary" id="fbd-save">💾 保存并应用全部</button>
              </div>
            </div>
          `;

          const scrollContainer = modalEl.querySelector("#fbd-main-scroll");
          if (scrollContainer) {
            const savedTop = parseInt(sessionStorage.getItem(SCROLL_POS_STORAGE_KEY) || "0", 10);
            scrollContainer.scrollTop = savedTop;
            scrollContainer.addEventListener("scroll", () => {
              sessionStorage.setItem(SCROLL_POS_STORAGE_KEY, scrollContainer.scrollTop.toString());
            });
          }

          updateLivePreview();
          bindEvents();
        }

        // 🌟 核心高清渲染：未开启定制使用 initialDraft 呈现图2完美样貌；开启后呈现图1自定义样貌
        function updateLivePreview() {
          const currentBall = tempBallList.find((b) => b.id === activeBallId);
          const pSphere = modalEl.querySelector("#fbd-live-sphere");
          if (!pSphere || !currentBall) return;

          // 核心切换：未勾选 DIY 时使用初始底稿参数(图2)；勾选后使用当前编辑参数(图1)
          const targetParams = currentBall.customized ? currentBall : (currentBall.initialDraft || currentBall);

          const borderRgba = toRgba(targetParams.borderColor, targetParams.borderAlpha);
          const shadowRgba = toRgba(targetParams.shadowColor, targetParams.shadowAlpha);
          const insetRgba = toRgba(targetParams.insetGlowColor, targetParams.insetGlowAlpha);

          let bg = "";
          if (targetParams.gradientMode === "solid") {
            bg = toRgba(targetParams.solidColor, targetParams.solidAlpha);
          } else if (targetParams.gradientMode === "linear") {
            const c1 = toRgba(targetParams.linearColor1, targetParams.linearAlpha1);
            const c2 = toRgba(targetParams.linearColor2, targetParams.linearAlpha2);
            const c3 = toRgba(targetParams.linearColor3, targetParams.linearAlpha3);
            bg = `linear-gradient(${targetParams.linearAngle || 135}deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`;
          } else {
            const cCenter = toRgba(targetParams.radialCenterColor, targetParams.radialCenterAlpha);
            const cMid = toRgba(targetParams.radialMidColor, targetParams.radialMidAlpha);
            const cEdge = toRgba(targetParams.radialEdgeColor, targetParams.radialEdgeAlpha);
            const r = targetParams.spreadRadius ?? 75;
            bg = `radial-gradient(circle at 50% 50%, ${cCenter} 0%, ${cMid} ${Math.round(r * 0.55)}%, ${cEdge} ${r}%)`;
          }

          if (targetParams.bgImageUrl && targetParams.bgImageUrl.trim()) {
            const overlayRgba = toRgba("#000000", 1 - (targetParams.bgImageOpacity ?? 0.85));
            bg = `linear-gradient(${overlayRgba}, ${overlayRgba}), url("${targetParams.bgImageUrl.trim()}"), ${bg}`;
          }

          let shapeCss = `border-radius: 50%; clip-path: none; overflow: hidden;`;
          const hasClip = targetParams.shape === "hexagon" || targetParams.shape === "star" || targetParams.shape === "diamond" || targetParams.shape === "heart";

          if (targetParams.shape === "native") shapeCss = `border-radius: ${currentBall.rawSnapshotRadius || "50%"}; clip-path: none; overflow: hidden;`;
          else if (targetParams.shape === "squircle") shapeCss = `border-radius: ${targetParams.radiusPct || 24}%; clip-path: none; overflow: hidden;`;
          else if (targetParams.shape === "heart") shapeCss = `border-radius: 0; clip-path: url(#fbd-heart-clip);`;
          else if (targetParams.shape === "hexagon") shapeCss = `border-radius: 0; clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);`;
          else if (targetParams.shape === "star") shapeCss = `border-radius: 0; clip-path: polygon(50% 0%, 63% 34%, 98% 36%, 71% 59%, 80% 95%, 50% 75%, 20% 95%, 29% 59%, 2% 36%, 37% 34%);`;
          else if (targetParams.shape === "diamond") shapeCss = `border-radius: 0; clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);`;

          const shadowCss = hasClip
            ? `filter: drop-shadow(0 4px ${targetParams.shadowBlur || 18}px ${shadowRgba});`
            : `box-shadow: 0 4px ${targetParams.shadowBlur || 18}px 2px ${shadowRgba}, inset 0 0 12px ${insetRgba}; border: ${targetParams.borderWidth || 1.5}px solid ${borderRgba};`;

          const scaleVal = targetParams.sizeScale || 1.0;
          const iconScale = targetParams.iconSizeScale || 1.0;
          const ox = targetParams.iconOffsetX || 0;
          const oy = targetParams.iconOffsetY || 0;

          let animCss = "";
          if (targetParams.animation === "breathe") animCss = "animation: fbd-prev-breathe 3.2s ease-in-out infinite;";
          if (targetParams.animation === "pulse") animCss = "animation: fbd-prev-pulse 2.2s ease-in-out infinite;";
          if (targetParams.animation === "rainbow") animCss = "animation: fbd-prev-rainbow 5s linear infinite;";

          pSphere.style.cssText = `
            ${shapeCss}
            background: ${bg};
            background-size: cover;
            background-position: center;
            ${shadowCss}
            transform: scale(${scaleVal});
            opacity: ${targetParams.opacity || 0.95};
            ${animCss}
          `;

          if (targetParams.selectedIconId === "none") {
            pSphere.innerHTML = "";
            return;
          }

          let iconSvg = "";
          const matchedIns = INS_WHITE_ICONS.find((i) => i.id === targetParams.selectedIconId);
          if (matchedIns) iconSvg = matchedIns.svg;
          else if (targetParams.selectedIconId && targetParams.selectedIconId.startsWith("native_")) {
            const originBall = tempBallList.find((b) => "native_" + b.id === targetParams.selectedIconId);
            if (originBall && originBall.rawSnapshotIconSvg) iconSvg = originBall.rawSnapshotIconSvg;
          } else if (targetParams.selectedIconId === "native_self" || !targetParams.selectedIconId) {
            iconSvg = currentBall.rawSnapshotIconSvg;
          }

          if (iconSvg) {
            let formattedSvg = iconSvg.replace(/stroke="[^"]*"/g, `stroke="${targetParams.iconColor || "#ffffff"}"`);
            formattedSvg = formattedSvg.replace(/fill="((?!none)[^"]*)"/g, `fill="${targetParams.iconColor || "#ffffff"}"`);
            pSphere.innerHTML = `<div style="position:absolute;left:50%;top:50%;transform:translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px)) scale(${iconScale});width:24px;height:24px;color:${targetParams.iconColor || "#fff"};display:grid;place-items:center;pointer-events:none;z-index:10;">${formattedSvg}</div>`;
          } else if (targetParams.customImageUrl) {
            pSphere.innerHTML = `<img src="${targetParams.customImageUrl}" style="position:absolute;left:50%;top:50%;transform:translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px)) scale(${iconScale});width:34px;height:34px;object-fit:contain;pointer-events:none;z-index:10;" />`;
          } else {
            pSphere.innerHTML = `<div style="position:absolute;left:50%;top:50%;transform:translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px)) scale(${iconScale});font-size:20px;line-height:1;pointer-events:none;z-index:10;">${targetParams.customEmoji || (currentBall.selector.includes("mascot") ? "🐱" : "✨")}</div>`;
          }
        }

        function bindEvents() {
          modalEl.querySelector("#fbd-close")?.addEventListener("click", close);
          modalEl.querySelector("#fbd-cancel")?.addEventListener("click", close);

          modalEl.querySelector("#fbd-select-ball-dropdown")?.addEventListener("change", (e) => {
            activeBallId = e.target.value;
            setActiveBallId(activeBallId);
            render();
          });

          modalEl.querySelectorAll(".fbd-slider-lock-btn").forEach((lockBtn) => {
            lockBtn.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              const key = lockBtn.getAttribute("data-lock-key");
              if (lockedSliders.has(key)) {
                lockedSliders.delete(key);
              } else {
                lockedSliders.add(key);
              }
              saveLockedSliders(lockedSliders);
              render();
            });
          });

          modalEl.querySelectorAll(".fbd-slider-reset-btn").forEach((resetBtn) => {
            resetBtn.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              const key = resetBtn.getAttribute("data-reset-key");
              if (lockedSliders.has(key)) return;
              const currentBall = tempBallList.find((b) => b.id === activeBallId);
              if (!currentBall || !currentBall.initialDraft) return;

              if (currentBall.initialDraft[key] !== undefined) {
                currentBall[key] = currentBall.initialDraft[key];
                ctx.ui.toast("已恢复该项默认值");
                render();
              }
            });
          });

          modalEl.querySelector("#fbd-start-pick")?.addEventListener("click", () => {
            close();
            startTargetPicker((name, selector, tag, rawSnapshotObj) => {
              const list = [...ballList];
              let exist = list.find((b) => b.selector === selector || (tag && b.elementTag === tag));
              if (!exist) {
                exist = createNewBallRecord(name, selector, tag, rawSnapshotObj);
                list.push(exist);
                saveBallList(list);
                ctx.ui.toast(`已成功收录【${name}】！`);
              } else {
                const whiteSvg = formatCleanWhiteSvg(rawSnapshotObj.svg);
                exist.rawSnapshotRadius = rawSnapshotObj.radius;
                exist.rawSnapshotIconSvg = whiteSvg;
                ctx.ui.toast(`已定位到【${exist.name}】`);
              }
              activeBallId = exist.id;
              setActiveBallId(activeBallId);
              setTimeout(openStudioModal, 250);
            });
          });

          const currentBall = tempBallList.find((b) => b.id === activeBallId);
          if (!currentBall) return;

          // 核心切换：未勾选瞬间变回初始图2模样；勾选瞬间生效最新 DIY 模样
          modalEl.querySelector("#fbd-customized-toggle")?.addEventListener("change", (e) => {
            currentBall.customized = e.target.checked;
            updateLivePreview();
            const tipText = modalEl.querySelector(".fbd-preview-card span:last-child");
            if (tipText) tipText.textContent = currentBall.customized ? "正在实时生效自定义 DIY 样式" : "已还原初始纯净原生质感 (图2)";
          });

          modalEl.querySelector("#fbd-open-icon-modal")?.addEventListener("click", () => {
            openInnerIconPicker(modalEl, currentBall, (chosenId) => {
              currentBall.selectedIconId = chosenId;
              if (chosenId && chosenId !== "none") currentBall.customEmoji = "";
              render();
            });
          });

          modalEl.querySelector("#fbd-bg-file-input")?.addEventListener("change", (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              currentBall.bgImageUrl = reader.result;
              const inputEl = modalEl.querySelector("#fbd-bg-img");
              if (inputEl) inputEl.value = reader.result;
              updateLivePreview();
              ctx.ui.toast("背景图片上传成功！");
            };
            reader.readAsDataURL(file);
          });

          const bindRange = (id, key, valId, formatFn, isFloat = false, isInt = false) => {
            const el = modalEl.querySelector(id);
            if (!el) return;
            el.addEventListener("input", (e) => {
              let v = e.target.value;
              if (isFloat) v = parseFloat(v);
              else if (isInt) v = parseInt(v, 10);
              currentBall[key] = v;
              if (valId) {
                const textEl = modalEl.querySelector(valId);
                if (textEl) textEl.textContent = formatFn ? formatFn(v) : v;
              }
              updateLivePreview();
            });
          };

          const bindInput = (id, key) => {
            const el = modalEl.querySelector(id);
            if (!el) return;
            el.addEventListener("input", (e) => {
              currentBall[key] = e.target.value;
              updateLivePreview();
            });
          };

          bindInput("#fbd-ball-name", "name");
          bindInput("#fbd-bg-img", "bgImageUrl");
          bindInput("#fbd-emoji", "customEmoji");
          bindInput("#fbd-icon-color", "iconColor");

          modalEl.querySelector("#fbd-anim")?.addEventListener("change", (e) => {
            currentBall.animation = e.target.value;
            updateLivePreview();
          });

          bindRange("#fbd-scale", "sizeScale", "#fbd-scale-text", (v) => `${v}x`, true);
          bindRange("#fbd-radius", "radiusPct", "#fbd-radius-text", (v) => `${v}%`, false, true);

          bindRange("#fbd-bg-img-opacity", "bgImageOpacity", "#fbd-bg-img-opacity-val", (v) => `${Math.round(v * 100)}%`, true);
          bindRange("#fbd-bg-scale", "bgScale", "#fbd-bg-scale-val", (v) => `${v}x`, true);
          bindRange("#fbd-bg-ox", "bgOffsetX", "#fbd-bg-ox-val", (v) => `${v}px`, false, true);
          bindRange("#fbd-bg-oy", "bgOffsetY", "#fbd-bg-oy-val", (v) => `${v}px`, false, true);

          bindRange("#fbd-icon-scale", "iconSizeScale", "#fbd-icon-scale-text", (v) => `${v}x`, true);
          bindRange("#fbd-icon-ox", "iconOffsetX", "#fbd-icon-ox-text", (v) => `${v}px`, false, true);
          bindRange("#fbd-icon-oy", "iconOffsetY", "#fbd-icon-oy-text", (v) => `${v}px`, false, true);

          modalEl.querySelector("#fbd-gradient-mode")?.addEventListener("change", (e) => {
            currentBall.gradientMode = e.target.value;
            render();
          });

          bindInput("#fbd-rc-c", "radialCenterColor");
          bindRange("#fbd-rc-a", "radialCenterAlpha", "#fbd-rc-a-val", (v) => `${Math.round(v * 100)}%`, true);
          bindInput("#fbd-rm-c", "radialMidColor");
          bindRange("#fbd-rm-a", "radialMidAlpha", "#fbd-rm-a-val", (v) => `${Math.round(v * 100)}%`, true);
          bindInput("#fbd-re-c", "radialEdgeColor");
          bindRange("#fbd-re-a", "radialEdgeAlpha", "#fbd-re-a-val", (v) => `${Math.round(v * 100)}%`, true);
          bindRange("#fbd-spread-r", "spreadRadius", "#fbd-spread-r-val", (v) => `${v}%`, false, true);

          bindRange("#fbd-lin-ang", "linearAngle", "#fbd-lin-ang-val", (v) => `${v}°`, false, true);
          bindInput("#fbd-lc1", "linearColor1");
          bindRange("#fbd-la1", "linearAlpha1", "#fbd-la1-val", (v) => `${Math.round(v * 100)}%`, true);
          bindInput("#fbd-lc2", "linearColor2");
          bindRange("#fbd-la2", "linearAlpha2", "#fbd-la2-val", (v) => `${Math.round(v * 100)}%`, true);
          bindInput("#fbd-lc3", "linearColor3");
          bindRange("#fbd-la3", "linearAlpha3", "#fbd-la3-val", (v) => `${Math.round(v * 100)}%`, true);

          bindInput("#fbd-solid-c", "solidColor");
          bindRange("#fbd-solid-a", "solidAlpha", "#fbd-solid-a-val", (v) => `${Math.round(v * 100)}%`, true);

          bindInput("#fbd-border-c", "borderColor");
          bindRange("#fbd-border-a", "borderAlpha", "#fbd-border-a-val", (v) => `${Math.round(v * 100)}%`, true);
          bindInput("#fbd-shadow-c", "shadowColor");
          bindRange("#fbd-shadow-a", "shadowAlpha", "#fbd-shadow-a-val", (v) => `${Math.round(v * 100)}%`, true);

          modalEl.querySelector("#fbd-shape")?.addEventListener("change", (e) => {
            currentBall.shape = e.target.value;
            const sqWrap = modalEl.querySelector("#fbd-squircle-radius-wrap");
            if (sqWrap) sqWrap.style.display = currentBall.shape === "squircle" ? "flex" : "none";
            updateLivePreview();
          });

          modalEl.querySelector("#fbd-emoji")?.addEventListener("input", () => {
            if (currentBall.customEmoji) currentBall.selectedIconId = "";
          });

          modalEl.querySelector("#fbd-del-btn")?.addEventListener("click", () => {
            if (confirm(`确定要从库中彻底删除【${currentBall.name}】吗？`)) {
              tempBallList = tempBallList.filter((b) => b.id !== activeBallId);
              saveBallList(tempBallList);
              activeBallId = tempBallList[0]?.id || "";
              setActiveBallId(activeBallId);
              ctx.ui.toast("已成功彻底删除！");
              render();
            }
          });

          modalEl.querySelector("#fbd-save")?.addEventListener("click", () => {
            saveBallList(tempBallList);
            close();
            ctx.ui.toast("✨ 悬浮球 DIY 样式已保存并即时生效！");
          });
        }

        render();
      });
    }

    ctx.ui.slot("settings.section", (el) => {
      el.innerHTML = `
        <div style="padding: 10px 16px 4px;">
          <button id="fbd-open-center-btn" style="
            width: 100%; min-height: 42px; border-radius: 14px; border: none;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: #fff; font-weight: 700; font-size: 13.5px; cursor: pointer;
            box-shadow: 0 4px 14px rgba(99,102,241,0.35);
            display: flex; align-items: center; justify-content: center; gap: 7px;
          ">
            <span>✨ 打开悬浮球 DIY 工作台</span>
          </button>
        </div>
      `;

      el.querySelector("#fbd-open-center-btn")?.addEventListener("click", openStudioModal);
    });

    ctx.system.settings.onChange((key) => {
      if (key === "showHelperBall") {
        renderHelperBall();
      }
    });

    applyCustomStyles();
    renderHelperBall();
    syncInterval = ctx.system.timers.setInterval(ensureDomTags, 2000);

    return () => {
      if (injectedStyleRemover) {
        try {
          injectedStyleRemover();
        } catch (e) {}
      }
      if (syncInterval) {
        clearInterval(syncInterval);
      }
      if (helperBallEl) {
        helperBallEl.remove();
        helperBallEl = null;
      }
    };
  },
};
