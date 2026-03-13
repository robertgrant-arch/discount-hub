/* monetizationData.ts — HealthCare Select Benefits Hub Revenue Programs
 * Affiliate links, pay-per-call numbers, and lead gen CTAs
 * Organized by site section for easy placement
 * NOTE: Replace placeholder phone numbers and affiliate URLs with your live tracked numbers/links
 */

export interface AffiliateProgram {
  id: string;
  name: string;
  company: string;
  description: string;
  commission: string;
  cta: string;
  url: string; // Replace with your tracked affiliate link
  network: string;
  badge?: string; // e.g. "Top Pick", "Highest Payout"
  category: string;
}

export interface PayPerCallProgram {
  id: string;
  name: string;
  description: string;
  phone: string; // Replace with your Ringba/tracked number
  cta: string;
  payout: string; // For your reference
  network: string; // e.g. "Ringba", "Retreaver"
  category: string;
  badge?: string;
}

export interface LeadGenProgram {
  id: string;
  name: string;
  company: string;
  description: string;
  cta: string;
  url: string; // Replace with your tracked lead gen URL
  payout: string;
  category: string;
  badge?: string;
}

// ─── AFFILIATE PROGRAMS ────────────────────────────────────────────────────────

export const AFFILIATE_PROGRAMS: AffiliateProgram[] = [
  // Medicare
  {
    id: "ehealth-medicare",
    name: "Compare Medicare Plans",
    company: "eHealth Medicare",
    description: "Compare Medicare Advantage, Supplement, and Part D plans side-by-side. Free, no obligation.",
    commission: "$50–$100 per enrollment",
    cta: "Compare Plans Free",
    url: "https://www.ehealthinsurance.com/medicare", // Replace with affiliate link
    network: "CJ Affiliate",
    badge: "Top Pick",
    category: "medicare",
  },
  {
    id: "gohealth-medicare",
    name: "Find Your Medicare Plan",
    company: "GoHealth",
    description: "Get personalized Medicare plan recommendations from licensed agents. Takes 2 minutes.",
    commission: "$40–$80 per lead",
    cta: "Get Free Recommendations",
    url: "https://www.gohealth.com/medicare", // Replace with affiliate link
    network: "Direct",
    category: "medicare",
  },
  {
    id: "selectquote-medicare",
    name: "Medicare Supplement Quotes",
    company: "SelectQuote Senior",
    description: "Compare Medigap plans from top carriers. Save up to 40% on Medicare Supplement premiums.",
    commission: "$50–$120 per sale",
    cta: "Get Free Quotes",
    url: "https://www.selectquote.com/medicare", // Replace with affiliate link
    network: "Direct",
    badge: "Highest Payout",
    category: "medicare",
  },
  // Prescriptions
  {
    id: "goodrx",
    name: "Save on Prescriptions",
    company: "GoodRx",
    description: "Find the lowest prescription prices near you. Free card saves up to 80% at 70,000+ pharmacies.",
    commission: "$2–$30 per activation",
    cta: "Find Lowest Price",
    url: "https://www.goodrx.com", // Replace with affiliate link
    network: "Impact Radius",
    badge: "Free to Use",
    category: "pharmacy",
  },
  {
    id: "blink-health",
    name: "Order Prescriptions Online",
    company: "Blink Health",
    description: "Pay online, pick up at your pharmacy. Prices up to 80% lower than retail.",
    commission: "$5–$15 per first purchase",
    cta: "Check Your Drug Price",
    url: "https://www.blinkhealth.com", // Replace with affiliate link
    network: "Impact Radius",
    category: "pharmacy",
  },
  {
    id: "rxsaver",
    name: "Free Prescription Discount Card",
    company: "RxSaver",
    description: "Download a free prescription savings card accepted at over 60,000 pharmacies nationwide.",
    commission: "$1–$5 per download",
    cta: "Get Free Card",
    url: "https://www.rxsaver.com", // Replace with affiliate link
    network: "CJ Affiliate",
    category: "pharmacy",
  },
  // Life & Final Expense Insurance
  {
    id: "ethos-life",
    name: "Life Insurance — No Medical Exam",
    company: "Ethos Life",
    description: "Get covered in minutes. Life insurance for ages 20–85 with no medical exam required.",
    commission: "$50–$100 per issued policy",
    cta: "Get Instant Quote",
    url: "https://www.ethoslife.com", // Replace with affiliate link
    network: "Impact Radius",
    badge: "No Medical Exam",
    category: "insurance",
  },
  {
    id: "selectquote-life",
    name: "Final Expense Insurance",
    company: "SelectQuote",
    description: "Affordable burial and final expense insurance for seniors 50–85. Coverage from $5,000–$25,000.",
    commission: "$40–$100 per sale",
    cta: "Compare Final Expense Plans",
    url: "https://www.selectquote.com/life-insurance", // Replace with affiliate link
    network: "Direct",
    category: "insurance",
  },
  // Medical Alert
  {
    id: "medical-guardian",
    name: "Medical Alert System",
    company: "Medical Guardian",
    description: "Award-winning medical alert systems for seniors. 24/7 monitoring, no long-term contracts.",
    commission: "$60–$100 per sale",
    cta: "Get 1 Month Free",
    url: "https://www.medicalguardian.com", // Replace with affiliate link
    network: "CJ Affiliate",
    badge: "1 Month Free",
    category: "medical-alert",
  },
  {
    id: "bay-alarm",
    name: "In-Home & Mobile Alert Systems",
    company: "Bay Alarm Medical",
    description: "Top-rated medical alert systems starting at $19.95/month. GPS, fall detection, and more.",
    commission: "$40–$80 per sale",
    cta: "See Plans & Pricing",
    url: "https://www.bayalarmmedical.com", // Replace with affiliate link
    network: "ShareASale",
    category: "medical-alert",
  },
  // Senior Living
  {
    id: "a-place-for-mom",
    name: "Find Senior Living Near You",
    company: "A Place for Mom",
    description: "Free service to find and compare assisted living, memory care, and independent living communities.",
    commission: "$75–$200 per qualified lead",
    cta: "Get Free Guidance",
    url: "https://www.aplaceformom.com", // Replace with affiliate link
    network: "Direct",
    badge: "Free Service",
    category: "senior-living",
  },
  {
    id: "caring",
    name: "Compare Senior Care Options",
    company: "Caring.com",
    description: "Research and compare senior living communities, home care agencies, and nursing homes.",
    commission: "$50–$150 per lead",
    cta: "Find Care Options",
    url: "https://www.caring.com", // Replace with affiliate link
    network: "Direct",
    category: "senior-living",
  },
  // Travel
  {
    id: "booking-com",
    name: "Senior Hotel Discounts",
    company: "Booking.com",
    description: "Find hotels offering senior rates. Compare prices from 1,000,000+ properties worldwide.",
    commission: "4% of booking value",
    cta: "Search Senior Rates",
    url: "https://www.booking.com", // Replace with affiliate link
    network: "Booking.com Partner Hub",
    category: "travel",
  },
  {
    id: "discover-cars",
    name: "Senior Car Rental Discounts",
    company: "Discover Cars",
    description: "Compare rental car prices from all major companies. Senior discounts available at checkout.",
    commission: "70% of net revenue",
    cta: "Compare Car Rentals",
    url: "https://www.discovercars.com", // Replace with affiliate link
    network: "Direct",
    badge: "Best Price Guarantee",
    category: "travel",
  },
  // Financial
  {
    id: "national-debt-relief",
    name: "Debt Relief for Seniors",
    company: "National Debt Relief",
    description: "Reduce your debt by up to 50%. Free consultation with no obligation. BBB A+ rated.",
    commission: "$27.50 per lead",
    cta: "Get Free Debt Analysis",
    url: "https://www.nationaldebtrelief.com", // Replace with affiliate link
    network: "CJ / Direct",
    badge: "Free Consultation",
    category: "financial",
  },
];

