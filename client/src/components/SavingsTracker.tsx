import { useState, useEffect, useRef } from "react";
import { TrendingUp, Flame, Award, DollarSign } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TrackerData {
  firstVisit: string;      // ISO date string
  lastVisit: string;       // ISO date string
  streakDays: number;
  monthlySavings: number;
  discountsUsed: number;
  badgesEarned: string[];
}

interface Badge {
  id: string;
  label: string;
  description: string;
  threshold: () => boolean;
  emoji: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "HealthCare Select Benefits Hub_tracker";

function loadData(): TrackerData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackerData) : null;
  } catch {
    return null;
  }
}

function saveData(data: TrackerData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable (e.g. SSR / private mode) — fail silently
  }
}

function daysBetween(a: string, b: string): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor(
    (new Date(b).getTime() - new Date(a).getTime()) / msPerDay
  );
}

function calcScore(data: TrackerData): number {
  let score = 0;
  score += Math.min(data.streakDays * 2, 40);        // up to 40 pts for streak
  score += Math.min(data.discountsUsed * 5, 30);     // up to 30 pts for discounts
  score += Math.min(data.badgesEarned.length * 10, 30); // up to 30 pts for badges
  return Math.min(Math.round(score), 100);
}

// ─── Circular Progress Ring ───────────────────────────────────────────────────

