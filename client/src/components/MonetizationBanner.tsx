/* MonetizationBanner.tsx — HealthCare Select Benefits Hub
 * Design: Warm Abundance — terracotta/cream/forest green, Playfair Display + DM Sans
 * Contextual affiliate, pay-per-call, and lead gen CTAs
 * Shows relevant programs based on the current page category
 */
import { Phone, ExternalLink, Tag, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AFFILIATE_PROGRAMS,
  PAY_PER_CALL_PROGRAMS,
  LEAD_GEN_PROGRAMS,
  CATEGORY_MONETIZATION,
  AffiliateProgram,
  PayPerCallProgram,
  LeadGenProgram,
} from "@/lib/monetizationData";

interface MonetizationBannerProps {
  category?: string; // maps to CATEGORY_MONETIZATION key
  variant?: "inline" | "sidebar" | "full"; // layout variant
  showAffiliate?: boolean;
  showCall?: boolean;
  showLead?: boolean;
  maxItems?: number;
}

function AffiliateProgramCard({ program }: { program: AffiliateProgram }) {
  return (
    <a
      href={program.url}
      target="_blank" rel="noopener noreferrer"
      className="group block border border-border rounded-lg p-4 hover:border-[oklch(0.45 0.08 175)] hover:shadow-md transition-all duration-200 bg-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-sm text-foreground group-hover:text-[oklch(0.45_0.08_175)] transition-colors">
              {program.name}
            </span>
            {program.badge && (
              <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[oklch(0.93_0_0)] text-[oklch(0.45_0.08_175)]">
                {program.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">{program.description}</p>
          <span className="text-xs text-muted-foreground">via {program.network}</span>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <Button size="sm" className="text-xs bg-[oklch(0.45_0.08_175)] hover:bg-[oklch(0.38_0.08_175)] text-white whitespace-nowrap">
            {program.cta}
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </a>
  );
}

function PayPerCallCard({ program }: { program: PayPerCallProgram }) {
  return (
    <div className="border border-[oklch(0.85_0.06_15)] rounded-lg p-4 bg-[oklch(0.97_0.02_15)]">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[oklch(0.55_0.15_15)] flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-sm text-foreground">{program.name}</span>
            {program.badge && (
              <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[oklch(0.55_0.15_15)] text-white">
                {program.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">{program.description}</p>
          <a
            href={`tel:${program.phone.replace(/\D/g, "")}`}
            className="inline-flex items-center gap-2 bg-[oklch(0.55_0.15_15)] hover:bg-[oklch(0.48_0.15_15)] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
            {program.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

function LeadGenCard({ program }: { program: LeadGenProgram }) {
  return (
    <a
      href={program.url}
      target="_blank" rel="noopener noreferrer"
      className="group block border border-[oklch(0.85_0.06_140)] rounded-lg p-4 bg-[oklch(0.96_0.02_140)] hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[oklch(0.45_0.12_140)] flex items-center justify-center shrink-0">
          <Tag className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-sm text-foreground group-hover:text-[oklch(0.35_0.12_140)] transition-colors">
              {program.name}
            </span>
            {program.badge && (
              <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[oklch(0.45_0.12_140)] text-white">
                {program.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">{program.description}</p>
          <span className="text-xs font-semibold text-[oklch(0.35_0.12_140)] group-hover:underline">
            {program.cta} →
          </span>
        </div>
      </div>
    </a>
  );
}

export default function MonetizationBanner({
  category,
  variant = "inline",
  showAffiliate = true,
  showCall = true,
  showLead = true,
  maxItems = 3,
}: MonetizationBannerProps) {
  // Get category-specific program IDs
  const mapping = category ? CATEGORY_MONETIZATION[category] : null;

  const affiliates = showAffiliate
    ? mapping
      ? AFFILIATE_PROGRAMS.filter((p) => mapping.affiliates.includes(p.id)).slice(0, maxItems)
      : AFFILIATE_PROGRAMS.slice(0, maxItems)
    : [];

  const calls = showCall
    ? mapping
      ? PAY_PER_CALL_PROGRAMS.filter((p) => mapping.calls.includes(p.id)).slice(0, 2)
      : PAY_PER_CALL_PROGRAMS.slice(0, 2)
    : [];

  const leads = showLead
    ? mapping
      ? LEAD_GEN_PROGRAMS.filter((p) => mapping.leads.includes(p.id)).slice(0, 2)
      : LEAD_GEN_PROGRAMS.slice(0, 2)
    : [];

  const hasContent = affiliates.length > 0 || calls.length > 0 || leads.length > 0;
  if (!hasContent) return null;

  if (variant === "sidebar") {
    return (
      <aside className="space-y-4">
        {calls.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Free Expert Help
            </h3>
            <div className="space-y-3">
              {calls.map((p) => <PayPerCallCard key={p.id} program={p} />)}
            </div>
          </div>
        )}
        {affiliates.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Recommended Programs
            </h3>
            <div className="space-y-3">
              {affiliates.map((p) => <AffiliateProgramCard key={p.id} program={p} />)}
            </div>
          </div>
        )}
        {leads.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Free Services
            </h3>
            <div className="space-y-3">
              {leads.map((p) => <LeadGenCard key={p.id} program={p} />)}
            </div>
          </div>
        )}
        <p className="text-[10px] text-muted-foreground leading-relaxed border-t border-border pt-3">
          <Shield className="w-3 h-3 inline mr-1" />
          <strong>Disclosure:</strong> HealthCare Select Benefits Hub may earn a commission when you click certain links. This does not affect our editorial independence.{" "}
          <a href="/disclosures" className="underline hover:text-foreground">Learn more</a>
        </p>
      </aside>
    );
  }

  // inline / full variant
  return (
    <section className="rounded-xl border border-border bg-card p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-[oklch(0.45 0.08 175)]" />
          <h3 className="font-semibold text-sm text-foreground">
            {mapping?.headline || "Recommended Programs & Services"}
          </h3>
        </div>
        <a href="/disclosures" className="text-[10px] text-muted-foreground hover:underline flex items-center gap-1">
          <Shield className="w-3 h-3" /> Sponsored
        </a>
      </div>

      {mapping?.subtext && (
        <p className="text-xs text-muted-foreground -mt-3">{mapping.subtext}</p>
      )}

      {calls.length > 0 && (
        <div className="space-y-3">
          {calls.map((p) => <PayPerCallCard key={p.id} program={p} />)}
        </div>
      )}

      {affiliates.length > 0 && (
        <div className="space-y-3">
          {affiliates.map((p) => <AffiliateProgramCard key={p.id} program={p} />)}
        </div>
      )}

      {leads.length > 0 && (
        <div className="space-y-3">
          {leads.map((p) => <LeadGenCard key={p.id} program={p} />)}
        </div>
      )}

      <p className="text-[10px] text-muted-foreground leading-relaxed border-t border-border pt-3">
        <Shield className="w-3 h-3 inline mr-1" />
        <strong>Disclosure:</strong> HealthCare Select Benefits Hub may earn a commission when you click certain links on this page. This does not affect our editorial independence or the programs we list.{" "}
        <a href="/disclosures" className="underline hover:text-foreground">Full disclosure policy</a>
      </p>
    </section>
  );
}
