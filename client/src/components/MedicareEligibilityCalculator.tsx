/**
 * MedicareEligibilityCalculator
 * Design: Warm Abundance — Playfair Display + DM Sans, terracotta/cream/forest-green palette
 *
 * Implements ALL real Medicare enrollment rules:
 *  - IEP  : 7-month window around 65th birthday
 *  - AEP  : Oct 15 – Dec 7 (annual)
 *  - OEP  : Jan 1 – Mar 31 (MA enrollees only)
 *  - SEPs : 9 qualifying life events (checkboxes)
 *  - Medigap OEP : 6-month window when 65+ & enrolled in Part B
 *  - Part D : enrollment rules + late-penalty warning
 */

import { useState, useMemo } from "react";
import {
  CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp,
  Info, ExternalLink, ArrowRight, Shield, Clock, CalendarDays,
  HelpCircle,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface FormState {
  dob: string;                  // YYYY-MM-DD
  hasPartA: "yes" | "no" | "";
  hasPartB: "yes" | "no" | "";
  partBStartDate: string;       // YYYY-MM-DD
  inMAPlan: "yes" | "no" | "";
  inMedigap: "yes" | "no" | "";
  hasCreditableDrug: "yes" | "no" | "";
  seps: Record<string, boolean>;
}

interface EligResult {
  eligible: boolean;
  label: string;
  explanation: string;
  nextWindow?: string;
  plans?: string[];
  warning?: string;
}

// ─── SEP Definitions ────────────────────────────────────────────────────────

const SEP_OPTIONS = [
  {
    id: "moved",
    label: "Moved to a new area",
    tooltip: "You permanently moved to a new address that is outside your current plan's service area, or to an area where new plan options are available.",
  },
  {
    id: "lostEmployer",
    label: "Lost employer or union coverage",
    tooltip: "You or your spouse lost job-based health coverage (including retiree coverage). This SEP lasts 2 months after the coverage loss.",
  },
  {
    id: "lostMedicaid",
    label: "Lost Medicaid (Medicaid termination)",
    tooltip: "Your Medicaid coverage ended. You have 3 months before and 3 months after the loss date to enroll.",
  },
  {
    id: "lis",
    label: "Qualify for LIS / Extra Help (Part D subsidy)",
    tooltip: "You were newly determined to be eligible for the Low Income Subsidy (Extra Help) program, which helps pay Part D costs.",
  },
  {
    id: "incarceration",
    label: "Released from incarceration",
    tooltip: "You were recently released from jail or prison. You have 2 months after release to enroll.",
  },
  {
    id: "fiveStar",
    label: "5-star plan available in your area",
    tooltip: "A Medicare Advantage or Part D plan in your area received a 5-star quality rating. You can switch to it once per year (Dec 8 – Nov 30).",
  },
  {
    id: "leftPACE",
    label: "Left a PACE program",
    tooltip: "You disenrolled from a Program of All-inclusive Care for the Elderly (PACE). You have 2 months to enroll in a new plan.",
  },
  {
    id: "planViolation",
    label: "Plan violated its contract / misled you",
    tooltip: "CMS determined that your plan violated its contract or misled you in a material way. You can switch plans during this SEP.",
  },
  {
    id: "dualEligible",
    label: "Gained or lost dual-eligible status (Medicare + Medicaid)",
    tooltip: "Your dual-eligible status changed — you gained or lost eligibility for both Medicare and Medicaid at the same time.",
  },
];

// ─── Date helpers ────────────────────────────────────────────────────────────

function today(): Date {
  return new Date();
}

function parseDate(s: string): Date | null {
  if (!s) return null;
  const d = new Date(s + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function addMonths(d: Date, n: number): Date {
  const r = new Date(d);
  r.setMonth(r.getMonth() + n);
  return r;
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function monthsBetween(a: Date, b: Date): number {
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
}

// ─── Eligibility Engine ──────────────────────────────────────────────────────

function calcEligibility(form: FormState): {
  iep: EligResult;
  aep: EligResult;
  oep: EligResult;
  sep: EligResult;
  medigap: EligResult;
  partD: EligResult;
  age: number | null;
  progress: number;
} {
  const now = today();
  const dob = parseDate(form.dob);
  const partBStart = parseDate(form.partBStartDate);

  // ── Age ──────────────────────────────────────────────────────────────────
  let age: number | null = null;
  if (dob) {
    age = now.getFullYear() - dob.getFullYear();
    const m = now.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
  }

  // ── Progress (how many fields answered) ──────────────────────────────────
  const fields = [
    form.dob,
    form.hasPartA,
    form.hasPartB,
    form.inMAPlan,
    form.inMedigap,
    form.hasCreditableDrug,
  ];
  const answered = fields.filter(Boolean).length;
  const progress = Math.round((answered / fields.length) * 100);

  // ── IEP ──────────────────────────────────────────────────────────────────
  let iep: EligResult;
  if (!dob) {
    iep = { eligible: false, label: "Initial Enrollment Period (IEP)", explanation: "Enter your date of birth to calculate your IEP window." };
  } else {
    const birthday65 = new Date(dob);
    birthday65.setFullYear(birthday65.getFullYear() + 65);
    const iepStart = addMonths(birthday65, -3);
    const iepEnd = addMonths(birthday65, 4);
    // IEP end is last day of the 3rd month after birthday month
    iepEnd.setDate(0); // last day of month 3 after birthday
    const iepEndFull = new Date(birthday65);
    iepEndFull.setMonth(iepEndFull.getMonth() + 3);
    iepEndFull.setDate(new Date(iepEndFull.getFullYear(), iepEndFull.getMonth() + 1, 0).getDate());

    const inIEP = now >= iepStart && now <= iepEndFull;
    const beforeIEP = now < iepStart;
    const afterIEP = now > iepEndFull;

    if (age !== null && age < 65 && beforeIEP) {
      iep = {
        eligible: false,
        label: "Initial Enrollment Period (IEP)",
        explanation: `You are ${age} years old. Your IEP begins 3 months before your 65th birthday.`,
        nextWindow: `Your IEP opens on ${fmtDate(iepStart)} and closes on ${fmtDate(iepEndFull)}.`,
        plans: [],
      };
    } else if (inIEP) {
      iep = {
        eligible: true,
        label: "Initial Enrollment Period (IEP)",
        explanation: `You are in your 7-month IEP window (${fmtDate(iepStart)} – ${fmtDate(iepEndFull)}). You can enroll in Medicare Parts A, B, C (Medicare Advantage), and D.`,
        plans: ["Medicare Part A", "Medicare Part B", "Medicare Advantage (Part C)", "Medicare Part D"],
        warning: now > birthday65 ? "Enrolling after your birthday month may delay coverage start by 1–3 months." : undefined,
      };
    } else if (afterIEP) {
      iep = {
        eligible: false,
        label: "Initial Enrollment Period (IEP)",
        explanation: `Your IEP ended on ${fmtDate(iepEndFull)}. You missed this window. You may now qualify for a Special Enrollment Period or must wait for the General Enrollment Period (Jan 1 – Mar 31 each year).`,
        nextWindow: "General Enrollment Period: January 1 – March 31 (coverage starts July 1). Late enrollment penalties may apply.",
        plans: [],
      };
    } else {
      iep = {
        eligible: false,
        label: "Initial Enrollment Period (IEP)",
        explanation: `Your IEP window runs from ${fmtDate(iepStart)} to ${fmtDate(iepEndFull)}.`,
        nextWindow: `Opens ${fmtDate(iepStart)}`,
      };
    }
  }

  // ── AEP ──────────────────────────────────────────────────────────────────
  const aepStart = new Date(now.getFullYear(), 9, 15); // Oct 15
  const aepEnd = new Date(now.getFullYear(), 11, 7);   // Dec 7
  const inAEP = now >= aepStart && now <= aepEnd;
  const aep: EligResult = {
    eligible: inAEP,
    label: "Annual Enrollment Period (AEP)",
    explanation: inAEP
      ? `AEP is open now (Oct 15 – Dec 7). You can switch, join, or drop Medicare Advantage and Part D plans. Changes take effect January 1.`
      : `AEP runs October 15 – December 7 each year. Changes made during AEP take effect January 1 of the following year.`,
    nextWindow: inAEP ? undefined : `Next AEP: October 15 – December 7, ${now.getMonth() >= 11 ? now.getFullYear() + 1 : now.getFullYear()}`,
    plans: inAEP ? ["Medicare Advantage (Part C)", "Medicare Part D", "Medicare Supplement (Medigap) — subject to underwriting outside Medigap OEP"] : [],
  };

  // ── OEP ──────────────────────────────────────────────────────────────────
  const oepStart = new Date(now.getFullYear(), 0, 1);  // Jan 1
  const oepEnd = new Date(now.getFullYear(), 2, 31);   // Mar 31
  const inOEP = now >= oepStart && now <= oepEnd;
  const inMA = form.inMAPlan === "yes";
  const oep: EligResult = {
    eligible: inOEP && inMA,
    label: "Medicare Advantage Open Enrollment Period (OEP)",
    explanation: !inOEP
      ? `OEP runs January 1 – March 31 each year, for people already enrolled in a Medicare Advantage plan.`
      : !inMA
      ? `OEP is currently open (Jan 1 – Mar 31), but it is only available to people already enrolled in a Medicare Advantage plan. You indicated you are not in an MA plan.`
      : `OEP is open (Jan 1 – Mar 31) and you are in a Medicare Advantage plan. You can switch to a different MA plan or return to Original Medicare (Parts A & B) and join a standalone Part D plan.`,
    nextWindow: !inOEP ? `Next OEP: January 1 – March 31, ${now.getFullYear() + (now.getMonth() >= 3 ? 1 : 0)}` : undefined,
    plans: (inOEP && inMA) ? ["Different Medicare Advantage plan", "Original Medicare (Parts A & B) + standalone Part D"] : [],
  };

  // ── SEP ──────────────────────────────────────────────────────────────────
  const activeSEPs = SEP_OPTIONS.filter((s) => form.seps[s.id]);
  const hasSEP = activeSEPs.length > 0;
  const sep: EligResult = {
    eligible: hasSEP,
    label: "Special Enrollment Period (SEP)",
    explanation: hasSEP
      ? `You qualify for a SEP based on: ${activeSEPs.map((s) => s.label).join(", ")}. SEP windows are typically 2–3 months from the qualifying event. Contact Medicare at 1-800-MEDICARE to confirm your exact window.`
      : `No SEP qualifying events selected. Check any boxes above that apply to your situation.`,
    plans: hasSEP ? ["Medicare Advantage (Part C)", "Medicare Part D", "Medicare Supplement (Medigap) — varies by SEP type"] : [],
    warning: hasSEP ? "SEP windows are time-limited (usually 2–3 months from the qualifying event). Act promptly." : undefined,
  };

  // ── Medigap OEP ──────────────────────────────────────────────────────────
  let medigap: EligResult;
  if (!partBStart || !dob) {
    medigap = {
      eligible: false,
      label: "Medigap Open Enrollment Period",
      explanation: "Enter your date of birth and Part B start date to calculate your Medigap OEP.",
    };
  } else {
    const medigapOEPEnd = addMonths(partBStart, 6);
    const inMedigapOEP = now >= partBStart && now <= medigapOEPEnd && (age !== null && age >= 65);
    const pastMedigapOEP = now > medigapOEPEnd;

    if (inMedigapOEP) {
      medigap = {
        eligible: true,
        label: "Medigap Open Enrollment Period",
        explanation: `Your Medigap OEP is open until ${fmtDate(medigapOEPEnd)}. During this 6-month window, insurers CANNOT deny you Medigap coverage or charge more due to pre-existing conditions.`,
        plans: ["Any Medigap/Medicare Supplement plan (Plans A, B, C, D, F, G, K, L, M, N)"],
        warning: "This is your best opportunity to get Medigap without medical underwriting. After this window closes, insurers in most states can deny coverage or charge higher premiums.",
      };
    } else if (pastMedigapOEP) {
      medigap = {
        eligible: false,
        label: "Medigap Open Enrollment Period",
        explanation: `Your Medigap OEP ended on ${fmtDate(medigapOEPEnd)}. Outside this window, insurers in most states can use medical underwriting — meaning they can deny coverage or charge higher premiums based on your health history. A few states (CT, MA, NY) have year-round guaranteed issue.`,
        nextWindow: "No future Medigap OEP — this window only occurs once. Contact your State Insurance Department for guaranteed-issue rights.",
      };
    } else {
      const partBAge = monthsBetween(dob, partBStart) / 12;
      if (partBAge < 65) {
        medigap = {
          eligible: false,
          label: "Medigap Open Enrollment Period",
          explanation: `Your Medigap OEP begins when you are both 65+ AND enrolled in Part B. Your Part B start date is before age 65, so your Medigap OEP will begin on your 65th birthday.`,
          nextWindow: dob ? `Medigap OEP opens on your 65th birthday: ${fmtDate(new Date(new Date(dob).setFullYear(new Date(dob).getFullYear() + 65)))}` : undefined,
        };
      } else {
        medigap = {
          eligible: false,
          label: "Medigap Open Enrollment Period",
          explanation: `Your Medigap OEP has not started yet. It begins on your Part B start date (${fmtDate(partBStart)}) if you are 65 or older.`,
        };
      }
    }
  }

  // ── Part D ───────────────────────────────────────────────────────────────
  let partD: EligResult;
  const hasCreditable = form.hasCreditableDrug === "yes";
  const noCreditable = form.hasCreditableDrug === "no";

  if (!dob || age === null) {
    partD = {
      eligible: false,
      label: "Part D (Prescription Drug Coverage)",
      explanation: "Enter your date of birth to evaluate Part D eligibility.",
    };
  } else if (age < 65 && form.hasPartA !== "yes" && form.hasPartB !== "yes") {
    partD = {
      eligible: false,
      label: "Part D (Prescription Drug Coverage)",
      explanation: "Part D enrollment requires Medicare Part A or Part B eligibility. You must be 65+ or qualify for Medicare due to disability or ESRD.",
    };
  } else {
    const penaltyApplies = noCreditable && age >= 65;
    partD = {
      eligible: true,
      label: "Part D (Prescription Drug Coverage)",
      explanation: hasCreditable
        ? "You have creditable drug coverage — you are not required to enroll in Part D now and will not face a late enrollment penalty as long as your current coverage remains creditable."
        : noCreditable
        ? "You do not have creditable drug coverage. If you are eligible for Part D and delay enrollment without creditable coverage, you will face a permanent late enrollment penalty of 1% of the national base premium for each month you were without coverage."
        : "Answer the drug coverage question above to see your Part D penalty status.",
      plans: ["Medicare Part D standalone plan", "Medicare Advantage plan with drug coverage (MAPD)"],
      warning: penaltyApplies
        ? "⚠️ Late Enrollment Penalty: For every month you delay Part D enrollment without creditable coverage, your premium increases by 1% permanently. On a $34/month base premium, 24 months of delay = ~$8/month added forever."
        : undefined,
    };
  }

  return { iep, aep, oep, sep, medigap, partD, age, progress };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Tooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block ml-1 align-middle">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="More information"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>
      {open && (
        <span className="absolute z-50 left-5 top-0 w-64 bg-foreground text-background text-xs rounded-lg px-3 py-2 shadow-xl leading-relaxed">
          {text}
        </span>
      )}
    </span>
  );
}

function ResultCard({ result, defaultOpen = false }: { result: EligResult; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const icon = result.eligible
    ? <CheckCircle2 className="w-5 h-5 text-[oklch(0.40_0.10_140)] shrink-0 mt-0.5" />
    : <XCircle className="w-5 h-5 text-[oklch(0.50_0.15_15)] shrink-0 mt-0.5" />;

  return (
    <div
      className={`rounded-xl border transition-all ${
        result.eligible
          ? "border-[oklch(0.75_0.08_140)] bg-[oklch(0.97_0.02_140)]"
          : "border-border bg-card"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-3 px-4 py-3 text-left"
      >
        {icon}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${result.eligible ? "text-[oklch(0.30_0.10_140)]" : "text-foreground"}`}>
            {result.label}
          </p>
          {!open && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{result.explanation.slice(0, 80)}…</p>
          )}
        </div>
        <span className="text-muted-foreground shrink-0 mt-0.5">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-3">
          <p className="text-sm text-muted-foreground leading-relaxed">{result.explanation}</p>

          {result.nextWindow && (
            <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/60 rounded-lg px-3 py-2">
              <CalendarDays className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[oklch(0.45_0.13_42)]" />
              <span>{result.nextWindow}</span>
            </div>
          )}

          {result.plans && result.plans.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[oklch(0.40_0.10_140)] mb-1.5">Plans you can enroll in:</p>
              <ul className="space-y-1">
                {result.plans.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3 h-3 text-[oklch(0.40_0.10_140)] shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.warning && (
            <div className="flex items-start gap-2 text-xs bg-[oklch(0.96_0.04_42)] border border-[oklch(0.85_0.07_42)] rounded-lg px-3 py-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[oklch(0.50_0.13_42)]" />
              <span className="text-[oklch(0.35_0.10_42)] leading-relaxed">{result.warning}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FieldLabel({ children, tooltip }: { children: React.ReactNode; tooltip?: string }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
      {children}
      {tooltip && <Tooltip text={tooltip} />}
    </label>
  );
}

function YesNo({
  value,
  onChange,
}: {
  value: "yes" | "no" | "";
  onChange: (v: "yes" | "no") => void;
}) {
  return (
    <div className="flex gap-2">
      {(["yes", "no"] as const).map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${
            value === v
              ? v === "yes"
                ? "bg-[oklch(0.40_0.10_140)] text-white border-[oklch(0.40_0.10_140)]"
                : "bg-[oklch(0.50_0.15_15)] text-white border-[oklch(0.50_0.15_15)]"
              : "bg-background border-border text-muted-foreground hover:border-[oklch(0.47 0.08 185)]"
          }`}
        >
          {v === "yes" ? "Yes" : "No"}
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function MedicareEligibilityCalculator() {
  const [form, setForm] = useState<FormState>({
    dob: "",
    hasPartA: "",
    hasPartB: "",
    partBStartDate: "",
    inMAPlan: "",
    inMedigap: "",
    hasCreditableDrug: "",
    seps: {},
  });

  const [showResults, setShowResults] = useState(false);

  const set = (key: keyof Omit<FormState, "seps">, val: string) =>
    setForm((f) => ({ ...f, [key]: val as never }));

  const setSEP = (id: string, val: boolean) =>
    setForm((f) => ({ ...f, seps: { ...f.seps, [id]: val } }));

  const results = useMemo(() => calcEligibility(form), [form]);

  const anyEligible =
    results.iep.eligible ||
    results.aep.eligible ||
    results.oep.eligible ||
    results.sep.eligible ||
    results.medigap.eligible;

  return (
    <div
      className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
      id="eligibility-calculator"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-border" style={{ background: "oklch(0.97 0.02 75)" }}>
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "oklch(0.45 0.13 42)" }}
          >
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2
              className="text-xl font-bold text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Am I Eligible to Enroll in a Medicare Plan Today?
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Answer the questions below to instantly see which Medicare enrollment windows are open to you right now.
            </p>
          </div>
        </div>

        {/* Progress bar */}
        {results.progress > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Profile completion</span>
              <span className="text-xs font-semibold text-foreground">{results.progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${results.progress}%`, background: "oklch(0.45 0.13 42)" }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border">

        {/* ── Left: Input Form ───────────────────────────────────────────── */}
        <div className="p-6 space-y-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[oklch(0.45_0.13_42)]">
            Your Information
          </p>

          {/* DOB */}
          <div>
            <FieldLabel tooltip="Your date of birth is used to calculate your Initial Enrollment Period (IEP) — the 7-month window around your 65th birthday.">
              Date of Birth
            </FieldLabel>
            <input
              type="date"
              value={form.dob}
              onChange={(e) => set("dob", e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.13_42)] transition"
            />
            {results.age !== null && (
              <p className="text-xs text-muted-foreground mt-1">
                Current age: <strong>{results.age}</strong>
              </p>
            )}
          </div>

          {/* Part A */}
          <div>
            <FieldLabel tooltip="Medicare Part A covers inpatient hospital stays, skilled nursing facility care, hospice, and some home health services. Most people get Part A premium-free at 65.">
              Enrolled in Medicare Part A?
            </FieldLabel>
            <YesNo value={form.hasPartA} onChange={(v) => set("hasPartA", v)} />
          </div>

          {/* Part B */}
          <div>
            <FieldLabel tooltip="Medicare Part B covers outpatient services, doctor visits, preventive care, and medical equipment. There is a monthly premium (standard $174.70/mo in 2024).">
              Enrolled in Medicare Part B?
            </FieldLabel>
            <YesNo value={form.hasPartB} onChange={(v) => set("hasPartB", v)} />
          </div>

          {/* Part B Start Date */}
          {form.hasPartB === "yes" && (
            <div>
              <FieldLabel tooltip="The date your Part B coverage began. This is used to calculate your Medigap Open Enrollment Period — a 6-month window during which insurers cannot deny you Medigap coverage.">
                Part B Coverage Start Date
              </FieldLabel>
              <input
                type="date"
                value={form.partBStartDate}
                onChange={(e) => set("partBStartDate", e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.13_42)] transition"
              />
            </div>
          )}

          {/* In MA Plan */}
          <div>
            <FieldLabel tooltip="Medicare Advantage (Part C) plans are offered by private insurers approved by Medicare. If you are currently in an MA plan, you may qualify for the Medicare Advantage OEP (Jan 1–Mar 31).">
              Currently enrolled in a Medicare Advantage (Part C) plan?
            </FieldLabel>
            <YesNo value={form.inMAPlan} onChange={(v) => set("inMAPlan", v)} />
          </div>

          {/* In Medigap */}
          <div>
            <FieldLabel tooltip="Medigap (Medicare Supplement) plans help pay costs that Original Medicare doesn't cover, like copayments, coinsurance, and deductibles.">
              Currently enrolled in a Medigap / Medicare Supplement plan?
            </FieldLabel>
            <YesNo value={form.inMedigap} onChange={(v) => set("inMedigap", v)} />
          </div>

          {/* Creditable Drug Coverage */}
          <div>
            <FieldLabel tooltip="Creditable drug coverage is prescription coverage that is at least as good as Medicare Part D. Examples: employer/union coverage, TRICARE, VA benefits, FEHB. If you have creditable coverage, you can delay Part D without penalty.">
              Do you have creditable prescription drug coverage?
            </FieldLabel>
            <YesNo value={form.hasCreditableDrug} onChange={(v) => set("hasCreditableDrug", v)} />
            {form.hasCreditableDrug === "yes" && (
              <p className="text-xs text-muted-foreground mt-1">
                Examples: employer/union plan, TRICARE, VA, FEHB, PACE, Indian Health Service.
              </p>
            )}
          </div>

          {/* SEP Checkboxes */}
          <div>
            <FieldLabel tooltip="Special Enrollment Periods (SEPs) allow you to enroll in or change Medicare plans outside of standard enrollment windows due to qualifying life events.">
              Special Enrollment Period — qualifying events
            </FieldLabel>
            <p className="text-xs text-muted-foreground mb-2">Check all that apply to your situation:</p>
            <div className="space-y-2">
              {SEP_OPTIONS.map((sep) => (
                <label key={sep.id} className="flex items-start gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!form.seps[sep.id]}
                    onChange={(e) => setSEP(sep.id, e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-border accent-[oklch(0.45_0.13_42)] shrink-0"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-snug">
                    {sep.label}
                    <Tooltip text={sep.tooltip} />
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowResults(true)}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ background: "oklch(0.45 0.13 42)" }}
          >
            <Shield className="w-4 h-4" />
            Check My Eligibility
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* ── Right: Results ─────────────────────────────────────────────── */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-[oklch(0.45_0.13_42)]">
              Your Eligibility Results
            </p>
            {showResults && (
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  anyEligible
                    ? "bg-[oklch(0.93_0.05_140)] text-[oklch(0.30_0.10_140)]"
                    : "bg-[oklch(0.95_0.04_15)] text-[oklch(0.40_0.10_15)]"
                }`}
              >
                {anyEligible ? "✓ Enrollment windows open" : "No windows open now"}
              </span>
            )}
          </div>

          {!showResults && results.progress === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Clock className="w-10 h-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">
                Fill in your information on the left to see which Medicare enrollment windows are available to you.
              </p>
            </div>
          )}

          {(showResults || results.progress > 0) && (
            <div className="space-y-3">
              <ResultCard result={results.iep} defaultOpen={results.iep.eligible} />
              <ResultCard result={results.aep} defaultOpen={results.aep.eligible} />
              <ResultCard result={results.oep} defaultOpen={results.oep.eligible} />
              <ResultCard result={results.sep} defaultOpen={results.sep.eligible} />
              <ResultCard result={results.medigap} defaultOpen={results.medigap.eligible} />
              <ResultCard result={results.partD} defaultOpen={results.partD.eligible} />
            </div>
          )}

          {/* Part D Penalty Warning Banner */}
          {results.partD.warning && (
            <div className="rounded-xl border border-[oklch(0.80_0.10_42)] bg-[oklch(0.96_0.04_42)] px-4 py-3 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[oklch(0.50_0.13_42)] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[oklch(0.35_0.10_42)] mb-1">Part D Late Enrollment Penalty</p>
                <p className="text-xs text-[oklch(0.40_0.10_42)] leading-relaxed">{results.partD.warning}</p>
              </div>
            </div>
          )}

          {/* Compare Plans CTA */}
          {(showResults || results.progress > 50) && (
            <div
              className="rounded-xl p-4 text-center space-y-3"
              style={{ background: "oklch(0.18 0.04 42)" }}
            >
              <p
                className="text-base font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ready to Compare Plans?
              </p>
              <p className="text-xs text-white/70">
                A licensed Medicare specialist can find the best plan for your situation — free, no obligation.
              </p>
              <a
                href="https://www.selectquote.com/medicare"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg text-sm text-white transition-colors hover:opacity-90"
                style={{ background: "oklch(0.55 0.15 42)" }}
              >
                Compare Plans — SelectQuote Senior
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-[10px] text-white/40">
                Sponsored · <a href="/disclosures" className="underline">Disclosure</a>
              </p>
            </div>
          )}

          {/* Info footer */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground border-t border-border pt-3">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <p>
              This tool is for informational purposes only and does not constitute legal or insurance advice. Enrollment rules may vary based on individual circumstances. Call{" "}
              <a href="tel:18007332273" className="underline font-medium">1-800-MEDICARE</a> or visit{" "}
              <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                medicare.gov
              </a>{" "}
              to confirm your eligibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
