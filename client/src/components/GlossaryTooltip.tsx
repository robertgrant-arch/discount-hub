// client/src/components/GlossaryTooltip.tsx
//
// Usage:
//   import { GlossaryTooltip, GlossaryText } from "./GlossaryTooltip";
//
//   // Wrap arbitrary text with automatic jargon detection:
//   <GlossaryText>Your Part D coverage is explained by your Medigap plan.</GlossaryText>
//
//   // Or wrap a single term manually:
//   <GlossaryTooltip term="QMB">QMB</GlossaryTooltip>

import { useState, useRef, useEffect, useCallback, ReactNode } from "react";
import { HelpCircle, ExternalLink } from "lucide-react";

// ─── Glossary definitions ─────────────────────────────────────────────────────

export const GLOSSARY: Record<string, { plain: string; learnMore?: string }> = {
  "Part A": {
    plain:
      "Medicare Part A covers hospital stays, skilled nursing facility care, hospice, and some home health care. Most people don't pay a premium for Part A.",
    learnMore: "https://www.medicare.gov/what-medicare-covers/what-part-a-covers",
  },
  "Part B": {
    plain:
      "Medicare Part B covers doctor visits, outpatient care, medical equipment, and preventive services. You pay a monthly premium (usually around $175/mo in 2024).",
    learnMore: "https://www.medicare.gov/what-medicare-covers/what-part-b-covers",
  },
  "Part C": {
    plain:
      "Medicare Part C (Medicare Advantage) is an alternative to Original Medicare offered by private insurers. It typically includes Parts A, B, and often D in a single plan.",
    learnMore: "https://www.medicare.gov/sign-up-change-plans/types-of-medicare-health-plans/medicare-advantage-plans",
  },
  "Part D": {
    plain:
      "Medicare Part D covers prescription drugs. You join a standalone Part D plan or get drug coverage through a Medicare Advantage plan.",
    learnMore: "https://www.medicare.gov/drug-coverage-part-d",
  },
  "Medigap": {
    plain:
      "Medigap (Medicare Supplement Insurance) is sold by private companies to fill gaps in Original Medicare — like copays, coinsurance, and deductibles.",
    learnMore: "https://www.medicare.gov/supplements-other-insurance/how-to-compare-medigap-policies",
  },
  "QMB": {
    plain:
      "Qualified Medicare Beneficiary — a Medicaid program that pays your Medicare Part A & B premiums, deductibles, and coinsurance if you have low income.",
    learnMore: "https://www.medicare.gov/medicare-savings-programs",
  },
  "SLMB": {
    plain:
      "Specified Low-income Medicare Beneficiary — a Medicare Savings Program that pays your Part B premium if your income is slightly above QMB limits.",
    learnMore: "https://www.medicare.gov/medicare-savings-programs",
  },
  "Extra Help": {
    plain:
      "Extra Help (also called Low Income Subsidy / LIS) reduces the cost of Part D prescription drug coverage — premiums, deductibles, and copays — for people with limited income.",
    learnMore: "https://www.ssa.gov/medicare/part-d-extra-help",
  },
  "IRMAA": {
    plain:
      "Income-Related Monthly Adjustment Amount — a higher Medicare Part B or D premium charged to people with income above certain thresholds.",
    learnMore: "https://www.medicare.gov/your-medicare-costs/part-b-costs",
  },
  "SSDI": {
    plain:
      "Social Security Disability Insurance — monthly payments for workers who have a qualifying disability and enough Social Security work credits.",
    learnMore: "https://www.ssa.gov/benefits/disability/",
  },
  "SSI": {
    plain:
      "Supplemental Security Income — monthly payments for people with limited income and resources who are 65+, blind, or disabled. Not the same as SSDI.",
    learnMore: "https://www.ssa.gov/benefits/ssi/",
  },
  "SNAP": {
    plain:
      "Supplemental Nutrition Assistance Program (formerly Food Stamps) — provides monthly funds on an EBT card to buy groceries at authorized stores.",
    learnMore: "https://www.fns.usda.gov/snap",
  },
  "LIHEAP": {
    plain:
      "Low Income Home Energy Assistance Program — helps eligible households pay their heating and cooling bills and can provide crisis assistance for energy emergencies.",
    learnMore: "https://www.acf.hhs.gov/ocs/programs/liheap",
  },
  "Lifeline": {
    plain:
      "A federal program giving qualifying low-income households a monthly discount on phone or internet service.",
    learnMore: "https://www.lifelinesupport.org/",
  },
  "AEP": {
    plain:
      "Annual Enrollment Period — the window from Oct 15 to Dec 7 each year when Medicare beneficiaries can change their health and drug plans.",
    learnMore: "https://www.medicare.gov/sign-up-change-plans/when-can-i-join-a-health-or-drug-plan",
  },
  "OEP": {
    plain:
      "Open Enrollment Period — Jan 1 to Mar 31, when Medicare Advantage members can switch plans or return to Original Medicare.",
  },
  "SEP": {
    plain:
      "Special Enrollment Period — a time outside normal enrollment windows when you can sign up for or change Medicare plans due to a qualifying life event (moving, losing coverage, etc.).",
  },
  "FPL": {
    plain:
      "Federal Poverty Level — a measure used by government programs to determine income eligibility. For 2024, 100% FPL for a single person is $15,060/year.",
  },
  "CMS": {
    plain:
      "Centers for Medicare & Medicaid Services — the federal agency that administers Medicare, Medicaid, CHIP, and the ACA marketplaces.",
    learnMore: "https://www.cms.gov/",
  },
  "SNP": {
    plain:
      "Special Needs Plan — a type of Medicare Advantage plan designed for people with specific diseases, conditions, or income levels.",
  },
  "PACE": {
    plain:
      "Program of All-inclusive Care for the Elderly — a Medicare/Medicaid program providing comprehensive care for people 55+ who need nursing home-level care but live in the community.",
    learnMore: "https://www.medicare.gov/sign-up-change-plans/types-of-medicare-health-plans/pace",
  },
  "Donut Hole": {
    plain:
      'The "coverage gap" in Medicare Part D — a phase where you pay more out-of-pocket for drugs after your plan and you have spent a certain amount, until you reach catastrophic coverage.',
    learnMore: "https://www.medicare.gov/drug-coverage-part-d/costs-for-medicare-drug-coverage/costs-in-the-coverage-gap",
  },
};

