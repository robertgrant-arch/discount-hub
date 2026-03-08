import React, { createContext, useContext, useState } from "react";

export type MembershipTier = "free" | "basic" | "plus" | "premium";

export interface MembershipPlan {
  id: MembershipTier;
  name: string;
  price: number; // monthly price in USD
  yearlyPrice: number;
  color: string;
  features: string[];
  seniorAccess: boolean;
  disabilityAccess: boolean;
  favorites: boolean;
  printableCards: boolean;
  emailAlerts: boolean;
}

export const PLANS: MembershipPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    yearlyPrice: 0,
    color: "muted",
    features: [
      "Browse all 10 discount categories",
      "See company names & discount summaries",
      "Preview up to 3 programs per category",
      "No credit card required",
    ],
    seniorAccess: false,
    disabilityAccess: false,
    favorites: false,
    printableCards: false,
    emailAlerts: false,
  },
  {
    id: "basic",
    name: "Basic",
    price: 4.99,
    yearlyPrice: 47.88,
    color: "terracotta",
    features: [
      "Full access to all 160+ senior discounts",
      "Direct links to every program",
      "Eligibility & how-to-access details",
      "All 10 categories unlocked",
    ],
    seniorAccess: true,
    disabilityAccess: false,
    favorites: false,
    printableCards: false,
    emailAlerts: false,
  },
  {
    id: "plus",
    name: "Plus",
    price: 9.99,
    yearlyPrice: 95.88,
    color: "forest",
    features: [
      "Everything in Basic",
      "Full access to all 120+ disability discounts",
      "ADA & federal assistance programs",
      "Search & filter all 280+ programs",
    ],
    seniorAccess: true,
    disabilityAccess: true,
    favorites: false,
    printableCards: false,
    emailAlerts: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 14.99,
    yearlyPrice: 143.88,
    color: "featured",
    features: [
      "Everything in Plus",
      "Save favorites & build your list",
      "Printable discount cards",
      "Email alerts for new discounts",
    ],
    seniorAccess: true,
    disabilityAccess: true,
    favorites: true,
    printableCards: true,
    emailAlerts: true,
  },
];

interface MembershipContextType {
  currentTier: MembershipTier;
  setTier: (tier: MembershipTier) => void;
  canAccessSenior: boolean;
  canAccessDisability: boolean;
  canFavorite: boolean;
  canPrint: boolean;
  currentPlan: MembershipPlan;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const MembershipContext = createContext<MembershipContextType | null>(null);

export function MembershipProvider({ children }: { children: React.ReactNode }) {
  const [currentTier, setCurrentTier] = useState<MembershipTier>("free");
  const [favorites, setFavorites] = useState<string[]>([]);

  const currentPlan = PLANS.find((p) => p.id === currentTier)!;

  const toggleFavorite = (id: string) => {
    if (!currentPlan.favorites) return;
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <MembershipContext.Provider
      value={{
        currentTier,
        setTier: setCurrentTier,
        canAccessSenior: currentPlan.seniorAccess,
        canAccessDisability: currentPlan.disabilityAccess,
        canFavorite: currentPlan.favorites,
        canPrint: currentPlan.printableCards,
        currentPlan,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
}

export function useMembership() {
  const ctx = useContext(MembershipContext);
  if (!ctx) throw new Error("useMembership must be used within MembershipProvider");
  return ctx;
}
