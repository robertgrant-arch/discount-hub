// client/src/components/EmergencyResources.tsx
import { Phone, AlertTriangle, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Resource {
  name: string;
  number: string;
  description: string;
  available: string;
  url?: string;
  urgent?: boolean;
  category: "crisis" | "benefits" | "disability" | "fraud";
}

const RESOURCES: Resource[] = [
  {
    name: "988 Suicide & Crisis Lifeline",
    number: "988",
    description:
      "Free, confidential 24/7 crisis support for people in suicidal crisis or mental health distress. Call or text 988.",
    available: "24 hours / 7 days",
    url: "https://988lifeline.org/",
    urgent: true,
    category: "crisis",
  },
  {
    name: "211 — Health & Human Services",
    number: "211",
    description:
      "Connects you to local social services: food, housing, utility assistance, transportation, and more.",
    available: "24 hours / 7 days (most areas)",
    url: "https://www.211.org/",
    category: "benefits",
  },
  {
    name: "Disability Rights Hotline (NCD)",
    number: "1-800-821-6922",
    description:
      "Free information and referrals on disability rights, benefits, employment, and housing.",
    available: "Mon–Fri, 9 AM–5 PM ET",
    url: "https://www.disability.gov/",
    category: "disability",
  },
  {
    name: "Medicare Fraud Hotline",
    number: "1-800-633-4227",
    description:
      "Report suspected Medicare fraud, billing errors, or identity theft related to your Medicare number.",
    available: "24 hours / 7 days",
    url: "https://oig.hhs.gov/fraud/report-fraud/",
    category: "fraud",
  },
  {
    name: "Elder Abuse Hotline (Eldercare Locator)",
    number: "1-800-677-1116",
    description:
      "Report elder abuse, neglect, or exploitation and get connected with local Adult Protective Services.",
    available: "Mon–Fri, 9 AM–8 PM ET",
    url: "https://eldercare.acl.gov/",
    category: "crisis",
  },
  {
    name: "Veteran Crisis Line",
    number: "988 then press 1",
    description:
      "Confidential crisis support for veterans, service members, and their families. Also text 838255.",
    available: "24 hours / 7 days",
    url: "https://www.veteranscrisisline.net/",
    urgent: true,
    category: "crisis",
  },
  {
    name: "SHIP — Free Medicare Counseling",
    number: "1-877-839-2675",
    description:
      "State Health Insurance Assistance Program — free, unbiased counseling on Medicare, Medicaid, and supplemental insurance from trained local counselors.",
    available: "Mon–Fri (hours vary by state)",
    url: "https://www.shiphelp.org/",
    category: "benefits",
  },
  {
    name: "Social Security Administration",
    number: "1-800-772-1213",
    description:
      "Questions about Social Security benefits, SSDI, SSI, Medicare enrollment, and benefit verification.",
    available: "Mon–Fri, 8 AM–7 PM local time",
    url: "https://www.ssa.gov/",
    category: "benefits",
  },
];

const CATEGORY_LABELS: Record<Resource["category"], string> = {
  crisis: "Crisis & Safety",
  benefits: "Benefits & Assistance",
  disability: "Disability Rights",
  fraud: "Fraud & Abuse",
};

const CATEGORY_COLORS: Record<Resource["category"], string> = {
  crisis: "oklch(52% 0.14 35)",
  benefits: "oklch(42% 0.10 145)",
  disability: "oklch(48% 0.12 200)",
  fraud: "oklch(55% 0.14 50)",
};

// ─── Component ────────────────────────────────────────────────────────────────

interface EmergencyResourcesProps {
  /** Show only urgent (life-safety) resources in compact mode */
  compact?: boolean;
}

export default function EmergencyResources({ compact = false }: EmergencyResourcesProps) {
  const [expanded, setExpanded] = useState(!compact);

  const urgentResources = RESOURCES.filter((r) => r.urgent);
  const displayResources = expanded ? RESOURCES : urgentResources;

  const categories = (["crisis", "benefits", "disability", "fraud"] as const).filter((cat) =>
    displayResources.some((r) => r.category === cat)
  );

  return (
    <section
      aria-labelledby="emergency-resources-heading"
      className="max-w-2xl mx-auto px-4 py-8"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "oklch(52% 0.14 35 / 0.12)" }}
        >
          <Phone size={20} style={{ color: "oklch(52% 0.14 35)" }} />
        </div>
        <div>
          <h2
            id="emergency-resources-heading"
            className="text-2xl font-bold"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(22% 0.03 35)" }}
          >
            Help Is Available
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "oklch(50% 0.05 35)" }}>
            Free hotlines for crisis, benefits, and disability support — all click-to-call on mobile.
          </p>
        </div>
      </div>

      {/* Urgent banner */}
      <div
        className="rounded-2xl p-4 mb-6 flex items-center gap-3"
        style={{
          background: "oklch(52% 0.14 35 / 0.08)",
          border: "1.5px solid oklch(52% 0.14 35 / 0.3)",
        }}
        role="note"
      >
        <AlertTriangle size={18} className="shrink-0" style={{ color: "oklch(52% 0.14 35)" }} />
        <p className="text-sm font-medium" style={{ color: "oklch(35% 0.08 35)" }}>
          In a mental health crisis? Call or text{" "}
          <a
            href="tel:988"
            className="font-bold underline"
            style={{ color: "oklch(52% 0.14 35)" }}
            aria-label="Call 988 Suicide and Crisis Lifeline"
          >
            988
          </a>{" "}
          — free, confidential, 24/7.
        </p>
      </div>

      {/* Resource groups */}
      <div className="space-y-8">
        {categories.map((cat) => (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-1.5 h-5 rounded-full"
                style={{ background: CATEGORY_COLORS[cat] }}
              />
              <h3
                className="text-sm font-bold uppercase tracking-wider"
                style={{ color: "oklch(40% 0.06 35)" }}
              >
                {CATEGORY_LABELS[cat]}
              </h3>
            </div>
            <div className="space-y-3">
              {displayResources
                .filter((r) => r.category === cat)
                .map((resource) => (
                  <ResourceCard key={resource.name} resource={resource} />
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Expand / collapse */}
      {compact && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
          style={{
            background: "oklch(93% 0.02 60)",
            color: "oklch(38% 0.08 35)",
            border: "1.5px solid oklch(85% 0.03 35)",
          }}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              Show fewer resources <ChevronUp size={15} />
            </>
          ) : (
            <>
              Show all {RESOURCES.length} helplines <ChevronDown size={15} />
            </>
          )}
        </button>
      )}
    </section>
  );
}

