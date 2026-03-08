/* Discounts Browse Page — Warm Abundance design
 * Category pills, senior/disability tabs, discount grid with gating
 */
import { useState, useMemo } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import PageHaiku from "@/components/PageHaiku";
import Footer from "@/components/Footer";
import DiscountCard from "@/components/DiscountCard";
import { DISCOUNT_DATA } from "@/lib/discountData";
import {
  UtensilsCrossed, ShoppingBag, Hotel, Plane, Ticket,
  HeartPulse, ShoppingCart, Home as HomeIcon, DollarSign, Laptop, Tag,
  Search, SlidersHorizontal
} from "lucide-react";
import { Input } from "@/components/ui/input";
import ZipFilter, { useZipFilter } from "@/components/ZipFilter";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  UtensilsCrossed, ShoppingBag, Hotel, Plane, Ticket,
  HeartPulse, ShoppingCart, Home: HomeIcon, DollarSign, Laptop, Tag,
};

type AudienceTab = "all" | "senior" | "disability";

export default function Discounts() {
  const [activeTab, setActiveTab] = useState<AudienceTab>("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const { zipFilter, setZipFilter } = useZipFilter();

  const filteredData = useMemo(() => {
    return DISCOUNT_DATA.map((cat) => {
      if (activeCategory !== "all" && cat.id !== activeCategory) return null;

      let items = [
        ...(activeTab !== "disability" ? cat.senior : []),
        ...(activeTab !== "senior" ? cat.disability : []),
      ];

      if (search.trim()) {
        const q = search.toLowerCase();
        items = items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.discount.toLowerCase().includes(q) ||
            item.conditions.toLowerCase().includes(q)
        );
      }

      if (items.length === 0) return null;
      return { ...cat, items };
    }).filter(Boolean) as Array<typeof DISCOUNT_DATA[0] & { items: typeof DISCOUNT_DATA[0]["senior"] }>;
  }, [activeTab, activeCategory, search]);

  const totalVisible = filteredData.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.98_0.012_80)]">
      <Navbar />

      {/* Page header */}
      <div className="bg-white border-b border-[oklch(0.88_0.02_75)]">
        <div className="container py-8">
          <h1 className="text-3xl font-bold text-[oklch(0.22_0.02_50)] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Browse All Discounts
          </h1>
              <PageHaiku lines={["Discounts wait like fruit", "Ripe upon the autumn bough", "Reach and save today"]} />
          <p className="text-[oklch(0.52_0.04_60)]">
            {totalVisible} programs across {filteredData.length} categories
          </p>

          {/* ZIP filter + Search row */}
          <div className="mt-4 flex flex-wrap gap-3 items-start">
            <div className="flex-1 min-w-[220px] max-w-xs">
              <ZipFilter
                value={zipFilter}
                onChange={setZipFilter}
                placeholder="Filter by ZIP code"
                compact={false}
              />
            </div>
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.60_0.03_60)]" />
              <Input
                placeholder="Search by company, discount type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-[oklch(0.97_0.01_80)] border-[oklch(0.88_0.02_75)]"
              />
            </div>
          </div>
        </div>

        {/* Audience tabs */}
        <div className="container pb-0">
          <div className="flex gap-1 border-b border-[oklch(0.88_0.02_75)]">
            {(["all", "senior", "disability"] as AudienceTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-[oklch(0.55_0.13_42)] text-[oklch(0.55_0.13_42)]"
                    : "border-transparent text-[oklch(0.52_0.04_60)] hover:text-[oklch(0.35_0.04_50)]"
                }`}
              >
                {tab === "all" ? "All Programs" : tab === "senior" ? "Senior Discounts" : "Disability Programs"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8 flex gap-8">
        {/* Sidebar: category filter */}
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
            {DISCOUNT_DATA.map((cat) => {
              const IconComp = ICON_MAP[cat.icon] || Tag;
              const count = cat.senior.length + cat.disability.length;
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
                  <span className="text-xs text-[oklch(0.65_0.03_60)]">{count}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {filteredData.length === 0 ? (
            <div className="text-center py-16 text-[oklch(0.52_0.04_60)]">
              <Tag className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No discounts found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-10">
              {filteredData.map((cat) => (
                <section key={cat.id}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[oklch(0.22_0.02_50)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {cat.category}
                    </h2>
                    <Link
                      href={`/discounts/${cat.id}`}
                      className="text-xs font-medium hover:underline"
                      style={{ color: "oklch(0.55 0.13 42)" }}
                    >
                      View all {cat.items.length} →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {cat.items.slice(0, 6).map((item, idx) => (
                      <DiscountCard key={`${cat.id}-${idx}`} item={item} index={idx} categoryId={cat.id} />
                    ))}
                  </div>
                  {cat.items.length > 6 && (
                    <div className="mt-3 text-center">
                      <Link href={`/discounts/${cat.id}`}>
                        <button
                          className="text-sm font-medium px-4 py-2 rounded-full border transition-colors hover:bg-[oklch(0.93_0.04_42)]"
                          style={{ borderColor: "oklch(0.55 0.13 42)", color: "oklch(0.55 0.13 42)" }}
                        >
                          +{cat.items.length - 6} more in {cat.category}
                        </button>
                      </Link>
                    </div>
                  )}
                </section>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
