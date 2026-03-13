/* Healthcare Select Benefits Hub Navbar — Official HCS Brand
 * White navbar with official Healthcare Select logo from healthcareselect.com
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

/* Official Healthcare Select logo mark SVG — matches healthcareselect.com */
function HCSLogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      {/* Cross/plus shape: top arm */}
      <rect x="18" y="0" width="24" height="16" rx="2" fill="#2B7A78" />
      {/* Cross/plus shape: left arm */}
      <rect x="0" y="18" width="16" height="24" rx="2" fill="#C67B4B" />
      {/* Cross/plus shape: center */}
      <rect x="18" y="18" width="24" height="24" rx="2" fill="#2B7A78" />
      {/* Cross/plus shape: right arm */}
      <rect x="44" y="18" width="16" height="24" rx="2" fill="#2B7A78" />
      {/* Cross/plus shape: bottom arm */}
      <rect x="18" y="44" width="24" height="16" rx="2" fill="#5BB5C0" />
      {/* Orange accent: top-right of top arm */}
      <rect x="34" y="0" width="8" height="16" rx="1" fill="#C67B4B" />
      {/* Light blue accent: bottom-left of bottom arm */}
      <rect x="18" y="44" width="8" height="16" rx="1" fill="#5BB5C0" />
      {/* Orange accent: bottom-right of right arm */}
      <rect x="44" y="34" width="16" height="8" rx="1" fill="#C67B4B" />
      {/* White circle */}
      <circle cx="30" cy="30" r="13" fill="none" stroke="white" strokeWidth="3" />
      {/* White plus/cross inside circle */}
      <line x1="30" y1="22" x2="30" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="30" x2="38" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

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
              {/* Official HCS Logo + wordmark */}
              <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                <HCSLogoMark size={40} />
                <span
                  className="font-bold text-base tracking-tight hidden sm:inline leading-tight"
                  style={{ fontFamily: "'Sora', 'Open Sans', sans-serif", color: "#000000" }}
                >
                  Healthcare{" "}
                  <span style={{ color: "#000000" }}>Select</span>
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
