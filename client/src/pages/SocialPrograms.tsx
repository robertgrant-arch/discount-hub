/* SocialPrograms.tsx — HealthCare Select Benefits Hub Education Hub
 * Warm Abundance design: terracotta/cream/forest palette, Playfair Display headings
 * 16 social programs across 8 categories for disabled Americans
 * Features: category filter, search, expandable program cards with full guides
 */
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import PageHaiku from "@/components/PageHaiku";
import Footer from "@/components/Footer";
import {
  SOCIAL_PROGRAMS,
  CATEGORY_META,
  TOTAL_SOCIAL_PROGRAMS,
  type SocialProgram,
  type ProgramCategory,
} from "@/lib/socialProgramsData";
import {
  DollarSign, HeartPulse, Home as HomeIcon, UtensilsCrossed,
  Briefcase, PiggyBank, Scale, Pill, Tag,
  Search, ChevronDown, ChevronUp, ExternalLink,
  Phone, Globe, CheckCircle2, AlertTriangle,
  BookOpen, ClipboardList, RefreshCw, Link2,
  Users, ShieldCheck, Info,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import MonetizationBanner from "@/components/MonetizationBanner";
import ZipFilter, { useZipFilter } from "@/components/ZipFilter";
import StateProgramsSection from "@/components/StateProgramsSection";
import { TOTAL_STATE_PROGRAMS } from "@/lib/stateProgramsData";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  DollarSign, HeartPulse, Home: HomeIcon, UtensilsCrossed,
  Briefcase, PiggyBank, Scale, Pill, Tag,
};

const CATEGORY_ORDER: ProgramCategory[] = [
  "Income Support", "Healthcare", "Housing", "Food & Nutrition",
  "Employment", "Financial Tools", "Legal Rights", "Prescription Help",
];

