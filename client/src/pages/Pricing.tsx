/* Pricing Page — Warm Abundance design
 * Four-tier membership cards with feature comparison table
 */
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PLANS } from "@/contexts/MembershipContext";
import { useMembership } from "@/contexts/MembershipContext";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle2, XCircle, ArrowRight, Zap } from "lucide-react";

const TIER_STYLES: Record<string, { bg: string; text: string; border: string; btn: string }> = {
  free: {
    bg: "bg-white",
    text: "text-[oklch(0.35_0.04_50)]",
    border: "border-[oklch(0.90_0_0)]",
    btn: "bg-[oklch(0.93_0.02_80)] text-[oklch(0.35_0.04_50)] hover:bg-[oklch(0.90_0_0)]",
  },
  basic: {
    bg: "bg-white",
    text: "text-[oklch(0.40_0.08_175)]",
    border: "border-[oklch(0.72_0.09_42)]",
    btn: "text-white hover:opacity-90",
  },
  plus: {
    bg: "bg-white",
    text: "text-[oklch(0.28_0.09_140)]",
    border: "border-[oklch(0.48_0.09_140)]",
    btn: "text-white hover:opacity-90",
  },
  premium: {
    bg: "bg-gradient-to-br from-[oklch(0.45 0.08 175)] to-[oklch(0.40_0.08_175)]",
    text: "text-white",
    border: "border-transparent",
    btn: "bg-white text-[oklch(0.40_0.08_175)] hover:bg-white/90",
  },
};

const TIER_ACCENT: Record<string, string> = {
  free: "oklch(0.60 0.03 60)",
  basic: "oklch(0.45 0.08 175)",
  plus: "oklch(0.32 0.09 140)",
  premium: "white",
};

const COMPARISON_FEATURES = [
  { label: "Browse all categories", free: true, basic: true, plus: true, premium: true },
  { label: "See company names & discount summaries", free: true, basic: true, plus: true, premium: true },
  { label: "Preview 3 programs per category", free: true, basic: true, plus: true, premium: true },
  { label: "Full senior discount details & links", free: false, basic: true, plus: true, premium: true },
  { label: "Full disability program details & links", free: false, basic: false, plus: true, premium: true },
  { label: "Search & filter all 280+ programs", free: false, basic: true, plus: true, premium: true },
  { label: "Save favorites list", free: false, basic: false, plus: false, premium: true },
  { label: "Printable discount cards", free: false, basic: false, plus: false, premium: true },
  { label: "Email alerts for new discounts", free: false, basic: false, plus: false, premium: true },
];

