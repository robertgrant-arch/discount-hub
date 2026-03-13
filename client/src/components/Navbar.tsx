/* Healthcare Select Benefits Hub Navbar — Official HCS Brand
 * White navbar with black HealthCare Select text
 * Sora font for logo | Responsive priority nav
 */
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import UserMenu from "@/components/UserMenu";
import { Menu, X, Scissors, BookOpen, HeartPulse, Star, MessageCircle, Calculator } from "lucide-react";
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

const PRIORITY_LINKS = [
  "/ask-claude",
  "/savings-blueprint",
];

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
  const navRef = useRef<HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState(prioritySorted.length);

  const calcVisible = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const children = Array.from(nav.children) as HTMLElement[];
    children.forEach((c) => (c.style.visibility = "hidden", c.style.display = "", c.style.position = "absolute"));
    const navWidth = nav.offsetWidth;
    let usedWidth = 0;
    let count = 0;
    for (const child of children) {
      const w = child.offsetWidth + 24;
      if (usedWidth + w > navWidth && count > 0) break;
      usedWidth += w;
      count++;
    }
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
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-bold"
        style={{ backgroundColor: "#C05824", color: "white" }}
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 shadow-md" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + nav */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 min-w-0 flex-1">
              {/* HCS Logo mark + wordmark */}
              <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                {/* HCS Cross logo mark */}<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0"> {/* HCS Official Logo Mark */}
                  {/* Top row */}
                  <rect x="0" y="0" width="11" height="11" rx="1" fill="#0E5659"/>
                  <rect x="13" y="0" width="11" height="11" rx="1" fill="#0E5659"/>
                  <rect x="25" y="0" width="11" height="11" rx="1" fill="#4CC0AE"/>
                  {/* Middle row */}
                  <rect x="0" y="13" width="11" height="11" rx="1" fill="#0E5659"/>
                  <rect x="13" y="13" width="11" height="11" rx="2" fill="#0E5659"/>
                  <circle cx="18" cy="18" r="3.5" fill="none" stroke="#0E5659" strokeWidth="1.5"/>
                  <rect x="25" y="13" width="11" height="11" rx="1" fill="#4CC0AE"/>
                  {/* Bottom row */}
                  <rect x="0" y="25" width="11" height="11" rx="1" fill="#C05824"/>
                  <rect x="13" y="25" width="11" height="11" rx="1" fill="#0E5659"/>
                  <rect x="25" y="25" width="11" height="11" rx="1" fill="#4CC0AE"/>
                </svg>
                <span
                  className="font-bold text-base tracking-tight hidden sm:inline leading-tight"
                  style={{ fontFamily: "'Sora', 'Open Sans', sans-serif", color: "#000000" }}
                >
                  HealthCare Select{" "}
                  <span style={{ color: "rgba(0,0,0,0.55)" }}>Benefits Hub</span>
                </span>
              </Link>

              {/* Home link */}
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-black whitespace-nowrap shrink-0 ${
                  location === "/" ? "text-black" : "text-gray-600"
                }`}
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Home
              </Link>

              {/* Priority nav links */}
              <nav
                ref={navRef}
                className="flex items-center gap-x-4 sm:gap-x-5 md:gap-x-6 flex-1 min-w-0 overflow-hidden"
              >
                {prioritySorted.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-black flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      location === link.href ? "text-black" : "text-gray-600"
                    }`}
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {link.icon && <link.icon className="w-3.5 h-3.5" />}
                    {link.label}
                    {link.badge && (
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: "#C05824" }}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right: auth + hamburger */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-4">
              <div className="hidden sm:flex items-center">
                {user ? (
                  <UserMenu />
                ) : (
                  <Button
                    size="sm"
                    onClick={openSignup}
                    className="border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-100"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    Get Started Free or Sign In
                  </Button>
                )}
              </div>
              <button
                className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Expanded menu */}
          {mobileOpen && (
            <div className="border-t border-gray-200 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2.5 text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                    location === link.href
                      ? "text-black bg-gray-100"
                      : "text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                  {link.badge && (
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: "#C05824" }}
                    >
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
                    className="border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-100"
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
