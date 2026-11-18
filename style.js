// ============================================================================
// HOWL'S STARLIGHT ONSEN — UNIFIED ENGINE (PART 1 OF 16)
// CSS Styling, DOM Bootstrap & Overlay Scaffolding
// ============================================================================
(function () {
  "use strict";

  function injectUnifiedStyles() {
    if (document.getElementById("starlight-unified-styles")) return;
    const style = document.createElement("style");
    style.id = "starlight-unified-styles";
    style.textContent = `
      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #080d1f;
        font-family: monospace;
        user-select: none;
      }
      #game {
        display: block;
        width: 100vw;
        height: 100vh;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
      }
      #dialogue-box, #debug-chat-dock {
        display: none !important;
      }

      /* Top Instant-Travel Quick-Hop Bar */
      #kingsbury-quickbar {
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9500;
        display: none;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5px;
        background: rgba(13, 20, 44, 0.93);
        border: 2px solid #ffd166;
        border-radius: 999px;
        padding: 4px 11px;
        box-shadow: 0 4px 18px rgba(0, 0, 0, 0.58);
        font-size: 11px;
        color: #fff8e6;
      }
      .kb-hop-btn {
        background: #223363;
        color: #fff8e6;
        border: 1px solid #8cc8ff;
        border-radius: 999px;
        padding: 3px 8px;
        font-family: monospace;
        font-size: 10px;
        cursor: pointer;
        white-space: nowrap;
        transition: background 0.12s ease, border-color 0.12s ease, transform 0.1s ease;
      }
      .kb-hop-btn:hover {
        background: #365096;
        border-color: #ffd166;
        color: #ffe885;
        transform: translateY(-1px);
      }
      .kb-unstuck-btn {
        background: #852d47;
        color: #ffe6ee;
        border: 1px solid #ff9ec4;
        border-radius: 999px;
        padding: 3px 9px;
        font-family: monospace;
        font-size: 10px;
        font-weight: bold;
        cursor: pointer;
      }
      .kb-unstuck-btn:hover {
        background: #ab3a5b;
        border-color: #ffd166;
      }

      /* Interactive Minimap & Hover Tooltip */
      #minimap {
        pointer-events: auto !important;
        z-index: 9100 !important;
      }
      #minimap-map {
        display: block !important;
        width: 220px !important;
        height: 110px !important;
        border: 2px solid #ffd166 !important;
        border-radius: 6px !important;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6) !important;
        image-rendering: pixelated !important;
        cursor: pointer !important;
        pointer-events: auto !important;
      }
      #minimap-tooltip {
        position: fixed;
        z-index: 10050;
        background: rgba(13, 20, 44, 0.96);
        color: #fff8e6;
        border: 1.5px solid #ffd166;
        border-radius: 6px;
        padding: 4px 9px;
        font-size: 11px;
        font-weight: bold;
        pointer-events: none;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.55);
        white-space: nowrap;
      }
      #minimap-tooltip.hidden, #map-overlay.hidden {
        display: none !important;
      }

      /* Starlight Visual-Novel Chat System */
      #starlight-chat-area {
        position: fixed;
        left: 50%;
        bottom: 18px;
        transform: translateX(-50%);
        width: min(680px, 94vw);
        background: linear-gradient(180deg, rgba(16, 24, 54, 0.97) 0%, rgba(10, 15, 36, 0.98) 100%);
        border: 3px solid #ffd166;
        box-shadow: 0 0 0 3px #0c1229, 0 14px 36px rgba(0, 0, 0, 0.72);
        border-radius: 12px;
        padding: 14px 16px 12px;
        display: flex;
        align-items: flex-start;
        gap: 14px;
        z-index: 9800;
        color: #fff8e6;
      }
      #starlight-chat-area.hidden {
        display: none !important;
      }
      .sc-portrait-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        min-width: 72px;
      }
      #sc-portrait-canvas {
        width: 68px;
        height: 68px;
        border: 2.5px solid #ffd166;
        border-radius: 8px;
        background: #18254d;
        image-rendering: pixelated;
        box-shadow: inset 0 0 10px rgba(255, 209, 102, 0.25);
      }
      .sc-role-badge {
        font-size: 9px;
        color: #9cd1ff;
        background: rgba(32, 48, 96, 0.85);
        border: 1px solid rgba(156, 209, 255, 0.45);
        border-radius: 999px;
        padding: 1px 6px;
        white-space: nowrap;
      }
      .sc-body {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .sc-header-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      #sc-speaker-name {
        font-size: 15px;
        font-weight: bold;
        color: #ffd166;
        letter-spacing: 0.5px;
      }
      #sc-close-btn {
        background: rgba(122, 46, 69, 0.88);
        color: #ffe6ee;
        border: 1px solid #ff9ec4;
        border-radius: 6px;
        padding: 2px 8px;
        font-family: monospace;
        font-size: 11px;
        font-weight: bold;
        cursor: pointer;
      }
      #sc-close-btn:hover {
        background: #a33b5b;
        border-color: #ffd166;
      }
      #sc-dialogue-text {
        font-size: 13px;
        line-height: 1.48;
        color: #f4f7ff;
        min-height: 38px;
        cursor: pointer;
      }
      .sc-choices-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
        padding-top: 6px;
        border-top: 1px dashed rgba(255, 209, 102, 0.28);
      }
      .sc-choice-btn {
        background: #213363;
        color: #fff8e6;
        border: 1.5px solid #8cc8ff;
        border-radius: 999px;
        padding: 4px 10px;
        font-family: monospace;
        font-size: 11px;
        font-weight: bold;
        cursor: pointer;
      }
      .sc-choice-btn:hover {
        background: #334e94;
        border-color: #ffd166;
        color: #ffe885;
      }
      .sc-choice-btn.bye {
        border-color: #ff9ec4;
        color: #ffd9e8;
      }
      .sc-hint-tag {
        margin-left: auto;
        font-size: 10px;
        color: #9cd1ff;
      }
      #sc-proximity-pill {
        position: fixed;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%);
        z-index: 9700;
        background: rgba(14, 21, 46, 0.94);
        color: #fff8e6;
        border: 2px solid #ffd166;
        border-radius: 999px;
        padding: 6px 16px;
        font-family: monospace;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.55);
      }
      #sc-proximity-pill.hidden { display: none !important; }
      #sc-roster-dock {
        position: fixed;
        left: 12px;
        bottom: 12px;
        z-index: 9450;
        display: none;
      }
      #sc-roster-toggle {
        background: rgba(15, 22, 46, 0.92);
        color: #ffd166;
        border: 1.5px solid #ffd166;
        border-radius: 999px;
        padding: 5px 11px;
        font-family: monospace;
        font-size: 11px;
        font-weight: bold;
        cursor: pointer;
      }
      #sc-roster-popover {
        margin-bottom: 6px;
        background: rgba(13, 20, 44, 0.96);
        border: 2px solid #8cc8ff;
        border-radius: 10px;
        padding: 8px;
        width: 245px;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        box-shadow: 0 8px 22px rgba(0, 0, 0, 0.65);
      }
      #sc-roster-popover.hidden { display: none !important; }
      .sc-npc-chip {
        background: #223466;
        color: #fff8e6;
        border: 1px solid #8cc8ff;
        border-radius: 6px;
        padding: 4px 8px;
        font-family: monospace;
        font-size: 11px;
        cursor: pointer;
        flex: 1 1 45%;
        text-align: center;
      }
      .sc-npc-chip:hover {
        background: #355099;
        border-color: #ffd166;
        color: #ffe885;
      }

      /* Animated 16-Bit Starlight Title Screen & Modals */
      #starlight-title-overlay {
        position: fixed;
        inset: 0;
        z-index: 20000;
        background: #080d1f;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 28px 16px 34px;
        overflow: hidden;
        transition: opacity 0.45s ease;
      }
      #starlight-title-overlay.fade-out { opacity: 0; pointer-events: none; }
      #starlight-title-overlay.hidden { display: none !important; }
      #title-pixel-bg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        z-index: 0;
      }
      .title-vignette {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 50% 45%, rgba(8, 13, 31, 0.08) 35%, rgba(6, 10, 24, 0.62) 100%);
        pointer-events: none;
        z-index: 1;
      }
      .title-header-card {
        position: relative;
        z-index: 2;
        text-align: center;
        background: rgba(12, 18, 42, 0.80);
        border: 3px solid #ffd166;
        box-shadow: 0 0 0 3px #141d3b, 0 10px 28px rgba(0, 0, 0, 0.65);
        border-radius: 10px;
        padding: 14px 28px 16px;
        margin-top: 6px;
      }
      .title-eyebrow {
        font-size: 11px;
        letter-spacing: 2.5px;
        color: #9cd1ff;
        text-transform: uppercase;
        margin-bottom: 4px;
      }
      .title-main-heading {
        font-size: clamp(22px, 4vw, 36px);
        font-weight: bold;
        color: #fff6d6;
        text-shadow: 0 3px 0 #2b2142, 0 0 16px rgba(255, 209, 102, 0.65);
        margin: 0;
        letter-spacing: 1.5px;
      }
      .title-sub-caption {
        font-size: 12px;
        color: #ffb8d8;
        margin-top: 5px;
      }
      .title-menu-stack {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        gap: 11px;
        width: min(270px, 82vw);
        margin-bottom: 8px;
      }
      .title-menu-btn {
        background: rgba(16, 24, 54, 0.92);
        color: #fff8e6;
        border: 2.5px solid #ffd166;
        box-shadow: 0 4px 0 #101630, 0 8px 18px rgba(0, 0, 0, 0.55);
        border-radius: 8px;
        padding: 11px 16px;
        font-family: monospace;
        font-size: 15px;
        font-weight: bold;
        letter-spacing: 1px;
        cursor: pointer;
        transition: transform 0.12s ease, background 0.15s ease;
      }
      .title-menu-btn:hover {
        background: #2b3f7d;
        border-color: #ffffff;
        color: #ffe885;
        transform: translateY(-2px);
      }
      .title-menu-btn.start-primary {
        background: linear-gradient(180deg, #32548f 0%, #1f3563 100%);
        border-color: #ffe082;
        font-size: 16px;
      }
      .title-menu-btn.exit-btn {
        border-color: #ff9ec4;
        color: #ffe6f0;
      }
      .title-menu-btn.exit-btn:hover {
        background: #5e2742;
        border-color: #ffd166;
      }
      #title-settings-modal, #title-exit-modal {
        position: fixed;
        inset: 0;
        z-index: 20010;
        background: rgba(6, 10, 24, 0.78);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #title-settings-modal.hidden, #title-exit-modal.hidden { display: none !important; }
      .modal-pixel-card {
        width: min(390px, 90vw);
        background: #131c3d;
        border: 3px solid #ffd166;
        box-shadow: 0 0 0 3px #0c1229, 0 14px 34px rgba(0, 0, 0, 0.75);
        border-radius: 10px;
        padding: 18px 20px;
        color: #fff8e6;
      }
      .modal-pixel-title {
        font-size: 17px;
        font-weight: bold;
        color: #ffd166;
        margin: 0 0 12px;
        text-align: center;
        border-bottom: 1px solid rgba(255, 209, 102, 0.3);
        padding-bottom: 8px;
      }
      .setting-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px dashed rgba(156, 209, 255, 0.22);
        font-size: 13px;
      }
      .setting-toggle-btn {
        background: #24376b;
        color: #ffe885;
        border: 1.5px solid #8cc8ff;
        border-radius: 6px;
        padding: 4px 10px;
        font-family: monospace;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        min-width: 118px;
      }
      #reopen-title-btn {
        position: fixed;
        bottom: 12px;
        right: 12px;
        z-index: 9400;
        background: rgba(15, 22, 46, 0.90);
        color: #ffd166;
        border: 1.5px solid #ffd166;
        border-radius: 999px;
        padding: 4px 10px;
        font-family: monospace;
        font-size: 11px;
        cursor: pointer;
        display: none;
      }
    `;
    document.head.appendChild(style);
  }

  function startUnifiedOnsenGame() {
    injectUnifiedStyles();
    window.__ONSEN_READY__ = true;

    const canvas = document.getElementById("game");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bannerEl = document.getElementById("banner");
    const warmthFill = document.getElementById("warmth-fill");
    const serenityFill = document.getElementById("serenity-fill");
    const btnTime = document.getElementById("btn-time");
    const btnSound = document.getElementById("btn-sound");
    const btnMap = document.getElementById("btn-map");
    const btnCloseMap = document.getElementById("btn-close-map");
    const mapOverlay = document.getElementById("map-overlay");
    const worldMapCanvas = document.getElementById("world-map");
    const mapHoverLabel = document.getElementById("map-hover-label");

    let minimapCanvas = document.getElementById("minimap-map");
    if (!minimapCanvas) {
      const mmWrap = document.getElementById("minimap") || document.body;
      minimapCanvas = document.createElement("canvas");
      minimapCanvas.id = "minimap-map";
      minimapCanvas.width = 220;
      minimapCanvas.height = 110;
      mmWrap.appendChild(minimapCanvas);
    }

    // Pixel-Art Internal Resolution
    const PIXEL_SCALE = 2;
    let viewW = 640;
    let viewH = 360;

    function resizeCanvas() {
      viewW = Math.max(360, Math.floor(window.innerWidth / PIXEL_SCALE));
      viewH = Math.max(240, Math.floor(window.innerHeight / PIXEL_SCALE));
      canvas.width = viewW;
      canvas.height = viewH;
      ctx.imageSmoothingEnabled = false;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Unified Three-Realm World Bounds & Ground Horizon
    const WORLD_MIN_X = -1860;
    const WORLD_MAX_X = 3640;
    const WORLD_W = WORLD_MAX_X - WORLD_MIN_X;
    const WORLD_H = 1590;

    const CITY_LEFT = WORLD_MIN_X;
    const CITY_RIGHT = -120;
    const ONSEN_LEFT = -120;
    const ONSEN_RIGHT = 1520;
    const MEADOW_LEFT = 1520;
    const MEADOW_RIGHT = WORLD_MAX_X;

    // Ground starts cleanly at y=210 so skybox & mountains align seamlessly
    const GROUND_TOP_Y = 210;
// ========================================================================
    // PART 2 OF 16: ATMOSPHERE MODES, WEB AUDIO SYNTHESIZER & TILE/PROP SPRITES
    // ========================================================================
    const TIME_MODES = [
      {
        name: "Starlight Night",
        skyTop: "#060b1f",
        skyMid: "#12224a",
        skyBot: "#243e75",
        tint: "rgba(10, 18, 44, 0.22)",
        starAlpha: 1.0,
        auroraAlpha: 0.36,
        lanternAlpha: 1.0,
        cloudColor: "rgba(182, 206, 255, 0.20)"
      },
      {
        name: "Sunset Glow",
        skyTop: "#2b1947",
        skyMid: "#9c4466",
        skyBot: "#f59d62",
        tint: "rgba(255, 148, 86, 0.14)",
        starAlpha: 0.30,
        auroraAlpha: 0.0,
        lanternAlpha: 0.65,
        cloudColor: "rgba(255, 206, 172, 0.45)"
      },
      {
        name: "Misty Dawn",
        skyTop: "#203363",
        skyMid: "#6282ba",
        skyBot: "#d4b5cc",
        tint: "rgba(176, 212, 255, 0.10)",
        starAlpha: 0.14,
        auroraAlpha: 0.08,
        lanternAlpha: 0.35,
        cloudColor: "rgba(245, 236, 250, 0.52)"
      }
    ];
    let timeIndex = 0;

    // Web Audio Chimes & Water Splash Synthesizer
    let audioCtx = null;
    let soundEnabled = true;

    function playChime(freqs, duration = 0.24) {
      if (!soundEnabled) return;
      try {
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === "suspended") audioCtx.resume();
        const now = audioCtx.currentTime;
        freqs.forEach((f, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(f, now + idx * 0.055);
          gain.gain.setValueAtTime(0.0001, now + idx * 0.055);
          gain.gain.exponentialRampToValueAtTime(0.05, now + idx * 0.055 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.055 + duration);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.055);
          osc.stop(now + idx * 0.055 + duration + 0.02);
        });
      } catch (_) {}
    }

    function playSplash(entering) {
      playChime(entering ? [329.63, 440.0, 587.33, 659.25] : [493.88, 392.0, 329.63], 0.2);
    }

    function makeSprite(w, h, drawFn) {
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const g = c.getContext("2d");
      g.imageSmoothingEnabled = false;
      drawFn(g, w, h);
      return c;
    }

    const SPRITES = {};
    function initBaseSprites() {
      // 1. Onsen Valley Lush Emerald Moss & Grass Tile (64x64)
      SPRITES.grassTile = makeSprite(64, 64, (g) => {
        g.fillStyle = "#3a732f";
        g.fillRect(0, 0, 64, 64);

        // Soft mossy patches
        g.fillStyle = "#448237";
        g.fillRect(4, 4, 22, 18);
        g.fillRect(36, 34, 24, 20);
        g.fillStyle = "#316327";
        g.fillRect(34, 6, 20, 16);
        g.fillRect(6, 38, 22, 18);

        // Detailed grass blades & fallen cherry petals
        const tufts = [
          [5, 7, "#58a845"], [18, 12, "#295420"], [34, 8, "#63b84f"], [50, 14, "#4d8f3c"],
          [10, 26, "#63b84f"], [26, 30, "#4d8f3c"], [44, 28, "#295420"], [56, 36, "#58a845"],
          [6, 48, "#295420"], [22, 52, "#4d8f3c"], [38, 46, "#63b84f"], [52, 56, "#4d8f3c"]
        ];
        for (const [bx, by, col] of tufts) {
          g.fillStyle = col;
          g.fillRect(bx, by, 3, 2);
          g.fillRect(bx + 1, by - 2, 1, 3);
        }

        // Occasional fallen sakura petals on valley turf
        g.fillStyle = "#ffb8d4";
        g.fillRect(14, 19, 2, 1);
        g.fillRect(47, 42, 2, 1);
        g.fillStyle = "#ffe6f2";
        g.fillRect(29, 53, 1, 2);
      });

      // 2. Flower Meadow Sunlit Clover & Wildflower Tile (64x64)
      SPRITES.meadowGrassTile = makeSprite(64, 64, (g) => {
        g.fillStyle = "#52993f";
        g.fillRect(0, 0, 64, 64);
        g.fillStyle = "#5eab49";
        g.fillRect(2, 2, 28, 26);
        g.fillRect(32, 32, 28, 28);

        g.fillStyle = "#6ec257";
        for (let y = 3; y < 64; y += 16) {
          for (let x = (y % 32 === 3 ? 4 : 12); x < 64; x += 20) {
            g.fillRect(x, y, 4, 2);
            g.fillRect(x + 1, y - 1, 2, 4);
          }
        }
        g.fillStyle = "#ff9ec4";
        g.fillRect(14, 18, 2, 2);
        g.fillRect(52, 12, 2, 2);
        g.fillStyle = "#fff3a1";
        g.fillRect(46, 44, 2, 2);
        g.fillRect(10, 50, 2, 2);
        g.fillStyle = "#bde0ff";
        g.fillRect(28, 54, 2, 2);
      });

      // 3. Kingsbury Royal Beveled Cobblestone Tile (64x64)
      SPRITES.cobbleTile = makeSprite(64, 64, (g) => {
        g.fillStyle = "#4d4842";
        g.fillRect(0, 0, 64, 64);
        const stones = [
          [1, 1, 14, 10, "#857e74"], [17, 1, 14, 10, "#968e82"], [33, 1, 14, 10, "#7a736a"], [49, 1, 14, 10, "#8f877b"],
          [1, 13, 10, 10, "#968e82"], [13, 13, 16, 10, "#7d766c"], [31, 13, 15, 10, "#8c8478"], [48, 13, 15, 10, "#7a736a"],
          [1, 25, 15, 10, "#7d766c"], [18, 25, 14, 10, "#91897d"], [34, 25, 14, 10, "#827b71"], [50, 25, 13, 10, "#968e82"],
          [1, 37, 12, 11, "#8c8478"], [15, 37, 15, 11, "#787168"], [32, 37, 15, 11, "#948c80"], [49, 37, 14, 11, "#827b71"],
          [1, 50, 15, 12, "#827b71"], [18, 50, 14, 12, "#8f877b"], [34, 50, 14, 12, "#787168"], [50, 50, 13, 12, "#91897d"]
        ];
        for (const [sx, sy, sw, sh, col] of stones) {
          g.fillStyle = col;
          g.fillRect(sx, sy, sw, sh);
          g.fillStyle = "rgba(255, 250, 240, 0.28)";
          g.fillRect(sx, sy, sw, 1);
          g.fillRect(sx, sy, 1, sh);
          g.fillStyle = "rgba(30, 26, 22, 0.22)";
          g.fillRect(sx, sy + sh - 1, sw, 1);
        }
      });

      // 4. Mossy Alpine Boulder & River Stone
      SPRITES.boulder = makeSprite(38, 26, (g) => {
        g.fillStyle = "rgba(14, 22, 16, 0.36)";
        g.beginPath();
        g.ellipse(19, 22, 16, 4.5, 0, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = "#454c54";
        g.beginPath();
        g.ellipse(19, 14, 15, 10, 0, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = "#68727d";
        g.beginPath();
        g.ellipse(17, 12, 12, 7, 0, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = "#8a95a3";
        g.fillRect(11, 7, 10, 3);
        // Lush Emerald Moss Cap & Tiny Blossoms
        g.fillStyle = "#488f3b";
        g.fillRect(8, 5, 18, 4);
        g.fillStyle = "#6ec257";
        g.fillRect(10, 5, 12, 2);
        g.fillStyle = "#ff9ec4";
        g.fillRect(14, 6, 2, 1);
      });

      SPRITES.smallRock = makeSprite(22, 16, (g) => {
        g.fillStyle = "rgba(14, 22, 16, 0.3)";
        g.beginPath();
        g.ellipse(11, 13, 9, 3, 0, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = "#4e555e";
        g.beginPath();
        g.ellipse(11, 9, 8.5, 5.5, 0, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = "#7b848f";
        g.fillRect(6, 6, 8, 3);
        g.fillStyle = "#529943";
        g.fillRect(7, 5, 6, 2);
      });

      // 5. Detailed Cedar & Wrought-Iron Park Bench
      SPRITES.woodenBench = makeSprite(48, 28, (g) => {
        g.fillStyle = "rgba(14, 22, 16, 0.34)";
        g.fillRect(4, 22, 40, 4);
        // Cast-iron armrests & legs
        g.fillStyle = "#262b38";
        g.fillRect(5, 6, 3, 18);
        g.fillRect(40, 6, 3, 18);
        g.fillRect(4, 11, 5, 2);
        g.fillRect(39, 11, 5, 2);
        // Warm cedar slats
        g.fillStyle = "#8f582e";
        g.fillRect(6, 7, 36, 5);
        g.fillRect(6, 14, 36, 5);
        g.fillStyle = "#c98b57";
        g.fillRect(6, 7, 36, 2);
        g.fillRect(6, 14, 36, 2);
        // Brass bolts
        g.fillStyle = "#ffd166";
        g.fillRect(8, 8, 1, 1);
        g.fillRect(39, 8, 1, 1);
        g.fillRect(8, 15, 1, 1);
        g.fillRect(39, 15, 1, 1);
      });

      // 6. Oak Cask Barrel with Iron Hoops
      SPRITES.woodenBarrel = makeSprite(24, 28, (g) => {
        g.fillStyle = "rgba(14, 22, 16, 0.34)";
        g.beginPath();
        g.ellipse(12, 25, 9, 3.5, 0, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = "#7a4722";
        g.fillRect(4, 5, 16, 19);
        g.fillStyle = "#ab6b3c";
        g.fillRect(6, 4, 12, 20);
        g.fillStyle = "#c98755";
        g.fillRect(9, 4, 4, 20);
        g.fillStyle = "#2e3440";
        g.fillRect(4, 8, 16, 2);
        g.fillRect(4, 18, 16, 2);
        g.fillStyle = "#ffd166";
        g.fillRect(11, 13, 2, 2);
      });
    }
    initBaseSprites();
// ========================================================================
    // PART 3 OF 16: TALL, THIN-TRUNKED DETAILED TREES & 10-SPECIES FLOWERS
    // ========================================================================
    function initBotanicalSprites() {
      // Helper to stamp layered leaf/blossom clusters for rich foliage volume
      function drawLeafPuff(g, cx, cy, rx, ry, shadowCol, midCol, lightCol, tipCol) {
        g.fillStyle = shadowCol;
        g.beginPath();
        g.ellipse(cx, cy + 2, rx, ry, 0, 0, Math.PI * 2);
        g.fill();

        g.fillStyle = midCol;
        g.beginPath();
        g.ellipse(cx, cy, rx - 1, ry - 1, 0, 0, Math.PI * 2);
        g.fill();

        g.fillStyle = lightCol;
        g.beginPath();
        g.ellipse(cx - 2, cy - 3, rx * 0.72, ry * 0.68, 0, 0, Math.PI * 2);
        g.fill();

        // Individual pixel leaf-tuft highlights
        g.fillStyle = tipCol;
        g.fillRect(Math.round(cx - rx * 0.45), Math.round(cy - ry * 0.45), 4, 2);
        g.fillRect(Math.round(cx + rx * 0.12), Math.round(cy - ry * 0.55), 5, 2);
        g.fillRect(Math.round(cx - rx * 0.15), Math.round(cy - ry * 0.2), 3, 2);
      }

      // 1. Tall, Thin-Trunked Emerald Oak with Expansive Layered Leaf Canopy (96x126)
      SPRITES.treeOak = makeSprite(96, 126, (g) => {
        // Ground shadow
        g.fillStyle = "rgba(14, 24, 16, 0.34)";
        g.beginPath();
        g.ellipse(48, 119, 26, 6.5, 0, 0, Math.PI * 2);
        g.fill();

        // Tall, slender trunk with root flare & upper fork branches
        g.fillStyle = "#3d2515";
        g.fillRect(45, 56, 6, 62);
        g.fillRect(43, 113, 10, 5);
        g.fillStyle = "#694228";
        g.fillRect(46, 56, 3, 61);
        g.fillStyle = "#875736";
        g.fillRect(47, 60, 1, 54);

        // Slender spreading upper limbs
        g.fillStyle = "#4a2e1b";
        g.fillRect(35, 52, 11, 3);
        g.fillRect(50, 50, 12, 3);
        g.fillRect(46, 44, 4, 12);

        // Big, lush multi-lobed oak leaf crown
        drawLeafPuff(g, 30, 52, 20, 16, "#1b4219", "#2c6628", "#45913f", "#68bd60");
        drawLeafPuff(g, 66, 52, 20, 16, "#1b4219", "#2c6628", "#45913f", "#68bd60");
        drawLeafPuff(g, 48, 56, 24, 17, "#1e4a1c", "#32732d", "#4ca145", "#72c969");
        drawLeafPuff(g, 34, 36, 21, 16, "#22521f", "#388033", "#57b04f", "#80d676");
        drawLeafPuff(g, 62, 36, 21, 16, "#22521f", "#388033", "#57b04f", "#80d676");
        drawLeafPuff(g, 48, 25, 25, 18, "#285e24", "#42913c", "#66c25d", "#94e88b");
      });

      // 2. Tall, Graceful Thin-Trunked Sakura Cherry Tree with Abundant Blossoms (102x128)
      SPRITES.treeSakura = makeSprite(102, 128, (g) => {
        // Ground shadow with fallen petal ring
        g.fillStyle = "rgba(14, 24, 16, 0.32)";
        g.beginPath();
        g.ellipse(51, 121, 28, 6.5, 0, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = "#ffb8d4";
        g.fillRect(34, 120, 2, 1);
        g.fillRect(62, 121, 2, 1);
        g.fillRect(45, 123, 2, 1);

        // Tall, slender dark cherry-bark trunk with subtle horizontal lenticels
        g.fillStyle = "#3b231d";
        g.fillRect(48, 56, 6, 64);
        g.fillRect(46, 115, 10, 5);
        g.fillStyle = "#5c3830";
        g.fillRect(49, 56, 3, 63);
        g.fillStyle = "#7a4c42";
        g.fillRect(50, 62, 1, 52);

        // Slender spreading cherry boughs
        g.fillStyle = "#472a23";
        g.fillRect(34, 52, 15, 3);
        g.fillRect(53, 50, 16, 3);
        g.fillRect(49, 42, 4, 14);

        // Expansive, cloud-like multi-tiered sakura blossom crown
        drawLeafPuff(g, 28, 52, 22, 16, "#b54872", "#e06c99", "#ff9ec4", "#ffd9e8");
        drawLeafPuff(g, 74, 52, 22, 16, "#b54872", "#e06c99", "#ff9ec4", "#ffd9e8");
        drawLeafPuff(g, 51, 56, 25, 17, "#c2527d", "#eb7aa6", "#ffadd0", "#ffe3ef");
        drawLeafPuff(g, 34, 35, 23, 17, "#cc5c87", "#f288b2", "#ffb8d6", "#ffebf4");
        drawLeafPuff(g, 68, 35, 23, 17, "#cc5c87", "#f288b2", "#ffb8d6", "#ffebf4");
        drawLeafPuff(g, 51, 24, 27, 19, "#d66792", "#fa96be", "#ffc7df", "#ffffff");

        // Crisp individual cherry blossom clusters & trailing petals
        const blossoms = [
          [22, 48], [32, 30], [46, 17], [58, 20], [72, 31],
          [80, 49], [41, 44], [61, 43], [27, 62], [75, 61]
        ];
        for (const [bx, by] of blossoms) {
          g.fillStyle = "#ffffff";
          g.fillRect(bx, by, 3, 2);
          g.fillRect(bx + 1, by - 1, 2, 3);
          g.fillStyle = "#ff6fa5";
          g.fillRect(bx + 1, by, 1, 1);
        }
      });

      // 3. Tall, Slender-Trunked Alpine Pine with Lush Layered Boughs (82x130)
      SPRITES.treePine = makeSprite(82, 130, (g) => {
        g.fillStyle = "rgba(14, 24, 16, 0.34)";
        g.beginPath();
        g.ellipse(41, 123, 22, 5.5, 0, 0, Math.PI * 2);
        g.fill();

        // Tall, thin pine trunk
        g.fillStyle = "#3b2314";
        g.fillRect(39, 76, 4, 46);
        g.fillRect(37, 118, 8, 4);
        g.fillStyle = "#613c24";
        g.fillRect(40, 76, 2, 45);

        // Four wide, richly textured evergreen needle tiers
        const tiers = [
          [94, 32, "#153825", "#215438", "#327851"],
          [74, 27, "#1a452e", "#286342", "#3b8a5e"],
          [54, 21, "#205237", "#31754f", "#47a16f"],
          [34, 15, "#276141", "#3b8a5e", "#56ba82"]
        ];
        for (const [by, hw, cDark, cMid, cLight] of tiers) {
          g.fillStyle = cDark;
          g.beginPath();
          g.moveTo(41 - hw, by);
          g.lineTo(41, by - 30);
          g.lineTo(41 + hw, by);
          g.closePath();
          g.fill();

          g.fillStyle = cMid;
          g.beginPath();
          g.moveTo(41 - hw + 4, by - 3);
          g.lineTo(41, by - 30);
          g.lineTo(41 + hw - 6, by - 4);
          g.closePath();
          g.fill();

          // Jagged needle fringe & sun-lit tips
          g.fillStyle = cLight;
          g.fillRect(41 - Math.round(hw * 0.45), by - 12, 4, 3);
          g.fillRect(41 - 2, by - 22, 4, 5);
          g.fillRect(41 + Math.round(hw * 0.2), by - 10, 4, 3);
        }
      });

      // 4. Tall, Thin-Trunked Lakeside Weeping Willow with Broad Leaf Canopy (104x126)
      SPRITES.treeWillow = makeSprite(104, 126, (g) => {
        g.fillStyle = "rgba(14, 24, 16, 0.32)";
        g.beginPath();
        g.ellipse(52, 119, 28, 6.5, 0, 0, Math.PI * 2);
        g.fill();

        // Tall, slender willow trunk
        g.fillStyle = "#452c1b";
        g.fillRect(49, 54, 6, 64);
        g.fillRect(47, 114, 10, 5);
        g.fillStyle = "#6b462d";
        g.fillRect(50, 54, 3, 63);

        // Broad, lush upper willow leaf canopy
        drawLeafPuff(g, 32, 44, 22, 16, "#23542d", "#367d44", "#52ab63", "#78d489");
        drawLeafPuff(g, 72, 44, 22, 16, "#23542d", "#367d44", "#52ab63", "#78d489");
        drawLeafPuff(g, 52, 32, 28, 19, "#2a6335", "#439452", "#64c475", "#8ce89c");

        // Graceful cascading willow leaf vines with tufted leaves
        for (let vx = 16; vx <= 88; vx += 6) {
          const drop = 34 + ((vx * 7) % 24);
          g.fillStyle = vx % 12 === 0 ? "#4ba35a" : "#357a41";
          g.fillRect(vx, 42, 3, drop);
          g.fillStyle = "#72cf82";
          g.fillRect(vx, 46, 2, 4);
          g.fillRect(vx + 1, 58, 2, 4);
          if (drop > 44) {
            g.fillRect(vx, 70, 2, 4);
          }
        }
      });

      // 5. Ten High-Detail Botanical Flower Sprites
      SPRITES.flowers = {
        blushRosebush: makeSprite(38, 34, (g) => {
          g.fillStyle = "rgba(18, 28, 16, 0.30)";
          g.beginPath();
          g.ellipse(19, 29, 16, 4, 0, 0, Math.PI * 2);
          g.fill();
          g.fillStyle = "#295724";
          g.beginPath();
          g.ellipse(19, 18, 16, 12, 0, 0, Math.PI * 2);
          g.fill();
          g.fillStyle = "#498f3f";
          g.beginPath();
          g.ellipse(18, 16, 14, 10, 0, 0, Math.PI * 2);
          g.fill();
          const roses = [
            [9, 11, "#ff7aa8"], [19, 8, "#ffb3d1"], [27, 14, "#ff8fb8"],
            [12, 19, "#ffd6e7"], [21, 19, "#f05d90"], [17, 13, "#ff9ec4"]
          ];
          for (const [rx, ry, rc] of roses) {
            g.fillStyle = "#c93b6b";
            g.fillRect(rx - 1, ry, 6, 5);
            g.fillStyle = rc;
            g.fillRect(rx, ry - 1, 4, 5);
            g.fillStyle = "#fff5f9";
            g.fillRect(rx + 1, ry + 1, 2, 2);
          }
        }),
        snowDaisy: makeSprite(30, 30, (g) => {
          for (const [fx, fy] of [[8, 13], [18, 10], [12, 19], [21, 18]]) {
            g.fillStyle = "#3b7530";
            g.fillRect(fx, fy + 2, 2, 7);
            g.fillStyle = "#ffffff";
            g.fillRect(fx - 2, fy - 1, 6, 4);
            g.fillRect(fx - 1, fy - 2, 4, 6);
            g.fillStyle = "#ffd43b";
            g.fillRect(fx, fy, 2, 2);
          }
        }),
        babyBluebell: makeSprite(30, 30, (g) => {
          for (const [fx, fy] of [[9, 10], [19, 13]]) {
            g.fillStyle = "#3b7530";
            g.fillRect(fx, fy + 1, 2, 13);
            g.fillStyle = "#3b82d6";
            g.fillRect(fx - 3, fy - 1, 8, 6);
            g.fillStyle = "#7cc0ff";
            g.fillRect(fx - 2, fy - 2, 6, 6);
            g.fillStyle = "#d6eeff";
            g.fillRect(fx - 1, fy, 4, 3);
          }
        }),
        skyHydrangea: makeSprite(34, 30, (g) => {
          g.fillStyle = "#2d5e28";
          g.beginPath();
          g.ellipse(17, 18, 14, 9, 0, 0, Math.PI * 2);
          g.fill();
          g.fillStyle = "#4d9443";
          g.beginPath();
          g.ellipse(17, 16, 12, 7, 0, 0, Math.PI * 2);
          g.fill();
          for (const [px, py, pc] of [[8, 11, "#75baff"], [17, 7, "#add8ff"], [23, 13, "#8cc8ff"], [13, 16, "#cce6ff"]]) {
            g.fillStyle = "#4a90d9";
            g.fillRect(px - 1, py, 7, 6);
            g.fillStyle = pc;
            g.fillRect(px, py - 1, 5, 6);
          }
        }),
        pastelLavender: makeSprite(30, 30, (g) => {
          for (const ox of [7, 14, 21]) {
            g.fillStyle = "#3b7530";
            g.fillRect(ox, 12, 2, 13);
            g.fillStyle = "#8a6cd1";
            g.fillRect(ox - 2, 5, 6, 9);
            g.fillStyle = "#b99ff5";
            g.fillRect(ox - 1, 4, 4, 9);
            g.fillStyle = "#ebe3ff";
            g.fillRect(ox, 4, 2, 6);
          }
        }),
        pearlLily: makeSprite(30, 30, (g) => {
          for (const [fx, fy] of [[10, 11], [19, 15]]) {
            g.fillStyle = "#3b7530";
            g.fillRect(fx, fy + 2, 2, 10);
            g.fillStyle = "#f5c6da";
            g.fillRect(fx - 3, fy - 3, 8, 8);
            g.fillStyle = "#ffffff";
            g.fillRect(fx - 2, fy - 2, 6, 6);
            g.fillStyle = "#ffe066";
            g.fillRect(fx, fy, 2, 2);
          }
        }),
        peachBlossom: makeSprite(30, 30, (g) => {
          for (const [fx, fy] of [[8, 13], [16, 9], [20, 16]]) {
            g.fillStyle = "#3b7530";
            g.fillRect(fx, fy + 2, 2, 8);
            g.fillStyle = "#f29bb2";
            g.fillRect(fx - 3, fy - 2, 8, 6);
            g.fillStyle = "#ffd1dc";
            g.fillRect(fx - 2, fy - 1, 6, 4);
          }
        }),
        pinkCosmos: makeSprite(30, 30, (g) => {
          for (const [fx, fy] of [[9, 11], [19, 14], [12, 19]]) {
            g.fillStyle = "#3b7530";
            g.fillRect(fx, fy + 2, 2, 9);
            g.fillStyle = "#ff7aa8";
            g.fillRect(fx - 3, fy - 2, 8, 6);
            g.fillStyle = "#ffb8d8";
            g.fillRect(fx - 2, fy - 1, 6, 4);
            g.fillStyle = "#ffd43b";
            g.fillRect(fx, fy, 2, 2);
          }
        }),
        goldenButtercup: makeSprite(30, 30, (g) => {
          for (const [fx, fy] of [[8, 12], [17, 10], [13, 19], [21, 17]]) {
            g.fillStyle = "#3b7530";
            g.fillRect(fx, fy + 2, 2, 8);
            g.fillStyle = "#f59f00";
            g.fillRect(fx - 2, fy - 1, 6, 4);
            g.fillStyle = "#ffe066";
            g.fillRect(fx - 1, fy - 2, 4, 5);
          }
        }),
        starlightOrchid: makeSprite(30, 30, (g) => {
          for (const [fx, fy] of [[10, 11], [19, 15]]) {
            g.fillStyle = "#3b7530";
            g.fillRect(fx, fy + 2, 2, 11);
            g.fillStyle = "#9775fa";
            g.fillRect(fx - 3, fy - 2, 8, 6);
            g.fillStyle = "#e5dbff";
            g.fillRect(fx - 2, fy - 1, 6, 4);
            g.fillStyle = "#ff8fb8";
            g.fillRect(fx, fy, 2, 2);
          }
        })
      };
    }
    initBotanicalSprites();
// ========================================================================
    // PART 4 OF 16: HOT SPRINGS, SOUTHERN ALPINE LAKE, MEADOW HILLS & TRAILS
    // ========================================================================
    const SPRINGS = [
      {
        id: "emerald",
        name: "♨ Grand Emerald Yuzu Spring",
        x: 720, y: 760, rx: 116, ry: 75,
        waterColor: "#4fd1b5", deepColor: "#268f78", shimmerColor: "#b8fff0", rimColor: "#636b68",
        yuzu: true,
        petals: true,
        bambooSpout: { x: 720, y: 685 },
        steps: { x: 696, y: 675, w: 48, h: 24 }
      },
      {
        id: "ember",
        name: "🔥 Calcifer's Ember Rock Pool",
        x: 410, y: 605, rx: 84, ry: 57,
        waterColor: "#f07c4f", deepColor: "#bd4924", shimmerColor: "#ffd6b3", rimColor: "#5e463c",
        bambooSpout: { x: 410, y: 548 },
        steps: { x: 392, y: 653, w: 36, h: 22 }
      },
      {
        id: "sakura",
        name: "🌸 Sakura Blossom Spring",
        x: 1045, y: 605, rx: 88, ry: 60,
        waterColor: "#f294bc", deepColor: "#c45885", shimmerColor: "#ffe0ee", rimColor: "#6e6568",
        petals: true,
        bambooSpout: { x: 1045, y: 545 },
        steps: { x: 1027, y: 656, w: 36, h: 22 }
      },
      {
        id: "hinoki_west",
        name: "🪵 Western Cedar Hinoki Tub",
        x: 335, y: 850, rx: 52, ry: 38,
        waterColor: "#66c7d1", deepColor: "#378c96", shimmerColor: "#ccf8ff", rimColor: "#9c683e",
        isWoodTub: true,
        yuzu: true,
        steps: { x: 319, y: 882, w: 32, h: 20 }
      },
      {
        id: "hinoki_east",
        name: "🪵 Eastern Cedar Hinoki Tub",
        x: 445, y: 870, rx: 50, ry: 36,
        waterColor: "#66c7d1", deepColor: "#378c96", shimmerColor: "#ccf8ff", rimColor: "#9c683e",
        isWoodTub: true,
        petals: true,
        steps: { x: 429, y: 900, w: 32, h: 20 }
      },
      {
        id: "bamboo_grove",
        name: "🎋 Bamboo Mist Mineral Pool",
        x: 1030, y: 835, rx: 80, ry: 54,
        waterColor: "#54c79d", deepColor: "#2d8a68", shimmerColor: "#c2ffe7", rimColor: "#5e6962",
        petals: true,
        bambooSpout: { x: 1030, y: 781 },
        steps: { x: 1012, y: 881, w: 36, h: 22 }
      },
      {
        id: "starlight_basin",
        name: "✨ Starlight Reflection Basin",
        x: 565, y: 955, rx: 76, ry: 50,
        waterColor: "#7c8be6", deepColor: "#4957b0", shimmerColor: "#dce2ff", rimColor: "#5d6270",
        steps: { x: 547, y: 997, w: 36, h: 22 }
      }
    ];

    const SPRING_ROCKS = [];
    for (const s of SPRINGS) {
      if (s.isWoodTub) continue;
      const count = 14;
      for (let i = 0; i < count; i++) {
        const ang = (i / count) * Math.PI * 2;
        if (Math.abs(Math.sin(ang) - 1) < 0.28 || Math.abs(Math.sin(ang) + 1) < 0.28) continue;
        SPRING_ROCKS.push({
          x: s.x + Math.cos(ang) * (s.rx + 6),
          y: s.y + Math.sin(ang) * (s.ry + 5),
          big: i % 3 === 0
        });
      }
    }

    const WOOD_DECKS = [
      { x: 555, y: 505, w: 330, h: 42 },
      { x: 696, y: 547, w: 48, h: 132 },
      { x: 375, y: 672, w: 72, h: 162 },
      { x: 1005, y: 676, w: 72, h: 110 },
      { x: 645, y: 834, w: 150, h: 46 }
    ];

    // Southern Alpine Lake Shoreline, Wading Shallows, Lantern Islet & Piers
    const WADING_DEPTH = 48;

    function getSouthernLakeShoreY(x) {
      if (x < -140) return 1222;
      return 1195 + Math.sin(x * 0.0028) * 24 + Math.cos(x * 0.0061) * 9;
    }

    const LAKE_ISLAND = {
      x: 1360,
      y: 1375,
      rx: 155,
      ry: 84
    };

    const ISLAND_BRIDGE = {
      x: 1336,
      y: 1195,
      w: 48,
      h: 115
    };

    const SOUTHERN_PIERS = [
      { x: -1580, w: 44, len: 105 },
      { x: -460, w: 48, len: 112 },
      { x: 700, w: 48, len: 112 },
      { x: 1945, w: 44, len: 105 },
      { x: 2925, w: 44, len: 105 }
    ];

    // Terraced Hills in Howl's Secret Flower Meadow
    const MEADOW_HILLS = [
      {
        x: 1740, y: 310, w: 490, h: 255,
        grassTop: "#6cc253", grassEdge: "#8ae06e", cliffFace: "#9e7b56", cliffDark: "#6e5236",
        stairs: [{ x: 1955, w: 62 }]
      },
      {
        x: 2680, y: 295, w: 540, h: 315,
        grassTop: "#6cc253", grassEdge: "#8ae06e", cliffFace: "#9e7b56", cliffDark: "#6e5236",
        stairs: [{ x: 2915, w: 66 }]
      }
    ];

    // Multi-Style Connected Trails Across All Three Realms
    const ALL_TRAILS = [
      // Kingsbury City Flagstone Avenues
      {
        style: "stone",
        points: [
          { x: -1750, y: 695 }, { x: -1355, y: 695 }, { x: -1035, y: 695 },
          { x: -690, y: 695 }, { x: -340, y: 695 }, { x: -120, y: 695 }
        ]
      },
      {
        style: "stone",
        points: [
          { x: -1595, y: 565 }, { x: -1595, y: 695 }, { x: -1595, y: 1135 },
          { x: -1295, y: 1115 }, { x: -775, y: 1115 }, { x: -438, y: 1115 }, { x: -438, y: 1215 }
        ]
      },
      {
        style: "stone",
        points: [
          { x: -1035, y: 545 }, { x: -1035, y: 695 }, { x: -1035, y: 1115 }
        ]
      },
      // Onsen Valley Cedar & Gravel Garden Walks
      {
        style: "garden",
        points: [
          { x: -120, y: 695 }, { x: 240, y: 695 }, { x: 555, y: 545 },
          { x: 885, y: 545 }, { x: 1220, y: 695 }, { x: 1520, y: 695 }
        ]
      },
      {
        style: "garden",
        points: [
          { x: 720, y: 545 }, { x: 720, y: 676 }, { x: 720, y: 855 },
          { x: 720, y: 1035 }, { x: 724, y: 1195 }
        ]
      },
      {
        style: "garden",
        points: [
          { x: 720, y: 1035 }, { x: 1135, y: 1035 }, { x: 1360, y: 1195 }
        ]
      },
      // Flower Meadow Sunlit Garden Paths
      {
        style: "meadow",
        points: [
          { x: 1520, y: 695 }, { x: 1986, y: 695 }, { x: 2450, y: 695 },
          { x: 2948, y: 695 }, { x: 3360, y: 740 }
        ]
      },
      {
        style: "meadow",
        points: [
          { x: 1986, y: 530 }, { x: 1986, y: 695 }, { x: 1967, y: 1195 }
        ]
      },
      {
        style: "meadow",
        points: [
          { x: 2948, y: 585 }, { x: 2948, y: 695 }, { x: 2947, y: 1195 }
        ]
      }
    ];
// ========================================================================
    // PART 5 OF 16: CANALS, BRIDGES, GONDOLAS & THREE-REALM ARCHITECTURE DATA
    // ========================================================================
    const CITY_CANALS = [
      { x: -1295, y: 540, w: 66, h: 682 },
      { x: -775, y: 540, w: 66, h: 682 },
      { x: -1760, y: 998, w: 1410, h: 52 }
    ];

    const CANAL_BRIDGES = [
      // East-West Avenue Bridges
      { x: -1307, y: 656, w: 90, h: 78, horizontal: true },
      { x: -787, y: 656, w: 90, h: 78, horizontal: true },
      { x: -1307, y: 1080, w: 90, h: 66, horizontal: true },
      { x: -787, y: 1080, w: 90, h: 66, horizontal: true },
      // North-South Avenue Bridges across South Canal
      { x: -1628, y: 986, w: 66, h: 76, horizontal: false },
      { x: -1475, y: 986, w: 66, h: 76, horizontal: false },
      { x: -1068, y: 986, w: 66, h: 76, horizontal: false },
      { x: -910, y: 986, w: 66, h: 76, horizontal: false }
    ];

    const CITY_GONDOLAS = [
      { x: -1262, y: 825, trim: "#ff8fb8", canopy: "#ff9ec4" },
      { x: -742, y: 855, trim: "#ffd166", canopy: "#7cc0ff" },
      { x: -1180, y: 1024, trim: "#9cd1ff", canopy: "#ffd166" }
    ];

    const ROYAL_FOUNTAIN = { x: -1035, y: 695, rx: 42, ry: 26 };

    // All Buildings Anchored Solidly on Ground (y >= 215, Below Sky Horizon)
    const BUILDINGS = [
      // Kingsbury Northern Terrace Landmarks
      {
        name: "Royal Astronomical Observatory",
        x: -1155, y: 220, w: 185, h: 135,
        kind: "observatory", wall: "#efe5d1", roof: "#266b65", roofLight: "#43a198", trim: "#ffd166"
      },
      {
        name: "Royal Alchemist & Clock Spire",
        x: -845, y: 215, w: 150, h: 145,
        kind: "spire", wall: "#f5ead4", roof: "#3a4b82", roofLight: "#586eb5", trim: "#ffd166"
      },
      {
        name: "Grand Canal Symphony Opera",
        x: -555, y: 220, w: 215, h: 140,
        kind: "opera_grand", wall: "#faf0dc", roof: "#853457", roofLight: "#b34b78", trim: "#ffd166"
      },

      // Kingsbury Royal Boulevard (North Side)
      {
        name: "Kingsbury Royal Palace",
        x: -1815, y: 315, w: 430, h: 245,
        kind: "palace", wall: "#faf2e1", roof: "#233c63", roofLight: "#3b5f94", trim: "#ffd166"
      },
      {
        name: "Royal Botanical Conservatory",
        x: -1380, y: 365, w: 245, h: 190,
        kind: "conservatory", wall: "#e8f8fc", roof: "#7ad4eb", roofLight: "#baf0ff", trim: "#ffd166"
      },
      {
        name: "Kingsbury Clockmaker Guild",
        x: -1085, y: 375, w: 215, h: 180,
        kind: "townhouse", wall: "#f7ecd7", roof: "#355273", roofLight: "#4e75a1", trim: "#ffd166",
        awning1: "#355273", awning2: "#ffd166"
      },
      {
        name: "Cesari's Royal Patisserie",
        x: -835, y: 385, w: 195, h: 170,
        kind: "townhouse", wall: "#fff3e6", roof: "#b8425c", roofLight: "#de5b78", trim: "#ffd166",
        awning1: "#d9536f", awning2: "#fff5f8"
      },
      {
        name: "Hatter's Starlight Millinery",
        x: -585, y: 380, w: 195, h: 175,
        kind: "townhouse", wall: "#f5ebd6", roof: "#3c755e", roofLight: "#569e81", trim: "#ffb8d8",
        awning1: "#4a8c73", awning2: "#ffb8d8"
      },
      {
        name: "Royal Apothecary & Tea House",
        x: -360, y: 385, w: 205, h: 170,
        kind: "townhouse", wall: "#f7eedb", roof: "#5c4785", roofLight: "#7c63ad", trim: "#ffe58f",
        awning1: "#685294", awning2: "#ffe58f"
      },

      // Kingsbury West Station & Mid-Tier Canal Quarter
      {
        name: "Kingsbury Grand Central Station",
        x: -1835, y: 615, w: 205, h: 145,
        kind: "station", wall: "#f7eedb", roof: "#2c4c6e", roofLight: "#436d99", trim: "#ffd166"
      },
      {
        name: "West Watchmaker Atelier",
        x: -1795, y: 805, w: 175, h: 145,
        kind: "townhouse", wall: "#f5ead4", roof: "#3e5370", roofLight: "#5a7599", trim: "#9cd1ff",
        awning1: "#475c7a", awning2: "#9cd1ff"
      },
      {
        name: "Royal Archive & Bookshop",
        x: -1565, y: 800, w: 210, h: 150,
        kind: "townhouse", wall: "#faf0dc", roof: "#2f4e70", roofLight: "#47709c", trim: "#ffd166",
        awning1: "#365678", awning2: "#ffd166"
      },
      {
        name: "Canal-Side Florist Atelier",
        x: -1205, y: 805, w: 150, h: 145,
        kind: "townhouse", wall: "#fff4e8", roof: "#8c3f5f", roofLight: "#b5587f", trim: "#a3e096",
        awning1: "#9c496c", awning2: "#a3e096"
      },
      {
        name: "Botanical Herbary Guild",
        x: -1005, y: 805, w: 185, h: 145,
        kind: "townhouse", wall: "#f2f7ee", roof: "#3d614e", roofLight: "#57856d", trim: "#ff9ec4",
        awning1: "#486b58", awning2: "#ff9ec4"
      },
      {
        name: "Harbor Chandlery & Maps",
        x: -685, y: 805, w: 195, h: 145,
        kind: "townhouse", wall: "#f7eedb", roof: "#36574b", roofLight: "#4f7a6a", trim: "#ffd166",
        awning1: "#3f6356", awning2: "#ffd166"
      },
      {
        name: "Conservatory Chamber Hall",
        x: -460, y: 800, w: 195, h: 150,
        kind: "townhouse", wall: "#faf0dc", roof: "#753353", roofLight: "#9e4a73", trim: "#ffe58f",
        awning1: "#853d60", awning2: "#ffe58f"
      },

      // Kingsbury Harbor & South Canal Promenade
      {
        name: "Artisan Boulangerie & Guild",
        x: -1575, y: 1068, w: 195, h: 118,
        kind: "boulangerie", wall: "#f7ebd2", roof: "#a34636", roofLight: "#cc5c49", trim: "#ff9ec4"
      },
      {
        name: "Canal-Side Glass Tea Salon",
        x: -1205, y: 1068, w: 195, h: 118,
        kind: "teasalon", wall: "#eef8f6", roof: "#38735e", roofLight: "#549e84", trim: "#9cd1ff"
      },
      {
        name: "Harbor Flower Market Pavilion",
        x: -975, y: 1072, w: 155, h: 114,
        kind: "market", wall: "#fff6e5", roof: "#d95b78", roofLight: "#ff8fb8", trim: "#ffd166"
      },
      {
        name: "Kingsbury Harbor Lighthouse",
        x: -645, y: 1055, w: 110, h: 132,
        kind: "lighthouse", wall: "#fff9ed", roof: "#c93b4b", roofLight: "#eb5768", trim: "#ffd166"
      },

      // Onsen Valley & Flower Meadow Landmarks
      {
        name: "Starlight Grand Bathhouse",
        x: 515, y: 315, w: 410, h: 195,
        kind: "bathhouse", wall: "#f5ead6", roof: "#1f3247", roofLight: "#314c69", trim: "#ffd166"
      },
      {
        name: "Lakeside Matcha Pavilion",
        x: 1110, y: 885, w: 145, h: 105,
        kind: "pavilion", wall: "#f2e6cf", roof: "#2b4d3e", roofLight: "#41705b", trim: "#ffd166"
      },
      {
        name: "Howl & Sophie's Hilltop Cottage",
        x: 2790, y: 350, w: 320, h: 205,
        kind: "cottage", wall: "#fff5e4", roof: "#8f4367", roofLight: "#b85c87", trim: "#ffd166"
      }
    ];

    // Solid Building Footprints (Leaving Front Doorways & Verandas Walkable)
    const SOLID_COLLIDERS = BUILDINGS.map((b) => ({
      x: b.x + 8,
      y: b.y + 24,
      w: b.w - 16,
      h: b.h - 32
    }));
// ========================================================================
    // PART 6 OF 16: CHERRY-RICH VALLEY ECOSYSTEM, BOTANICAL PLACEMENTS & AMBIENCE
    // ========================================================================
    const TREES = [];
    const FLOWERS = [];
    const PROPS = [];
    const LANTERNS = [];

    function isAreaClearForPlacement(x, y, pad = 26) {
      if (y < GROUND_TOP_Y + 24 || y > getSouthernLakeShoreY(x) - 18) return false;
      for (const b of BUILDINGS) {
        if (x > b.x - pad && x < b.x + b.w + pad && y > b.y - pad && y < b.y + b.h + pad) {
          return false;
        }
      }
      for (const s of SPRINGS) {
        if (Math.hypot((x - s.x) / (s.rx + pad), (y - s.y) / (s.ry + pad)) < 1.04) {
          return false;
        }
      }
      for (const d of WOOD_DECKS) {
        if (x > d.x - pad && x < d.x + d.w + pad && y > d.y - pad && y < d.y + d.h + pad) {
          return false;
        }
      }
      for (const c of CITY_CANALS) {
        if (x > c.x - pad && x < c.x + c.w + pad && y > c.y - pad && y < c.y + c.h + pad) {
          return false;
        }
      }
      if (Math.hypot(x - ROYAL_FOUNTAIN.x, y - ROYAL_FOUNTAIN.y) < 76) return false;
      return true;
    }

    // 1. Hand-Curated Signature Sakura Groves in Starlight Onsen Valley & Lantern Islet
    const SIGNATURE_TREES = [
      // Starlight Onsen Valley Sakura Cherry Groves (Abundant Blossoms Around Every Spring)
      { x: 465, y: 475, kind: "sakura" }, { x: 975, y: 475, kind: "sakura" },
      { x: 265, y: 555, kind: "sakura" }, { x: 545, y: 635, kind: "sakura" },
      { x: 895, y: 635, kind: "sakura" }, { x: 1185, y: 565, kind: "sakura" },
      { x: 235, y: 765, kind: "sakura" }, { x: 565, y: 815, kind: "sakura" },
      { x: 875, y: 815, kind: "sakura" }, { x: 1185, y: 745, kind: "sakura" },
      { x: 245, y: 955, kind: "sakura" }, { x: 435, y: 1015, kind: "sakura" },
      { x: 865, y: 995, kind: "sakura" }, { x: 1295, y: 920, kind: "sakura" },
      { x: 145, y: 615, kind: "sakura" }, { x: 1385, y: 625, kind: "sakura" },
      { x: 1435, y: 845, kind: "sakura" }, { x: 65, y: 875, kind: "sakura" },

      // Lakeside Weeping Willows & Oaks Framing the Valley Shoreline
      { x: 120, y: 1125, kind: "willow" }, { x: 530, y: 1130, kind: "willow" },
      { x: 935, y: 1125, kind: "willow" }, { x: 1245, y: 1135, kind: "willow" },
      { x: 85, y: 445, kind: "oak" }, { x: 1365, y: 445, kind: "oak" },

      // Sparse High-Ridge Alpine Pines (Strictly along the far northern foothills)
      { x: 20, y: 265, kind: "pine" }, { x: 310, y: 260, kind: "pine" },
      { x: 1140, y: 262, kind: "pine" }, { x: 1450, y: 268, kind: "pine" },

      // Kingsbury Royal Boulevard Ornamental Sakura & Oaks
      { x: -1405, y: 565, kind: "sakura" }, { x: -1120, y: 565, kind: "sakura" },
      { x: -865, y: 565, kind: "sakura" }, { x: -615, y: 565, kind: "sakura" },
      { x: -245, y: 565, kind: "sakura" }, { x: -1655, y: 970, kind: "oak" },
      { x: -1125, y: 970, kind: "sakura" }, { x: -615, y: 970, kind: "oak" },
      { x: -245, y: 970, kind: "sakura" },

      // Flower Meadow & Hilltop Cottage Groves
      { x: 1715, y: 575, kind: "sakura" }, { x: 2255, y: 575, kind: "sakura" },
      { x: 2745, y: 565, kind: "sakura" }, { x: 3155, y: 565, kind: "sakura" },
      { x: 2645, y: 435, kind: "oak" }, { x: 3255, y: 445, kind: "oak" },
      { x: 1785, y: 1125, kind: "willow" }, { x: 2425, y: 1120, kind: "willow" },
      { x: 3145, y: 1125, kind: "willow" }, { x: 3445, y: 585, kind: "sakura" }
    ];

    for (const st of SIGNATURE_TREES) {
      if (isAreaClearForPlacement(st.x, st.y, 18)) {
        TREES.push(st);
      }
    }

    // Lantern Islet Cherry & Willow Grove (Always placed directly on the island)
    TREES.push(
      { x: LAKE_ISLAND.x - 78, y: LAKE_ISLAND.y - 12, kind: "sakura" },
      { x: LAKE_ISLAND.x + 76, y: LAKE_ISLAND.y - 8, kind: "sakura" },
      { x: LAKE_ISLAND.x - 42, y: LAKE_ISLAND.y + 34, kind: "willow" },
      { x: LAKE_ISLAND.x + 46, y: LAKE_ISLAND.y + 32, kind: "sakura" }
    );

    // 2. Deterministic Natural Tree Scatter (Heavily Sakura in Valley, Minimal Pine)
    let seed = 4219;
    function rand() {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    }

    for (let i = 0; i < 145; i++) {
      const rx = WORLD_MIN_X + 70 + rand() * (WORLD_W - 140);
      const ry = GROUND_TOP_Y + 45 + rand() * 930;
      if (!isAreaClearForPlacement(rx, ry, 34)) continue;

      let tooClose = false;
      for (const existing of TREES) {
        if (Math.hypot(rx - existing.x, ry - existing.y) < 76) {
          tooClose = true;
          break;
        }
      }
      if (tooClose) continue;

      let kind = "oak";
      const r = rand();
      if (rx < CITY_RIGHT) {
        kind = r < 0.65 ? "sakura" : "oak";
      } else if (rx < ONSEN_RIGHT) {
        // Onsen Valley: ~78% Sakura Cherry Trees, ~17% Oak/Willow, only ~5% Pine on far north ridge
        if (ry < 315 && r < 0.25) kind = "pine";
        else if (r < 0.82) kind = "sakura";
        else kind = ry > 960 ? "willow" : "oak";
      } else {
        // Flower Meadow: Lush mix of Sakura, Oak, and Lakeside Willows
        if (ry > 980 && r < 0.45) kind = "willow";
        else if (r < 0.52) kind = "sakura";
        else kind = "oak";
      }
      TREES.push({ x: Math.round(rx), y: Math.round(ry), kind });
    }

    // 3. Abundant 10-Species Botanical Wildflowers Across Onsen Valley & Flower Meadow
    const FLOWER_KEYS = Object.keys(SPRITES.flowers);
    for (let i = 0; i < 460; i++) {
      const fx = ONSEN_LEFT + 20 + rand() * (WORLD_MAX_X - ONSEN_LEFT - 40);
      const fy = GROUND_TOP_Y + 35 + rand() * 950;
      if (!isAreaClearForPlacement(fx, fy, 14)) continue;

      // Extra dense wildflower carpets in the Flower Meadow & around Sakura springs
      if (fx < MEADOW_LEFT && rand() > 0.58) continue;

      const species = FLOWER_KEYS[Math.floor(rand() * FLOWER_KEYS.length)];
      FLOWERS.push({
        x: Math.round(fx),
        y: Math.round(fy),
        species,
        swayPhase: rand() * Math.PI * 2
      });
    }

    // 4. Benches, Mossy Boulders, Harbor Barrels & Stone Lanterns
    const BENCH_SPOTS = [
      { x: -1465, y: 672 }, { x: -1150, y: 672 }, { x: -920, y: 672 }, { x: -535, y: 672 },
      { x: 585, y: 530 }, { x: 855, y: 530 }, { x: 645, y: 865 }, { x: 795, y: 865 },
      { x: 1905, y: 545 }, { x: 2065, y: 545 }, { x: 2865, y: 565 }, { x: 3035, y: 565 }
    ];
    for (const bs of BENCH_SPOTS) {
      PROPS.push({ x: bs.x, y: bs.y, kind: "bench" });
    }

    const BARREL_SPOTS = [
      { x: -1635, y: 755 }, { x: -1615, y: 760 }, { x: -495, y: 1175 },
      { x: -475, y: 1182 }, { x: -395, y: 1178 }, { x: 1102, y: 978 }
    ];
    for (const br of BARREL_SPOTS) {
      PROPS.push({ x: br.x, y: br.y, kind: "barrel" });
    }

    for (let i = 0; i < 38; i++) {
      const bx = ONSEN_LEFT + 30 + rand() * (WORLD_MAX_X - ONSEN_LEFT - 60);
      const by = GROUND_TOP_Y + 50 + rand() * 920;
      if (!isAreaClearForPlacement(bx, by, 22)) continue;
      PROPS.push({
        x: Math.round(bx),
        y: Math.round(by),
        kind: rand() < 0.45 ? "boulder" : "smallRock"
      });
    }

    // Warm Glowing Lantern Posts Across Valley, Piers & Meadow
    const LANTERN_COORDS = [
      { x: 545, y: 535 }, { x: 895, y: 535 }, { x: 685, y: 672 }, { x: 755, y: 672 },
      { x: 365, y: 668 }, { x: 1075, y: 668 }, { x: 305, y: 895 }, { x: 485, y: 915 },
      { x: 985, y: 895 }, { x: 525, y: 1005 }, { x: 685, y: 1185 }, { x: 755, y: 1185 },
      { x: 1325, y: 1185 }, { x: 1395, y: 1185 }, { x: 1310, y: 1345 }, { x: 1410, y: 1345 },
      { x: 1935, y: 555 }, { x: 2035, y: 555 }, { x: 1935, y: 1185 }, { x: 2915, y: 585 },
      { x: 2985, y: 585 }, { x: 2915, y: 1185 }
    ];
    for (const lc of LANTERN_COORDS) {
      LANTERNS.push(lc);
    }

    // Kingsbury City Flowerbeds, Bistro Cafés, Flower Carts, Streetlamps & Doves
    const CITY_FLOWERBEDS = [
      { x: -1695, y: 566, w: 74, h: 16 }, { x: -1520, y: 566, w: 74, h: 16 },
      { x: -1060, y: 562, w: 84, h: 16 }, { x: -910, y: 562, w: 68, h: 16 },
      { x: -565, y: 562, w: 84, h: 16 }, { x: -345, y: 562, w: 84, h: 16 },
      { x: -1785, y: 964, w: 80, h: 16 }, { x: -1575, y: 964, w: 86, h: 16 },
      { x: -1185, y: 964, w: 80, h: 16 }, { x: -975, y: 964, w: 84, h: 16 },
      { x: -665, y: 964, w: 84, h: 16 }, { x: -440, y: 964, w: 84, h: 16 }
    ];

    const CAFE_TABLES = [
      { x: -865, y: 576, umbrella: "#ff7aa8" }, { x: -815, y: 576, umbrella: "#7cc0ff" },
      { x: -325, y: 578, umbrella: "#ffd166" }, { x: -285, y: 578, umbrella: "#ff9ec4" },
      { x: -1355, y: 1152, umbrella: "#ff8fb8" }, { x: -955, y: 1152, umbrella: "#87cf67" }
    ];

    const FLOWER_CARTS = [
      { x: -1125, y: 655, canopy: "#ff8fb8" },
      { x: -635, y: 655, canopy: "#7cc0ff" },
      { x: -1410, y: 1085, canopy: "#ffd166" }
    ];

    const CITY_STREETLAMPS = [
      { x: -1730, y: 660 }, { x: -1470, y: 660 }, { x: -1160, y: 660 },
      { x: -915, y: 660 }, { x: -630, y: 660 }, { x: -375, y: 660 },
      { x: -1680, y: 1110 }, { x: -1385, y: 1110 }, { x: -1045, y: 1110 },
      { x: -695, y: 1110 }, { x: -485, y: 1155 }
    ];

    const CITY_BIRDS = [
      { x: -1520, y: 615, phase: 0.4, color: "#ffffff" },
      { x: -1495, y: 625, phase: 1.1, color: "#e3f2ff" },
      { x: -1035, y: 675, phase: 2.2, color: "#ffffff" },
      { x: -620, y: 640, phase: 3.5, color: "#ffe6f2" }
    ];

    // Ambient Particle Pools (Sakura Petals, Fireflies, Onsen Steam, Chimney Smoke & Koi)
    const WIND_PETALS = Array.from({ length: 110 }, () => ({
      x: WORLD_MIN_X + rand() * WORLD_W,
      y: GROUND_TOP_Y + rand() * 1150,
      vx: 10 + rand() * 14,
      vy: 4 + rand() * 8,
      phase: rand() * Math.PI * 2,
      color: rand() < 0.7 ? "#ffb8d8" : "#ffe6f2"
    }));

    const FIREFLIES = Array.from({ length: 95 }, () => ({
      x: ONSEN_LEFT + rand() * (WORLD_MAX_X - ONSEN_LEFT),
      y: GROUND_TOP_Y + 60 + rand() * 1050,
      speed: 1.1 + rand() * 1.4,
      phase: rand() * Math.PI * 2,
      color: rand() < 0.35 ? "#a8f0ff" : "#ffe875"
    }));

    const STEAM_PARTICLES = [];
    for (const s of SPRINGS) {
      for (let i = 0; i < 8; i++) {
        STEAM_PARTICLES.push({
          spring: s,
          ox: (rand() - 0.5) * s.rx * 1.3,
          oy: (rand() - 0.5) * s.ry * 1.1,
          phase: rand() * Math.PI * 2,
          speed: 8 + rand() * 6,
          size: 5 + rand() * 5
        });
      }
    }

    const CHIMNEY_SMOKE = [
      { x: 640, y: 315 }, { x: 810, y: 315 },
      { x: 3035, y: 345 }, { x: -805, y: 380 }
    ];

    const LAKE_KOI = Array.from({ length: 22 }, (_, i) => ({
      x: -1400 + i * 215,
      y: 1285 + (i % 4) * 38,
      dir: i % 2 === 0 ? 1 : -1,
      speed: 12 + (i % 5) * 3,
      phase: i * 0.9,
      color: i % 3 === 0 ? "#ff6b4a" : i % 3 === 1 ? "#ffd166" : "#fff5f7"
    }));
// ========================================================================
    // PART 7 OF 16: ROWBOATS, NPCS, PIXEL PORTRAITS & PLAYER PHYSICS ENGINE
    // ========================================================================
    const BOATS = [
      { id: "boat_harbor", x: -436, y: 1320, dir: 1, occupied: false, trim: "#7cc0ff" },
      { id: "boat_onsen", x: 724, y: 1300, dir: -1, occupied: false, trim: "#ffd166" },
      { id: "boat_meadow", x: 1967, y: 1295, dir: 1, occupied: false, trim: "#ff9ec4" },
      { id: "boat_cottage", x: 2947, y: 1295, dir: -1, occupied: false, trim: "#87cf67" }
    ];

    const NPCS = [
      {
        id: "calcifer",
        name: "Calcifer",
        role: "Fire Demon",
        x: 720, y: 550, homeX: 720, homeY: 550,
        patrolR: 18, speed: 14, dir: 0, frame: 0, phase: 0.2,
        lines: [
          "Howl! Look at the stars and aurora shimmering over the cherry blossoms tonight—step down the wooden stairs into any pool to soak!",
          "My flames keep all seven springs steaming hot, and you can wade right into the crystal-clear shallows of the Southern Lake!"
        ],
        placeLore: "This is Starlight Onsen Valley! Seven mineral springs bubble beneath blooming sakura trees—try the Grand Emerald Yuzu Spring!"
      },
      {
        id: "sophie",
        name: "Sophie Hatter",
        role: "Royal Milliner",
        x: 865, y: 635, homeX: 865, homeY: 635,
        patrolR: 26, speed: 16, dir: 2, frame: 0, phase: 1.1,
        lines: [
          "Good evening, Howl! Isn't the starlight filtering through the cherry blossoms magical? I tied a fresh pink ribbon in my braid!",
          "Whenever you're ready, let's stroll across the arched canal bridges in Kingsbury or visit our hilltop meadow cottage!"
        ],
        placeLore: "Between the cedar boardwalks and lantern-lit pools, this valley is the peaceful heart connecting Kingsbury City to our flower meadow."
      },
      {
        id: "turnip",
        name: "Turnip Head",
        role: "Enchanted Prince",
        x: 1135, y: 975, homeX: 1135, homeY: 975,
        patrolR: 20, speed: 15, dir: 0, frame: 0, phase: 2.0,
        lines: [
          "*Hops cheerfully beside the Lakeside Matcha Pavilion and tips his glossy top hat toward the treed Lantern Islet!*",
          "*Points his wooden cane toward the Southern Lake—watch the colorful koi swimming near the piers!*"
        ],
        placeLore: "Right across that wooden footbridge lies Lantern Islet, surrounded by glowing piers where you can board a rowboat!"
      },
      {
        id: "markl",
        name: "Markl",
        role: "Apprentice Wizard",
        x: -1255, y: 585, homeX: -1255, homeY: 585,
        patrolR: 24, speed: 18, dir: 3, frame: 0, phase: 0.7,
        lines: [
          "Master Jenkins! I've been tending the Royal Botanical Conservatory—the glass dome glows like a lantern under the stars!",
          "Walk out onto any wooden pier along the Southern Lake and press Space to row a wooden boat across the water!"
        ],
        placeLore: "Welcome to Kingsbury City! West is the Royal Palace, and east across the stone canal bridges sits Cesari's Royal Patisserie."
      },
      {
        id: "witch",
        name: "Witch of the Waste",
        role: "Retired Sorceress",
        x: -785, y: 585, homeX: -785, homeY: 585,
        patrolR: 16, speed: 11, dir: 0, frame: 0, phase: 1.6,
        lines: [
          "Oh my, a starlight stroll past Cesari's Royal Patisserie! Their warm custard tarts are simply divine at this hour.",
          "Tell Calcifer I'm behaving myself—mostly!"
        ],
        placeLore: "Kingsbury's canal promenades are lovely at night—especially when the patisserie ovens are baking fresh honey brioche."
      },
      {
        id: "heen",
        name: "Heen",
        role: "Errand Dog",
        x: -1595, y: 595, homeX: -1595, homeY: 595,
        patrolR: 22, speed: 13, dir: 0, frame: 0, phase: 2.5,
        lines: [
          "*Wheeze-puff!* Heen wags his stubby tail happily on the Royal Palace red carpet.",
          "*Soft happy snort!* He hopes you're taking him toward the lakeside meadow!"
        ],
        placeLore: "You're standing right in front of the Kingsbury Royal Palace—grand marble columns, cobalt spires, and warm golden windows!"
      },
      {
        id: "lettie",
        name: "Lettie Hatter",
        role: "Pastry Chef",
        x: -690, y: 585, homeX: -690, homeY: 585,
        patrolR: 18, speed: 15, dir: 0, frame: 0, phase: 3.1,
        lines: [
          "Welcome to Cesari's Royal Patisserie! Even under the stars, our ovens are warm with honey brioche and berry tarts.",
          "Say hello to Sophie for me if you head back east toward the hot springs!"
        ],
        placeLore: "Cesari's Royal Patisserie is Kingsbury's favorite sweet shop—stop by anytime for warm pastries by the canal!"
      },
      {
        id: "sprite",
        name: "Meadow Sprite",
        role: "Blossom Spirit",
        x: 2945, y: 615, homeX: 2945, homeY: 615,
        patrolR: 28, speed: 19, dir: 0, frame: 0, phase: 0.9,
        lines: [
          "Welcome to Howl's Secret Flower Meadow! Every blossom here drinks starlight and mountain dew.",
          "Your hilltop cottage has the best view of the Southern Alpine Lake and the lantern-lit piers!"
        ],
        placeLore: "Howl's Secret Flower Meadow stretches across terraced green hills filled with cosmos, hydrangeas, and fireflies."
      }
    ];

    // Safe Fast-Travel Waypoints Across All Three Realms
    const SAFE_WAYPOINTS = [
      { id: "palace", name: "Kingsbury Royal Palace", realm: "Kingsbury City", x: -1595, y: 585, color: "#ffd166" },
      { id: "fountain", name: "Royal Marble Fountain", realm: "Kingsbury City", x: -1035, y: 635, color: "#9cd1ff" },
      { id: "patisserie", name: "Cesari's Royal Patisserie", realm: "Kingsbury City", x: -735, y: 585, color: "#ff9ec4" },
      { id: "harbor", name: "Kingsbury Harbor Pier", realm: "Kingsbury City", x: -438, y: 1205, color: "#7cc0ff" },
      { id: "bathhouse", name: "Starlight Grand Bathhouse", realm: "Onsen Valley", x: 720, y: 535, color: "#ffd166" },
      { id: "emerald_spring", name: "Grand Emerald Yuzu Spring", realm: "Onsen Valley", x: 720, y: 668, color: "#54cbb0" },
      { id: "sakura_spring", name: "Sakura Blossom Spring", realm: "Onsen Valley", x: 1045, y: 675, color: "#ff9ec4" },
      { id: "islet", name: "Lantern Islet", realm: "Southern Lake", x: 1360, y: 1365, color: "#ffe082" },
      { id: "meadow_overlook", name: "Meadow Overlook Hill", realm: "Flower Meadow", x: 1985, y: 515, color: "#b99ff5" },
      { id: "meadow_pier", name: "Starlight Meadow Pier", realm: "Flower Meadow", x: 1966, y: 1190, color: "#7cc0ff" },
      { id: "cottage", name: "Howl & Sophie's Cottage", realm: "Flower Meadow", x: 2945, y: 580, color: "#ffb8d8" }
    ];

    // Player State (Wizard Howl)
    const player = {
      x: 720,
      y: 565,
      speed: 138,
      dir: 0, // 0: down, 1: up, 2: left, 3: right
      walkFrame: 0,
      moving: false,
      inSpring: null,
      inShallowerWater: false,
      inBoat: null,
      warmth: 68,
      serenity: 74,
      sparkles: []
    };

    const camera = {
      x: player.x - viewW / 2,
      y: player.y - viewH / 2
    };

    // Clean, Trusted-Only Keyboard State (Zero Synthetic Key Bugs)
    const keys = {};
    const MOVE_CODES = new Set([
      "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
      "KeyW", "KeyA", "KeyS", "KeyD"
    ]);

    function flushKeys() {
      for (const k of Object.keys(keys)) {
        keys[k] = false;
      }
      if (document.activeElement && typeof document.activeElement.blur === "function") {
        document.activeElement.blur();
      }
    }
    window.addEventListener("blur", flushKeys);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) flushKeys();
    });

    // Collision & Terrain Geometry Queries
    function isInsideCanal(x, y) {
      for (const br of CANAL_BRIDGES) {
        if (x >= br.x - 4 && x <= br.x + br.w + 4 && y >= br.y - 4 && y <= br.y + br.h + 4) {
          return false;
        }
      }
      for (const c of CITY_CANALS) {
        if (x > c.x + 3 && x < c.x + c.w - 3 && y > c.y + 3 && y < c.y + c.h - 3) {
          return true;
        }
      }
      return false;
    }

    function isOnIslandOrBridge(x, y) {
      if (
        x >= ISLAND_BRIDGE.x - 4 &&
        x <= ISLAND_BRIDGE.x + ISLAND_BRIDGE.w + 4 &&
        y >= ISLAND_BRIDGE.y - 8 &&
        y <= ISLAND_BRIDGE.y + ISLAND_BRIDGE.h + 12
      ) {
        return true;
      }
      return Math.hypot((x - LAKE_ISLAND.x) / LAKE_ISLAND.rx, (y - LAKE_ISLAND.y) / LAKE_ISLAND.ry) <= 0.96;
    }

    function isOnSouthernPier(x, y) {
      for (const p of SOUTHERN_PIERS) {
        const sy = getSouthernLakeShoreY(p.x + p.w / 2);
        if (x >= p.x - 2 && x <= p.x + p.w + 2 && y >= sy - 10 && y <= sy + p.len + 4) {
          return true;
        }
      }
      return false;
    }

    function getCurrentSpring(x, y) {
      for (const s of SPRINGS) {
        if (Math.hypot((x - s.x) / (s.rx - 10), (y - s.y) / (s.ry - 8)) <= 1.0) {
          return s;
        }
      }
      return null;
    }

    function canWalkAt(x, y) {
      if (x < WORLD_MIN_X + 22 || x > WORLD_MAX_X - 22) return false;
      if (y < GROUND_TOP_Y + 18 || y > WORLD_H - 22) return false;

      if (isInsideCanal(x, y)) return false;

      for (const col of SOLID_COLLIDERS) {
        if (x > col.x && x < col.x + col.w && y > col.y && y < col.y + col.h) {
          return false;
        }
      }

      if (Math.hypot((x - ROYAL_FOUNTAIN.x) / 38, (y - ROYAL_FOUNTAIN.y) / 23) < 1.0) {
        return false;
      }

      // Southern Lake allows shoreline wading up to WADING_DEPTH, piers, bridge & Lantern Islet
      const shoreY = getSouthernLakeShoreY(x);
      if (y > shoreY + WADING_DEPTH) {
        if (!isOnIslandOrBridge(x, y) && !isOnSouthernPier(x, y)) {
          return false;
        }
      }

      return true;
    }

    function spawnSparkle(x, y, color = "#ffe885") {
      player.sparkles.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 10,
        vy: -16 - Math.random() * 14,
        life: 0.65,
        color
      });
    }

    function fastTravelTo(wp) {
      if (!wp) return;
      flushKeys();
      if (player.inBoat) {
        player.inBoat.occupied = false;
        player.inBoat = null;
      }
      player.x = wp.x;
      player.y = wp.y;
      player.inSpring = getCurrentSpring(player.x, player.y);
      player.inShallowerWater = false;

      camera.x = Math.max(WORLD_MIN_X, Math.min(WORLD_MAX_X - viewW, player.x - viewW / 2));
      camera.y = Math.max(0, Math.min(WORLD_H - viewH, player.y - viewH / 2));

      for (let i = 0; i < 14; i++) {
        spawnSparkle(player.x, player.y - 6, i % 2 === 0 ? "#ffd166" : "#9cd1ff");
      }
      playChime([523.25, 659.25, 783.99], 0.25);

      if (mapOverlay) mapOverlay.classList.add("hidden");
      if (bannerEl) {
        bannerEl.textContent = `✨ Fast-Traveled: ${wp.name} (${wp.realm})`;
      }
    }

    function unstuckNearest() {
      let best = SAFE_WAYPOINTS[0];
      let bestDist = Infinity;
      for (const wp of SAFE_WAYPOINTS) {
        const d = Math.hypot(player.x - wp.x, player.y - wp.y);
        if (d < bestDist) {
          bestDist = d;
          best = wp;
        }
      }
      fastTravelTo(best);
    }
// ========================================================================
    // PART 8 OF 16: SKYBOX, DUAL MOUNTAIN RIDGES, GROUND BIOMES, HILLS & TRAILS
    // ========================================================================
    const SKY_STARS = Array.from({ length: 120 }, (_, i) => ({
      x: (i * 197 + 41) % 1600,
      y: (i * 73 + 17) % (GROUND_TOP_Y - 18),
      size: i % 8 === 0 ? 2 : 1,
      phase: i * 0.9,
      color: i % 5 === 0 ? "#bfe6ff" : i % 9 === 0 ? "#ffd6ea" : "#fffbe0"
    }));

    function drawSkyAndMountains(t, mode) {
      const skyBottomScreenY = Math.max(0, Math.min(viewH, Math.round(GROUND_TOP_Y + 28 - camera.y)));
      if (skyBottomScreenY <= 0) return;

      // 1. Rich Multi-Stop Atmospheric Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, Math.max(120, skyBottomScreenY));
      skyGrad.addColorStop(0, mode.skyTop);
      skyGrad.addColorStop(0.56, mode.skyMid);
      skyGrad.addColorStop(1, mode.skyBot);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, viewW, skyBottomScreenY);

      // 2. Shimmering Starlight Aurora Ribbon
      if (mode.auroraAlpha > 0) {
        for (let sx = 0; sx < viewW; sx += 4) {
          const wx = sx + camera.x * 0.12;
          const wave = Math.sin(wx * 0.015 + t * 0.85) * 10;
          const a = mode.auroraAlpha * (0.45 + 0.55 * Math.sin(wx * 0.02 - t * 1.1));
          ctx.fillStyle = `rgba(94, 242, 198, ${a.toFixed(3)})`;
          ctx.fillRect(sx, Math.round(36 - camera.y * 0.1 + wave), 4, 18);
        }
      }

      // 3. Twinkling Constellation Stars
      if (mode.starAlpha > 0) {
        for (const s of SKY_STARS) {
          const sx = Math.round(((s.x - camera.x * 0.08) % viewW + viewW) % viewW);
          const sy = Math.round(s.y - camera.y * 0.12);
          if (sy < 0 || sy >= skyBottomScreenY - 12) continue;
          const tw = mode.starAlpha * (0.35 + 0.65 * Math.sin(t * 2.4 + s.phase));
          ctx.globalAlpha = Math.max(0, Math.min(1, tw));
          ctx.fillStyle = s.color;
          ctx.fillRect(sx, sy, s.size, s.size);
          if (s.size === 2 && tw > 0.82) {
            ctx.fillRect(sx - 1, sy, 4, 1);
            ctx.fillRect(sx, sy - 1, 1, 4);
          }
        }
        ctx.globalAlpha = 1;
      }

      // 4. Luminous Moon with Soft Halo
      const moonX = Math.round(viewW * 0.78 - camera.x * 0.03);
      const moonY = Math.round(52 - camera.y * 0.08);
      if (moonY > -30 && moonY < skyBottomScreenY) {
        ctx.fillStyle = "rgba(255, 246, 196, 0.14)";
        ctx.beginPath();
        ctx.arc(moonX, moonY, 26, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff9d6";
        ctx.beginPath();
        ctx.arc(moonX, moonY, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#e8dcb0";
        ctx.fillRect(moonX - 4, moonY - 3, 3, 2);
        ctx.fillRect(moonX + 3, moonY + 2, 4, 3);
      }

      // 5. Drifting Night Clouds
      ctx.fillStyle = mode.cloudColor;
      for (let i = 0; i < 6; i++) {
        const cx = Math.round(((i * 290 + t * (4 + i) - camera.x * 0.14) % (viewW + 180) + (viewW + 180)) % (viewW + 180) - 90);
        const cy = Math.round(64 + (i % 3) * 26 - camera.y * 0.1);
        if (cy < 0 || cy > skyBottomScreenY - 20) continue;
        ctx.fillRect(cx, cy, 56, 8);
        ctx.fillRect(cx + 10, cy - 5, 34, 6);
      }

      // 6. Dual-Layered Snow-Capped Alpine Mountain Ridges (Anchored to Horizon)
      const horizonY = Math.round(GROUND_TOP_Y + 12 - camera.y);
      // Distant Indigo Ridge
      for (let m = -2; m < 18; m++) {
        const px = Math.round(m * 220 - camera.x * 0.22);
        if (px < -240 || px > viewW + 240) continue;
        const ph = 78 + ((Math.abs(m) * 37) % 38);
        ctx.fillStyle = "#19294d";
        ctx.beginPath();
        ctx.moveTo(px - 140, horizonY);
        ctx.lineTo(px, horizonY - ph);
        ctx.lineTo(px + 140, horizonY);
        ctx.closePath();
        ctx.fill();
      }

      // Foreground Snow-Dusted Alpine Peaks
      for (let m = -2; m < 20; m++) {
        const px = Math.round(m * 195 + 85 - camera.x * 0.34);
        if (px < -220 || px > viewW + 220) continue;
        const ph = 64 + ((Math.abs(m) * 53) % 34);
        ctx.fillStyle = "#223663";
        ctx.beginPath();
        ctx.moveTo(px - 125, horizonY + 4);
        ctx.lineTo(px, horizonY - ph);
        ctx.lineTo(px + 125, horizonY + 4);
        ctx.closePath();
        ctx.fill();

        // Crisp Snow Cap
        ctx.fillStyle = "#dce8ff";
        ctx.beginPath();
        ctx.moveTo(px - 28, horizonY - ph + 20);
        ctx.lineTo(px, horizonY - ph);
        ctx.lineTo(px + 28, horizonY - ph + 20);
        ctx.lineTo(px + 8, horizonY - ph + 15);
        ctx.lineTo(px - 6, horizonY - ph + 18);
        ctx.closePath();
        ctx.fill();
      }
    }

    function drawGroundAndHills() {
      const startCol = Math.floor(camera.x / 64) - 1;
      const endCol = Math.ceil((camera.x + viewW) / 64) + 1;
      const startRow = Math.max(Math.floor(GROUND_TOP_Y / 64) - 1, Math.floor(camera.y / 64) - 1);
      const endRow = Math.ceil((camera.y + viewH) / 64) + 1;

      for (let r = startRow; r <= endRow; r++) {
        const wy = r * 64;
        const sy = Math.round(wy - camera.y);
        for (let c = startCol; c <= endCol; c++) {
          const wx = c * 64;
          const sx = Math.round(wx - camera.x);
          let tile = SPRITES.grassTile;
          if (wx < CITY_RIGHT) {
            tile = SPRITES.cobbleTile;
          } else if (wx >= MEADOW_LEFT) {
            tile = SPRITES.meadowGrassTile;
          }
          ctx.drawImage(tile, sx, sy);
        }
      }

      // Soft Biome Border Transitions (Cobble-to-Moss & Valley-to-Meadow)
      const border1X = Math.round(CITY_RIGHT - camera.x);
      if (border1X > -40 && border1X < viewW + 40) {
        ctx.fillStyle = "rgba(58, 115, 47, 0.45)";
        ctx.fillRect(border1X - 10, Math.round(GROUND_TOP_Y - camera.y), 20, WORLD_H);
        ctx.fillStyle = "#7a736a";
        for (let y = GROUND_TOP_Y; y < 1210; y += 24) {
          ctx.fillRect(border1X - 4, Math.round(y - camera.y), 8, 14);
        }
      }

      const border2X = Math.round(MEADOW_LEFT - camera.x);
      if (border2X > -40 && border2X < viewW + 40) {
        ctx.fillStyle = "rgba(82, 153, 63, 0.48)";
        ctx.fillRect(border2X - 16, Math.round(GROUND_TOP_Y - camera.y), 32, WORLD_H);
      }

      // Northern Foothill Berm & Kingsbury Stone Terrace Wall
      const bermY = Math.round(GROUND_TOP_Y - camera.y);
      if (bermY > -40 && bermY < viewH + 40) {
        // City Stone Balustrade Wall
        const cityEnd = Math.min(viewW, Math.round(CITY_RIGHT - camera.x));
        if (cityEnd > 0) {
          ctx.fillStyle = "#6e685f";
          ctx.fillRect(0, bermY - 4, cityEnd, 14);
          ctx.fillStyle = "#b5aca0";
          ctx.fillRect(0, bermY - 4, cityEnd, 4);
        }
        // Valley & Meadow Mossy Hillside Edge
        const greenStart = Math.max(0, Math.round(CITY_RIGHT - camera.x));
        if (greenStart < viewW) {
          ctx.fillStyle = "#2b5723";
          ctx.fillRect(greenStart, bermY - 4, viewW - greenStart, 12);
          ctx.fillStyle = "#4d943f";
          ctx.fillRect(greenStart, bermY - 4, viewW - greenStart, 5);
        }
      }

      // Terraced Hills in Howl's Secret Flower Meadow
      for (const h of MEADOW_HILLS) {
        const hx = Math.round(h.x - camera.x);
        const hy = Math.round(h.y - camera.y);
        if (hx + h.w < -20 || hx > viewW + 20 || hy + h.h < -20 || hy > viewH + 20) continue;

        ctx.fillStyle = h.grassTop;
        ctx.fillRect(hx, hy, h.w, h.h);
        ctx.fillStyle = h.grassEdge;
        ctx.fillRect(hx, hy, h.w, 5);
        ctx.fillStyle = h.cliffFace;
        ctx.fillRect(hx, hy + h.h - 18, h.w, 18);
        ctx.fillStyle = h.cliffDark;
        ctx.fillRect(hx, hy + h.h - 6, h.w, 6);

        // Wooden Hilltop Staircases
        for (const st of h.stairs) {
          const sx = Math.round(st.x - camera.x);
          const sy = hy + h.h - 22;
          ctx.fillStyle = "#7a4d2b";
          ctx.fillRect(sx, sy, st.w, 26);
          ctx.fillStyle = "#ba8050";
          for (let stepY = sy + 2; stepY < sy + 24; stepY += 5) {
            ctx.fillRect(sx + 3, stepY, st.w - 6, 3);
          }
        }
      }
    }

    function drawTrailsAndPlaza() {
      // 1. Multi-Style Trails Across All Three Realms
      for (const trail of ALL_TRAILS) {
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        if (trail.style === "stone") {
          ctx.strokeStyle = "#6e685f";
          ctx.lineWidth = 34;
        } else if (trail.style === "garden") {
          ctx.strokeStyle = "#8a7356";
          ctx.lineWidth = 28;
        } else {
          ctx.strokeStyle = "#b5966d";
          ctx.lineWidth = 26;
        }

        ctx.beginPath();
        trail.points.forEach((pt, idx) => {
          const px = Math.round(pt.x - camera.x);
          const py = Math.round(pt.y - camera.y);
          if (idx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();

        // Inner Highlight Core
        if (trail.style === "stone") {
          ctx.strokeStyle = "#aba396";
          ctx.lineWidth = 26;
        } else if (trail.style === "garden") {
          ctx.strokeStyle = "#c4aa84";
          ctx.lineWidth = 20;
        } else {
          ctx.strokeStyle = "#dec39b";
          ctx.lineWidth = 18;
        }
        ctx.stroke();
        ctx.restore();
      }

      // 2. Grand Royal Marble Fountain Piazza (-1035, 695)
      const fx = Math.round(ROYAL_FOUNTAIN.x - camera.x);
      const fy = Math.round(ROYAL_FOUNTAIN.y - camera.y);
      if (fx > -90 && fx < viewW + 90 && fy > -90 && fy < viewH + 90) {
        ctx.strokeStyle = "#d9cfc1";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(fx, fy, 56, 36, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "rgba(15, 22, 38, 0.34)";
        ctx.beginPath();
        ctx.ellipse(fx + 2, fy + 4, 44, 28, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#e6ddd0";
        ctx.beginPath();
        ctx.ellipse(fx, fy, 42, 26, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#48cae4";
        ctx.beginPath();
        ctx.ellipse(fx, fy, 35, 20, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#faf5ec";
        ctx.beginPath();
        ctx.ellipse(fx, fy - 7, 17, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#90e0ef";
        ctx.beginPath();
        ctx.ellipse(fx, fy - 7, 13, 7, 0, 0, Math.PI * 2);
        ctx.fill();

        const jetH = 13 + Math.sin(performance.now() * 0.009) * 2.5;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(fx - 2, Math.round(fy - 15 - jetH), 4, Math.round(jetH));
        ctx.fillRect(fx - 9, fy - 13, 2, 8);
        ctx.fillRect(fx + 7, fy - 13, 2, 8);
      }
    }

// ========================================================================
    // PART 9 OF 16: CANALS, GONDOLAS, BRIDGES, SOUTHERN LAKE & HOT SPRINGS
    // ========================================================================
    function drawCanalsBridgesAndLake(t) {
      // 1. Kingsbury Stepped-Masonry Canals
      for (const c of CITY_CANALS) {
        const cx = Math.round(c.x - camera.x);
        const cy = Math.round(c.y - camera.y);
        if (cx + c.w < -30 || cx > viewW + 30 || cy + c.h < -30 || cy > viewH + 30) continue;

        // Outer beveled limestone coping
        ctx.fillStyle = "#cfc6b8";
        ctx.fillRect(cx - 5, cy - 5, c.w + 10, c.h + 10);
        ctx.fillStyle = "#7a7267";
        ctx.fillRect(cx - 2, cy - 2, c.w + 4, c.h + 4);

        // Deep canal water
        ctx.fillStyle = "#1d6373";
        ctx.fillRect(cx, cy, c.w, c.h);
        ctx.fillStyle = "#2b8799";
        ctx.fillRect(cx + 4, cy + 4, c.w - 8, c.h - 8);

        // Animated water shimmer lines
        ctx.fillStyle = "rgba(186, 244, 255, 0.36)";
        if (c.w < c.h) {
          for (let wy = cy + 12; wy < cy + c.h - 10; wy += 22) {
            const shift = Math.sin(t * 2.4 + wy * 0.08) * 4;
            ctx.fillRect(Math.round(cx + 12 + shift), wy, c.w - 28, 2);
          }
        } else {
          for (let wx = cx + 14; wx < cx + c.w - 14; wx += 26) {
            const shift = Math.cos(t * 2.4 + wx * 0.08) * 4;
            ctx.fillRect(wx, Math.round(cy + 14 + shift), 14, 2);
          }
        }
      }

      // 2. Striped Mooring Poles & Bobbing Venetian Gondolas
      for (const g of CITY_GONDOLAS) {
        const bob = Math.round(Math.sin(t * 2.2 + g.x * 0.05) * 1.5);
        const gx = Math.round(g.x - camera.x);
        const gy = Math.round(g.y - camera.y + bob);
        if (gx < -60 || gx > viewW + 60 || gy < -60 || gy > viewH + 60) continue;

        // Candy-striped mooring post beside gondola
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(gx - 22, gy - 18, 4, 24);
        ctx.fillStyle = g.trim;
        ctx.fillRect(gx - 22, gy - 14, 4, 4);
        ctx.fillRect(gx - 22, gy - 6, 4, 4);
        ctx.fillStyle = "#ffd166";
        ctx.fillRect(gx - 23, gy - 20, 6, 3);

        // Water ripple ring under hull
        ctx.strokeStyle = "rgba(214, 252, 255, 0.45)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(gx, gy + 5, 19, 6, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Sleek dark mahogany gondola hull with upturned prow & stern
        ctx.fillStyle = "#2b1912";
        ctx.beginPath();
        ctx.ellipse(gx, gy + 2, 16, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(gx - 18, gy - 4, 3, 7);
        ctx.fillRect(gx + 15, gy - 4, 3, 7);

        // Gold & pastel trim + velvet seat
        ctx.fillStyle = g.trim;
        ctx.fillRect(gx - 14, gy, 28, 2);
        ctx.fillStyle = g.canopy;
        ctx.fillRect(gx - 7, gy - 3, 14, 4);
      }

      // 3. Arched Stone Canal Bridges
      for (const br of CANAL_BRIDGES) {
        const bx = Math.round(br.x - camera.x);
        const by = Math.round(br.y - camera.y);
        if (bx + br.w < -20 || bx > viewW + 20 || by + br.h < -20 || by > viewH + 20) continue;

        ctx.fillStyle = "rgba(12, 20, 34, 0.32)";
        ctx.fillRect(bx + 2, by + 4, br.w, br.h);

        ctx.fillStyle = "#cfc6b8";
        ctx.fillRect(bx, by, br.w, br.h);
        ctx.fillStyle = "#e8e0d3";
        ctx.fillRect(bx + 3, by + 3, br.w - 6, br.h - 6);

        // Stone deck plank seams
        ctx.fillStyle = "#b5aca0";
        if (br.horizontal) {
          for (let sx = bx + 10; sx < bx + br.w - 8; sx += 12) {
            ctx.fillRect(sx, by + 4, 2, br.h - 8);
          }
          // North & South stone balustrades + gold lantern posts
          ctx.fillStyle = "#8c8377";
          ctx.fillRect(bx, by, br.w, 6);
          ctx.fillRect(bx, by + br.h - 6, br.w, 6);
          ctx.fillStyle = "#ffd166";
          ctx.fillRect(bx + 3, by - 3, 4, 4);
          ctx.fillRect(bx + br.w - 7, by - 3, 4, 4);
          ctx.fillRect(bx + 3, by + br.h - 1, 4, 4);
          ctx.fillRect(bx + br.w - 7, by + br.h - 1, 4, 4);
        } else {
          for (let sy = by + 10; sy < by + br.h - 8; sy += 12) {
            ctx.fillRect(bx + 4, sy, br.w - 8, 2);
          }
          ctx.fillStyle = "#8c8377";
          ctx.fillRect(bx, by, 6, br.h);
          ctx.fillRect(bx + br.w - 6, by, 6, br.h);
          ctx.fillStyle = "#ffd166";
          ctx.fillRect(bx - 3, by + 3, 4, 4);
          ctx.fillRect(bx + br.w - 1, by + 3, 4, 4);
        }
      }

      // 4. Southern Alpine Lake (Shoreline, Crystal Wading Shallows & Deep Water)
      const lakeMinScreenY = Math.round(1150 - camera.y);
      if (lakeMinScreenY < viewH + 40) {
        const step = 16;
        // Pebbly Sand Shoreline Trim
        ctx.fillStyle = "#c9b896";
        ctx.beginPath();
        for (let sx = -step; sx <= viewW + step; sx += step) {
          const wx = sx + camera.x;
          const sy = Math.round(getSouthernLakeShoreY(wx) - camera.y);
          if (sx === -step) ctx.moveTo(sx, sy - 5);
          else ctx.lineTo(sx, sy - 5);
        }
        ctx.lineTo(viewW + step, viewH + 20);
        ctx.lineTo(-step, viewH + 20);
        ctx.closePath();
        ctx.fill();

        // Crystal-Clear Turquoise Wading Shallows
        ctx.fillStyle = "#52d1c6";
        ctx.beginPath();
        for (let sx = -step; sx <= viewW + step; sx += step) {
          const wx = sx + camera.x;
          const sy = Math.round(getSouthernLakeShoreY(wx) - camera.y);
          if (sx === -step) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.lineTo(viewW + step, viewH + 20);
        ctx.lineTo(-step, viewH + 20);
        ctx.closePath();
        ctx.fill();

        // Deep Sapphire-Teal Alpine Lake Body
        ctx.fillStyle = "#1f6c82";
        ctx.beginPath();
        for (let sx = -step; sx <= viewW + step; sx += step) {
          const wx = sx + camera.x;
          const sy = Math.round(getSouthernLakeShoreY(wx) + WADING_DEPTH - camera.y);
          if (sx === -step) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.lineTo(viewW + step, viewH + 20);
        ctx.lineTo(-step, viewH + 20);
        ctx.closePath();
        ctx.fill();

        // Animated Shoreline Foam & Starlight Ripples
        ctx.fillStyle = "rgba(224, 255, 252, 0.55)";
        for (let sx = 0; sx < viewW; sx += 24) {
          const wx = sx + camera.x;
          const sy = Math.round(getSouthernLakeShoreY(wx) - camera.y + Math.sin(t * 3 + wx * 0.04) * 2);
          if (sy > -10 && sy < viewH + 10) {
            ctx.fillRect(sx, sy + 2, 14, 2);
          }
        }

        // Swimming Colorful Koi Fish
        for (const koi of LAKE_KOI) {
          const kx = Math.round(koi.x - camera.x);
          const ky = Math.round(koi.y - camera.y + Math.sin(t * 2.5 + koi.phase) * 3);
          if (kx < -20 || kx > viewW + 20 || ky < -20 || ky > viewH + 20) continue;
          const tailWag = Math.round(Math.sin(t * 10 + koi.phase) * 2);
          ctx.fillStyle = koi.color;
          ctx.fillRect(kx - 4, ky - 2, 8, 4);
          ctx.fillRect(koi.dir > 0 ? kx - 7 : kx + 4, ky - 1 + tailWag, 3, 2);
        }
      }

      // 5. Lantern Islet & Wooden Footbridge
      const ix = Math.round(LAKE_ISLAND.x - camera.x);
      const iy = Math.round(LAKE_ISLAND.y - camera.y);
      if (ix + LAKE_ISLAND.rx > -40 && ix - LAKE_ISLAND.rx < viewW + 40 && iy + LAKE_ISLAND.ry > -40 && iy - LAKE_ISLAND.ry < viewH + 40) {
        // Shallow sandbar halo
        ctx.fillStyle = "#52d1c6";
        ctx.beginPath();
        ctx.ellipse(ix, iy, LAKE_ISLAND.rx + 18, LAKE_ISLAND.ry + 14, 0, 0, Math.PI * 2);
        ctx.fill();

        // Stone retaining rim & emerald turf
        ctx.fillStyle = "#8c8377";
        ctx.beginPath();
        ctx.ellipse(ix, iy + 3, LAKE_ISLAND.rx + 3, LAKE_ISLAND.ry + 3, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#48913b";
        ctx.beginPath();
        ctx.ellipse(ix, iy, LAKE_ISLAND.rx, LAKE_ISLAND.ry, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#62b552";
        ctx.beginPath();
        ctx.ellipse(ix, iy - 3, LAKE_ISLAND.rx - 14, LAKE_ISLAND.ry - 10, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Wooden Footbridge Connecting Valley to Lantern Islet
      {
        const bx = Math.round(ISLAND_BRIDGE.x - camera.x);
        const by = Math.round(ISLAND_BRIDGE.y - camera.y);
        if (bx + ISLAND_BRIDGE.w > -20 && bx < viewW + 20 && by + ISLAND_BRIDGE.h > -20 && by < viewH + 20) {
          ctx.fillStyle = "#693f21";
          ctx.fillRect(bx, by, ISLAND_BRIDGE.w, ISLAND_BRIDGE.h);
          ctx.fillStyle = "#a86d3e";
          for (let py = by + 2; py < by + ISLAND_BRIDGE.h - 2; py += 6) {
            ctx.fillRect(bx + 3, py, ISLAND_BRIDGE.w - 6, 4);
          }
          ctx.fillStyle = "#4a2b15";
          ctx.fillRect(bx, by, 4, ISLAND_BRIDGE.h);
          ctx.fillRect(bx + ISLAND_BRIDGE.w - 4, by, 4, ISLAND_BRIDGE.h);
        }
      }

      // 6. Five Southern Wooden Lake Piers
      for (const p of SOUTHERN_PIERS) {
        const shoreY = getSouthernLakeShoreY(p.x + p.w / 2);
        const px = Math.round(p.x - camera.x);
        const py = Math.round(shoreY - 6 - camera.y);
        if (px + p.w < -20 || px > viewW + 20 || py + p.len < -20 || py > viewH + 20) continue;

        // Support pilings in water
        ctx.fillStyle = "#3b2210";
        ctx.fillRect(px + 2, py + p.len - 4, 5, 12);
        ctx.fillRect(px + p.w - 7, py + p.len - 4, 5, 12);

        // Cedar plank deck
        ctx.fillStyle = "#754624";
        ctx.fillRect(px, py, p.w, p.len);
        ctx.fillStyle = "#b57847";
        for (let dy = py + 2; dy < py + p.len - 2; dy += 6) {
          ctx.fillRect(px + 2, dy, p.w - 4, 4);
        }

        // Pier-end warm lantern post
        ctx.fillStyle = "#2b1d14";
        ctx.fillRect(px + p.w - 8, py + p.len - 16, 3, 14);
        ctx.fillStyle = "#ffd166";
        ctx.fillRect(px + p.w - 10, py + p.len - 21, 7, 6);
      }
    }

    function drawHotSpringsAndDecks(t) {
      // 1. Cedar Boardwalk Decks
      for (const d of WOOD_DECKS) {
        const dx = Math.round(d.x - camera.x);
        const dy = Math.round(d.y - camera.y);
        if (dx + d.w < -20 || dx > viewW + 20 || dy + d.h < -20 || dy > viewH + 20) continue;

        ctx.fillStyle = "rgba(14, 22, 16, 0.34)";
        ctx.fillRect(dx + 2, dy + 3, d.w, d.h);
        ctx.fillStyle = "#6e4323";
        ctx.fillRect(dx, dy, d.w, d.h);
        ctx.fillStyle = "#a86d3e";
        ctx.fillRect(dx + 2, dy + 2, d.w - 4, d.h - 4);

        ctx.fillStyle = "#87532c";
        if (d.w >= d.h) {
          for (let sx = dx + 6; sx < dx + d.w - 4; sx += 8) {
            ctx.fillRect(sx, dy + 2, 1, d.h - 4);
          }
        } else {
          for (let sy = dy + 6; sy < dy + d.h - 4; sy += 8) {
            ctx.fillRect(dx + 2, sy, d.w - 4, 1);
          }
        }
      }

      // 2. Seven Steaming Mineral Hot Springs
      for (const s of SPRINGS) {
        const sx = Math.round(s.x - camera.x);
        const sy = Math.round(s.y - camera.y);
        if (sx + s.rx < -40 || sx - s.rx > viewW + 40 || sy + s.ry < -40 || sy - s.ry > viewH + 40) continue;

        // Outer stone or cedar hinoki tub rim
        ctx.fillStyle = "rgba(12, 20, 16, 0.36)";
        ctx.beginPath();
        ctx.ellipse(sx, sy + 4, s.rx + 8, s.ry + 7, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = s.rimColor;
        ctx.beginPath();
        ctx.ellipse(sx, sy, s.rx + 6, s.ry + 5, 0, 0, Math.PI * 2);
        ctx.fill();

        if (s.isWoodTub) {
          ctx.strokeStyle = "#c98b57";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(sx, sy, s.rx + 3, s.ry + 2, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Deep & glowing thermal spring water
        ctx.fillStyle = s.deepColor;
        ctx.beginPath();
        ctx.ellipse(sx, sy, s.rx, s.ry, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = s.waterColor;
        ctx.beginPath();
        ctx.ellipse(sx, sy + 2, s.rx - 6, s.ry - 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Concentric animated thermal ripples
        const pulse = (t * 14) % 24;
        ctx.strokeStyle = s.shimmerColor;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.55 * (1 - pulse / 24);
        ctx.beginPath();
        ctx.ellipse(sx, sy, Math.max(8, s.rx * 0.45 + pulse), Math.max(6, s.ry * 0.45 + pulse * 0.65), 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Floating Golden Yuzu Citrus
        if (s.yuzu) {
          const yuzuOffsets = [[-36, -14, 0.2], [28, 18, 1.5], [-18, 26, 2.8], [44, -10, 4.1]];
          for (const [ox, oy, ph] of yuzuOffsets) {
            const bob = Math.round(Math.sin(t * 2.5 + ph) * 1.5);
            ctx.fillStyle = "#ffd43b";
            ctx.fillRect(sx + ox, sy + oy + bob, 6, 5);
            ctx.fillStyle = "#52b788";
            ctx.fillRect(sx + ox + 2, sy + oy - 1 + bob, 2, 1);
          }
        }

        // Floating Sakura Petals on Water Surface
        if (s.petals) {
          const petalOffsets = [[-26, -18], [18, -22], [34, 12], [-32, 16], [6, 24], [-10, -8]];
          ctx.fillStyle = "#ffe0ee";
          for (let i = 0; i < petalOffsets.length; i++) {
            const [ox, oy] = petalOffsets[i];
            const drift = Math.round(Math.sin(t * 1.8 + i) * 2);
            ctx.fillRect(sx + ox + drift, sy + oy, 3, 2);
          }
        }

        // Wooden Entry Steps
        if (s.steps) {
          const stx = Math.round(s.steps.x - camera.x);
          const sty = Math.round(s.steps.y - camera.y);
          ctx.fillStyle = "#6e4323";
          ctx.fillRect(stx, sty, s.steps.w, s.steps.h);
          ctx.fillStyle = "#ba8050";
          for (let py = sty + 2; py < sty + s.steps.h - 2; py += 5) {
            ctx.fillRect(stx + 2, py, s.steps.w - 4, 3);
          }
        }

        // Pouring Bamboo Water Spout (Kakei)
        if (s.bambooSpout) {
          const bx = Math.round(s.bambooSpout.x - camera.x);
          const by = Math.round(s.bambooSpout.y - camera.y);
          ctx.fillStyle = "#4d8a3c";
          ctx.fillRect(bx - 3, by - 14, 6, 16);
          ctx.fillStyle = "#76ba59";
          ctx.fillRect(bx - 3, by - 8, 14, 5);
          ctx.fillStyle = "#e0ffff";
          const wobble = Math.round(Math.sin(t * 14) * 1);
          ctx.fillRect(bx + 9 + wobble, by - 3, 2, 12);
        }
      }

      // 3. Rim Boulders Around Springs
      for (const sr of SPRING_ROCKS) {
        const sprite = sr.big ? SPRITES.boulder : SPRITES.smallRock;
        const rx = Math.round(sr.x - sprite.width / 2 - camera.x);
        const ry = Math.round(sr.y - sprite.height / 2 - camera.y);
        if (rx + sprite.width < -10 || rx > viewW + 10 || ry + sprite.height < -10 || ry > viewH + 10) continue;
        ctx.drawImage(sprite, rx, ry);
      }
    }

// ========================================================================
    // PART 10 OF 16: DETAILED THREE-REALM ARCHITECTURE RENDERER
    // ========================================================================
    function drawLitWindows(x, y, cols, rows, gapX, gapY, w = 12, h = 16, arched = false) {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const wx = x + c * gapX;
          const wy = y + r * gapY;
          ctx.fillStyle = "#4a3b2c";
          ctx.fillRect(wx - 1, wy - 1, w + 2, h + 2);
          ctx.fillStyle = "#ffe58f";
          ctx.fillRect(wx, wy, w, h);
          if (arched) {
            ctx.beginPath();
            ctx.arc(wx + w / 2, wy, w / 2, Math.PI, 0);
            ctx.fill();
          }
          // Warm interior curtain & muntin bars
          ctx.fillStyle = "#ffb84d";
          ctx.fillRect(wx, wy + h - 4, w, 4);
          ctx.fillStyle = "#5c4938";
          ctx.fillRect(wx + Math.floor(w / 2), wy, 1, h);
          ctx.fillRect(wx, wy + Math.floor(h / 2), w, 1);
          // Window sill
          ctx.fillStyle = "#d9cfc1";
          ctx.fillRect(wx - 2, wy + h + 1, w + 4, 2);
        }
      }
    }

    function drawAllBuildings(t) {
      for (const b of BUILDINGS) {
        const bx = Math.round(b.x - camera.x);
        const by = Math.round(b.y - camera.y);
        if (bx + b.w < -60 || bx > viewW + 60 || by + b.h < -80 || by > viewH + 40) continue;

        // Ground contact shadow
        ctx.fillStyle = "rgba(12, 18, 32, 0.34)";
        ctx.fillRect(bx - 4, by + b.h - 6, b.w + 8, 12);

        if (b.kind === "palace") {
          // Kingsbury Royal Palace (Grand Columns, Cobalt Domes, Gold Finials & Red Carpet)
          const wingW = 92;
          // Left & Right Wings
          ctx.fillStyle = b.wall;
          ctx.fillRect(bx, by + 62, wingW, b.h - 62);
          ctx.fillRect(bx + b.w - wingW, by + 62, wingW, b.h - 62);
          ctx.fillStyle = b.roof;
          ctx.fillRect(bx - 4, by + 44, wingW + 8, 20);
          ctx.fillRect(bx + b.w - wingW - 4, by + 44, wingW + 8, 20);
          ctx.fillStyle = b.trim;
          ctx.fillRect(bx - 4, by + 62, wingW + 8, 3);
          ctx.fillRect(bx + b.w - wingW - 4, by + 62, wingW + 8, 3);

          // Wing Domes
          for (const dx of [bx + wingW / 2, bx + b.w - wingW / 2]) {
            ctx.fillStyle = b.roofLight;
            ctx.beginPath();
            ctx.arc(dx, by + 44, 24, Math.PI, 0);
            ctx.fill();
            ctx.fillStyle = b.trim;
            ctx.fillRect(dx - 2, by + 10, 4, 12);
          }

          // Central Grand Royal Hall
          const cx = bx + wingW - 6;
          const cw = b.w - (wingW - 6) * 2;
          ctx.fillStyle = "#fff8eb";
          ctx.fillRect(cx, by + 38, cw, b.h - 38);
          ctx.fillStyle = b.roof;
          ctx.fillRect(cx - 6, by + 20, cw + 12, 22);
          ctx.fillStyle = b.trim;
          ctx.fillRect(cx - 6, by + 40, cw + 12, 3);

          // Central Royal Crown Dome & Pennant
          const midX = bx + b.w / 2;
          ctx.fillStyle = b.roofLight;
          ctx.beginPath();
          ctx.arc(midX, by + 20, 42, Math.PI, 0);
          ctx.fill();
          ctx.fillStyle = b.trim;
          ctx.fillRect(midX - 2, by - 36, 4, 16);
          const wave = Math.round(Math.sin(t * 5) * 2);
          ctx.fillStyle = "#ff5c7c";
          ctx.fillRect(midX + 2, by - 35, 16, 7 + wave * 0.5);

          // Marble Pillars & Lit Palace Windows
          drawLitWindows(bx + 16, by + 78, 2, 2, 36, 48, 14, 22, true);
          drawLitWindows(bx + b.w - wingW + 16, by + 78, 2, 2, 36, 48, 14, 22, true);
          drawLitWindows(cx + 22, by + 56, 4, 2, 54, 48, 16, 24, true);

          ctx.fillStyle = "#e6dcc8";
          for (let px = cx + 12; px < cx + cw - 8; px += 28) {
            ctx.fillRect(px, by + 148, 6, b.h - 148);
          }

          // Grand Arched Entrance & Royal Red Carpet
          ctx.fillStyle = "#3d2618";
          ctx.fillRect(midX - 20, by + b.h - 46, 40, 46);
          ctx.fillStyle = "#ffd166";
          ctx.fillRect(midX - 22, by + b.h - 48, 44, 4);
          ctx.fillStyle = "#c92a42";
          ctx.fillRect(midX - 18, by + b.h, 36, 36);
          ctx.fillStyle = "#ffd166";
          ctx.fillRect(midX - 18, by + b.h, 2, 36);
          ctx.fillRect(midX + 16, by + b.h, 2, 36);

        } else if (b.kind === "conservatory") {
          // Royal Botanical Glass & Wrought-Iron Conservatory
          ctx.fillStyle = "#d9cfc1";
          ctx.fillRect(bx, by + b.h - 26, b.w, 26);
          ctx.fillStyle = "#8ce0f5";
          ctx.fillRect(bx + 8, by + 48, b.w - 16, b.h - 74);
          ctx.fillStyle = "rgba(255, 246, 196, 0.45)";
          ctx.fillRect(bx + 14, by + 54, b.w - 28, b.h - 84);

          // Glass Dome Roof
          const midX = bx + b.w / 2;
          ctx.fillStyle = b.roof;
          ctx.beginPath();
          ctx.arc(midX, by + 50, 74, Math.PI, 0);
          ctx.fill();
          ctx.fillStyle = b.roofLight;
          ctx.beginPath();
          ctx.arc(midX - 10, by + 48, 52, Math.PI, 0);
          ctx.fill();

          // Ornate Ribbing & Lush Indoor Palms Visible Through Glass
          ctx.fillStyle = "#2b4f60";
          for (let rx = bx + 8; rx <= bx + b.w - 8; rx += 22) {
            ctx.fillRect(rx, by + 48, 2, b.h - 48);
          }
          ctx.fillStyle = "#3b8c47";
          ctx.beginPath();
          ctx.arc(bx + 54, by + 115, 24, 0, Math.PI * 2);
          ctx.arc(bx + 122, by + 95, 30, 0, Math.PI * 2);
          ctx.arc(bx + 190, by + 115, 24, 0, Math.PI * 2);
          ctx.fill();

          // Double Glass Doors
          ctx.fillStyle = b.trim;
          ctx.fillRect(midX - 18, by + b.h - 42, 36, 42);
          ctx.fillStyle = "#ffe885";
          ctx.fillRect(midX - 14, by + b.h - 38, 12, 36);
          ctx.fillRect(midX + 2, by + b.h - 38, 12, 36);

        } else if (b.kind === "observatory") {
          // Royal Astronomical Observatory with Copper-Teal Telescope Dome
          ctx.fillStyle = b.wall;
          ctx.fillRect(bx + 14, by + 46, b.w - 28, b.h - 46);
          ctx.fillStyle = b.roof;
          ctx.beginPath();
          ctx.arc(bx + b.w / 2, by + 48, 62, Math.PI, 0);
          ctx.fill();
          ctx.fillStyle = b.roofLight;
          ctx.beginPath();
          ctx.arc(bx + b.w / 2 - 8, by + 46, 44, Math.PI, 0);
          ctx.fill();
          // Brass Telescope Barrel Peeking Out
          ctx.fillStyle = b.trim;
          ctx.fillRect(bx + b.w / 2 + 18, by + 6, 26, 8);
          drawLitWindows(bx + 32, by + 64, 3, 1, 44, 30, 14, 22, true);
          ctx.fillStyle = "#4a2e1b";
          ctx.fillRect(bx + b.w / 2 - 14, by + b.h - 34, 28, 34);

        } else if (b.kind === "spire") {
          // Royal Alchemist & Clock Spire
          ctx.fillStyle = b.wall;
          ctx.fillRect(bx + 26, by + 48, b.w - 52, b.h - 48);
          ctx.fillStyle = b.roof;
          ctx.beginPath();
          ctx.moveTo(bx + 16, by + 50);
          ctx.lineTo(bx + b.w / 2, by - 14);
          ctx.lineTo(bx + b.w - 16, by + 50);
          ctx.closePath();
          ctx.fill();
          // Glowing Golden Clock Face
          const cx = bx + b.w / 2;
          ctx.fillStyle = b.trim;
          ctx.beginPath();
          ctx.arc(cx, by + 68, 18, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#fff9e6";
          ctx.beginPath();
          ctx.arc(cx, by + 68, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#1d263b";
          ctx.fillRect(cx - 1, by + 58, 2, 10);
          ctx.fillRect(cx, by + 67, 8, 2);
          drawLitWindows(bx + 42, by + 98, 2, 1, 48, 24, 14, 20, true);

        } else if (b.kind === "opera_grand") {
          // Grand Canal Symphony Opera House
          ctx.fillStyle = b.wall;
          ctx.fillRect(bx + 8, by + 42, b.w - 16, b.h - 42);
          ctx.fillStyle = b.roof;
          ctx.fillRect(bx, by + 24, b.w, 20);
          ctx.fillStyle = b.roofLight;
          ctx.beginPath();
          ctx.arc(bx + b.w / 2, by + 24, 48, Math.PI, 0);
          ctx.fill();
          ctx.fillStyle = b.trim;
          ctx.fillRect(bx, by + 42, b.w, 3);
          drawLitWindows(bx + 24, by + 56, 4, 1, 44, 26, 16, 24, true);
          ctx.fillStyle = "#a32944";
          ctx.fillRect(bx + 42, by + b.h - 36, b.w - 84, 36);
          ctx.fillStyle = b.trim;
          ctx.fillRect(bx + 38, by + b.h - 40, b.w - 76, 4);

        } else if (b.kind === "station") {
          // Kingsbury Grand Central Station
          ctx.fillStyle = b.wall;
          ctx.fillRect(bx + 8, by + 38, b.w - 16, b.h - 38);
          ctx.fillStyle = b.roof;
          ctx.fillRect(bx, by + 18, b.w, 22);
          ctx.fillStyle = b.trim;
          ctx.fillRect(bx, by + 38, b.w, 3);
          // Station Clock & Arched Train Platforms
          ctx.fillStyle = "#fff9e6";
          ctx.beginPath();
          ctx.arc(bx + b.w / 2, by + 28, 11, 0, Math.PI * 2);
          ctx.fill();
          drawLitWindows(bx + 22, by + 52, 4, 1, 44, 24, 14, 20, true);
          ctx.fillStyle = "#2b3240";
          ctx.fillRect(bx + 28, by + b.h - 38, 46, 38);
          ctx.fillRect(bx + b.w - 74, by + b.h - 38, 46, 38);

        } else if (b.kind === "lighthouse") {
          // Kingsbury Harbor Lighthouse
          const midX = bx + b.w / 2;
          ctx.fillStyle = b.wall;
          ctx.beginPath();
          ctx.moveTo(midX - 28, by + b.h);
          ctx.lineTo(midX - 18, by + 32);
          ctx.lineTo(midX + 18, by + 32);
          ctx.lineTo(midX + 28, by + b.h);
          ctx.closePath();
          ctx.fill();
          // Crimson Stripes
          ctx.fillStyle = b.roof;
          ctx.fillRect(midX - 22, by + 54, 44, 16);
          ctx.fillRect(midX - 25, by + 88, 50, 16);
          // Lantern Room & Rotating Light Beam
          ctx.fillStyle = "#ffe885";
          ctx.fillRect(midX - 14, by + 14, 28, 18);
          ctx.fillStyle = b.roof;
          ctx.beginPath();
          ctx.moveTo(midX - 18, by + 14);
          ctx.lineTo(midX, by - 4);
          ctx.lineTo(midX + 18, by + 14);
          ctx.closePath();
          ctx.fill();
          // Rotating Beacon Beam
          const beamAlpha = 0.16 + 0.08 * Math.sin(t * 3);
          ctx.fillStyle = `rgba(255, 240, 150, ${beamAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(midX, by + 22);
          ctx.lineTo(midX + Math.cos(t * 1.4) * 140, by + 75);
          ctx.lineTo(midX + Math.cos(t * 1.4 + 0.35) * 140, by + 95);
          ctx.closePath();
          ctx.fill();

        } else if (b.kind === "bathhouse") {
          // Starlight Grand Onsen Bathhouse (Multi-Tiered Japanese Cedar & Slate Eaves)
          ctx.fillStyle = b.wall;
          ctx.fillRect(bx + 24, by + 52, b.w - 48, b.h - 52);

          // Dark Timber Beams
          ctx.fillStyle = "#4a2c18";
          for (let tx = bx + 24; tx <= bx + b.w - 24; tx += 45) {
            ctx.fillRect(tx, by + 52, 5, b.h - 52);
          }
          ctx.fillRect(bx + 24, by + 98, b.w - 48, 5);

          // Lower Sweeping Tiled Eave
          ctx.fillStyle = b.roof;
          ctx.fillRect(bx + 6, by + 40, b.w - 12, 16);
          ctx.fillStyle = b.trim;
          ctx.fillRect(bx + 6, by + 54, b.w - 12, 2);

          // Upper Pagoda Roof Tier
          ctx.fillStyle = b.roofLight;
          ctx.fillRect(bx + 68, by + 16, b.w - 136, 24);
          ctx.fillStyle = b.roof;
          ctx.fillRect(bx + 56, by + 26, b.w - 112, 14);
          ctx.fillStyle = b.trim;
          ctx.fillRect(bx + 90, by + 10, 6, 8);
          ctx.fillRect(bx + b.w - 96, by + 10, 6, 8);

          // Warm Shoji Paper Windows
          drawLitWindows(bx + 42, by + 64, 6, 1, 56, 24, 24, 24, false);
          drawLitWindows(bx + 42, by + 114, 2, 1, 56, 24, 24, 24, false);
          drawLitWindows(bx + b.w - 122, by + 114, 2, 1, 56, 24, 24, 24, false);

          // Grand Entrance Noren Curtains with Onsen Steam Emblem (♨)
          const midX = bx + b.w / 2;
          ctx.fillStyle = "#3b2212";
          ctx.fillRect(midX - 34, by + b.h - 46, 68, 46);
          ctx.fillStyle = "#2c4c7a";
          for (let nx = midX - 30; nx < midX + 26; nx += 15) {
            ctx.fillRect(nx, by + b.h - 42, 13, 24);
            ctx.fillStyle = "#ffd166";
            ctx.fillRect(nx + 4, by + b.h - 34, 5, 5);
            ctx.fillStyle = "#2c4c7a";
          }

        } else if (b.kind === "pavilion") {
          // Lakeside Matcha Tea Pavilion
          ctx.fillStyle = "#4a2c18";
          ctx.fillRect(bx + 18, by + 34, 6, b.h - 34);
          ctx.fillRect(bx + b.w - 24, by + 34, 6, b.h - 34);
          ctx.fillStyle = "#a86d3e";
          ctx.fillRect(bx + 12, by + b.h - 18, b.w - 24, 18);
          ctx.fillStyle = b.roof;
          ctx.beginPath();
          ctx.moveTo(bx, by + 38);
          ctx.lineTo(bx + b.w / 2, by + 6);
          ctx.lineTo(bx + b.w, by + 38);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = b.trim;
          ctx.fillRect(bx + b.w / 2 - 3, by + 2, 6, 6);

        } else if (b.kind === "cottage") {
          // Howl & Sophie's Hilltop Flower Meadow Cottage
          ctx.fillStyle = b.wall;
          ctx.fillRect(bx + 20, by + 56, b.w - 40, b.h - 56);
          // Stone Chimney
          ctx.fillStyle = "#7a736a";
          ctx.fillRect(bx + b.w - 64, by + 8, 22, 52);
          // Steep Rose-Plum Gable Roof
          ctx.fillStyle = b.roof;
          ctx.beginPath();
          ctx.moveTo(bx + 6, by + 60);
          ctx.lineTo(bx + b.w / 2, by + 12);
          ctx.lineTo(bx + b.w - 6, by + 60);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = b.roofLight;
          ctx.beginPath();
          ctx.moveTo(bx + 22, by + 60);
          ctx.lineTo(bx + b.w / 2, by + 22);
          ctx.lineTo(bx + b.w - 22, by + 60);
          ctx.closePath();
          ctx.fill();

          // Flowerbox Windows & Round Attic Window
          ctx.fillStyle = "#ffe885";
          ctx.beginPath();
          ctx.arc(bx + b.w / 2, by + 44, 10, 0, Math.PI * 2);
          ctx.fill();
          drawLitWindows(bx + 46, by + 82, 2, 1, 178, 24, 22, 24, false);
          // Flowerboxes
          for (const fx of [bx + 44, bx + 222]) {
            ctx.fillStyle = "#7a4722";
            ctx.fillRect(fx, by + 108, 26, 6);
            ctx.fillStyle = "#ff7aa8";
            ctx.fillRect(fx + 2, by + 104, 22, 4);
          }
          // Cozy Arched Cottage Door
          const midX = bx + b.w / 2;
          ctx.fillStyle = "#754624";
          ctx.fillRect(midX - 16, by + b.h - 44, 32, 44);
          ctx.fillStyle = b.trim;
          ctx.fillRect(midX + 8, by + b.h - 22, 3, 3);

        } else {
          // Detailed Kingsbury Townhouses, Patisserie, Boulangerie, Tea Salon & Market
          ctx.fillStyle = b.wall;
          ctx.fillRect(bx + 8, by + 34, b.w - 16, b.h - 34);

          // Mansard / Pitched Roof
          ctx.fillStyle = b.roof;
          ctx.fillRect(bx + 2, by + 16, b.w - 4, 20);
          ctx.fillStyle = b.roofLight;
          ctx.fillRect(bx + 10, by + 12, b.w - 20, 8);
          ctx.fillStyle = b.trim;
          ctx.fillRect(bx + 2, by + 34, b.w - 4, 2);

          // Upper Story Windows
          const cols = Math.max(2, Math.floor((b.w - 40) / 46));
          drawLitWindows(bx + 24, by + 46, cols, 1, 46, 24, 14, 18, true);

          // Striped Café / Shop Awning
          const a1 = b.awning1 || b.roof;
          const a2 = b.awning2 || "#fff8eb";
          const awY = by + b.h - 48;
          for (let ax = bx + 12, idx = 0; ax < bx + b.w - 20; ax += 12, idx++) {
            const segW = Math.min(12, bx + b.w - 12 - ax);
            ctx.fillStyle = idx % 2 === 0 ? a1 : a2;
            ctx.fillRect(ax, awY, segW, 12);
          }

          // Warm Shopfront Display Windows & Door
          ctx.fillStyle = "#ffe58f";
          ctx.fillRect(bx + 20, awY + 14, 34, 22);
          ctx.fillRect(bx + b.w - 54, awY + 14, 34, 22);
          ctx.fillStyle = "#5c3822";
          ctx.fillRect(bx + b.w / 2 - 12, awY + 12, 24, b.h - (awY + 12 - by));
        }
      }
    }
  
// ========================================================================
    // PART 11 OF 16: DEPTH-SORTED WORLD ENTITIES, STREET FURNITURE & ROWBOATS
    // ========================================================================
    function drawCityFlowerbed(fb) {
      const fx = Math.round(fb.x - camera.x);
      const fy = Math.round(fb.y - camera.y);
      if (fx + fb.w < -20 || fx > viewW + 20 || fy + fb.h < -20 || fy > viewH + 20) return;

      // Stone planter border & rich soil
      ctx.fillStyle = "#cfc6b8";
      ctx.fillRect(fx - 2, fy - 2, fb.w + 4, fb.h + 4);
      ctx.fillStyle = "#4d3524";
      ctx.fillRect(fx, fy, fb.w, fb.h);

      // Lush foliage & colorful blossoms
      ctx.fillStyle = "#3f8236";
      ctx.fillRect(fx + 2, fy + 2, fb.w - 4, fb.h - 4);
      const bloomCols = ["#ff7aa8", "#ffd166", "#7cc0ff", "#ffffff", "#b99ff5"];
      for (let bx = fx + 4, i = 0; bx < fx + fb.w - 4; bx += 7, i++) {
        ctx.fillStyle = bloomCols[i % bloomCols.length];
        ctx.fillRect(bx, fy + 3 + (i % 2) * 4, 4, 4);
      }
    }

    function drawCafeTable(ct) {
      const tx = Math.round(ct.x - camera.x);
      const ty = Math.round(ct.y - camera.y);
      if (tx < -40 || tx > viewW + 40 || ty < -60 || ty > viewH + 40) return;

      // Shadow
      ctx.fillStyle = "rgba(12, 18, 32, 0.30)";
      ctx.beginPath();
      ctx.ellipse(tx, ty + 3, 16, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Wrought-iron bistro chairs & round table
      ctx.fillStyle = "#2b303d";
      ctx.fillRect(tx - 12, ty - 7, 5, 9);
      ctx.fillRect(tx + 7, ty - 7, 5, 9);
      ctx.fillRect(tx - 1, ty - 9, 2, 11);

      ctx.fillStyle = "#fff8eb";
      ctx.beginPath();
      ctx.ellipse(tx, ty - 9, 10, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Umbrella pole & striped parasol canopy
      ctx.fillStyle = "#d9cfc1";
      ctx.fillRect(tx - 1, ty - 34, 2, 25);
      ctx.fillStyle = ct.umbrella;
      ctx.beginPath();
      ctx.arc(tx, ty - 32, 16, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = "#fff8eb";
      ctx.fillRect(tx - 5, ty - 45, 10, 13);
      ctx.fillStyle = "#ffd166";
      ctx.fillRect(tx - 1, ty - 50, 2, 3);
    }

    function drawFlowerCart(fc) {
      const cx = Math.round(fc.x - camera.x);
      const cy = Math.round(fc.y - camera.y);
      if (cx < -50 || cx > viewW + 50 || cy < -60 || cy > viewH + 40) return;

      ctx.fillStyle = "rgba(12, 18, 32, 0.32)";
      ctx.fillRect(cx - 22, cy - 1, 44, 6);

      // Wooden cart bed & spoked wheels
      ctx.fillStyle = "#7a4722";
      ctx.fillRect(cx - 20, cy - 16, 40, 12);
      ctx.fillStyle = "#b57847";
      ctx.fillRect(cx - 18, cy - 14, 36, 8);

      ctx.fillStyle = "#3b2210";
      ctx.beginPath();
      ctx.arc(cx - 11, cy - 2, 6, 0, Math.PI * 2);
      ctx.arc(cx + 11, cy - 2, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffd166";
      ctx.fillRect(cx - 12, cy - 3, 2, 2);
      ctx.fillRect(cx + 10, cy - 3, 2, 2);

      // Abundant flower buckets on cart
      const bucketCols = ["#ff7aa8", "#ffd166", "#7cc0ff", "#ff9ec4", "#b99ff5"];
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = bucketCols[i];
        ctx.fillRect(cx - 17 + i * 7, cy - 22, 6, 6);
      }

      // Canopy posts & scalloped awning
      ctx.fillStyle = "#5c3419";
      ctx.fillRect(cx - 19, cy - 38, 2, 22);
      ctx.fillRect(cx + 17, cy - 38, 2, 22);
      ctx.fillStyle = fc.canopy;
      ctx.fillRect(cx - 22, cy - 43, 44, 7);
      ctx.fillStyle = "#fff8eb";
      for (let sx = cx - 20; sx < cx + 18; sx += 8) {
        ctx.fillRect(sx, cy - 43, 4, 7);
      }
    }

    function drawStreetlamp(sl, t) {
      const lx = Math.round(sl.x - camera.x);
      const ly = Math.round(sl.y - camera.y);
      if (lx < -30 || lx > viewW + 30 || ly < -60 || ly > viewH + 30) return;

      ctx.fillStyle = "#222733";
      ctx.fillRect(lx - 3, ly - 3, 6, 5);
      ctx.fillRect(lx - 1, ly - 36, 2, 34);
      ctx.fillRect(lx - 4, ly - 36, 8, 2);

      // Warm glass lantern housing
      const flicker = 0.85 + 0.15 * Math.sin(t * 6 + sl.x);
      ctx.fillStyle = "#ffe58f";
      ctx.globalAlpha = flicker;
      ctx.fillRect(lx - 3, ly - 44, 6, 8);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#222733";
      ctx.fillRect(lx - 4, ly - 46, 8, 2);
      ctx.fillRect(lx - 2, ly - 48, 4, 2);
    }

    function drawOnsenLanternPost(lp, t) {
      const lx = Math.round(lp.x - camera.x);
      const ly = Math.round(lp.y - camera.y);
      if (lx < -30 || lx > viewW + 30 || ly < -50 || ly > viewH + 30) return;

      // Stone Toro lantern pedestal & glowing paper firebox
      ctx.fillStyle = "#5d646e";
      ctx.fillRect(lx - 4, ly - 4, 8, 6);
      ctx.fillRect(lx - 2, ly - 18, 4, 14);
      const flicker = 0.86 + 0.14 * Math.sin(t * 5.5 + lp.x * 0.2);
      ctx.fillStyle = "#ffd166";
      ctx.globalAlpha = flicker;
      ctx.fillRect(lx - 4, ly - 25, 8, 7);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#495057";
      ctx.fillRect(lx - 6, ly - 28, 12, 3);
      ctx.fillRect(lx - 2, ly - 30, 4, 2);
    }

    function drawRowboat(boat, t) {
      const bob = Math.round(Math.sin(t * 2.6 + boat.x * 0.04) * 1.5);
      const bx = Math.round(boat.x - camera.x);
      const by = Math.round(boat.y - camera.y + bob);
      if (bx < -50 || bx > viewW + 50 || by < -40 || by > viewH + 40) return;

      // Water ripple around hull
      ctx.strokeStyle = "rgba(214, 255, 252, 0.55)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(bx, by + 5, 22, 7, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Cedar rowboat hull
      ctx.fillStyle = "#5e3518";
      ctx.beginPath();
      ctx.ellipse(bx, by + 2, 19, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#9e6234";
      ctx.beginPath();
      ctx.ellipse(bx, by, 16, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Painted trim & bench seats
      ctx.fillStyle = boat.trim;
      ctx.fillRect(bx - 14, by + 2, 28, 2);
      ctx.fillStyle = "#c98b57";
      ctx.fillRect(bx - 7, by - 3, 4, 6);
      ctx.fillRect(bx + 3, by - 3, 4, 6);

      // If Wizard Howl is rowing this boat, draw him seated inside with oars
      if (boat.occupied) {
        drawCharacterSprite("howl", boat.x, boat.y + bob - 2, player.dir, player.walkFrame, false, false, t);
        const oarSwing = Math.sin(t * 7 + player.walkFrame) * 4;
        ctx.fillStyle = "#d9a36c";
        ctx.fillRect(bx - 3, Math.round(by + 3 + oarSwing), 3, 12);
      }
    }

    function drawSparkles() {
      for (const sp of player.sparkles) {
        const sx = Math.round(sp.x - camera.x);
        const sy = Math.round(sp.y - camera.y);
        ctx.globalAlpha = Math.max(0, Math.min(1, sp.life * 1.5));
        ctx.fillStyle = sp.color;
        ctx.fillRect(sx - 1, sy, 3, 1);
        ctx.fillRect(sx, sy - 1, 1, 3);
      }
      ctx.globalAlpha = 1;
    }

    function renderYSortedWorld(t) {
      const renderables = [];
      const padX = 110;
      const padY = 150;

      // 1. Tall, Thin-Trunked Trees with Lush Canopies
      for (const tree of TREES) {
        if (
          tree.x < camera.x - padX || tree.x > camera.x + viewW + padX ||
          tree.y < camera.y - padY || tree.y > camera.y + viewH + padY
        ) continue;
        renderables.push({
          y: tree.y,
          draw() {
            let spr = SPRITES.treeOak;
            if (tree.kind === "sakura") spr = SPRITES.treeSakura;
            else if (tree.kind === "pine") spr = SPRITES.treePine;
            else if (tree.kind === "willow") spr = SPRITES.treeWillow;

            const sway = Math.round(Math.sin(t * 1.4 + tree.x * 0.03) * 0.8);
            ctx.drawImage(
              spr,
              Math.round(tree.x - spr.width / 2 + sway),
              Math.round(tree.y - spr.height + 7)
            );
          }
        });
      }

      // 2. 10-Species Botanical Wildflowers
      for (const fl of FLOWERS) {
        if (
          fl.x < camera.x - 40 || fl.x > camera.x + viewW + 40 ||
          fl.y < camera.y - 40 || fl.y > camera.y + viewH + 40
        ) continue;
        renderables.push({
          y: fl.y,
          draw() {
            const spr = SPRITES.flowers[fl.species] || SPRITES.flowers.pinkCosmos;
            const sway = Math.round(Math.sin(t * 2.2 + fl.swayPhase) * 0.8);
            ctx.drawImage(
              spr,
              Math.round(fl.x - spr.width / 2 + sway),
              Math.round(fl.y - spr.height + 5)
            );
          }
        });
      }

      // 3. Benches, Barrels & Mossy Boulders
      for (const pr of PROPS) {
        if (
          pr.x < camera.x - 50 || pr.x > camera.x + viewW + 50 ||
          pr.y < camera.y - 50 || pr.y > camera.y + viewH + 50
        ) continue;
        renderables.push({
          y: pr.y,
          draw() {
            let spr = SPRITES.boulder;
            if (pr.kind === "bench") spr = SPRITES.woodenBench;
            else if (pr.kind === "barrel") spr = SPRITES.woodenBarrel;
            else if (pr.kind === "smallRock") spr = SPRITES.smallRock;
            ctx.drawImage(
              spr,
              Math.round(pr.x - spr.width / 2),
              Math.round(pr.y - spr.height + 5)
            );
          }
        });
      }

      // 4. Onsen Stone Lantern Posts
      for (const lp of LANTERNS) {
        if (
          lp.x < camera.x - 40 || lp.x > camera.x + viewW + 40 ||
          lp.y < camera.y - 40 || lp.y > camera.y + viewH + 40
        ) continue;
        renderables.push({
          y: lp.y,
          draw() {
            drawOnsenLanternPost(lp, t);
          }
        });
      }

      // 5. Kingsbury Flowerbeds, Bistro Tables, Flower Carts & Streetlamps
      for (const fb of CITY_FLOWERBEDS) {
        renderables.push({ y: fb.y + fb.h, draw: () => drawCityFlowerbed(fb) });
      }
      for (const ct of CAFE_TABLES) {
        renderables.push({ y: ct.y, draw: () => drawCafeTable(ct) });
      }
      for (const fc of FLOWER_CARTS) {
        renderables.push({ y: fc.y, draw: () => drawFlowerCart(fc) });
      }
      for (const sl of CITY_STREETLAMPS) {
        renderables.push({ y: sl.y, draw: () => drawStreetlamp(sl, t) });
      }

      // 6. Southern Lake Rowboats
      for (const boat of BOATS) {
        renderables.push({ y: boat.y, draw: () => drawRowboat(boat, t) });
      }

      // 7. All 8 Valley, City & Meadow NPCs
      for (const npc of NPCS) {
        renderables.push({
          y: npc.y,
          draw() {
            drawCharacterSprite(npc.id, npc.x, npc.y, npc.dir, npc.frame, false, false, t);
          }
        });
      }

      // 8. Wizard Howl (When Walking, Wading, or Soaking in Hot Springs)
      if (!player.inBoat) {
        renderables.push({
          y: player.y,
          draw() {
            drawCharacterSprite(
              "howl",
              player.x,
              player.y,
              player.dir,
              player.walkFrame,
              Boolean(player.inSpring),
              player.inShallowerWater,
              t
            );
          }
        });
      }

      // Sort strictly back-to-front by base Y coordinate
      renderables.sort((a, b) => a.y - b.y);
      for (const item of renderables) {
        item.draw();
      }

      drawSparkles();
    }

// ========================================================================
    // PART 12 OF 16: PIXEL-ART CHARACTER SPRITE RENDERER (HOWL & ALL 8 NPCS)
    // ========================================================================
    function drawCharacterSprite(kind, wx, wy, dir, frame, inSpring, inShallowWater, t) {
      const sx = Math.round(wx - camera.x);
      const sy = Math.round(wy - camera.y);
      if (sx < -40 || sx > viewW + 40 || sy < -60 || sy > viewH + 30) return;

      const stride = Math.sin(frame * 7.5);
      const bob = Math.round(Math.abs(stride) * 1.5);
      const submerged = Boolean(inSpring);
      const wading = Boolean(inShallowWater) && !submerged;

      // Ground contact shadow (only when on dry land or wading)
      if (!submerged) {
        ctx.fillStyle = wading ? "rgba(18, 72, 82, 0.35)" : "rgba(12, 18, 30, 0.36)";
        ctx.beginPath();
        ctx.ellipse(sx, sy + 2, kind === "heen" ? 10 : 8, 3.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      if (kind === "calcifer") {
        // Animated Fire Demon Calcifer with Dancing Flames & Expressive Eyes
        const flicker = Math.round(Math.sin(t * 12) * 1.8);
        const hop = Math.round(Math.abs(Math.sin(t * 4.5)) * 2);
        const cy = sy - hop;

        // Warm ember glow halo
        ctx.fillStyle = "rgba(255, 166, 43, 0.22)";
        ctx.beginPath();
        ctx.arc(sx, cy - 10, 15, 0, Math.PI * 2);
        ctx.fill();

        // Outer crimson-orange flame body
        ctx.fillStyle = "#e63e19";
        ctx.beginPath();
        ctx.ellipse(sx, cy - 9, 9, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(sx - 2, cy - 22 - flicker, 4, 6 + flicker);
        ctx.fillRect(sx - 6, cy - 18 + flicker * 0.5, 3, 5);
        ctx.fillRect(sx + 3, cy - 19 - flicker * 0.5, 3, 5);

        // Mid golden flame core
        ctx.fillStyle = "#ffae2b";
        ctx.beginPath();
        ctx.ellipse(sx, cy - 8, 6.5, 7.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff394";
        ctx.fillRect(sx - 3, cy - 11, 6, 7);

        // Big expressive cartoon eyes
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(sx - 5, cy - 12, 4, 4);
        ctx.fillRect(sx + 1, cy - 12, 4, 4);
        ctx.fillStyle = "#1a1412";
        const lookX = dir === 2 ? -1 : dir === 3 ? 1 : 0;
        ctx.fillRect(sx - 4 + lookX, cy - 11, 2, 2);
        ctx.fillRect(sx + 2 + lookX, cy - 11, 2, 2);

        // Cheerful mouth
        ctx.fillStyle = "#b82518";
        ctx.fillRect(sx - 2, cy - 6, 4, 2);
        return;
      }

      if (kind === "heen") {
        // Royal Errand Dog Heen (Chubby Cream-Tan Coat, Floppy Ears & Wagging Tail)
        const waddle = Math.round(Math.sin(frame * 8) * 1);
        const tailWag = Math.round(Math.sin(t * 14) * 2);

        // Stubby legs
        ctx.fillStyle = "#a88b68";
        ctx.fillRect(sx - 7, sy - 4 + waddle, 3, 5);
        ctx.fillRect(sx - 2, sy - 4 - waddle, 3, 5);
        ctx.fillRect(sx + 3, sy - 4 + waddle, 3, 5);
        ctx.fillRect(sx + 6, sy - 4 - waddle, 3, 5);

        // Plump body & wagging tail
        ctx.fillStyle = "#d9c29c";
        ctx.fillRect(sx - 9, sy - 12, 18, 9);
        ctx.fillStyle = "#f2e4c9";
        ctx.fillRect(sx - 6, sy - 10, 12, 6);
        ctx.fillRect(sx + (dir === 2 ? 8 : -11), sy - 12 + tailWag, 3, 3);

        // Head, floppy brown ears & wheezy snout
        const hx = dir === 2 ? sx - 6 : dir === 3 ? sx + 2 : sx - 3;
        ctx.fillStyle = "#e6d2b0";
        ctx.fillRect(hx - 2, sy - 19, 10, 9);
        ctx.fillStyle = "#8a6d4b";
        ctx.fillRect(hx - 4, sy - 18, 3, 7);
        ctx.fillRect(hx + 7, sy - 18, 3, 7);
        ctx.fillStyle = "#241d18";
        ctx.fillRect(hx, sy - 16, 2, 2);
        ctx.fillRect(hx + 5, sy - 16, 2, 2);
        ctx.fillRect(hx + 2, sy - 13, 3, 2);
        return;
      }

      if (kind === "turnip") {
        // Enchanted Prince Turnip Head (Top Hat, Turnip Face, Tailcoat & Wooden Cane)
        const hop = Math.round(Math.abs(Math.sin(frame * 6.5)) * 3.5);
        const ty = sy - hop;

        // Wooden hopping post & cane
        ctx.fillStyle = "#6e4323";
        ctx.fillRect(sx - 1, ty - 10, 2, 12);
        ctx.fillRect(sx + 7, ty - 14, 2, 14);
        ctx.fillStyle = "#ffd166";
        ctx.fillRect(sx + 6, ty - 15, 4, 2);

        // Dapper black tailcoat & crimson bowtie
        ctx.fillStyle = "#242938";
        ctx.fillRect(sx - 6, ty - 22, 12, 13);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(sx - 2, ty - 22, 4, 7);
        ctx.fillStyle = "#e63946";
        ctx.fillRect(sx - 2, ty - 21, 4, 2);

        // Round ivory turnip head with rosy lavender crown
        ctx.fillStyle = "#f7f3eb";
        ctx.beginPath();
        ctx.ellipse(sx, ty - 28, 7, 6.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#d99ec2";
        ctx.fillRect(sx - 5, ty - 33, 10, 2);
        ctx.fillStyle = "#2b2623";
        ctx.fillRect(sx - 3, ty - 29, 2, 2);
        ctx.fillRect(sx + 1, ty - 29, 2, 2);
        ctx.fillRect(sx - 3, ty - 25, 6, 1);

        // Tall glossy top hat
        ctx.fillStyle = "#1a1d26";
        ctx.fillRect(sx - 8, ty - 35, 16, 2);
        ctx.fillRect(sx - 5, ty - 44, 10, 9);
        ctx.fillStyle = "#4f5873";
        ctx.fillRect(sx - 5, ty - 37, 10, 2);
        return;
      }

      // Bipedal Humanoid Characters (Howl, Sophie, Markl, Witch, Lettie, Meadow Sprite)
      const by = submerged ? sy + 8 : sy - bob;
      const leftLegY = Math.round(stride * 2);
      const rightLegY = Math.round(-stride * 2);

      // 1. Boots & Trousers (Hidden when soaking in hot spring)
      if (!submerged) {
        const legClip = wading ? 3 : 0;
        ctx.fillStyle = kind === "howl" ? "#1e2436" : "#3b2c24";
        ctx.fillRect(sx - 4, by - 9 + leftLegY, 3, Math.max(2, 9 - legClip));
        ctx.fillRect(sx + 1, by - 9 + rightLegY, 3, Math.max(2, 9 - legClip));
      }

      // 2. Torso, Coat & Signature Attire
      if (kind === "howl") {
        // Wizard Howl: Iconic Pink-and-Slate Diamond Coat (or Towel Wrap when soaking)
        if (submerged) {
          ctx.fillStyle = "#ffdfb8";
          ctx.fillRect(sx - 6, by - 21, 12, 10);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(sx - 6, by - 14, 12, 4);
        } else {
          // Billowing diamond-patterned wizard jacket
          ctx.fillStyle = "#4d5c78";
          ctx.fillRect(sx - 7, by - 22, 14, 14);
          ctx.fillStyle = "#ff8fb8";
          ctx.fillRect(sx - 6, by - 21, 4, 4);
          ctx.fillRect(sx + 2, by - 21, 4, 4);
          ctx.fillRect(sx - 2, by - 17, 4, 4);
          ctx.fillRect(sx - 6, by - 13, 4, 4);
          ctx.fillRect(sx + 2, by - 13, 4, 4);
          // Crisp white shirt & emerald pendant
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(sx - 2, by - 22, 4, 9);
          ctx.fillStyle = "#38d9a9";
          ctx.fillRect(sx - 1, by - 19, 2, 2);
        }
      } else if (kind === "sophie") {
        // Sophie Hatter: Cornflower-Blue Dress, White Collar & Silver Braid with Pink Ribbon
        ctx.fillStyle = "#48689c";
        ctx.fillRect(sx - 6, by - 22, 12, 15);
        ctx.fillStyle = "#6286bf";
        ctx.fillRect(sx - 4, by - 21, 8, 12);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(sx - 3, by - 22, 6, 3);
      } else if (kind === "markl") {
        // Markl: Forest-Green Apprentice Cloak & Gold Clasp
        ctx.fillStyle = "#416b4a";
        ctx.fillRect(sx - 7, by - 21, 14, 14);
        ctx.fillStyle = "#5a8f65";
        ctx.fillRect(sx - 5, by - 20, 10, 11);
        ctx.fillStyle = "#ffd166";
        ctx.fillRect(sx - 1, by - 20, 2, 3);
      } else if (kind === "witch") {
        // Witch of the Waste: Plum Velvet Gown & Golden Brooch
        ctx.fillStyle = "#6e3556";
        ctx.fillRect(sx - 8, by - 22, 16, 15);
        ctx.fillStyle = "#8f4770";
        ctx.fillRect(sx - 6, by - 21, 12, 12);
        ctx.fillStyle = "#ffd166";
        ctx.fillRect(sx - 1, by - 20, 3, 3);
      } else if (kind === "lettie") {
        // Lettie Hatter: Rose-Pink Patisserie Dress & Crisp White Apron
        ctx.fillStyle = "#e06d88";
        ctx.fillRect(sx - 6, by - 22, 12, 15);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(sx - 4, by - 20, 8, 12);
      } else {
        // Meadow Sprite: Petal-Pink Tunic & Leaf-Green Mantle
        ctx.fillStyle = "#ff8fb8";
        ctx.fillRect(sx - 6, by - 21, 12, 13);
        ctx.fillStyle = "#6ec257";
        ctx.fillRect(sx - 7, by - 22, 14, 4);
      }

      // 3. Head, Face & Eyes
      ctx.fillStyle = kind === "witch" ? "#f7d4be" : "#ffdfb8";
      ctx.fillRect(sx - 5, by - 31, 10, 9);

      if (dir !== 1) {
        ctx.fillStyle = "#2b221e";
        const eyeOffsetX = dir === 2 ? -1 : dir === 3 ? 1 : 0;
        ctx.fillRect(sx - 3 + eyeOffsetX, by - 27, 2, 2);
        ctx.fillRect(sx + 1 + eyeOffsetX, by - 27, 2, 2);
        // Rosy cheeks
        ctx.fillStyle = "rgba(255, 122, 168, 0.55)";
        ctx.fillRect(sx - 4 + eyeOffsetX, by - 25, 2, 1);
        ctx.fillRect(sx + 2 + eyeOffsetX, by - 25, 2, 1);
      }

      // 4. Hair, Hats & Signature Accessories
      if (kind === "howl") {
        // Golden-Blonde Feathered Hair + Red-Gold Earrings
        const hairSway = Math.round(Math.sin(t * 3 + wx * 0.05) * 0.8);
        ctx.fillStyle = "#ffd15c";
        ctx.fillRect(sx - 6 + hairSway, by - 33, 12, 5);
        ctx.fillRect(sx - 6 + hairSway, by - 30, 2, 7);
        ctx.fillRect(sx + 4 + hairSway, by - 30, 2, 7);
        if (dir === 1) {
          ctx.fillRect(sx - 5 + hairSway, by - 31, 10, 9);
        }
        ctx.fillStyle = "#fff099";
        ctx.fillRect(sx - 4 + hairSway, by - 33, 8, 2);
        // Ruby-and-emerald drop earrings
        ctx.fillStyle = "#ff4d6d";
        ctx.fillRect(sx - 6, by - 24, 1, 2);
        ctx.fillRect(sx + 5, by - 24, 1, 2);
      } else if (kind === "sophie") {
        // Silver-Starlight Hair, Long Braid with Pink Ribbon & Straw Sunhat
        ctx.fillStyle = "#dce3f0";
        ctx.fillRect(sx - 6, by - 32, 12, 5);
        ctx.fillRect(sx - 6, by - 28, 2, 12);
        ctx.fillStyle = "#ff7aa8";
        ctx.fillRect(sx - 7, by - 17, 3, 3);
        // Straw hat with crimson ribbon
        ctx.fillStyle = "#e8c474";
        ctx.fillRect(sx - 9, by - 33, 18, 2);
        ctx.fillRect(sx - 6, by - 36, 12, 3);
        ctx.fillStyle = "#d94e67";
        ctx.fillRect(sx - 6, by - 34, 12, 1);
      } else if (kind === "markl") {
        // Chestnut Mop Hair
        ctx.fillStyle = "#8c5230";
        ctx.fillRect(sx - 6, by - 33, 12, 6);
        ctx.fillRect(sx - 6, by - 29, 2, 5);
        ctx.fillRect(sx + 4, by - 29, 2, 5);
      } else if (kind === "witch") {
        // Wide-Brimmed Plum Sorceress Hat with Feather
        ctx.fillStyle = "#252033";
        ctx.fillRect(sx - 10, by - 32, 20, 2);
        ctx.fillRect(sx - 6, by - 36, 12, 4);
        ctx.fillStyle = "#ff8fb8";
        ctx.fillRect(sx + 3, by - 38, 5, 3);
      } else if (kind === "lettie") {
        // Golden Braided Hair & White Baker's Bonnet
        ctx.fillStyle = "#f2c96b";
        ctx.fillRect(sx - 6, by - 32, 12, 8);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(sx - 5, by - 35, 10, 3);
      } else {
        // Meadow Sprite Leaf Crown & Sakura Blossoms
        ctx.fillStyle = "#6ec257";
        ctx.fillRect(sx - 6, by - 33, 12, 5);
        ctx.fillStyle = "#ffb8d8";
        ctx.fillRect(sx - 6, by - 34, 3, 3);
        ctx.fillRect(sx + 3, by - 34, 3, 3);
      }

      // 5. Sparkling Water Ripples When Wading or Soaking
      if (submerged) {
        const rip = Math.round(Math.sin(t * 5) * 1.5);
        ctx.fillStyle = "#e0ffff";
        ctx.fillRect(sx - 11 - rip, sy - 2, 22 + rip * 2, 2);
        ctx.fillStyle = "rgba(224, 255, 255, 0.55)";
        ctx.fillRect(sx - 14, sy + 1, 28, 1);
      } else if (wading) {
        const rip = Math.round(Math.sin(t * 6) * 1.5);
        ctx.strokeStyle = "#d9ffff";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(sx, sy + 1, 10 + rip, 3.5, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 6. Subtle Floating Chat Bubble Above Nearby NPCs
      if (kind !== "howl" && Math.hypot(player.x - wx, player.y - wy) < 68) {
        const floatY = Math.round(Math.sin(t * 4) * 2);
        const bx = sx - 8;
        const byBubble = by - 46 + floatY;
        ctx.fillStyle = "#fff8e6";
        ctx.fillRect(bx, byBubble, 16, 10);
        ctx.fillStyle = "#ffd166";
        ctx.fillRect(bx, byBubble, 16, 1);
        ctx.fillRect(bx, byBubble + 9, 16, 1);
        ctx.fillStyle = "#2b3a67";
        ctx.fillRect(bx + 3, byBubble + 4, 2, 2);
        ctx.fillRect(bx + 7, byBubble + 4, 2, 2);
        ctx.fillRect(bx + 11, byBubble + 4, 2, 2);
      }
    }

// ========================================================================
    // PART 13 OF 16: OVERHEAD GARLANDS, DOVES, STEAM, PETALS & LANTERN LIGHTING
    // ========================================================================
    const FESTIVE_GARLANDS = [
      { x1: -1640, y1: 565, x2: -1430, y2: 565, sag: 14 },
      { x1: -1120, y1: 565, x2: -880, y2: 565, sag: 16 },
      { x1: -830, y1: 565, x2: -600, y2: 565, sag: 15 },
      { x1: -565, y1: 565, x2: -340, y2: 565, sag: 14 },
      { x1: -1580, y1: 965, x2: -1350, y2: 965, sag: 14 },
      { x1: -1190, y1: 965, x2: -960, y2: 965, sag: 14 }
    ];

    function drawOverheadCityDetails(t) {
      // 1. Kingsbury Overhead Festival Pennants & Glowing String Bulbs
      const pennantColors = ["#ff7aa8", "#ffd166", "#7cc0ff", "#b99ff5", "#87cf67"];
      for (const fg of FESTIVE_GARLANDS) {
        const sx1 = Math.round(fg.x1 - camera.x);
        const sy1 = Math.round(fg.y1 - camera.y);
        const sx2 = Math.round(fg.x2 - camera.x);
        const sy2 = Math.round(fg.y2 - camera.y);
        if (sx2 < -20 || sx1 > viewW + 20 || sy1 + fg.sag < -20 || sy1 > viewH + 20) continue;

        ctx.strokeStyle = "#3b3347";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sx1, sy1);
        ctx.quadraticCurveTo((sx1 + sx2) / 2, sy1 + fg.sag, sx2, sy2);
        ctx.stroke();

        const steps = 11;
        for (let i = 1; i < steps; i++) {
          const u = i / steps;
          const px = Math.round(sx1 + (sx2 - sx1) * u);
          const py = Math.round(sy1 + 4 * fg.sag * u * (1 - u));
          ctx.fillStyle = pennantColors[i % pennantColors.length];
          ctx.fillRect(px - 2, py, 4, 4);
          if (i % 2 === 0) {
            ctx.fillStyle = "#fff3a1";
            ctx.fillRect(px - 1, py - 2, 2, 2);
          }
        }
      }

      // 2. Fluttering White & Pastel Doves Over Kingsbury Squares
      for (const bird of CITY_BIRDS) {
        const bx = Math.round(bird.x + Math.cos(t * 0.9 + bird.phase) * 34 - camera.x);
        const by = Math.round(bird.y + Math.sin(t * 1.4 + bird.phase) * 14 - camera.y);
        if (bx < -20 || bx > viewW + 20 || by < -20 || by > viewH + 20) continue;

        const wingFlap = Math.round(Math.sin(t * 13 + bird.phase) * 2);
        ctx.fillStyle = bird.color;
        ctx.fillRect(bx - 2, by, 4, 2);
        ctx.fillRect(bx - 4, by - 1 + wingFlap, 3, 2);
        ctx.fillRect(bx + 1, by - 1 - wingFlap, 3, 2);
      }
    }

    function drawParticlesAndLighting(t, mode) {
      // 1. Rising Translucent Thermal Steam Above All Seven Hot Springs
      for (const st of STEAM_PARTICLES) {
        const cycle = (t * 0.35 + st.phase) % 1;
        const wx = st.spring.x + st.ox + Math.sin(t * 1.5 + st.phase) * 7;
        const wy = st.spring.y + st.oy - cycle * 32;
        const sx = Math.round(wx - camera.x);
        const sy = Math.round(wy - camera.y);
        if (sx < -25 || sx > viewW + 25 || sy < -25 || sy > viewH + 25) continue;

        const alpha = Math.sin(cycle * Math.PI) * 0.30;
        const r = st.size + cycle * 4;
        ctx.fillStyle = `rgba(240, 252, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Cozy Curling Chimney Smoke
      for (const ch of CHIMNEY_SMOKE) {
        for (let i = 0; i < 4; i++) {
          const cycle = (t * 0.28 + i * 0.25) % 1;
          const sx = Math.round(ch.x + Math.sin(t * 1.4 + i) * 6 + cycle * 12 - camera.x);
          const sy = Math.round(ch.y - cycle * 38 - camera.y);
          if (sx < -20 || sx > viewW + 20 || sy < -20 || sy > viewH + 20) continue;

          const alpha = (1 - cycle) * 0.26;
          ctx.fillStyle = `rgba(232, 238, 255, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 4 + cycle * 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Drifting Cherry Blossom Petals Across Valley & Meadow
      for (const pt of WIND_PETALS) {
        const sx = Math.round(pt.x - camera.x);
        const sy = Math.round(pt.y - camera.y);
        if (sx < -10 || sx > viewW + 10 || sy < -10 || sy > viewH + 10) continue;
        ctx.fillStyle = pt.color;
        ctx.fillRect(sx, sy, 2, 2);
      }

      // 4. Atmospheric Sky-Time Tint Wash
      ctx.fillStyle = mode.tint;
      ctx.fillRect(0, 0, viewW, viewH);

      // 5. Warm Radial Lantern Halos (Onsen Toro Posts, City Streetlamps & Lake Piers)
      if (mode.lanternAlpha > 0) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        const drawHalo = (wx, wy, radius, innerAlpha) => {
          const sx = Math.round(wx - camera.x);
          const sy = Math.round(wy - camera.y);
          if (sx + radius < 0 || sx - radius > viewW || sy + radius < 0 || sy - radius > viewH) return;
          const a = innerAlpha * mode.lanternAlpha;
          const grad = ctx.createRadialGradient(sx, sy, 2, sx, sy, radius);
          grad.addColorStop(0, `rgba(255, 224, 130, ${a.toFixed(3)})`);
          grad.addColorStop(1, "rgba(255, 190, 90, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fill();
        };

        for (const lp of LANTERNS) {
          drawHalo(lp.x, lp.y - 22, 34, 0.28);
        }
        for (const sl of CITY_STREETLAMPS) {
          drawHalo(sl.x, sl.y - 40, 42, 0.30);
        }
        for (const p of SOUTHERN_PIERS) {
          const sy = getSouthernLakeShoreY(p.x + p.w / 2);
          drawHalo(p.x + p.w - 6, sy + p.len - 24, 34, 0.26);
        }
        ctx.restore();
      }

      // 6. Twinkling Starlight Fireflies in Onsen Valley & Flower Meadow
      if (mode.lanternAlpha > 0.35) {
        for (const ff of FIREFLIES) {
          const fx = Math.round(ff.x + Math.cos(t * ff.speed + ff.phase) * 14 - camera.x);
          const fy = Math.round(ff.y + Math.sin(t * ff.speed * 1.2 + ff.phase) * 10 - camera.y);
          if (fx < -10 || fx > viewW + 10 || fy < -10 || fy > viewH + 10) continue;

          const glow = (0.35 + 0.65 * Math.sin(t * 3.8 + ff.phase)) * mode.lanternAlpha;
          if (glow <= 0.1) continue;
          ctx.globalAlpha = Math.min(1, glow);
          ctx.fillStyle = ff.color;
          ctx.fillRect(fx, fy, 2, 2);
          ctx.fillStyle = "rgba(255, 245, 160, 0.35)";
          ctx.fillRect(fx - 1, fy - 1, 4, 4);
        }
        ctx.globalAlpha = 1;
      }
    }

// ========================================================================
    // PART 14 OF 16: INTERACTIVE MINIMAP, WORLD MAP OVERLAY & QUICK-HOP BAR
    // ========================================================================
    const minimapCtx = minimapCanvas ? minimapCanvas.getContext("2d") : null;
    const worldMapCtx = worldMapCanvas ? worldMapCanvas.getContext("2d") : null;

    let minimapTooltip = document.getElementById("minimap-tooltip");
    if (!minimapTooltip) {
      minimapTooltip = document.createElement("div");
      minimapTooltip.id = "minimap-tooltip";
      minimapTooltip.className = "hidden";
      document.body.appendChild(minimapTooltip);
    }

    function worldToMapCoords(wx, wy, mapW, mapH) {
      const u = (wx - WORLD_MIN_X) / WORLD_W;
      const v = wy / WORLD_H;
      return {
        x: Math.max(0, Math.min(mapW, u * mapW)),
        y: Math.max(0, Math.min(mapH, v * mapH))
      };
    }

    function mapToWorldCoords(mx, my, mapW, mapH) {
      return {
        x: WORLD_MIN_X + (mx / mapW) * WORLD_W,
        y: (my / mapH) * WORLD_H
      };
    }

    function findNearestWaypointToMapPoint(mx, my, mapW, mapH, maxRadiusPx = 24) {
      let best = null;
      let bestDist = maxRadiusPx;
      for (const wp of SAFE_WAYPOINTS) {
        const pt = worldToMapCoords(wp.x, wp.y, mapW, mapH);
        const d = Math.hypot(mx - pt.x, my - pt.y);
        if (d < bestDist) {
          bestDist = d;
          best = wp;
        }
      }
      return best;
    }

    function renderRadarMap(g, w, h, t, hoveredWp) {
      if (!g) return;
      g.imageSmoothingEnabled = false;
      g.clearRect(0, 0, w, h);

      // 1. Sky Horizon Band
      const horizonY = Math.round((GROUND_TOP_Y / WORLD_H) * h);
      g.fillStyle = "#101b3d";
      g.fillRect(0, 0, w, horizonY);

      // 2. Three Realm Ground Zones (Kingsbury City, Onsen Valley, Flower Meadow)
      const cityEnd = Math.round(((CITY_RIGHT - WORLD_MIN_X) / WORLD_W) * w);
      const onsenEnd = Math.round(((ONSEN_RIGHT - WORLD_MIN_X) / WORLD_W) * w);

      g.fillStyle = "#6e685f"; // Kingsbury Cobblestone
      g.fillRect(0, horizonY, cityEnd, h - horizonY);

      g.fillStyle = "#3a732f"; // Onsen Valley Emerald Turf
      g.fillRect(cityEnd, horizonY, onsenEnd - cityEnd, h - horizonY);

      g.fillStyle = "#52993f"; // Flower Meadow Clover
      g.fillRect(onsenEnd, horizonY, w - onsenEnd, h - horizonY);

      // 3. Southern Alpine Lake & Lantern Islet
      const lakeTopY = Math.round((1205 / WORLD_H) * h);
      g.fillStyle = "#1f6c82";
      g.fillRect(0, lakeTopY, w, h - lakeTopY);
      g.fillStyle = "#52d1c6";
      g.fillRect(0, lakeTopY, w, Math.max(2, Math.round(h * 0.025)));

      const isl = worldToMapCoords(LAKE_ISLAND.x, LAKE_ISLAND.y, w, h);
      g.fillStyle = "#48913b";
      g.beginPath();
      g.ellipse(
        isl.x,
        isl.y,
        Math.max(4, (LAKE_ISLAND.rx / WORLD_W) * w),
        Math.max(3, (LAKE_ISLAND.ry / WORLD_H) * h),
        0,
        0,
        Math.PI * 2
      );
      g.fill();

      // 4. Kingsbury Canals
      g.fillStyle = "#2b8799";
      for (const c of CITY_CANALS) {
        const p1 = worldToMapCoords(c.x, c.y, w, h);
        const cw = Math.max(2, (c.w / WORLD_W) * w);
        const ch = Math.max(2, (c.h / WORLD_H) * h);
        g.fillRect(p1.x, p1.y, cw, ch);
      }

      // 5. Seven Hot Springs
      for (const s of SPRINGS) {
        const sp = worldToMapCoords(s.x, s.y, w, h);
        g.fillStyle = s.waterColor;
        g.beginPath();
        g.ellipse(
          sp.x,
          sp.y,
          Math.max(2.5, (s.rx / WORLD_W) * w),
          Math.max(2, (s.ry / WORLD_H) * h),
          0,
          0,
          Math.PI * 2
        );
        g.fill();
      }

      // 6. Major Architecture Footprints
      g.fillStyle = "#d9cfc1";
      for (const b of BUILDINGS) {
        const bp = worldToMapCoords(b.x, b.y, w, h);
        const bw = Math.max(2, (b.w / WORLD_W) * w);
        const bh = Math.max(2, (b.h / WORLD_H) * h);
        g.fillRect(bp.x, bp.y, bw, bh);
      }

      // 7. Fast-Travel Waypoint Beacons
      for (const wp of SAFE_WAYPOINTS) {
        const pt = worldToMapCoords(wp.x, wp.y, w, h);
        const isHovered = hoveredWp && hoveredWp.id === wp.id;
        g.fillStyle = isHovered ? "#ffffff" : wp.color;
        const r = isHovered ? 4 : w > 300 ? 3 : 2;
        g.beginPath();
        g.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        g.fill();
        if (isHovered) {
          g.strokeStyle = "#ffd166";
          g.lineWidth = 1.5;
          g.beginPath();
          g.arc(pt.x, pt.y, r + 3, 0, Math.PI * 2);
          g.stroke();
        }
      }

      // 8. NPC Dots
      g.fillStyle = "#ff9ec4";
      for (const npc of NPCS) {
        const np = worldToMapCoords(npc.x, npc.y, w, h);
        g.fillRect(Math.round(np.x - 1), Math.round(np.y - 1), 2, 2);
      }

      // 9. Camera Viewport Box & Wizard Howl Pulsing Marker
      const camTL = worldToMapCoords(camera.x, camera.y, w, h);
      const camW = (viewW / WORLD_W) * w;
      const camH = (viewH / WORLD_H) * h;
      g.strokeStyle = "rgba(255, 255, 255, 0.45)";
      g.lineWidth = 1;
      g.strokeRect(camTL.x, camTL.y, camW, camH);

      const pp = worldToMapCoords(player.x, player.y, w, h);
      const pulse = 3 + Math.sin(t * 7) * 1.2;
      g.fillStyle = "rgba(255, 209, 102, 0.45)";
      g.beginPath();
      g.arc(pp.x, pp.y, pulse + 2.5, 0, Math.PI * 2);
      g.fill();

      g.fillStyle = "#ffd166";
      g.beginPath();
      g.arc(pp.x, pp.y, 2.8, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "#ffffff";
      g.fillRect(Math.round(pp.x - 1), Math.round(pp.y - 1), 2, 2);
    }

    let hoveredMinimapWp = null;
    let hoveredWorldMapWp = null;

    if (minimapCanvas) {
      minimapCanvas.addEventListener("mousemove", (e) => {
        const rect = minimapCanvas.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width) * minimapCanvas.width;
        const my = ((e.clientY - rect.top) / rect.height) * minimapCanvas.height;
        hoveredMinimapWp = findNearestWaypointToMapPoint(
          mx,
          my,
          minimapCanvas.width,
          minimapCanvas.height,
          16
        );
        if (hoveredMinimapWp) {
          minimapTooltip.textContent = `✨ Click to Visit: ${hoveredMinimapWp.name}`;
        } else {
          const wPos = mapToWorldCoords(mx, my, minimapCanvas.width, minimapCanvas.height);
          const realm =
            wPos.x < CITY_RIGHT
              ? "Kingsbury City"
              : wPos.x < ONSEN_RIGHT
                ? "Onsen Valley"
                : "Flower Meadow";
          minimapTooltip.textContent = `🧭 Click to Travel (${realm})`;
        }
        minimapTooltip.style.left = `${Math.min(window.innerWidth - 220, e.clientX + 10)}px`;
        minimapTooltip.style.top = `${e.clientY + 14}px`;
        minimapTooltip.classList.remove("hidden");
      });

      minimapCanvas.addEventListener("mouseleave", () => {
        hoveredMinimapWp = null;
        minimapTooltip.classList.add("hidden");
      });

      minimapCanvas.addEventListener("click", (e) => {
        const rect = minimapCanvas.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width) * minimapCanvas.width;
        const my = ((e.clientY - rect.top) / rect.height) * minimapCanvas.height;
        const wp = findNearestWaypointToMapPoint(
          mx,
          my,
          minimapCanvas.width,
          minimapCanvas.height,
          18
        );
        if (wp) {
          fastTravelTo(wp);
          return;
        }
        const raw = mapToWorldCoords(mx, my, minimapCanvas.width, minimapCanvas.height);
        let nearest = SAFE_WAYPOINTS[0];
        let bestD = Infinity;
        for (const candidate of SAFE_WAYPOINTS) {
          const d = Math.hypot(raw.x - candidate.x, raw.y - candidate.y);
          if (d < bestD) {
            bestD = d;
            nearest = candidate;
          }
        }
        fastTravelTo(nearest);
      });
    }

    if (worldMapCanvas) {
      worldMapCanvas.addEventListener("mousemove", (e) => {
        const rect = worldMapCanvas.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width) * worldMapCanvas.width;
        const my = ((e.clientY - rect.top) / rect.height) * worldMapCanvas.height;
        hoveredWorldMapWp = findNearestWaypointToMapPoint(
          mx,
          my,
          worldMapCanvas.width,
          worldMapCanvas.height,
          28
        );
        if (mapHoverLabel) {
          mapHoverLabel.textContent = hoveredWorldMapWp
            ? `✨ Click to Teleport: ${hoveredWorldMapWp.name} — ${hoveredWorldMapWp.realm}`
            : "Click any glowing landmark beacon to fast-travel across the three realms";
        }
      });

      worldMapCanvas.addEventListener("click", (e) => {
        const rect = worldMapCanvas.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width) * worldMapCanvas.width;
        const my = ((e.clientY - rect.top) / rect.height) * worldMapCanvas.height;
        const wp = findNearestWaypointToMapPoint(
          mx,
          my,
          worldMapCanvas.width,
          worldMapCanvas.height,
          32
        );
        if (wp) {
          fastTravelTo(wp);
          return;
        }
        const raw = mapToWorldCoords(mx, my, worldMapCanvas.width, worldMapCanvas.height);
        let nearest = SAFE_WAYPOINTS[0];
        let bestD = Infinity;
        for (const candidate of SAFE_WAYPOINTS) {
          const d = Math.hypot(raw.x - candidate.x, raw.y - candidate.y);
          if (d < bestD) {
            bestD = d;
            nearest = candidate;
          }
        }
        fastTravelTo(nearest);
      });
    }

    if (btnMap && mapOverlay) {
      btnMap.addEventListener("click", () => {
        flushKeys();
        mapOverlay.classList.toggle("hidden");
        playChime([440, 554.37], 0.16);
      });
    }
    if (btnCloseMap && mapOverlay) {
      btnCloseMap.addEventListener("click", () => {
        flushKeys();
        mapOverlay.classList.add("hidden");
      });
    }

    // Build Top Instant-Travel Quick-Hop Bar
    let quickbar = document.getElementById("kingsbury-quickbar");
    if (!quickbar) {
      quickbar = document.createElement("div");
      quickbar.id = "kingsbury-quickbar";
      document.body.appendChild(quickbar);
    }
    quickbar.innerHTML = "";

    const QUICK_DESTINATIONS = [
      { label: "🏰 Palace", wpId: "palace" },
      { label: "⛲ Fountain", wpId: "fountain" },
      { label: "🥐 Patisserie", wpId: "patisserie" },
      { label: "♨ Bathhouse", wpId: "bathhouse" },
      { label: "🌸 Sakura Pool", wpId: "sakura_spring" },
      { label: "🏮 Lantern Islet", wpId: "islet" },
      { label: "🌼 Meadow Hill", wpId: "meadow_overlook" },
      { label: "🏡 Cottage", wpId: "cottage" }
    ];

    for (const qd of QUICK_DESTINATIONS) {
      const wp = SAFE_WAYPOINTS.find((w) => w.id === qd.wpId);
      if (!wp) continue;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "kb-hop-btn";
      btn.textContent = qd.label;
      btn.title = `Fast-travel to ${wp.name}`;
      btn.addEventListener("click", () => fastTravelTo(wp));
      quickbar.appendChild(btn);
    }

    const unstuckBtn = document.createElement("button");
    unstuckBtn.type = "button";
    unstuckBtn.className = "kb-unstuck-btn";
    unstuckBtn.textContent = "⚡ Unstuck";
    unstuckBtn.title = "Return Wizard Howl to the nearest safe landmark";
    unstuckBtn.addEventListener("click", unstuckNearest);
    quickbar.appendChild(unstuckBtn);
// ========================================================================
    // PART 15 OF 16: VISUAL-NOVEL CHAT SYSTEM & ANIMATED 16-BIT TITLE SCREEN
    // ========================================================================
    let activeNpc = null;
    let activeLineIndex = 0;
    let fullDialogueText = "";
    let visibleCharCount = 0;
    let typewriterTimer = 0;
    let titleScreenOpen = true;

    // 1. Build Starlight Visual-Novel Chat Area
    let chatArea = document.getElementById("starlight-chat-area");
    if (!chatArea) {
      chatArea = document.createElement("div");
      chatArea.id = "starlight-chat-area";
      chatArea.className = "hidden";
      chatArea.innerHTML = `
        <div class="sc-portrait-wrap">
          <canvas id="sc-portrait-canvas" width="68" height="68"></canvas>
          <span class="sc-role-badge" id="sc-role-badge">Companion</span>
        </div>
        <div class="sc-body">
          <div class="sc-header-row">
            <span id="sc-speaker-name">Speaker</span>
            <button type="button" id="sc-close-btn">✕ Close [Esc]</button>
          </div>
          <div id="sc-dialogue-text"></div>
          <div class="sc-choices-row">
            <button type="button" class="sc-choice-btn" id="sc-choice-next">💬 Chat More</button>
            <button type="button" class="sc-choice-btn" id="sc-choice-lore">🗺️ Ask About Here</button>
            <button type="button" class="sc-choice-btn bye" id="sc-choice-bye">👋 Farewell</button>
            <span class="sc-hint-tag">[Space / Click]</span>
          </div>
        </div>
      `;
      document.body.appendChild(chatArea);
    }

    const portraitCanvas = document.getElementById("sc-portrait-canvas");
    const portraitCtx = portraitCanvas ? portraitCanvas.getContext("2d") : null;
    const roleBadgeEl = document.getElementById("sc-role-badge");
    const speakerNameEl = document.getElementById("sc-speaker-name");
    const dialogueTextEl = document.getElementById("sc-dialogue-text");
    const btnChatClose = document.getElementById("sc-close-btn");
    const btnChoiceNext = document.getElementById("sc-choice-next");
    const btnChoiceLore = document.getElementById("sc-choice-lore");
    const btnChoiceBye = document.getElementById("sc-choice-bye");

    // Proximity Talk Pill & NPC Roster Quick-Chat Dock
    let proximityPill = document.getElementById("sc-proximity-pill");
    if (!proximityPill) {
      proximityPill = document.createElement("button");
      proximityPill.type = "button";
      proximityPill.id = "sc-proximity-pill";
      proximityPill.className = "hidden";
      document.body.appendChild(proximityPill);
    }

    let rosterDock = document.getElementById("sc-roster-dock");
    if (!rosterDock) {
      rosterDock = document.createElement("div");
      rosterDock.id = "sc-roster-dock";
      rosterDock.innerHTML = `
        <div id="sc-roster-popover" class="hidden"></div>
        <button type="button" id="sc-roster-toggle">📜 Companions (8)</button>
      `;
      document.body.appendChild(rosterDock);
    }

    const rosterPopover = document.getElementById("sc-roster-popover");
    const rosterToggleBtn = document.getElementById("sc-roster-toggle");

    if (rosterPopover) {
      rosterPopover.innerHTML = "";
      for (const npc of NPCS) {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "sc-npc-chip";
        chip.textContent = npc.name;
        chip.addEventListener("click", () => {
          rosterPopover.classList.add("hidden");
          openNpcChat(npc);
        });
        rosterPopover.appendChild(chip);
      }
    }

    if (rosterToggleBtn && rosterPopover) {
      rosterToggleBtn.addEventListener("click", () => {
        rosterPopover.classList.toggle("hidden");
        playChime([523.25, 659.25], 0.14);
      });
    }

    function drawNpcPortrait(npcId) {
      if (!portraitCtx) return;
      const g = portraitCtx;
      g.imageSmoothingEnabled = false;
      g.clearRect(0, 0, 68, 68);

      // Starlight portrait backdrop
      const bg = g.createLinearGradient(0, 0, 0, 68);
      bg.addColorStop(0, "#192854");
      bg.addColorStop(1, "#2f4885");
      g.fillStyle = bg;
      g.fillRect(0, 0, 68, 68);

      g.fillStyle = "#ffe885";
      g.fillRect(10, 10, 2, 2);
      g.fillRect(54, 14, 2, 2);
      g.fillRect(16, 26, 1, 1);
      g.fillRect(50, 28, 1, 1);

      if (npcId === "calcifer") {
        g.fillStyle = "#e63e19";
        g.beginPath();
        g.ellipse(34, 42, 20, 22, 0, 0, Math.PI * 2);
        g.fill();
        g.fillRect(30, 12, 8, 12);
        g.fillRect(20, 18, 6, 10);
        g.fillRect(42, 18, 6, 10);
        g.fillStyle = "#ffae2b";
        g.beginPath();
        g.ellipse(34, 43, 14, 16, 0, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = "#fff394";
        g.fillRect(26, 36, 16, 16);
        g.fillStyle = "#ffffff";
        g.fillRect(22, 34, 9, 9);
        g.fillRect(37, 34, 9, 9);
        g.fillStyle = "#1a1412";
        g.fillRect(25, 37, 4, 4);
        g.fillRect(40, 37, 4, 4);
        g.fillStyle = "#b82518";
        g.fillRect(28, 48, 12, 4);
        return;
      }

      if (npcId === "heen") {
        g.fillStyle = "#d9c29c";
        g.fillRect(18, 48, 32, 20);
        g.fillStyle = "#e6d2b0";
        g.fillRect(20, 24, 28, 24);
        g.fillStyle = "#8a6d4b";
        g.fillRect(13, 26, 7, 18);
        g.fillRect(48, 26, 7, 18);
        g.fillStyle = "#241d18";
        g.fillRect(25, 33, 4, 4);
        g.fillRect(39, 33, 4, 4);
        g.fillRect(31, 40, 6, 4);
        return;
      }

      if (npcId === "turnip") {
        g.fillStyle = "#242938";
        g.fillRect(18, 52, 32, 16);
        g.fillStyle = "#e63946";
        g.fillRect(29, 53, 10, 4);
        g.fillStyle = "#f7f3eb";
        g.beginPath();
        g.ellipse(34, 38, 16, 14, 0, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = "#d99ec2";
        g.fillRect(22, 26, 24, 4);
        g.fillStyle = "#2b2623";
        g.fillRect(26, 36, 4, 4);
        g.fillRect(38, 36, 4, 4);
        g.fillRect(28, 44, 12, 2);
        g.fillStyle = "#1a1d26";
        g.fillRect(16, 23, 36, 4);
        g.fillRect(23, 6, 22, 17);
        g.fillStyle = "#4f5873";
        g.fillRect(23, 19, 22, 4);
        return;
      }

      // Humanoid Bust Portraits
      const coatCols = {
        sophie: "#48689c",
        markl: "#416b4a",
        witch: "#6e3556",
        lettie: "#e06d88",
        sprite: "#ff8fb8"
      };
      g.fillStyle = coatCols[npcId] || "#4d5c78";
      g.fillRect(16, 48, 36, 20);
      if (npcId === "sophie" || npcId === "lettie") {
        g.fillStyle = "#ffffff";
        g.fillRect(26, 48, 16, 6);
      }

      // Face
      g.fillStyle = npcId === "witch" ? "#f7d4be" : "#ffdfb8";
      g.fillRect(22, 24, 24, 22);
      g.fillStyle = "#2b221e";
      g.fillRect(26, 33, 4, 4);
      g.fillRect(38, 33, 4, 4);
      g.fillStyle = "#ff8fb8";
      g.fillRect(24, 39, 4, 2);
      g.fillRect(40, 39, 4, 2);

      // Hair & Signature Headwear
      if (npcId === "sophie") {
        g.fillStyle = "#dce3f0";
        g.fillRect(20, 20, 28, 10);
        g.fillRect(19, 28, 4, 26);
        g.fillStyle = "#ff7aa8";
        g.fillRect(17, 50, 6, 5);
        g.fillStyle = "#e8c474";
        g.fillRect(12, 17, 44, 4);
        g.fillRect(20, 10, 28, 7);
        g.fillStyle = "#d94e67";
        g.fillRect(20, 15, 28, 2);
      } else if (npcId === "markl") {
        g.fillStyle = "#8c5230";
        g.fillRect(19, 17, 30, 14);
        g.fillRect(19, 26, 4, 14);
        g.fillRect(45, 26, 4, 14);
      } else if (npcId === "witch") {
        g.fillStyle = "#252033";
        g.fillRect(10, 20, 48, 4);
        g.fillRect(20, 10, 28, 10);
        g.fillStyle = "#ff8fb8";
        g.fillRect(40, 8, 12, 6);
      } else if (npcId === "lettie") {
        g.fillStyle = "#f2c96b";
        g.fillRect(20, 19, 28, 22);
        g.fillStyle = "#ffffff";
        g.fillRect(21, 13, 26, 7);
      } else {
        g.fillStyle = "#6ec257";
        g.fillRect(20, 18, 28, 10);
        g.fillStyle = "#ffb8d8";
        g.fillRect(19, 16, 6, 6);
        g.fillRect(43, 16, 6, 6);
      }
    }

    function setChatDialogue(text) {
      fullDialogueText = text;
      visibleCharCount = 0;
      typewriterTimer = 0;
      if (dialogueTextEl) dialogueTextEl.textContent = "";
    }

    function openNpcChat(npc) {
      if (!npc) return;
      flushKeys();
      activeNpc = npc;
      activeLineIndex = 0;
      if (speakerNameEl) speakerNameEl.textContent = npc.name;
      if (roleBadgeEl) roleBadgeEl.textContent = npc.role || "Companion";
      drawNpcPortrait(npc.id);
      setChatDialogue(npc.lines[0]);
      chatArea.classList.remove("hidden");
      proximityPill.classList.add("hidden");
      player.serenity = Math.min(100, player.serenity + 4);
      playChime([523.25, 659.25, 783.99], 0.18);
    }

    function closeNpcChat() {
      activeNpc = null;
      chatArea.classList.add("hidden");
      flushKeys();
    }

    function advanceNpcChat() {
      if (!activeNpc) return;
      if (visibleCharCount < fullDialogueText.length) {
        visibleCharCount = fullDialogueText.length;
        if (dialogueTextEl) dialogueTextEl.textContent = fullDialogueText;
        return;
      }
      activeLineIndex = (activeLineIndex + 1) % activeNpc.lines.length;
      setChatDialogue(activeNpc.lines[activeLineIndex]);
      playChime([587.33, 739.99], 0.14);
    }

    if (dialogueTextEl) dialogueTextEl.addEventListener("click", advanceNpcChat);
    if (btnChoiceNext) btnChoiceNext.addEventListener("click", advanceNpcChat);
    if (btnChoiceLore) {
      btnChoiceLore.addEventListener("click", () => {
        if (!activeNpc) return;
        setChatDialogue(activeNpc.placeLore || activeNpc.lines[0]);
        playChime([493.88, 659.25], 0.15);
      });
    }
    if (btnChoiceBye) btnChoiceBye.addEventListener("click", closeNpcChat);
    if (btnChatClose) btnChatClose.addEventListener("click", closeNpcChat);

    function findNearestNpc(maxDist = 66) {
      let best = null;
      let bestD = maxDist;
      for (const npc of NPCS) {
        const d = Math.hypot(player.x - npc.x, player.y - npc.y);
        if (d < bestD) {
          bestD = d;
          best = npc;
        }
      }
      return best;
    }

    proximityPill.addEventListener("click", () => {
      const near = findNearestNpc(72);
      if (near) openNpcChat(near);
    });

    // 2. Animated 16-Bit Starlight Title Screen & Settings/Exit Modals
    let titleOverlay = document.getElementById("starlight-title-overlay");
    if (!titleOverlay) {
      titleOverlay = document.createElement("div");
      titleOverlay.id = "starlight-title-overlay";
      titleOverlay.innerHTML = `
        <canvas id="title-pixel-bg" width="320" height="180"></canvas>
        <div class="title-vignette"></div>
        <div class="title-header-card">
          <div class="title-eyebrow">✦ Studio Starlight Pixel Edition ✦</div>
          <h1 class="title-main-heading">HOWL'S STARLIGHT ONSEN</h1>
          <div class="title-sub-caption">Kingsbury City • Sakura Onsen Valley • Secret Flower Meadow</div>
        </div>
        <div class="title-menu-stack">
          <button type="button" class="title-menu-btn start-primary" id="title-btn-start">▶ START JOURNEY</button>
          <button type="button" class="title-menu-btn" id="title-btn-settings">⚙ SETTINGS</button>
          <button type="button" class="title-menu-btn exit-btn" id="title-btn-exit">✕ EXIT</button>
        </div>
      `;
      document.body.appendChild(titleOverlay);
    }

    let settingsModal = document.getElementById("title-settings-modal");
    if (!settingsModal) {
      settingsModal = document.createElement("div");
      settingsModal.id = "title-settings-modal";
      settingsModal.className = "hidden";
      settingsModal.innerHTML = `
        <div class="modal-pixel-card">
          <h2 class="modal-pixel-title">⚙ STARLIGHT SETTINGS</h2>
          <div class="setting-row">
            <span>Sky Atmosphere</span>
            <button type="button" class="setting-toggle-btn" id="modal-toggle-time">Starlight Night</button>
          </div>
          <div class="setting-row">
            <span>Chime & Water Audio</span>
            <button type="button" class="setting-toggle-btn" id="modal-toggle-sound">Sound: ON</button>
          </div>
          <div style="margin-top: 14px; text-align: center;">
            <button type="button" class="title-menu-btn" id="modal-close-settings" style="padding: 7px 20px; font-size: 13px;">✓ Done</button>
          </div>
        </div>
      `;
      document.body.appendChild(settingsModal);
    }

    let exitModal = document.getElementById("title-exit-modal");
    if (!exitModal) {
      exitModal = document.createElement("div");
      exitModal.id = "title-exit-modal";
      exitModal.className = "hidden";
      exitModal.innerHTML = `
        <div class="modal-pixel-card" style="text-align: center;">
          <h2 class="modal-pixel-title">🌙 REST BY THE HEARTH?</h2>
          <p style="font-size: 13px; line-height: 1.5; color: #dbe7ff; margin: 0 0 14px;">
            Calcifer is keeping the springs warm whenever you're ready to return to Starlight Onsen Valley!
          </p>
          <button type="button" class="title-menu-btn start-primary" id="modal-close-exit" style="padding: 8px 20px; font-size: 13px;">
            ✨ Stay in Starlight Onsen
          </button>
        </div>
      `;
      document.body.appendChild(exitModal);
    }

    let reopenTitleBtn = document.getElementById("reopen-title-btn");
    if (!reopenTitleBtn) {
      reopenTitleBtn = document.createElement("button");
      reopenTitleBtn.type = "button";
      reopenTitleBtn.id = "reopen-title-btn";
      reopenTitleBtn.textContent = "✦ Title Screen";
      document.body.appendChild(reopenTitleBtn);
    }

    const titleBgCanvas = document.getElementById("title-pixel-bg");
    const titleBgCtx = titleBgCanvas ? titleBgCanvas.getContext("2d") : null;

    function renderTitleBackdrop(t) {
      if (!titleBgCtx || !titleScreenOpen) return;
      const g = titleBgCtx;
      const w = 320;
      const h = 180;
      g.imageSmoothingEnabled = false;

      // Starry night sky gradient
      const sky = g.createLinearGradient(0, 0, 0, 115);
      sky.addColorStop(0, "#060b1f");
      sky.addColorStop(0.6, "#142754");
      sky.addColorStop(1, "#2a4985");
      g.fillStyle = sky;
      g.fillRect(0, 0, w, h);

      // Aurora ribbon & twinkling stars
      for (let x = 0; x < w; x += 4) {
        const wy = 24 + Math.sin(x * 0.04 + t * 1.4) * 5;
        g.fillStyle = "rgba(94, 242, 198, 0.24)";
        g.fillRect(x, Math.round(wy), 4, 10);
      }
      g.fillStyle = "#fff9d6";
      for (let i = 0; i < 42; i++) {
        const sx = (i * 73 + 19) % w;
        const sy = (i * 37 + 11) % 88;
        if (Math.sin(t * 3 + i) > -0.2) g.fillRect(sx, sy, i % 6 === 0 ? 2 : 1, 1);
      }

      // Crescent moon & snow-capped peaks
      g.beginPath();
      g.arc(255, 32, 12, 0, Math.PI * 2);
      g.fill();

      g.fillStyle = "#1c2d57";
      g.beginPath();
      g.moveTo(0, 112);
      g.lineTo(65, 58);
      g.lineTo(145, 112);
      g.lineTo(225, 52);
      g.lineTo(320, 112);
      g.closePath();
      g.fill();

      // Valley turf & steaming emerald hot spring foreground
      g.fillStyle = "#2d5e26";
      g.fillRect(0, 108, w, 72);

      // Silhouette of Grand Bathhouse & Sakura Cherry Trees
      g.fillStyle = "#1a2940";
      g.fillRect(108, 76, 104, 34);
      g.fillRect(98, 70, 124, 8);
      g.fillRect(126, 58, 68, 12);
      g.fillStyle = "#ffe58f";
      for (let wx = 118; wx <= 194; wx += 18) {
        g.fillRect(wx, 85, 8, 8);
      }

      // Thin-trunked blooming cherry trees framing the title scene
      for (const tx of [48, 272]) {
        g.fillStyle = "#3b231d";
        g.fillRect(tx - 2, 74, 4, 38);
        g.fillStyle = "#eb7aa6";
        g.beginPath();
        g.arc(tx - 12, 70, 14, 0, Math.PI * 2);
        g.arc(tx + 12, 70, 14, 0, Math.PI * 2);
        g.arc(tx, 58, 17, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = "#ffc7df";
        g.beginPath();
        g.arc(tx - 3, 55, 11, 0, Math.PI * 2);
        g.fill();
      }

      // Glowing hot spring pool & drifting sakura petals
      g.fillStyle = "#4fd1b5";
      g.beginPath();
      g.ellipse(160, 144, 74, 22, 0, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "rgba(255, 255, 255, 0.25)";
      for (let s = 0; s < 6; s++) {
        const sy = 136 - ((t * 10 + s * 6) % 24);
        g.beginPath();
        g.arc(125 + s * 14, sy, 5, 0, Math.PI * 2);
        g.fill();
      }
      g.fillStyle = "#ffb8d8";
      for (let p = 0; p < 18; p++) {
        const px = Math.round((p * 41 + t * 18) % w);
        const py = Math.round((p * 29 + t * 9) % h);
        g.fillRect(px, py, 2, 2);
      }
    }

    function enterGameFromTitle() {
      titleScreenOpen = false;
      flushKeys();
      titleOverlay.classList.add("fade-out");
      setTimeout(() => {
        if (!titleScreenOpen) titleOverlay.classList.add("hidden");
      }, 460);
      quickbar.style.display = "flex";
      rosterDock.style.display = "block";
      reopenTitleBtn.style.display = "block";
      playChime([523.25, 659.25, 783.99, 1046.5], 0.28);
    }

    function openTitleScreen() {
      titleScreenOpen = true;
      flushKeys();
      closeNpcChat();
      titleOverlay.classList.remove("hidden", "fade-out");
      quickbar.style.display = "none";
      rosterDock.style.display = "none";
      reopenTitleBtn.style.display = "none";
    }

    const btnTitleStart = document.getElementById("title-btn-start");
    const btnTitleSettings = document.getElementById("title-btn-settings");
    const btnTitleExit = document.getElementById("title-btn-exit");
    const btnModalTime = document.getElementById("modal-toggle-time");
    const btnModalSound = document.getElementById("modal-toggle-sound");
    const btnModalCloseSettings = document.getElementById("modal-close-settings");
    const btnModalCloseExit = document.getElementById("modal-close-exit");

    if (btnTitleStart) btnTitleStart.addEventListener("click", enterGameFromTitle);
    if (btnTitleSettings) {
      btnTitleSettings.addEventListener("click", () => {
        settingsModal.classList.remove("hidden");
        playChime([440, 554.37], 0.14);
      });
    }
    if (btnTitleExit) {
      btnTitleExit.addEventListener("click", () => {
        exitModal.classList.remove("hidden");
        playChime([392, 329.63], 0.16);
      });
    }
    if (btnModalCloseSettings) {
      btnModalCloseSettings.addEventListener("click", () => settingsModal.classList.add("hidden"));
    }
    if (btnModalCloseExit) {
      btnModalCloseExit.addEventListener("click", () => exitModal.classList.add("hidden"));
    }
    if (reopenTitleBtn) reopenTitleBtn.addEventListener("click", openTitleScreen);

    function cycleSkyTime() {
      timeIndex = (timeIndex + 1) % TIME_MODES.length;
      const modeName = TIME_MODES[timeIndex].name;
      if (btnTime) btnTime.textContent = `🌙 ${modeName}`;
      if (btnModalTime) btnModalTime.textContent = modeName;
      playChime([523.25, 659.25], 0.15);
    }

    function toggleAudioState() {
      soundEnabled = !soundEnabled;
      if (btnSound) btnSound.textContent = soundEnabled ? "🔊 Sound: ON" : "🔇 Sound: OFF";
      if (btnModalSound) btnModalSound.textContent = soundEnabled ? "Sound: ON" : "Sound: OFF";
      if (soundEnabled) playChime([659.25, 783.99], 0.15);
    }

    if (btnTime) btnTime.addEventListener("click", cycleSkyTime);
    if (btnModalTime) btnModalTime.addEventListener("click", cycleSkyTime);
    if (btnSound) btnSound.addEventListener("click", toggleAudioState);
    if (btnModalSound) btnModalSound.addEventListener("click", toggleAudioState);

    // ========================================================================
    // PART 16 OF 16: CONTROLS, BOAT & WORLD PHYSICS, RENDER LOOP & BOOTSTRAP
    // ========================================================================
    function handleInteractAction() {
      if (titleScreenOpen) {
        if (settingsModal && !settingsModal.classList.contains("hidden")) return;
        if (exitModal && !exitModal.classList.contains("hidden")) return;
        enterGameFromTitle();
        return;
      }

      if (activeNpc) {
        advanceNpcChat();
        return;
      }

      if (mapOverlay && !mapOverlay.classList.contains("hidden")) {
        mapOverlay.classList.add("hidden");
        return;
      }

      // 1. Disembark from Rowboat onto Nearby Shore or Pier
      if (player.inBoat) {
        const boat = player.inBoat;
        const offsets = [
          [0, -28], [0, -42], [-28, 0], [28, 0],
          [-24, -24], [24, -24], [0, 28], [-28, 24], [28, 24]
        ];
        for (const [ox, oy] of offsets) {
          const tx = boat.x + ox;
          const ty = boat.y + oy;
          if (canWalkAt(tx, ty)) {
            boat.occupied = false;
            player.inBoat = null;
            player.x = tx;
            player.y = ty;
            playSplash(false);
            spawnSparkle(player.x, player.y - 6, "#9cd1ff");
            return;
          }
        }
        if (bannerEl) {
          bannerEl.textContent = "🚣 Row closer to a pier, shore, or Lantern Islet to step ashore!";
        }
        return;
      }

      // 2. Board a Nearby Rowboat
      for (const boat of BOATS) {
        if (Math.hypot(player.x - boat.x, player.y - boat.y) < 58) {
          boat.occupied = true;
          player.inBoat = boat;
          player.inSpring = null;
          player.inShallowerWater = false;
          player.x = boat.x;
          player.y = boat.y;
          playSplash(true);
          spawnSparkle(boat.x, boat.y - 6, "#ffd166");
          return;
        }
      }

      // 3. Talk to Nearest Companion
      const nearNpc = findNearestNpc(68);
      if (nearNpc) {
        openNpcChat(nearNpc);
      }
    }

    window.addEventListener("keydown", (e) => {
      if (!e.isTrusted) return;

      if (e.code === "Escape") {
        if (settingsModal && !settingsModal.classList.contains("hidden")) {
          settingsModal.classList.add("hidden");
          return;
        }
        if (exitModal && !exitModal.classList.contains("hidden")) {
          exitModal.classList.add("hidden");
          return;
        }
        if (activeNpc) {
          closeNpcChat();
          return;
        }
        if (mapOverlay && !mapOverlay.classList.contains("hidden")) {
          mapOverlay.classList.add("hidden");
          return;
        }
        if (rosterPopover && !rosterPopover.classList.contains("hidden")) {
          rosterPopover.classList.add("hidden");
          return;
        }
      }

      if (e.code === "Space" || e.code === "Enter" || e.code === "KeyE") {
        if (MOVE_CODES.has(e.code)) return;
        e.preventDefault();
        handleInteractAction();
        return;
      }

      if (e.code === "KeyM" && !titleScreenOpen && !activeNpc && mapOverlay) {
        flushKeys();
        mapOverlay.classList.toggle("hidden");
        playChime([440, 554.37], 0.14);
        return;
      }

      if (e.code === "KeyT" && !titleScreenOpen && !activeNpc) {
        cycleSkyTime();
        return;
      }

      if (MOVE_CODES.has(e.code)) {
        if (titleScreenOpen || activeNpc || (mapOverlay && !mapOverlay.classList.contains("hidden"))) {
          return;
        }
        e.preventDefault();
        keys[e.code] = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (MOVE_CODES.has(e.code)) {
        keys[e.code] = false;
      }
    });

    function updateWorld(dt, t) {
      // 1. Update Drifting Sakura Petals & Koi Fish
      for (const pt of WIND_PETALS) {
        pt.x += (pt.vx + Math.sin(t * 1.6 + pt.phase) * 5) * dt;
        pt.y += (pt.vy + Math.cos(t * 2.1 + pt.phase) * 2.5) * dt;
        if (pt.x > WORLD_MAX_X) pt.x = WORLD_MIN_X;
        if (pt.y > WORLD_H - 40) pt.y = GROUND_TOP_Y + 10;
      }

      for (const koi of LAKE_KOI) {
        koi.x += koi.dir * koi.speed * dt;
        if (koi.x > WORLD_MAX_X - 80) koi.dir = -1;
        if (koi.x < WORLD_MIN_X + 80) koi.dir = 1;
      }

      // 2. Update Sparkles
      for (let i = player.sparkles.length - 1; i >= 0; i--) {
        const sp = player.sparkles[i];
        sp.y += sp.vy * dt;
        sp.life -= dt;
        if (sp.life <= 0) player.sparkles.splice(i, 1);
      }

      // 3. Gentle NPC Idle Patrol
      for (const npc of NPCS) {
        if (activeNpc && activeNpc.id === npc.id) continue;
        const targetX = npc.homeX + Math.cos(t * 0.65 + npc.phase) * npc.patrolR;
        const targetY = npc.homeY + Math.sin(t * 0.5 + npc.phase) * (npc.patrolR * 0.55);
        const dx = targetX - npc.x;
        const dy = targetY - npc.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 1.5 && canWalkAt(npc.x + (dx / dist) * npc.speed * dt, npc.y + (dy / dist) * npc.speed * dt)) {
          npc.x += (dx / dist) * npc.speed * dt;
          npc.y += (dy / dist) * npc.speed * dt;
          npc.frame += dt * 1.4;
          if (Math.abs(dx) > Math.abs(dy)) npc.dir = dx < 0 ? 2 : 3;
          else npc.dir = dy < 0 ? 1 : 0;
        }
      }

      // 4. Typewriter Text Progression
      if (activeNpc && visibleCharCount < fullDialogueText.length) {
        typewriterTimer += dt;
        while (typewriterTimer >= 0.022 && visibleCharCount < fullDialogueText.length) {
          typewriterTimer -= 0.022;
          visibleCharCount++;
        }
        if (dialogueTextEl) {
          dialogueTextEl.textContent = fullDialogueText.slice(0, visibleCharCount);
        }
      }

      // 5. Player Movement (On Foot, Wading, Soaking, or Rowing)
      let moveX = 0;
      let moveY = 0;
      if (!titleScreenOpen && !activeNpc && (!mapOverlay || mapOverlay.classList.contains("hidden"))) {
        if (keys.ArrowLeft || keys.KeyA) moveX -= 1;
        if (keys.ArrowRight || keys.KeyD) moveX += 1;
        if (keys.ArrowUp || keys.KeyW) moveY -= 1;
        if (keys.ArrowDown || keys.KeyS) moveY += 1;
      }

      player.moving = moveX !== 0 || moveY !== 0;
      if (player.moving) {
        const len = Math.hypot(moveX, moveY);
        moveX /= len;
        moveY /= len;

        if (Math.abs(moveX) > Math.abs(moveY)) player.dir = moveX < 0 ? 2 : 3;
        else player.dir = moveY < 0 ? 1 : 0;

        if (player.inBoat) {
          const boat = player.inBoat;
          const boatSpeed = 165;
          const nx = boat.x + moveX * boatSpeed * dt;
          const ny = boat.y + moveY * boatSpeed * dt;
          const inLakeWater = (wx, wy) =>
            wx > WORLD_MIN_X + 35 &&
            wx < WORLD_MAX_X - 35 &&
            wy > getSouthernLakeShoreY(wx) + 12 &&
            wy < WORLD_H - 28 &&
            !isOnIslandOrBridge(wx, wy);

          if (inLakeWater(nx, boat.y)) boat.x = nx;
          if (inLakeWater(boat.x, ny)) boat.y = ny;
          player.x = boat.x;
          player.y = boat.y;
          player.walkFrame += dt * 1.8;
        } else {
          const speedMult = player.inSpring ? 0.68 : player.inShallowerWater ? 0.8 : 1.0;
          const step = player.speed * speedMult * dt;
          const nx = player.x + moveX * step;
          const ny = player.y + moveY * step;

          if (canWalkAt(nx, player.y)) player.x = nx;
          if (canWalkAt(player.x, ny)) player.y = ny;
          player.walkFrame += dt * 1.9;
        }
      }

      // 6. Hot Spring & Shoreline Wading State Detection
      if (!player.inBoat) {
        const prevSpring = player.inSpring;
        const currSpring = getCurrentSpring(player.x, player.y);
        if (currSpring && !prevSpring) {
          playSplash(true);
          for (let i = 0; i < 8; i++) spawnSparkle(player.x, player.y - 6, "#b8fff0");
        } else if (!currSpring && prevSpring) {
          playSplash(false);
        }
        player.inSpring = currSpring;

        const shoreY = getSouthernLakeShoreY(player.x);
        player.inShallowerWater =
          !currSpring &&
          player.y > shoreY &&
          !isOnSouthernPier(player.x, player.y) &&
          !isOnIslandOrBridge(player.x, player.y);
      }

      // 7. Smooth Warmth & Serenity Meters + Location Banner
      if (player.inSpring) {
        player.warmth = Math.min(100, player.warmth + 9 * dt);
        player.serenity = Math.min(100, player.serenity + 7 * dt);
      } else {
        player.warmth = Math.max(42, player.warmth - 0.8 * dt);
        player.serenity = Math.min(100, player.serenity + 1.2 * dt);
      }
      if (warmthFill) warmthFill.style.width = `${Math.round(player.warmth)}%`;
      if (serenityFill) serenityFill.style.width = `${Math.round(player.serenity)}%`;

      // 8. Proximity Prompt & Realm Banner Text
      const nearNpc = !titleScreenOpen && !activeNpc ? findNearestNpc(66) : null;
      const nearBoat =
        !titleScreenOpen && !activeNpc && !player.inBoat
          ? BOATS.find((b) => Math.hypot(player.x - b.x, player.y - b.y) < 58)
          : null;

      if (nearNpc && proximityPill) {
        proximityPill.textContent = `💬 Talk to ${nearNpc.name} [Space / Click]`;
        proximityPill.classList.remove("hidden");
      } else if (nearBoat && proximityPill) {
        proximityPill.textContent = "🚣 Board Wooden Rowboat [Space]";
        proximityPill.classList.remove("hidden");
      } else if (player.inBoat && proximityPill) {
        proximityPill.textContent = "⚓ Step Ashore Near Pier or Bank [Space]";
        proximityPill.classList.remove("hidden");
      } else if (proximityPill) {
        proximityPill.classList.add("hidden");
      }

      if (bannerEl && !titleScreenOpen) {
        if (player.inSpring) {
          bannerEl.textContent = `Soaking in ${player.inSpring.name} — Warmth & Serenity Rising`;
        } else if (player.inBoat) {
          bannerEl.textContent = "🚣 Rowing Across the Starlight Southern Alpine Lake";
        } else if (isOnIslandOrBridge(player.x, player.y)) {
          bannerEl.textContent = "🏮 Lantern Islet — Cherry Blossom Shrine & Koi Overlook";
        } else if (player.x < CITY_RIGHT) {
          bannerEl.textContent = "🏰 Kingsbury City — Royal Palace, Canals & Patisserie";
        } else if (player.x < ONSEN_RIGHT) {
          bannerEl.textContent = "🌸 Starlight Onsen Valley — Seven Hot Springs & Sakura Groves";
        } else {
          bannerEl.textContent = "🌼 Howl's Secret Flower Meadow — Terraced Hills & Cottage";
        }
      }

      // 9. Smooth Camera Follow Clamped to World Bounds
      const targetCamX = Math.max(WORLD_MIN_X, Math.min(WORLD_MAX_X - viewW, player.x - viewW / 2));
      const targetCamY = Math.max(0, Math.min(WORLD_H - viewH, player.y - viewH / 2));
      camera.x += (targetCamX - camera.x) * Math.min(1, dt * 10);
      camera.y += (targetCamY - camera.y) * Math.min(1, dt * 10);
    }

    let lastTimestamp = performance.now();
    function gameLoop(now) {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTimestamp) / 1000));
      lastTimestamp = now;
      const t = now * 0.001;

      updateWorld(dt, t);

      const mode = TIME_MODES[timeIndex];
      ctx.clearRect(0, 0, viewW, viewH);

      drawSkyAndMountains(t, mode);
      drawGroundAndHills();
      drawTrailsAndPlaza();
      drawCanalsBridgesAndLake(t);
      drawHotSpringsAndDecks(t);
      drawAllBuildings(t);
      renderYSortedWorld(t);
      drawOverheadCityDetails(t);
      drawParticlesAndLighting(t, mode);

      if (minimapCtx && minimapCanvas) {
        renderRadarMap(minimapCtx, minimapCanvas.width, minimapCanvas.height, t, hoveredMinimapWp);
      }
      if (worldMapCtx && worldMapCanvas && mapOverlay && !mapOverlay.classList.contains("hidden")) {
        renderRadarMap(worldMapCtx, worldMapCanvas.width, worldMapCanvas.height, t, hoveredWorldMapWp);
      }
      if (titleScreenOpen) {
        renderTitleBackdrop(t);
      }

      requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startUnifiedOnsenGame);
  } else {
    startUnifiedOnsenGame();
  }
})();

// ============================================================================
// EXTRA SECTION (PART 17): MOVEMENT, FOCUS & OVERLAY BUG-FIX PATCH
// ============================================================================
(function applyStarlightBugFixes() {
  // 1. Guarantee .hidden and overlay pointer-events work even if style.css is older
  if (!document.getElementById("starlight-bugfix-css")) {
    const fixStyle = document.createElement("style");
    fixStyle.id = "starlight-bugfix-css";
    fixStyle.textContent = `
      .hidden {
        display: none !important;
        pointer-events: none !important;
      }
      #starlight-title-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #070d24;
        transition: opacity 0.4s ease;
      }
      #starlight-title-overlay.fade-out {
        opacity: 0;
        pointer-events: none !important;
      }
      #title-pixel-bg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        image-rendering: pixelated;
        z-index: 0;
      }
      .title-vignette {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(6, 11, 31, 0.18), rgba(4, 8, 22, 0.72));
        z-index: 1;
        pointer-events: none;
      }
      .title-header-card, .title-menu-stack {
        position: relative;
        z-index: 2;
      }
      .title-header-card {
        text-align: center;
        padding: 18px 28px;
        margin-bottom: 18px;
        background: rgba(12, 20, 46, 0.84);
        border: 2px solid #ffd166;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.55);
        color: #fff9e6;
      }
      .title-eyebrow {
        font-size: 11px;
        letter-spacing: 2px;
        color: #9cd1ff;
        text-transform: uppercase;
        margin-bottom: 6px;
      }
      .title-main-heading {
        margin: 0 0 6px;
        font-size: 26px;
        letter-spacing: 2px;
        color: #ffd166;
        text-shadow: 0 2px 0 #1a1f36;
      }
      .title-sub-caption {
        font-size: 12px;
        color: #dbe7ff;
      }
      .title-menu-stack {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 220px;
      }
      .title-menu-btn {
        cursor: pointer;
        padding: 10px 22px;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 1px;
        color: #fff8e6;
        background: rgba(24, 38, 78, 0.92);
        border: 2px solid #7cc0ff;
        border-radius: 8px;
        transition: transform 0.12s ease, background 0.12s ease;
      }
      .title-menu-btn:hover {
        transform: translateY(-2px);
        background: rgba(42, 66, 128, 0.96);
      }
      .title-menu-btn.start-primary {
        background: linear-gradient(180deg, #ffd166, #f4a261);
        color: #1a1f36;
        border-color: #fff3b0;
      }
      #title-settings-modal, #title-exit-modal {
        position: fixed;
        inset: 0;
        z-index: 10050;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(5, 9, 24, 0.72);
      }
      .modal-pixel-card {
        background: #121c3d;
        border: 2px solid #ffd166;
        border-radius: 10px;
        padding: 18px 24px;
        min-width: 290px;
        color: #fff8e6;
      }
      .modal-pixel-title {
        margin: 0 0 12px;
        font-size: 16px;
        color: #ffd166;
        text-align: center;
      }
      .setting-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        margin: 8px 0;
        font-size: 13px;
      }
      .setting-toggle-btn {
        cursor: pointer;
        padding: 5px 12px;
        background: #233870;
        color: #fff8e6;
        border: 1px solid #9cd1ff;
        border-radius: 6px;
      }
      #kingsbury-quickbar {
        position: fixed;
        top: 44px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 600;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5px;
        max-width: 94vw;
      }
      .kb-hop-btn, .kb-unstuck-btn {
        cursor: pointer;
        padding: 4px 9px;
        font-size: 11px;
        font-weight: 600;
        color: #fff8e6;
        background: rgba(15, 24, 52, 0.86);
        border: 1px solid rgba(255, 209, 102, 0.55);
        border-radius: 6px;
      }
      .kb-unstuck-btn {
        border-color: #ff8fb8;
        color: #ffd6e7;
      }
      #starlight-chat-area {
        position: fixed;
        bottom: 18px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 800;
        display: flex;
        gap: 14px;
        width: min(680px, 92vw);
        padding: 12px 16px;
        background: rgba(12, 20, 46, 0.94);
        border: 2px solid #ffd166;
        border-radius: 12px;
        color: #fff9e6;
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.6);
      }
      .sc-portrait-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
      }
      #sc-portrait-canvas {
        border: 2px solid #9cd1ff;
        border-radius: 8px;
        image-rendering: pixelated;
      }
      .sc-role-badge {
        font-size: 10px;
        padding: 2px 6px;
        background: rgba(124, 192, 255, 0.2);
        border-radius: 4px;
        color: #bfe6ff;
      }
      .sc-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .sc-header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
      }
      #sc-speaker-name {
        font-weight: 700;
        font-size: 15px;
        color: #ffd166;
      }
      #sc-close-btn, .sc-choice-btn, #sc-proximity-pill, #sc-roster-toggle, .sc-npc-chip, #reopen-title-btn {
        cursor: pointer;
        border-radius: 6px;
        border: 1px solid rgba(255, 209, 102, 0.65);
        background: rgba(24, 38, 78, 0.92);
        color: #fff8e6;
        font-size: 12px;
        padding: 4px 10px;
      }
      #sc-dialogue-text {
        font-size: 13px;
        line-height: 1.45;
        min-height: 38px;
        margin-bottom: 8px;
        cursor: pointer;
      }
      .sc-choices-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
      }
      .sc-hint-tag {
        margin-left: auto;
        font-size: 11px;
        color: #9cd1ff;
      }
      #sc-proximity-pill {
        position: fixed;
        bottom: 84px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 700;
        padding: 7px 14px;
        font-weight: 700;
        border-color: #ffd166;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
      }
      #sc-roster-dock {
        position: fixed;
        bottom: 14px;
        left: 14px;
        z-index: 650;
      }
      #sc-roster-popover {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        max-width: 260px;
        margin-bottom: 6px;
        padding: 8px;
        background: rgba(12, 20, 46, 0.94);
        border: 1px solid #ffd166;
        border-radius: 8px;
      }
      #reopen-title-btn {
        position: fixed;
        bottom: 14px;
        right: 14px;
        z-index: 650;
      }
    `;
    document.head.appendChild(fixStyle);
  }

  // 2. Force-hide overlays that may lack "hidden" in index.html & block movement
  function sanitizeBlockingOverlays() {
    const idsToHide = [
      "map-overlay",
      "world-map-overlay",
      "starlight-chat-area",
      "title-settings-modal",
      "title-exit-modal",
      "start-screen",
      "intro-overlay"
    ];
    for (const id of idsToHide) {
      const el = document.getElementById(id);
      if (el && !el.classList.contains("hidden")) {
        el.classList.add("hidden");
      }
    }
  }

  // 3. Ensure canvas & window always capture keyboard input after clicking buttons
  function focusGameSurface() {
    if (document.activeElement && typeof document.activeElement.blur === "function") {
      document.activeElement.blur();
    }
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.setAttribute("tabindex", "0");
      canvas.focus({ preventScroll: true });
    }
    window.focus();
  }

  function initPatch() {
    sanitizeBlockingOverlays();

    const startBtn = document.getElementById("title-btn-start");
    const titleOverlay = document.getElementById("starlight-title-overlay");

    if (startBtn && titleOverlay) {
      startBtn.addEventListener("click", () => {
        sanitizeBlockingOverlays();
        titleOverlay.classList.add("hidden");
        setTimeout(focusGameSurface, 30);
      });
    }

    // Re-focus window whenever user clicks on the game canvas
    document.addEventListener("pointerdown", (e) => {
      if (e.target && e.target.tagName === "CANVAS") {
        focusGameSurface();
      }
    });

    // Prevent arrow keys / Space from scrolling the page or triggering focused buttons
    document.addEventListener(
      "keydown",
      (e) => {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
          e.preventDefault();
        }
      },
      { capture: true }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPatch);
  } else {
    initPatch();
  }

  // 4. Surface any syntax/runtime error directly in the top banner (no Copilot needed)
  window.addEventListener("error", (ev) => {
    const banner = document.getElementById("location-banner");
    if (banner && ev && ev.message) {
      banner.textContent = `⚠️ JS Line ${ev.lineno || "?"}: ${ev.message}`;
    }
  });
})();