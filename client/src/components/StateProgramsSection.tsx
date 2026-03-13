/* StateProgramsSection.tsx — HealthCare Select Benefits Hub
 * Embeddable section showing state & local programs filtered by zip code
 * Design: Warm Abundance — terracotta/cream/forest green
 */
import { useState, useMemo } from "react";
import { MapPin, ExternalLink, Phone, ChevronDown, ChevronUp, Globe, Building2 } from "lucide-react";
import ZipFilter, { useZipFilter } from "@/components/ZipFilter";
import { STATE_PROGRAMS, getProgramsForState, type StateProgram } from "@/lib/stateProgramsData";

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  "Income Support":        { bg: "oklch(0.93 0.04 42)",  color: "oklch(0.45 0.13 42)" },
  "Healthcare":            { bg: "oklch(0.93 0.04 15)",  color: "oklch(0.50 0.15 15)" },
  "Housing":               { bg: "oklch(0.92 0.04 200)", color: "oklch(0.45 0.12 200)" },
  "Food & Nutrition":      { bg: "oklch(0.92 0.04 140)", color: "oklch(0.40 0.10 140)" },
  "Employment":            { bg: "oklch(0.93 0.03 260)", color: "oklch(0.45 0.10 260)" },
  "Financial Tools":       { bg: "oklch(0.93 0.04 80)",  color: "oklch(0.45 0.08 80)" },
  "Legal Rights":          { bg: "oklch(0.92 0.03 300)", color: "oklch(0.45 0.10 300)" },
  "Prescription Help":     { bg: "oklch(0.93 0.04 42)",  color: "oklch(0.45 0.13 42)" },
  "Transportation":        { bg: "oklch(0.92 0.04 220)", color: "oklch(0.40 0.12 220)" },
  "Property Tax Relief":   { bg: "oklch(0.93 0.03 90)",  color: "oklch(0.40 0.08 90)" },
  "Utility Assistance":    { bg: "oklch(0.92 0.04 50)",  color: "oklch(0.45 0.10 50)" },
  "Nutrition Programs":    { bg: "oklch(0.92 0.04 140)", color: "oklch(0.40 0.10 140)" },
};

function getProgramColor(category: string) {
  return CATEGORY_COLORS[category] || { bg: "oklch(0.93 0.02 80)", color: "oklch(0.45 0.06 80)" };
}

function StateProgramCard({ program }: { program: StateProgram }) {
  const [expanded, setExpanded] = useState(false);
  const colors = getProgramColor(program.category);

  const scopeLabel = program.state === "Federal"
    ? "Federal — All States"
    : program.state === "Local"
    ? `Local — ${program.region}`
    : `${program.stateName} State Program`;

  const scopeIcon = program.state === "Federal"
    ? <Globe className="w-3 h-3" />
    : <Building2 className="w-3 h-3" />;

  return (
    <div className="bg-white rounded-xl border border-[oklch(0.90_0_0)] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <button
        className="w-full text-left p-4 flex items-start gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
          style={{ background: colors.bg, color: colors.color }}
        >
          {program.state === "Federal" ? "US" : program.state === "Local" ? "LC" : program.state}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm text-[oklch(0.15_0.04_175)] leading-snug pr-2">{program.name}</h3>
            {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />}
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ background: colors.bg, color: colors.color }}
            >
              {scopeIcon} {scopeLabel}
            </span>
            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {program.category}
            </span>
          </div>
          {!expanded && program.benefit && (
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">{program.benefit}</p>
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-[oklch(0.92_0.02_80)] pt-3 space-y-3">
          {program.eligibility && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1">Eligibility</p>
              <p className="text-xs text-foreground leading-relaxed">{program.eligibility}</p>
            </div>
          )}
          {program.benefit && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1">What You Receive</p>
              <p className="text-xs text-foreground leading-relaxed">{program.benefit}</p>
            </div>
          )}
          {program.howToApply && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1">How to Apply</p>
              <p className="text-xs text-foreground leading-relaxed">{program.howToApply}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-2 pt-1">
            {program.website && program.website !== "N/A" && program.website.startsWith("http") && (
              <a
                href={program.website}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[oklch(0.45 0.08 175)] text-[oklch(0.45_0.08_175)] hover:bg-[oklch(0.93_0_0)] transition-colors"
              >
                <ExternalLink className="w-3 h-3" /> Visit Website
              </a>
            )}
            {program.phone && program.phone !== "N/A" && program.phone.replace(/\D/g, "").length >= 7 && (
              <a
                href={`tel:${program.phone.replace(/\D/g, "")}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[oklch(0.55_0.15_15)] text-[oklch(0.45_0.15_15)] hover:bg-[oklch(0.95_0.04_15)] transition-colors"
              >
                <Phone className="w-3 h-3" /> {program.phone}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface StateProgramsSectionProps {
  filterCategory?: string;
  maxItems?: number;
  showZipFilter?: boolean;
  title?: string;
}

export default function StateProgramsSection({
  filterCategory,
  maxItems,
  showZipFilter = true,
  title = "State & Local Programs",
}: StateProgramsSectionProps) {
  const { zipFilter, setZipFilter } = useZipFilter();
  const [showAll, setShowAll] = useState(false);

  const programs = useMemo(() => {
    let list: StateProgram[];
    if (zipFilter.active && zipFilter.stateCode) {
      list = getProgramsForState(zipFilter.stateCode);
    } else {
      // Show a sample of federal programs when no zip entered
      list = STATE_PROGRAMS.filter(p => p.state === "Federal");
    }
    if (filterCategory) {
      list = list.filter(p => p.category === filterCategory);
    }
    return list;
  }, [zipFilter, filterCategory]);

  const displayed = showAll || !maxItems ? programs : programs.slice(0, maxItems);
  const hasMore = maxItems && programs.length > maxItems && !showAll;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-[oklch(0.15_0.04_175)]">
            {title}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {zipFilter.active
              ? `${programs.length} programs available in ${zipFilter.city ? `${zipFilter.city}, ` : ""}${zipFilter.stateName}`
              : `Enter your ZIP code to see state-specific programs (${STATE_PROGRAMS.filter(p => p.state === "Federal").length} federal programs shown)`}
          </p>
        </div>
      </div>

      {showZipFilter && (
        <div className="bg-[oklch(0.96_0.02_42)] rounded-xl border border-[oklch(0.88_0_0)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-[oklch(0.45 0.08 175)]" />
            <span className="text-sm font-semibold text-[oklch(0.35_0.06_42)]">
              Find programs in your area
            </span>
          </div>
          <ZipFilter
            value={zipFilter}
            onChange={setZipFilter}
            placeholder="Enter your ZIP code (e.g. 90210)"
          />
        </div>
      )}

      {displayed.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <MapPin className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p className="font-medium text-sm">No programs found for this area</p>
          <p className="text-xs mt-1">Try a different ZIP code or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {displayed.map((p) => (
            <StateProgramCard key={p.id} program={p} />
          ))}
        </div>
      )}

      {hasMore && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full py-2.5 text-sm font-semibold text-[oklch(0.45_0.08_175)] border border-[oklch(0.82_0.06_42)] rounded-lg hover:bg-[oklch(0.93_0_0)] transition-colors"
        >
          Show {programs.length - (maxItems || 0)} more programs
        </button>
      )}
    </div>
  );
}
