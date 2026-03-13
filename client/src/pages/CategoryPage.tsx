/* CategoryPage — Warm Abundance design
 * Full listing for a single discount category
 */
import { useState } from "react";
import { Link, useParams } from "wouter";
import Navbar from "@/components/Navbar";
import PageHaiku from "@/components/PageHaiku";
import Footer from "@/components/Footer";
import DiscountCard from "@/components/DiscountCard";
import { DISCOUNT_DATA } from "@/lib/discountData";
import MonetizationBanner from "@/components/MonetizationBanner";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type AudienceTab = "all" | "senior" | "disability";

export default function CategoryPage() {
  const params = useParams<{ categoryId: string }>();
  const categoryId = params.categoryId;
  const [activeTab, setActiveTab] = useState<AudienceTab>("all");
  const [search, setSearch] = useState("");

  const category = DISCOUNT_DATA.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-16 text-center">
          <p className="text-[oklch(0.52_0.04_60)]">Category not found.</p>
          <Link href="/discounts" className="text-sm font-medium mt-4 inline-block" style={{ color: "oklch(0.45 0.08 175)" }}>
            ← Back to all discounts
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const allItems = [
    ...(activeTab !== "disability" ? category.senior : []),
    ...(activeTab !== "senior" ? category.disability : []),
  ].filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.discount.toLowerCase().includes(q) ||
      item.conditions.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.98_0.012_80)]">
      <Navbar />

      {/* Category hero */}
      <div className="relative bg-white border-b border-[oklch(0.88_0.02_75)] overflow-hidden">
        {category.image && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center opacity-15"
              style={{ backgroundImage: `url(${category.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
          </>
        )}
        <div className="relative container py-10">
          <Link href="/discounts" className="inline-flex items-center gap-1.5 text-sm text-[oklch(0.52_0.04_60)] hover:text-[oklch(0.45 0.08 175)] mb-4 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to all discounts
          </Link>
          <h1 className="text-3xl font-bold text-[oklch(0.22_0.02_50)] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {category.category}
          </h1>
              <PageHaiku lines={["Each category", "A garden of discounts grows", "Pick what feeds your need"]} />
          <p className="text-[oklch(0.52_0.04_60)]">
            {category.senior.length} senior discounts · {category.disability.length} disability programs
          </p>

          {/* Search */}
          <div className="relative mt-4 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.60_0.03_60)]" />
            <Input
              placeholder="Search within this category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-[oklch(0.97_0.01_80)] border-[oklch(0.88_0.02_75)]"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="container pb-0">
          <div className="flex gap-1 border-b border-[oklch(0.88_0.02_75)]">
            {(["all", "senior", "disability"] as AudienceTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-[oklch(0.45 0.08 175)] text-[oklch(0.45 0.08 175)]"
                    : "border-transparent text-[oklch(0.52_0.04_60)] hover:text-[oklch(0.35_0.04_50)]"
                }`}
              >
                {tab === "all"
                  ? `All (${category.senior.length + category.disability.length})`
                  : tab === "senior"
                  ? `Senior (${category.senior.length})`
                  : `Disability (${category.disability.length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Discount grid + sidebar */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main grid */}
          <div className="lg:col-span-3">
            {allItems.length === 0 ? (
              <div className="text-center py-16 text-[oklch(0.52_0.04_60)]">
                <p className="font-medium">No results found</p>
                <p className="text-sm mt-1">Try a different search term or tab</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {allItems.map((item, idx) => (
                  <DiscountCard key={`${categoryId}-${idx}`} item={item} index={idx} categoryId={categoryId} />
                ))}
              </div>
            )}
          </div>
          {/* Monetization Sidebar */}
          <div className="lg:col-span-1">
            <MonetizationBanner
              category={category.category}
              variant="sidebar"
              showAffiliate={true}
              showCall={true}
              showLead={true}
              maxItems={3}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