// ─── PAY-PER-CALL PROGRAMS ─────────────────────────────────────────────────────

export const PAY_PER_CALL_PROGRAMS: PayPerCallProgram[] = [
  {
    id: "medicare-call",
    name: "Speak with a Medicare Specialist",
    description: "Talk to a licensed Medicare agent. Compare plans and find the best coverage for your needs. Free, no obligation.",
    phone: "1-800-555-0001", // Replace with your Ringba tracked number
    cta: "Call a Medicare Specialist",
    payout: "$35–$100 per qualifying call",
    network: "Ringba",
    badge: "Free Consultation",
    category: "medicare",
  },
  {
    id: "final-expense-call",
    name: "Final Expense Insurance Quote",
    description: "Get a free final expense insurance quote over the phone. Coverage from $5,000–$25,000. Ages 50–85.",
    phone: "1-800-555-0002", // Replace with your Ringba tracked number
    cta: "Call for Free Quote",
    payout: "$50–$200 per qualifying call",
    network: "BrokerCalls / Ringba",
    badge: "Highest Payout",
    category: "insurance",
  },
  {
    id: "health-insurance-call",
    name: "Health Insurance Assistance",
    description: "Get help finding affordable health insurance. ACA plans, Medicaid, and more. Licensed agents available.",
    phone: "1-800-555-0003", // Replace with your Ringba tracked number
    cta: "Call for Free Help",
    payout: "$25–$75 per qualifying call",
    network: "Dialics / Ringba",
    category: "insurance",
  },
  {
    id: "senior-living-call",
    name: "Senior Living Placement Help",
    description: "Free placement assistance for assisted living, memory care, and home care. Local advisors available.",
    phone: "1-800-555-0004", // Replace with your Ringba tracked number
    cta: "Call a Senior Living Advisor",
    payout: "$100–$300 per qualifying call",
    network: "Ringba / Retreaver",
    badge: "Free Placement Service",
    category: "senior-living",
  },
  {
    id: "prescription-call",
    name: "Medicare Part D Help Line",
    description: "Get help choosing the right Medicare Part D prescription drug plan. Compare plans and save money.",
    phone: "1-800-555-0005", // Replace with your Ringba tracked number
    cta: "Call for Part D Help",
    payout: "$20–$60 per qualifying call",
    network: "Invoca / Ringba",
    category: "pharmacy",
  },
  {
    id: "medical-alert-call",
    name: "Medical Alert System Hotline",
    description: "Talk to a specialist about medical alert systems. Find the right device for your needs and budget.",
    phone: "1-800-555-0006", // Replace with your Ringba tracked number
    cta: "Call for Free Advice",
    payout: "$40–$80 per qualifying call",
    network: "DOPPCALL / Ringba",
    category: "medical-alert",
  },
];

