/* MedicareGuide.tsx — HealthCare Select Benefits Hub
 * High-value Medicare Open Enrollment Guide page
 * Design: Warm Abundance — terracotta/cream/forest green
 * Monetization: Medicare affiliate CTAs + pay-per-call throughout
 */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MonetizationBanner from "@/components/MonetizationBanner";
import MedicareEligibilityCalculator from "@/components/MedicareEligibilityCalculator";
import PageHaiku from "@/components/PageHaiku";
import {
  Calendar, Phone, CheckCircle2, AlertCircle, ArrowRight,
  Shield, ExternalLink, Clock, Star, ChevronDown, ChevronUp,
  Search, CreditCard, Info, Loader2
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ENROLLMENT_PERIODS = [
  {
    name: "Initial Enrollment Period (IEP)",
    dates: "3 months before your 65th birthday through 3 months after",
    description: "Your first opportunity to enroll in Medicare. Missing this window can result in permanent late enrollment penalties.",
    color: "oklch(0.45 0.08 175)",
    bg: "oklch(0.93_0_0)",
  },
  {
    name: "Annual Enrollment Period (AEP)",
    dates: "October 15 – December 7 each year",
    description: "The main window to switch Medicare Advantage plans, change Part D drug plans, or switch between Original Medicare and Medicare Advantage.",
    color: "oklch(0.50_0.15_15)",
    bg: "oklch(0.95_0.04_15)",
    highlight: true,
  },
  {
    name: "Medicare Advantage Open Enrollment",
    dates: "January 1 – March 31 each year",
    description: "If you're already in a Medicare Advantage plan, you can switch to a different MA plan or return to Original Medicare.",
    color: "oklch(0.45_0.12_200)",
    bg: "oklch(0.92_0.04_200)",
  },
  {
    name: "Special Enrollment Period (SEP)",
    dates: "Varies by qualifying event",
    description: "You may qualify for a Special Enrollment Period if you lose other coverage, move, or experience certain life changes.",
    color: "oklch(0.40_0.10_140)",
    bg: "oklch(0.90_0.04_140)",
  },
];

const PLAN_TYPES = [
  {
    name: "Original Medicare (Parts A & B)",
    icon: "🏥",
    pros: ["Accepted by most doctors and hospitals nationwide", "No referrals needed for specialists", "Predictable coverage rules"],
    cons: ["No out-of-pocket maximum", "No prescription drug coverage (need Part D)", "No dental, vision, or hearing"],
    bestFor: "People who travel frequently or want maximum provider flexibility",
  },
  {
    name: "Medicare Advantage (Part C)",
    icon: "⭐",
    pros: ["Often includes dental, vision, and hearing", "Out-of-pocket maximum protection", "May include prescription drug coverage", "Some plans have $0 premium"],
    cons: ["Network restrictions (HMO/PPO)", "Prior authorization may be required", "Coverage varies by plan and location"],
    bestFor: "People who want all-in-one coverage and extra benefits",
  },
  {
    name: "Medicare Supplement (Medigap)",
    icon: "🛡️",
    pros: ["Covers Medicare cost-sharing gaps", "Use any Medicare-accepting provider", "Predictable out-of-pocket costs", "No network restrictions"],
    cons: ["Monthly premium in addition to Part B", "Does not include drug coverage (need Part D)", "Harder to qualify after initial enrollment"],
    bestFor: "People who want comprehensive coverage and budget predictability",
  },
  {
    name: "Medicare Part D (Prescription Drugs)",
    icon: "💊",
    pros: ["Covers prescription drugs", "Available as standalone or part of MA plan", "Extra Help program for low-income beneficiaries"],
    cons: ["Coverage gap (donut hole) may apply", "Formularies vary by plan", "Late enrollment penalty if you delay"],
    bestFor: "Anyone on Original Medicare who takes prescription medications",
  },
];

const FAQS = [
  {
    q: "What happens if I miss the Annual Enrollment Period?",
    a: "If you miss AEP (Oct 15–Dec 7), you generally must wait until the next AEP to make changes, unless you qualify for a Special Enrollment Period. Missing your Initial Enrollment Period when you first become eligible can result in permanent late enrollment penalties added to your monthly premium.",
  },
  {
    q: "Can I be denied Medicare Supplement coverage?",
    a: "During your Medigap Open Enrollment Period (the 6 months starting when you're 65+ and enrolled in Part B), insurers cannot deny you coverage or charge more due to health conditions. After this window, insurers in most states can use medical underwriting.",
  },
  {
    q: "What is the Medicare 'donut hole'?",
    a: "The coverage gap (donut hole) in Medicare Part D is a temporary limit on what the drug plan will cover. In 2024, once you and your plan spend a certain amount on covered drugs, you pay no more than 25% of the cost for covered drugs until you reach catastrophic coverage.",
  },
  {
    q: "How do I know if my doctor accepts Medicare?",
    a: "You can use the Medicare.gov Physician Compare tool at medicare.gov/care-compare to search for doctors, hospitals, and other providers that accept Medicare. Always confirm directly with your provider before scheduling.",
  },
  {
    q: "What is Extra Help for Part D?",
    a: "Extra Help (also called the Low Income Subsidy or LIS) is a federal program that helps people with limited income and resources pay for Medicare Part D costs. It can save you thousands of dollars per year on prescription drug costs. Apply through SSA.gov.",
  },
  {
    q: "Can I have both Medicare and Medicaid?",
    a: "Yes. People who qualify for both Medicare and Medicaid are called 'dual eligible.' If you qualify for both, you may be eligible for a Dual Eligible Special Needs Plan (D-SNP), which coordinates both types of coverage and often includes additional benefits.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <span className="font-semibold text-sm text-foreground">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Medicare Plan Lookup Component ───────────────────────────────────────────
type LookupState = "idle" | "loading" | "result" | "error";

interface PlanResult {
  memberId: string;
  planName: string;
  planType: string;
  effectiveDate: string;
  groupNumber: string;
  payerId: string;
  status: string;
}

function MedicarePlanLookup() {
  const [memberId, setMemberId] = useState("");
  const [dob, setDob] = useState("");
  const [state, setState] = useState<LookupState>("idle");
  const [result, setResult] = useState<PlanResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Format Medicare ID as user types: 1EG4-TE5-MK72
  const formatMedicareId = (val: string) => {
    const clean = val.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 11);
    if (clean.length <= 4) return clean;
    if (clean.length <= 7) return `${clean.slice(0, 4)}-${clean.slice(4)}`;
    return `${clean.slice(0, 4)}-${clean.slice(4, 7)}-${clean.slice(7)}`;
  };

  const handleLookup = async () => {
    const cleanId = memberId.replace(/-/g, "");
    if (cleanId.length < 11) {
      setErrorMsg("Please enter a valid 11-character Medicare Beneficiary Identifier (MBI).");
      setState("error");
      return;
    }
    if (!dob) {
      setErrorMsg("Please enter your date of birth for verification.");
      setState("error");
      return;
    }

    setState("loading");
    setErrorMsg("");

    try {
      // ─────────────────────────────────────────────────────────────────────────
      // TODO: Replace this mock with your pVerify API call when credentials
      // are ready. Example endpoint:
      //   POST https://api.pverify.com/api/EligibilitySummary
      //   Headers: { "Client-API-Id": YOUR_CLIENT_ID, "Authorization": "Bearer TOKEN" }
      //   Body: { "payerCode": "00001", "provider": {...}, "subscriber": { "memberId": cleanId, "dob": dob } }
      // ─────────────────────────────────────────────────────────────────────────
      await new Promise((r) => setTimeout(r, 1800)); // Simulate API latency

      // Mock result — replace with actual pVerify response parsing
      setResult({
        memberId: memberId,
        planName: "Medicare Advantage — Example Plan",
        planType: "Medicare Advantage (Part C)",
        effectiveDate: "01/01/2025",
        groupNumber: "H1234-001",
        payerId: "00001",
        status: "Active",
      });
      setState("result");
    } catch {
      setErrorMsg("Unable to retrieve plan information. Please verify your Medicare ID and try again, or call 1-800-MEDICARE.");
      setState("error");
    }
  };

  const reset = () => { setState("idle"); setResult(null); setMemberId(""); setDob(""); setErrorMsg(""); };

  return (
    <section className="rounded-2xl border-2 border-[oklch(0.82_0.06_200)] bg-[oklch(0.97_0.02_200)] p-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "oklch(0.45 0.12 200)" }}>
          <CreditCard className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="  text-xl font-bold text-foreground">Look Up My Current Medicare Plan</h2>
              <PageHaiku lines={["Medicare guides light", "Through the maze of health and care", "Peace for aging hearts"]} />
          <p className="text-xs text-muted-foreground">Enter your Medicare ID to see your current coverage details</p>
        </div>
      </div>

      <div className="mt-1 mb-4 flex items-start gap-2 bg-[oklch(0.93_0.03_200)] rounded-lg px-3 py-2">
        <Info className="w-3.5 h-3.5 text-[oklch(0.45_0.12_200)] mt-0.5 shrink-0" />
        <p className="text-[11px] text-[oklch(0.40_0.08_200)] leading-relaxed">
          Your <strong>Medicare Beneficiary Identifier (MBI)</strong> is the 11-character ID on your red, white, and blue Medicare card (e.g., <code className="font-mono bg-white px-1 rounded">1EG4-TE5-MK72</code>). This lookup is powered by pVerify and is for informational purposes only.
        </p>
      </div>

      {state === "result" && result ? (
        <div>
          <div className="bg-white rounded-xl border border-[oklch(0.82_0.06_200)] p-5 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-[oklch(0.40_0.10_140)]" />
              <span className="font-semibold text-sm text-[oklch(0.40_0.10_140)]">Plan Found — Status: {result.status}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Medicare ID", value: result.memberId },
                { label: "Plan Name", value: result.planName },
                { label: "Plan Type", value: result.planType },
                { label: "Effective Date", value: result.effectiveDate },
                { label: "Group / Contract #", value: result.groupNumber },
                { label: "Payer ID", value: result.payerId },
              ].map((f) => (
                <div key={f.label} className="bg-[oklch(0.97_0.01_200)] rounded-lg px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-0.5">{f.label}</p>
                  <p className="text-sm font-semibold text-foreground">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[oklch(0.95_0.04_15)] rounded-xl border border-[oklch(0.85_0.06_15)] p-4 mb-4">
            <p className="text-sm font-semibold text-foreground mb-2">Want to compare other plans or see if you can save?</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://www.selectquote.com/medicare"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[oklch(0.45_0.08_175)] hover:bg-[oklch(0.38_0.08_175)] text-white font-semibold px-4 py-2 rounded-lg transition-colors text-xs"
              >
                Compare Plans — SelectQuote Senior <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.medicare.gov/plan-compare"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-[oklch(0.75_0.04_200)] text-[oklch(0.40_0.10_200)] font-semibold px-4 py-2 rounded-lg transition-colors text-xs hover:bg-white"
              >
                Medicare.gov Plan Finder <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <button onClick={reset} className="text-xs text-muted-foreground hover:underline">← Look up a different ID</button>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Medicare Beneficiary Identifier (MBI)</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(formatMedicareId(e.target.value))}
                placeholder="e.g. 1EG4-TE5-MK72"
                maxLength={13}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[oklch(0.82_0.06_200)] bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.12_200)] transition"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Date of Birth (for verification)</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-[oklch(0.82_0.06_200)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.12_200)] transition"
            />
          </div>

          {state === "error" && errorMsg && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-xs text-red-700">{errorMsg}</p>
            </div>
          )}

          <Button
            onClick={handleLookup}
            disabled={state === "loading"}
            className="w-full font-semibold"
            style={{ background: "oklch(0.45 0.12 200)", color: "white" }}
          >
            {state === "loading" ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Looking up your plan...</>
            ) : (
              <><Search className="w-4 h-4 mr-2" /> Look Up My Medicare Plan</>
            )}
          </Button>

          <p className="text-[10px] text-muted-foreground text-center">
            <Shield className="w-3 h-3 inline mr-1" />
            Your Medicare ID is never stored. Lookup powered by pVerify. <a href="/disclosures" className="underline">Privacy & Disclosure</a>
          </p>
        </div>
      )}
    </section>
  );
}

