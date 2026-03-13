import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    ExternalLink,
  Star,
  Clipboard,
  MapPin,
  Info,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  ageRange: string;
  state: string;
  zip: string;
  benefits: string[];
  shopping: string[];
}

interface Program {
  name: string;
  savings: string;
  link: string;
  category: string;
}

interface BenefitProgram {
  name: string;
  description: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const US_STATES: string[] = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
  "Washington", "West Virginia", "Wisconsin", "Wyoming",
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
  { id: "medicare",  label: "Medicare",           monthlySavings: 85 },
  { id: "medicaid",  label: "Medicaid",           monthlySavings: 120 },
  { id: "snap",      label: "SNAP (Food Stamps)", monthlySavings: 65 },
  { id: "ssdi",      label: "SSDI",               monthlySavings: 40 },
  { id: "ssi",       label: "SSI",                monthlySavings: 35 },
  { id: "va",        label: "VA Benefits",        monthlySavings: 95 },
  { id: "pension",   label: "Pension",            monthlySavings: 20 },
];

const SHOPPING_OPTIONS = [
  { id: "grocery",    label: "Grocery Stores",     icon: "🛒", monthlySavings: 48 },
  { id: "restaurant", label: "Restaurants",         icon: "🍽️", monthlySavings: 32 },
  { id: "retail",     label: "Retail / Department", icon: "🏬", monthlySavings: 55 },
  { id: "travel",     label: "Travel",              icon: "✈️", monthlySavings: 90 },
  { id: "pharmacy",   label: "Pharmacy",            icon: "💊", monthlySavings: 42 },
  { id: "technology", label: "Technology",          icon: "💻", monthlySavings: 28 },
  { id: "utilities",  label: "Utilities",           icon: "⚡", monthlySavings: 38 },
];

const PROGRAMS: Record<string, Program[]> = {
  grocery: [
    { name: "AARP Grocery Savings",    savings: "Up to 15% off",           link: "#", category: "Grocery" },
    { name: "Kroger Senior Discount",  savings: "10% off Wednesdays",      link: "#", category: "Grocery" },
    { name: "Albertsons Senior Day",   savings: "10% off Tuesdays",        link: "#", category: "Grocery" },
  ],
  restaurant: [
    { name: "Denny's 55+ Menu",         savings: "Up to 20% off",          link: "#", category: "Dining" },
    { name: "IHOP Senior Discount",     savings: "10% off any time",       link: "#", category: "Dining" },
    { name: "McDonald's Senior Coffee", savings: "Free coffee 60+",        link: "#", category: "Dining" },
  ],
  retail: [
    { name: "Kohl's Senior Discount",  savings: "15% off Wednesdays",      link: "#", category: "Retail" },
    { name: "Goodwill Senior Day",     savings: "20% off Mondays",         link: "#", category: "Retail" },
    { name: "Jo-Ann Fabrics Senior",   savings: "15% off every day",       link: "#", category: "Retail" },
  ],
  travel: [
    { name: "AARP Travel Center",         savings: "Up to 30% off hotels", link: "#", category: "Travel" },
    { name: "Amtrak Senior Fares",        savings: "15% off rail travel",  link: "#", category: "Travel" },
    { name: "National Parks Senior Pass", savings: "Lifetime entry $80",   link: "#", category: "Travel" },
  ],
  pharmacy: [
    { name: "GoodRx Gold Senior",    savings: "Up to 80% on Rx",           link: "#", category: "Pharmacy" },
    { name: "Walgreens myWalgreens", savings: "Extra 5% on generics",      link: "#", category: "Pharmacy" },
    { name: "Medicare Extra Help",   savings: "Avg. $5,300/yr on drugs",   link: "#", category: "Pharmacy" },
  ],
  technology: [
    { name: "Xfinity Internet Essentials", savings: "$30/mo off internet",  link: "#", category: "Tech" },
    { name: "Lifeline Program",            savings: "$9.25/mo phone credit", link: "#", category: "Tech" },
    { name: "Apple Education Pricing",     savings: "Discounted devices",    link: "#", category: "Tech" },
  ],
  utilities: [
    { name: "LIHEAP Energy Assistance",       savings: "Avg. $500/yr heating", link: "#", category: "Utilities" },
    { name: "Weatherization Assistance",      savings: "Free home upgrades",   link: "#", category: "Utilities" },
    { name: "State Utility Discount Programs",savings: "10–25% off bills",     link: "#", category: "Utilities" },
  ],
};