// ─── Single term tooltip ──────────────────────────────────────────────────────

interface GlossaryTooltipProps {
  term: string;
  children: ReactNode;
}

export function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<"above" | "below">("above");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const entry = GLOSSARY[term];
  if (!entry) return <>{children}</>;

  const reposition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPos(rect.top < 180 ? "below" : "above");
  }, []);

  const open = () => {
    reposition();
    setVisible(true);
  };
  const close = () => setVisible(false);

  // Close on outside click
  useEffect(() => {
    if (!visible) return;
    const handler = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !tooltipRef.current?.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [visible]);

  return (
    <span className="relative inline-block">
      <button
        ref={triggerRef}
        onClick={visible ? close : open}
        onMouseEnter={open}
        onMouseLeave={close}
        onFocus={open}
        onBlur={close}
        aria-describedby={visible ? `tooltip-${term.replace(/\s/g, "-")}` : undefined}
        className="inline-flex items-baseline gap-0.5 border-b-2 border-dotted cursor-help transition-colors"
        style={{
          borderColor: "oklch(52% 0.14 35 / 0.5)",
          color: "inherit",
          background: "transparent",
          padding: 0,
          font: "inherit",
          lineHeight: "inherit",
        }}
      >
        {children}
        <HelpCircle
          size={12}
          className="inline-block ml-0.5 mb-px shrink-0"
          style={{ color: "oklch(52% 0.14 35)", verticalAlign: "middle" }}
          aria-hidden="true"
        />
      </button>

      {visible && (
        <div
          id={`tooltip-${term.replace(/\s/g, "-")}`}
          ref={tooltipRef}
          role="tooltip"
          className="absolute z-50 w-72 max-w-[90vw] rounded-xl p-4 text-left shadow-xl"
          style={{
            background: "oklch(22% 0.03 35)",
            color: "oklch(97% 0.01 60)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem",
            lineHeight: "1.55",
            left: "50%",
            transform: "translateX(-50%)",
            ...(pos === "above"
              ? { bottom: "calc(100% + 10px)" }
              : { top: "calc(100% + 10px)" }),
          }}
        >
          {/* Arrow */}
          <span
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
            style={{
              background: "oklch(22% 0.03 35)",
              ...(pos === "above"
                ? { bottom: "-6px" }
                : { top: "-6px" }),
            }}
          />
          <p className="font-bold mb-1.5" style={{ color: "oklch(80% 0.08 60)" }}>
            {term}
          </p>
          <p>{entry.plain}</p>
          {entry.learnMore && (
            <a
              href={entry.learnMore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-xs font-semibold hover:underline"
              style={{ color: "oklch(75% 0.12 60)" }}
            >
              Learn more <ExternalLink size={10} />
            </a>
          )}
        </div>
      )}
    </span>
  );
}

// ─── Auto-wrapping component ──────────────────────────────────────────────────
// Scans a string for glossary terms and wraps them automatically.

interface GlossaryTextProps {
  children: string;
  className?: string;
}

export function GlossaryText({ children, className }: GlossaryTextProps) {
  const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length); // longest first
  const pattern = new RegExp(`\\b(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "g");

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(children)) !== null) {
    if (match.index > lastIndex) {
      parts.push(children.slice(lastIndex, match.index));
    }
    const term = match[0];
    parts.push(
      <GlossaryTooltip key={key++} term={term}>
        {term}
      </GlossaryTooltip>
    );
    lastIndex = match.index + term.length;
  }

  if (lastIndex < children.length) {
    parts.push(children.slice(lastIndex));
  }

  return <span className={className}>{parts}</span>;
}