// ─── LEAD GEN PROGRAMS ─────────────────────────────────────────────────────────

export const LEAD_GEN_PROGRAMS: LeadGenProgram[] = [
  {
    id: "medicare-quote-form",
    name: "Free Medicare Plan Comparison",
    company: "eHealth / GoHealth",
    description: "Enter your zip code to compare Medicare plans in your area. Takes 60 seconds.",
    cta: "Compare Plans in My Area",
    url: "https://www.ehealthinsurance.com/medicare", // Replace with affiliate/lead gen URL
    payout: "$15–$50 per lead",
    category: "medicare",
    badge: "Takes 60 Seconds",
  },
  {
    id: "senior-living-form",
    name: "Find Senior Living Communities",
    company: "A Place for Mom",
    description: "Tell us your needs and location. We'll match you with senior living options in your area.",
    cta: "Find Communities Near Me",
    url: "https://www.aplaceformom.com", // Replace with affiliate URL
    payout: "$75–$200 per lead",
    category: "senior-living",
    badge: "Free Matching Service",
  },
  {
    id: "reverse-mortgage-form",
    name: "Reverse Mortgage Calculator",
    company: "LendingTree",
    description: "See how much you could receive from a reverse mortgage. Free estimate, no obligation.",
    cta: "Calculate My Estimate",
    url: "https://www.lendingtree.com/reverse-mortgage", // Replace with affiliate URL
    payout: "$50–$150 per lead",
    category: "financial",
    badge: "Free Estimate",
  },
  {
    id: "debt-relief-form",
    name: "Free Debt Relief Analysis",
    company: "National Debt Relief",
    description: "See if you qualify for debt relief. Free analysis, no obligation. BBB A+ rated.",
    cta: "Get Free Analysis",
    url: "https://www.nationaldebtrelief.com", // Replace with affiliate URL
    payout: "$27.50 per lead",
    category: "financial",
  },
];

// ─── CATEGORY → PROGRAMS MAPPING ──────────────────────────────────────────────
// Maps site discount categories to relevant monetization programs

