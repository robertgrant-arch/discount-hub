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
      className="relative border-b border-[oklch(0.88_0.02_75)]"
      style={{ background: "linear-gradient(135deg, oklch(0.22 0.02 50) 0%, oklch(0.32 0.06 42) 100%)" }}
    >
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <div className="relative container py-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <BadgeIcon className="w-3.5 h-3.5" />
            {badge}
          </div>
          <h1
            className="text-4xl font-bold text-white mb-3 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </h1>
          <p className="text-white/80 text-base leading-relaxed mb-6">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
                      {stats?.map((stat) => (
              <div key={stat.label} className="inline-flex items-center gap-1.5 bg-white/15 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full">
                <stat.icon className="w-3 h-3" />
                {stat.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
