import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHaiku from "@/components/PageHaiku";
import BenefitsChecklist from "@/components/BenefitsChecklist";
import EmergencyResources from "@/components/EmergencyResources";
import { HeartPulse, CheckCircle2, ShieldCheck, ClipboardList } from "lucide-react";

export default function BenefitsCheckerPage() {
  return (
    <>
      <Navbar />

              {/* Page hero */}
        <div
          className="relative border-b border-[oklch(0.88_0.02_75)]"
          style={{ background: "linear-gradient(135deg, oklch(0.22 0.02 50) 0%, oklch(0.32 0.06 42) 100%)" }}
        >
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          <div className="relative container py-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <HeartPulse className="w-3.5 h-3.5" />
                Benefits Eligibility Checker
              </div>
              <h1
                className="text-4xl font-bold text-white mb-3 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Am I Eligible?
              </h1>
              <p className="text-white/80 text-base leading-relaxed mb-6">
                Answer a few quick questions to discover which federal programs you may qualify for — free and private, no personal info stored.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Free Check", icon: CheckCircle2 },
                  { label: "No Info Stored", icon: ShieldCheck },
                  { label: "5 Quick Steps", icon: ClipboardList },
                ].map((stat) => (
                  <div key={stat.label} className="inline-flex items-center gap-1.5 bg-white/15 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full">
                    <stat.icon className="w-3 h-3" />
                    {stat.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      <main id="main-content" className="container mx-auto px-4 py-8 sm:py-12">
        <BenefitsChecklist />
        <div className="mt-16">
          <EmergencyResources />
        </div>
      </main>
      <Footer />
    </>
  );
}
