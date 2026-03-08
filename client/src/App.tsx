import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { MembershipProvider, useMembership } from "./contexts/MembershipContext";
import Home from "./pages/Home";
import Discounts from "./pages/Discounts";
import CategoryPage from "./pages/CategoryPage";
import Pricing from "./pages/Pricing";
import Checkout from "./pages/Checkout";
import Coupons from "./pages/Coupons";
import SocialPrograms from "./pages/SocialPrograms";
import Disclosures from "./pages/Disclosures";
import MedicareGuide from "./pages/MedicareGuide";
import LifeMart from "./pages/LifeMart";
import { useEffect } from "react";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

// Syncs the logged-in user's tier into the MembershipContext
function TierSync() {
  const { user } = useAuth();
  const { setTier, currentTier } = useMembership();

  useEffect(() => {
    if (user && user.tier !== currentTier) {
      setTier(user.tier);
    }
    if (!user && currentTier !== "free") {
      setTier("free");
    }
  }, [user, currentTier, setTier]);

  return null;
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/discounts" component={Discounts} />
      <Route path="/discounts/:categoryId" component={CategoryPage} />
      <Route path="/coupons" component={Coupons} />
      <Route path="/social-programs" component={SocialPrograms} />
      <Route path="/medicare-guide" component={MedicareGuide} />
      <Route path="/lifemart" component={LifeMart} />
      <Route path="/disclosures" component={Disclosures} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/checkout/:tier" component={Checkout} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <MembershipProvider>
            <TierSync />
            <TooltipProvider>
              <Toaster />
              <Router base={basePath}>
                <AppRoutes />
              </Router>
            </TooltipProvider>
          </MembershipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
