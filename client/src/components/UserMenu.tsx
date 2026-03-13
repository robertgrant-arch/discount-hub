/* UserMenu — dropdown for logged-in users
 * Shows avatar, plan badge, account links, logout
 */
import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Tag, ChevronDown, Crown } from "lucide-react";

const TIER_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  free: { label: "Free", color: "oklch(0.52 0.04 60)", bg: "oklch(0.93 0.01 80)" },
  basic: { label: "Basic", color: "oklch(0.47 0.08 185)", bg: "oklch(0.93 0.04 42)" },
  plus: { label: "Plus", color: "oklch(0.28 0.09 140)", bg: "oklch(0.88 0.04 140)" },
  premium: { label: "Premium ✦", color: "oklch(0.47 0.08 185)", bg: "oklch(0.93 0.06 75)" },
};

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  const tier = TIER_LABELS[user.tier] || TIER_LABELS.free;
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-[oklch(0.93_0.02_80)] transition-colors"
      >
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ background: "oklch(0.68 0.15 55)" }}
        >
          {initials}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-xs font-semibold text-[oklch(0.22_0.02_50)] leading-tight">{user.name}</p>
          <p
            className="text-[10px] font-semibold leading-tight"
            style={{ color: tier.color }}
          >
            {tier.label}
          </p>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-[oklch(0.52_0.04_60)] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-[oklch(0.88_0.02_75)] shadow-xl z-50 overflow-hidden">
          {/* User info header */}
          <div className="px-4 py-3 border-b border-[oklch(0.88_0.02_75)] bg-[oklch(0.98_0.01_80)]">
            <p className="text-sm font-semibold text-[oklch(0.22_0.02_50)]">{user.name}</p>
            <p className="text-xs text-[oklch(0.52_0.04_60)] truncate">{user.email}</p>
            <span
              className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: tier.bg, color: tier.color }}
            >
              {tier.label} Plan
            </span>
          </div>

          {/* Menu items */}
          <div className="py-1.5">
            <Link
              href="/discounts"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[oklch(0.40_0.04_50)] hover:bg-[oklch(0.97_0.01_80)] transition-colors"
            >
              <Tag className="w-4 h-4" style={{ color: "oklch(0.47 0.08 185)" }} />
              Browse Discounts
            </Link>

            {user.tier !== "premium" && (
              <Link
                href="/pricing"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-[oklch(0.97_0.01_80)]"
                style={{ color: "oklch(0.47 0.08 185)" }}
              >
                <Crown className="w-4 h-4" style={{ color: "oklch(0.47 0.08 185)" }} />
                Upgrade Plan
              </Link>
            )}

            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[oklch(0.40_0.04_50)] hover:bg-[oklch(0.97_0.01_80)] transition-colors"
            >
              <User className="w-4 h-4 text-[oklch(0.60_0.03_60)]" />
              Manage Membership
            </Link>
          </div>

          <div className="border-t border-[oklch(0.88_0.02_75)] py-1.5">
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-[oklch(0.52_0.04_60)] hover:bg-[oklch(0.97_0.01_80)] hover:text-[oklch(0.577_0.245_27.325)] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
