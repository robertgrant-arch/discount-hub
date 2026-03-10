import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import {
  Calculator,
  DollarSign,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Printer,
  Target,
  TrendingUp,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  ageRange: string;
  state: string;
  zip: string;
  benefits: string[];
  shopping: string[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

const AGE_RANGES = [
  { value: "55-59", label: "55–59" },
  { value: "60-64", label: "60–64" },
  { value: "65-69", label: "65–69" },
  { value: "70-74", label: "70–74" },
  { value: "75-79", label: "75–79" },
  { value: "80+",   label: "80 and older" },
];

const BENEFIT_OPTIONS = [
  { id: "medicare",  label: "Medicare",      monthlySavings: 85 },
  { id: "medicaid",  label: "Medicaid",      monthlySavings: 120 },
  { id: "snap",      label: "SNAP (Food Stamps)", monthlySavings: 65 },
  { id: "ssdi",      label: "SSDI",          monthlySavings: 40 },
  { id: "ssi",       label: "SSI",           monthlySavings: 35 },
  { id: "va",        label: "VA Benefits",   monthlySavings: 95 },
  { id: "pension",   label: "Pension",       monthlySavings: 20 },
];

const SHOPPING_OPTIONS = [
  { id: "grocery",    label: "Grocery Stores",       icon: "🛒", monthlySavings: 48 },
  { id: "restaurant", label: "Restaurants",           icon: "🍽️", monthlySavings: 32 },
  { id: "retail",     label: "Retail / Department",   icon: "🏬", monthlySavings: 55 },
  { id: "travel",     label: "Travel",                icon: "✈️", monthlySavings: 90 },
  { id: "pharmacy",   label: "Pharmacy",              icon: "💊", monthlySavings: 42 },
  { id: "technology", label: "Technology",            icon: "💻", monthlySavings: 28 },
  { id: "utilities",  label: "Utilities",             icon: "⚡", monthlySavings: 38 },
];

const PROGRAMS: Record<string, { name: string; savings: string; link: string; category: string }[]> = {
  grocery:    [
    { name: "AARP Grocery Savings", savings: "Up to 15% off", link: "#", category: "Grocery" },
    { name: "Kroger Senior Discount", savings: "10% off Wednesdays", link: "#", category: "Grocery" },
    { name: "Albertsons Senior Day", savings: "10% off Tuesdays", link: "#", category: "Grocery" },
  ],
  restaurant: [
    { name: "Denny's 55+ Menu", savings: "Up to 20% off", link: "#", category: "Dining" },
    { name: "IHOP Senior Discount", savings: "10% off any time", link: "#", category: "Dining" },
    { name: "McDonald's Senior Coffee", savings: "Free coffee 60+", link: "#", category: "Dining" },
  ],
  retail: [
    { name: "Kohl's Senior Discount", savings: "15% off Wednesdays", link: "#", category: "Retail" },
    { name: "Goodwill Senior Day", savings: "20% off Mondays", link: "#", category: "Retail" },
    { name: "Jo-Ann Fabrics Senior", savings: "15% off every day", link: "#", category: "Retail" },
  ],
  travel: [
    { name: "AARP Travel Center", savings: "Up to 30% off hotels", link: "#", category: "Travel" },
    { name: "Amtrak Senior Fares", savings: "15% off rail travel", link: "#", category: "Travel" },
    { name: "National Parks Senior Pass", savings: "Lifetime entry $80", link: "#", category: "Travel" },
  ],
  pharmacy: [
    { name: "GoodRx Gold Senior", savings: "Up to 80% on Rx", link: "#", category: "Pharmacy" },
    { name: "Walgreens myWalgreens", savings: "Extra 5% on generics", link: "#", category: "Pharmacy" },
    { name: "Medicare Extra Help", savings: "Avg. $5,300/yr on drugs", link: "#", category: "Pharmacy" },
  ],
  technology: [
    { name: "Xfinity Internet Essentials", savings: "$30/mo off internet", link: "#", category: "Tech" },
    { name: "Lifeline Program", savings: "$9.25/mo phone credit", link: "#", category: "Tech" },
    { name: "Apple Senior Pricing", savings: "Education store access", link: "#", category: "Tech" },
  ],
  utilities: [
    { name: "LIHEAP Energy Assistance", savings: "Avg. $500/yr heating", link: "#", category: "Utilities" },
    { name: "Weatherization Assistance", savings: "Free home upgrades", link: "#", category: "Utilities" },
    { name: "State Utility Discount Programs", savings: "10–25% off bills", link: "#", category: "Utilities" },
  ],
};

const BENEFIT_PROGRAMS: Record<string, { name: string; description: string }[]> = {
  medicare: [
    { name: "Medicare Savings Programs", description: "Help paying Medicare premiums, deductibles, and copays." },
    { name: "SHIP Counseling", description: "Free State Health Insurance Assistance Program." },
  ],
  medicaid: [
    { name: "Dual Eligible Special Needs Plans", description: "Combined Medicare + Medicaid coverage." },
    { name: "HCBS Waivers", description: "Home and community-based services waiver programs." },
  ],
  snap: [
    { name: "Double Up Food Bucks", description: "Match your SNAP dollars at farmers markets." },
    { name: "Senior Farmers Market Nutrition Program", description: "Up to $50 in vouchers for fresh produce." },
  ],
  ssdi: [
    { name: "Medicare After 24 Months", description: "Automatic Medicare enrollment after 24 months on SSDI." },
    { name: "Work Incentives Planning", description: "Free benefits counseling for SSDI recipients." },
  ],
  ssi: [
    { name: "Automatic Medicaid Eligibility", description: "Most SSI recipients qualify for Medicaid automatically." },
    { name: "SNAP Automatic Eligibility", description: "SSI recipients may qualify for SNAP without separate review." },
  ],
  va: [
    { name: "VA Community Care Network", description: "See local doctors at VA expense." },
    { name: "Veterans Pension Program", description: "Additional income for low-income wartime vets." },
  ],
  pension: [
    { name: "Pension Counseling & Information Program", description: "Free legal assistance for pension disputes." },
    { name: "Pension Rights Center", description: "Advocate for full pension benefit recovery." },
  ],
};

const CALENDAR_TIPS = [
  { day: "Monday",    tip: "Goodwill 20% senior discount day – great for clothing & housewares." },
  { day: "Tuesday",   tip: "Albertsons / Safeway 10% senior savings day in most locations." },
  { day: "Wednesday", tip: "Kohl's 15% off for 60+ every Wednesday – stock up on essentials." },
  { day: "Thursday",  tip: "Check GoodRx for the week's best pharmacy prices before refills." },
  { day: "Friday",    tip: "Review AARP member deals newsletter for weekend travel offers." },
  { day: "Saturday",  tip: "Farmers market day – use Double Up Food Bucks if you're on SNAP." },
  { day: "Sunday",    tip: "Plan next week's grocery list around senior discount store days." },
];

const AGE_QUALIFIED: Record<string, string[]> = {
  "55-59": ["AARP Membership (50+)", "Many Retail Senior Discounts (55+)"],
  "60-64": ["AARP Membership", "Senior Farmers Market Nutrition Program (60+)", "National Park Access Pass"],
  "65-69": ["Medicare Part A & B", "Medicare Extra Help", "SSA Full Retirement Benefits (66-67)"],
  "70-74": ["Medicare Advantage Plans", "Increased Social Security Benefit (if delayed)", "AARP Premium Benefits"],
  "75-79": ["Medicare IRMAA Review", "Long-Term Care Planning Benefits", "Enhanced State Medicaid Options"],
  "80+":   ["Medicare Savings Programs Priority", "Medicaid Home Care Benefits", "Adult Protective Services Resources"],
};

// ─── Savings Calculator ───────────────────────────────────────────────────────

function calcMonthlySavings(data: FormData): number {
  let total = 0;
  data.benefits.forEach((b) => {
    const opt = BENEFIT_OPTIONS.find((o) => o.id === b);
    if (opt) total += opt.monthlySavings;
  });
  data.shopping.forEach((s) => {
    const opt = SHOPPING_OPTIONS.find((o) => o.id === s);
    if (opt) total += opt.monthlySavings;
  });
  // Age multiplier
  if (data.ageRange === "65-69" || data.ageRange === "70-74") total *= 1.1;
  if (data.ageRange === "75-79" || data.ageRange === "80+") total *= 1.15;
  return Math.round(total);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepDot({ step, current }: { step: number; current: number }) {
  const done = current > step;
  const active = current === step;
  return (
    <div className="flex items-center gap-1">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
          done
            ? "bg-[oklch(0.52_0.12_80)] border-[oklch(0.52_0.12_80)] text-white"
            : active
            ? "bg-white border-[oklch(0.52_0.12_80)] text-[oklch(0.52_0.12_80)]"
            : "bg-white border-[oklch(0.80_0.04_80)] text-[oklch(0.65_0.04_80)]"
        }`}
      >
        {done ? <CheckCircle2 size={18} /> : step}
      </div>
    </div>
  );
}

function CheckCard({
  id,
  label,
  emoji,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  emoji?: string;
  checked: boolean;
  onChange: (id: string) => void;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none ${
        checked
          ? "border-[oklch(0.52_0.12_80)] bg-[oklch(0.95_0.025_80)]"
          : "border-[oklch(0.88_0.02_80)] bg-white hover:border-[oklch(0.70_0.06_80)]"
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => onChange(id)}
        className="sr-only"
      />
      {emoji && <span className="text-2xl">{emoji}</span>}
      <span
        className={`font-medium text-sm ${
          checked ? "text-[oklch(0.32_0.06_60)]" : "text-[oklch(0.45_0.04_60)]"
        }`}
      >
        {label}
      </span>
      <span className="ml-auto">
        {checked ? (
          <CheckCircle2 size={18} className="text-[oklch(0.52_0.12_80)]" />
        ) : (
          <div className="w-[18px] h-[18px] rounded-full border-2 border-[oklch(0.80_0.04_80)]" />
        )}
      </span>
    </label>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SavingsBlueprint() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    ageRange: "",
    state: "",
    zip: "",
    benefits: [],
    shopping: [],
  });

  const toggleList = (key: "benefits" | "shopping", id: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(id)
        ? prev[key].filter((x) => x !== id)
        : [...prev[key], id],
    }));
  };

  const monthlySavings = calcMonthlySavings(form);
  const annualSavings = monthlySavings * 12;

  const recommendedPrograms = form.shopping.flatMap((s) => PROGRAMS[s] ?? []);
  const qualifiedBenefits = form.benefits.flatMap(
    (b) => BENEFIT_PROGRAMS[b] ?? []
  );
  const ageQualified = AGE_QUALIFIED[form.ageRange] ?? [];

  const canNext1 = form.ageRange && form.state && form.zip.length >= 5;
  const canNext2 = form.benefits.length > 0 || true; // optional
  const canSubmit = form.shopping.length > 0 || true; // optional

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(0.98 0.012 80)" }}
    >
      <Navbar />

      <PageHero
        title="My Savings Blueprint"
        description="Answer a few quick questions and we'll build a personalized savings plan — showing you exactly where you can save money every single month."
      />

      {/* ── Progress bar ── */}
      {!submitted && (
        <div className="max-w-2xl mx-auto px-4 pt-10 pb-2 w-full">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <StepDot step={s} current={step} />
                {i < 2 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all duration-500 ${
                      step > s
                        ? "bg-[oklch(0.52_0.12_80)]"
                        : "bg-[oklch(0.88_0.02_80)]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-[oklch(0.55_0.04_60)] px-0.5">
            <span>Personal Info</span>
            <span className="ml-4">Current Benefits</span>
            <span>Shopping Habits</span>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-2xl mx-auto px-4 pb-20 w-full">
        {/* ──────────────────── STEP 1 ──────────────────── */}
        {!submitted && step === 1 && (
          <div className="mt-8 bg-white rounded-2xl shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.93 0.04 80)" }}
              >
                <Target size={20} style={{ color: "oklch(0.45 0.10 55)" }} />
              </div>
              <h2
                className="text-2xl font-bold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.28 0.04 55)",
                }}
              >
                Personal Information
              </h2>
            </div>

            <div className="space-y-5">
              {/* Age Range */}
              <div>
                <label
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "oklch(0.38 0.04 55)" }}
                >
                  Age Range *
                </label>
                <select
                  value={form.ageRange}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, ageRange: e.target.value }))
                  }
                  className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.52_0.12_80)] transition-colors"
                  style={{
                    borderColor: "oklch(0.88 0.02 80)",
                    color: "oklch(0.30 0.04 55)",
                    backgroundColor: "oklch(0.99 0.005 80)",
                  }}
                >
                  <option value="">Select your age range…</option>
                  {AGE_RANGES.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div>
                <label
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "oklch(0.38 0.04 55)" }}
                >
                  State *
                </label>
                <select
                  value={form.state}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, state: e.target.value }))
                  }
                  className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.52_0.12_80)] transition-colors"
                  style={{
                    borderColor: "oklch(0.88 0.02 80)",
                    color: "oklch(0.30 0.04 55)",
                    backgroundColor: "oklch(0.99 0.005 80)",
                  }}
                >
                  <option value="">Select your state…</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* ZIP */}
              <div>
                <label
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "oklch(0.38 0.04 55)" }}
                >
                  ZIP Code *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="e.g. 90210"
                  value={form.zip}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      zip: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.52_0.12_80)] transition-colors"
                  style={{
                    borderColor: "oklch(0.88 0.02 80)",
                    color: "oklch(0.30 0.04 55)",
                    backgroundColor: "oklch(0.99 0.005 80)",
                  }}
                />
              </div>
            </div>

            <button
              disabled={!canNext1}
              onClick={() => setStep(2)}
              className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "oklch(0.48 0.12 55)" }}
            >
              Continue <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ──────────────────── STEP 2 ──────────────────── */}
        {!submitted && step === 2 && (
          <div className="mt-8 bg-white rounded-2xl shadow-md p-8">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.93 0.04 80)" }}
              >
                <ShieldCheck size={20} style={{ color: "oklch(0.45 0.10 55)" }} />
              </div>
              <h2
                className="text-2xl font-bold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.28 0.04 55)",
                }}
              >
                Current Benefits
              </h2>
            </div>
            <p className="text-sm mb-6" style={{ color: "oklch(0.52 0.04 60)" }}>
              Select all benefits you currently receive. This helps us find
              programs you may be missing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BENEFIT_OPTIONS.map((b) => (
                <CheckCard
                  key={b.id}
                  id={`benefit-${b.id}`}
                  label={b.label}
                  checked={form.benefits.includes(b.id)}
                  onChange={() => toggleList("benefits", b.id)}
                />
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold border-2 transition-all duration-200"
                style={{
                  borderColor: "oklch(0.80 0.04 80)",
                  color: "oklch(0.45 0.06 60)",
                }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all duration-200"
                style={{ backgroundColor: "oklch(0.48 0.12 55)" }}
              >
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ──────────────────── STEP 3 ──────────────────── */}
        {!submitted && step === 3 && (
          <div className="mt-8 bg-white rounded-2xl shadow-md p-8">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.93 0.04 80)" }}
              >
                <ShoppingCart size={20} style={{ color: "oklch(0.45 0.10 55)" }} />
              </div>
              <h2
                className="text-2xl font-bold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.28 0.04 55)",
                }}
              >
                Shopping Habits
              </h2>
            </div>
            <p className="text-sm mb-6" style={{ color: "oklch(0.52 0.04 60)" }}>
              Where do you typically spend money? Select all that apply to tailor
              your discount recommendations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SHOPPING_OPTIONS.map((s) => (
                <CheckCard
                  key={s.id}
                  id={`shop-${s.id}`}
                  label={s.label}
                  emoji={s.icon}
                  checked={form.shopping.includes(s.id)}
                  onChange={() => toggleList("shopping", s.id)}
                />
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold border-2 transition-all duration-200"
                style={{
                  borderColor: "oklch(0.80 0.04 80)",
                  color: "oklch(0.45 0.06 60)",
                }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setSubmitted(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all duration-200"
                style={{ backgroundColor: "oklch(0.48 0.12 55)" }}
              >
                <Calculator size={18} /> Build My Blueprint
              </button>
            </div>
          </div>
        )}

        {/* ──────────────────── RESULTS ──────────────────── */}
        {submitted && (
          <div className="mt-8 space-y-8">
            {/* ── Header savings summary ── */}
            <div
              className="rounded-2xl p-8 text-white relative overflow-hidden"
              style={{ backgroundColor: "oklch(0.22 0.02 50)" }}
            >
              {/* Decorative rings */}
              <div
                className="absolute -right-12 -top-12 w-52 h-52 rounded-full opacity-10"
                style={{ border: "2px solid white" }}
              />
              <div
                className="absolute -right-4 -top-4 w-36 h-36 rounded-full opacity-10"
                style={{ border: "2px solid white" }}
              />

              <div className="relative z-10">
                <p className="text-sm opacity-70 mb-1 uppercase tracking-widest font-medium">
                  Your Personalized
                </p>
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Savings Blueprint
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign size={18} className="opacity-70" />
                      <span className="text-sm opacity-70">Monthly Savings</span>
                    </div>
                    <p className="text-4xl font-black">
                      ${monthlySavings.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp size={18} className="opacity-70" />
                      <span className="text-sm opacity-70">Annual Savings</span>
                    </div>
                    <p className="text-4xl font-black">
                      ${annualSavings.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-white border-opacity-20 flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-white bg-opacity-15">
                    {form.ageRange} years old
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white bg-opacity-15">
                    {form.state}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white bg-opacity-15">
                    {form.benefits.length} benefits active
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white bg-opacity-15">
                    {form.shopping.length} spending categories
                  </span>
                </div>
              </div>
            </div>

            {/* ── Recommended programs ── */}
            {recommendedPrograms.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Target size={20} style={{ color: "oklch(0.48 0.12 55)" }} />
                  <h3
                    className="text-xl font-bold"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "oklch(0.28 0.04 55)",
                    }}
                  >
                    Recommended Discount Programs
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recommendedPrograms.map((prog, i) => (
                    <a
                      key={i}
                      href={prog.link}
                      className="group flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md"
                      style={{ borderColor: "oklch(0.92 0.02 80)" }}
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0"
                        style={{ color: "oklch(0.52 0.12 80)" }}
                      />
                      <div>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "oklch(0.30 0.04 55)" }}
                        >
                          {prog.name}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "oklch(0.55 0.06 70)" }}
                        >
                          {prog.savings}
                        </p>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full mt-1.5 inline-block"
                          style={{
                            backgroundColor: "oklch(0.94 0.03 80)",
                            color: "oklch(0.42 0.08 60)",
                          }}
                        >
                          {prog.category}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* ── Benefits you may qualify for ── */}
            {(qualifiedBenefits.length > 0 || ageQualified.length > 0) && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-2 mb-5">
                  <ShieldCheck size={20} style={{ color: "oklch(0.48 0.12 55)" }} />
                  <h3
                    className="text-xl font-bold"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "oklch(0.28 0.04 55)",
                    }}
                  >
                    Benefits You May Qualify For
                  </h3>
                </div>

                {ageQualified.length > 0 && (
                  <div className="mb-5">
                    <p
                      className="text-xs font-bold uppercase tracking-wider mb-3"
                      style={{ color: "oklch(0.55 0.06 60)" }}
                    >
                      Based on Your Age ({form.ageRange})
                    </p>
                    <div className="space-y-2">
                      {ageQualified.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm"
                          style={{ color: "oklch(0.35 0.04 55)" }}
                        >
                          <CheckCircle2
                            size={15}
                            style={{ color: "oklch(0.55 0.12 80)" }}
                          />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {qualifiedBenefits.length > 0 && (
                  <div>
                    <p
                      className="text-xs font-bold uppercase tracking-wider mb-3"
                      style={{ color: "oklch(0.55 0.06 60)" }}
                    >
                      Based on Your Current Benefits
                    </p>
                    <div className="space-y-3">
                      {qualifiedBenefits.map((item, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl"
                          style={{ backgroundColor: "oklch(0.96 0.015 80)" }}
                        >
                          <p
                            className="font-semibold text-sm"
                            style={{ color: "oklch(0.30 0.04 55)" }}
                          >
                            {item.name}
                          </p>
                          <p
                            className="text-xs mt-0.5"
                            style={{ color: "oklch(0.52 0.04 60)" }}
                          >
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Savings Calendar ── */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-5">
                <Calendar size={20} style={{ color: "oklch(0.48 0.12 55)" }} />
                <h3
                  className="text-xl font-bold"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "oklch(0.28 0.04 55)",
                  }}
                >
                  Your Savings Calendar
                </h3>
              </div>
              <p
                className="text-sm mb-5"
                style={{ color: "oklch(0.52 0.04 60)" }}
              >
                A weekly savings routine built around your habits:
              </p>
              <div className="space-y-3">
                {CALENDAR_TIPS.map((tip) => (
                  <div
                    key={tip.day}
                    className="flex items-start gap-4 p-3 rounded-xl"
                    style={{ backgroundColor: "oklch(0.97 0.010 80)" }}
                  >
                    <span
                      className="shrink-0 w-20 text-xs font-bold uppercase tracking-wider pt-0.5"
                      style={{ color: "oklch(0.48 0.10 60)" }}
                    >
                      {tip.day}
                    </span>
                    <p
                      className="text-sm"
                      style={{ color: "oklch(0.35 0.04 55)" }}
                    >
                      {tip.tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CTA bar ── */}
            <div
              className="rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4"
              style={{ backgroundColor: "oklch(0.93 0.04 80)" }}
            >
              <div className="flex-1">
                <h4
                  className="font-bold text-lg"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "oklch(0.28 0.04 55)",
                  }}
                >
                  Have deeper questions?
                </h4>
                <p className="text-sm mt-1" style={{ color: "oklch(0.45 0.04 60)" }}>
                  Our AI advisor can dig into your specific situation and find
                  programs you might have missed.
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <a
                  href="/ask-claude"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.48 0.12 55)" }}
                >
                  Ask the AI Advisor <ArrowRight size={16} />
                </a>
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 transition-all duration-200 hover:bg-white"
                  style={{
                    borderColor: "oklch(0.72 0.06 70)",
                    color: "oklch(0.40 0.06 60)",
                  }}
                >
                  <Printer size={16} /> Print / Save Blueprint
                </button>
              </div>
            </div>

            {/* Start over */}
            <div className="text-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setForm({ ageRange: "", state: "", zip: "", benefits: [], shopping: [] });
                }}
                className="text-sm underline underline-offset-4"
                style={{ color: "oklch(0.52 0.08 60)" }}
              >
                Start over with different answers
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
