/* DiscountHub Navbar — Warm Abundance design
 * Sticky top nav with auth-aware right side: login/signup or UserMenu
 * Nav shows priority-ordered links at ALL screen sizes, fitting as many as possible
 * Properly spaced and responsive
 */
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import UserMenu from "@/components/UserMenu";
import { Tag, Menu, X, Scissors, BookOpen, HeartPulse, Star, MessageCircle, Calculator } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

/* All nav links */
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/discounts", label: "Browse Discounts" },
  { href: "/coupons", label: "Coupons", icon: Scissors, badge: "NEW" },
  { href: "/social-programs", label: "Benefits Hub", icon: BookOpen },
  { href: "/medicare-guide", label: "Medicare Guide", icon: HeartPulse },
  { href: "/lifemart", label: "LifeMart Savings", icon: Star, badge: "NEW" },
  { href: "/benefits-checker", label: "Benefits Checker", icon: HeartPulse, badge: "NEW" },
  { href: "/ask-claude", label: "Ask Claude", icon: MessageCircle },
  { href: "/savings-blueprint", label: "Savings Blueprint", icon: Calculator, badge: "NEW" },
  { href: "/pricing", label: "Membership" },
];

/*
 * Priority order for which links stay visible when space is limited.
 * Lower index = higher priority = stays visible longer.
 * Home is always rendered separately on the left, not part of this list.
 */
const PRIORITY_LINKS = [
  "/ask-claude",
  "/savings-blueprint",
];

/* Get the link objects in priority order (excluding Home) */
const prioritySorted = PRIORITY_LINKS.map((href) =>
  NAV_LINKS.find((l) => l.href === href)!
).filter(Boolean);

export default function Navbar() {
  const [location] = useLocation();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean; tab: "login" | "signup" }>({
    open: false,
    tab: "login",
  });

  /* ---- Priority-based responsive nav ---- */
  const navRef = useRef<HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState(prioritySorted.length);

  const calcVisible = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const children = Array.from(nav.children) as HTMLElement[];
    // Show all to measure
    children.forEach((c) => (c.style.visibility = "hidden", c.style.display = "", c.style.position = "absolute"));
    const navWidth = nav.offsetWidth;
    let usedWidth = 0;
    let count = 0;
    for (const child of children) {
      const w = child.offsetWidth + 24; // gap between items
      if (usedWidth + w > navWidth && count > 0) break;
      usedWidth += w;
      count++;
    }
    // Apply visibility
    children.forEach((c, i) => {
      c.style.position = "";
      c.style.visibility = "";
      c.style.display = i < count ? "" : "none";
    });
    setVisibleCount(count);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(calcVisible);
    });
    ro.observe(nav);
    calcVisible();
    return () => ro.disconnect();
  }, [calcVisible]);

  const openLogin = () => setAuthModal({ open: true, tab: "login" });
  const openSignup = () => setAuthModal({ open: true, tab: "signup" });

  return (
    <>
      {/* Skip to main content for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#C17A4A] focus:text-white focus:rounded focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 bg-[oklch(0.98_0.012_80)] border-b border-[oklch(0.88_0.02_75)] shadow-sm">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Left side: Logo + Home + Priority nav links */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 min-w-0 flex-1">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group shrink-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "oklch(0.55 0.13 42)" }}
                >
                  <Tag className="w-4 h-4 text-white" />
                </div>
                <span
                  className="font-bold text-lg tracking-tight hidden sm:inline"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.02 50)" }}
                >
                  Discount<span style={{ color: "oklch(0.55 0.13 42)" }}>Hub</span>
                </span>
              </Link>

              {/* Home link — always visible on the left */}
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-[oklch(0.55_0.13_42)] whitespace-nowrap shrink-0 ${
                  location === "/"
                    ? "text-[oklch(0.55_0.13_42)]"
                    : "text-[oklch(0.45_0.03_60)]"
                }`}
              >
                Home
              </Link>

              {/* Priority nav — shows as many links as fit, in priority order, at ALL screen sizes */}
              <nav
                ref={navRef}
                className="flex items-center gap-x-4 sm:gap-x-5 md:gap-x-6 flex-1 min-w-0 overflow-hidden"
              >
                {prioritySorted.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-[oklch(0.55_0.13_42)] flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      location === link.href
                        ? "text-[oklch(0.55_0.13_42)]"
                        : "text-[oklch(0.45_0.03_60)]"
                    }`}
                  >
                    {link.icon && <link.icon className="w-3.5 h-3.5" />}
                    {link.label}
                    {link.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: "oklch(0.55 0.13 42)" }}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right side: auth + hamburger */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-4">
              <div className="hidden sm:flex items-center">
                {user ? (
                  <UserMenu />
                ) : (
                  <Button
                    size="sm"
                    onClick={openSignup}
                    style={{ background: "oklch(0.55 0.13 42)", color: "white" }}
                  >
                    Get Started Free or Sign In
                  </Button>
                )}
              </div>

              {/* Hamburger — always available for full menu access */}
              <button
                className="p-2 rounded-md hover:bg-[oklch(0.94_0.02_75)] transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Expanded menu — shows ALL links in priority order */}
          {mobileOpen && (
            <div className="border-t border-[oklch(0.88_0.02_75)] py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2.5 text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                    location === link.href
                      ? "text-[oklch(0.55_0.13_42)] bg-[oklch(0.95_0.03_42)]"
                      : "text-[oklch(0.45_0.03_60)] hover:text-[oklch(0.55_0.13_42)] hover:bg-[oklch(0.97_0.01_80)]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                  {link.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: "oklch(0.55 0.13 42)" }}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-3 flex items-center gap-2 px-3 sm:hidden">
                {user ? (
                  <UserMenu />
                ) : (
                  <Button
                    size="sm"
                    onClick={() => { openSignup(); setMobileOpen(false); }}
                    style={{ background: "oklch(0.55 0.13 42)", color: "white" }}
                  >
                    Get Started Free or Sign In
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        open={authModal.open}
        onClose={() => setAuthModal((s) => ({ ...s, open: false }))}
        defaultTab={authModal.tab}
      />
    </>
  );
}
