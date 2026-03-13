/* Checkout Page — Warm Abundance design
 * Stripe payment UI (ready for Stripe.js integration)
 * Left: order summary | Right: payment form
 */
import { useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import PageHaiku from "@/components/PageHaiku";
import Footer from "@/components/Footer";
import { PLANS, MembershipTier } from "@/contexts/MembershipContext";
import { useMembership } from "@/contexts/MembershipContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowLeft, Lock, CreditCard, CheckCircle2,
  ShieldCheck, Tag
} from "lucide-react";
import { toast } from "sonner";

export default function Checkout() {
  const params = useParams<{ tier: string }>();
  const tier = params.tier as MembershipTier;
  const [, navigate] = useLocation();
  const { setTier } = useMembership();
  const { updateTier } = useAuth();

  const plan = PLANS.find((p) => p.id === tier);

  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [form, setForm] = useState({
    email: "",
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    zip: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!plan || plan.id === "free") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-16 text-center">
          <p className="text-[oklch(0.52_0.04_60)]">Invalid plan selected.</p>
          <Link href="/pricing" className="text-sm font-medium mt-4 inline-block" style={{ color: "oklch(0.45 0.08 175)" }}>
            ← Back to pricing
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const price = billing === "yearly" ? plan.yearlyPrice : plan.price;
  const monthlyEquiv = billing === "yearly" ? (plan.yearlyPrice / 12).toFixed(2) : plan.price.toFixed(2);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === "cardNumber") {
      formatted = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    }
    if (name === "expiry") {
      formatted = value.replace(/\D/g, "").slice(0, 4);
      if (formatted.length >= 2) formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
    }
    if (name === "cvc") {
      formatted = value.replace(/\D/g, "").slice(0, 4);
    }

    setForm((prev) => ({ ...prev, [name]: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.name || !form.cardNumber || !form.expiry || !form.cvc) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    // Simulate Stripe payment processing
    // In production: integrate with Stripe.js / Stripe Elements here
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
    setTier(tier);
    updateTier(tier); // persist to user account
    toast.success(`Welcome to HealthCare Select Benefits Hub ${plan.name}!`);
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-20 max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg" style={{ background: "oklch(0.88 0.04 140)" }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: "oklch(0.32 0.09 140)" }} />
          </div>
          <h1 className="text-3xl font-bold text-[oklch(0.22_0.02_50)] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            You're all set!
          </h1>
              <PageHaiku lines={["One small step today", "Unlocks a world of savings", "Membership blooms bright"]} />
          <p className="text-[oklch(0.52_0.04_60)] mb-2">
            Welcome to <strong>HealthCare Select Benefits Hub {plan.name}</strong>. Your membership is now active.
          </p>
          <p className="text-sm text-[oklch(0.60_0.03_60)] mb-8">
            A confirmation has been sent to <strong>{form.email}</strong>
          </p>
          <Link href="/discounts">
            <Button size="lg" style={{ background: "oklch(0.68 0.15 55)", color: "white" }}>
              Start Browsing Discounts →
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.98_0.012_80)]">
      <Navbar />

      <div className="container py-10 max-w-4xl mx-auto">
        <Link href="/pricing" className="inline-flex items-center gap-1.5 text-sm text-[oklch(0.52_0.04_60)] hover:text-[oklch(0.45 0.08 175)] mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to pricing
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[oklch(0.88_0.02_75)] p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.68 0.15 55)" }}>
                  <Tag className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  HealthCare Select Benefits Hub <span style={{ color: "oklch(0.45 0.08 175)" }}>{plan.name}</span>
                </span>
              </div>

              {/* Billing toggle */}
              <div className="flex gap-2 mb-5">
                {(["monthly", "yearly"] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => setBilling(b)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all border ${
                      billing === b
                        ? "border-[oklch(0.45 0.08 175)] text-[oklch(0.40_0.13_42)] bg-[oklch(0.95_0.03_42)]"
                        : "border-[oklch(0.88_0.02_75)] text-[oklch(0.52_0.04_60)]"
                    }`}
                  >
                    {b === "monthly" ? "Monthly" : "Yearly (Save 20%)"}
                  </button>
                ))}
              </div>

              <div className="border-t border-[oklch(0.88_0.02_75)] pt-4 mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[oklch(0.52_0.04_60)]">{plan.name} Plan ({billing})</span>
                  <span className="font-semibold text-[oklch(0.22_0.02_50)]">${price.toFixed(2)}</span>
                </div>
                {billing === "yearly" && (
                  <div className="flex justify-between text-xs text-[oklch(0.52_0.04_60)]">
                    <span>That's ${monthlyEquiv}/mo</span>
                    <span className="text-[oklch(0.32_0.09_140)] font-medium">Save ${(plan.price * 12 - plan.yearlyPrice).toFixed(2)}/yr</span>
                  </div>
                )}
              </div>

              <div className="border-t border-[oklch(0.88_0.02_75)] pt-4 flex justify-between font-bold">
                <span>Total today</span>
                <span style={{ color: "oklch(0.45 0.08 175)" }}>${price.toFixed(2)}</span>
              </div>

              <ul className="mt-5 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[oklch(0.45_0.03_60)]">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "oklch(0.32 0.09 140)" }} />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-1.5 text-xs text-[oklch(0.60_0.03_60)]">
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: "oklch(0.32 0.09 140)" }} />
                7-day free trial · Cancel anytime
              </div>
            </div>
          </div>

          {/* Payment form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-[oklch(0.88_0.02_75)] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-4 h-4 text-[oklch(0.52_0.04_60)]" />
                <h2 className="font-bold text-[oklch(0.22_0.02_50)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Secure Payment
                </h2>
                <span className="ml-auto text-xs text-[oklch(0.60_0.03_60)] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Powered by Stripe
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-xs font-semibold text-[oklch(0.40_0.04_50)] mb-1.5 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleInput}
                      required
                      className="bg-[oklch(0.98_0.008_80)] border-[oklch(0.88_0.02_75)]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="name" className="text-xs font-semibold text-[oklch(0.40_0.04_50)] mb-1.5 block">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={handleInput}
                      required
                      className="bg-[oklch(0.98_0.008_80)] border-[oklch(0.88_0.02_75)]"
                    />
                  </div>
                </div>

                <div className="border border-[oklch(0.88_0.02_75)] rounded-xl p-4 space-y-3 bg-[oklch(0.99_0.005_80)]">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-4 h-4 text-[oklch(0.52_0.04_60)]" />
                    <span className="text-xs font-semibold text-[oklch(0.40_0.04_50)]">Card Details</span>
                    <div className="ml-auto flex gap-1.5">
                      {["VISA", "MC", "AMEX"].map((brand) => (
                        <span key={brand} className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-[oklch(0.88_0.02_75)] text-[oklch(0.52_0.04_60)]">
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardNumber" className="text-xs font-medium text-[oklch(0.52_0.04_60)] mb-1 block">
                      Card Number *
                    </Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={form.cardNumber}
                      onChange={handleInput}
                      required
                      className="bg-white border-[oklch(0.88_0.02_75)] font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <Label htmlFor="expiry" className="text-xs font-medium text-[oklch(0.52_0.04_60)] mb-1 block">
                        Expiry *
                      </Label>
                      <Input
                        id="expiry"
                        name="expiry"
                        placeholder="MM/YY"
                        value={form.expiry}
                        onChange={handleInput}
                        required
                        className="bg-white border-[oklch(0.88_0.02_75)] font-mono"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc" className="text-xs font-medium text-[oklch(0.52_0.04_60)] mb-1 block">
                        CVC *
                      </Label>
                      <Input
                        id="cvc"
                        name="cvc"
                        placeholder="123"
                        value={form.cvc}
                        onChange={handleInput}
                        required
                        className="bg-white border-[oklch(0.88_0.02_75)] font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="zip" className="text-xs font-semibold text-[oklch(0.40_0.04_50)] mb-1.5 block">
                    Billing ZIP Code
                  </Label>
                  <Input
                    id="zip"
                    name="zip"
                    placeholder="12345"
                    value={form.zip}
                    onChange={handleInput}
                    className="bg-[oklch(0.98_0.008_80)] border-[oklch(0.88_0.02_75)] max-w-[160px]"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full font-semibold mt-2 shadow-md"
                  style={{ background: "oklch(0.68 0.15 55)", color: "white" }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Pay ${price.toFixed(2)} — Start {plan.name}
                    </span>
                  )}
                </Button>

                <p className="text-xs text-center text-[oklch(0.60_0.03_60)]">
                  Your payment is encrypted and secured by Stripe. By subscribing, you agree to our Terms of Service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
