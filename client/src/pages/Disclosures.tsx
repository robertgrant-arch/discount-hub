/* Disclosures.tsx — HealthCare Select Benefits Hub
 * FTC-required affiliate disclosure and advertising policy page
 * Design: Warm Abundance — terracotta/cream/forest green
 */
import Navbar from "@/components/Navbar";
import PageHaiku from "@/components/PageHaiku";
import Footer from "@/components/Footer";
import { Shield, ExternalLink, Mail } from "lucide-react";

export default function Disclosures() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-[oklch(0.96_0.02_42)] border-b border-border py-12">
          <div className="container max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[oklch(0.45 0.08 175)] flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-[oklch(0.45_0.08_175)] uppercase tracking-widest">
                Legal & Transparency
              </span>
            </div>
            <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-foreground mb-3">
              Advertising & Affiliate Disclosures
            </h1>
              <PageHaiku lines={["Transparency blooms", "Honest words between us grow", "Trust is the discount"]} />
            <p className="text-muted-foreground text-base leading-relaxed">
              HealthCare Select Benefits Hub is committed to transparency. This page explains how we earn revenue and how that may affect the content you see on our site.
            </p>
            <p className="text-xs text-muted-foreground mt-3">Last updated: March 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container max-w-3xl space-y-10">

            {/* FTC Disclosure */}
            <div>
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-3">
                FTC Required Disclosure
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
                <p>
                  In accordance with the Federal Trade Commission's guidelines concerning the use of endorsements and testimonials in advertising (16 CFR Part 255), HealthCare Select Benefits Hub discloses that this website contains affiliate links and sponsored content. When you click on certain links on this site and make a purchase, sign up for a service, or take another qualifying action, HealthCare Select Benefits Hub may receive a commission or referral fee from the company you are directed to.
                </p>
                <p>
                  This compensation does not influence our editorial decisions. We list programs and discounts based on their relevance and value to our audience — seniors and disabled Americans — not based on whether they pay us a commission. Many programs listed on this site do not pay us anything.
                </p>
              </div>
            </div>

            {/* Affiliate Links */}
            <div>
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-3">
                Affiliate Links & Partnerships
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
                <p>
                  HealthCare Select Benefits Hub participates in affiliate marketing programs through networks including but not limited to Commission Junction (CJ), Impact Radius, ShareASale, and direct affiliate programs. When you click a link marked with an external link icon (<ExternalLink className="w-3 h-3 inline" />) or labeled "Sponsored," you are being directed to a third-party website. If you complete a qualifying action on that website (such as purchasing a product, signing up for a service, or requesting a quote), HealthCare Select Benefits Hub may receive compensation.
                </p>
                <p>
                  The price you pay as a consumer is not affected by whether you click an affiliate link. In many cases, affiliate links may provide you with exclusive discounts or offers not available through direct navigation.
                </p>
              </div>
            </div>

            {/* Pay-Per-Call */}
            <div>
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-3">
                Pay-Per-Call Phone Numbers
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
                <p>
                  Some phone numbers displayed on this website are tracked phone numbers provided through pay-per-call advertising networks (such as Ringba, Retreaver, or Invoca). When you call these numbers, you will be connected to a licensed agent or service provider. HealthCare Select Benefits Hub may receive compensation when the call meets certain qualifying criteria (such as minimum call duration).
                </p>
                <p>
                  All calls are connected to licensed professionals. For insurance-related calls, you will be connected to a licensed insurance agent. HealthCare Select Benefits Hub does not provide insurance advice, and nothing on this site should be construed as a recommendation for a specific insurance plan.
                </p>
              </div>
            </div>

            {/* Medicare Disclaimer */}
            <div className="rounded-xl border border-[oklch(0.85_0.06_15)] bg-[oklch(0.97_0.02_15)] p-5">
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-3">
                Medicare & Insurance Disclaimer
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
                <p>
                  HealthCare Select Benefits Hub is not a licensed insurance agent or broker. We do not sell, recommend, or endorse any specific Medicare plan, health insurance plan, or insurance product. Information about Medicare and insurance programs on this site is provided for educational purposes only.
                </p>
                <p>
                  When you click a Medicare-related link or call a Medicare-related phone number on this site, you will be directed to a licensed insurance agent or a licensed insurance comparison website. Any enrollment decisions should be made in consultation with a licensed insurance professional.
                </p>
                <p>
                  Medicare has neither reviewed nor endorsed this information. HealthCare Select Benefits Hub is not affiliated with or endorsed by the Centers for Medicare & Medicaid Services (CMS) or any government agency.
                </p>
              </div>
            </div>

            {/* Government Programs */}
            <div>
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-3">
                Government Program Information
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
                <p>
                  Information about government programs (SSI, SSDI, Medicaid, Medicare, SNAP, HUD housing assistance, etc.) on the Benefits Hub section of this website is provided for informational and educational purposes only. HealthCare Select Benefits Hub is not affiliated with, endorsed by, or connected to any federal or state government agency.
                </p>
                <p>
                  For official and authoritative information about government programs, always visit the official government websites directly (ssa.gov, medicare.gov, medicaid.gov, hud.gov, etc.). Program rules, eligibility requirements, and benefit amounts are subject to change; always verify current information with the relevant agency.
                </p>
              </div>
            </div>

            {/* Membership */}
            <div>
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-3">
                Membership Subscriptions
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
                <p>
                  HealthCare Select Benefits Hub offers paid membership plans (Basic, Plus, and Premium) that provide enhanced access to discount listings, coupons, and features. Membership fees are charged through our payment processor (Stripe). Membership fees are separate from any affiliate commissions we may earn.
                </p>
                <p>
                  The existence of paid membership tiers does not affect which programs or discounts are listed on this site. Free users have access to a preview of all content; paid members receive full access to links, details, and additional features.
                </p>
              </div>
            </div>

            {/* Accuracy */}
            <div>
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-3">
                Accuracy of Information
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
                <p>
                  HealthCare Select Benefits Hub makes every effort to ensure that discount information, program details, and links are accurate and up to date. However, discount programs, eligibility requirements, and offers change frequently. We cannot guarantee that all information on this site is current or accurate at the time you read it.
                </p>
                <p>
                  Always verify discount eligibility, terms, and availability directly with the company or program before making a purchase or enrollment decision. HealthCare Select Benefits Hub is not responsible for any errors, omissions, or outdated information.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-3">
                Questions or Concerns
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                If you have questions about our advertising practices, affiliate relationships, or this disclosure policy, please contact us.
              </p>
              <a
                href="mailto:admin@discounthub.com"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.45_0.08_175)] hover:underline"
              >
                <Mail className="w-4 h-4" />
                admin@discounthub.com
              </a>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