// ─── Resource card ────────────────────────────────────────────────────────────

function ResourceCard({ resource }: { resource: Resource }) {
  const color = CATEGORY_COLORS[resource.category];
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "oklch(97% 0.01 60)",
        border: `1.5px solid ${resource.urgent ? color + "40" : "oklch(88% 0.04 35)"}`,
        boxShadow: resource.urgent
          ? `0 2px 16px ${color}18`
          : "0 1px 6px oklch(22% 0.03 35 / 0.04)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className="font-bold text-sm"
              style={{ color: "oklch(22% 0.03 35)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {resource.name}
            </span>
            {resource.urgent && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: color + "18",
                  color: color,
                }}
              >
                24/7
              </span>
            )}
          </div>
          <p className="text-xs mb-3" style={{ color: "oklch(50% 0.05 35)", lineHeight: 1.6 }}>
            {resource.description}
          </p>
          <p className="text-xs mb-3" style={{ color: "oklch(60% 0.04 35)" }}>
            🕐 {resource.available}
          </p>

          <div className="flex flex-wrap gap-2">
            <a
              href={`tel:${resource.number.replace(/[^\d+]/g, "")}`}
              aria-label={`Call ${resource.name}: ${resource.number}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                background: color,
                color: "oklch(97% 0.01 60)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <Phone size={13} />
              {resource.number}
            </a>
            {resource.url && (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${resource.name} website`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:scale-105"
                style={{
                  background: "oklch(93% 0.02 60)",
                  color: "oklch(38% 0.08 35)",
                  border: "1px solid oklch(85% 0.03 35)",
                }}
              >
                <ExternalLink size={12} />
                Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
