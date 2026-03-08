/**
 * LifeMart Exclusive Savings Page
 * Design: Warm Abundance — Playfair Display + DM Sans, terracotta/cream/forest green
 * Layout: Hero banner → stats bar → category tabs → program grid → access guide → partnership CTA
 */

import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import PageHaiku from "@/components/PageHaiku";
import Footer from "@/components/Footer";
import {
  ExternalLink, Star, Plane, Tv, ShoppingBag, Heart, Home,
  Car, Utensils, DollarSign, Users, Shield, CheckCircle2,
  ArrowRight, Lock, Tag, Ticket, Smartphone, Dumbbell,
  Baby, Dog, GraduationCap, Scale, Info
} from "lucide-react";
import { useMembership } from "@/contexts/MembershipContext";

// ─── Data ────────────────────────────────────────────────────────────────────

const LIFEMART_STATS = [
  { value: "19,000+", label: "Savings Opportunities" },
  { value: "1,300+", label: "Trusted Brands" },
  { value: "$116M+", label: "Saved by Members in 2025" },
  { value: "35+", label: "Years in Operation" },
];

interface LifeMartProgram {
  brand: string;
  discount: string;
  description: string;
  url: string;
  featured?: boolean;
}

interface LifeMartCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  programs: LifeMartProgram[];
}

