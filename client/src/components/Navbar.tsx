/* DiscountHub Navbar — Warm Abundance design
 * Sticky top nav with auth-aware right side: login/signup or UserMenu
 */
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import UserMenu from "@/components/UserMenu";
import { Tag, Menu, X, Scissors, BookOpen, HeartPulse, Star } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/discounts", label: "Browse Discounts" },
  { href: "/coupons", label: "Coupons", icon: Scissors, badge: "NEW" },
  { href: "/social-programs", label: "Benefits Hub", icon: BookOpen },
  { href: "/medicare-guide", label: "Medicare Guide", icon: HeartPulse },
  { href: "/lifemart", label: "LifeMart Savings", icon: Star, badge: "NEW" },
  { href: "/benefits-checker", label: "Benefits Checker", icon: HeartPulse, badge: "NEW" },
  { href: "/pricing", label: "Membership" },
];

export default function Navbar() {
  const [location] = useLocation();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean; tab: "login" | "signup" }>({
    open: false,
    tab: "login",
  });

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
        <div className="w-full px-2 sm:px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(0.55 0.13 42)" }}
              >
                <Tag className="w-4 h-4 text-white" />
              </div>
              <span
                className="font-bold text-lg tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.02 50)" }}
              >
                Discount<span style={{ color: "oklch(0.55 0.13 42)" }}>Hub</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center flex-wrap gap-x-3 gap-y-1 flex-1 min-w-0 ml-2 justify-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[oklch(0.55_0.13_42)] flex items-center gap-1 whitespace-nowrap ${
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

            {/* Right side */}
            <div className="hidden xl:flex flex-col items-end gap-0.5 shrink-0">
              {user ? (
                <UserMenu />
              ) : (
                <>
                  <Button
                    size="sm"
                    onClick={openSignup}
                    style={{ background: "oklch(0.55 0.13 42)", color: "white" }}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    style={{ background: "oklch(0.55 0.13 42)", color: "white" }}
                    size="sm"
                    onClick={openLogin}
              >
                    Sign In
                  </Button>
                
            </div>

            {/* Mobile menu toggle */}
            <button
              className="xl:hidden p-2 rounded-md"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="xl:hidden border-t border-[oklch(0.88_0.02_75)] py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-medium py-2.5 px-2 rounded-lg transition-colors ${
                    location === link.href
                      ? "text-[oklch(0.55_0.13_42)] bg-[oklch(0.95_0.03_42)]"
                      : "text-[oklch(0.45_0.03_60)] hover:text-[oklch(0.55_0.13_42)] hover:bg-[oklch(0.97_0.01_80)]"
                  }`}
                  onClick={() => setMobileOpen(false)}
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
              <div className="pt-3 flex items-center gap-2 px-2">
                {user ? (
                  <UserMenu />
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => { openLogin(); setMobileOpen(false); }}
                    >
                      Sign In
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => { openSignup(); setMobileOpen(false); }}
                      style={{ background: "oklch(0.55 0.13 42)", color: "white" }}
                    >
                      Get Started Free
                    </Button>
                  </>
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
