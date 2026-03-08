// client/src/components/BenefitsChecklist.tsx
import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Info,
  Sparkles,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface UserProfile {
  age: string;
  incomeRange: string;
  hasDisability: boolean | null;
  isVeteran: boolean | null;
  householdSize: string;
  citizenship: string;
}

interface Program {
  id: string;
  name: string;
  fullName: string;
  description: string;
  applyUrl: string;
  phone: string;
  eligibility: (p: UserProfile) => { eligible: boolean; reason: string };
  color: string;
}

// ─── Program Definitions ─────────────────────────────────────────────────────

const PROGRAMS: Program[] = [
  {
    id: "medicare",
    name: "Medicare",
    fullName: "Medicare (Parts A, B, C & D)",
    description: "Federal health insurance for people 65+ or with certain disabilities.",
    applyUrl: "https://www.ssa.gov/medicare/",
    phone: "1-800-633-4227",
    color: "oklch(52% 0.14 35)",
    eligibility: (p) => {
      const age = parseInt(p.age);
      if (age >= 65)
        return { eligible: true, reason: "You qualify based on age (65+)." };
      if (p.hasDisability)
        return {
          eligible: true,
          reason: "You may qualify if you've received SSDI for 24+ months.",
        };
      return { eligible: false, reason: "Typically requires age 65+ or disability." };
    },
  },
  {
    id: "medicaid",
    name: "Medicaid",
    fullName: "Medicaid",
    description: "Free or low-cost health coverage for low-income individuals and families.",
    applyUrl: "https://www.healthcare.gov/medicaid-chip/",
    phone: "1-877-267-2323",
    color: "oklch(48% 0.12 200)",
    eligibility: (p) => {
      const income = p.incomeRange;
      if (["under-15k", "15k-25k"].includes(income))
        return { eligible: true, reason: "Your income likely falls within Medicaid thresholds." };
      if (p.hasDisability || parseInt(p.age) >= 65)
        return {
          eligible: true,
          reason: "Age/disability may qualify you even at higher incomes in some states.",
        };
      return { eligible: false, reason: "Income may exceed Medicaid limits." };
    },
  },
  {
    id: "ssdi",
    name: "SSDI",
    fullName: "Social Security Disability Insurance",
    description: "Monthly payments for workers who become disabled before retirement age.",
    applyUrl: "https://www.ssa.gov/benefits/disability/",
    phone: "1-800-772-1213",
    color: "oklch(42% 0.10 145)",
    eligibility: (p) => {
      if (p.hasDisability && parseInt(p.age) < 65)
        return {
          eligible: true,
          reason: "You may qualify if you have enough work credits and meet SSA disability criteria.",
        };
      return {
        eligible: false,
        reason: "SSDI requires a qualifying disability and work history.",
      };
    },
  },
  {
    id: "ssi",
    name: "SSI",
    fullName: "Supplemental Security Income",
    description: "Monthly payments for low-income elderly, blind, or disabled individuals.",
    applyUrl: "https://www.ssa.gov/benefits/ssi/",
    phone: "1-800-772-1213",
    color: "oklch(55% 0.12 280)",
    eligibility: (p) => {
      const hasNeed =
        ["under-15k", "15k-25k"].includes(p.incomeRange) &&
        (parseInt(p.age) >= 65 || p.hasDisability);
      if (hasNeed)
        return {
          eligible: true,
          reason: "Age/disability + limited income suggests SSI eligibility.",
        };
      return {
        eligible: false,
        reason: "Requires limited income AND age 65+, blindness, or disability.",
      };
    },
  },
  {
    id: "snap",
    name: "SNAP",
    fullName: "SNAP (Food Stamps)",
    description: "Monthly food assistance benefits loaded onto an EBT card.",
    applyUrl: "https://www.fns.usda.gov/snap/recipient/eligibility",
    phone: "1-800-221-5689",
    color: "oklch(60% 0.13 80)",
    eligibility: (p) => {
      if (["under-15k", "15k-25k"].includes(p.incomeRange))
        return {
          eligible: true,
          reason: "Your income range likely falls within SNAP gross income limits.",
        };
      if (parseInt(p.age) >= 60 || p.hasDisability)
        return {
          eligible: true,
          reason: "Seniors 60+ and people with disabilities may have expanded eligibility.",
        };
      return { eligible: false, reason: "Income may exceed SNAP limits for your household size." };
    },
  },
  {
    id: "section8",
    name: "Section 8",
    fullName: "Section 8 Housing Choice Vouchers",
    description: "Rental assistance that subsidizes the difference between market rent and 30% of your income.",
    applyUrl: "https://www.hud.gov/topics/housing_choice_voucher_program_section_8",
    phone: "1-800-955-2232",
    color: "oklch(48% 0.09 30)",
    eligibility: (p) => {
      if (["under-15k", "15k-25k"].includes(p.incomeRange))
        return {
          eligible: true,
          reason: "Low income may qualify you — contact your local Public Housing Authority.",
        };
      return { eligible: false, reason: "Typically requires income at or below 50% of area median." };
    },
  },
  {
    id: "liheap",
    name: "LIHEAP",
    fullName: "Low Income Home Energy Assistance",
    description: "Help with heating and cooling bills, and energy crisis assistance.",
    applyUrl: "https://www.acf.hhs.gov/ocs/programs/liheap",
    phone: "1-866-674-6327",
    color: "oklch(55% 0.14 50)",
    eligibility: (p) => {
      if (["under-15k", "15k-25k"].includes(p.incomeRange))
        return { eligible: true, reason: "Income suggests eligibility — apply through your state agency." };
      return { eligible: false, reason: "LIHEAP is income-based; limits vary by state." };
    },
  },
  {
    id: "lifeline",
    name: "Lifeline",
    fullName: "Lifeline Phone/Internet Benefit",
    description: "Monthly discount on phone or internet service for qualifying low-income households.",
    applyUrl: "https://www.lifelinesupport.org/",
    phone: "1-800-234-9473",
    color: "oklch(45% 0.12 230)",
    eligibility: (p) => {
      const onProgram =
        p.hasDisability ||
        ["under-15k", "15k-25k"].includes(p.incomeRange);
      if (onProgram)
        return {
          eligible: true,
          reason: "Income or program participation (SNAP, Medicaid, SSI) may qualify you.",
        };
      return { eligible: false, reason: "Requires income ≤135% FPL or participation in certain programs." };
    },
  },
  {
    id: "va-benefits",
    name: "VA Benefits",
    fullName: "VA Health Care & Disability Benefits",
    description: "Free or low-cost health care, disability compensation, and pensions for eligible veterans.",
    applyUrl: "https://www.va.gov/health-care/apply/",
    phone: "1-800-827-1000",
    color: "oklch(38% 0.08 235)",
    eligibility: (p) => {
      if (p.isVeteran)
        return {
          eligible: true,
          reason: "As a veteran, you may be eligible for VA health care and disability benefits.",
        };
      return { eligible: false, reason: "Reserved for U.S. military veterans." };
    },
  },
];