export default function Pricing() {
  const { currentTier, setTier } = useMembership();
  const { updateTier } = useAuth();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(1_0_0)]">
      <Navbar />

      {/* Header */}
      <div
            className="relative border-b border-[oklch(0.90_0_0)]"
            style={{ background: "linear-gradient(135deg, oklch(0.15 0 0) 0%, oklch(0.30 0.06 175) 100%)" }}
          >
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
            <div className="relative container py-12 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                  <Zap className="w-3.5 h-3.5" />
                  Membership Plans
                </div>
                <h1
                  className="text-4xl font-bold text-white mb-3 leading-tight"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Simple, Transparent Pricing
                </h1>
                <p className="text-white/80 text-base leading-relaxed mb-6">
                  Start free. Upgrade when you're ready to unlock every discount.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { label: "Free Tier", icon: CheckCircle2 },
                    { label: "Cancel Anytime", icon: XCircle },
                    { label: "Instant Access", icon: Zap },
                  ].map((stat) => (
                    <div key={stat.label} className="inline-flex items-center gap-1.5 bg-white/15 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full">
                      <stat.icon className="w-3 h-3" />
                      {stat.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border-b border-[oklch(0.90_0_0)]">
          <div className="container py-12 text-center">

          {/* Billing toggle */}
          <div className="mt-6 inline-flex items-center gap-3 bg-[oklch(0.95_0.015_80)] rounded-full p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                billing === "monthly" ? "bg-white shadow-sm text-[oklch(0.15_0.04_175)]" : "text-[oklch(0.45_0_0)]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                billing === "yearly" ? "bg-white shadow-sm text-[oklch(0.15_0.04_175)]" : "text-[oklch(0.45_0_0)]"
              }`}
            >
              Yearly
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "oklch(0.88 0.04 140)", color: "oklch(0.28 0.09 140)" }}>
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Tier cards */}
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((plan) => {
            const styles = TIER_STYLES[plan.id];
            const isCurrent = currentTier === plan.id;
            const price = billing === "yearly" && plan.id !== "free"
              ? (plan.yearlyPrice / 12).toFixed(2)
              : plan.price.toFixed(2);
            const accentColor = TIER_ACCENT[plan.id];

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border-2 p-6 flex flex-col ${styles.bg} ${styles.border} ${
                  plan.id === "premium" ? "shadow-2xl scale-[1.02]" : "shadow-sm"
                }`}
              >
                {plan.id === "premium" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 bg-[oklch(0.45 0.08 175)] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      <Zap className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <h3
                    className={`text-xl font-bold mb-1 ${plan.id === "premium" ? "text-white" : "text-[oklch(0.15_0.04_175)]"}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-end gap-1">
                    <span
                      className={`text-4xl font-bold ${plan.id === "premium" ? "text-white" : "text-[oklch(0.15_0.04_175)]"}`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      ${price}
                    </span>
                    {plan.price > 0 && (
                      <span className={`text-sm mb-1.5 ${plan.id === "premium" ? "text-white/70" : "text-[oklch(0.45_0_0)]"}`}>
                        /mo
                      </span>
                    )}
                  </div>
                  {billing === "yearly" && plan.price > 0 && (
                    <p className={`text-xs mt-0.5 ${plan.id === "premium" ? "text-white/70" : "text-[oklch(0.45_0_0)]"}`}>
                      Billed ${plan.yearlyPrice}/year
                    </p>
                  )}
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: accentColor }}
                      />
                      <span className={`text-sm ${plan.id === "premium" ? "text-white/90" : "text-[oklch(0.40_0.04_50)]"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <div className={`text-center text-sm font-semibold py-2.5 rounded-xl border ${
                    plan.id === "premium" ? "border-white/30 text-white" : "border-[oklch(0.90_0_0)] text-[oklch(0.45_0_0)]"
                  }`}>
                    Current Plan
                  </div>
                ) : plan.id === "free" ? (
                  <button
                    onClick={() => { setTier("free"); updateTier("free"); }}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${styles.btn}`}
                  >
                    Continue Free
                  </button>
                ) : (
                  <Link href={`/checkout/${plan.id}`} className="block">
                    <button
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${styles.btn} flex items-center justify-center gap-1.5`}
                      style={plan.id !== "premium" ? { background: TIER_ACCENT[plan.id] } : {}}
                    >
                      Get {plan.name} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-[oklch(0.15_0.04_175)] mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Full Feature Comparison
          </h2>
          <div className="bg-white rounded-2xl border border-[oklch(0.90_0_0)] overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[oklch(0.90_0_0)]">
                  <th className="text-left px-6 py-4 text-[oklch(0.35_0.04_50)] font-semibold">Feature</th>
                  {PLANS.map((p) => (
                    <th key={p.id} className="px-4 py-4 text-center font-semibold" style={{ color: TIER_ACCENT[p.id] === "white" ? "oklch(0.45 0.08 175)" : TIER_ACCENT[p.id] }}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-[oklch(0.99_0.005_80)]" : "bg-white"}>
                    <td className="px-6 py-3 text-[oklch(0.40_0.04_50)]">{row.label}</td>
                    {(["free", "basic", "plus", "premium"] as const).map((tier) => (
                      <td key={tier} className="px-4 py-3 text-center">
                        {row[tier] ? (
                          <CheckCircle2 className="w-4 h-4 mx-auto" style={{ color: "oklch(0.32 0.09 140)" }} />
                        ) : (
                          <XCircle className="w-4 h-4 mx-auto text-[oklch(0.80_0.02_60)]" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[oklch(0.45_0_0)]">
            All plans include a 7-day free trial. Cancel anytime. No hidden fees.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
