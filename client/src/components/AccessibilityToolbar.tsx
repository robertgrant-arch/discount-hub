// client/src/components/AccessibilityToolbar.tsx
import { useState, useEffect, useCallback } from "react";
import { Type, Eye, Layers, ChevronUp, ChevronDown, Minus, Plus } from "lucide-react";

type FontScale = "sm" | "md" | "lg";

const FONT_SCALES: Record<FontScale, string> = {
  sm: "0.9",
  md: "1",
  lg: "1.2",
};

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontScale, setFontScale] = useState<FontScale>("md");
  const [highContrast, setHighContrast] = useState(false);
  const [simplified, setSimplified] = useState(false);

  // Persist preferences across page navigation in session
  useEffect(() => {
    const saved = sessionStorage.getItem("a11y-prefs");
    if (saved) {
      try {
        const prefs = JSON.parse(saved);
        if (prefs.fontScale) setFontScale(prefs.fontScale);
        if (prefs.highContrast) setHighContrast(prefs.highContrast);
        if (prefs.simplified) setSimplified(prefs.simplified);
      } catch {}
    }
  }, []);

  const applyPrefs = useCallback(
    (scale: FontScale, contrast: boolean, simple: boolean) => {
      const root = document.documentElement;
      root.style.setProperty("--font-scale", FONT_SCALES[scale]);
      root.classList.toggle("high-contrast", contrast);
      root.classList.toggle("simplified", simple);
      sessionStorage.setItem(
        "a11y-prefs",
        JSON.stringify({ fontScale: scale, highContrast: contrast, simplified: simple })
      );
    },
    []
  );

  useEffect(() => {
    applyPrefs(fontScale, highContrast, simplified);
  }, [fontScale, highContrast, simplified, applyPrefs]);

  const cycleFontDown = () => {
    if (fontScale === "lg") setFontScale("md");
    else if (fontScale === "md") setFontScale("sm");
  };
  const cycleFontUp = () => {
    if (fontScale === "sm") setFontScale("md");
    else if (fontScale === "md") setFontScale("lg");
  };

  const FONT_LABEL: Record<FontScale, string> = { sm: "A−", md: "A", lg: "A+" };

  return (
    <div
      className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-2"
      role="region"
      aria-label="Accessibility options"
    >
      {/* Expanded panel */}
      {isOpen && (
        <div
          className="bg-[--color-cream] border-2 border-[--color-terracotta] rounded-2xl shadow-xl p-4 flex flex-col gap-4 w-56 animate-in slide-in-from-bottom-4 duration-200"
          style={{
            background: "oklch(97% 0.01 60)",
            borderColor: "oklch(52% 0.14 35)",
            boxShadow: "0 8px 32px oklch(20% 0.05 35 / 0.18)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "oklch(38% 0.08 35)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Accessibility
          </p>

          {/* Font size */}
          <div className="flex flex-col gap-1.5">
            <span
              className="text-xs"
              style={{ color: "oklch(38% 0.08 35)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Text Size
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={cycleFontDown}
                disabled={fontScale === "sm"}
                aria-label="Decrease font size"
                className="flex items-center justify-center w-9 h-9 rounded-xl border-2 transition-all disabled:opacity-40 hover:scale-105 active:scale-95"
                style={{
                  borderColor: "oklch(52% 0.14 35)",
                  color: "oklch(52% 0.14 35)",
                  background: "transparent",
                }}
              >
                <Minus size={14} />
              </button>
              <span
                className="flex-1 text-center font-bold text-lg"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "oklch(38% 0.08 35)",
                }}
                aria-live="polite"
                aria-label={`Current text size: ${FONT_LABEL[fontScale]}`}
              >
                {FONT_LABEL[fontScale]}
              </span>
              <button
                onClick={cycleFontUp}
                disabled={fontScale === "lg"}
                aria-label="Increase font size"
                className="flex items-center justify-center w-9 h-9 rounded-xl border-2 transition-all disabled:opacity-40 hover:scale-105 active:scale-95"
                style={{
                  borderColor: "oklch(52% 0.14 35)",
                  color: "oklch(52% 0.14 35)",
                  background: "transparent",
                }}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* High contrast */}
          <button
            onClick={() => setHighContrast((v) => !v)}
            aria-pressed={highContrast}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98] text-left w-full"
            style={{
              borderColor: highContrast ? "oklch(52% 0.14 35)" : "oklch(75% 0.06 35)",
              background: highContrast ? "oklch(52% 0.14 35)" : "transparent",
              color: highContrast ? "oklch(97% 0.01 60)" : "oklch(38% 0.08 35)",
            }}
          >
            <Eye size={16} className="shrink-0" />
            <span
              className="text-sm font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              High Contrast
            </span>
            <span
              className="ml-auto text-xs px-1.5 py-0.5 rounded-md"
              style={{
                background: highContrast
                  ? "oklch(97% 0.01 60 / 0.2)"
                  : "oklch(52% 0.14 35 / 0.1)",
              }}
            >
              {highContrast ? "ON" : "OFF"}
            </span>
          </button>

          {/* Simplify */}
          <button
            onClick={() => setSimplified((v) => !v)}
            aria-pressed={simplified}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98] text-left w-full"
            style={{
              borderColor: simplified ? "oklch(42% 0.1 145)" : "oklch(75% 0.06 35)",
              background: simplified ? "oklch(42% 0.1 145)" : "transparent",
              color: simplified ? "oklch(97% 0.01 60)" : "oklch(38% 0.08 35)",
            }}
          >
            <Layers size={16} className="shrink-0" />
            <span
              className="text-sm font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Simplify Page
            </span>
            <span
              className="ml-auto text-xs px-1.5 py-0.5 rounded-md"
              style={{
                background: simplified
                  ? "oklch(97% 0.01 60 / 0.2)"
                  : "oklch(42% 0.1 145 / 0.1)",
              }}
            >
              {simplified ? "ON" : "OFF"}
            </span>
          </button>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close accessibility toolbar" : "Open accessibility toolbar"}
        className="flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 font-semibold text-sm"
        style={{
          background: "oklch(52% 0.14 35)",
          color: "oklch(97% 0.01 60)",
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: "0 4px 20px oklch(52% 0.14 35 / 0.4)",
        }}
      >
        <Type size={16} />
        <span className="hidden sm:inline">Accessibility</span>
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>
    </div>
  );
}