// ─── Step config ─────────────────────────────────────────────────────────────

const STEPS = [
  { id: "age",       label: "Your Age" },
  { id: "income",    label: "Household Income" },
  { id: "household", label: "Household Size" },
  { id: "status",    label: "About You" },
  { id: "results",   label: "Your Benefits" },
];

const DEFAULT_PROFILE: UserProfile = {
  age: "",
  incomeRange: "",
  hasDisability: null,
  isVeteran: null,
  householdSize: "1",
  citizenship: "us-citizen",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function BenefitsChecklist() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  const results = PROGRAMS.map((p) => ({
    program: p,
    result: p.eligibility(profile),
  }));

  const eligible = results.filter((r) => r.result.eligible);
  const maybe = results.filter((r) => !r.result.eligible);

  const canAdvance = () => {
    if (step === 0) return !!profile.age;
    if (step === 1) return !!profile.incomeRange;
    if (step === 2) return !!profile.householdSize;
    if (step === 3) return profile.hasDisability !== null && profile.isVeteran !== null;
    return true;
  };

  return (
    <div
      className="max-w-2xl mx-auto px-4 py-8"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Header */}
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
          style={{
            background: "oklch(52% 0.14 35 / 0.1)",
            color: "oklch(38% 0.08 35)",
          }}
        >
          <Sparkles size={12} />
          Free eligibility check — no personal info stored
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ fontFamily: "'Playfair Display', serif", color: "oklch(22% 0.03 35)" }}
        >
          Am I Eligible?
        </h1>
        <p style={{ color: "oklch(45% 0.05 35)" }}>
          Answer {STEPS.length - 1} quick questions and we'll show you which federal programs you
          likely qualify for.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex gap-1">
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              className="flex-1 h-1.5 rounded-full transition-all duration-300"
              style={{
                background:
                  i <= step
                    ? "oklch(52% 0.14 35)"
                    : "oklch(85% 0.03 35)",
              }}
            />
          ))}
        </div>
        <p className="text-xs mt-2" style={{ color: "oklch(55% 0.04 35)" }}>
          Step {step + 1} of {STEPS.length}: {STEPS[step].label}
        </p>
      </div>

      {/* Step content */}
      <div
        className="rounded-2xl p-6 md:p-8 mb-6"
        style={{
          background: "oklch(97% 0.01 60)",
          border: "1.5px solid oklch(88% 0.04 35)",
          boxShadow: "0 4px 24px oklch(22% 0.03 35 / 0.06)",
        }}
      >
        {step === 0 && (
          <StepAge value={profile.age} onChange={(v) => setProfile({ ...profile, age: v })} />
        )}
        {step === 1 && (
          <StepIncome
            value={profile.incomeRange}
            onChange={(v) => setProfile({ ...profile, incomeRange: v })}
          />
        )}
        {step === 2 && (
          <StepHousehold
            value={profile.householdSize}
            onChange={(v) => setProfile({ ...profile, householdSize: v })}
          />
        )}
        {step === 3 && (
          <StepStatus
            disability={profile.hasDisability}
            veteran={profile.isVeteran}
            onDisability={(v) => setProfile({ ...profile, hasDisability: v })}
            onVeteran={(v) => setProfile({ ...profile, isVeteran: v })}
          />
        )}
        {step === 4 && <Results eligible={eligible} maybe={maybe} />}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 justify-between">
        {step > 0 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
            style={{
              background: "oklch(93% 0.02 60)",
              color: "oklch(38% 0.08 35)",
              border: "1.5px solid oklch(85% 0.03 35)",
            }}
          >
            <ChevronLeft size={16} />
            Back
          </button>
        ) : (
          <span />
        )}

        {step < STEPS.length - 1 && (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            style={{
              background: "oklch(52% 0.14 35)",
              color: "oklch(97% 0.01 60)",
            }}
          >
            {step === STEPS.length - 2 ? "See My Benefits" : "Next"}
            <ChevronRight size={16} />
          </button>
        )}
        {step === STEPS.length - 1 && (
          <button
            onClick={() => { setStep(0); setProfile(DEFAULT_PROFILE); }}
            className="ml-auto px-5 py-3 rounded-xl font-medium transition-all hover:scale-105"
            style={{ background: "oklch(93% 0.02 60)", color: "oklch(38% 0.08 35)" }}
          >
            Start Over
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Step sub-components ──────────────────────────────────────────────────────

function StepAge({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ranges = [
    { label: "Under 40", value: "under-40" },
    { label: "40–54", value: "40-54" },
    { label: "55–64", value: "55-64" },
    { label: "65–74", value: "65-74" },
    { label: "75+", value: "75-plus" },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(22% 0.03 35)" }}>
        How old are you?
      </h2>
      <p className="text-sm mb-5" style={{ color: "oklch(50% 0.05 35)" }}>
        Age determines eligibility for Medicare, SSI, and senior programs.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {ranges.map((r) => (
          <OptionButton
            key={r.value}
            label={r.label}
            selected={value === r.value}
            onClick={() => onChange(r.value)}
          />
        ))}
      </div>
    </div>
  );
}

function StepIncome({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ranges = [
    { label: "Under $15,000", value: "under-15k" },
    { label: "$15,000–$25,000", value: "15k-25k" },
    { label: "$25,000–$40,000", value: "25k-40k" },
    { label: "$40,000–$60,000", value: "40k-60k" },
    { label: "Over $60,000", value: "over-60k" },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(22% 0.03 35)" }}>
        Annual household income
      </h2>
      <p className="text-sm mb-5" style={{ color: "oklch(50% 0.05 35)" }}>
        Approximate gross income for everyone in your home last year.
      </p>
      <div className="flex flex-col gap-2.5">
        {ranges.map((r) => (
          <OptionButton
            key={r.value}
            label={r.label}
            selected={value === r.value}
            onClick={() => onChange(r.value)}
            wide
          />
        ))}
      </div>
    </div>
  );
}

function StepHousehold({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const sizes = ["1", "2", "3", "4", "5+"];
  return (
    <div>
      <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(22% 0.03 35)" }}>
        How many people live in your household?
      </h2>
      <p className="text-sm mb-5" style={{ color: "oklch(50% 0.05 35)" }}>
        Income limits for most programs scale with household size.
      </p>
      <div className="flex flex-wrap gap-3">
        {sizes.map((s) => (
          <OptionButton
            key={s}
            label={s === "1" ? "Just me" : `${s} people`}
            selected={value === s}
            onClick={() => onChange(s)}
          />
        ))}
      </div>
    </div>
  );
}

function StepStatus({
  disability,
  veteran,
  onDisability,
  onVeteran,
}: {
  disability: boolean | null;
  veteran: boolean | null;
  onDisability: (v: boolean) => void;
  onVeteran: (v: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(22% 0.03 35)" }}>
        A few more details
      </h2>
      <p className="text-sm -mt-1 mb-4" style={{ color: "oklch(50% 0.05 35)" }}>
        These help us match you with disability and veteran-specific programs.
      </p>

      <div>
        <p className="font-semibold mb-3 text-sm" style={{ color: "oklch(30% 0.06 35)" }}>
          Do you have a qualifying disability?
        </p>
        <div className="flex gap-3">
          <OptionButton label="Yes" selected={disability === true} onClick={() => onDisability(true)} />
          <OptionButton label="No" selected={disability === false} onClick={() => onDisability(false)} />
          <OptionButton label="Not sure" selected={disability === null ? false : false} onClick={() => onDisability(false)} />
        </div>
      </div>

      <div>
        <p className="font-semibold mb-3 text-sm" style={{ color: "oklch(30% 0.06 35)" }}>
          Are you a U.S. military veteran?
        </p>
        <div className="flex gap-3">
          <OptionButton label="Yes" selected={veteran === true} onClick={() => onVeteran(true)} />
          <OptionButton label="No" selected={veteran === false} onClick={() => onVeteran(false)} />
        </div>
      </div>
    </div>
  );
}

function Results({
  eligible,
  maybe,
}: {
  eligible: { program: Program; result: { eligible: boolean; reason: string } }[];
  maybe: { program: Program; result: { eligible: boolean; reason: string } }[];
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(22% 0.03 35)" }}>
        Your likely benefits
      </h2>
      <p className="text-sm mb-6" style={{ color: "oklch(50% 0.05 35)" }}>
        Based on your answers — always confirm eligibility by applying or calling.
      </p>

      {eligible.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={18} style={{ color: "oklch(42% 0.10 145)" }} />
            <span className="font-semibold text-sm" style={{ color: "oklch(30% 0.06 145)" }}>
              You likely qualify for {eligible.length} program{eligible.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="space-y-3">
            {eligible.map(({ program, result }) => (
              <ProgramCard key={program.id} program={program} result={result} highlight />
            ))}
          </div>
        </div>
      )}

      {maybe.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Circle size={18} style={{ color: "oklch(60% 0.06 35)" }} />
            <span className="font-semibold text-sm" style={{ color: "oklch(45% 0.05 35)" }}>
              You may not currently qualify
            </span>
          </div>
          <div className="space-y-2">
            {maybe.map(({ program, result }) => (
              <ProgramCard key={program.id} program={program} result={result} highlight={false} />
            ))}
          </div>
        </div>
      )}

      <div
        className="mt-6 p-4 rounded-xl flex gap-3"
        style={{ background: "oklch(52% 0.14 35 / 0.07)", border: "1px solid oklch(52% 0.14 35 / 0.2)" }}
      >
        <Info size={16} className="shrink-0 mt-0.5" style={{ color: "oklch(52% 0.14 35)" }} />
        <p className="text-xs leading-relaxed" style={{ color: "oklch(38% 0.08 35)" }}>
          This tool provides general guidance only and is not a final determination of eligibility.
          Eligibility rules vary by state and individual circumstances. Contact each program or a
          benefits counselor for a definitive answer.
        </p>
      </div>
    </div>
  );
}

function ProgramCard({
  program,
  result,
  highlight,
}: {
  program: Program;
  result: { eligible: boolean; reason: string };
  highlight: boolean;
}) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: highlight ? `${program.color}10` : "oklch(93% 0.02 60)",
        border: `1.5px solid ${highlight ? program.color + "40" : "oklch(88% 0.04 35)"}`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {highlight ? (
              <CheckCircle2 size={14} style={{ color: program.color }} />
            ) : (
              <Circle size={14} style={{ color: "oklch(70% 0.04 35)" }} />
            )}
            <span
              className="font-bold text-sm"
              style={{ color: highlight ? "oklch(22% 0.03 35)" : "oklch(50% 0.05 35)" }}
            >
              {program.fullName}
            </span>
          </div>
          <p className="text-xs mb-2 ml-5" style={{ color: "oklch(50% 0.05 35)" }}>
            {result.reason}
          </p>
          {highlight && (
            <div className="ml-5 flex flex-wrap gap-2 mt-2">
              <a
                href={program.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                style={{ background: program.color, color: "oklch(97% 0.01 60)" }}
              >
                Apply Online <ExternalLink size={10} />
              </a>
              <a
                href={`tel:${program.phone.replace(/\D/g, "")}`}
                className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg"
                style={{
                  background: "oklch(93% 0.02 60)",
                  color: "oklch(38% 0.08 35)",
                  border: "1px solid oklch(85% 0.03 35)",
                }}
              >
                📞 {program.phone}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OptionButton({
  label,
  selected,
  onClick,
  wide,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  wide?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`px-4 py-3 rounded-xl font-medium text-sm text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${wide ? "w-full" : ""}`}
      style={{
        background: selected ? "oklch(52% 0.14 35)" : "oklch(93% 0.02 60)",
        color: selected ? "oklch(97% 0.01 60)" : "oklch(38% 0.08 35)",
        border: selected
          ? "1.5px solid oklch(52% 0.14 35)"
          : "1.5px solid oklch(85% 0.03 35)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {label}
    </button>
  );
}