function ProgressRing({
  score,
  size = 88,
}: {
  score: number;
  size?: number;
}) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="oklch(0.90 0.02 80)"
        strokeWidth={8}
      />
      {/* Progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="oklch(0.52 0.14 60)"
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
    </svg>
  );
}

// ─── Badge Chip ───────────────────────────────────────────────────────────────

function BadgeChip({
  badge,
  earned,
}: {
  badge: Badge;
  earned: boolean;
}) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300"
      style={{
        backgroundColor: earned
          ? "oklch(0.93 0.05 80)"
          : "oklch(0.95 0.008 80)",
        color: earned ? "oklch(0.35 0.08 55)" : "oklch(0.68 0.02 60)",
        border: `1.5px solid ${earned ? "oklch(0.78 0.08 75)" : "oklch(0.90 0.01 80)"}`,
        opacity: earned ? 1 : 0.6,
      }}
      title={badge.description}
    >
      <span className={earned ? "" : "grayscale opacity-50"}>
        {badge.emoji}
      </span>
      <span>{badge.label}</span>
      {earned && (
        <Award size={11} style={{ color: "oklch(0.52 0.12 70)" }} />
      )}
    </div>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────

export default function SavingsTracker() {
  const today = new Date().toISOString().slice(0, 10);

  const [data, setData] = useState<TrackerData>(() => {
    const existing = loadData();
    if (existing) {
      const diff = daysBetween(existing.lastVisit, today);
      if (diff === 0) return existing; // same day, no change
      if (diff === 1) {
        // consecutive day — extend streak
        const updated: TrackerData = {
          ...existing,
          lastVisit: today,
          streakDays: existing.streakDays + 1,
        };
        saveData(updated);
        return updated;
      }
      // streak broken
      const reset: TrackerData = {
        ...existing,
        lastVisit: today,
        streakDays: 1,
      };
      saveData(reset);
      return reset;
    }
    // First visit
    const fresh: TrackerData = {
      firstVisit: today,
      lastVisit: today,
      streakDays: 1,
      monthlySavings: 0,
      discountsUsed: 0,
      badgesEarned: [],
    };
    saveData(fresh);
    return fresh;
  });

  // Demo: simulate earned savings so new users see something
  const displayedSavings = data.monthlySavings > 0 ? data.monthlySavings : 0;
  const score = calcScore(data);

  // Badge definitions
  const badges: Badge[] = [
    {
      id: "first_100",
      label: "First $100 Saved",
      description: "You've tracked $100 in savings!",
      threshold: () => data.monthlySavings >= 100,
      emoji: "💰",
    },
    {
      id: "five_discounts",
      label: "5 Discounts Used",
      description: "You've used 5 different discounts.",
      threshold: () => data.discountsUsed >= 5,
      emoji: "🎯",
    },
    {
      id: "benefits_expert",
      label: "Benefits Expert",
      description: "You've completed your Savings Blueprint.",
      threshold: () => data.badgesEarned.includes("benefits_expert"),
      emoji: "🏅",
    },
  ];

  // Auto-award badges when thresholds are met
  const hasCheckedBadges = useRef(false);
  useEffect(() => {
    if (hasCheckedBadges.current) return;
    hasCheckedBadges.current = true;

    const newlyEarned = badges
      .filter((b) => b.threshold() && !data.badgesEarned.includes(b.id))
      .map((b) => b.id);

    if (newlyEarned.length > 0) {
      setData((prev) => {
        const updated = {
          ...prev,
          badgesEarned: [...prev.badgesEarned, ...newlyEarned],
        };
        saveData(updated);
        return updated;
      });
    }
  }, []);

  // Simulate adding a discount use (demo button)
  const handleUseDiscount = () => {
    setData((prev) => {
      const updated: TrackerData = {
        ...prev,
        discountsUsed: prev.discountsUsed + 1,
        monthlySavings: prev.monthlySavings + Math.floor(Math.random() * 20 + 5),
      };
      saveData(updated);
      return updated;
    });
  };

  const totalDays = daysBetween(data.firstVisit, today) + 1;

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-md"
      style={{
        backgroundColor: "white",
        border: "1.5px solid oklch(0.92 0.02 80)",
      }}
    >
      {/* Header bar */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ backgroundColor: "oklch(0.22 0.02 50)" }}
      >
        <div>
          <p
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "oklch(0.75 0.04 70)" }}
          >
            Savings Score
          </p>
          <p
            className="text-sm font-semibold mt-0.5"
            style={{ color: "oklch(0.92 0.015 80)" }}
          >
            HealthCare Select Benefits Hub Tracker
          </p>
        </div>
        <TrendingUp size={20} style={{ color: "oklch(0.70 0.08 75)" }} />
      </div>

      <div className="px-5 py-5">
        {/* Score ring + stats row */}
        <div className="flex items-center gap-5 mb-5">
          {/* Ring */}
          <div className="relative shrink-0">
            <ProgressRing score={score} size={88} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-2xl font-black leading-none"
                style={{ color: "oklch(0.28 0.04 55)" }}
              >
                {score}
              </span>
              <span
                className="text-[10px] font-semibold uppercase tracking-wide"
                style={{ color: "oklch(0.58 0.06 60)" }}
              >
                /100
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 space-y-3">
            {/* Monthly savings */}
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: "oklch(0.94 0.04 80)" }}
              >
                <DollarSign size={14} style={{ color: "oklch(0.45 0.10 60)" }} />
              </div>
              <div>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.58 0.04 60)" }}
                >
                  Monthly savings
                </p>
                <p
                  className="text-base font-bold leading-tight"
                  style={{ color: "oklch(0.28 0.04 55)" }}
                >
                  ${displayedSavings.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: "oklch(0.94 0.06 55)" }}
              >
                <Flame size={14} style={{ color: "oklch(0.55 0.14 40)" }} />
              </div>
              <div>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.58 0.04 60)" }}
                >
                  Current streak
                </p>
                <p
                  className="text-base font-bold leading-tight"
                  style={{ color: "oklch(0.28 0.04 55)" }}
                >
                  {data.streakDays} day{data.streakDays !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Days using HealthCare Select Benefits Hub */}
        <div
          className="text-center py-2 px-4 rounded-xl mb-5 text-xs font-medium"
          style={{
            backgroundColor: "oklch(0.96 0.015 80)",
            color: "oklch(0.48 0.06 60)",
          }}
        >
          🗓️ Using HealthCare Select Benefits Hub for{" "}
          <strong style={{ color: "oklch(0.35 0.06 55)" }}>
            {totalDays} day{totalDays !== 1 ? "s" : ""}
          </strong>
        </div>

        {/* Badges */}
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-widest mb-2.5"
            style={{ color: "oklch(0.60 0.04 60)" }}
          >
            Milestones
          </p>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <BadgeChip
                key={badge.id}
                badge={badge}
                earned={badge.threshold() || data.badgesEarned.includes(badge.id)}
              />
            ))}
          </div>
        </div>

        {/* Progress next badge hint */}
        {data.discountsUsed < 5 && (
          <div
            className="mt-4 text-xs rounded-xl p-3"
            style={{
              backgroundColor: "oklch(0.96 0.02 80)",
              color: "oklch(0.50 0.06 60)",
            }}
          >
            🎯 Use{" "}
            <strong style={{ color: "oklch(0.38 0.06 55)" }}>
              {5 - data.discountsUsed} more discount
              {5 - data.discountsUsed !== 1 ? "s" : ""}
            </strong>{" "}
            to earn the "5 Discounts Used" badge!
          </div>
        )}

        {/* Demo button — wire this to real discount-use events in production */}
        <button
          onClick={handleUseDiscount}
          className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            backgroundColor: "oklch(0.48 0.12 55)",
            color: "white",
          }}
        >
          + Log a Discount Used
        </button>

        <a
          href="/savings-blueprint"
          className="mt-2 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-xl transition-all duration-200 hover:underline"
          style={{ color: "oklch(0.48 0.10 60)" }}
        >
          Build My Savings Blueprint →
        </a>
      </div>
    </div>
  );
}
