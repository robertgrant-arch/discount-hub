import { Link } from "wouter";
import { Tag, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[oklch(0.88_0.02_75)] bg-[oklch(0.96_0.015_80)] mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.68 0.15 55)" }}>
                <Tag className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
                Discount<span style={{ color: "oklch(0.47 0.08 185)" }}>Hub</span>
              </span>
            </Link>
            <p className="text-sm text-[oklch(0.52_0.04_60)] max-w-xs leading-relaxed">
              The most comprehensive directory of senior and disability discount programs, coupons, and benefits in the United States.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-[oklch(0.35_0.04_50)]">Explore</h4>
            <ul className="space-y-2">
              {[
                { href: "/discounts", label: "Browse Discounts" },
                { href: "/discounts?tab=senior", label: "Senior Discounts" },
                { href: "/discounts?tab=disability", label: "Disability Discounts" },
                { href: "/coupons", label: "Coupons" },
                { href: "/social-programs", label: "Benefits Hub" },
                { href: "/medicare-guide", label: "Medicare Guide" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[oklch(0.52_0.04_60)] hover:text-[oklch(0.47 0.08 185)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-[oklch(0.35_0.04_50)]">Official Resources</h4>
            <ul className="space-y-2">
              {[
                { href: "https://www.aarp.org", label: "AARP" },
                { href: "https://www.medicare.gov", label: "Medicare.gov" },
                { href: "https://www.ada.gov", label: "ADA.gov" },
                { href: "https://www.ssa.gov", label: "Social Security" },
                { href: "https://www.goodrx.com", label: "GoodRx" },
                { href: "https://www.aplaceformom.com", label: "A Place for Mom" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-[oklch(0.52_0.04_60)] hover:text-[oklch(0.47 0.08 185)] transition-colors">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Membership & Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-[oklch(0.35_0.04_50)]">Membership & Legal</h4>
            <ul className="space-y-2">
              {[
                { href: "/pricing", label: "Membership Plans" },
                { href: "/checkout/basic", label: "Join Basic — $4.99/mo" },
                { href: "/checkout/premium", label: "Join Premium — $14.99/mo" },
                { href: "/disclosures", label: "Affiliate Disclosures" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[oklch(0.52_0.04_60)] hover:text-[oklch(0.47 0.08 185)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Affiliate disclosure bar */}
        <div className="mt-8 p-4 rounded-xl bg-[oklch(0.93_0.02_80)] border border-[oklch(0.88_0.02_75)]">
          <p className="text-xs text-[oklch(0.52_0.04_60)] leading-relaxed text-center">
            <Shield className="w-3 h-3 inline mr-1" />
            <strong>Advertising Disclosure:</strong> HealthCare Select Benefits Hub may earn a commission when you click certain links on this site, including affiliate links, pay-per-call numbers, and sponsored program listings. This does not affect our editorial independence or the programs we list. Government program information is provided for educational purposes only.{" "}
            <Link href="/disclosures" className="underline hover:text-[oklch(0.45_0.13_42)]">Full disclosure policy</Link>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-[oklch(0.88_0.02_75)] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[oklch(0.60_0.03_60)]">
            © {new Date().getFullYear()} HealthCare Select Benefits Hub. All rights reserved.
          </p>
          <p className="text-xs text-[oklch(0.60_0.03_60)]">
            Discount information is provided for reference only. Always verify with the provider directly.
          </p>
        </div>
      </div>
    </footer>
  );
}
