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
      className="relative border-b border-[oklch(0.90_0_0)]"
      style={{ background: "#0E5659" }}
    >
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 0%, transparent 60%)" }} />
      <div className="relative container py-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-white/20"
               style={{ fontFamily: "'Manrope', sans-serif" }}>
            <BadgeIcon className="w-3.5 h-3.5" />
            {badge}
          </div>
          <h1
            className="text-4xl font-bold text-white mb-3 leading-tight"
            style={{ fontFamily: "'Sora', 'Open Sans', sans-serif" }}
          >
            {title}
          </h1>
          <p className="text-white/80 text-base leading-relaxed mb-6">
            {description}
          </p>
          {stats && stats.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-xl border border-white/20"
                >
                  <stat.icon className="w-4 h-4" style={{ color: "#4CC0AE" }} />
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
