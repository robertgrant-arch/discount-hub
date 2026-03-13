/* Coupons Page — Warm Abundance design
 * 212+ senior and disability coupons across 8 categories
 * Freemium gating: first 2 per category free, rest locked
 */
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CouponCard from "@/components/CouponCard";
import { COUPON_DATA, TOTAL_COUPONS } from "@/lib/couponData";
import {
  ShoppingCart, HeartPulse, UtensilsCrossed, ShoppingBag,
  Plane, Ticket, Home as HomeIcon, Globe, Tag,
  Search, SlidersHorizontal, Scissors
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import ZipFilter, { useZipFilter } from "@/components/ZipFilter";
import { REGIONAL_COUPONS, getCouponsForState } from "@/lib/stateProgramsData";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  ShoppingCart, HeartPulse, UtensilsCrossed, ShoppingBag,
  Plane, Ticket, Home: HomeIcon, Globe, Tag,
};

type AudienceTab = "all" | "senior" | "disability";

const TYPE_FILTERS = ["All Types", "Digital", "Printable", "Promo Code", "Loyalty Program", "In-Store"];

export default function Coupons() {
  const [activeTab, setActiveTab] = useState<AudienceTab>("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const { zipFilter, setZipFilter } = useZipFilter();
  const [showRegional, setShowRegional] = useState(false);

  const filteredData = useMemo(() => {
    return COUPON_DATA.map((cat) => {
      if (activeCategory !== "all" && cat.id !== activeCategory) return null;

      let items = cat.coupons.filter((item) => {
        // Audience filter
        if (activeTab === "senior" && item.audience === "disability") return false;
        if (activeTab === "disability" && item.audience === "senior") return false;

        // Type filter
        if (typeFilter !== "All Types" && !item.type.toLowerCase().includes(typeFilter.toLowerCase())) return false;

        // Search
        if (search.trim()) {
          const q = search.toLowerCase();
          return (
            item.name.toLowerCase().includes(q) ||
            item.discount.toLowerCase().includes(q) ||
            item.eligibility.toLowerCase().includes(q) ||
            item.notes?.toLowerCase().includes(q)
          );
        }
        return true;
      });

      if (items.length === 0) return null;
      return { ...cat, items };
    }).filter(Boolean) as Array<typeof COUPON_DATA[0] & { items: typeof COUPON_DATA[0]["coupons"] }>;
  }, [activeTab, activeCategory, search, typeFilter]);

  const totalVisible = filteredData.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.98_0.012_80)]">
      <Navbar />

      {/* Page header */}
      <div
            className="relative border-b border-[oklch(0.88_0.02_75)]"
            style={{ background: "oklch(0.96 0.03 75)" }}
          >
            <div className="hidden" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
            <div className="relative container py-12">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-[oklch(0.93_0.04_42)] text-[oklch(0.40_0.13_42)] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                  <Scissors className="w-3.5 h-3.5" />
                  Coupons & Savings Hub
                </div>
                <h1
                  className="text-4xl font-bold text-[oklch(0.22_0.02_50)] mb-3 leading-tight"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Coupons & Savings Deals
                </h1>
                <p className="text-[oklch(0.45_0.04_60)] text-base leading-relaxed mb-6">
                  {totalVisible} coupons across {filteredData.length} categories — printable, digital, and promo codes for seniors and disabled Americans.
                </p>
                {/* Quick stat pills */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: `${totalVisible} Coupons`, icon: Scissors },
                    { label: `${filteredData.length} Categories`, icon: Tag },
                    { label: "Printable & Digital", icon: Globe },
                  ].map((stat) => (
                    <div key={stat.label} className="inline-flex items-center gap-1.5 bg-[oklch(0.93_0.04_42)] text-[oklch(0.40_0.13_42)] text-xs font-medium px-3 py-1.5 rounded-full">
                      <stat.icon className="w-3 h-3" />
                      {stat.label}
                    </div>
                  ))}
                </div>
              </div>
            <div>
        <div className="container pt-10 pb-6">
          {/* ZIP filter + Search row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ZipFilter
              value={zipFilter}
              onChange={(v) => { setZipFilter(v); if (v.active) setShowRegional(true); }}
              placeholder="Enter ZIP to see local deals (e.g. 90210)"
              compact={false}
            />
                        <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.60_0.03_60)]" />
              <Input
                placeholder="Search coupons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-[oklch(0.97_0.01_80)] border-[oklch(0.88_0.02_75)]"
              />
            </div>
                      </div>
            <div className="flex items-center gap-2 flex-wrap mt-4">
              {TYPE_FILTERS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    typeFilter === t
                      ? "border-[oklch(0.45 0.08 175)] bg-[oklch(0.93_0.04_42)] text-[oklch(0.40_0.13_42)]"
                      : "border-[oklch(0.88_0.02_75)] text-[oklch(0.52_0.04_60)] hover:border-[oklch(0.72_0.04_60)]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
                  </div>
        

        {/* Audience tabs */}
        <div className="container pb-0">
          <div className="flex gap-1 border-b border-[oklch(0.88_0.02_75)]">
            {(["all", "senior", "disability"] as AudienceTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-[oklch(0.45 0.08 175)] text-[oklch(0.45 0.08 175)]"
                    : "border-transparent text-[oklch(0.52_0.04_60)] hover:text-[oklch(0.35_0.04_50)]"
                }`}
              >
                {tab === "all" ? "All Coupons" : tab === "senior" ? "Senior Coupons" : "Disability Coupons"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-52 shrink-0">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[oklch(0.52_0.04_60)] mb-3">
            Categories
          </h3>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveCategory("all")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                activeCategory === "all"
                  ? "bg-[oklch(0.93_0.04_42)] text-[oklch(0.40_0.13_42)] font-medium"
                  : "text-[oklch(0.45_0.03_60)] hover:bg-[oklch(0.95_0.015_80)]"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              All Categories
            </button>
            {COUPON_DATA.map((cat) => {
              const IconComp = ICON_MAP[cat.icon] || Tag;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                    activeCategory === cat.id
                      ? "bg-[oklch(0.93_0.04_42)] text-[oklch(0.40_0.13_42)] font-medium"
                      : "text-[oklch(0.45_0.03_60)] hover:bg-[oklch(0.95_0.015_80)]"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5 shrink-0" />
                  <span className="flex-1 truncate">{cat.category}</span>
                  <span className="text-xs text-[oklch(0.65_0.03_60)]">{cat.coupons.length}</span>
                </button>
              );
            })}
          </nav>

          {/* Upgrade nudge */}
          <div
            className="mt-6 rounded-xl p-4 text-center"
            style={{ background: "linear-gradient(135deg, oklch(0.93 0.04 42), oklch(0.90 0.03 80))" }}
          >
            <Scissors className="w-6 h-6 mx-auto mb-2" style={{ color: "oklch(0.45 0.08 175)" }} />
            <p className="text-xs font-semibold text-[oklch(0.35_0.04_50)] mb-2">
              Unlock all {TOTAL_COUPONS}+ coupons
            </p>
            <Link href="/pricing">
              <button
                className="w-full py-1.5 rounded-lg text-xs font-bold text-white"
                style={{ background: "oklch(0.68 0.15 55)" }}
              >
                Upgrade from $4.99
              </button>
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {filteredData.length === 0 ? (
            <div className="text-center py-16 text-[oklch(0.52_0.04_60)]">
              <Scissors className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No coupons found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-10">
              {filteredData.map((cat) => (
                <section key={cat.id}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const IconComp = ICON_MAP[cat.icon] || Tag;
                        return <IconComp className="w-4 h-4" style={{ color: "oklch(0.45 0.08 175)" }} />;
                      })()}
                      <h2
                        className="text-xl font-bold text-[oklch(0.22_0.02_50)]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {cat.category}
                      </h2>
                      <span className="text-xs text-[oklch(0.60_0.03_60)] bg-[oklch(0.93_0.02_80)] px-2 py-0.5 rounded-full">
                        {cat.items.length} coupons
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {cat.items.map((item, idx) => (
                      <CouponCard
                        key={`${cat.id}-${idx}`}
                        item={item}
                        index={idx}
                        categoryId={cat.id}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Regional & Local Coupons section */}
      {(showRegional || zipFilter.active) && (
        <div className="container py-8 border-t border-[oklch(0.88_0.02_75)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[oklch(0.22_0.02_50)]">
                Regional & Local Deals
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {zipFilter.active && zipFilter.stateCode
                  ? `Local programs for ${zipFilter.city ? `${zipFilter.city}, ` : ""}${zipFilter.stateName}`
                  : "Regional discount programs and local deals"}
              </p>
            </div>
            {!zipFilter.active && (
              <span className="text-xs text-muted-foreground">Enter ZIP above to filter by location</span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(zipFilter.active && zipFilter.stateCode
              ? getCouponsForState(zipFilter.stateCode)
              : REGIONAL_COUPONS.slice(0, 12)
            ).map((p) => (
              <div key={p.id} className="bg-white rounded-xl border border-dashed border-[oklch(0.75_0.06_42)] p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-sm text-[oklch(0.22_0.02_50)] leading-snug">{p.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[oklch(0.93_0.04_42)] text-[oklch(0.45_0.13_42)] shrink-0">
                    {p.state === "Federal" ? "National" : p.stateName}
                  </span>
                </div>
                <p className="text-xs text-[oklch(0.45 0.08 175)] font-semibold mb-1">{p.benefit}</p>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{p.eligibility}</p>
                <div className="flex gap-2">
                  {p.website && p.website.startsWith("http") && (
                    <a href={p.website} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-semibold text-[oklch(0.45_0.13_42)] hover:underline flex items-center gap-1">
                      Visit Site
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      </div>
      </div>
      <Footer />
    </div>
  );
}
