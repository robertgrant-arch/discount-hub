import type { LucideIcon } from "lucide-react";

interface StatPill {
  label: string;
  icon: LucideIcon;
}

interface PageHeroProps {
  badge: string;
  badgeIcon: LucideIcon;
  title: string;
  description: string;
  stats?: StatPill[];
}

export default function PageHero({ badge, badgeIcon: BadgeIcon, title, description, stats }: PageHeroProps) {
  return (
    <div
      className="relative border-b border-gray-200"
      style={{ background: "#FFFFFF" }}
    >
      <div className="relative container py-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#0E5659]/10 text-[#0E5659] text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-[#0E5659]/20"
               style={{ fontFamily: "'Manrope', sans-serif" }}>
            <BadgeIcon className="w-3.5 h-3.5" />
            {badge}
          </div>
          <h1
            className="text-4xl font-bold text-gray-900 mb-3 leading-tight"
            style={{ fontFamily: "'Sora', 'Open Sans', sans-serif" }}
          >
            {title}
          </h1>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            {description}
          </p>
          {stats && stats.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-xl border border-gray-200"
                >
                  <stat.icon className="w-4 h-4" style={{ color: "#C05824" }} />
                  {stat.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
