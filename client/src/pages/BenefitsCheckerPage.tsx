import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHaiku from "@/components/PageHaiku";
import BenefitsChecklist from "@/components/BenefitsChecklist";
import EmergencyResources from "@/components/EmergencyResources";

export default function BenefitsCheckerPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="container mx-auto px-4 py-8 sm:py-12">
        <PageHaiku
          lines={[
            "Which doors stand open?",
            "Answer a few gentle steps—",
            "your benefits bloom.",
          ]}
        />
        <BenefitsChecklist />
        <div className="mt-16">
          <EmergencyResources />
        </div>
      </main>
      <Footer />
    </>
  );
}
