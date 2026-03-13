/* AuthModal — Login & Signup modal
 * Warm Abundance design: terracotta/cream palette, Playfair Display headings
 */
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Eye, EyeOff, Tag, Lock, Mail, User } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

export default function AuthModal({ open, onClose, defaultTab = "login" }: AuthModalProps) {
  const { login, signup } = useAuth();
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Signup form
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPass, setSignupPass] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(loginEmail, loginPass);
    setLoading(false);
    if (result.success) {
      toast.success("Welcome back!");
      onClose();
    } else {
      toast.error(result.error || "Login failed");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPass.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const result = await signup(signupName, signupEmail, signupPass);
    setLoading(false);
    if (result.success) {
      toast.success("Account created! Welcome to HealthCare Select Benefits Hub.");
      onClose();
    } else {
      toast.error(result.error || "Signup failed");
    }
  };

  const fillDemo = () => {
    setTab("login");
    setLoginEmail("admin@discounthub.com");
    setLoginPass("DiscountHub2024!");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        <DialogTitle className="sr-only">
          {tab === "login" ? "Sign In" : "Create Account"}
        </DialogTitle>

        {/* Header */}
        <div
          className="px-8 pt-8 pb-6 text-center"
          style={{ background: "linear-gradient(135deg, oklch(0.45 0.08 175), oklch(0.45 0.08 175))" }}
        >
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3">
            <Tag className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {tab === "login" ? "Welcome Back" : "Join HealthCare Select Benefits Hub"}
          </h2>
          <p className="text-white/75 text-sm mt-1">
            {tab === "login"
              ? "Sign in to access your discounts"
              : "Create a free account to get started"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[oklch(0.90_0_0)] bg-white">
          {(["login", "signup"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                tab === t
                  ? "border-[oklch(0.45 0.08 175)] text-[oklch(0.45 0.08 175)]"
                  : "border-transparent text-[oklch(0.45_0_0)] hover:text-[oklch(0.35_0.04_50)]"
              }`}
            >
              {t === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        {/* Forms */}
        <div className="bg-white px-8 py-6">
          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="l-email" className="text-xs font-semibold text-[oklch(0.40_0.04_50)] mb-1.5 block">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.60_0.03_60)]" />
                  <Input
                    id="l-email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="pl-9 bg-[oklch(0.98_0.008_80)] border-[oklch(0.90_0_0)]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="l-pass" className="text-xs font-semibold text-[oklch(0.40_0.04_50)] mb-1.5 block">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.60_0.03_60)]" />
                  <Input
                    id="l-pass"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    required
                    className="pl-9 pr-9 bg-[oklch(0.98_0.008_80)] border-[oklch(0.90_0_0)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[oklch(0.60_0.03_60)] hover:text-[oklch(0.40_0.04_50)]"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full font-semibold"
                style={{ background: "oklch(0.68 0.15 55)", color: "white" }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : "Sign In"}
              </Button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[oklch(0.90_0_0)]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs text-[oklch(0.60_0.03_60)]">or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={fillDemo}
                className="w-full py-2.5 rounded-lg text-sm font-medium border border-dashed border-[oklch(0.72_0.09_42)] text-[oklch(0.40_0.08_175)] bg-[oklch(0.97_0.02_42)] hover:bg-[oklch(0.93_0_0)] transition-colors"
              >
                Use Demo Premium Account
              </button>

              <p className="text-center text-xs text-[oklch(0.60_0.03_60)]">
                Don't have an account?{" "}
                <button type="button" onClick={() => setTab("signup")} className="font-semibold hover:underline" style={{ color: "oklch(0.45 0.08 175)" }}>
                  Sign up free
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="s-name" className="text-xs font-semibold text-[oklch(0.40_0.04_50)] mb-1.5 block">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.60_0.03_60)]" />
                  <Input
                    id="s-name"
                    placeholder="Jane Smith"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                    className="pl-9 bg-[oklch(0.98_0.008_80)] border-[oklch(0.90_0_0)]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="s-email" className="text-xs font-semibold text-[oklch(0.40_0.04_50)] mb-1.5 block">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.60_0.03_60)]" />
                  <Input
                    id="s-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className="pl-9 bg-[oklch(0.98_0.008_80)] border-[oklch(0.90_0_0)]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="s-pass" className="text-xs font-semibold text-[oklch(0.40_0.04_50)] mb-1.5 block">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.60_0.03_60)]" />
                  <Input
                    id="s-pass"
                    type={showPass ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={signupPass}
                    onChange={(e) => setSignupPass(e.target.value)}
                    required
                    className="pl-9 pr-9 bg-[oklch(0.98_0.008_80)] border-[oklch(0.90_0_0)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[oklch(0.60_0.03_60)] hover:text-[oklch(0.40_0.04_50)]"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full font-semibold"
                style={{ background: "oklch(0.68 0.15 55)", color: "white" }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : "Create Free Account"}
              </Button>

              <p className="text-center text-xs text-[oklch(0.60_0.03_60)]">
                Already have an account?{" "}
                <button type="button" onClick={() => setTab("login")} className="font-semibold hover:underline" style={{ color: "oklch(0.45 0.08 175)" }}>
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