export const CATEGORY_MONETIZATION: Record<string, {
  affiliates: string[];
  calls: string[];
  leads: string[];
  headline: string;
  subtext: string;
}> = {
  "Healthcare and Pharmacy": {
    affiliates: ["goodrx", "blink-health", "rxsaver"],
    calls: ["prescription-call", "medicare-call"],
    leads: ["medicare-quote-form"],
    headline: "Save More on Your Prescriptions",
    subtext: "Compare drug prices and Medicare Part D plans to maximize your savings.",
  },
  "Restaurants and Dining": {
    affiliates: [],
    calls: [],
    leads: [],
    headline: "Explore More Senior Savings",
    subtext: "Discover additional ways to save on everyday expenses.",
  },
  "Travel and Hotels": {
    affiliates: ["booking-com", "discover-cars"],
    calls: [],
    leads: [],
    headline: "Book Your Senior Travel Deals",
    subtext: "Compare prices and find the best senior rates on hotels and car rentals.",
  },
  "Airlines and Transportation": {
    affiliates: ["booking-com", "discover-cars"],
    calls: [],
    leads: [],
    headline: "Find the Best Travel Rates",
    subtext: "Compare flights, hotels, and car rentals all in one place.",
  },
  "Financial Services and Insurance": {
    affiliates: ["ethos-life", "selectquote-life", "national-debt-relief"],
    calls: ["final-expense-call", "health-insurance-call"],
    leads: ["reverse-mortgage-form", "debt-relief-form"],
    headline: "Protect Your Financial Future",
    subtext: "Compare insurance plans and financial services designed for seniors.",
  },
  "Utilities and Home Services": {
    affiliates: ["medical-guardian", "bay-alarm"],
    calls: ["medical-alert-call"],
    leads: [],
    headline: "Stay Safe & Independent at Home",
    subtext: "Medical alert systems and home safety solutions for seniors and disabled Americans.",
  },
  "Technology and Subscriptions": {
    affiliates: [],
    calls: [],
    leads: [],
    headline: "More Ways to Save on Tech",
    subtext: "Explore additional discounts on technology and subscriptions.",
  },
  "Retail and Department Stores": {
    affiliates: [],
    calls: [],
    leads: [],
    headline: "Explore More Retail Discounts",
    subtext: "Find additional savings at your favorite stores.",
  },
  "Entertainment and Recreation": {
    affiliates: [],
    calls: [],
    leads: [],
    headline: "More Entertainment Savings",
    subtext: "Discover additional discounts on entertainment and recreation.",
  },
  "Grocery and Food": {
    affiliates: ["goodrx"],
    calls: [],
    leads: [],
    headline: "Save on Groceries & Prescriptions",
    subtext: "Combine grocery discounts with prescription savings for maximum value.",
  },
};

// ─── GLOBAL MONETIZATION BANNERS ──────────────────────────────────────────────
// These appear site-wide in strategic locations

export const GLOBAL_BANNERS = {
  medicare: {
    headline: "Medicare Open Enrollment Is Coming",
    subtext: "Compare Medicare Advantage, Supplement, and Part D plans. Free, no obligation.",
    cta: "Compare Plans Free",
    url: "https://www.ehealthinsurance.com/medicare", // Replace with affiliate link
    phone: "1-800-555-0001", // Replace with Ringba number
    color: "oklch(0.50 0.15 15)",
    bg: "oklch(0.95 0.04 15)",
  },
  goodrx: {
    headline: "Save Up to 80% on Prescriptions",
    subtext: "Free GoodRx card accepted at 70,000+ pharmacies. No insurance needed.",
    cta: "Get Free Savings Card",
    url: "https://www.goodrx.com", // Replace with affiliate link
    phone: "",
    color: "oklch(0.40 0.10 140)",
    bg: "oklch(0.90 0.04 140)",
  },
  seniorLiving: {
    headline: "Need Help Finding Senior Care?",
    subtext: "Free placement assistance from A Place for Mom. Local advisors, no cost to you.",
    cta: "Get Free Guidance",
    url: "https://www.aplaceformom.com", // Replace with affiliate link
    phone: "1-800-555-0004", // Replace with Ringba number
    color: "oklch(0.45 0.12 200)",
    bg: "oklch(0.92 0.04 200)",
  },
};
