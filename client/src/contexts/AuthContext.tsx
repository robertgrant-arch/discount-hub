/* AuthContext — DiscountHub authentication
 * Client-side auth with localStorage persistence
 * Pre-loaded Premium owner account: admin@discounthub.com / DiscountHub2024!
 */
import React, { createContext, useContext, useState, useEffect } from "react";
import { MembershipTier } from "./MembershipContext";

export interface User {
  id: string;
  email: string;
  name: string;
  tier: MembershipTier;
  joinedAt: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateTier: (tier: MembershipTier) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Pre-seeded accounts stored in localStorage key "dh_accounts"
const SEED_ACCOUNTS: Array<{ email: string; password: string; user: User }> = [
  {
    email: "admin@discounthub.com",
    password: "DiscountHub2024!",
    user: {
      id: "owner-001",
      email: "admin@discounthub.com",
      name: "Site Owner",
      tier: "premium",
      joinedAt: new Date().toISOString(),
    },
  },
];

const STORAGE_KEY = "dh_current_user";
const ACCOUNTS_KEY = "dh_accounts";

function getAccounts(): Array<{ email: string; password: string; user: User }> {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveAccounts(accounts: Array<{ email: string; password: string; user: User }>) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function initAccounts() {
  const existing = getAccounts();
  const existingEmails = new Set(existing.map((a) => a.email));
  const merged = [...existing];
  for (const seed of SEED_ACCOUNTS) {
    if (!existingEmails.has(seed.email)) {
      merged.push(seed);
    }
  }
  saveAccounts(merged);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initAccounts();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setIsLoading(false);
  }, []);

  const persistUser = (u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 600)); // simulate network
    const accounts = getAccounts();
    const match = accounts.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );
    if (!match) {
      return { success: false, error: "Invalid email or password." };
    }
    persistUser(match.user);
    return { success: true };
  };

  const signup = async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    const accounts = getAccounts();
    if (accounts.find((a) => a.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists." };
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      tier: "free",
      joinedAt: new Date().toISOString(),
    };
    accounts.push({ email, password, user: newUser });
    saveAccounts(accounts);
    persistUser(newUser);
    return { success: true };
  };

  const logout = () => {
    persistUser(null);
  };

  const updateTier = (tier: MembershipTier) => {
    if (!user) return;
    const updated = { ...user, tier };
    // Update in accounts store too
    const accounts = getAccounts();
    const idx = accounts.findIndex((a) => a.email === user.email);
    if (idx >= 0) {
      accounts[idx].user = updated;
      saveAccounts(accounts);
    }
    persistUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateTier }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