const BENEFIT_PROGRAMS: Record<string, BenefitProgram[]> = {
  medicare: [
    { name: "Medicare Savings Programs", description: "Help paying Medicare premiums, deductibles, and copays." },
    { name: "SHIP Counseling",           description: "Free State Health Insurance Assistance Program." },
  ],
  medicaid: [
    { name: "Dual Eligible Special Needs Plans", description: "Combined Medicare + Medicaid coverage." },
    { name: "HCBS Waivers",                      description: "Home and community-based services waiver programs." },
  ],
  snap: [
    { name: "Double Up Food Bucks",                    description: "Match your SNAP dollars at farmers markets." },
    { name: "Senior Farmers Market Nutrition Program", description: "Up to $50 in vouchers for fresh produce." },
  ],
  ssdi: [
    { name: "Medicare After 24 Months", description: "Automatic Medicare enrollment after 24 months on SSDI." },
    { name: "Work Incentives Planning", description: "Free benefits counseling for SSDI recipients." },
  ],
  ssi: [
    { name: "Automatic Medicaid Eligibility", description: "Most SSI recipients qualify for Medicaid automatically." },
    { name: "SNAP Automatic Eligibility",     description: "SSI recipients may qualify for SNAP without separate review." },
  ],
  va: [
    { name: "VA Community Care Network", description: "See local doctors at VA expense." },
    { name: "Veterans Pension Program",  description: "Additional income for low-income wartime vets." },
  ],
  pension: [
    { name: "Pension Counseling & Information Program", description: "Free legal assistance for pension disputes." },
    { name: "Pension Rights Center",                   description: "Advocate for full pension benefit recovery." },
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
  "65-69": ["Medicare Part A & B", "Medicare Extra Help", "SSA Full Retirement Benefits (66–67)"],
  "70-74": ["Medicare Advantage Plans", "Increased Social Security Benefit (if delayed)", "AARP Premium Benefits"],
  "75-79": ["Medicare Savings Programs Review", "Long-Term Care Planning Benefits", "Enhanced State Medicaid Options"],
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
  if (data.ageRange === "65-69" || data.ageRange === "70-74") total = total * 1.1;
  if (data.ageRange === "75-79" || data.ageRange === "80+")   total = total * 1.15;
  return Math.round(total);
}

// ─── StepDots ─────────────────────────────────────────────────────────────────

function StepDots({ current }: { current: number }) {
  const labels = ["Personal Info", "Current Benefits", "Shopping Habits"];
  return (
    <div className="max-w-2xl mx-auto px-4 pt-10 pb-2 w-full">
      <div className="flex items-center justify-between mb-2">
        {[1, 2, 3].map((s, i) => {
          const done   = current > s;
          const active = current === s;
          return (
            <div key={s} className="flex items-center flex-1">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300"
                style={{
                  backgroundColor: done ? "oklch(0.52 0.12 80)" : "white",
                  borderColor:     done || active ? "oklch(0.52 0.12 80)" : "oklch(0.80 0.04 80)",
                  color:           done ? "white" : active ? "oklch(0.52 0.12 80)" : "oklch(0.65 0.04 80)",
                }}
              >
                {done ? <CheckCircle2 size={18} /> : s}
              </div>
              {i < 2 && (
                <div
                  className="flex-1 h-1 mx-2 rounded-full transition-all duration-500"
                  style={{ backgroundColor: current > s ? "oklch(0.52 0.12 80)" : "oklch(0.88 0.02 80)" }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs px-0.5" style={{ color: "oklch(0.55 0.04 60)" }}>
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

// ─── CheckCard ────────────────────────────────────────────────────────────────

interface CheckCardProps {
  id: string;
  label: string;
  emoji?: string;
  checked: boolean;
  onChange: () => void;
}

function CheckCard({ id, label, emoji, checked, onChange }: CheckCardProps) {
  return (
    <div
      className="flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none"
      style={{
        borderColor:     checked ? "oklch(0.52 0.12 80)" : "oklch(0.88 0.02 80)",
        backgroundColor: checked ? "oklch(0.95 0.025 80)" : "white",
      }}
      onClick={onChange}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onChange();
        }
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        tabIndex={-1}
      />
      {emoji && (
        <span className="text-2xl leading-none" aria-hidden="true">{emoji}</span>
      )}
      <span
        className="font-medium text-sm flex-1"
        style={{ color: checked ? "oklch(0.32 0.06 60)" : "oklch(0.45 0.04 60)" }}
      >
        {label}
      </span>
      {checked ? (
        <CheckCircle2
          size={18}
          style={{ color: "oklch(0.52 0.12 80)", flexShrink: 0 }}
        />
      ) : (
        <div
          className="w-[18px] h-[18px] rounded-full border-2 shrink-0"
          style={{ borderColor: "oklch(0.80 0.04 80)" }}
        />
      )}
    </div>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

function SectionHeader({ icon, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: "oklch(0.93 0.04 80)" }}
        >
          {icon}
        </div>
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.28 0.04 55)" }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-sm pl-[52px]" style={{ color: "oklch(0.52 0.04 60)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── NavButtons ───────────────────────────────────────────────────────────────

interface NavButtonsProps {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextIcon?: React.ReactNode;
  nextDisabled?: boolean;
}

function NavButtons({ onBack, onNext, nextLabel = "Continue", nextIcon, nextDisabled = false }: NavButtonsProps) {
  return (
    <div className="flex gap-3 mt-8">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold border-2 transition-all duration-200"
        style={{ borderColor: "oklch(0.80 0.04 80)", color: "oklch(0.45 0.06 60)" }}
      >
        <ArrowLeft size={16} />
        Back
      </button>
      <button
        type="button"
        disabled={nextDisabled}
        onClick={onNext}
        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: "oklch(0.48 0.12 55)" }}
      >
        {nextIcon}
        {nextLabel}
        {!nextIcon && <ArrowRight size={18} />}
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SavingsBlueprint() {
  const [step, setStep]           = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [form, setForm]           = useState<FormData>({
    ageRange: "",
    state:    "",
    zip:      "",
    benefits: [],
    shopping: [],
  });

  function toggleItem(key: "benefits" | "shopping", id: string): void {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(id)
        ? prev[key].filter((x) => x !== id)
        : [...prev[key], id],
    }));
  }

  function handleReset(): void {
    setSubmitted(false);
    setStep(1);
    setForm({ ageRange: "", state: "", zip: "", benefits: [], shopping: [] });
  }

  const monthlySavings         = calcMonthlySavings(form);
  const annualSavings          = monthlySavings * 12;
  const recommendedPrograms    = form.shopping.flatMap((s) => PROGRAMS[s] ?? []) as Program[];
  const qualifiedBenefits      = form.benefits.flatMap((b) => BENEFIT_PROGRAMS[b] ?? []) as BenefitProgram[];
  const ageQualified           = (AGE_QUALIFIED[form.ageRange] ?? []) as string[];
  const canProceedStep1        = form.ageRange !== "" && form.state !== "" && form.zip.length >= 5;

  const selectClass = "w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors appearance-none";
  const selectStyle: React.CSSProperties = {
    borderColor:     "oklch(0.88 0.02 80)",
    color:           "oklch(0.30 0.04 55)",
    backgroundColor: "oklch(0.99 0.005 80)",
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "oklch(0.98 0.012 80)" }}>
      <Navbar />

      {/* ══════════════════════════════════════
          INLINE HERO
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: "oklch(0.22 0.02 50)" }}>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator size={34} style={{ color: "oklch(0.78 0.08 75)" }} />
            <h1
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              My Savings Blueprint
            </h1>
          </div>
          <p
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.78 0.04 70)" }}
          >
            Answer a few quick questions and we'll build a personalized savings plan —
            showing you exactly where you can save money every single month.
          </p>
        </div>
      </section>

      {/* Step progress dots */}
      {!submitted && <StepDots current={step} />}

      <main className="flex-1 max-w-2xl mx-auto px-4 pb-20 w-full">

        {/* ══════════════════════════════════════
            STEP 1 — Personal Info
        ══════════════════════════════════════ */}
        {!submitted && step === 1 && (
          <div className="mt-8 bg-white rounded-2xl shadow-md p-8">
            <SectionHeader
              icon={<Target size={20} style={{ color: "oklch(0.45 0.10 55)" }} />}
              title="Personal Information"
            />

            {/* Age Range */}
            <div className="mb-5">
              <label
                htmlFor="field-age"
                className="block text-sm font-semibold mb-1.5"
                style={{ color: "oklch(0.38 0.04 55)" }}
              >
                Age Range <span aria-hidden="true" style={{ color: "oklch(0.55 0.12 40)" }}>*</span>
              </label>
              <select
                id="field-age"
                value={form.ageRange}
                onChange={(e) => setForm((p) => ({ ...p, ageRange: e.target.value }))}
                className={selectClass}
                style={selectStyle}
              >
                <option value="">Select your age range…</option>
                {AGE_RANGES.map((a) => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
            </div>

            {/* State */}
            <div className="mb-5">
              <label
                htmlFor="field-state"
                className="block text-sm font-semibold mb-1.5"
                style={{ color: "oklch(0.38 0.04 55)" }}
              >
                State <span aria-hidden="true" style={{ color: "oklch(0.55 0.12 40)" }}>*</span>
              </label>
              <select
                id="field-state"
                value={form.state}
                onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
                className={selectClass}
                style={selectStyle}
              >
                <option value="">Select your state…</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* ZIP Code */}
            <div className="mb-5">
              <label
                htmlFor="field-zip"
                className="block text-sm font-semibold mb-1.5"
                style={{ color: "oklch(0.38 0.04 55)" }}
              >
                ZIP Code <span aria-hidden="true" style={{ color: "oklch(0.55 0.12 40)" }}>*</span>
              </label>
              <input
                id="field-zip"
                type="text"
                inputMode="numeric"
                maxLength={5}
                placeholder="e.g. 90210"
                value={form.zip}
                onChange={(e) => setForm((p) => ({ ...p, zip: e.target.value.replace(/\D/g, "") }))}
                className={selectClass}
                style={selectStyle}
              />
            </div>

            <button
              type="button"
              disabled={!canProceedStep1}
              onClick={() => setStep(2)}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "oklch(0.48 0.12 55)" }}
            >
              Continue <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════
            STEP 2 — Current Benefits
        ══════════════════════════════════════ */}
        {!submitted && step === 2 && (
          <div className="mt-8 bg-white rounded-2xl shadow-md p-8">
            <SectionHeader
              icon={<ShieldCheck size={20} style={{ color: "oklch(0.45 0.10 55)" }} />}
              title="Current Benefits"
              subtitle="Select all benefits you currently receive. This helps us find programs you may be missing."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BENEFIT_OPTIONS.map((b) => (
                <CheckCard
                  key={b.id}
                  id={`benefit-${b.id}`}
                  label={b.label}
                  checked={form.benefits.includes(b.id)}
                  onChange={() => toggleItem("benefits", b.id)}
                />
              ))}
            </div>

            <NavButtons
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          </div>
        )}

        {/* ══════════════════════════════════════
            STEP 3 — Shopping Habits
        ══════════════════════════════════════ */}
        {!submitted && step === 3 && (
          <div className="mt-8 bg-white rounded-2xl shadow-md p-8">
            <SectionHeader
              icon={<ShoppingCart size={20} style={{ color: "oklch(0.45 0.10 55)" }} />}
              title="Shopping Habits"
              subtitle="Where do you typically spend money? Select all that apply to tailor your discount recommendations."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SHOPPING_OPTIONS.map((s) => (
                <CheckCard
                  key={s.id}
                  id={`shop-${s.id}`}
                  label={s.label}
                  emoji={s.icon}
                  checked={form.shopping.includes(s.id)}
                  onChange={() => toggleItem("shopping", s.id)}
                />
              ))}
            </div>

            <NavButtons
              onBack={() => setStep(2)}
              onNext={() => setSubmitted(true)}
              nextLabel="Build My Blueprint"
              nextIcon={<Calculator size={18} />}
            />
          </div>
        )}

        {/* ══════════════════════════════════════
            RESULTS
        ══════════════════════════════════════ */}
        {submitted && (
          <div className="mt-8 space-y-8">

            {/* Savings hero card */}
            <div
              className="rounded-2xl p-8 text-white relative overflow-hidden"
              style={{ backgroundColor: "oklch(0.22 0.02 50)" }}
            >
              <div
                className="absolute rounded-full pointer-events-none"
                style={{ right: "-3rem", top: "-3rem", width: "13rem", height: "13rem", border: "2px solid rgba(255,255,255,0.10)" }}
              />
              <div
                className="absolute rounded-full pointer-events-none"
                style={{ right: "-1rem", top: "-1rem", width: "9rem", height: "9rem", border: "2px solid rgba(255,255,255,0.10)" }}
              />

              <div className="relative z-10">
                <p
                  className="text-xs mb-1 uppercase tracking-widest font-medium"
                  style={{ color: "rgba(255,255,255,0.60)" }}
                >
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
                    <div className="flex items-center gap-1.5 mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>
                      <DollarSign size={15} />
                      <span className="text-xs">Monthly Savings</span>
                    </div>
                    <p className="text-4xl font-black">${monthlySavings.toLocaleString()}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>
                      <TrendingUp size={15} />
                      <span className="text-xs">Annual Savings</span>
                    </div>
                    <p className="text-4xl font-black">${annualSavings.toLocaleString()}</p>
                  </div>
                </div>

                <div
                  className="mt-5 pt-5 flex flex-wrap gap-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.20)" }}
                >
                  {[
                    `${form.ageRange} years old`,
                    form.state,
                    `${form.benefits.length} benefit${form.benefits.length !== 1 ? "s" : ""} active`,
                    `${form.shopping.length} spending categor${form.shopping.length !== 1 ? "ies" : "y"}`,
                  ].map((chip) => (
                    <span
                      key={chip}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended programs */}
            {recommendedPrograms.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Target size={20} style={{ color: "oklch(0.48 0.12 55)" }} />
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.28 0.04 55)" }}
                  >
                    Recommended Discount Programs
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recommendedPrograms.map((prog, i) => (
                    <a
                      key={`prog-${i}`}
                      href={prog.link}
                      className="flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md no-underline"
                      style={{ borderColor: "oklch(0.92 0.02 80)" }}
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0"
                        style={{ color: "oklch(0.52 0.12 80)" }}
                      />
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "oklch(0.30 0.04 55)" }}>
                          {prog.name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.06 70)" }}>
                          {prog.savings}
                        </p>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full mt-1.5 inline-block"
                          style={{ backgroundColor: "oklch(0.94 0.03 80)", color: "oklch(0.42 0.08 60)" }}
                        >
                          {prog.category}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits you may qualify for */}
            {(qualifiedBenefits.length > 0 || ageQualified.length > 0) && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-2 mb-5">
                  <ShieldCheck size={20} style={{ color: "oklch(0.48 0.12 55)" }} />
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.28 0.04 55)" }}
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
                        <div key={`age-${i}`} className="flex items-center gap-2 text-sm" style={{ color: "oklch(0.35 0.04 55)" }}>
                          <CheckCircle2 size={15} style={{ color: "oklch(0.55 0.12 80)" }} />
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
                          key={`bp-${i}`}
                          className="p-3 rounded-xl"
                          style={{ backgroundColor: "oklch(0.96 0.015 80)" }}
                        >
                          <p className="font-semibold text-sm" style={{ color: "oklch(0.30 0.04 55)" }}>
                            {item.name}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: "oklch(0.52 0.04 60)" }}>
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Savings Calendar */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={20} style={{ color: "oklch(0.48 0.12 55)" }} />
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.28 0.04 55)" }}
                >
                  Your Savings Calendar
                </h3>
              </div>
              <p className="text-sm mb-5" style={{ color: "oklch(0.52 0.04 60)" }}>
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
                      className="shrink-0 w-24 text-xs font-bold uppercase tracking-wider pt-0.5"
                      style={{ color: "oklch(0.48 0.10 60)" }}
                    >
                      {tip.day}
                    </span>
                    <p className="text-sm" style={{ color: "oklch(0.35 0.04 55)" }}>
                      {tip.tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA bar */}
            <div
              className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
              style={{ backgroundColor: "oklch(0.93 0.04 80)" }}
            >
              <div className="flex-1">
                <h4
                  className="font-bold text-lg"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.28 0.04 55)" }}
                >
                  Have deeper questions?
                </h4>
                <p className="text-sm mt-1" style={{ color: "oklch(0.45 0.04 60)" }}>
                  Our AI advisor can dig into your specific situation and find programs you might have missed.
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-auto shrink-0">
                <Link
                  href="/ask-claude"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 no-underline"
                  style={{ backgroundColor: "oklch(0.48 0.12 55)" }}
                >
                  Ask the AI Advisor <ArrowRight size={16} />
                </Link>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 transition-all duration-200 hover:bg-white"
                  style={{ borderColor: "oklch(0.72 0.06 70)", color: "oklch(0.40 0.06 60)" }}
                >
                  <Printer size={16} />
                  Print / Save Blueprint
                </button>
              </div>
            </div>


                          {/* ══════════════════════════════════════
                 LIFEMART EXCLUSIVE SAVINGS
              ══════════════════════════════════════ */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Star size={20} style={{ color: "oklch(0.48 0.12 55)" }} />
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.28 0.04 55)" }}
                  >
                    LifeMart Exclusive Savings
                  </h3>
                </div>
                <p className="text-sm mb-4" style={{ color: "oklch(0.52 0.04 60)" }}>
                  As a HealthCare Select Benefits Hub member, you also have access to LifeMart by Care.com — a members-only platform with 19,000+ savings opportunities from 1,300+ trusted brands.
                </p>
                <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "oklch(0.95 0.03 200)" }}>
                  <div className="flex items-start gap-2">
                    <Info size={16} className="mt-0.5 shrink-0" style={{ color: "oklch(0.40 0.12 200)" }} />
                    <p className="text-xs" style={{ color: "oklch(0.35 0.08 200)" }}>
                      <strong>How to access LifeMart:</strong> Visit{" "}
                      <a href="https://www.care.com/lifemart/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">care.com/lifemart</a>{" "}
                      and sign up directly, or check if your employer offers it as a free benefit through your HR portal. Many professional associations and unions also provide access.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {[
                    { name: "Priceline.com", discount: "Up to 40% off hotels & flights", category: "Travel" },
                    { name: "Restaurant.com", discount: "Up to 80% off dining", category: "Dining" },
                    { name: "Ticketsatwork.com", discount: "Up to 50% off events", category: "Entertainment" },
                    { name: "Best Buy", discount: "15% off + free shipping", category: "Electronics" },
                    { name: "Globalfit Gym Network", discount: "Discounted gym memberships", category: "Health" },
                    { name: "Liberty Mutual", discount: "Exclusive insurance rates", category: "Financial" },
                  ].map((prog, i) => (
                    <a
                      key={`lm-${i}`}
                      href="https://www.care.com/lifemart/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md no-underline"
                      style={{ borderColor: "oklch(0.92 0.02 80)" }}
                    >
                      <Star
                        size={18}
                        className="mt-0.5 shrink-0"
                        style={{ color: "oklch(0.47 0.08 185)" }}
                      />
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "oklch(0.30 0.04 55)" }}>
                          {prog.name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.06 70)" }}>
                          {prog.discount}
                        </p>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full mt-1.5 inline-block"
                          style={{ backgroundColor: "oklch(0.96 0.03 42)", color: "oklch(0.45 0.13 42)" }}
                        >
                          {prog.category}
                        </span>
                      </div>
                      <ExternalLink size={14} className="ml-auto mt-1 shrink-0" style={{ color: "oklch(0.65 0.04 60)" }} />
                    </a>
                  ))}
                </div>
                <a
                  href="https://www.care.com/lifemart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 no-underline"
                  style={{ backgroundColor: "oklch(0.45 0.13 42)" }}
                >
                  Explore All 19,000+ LifeMart Savings <ExternalLink size={16} />
                </a>
              </div>

              {/* ══════════════════════════════════════
                 HOW TO ACCESS YOUR SAVINGS
              ══════════════════════════════════════ */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clipboard size={20} style={{ color: "oklch(0.48 0.12 55)" }} />
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.28 0.04 55)" }}
                  >
                    How to Access Your Savings
                  </h3>
                </div>
                <p className="text-sm mb-5" style={{ color: "oklch(0.52 0.04 60)" }}>
                  Follow these step-by-step instructions to start saving today:
                </p>
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "oklch(0.97 0.010 80)" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold" style={{ backgroundColor: "oklch(0.48 0.12 55)" }}>1</div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "oklch(0.30 0.04 55)" }}>Print Your Coupon Checklist</p>
                        <p className="text-xs mt-1" style={{ color: "oklch(0.52 0.04 60)" }}>
                          Click the "Print / Save Blueprint" button above to print this entire savings plan. Keep it on your fridge or in your wallet for easy reference when shopping.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "oklch(0.97 0.010 80)" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold" style={{ backgroundColor: "oklch(0.48 0.12 55)" }}>2</div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "oklch(0.30 0.04 55)" }}>Claim Your Store Discounts</p>
                        <p className="text-xs mt-1" style={{ color: "oklch(0.52 0.04 60)" }}>
                          Visit each recommended store on their designated senior discount day (see the Savings Calendar above). Simply show your ID at checkout — most stores accept a driver's license or state ID as proof of age. No coupon needed for age-based discounts.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "oklch(0.97 0.010 80)" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold" style={{ backgroundColor: "oklch(0.48 0.12 55)" }}>3</div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "oklch(0.30 0.04 55)" }}>Print Coupons from Our Coupons Page</p>
                        <p className="text-xs mt-1" style={{ color: "oklch(0.52 0.04 60)" }}>
                          Visit our{" "}
                          <Link href="/coupons" className="underline font-semibold" style={{ color: "oklch(0.48 0.12 55)" }}>Coupons page</Link>{" "}
                          to find printable coupons for grocery stores, pharmacies, and retail shops. Print them before your next shopping trip to stack savings on top of your senior discounts.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 4 */}
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "oklch(0.97 0.010 80)" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold" style={{ backgroundColor: "oklch(0.48 0.12 55)" }}>4</div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "oklch(0.30 0.04 55)" }}>Enroll in Benefit Programs</p>
                        <p className="text-xs mt-1" style={{ color: "oklch(0.52 0.04 60)" }}>
                          For each benefit program listed above under "Benefits You May Qualify For," visit our{" "}
                          <Link href="/social-programs" className="underline font-semibold" style={{ color: "oklch(0.48 0.12 55)" }}>Benefits Hub</Link>{" "}
                          for direct application links and eligibility details. Many programs can be applied for online or by calling 1-800-MEDICARE (1-800-633-4227).
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 5 */}
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "oklch(0.97 0.010 80)" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold" style={{ backgroundColor: "oklch(0.48 0.12 55)" }}>5</div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "oklch(0.30 0.04 55)" }}>Activate Your LifeMart Access</p>
                        <p className="text-xs mt-1" style={{ color: "oklch(0.52 0.04 60)" }}>
                          Go to{" "}
                          <a href="https://www.care.com/lifemart/" target="_blank" rel="noopener noreferrer" className="underline font-semibold" style={{ color: "oklch(0.48 0.12 55)" }}>care.com/lifemart</a>{" "}
                          to create your account. Check with your employer's HR department first — many companies provide free LifeMart access as an employee benefit. Once enrolled, browse by category and click through to merchants for automatic discounts.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 6 */}
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "oklch(0.97 0.010 80)" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold" style={{ backgroundColor: "oklch(0.48 0.12 55)" }}>6</div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "oklch(0.30 0.04 55)" }}>Download Savings Apps</p>
                        <p className="text-xs mt-1" style={{ color: "oklch(0.52 0.04 60)" }}>
                          Download the <strong>GoodRx</strong> app for prescription savings, the <strong>LifeMart mobile app</strong> for on-the-go member discounts, and the <strong>AARP app</strong> if you're a member. These free apps can save you money at the point of purchase with no clipping required.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Quick reference box */}
                <div className="mt-5 p-4 rounded-xl border-2" style={{ borderColor: "oklch(0.52 0.12 80)", backgroundColor: "oklch(0.95 0.025 80)" }}>
                  <p className="font-bold text-sm mb-2" style={{ color: "oklch(0.30 0.04 55)" }}>
                    📋 Quick Reference — What to Bring When Shopping
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {[
                      "Valid photo ID showing your date of birth",
                      "Printed coupons from HealthCare Select Benefits Hub Coupons page",
                      "AARP or membership cards (if applicable)",
                      "Smartphone with GoodRx & LifeMart apps installed",
                      "This printed Savings Blueprint for reference",
                      "SNAP/EBT card (if applicable) for Double Up Food Bucks",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs" style={{ color: "oklch(0.35 0.04 55)" }}>
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: "oklch(0.52 0.12 80)" }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            {/* Start over */}
            <div className="text-center pb-4">
              <button
                type="button"
                onClick={handleReset}
                className="text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
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
