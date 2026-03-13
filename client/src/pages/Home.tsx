/* Home Page — Warm Abundance design
 * Hero with editorial image, stats bar, category grid, membership CTA
 */
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PageHaiku from "@/components/PageHaiku";
import Footer from "@/components/Footer";
import { DISCOUNT_DATA, TOTAL_PROGRAMS, TOTAL_SENIOR, TOTAL_DISABILITY } from "@/lib/discountData";
import {
  UtensilsCrossed, ShoppingBag, Hotel, Plane, Ticket,
  HeartPulse, ShoppingCart, Home as HomeIcon, DollarSign, Laptop,
  Tag, ArrowRight, CheckCircle2, Users, Accessibility, Scissors,
  BookOpen, Scale, MapPin, Star, MessageCircle
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  UtensilsCrossed, ShoppingBag, Hotel, Plane, Ticket,
  HeartPulse, ShoppingCart, Home: HomeIcon, DollarSign, Laptop, Tag,
};

const CATEGORY_UNSPLASH: Record<string, string> = {
  "Retail and Department Stores": "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80",
  "Airlines and Transportation": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80",
  "Entertainment and Recreation": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80",
  "Healthcare and Pharmacy": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
  "Grocery and Food": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80",
  "Utilities and Home Services": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  "Financial Services and Insurance": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
  "Technology and Subscriptions": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[oklch(1_0_0)]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663319813187/Mm4cCnjCEhGr2U6GXNthjR/hero-banner-ZwjnkZuUe9WpiFKL3Afqhv.webp)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.04_175/0.82)] via-[oklch(0.15_0.04_175/0.55)] to-transparent" />
        <div className="relative container py-24 md:py-32">
          <div className="max-w-xl">
                          <Link href="/ask-claude">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3 border border-white/20 hover:bg-white/25 transition-colors cursor-pointer">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Ask Claude — Benefits & Medicare AI Assistant
                </div>
              </Link>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-white/20">
              <Tag className="w-3.5 h-3.5" />
              {TOTAL_PROGRAMS}+ Discount Programs
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Every Senior &amp; Disability Discount,{" "}
              <span style={{ color: "oklch(0.78 0.11 55)" }}>One Place.</span>
            </h1>
              <PageHaiku lines={["Golden years bring gifts", "Savings bloom like autumn leaves", "Wisdom finds the deals"]} />
            <p className="text-white/85 text-lg leading-relaxed mb-8">
              Stop searching dozens of websites. HealthCare Select Benefits Hub aggregates {TOTAL_SENIOR}+ senior discounts and {TOTAL_DISABILITY}+ disability programs across restaurants, travel, healthcare, retail, and more.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/discounts">
                <Button
                  size="lg"
                  className="font-semibold shadow-lg"
                                      style={{ background: "oklch(0.68 0.15 55)", color: "white" }}
                >
                  Browse Discounts <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  View Plans — from $4.99/mo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-[oklch(0.90_0_0)] shadow-sm">
        <div className="container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${TOTAL_PROGRAMS}+`, label: "Total Programs", icon: Tag },
              { value: `${TOTAL_SENIOR}+`, label: "Senior Discounts", icon: Users },
              { value: `${TOTAL_DISABILITY}+`, label: "Disability Programs", icon: Accessibility },
              { value: "10", label: "Categories", icon: ShoppingBag },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <stat.icon className="w-5 h-5 mb-1" style={{ color: "oklch(0.45 0.08 175)" }} />
                <span className="text-2xl font-bold" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.15 0 0)" }}>
                  {stat.value}
                </span>
                <span className="text-xs text-[oklch(0.45_0_0)]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZIP Finder CTA */}
      <section className="bg-[oklch(0.96_0_0)] border-b border-[oklch(0.88_0_0)]">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-[oklch(0.45 0.08 175)]" />
                <h2 className="text-xl font-bold text-[oklch(0.15_0.04_175)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Find Programs Near You
                </h2>
              </div>
              <p className="text-sm text-[oklch(0.45_0_0)] leading-relaxed">
                Enter your ZIP code to instantly see federal programs + state-specific benefits + local deals available in your area — from state pharmaceutical assistance to local senior center programs.
              </p>
            </div>
            <div className="w-full md:w-80">
              <Link href="/benefits-hub">
                <div className="bg-white rounded-xl border border-[oklch(0.82_0.06_42)] p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.68 0.15 55)" }}>
                      <MapPin className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[oklch(0.15_0.04_175)]">Open Benefits Hub</p>
                      <p className="text-xs text-muted-foreground">Enter ZIP to filter by location</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[oklch(0.45 0.08 175)] font-semibold">283+ state & local programs</span>
                    <ArrowRight className="w-4 h-4 text-[oklch(0.45 0.08 175)]" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[oklch(0.15_0.04_175)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Browse by Category
            </h2>
            <p className="text-[oklch(0.45_0_0)] mt-1">
              Explore discounts across every area of daily life
            </p>
          </div>
          <Link href="/discounts" className="hidden md:flex items-center gap-1 text-sm font-medium hover:underline" style={{ color: "oklch(0.45 0.08 175)" }}>
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {DISCOUNT_DATA.map((cat) => {
            const IconComp = ICON_MAP[cat.icon] || Tag;
            const imgUrl = cat.image || CATEGORY_UNSPLASH[cat.category];
            const total = cat.senior.length + cat.disability.length;
            return (
              <Link key={cat.id} href={`/discounts/${cat.id}`}>
                <div className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300">
                  {imgUrl ? (
                    <img src={imgUrl} alt={cat.category} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0" style={{ background: "oklch(0.93 0.02 80)" }} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.02_50/0.85)] via-[oklch(0.15_0.02_50/0.3)] to-transparent" />
                  <div className="absolute inset-0 p-3 flex flex-col justify-between">
                    <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <IconComp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-xs leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {cat.category}
                      </p>
                      <p className="text-white/70 text-xs mt-0.5">{total} programs</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-[oklch(0.90_0_0)]">
        <div className="container py-16">
          <h2 className="text-3xl font-bold text-center text-[oklch(0.15_0.04_175)] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            How HealthCare Select Benefits Hub Works
          </h2>
          <p className="text-center text-[oklch(0.45_0_0)] mb-12">Simple, fast, and always up to date</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Browse Categories",
                desc: "Explore 10 categories covering every aspect of daily life — from dining and travel to healthcare and technology.",
                color: "oklch(0.45 0.08 175)",
              },
              {
                step: "2",
                title: "Find Your Discounts",
                desc: "See exactly what discount you qualify for, the age or eligibility requirement, and any conditions that apply.",
                color: "oklch(0.32 0.09 140)",
              },
              {
                step: "3",
                title: "Access & Save",
                desc: "Click directly to the provider's website or note how to claim your discount in-store. Save favorites with Premium.",
                color: "oklch(0.45 0.08 175)",
              },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4"
                  style={{ background: step.color, fontFamily: "'DM Sans', sans-serif" }}
                >
                  {step.step}
                </div>
                <h3 className="font-bold text-lg text-[oklch(0.15_0.04_175)] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-sm text-[oklch(0.45_0_0)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coupons teaser */}
      <section className="container py-14">
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, oklch(0.45 0.08 175), oklch(0.40 0.10 42))" }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10" style={{ background: "radial-gradient(circle at 80% 50%, white 0%, transparent 70%)" }} />
          <div className="relative px-8 py-10 md:flex items-center justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-3">
                <Scissors className="w-5 h-5 text-white/80" />
                <span className="text-white/80 text-sm font-semibold uppercase tracking-wider">New Feature</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                212+ Coupons &amp; Deals
              </h2>
              <p className="text-white/80 text-base leading-relaxed max-w-lg">
                Printable coupons, digital promo codes, and loyalty programs — grocery, pharmacy, restaurants, retail, travel, and more. Exclusively for seniors and disabled Americans.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Grocery", "Pharmacy", "Restaurants", "Retail", "Travel", "Entertainment"].map((tag) => (
                  <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <Link href="/coupons">
                <Button size="lg" className="font-bold shadow-lg bg-white hover:bg-white/90" style={{ color: "oklch(0.45 0.08 175)" }}>
                  <Scissors className="w-4 h-4 mr-2" />
                  Browse Coupons
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Programs teaser */}
      <section className="bg-white border-y border-[oklch(0.90_0_0)]">
        <div className="container py-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4" style={{ color: "oklch(0.35 0.08 250)" }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "oklch(0.35 0.08 250)" }}>Benefits Education Hub</span>
              </div>
              <h2 className="text-3xl font-bold text-[oklch(0.15_0.04_175)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Social Programs for Disabled Americans
              </h2>
              <p className="text-[oklch(0.45_0_0)] mt-1 max-w-xl">
                Step-by-step guides to 16 federal programs — how to apply, update income, and connect to official portals.
              </p>
            </div>
            <Link href="/social-programs" className="hidden md:flex items-center gap-1 text-sm font-medium hover:underline shrink-0" style={{ color: "oklch(0.35 0.08 250)" }}>
              Explore all programs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "SSDI & SSI", desc: "Monthly cash benefits", icon: DollarSign, color: "oklch(0.45 0.08 175)", bg: "oklch(0.93 0.04 42)" },
              { label: "Medicaid & Medicare", desc: "Health coverage guides", icon: HeartPulse, color: "oklch(0.50 0.15 15)", bg: "oklch(0.95 0.04 15)" },
              { label: "Housing & SNAP", desc: "Section 8, food assistance", icon: HomeIcon, color: "oklch(0.45 0.12 200)", bg: "oklch(0.92 0.04 200)" },
              { label: "ADA & Legal Rights", desc: "Protections & advocacy", icon: Scale, color: "oklch(0.35 0.08 250)", bg: "oklch(0.92 0.03 250)" },
            ].map((item) => (
              <Link key={item.label} href="/social-programs">
                <div className="group p-4 rounded-xl border border-[oklch(0.90_0_0)] bg-[oklch(1_0_0)] hover:shadow-md transition-all cursor-pointer">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2.5" style={{ background: item.bg }}>
                    <item.icon className="w-4.5 h-4.5" style={{ color: item.color }} />
                  </div>
                  <p className="text-sm font-bold text-[oklch(0.15_0.04_175)] leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</p>
                  <p className="text-xs text-[oklch(0.55_0.03_60)] mt-0.5">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LifeMart teaser */}
      <section className="border-y border-[oklch(0.90_0_0)]" style={{ background: "oklch(0.18 0.04 42)" }}>
        <div className="container py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-white/60">Exclusive Partner Program</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                LifeMart Exclusive Savings
              </h2>
              <p className="text-white/70 text-sm max-w-md">
                19,000+ savings opportunities from 1,300+ brands — travel, electronics, senior care, entertainment, and more. Browse every LifeMart program in one place.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link href="/lifemart">
                <button className="inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg text-sm text-white transition-colors" style={{ background: "oklch(0.55 0.15 42)" }}>
                  Browse LifeMart Programs <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="container py-16">
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663319813187/Mm4cCnjCEhGr2U6GXNthjR/membership-card-bg-fZFMU7kaJ7NeDFaKxyPbZA.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[oklch(0.15_0.04_175/0.75)]" />
          <div className="relative px-8 py-12 md:py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Unlock Every Discount Today
            </h2>
            <p className="text-white/80 text-lg mb-6 max-w-lg mx-auto">
              Members save an average of hundreds of dollars per year. Plans start at just $4.99/month.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                "160+ Senior Discounts",
                "120+ Disability Programs",
                "Direct Links to Every Provider",
                "Cancel Anytime",
              ].map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-white/90 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[oklch(0.72_0.09_42)]" />
                  {f}
                </div>
              ))}
            </div>
            <Link href="/pricing">
              <Button
                size="lg"
                className="font-semibold shadow-xl"
                style={{ background: "oklch(0.68 0.15 55)", color: "white" }}
              >
                See All Plans <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