export default function MedicareGuide() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-[#0E5659] border-b border-border py-12 md:py-16">
          <div className="container max-w-5xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[oklch(0.45_0.08_175)] bg-[oklch(0.90_0_0)] px-3 py-1 rounded-full">
                Medicare Guide
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[oklch(0.50_0.15_15)] bg-[oklch(0.95_0.04_15)] px-3 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" /> AEP: Oct 15 – Dec 7
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              The Complete Medicare<br />Open Enrollment Guide
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mb-8">
              Everything you need to know about Medicare enrollment periods, plan types, and how to choose the right coverage. Compare plans for free with licensed agents.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.selectquote.com/medicare"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[oklch(0.45_0.08_175)] hover:bg-[oklch(0.38_0.08_175)] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Compare Medicare Plans Free — SelectQuote
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="tel:18005550001"
                className="inline-flex items-center gap-2 bg-[oklch(0.55_0.15_15)] hover:bg-[oklch(0.48_0.15_15)] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                Speak with a Medicare Specialist
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              <Shield className="w-3 h-3 inline mr-1" />
              Free service. You'll be connected to a licensed Medicare agent. <a href="/disclosures" className="underline">Disclosure</a>
            </p>
          </div>
        </section>

        <div className="container max-w-5xl py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* ─── Medicare Plan Lookup ─── */}
              <MedicarePlanLookup />

              {/* ─── Medicare Eligibility Calculator ─── */}
              <MedicareEligibilityCalculator />

              {/* Enrollment Periods */}
              <section>
                <h2 className="  text-2xl font-bold text-foreground mb-2">
                  Medicare Enrollment Periods
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Knowing when you can make changes to your Medicare coverage is critical. Missing a window can mean waiting a full year and potentially paying penalties.
                </p>
                <div className="space-y-4">
                  {ENROLLMENT_PERIODS.map((period) => (
                    <div
                      key={period.name}
                      className={`rounded-xl p-5 border ${period.highlight ? "border-[oklch(0.75_0.10_15)]" : "border-border"}`}
                      style={{ background: `oklch(${period.bg.replace("oklch(", "").replace(")", "")})` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: `oklch(${period.color.replace("oklch(", "").replace(")", "")})` }} />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-semibold text-sm text-foreground">{period.name}</h3>
                            {period.highlight && (
                              <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[oklch(0.55_0.15_15)] text-white">
                                Most Important
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {period.dates}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{period.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Plan Types */}
              <section>
                <h2 className="  text-2xl font-bold text-foreground mb-2">
                  Understanding Medicare Plan Types
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Medicare has several parts and plan types. Here's a clear breakdown of each option, including pros, cons, and who each is best for.
                </p>
                <div className="space-y-4">
                  {PLAN_TYPES.map((plan) => (
                    <div key={plan.name} className="rounded-xl border border-border bg-card p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{plan.icon}</span>
                        <h3 className="font-semibold text-base text-foreground">{plan.name}</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-[oklch(0.40_0.10_140)] mb-2">Pros</p>
                          <ul className="space-y-1">
                            {plan.pros.map((p) => (
                              <li key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <CheckCircle2 className="w-3 h-3 text-[oklch(0.40_0.10_140)] mt-0.5 shrink-0" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-[oklch(0.50_0.15_15)] mb-2">Cons</p>
                          <ul className="space-y-1">
                            {plan.cons.map((c) => (
                              <li key={c} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <AlertCircle className="w-3 h-3 text-[oklch(0.50_0.15_15)] mt-0.5 shrink-0" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg px-3 py-2">
                        <p className="text-xs text-muted-foreground">
                          <Star className="w-3 h-3 inline mr-1 text-[oklch(0.45 0.08 175)]" />
                          <strong>Best for:</strong> {plan.bestFor}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Inline CTA */}
              <div className="rounded-xl bg-[oklch(0.95_0.04_15)] border border-[oklch(0.85_0.06_15)] p-6 text-center">
                <h3 className="  text-xl font-bold text-foreground mb-2">
                  Not Sure Which Plan Is Right for You?
                </h3>
                <p className="text-sm text-muted-foreground mb-5">
                  A licensed Medicare specialist can compare plans in your area and help you find the best coverage for your needs and budget. Free, no obligation.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a
                    href="https://www.selectquote.com/medicare"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[oklch(0.45_0.08_175)] hover:bg-[oklch(0.38_0.08_175)] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    Compare Plans — SelectQuote Senior <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="tel:18005550001"
                    className="inline-flex items-center gap-2 bg-[oklch(0.55_0.15_15)] hover:bg-[oklch(0.48_0.15_15)] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" /> 1-800-555-0001
                  </a>
                </div>
                <p className="text-[10px] text-muted-foreground mt-3">
                  <Shield className="w-3 h-3 inline mr-1" />
                  Sponsored. You'll be connected to a licensed Medicare agent. <a href="/disclosures" className="underline">Disclosure</a>
                </p>
              </div>

              {/* FAQs */}
              <section>
                <h2 className="  text-2xl font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {FAQS.map((faq) => (
                    <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </section>

              {/* Official Resources */}
              <section>
                <h2 className="  text-2xl font-bold text-foreground mb-4">
                  Official Medicare Resources
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: "Medicare.gov", desc: "Official Medicare website — compare plans, find providers", url: "https://www.medicare.gov" },
                    { name: "Medicare Plan Finder", desc: "Compare Medicare Advantage and Part D plans in your area", url: "https://www.medicare.gov/plan-compare" },
                    { name: "Extra Help (LIS)", desc: "Apply for help paying Medicare Part D costs", url: "https://www.ssa.gov/medicare/part-d-extra-help" },
                    { name: "State Health Insurance Assistance (SHIP)", desc: "Free local Medicare counseling", url: "https://www.shiphelp.org" },
                  ].map((r) => (
                    <a
                      key={r.name}
                      href={r.url}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card hover:border-[oklch(0.45 0.08 175)] hover:shadow-sm transition-all group"
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0 group-hover:text-[oklch(0.45_0.08_175)]" />
                      <div>
                        <p className="text-sm font-semibold text-foreground group-hover:text-[oklch(0.45_0.08_175)] transition-colors">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <MonetizationBanner
                category="Healthcare and Pharmacy"
                variant="sidebar"
                showAffiliate={true}
                showCall={true}
                showLead={true}
                maxItems={3}
              />

              {/* Quick Facts */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-sm text-foreground mb-4">Medicare Quick Facts</h3>
                <div className="space-y-3">
                  {[
                    { label: "Part A Premium", value: "$0 for most people" },
                    { label: "Part B Premium (2024)", value: "$174.70/month" },
                    { label: "Part A Deductible", value: "$1,632 per benefit period" },
                    { label: "Part B Deductible", value: "$240/year" },
                    { label: "AEP Dates", value: "Oct 15 – Dec 7" },
                    { label: "Coverage Starts", value: "January 1 after AEP" },
                  ].map((f) => (
                    <div key={f.label} className="flex justify-between items-start gap-2 text-xs border-b border-border pb-2 last:border-0 last:pb-0">
                      <span className="text-muted-foreground">{f.label}</span>
                      <span className="font-semibold text-foreground text-right">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back to Benefits Hub */}
              <Link href="/social-programs">
                <div className="flex items-center gap-2 text-sm text-[oklch(0.45_0.08_175)] hover:underline cursor-pointer">
                  <ArrowRight className="w-4 h-4" />
                  Back to Benefits Hub
                </div>
              </Link>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
