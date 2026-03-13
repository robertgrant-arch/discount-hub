/* DiscountCard — Warm Abundance design
 * Shows discount info with gating for non-members
 */
import { ExternalLink, Lock, Heart, Printer } from "lucide-react";
import { useMembership } from "@/contexts/MembershipContext";
import { DiscountItem } from "@/lib/discountData";
import { Link } from "wouter";
import { toast } from "sonner";

interface DiscountCardProps {
  item: DiscountItem;
  index: number;
  categoryId: string;
}

export default function DiscountCard({ item, index, categoryId }: DiscountCardProps) {
  const { canAccessSenior, canAccessDisability, canFavorite, canPrint, favorites, toggleFavorite } = useMembership();

  const isSenior = item.audience === "senior";
  const isAccessible = isSenior ? canAccessSenior : canAccessDisability;
  // First 3 items per category are always visible as preview
  const isPreview = index < 3;
  const showFull = isPreview || isAccessible;

  const itemId = `${categoryId}-${item.name.replace(/\s+/g, '-').toLowerCase()}`;
  const isFavorited = favorites.includes(itemId);

  const handleFavorite = () => {
    if (!canFavorite) {
      toast.error("Upgrade to Premium to save favorites");
      return;
    }
    toggleFavorite(itemId);
    toast.success(isFavorited ? "Removed from favorites" : "Saved to favorites!");
  };

  const handlePrint = () => {
    if (!canPrint) {
      toast.error("Upgrade to Premium for printable discount cards");
      return;
    }
    window.print();
  };

  return (
    <div
      className={`relative bg-white rounded-xl border transition-all duration-200 hover:shadow-md group ${
        showFull ? "border-[oklch(0.88_0.02_75)]" : "border-[oklch(0.92_0.015_75)]"
      }`}
    >
      {/* Audience badge */}
      <div className="px-4 pt-4 pb-0 flex items-start justify-between gap-2">
        <span
          className={`badge-discount ${isSenior ? "badge-senior" : "badge-disability"}`}
        >
          {isSenior ? "Senior" : "Disability"}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleFavorite}
            className={`p-1.5 rounded-lg transition-colors ${
              isFavorited
                ? "text-[oklch(0.45 0.08 175)] bg-[oklch(0.95_0.03_42)]"
                : "text-[oklch(0.65_0.03_60)] hover:bg-[oklch(0.95_0.015_80)]"
            }`}
            title="Save to favorites"
          >
            <Heart className="w-3.5 h-3.5" fill={isFavorited ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handlePrint}
            className="p-1.5 rounded-lg text-[oklch(0.65_0.03_60)] hover:bg-[oklch(0.95_0.015_80)] transition-colors"
            title="Print discount card"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-2 pb-4">
        {/* Company name */}
        <h3 className="font-semibold text-[oklch(0.22_0.02_50)] text-sm leading-tight mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {item.name}
        </h3>

        {/* Discount amount — always visible */}
        <div className="text-xl font-bold mb-2" style={{ color: "oklch(0.45 0.08 175)", fontFamily: "'DM Sans', sans-serif" }}>
          {item.discount}
        </div>

        {showFull ? (
          <>
            {/* Age/eligibility */}
            {(item.age_requirement || item.eligibility) && (
              <p className="text-xs text-[oklch(0.52_0.04_60)] mb-1">
                <span className="font-medium">Eligibility:</span>{" "}
                {item.age_requirement || item.eligibility}
              </p>
            )}

            {/* Conditions */}
            <p className="text-xs text-[oklch(0.52_0.04_60)] mb-3 line-clamp-2">
              {item.conditions}
            </p>

            {/* How to access */}
            <p className="text-xs text-[oklch(0.40_0.04_50)] mb-3 bg-[oklch(0.97_0.01_80)] rounded-lg px-3 py-2">
              <span className="font-medium">How to access:</span> {item.how_to_access}
            </p>

            {/* Link */}
            {item.website && (
              <a
                href={item.website}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:underline"
                style={{ color: "oklch(0.45 0.08 175)" }}
              >
                Visit Website <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </>
        ) : (
          /* Locked state */
          <div className="relative">
            <div className="blur-sm select-none pointer-events-none">
              <p className="text-xs text-[oklch(0.52_0.04_60)] mb-1">Eligibility: Age 55+</p>
              <p className="text-xs text-[oklch(0.52_0.04_60)] mb-3">Must present valid ID at time of purchase</p>
              <p className="text-xs text-[oklch(0.40_0.04_50)] mb-3 bg-[oklch(0.97_0.01_80)] rounded-lg px-3 py-2">
                How to access: Ask at register
              </p>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="bg-white rounded-full p-2 shadow-md">
                <Lock className="w-4 h-4" style={{ color: "oklch(0.45 0.08 175)" }} />
              </div>
              <Link href="/pricing">
                <button
                  className="text-xs font-semibold px-3 py-1.5 rounded-full text-white transition-opacity hover:opacity-90"
                  style={{ background: "oklch(0.68 0.15 55)" }}
                >
                  Unlock with {isSenior ? "Basic" : "Plus"}
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
