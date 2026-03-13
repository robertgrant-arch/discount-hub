/* CouponCard — Warm Abundance design
 * Styled like a physical coupon with dashed border, scissor icon
 * Gated for Basic+ (senior) and Plus+ (disability)
 */
import { ExternalLink, Lock, Scissors, Heart, Printer } from "lucide-react";
import { useMembership } from "@/contexts/MembershipContext";
import { CouponItem } from "@/lib/couponData";
import { Link } from "wouter";
import { toast } from "sonner";

interface CouponCardProps {
  item: CouponItem;
  index: number;
  categoryId: string;
}

const AUDIENCE_STYLES = {
  senior: { bg: "oklch(0.92 0.04 42)", text: "oklch(0.47 0.08 185)", label: "Senior" },
  disability: { bg: "oklch(0.88 0.04 140)", text: "oklch(0.28 0.09 140)", label: "Disability" },
  both: { bg: "oklch(0.90 0.04 80)", text: "oklch(0.35 0.06 70)", label: "Senior & Disability" },
};

const TYPE_COLORS: Record<string, string> = {
  "Digital": "oklch(0.47 0.08 185)",
  "Printable": "oklch(0.32 0.09 140)",
  "Promo Code": "oklch(0.50 0.12 280)",
  "Loyalty Program": "oklch(0.45 0.10 200)",
  "In-Store": "oklch(0.48 0.10 30)",
};

export default function CouponCard({ item, index, categoryId }: CouponCardProps) {
  const { canAccessSenior, canAccessDisability, canFavorite, canPrint, favorites, toggleFavorite } = useMembership();

  const isSenior = item.audience === "senior";
  const isDisability = item.audience === "disability";
  const isBoth = item.audience === "both";

  const isAccessible =
    (isSenior && canAccessSenior) ||
    (isDisability && canAccessDisability) ||
    (isBoth && (canAccessSenior || canAccessDisability));

  // First 2 per category are always visible as preview
  const isPreview = index < 2;
  const showFull = isPreview || isAccessible;

  const itemId = `coupon-${categoryId}-${item.name.replace(/\s+/g, '-').toLowerCase().slice(0, 30)}`;
  const isFavorited = favorites.includes(itemId);

  const handleFavorite = () => {
    if (!canFavorite) {
      toast.error("Upgrade to Premium to save favorites");
      return;
    }
    toggleFavorite(itemId);
    toast.success(isFavorited ? "Removed from favorites" : "Coupon saved!");
  };

  const audienceStyle = AUDIENCE_STYLES[item.audience] || AUDIENCE_STYLES.both;
  const typeColor = Object.entries(TYPE_COLORS).find(([k]) => item.type.toLowerCase().includes(k.toLowerCase()))?.[1] || "oklch(0.47 0.08 185)";

  return (
    <div
      className={`relative bg-white group transition-all duration-200 hover:shadow-lg ${
        showFull ? "" : "overflow-hidden"
      }`}
      style={{
        border: "2px dashed oklch(0.80 0.04 75)",
        borderRadius: "12px",
      }}
    >
      {/* Scissor cut line at top */}
      <div className="flex items-center gap-1 px-3 pt-2 pb-0">
        <Scissors className="w-3 h-3 rotate-90" style={{ color: "oklch(0.72 0.04 60)" }} />
        <div className="flex-1 border-t border-dashed border-[oklch(0.85_0.02_75)]" />
      </div>

      {/* Card body */}
      <div className="px-4 pb-4 pt-2">
        {/* Top row: audience badge + type + actions */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: audienceStyle.bg, color: audienceStyle.text }}
            >
              {audienceStyle.label}
            </span>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border"
              style={{ color: typeColor, borderColor: typeColor + "40" }}
            >
              {item.type.split('/')[0].split(',')[0].trim()}
            </span>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              onClick={handleFavorite}
              className={`p-1 rounded transition-colors ${
                isFavorited ? "text-[oklch(0.47 0.08 185)]" : "text-[oklch(0.65_0.03_60)] hover:text-[oklch(0.47 0.08 185)]"
              }`}
              title="Save coupon"
            >
              <Heart className="w-3.5 h-3.5" fill={isFavorited ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Company/program name */}
        <h3
          className="font-bold text-sm text-[oklch(0.22_0.02_50)] leading-snug mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {item.name}
        </h3>

        {/* Discount amount — always visible */}
        <div
          className="text-2xl font-extrabold mb-2 leading-tight"
          style={{ color: "oklch(0.47 0.08 185)", fontFamily: "'Playfair Display', serif" }}
        >
          {item.discount}
        </div>

        {showFull ? (
          <>
            {/* Eligibility */}
            <p className="text-xs text-[oklch(0.52_0.04_60)] mb-1.5">
              <span className="font-semibold text-[oklch(0.40_0.04_50)]">Who qualifies:</span>{" "}
              {item.eligibility}
            </p>

            {/* How to access */}
            <div className="bg-[oklch(0.97_0.01_80)] rounded-lg px-3 py-2 mb-3">
              <p className="text-xs text-[oklch(0.40_0.04_50)]">
                <span className="font-semibold">How to use:</span> {item.how_to_access}
              </p>
            </div>

            {/* Notes */}
            {item.notes && (
              <p className="text-xs text-[oklch(0.60_0.03_60)] mb-2 italic">{item.notes}</p>
            )}

            {/* CTA */}
            {item.website ? (
              <a
                href={item.website}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline"
                style={{ color: "oklch(0.47 0.08 185)" }}
              >
                Get Coupon <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="text-xs text-[oklch(0.60_0.03_60)]">Available in-store</span>
            )}
          </>
        ) : (
          /* Locked state */
          <div className="relative min-h-[80px]">
            <div className="blur-sm select-none pointer-events-none">
              <p className="text-xs text-[oklch(0.52_0.04_60)] mb-1.5">Who qualifies: Age 60+ with valid ID</p>
              <div className="bg-[oklch(0.97_0.01_80)] rounded-lg px-3 py-2 mb-2">
                <p className="text-xs text-[oklch(0.40_0.04_50)]">How to use: Visit website and enter code at checkout</p>
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="bg-white rounded-full p-1.5 shadow-md">
                <Lock className="w-3.5 h-3.5" style={{ color: "oklch(0.47 0.08 185)" }} />
              </div>
              <Link href="/pricing">
                <button
                  className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                  style={{ background: "oklch(0.47 0.08 185)" }}
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