function ProgramCard({ program }: { program: SocialProgram }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "apply" | "update" | "links">("overview");

  const meta = CATEGORY_META[program.category];
  const IconComp = ICON_MAP[meta.icon] || Tag;

  return (
    <div
      className="bg-white rounded-2xl border border-[oklch(0.90_0_0)] shadow-sm overflow-hidden transition-shadow hover:shadow-md"
    >
      {/* Card header */}
      <button
        className="w-full text-left p-5 flex items-start gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: meta.bg }}
        >
          <IconComp className="w-5 h-5" style={{ color: meta.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5 inline-block"
                style={{ background: meta.bg, color: meta.color }}
              >
                {program.category}
              </span>
              <h3
                className="text-lg font-bold text-[#0E5659] leading-snug"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {program.program_name}
              </h3>
              <p className="text-xs text-[oklch(0.55_0.03_60)] mt-0.5">{program.agency}</p>
              <PageHaiku lines={["Programs built with care", "A safety net woven strong", "No one falls alone"]} />
            </div>
            <div className="shrink-0 mt-1">
              {expanded
                ? <ChevronUp className="w-5 h-5 text-[oklch(0.60_0.03_60)]" />
                : <ChevronDown className="w-5 h-5 text-[oklch(0.60_0.03_60)]" />
              }
            </div>
          </div>
          <p className="text-sm text-[oklch(0.45_0.03_60)] mt-2 leading-relaxed line-clamp-2">
            {program.overview}
          </p>
          {/* Quick contact pills */}
          <div className="flex flex-wrap gap-2 mt-3">
            {program.contact.phone && (
              <a
                href={`tel:${program.contact.phone.replace(/\D/g, '')}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-[#FCF3EA] text-[#374151] hover:bg-[#f0e6d9] transition-colors"
              >
                <Phone className="w-3 h-3" /> {program.contact.phone}
              </a>
            )}
            {program.how_to_apply.portal_url && (
              <a
                href={program.how_to_apply.portal_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full text-white transition-colors"
                style={{ background: meta.color }}
              >
                <Globe className="w-3 h-3" /> Apply Online
              </a>
            )}
          </div>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-[oklch(0.90_0_0)]">
          {/* Tab bar */}
          <div className="flex border-b border-[oklch(0.90_0_0)] bg-[oklch(0.98_0.008_80)]">
            {([
              { id: "overview", label: "Overview", icon: BookOpen },
              { id: "apply", label: "How to Apply", icon: ClipboardList },
              { id: "update", label: "Update Info", icon: RefreshCw },
              { id: "links", label: "Official Links", icon: Link2 },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold transition-colors border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-current"
                    : "border-transparent text-[oklch(0.45_0_0)] hover:text-[#0E5659]"
                }`}
                style={activeTab === tab.id ? { color: meta.color, borderColor: meta.color } : {}}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-5">
            {/* Overview tab */}
            {activeTab === "overview" && (
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-bold text-[#0E5659] mb-2 flex items-center gap-1.5">
                    <Info className="w-4 h-4" style={{ color: meta.color }} /> About This Program
                  </h4>
                  <p className="text-sm text-[#374151] leading-relaxed">{program.overview}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#0E5659] mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" style={{ color: meta.color }} /> What You Receive
                  </h4>
                  <div
                    className="rounded-xl p-4 text-sm text-[#0E5659] leading-relaxed"
                    style={{ background: meta.bg }}
                  >
                    {program.benefits}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#0E5659] mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4" style={{ color: meta.color }} /> Eligibility Requirements
                  </h4>
                  <ul className="space-y-1.5">
                    {program.eligibility.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#374151]">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: meta.color }} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {program.key_rules.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-[#0E5659] mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" style={{ color: meta.color }} /> Key Rules & Deadlines
                    </h4>
                    <ul className="space-y-1.5">
                      {program.key_rules.map((rule, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#374151]">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: meta.color }} />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {program.common_mistakes.length > 0 && (
                  <div className="rounded-xl border border-[oklch(0.85_0_0)] bg-[oklch(0.97_0.02_50)] p-4">
                    <h4 className="text-sm font-bold text-[oklch(0.35_0_0)] mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-[oklch(0.55_0.12_50)]" /> Common Mistakes to Avoid
                    </h4>
                    <ul className="space-y-1.5">
                      {program.common_mistakes.map((mistake, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[oklch(0.40_0.05_50)]">
                          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[oklch(0.55_0.12_50)]" />
                          {mistake}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {program.related_programs.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-[#0E5659] mb-2">Related Programs</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.related_programs.map((prog, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[oklch(0.93_0.02_80)] text-[#374151]">
                          {prog}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* How to Apply tab */}
            {activeTab === "apply" && (
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-bold text-[#0E5659] mb-3 flex items-center gap-1.5">
                    <ClipboardList className="w-4 h-4" style={{ color: meta.color }} /> Step-by-Step Application Guide
                  </h4>
                  {program.how_to_apply.steps.length > 0 ? (
                    <ol className="space-y-3">
                      {program.how_to_apply.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                            style={{ background: meta.color }}
                          >
                            {i + 1}
                          </div>
                          <p className="text-sm text-[#374151] leading-relaxed">{step}</p>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-sm text-[oklch(0.45_0_0)]">Visit the official portal to begin your application.</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {program.how_to_apply.portal_url && (
                    <a
                      href={program.how_to_apply.portal_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-3.5 rounded-xl border-2 transition-all hover:shadow-md group"
                      style={{ borderColor: meta.color + "40", background: meta.bg }}
                    >
                      <Globe className="w-5 h-5 shrink-0" style={{ color: meta.color }} />
                      <div>
                        <p className="text-xs font-bold" style={{ color: meta.color }}>Apply Online</p>
                        <p className="text-xs text-[oklch(0.45_0_0)] truncate">{program.how_to_apply.portal_url.replace('https://', '')}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 ml-auto shrink-0 opacity-50 group-hover:opacity-100" style={{ color: meta.color }} />
                    </a>
                  )}
                  {program.how_to_apply.phone && (
                    <a
                      href={`tel:${program.how_to_apply.phone.replace(/\D/g, '')}`}
                      className="flex items-center gap-2.5 p-3.5 rounded-xl border border-[oklch(0.90_0_0)] bg-white transition-all hover:shadow-md"
                    >
                      <Phone className="w-5 h-5 shrink-0 text-[oklch(0.45_0_0)]" />
                      <div>
                        <p className="text-xs font-bold text-[#0E5659]">Call to Apply</p>
                        <p className="text-xs text-[oklch(0.45_0_0)]">{program.how_to_apply.phone}</p>
                        {program.how_to_apply.tty && (
                          <p className="text-xs text-[oklch(0.60_0.03_60)]">TTY: {program.how_to_apply.tty}</p>
                        )}
                      </div>
                    </a>
                  )}
                </div>

                {program.contact.hours && (
                  <p className="text-xs text-[oklch(0.55_0.03_60)] bg-[#FCF3EA] rounded-lg px-3 py-2">
                    <span className="font-semibold">Hours:</span> {program.contact.hours}
                  </p>
                )}
              </div>
            )}

            {/* Update Info tab */}
            {activeTab === "update" && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-[#0E5659] mb-2 flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4" style={{ color: meta.color }} /> How to Update Your Information
                  </h4>
                  <div className="text-sm text-[#374151] leading-relaxed whitespace-pre-line bg-[oklch(0.98_0.008_80)] rounded-xl p-4 border border-[oklch(0.90_0_0)]">
                    {program.how_to_update_info || "Contact the agency directly to report changes to your income, address, household size, or other relevant information. Timely reporting helps prevent overpayments and ensures you receive the correct benefit amount."}
                  </div>
                </div>

                <div className="rounded-xl border border-[oklch(0.85_0_0)] bg-[oklch(0.97_0.02_50)] p-4">
                  <p className="text-xs font-bold text-[oklch(0.35_0_0)] mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Important Reminder
                  </p>
                  <p className="text-xs text-[oklch(0.40_0.05_50)]">
                    Always report changes to your income, living situation, or household promptly. Failure to report changes can result in overpayments that must be repaid, or underpayments that reduce your benefits.
                  </p>
                </div>

                {program.contact.phone && (
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`tel:${program.contact.phone.replace(/\D/g, '')}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl text-white"
                      style={{ background: meta.color }}
                    >
                      <Phone className="w-4 h-4" /> Call {program.contact.phone}
                    </a>
                    {program.contact.website && (
                      <a
                        href={program.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl border border-[oklch(0.90_0_0)] text-[#374151] hover:bg-[oklch(0.95_0.01_80)]"
                      >
                        <Globe className="w-4 h-4" /> Update Online
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Official Links tab */}
            {activeTab === "links" && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#0E5659] mb-3 flex items-center gap-1.5">
                  <Link2 className="w-4 h-4" style={{ color: meta.color }} /> Official Government Resources
                </h4>
                {program.official_links.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {program.official_links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 p-3 rounded-xl border border-[oklch(0.90_0_0)] bg-white hover:bg-[#FCF3EA] hover:border-[oklch(0.80_0.03_75)] transition-all group"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: meta.bg }}
                        >
                          <Globe className="w-3.5 h-3.5" style={{ color: meta.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[oklch(0.30_0.04_50)] truncate">{link.label}</p>
                          <p className="text-[10px] text-[oklch(0.60_0.03_60)] truncate">{link.url.replace('https://', '').replace('http://', '')}</p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[oklch(0.65_0.03_60)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[oklch(0.45_0_0)]">Visit the agency's official website for more resources.</p>
                )}

                {/* Contact block */}
                {(program.contact.phone || program.contact.website) && (
                  <div className="mt-4 pt-4 border-t border-[oklch(0.90_0_0)]">
                    <h5 className="text-xs font-bold text-[#374151] mb-2 uppercase tracking-wider">Direct Contact</h5>
                    <div className="flex flex-wrap gap-2">
                      {program.contact.phone && (
                        <a href={`tel:${program.contact.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-[#FCF3EA] text-[#374151]">
                          <Phone className="w-3 h-3" /> {program.contact.phone}
                        </a>
                      )}
                      {program.contact.tty && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-[#FCF3EA] text-[#374151]">
                          TTY: {program.contact.tty}
                        </span>
                      )}
                      {program.contact.website && (
                        <a href={program.contact.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full text-white" style={{ background: meta.color }}>
                          <Globe className="w-3 h-3" /> Official Website
                        </a>
                      )}
                    </div>
                    {program.contact.hours && (
                      <p className="text-xs text-[oklch(0.60_0.03_60)] mt-2">{program.contact.hours}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SocialPrograms() {
  const [activeCategory, setActiveCategory] = useState<ProgramCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [mainTab, setMainTab] = useState<"federal" | "state">("federal");
  const { zipFilter, setZipFilter } = useZipFilter();

  const filtered = useMemo(() => {
    return SOCIAL_PROGRAMS.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          p.program_name.toLowerCase().includes(q) ||
          p.overview.toLowerCase().includes(q) ||
          p.agency.toLowerCase().includes(q) ||
          p.benefits.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeCategory, search]);

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(1_0_0)]">
      <Navbar />

      {/* Page hero */}
      <div
        className="relative border-b border-[oklch(0.90_0_0)]"
        style={{ background: "linear-gradient(135deg, #0E5659 0%, #0a3f42 100%)" }}
      >
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative container py-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-white/20">
              <BookOpen className="w-3.5 h-3.5" />
              Social Programs Education Hub
            </div>
            <h1
              className="text-4xl font-bold text-white mb-3 leading-tight"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Benefits & Resources for Disabled Americans
            </h1>
            <p className="text-white/80 text-base leading-relaxed mb-6">
              Comprehensive guides to {TOTAL_SOCIAL_PROGRAMS} federal programs + {TOTAL_STATE_PROGRAMS}+ state & local programs — from Social Security and Medicaid to state property tax relief, pharmaceutical assistance, and local senior services. Enter your ZIP code to see what's available in your area.
            </p>
            {/* Quick stat pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: `${TOTAL_SOCIAL_PROGRAMS} Programs`, icon: ClipboardList },
                { label: "8 Categories", icon: Tag },
                { label: "Official Gov Links", icon: ShieldCheck },
                { label: "Step-by-Step Guides", icon: CheckCircle2 },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-1.5 bg-white/15 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">
                  <stat.icon className="w-3 h-3" />
                  {stat.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main tab switcher */}
      <div className="bg-white border-b border-[oklch(0.90_0_0)] sticky top-16 z-30 shadow-sm">
        <div className="container">
          <div className="flex items-center gap-1 border-b border-transparent -mb-px">
            <button
              onClick={() => setMainTab("federal")}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                mainTab === "federal"
                  ? "border-[#0E5659] text-[#0E5659]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Federal Programs ({TOTAL_SOCIAL_PROGRAMS})
            </button>
            <button
              onClick={() => setMainTab("state")}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
                mainTab === "state"
                  ? "border-[#0E5659] text-[#0E5659]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              State & Local Programs ({TOTAL_STATE_PROGRAMS}+)
              <span className="text-[10px] font-bold bg-[#0E5659] text-white px-1.5 py-0.5 rounded-full">NEW</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search + category filter bar — only for federal tab */}
      {mainTab === "federal" && <div className="bg-white border-b border-[oklch(0.90_0_0)] shadow-sm">
        <div className="container py-3">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.60_0.03_60)]" />
              <Input
                placeholder="Search programs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-[#FCF3EA] border-[oklch(0.90_0_0)] h-9 text-sm"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  activeCategory === "all"
                    ? "bg-[#0E5659] text-white border-[#0E5659]"
                    : "border-[oklch(0.90_0_0)] text-[oklch(0.45_0_0)] hover:border-[#4CC0AE]"
                }`}
              >
                All ({TOTAL_SOCIAL_PROGRAMS})
              </button>
              {CATEGORY_ORDER.map((cat) => {
                const meta = CATEGORY_META[cat];
                const count = SOCIAL_PROGRAMS.filter((p) => p.category === cat).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                      activeCategory === cat
                        ? "text-white border-transparent"
                        : "border-[oklch(0.90_0_0)] text-[oklch(0.45_0_0)] hover:border-[#4CC0AE]"
                    }`}
                    style={activeCategory === cat ? { background: meta.color } : {}}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>}

      {/* State & Local Programs tab content */}
      {mainTab === "state" && (
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <StateProgramsSection
                showZipFilter={true}
                title="State & Local Programs"
              />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <MonetizationBanner
                category="Healthcare and Pharmacy"
                variant="sidebar"
                showAffiliate={true}
                showCall={true}
                showLead={true}
                maxItems={3}
              />
            </div>
          </div>
        </div>
      )}

      {/* Federal Programs tab content */}
      {mainTab === "federal" && (<div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
        {/* Category overview grid — only show when "all" selected and no search */}
        {activeCategory === "all" && !search && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {CATEGORY_ORDER.map((cat) => {
              const meta = CATEGORY_META[cat];
              const IconComp = ICON_MAP[meta.icon] || Tag;
              const count = SOCIAL_PROGRAMS.filter((p) => p.category === cat).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="group text-left p-4 rounded-xl border border-[oklch(0.90_0_0)] bg-white hover:shadow-md transition-all"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-2.5"
                    style={{ background: meta.bg }}
                  >
                    <IconComp className="w-4.5 h-4.5" style={{ color: meta.color }} />
                  </div>
                  <p className="text-sm font-bold text-[#0E5659] leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {cat}
                  </p>
                  <p className="text-xs text-[oklch(0.55_0.03_60)] mt-0.5">{count} program{count !== 1 ? "s" : ""}</p>
                  <p className="text-xs text-[oklch(0.60_0.03_60)] mt-1 leading-snug">{meta.description}</p>
                </button>
              );
            })}
          </div>
        )}

        {/* Program list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[oklch(0.45_0_0)]">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No programs found</p>
            <p className="text-sm mt-1">Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeCategory !== "all" && (
              <div className="flex items-center gap-2 mb-2">
                {(() => {
                  const meta = CATEGORY_META[activeCategory as ProgramCategory];
                  const IconComp = ICON_MAP[meta.icon] || Tag;
                  return (
                    <>
                      <IconComp className="w-5 h-5" style={{ color: meta.color }} />
                      <h2 className="text-xl font-bold text-[#0E5659]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {activeCategory}
                      </h2>
                      <span className="text-xs text-[oklch(0.60_0.03_60)] bg-[oklch(0.93_0.02_80)] px-2 py-0.5 rounded-full">
                        {filtered.length} program{filtered.length !== 1 ? "s" : ""}
                      </span>
                    </>
                  );
                })()}
              </div>
            )}
            {filtered.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}

        {/* Bottom disclaimer */}
        <div className="mt-10 p-5 rounded-xl bg-[#FCF3EA] border border-[oklch(0.90_0_0)] text-center">
          <p className="text-xs text-[oklch(0.45_0_0)] leading-relaxed max-w-2xl mx-auto">
            <span className="font-semibold text-[#374151]">Disclaimer:</span> The information on this page is provided for educational purposes and is sourced from official government websites. Program rules, benefit amounts, and eligibility requirements may change. Always verify current information directly with the relevant agency before making decisions.
          </p>
        </div>
        </div>{/* end main col */}
        {/* Monetization sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <MonetizationBanner
            category="Healthcare and Pharmacy"
            variant="sidebar"
            showAffiliate={true}
            showCall={true}
            showLead={true}
            maxItems={3}
          />
          <MonetizationBanner
            category="Financial Services and Insurance"
            variant="sidebar"
            showAffiliate={true}
            showCall={true}
            showLead={false}
            maxItems={2}
          />
        </div>
        </div>{/* end grid */}
      </div>)}

      <Footer />
    </div>
  );
}
