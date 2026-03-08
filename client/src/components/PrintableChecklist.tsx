// client/src/components/PrintableChecklist.tsx
//
// Usage: Drop into any page. It reads selected programs from props
// or you can pair it with BenefitsChecklist output.
//
//   <PrintableChecklist programs={myEligiblePrograms} userName="Jane" />

import { useRef } from "react";
import { Printer, FileText, Phone, Globe, Calendar, CheckSquare } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PrintableProgram {
  name: string;
  fullName: string;
  description: string;
  applyUrl: string;
  phone: string;
  keyDates?: string[];
  notes?: string;
  color?: string;
}

interface PrintableChecklistProps {
  programs?: PrintableProgram[];
  userName?: string;
}

// ─── Default programs (shown when no selection is passed) ─────────────────────

const DEFAULT_PROGRAMS: PrintableProgram[] = [
  {
    name: "Medicare",
    fullName: "Medicare (Parts A, B, C & D)",
    description: "Federal health insurance for people 65+ or with qualifying disabilities.",
    applyUrl: "https://www.ssa.gov/medicare/",
    phone: "1-800-633-4227",
    keyDates: [
      "Initial Enrollment Period: 7 months around your 65th birthday",
      "Annual Enrollment Period (AEP): Oct 15 – Dec 7",
      "Open Enrollment Period (OEP): Jan 1 – Mar 31",
    ],
    notes: "Late enrollment penalties apply. Sign up during your Initial Enrollment Period to avoid them.",
    color: "oklch(52% 0.14 35)",
  },
  {
    name: "Medicaid",
    fullName: "Medicaid",
    description: "Free or low-cost health coverage for low-income individuals and families.",
    applyUrl: "https://www.healthcare.gov/medicaid-chip/",
    phone: "1-877-267-2323",
    keyDates: ["Open year-round — apply any time"],
    notes: "Rules vary by state. Contact your state Medicaid office for local income limits.",
    color: "oklch(48% 0.12 200)",
  },
  {
    name: "SNAP",
    fullName: "SNAP (Food Stamps)",
    description: "Monthly food assistance loaded onto an EBT card.",
    applyUrl: "https://www.fns.usda.gov/snap/recipient/eligibility",
    phone: "1-800-221-5689",
    keyDates: ["Benefits renew monthly", "Recertification typically every 6–12 months"],
    notes: "Seniors 60+ and people with disabilities may qualify at higher income levels.",
    color: "oklch(60% 0.13 80)",
  },
  {
    name: "Extra Help",
    fullName: "Extra Help (Part D Low Income Subsidy)",
    description: "Reduces costs for Medicare prescription drug coverage.",
    applyUrl: "https://www.ssa.gov/medicare/part-d-extra-help",
    phone: "1-800-772-1213",
    keyDates: ["Apply any time of year", "Re-enroll if you lose automatic eligibility"],
    notes: "If you qualify for both Medicare and Medicaid (dual eligible), you auto-qualify for Extra Help.",
    color: "oklch(42% 0.10 145)",
  },
  {
    name: "LIHEAP",
    fullName: "Low Income Home Energy Assistance (LIHEAP)",
    description: "Help paying heating and cooling bills.",
    applyUrl: "https://www.acf.hhs.gov/ocs/programs/liheap",
    phone: "1-866-674-6327",
    keyDates: ["Heating assistance: typically Oct – Mar", "Cooling assistance: typically May – Sep"],
    notes: "Apply early — funding runs out. Contact your local Community Action Agency.",
    color: "oklch(55% 0.14 50)",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PrintableChecklist({
  programs = DEFAULT_PROGRAMS,
  userName,
}: PrintableChecklistProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Screen view */}
      <div className="no-print max-w-2xl mx-auto px-4 py-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* Header card */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{
            background: "oklch(97% 0.01 60)",
            border: "1.5px solid oklch(88% 0.04 35)",
            boxShadow: "0 4px 20px oklch(22% 0.03 35 / 0.06)",
          }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText size={20} style={{ color: "oklch(52% 0.14 35)" }} />
                <h2
                  className="text-xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(22% 0.03 35)" }}
                >
                  Benefits Summary
                </h2>
              </div>
              <p className="text-sm" style={{ color: "oklch(50% 0.05 35)" }}>
                {programs.length} program{programs.length !== 1 ? "s" : ""} selected
                {userName ? ` for ${userName}` : ""} · {today}
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                background: "oklch(52% 0.14 35)",
                color: "oklch(97% 0.01 60)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <Printer size={16} />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Program list */}
        <div className="space-y-4">
          {programs.map((prog) => (
            <div
              key={prog.name}
              className="rounded-2xl p-5"
              style={{
                background: "oklch(97% 0.01 60)",
                border: `1.5px solid ${prog.color ? prog.color + "30" : "oklch(88% 0.04 35)"}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: prog.color ?? "oklch(52% 0.14 35)" }}
                />
                <h3
                  className="font-bold text-base"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(22% 0.03 35)" }}
                >
                  {prog.fullName}
                </h3>
              </div>
              <p className="text-sm mb-3 ml-4" style={{ color: "oklch(45% 0.05 35)" }}>
                {prog.description}
              </p>

              <div className="ml-4 flex flex-col gap-2">
                {prog.keyDates && prog.keyDates.length > 0 && (
                  <div className="flex gap-2">
                    <Calendar size={14} className="shrink-0 mt-0.5" style={{ color: "oklch(52% 0.14 35)" }} />
                    <div>
                      {prog.keyDates.map((d) => (
                        <p key={d} className="text-xs" style={{ color: "oklch(40% 0.06 35)" }}>{d}</p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 mt-1">
                  <a
                    href={`tel:${prog.phone.replace(/\D/g, "")}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                    style={{
                      background: "oklch(93% 0.02 60)",
                      color: "oklch(38% 0.08 35)",
                      border: "1px solid oklch(85% 0.03 35)",
                    }}
                  >
                    <Phone size={11} /> {prog.phone}
                  </a>
                  <a
                    href={prog.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                    style={{
                      background: "oklch(93% 0.02 60)",
                      color: "oklch(38% 0.08 35)",
                      border: "1px solid oklch(85% 0.03 35)",
                    }}
                  >
                    <Globe size={11} /> Apply Online
                  </a>
                </div>

                {prog.notes && (
                  <p
                    className="text-xs mt-1 px-3 py-2 rounded-lg"
                    style={{
                      background: "oklch(52% 0.14 35 / 0.07)",
                      color: "oklch(38% 0.08 35)",
                      border: "1px solid oklch(52% 0.14 35 / 0.2)",
                    }}
                  >
                    💡 {prog.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Print-only view — rendered offscreen, revealed by @media print */}
      <div
        ref={printRef}
        className="print-only"
        style={{ display: "none", fontFamily: "Georgia, serif", color: "#000", padding: "24pt" }}
      >
        <div style={{ borderBottom: "3px solid #333", paddingBottom: "12pt", marginBottom: "16pt" }}>
          <h1 style={{ fontSize: "22pt", margin: 0, fontFamily: "Georgia, serif" }}>
            My Benefits Summary
          </h1>
          {userName && <p style={{ margin: "4pt 0 0", fontSize: "11pt" }}>Prepared for: {userName}</p>}
          <p style={{ margin: "4pt 0 0", fontSize: "10pt", color: "#555" }}>Generated: {today}</p>
          <p style={{ margin: "8pt 0 0", fontSize: "9pt", color: "#666", maxWidth: "480pt" }}>
            This summary is a general guide. Contact each program directly to confirm your eligibility.
            Rules vary by state and individual circumstances.
          </p>
        </div>

        {programs.map((prog, i) => (
          <div
            key={prog.name}
            className="print-section"
            style={{
              pageBreakInside: "avoid",
              border: "1px solid #ccc",
              borderRadius: "6pt",
              padding: "12pt",
              marginBottom: "10pt",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "8pt" }}>
              <CheckSquare size={14} style={{ marginTop: "2pt", color: "#333" }} />
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: "13pt", margin: "0 0 4pt", fontFamily: "Georgia, serif" }}>
                  {i + 1}. {prog.fullName}
                </h2>
                <p style={{ fontSize: "10pt", margin: "0 0 6pt", color: "#444" }}>{prog.description}</p>

                {prog.keyDates && (
                  <div style={{ marginBottom: "6pt" }}>
                    <strong style={{ fontSize: "9pt", textTransform: "uppercase", letterSpacing: "0.5pt" }}>
                      Key Dates:
                    </strong>
                    {prog.keyDates.map((d) => (
                      <p key={d} style={{ fontSize: "9pt", margin: "2pt 0", paddingLeft: "8pt" }}>
                        • {d}
                      </p>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", gap: "16pt", fontSize: "9pt" }}>
                  <span>
                    <strong>Phone:</strong> {prog.phone}
                  </span>
                  <span>
                    <strong>Website:</strong> {prog.applyUrl}
                  </span>
                </div>

                {prog.notes && (
                  <p
                    style={{
                      fontSize: "9pt",
                      marginTop: "6pt",
                      padding: "6pt",
                      background: "#f8f8f8",
                      borderLeft: "3pt solid #888",
                      color: "#333",
                    }}
                  >
                    Note: {prog.notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        <div
          style={{
            borderTop: "1px solid #ccc",
            marginTop: "16pt",
            paddingTop: "8pt",
            fontSize: "8pt",
            color: "#666",
          }}
        >
          <p>
            For free benefits counseling, contact your State Health Insurance Assistance Program (SHIP) at{" "}
            <strong>1-877-839-2675</strong> or visit shiphelp.org. This document is not legal or financial advice.
          </p>
        </div>
      </div>
    </>
  );
}
