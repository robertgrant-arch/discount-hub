export interface DiscountItem {
  name: string;
  company?: string;
  discount: string;
  age_requirement?: string;
  eligibility?: string;
  conditions: string;
  website: string;
  how_to_access: string;
  audience: "senior" | "disability";
}

export interface DiscountCategory {
  id: string;
  category: string;
  icon: string;
  image?: string;
  senior: DiscountItem[];
  disability: DiscountItem[];
}

export const DISCOUNT_DATA: DiscountCategory[] = [
  {
    "id": "restaurants-and-fast-food",
    "category": "Restaurants and Fast Food",
    "icon": "UtensilsCrossed",
    "image": "https://d2xsxph8kpxj0f.cloudfront.net/310519663319813187/Mm4cCnjCEhGr2U6GXNthjR/category-restaurants-2UhvK6mLvtXizNiKeoYvXn.webp",
    "senior": [
      {
        "name": "A&W",
        "discount": "10% off",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Applebee\u2019s",
        "discount": "Varies by location",
        "age_requirement": "60",
        "conditions": "Must be age 60 or older",
        "website": "https://www.applebees.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Arby\u2019s",
        "discount": "10% off",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "https://www.arbys.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Back Yard Burgers",
        "discount": "10% off",
        "age_requirement": "60",
        "conditions": "Must be age 60 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Ben and Jerry\u2019s",
        "discount": "10% off",
        "age_requirement": "60",
        "conditions": "Must be age 60 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Bennigan\u2019s",
        "discount": "Varies by location",
        "age_requirement": "60",
        "conditions": "Must be age 60 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Big Boy",
        "discount": "Varies by location",
        "age_requirement": "60",
        "conditions": "Must be age 60 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Bonanza Steakhouse",
        "discount": "Varies by location",
        "age_requirement": "65",
        "conditions": "Must be age 65 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Bonefish Grill",
        "discount": "10% off",
        "age_requirement": "AARP membership required",
        "conditions": "Must be an AARP member",
        "website": "https://www.bonefishgrill.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Boston Market",
        "discount": "10% off",
        "age_requirement": "55",
        "conditions": "Must be 55 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Bubba Gump Shrimp Company",
        "discount": "10% off",
        "age_requirement": "AARP membership required",
        "conditions": "Must be an AARP member",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Burger King",
        "discount": "Varies by location",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "https://www.bk.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Captain D\u2019s",
        "discount": "Varies by location",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Carrabba\u2019s Italian Grill",
        "discount": "10% off",
        "age_requirement": "AARP membership required",
        "conditions": "Must be an AARP member",
        "website": "https://www.carrabbas.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Cici\u2019s Pizza",
        "discount": "Varies by location",
        "age_requirement": "50",
        "conditions": "Must be age 50 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Chili\u2019s",
        "discount": "10% off",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "https://www.chilis.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Dairy Queen",
        "discount": "10% off or one free small drink",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "https://www.dairyqueen.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Denny\u2019s",
        "discount": "15% off + senior menu",
        "age_requirement": "AARP membership required",
        "conditions": "Must be an AARP member",
        "website": "https://www.dennys.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Dunkin",
        "discount": "10% off",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Einstein Bros. Bagels",
        "discount": "10% off",
        "age_requirement": "60",
        "conditions": "Must be age 60 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "El Pollo Loco",
        "discount": "10% off",
        "age_requirement": "60",
        "conditions": "Must be age 60 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Fuddruckers",
        "discount": "10% off",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Golden Corral",
        "discount": "10% off",
        "age_requirement": "60",
        "conditions": "Must be age 60 or older",
        "website": "https://www.goldencorral.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Hardee\u2019s",
        "discount": "10% off",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "IHOP",
        "discount": "10% off + senior menu",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "https://www.ihop.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Jack in the Box",
        "discount": "20% off",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "https://www.jackinthebox.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "KFC",
        "discount": "10% off or free small drink",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "https://www.kfc.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Krispy Kreme",
        "discount": "10% off",
        "age_requirement": "50",
        "conditions": "Must be age 50 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Long John Silvers",
        "discount": "Varies by location",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "McDonald\u2019s",
        "discount": "Discount on beverages; varies by location",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "https://www.mcdonalds.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Outback Steakhouse",
        "discount": "10% off",
        "age_requirement": "AARP membership required",
        "conditions": "Must be an AARP member",
        "website": "https://www.outback.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "SaltGrass",
        "discount": "10% off",
        "age_requirement": "AARP membership required",
        "conditions": "Must be an AARP member",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Shoney\u2019s",
        "discount": "10% off",
        "age_requirement": "60",
        "conditions": "Must be age 60 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Sizzler",
        "discount": "Senior menu",
        "age_requirement": "60",
        "conditions": "Must be age 60 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Sonic",
        "discount": "10% off or free drink",
        "age_requirement": "60",
        "conditions": "Must be age 60 or older",
        "website": "https://www.sonicdrivein.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Steak \u2018n Shake",
        "discount": "10% off",
        "age_requirement": "50",
        "conditions": "Must be age 50 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "TCBY",
        "discount": "10% off",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Waffle House",
        "discount": "Varies by location",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Whataburger",
        "discount": "Free drink with meal purchase",
        "age_requirement": "55",
        "conditions": "Must be age 55 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "Wendy\u2019s",
        "discount": "Varies by location",
        "age_requirement": "60",
        "conditions": "Must be age 60 or older",
        "website": "https://www.wendys.com",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      },
      {
        "name": "White Castle",
        "discount": "10% off",
        "age_requirement": "62",
        "conditions": "Must be age 62 or older",
        "website": "",
        "how_to_access": "Ask at register; may require ID or AARP card",
        "audience": "senior"
      }
    ],
    "disability": [
      {
        "name": "SNAP Restaurant Meals Program",
        "discount": "Allows eligible individuals to use SNAP benefits to purchase prepared meals. Some states may offer additional discounts (e.g., 10% in New York).",
        "eligibility": "Must be certified for SNAP in a state with an RMP. All household members must be: disabled (receives disability or blindness payments or disability retirement benefits from a governmental agency due to a permanent disability), elderly (60 years of age or older), homeless, or a spouse of an eligible SNAP client.",
        "conditions": "Available only in states that operate an RMP. Participating restaurants must be approved by the state and FNS.",
        "website": "https://www.fns.usda.gov/snap/retailer/restaurant-meals-program",
        "how_to_access": "Use an Electronic Benefit Transfer (EBT) card coded by the state to allow purchases at participating restaurants.",
        "audience": "disability"
      },
      {
        "name": "General Restaurant Discounts (Inquire Locally)",
        "discount": "Varies by establishment; may include percentage off, free items, or special menus.",
        "eligibility": "Varies by establishment; some may offer discounts for individuals with disabilities upon request and presentation of proof (e.g., disability ID, ADA documentation). Senior discounts (e.g., AARP) are more common and may be accessible to disabled individuals who meet age requirements.",
        "conditions": "Discounts are not universally advertised or guaranteed. Availability is at the discretion of individual restaurant locations or chains.",
        "website": "N/A (no single official website)",
        "how_to_access": "Inquire directly at the restaurant. Be prepared to show relevant identification or documentation if a discount is offered.",
        "audience": "disability"
      }
    ]
  },
  {
    "id": "retail-and-department-stores",
    "category": "Retail and Department Stores",
    "icon": "ShoppingBag",
    "image": undefined,
    "senior": [],
    "disability": [
      {
        "name": "Walmart+ Assist",
        "discount": "50% off Walmart+ membership",
        "eligibility": "Qualifying government assistance recipients (SNAP, WIC, Medicaid, SSI, TANF, LIHEAP, NSLP)",
        "conditions": "Membership fee of $6.47/month or $49/year after discount. Verification through SheerID required.",
        "website": "https://www.walmart.com/plus/assist",
        "how_to_access": "Visit Walmart.com/Plus/Assist to verify eligibility through SheerID and sign up.",
        "audience": "disability"
      },
      {
        "name": "Target Circle 360 Government Assistance Discount",
        "discount": "Discounted monthly membership fee for Target Circle 360",
        "eligibility": "Target Circle members who qualify for benefits from SNAP, LIHEAP, Medicaid, SSI, TANF, or WIC.",
        "conditions": "Verification of government assistance status required annually through SheerID.",
        "website": "https://help.target.com/help/TargetGuestHelpArticleDetail?articleId=ka95d000000gTGCAA2&articleTitle=How+do+I+verify+my+government+assistance+status%3F",
        "how_to_access": "Verify eligibility through SheerID via Target's website.",
        "audience": "disability"
      },
      {
        "name": "CVS OTC Benefits",
        "discount": "Funds to purchase eligible over-the-counter health and wellness products",
        "eligibility": "Individuals with select Medicare Advantage and Medicaid plans.",
        "conditions": "Benefit amount and eligible items vary by health plan.",
        "website": "https://www.cvs.com/content/otc-benefits",
        "how_to_access": "Use OTC benefit card at most CVS Pharmacy stores.",
        "audience": "disability"
      },
      {
        "name": "Walgreens OTC Benefits",
        "discount": "Monthly or quarterly allowance to buy eligible over-the-counter health and wellness products",
        "eligibility": "Individuals with certain health plans that include OTC benefits.",
        "conditions": "Benefit amount and eligible items vary by health plan.",
        "website": "https://www.walgreens.com/topic/store/otc/shop_otc.jsp",
        "how_to_access": "Shop online or in-store with your OTC benefit card.",
        "audience": "disability"
      },
      {
        "name": "Kohl's Adaptive Apparel",
        "discount": "Adaptive clothing lines for children and adults",
        "eligibility": "Anyone needing adaptive clothing",
        "conditions": "No specific discount, but products are designed for accessibility.",
        "website": "https://disabilityinsider.com/2022/09/14/accessibility/kohls-launches-clothing-collection-for-adults-with-disabilities/",
        "how_to_access": "Purchase adaptive apparel from Kohl's stores or online.",
        "audience": "disability"
      },
      {
        "name": "Walmart Adaptive at Walmart",
        "discount": "Curated page of adaptive products",
        "eligibility": "Anyone needing adaptive products",
        "conditions": "No specific discount, but products are designed for accessibility.",
        "website": "https://www.walmart.com/cp/adaptive-at-walmart/6041066",
        "how_to_access": "Purchase adaptive products from Walmart stores or online.",
        "audience": "disability"
      }
    ]
  },
  {
    "id": "travel-and-hotels",
    "category": "Travel and Hotels",
    "icon": "Hotel",
    "image": "https://d2xsxph8kpxj0f.cloudfront.net/310519663319813187/Mm4cCnjCEhGr2U6GXNthjR/category-travel-AjUvFYTBT85Achjo586CkL.webp",
    "senior": [
      {
        "name": "Marriott Hotels",
        "discount": "15% off",
        "age_requirement": "62+",
        "conditions": "Proof of age eligibility required at check-in (e.g., Driver's License). Reservation must be booked in the name of the Senior Guest. AARP membership not required. Rate is subject to availability.",
        "website": "https://www.marriott.com/offers/special-senior-discount-OFF-202102",
        "how_to_access": "Select 'Senior Discount' when booking online or request the Senior Rate when booking by phone. Present valid ID at check-in.",
        "audience": "senior"
      },
      {
        "name": "Hilton Hotels & Resorts",
        "discount": "Up to 6% off Best Available Rate",
        "age_requirement": "65+",
        "conditions": "Proof of eligibility required at check-in. Maximum of two rooms bookable; second room for family members only. Rate valid for leisure stays only. Offer discount varies by hotel, is unrestricted, non-qualified, and excludes discount or negotiated rates not available to the general public.",
        "website": "https://www.hilton.com/en/offers/senior-rate-2000000292",
        "how_to_access": "Select 'Senior Rate' when booking online or call +1-800-HONORS and request the rate. Present valid ID at check-in.",
        "audience": "senior"
      },
      {
        "name": "Choice Hotels (including Cambria Suites, Clarion, Clarion Pointe, Comfort Inn, Comfort Suites, Econo Lodge, MainStay Suites, Quality Inn, Rodeway Inn, Sleep Inn, Suburban Studios)",
        "discount": "Up to 10% off",
        "age_requirement": "60+ or AARP member",
        "conditions": "Advance reservations.",
        "website": "https://www.choicehotels.com/deals/senior-rates",
        "how_to_access": "Select 'Senior/AARP' from the special rate dropdown online or request the Senior Rate when calling 800-4CHOICE.",
        "audience": "senior"
      },
      {
        "name": "Wyndham Hotels & Resorts (overall)",
        "discount": "Up to 20% with AARP card, AMAC members 20% off",
        "age_requirement": "60+",
        "conditions": "Special savings on Standard Rate. Blackout dates and other restrictions may apply; cannot be combined with other offers. Based on availability. See Standard Rate for full details and requirements.",
        "website": "https://www.wyndhamhotels.com/hotel-deals/senior-discount",
        "how_to_access": "Perform a travel search on the website or call 1-800-225-3297 and request the senior rate. Present valid proof of identification at check-in.",
        "audience": "senior"
      },
      {
        "name": "Wyndham Hotels & Resorts (individual brands like AmericInn, Baymont, Days Inn, Dazzler, Dolce, Hawthorn Suites, Howard Johnson, La Quinta, Microtel, Ramada, Super 8, Travelodge, TRYP, Wingate, Wyndham, Wyndham Garden, Wyndham Grand, Trademark Collection)",
        "discount": "10% or more off the standard rate",
        "age_requirement": "60+",
        "conditions": "Special savings on Standard Rate. Blackout dates and other restrictions may apply; cannot be combined with other offers. Based on availability. See Standard Rate for full details and requirements.",
        "website": "https://www.wyndhamhotels.com/hotel-deals/senior-discount",
        "how_to_access": "Perform a travel search on the website or call 1-800-225-3297 and request the senior rate. Present valid proof of identification at check-in.",
        "audience": "senior"
      },
      {
        "name": "IHG Hotels & Resorts",
        "discount": "Percentage off Best Flex Rate or save more when booking 3 days in advance",
        "age_requirement": "62+ and IHG One Rewards Member",
        "conditions": "IHG One Rewards membership required. Discounts vary by hotel, length of stay, and time of booking. Blackout dates apply and rooms are subject to availability. Certain room types may be excluded. Not applicable with other discounted rate offers or group bookings.",
        "website": "https://www.ihg.com/content/us/en/deals/hotel-offers/senior_discount",
        "how_to_access": "Book the 'Member Senior Discount rate' or 'Member Senior Advance Purchase Discount rate' online. Present valid membership ID of a retired persons organization or proof of age.",
        "audience": "senior"
      },
      {
        "name": "Best Western Hotels & Resorts",
        "discount": "5% or more off the best available rate",
        "age_requirement": "55+ or AARP member",
        "conditions": "AARP membership or age 55+ required.",
        "website": "https://www.bestwestern.com/en_US/offers/hotel-discounts/senior-hotel-discounts.html",
        "how_to_access": "Book online or ask at the hotel. Present valid ID or AARP card.",
        "audience": "senior"
      },
      {
        "name": "Motel 6",
        "discount": "10% off (60+), 10% off for AMAC members using code CP545906",
        "age_requirement": "60+ or AMAC member",
        "conditions": "AMAC membership for specific discount code.",
        "website": "https://www.motel6.com/en/home.html",
        "how_to_access": "Book online or ask at the hotel. Present valid ID or AMAC card.",
        "audience": "senior"
      },
      {
        "name": "Hyatt Hotels",
        "discount": "Up to 50% off",
        "age_requirement": "62+",
        "conditions": "Discounts vary by location and availability.",
        "website": "https://www.hyatt.com/en-US/corporate/offers/senior-discount",
        "how_to_access": "Book online or ask at the hotel. Present valid ID.",
        "audience": "senior"
      },
      {
        "name": "Radisson Hotels (including Country Inn & Suites by Radisson, Park Inn by Radisson, Park Plaza, Radisson, Radisson Blu, Radisson Collection, Radisson Individuals, Radisson Inn & Suites, Radisson RED)",
        "discount": "10% off the best available rate",
        "age_requirement": "AARP member",
        "conditions": "AARP membership required.",
        "website": "https://www.radissonhotels.com/en-us/offers/aarp-discount",
        "how_to_access": "Book online using AARP discount or present AARP card at check-in.",
        "audience": "senior"
      },
      {
        "name": "Hampton Inn & Suites",
        "discount": "10% off",
        "age_requirement": "AARP member",
        "conditions": "AARP membership required.",
        "website": "https://www.hilton.com/en/hampton/",
        "how_to_access": "Book online using AARP discount or present AARP card at check-in.",
        "audience": "senior"
      },
      {
        "name": "Super 8 by Wyndham",
        "discount": "10% off (up to 20% with AARP card)",
        "age_requirement": "60+ or AARP member",
        "conditions": "AARP membership for higher discount.",
        "website": "https://www.wyndhamhotels.com/super8",
        "how_to_access": "Book online or ask at the hotel. Present valid ID or AARP card.",
        "audience": "senior"
      },
      {
        "name": "La Quinta by Wyndham",
        "discount": "10% or more off the standard rate",
        "age_requirement": "60+",
        "conditions": "Special savings on Standard Rate. Blackout dates and other restrictions may apply; cannot be combined with other offers. Based on availability. See Standard Rate for full details and requirements.",
        "website": "https://www.wyndhamhotels.com/laquinta",
        "how_to_access": "Perform a travel search on the website or call 1-800-225-3297 and request the senior rate. Present valid proof of identification at check-in.",
        "audience": "senior"
      },
      {
        "name": "Amtrak",
        "discount": "15% discount on lowest available rail fare (most trains); 10% discount on cross-border services with VIA Rail Canada",
        "age_requirement": "62+ (US trains); 60+ (cross-border services)",
        "conditions": "Valid for most Amtrak trains. On cross-border services operated jointly by Amtrak and VIA Rail Canada.",
        "website": "https://www.amtrak.com/",
        "how_to_access": "Select senior discount when booking online or ask at the station.",
        "audience": "senior"
      },
      {
        "name": "Greyhound",
        "discount": "5% discount",
        "age_requirement": "62+",
        "conditions": "None specified.",
        "website": "https://www.greyhound.com/",
        "how_to_access": "Ask for senior discount when purchasing tickets.",
        "audience": "senior"
      },
      {
        "name": "National Parks",
        "discount": "$80 Lifetime Pass",
        "age_requirement": "62+",
        "conditions": "Provides access to more than 2,000 recreation sites managed by five Federal agencies.",
        "website": "https://www.nps.gov/planyourvisit/passes.htm",
        "how_to_access": "Purchase online or at participating federal recreation sites.",
        "audience": "senior"
      }
    ],
    "disability": [
      {
        "name": "Marriott",
        "discount": "20% off standard rates",
        "eligibility": "Guests with disabilities who are Marriott Bonvoy members",
        "conditions": "Must be a Marriott Bonvoy member",
        "website": "https://www.marriott.com",
        "how_to_access": "Provide proof of disability at check-in",
        "audience": "disability"
      },
      {
        "name": "Hilton",
        "discount": "15% off standard rates",
        "eligibility": "Guests with disabilities who are HHonors members",
        "conditions": "Must be an HHonors member",
        "website": "https://www.hilton.com",
        "how_to_access": "Provide proof of disability when making reservation",
        "audience": "disability"
      },
      {
        "name": "IHG (Holiday Inn)",
        "discount": "10% off standard rates",
        "eligibility": "Guests with disabilities who are IHG Rewards Club members",
        "conditions": "Must be an IHG Rewards Club member",
        "website": "https://www.ihg.com",
        "how_to_access": "Provide proof of disability at check-in",
        "audience": "disability"
      },
      {
        "name": "Wyndham",
        "discount": "15% off standard rates",
        "eligibility": "Guests with disabilities who are Wyndham Rewards members",
        "conditions": "Must be a Wyndham Rewards member",
        "website": "https://www.wyndhamhotels.com",
        "how_to_access": "Provide proof of disability at check-in",
        "audience": "disability"
      },
      {
        "name": "Choice Hotels",
        "discount": "10% off standard rates",
        "eligibility": "Guests with disabilities",
        "conditions": "None explicitly stated",
        "website": "https://www.choicehotels.com",
        "how_to_access": "Mention disability when making reservation",
        "audience": "disability"
      },
      {
        "name": "clubGO",
        "discount": "Up to 60% off select hotels, resorts, and motels",
        "eligibility": "Individuals with disabilities",
        "conditions": "Membership requires a valid disability parking permit/plates or membership in an associated non-profit organization",
        "website": "https://clubgo.accessiblego.com",
        "how_to_access": "Membership through AccessibleGO",
        "audience": "disability"
      },
      {
        "name": "AmericanForcesTravel.com",
        "discount": "Reduced rates",
        "eligibility": "Veterans with disabilities and active military members",
        "conditions": "Must be a veteran with disabilities or active military member",
        "website": "https://www.americanforcestravel.com",
        "how_to_access": "Through the AmericanForcesTravel.com platform",
        "audience": "disability"
      },
      {
        "name": "U.S. Hotels (ADA Compliance)",
        "discount": "Accessible features and accommodations",
        "eligibility": "Guests with disabilities",
        "conditions": "None",
        "website": "https://www.ada.gov/",
        "how_to_access": "Request accessible rooms when booking",
        "audience": "disability"
      }
    ]
  },
  {
    "id": "airlines-and-transportation",
    "category": "Airlines and Transportation",
    "icon": "Plane",
    "image": undefined,
    "senior": [
      {
        "name": "United Airlines",
        "company": "United Airlines",
        "discount": "Varies, applied when selecting 'Senior 65+' during booking",
        "age_requirement": "65+",
        "conditions": "Available on some flights, not all.",
        "website": "https://www.united.com/en/us/fly/travel/accessibility-and-assistance/seniors.html",
        "how_to_access": "Select 'Senior 65+' as traveler when booking online.",
        "audience": "senior"
      },
      {
        "name": "Delta Air Lines",
        "company": "Delta Air Lines",
        "discount": "Varies, available in certain markets.",
        "age_requirement": "Not explicitly stated, implied to be 65+ based on general airline senior discount practices, but needs confirmation.",
        "conditions": "Contact Reservations to check availability.",
        "website": "https://www.delta.com/us/en/booking-information/fare-classes-and-tickets/fares-and-discounts",
        "how_to_access": "Contact Reservations.",
        "audience": "senior"
      },
      {
        "name": "Hertz",
        "company": "Hertz",
        "discount": "Up to 20% off base rates.",
        "age_requirement": "50+",
        "conditions": "None explicitly stated beyond age. AARP membership may offer additional benefits.",
        "website": "https://www.hertz.com/rentacar/rental-car-deals/hertz-50-plus",
        "how_to_access": "Discount automatically applied when booking through the 50+ program link or by using CDP# 2007815.",
        "audience": "senior"
      },
      {
        "name": "Avis",
        "company": "Avis",
        "discount": "Up to 30% off base rates.",
        "age_requirement": "Not explicitly stated, but AARP membership is a condition. AARP membership is generally 50+.",
        "conditions": "AARP membership required.",
        "website": "https://www.aarp.org/membership/benefits/carrental/avis/",
        "how_to_access": "Book through AARP website or use AARP discount code.",
        "audience": "senior"
      },
      {
        "name": "Enterprise",
        "company": "Enterprise",
        "discount": "Not a direct senior discount. Competitive rates offered.",
        "age_requirement": "Not applicable for a specific senior discount.",
        "conditions": "None for a specific senior discount. AARP Travel Center may offer deals.",
        "website": "https://www.enterprise.com/en/car-rental-faqs/us-general/car-rental-discounts-and-promotions.html",
        "how_to_access": "Check AARP Travel Center or compare rates directly.",
        "audience": "senior"
      },
      {
        "name": "Amtrak",
        "company": "Amtrak",
        "discount": "10% off most rail fares.",
        "age_requirement": "65+",
        "conditions": "Valid on most Amtrak trains. On cross-border services operated jointly with VIA Rail Canada, a 10% discount is available for travelers aged 60 and over.",
        "website": "https://www.amtrak.com/seniors-discount",
        "how_to_access": "Select senior fare when booking.",
        "audience": "senior"
      },
      {
        "name": "Greyhound",
        "company": "Greyhound",
        "discount": "5% discount on Greyhound bus tickets (from one source), 20% discount on unrestricted passenger fares (from another source).",
        "age_requirement": "62+ (for 20% discount), 62+ (for 5% discount)",
        "conditions": "Discount may vary and might not be available online. Some sources indicate no senior discount.",
        "website": "https://www.greyhound.com/deals-and-promos (general deals page)",
        "how_to_access": "Request at time of purchase, show ID. May need to call to confirm availability.",
        "audience": "senior"
      }
    ],
    "disability": [
      {
        "name": "American Airlines",
        "discount": "No explicit financial discount, offers special assistance and accommodations.",
        "eligibility": "Passengers with disabilities requiring special assistance.",
        "conditions": "Services include wheelchair assistance, hearing/vision/cognitive assistance, special seating, extra space, and medical device accommodation.",
        "website": "https://www.aa.com/i18n/travel-info/special-assistance/special-assistance.jsp",
        "how_to_access": "Request special assistance when booking online or by calling customer service. Inform staff at the airport.",
        "audience": "disability"
      },
      {
        "name": "United Airlines",
        "discount": "No explicit financial discount, offers accessible travel services and accommodations.",
        "eligibility": "Passengers with disabilities.",
        "conditions": "Services include wheelchair assistance, accessible seating, medical condition support, cognitive/invisible disability assistance, and service animal accommodation.",
        "website": "https://www.united.com/en/us/fly/travel/accessibility-and-assistance.html",
        "how_to_access": "Contact the Accessibility Desk or request services online/at the airport.",
        "audience": "disability"
      },
      {
        "name": "Delta Air Lines",
        "discount": "No explicit financial discount, offers accessible travel services and accommodations.",
        "eligibility": "Passengers with disabilities.",
        "conditions": "Services include wheelchair/scooter/assistive device accommodation, medical device/medication support, service animal accommodation, and assistance for sensory/cognitive disabilities.",
        "website": "https://www.delta.com/us/en/accessible-travel-services/overview",
        "how_to_access": "Request assistance via My Trips, contact the Delta Disability Line, or complete an Accessible Service Request form.",
        "audience": "disability"
      },
      {
        "name": "Southwest Airlines",
        "discount": "No explicit financial discount, offers disability-related accommodations and assistance.",
        "eligibility": "Customers with disabilities.",
        "conditions": "Services include wheelchair assistance, specific seating accommodation, preboarding, trained service dog accommodation, and medical equipment/medication support.",
        "website": "https://support.southwest.com/helpcenter/s/pathway/a1F5G00000cLOqhUAG/disabilityrelated-accommodations",
        "how_to_access": "Request assistance online or at the airport. For preboarding, inform gate agent.",
        "audience": "disability"
      },
      {
        "name": "Amtrak",
        "discount": "10% rail fare discount",
        "eligibility": "Adult passengers with a disability.",
        "conditions": "May not be combinable with other discount programs. For Downeaster, Pennsylvanian, and Keystone routes, proof of disability is required.",
        "website": "https://www.amtrak.com/passengers-with-disabilities-discounts",
        "how_to_access": "Select 'Passenger with Disability' when booking. Present proof of disability where required.",
        "audience": "disability"
      },
      {
        "name": "Amtrak (Downeaster trains)",
        "discount": "50% discount",
        "eligibility": "Passengers with a disability traveling on Downeaster trains (Boston, MA to Portland, ME).",
        "conditions": "Present documentation that shows proof of disability.",
        "website": "https://www.amtrak.com/passengers-with-disabilities-discounts",
        "how_to_access": "Select 'Passenger with Disability' when booking and present proof of disability.",
        "audience": "disability"
      },
      {
        "name": "Amtrak (Companion Fare)",
        "discount": "10% discount",
        "eligibility": "Persons traveling with a passenger with a disability as a companion.",
        "conditions": "Companion must be capable of providing necessary assistance to the passenger with a disability.",
        "website": "https://www.amtrak.com/passengers-with-disabilities-discounts",
        "how_to_access": "Select 'Passenger with Disability' and 'Companion' when booking.",
        "audience": "disability"
      },
      {
        "name": "Amtrak (California Everyday Discount Disabled Riders)",
        "discount": "15% savings",
        "eligibility": "Adult passengers with a disability on Pacific Surfliner, Capitol Corridor and Gold Runner travel.",
        "conditions": "Year-round availability. This is an additional 5% compared to the national 10% discount.",
        "website": "https://www.amtrak.com/california-everyday-discounts-disabled-riders",
        "how_to_access": "Select 'Passenger with Disability' when booking.",
        "audience": "disability"
      },
      {
        "name": "Greyhound",
        "discount": "50% discount on tickets for Personal Care Attendants (PCA)",
        "eligibility": "Personal Care Attendants accompanying individuals with physical or developmental disabilities.",
        "conditions": "PCA must be providing necessary assistance to the passenger with a disability.",
        "website": "https://www.greyhound.com/help-and-info/customers-with-disabilities",
        "how_to_access": "Contact Greyhound customer service or ADA hotline to arrange.",
        "audience": "disability"
      },
      {
        "name": "Greyhound",
        "discount": "Waiver of standard convenience fee for electronic ticket purchase",
        "eligibility": "Individuals with disabilities unable to book electronically due to their disability.",
        "conditions": "Inability to book electronically must be due to disability.",
        "website": "https://www.greyhound.com/help-and-info/customers-with-disabilities",
        "how_to_access": "Call 1-800-752-4841 or email ADA.support@greyhound.com.",
        "audience": "disability"
      },
      {
        "name": "Hertz Car Rental",
        "discount": "No explicit financial discount, offers services and adaptive equipment at no extra charge.",
        "eligibility": "Customers with disabilities.",
        "conditions": "Services include hand controls, spinner knobs, accessible parking, Easy Access Bus, and TDD service. Advance notice may be required for some equipment.",
        "website": "https://www.hertz.com/us/en/products-and-services/value-added-services/united-states/car-rental-services-for-people-with-disabilities",
        "how_to_access": "Request adaptive equipment at time of reservation. Contact Hertz for specific needs.",
        "audience": "disability"
      },
      {
        "name": "Avis Car Rental",
        "discount": "No explicit financial discount, offers services and adaptive equipment at no extra cost.",
        "eligibility": "Drivers and passengers with disabilities.",
        "conditions": "Services include transfer board, panoramic mirror, swivel seat, hand controls, spinner knob, and TTY/TDD services. Reserve services at least two days in advance.",
        "website": "https://www.avis.com/en/customer-service/disability-services",
        "how_to_access": "Reserve services by calling 800-962-1434 (TTY/TDD 1-800-331-2323).",
        "audience": "disability"
      },
      {
        "name": "Enterprise Rent-A-Car",
        "discount": "No explicit financial discount, offers adaptive driving devices and surrogate driver options at no additional charge.",
        "eligibility": "Customers with disabilities.",
        "conditions": "Adaptive driving devices (hand controls, left foot accelerators, etc.) require 8-72 hours notice. Surrogate drivers must be licensed and at least 25 years old.",
        "website": "https://www.enterprise.com/en/help/customers-with-disabilities.html",
        "how_to_access": "Call the National Reservation Center at (866) 225-4284 to make reservations or inquire about services.",
        "audience": "disability"
      }
    ]
  },
  {
    "id": "entertainment-and-recreation",
    "category": "Entertainment and Recreation",
    "icon": "Ticket",
    "image": undefined,
    "senior": [
      {
        "name": "AMC Theatres",
        "discount": "Discounted movie tickets",
        "age_requirement": "60+ years",
        "conditions": "At select locations",
        "website": "Not specified, check local AMC website",
        "how_to_access": "Every day",
        "audience": "senior"
      },
      {
        "name": "Ancestry",
        "discount": "Save 30% on a World Explorer or All Access membership for the first year",
        "age_requirement": "AARP member",
        "conditions": "For the first year",
        "website": "Not specified, check Ancestry.com",
        "how_to_access": "Every day, requires AARP membership",
        "audience": "senior"
      },
      {
        "name": "Cinemark Theatres",
        "discount": "Discounted movie ticket",
        "age_requirement": "62+ years for Senior's Day",
        "conditions": "For Senior's Day and the Early Bird special",
        "website": "Not specified, check local Cinemark website",
        "how_to_access": "Contact your local theater for their designated Senior's Day",
        "audience": "senior"
      },
      {
        "name": "Marcus Theatres and Movie Tavern",
        "discount": "Young at Heart special: $6.00 for any show that starts before 5:30 p.m.",
        "age_requirement": "60+ years",
        "conditions": "For any show that starts before 5:30 p.m.",
        "website": "Not specified, check Marcus Theatres website",
        "how_to_access": "Every Friday",
        "audience": "senior"
      },
      {
        "name": "National Parks America the Beautiful Senior Pass",
        "discount": "$80 lifetime park pass provides admittance to more than 2,000 recreation sites",
        "age_requirement": "62+ years",
        "conditions": "Must provide proof of age and residency or citizenship. A $10 fee applies to passes bought online or by mail",
        "website": "https://www.nps.gov/planyourvisit/senior-pass-changes.htm or https://store.usgs.gov/lifetime-senior-pass",
        "how_to_access": "Every day, purchase online or by mail",
        "audience": "senior"
      },
      {
        "name": "Regal Cinemas AARP Movie Tickets",
        "discount": "Save up to 20% on Regal ePremiere tickets purchased online",
        "age_requirement": "AARP member",
        "conditions": "Purchased online",
        "website": "Not specified, check AARP website or Regal Cinemas website",
        "how_to_access": "Every day, requires AARP membership",
        "audience": "senior"
      },
      {
        "name": "Regal Cinemas Senior Citizen Movie Tickets",
        "discount": "Discounted movie tickets",
        "age_requirement": "60+ years",
        "conditions": "At select locations",
        "website": "Not specified, check local Regal Cinemas website",
        "how_to_access": "Every day",
        "audience": "senior"
      },
      {
        "name": "Regal Cinemas Concession",
        "discount": "$3 off popcorn and soda combo",
        "age_requirement": "AARP members and Regal Crown Club members",
        "conditions": "Must present both cards at the time of purchase",
        "website": "Not specified, check Regal Cinemas website",
        "how_to_access": "Every day, requires AARP and Regal Crown Club memberships",
        "audience": "senior"
      },
      {
        "name": "SilverSneakers",
        "discount": "Free healthy living and fitness classes at over 17,000 fitness locations",
        "age_requirement": "65+ years",
        "conditions": "Must be a member of select Medicare or other health plans",
        "website": "Not specified, check SilverSneakers website",
        "how_to_access": "Every day, requires membership in qualifying health plan",
        "audience": "senior"
      },
      {
        "name": "Showcase Cinemas",
        "discount": "Discount admission; popcorn and soda for $4.50",
        "age_requirement": "60+ years",
        "conditions": "At select theaters",
        "website": "Not specified, check local Showcase Cinemas website",
        "how_to_access": "Every Wednesday",
        "audience": "senior"
      }
    ],
    "disability": [
      {
        "name": "AMC Theatres - Personal Care Assistant (PCA) Ticket Program",
        "discount": "Complimentary ticket for PCA",
        "eligibility": "AMC Stubs Members who require the assistance of a Personal Care Assistant (PCA) during their visit.",
        "conditions": "Must be an AMC Stubs Member.",
        "website": "https://www.amctheatres.com/assistive-moviegoing",
        "how_to_access": "Complete the Contact Us form and select 'Personal Care Assistant' as the reason for inquiry.",
        "audience": "disability"
      },
      {
        "name": "AMC Theatres - Assistive Devices",
        "discount": "Assistive Listening Devices and Closed Captioning Devices available.",
        "eligibility": "Moviegoers with hearing and vision impairments.",
        "conditions": "Not all titles support closed captions and/or audio descriptions.",
        "website": "https://www.amctheatres.com/assistive-moviegoing",
        "how_to_access": "Ask any AMC crew member for assistance. Look for showtimes with audio description or closed captioning labels.",
        "audience": "disability"
      },
      {
        "name": "AMC Theatres - Wheelchair Seating",
        "discount": "Wheelchair spaces with companion seating.",
        "eligibility": "Individuals requiring wheelchair accessible seating.",
        "conditions": "None specified.",
        "website": "https://www.amctheatres.com/assistive-moviegoing",
        "how_to_access": "Available in every auditorium.",
        "audience": "disability"
      },
      {
        "name": "AMC Theatres - Sensory Friendly Films",
        "discount": "Unique movie showings with lights turned up and sound turned down.",
        "eligibility": "Individuals with sensory sensitivities, often associated with autism.",
        "conditions": "Partnership with Autism Society.",
        "website": "https://www.amctheatres.com/programs/sensory-friendly-films",
        "how_to_access": "Check schedule for Sensory Friendly Film showtimes.",
        "audience": "disability"
      },
      {
        "name": "Regal Cinemas - ADA Seating & Companion Pass",
        "discount": "Seating designated as 'handicapped' for disabled individuals and their companions. Guests in an assistant/companion role may be passed in by management.",
        "eligibility": "Disabled individuals and their companions/assistants.",
        "conditions": "None specified.",
        "website": "https://www.regmovies.com/admittance-procedures",
        "how_to_access": "Ask theatre personnel for assistance.",
        "audience": "disability"
      },
      {
        "name": "Regal Cinemas - Assistive Technology",
        "discount": "Cutting-edge technology for individual cinema experience.",
        "eligibility": "Guests who are deaf, hard of hearing, blind, or have low vision.",
        "conditions": "None specified.",
        "website": "https://www.regmovies.com/sony-access-systems",
        "how_to_access": "Not explicitly stated, likely available upon request.",
        "audience": "disability"
      },
      {
        "name": "Regal Cinemas - My Way Matinee - Sensory Friendly Movies",
        "discount": "Movie experience with lights turned up and volume turned down.",
        "eligibility": "Everyone, particularly those with sensory sensitivities.",
        "conditions": "None specified.",
        "website": "https://www.regmovies.com/promotions/my-way-matinee",
        "how_to_access": "Check schedule for My Way Matinee showtimes.",
        "audience": "disability"
      },
      {
        "name": "National Parks - America the Beautiful - The National Parks and Federal Recreational Lands Access Pass",
        "discount": "Free, lifetime pass for entrance and standard amenity fees at national parks and federal recreational lands. May provide discounts on some expanded amenity fees.",
        "eligibility": "US citizens or residents of any age with a medically determined permanent disability that severely limits one or more major life activities.",
        "conditions": "Requires documentation of permanent disability (physician's statement, federal agency document like VA, SSDI, SSI, or state agency document) and valid photo ID.",
        "website": "https://www.nps.gov/subjects/accessibility/interagency-access-pass.htm",
        "how_to_access": "Obtain in person at federal recreation sites, order online (physical pass), or get a digital pass from Recreation.gov.",
        "audience": "disability"
      },
      {
        "name": "Museums for All",
        "discount": "Free or reduced admission ($5 or less) for up to four people per EBT card.",
        "eligibility": "Individuals and families receiving food assistance (SNAP benefits).",
        "conditions": "Must present EBT card and ID.",
        "website": "https://museums4all.org/for-visitors/",
        "how_to_access": "Present EBT card and ID at a participating museum.",
        "audience": "disability"
      },
      {
        "name": "The Metropolitan Museum of Art (The Met)",
        "discount": "Discounted ticket price of $22 for visitors with a disability. Free admission for one care partner.",
        "eligibility": "Visitor with a disability and their care partner.",
        "conditions": "Discounted ticket must be purchased in person.",
        "website": "https://www.metmuseum.org/policies/complimentary-admission",
        "how_to_access": "Purchase discounted ticket in person. Caregiver admission is free.",
        "audience": "disability"
      },
      {
        "name": "Museum of Modern Art (MoMA)",
        "discount": "Discounted admission of $22 ($20 online) for visitors with disabilities. Free admission for a care partner.",
        "eligibility": "Visitors with disabilities and their care partner.",
        "conditions": "None specified.",
        "website": "https://www.moma.org/visit/discounts",
        "how_to_access": "Purchase discounted ticket online or in person. Caregiver admission is free.",
        "audience": "disability"
      },
      {
        "name": "Whitney Museum of American Art",
        "discount": "Discounted rate for visitors with disabilities. Free admission for one care partner.",
        "eligibility": "Visitors with disabilities and their care partner.",
        "conditions": "None specified.",
        "website": "https://whitney.org/visit/access/visitors-with-disabilities",
        "how_to_access": "Book tickets online or in person.",
        "audience": "disability"
      },
      {
        "name": "The Museum of Flight",
        "discount": "Free admission to any caregiver accompanying a visitor with a disability.",
        "eligibility": "Caregiver accompanying a visitor with a disability.",
        "conditions": "None specified.",
        "website": "https://www.museumofflight.org/visit/accessibility",
        "how_to_access": "Likely at admissions.",
        "audience": "disability"
      },
      {
        "name": "Fine Arts Museums of San Francisco (de Young and Legion of Honor) - Access Membership",
        "discount": "Access membership ($99/year) includes free admission for one member, a caregiver, and other benefits.",
        "eligibility": "People with disabilities.",
        "conditions": "Annual membership fee.",
        "website": "https://www.famsf.org/visit/accessibility",
        "how_to_access": "Purchase Access membership.",
        "audience": "disability"
      },
      {
        "name": "The Studio Museum in Harlem",
        "discount": "Free admission for care partners of visitors with disabilities.",
        "eligibility": "Care partners for visitors with disabilities.",
        "conditions": "None specified.",
        "website": "https://www.studiomuseum.org/visit",
        "how_to_access": "Likely at admissions.",
        "audience": "disability"
      },
      {
        "name": "Smithsonian Museums - Manual Wheelchair Loans",
        "discount": "Free manual wheelchair loans.",
        "eligibility": "All visitors.",
        "conditions": "First-come, first-served basis.",
        "website": "https://www.si.edu/visit/accessibility",
        "how_to_access": "Request at museum entrances.",
        "audience": "disability"
      },
      {
        "name": "Smithsonian Museums - Morning at the Museum",
        "discount": "Free, sensory-friendly program.",
        "eligibility": "Families of children, teenagers, and young adults with disabilities, including intellectual disabilities.",
        "conditions": "Check website for schedule.",
        "website": "https://access.si.edu/program/morning-museum",
        "how_to_access": "Check website for schedule and registration details.",
        "audience": "disability"
      },
      {
        "name": "San Diego Zoo Wildlife Alliance",
        "discount": "Free admission for a personal attendant/caregiver.",
        "eligibility": "Guest with disabilities requiring a personal attendant.",
        "conditions": "Guest with disabilities must pay admission fees.",
        "website": "https://zoo.sandiegozoo.org/visit/guests-with-disabilities",
        "how_to_access": "Inform admissions staff.",
        "audience": "disability"
      },
      {
        "name": "Denver Zoo Conservation Alliance - SNAP/EBT Explorer Card",
        "discount": "Reduced admission.",
        "eligibility": "SNAP/EBT cardholders.",
        "conditions": "None specified.",
        "website": "https://denverzoo.org/accessibility/",
        "how_to_access": "Present SNAP/EBT Explorer card.",
        "audience": "disability"
      },
      {
        "name": "Woodland Park Zoo (Seattle)",
        "discount": "$2.00 off admission.",
        "eligibility": "Guests with a disability.",
        "conditions": "None specified.",
        "website": "https://zoo.org/access/",
        "how_to_access": "Request at admission.",
        "audience": "disability"
      },
      {
        "name": "Pittsburgh Zoo & Aquarium",
        "discount": "Complimentary ticket for a caregiver.",
        "eligibility": "Disabled individual accompanied by a caregiver.",
        "conditions": "With any paid daytime general admission for the disabled individual.",
        "website": "https://www.pittsburghzoo.org/plan-your-visit/accessibility/",
        "how_to_access": "Likely at the admissions gate.",
        "audience": "disability"
      },
      {
        "name": "Seattle Aquarium",
        "discount": "$2 off admission.",
        "eligibility": "Persons with disabilities.",
        "conditions": "Available only at the Aquarium's Pier 59 admission gate for the next available entry time.",
        "website": "https://www.seattleaquarium.org/visit/hours-discounts-groups/",
        "how_to_access": "Purchase at Pier 59 admission gate.",
        "audience": "disability"
      },
      {
        "name": "Great Lakes Aquarium",
        "discount": "Paid personal care attendants (PCA) at no additional cost.",
        "eligibility": "Guests with disabilities requiring a PCA.",
        "conditions": "None specified.",
        "website": "https://glaquarium.org/visit/amenities-accessibility/",
        "how_to_access": "Likely at the admissions gate.",
        "audience": "disability"
      },
      {
        "name": "New England Aquarium",
        "discount": "Free entry for visitors using their own wheelchairs and visitors with visual impairments. Free wheelchair rental.",
        "eligibility": "Visitors using their own wheelchairs or with visual impairments.",
        "conditions": "None specified.",
        "website": "https://www.neaq.org/visit/accessibility/",
        "how_to_access": "Likely at the admissions gate.",
        "audience": "disability"
      },
      {
        "name": "Sporting Events - Accessible Seating",
        "discount": "Accessible seating at comparable prices to non-accessible seats.",
        "eligibility": "Individuals requiring accessible seating due to a disability.",
        "conditions": "Limits on companion tickets may apply.",
        "website": "N/A (general policy)",
        "how_to_access": "Purchase tickets through official ticketing channels (using 'Accessible' filter) or contact venue's ticket office directly.",
        "audience": "disability"
      },
      {
        "name": "Challenged Athletes Foundation (CAF) Grants",
        "discount": "Grants for adaptive sports equipment, coaching, and competition expenses.",
        "eligibility": "Individuals with physical challenges.",
        "conditions": "Application required during open period.",
        "website": "https://www.challengedathletes.org/grants/",
        "how_to_access": "Apply online during the open application period.",
        "audience": "disability"
      },
      {
        "name": "VA National Veterans Sports Programs",
        "discount": "Monthly assistance allowance.",
        "eligibility": "Veterans with disabilities training in Paralympic sports.",
        "conditions": "None specified.",
        "website": "https://department.va.gov/veteran-sports/",
        "how_to_access": "Contact the VA National Veterans Sports Programs office.",
        "audience": "disability"
      },
      {
        "name": "Achilles International - Resources and Grants",
        "discount": "Resources and grant opportunities for travel and adaptive running equipment.",
        "eligibility": "Youth, adults, and veterans with disabilities.",
        "conditions": "None specified.",
        "website": "https://www.achillesinternational.org/resources",
        "how_to_access": "Refer to their website for partner organizations and grant information.",
        "audience": "disability"
      },
      {
        "name": "Operation: Care and Creativity (Tickets For Troops)",
        "discount": "Free access to sports and entertainment events.",
        "eligibility": "Military and veteran families.",
        "conditions": "Registration required.",
        "website": "https://occ-usa.org/tickets-for-troops-program/",
        "how_to_access": "Register through their program.",
        "audience": "disability"
      }
    ]
  },
  {
    "id": "healthcare-and-pharmacy",
    "category": "Healthcare and Pharmacy",
    "icon": "HeartPulse",
    "image": undefined,
    "senior": [
      {
        "name": "AARP Prescription Discount Card by OptumRx",
        "discount": "Up to 61% off prescription medications",
        "age_requirement": "AARP member (typically 50+)",
        "conditions": "Must be an AARP member for deeper discounts and additional benefits; free card available to non-members with lesser discounts.",
        "website": "https://www.aarp.org/membership/benefits/health/rx-discounts-optumrx/",
        "how_to_access": "Access free discount card online or call Optum Rx at 1-877-422-7718. Present card at participating pharmacies.",
        "audience": "senior"
      },
      {
        "name": "SilverSneakers",
        "discount": "No additional cost for gym access and fitness classes",
        "age_requirement": "65+",
        "conditions": "Available through select Medicare Advantage Plans.",
        "website": "https://tools.silversneakers.com/",
        "how_to_access": "Check eligibility online and activate online account. Use member ID at participating fitness locations or access online classes.",
        "audience": "senior"
      },
      {
        "name": "AARP Dental Insurance Plan administered by Delta Dental",
        "discount": "Varies based on plan",
        "age_requirement": "AARP member (typically 50+)",
        "conditions": "Must be an AARP member. Plans available for members and their families.",
        "website": "https://www.aarp.org/membership/benefits/health/",
        "how_to_access": "Enroll in a plan through AARP/Delta Dental.",
        "audience": "senior"
      },
      {
        "name": "AARP Hearing Solutions provided by UnitedHealthcare Hearing",
        "discount": "Up to 50% off hearing aids, free hearing exam",
        "age_requirement": "AARP member (typically 50+)",
        "conditions": "Must be an AARP member.",
        "website": "https://www.aarp.org/membership/benefits/health/",
        "how_to_access": "Access through AARP Hearing Solutions by UnitedHealthcare Hearing.",
        "audience": "senior"
      },
      {
        "name": "AARP Vision Plans from VSP",
        "discount": "$350 average annual member savings",
        "age_requirement": "AARP member (typically 50+)",
        "conditions": "Must be an AARP member.",
        "website": "https://www.aarp.org/membership/benefits/health/",
        "how_to_access": "Enroll in a plan through AARP/VSP.",
        "audience": "senior"
      },
      {
        "name": "LensCrafters (AARP Discount)",
        "discount": "20% off frames + 50% off prescription lenses with purchase of complete pair",
        "age_requirement": "AARP member (typically 50+)",
        "conditions": "Must be an AARP member. Complete pair (frame and lenses) purchase required.",
        "website": "https://www.aarp.org/membership/benefits/health/",
        "how_to_access": "Show AARP membership card at LensCrafters.",
        "audience": "senior"
      },
      {
        "name": "Target Optical (AARP Discount)",
        "discount": "50% off additional pairs of eyeglasses and $10 off eyewear and contacts",
        "age_requirement": "AARP member (typically 50+)",
        "conditions": "Must be an AARP member.",
        "website": "https://www.aarp.org/membership/benefits/health/",
        "how_to_access": "Show AARP membership card at Target Optical.",
        "audience": "senior"
      },
      {
        "name": "Visionworks (AARP Discount)",
        "discount": "$200 off a complete pair with single vision lenses or $250 off with multifocal lenses",
        "age_requirement": "AARP member (typically 50+)",
        "conditions": "Must be an AARP member.",
        "website": "https://www.aarp.org/membership/benefits/health/",
        "how_to_access": "Show AARP membership card at Visionworks.",
        "audience": "senior"
      },
      {
        "name": "The National Hearing Test (AARP Discount)",
        "discount": "Free hearing test once a year",
        "age_requirement": "AARP member (typically 50+)",
        "conditions": "Must be an AARP member.",
        "website": "https://www.aarp.org/membership/benefits/health/",
        "how_to_access": "Access online through AARP.",
        "audience": "senior"
      },
      {
        "name": "Orahh Care Dental Community Selected by AARP",
        "discount": "Comprehensive dental care from a network of supported dentists",
        "age_requirement": "AARP member (typically 50+)",
        "conditions": "Must be an AARP member.",
        "website": "https://www.aarp.org/membership/benefits/health/",
        "how_to_access": "Access through AARP.",
        "audience": "senior"
      }
    ],
    "disability": [
      {
        "name": "Citizens Disability - RX Discount Card",
        "discount": "Substantial discounts on tens of thousands of prescription medications.",
        "eligibility": "Implied for Citizens Disability clients and their families.",
        "conditions": "No fees, no expiration.",
        "website": "https://www.citizensdisability.com/rx/",
        "how_to_access": "Print your free card and simply show and save at participating pharmacies.",
        "audience": "disability"
      },
      {
        "name": "GoodRx",
        "discount": "Up to 83% on most prescription drugs at over 70,000 U.S. pharmacies.",
        "eligibility": "None.",
        "conditions": "No fees or obligations. No credit card required. The card does not expire.",
        "website": "https://www.goodrx.com/discount-card",
        "how_to_access": "Present the physical card or a digital coupon to the pharmacist.",
        "audience": "disability"
      },
      {
        "name": "Medicare",
        "discount": "Health insurance program for people 65 or older, and some disabled people under 65. Part A is hospital insurance (usually no premium). Part B is medical insurance (monthly premium).",
        "eligibility": "Everyone eligible for Social Security Disability Insurance (SSDI) benefits is also eligible for Medicare after a 24-month qualifying period.",
        "conditions": "24-month waiting period for Medicare coverage for SSDI recipients.",
        "website": "https://www.ssa.gov/disabilityresearch/wi/medicare.htm",
        "how_to_access": "Automatic enrollment after 24 months of SSDI benefits.",
        "audience": "disability"
      },
      {
        "name": "Medicaid",
        "discount": "Jointly funded, Federal-State health insurance program for low-income and needy people.",
        "eligibility": "People eligible for Supplemental Security Income (SSI) benefits. In 35 states and DC, the SSI application is also the Medicaid application. Other states have their own eligibility rules and require a separate application.",
        "conditions": "Varies by state.",
        "website": "https://www.ssa.gov/disabilityresearch/wi/medicaid.htm",
        "how_to_access": "Apply for SSI or through the state Medicaid agency.",
        "audience": "disability"
      },
      {
        "name": "Voluntary Benefits Plan - Vision Discount Program",
        "discount": "20-40% on eyewear, 20% off eye exams, and $50 eye exams with the purchase of a complete pair of prescription glasses. Discounts also available on sunglasses, contact lenses, and LASIK surgery.",
        "eligibility": "Valued member of APWU (American Postal Workers Union). The entire household can receive discounts.",
        "conditions": "Not available in WA. Cannot be combined with insurance. This plan is not insurance.",
        "website": "https://voluntarybenefitsplan.com/vision-discount/",
        "how_to_access": "Register online or by phone.",
        "audience": "disability"
      },
      {
        "name": "Dental Lifeline Network",
        "discount": "Provides comprehensive dental care through a network of volunteer dentists and labs. Care is donated, so it is free for eligible individuals.",
        "eligibility": "Adults with a permanent disability, or over 65 years old, or have a chronic or serious illness, and have no other way to pay for dental care.",
        "conditions": "Applicants must meet one of the criteria above and have no other means to afford or receive dental treatment.",
        "website": "https://dentallifeline.org/",
        "how_to_access": "Apply for help through their website.",
        "audience": "disability"
      },
      {
        "name": "VSP Eyes of Hope",
        "discount": "No-cost eye care and eyeglasses.",
        "eligibility": "People with limited income who don\u2019t have health insurance.",
        "conditions": "Requires help from a school nurse or a community partner organization to apply.",
        "website": "https://www.vspvision.com/eyes-of-hope/get-help.html",
        "how_to_access": "Apply with assistance from a school nurse or community partner.",
        "audience": "disability"
      },
      {
        "name": "Lions Clubs International",
        "discount": "Help paying for eye care; some clubs may also provide eyeglasses.",
        "eligibility": "Varies by local club.",
        "conditions": "Contact local clubs for specific requirements.",
        "website": "https://www.lionsclubs.org/en/start-our-impact/club-locator",
        "how_to_access": "Contact local Lions Clubs.",
        "audience": "disability"
      },
      {
        "name": "New Eyes",
        "discount": "Provides prescription eyeglasses.",
        "eligibility": "Children and adults who can\u2019t afford them.",
        "conditions": "A social worker or someone at a community health center may be able to help you apply.",
        "website": "https://new-eyes.org/",
        "how_to_access": "Apply with assistance from a social worker or community health center.",
        "audience": "disability"
      },
      {
        "name": "Mission Cataract USA",
        "discount": "Free cataract surgery.",
        "eligibility": "People of all ages who can\u2019t afford it.",
        "conditions": "Varies.",
        "website": "https://missioncataractusa.org/",
        "how_to_access": "Find a participating eye doctor.",
        "audience": "disability"
      },
      {
        "name": "Operation Sight",
        "discount": "Cataract surgery.",
        "eligibility": "People with low incomes.",
        "conditions": "Varies.",
        "website": "https://ascrsfoundation.org/operationsight",
        "how_to_access": "Check qualification requirements on their website.",
        "audience": "disability"
      },
      {
        "name": "AGS Cares (American Glaucoma Society)",
        "discount": "Glaucoma surgery.",
        "eligibility": "People with low incomes or no insurance.",
        "conditions": "Varies.",
        "website": "https://www.americanglaucomasociety.net/patients/ags-cares",
        "how_to_access": "Check qualification requirements on their website.",
        "audience": "disability"
      },
      {
        "name": "National Federation of the Blind",
        "discount": "Free white canes.",
        "eligibility": "Individuals who are blind.",
        "conditions": "For personal use.",
        "website": "https://nfb.org/programs-services/free-white-cane-program",
        "how_to_access": "Request through their program.",
        "audience": "disability"
      },
      {
        "name": "EyeCare America",
        "discount": "Free comprehensive eye exams and up to 1 year of care.",
        "eligibility": "People age 18 and older.",
        "conditions": "Varies.",
        "website": "https://www.aao.org/eyecare-america",
        "how_to_access": "Check qualification requirements on their website.",
        "audience": "disability"
      },
      {
        "name": "InfantSEE",
        "discount": "Free eye assessments.",
        "eligibility": "Babies ages 6 to 12 months.",
        "conditions": "Assessments done by an eye doctor.",
        "website": "https://infantsee.org/",
        "how_to_access": "Find a participating eye doctor.",
        "audience": "disability"
      },
      {
        "name": "Hearing Loss Association of America (HLAA)",
        "discount": "Provides information and resources for financial assistance for hearing loss treatment.",
        "eligibility": "Varies by program (e.g., low-income, service-related hearing loss for veterans, children for CHIP).",
        "conditions": "Varies by program and state.",
        "website": "https://www.hearingloss.org/find-help/financial-assistance/",
        "how_to_access": "Check health insurance coverage, contact state Medicaid offices, apply for CHIP, inquire with the U.S. Dept. of Veterans Affairs, or contact state vocational rehabilitation agencies.",
        "audience": "disability"
      }
    ]
  },
  {
    "id": "grocery-and-food",
    "category": "Grocery and Food",
    "icon": "ShoppingCart",
    "image": undefined,
    "senior": [
      {
        "name": "DeCicco Family Markets",
        "discount": "Varies by location (often 5%)",
        "age_requirement": "62+",
        "conditions": "Wednesdays only; Must have activated Preferred Shopper Card for SENIOR STATUS",
        "website": "",
        "how_to_access": "Activate Preferred Shopper Card for SENIOR STATUS",
        "audience": "senior"
      },
      {
        "name": "Fred Meyer",
        "discount": "10%",
        "age_requirement": "55+",
        "conditions": "On the first Tuesday of each month",
        "website": "",
        "how_to_access": "N/A",
        "audience": "senior"
      },
      {
        "name": "Fry\u2019s Food Stores",
        "discount": "10%",
        "age_requirement": "55+",
        "conditions": "On the first Wednesday of each month",
        "website": "",
        "how_to_access": "N/A",
        "audience": "senior"
      },
      {
        "name": "Gristedes Supermarket",
        "discount": "10% off",
        "age_requirement": "65+",
        "conditions": "Every Tuesday",
        "website": "",
        "how_to_access": "N/A",
        "audience": "senior"
      },
      {
        "name": "Harris Teeter",
        "discount": "5% off",
        "age_requirement": "60+",
        "conditions": "Every Thursday (excluding fuel, pharmacy, tickets, and gift cards)",
        "website": "",
        "how_to_access": "N/A",
        "audience": "senior"
      },
      {
        "name": "Hy-Vee",
        "discount": "5% off",
        "age_requirement": "55+",
        "conditions": "Thursdays only",
        "website": "",
        "how_to_access": "N/A",
        "audience": "senior"
      },
      {
        "name": "New Seasons",
        "discount": "10% off",
        "age_requirement": "65+",
        "conditions": "Every Wednesday",
        "website": "",
        "how_to_access": "N/A",
        "audience": "senior"
      },
      {
        "name": "Piggly-Wiggly",
        "discount": "5% off",
        "age_requirement": "60+",
        "conditions": "Excludes alcohol and tobacco products",
        "website": "",
        "how_to_access": "N/A",
        "audience": "senior"
      },
      {
        "name": "Uncle Giuseppe\u2019s Marketplace",
        "discount": "5% off",
        "age_requirement": "65+",
        "conditions": "On Wednesdays",
        "website": "",
        "how_to_access": "N/A",
        "audience": "senior"
      }
    ],
    "disability": [
      {
        "name": "Kroger",
        "discount": "50% off Boost Membership, 20% off Fresh Fruits & Vegetables",
        "eligibility": "Enrolled in SNAP, WIC, Medicaid, LIHEAP, NSLP, SSI, TANF, TTANF, Federal Public Housing Assistance, Veterans and Survivors Pension Benefit, Bureau of Indian Affairs General Assistance, Tribal Head Start, Food Distribution Program on Indian Reservations.",
        "conditions": "Must be a verified Government Assistance recipient. Boost membership offer cannot be combined with Free 30-Day Trial or other Boost enrollment offers. Produce discount applies to qualifying produce items only at participating locations, limit 1 redemption per day, per household through 1/31/26, must use loyalty card.",
        "website": "https://www.kroger.com/pr/verified-savings/government-assistance",
        "how_to_access": "Verify eligibility through SheerID. Accepted documents include benefits card (EBT card), benefit award letter, approval letter, statement of benefits, or benefit verification letter.",
        "audience": "disability"
      },
      {
        "name": "Safeway (FreshPass)",
        "discount": "FreshPass subscription at $5.99/month or $49/year (half the regular price). Includes unlimited free delivery on orders over $30, $5 monthly credit for annual subscribers, 2X Points on exclusive brands, 5% off O Organics\u00ae and Open Nature\u00ae products, 5% off Signature Pet Care\u2122 products, monthly Starbucks\u00ae perk, VIP customer service phone line, and points don\u2019t expire.",
        "eligibility": "Recipients of government assistance programs, including SNAP.",
        "conditions": "Must verify eligibility. Restrictions apply, refer to FreshPass Terms & Conditions.",
        "website": "https://www.safeway.com/freshpass/manage/govassist",
        "how_to_access": "Verify eligibility through the website.",
        "audience": "disability"
      },
      {
        "name": "Supplemental Nutrition Assistance Program (SNAP)",
        "discount": "Provides nutrition benefits to supplement the food budget of eligible needy families. Benefit amount varies based on household size and income.",
        "eligibility": "Low-income individuals and families. Special rules apply for households with elderly or disabled members, potentially allowing for higher allotments or different income tests. SSI and SSDI recipients can qualify.",
        "conditions": "Eligibility based on income and household size. Disabled persons or families with a disabled member have different eligibility rules. Must apply through state or local SNAP office.",
        "website": "https://www.fns.usda.gov/snap/eligibility/elderly-disabled-special-rules",
        "how_to_access": "Apply through your state or local SNAP office. Application can be online, in person, or by mail. Some states may offer expedited benefits for those with little or no income.",
        "audience": "disability"
      },
      {
        "name": "Publix",
        "discount": "Accepts SNAP EBT for eligible grocery purchases.",
        "eligibility": "SNAP EBT cardholders.",
        "conditions": "Purchases must be SNAP-eligible items. Online ordering and payment with EBT may be available in some states.",
        "website": "https://www.publix.com/",
        "how_to_access": "Use SNAP EBT card at checkout. For online orders, select EBT as payment method if available.",
        "audience": "disability"
      },
      {
        "name": "Albertsons",
        "discount": "Accepts SNAP EBT for eligible grocery purchases.",
        "eligibility": "SNAP EBT cardholders.",
        "conditions": "Purchases must be SNAP-eligible items. Online ordering and payment with EBT may be available in some states.",
        "website": "https://www.albertsons.com/",
        "how_to_access": "Use SNAP EBT card at checkout. For online orders, select EBT as payment method.",
        "audience": "disability"
      }
    ]
  },
  {
    "id": "utilities-and-home-services",
    "category": "Utilities and Home Services",
    "icon": "Home",
    "image": undefined,
    "senior": [
      {
        "name": "FCC Lifeline Program",
        "discount": "Up to $9.25 monthly discount (standard), up to $34.25 monthly discount (Tribal lands)",
        "age_requirement": "No specific age, but income-based eligibility (at or below 135% of Federal Poverty Guidelines) or participation in specific federal assistance programs (SNAP, Medicaid, Federal Public Housing Assistance, SSI, Veterans Pension Benefits, Certain Tribal Assistance Programs). Many seniors qualify based on these criteria.",
        "conditions": "Low-income household or participation in qualifying programs. Only one Lifeline benefit per household. Annual recertification.",
        "website": "https://www.fcc.gov/lifeline-consumers, https://www.lifelinesupport.org",
        "how_to_access": "Apply online via National Verifier (lifelinesupport.org), by mail, or through a participating provider.",
        "audience": "senior"
      },
      {
        "name": "Xfinity Internet Essentials",
        "discount": "$9.95 per month",
        "age_requirement": "Not senior-specific, but often qualifies older adults based on low-income criteria. Qualify if receiving Supplemental Security Income (SSI), Medicaid, housing assistance, or SNAP benefits.",
        "conditions": "Must live in an area where Xfinity Internet service is available, not an existing Xfinity Internet customer within the past 90 days (some exceptions apply), qualify for national assistance programs. No activation or equipment rental fees, credit checks, or long-term contracts.",
        "website": "https://www.xfinity.com/learn/internet-service/internet-essentials",
        "how_to_access": "Apply online at internetessentials.com or by calling 1-855-8-INTERNET (1-855-846-8376).",
        "audience": "senior"
      },
      {
        "name": "AT&T Access Program",
        "discount": "$10 or less per month",
        "age_requirement": "Not senior-specific, but many seniors qualify based on low-income criteria. Qualify if receiving Supplemental Security Income (SSI) or SNAP benefits.",
        "conditions": "Low-income household. Free installations, no annual contracts, no deposit. Not eligible if on fixed income through Social Security Benefits alone.",
        "website": "https://www.att.com/internet/access/",
        "how_to_access": "Fill out an online application at att.com/access.",
        "audience": "senior"
      },
      {
        "name": "Spectrum Internet Assist",
        "discount": "$14.99 per month",
        "age_requirement": "65 and older, or qualify based on low-income criteria.",
        "conditions": "Adults 65 and older who are on Supplemental Security Income (SSI) are eligible. High-speed internet at 30 Mbps, no data caps, no contracts. Includes free modem and security suite.",
        "website": "https://www.spectrum.com/resources/internet-wifi/about-spectrum-internet-assist",
        "how_to_access": "Check eligibility online, complete application and provide documentation. Visit SpectruminternetAssist.com.",
        "audience": "senior"
      },
      {
        "name": "CenturyLink Internet Basics",
        "discount": "$9.25 of federal monthly support",
        "age_requirement": "Not senior-specific, but low-income eligibility applies.",
        "conditions": "Low-income household. This is likely tied to the Lifeline program.",
        "website": "https://www.centurylink.com/aboutus/community/community-development/lifeline.html",
        "how_to_access": "Contact CenturyLink or apply through the Lifeline program.",
        "audience": "senior"
      },
      {
        "name": "Suddenlink Altice Advantage Program",
        "discount": "$14.99 per month",
        "age_requirement": "Not senior-specific, but low-income eligibility applies.",
        "conditions": "Low-income household.",
        "website": "Not explicitly stated on The Senior List, but likely AlticeUSA.com or Suddenlink.com",
        "how_to_access": "Apply through Suddenlink/Altice.",
        "audience": "senior"
      },
      {
        "name": "Google Fiber",
        "discount": "$15.00 per month",
        "age_requirement": "Not senior-specific, but low-income eligibility applies.",
        "conditions": "Low-income household. Availability limited to Google Fiber service areas.",
        "website": "fiber.google.com",
        "how_to_access": "Apply through Google Fiber.",
        "audience": "senior"
      },
      {
        "name": "Verizon Lifeline",
        "discount": "$19.99 per month (this appears to be a specific plan price after Lifeline discount, not the discount itself)",
        "age_requirement": "Not senior-specific, but low-income eligibility applies (tied to the federal Lifeline program).",
        "conditions": "Low-income household, eligible for the federal Lifeline program.",
        "website": "https://www.verizon.com/support/residential/account/manage-account/lifeline-discount",
        "how_to_access": "Apply through Verizon, demonstrating eligibility for the Lifeline program.",
        "audience": "senior"
      },
      {
        "name": "Altice Advantage Internet",
        "discount": "$14.99 per month",
        "age_requirement": "Not senior-specific, but low-income eligibility applies.",
        "conditions": "Low-income household.",
        "website": "Not explicitly stated on The Senior List, but likely AlticeUSA.com",
        "how_to_access": "Apply through Altice.",
        "audience": "senior"
      },
      {
        "name": "Internet First (Comcast)",
        "discount": "$9.95 per month (no cost for first 60 days)",
        "age_requirement": "Not senior-specific, but low-income eligibility applies.",
        "conditions": "Low-income household. This appears to be another Comcast program similar to Internet Essentials.",
        "website": "Not explicitly stated on The Senior List, but likely Comcast.com",
        "how_to_access": "Apply through Comcast.",
        "audience": "senior"
      },
      {
        "name": "Frontier Fundamental Internet",
        "discount": "$19.99 per month",
        "age_requirement": "Not senior-specific, but low-income eligibility applies.",
        "conditions": "Low-income household.",
        "website": "frontier.com",
        "how_to_access": "Apply through Frontier.",
        "audience": "senior"
      }
    ],
    "disability": [
      {
        "name": "Lifeline Program",
        "discount": "Up to $9.25 off monthly phone, internet, or bundled services. Up to $34.25/month and up to $100 reduction for first-time connection charges for those on Tribal lands.",
        "eligibility": "Income at or below 135% of Federal Poverty Guidelines OR participation in SNAP, Medicaid, SSI, Federal Public Housing Assistance (FPHA), Veterans Pension and Survivors Benefit. Tribal-specific eligibility includes Bureau of Indian Affairs General Assistance, Head Start (income-qualifying), Tribal TANF, Food Distribution Program on Indian Reservations. Survivors under Safe Connections Act may qualify with proof of line separation request and financial hardship, or income at or below 200% of Federal Poverty Guidelines, or enrollment in WIC, Free and Reduced-Price School Lunch/Breakfast, or received a Federal Pell Grant.",
        "conditions": "Annual recertification required.",
        "website": "https://www.lifelinesupport.org/",
        "how_to_access": "Apply online, by mail, or with the assistance of your phone or internet company. Proof of income or program participation is required.",
        "audience": "disability"
      },
      {
        "name": "Low Income Home Energy Assistance Program (LIHEAP)",
        "discount": "Assistance with home energy bills, energy crises, weatherization, and minor energy-related home repairs. Helps prevent energy shutoffs, reconnect services, make homes more energy efficient, and repair/replace heating equipment.",
        "eligibility": "Low-income families. Specific income requirements and other eligibility criteria are determined at the state and local level. Does not provide direct grants to individuals.",
        "conditions": "Eligibility determined by state and local agencies. Does not provide direct grants to individuals.",
        "website": "https://acf.gov/ocs/programs/liheap",
        "how_to_access": "Contact your state or local LIHEAP agency. Visit Energyhelp.us or call the National Energy Assistance Referral (NEAR) number at 1-866-674-6327 for information on how to apply.",
        "audience": "disability"
      },
      {
        "name": "New York State Property Tax Exemption for Persons with Disabilities",
        "discount": "A reduction of up to 50% in the assessed value of the residence.",
        "eligibility": "Must own the property, have a documented disability (proof from Social Security, Railroad Retirement Board, VA, etc.), and meet income and residency requirements. Income limits are set by local governments and school districts, ranging from $3,000 to $50,000.",
        "conditions": "Property must be the legal residence of the disabled person and used exclusively for residential purposes. If the property receives the senior citizens exemption, it cannot also receive this exemption.",
        "website": "https://www.tax.ny.gov/pit/property/exemption/disablexempt.htm",
        "how_to_access": "File Form RP-459-c with your local assessor. Renewal is required annually.",
        "audience": "disability"
      },
      {
        "name": "Specially Adapted Housing (SAH) Grant",
        "discount": "Up to $126,526 for FY 2026 to help buy, build, or change a home.",
        "eligibility": "Veterans and service members with specific service-connected disabilities.",
        "conditions": "For modifying a home you will buy, build, or change.",
        "website": "https://www.va.gov/housing-assistance/disability-housing-grants/",
        "how_to_access": "Apply via the VA website or by mail.",
        "audience": "disability"
      },
      {
        "name": "Special Home Adaptation (SHA) Grant",
        "discount": "Up to $25,350 for FY 2026 to help modify a home.",
        "eligibility": "Veterans and service members with specific service-connected disabilities.",
        "conditions": "For modifying a home that you or a family member will buy, build, or change.",
        "website": "https://www.va.gov/housing-assistance/disability-housing-grants/",
        "how_to_access": "Apply via the VA website or by mail.",
        "audience": "disability"
      },
      {
        "name": "Home Improvements and Structural Alterations (HISA) Grant",
        "discount": "Up to $6,800 for service-related disabilities and up to $2,000 for non-service-related disabilities.",
        "eligibility": "Veterans with service-connected or non-service-related disabilities.",
        "conditions": "For medically necessary home improvements.",
        "website": "https://www.va.gov/housing-assistance/disability-housing-grants/",
        "how_to_access": "Apply via the VA website or by mail.",
        "audience": "disability"
      },
      {
        "name": "USDA Rural Housing Repair Loans and Grants (Section 504 Home Repair program)",
        "discount": "Grants up to $10,000 for homeowners age 62 and older. Loans up to $40,000 at 1% interest, repaid over 20 years. Grants and loans can be combined.",
        "eligibility": "Rural homeowners with household income under the \"very low income\" limit for their county. Grants are for homeowners age 62 and older. Loans have no age requirement.",
        "conditions": "Must be a rural homeowner. Income-based eligibility.",
        "website": "https://www.rd.usda.gov/programs-services/single-family-housing-programs/single-family-housing-repair-loans-grants",
        "how_to_access": "Apply through the USDA Rural Development office.",
        "audience": "disability"
      },
      {
        "name": "State and Local Property Tax Exemptions for Persons with Disabilities",
        "discount": "Varies by state and locality, often a partial reduction in assessed property value or a deferral. Some states offer full exemptions for certain severe disabilities or income levels.",
        "eligibility": "Generally requires documented proof of disability (e.g., SSDI, SSI, VA disability), ownership of the property as a primary residence, and meeting specific income thresholds set by the state or local government. Some programs are combined with senior citizen exemptions.",
        "conditions": "Eligibility criteria, discount amounts, and application processes vary significantly by state, county, and municipality. Annual application or recertification may be required.",
        "website": "Varies by state and local tax assessor's office. Examples include: https://www.tax.ny.gov/pit/property/exemption/disablexempt.htm (New York), https://dor.wa.gov/sites/default/files/2022-02/PTExemption_Senior.pdf (Washington State)",
        "how_to_access": "Contact your local or state tax assessor's office for specific eligibility requirements and application forms. Documentation of disability and income will be required.",
        "audience": "disability"
      }
    ]
  },
  {
    "id": "financial-services-and-insurance",
    "category": "Financial Services and Insurance",
    "icon": "DollarSign",
    "image": undefined,
    "senior": [
      {
        "name": "AARP\u00ae Digital Banking from Barclays",
        "discount": "Barclays Savings and CDs to help grow your money",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/finance/banking-investments/](https://www.aarp.org/membership/benefits/finance/banking-investments/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "AARP\u00ae Essential Rewards Mastercard\u00ae from Barclays",
        "discount": "3% cash back on gas station and eligible drug store purchases",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership, use of the Mastercard",
        "website": "[https://www.aarp.org/membership/benefits/finance/banking-investments/](https://www.aarp.org/membership/benefits/finance/banking-investments/)",
        "how_to_access": "AARP membership, apply for the Mastercard",
        "audience": "senior"
      },
      {
        "name": "AARP\u00ae Health Savings Account offered by Optum Financial\u00ae",
        "discount": "Discounted fees and tax advantages",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/finance/banking-investments/](https://www.aarp.org/membership/benefits/finance/banking-investments/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "AARP\u00ae Travel Rewards Mastercard\u00ae from Barclays",
        "discount": "3% cash back on airfare, hotel stays and car rentals",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership, use of the Mastercard",
        "website": "[https://www.aarp.org/membership/benefits/finance/banking-investments/](https://www.aarp.org/membership/benefits/finance/banking-investments/)",
        "how_to_access": "AARP membership, apply for the Mastercard",
        "audience": "senior"
      },
      {
        "name": "Select CDs from Barclays",
        "discount": "CD options tailored to your needs",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/finance/banking-investments/](https://www.aarp.org/membership/benefits/finance/banking-investments/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "Select Savings from Barclays",
        "discount": "$200 Bonus when you deposit $25,000",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership, deposit $25,000",
        "website": "[https://www.aarp.org/membership/benefits/finance/banking-investments/](https://www.aarp.org/membership/benefits/finance/banking-investments/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "Yahoo Finance Premium Plans",
        "discount": "30% off premium financial tools and research",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/finance/banking-investments/](https://www.aarp.org/membership/benefits/finance/banking-investments/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "Trust & Will Estate Planning",
        "discount": "20% off trusts, wills and estate plans created online",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/finance/planning/](https://www.aarp.org/membership/benefits/finance/planning/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "LifeLock by Norton",
        "discount": "Identity theft protection plans starting at $6.99 a month",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/fraud-prevention/](https://www.aarp.org/membership/benefits/fraud-prevention/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "AARP\u00ae Dental Insurance Plan administered by Delta Dental Insurance Company",
        "discount": "Dental insurance plans for members and their families",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/insurance/](https://www.aarp.org/membership/benefits/insurance/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "AARP Long-Term Care Options from New York Life",
        "discount": "Custom long-term care options",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/insurance/](https://www.aarp.org/membership/benefits/insurance/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "AARP\u00ae Vision Plans from VSP\u00ae",
        "discount": "$350 average annual member savings",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/insurance/](https://www.aarp.org/membership/benefits/insurance/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "AARP Term Life Insurance from New York Life",
        "discount": "Coverage up to $150,000 that ends at age 80",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/insurance/life/](https://www.aarp.org/membership/benefits/insurance/life/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "AARP Permanent Life Insurance from New York Life",
        "discount": "Up to $100,000 in coverage with no premium increases",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/insurance/life/](https://www.aarp.org/membership/benefits/insurance/life/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "AARP Guaranteed Acceptance Life Insurance from New York Life",
        "discount": "Up to $30,000 in coverage with no premium increases",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/insurance/life/](https://www.aarp.org/membership/benefits/insurance/life/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "Fetch Pet Insurance",
        "discount": "10% off monthly premiums for the lifetime of your pet\u2019s policy",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/insurance/pet/](https://www.aarp.org/membership/benefits/insurance/pet/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "AARP Auto Insurance from The Hartford",
        "discount": "$597 average member savings",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/insurance/vehicle-property/](https://www.aarp.org/membership/benefits/insurance/vehicle-property/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "AARP Homeowners Insurance from The Hartford",
        "discount": "Up to 20% off when you bundle your home and auto policies",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership, bundle home and auto policies",
        "website": "[https://www.aarp.org/membership/benefits/insurance/vehicle-property/](https://www.aarp.org/membership/benefits/insurance/vehicle-property/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "AARP\u00ae Manufactured Home Insurance Program from Foremost\u00ae",
        "discount": "Insurance for nearly every type of mobile and manufactured home",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/insurance/vehicle-property/](https://www.aarp.org/membership/benefits/insurance/vehicle-property/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "AARP\u00ae Motorcycle Insurance Program from Foremost\u00ae",
        "discount": "Discounts on coverage, roadside assistance and more",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/insurance/vehicle-property/](https://www.aarp.org/membership/benefits/insurance/vehicle-property/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "ATV, Golf Cart & Snowmobile Insurance from The Hartford",
        "discount": "Customized coverage for recreation vehicles",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/insurance/vehicle-property/](https://www.aarp.org/membership/benefits/insurance/vehicle-property/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "Boat & Personal Watercraft Insurance from The Hartford",
        "discount": "Customized coverage for your boat or watercraft",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/insurance/vehicle-property/](https://www.aarp.org/membership/benefits/insurance/vehicle-property/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "Collectible Vehicle Insurance from The Hartford",
        "discount": "Coverage designed specifically for classic and collectible cars",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/insurance/vehicle-property/](https://www.aarp.org/membership/benefits/insurance/vehicle-property/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "Recreational Vehicle Insurance from The Hartford",
        "discount": "Specialized protection for your RV, motorhome or trailer",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/insurance/vehicle-property/](https://www.aarp.org/membership/benefits/insurance/vehicle-property/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      },
      {
        "name": "Renters Insurance from The Hartford",
        "discount": "Coverage for those renting an apartment, condo or house",
        "age_requirement": "AARP membership (typically 50+)",
        "conditions": "AARP membership",
        "website": "[https://www.aarp.org/membership/benefits/insurance/vehicle-property/](https://www.aarp.org/membership/benefits/insurance/vehicle-property/)",
        "how_to_access": "AARP membership",
        "audience": "senior"
      }
    ],
    "disability": [
      {
        "name": "ABLE Account",
        "discount": "Tax-advantaged savings account for individuals with disabilities. Savings and investment growth are tax-free.",
        "eligibility": "Disability with an age of onset before 26. Receiving SSI or SSDI automatically makes you eligible. Alternatively, a licensed physician can certify the disability.",
        "conditions": "The funds must be used for qualified disability expenses (QDEs). Annual contribution limits apply.",
        "website": "https://www.ablenrc.org/",
        "how_to_access": "Open an ABLE account through a state ABLE program. Most accounts can be opened online.",
        "audience": "disability"
      },
      {
        "name": "Social Security Disability Insurance Benefits (SSDI)",
        "discount": "Provides income to adults unable to work due to disability. Assists with living expenses, prescription medications, and more.",
        "eligibility": "Unable to work and earn more than Substantial Gainful Activity (SGA) due to disability for 12 months or longer, or resulting in loss of life. Must have contributed to Social Security through payroll taxes (work credits). Some may qualify through a spouse's or parent's work record.",
        "conditions": "5-month waiting period before benefits are paid. Most must wait 24 months for Medicare, with exceptions for ALS and end-stage renal disease.",
        "website": "https://www.ssa.gov/disability/",
        "how_to_access": "Apply online at ssa.gov/disability or make an appointment to file by phone. Can sign up for a 'My SSA Account' to check work history and estimated payment amount.",
        "audience": "disability"
      },
      {
        "name": "Supplemental Security Income (SSI)",
        "discount": "Free government grant fund for low-income disabled Americans who are unable to work. Assists with various bills and basic needs.",
        "eligibility": "Low-income disabled Americans who are unable to work. Screenings identify whether the disability is short-term, partial, or total.",
        "conditions": "Needs-based program with income and resource limits. Eligibility for Medicaid is often included.",
        "website": "https://www.ssa.gov/ssi/",
        "how_to_access": "Apply through the Social Security Administration (SSA). Contact SSA directly or visit their website.",
        "audience": "disability"
      },
      {
        "name": "Section 811 Supportive Housing Grant Program for Persons with Disabilities",
        "discount": "Provides financial assistance for rent and housing requirements. Funds are also used towards the development of new homes that benefit the disabled community.",
        "eligibility": "Individuals with disabilities who meet low-income requirements.",
        "conditions": "Made available by the U.S. Department of Housing and Urban Development (HUD). Along with supportive services.",
        "website": "https://www.hud.gov/program_offices/housing/prod/disabilities/s811",
        "how_to_access": "Apply through local Public Housing Agencies (PHAs) or directly through HUD-approved housing providers.",
        "audience": "disability"
      },
      {
        "name": "Earned Income Tax Credit (EITC)",
        "discount": "Tax credit for low- to moderate-income workers and families, including persons with disabilities, that can reduce taxes owed and potentially increase refunds.",
        "eligibility": "Low- to moderate-income workers and families. Specific income thresholds and other criteria apply. Individuals with disabilities are included.",
        "conditions": "Must file a federal tax return. Eligibility depends on income, filing status, and number of qualifying children.",
        "website": "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit",
        "how_to_access": "Claim the credit when filing federal income taxes. Free tax preparation assistance is available through IRS VITA and TCE programs, or online through IRS Free File.",
        "audience": "disability"
      },
      {
        "name": "Child Tax Credit (CTC)",
        "discount": "Tax credit with a maximum of $2,200 per qualifying child, of which up to $1,700 is refundable.",
        "eligibility": "Families with qualifying children. Specific income thresholds and other criteria apply.",
        "conditions": "Must file a federal tax return. Eligibility depends on income and number of qualifying children.",
        "website": "https://www.irs.gov/credits-deductions/child-tax-credit",
        "how_to_access": "Claim the credit when filing federal income taxes. Free tax preparation assistance is available through IRS VITA and TCE programs, or online through IRS Free File.",
        "audience": "disability"
      },
      {
        "name": "Child and Dependent Care Credit",
        "discount": "Tax credit for expenses paid for the care of a qualifying person to enable the taxpayer (and spouse, if filing jointly) to work or look for work.",
        "eligibility": "Taxpayers who paid someone to care for a qualifying child or dependent so they could work or look for work.",
        "conditions": "The care must be for a qualifying person (generally a child under 13 or a dependent unable to care for themselves). Must file a federal tax return.",
        "website": "https://www.irs.gov/credits-deductions/child-and-dependent-care-credit",
        "how_to_access": "Claim the credit when filing federal income taxes. Free tax preparation assistance is available through IRS VITA and TCE programs, or online through IRS Free File.",
        "audience": "disability"
      },
      {
        "name": "Saver's Credit (Retirement Savings Contributions Credit)",
        "discount": "Tax credit for eligible individuals making eligible contributions toward their retirement through an IRA, employer-sponsored retirement plan or an ABLE account.",
        "eligibility": "Eligible individuals who contribute to an IRA, employer-sponsored retirement plan, or ABLE account. Income limits apply.",
        "conditions": "Must be 18 or older, not a student, and not claimed as a dependent on someone else's return. Maximum credit is $1,000 for individuals and $2,000 for married couples filing jointly.",
        "website": "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-savings-contributions-credit-savers-credit",
        "how_to_access": "Claim the credit when filing federal income taxes using Form 8880, Credit for Qualified Retirement Savings Contributions.",
        "audience": "disability"
      },
      {
        "name": "Purple Banking",
        "discount": "Benefits-aware banking with built-in monitoring and guardrails to reduce the risk of SSI or SSDI disruption. Receive benefits up to 4 days early. No monthly fees. No minimums.",
        "eligibility": "Individuals with disabilities receiving SSI or SSDI benefits.",
        "conditions": "Banking services provided by OMB Bank, Member FDIC. Guided account setup aligned with SSA benefit requirements. Automatic alerts as you approach asset and income limits.",
        "website": "https://www.withpurple.com/",
        "how_to_access": "Sign up today on their website. Account setup includes guidance for SSA benefit requirements.",
        "audience": "disability"
      },
      {
        "name": "Bank On Certified Accounts (Various Banks)",
        "discount": "Low-fee or no-fee checking accounts, often with no overdraft fees. Many banks waive monthly fees for customers who meet certain criteria, such as direct deposit of government benefits or maintaining a minimum balance.",
        "eligibility": "Low-income individuals, recipients of government benefits (like SSI/SSDI), or those who maintain a minimum balance or set up direct deposit. Eligibility varies by bank and specific account.",
        "conditions": "Offered by over 200 banks and credit unions. Look for accounts certified by the 'Bank On' program. Specific terms and conditions apply to each bank's offerings.",
        "website": "https://joinbankon.org/",
        "how_to_access": "Inquire with individual banks about their Bank On certified accounts or accounts with fee waiver options. Set up direct deposit of benefits or maintain required balances.",
        "audience": "disability"
      },
      {
        "name": "Car Insurance Considerations for Disabled Drivers",
        "discount": "No direct discount for disability, but ADA prevents upcharging solely based on disability status. Important coverages include Custom Parts and Equipment (CPE) for vehicle modifications and Personal Injury Protection (PIP) or Medical Payments coverage for medical expenses.",
        "eligibility": "Drivers with disabilities who own or operate a vehicle, especially those with mobility-enhanced vehicles.",
        "conditions": "CPE coverage often requires comprehensive and collision coverage. Rates may be higher if a medical condition poses a safety risk or for insuring mobility-adapted vehicles. Specific requirements vary by insurance provider.",
        "website": "https://www.thezebra.com/auto-insurance/driver/other-factors/car-insurance-drivers-disabilities/",
        "how_to_access": "Contact insurance providers to discuss coverage options, especially for vehicle modifications. Inquire about CPE, PIP, or Medical Payments coverage. Provide necessary documentation for vehicle modifications.",
        "audience": "disability"
      },
      {
        "name": "Life Insurance for People with Disabilities (General)",
        "discount": "No direct disability discount, but options are available. Premiums are determined by individual health, lifestyle, and risk factors. Adopting a healthier lifestyle can potentially lower rates.",
        "eligibility": "Individuals with disabilities seeking life insurance. Eligibility and rates depend on the specific disability, its severity, and overall health.",
        "conditions": "Pre-existing conditions can affect approval and premiums. It is recommended to compare quotes from multiple providers and be transparent about health conditions.",
        "website": "https://www.fidelitylife.com/life-insurance-basics/life-insurance-101/life-insurance-for-people-with-disabilities/",
        "how_to_access": "Contact various life insurance providers, consult with an independent insurance agent, and provide detailed medical history for an accurate quote.",
        "audience": "disability"
      },
      {
        "name": "Service-Disabled Veterans Life Insurance (S-DVI)",
        "discount": "Low-cost life insurance coverage for eligible service-disabled veterans.",
        "eligibility": "Veterans with a service-connected disability. This program stopped taking new applications after December 31, 2022, and was replaced by VALife.",
        "conditions": "Must have applied before December 31, 2022. For current options, veterans should look into VALife.",
        "website": "https://www.va.gov/life-insurance/options-eligibility/s-dvi/",
        "how_to_access": "For those who applied before the deadline, contact the VA for policy management. New applicants should consider VALife.",
        "audience": "disability"
      },
      {
        "name": "Veterans Affairs Life Insurance (VALife)",
        "discount": "Guaranteed acceptance whole life insurance for veterans with service-connected disabilities. No medical exam required.",
        "eligibility": "Veterans with a VA service-connected disability rating (even 0%). No time limit to apply after receiving a disability rating.",
        "conditions": "Coverage amounts from $10,000 to $40,000 in increments of $10,000. Premiums are based on age, gender, and coverage amount.",
        "website": "https://www.va.gov/life-insurance/options-eligibility/valife/",
        "how_to_access": "Apply online through the VA website or by mail. No medical exam is required.",
        "audience": "disability"
      }
    ]
  },
  {
    "id": "technology-and-subscriptions",
    "category": "Technology and Subscriptions",
    "icon": "Laptop",
    "image": undefined,
    "senior": [
      {
        "name": "Consumer Cellular",
        "discount": "5% off monthly fees, 30% off accessories, 5% off monthly smartwatch data plans, two lines unlimited talk/text/data for $55/month, 5% off IRIS Ally Medical Alert Device monthly subscription fees",
        "age_requirement": "AARP Membership (typically 50+)",
        "conditions": "AARP Membership required",
        "website": "https://www.consumercellular.com/ (Need to verify specific AARP page)",
        "how_to_access": "AARP Member benefits, likely through AARP website or by showing AARP card.",
        "audience": "senior"
      },
      {
        "name": "Lifeline Medical Alert Service",
        "discount": "15% off medical alert service plus free shipping and activation",
        "age_requirement": "AARP Membership (typically 50+)",
        "conditions": "AARP Membership required",
        "website": "(Need to find specific URL)",
        "how_to_access": "AARP Member benefits, likely through AARP website or by showing AARP card.",
        "audience": "senior"
      },
      {
        "name": "LifeLock by Norton",
        "discount": "Identity theft protection plans starting at $6.99 a month",
        "age_requirement": "AARP Membership (typically 50+)",
        "conditions": "AARP Membership required",
        "website": "(Need to find specific URL)",
        "how_to_access": "AARP Member benefits, likely through AARP website or by showing AARP card.",
        "audience": "senior"
      },
      {
        "name": "Norton 360",
        "discount": "Up to 69% off device protection plans",
        "age_requirement": "AARP Membership (typically 50+)",
        "conditions": "AARP Membership required",
        "website": "(Need to find specific URL)",
        "how_to_access": "AARP Member benefits, likely through AARP website or by showing AARP card.",
        "audience": "senior"
      },
      {
        "name": "Norton Ultimate Help Desk",
        "discount": "15% off on-demand, remote computer troubleshooting",
        "age_requirement": "AARP Membership (typically 50+)",
        "conditions": "AARP Membership required",
        "website": "(Need to find specific URL)",
        "how_to_access": "AARP Member benefits, likely through AARP website or by showing AARP card.",
        "audience": "senior"
      },
      {
        "name": "Tracfone Home Internet",
        "discount": "$10 off monthly Tracfone Home Internet service",
        "age_requirement": "AARP Membership (typically 50+)",
        "conditions": "AARP Membership required",
        "website": "(Need to find specific URL)",
        "how_to_access": "AARP Member benefits, likely through AARP website or by showing AARP card.",
        "audience": "senior"
      },
      {
        "name": "AARP Tech Guides",
        "discount": "40% off select technology how-to guides",
        "age_requirement": "AARP Membership (typically 50+)",
        "conditions": "AARP Membership required",
        "website": "(Need to find specific URL)",
        "how_to_access": "AARP Member benefits, likely through AARP website or by showing AARP card.",
        "audience": "senior"
      },
      {
        "name": "Western Digital",
        "discount": "15%",
        "age_requirement": "55+",
        "conditions": "Verified by SENIORDISCOUNT",
        "website": "https://www.westerndigital.com/promo/e/senior-discounts",
        "how_to_access": "Verify age through Senior Discount to get a voucher code to use at checkout.",
        "audience": "senior"
      },
      {
        "name": "Beko",
        "discount": "10% off small appliances",
        "age_requirement": "55+",
        "conditions": "Verified by Senior Discount",
        "website": "https://shop.beko.co.uk/PagesPublic/UserControlled/UserDefined.aspx?page=youth-senior-discount",
        "how_to_access": "Verify age through Senior Discount to get a voucher code to use at checkout.",
        "audience": "senior"
      },
      {
        "name": "ASDA Photo",
        "discount": "10%",
        "age_requirement": "55+",
        "conditions": "Verification through services like UNiDAYS or Student Beans is mentioned for students, but for seniors, it's likely through Senior Discount verification.",
        "website": "https://asda-photo.tenereteam.com/coupons",
        "how_to_access": "Verify age through Senior Discount to get 10% off.",
        "audience": "senior"
      },
      {
        "name": "Avira",
        "discount": "70%",
        "age_requirement": "55+",
        "conditions": "Verified by Senior Discount",
        "website": "https://senior.discount/partners/avira",
        "how_to_access": "Verify age through Senior Discount to get a voucher code to use at checkout.",
        "audience": "senior"
      },
      {
        "name": "SanDisk",
        "discount": "15%",
        "age_requirement": "55+",
        "conditions": "Verified by SENIORDISCOUNT",
        "website": "https://www.sandisk.com/promo/e/senior-discounts",
        "how_to_access": "Verify age through Senior Discount to get a voucher code to use at checkout.",
        "audience": "senior"
      },
      {
        "name": "Smart Fone Store",
        "discount": "10%",
        "age_requirement": "55+ (assumed based on senior.discount)",
        "conditions": "Not specified beyond senior.discount verification",
        "website": "Not specified (likely through senior.discount)",
        "how_to_access": "Verify age through Senior Discount to get a voucher code to use at checkout.",
        "audience": "senior"
      },
      {
        "name": "Laptop Outlet",
        "discount": "Up to 30%",
        "age_requirement": "55+",
        "conditions": "Verified by Senior Discount",
        "website": "https://www.laptopoutlet.co.uk/senior-discount",
        "how_to_access": "Verify age through Senior Discount to get a voucher code to use at checkout.",
        "audience": "senior"
      },
      {
        "name": "LG",
        "discount": "Minimum 10% (via Appreciation Program)",
        "age_requirement": "50+",
        "conditions": "Eligibility for LG Appreciation Program",
        "website": "https://www.lg.com/us/appreciation-program",
        "how_to_access": "Verify age through LG Appreciation Program (likely online verification).",
        "audience": "senior"
      },
      {
        "name": "Hive.co.uk",
        "discount": "10%",
        "age_requirement": "55+",
        "conditions": "Verified by Senior Discount",
        "website": "https://senior.discount/partners/hive",
        "how_to_access": "Verify age through Senior Discount to get a voucher code to use at checkout.",
        "audience": "senior"
      },
      {
        "name": "Staples",
        "discount": "7%",
        "age_requirement": "55+",
        "conditions": "Verified by Senior Discount",
        "website": "https://www.senior.discount/partners/staples",
        "how_to_access": "Verify age through Senior Discount to get a voucher code to use at checkout.",
        "audience": "senior"
      },
      {
        "name": "Hoover",
        "discount": "Not specified (likely 10% based on senior.discount)",
        "age_requirement": "60+",
        "conditions": "Verified by Hoover",
        "website": "https://www.hoover-home.com/en_GB/pages/hoover-discounts",
        "how_to_access": "Verify age through Hoover website.",
        "audience": "senior"
      },
      {
        "name": "Karcher",
        "discount": "10%",
        "age_requirement": "55+",
        "conditions": "Verified by Senior Discount",
        "website": "https://www.kaercher.com/uk/senior-discount.html",
        "how_to_access": "Verify age through Senior Discount to get a voucher code to use at checkout.",
        "audience": "senior"
      },
      {
        "name": "Instant",
        "discount": "15%",
        "age_requirement": "55+ (assumed based on senior.discount)",
        "conditions": "Not specified beyond senior.discount verification",
        "website": "Not specified (likely through senior.discount)",
        "how_to_access": "Verify age through Senior Discount to get a voucher code to use at checkout.",
        "audience": "senior"
      },
      {
        "name": "eufy UK",
        "discount": "20%",
        "age_requirement": "55+ (assumed based on senior.discount)",
        "conditions": "Not specified beyond senior.discount verification",
        "website": "Not specified (likely through senior.discount)",
        "how_to_access": "Verify age through Senior Discount to get a voucher code to use at checkout.",
        "audience": "senior"
      },
      {
        "name": "Amazon Prime",
        "discount": "$6.99/month (reduced price from $14.99/month)",
        "age_requirement": "None specified for this particular discount",
        "conditions": "Must be a recipient of qualifying government assistance programs (e.g., SNAP, Medicaid, SSI, etc.)",
        "website": "https://www.amazon.com/amazonprime?primeCampaignId=accessWlpPrimeRedir",
        "how_to_access": "Verify eligibility through the Amazon Prime Access program.",
        "audience": "senior"
      },
      {
        "name": "Microsoft (Microsoft 365)",
        "discount": "No specific senior discount.",
        "age_requirement": "N/A",
        "conditions": "N/A",
        "website": "https://learn.microsoft.com/en-us/answers/questions/5761830/senior-citizen-discount-for-microsoft-365",
        "how_to_access": "N/A",
        "audience": "senior"
      },
      {
        "name": "Apple",
        "discount": "No specific senior discount.",
        "age_requirement": "N/A",
        "conditions": "N/A",
        "website": "https://discussions.apple.com/thread/254255742",
        "how_to_access": "N/A",
        "audience": "senior"
      },
      {
        "name": "DISH",
        "discount": "Special TV offer (details not fully specified, but includes $0 technician visits and DISH Protect Plus for $0)",
        "age_requirement": "55+",
        "conditions": "Not specified beyond age requirement",
        "website": "https://www.dish.com/offers/dish55-offer",
        "how_to_access": "Sign up for the 55+ exclusive TV offer.",
        "audience": "senior"
      },
      {
        "name": "T-Mobile",
        "discount": "Discounted rates on unlimited cell phone plans (e.g., Essentials Choice 55 plan for $30/month for two lines, $15-$20 monthly bill discount on other plans)",
        "age_requirement": "55+",
        "conditions": "Proof of age required. Plans vary.",
        "website": "https://www.t-mobile.com/cell-phone-plans/unlimited-55-senior-discount-plans",
        "how_to_access": "Visit a local T-Mobile store with government-issued ID, or call 1-800-T-Mobile.",
        "audience": "senior"
      },
      {
        "name": "Verizon",
        "discount": "Florida 55+ mobile and home internet discount (e.g., save $31/month on mobile, additional $16/month home internet discount when bundled)",
        "age_requirement": "55+",
        "conditions": "Florida resident, Florida billing address, add qualifying mobile and/or home internet plans.",
        "website": "https://www.verizon.com/plans/55plus/",
        "how_to_access": "Sign up for the Florida 55+ plan, likely with age and residency verification.",
        "audience": "senior"
      },
      {
        "name": "AT&T Access Program",
        "discount": "~$10/month (discounted internet service)",
        "age_requirement": "Not explicitly stated as age-based, but targets low-income individuals.",
        "conditions": "Eligibility based on income or participation in programs like SNAP or SSI.",
        "website": "(Need to find specific URL for AT&T Access Program)",
        "how_to_access": "Apply through the AT&T Access Program.",
        "audience": "senior"
      },
      {
        "name": "Spectrum Internet Assist",
        "discount": "$14.99/month (discounted internet service), potentially $15/month with additional discount.",
        "age_requirement": "Not explicitly stated as age-based, but targets low-income individuals.",
        "conditions": "Eligibility based on income or participation in programs like NSLP, SSI, or being 65+ and receiving SSI.",
        "website": "https://www.spectrum.net/support/account-and-billing/spectrum-internet-assist-and-internet-advantage",
        "how_to_access": "Apply through the Spectrum Internet Assist program.",
        "audience": "senior"
      },
      {
        "name": "Xfinity Internet Essentials",
        "discount": "Low-cost internet service (specific price not mentioned, but targets affordable access).",
        "age_requirement": "Not explicitly stated as age-based, but targets low-income individuals.",
        "conditions": "Eligibility based on income or participation in programs like SNAP, Medicaid, SSI, etc.",
        "website": "https://www.xfinity.com/learn/internet-service/internet-essentials",
        "how_to_access": "Apply through the Internet Essentials program.",
        "audience": "senior"
      },
      {
        "name": "Lifeline Program (Federal Program)",
        "discount": "Up to $9.25/month discount on internet service.",
        "age_requirement": "Not age-specific, but eligible individuals often include seniors.",
        "conditions": "Eligibility based on income or participation in federal assistance programs.",
        "website": "(General information, not a single provider)",
        "how_to_access": "Apply through a participating internet service provider.",
        "audience": "senior"
      }
    ],
    "disability": [
      {
        "name": "Lifeline Program",
        "discount": "Discounts on phone or internet bill.",
        "eligibility": "Income less than 135% of federal poverty guidelines OR participation in programs like SNAP, Medicaid, SSI, Federal Public Housing Assistance, Veterans Pension, Survivors Pension, or Tribal Programs.",
        "conditions": "Only one Lifeline discount per household.",
        "website": "https://www.fcc.gov/consumers/guides/lifeline-support-affordable-communications",
        "how_to_access": "Apply online, via mail, or through a participating phone or internet provider.",
        "audience": "disability"
      },
      {
        "name": "Access from AT&T",
        "discount": "$30 per month for internet service, up to 100 Mbps.",
        "eligibility": "Qualified households based on participation in programs like Lifeline, SNAP, Medicaid, or other government programs.",
        "conditions": "Typically no contracts or equipment rental fees.",
        "website": "https://www.att.com/internet/access/",
        "how_to_access": "Apply through AT&T, likely requiring proof of program participation.",
        "audience": "disability"
      },
      {
        "name": "Cox Connect2Compete",
        "discount": "$9.95 per month for internet service, up to 100 Mbps.",
        "eligibility": "Qualified households based on participation in programs like Lifeline, SNAP, Medicaid, or other government programs.",
        "conditions": "Typically no contracts or equipment rental fees.",
        "website": "https://www.cox.com/residential/internet/connect2compete.html",
        "how_to_access": "Apply through Cox, likely requiring proof of program participation.",
        "audience": "disability"
      },
      {
        "name": "Frontier New York Low Income Program",
        "discount": "$19.99 per month for internet service, up to 200 Mbps.",
        "eligibility": "Qualified households based on participation in programs like Lifeline, SNAP, Medicaid, or other government programs.",
        "conditions": "Typically no contracts or equipment rental fees.",
        "website": "https://frontier.com/discount-programs/new-york-low-income",
        "how_to_access": "Apply through Frontier, likely requiring proof of program participation.",
        "audience": "disability"
      },
      {
        "name": "Internet First from Astound",
        "discount": "$19.95 per month for internet service, up to 150 Mbps.",
        "eligibility": "Qualified households based on participation in programs like Lifeline, SNAP, Medicaid, or other government programs.",
        "conditions": "Typically no contracts or equipment rental fees.",
        "website": "https://www.internetfirst.com/",
        "how_to_access": "Apply through Astound, likely requiring proof of program participation.",
        "audience": "disability"
      },
      {
        "name": "Mediacom Xtream Connect",
        "discount": "$29.99 per month for internet service, up to 100 Mbps.",
        "eligibility": "Qualified households based on participation in programs like Lifeline, SNAP, Medicaid, or other government programs.",
        "conditions": "Typically no contracts or equipment rental fees.",
        "website": "https://mediacomcable.com/xtream-connect",
        "how_to_access": "Apply through Mediacom, likely requiring proof of program participation.",
        "audience": "disability"
      },
      {
        "name": "Spectrum Internet Assist",
        "discount": "$25 per month for internet service, up to 50 Mbps.",
        "eligibility": "Qualified households based on participation in programs like Lifeline, SNAP, Medicaid, or other government programs.",
        "conditions": "Typically no contracts or equipment rental fees.",
        "website": "https://www.spectrum.net/support/account-and-billing/spectrum-internet-assist",
        "how_to_access": "Apply through Spectrum, likely requiring proof of program participation.",
        "audience": "disability"
      },
      {
        "name": "Xfinity Internet Essentials",
        "discount": "$14.95 per month for internet service, up to 100 Mbps.",
        "eligibility": "Qualified households based on participation in programs like Lifeline, SNAP, Medicaid, or other government programs.",
        "conditions": "Typically no contracts or equipment rental fees.",
        "website": "https://www.xfinity.com/learn/internet-service/internet-essentials",
        "how_to_access": "Apply through Xfinity, likely requiring proof of program participation.",
        "audience": "disability"
      },
      {
        "name": "Boost Mobile",
        "discount": "First three months of most affordable plan for $10 per month, then $25 per month thereafter. Includes unlimited talk, text, and data.",
        "eligibility": "Not explicitly stated as disability-specific, but generally available to all customers.",
        "conditions": "New customers.",
        "website": "https://www.boostmobile.com/",
        "how_to_access": "Sign up for the plan through Boost Mobile.",
        "audience": "disability"
      },
      {
        "name": "FreedomPop",
        "discount": "$10 per month for a discounted plan with nationwide coverage and international calling to 20 countries.",
        "eligibility": "Not explicitly stated as disability-specific, but generally available to all customers.",
        "conditions": "None explicitly stated.",
        "website": "https://www.freedompop.com/",
        "how_to_access": "Sign up for the plan through FreedomPop.",
        "audience": "disability"
      },
      {
        "name": "Cricket Wireless",
        "discount": "Nationwide 5G and 2 GB of cloud storage starting at $35 per month (with autopay).",
        "eligibility": "Not explicitly stated as disability-specific, but generally available to all customers.",
        "conditions": "Autopay enrollment.",
        "website": "https://www.cricketwireless.com/",
        "how_to_access": "Sign up for the plan through Cricket Wireless with autopay.",
        "audience": "disability"
      },
      {
        "name": "Mint Mobile",
        "discount": "Starting at $15 per month for the first three months (requires $45 upfront payment). Introductory offers also come in 6-month and 12-month plans.",
        "eligibility": "New customers.",
        "conditions": "Upfront payment for introductory period.",
        "website": "https://www.mintmobile.com/",
        "how_to_access": "Sign up for a new plan through Mint Mobile.",
        "audience": "disability"
      },
      {
        "name": "Straight Talk",
        "discount": "With Lifeline discount, any monthly phone plan with at least 4.5 GB of data will only cost $10 per month (up to $35 per month on qualifying Tribal Lands).",
        "eligibility": "Lifeline discount recipient.",
        "conditions": "Must qualify for Lifeline discount.",
        "website": "https://www.straighttalk.com/",
        "how_to_access": "Apply for Lifeline discount, then sign up for a Straight Talk plan.",
        "audience": "disability"
      },
      {
        "name": "Tello",
        "discount": "Economy plan provides 2 GB of data with unlimited talk and text for $10 per month for the first six months, then $25 per month. Includes Wi-Fi calling, hotspots, and free international calls to over 60 countries.",
        "eligibility": "New customers.",
        "conditions": "None explicitly stated.",
        "website": "https://tello.com/",
        "how_to_access": "Sign up for the Economy plan through Tello.",
        "audience": "disability"
      },
      {
        "name": "Apple",
        "discount": "No direct disability discounts. Focuses on built-in accessibility features and assistive technologies within its products (e.g., Vision, Hearing, Speech, Mobility, Cognitive features).",
        "eligibility": "N/A (features are built into products).",
        "conditions": "N/A.",
        "website": "https://www.apple.com/accessibility/",
        "how_to_access": "Utilize the accessibility features available on Apple devices and software.",
        "audience": "disability"
      },
      {
        "name": "Amazon Prime Access",
        "discount": "50% discount on Prime membership ($6.99/month instead of $14.99/month).",
        "eligibility": "Eligible EBT and government assistance recipients (e.g., Medicaid, SNAP, SSI).",
        "conditions": "Verification of eligibility for government assistance programs.",
        "website": "https://www.amazon.com/primeaccess",
        "how_to_access": "Visit amazon.com/primeaccess and verify eligibility.",
        "audience": "disability"
      },
      {
        "name": "Major Streaming Services (e.g., Netflix, Hulu, Disney+)",
        "discount": "No direct disability discounts generally available.",
        "eligibility": "N/A",
        "conditions": "N/A",
        "website": "N/A (as no specific disability discount page exists)",
        "how_to_access": "N/A",
        "audience": "disability"
      },
      {
        "name": "State Assistive Technology (AT) Programs",
        "discount": "Provide assistive technology devices and services, including device demonstrations, loans, reutilization, and financial assistance (e.g., low-interest loans, direct provision of AT at no cost).",
        "eligibility": "Individuals with disabilities of all ages. Specific eligibility may vary by state and program.",
        "conditions": "Varies by state and specific program. May require residency in the state.",
        "website": "https://at3center.net/state-at-programs/ (Directory of state programs)",
        "how_to_access": "Contact your state's AT program directly. Information available through the AT3 Center website.",
        "audience": "disability"
      },
      {
        "name": "Microsoft",
        "discount": "No direct disability discounts for individuals. Focuses on built-in accessibility features within its products (e.g., Microsoft 365, Windows, Xbox, Surface) and provides support through the Disability Answer Desk.",
        "eligibility": "N/A (features are built into products).",
        "conditions": "N/A.",
        "website": "https://www.microsoft.com/en-us/accessibility",
        "how_to_access": "Utilize the accessibility features available on Microsoft devices and software, or contact the Disability Answer Desk for support.",
        "audience": "disability"
      }
    ]
  }
];

export const TOTAL_SENIOR = 160;
export const TOTAL_DISABILITY = 120;
export const TOTAL_PROGRAMS = TOTAL_SENIOR + TOTAL_DISABILITY;