const CATEGORIES: LifeMartCategory[] = [
  {
    id: "travel",
    label: "Travel & Recreation",
    icon: Plane,
    color: "oklch(0.40 0.12 220)",
    bgColor: "oklch(0.95 0.03 220)",
    programs: [
      { brand: "Priceline.com", discount: "Up to 40% off", description: "Hotels, flights, car rentals, and vacation packages at exclusive member rates", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "Hotels.com", discount: "Up to 40% off", description: "225,000+ hotels worldwide with exclusive member pricing", url: "https://www.care.com/lifemart/" },
      { brand: "Hotwire", discount: "Up to 40% off", description: "Hot rates on hotels, cars, and flights — exclusive member access", url: "https://www.care.com/lifemart/" },
      { brand: "Expedia.com", discount: "Member savings", description: "Full travel booking with exclusive LifeMart member discounts", url: "https://www.care.com/lifemart/" },
      { brand: "Enterprise Rent-A-Car", discount: "Member rates", description: "Exclusive corporate rates on car rentals nationwide", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "Hertz", discount: "Member rates", description: "Discounted car rentals at thousands of locations worldwide", url: "https://www.care.com/lifemart/" },
      { brand: "Alamo Rent-A-Car", discount: "Member rates", description: "Exclusive member pricing on car rentals", url: "https://www.care.com/lifemart/" },
      { brand: "Budget Car Rental", discount: "Member rates", description: "Affordable car rentals with LifeMart member discounts", url: "https://www.care.com/lifemart/" },
      { brand: "Delta Air Lines", discount: "Member fares", description: "Exclusive member airfare deals on Delta flights", url: "https://www.care.com/lifemart/" },
      { brand: "Southwest Airlines Vacations", discount: "Member savings", description: "Vacation packages with exclusive member pricing", url: "https://www.care.com/lifemart/" },
      { brand: "Carnival Cruise Lines", discount: "Member savings", description: "Exclusive cruise deals for LifeMart members", url: "https://www.care.com/lifemart/" },
    ],
  },
  {
    id: "entertainment",
    label: "Entertainment & Tickets",
    icon: Ticket,
    color: "oklch(0.42 0.14 15)",
    bgColor: "oklch(0.96 0.03 15)",
    programs: [
      { brand: "Ticketsatwork.com", discount: "Up to 50% off", description: "Millions of tickets to 80,000+ events — concerts, sports, Broadway, and more", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "Walt Disney World", discount: "Member savings", description: "Exclusive discounts on theme park tickets and resort stays", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "Six Flags", discount: "Member savings", description: "Discounted admission to Six Flags theme parks nationwide", url: "https://www.care.com/lifemart/" },
      { brand: "AMC Theatres", discount: "Member rates", description: "Discounted movie tickets at AMC locations nationwide", url: "https://www.care.com/lifemart/" },
      { brand: "Regal Entertainment Group", discount: "Member rates", description: "Discounted tickets at Regal cinemas nationwide", url: "https://www.care.com/lifemart/" },
      { brand: "Netflix", discount: "Member savings", description: "Exclusive streaming deals for LifeMart members", url: "https://www.care.com/lifemart/" },
      { brand: "DIRECTV", discount: "Member savings", description: "Exclusive rates on DIRECTV satellite TV packages", url: "https://www.care.com/lifemart/" },
    ],
  },
  {
    id: "electronics",
    label: "Electronics & Technology",
    icon: Tv,
    color: "oklch(0.38 0.10 260)",
    bgColor: "oklch(0.95 0.02 260)",
    programs: [
      { brand: "Lenovo", discount: "Exclusive member pricing", description: "Discounts on laptops, ThinkPads, tablets, and accessories", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "Apple", discount: "Member savings", description: "Exclusive member pricing on Apple products and accessories", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "Dell", discount: "Member savings", description: "Discounts on Dell computers, laptops, and monitors", url: "https://www.care.com/lifemart/" },
      { brand: "Best Buy", discount: "15% off + free shipping", description: "Electronics, appliances, and tech with exclusive member discounts", url: "https://www.care.com/lifemart/" },
      { brand: "Panasonic", discount: "15% off HDTVs", description: "Exclusive member discounts on Panasonic TVs and electronics", url: "https://www.care.com/lifemart/" },
      { brand: "T-Mobile", discount: "Member rates", description: "Exclusive wireless plan discounts for LifeMart members", url: "https://www.care.com/lifemart/" },
      { brand: "AT&T Wireless", discount: "Member rates", description: "Discounted wireless plans and devices for members", url: "https://www.care.com/lifemart/" },
      { brand: "SimpliSafe", discount: "Member savings", description: "Home security systems at exclusive member pricing", url: "https://www.care.com/lifemart/" },
      { brand: "ADT", discount: "Member savings", description: "Home security monitoring with member discounts", url: "https://www.care.com/lifemart/" },
      { brand: "Norton by Symantec", discount: "Member savings", description: "Cybersecurity software at exclusive member pricing", url: "https://www.care.com/lifemart/" },
    ],
  },
  {
    id: "health",
    label: "Health & Wellness",
    icon: Heart,
    color: "oklch(0.42 0.14 145)",
    bgColor: "oklch(0.95 0.03 145)",
    programs: [
      { brand: "Globalfit Gym Network 360", discount: "Member rates", description: "Access to thousands of gyms nationwide at discounted membership rates", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "Active & Fit Direct", discount: "Member rates", description: "Gym memberships at 11,000+ fitness centers for one low monthly fee", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "FitBit", discount: "Member savings", description: "Fitness trackers and smartwatches at exclusive member pricing", url: "https://www.care.com/lifemart/" },
      { brand: "Nutrisystem", discount: "Member savings", description: "Weight loss meal plans with exclusive member discounts", url: "https://www.care.com/lifemart/" },
      { brand: "Blue Apron", discount: "Member savings", description: "Meal kit delivery with exclusive member pricing", url: "https://www.care.com/lifemart/" },
      { brand: "The Lasik Vision Institute", discount: "Member savings", description: "LASIK eye surgery at discounted member rates", url: "https://www.care.com/lifemart/" },
      { brand: "Beltone", discount: "Member savings", description: "Hearing aids and hearing care with senior-focused member discounts", url: "https://www.care.com/lifemart/" },
    ],
  },
  {
    id: "senior-care",
    label: "Senior & Pet Care",
    icon: Users,
    color: "oklch(0.45 0.13 42)",
    bgColor: "oklch(0.96 0.03 42)",
    programs: [
      { brand: "Brookdale Senior Living", discount: "Member savings", description: "Assisted living, memory care, and independent living with exclusive member rates", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "Maplewood Senior Living", discount: "Member savings", description: "Premium senior living communities with LifeMart member discounts", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "Beltone Hearing Care", discount: "Member savings", description: "Hearing aids, hearing tests, and hearing care products", url: "https://www.care.com/lifemart/" },
      { brand: "Spot Pet Insurance", discount: "Member savings", description: "Pet insurance for dogs and cats at exclusive member rates", url: "https://www.care.com/lifemart/" },
      { brand: "Pets Best Insurance", discount: "Member savings", description: "Comprehensive pet insurance with member discounts", url: "https://www.care.com/lifemart/" },
      { brand: "Nationwide Pet Insurance", discount: "Member savings", description: "Pet health insurance plans at exclusive member pricing", url: "https://www.care.com/lifemart/" },
    ],
  },
  {
    id: "home",
    label: "Home Goods & Services",
    icon: Home,
    color: "oklch(0.40 0.10 80)",
    bgColor: "oklch(0.96 0.02 80)",
    programs: [
      { brand: "Kohler", discount: "Member savings", description: "Kitchen and bath products at exclusive member pricing", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "Sam's Club", discount: "Membership discounts", description: "Discounted Sam's Club membership + savings on all purchases", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "Costco", discount: "Membership discounts", description: "Discounted Costco membership for LifeMart members", url: "https://www.care.com/lifemart/" },
      { brand: "BJ's Wholesale Club", discount: "Membership discounts", description: "Discounted BJ's membership with exclusive member savings", url: "https://www.care.com/lifemart/" },
      { brand: "Wells Fargo Home Mortgage", discount: "Member rates", description: "Exclusive mortgage rates and home financing for LifeMart members", url: "https://www.care.com/lifemart/" },
      { brand: "Walmart", discount: "Free shipping + savings", description: "Free shipping and exclusive deals on Walmart.com", url: "https://www.care.com/lifemart/" },
    ],
  },
  {
    id: "food",
    label: "Food & Dining",
    icon: Utensils,
    color: "oklch(0.42 0.12 30)",
    bgColor: "oklch(0.96 0.03 30)",
    programs: [
      { brand: "Restaurant.com", discount: "Up to 80% off dining", description: "Discounted dining certificates at thousands of restaurants nationwide", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "Coupons.com", discount: "Member savings", description: "Grocery coupons and local deals from your favorite stores", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "Home Chef", discount: "Member savings", description: "Meal kit delivery with exclusive member pricing", url: "https://www.care.com/lifemart/" },
      { brand: "Blue Apron", discount: "Member savings", description: "Chef-designed meal kits at discounted member rates", url: "https://www.care.com/lifemart/" },
    ],
  },
  {
    id: "financial",
    label: "Legal & Financial",
    icon: Scale,
    color: "oklch(0.38 0.08 240)",
    bgColor: "oklch(0.95 0.02 240)",
    programs: [
      { brand: "TurboTax (Intuit)", discount: "Member savings", description: "Tax filing software at exclusive member pricing", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "LegalZoom", discount: "Member savings", description: "Legal documents, LLC formation, and legal services at member rates", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "Liberty Mutual Insurance", discount: "Member rates", description: "Auto, home, and life insurance at exclusive member pricing", url: "https://www.care.com/lifemart/" },
      { brand: "LifeLock", discount: "Member savings", description: "Identity theft protection at exclusive member pricing", url: "https://www.care.com/lifemart/" },
      { brand: "TrueCar", discount: "Member pricing", description: "Buy or lease a new or used car at exclusive member pricing — no haggling", url: "https://www.care.com/lifemart/" },
    ],
  },
  {
    id: "retail",
    label: "Retail & Apparel",
    icon: ShoppingBag,
    color: "oklch(0.42 0.10 340)",
    bgColor: "oklch(0.96 0.02 340)",
    programs: [
      { brand: "Macy's", discount: "Free shipping + savings", description: "Exclusive member discounts and free shipping at Macy's", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "Kohl's", discount: "Member savings", description: "Exclusive deals on clothing, home goods, and more at Kohl's", url: "https://www.care.com/lifemart/" },
      { brand: "Wire Fly", discount: "Member savings", description: "Electronics and wireless deals at exclusive member pricing", url: "https://www.care.com/lifemart/" },
      { brand: "AARP", discount: "Member benefits", description: "AARP membership and associated benefits at exclusive rates", url: "https://www.care.com/lifemart/" },
    ],
  },
  {
    id: "education",
    label: "Education & Family",
    icon: GraduationCap,
    color: "oklch(0.40 0.12 160)",
    bgColor: "oklch(0.95 0.03 160)",
    programs: [
      { brand: "KinderCare Learning Centers", discount: "Up to 10% off", description: "Child care savings at thousands of KinderCare locations nationwide", url: "https://www.care.com/lifemart/", featured: true },
      { brand: "La Petite Academy", discount: "Up to 10% off", description: "Early childhood education and care at discounted member rates", url: "https://www.care.com/lifemart/" },
      { brand: "ABCmouse", discount: "Member savings", description: "Award-winning early learning app for children ages 2–8", url: "https://www.care.com/lifemart/" },
      { brand: "Time4Learning.com", discount: "Member savings", description: "Online curriculum for PreK–12 at exclusive member pricing", url: "https://www.care.com/lifemart/" },
      { brand: "Positive Parenting Solutions", discount: "Member savings", description: "Online parenting course at exclusive member pricing", url: "https://www.care.com/lifemart/" },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function LifeMart() {
  const [activeCategory, setActiveCategory] = useState("travel");
  const { currentTier } = useMembership();
  const isPlus = currentTier === "plus" || currentTier === "premium";

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">

        {/* ─── Hero ─── */}
        <section className="relative overflow-hidden bg-[oklch(0.18_0.04_42)] text-white py-14 md:py-20">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, oklch(0.65 0.15 42) 0%, transparent 60%), radial-gradient(circle at 80% 20%, oklch(0.55 0.12 200) 0%, transparent 50%)" }} />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-5 backdrop-blur-sm">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                Exclusive Partner Program
              </div>
              <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold leading-tight mb-4">
                LifeMart Exclusive<br />
                <span style={{ color: "oklch(0.75 0.12 42)" }}>Member Savings</span>
              </h1>
              <PageHaiku lines={["Exclusive doors open", "Savings bloom in every aisle", "Members find the way"]} />
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-2xl">
                LifeMart by Care.com is a members-only discount platform with 19,000+ savings opportunities from 1,300+ trusted brands — covering travel, entertainment, electronics, health, senior care, and more. DiscountHub members get a guided overview of every program.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.care.com/lifemart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
                  style={{ background: "oklch(0.55 0.15 42)", color: "white" }}
                >
                  Access LifeMart <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="#how-to-access"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
                >
                  How to Access <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Stats Bar ─── */}
        <section className="border-b border-border bg-[oklch(0.97_0.02_42)]">
          <div className="container py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {LIFEMART_STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: "oklch(0.45 0.13 42)" }}>{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Access Notice ─── */}
        <section className="border-b border-border bg-[oklch(0.95_0.03_200)]">
          <div className="container py-4">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.40 0.12 200)" }} />
              <p className="text-sm" style={{ color: "oklch(0.35 0.08 200)" }}>
                <strong>About LifeMart Access:</strong> LifeMart is a closed, members-only platform operated by Care.com. DiscountHub provides a complete directory of all LifeMart programs and links you directly to the LifeMart portal. To unlock full LifeMart access, visit{" "}
                <a href="https://www.care.com/lifemart/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">care.com/lifemart</a>{" "}
                and sign up or access through your employer benefits.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Category Tabs + Program Grid ─── */}
        <section className="py-10">
          <div className="container">
            <div className="mb-6">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-1">Browse All LifeMart Programs</h2>
              <p className="text-sm text-muted-foreground">Select a category to explore available discounts and savings</p>
            </div>

            {/* Category Tab Scroll */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border shrink-0"
                    style={active
                      ? { background: cat.color, color: "white", borderColor: cat.color }
                      : { background: "transparent", color: "oklch(0.45 0.01 0)", borderColor: "oklch(0.88 0.004 286)" }
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Active Category Header */}
            <div className="flex items-center gap-3 mb-6 p-4 rounded-xl border" style={{ background: currentCategory.bgColor, borderColor: "transparent" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: currentCategory.color }}>
                <currentCategory.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-foreground">{currentCategory.label}</h3>
                <p className="text-xs text-muted-foreground">{currentCategory.programs.length} programs available through LifeMart</p>
              </div>
              <div className="ml-auto">
                <a
                  href="https://www.care.com/lifemart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  style={{ background: currentCategory.color, color: "white" }}
                >
                  Browse on LifeMart <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Program Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentCategory.programs.map((prog, i) => {
                const isLocked = !isPlus && i >= 3;
                return (
                  <div
                    key={prog.brand}
                    className={`relative rounded-xl border bg-card p-5 transition-all ${isLocked ? "opacity-60" : "hover:shadow-md hover:border-[oklch(0.75_0.06_42)]"}`}
                  >
                    {prog.featured && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: "oklch(0.96 0.04 42)", color: "oklch(0.45 0.13 42)" }}>
                        <Star className="w-2.5 h-2.5 fill-current" /> Featured
                      </span>
                    )}

                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white text-xs font-bold"
                        style={{ background: currentCategory.color }}>
                        {prog.brand.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-foreground leading-tight">{prog.brand}</p>
                        <span className="inline-block mt-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: currentCategory.bgColor, color: currentCategory.color }}>
                          <Tag className="w-2.5 h-2.5 inline mr-1" />{prog.discount}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{prog.description}</p>

                    {isLocked ? (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Upgrade to Plus to unlock</span>
                        <Link href="/pricing" className="ml-auto text-xs font-semibold underline" style={{ color: currentCategory.color }}>
                          Upgrade
                        </Link>
                      </div>
                    ) : (
                      <a
                        href={prog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline"
                        style={{ color: currentCategory.color }}
                      >
                        Access on LifeMart <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Upgrade prompt for free users */}
            {!isPlus && (
              <div className="mt-6 rounded-xl border-2 border-dashed border-[oklch(0.82_0.06_42)] bg-[oklch(0.97_0.02_42)] p-6 text-center">
                <Lock className="w-8 h-8 mx-auto mb-3" style={{ color: "oklch(0.55 0.13 42)" }} />
                <p className="font-semibold text-foreground mb-1">Unlock All LifeMart Programs</p>
                <p className="text-sm text-muted-foreground mb-4">Upgrade to Plus or Premium to see all {currentCategory.programs.length} programs in this category plus full access to all 19,000+ LifeMart savings opportunities.</p>
                <Link href="/pricing">
                  <button className="inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg text-sm text-white transition-colors"
                    style={{ background: "oklch(0.45 0.13 42)" }}>
                    View Plans — from $9.99/mo <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ─── How to Access ─── */}
        <section id="how-to-access" className="py-12 bg-[oklch(0.97_0.01_42)] border-t border-border">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-2 text-center">How to Access LifeMart</h2>
              <p className="text-sm text-muted-foreground text-center mb-8">Three ways to unlock your LifeMart savings</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {[
                  {
                    step: "1",
                    title: "Through Your Employer",
                    desc: "Many employers offer LifeMart as a free employee benefit through ADP or other HR platforms. Check your employee benefits portal or ask your HR department.",
                    icon: Users,
                    color: "oklch(0.45 0.13 42)",
                  },
                  {
                    step: "2",
                    title: "Via Care.com",
                    desc: "Visit care.com/lifemart and sign up directly. Some access levels are available to individuals; others require an organizational membership.",
                    icon: ExternalLink,
                    color: "oklch(0.42 0.12 200)",
                  },
                  {
                    step: "3",
                    title: "Through an Association",
                    desc: "Many professional associations, unions, and membership organizations offer LifeMart access as a member benefit. Check with your associations.",
                    icon: Shield,
                    color: "oklch(0.42 0.14 145)",
                  },
                ].map((item) => (
                  <div key={item.step} className="bg-white rounded-xl border border-border p-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white font-bold text-sm"
                      style={{ background: item.color }}>
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-sm text-foreground mb-2">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-border p-5">
                <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" style={{ color: "oklch(0.42 0.14 145)" }} />
                  Once You Have LifeMart Access
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Log in at care.com/lifemart or through your employer portal",
                    "Browse by category or search for specific brands",
                    "Click through to the merchant — discount is applied automatically",
                    "Use the free LifeMart mobile app for on-the-go savings",
                    "Discounts are updated regularly — check back often",
                    "Average savings of ~$53 per purchase",
                  ].map((tip) => (
                    <div key={tip} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "oklch(0.42 0.14 145)" }} />
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Partnership CTA ─── */}
        <section className="py-12 border-t border-border">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center rounded-2xl p-8 border-2"
              style={{ background: "oklch(0.18 0.04 42)", borderColor: "oklch(0.30 0.06 42)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "oklch(0.45 0.13 42)" }}>
                <Star className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-3">
                Become a LifeMart Partner
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                DiscountHub is growing. When we reach our membership milestone, we plan to negotiate a direct LifeMart partnership — giving all DiscountHub Premium members seamless, one-click access to all 19,000+ LifeMart savings opportunities as part of their membership. Join Premium today and be among the first to benefit.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/pricing">
                  <button className="inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg text-sm text-white transition-colors"
                    style={{ background: "oklch(0.55 0.15 42)" }}>
                    Get Premium Access <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <a
                  href="https://www.care.com/lifemart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 font-semibold px-5 py-2.5 rounded-lg text-sm text-white transition-colors"
                >
                  Visit LifeMart Directly <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
