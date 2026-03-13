/* socialProgramsData.ts — HealthCare Select Benefits Hub Social Programs Education Hub
 * 16 programs across 8 categories for disabled Americans
 * Deep-researched from SSA, HUD, USDA, CMS, DOL, and ADA.gov
 */

export interface ApplyInfo {
  steps: string[];
  portal_url: string;
  phone: string;
  tty: string;
}

export interface OfficialLink {
  label: string;
  url: string;
}

export interface ContactInfo {
  phone: string;
  tty: string;
  website: string;
  hours: string;
}

export type ProgramCategory =
  | 'Income Support'
  | 'Healthcare'
  | 'Housing'
  | 'Food & Nutrition'
  | 'Employment'
  | 'Financial Tools'
  | 'Legal Rights'
  | 'Prescription Help';

export interface SocialProgram {
  id: string;
  program_name: string;
  agency: string;
  category: ProgramCategory;
  overview: string;
  eligibility: string[];
  benefits: string;
  how_to_apply: ApplyInfo;
  how_to_update_info: string;
  key_rules: string[];
  official_links: OfficialLink[];
  common_mistakes: string[];
  related_programs: string[];
  contact: ContactInfo;
}

export const CATEGORY_META: Record<ProgramCategory, { icon: string; color: string; bg: string; description: string }> = {
  'Income Support': { icon: 'DollarSign', color: 'oklch(0.45 0.08 175)', bg: 'oklch(0.93 0.04 42)', description: 'Monthly cash benefits including SSDI and SSI' },
  'Healthcare': { icon: 'HeartPulse', color: 'oklch(0.50 0.15 15)', bg: 'oklch(0.95 0.04 15)', description: 'Medicaid, Medicare, and health coverage programs' },
  'Housing': { icon: 'Home', color: 'oklch(0.45 0.12 200)', bg: 'oklch(0.92 0.04 200)', description: 'Rental assistance, Section 8, and accessible housing' },
  'Food & Nutrition': { icon: 'UtensilsCrossed', color: 'oklch(0.40 0.10 140)', bg: 'oklch(0.90 0.04 140)', description: 'SNAP, food banks, meal delivery programs' },
  'Employment': { icon: 'Briefcase', color: 'oklch(0.48 0.12 280)', bg: 'oklch(0.92 0.04 280)', description: 'Vocational rehab, job training, Ticket to Work' },
  'Financial Tools': { icon: 'PiggyBank', color: 'oklch(0.45 0.10 60)', bg: 'oklch(0.93 0.04 60)', description: 'ABLE accounts, PASS plans, utility assistance' },
  'Legal Rights': { icon: 'Scale', color: 'oklch(0.35 0.08 250)', bg: 'oklch(0.92 0.03 250)', description: 'ADA rights, advocacy, and discrimination protections' },
  'Prescription Help': { icon: 'Pill', color: 'oklch(0.42 0.12 330)', bg: 'oklch(0.93 0.04 330)', description: 'Prescription savings, patient assistance programs' },
};

export const SOCIAL_PROGRAMS: SocialProgram[] = 
[
  {
    "id": "social-security-disability-insurance-ssd",
    "program_name": "Social Security Disability Insurance (SSDI)",
    "agency": "Social Security Administration (SSA)",
    "category": "Income Support",
    "overview": "Social Security Disability Insurance (SSDI) is a federal insurance program administered by the Social Security Administration (SSA). It provides monthly benefits to individuals who have a disability that prevents them from working and who have earned sufficient work credits through their employment. It also provides benefits to certain family members of disabled workers.",
    "eligibility": [
      "Work Credits: Individuals must have worked long enough and recently enough in jobs where Social Security taxes were paid. The number of required work credits varies by age, but generally, 40 credits are needed for those aged 62 or older. Younger individuals may qualify with fewer credits.",
      "Disability Definition: The Social Security Administration (SSA) defines disability as the inability to engage in any Substantial Gainful Activity (SGA) due to a medically determinable physical or mental impairment that is expected to last for at least 12 months or result in death.",
      "Inability to Perform Substantial Gainful Activity (SGA): An individual's condition must prevent them from doing work that is considered substantial gainful activity. The SGA amount changes annually.",
      "Age: While there isn't a strict age limit to apply, benefits are generally for those under full retirement age. If a disability started before age 22, individuals may be eligible for benefits as an adult disabled child if a parent is deceased or receiving Social Security retirement or disability ben"
    ],
    "benefits": "SSDI provides monthly cash benefits to eligible individuals. The benefit amount is based on the worker's average lifetime earnings before their disability began. As of November 2025, the average monthly disability benefit for a disabled worker was approximately $1,588.52. The maximum monthly SSDI payment can be up to $4,152 (as of 2025). In addition to monthly payments, after a waiting period, SSDI recipients typically become eligible for Medicare health insurance.",
    "how_to_apply": {
      "steps": [
        "Gather Information: Collect necessary documents such as medical records, work history, and personal information.",
        "Online Application: The Social Security Administration (SSA) offers an online disability application portal.",
        "Phone Application: You can also call the SSA to make an appointment to apply.",
        "In-Person Application: Visit your local Social Security office."
      ],
      "portal_url": "https://www.ssa.gov/apply",
      "phone": "1-800-772-1213",
      "tty": "1-800-325-0778"
    },
    "how_to_update_info": "SSDI recipients are required to report changes in their circumstances to the Social Security Administration (SSA). This includes changes in work status, income, medical condition, address, and other life events. Reporting can often be done through your personal my Social Security account online, by calling the SSA directly, or by visiting a local Social Security office. For income and work changes, it is crucial to report promptly to avoid overpayments and ensure accurate benefit amounts.",
    "key_rules": [
      "Reporting Changes: Report changes in work, income, or medical condition promptly to the SSA. For SSI recipients, changes in income, resources, and living situation should be reported by the tenth day of the month after the change.",
      "Trial Work Period: SSDI beneficiaries can return to work for at least 9 months without losing their full disability payments. This is known as a \u201ctrial work period.\u201d",
      "Waiting Period: There is a five-month waiting period after the onset of disability before SSDI payments can begin.",
      "Continuing Disability Reviews (CDRs): The SSA periodically reviews cases to determine if a beneficiary is still disabled. The frequency of these reviews depends on the nature and severity of the medical condition."
    ],
    "official_links": [
      {
        "label": "Social Security Administration (SSA) Disability Homepage",
        "url": "https://www.ssa.gov/disability"
      },
      {
        "label": "Apply for Social Security Benefits",
        "url": "https://www.ssa.gov/apply"
      },
      {
        "label": "My Social Security Account",
        "url": "https://www.ssa.gov/myaccount/"
      },
      {
        "label": "What You Must Report While on Disability",
        "url": "https://www.ssa.gov/disability/reporting"
      },
      {
        "label": "How Does Someone Become Eligible? (Disability Benefits)",
        "url": "https://www.ssa.gov/benefits/disability/qualify.html"
      },
      {
        "label": "Social Security Benefit Amounts",
        "url": "https://www.ssa.gov/oact/cola/Benefits.html"
      },
      {
        "label": "Social Security Credits and Benefit Eligibility",
        "url": "https://www.ssa.gov/benefits/retirement/planner/credits.html"
      }
    ],
    "common_mistakes": [
      "Insufficient Medical Evidence: Failing to provide comprehensive and up-to-date medical documentation is a primary reason for denial. The SSA relies heavily on objective medical evidence to determine disability.",
      "Incomplete or Inaccurate Application: Mistakes or omissions on the application forms can lead to delays or outright denials. It is crucial to fill out all forms thoroughly and accurately.",
      "Not Following Treatment Plans: If an applicant is not following prescribed medical treatment without good reason, the SSA may view this as an indication that the disability is not as severe as claimed.",
      "Earning Too Much While Applying: Engaging in Substantial Gainful Activity (SGA) during the application process can lead to denial, as it indicates an ability to work.",
      "Going at it Alone: Many applicants benefit from legal representation or assistance from disability advocates, as they can help navigate the complex application and appeals process."
    ],
    "related_programs": [
      "Supplemental Security Income (SSI): A needs-based program that provides cash assistance to aged, blind, or disabled individuals who have limited income and resources. Unlike SSDI, eligibility for SSI is not based on work history.",
      "Medicare: A federal health insurance program for people who are 65 or older, certain younger people with disabilities, and people with End-Stage Renal Disease. SSDI recipients typically become eligible for Medicare after a waiting period.",
      "Ticket to Work Program: A voluntary program that provides employment support services to SSDI and SSI beneficiaries aged 18 through 64 who want to work. It helps beneficiaries transition back into the workforce while maintaining their benefits."
    ],
    "contact": {
      "phone": "1-800-772-1213",
      "tty": "1-800-325-0778",
      "website": "https://www.ssa.gov",
      "hours": "Monday through Friday, 8:00 AM \u2013 7:00 PM (Local time)"
    }
  },
  {
    "id": "supplemental-security-income-ssi",
    "program_name": "Supplemental Security Income (SSI)",
    "agency": "Social Security Administration",
    "category": "Income Support",
    "overview": "Supplemental Security Income (SSI) is a federal program administered by the Social Security Administration (SSA) that provides monthly payments to adults and children with limited income and resources who are disabled, blind, or age 65 or older. The program is designed to help meet basic needs for food, clothing, and shelter.",
    "eligibility": [
      "Be age 65 or older, blind, or disabled.",
      "Have little or no income (generally, not earning more than $2,073 from work per month for an individual, with higher limits for couples and parents of disabled children).",
      "Have little or no resources (generally, not more than $2,000 for an individual or $3,000 for a couple; these numbers increase by $2,000 for parents applying for a child).",
      "If age 64 or younger, have a disability that affects ability to work for a year or more, will result in death, or severely limits daily activity (for children).",
      "If disabled, earned less than $1,690 from work per month in the month of application.",
      "Meet U.S. citizenship or national requirements, or specific noncitizen requirements."
    ],
    "benefits": "The maximum federal SSI payment for 2026 is $994 per month for an individual and $1,491 per month for a couple. The exact amount may be lower based on income, living arrangements, and other factors. Work income reduces SSI by about $1 for every $2 earned. Non-work income reduces SSI by about $1 for every $1 received. Living with a spouse or parents (for children) can affect payments. Not paying a fair share of food and shelter costs in someone else's home can reduce payments by up to $351.33. So",
    "how_to_apply": {
      "steps": [
        "Gather necessary documents (birth certificate, Social Security card, proof of income, resources, and residency).",
        "Apply online for disability benefits (which can include SSI) or contact SSA to make an appointment to apply.",
        "Complete the application process, which may involve interviews and providing additional information."
      ],
      "portal_url": "https://www.ssa.gov/applyfordisability/",
      "phone": "1-800-772-1213",
      "tty": "1-800-325-0778"
    },
    "how_to_update_info": "Recipients must report changes to their wages monthly and submit changes in other income, resources, marital status, and living arrangements (including entering or leaving a medical facility or incarceration) to the Social Security Administration to ensure accurate payments and continued eligibility. Report changes as soon as possible, no later than 10 days after the end of the month in which the change occurred. Monthly wages should be reported by the sixth day of the month after payment.",
    "key_rules": [
      "Report changes that may affect SSI eligibility or payment amount within 10 days after the end of the month in which the change occurred.",
      "Report monthly wages by the sixth day of the month after you get paid.",
      "Overpayment recovery: If an overpayment is not repaid within 30 days, SSA will automatically withhold 50% of the benefit or 10% of the SSI payment each month until the overpayment is recovered."
    ],
    "official_links": [
      {
        "label": "Supplemental Security Income (SSI) - SSA",
        "url": "https://www.ssa.gov/ssi"
      },
      {
        "label": "Who can get SSI - SSA",
        "url": "https://www.ssa.gov/ssi/eligibility"
      },
      {
        "label": "How much you could get from SSI - SSA",
        "url": "https://www.ssa.gov/ssi/amount"
      },
      {
        "label": "Reporting responsibilities for SSI - SSA",
        "url": "https://www.ssa.gov/ssi/reporting"
      },
      {
        "label": "Apply for Disability Benefits - SSA",
        "url": "https://www.ssa.gov/applyfordisability/"
      },
      {
        "label": "Resolve an overpayment - SSA",
        "url": "https://www.ssa.gov/manage-benefits/resolve-overpayment"
      }
    ],
    "common_mistakes": [
      "Failing to meet the SSA's definition of disability.",
      "Missing reporting deadlines for income or life changes.",
      "Failing to provide sufficient medical evidence during the application or review process.",
      "Not appealing a denial of benefits."
    ],
    "related_programs": [
      "Supplemental Nutrition Assistance Program (SNAP)",
      "Medicaid",
      "Social Security Disability Insurance (SSDI)"
    ],
    "contact": {
      "phone": "1-800-772-1213",
      "tty": "1-800-325-0778",
      "website": "https://www.ssa.gov",
      "hours": "Monday through Friday, 8:00 a.m. to 7:00 p.m. local time"
    }
  },
  {
    "id": "medicaid",
    "program_name": "Medicaid",
    "agency": "Joint federal and state program, federally overseen by the Centers for Medicare & Medicaid Services ",
    "category": "Healthcare",
    "overview": "Medicaid is a joint federal and state program that provides comprehensive health and long-term care coverage to eligible low-income individuals, including those with disabilities. It is the primary source of health coverage for many disabled Americans, offering a broad range of services to enable them to live and work in the community.",
    "eligibility": [
      "Financial Eligibility: For most individuals (children, pregnant women, parents, adults), eligibility is based on Modified Adjusted Gross Income (MAGI). For individuals 65 and older, or with blindness or a disability, eligibility is generally determined using the income methodologies of the Supplemen",
      "Non-Financial Eligibility: Must be residents of the state in which they are receiving Medicaid. Must be citizens of the United States or certain qualified non-citizens (e.g., lawful permanent residents). Some groups may have age, pregnancy, or parenting status limitations.",
      "Automatic Eligibility: Individuals receiving Supplemental Security Income (SSI), children with adoption assistance agreements under title IV-E of the Social Security Act, and young adults who were formerly in foster care (at any income level).",
      "Medically Needy Programs: States may offer programs where individuals with high medical needs can 'spend down' their income to qualify by incurring medical expenses."
    ],
    "benefits": "Medicaid provides comprehensive health and long-term care coverage. It funds vital supports to keep individuals with disabilities in their communities, often being the only source of funds for them to live and work in the community and avoid more costly and segregated nursing homes or institutions. Mandatory benefits, which states are required to provide under federal law, include services such as inpatient and outpatient hospital services, physician services, laboratory and x-ray services, and ",
    "how_to_apply": {
      "steps": [
        "Determine your eligibility: Review the eligibility requirements for Medicaid, especially those related to disability and income.",
        "Contact your State Medicaid Agency: Visit the official Medicaid.gov website (https://www.medicaid.gov/about-us/where-can-people-get-help-medicaid-chip) and select your state to find specific contact information and application portals.",
        "Apply online, by mail, or in person: Most states offer online applications through their state Medicaid portal or through Healthcare.gov. You may also be able to apply by mail or in person at your local Medicaid office.",
        "Provide necessary documentation: Be prepared to submit documents verifying your identity, residency, income, assets, and disability status.",
        "Follow up on your application: The Medicaid agency typically has 45 days to process your application. If a disability determination is required, it may take longer. You can check the status of your application by contacting your State Medicaid Agency."
      ],
      "portal_url": "https://www.medicaid.gov/about-us/where-can-people-get-help-medicaid-chip",
      "phone": "",
      "tty": ""
    },
    "how_to_update_info": "Medicaid recipients are required to report changes in income, household size, address, and other life events (such as marriage, divorce, birth or adoption of a child, or changes in disability status) to their State Medicaid Agency. These changes can impact eligibility and benefit levels. The most common methods for reporting changes include logging into your state's online Medicaid portal, using your Healthcare.gov account (if you applied through the Marketplace), calling your State Medicaid Agency directly, or visiting a local office. It is crucial to report changes promptly, typically within",
    "key_rules": [
      "Reporting Changes: Recipients are generally required to report changes in income, household size, address, and other life events to their State Medicaid Agency within 10-30 days of the change. Prompt reporting is crucial to avoid issues with eligibility and benefits.",
      "Overpayments: If a Medicaid recipient receives an overpayment, states will seek restitution. The amount considered as income may be adjusted if other benefits are reduced due to overpayment recovery. Providers are required to report and return overpayments within 60 days of identification.",
      "Look-Back Period: For individuals applying for long-term care services through Medicaid, most states have a five-year (60-month) look-back period. This means that any asset transfers for less than fair market value during this period may result in a denial of long-term care coverage.",
      "Annual Reviews: Medicaid eligibility is typically reviewed annually. Recipients will receive a renewal notice and must complete the renewal process to maintain coverage."
    ],
    "official_links": [
      {
        "label": "Medicaid.gov: The Official U.S. Government Site for Medicaid and CHIP",
        "url": "https://www.medicaid.gov/"
      },
      {
        "label": "Centers for Medicare & Medicaid Services (CMS)",
        "url": "https://www.cms.gov/"
      },
      {
        "label": "Social Security Administration (SSA) - Disability Research",
        "url": "https://www.ssa.gov/disabilityresearch/wi/medicaid.htm"
      },
      {
        "label": "Healthcare.gov - Supplemental Security Income (SSI) Disability & Medicaid covera",
        "url": "https://www.healthcare.gov/people-with-disabilities/ssi-and-medicaid/"
      },
      {
        "label": "Medicaid.gov - Where Can People Get Help With Medicaid & CHIP?",
        "url": "https://www.medicaid.gov/about-us/where-can-people-get-help-medicaid-chip"
      }
    ],
    "common_mistakes": [
      "Failing to report changes promptly: Not reporting changes in income, household size, or other life events can lead to incorrect eligibility determinations, overpayments, or loss of benefits.",
      "Improper asset planning: Giving away assets too early or failing to create properly drafted trusts can jeopardize Medicaid eligibility, especially for long-term care services due to the look-back period.",
      "Not understanding state-specific rules: While Medicaid has federal guidelines, states have flexibility in administering programs, leading to variations in eligibility criteria, covered services, and application processes. Not understanding these state-specific nuances can lead to denial of benefits.",
      "Assuming automatic eligibility: While SSI recipients often qualify for Medicaid automatically, this is not always the case in every state, and some may still need to apply or enroll.",
      "Not understanding overpayment rules: Failing to report and return overpayments within the specified timeframe can lead to penalties or further complications."
    ],
    "related_programs": [
      "Supplemental Security Income (SSI): A federal program that provides monthly income to people with limited income and resources who are aged, blind, or disabled. SSI recipients often automatically qualify for Medicaid.",
      "Medicare: A federal health insurance program for people 65 or older, certain younger people with disabilities, and people with End-Stage Renal Disease. Many individuals with disabilities are dual-eligible for both Medicare and Medicaid, with Medicaid often covering costs not covered by Medicare.",
      "Home and Community-Based Services (HCBS) Waivers: State-specific programs that allow Medicaid funds to be used for long-term services and supports in home and community settings, rather than institutions. These waivers provide services like personal care, case management, and therapies to help indiv",
      "Medicaid Buy-In Programs for Workers with Disabilities: Some states offer programs (e.g., Medicaid for Workers with Disabilities - MAWD) that allow individuals with disabilities to work, earn more money, and still retain their Medicaid coverage, often with higher income and asset limits than traditi"
    ],
    "contact": {
      "phone": "1-800-318-2596",
      "tty": "",
      "website": "https://www.medicaid.gov/",
      "hours": ""
    }
  },
  {
    "id": "medicare-for-disabled-americans",
    "program_name": "Medicare for Disabled Americans",
    "agency": "Centers for Medicare & Medicaid Services (CMS) and Social Security Administration (SSA)",
    "category": "Healthcare",
    "overview": "Medicare is a federal health insurance program primarily for people 65 or older, but it also covers certain younger people with disabilities, End-Stage Renal Disease (ESRD), or Amyotrophic Lateral Sclerosis (ALS). It helps with the cost of health care, but it doesn't cover all medical expenses or the cost of most long-term care.",
    "eligibility": [
      "Under 65 and receiving Social Security Disability benefits for 24 months.",
      "Diagnosed with End-Stage Renal Disease (ESRD) requiring dialysis or kidney transplant.",
      "Diagnosed with Amyotrophic Lateral Sclerosis (ALS) and receiving Social Security benefits (Medicare coverage starts the same month as Social Security benefits).",
      "Must be a U.S. citizen or a legal resident for at least 5 years."
    ],
    "benefits": "Medicare consists of several parts: Part A (Hospital Insurance) covers inpatient hospital stays, skilled nursing facility care, hospice care, and some home health care. Part B (Medical Insurance) covers certain doctors' services, outpatient care, medical supplies, and preventive services. Part C (Medicare Advantage) is an all-in-one alternative to Original Medicare (Parts A and B) offered by private companies approved by Medicare, often including Part D and extra benefits. Part D (Prescription D",
    "how_to_apply": {
      "steps": [
        "If you receive Social Security Disability benefits for 24 months, you will automatically be enrolled in Medicare Part A and Part B. Your Medicare card will be mailed to you 3 months before your coverage starts.",
        "If you have ALS, you will automatically get Medicare the same month your Social Security benefits start.",
        "If you have ESRD, you can apply for Medicare by contacting Social Security or the Railroad Retirement Board.",
        "To apply for Extra Help with prescription drug costs, you can apply online at ssa.gov/medicare/part-d-extra-help, call Social Security at 1-800-772-1213 (TTY 1-800-325-0778), or apply at your local Social Security office.",
        "To apply for a Medicare Savings Program, contact your state's Medicaid office. Social Security will send information to your state to initiate an MSP application unless you opt out on the Extra Help application."
      ],
      "portal_url": "https://www.ssa.gov/medicare/part-d-extra-help",
      "phone": "1-800-772-1213 (SSA)",
      "tty": "1-800-325-0778 (SSA)"
    },
    "how_to_update_info": "To change your official address with Medicare, you must contact the Social Security Administration (SSA). You can update your information through your personal my Social Security account online, or by calling SSA. For other personal information like phone number or email address, you can log into your secure Medicare account. For Extra Help and Medicare Savings Programs, it is crucial to report changes in income, resources, and living situation to the Social Security Administration or your state Medicaid office, respectively, as these changes can affect eligibility and benefit levels. Prompt r",
    "key_rules": [
      "24-month waiting period for Medicare eligibility after receiving Social Security Disability benefits (waived for ALS).",
      "Initial Enrollment Period (IEP) for Medicare generally starts 3 months before turning 65, includes the month of 65th birthday, and ends 3 months after. For disabled individuals, it's tied to their 25th month of disability benefits.",
      "General Enrollment Period (GEP) is from January 1 to March 31 each year, with coverage starting the month after signing up. Late enrollment penalties may apply if not enrolled during IEP or a Special Enrollment Period (SEP).",
      "Special Enrollment Periods (SEPs) allow enrollment outside of IEP/GEP without penalty under specific circumstances (e.g., loss of employer-sponsored health coverage, release from incarceration, loss of Medicaid).",
      "Part A late enrollment penalty: 10% increase for twice the number of years not signed up, if required to buy Part A and didn't enroll when first eligible.",
      "Part B late enrollment penalty: 10% increase for each full 12-month period not signed up, applied for as long as Part B is maintained.",
      "Part D late enrollment penalty: 1% increase for each month without creditable drug coverage, applied for as long as Part D is maintained.",
      "Extra Help recipients can change their drug coverage once a calendar month, effective the first day of the next month.",
      "Medicare Savings Programs (QI program) require annual reapplication.",
      "Overpayments occur when more benefits are received than entitled to. Report changes to SSA promptly to avoid overpayments. Overpayments can be repaid, waived, or appealed. SSA will wait at least 30 days after sending an overpayment notice before collecting."
    ],
    "official_links": [
      {
        "label": "Medicare Official Website",
        "url": "https://www.medicare.gov"
      },
      {
        "label": "Social Security Administration (SSA) Medicare Information",
        "url": "https://www.ssa.gov/medicare"
      },
      {
        "label": "SSA Extra Help Program",
        "url": "https://www.ssa.gov/medicare/part-d-extra-help"
      },
      {
        "label": "Medicare Savings Programs",
        "url": "https://www.medicare.gov/basics/costs/help/medicare-savings-programs"
      },
      {
        "label": "When Does Medicare Coverage Start?",
        "url": "https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start"
      },
      {
        "label": "Avoid Late Enrollment Penalties",
        "url": "https://www.medicare.gov/basics/costs/medicare-costs/avoid-penalties"
      },
      {
        "label": "Resolve an Overpayment (SSA)",
        "url": "https://www.ssa.gov/manage-benefits/resolve-overpayment"
      }
    ],
    "common_mistakes": [
      "Not signing up for Medicare at the right time, leading to late enrollment penalties for Part A, B, and D.",
      "Assuming COBRA or retiree coverage is 'creditable coverage' for delaying Medicare enrollment without penalty (it often is not).",
      "Not reporting changes in income, resources, or living situation to SSA or state Medicaid office, which can lead to overpayments or loss of benefits for Extra Help and MSPs.",
      "Not understanding the differences between Original Medicare and Medicare Advantage, and choosing a plan that doesn't meet their needs.",
      "Not reviewing coverage annually, as healthcare needs and plan options can change."
    ],
    "related_programs": [
      "Medicaid: A joint federal and state program that provides health coverage for certain low-income people, including those with disabilities. Many individuals with disabilities are dually eligible for both Medicare and Medicaid.",
      "Social Security Disability Insurance (SSDI): Provides monthly benefits to people who are unable to work due to a severe medical condition. Eligibility for Medicare for disabled individuals is often tied to receiving SSDI benefits for 24 months.",
      "Supplemental Security Income (SSI): A federal income supplement program funded by general tax revenues (not Social Security taxes) designed to help aged, blind, and disabled people who have little or no income. SSI recipients often automatically qualify for Medicaid and Extra Help."
    ],
    "contact": {
      "phone": "1-800-MEDICARE (1-800-633-4227)",
      "tty": "1-877-486-2048",
      "website": "https://www.medicare.gov/talk-to-someone",
      "hours": "24 hours a day, 7 days a week (except some federal holidays)"
    }
  },
  {
    "id": "section-8-housing-choice-voucher-program",
    "program_name": "Section 8 Housing Choice Voucher Program",
    "agency": "U.S. Department of Housing and Urban Development (HUD)",
    "category": "Housing",
    "overview": "The Section 8 Housing Choice Voucher program assists very low-income families, the elderly, and the disabled to afford decent, safe, and sanitary housing in the private market. Participants are able to find their own housing, including single-family homes, townhouses and apartments and are not limited to units located in subsidized housing projects.",
    "eligibility": [
      "Be a US citizen or eligible non-citizen",
      "Have a family annual income that does not exceed 50% of the median income for the county or metropolitan area in which the family chooses to live",
      "The head of the household must have a valid Social Security number",
      "Certain crimes may make an applicant ineligible"
    ],
    "benefits": "The public housing agency (PHA) pays a housing subsidy directly to the landlord on behalf of the participating family. The family then pays the difference between the actual rent charged by the landlord and the amount subsidized by the program.",
    "how_to_apply": {
      "steps": [
        "Contact your local Public Housing Agency (PHA) to apply for a voucher.",
        "Due to high demand, you may be placed on a waiting list.",
        "You do not need to be a resident of the jurisdiction where you apply.",
        "Documentation needed to apply may vary by PHA, but typically includes income paperwork, other forms of public assistance paperwork, and proof of citizenship and Social Security cards."
      ],
      "portal_url": "https://www.hud.gov/program_offices/public_indian_housing/pha/contacts",
      "phone": "",
      "tty": ""
    },
    "how_to_update_info": "If your income or household members change, you must notify your Public Housing Agency (PHA). For changes due to birth, adoption, or court-awarded custody, simply inform the PHA. However, for adding any other household member, you must receive PHA approval. The PHA will then determine if a change in rent or unit size is required to better reflect your current situation. As part of the program, an annual reexamination is conducted for all voucher participants to ensure continued eligibility. A review of your household income and family composition will be conducted at the time of your scheduled",
    "key_rules": [
      "Report any changes in income or household composition to the PHA.",
      "Comply with the terms of the lease with the property owner.",
      "Allow the PHA to inspect the unit at reasonable times and after reasonable notice.",
      "Do not engage in drug-related or violent criminal activity."
    ],
    "official_links": [
      {
        "label": "HUD Housing Choice Voucher Program",
        "url": "https://www.hud.gov/helping-americans/housing-choice-vouchers-tenants"
      },
      {
        "label": "HUD Public Housing Agency Directory",
        "url": "https://www.hud.gov/program_offices/public_indian_housing/pha/contacts"
      },
      {
        "label": "Section 811 Supportive Housing for Persons with Disabilities",
        "url": "https://www.hudexchange.info/programs/section-811/"
      },
      {
        "label": "HUD Section 811 Portal",
        "url": "https://www.hud.gov/hud-partners/multifamily-grants-section811ptl"
      }
    ],
    "common_mistakes": [
      "Not reporting changes in income or household size.",
      "Failing to respond to PHA requests for information.",
      "Violating the terms of the lease."
    ],
    "related_programs": [
      "Section 811 Supportive Housing for Persons with Disabilities",
      "Public Housing",
      "Low-Income Home Energy Assistance Program (LIHEAP)"
    ],
    "contact": {
      "phone": "(202) 708-1112",
      "tty": "(202) 708-1455",
      "website": "https://www.hud.gov/",
      "hours": "8:00 AM - 5:00 PM ET, Monday - Friday"
    }
  },
  {
    "id": "supplemental-nutrition-assistance-progra",
    "program_name": "Supplemental Nutrition Assistance Program (SNAP)",
    "agency": "U.S. Department of Agriculture (USDA) Food and Nutrition Service (FNS)",
    "category": "Food & Nutrition",
    "overview": "The Supplemental Nutrition Assistance Program (SNAP) provides food benefits to low-income families to supplement their grocery budget, enabling them to afford nutritious food essential for health and well-being. Benefits are issued monthly on an Electronic Benefits Transfer (EBT) card, which can be used to purchase eligible food items.",
    "eligibility": [
      "Must meet state-specific requirements, including income and resource limits.",
      "**Disability Criteria:**\n- Receives federal disability or blindness payments under the Social Security Act (e.g., SSI, Social Security disability/blindness payments).\n- Receives state disability or blindness payments based on SSI rules.\n- Receives a disability retirement benefit from a governmental ",
      "**Resource Limits:**\n- Households may have $3,000 in countable resources (cash, bank accounts) or $4,500 if at least one member is age 60 or older, or is disabled.\n- Excluded resources include: a home and lot, resources of SSI recipients, resources of TANF recipients, and most retirement and pension",
      "**Income Limits (Oct. 1, 2025 - Sept. 30, 2026, for 48 contiguous states, DC, Guam, USVI):**\n- Households with an elderly or disabled person only need to meet the net income test.\n- **Net income:** Gross income minus allowable deductions.\n- **Gross income:** Total, non-excluded income before deducti"
    ],
    "benefits": "Recipients receive a monthly allotment of food benefits on an Electronic Benefits Transfer (EBT) card. The allotment is calculated by multiplying the household's net monthly income by 0.3 and subtracting the result from the maximum monthly allotment for their household size. For example, a 2-person household with $436.50 net monthly income would receive $415 in SNAP benefits ($546 maximum allotment - $131 (30% of net income)).\n\n**Maximum Monthly Allotments (Oct. 1, 2025 - Sept. 30, 2026, for 48 ",
    "how_to_apply": {
      "steps": [
        "Contact your state or local SNAP office.",
        "Depending on your state, you may be able to submit a food stamp application online, in person, by mail, or by fax.",
        "You may need to take part in an interview before being approved for SNAP benefits."
      ],
      "portal_url": "Contact your state agency directly for application portals.",
      "phone": "Contact your state agency directly for phone numbe",
      "tty": "Contact your state agency directly for TTY numbers"
    },
    "how_to_update_info": "Reporting requirements vary by household circumstances. Generally, changes must be reported to your state or local SNAP office. For households under 'Simplified Reporting' rules, changes are usually reported at recertification, except if gross monthly income exceeds 130% of the poverty level (report within 10 days after the end of the month the income went over the limit). For households under 'Change Reporting' rules (e.g., all adults are permanently disabled or 60 or older), the following changes MUST be reported within 10 days after the end of the month in which the change happened: changes",
    "key_rules": [
      "**Reporting Deadlines:** Generally within 10 days after the end of the month the change occurred for certain income and household changes.",
      "**Overpayment Rules:** Failure to report gross income exceeding 130% of the poverty level can lead to overpayments, where benefits received after that month may be recouped.",
      "**Recertification:** Households must recertify before their certification period ends to continue receiving benefits. Periodic Report forms are sent for certification periods longer than 6 months and must be returned within 10 days of receipt."
    ],
    "official_links": [
      {
        "label": "USDA FNS SNAP Homepage",
        "url": "https://www.fns.usda.gov/snap/supplemental-nutrition-assistance-program"
      },
      {
        "label": "USDA FNS SNAP Special Rules for Elderly or Disabled",
        "url": "https://www.fns.usda.gov/snap/eligibility/elderly-disabled-special-rules"
      },
      {
        "label": "USA.gov How to apply for food stamps (SNAP benefits)",
        "url": "https://www.usa.gov/food-stamps"
      },
      {
        "label": "NYC.gov SNAP FAQ (for reporting changes examples)",
        "url": "https://www.nyc.gov/site/hra/help/snap-faq.page"
      }
    ],
    "common_mistakes": [
      "Not reporting income changes, especially when gross income exceeds 130% of the poverty level, which can result in overpayments.",
      "Failing to return Periodic Report forms on time, leading to potential benefit termination.",
      "Not reporting changes in household composition, address, or significant changes in resources (cash, savings, vehicles)."
    ],
    "related_programs": [
      "Supplemental Security Income (SSI)",
      "Temporary Assistance for Needy Families (TANF)",
      "Medicaid"
    ],
    "contact": {
      "phone": "Contact your state or local SNAP office for specif",
      "tty": "Contact your state or local SNAP office for specif",
      "website": "https://www.fns.usda.gov/snap/state-directory",
      "hours": "Varies by state and local office."
    }
  },
  {
    "id": "special-supplemental-nutrition-program-f",
    "program_name": "Special Supplemental Nutrition Program for Women, Infants, and Children (WIC)",
    "agency": "U.S. Department of Agriculture (USDA) Food and Nutrition Service (FNS)",
    "category": "Food & Nutrition",
    "overview": "WIC provides healthy foods, personalized nutrition education, breastfeeding support, and referrals to other services to support pregnant women, new mothers, infants, and children up to age 5. The program aims to safeguard the health of low-income women, infants, and children.",
    "eligibility": [
      "**Categorical Eligibility:** Pregnant, breastfeeding (up to one year postpartum), non-breastfeeding postpartum (up to six months postpartum), infants (up to 1st birthday), or children (up to 5th birthday).",
      "**Residency:** Must live in the state where they apply.",
      "**Income Eligibility:** Must meet income guidelines set by their state, typically at or below 185% of the U.S. Poverty Income Guidelines. Individuals receiving SNAP, Medicaid, or TANF are automatically income-eligible.",
      "**Nutritional Risk:** A health professional must determine that the applicant is at nutritional risk (medically-based or diet-based).",
      "**Disability Note:** While WIC does not have specific disability criteria like SNAP, individuals with disabilities who meet the categorical, residency, income, and nutritional risk requirements are eligible. The nutritional risk assessment may identify health conditions related to disability that qu"
    ],
    "benefits": "Recipients receive minimally processed healthy foods, personalized nutrition education, breastfeeding support, and referrals to other services. Benefits are provided via an eWIC card, which functions like a debit card at WIC-approved grocery stores and farmers\u2019 markets. Healthy foods include fresh fruits and vegetables, baby food, milk, eggs, beans, cheese, and more, all at no cost. Breastfeeding support includes one-on-one sessions with staff. Nutrition education offers personalized tips on hea",
    "how_to_apply": {
      "steps": [
        "Contact a WIC agency in your area to start the application process by phone or online.",
        "The agency will work with you to determine eligibility."
      ],
      "portal_url": "Contact your state WIC agency directly for application portals.",
      "phone": "Contact your state WIC agency directly for phone n",
      "tty": "Contact your state WIC agency directly for TTY num"
    },
    "how_to_update_info": "Information on updating changes for WIC is typically handled through your local WIC clinic. Contact your local WIC clinic directly for guidance on reporting changes in income, household size, address, or other life events.",
    "key_rules": [
      "**Certification Periods:** WIC benefits are provided for specific certification periods, after which re-application and re-assessment of eligibility are required.",
      "**Food Package:** WIC provides a specific food package tailored to the nutritional needs of the participant category (e.g., pregnant women, infants, children).",
      "**Authorized Stores:** Benefits can only be used at WIC-authorized grocery stores and farmers\u2019 markets."
    ],
    "official_links": [
      {
        "label": "USDA FNS WIC Homepage",
        "url": "https://www.fns.usda.gov/wic"
      },
      {
        "label": "USDA FNS WIC Eligibility",
        "url": "https://www.fns.usda.gov/wic/eligibility"
      },
      {
        "label": "USDA FNS How to Apply for WIC",
        "url": "https://www.fns.usda.gov/wic/apply"
      },
      {
        "label": "USA.gov Get food assistance with the WIC program",
        "url": "https://www.usa.gov/food-assistance"
      }
    ],
    "common_mistakes": [
      "Not understanding the specific food items covered by the WIC food package.",
      "Failing to attend required nutrition education or health appointments, which can lead to temporary suspension of benefits.",
      "Not reporting changes in residency or income that could affect eligibility."
    ],
    "related_programs": [
      "Medicaid",
      "Supplemental Nutrition Assistance Program (SNAP)",
      "Temporary Assistance for Needy Families (TANF)"
    ],
    "contact": {
      "phone": "Contact your state or local WIC agency for specifi",
      "tty": "Contact your state or local WIC agency for specifi",
      "website": "https://www.fns.usda.gov/wic/state-directory",
      "hours": "Varies by state and local agency."
    }
  },
  {
    "id": "food-banks-via-feeding-america-network",
    "program_name": "Food Banks (via Feeding America Network)",
    "agency": "Non-governmental organizations (e.g., Feeding America, local food banks)",
    "category": "Food & Nutrition",
    "overview": "Food banks are non-profit organizations that collect and distribute food to hunger-relief charities, such as food pantries, soup kitchens, and shelters. They work to rescue food from various sources and provide it to individuals and families facing food insecurity, including those with disabilities.",
    "eligibility": [
      "Eligibility typically depends on household income levels, often set at a percentage of the federal poverty level (e.g., 200% or less).",
      "Some food banks may also consider individuals who are unemployed or receiving government assistance.",
      "Specific criteria vary by local food bank.",
      "**Disability Note:** There are no specific disability criteria; however, disability may contribute to meeting income-based eligibility."
    ],
    "benefits": "Recipients receive groceries, meals, and other food items. The types and quantities of food available depend on the specific food bank and its donations. Services may also include referrals to other assistance programs.",
    "how_to_apply": {
      "steps": [
        "Find a local food bank using the Feeding America website (feedingamerica.org/find-your-local-foodbank) to locate nearby food banks by entering your ZIP code.",
        "Contact the identified local food bank or pantry to inquire about their specific distribution schedules, eligibility requirements, and application process.",
        "Some may require a brief intake form or proof of residency/income."
      ],
      "portal_url": "https://www.feedingamerica.org/find-your-local-foodbank",
      "phone": "Varies by local food bank.",
      "tty": "Varies by local food bank."
    },
    "how_to_update_info": "Contact your local food bank directly for guidance on reporting changes in income, household size, or address. Policies for reporting changes vary by organization.",
    "key_rules": [
      "**Distribution Schedules:** Food distribution typically follows a set schedule (e.g., weekly, bi-weekly, monthly) determined by the local food bank.",
      "**Proof of Need:** Some food banks may require proof of residency, income, or household size.",
      "**Usage Limits:** There may be limits on how often individuals can receive food assistance from a particular food bank."
    ],
    "official_links": [
      {
        "label": "Feeding America Homepage",
        "url": "https://www.feedingamerica.org/"
      },
      {
        "label": "Feeding America Find a Food Bank",
        "url": "https://www.feedingamerica.org/find-your-local-foodbank"
      },
      {
        "label": "USDA FNS The Emergency Food Assistance Program (TEFAP)",
        "url": "https://www.fns.usda.gov/tefap/emergency-food-assistance-program"
      }
    ],
    "common_mistakes": [
      "Not checking the operating hours and distribution schedule of the local food bank before visiting.",
      "Failing to bring necessary identification or proof of residency/income if required.",
      "Not inquiring about specific food items or dietary restrictions that the food bank may be able to accommodate."
    ],
    "related_programs": [
      "The Emergency Food Assistance Program (TEFAP)",
      "Supplemental Nutrition Assistance Program (SNAP)",
      "Special Supplemental Nutrition Program for Women, Infants, and Children (WIC)"
    ],
    "contact": {
      "phone": "1-800-771-2303 (Feeding America National Organizat",
      "tty": "Contact local food bank for TTY numbers.",
      "website": "https://www.feedingamerica.org/",
      "hours": "Varies by local food bank."
    }
  },
  {
    "id": "meals-on-wheels",
    "program_name": "Meals on Wheels",
    "agency": "Meals on Wheels America (National organization) and local community-based programs",
    "category": "Food & Nutrition",
    "overview": "Meals on Wheels is a nationwide network of community-based programs that provides nutritious meals, friendly visits, and safety checks to homebound seniors and other eligible individuals, including disabled adults. The program aims to combat hunger and isolation, helping recipients maintain their independence and well-being.",
    "eligibility": [
      "**Age:** Typically 60 years of age or older, but some programs also serve younger disabled adults (e.g., 18-59 years old).",
      "**Homebound Status:** Individuals must be homebound, meaning they are generally unable to leave their home unassisted, or have difficulty preparing their own meals due to physical or mental impairments.",
      "**Inability to Prepare Meals:** Unable to prepare their own meals or lack family/other resources to help with meal preparation.",
      "**Residency:** Must reside within the service area of the local Meals on Wheels program.",
      "**Income Guidelines:** While many programs are not strictly income-based, some may have income guidelines or offer meals on a sliding scale fee. Federal funding often targets low-income individuals.",
      "**Disability Note:** Many local programs specifically serve disabled adults who meet the homebound and inability-to-prepare-meals criteria, regardless of age."
    ],
    "benefits": "Recipients typically receive one hot meal per day, often five days a week, delivered to their home. Some programs may offer frozen meals for weekends or holidays. Friendly visits from volunteers provide social connection and a brief safety check. Delivery personnel can act as a safety net, reporting any concerns about the recipient's well-being to family or emergency contacts. Some programs may also offer referrals to other supportive services.",
    "how_to_apply": {
      "steps": [
        "Find a local provider using the Meals on Wheels America website (https://www.mealsonwheelsamerica.org/find-meals-and-services/) by entering your ZIP code.",
        "Contact the identified local Meals on Wheels provider to inquire about their specific eligibility requirements, application process, and meal delivery options.",
        "Complete an application and undergo an in-home assessment to determine eligibility and specific needs."
      ],
      "portal_url": "https://www.mealsonwheelsamerica.org/find-meals-and-services/",
      "phone": "Varies by local program.",
      "tty": "Varies by local program."
    },
    "how_to_update_info": "To report changes in income, address, health status, or other life events, recipients should contact their local Meals on Wheels provider directly. Policies for reporting changes and how they might affect services vary by program.",
    "key_rules": [
      "**Program-Specific Rules:** Each local Meals on Wheels program operates with its own set of rules and guidelines regarding meal delivery schedules, cancellations, and payment (if applicable).",
      "**Assessment/Reassessment:** Periodic assessments may be conducted to ensure continued eligibility and to adjust services as needed.",
      "**Cancellation Policy:** Recipients are usually required to notify the program in advance if they will not be home to receive a meal."
    ],
    "official_links": [
      {
        "label": "Meals on Wheels America Homepage",
        "url": "https://www.mealsonwheelsamerica.org/"
      },
      {
        "label": "Meals on Wheels America Find Meals and Services",
        "url": "https://www.mealsonwheelsamerica.org/find-meals-and-services/"
      },
      {
        "label": "Meals on Wheels America Fact Sheet",
        "url": "https://www.mealsonwheelsamerica.org/learn-more/what-we-deliver"
      },
      {
        "label": "CareLink: Qualifying for Meals on Wheels",
        "url": "https://www.carelink.org/qualifying-for-meals-on-wheels-who-can-get-it/"
      }
    ],
    "common_mistakes": [
      "Not contacting the local program directly: Eligibility and services vary, so direct contact is crucial.",
      "Failing to report changes: Changes in health, address, or ability to prepare meals should be reported promptly.",
      "Missing deliveries without notice: This can lead to meals being wasted or services being temporarily suspended."
    ],
    "related_programs": [
      "Senior Centers (often provide congregate meals and social activities)",
      "Adult Day Care Services (may include meal services for participants)",
      "Home Care Services (can include assistance with meal preparation)"
    ],
    "contact": {
      "phone": "1-888-998-6325 (Meals on Wheels America National O",
      "tty": "Contact local program for TTY numbers.",
      "website": "https://www.mealsonwheelsamerica.org/",
      "hours": "Varies by local program."
    }
  },
  {
    "id": "vocational-rehabilitation-vr-services",
    "program_name": "Vocational Rehabilitation (VR) Services",
    "agency": "State Vocational Rehabilitation (VR) Agencies (funded by the U.S. Department of Education)",
    "category": "Employment",
    "overview": "The State Vocational Rehabilitation (VR) Services Program provides grants to states to operate statewide VR programs. These programs assist individuals with disabilities to prepare for, obtain, and maintain employment, helping them to achieve economic self-sufficiency. The program is authorized by the Rehabilitation Act of 1973, as amended by the Workforce Innovation and Opportunity Act (WIOA).",
    "eligibility": [
      "Must have a physical or mental impairment that results in a substantial impediment to employment.",
      "Must require VR services to prepare for, secure, retain, or regain employment.",
      "Each state has its own specific eligibility requirements, so it is important to check with your state's VR agency."
    ],
    "benefits": "Services are tailored to the individual's needs and can include: vocational counseling and guidance, job search and placement assistance, job training and education, assistive technology, and supported employment services.",
    "how_to_apply": {
      "steps": [
        "Locate your state VR agency using the directory provided by the Rehabilitation Services Administration (RSA).",
        "Contact your state VR agency to request an application.",
        "Complete and submit the application, along with any required documentation.",
        "Participate in an eligibility determination process, which may include assessments and interviews.",
        "If found eligible, work with a VR counselor to develop an Individualized Plan for Employment (IPE)."
      ],
      "portal_url": "https://rsa.ed.gov/about/states",
      "phone": "Varies by state. See the directory at the portal U",
      "tty": "Varies by state. See the directory at the portal U"
    },
    "how_to_update_info": "To update your information, such as a change in address, income, or other life circumstances, you must contact your assigned vocational rehabilitation counselor at your state VR agency directly. They will provide you with the necessary forms and instructions for reporting these changes. It is important to report any changes in a timely manner to ensure you continue to receive the appropriate services and support.",
    "key_rules": [
      "You must actively participate in developing and following your Individualized Plan for Employment (IPE).",
      "You must make satisfactory progress towards your employment goals.",
      "If your case is closed, you may be able to reapply for services in the future if your circumstances change."
    ],
    "official_links": [
      {
        "label": "Rehabilitation Services Administration (RSA)",
        "url": "https://rsa.ed.gov/"
      },
      {
        "label": "List of State VR Agencies",
        "url": "https://rsa.ed.gov/about/states"
      },
      {
        "label": "CareerOneStop: Workers with Disabilities",
        "url": "https://www.careeronestop.org/ResourcesFor/WorkersWithDisabilities/default.aspx"
      },
      {
        "label": "Job Accommodation Network (JAN)",
        "url": "https://askjan.org/"
      },
      {
        "label": "U.S. Department of Labor: Disability Resources",
        "url": "https://www.dol.gov/general/topic/disability"
      }
    ],
    "common_mistakes": [
      "Not providing complete and accurate information on your application.",
      "Not actively participating in the development of your Individualized Plan for Employment (IPE).",
      "Not communicating regularly with your VR counselor about your progress and any challenges you are facing."
    ],
    "related_programs": [
      "Ticket to Work Program",
      "Supported Employment",
      "Centers for Independent Living (CILs)"
    ],
    "contact": {
      "phone": "Varies by state. See the directory at https://rsa.",
      "tty": "Varies by state. See the directory at https://rsa.",
      "website": "https://rsa.ed.gov/about/states",
      "hours": "Varies by state."
    }
  },
  {
    "id": "able-account",
    "program_name": "ABLE Account",
    "agency": "Internal Revenue Service (IRS) / State-run programs",
    "category": "Financial Tools",
    "overview": "An ABLE account is a tax-advantaged savings account for individuals with disabilities and their families. The money in an ABLE account can be used for qualified disability-related expenses, such as education, housing, and transportation, without affecting eligibility for most federally funded, needs-based benefits.",
    "eligibility": [
      "Disability with an onset before age 46.",
      "Receiving Supplemental Security Income (SSI) or Social Security Disability Insurance (SSDI) benefits, OR",
      "Have a signed diagnosis from a licensed physician of a \"marked and severe\" functional limitation that began before age 46."
    ],
    "benefits": "Tax-free growth on investments and withdrawals for qualified disability expenses. Savings up to $100,000 are excluded from the SSI resource limit. ABLE account funds do not affect eligibility for other federal means-tested benefits like Medicaid or SNAP.",
    "how_to_apply": {
      "steps": [
        "Choose an ABLE program. Many states offer their own, but you can typically enroll in any state's program.",
        "Gather personal information (name, address, date of birth, Social Security number) and bank account information for the initial deposit.",
        "Complete the online application for the chosen ABLE program."
      ],
      "portal_url": "https://www.ablenrc.org/select-a-state-program/",
      "phone": "N/A",
      "tty": "N/A"
    },
    "how_to_update_info": "To update your information, you will need to log in to your ABLE account portal on the website of the specific state program you are enrolled in. From there, you should be able to navigate to your account settings or profile to update your personal information, such as your address, income, or life events. Each state program will have its own specific process, so it is best to consult the FAQ or contact customer service for your specific ABLE plan.",
    "key_rules": [
      "Annual contribution limit is subject to change. For 2026, the limit is $18,000 for most individuals.",
      "If the ABLE account beneficiary works, they may be able to contribute more than the annual limit.",
      "Funds can only be used for Qualified Disability Expenses (QDEs).",
      "Upon the death of the beneficiary, the state Medicaid agency may file a claim for reimbursement for Medicaid services received after the creation of the ABLE account."
    ],
    "official_links": [
      {
        "label": "ABLE National Resource Center",
        "url": "https://www.ablenrc.org/"
      },
      {
        "label": "IRS - ABLE Accounts",
        "url": "https://www.irs.gov/government-entities/federal-state-local-governments/able-accounts"
      },
      {
        "label": "Social Security Administration - Spotlight on ABLE",
        "url": "https://www.ssa.gov/ssi/spotlights/spot-able.html"
      },
      {
        "label": "Compare State ABLE Programs",
        "url": "https://www.ablenrc.org/compare-states/"
      },
      {
        "label": "ABLE NRC - Frequently Asked Questions",
        "url": "https://www.ablenrc.org/what-is-able/able-acount-faqs/"
      }
    ],
    "common_mistakes": [
      "Not understanding the rules around Qualified Disability Expenses (QDEs).",
      "Exceeding the annual contribution limit.",
      "Not being aware of the Medicaid payback provision."
    ],
    "related_programs": [
      "Supplemental Security Income (SSI)",
      "Social Security Disability Insurance (SSDI)",
      "Special Needs Trusts (SNTs)"
    ],
    "contact": {
      "phone": "N/A",
      "tty": "N/A",
      "website": "https://www.ablenrc.org/contact/",
      "hours": "N/A"
    }
  },
  {
    "id": "plan-to-achieve-self-support-pass",
    "program_name": "Plan to Achieve Self-Support (PASS)",
    "agency": "Social Security Administration (SSA)",
    "category": "Financial Tools",
    "overview": "A PASS is a written plan that allows individuals with disabilities or blindness to set aside income or resources, other than their Supplemental Security Income (SSI), to achieve a specific work goal. This allows them to pay for items or services needed to reach their goal without affecting their SSI eligibility or payment amount.",
    "eligibility": [
      "Be disabled or blind.",
      "Be eligible for SSI based on disability, or could be eligible if not for income/assets.",
      "Already be eligible for SSI and have income that reduces the amount of SSI received.",
      "Using a PASS to reach an employment goal will ultimately help reduce or eliminate benefits from SSI, Social Security, or both."
    ],
    "benefits": "Allows individuals to set aside income and resources to pay for expenses related to achieving a work goal (e.g., education, training, transportation, child care, assistive technology) without these funds being counted against SSI eligibility. This can increase SSI payments.",
    "how_to_apply": {
      "steps": [
        "Develop a written plan outlining your work goal, the steps to achieve it, the items/services needed, the money to be used, and a timetable.",
        "Obtain Form SSA-545-BK, 'Plan To Achieve Self-Support,' from a local Social Security office or online.",
        "Submit the completed PASS application to the Social Security Administration for approval. Assistance in writing a PASS is available from vocational counselors, relatives, or SSA staff."
      ],
      "portal_url": "https://www.ssa.gov/online/ssa-545.html",
      "phone": "1-800-772-1213",
      "tty": "1-800-325-0778"
    },
    "how_to_update_info": "Information updates, such as changes to income, address, household composition, or life events, should be reported to the Social Security Administration promptly. It is crucial to contact your local Social Security office or call the national toll-free number to ensure that your PASS remains accurate and that your benefits are not affected. Specific procedures for updating information within an approved PASS should be discussed with your assigned PASS specialist.",
    "key_rules": [
      "The plan must be in writing and approved by the SSA.",
      "Funds set aside must be used for expenses directly related to achieving a specific work goal.",
      "Regular reporting and review of progress towards the work goal are required.",
      "Failure to follow the approved plan or use funds for non-approved expenses can result in the termination of the PASS and potential overpayments."
    ],
    "official_links": [
      {
        "label": "SSI Spotlight on Plans to Achieve Self-Support",
        "url": "https://www.ssa.gov/ssi/spotlights/spot-plans-self-support.htm"
      },
      {
        "label": "Form SSA-545-BK, Plan To Achieve Self-Support",
        "url": "https://www.ssa.gov/online/ssa-545.html"
      },
      {
        "label": "Social Security Administration Home Page",
        "url": "https://www.ssa.gov"
      },
      {
        "label": "Working While Disabled \u2013 How We Can Help (SSA Publication No. 05-10095)",
        "url": "https://www.ssa.gov/pubs/EN-05-10095.pdf"
      },
      {
        "label": "PASS Cadre Contact Information",
        "url": "https://www.ssa.gov/disabilityresearch/wi/passcadre.htm"
      }
    ],
    "common_mistakes": [
      "Not clearly defining a realistic work goal.",
      "Failing to keep accurate records of expenses and progress.",
      "Using PASS funds for non-approved expenses.",
      "Not reporting changes in income or circumstances to the SSA."
    ],
    "related_programs": [
      "Supplemental Security Income (SSI)",
      "Social Security Disability Insurance (SSDI)",
      "Ticket to Work Program"
    ],
    "contact": {
      "phone": "1-800-772-1213",
      "tty": "1-800-325-0778",
      "website": "https://www.ssa.gov",
      "hours": "Monday through Friday, 8 a.m. to 7 p.m."
    }
  },
  {
    "id": "low-income-home-energy-assistance-progra",
    "program_name": "Low Income Home Energy Assistance Program (LIHEAP)",
    "agency": "U.S. Department of Health and Human Services (HHS), Administration for Children and Families (ACF), ",
    "category": "Financial Tools",
    "overview": "LIHEAP is a federally funded program that helps low-income households with their home energy costs. It provides assistance to reduce heating and cooling bills, prevent energy crises, and offers weatherization and minor energy-related home repairs to ensure safe and healthy living conditions.",
    "eligibility": [
      "Eligibility is based on household income, which must be at or below 150% of the federal poverty guidelines or 60% of the state median income, whichever is greater.",
      "Households with at least one member receiving certain federal benefits (e.g., SNAP, SSI, TANF) may be automatically eligible.",
      "Specific criteria, including household size and income limits, vary by state and local administering agencies."
    ],
    "benefits": "Assistance with heating and cooling costs, energy crisis intervention (e.g., preventing utility shut-offs, reconnecting services), weatherization services to improve energy efficiency, and minor energy-related home repairs. Benefit amounts vary based on income, household size, energy costs, and other factors.",
    "how_to_apply": {
      "steps": [
        "Visit Energyhelp.us or contact the National Energy Assistance Referral (NEAR) number to find your local LIHEAP office or administering agency.",
        "Gather necessary documentation, which typically includes proof of income, household size, and energy bills.",
        "Complete the application form provided by your state or local agency and submit it according to their instructions."
      ],
      "portal_url": "https://energyhelp.us",
      "phone": "1-866-674-6327 (National Energy Assistance Referra",
      "tty": "N/A (Contact local agency for TTY services)"
    },
    "how_to_update_info": "Recipients should report any changes in household income, size, or address to their local LIHEAP administering agency as soon as possible. This ensures that their eligibility and benefit levels are accurately assessed. Specific reporting procedures and deadlines will be provided by the local agency during the application process or upon request.",
    "key_rules": [
      "Eligibility and benefit levels are determined by state and local agencies based on federal guidelines.",
      "Funds are typically provided directly to utility companies or fuel vendors on behalf of eligible households.",
      "Assistance is generally available once per heating or cooling season, but crisis assistance may be available more frequently.",
      "LIHEAP does not provide direct grants to individuals, and there is no fee for receiving benefits. Beware of scams."
    ],
    "official_links": [
      {
        "label": "ACF - LIHEAP Program Page",
        "url": "https://acf.gov/ocs/programs/liheap"
      },
      {
        "label": "Energyhelp.us - Find Energy Assistance",
        "url": "https://energyhelp.us"
      },
      {
        "label": "USA.gov - Get help with energy bills",
        "url": "https://www.usa.gov/help-with-energy-bills"
      },
      {
        "label": "LIHEAP Clearinghouse - Eligibility Tool",
        "url": "https://liheapch.acf.gov/eligibility-tool"
      },
      {
        "label": "LIHEAP Data Dashboard",
        "url": "https://liheapch.acf.gov/data-dashboard"
      }
    ],
    "common_mistakes": [
      "Failing to apply during the designated application period.",
      "Not providing all required documentation, leading to delays or denial.",
      "Not reporting changes in income or household size, which can result in overpayments or loss of benefits.",
      "Falling victim to scams that promise direct LIHEAP grants for a fee."
    ],
    "related_programs": [
      "Low Income Household Water Assistance Program (LIHWAP)",
      "Weatherization Assistance Program (WAP)",
      "Supplemental Nutrition Assistance Program (SNAP)"
    ],
    "contact": {
      "phone": "1-866-674-6327 (National Energy Assistance Referra",
      "tty": "N/A (Contact local agency)",
      "website": "https://energyhelp.us",
      "hours": "N/A"
    }
  },
  {
    "id": "general-utility-assistance-programs",
    "program_name": "General Utility Assistance Programs",
    "agency": "Various State and Local Agencies, Non-profits, and Utility Companies (Federally supported by program",
    "category": "Financial Tools",
    "overview": "General Utility Assistance Programs encompass a range of state, local, and private initiatives designed to help low-income individuals and families, including those with disabilities, manage or pay for essential utility services such as electricity, gas, water, and sometimes internet or phone. These programs aim to prevent service disconnections and ensure access to basic necessities.",
    "eligibility": [
      "Income-based: Typically, household income must be at or below a certain percentage of the federal poverty level or state median income (e.g., 150% FPL).",
      "Household size: Eligibility and benefit amounts often depend on the number of people in the household.",
      "Disability status: Some state or local programs may offer specific considerations or enhanced benefits for individuals with disabilities.",
      "Residency: Applicants must typically reside in the service area of the program.",
      "Crisis situations: Emergency assistance may be available for households facing utility shut-off or in a crisis."
    ],
    "benefits": "Benefits vary widely but can include direct financial payments to utility providers, bill credits, arrearage management, energy conservation education, and weatherization services. The amount of assistance depends on the program, household need, and available funding.",
    "how_to_apply": {
      "steps": [
        "Identify local programs: Contact your state or local social services agency, 211 (a national helpline), or your utility providers directly to inquire about available assistance programs.",
        "Gather documentation: Prepare proof of income, household size, residency, and recent utility bills.",
        "Complete application: Fill out the application form for the specific program(s) you are applying to. Some applications may be online, while others require in-person submission."
      ],
      "portal_url": "https://www.usa.gov/help-with-energy-bills",
      "phone": "211 (for local social services referrals)",
      "tty": "N/A (Contact local agencies for TTY services)"
    },
    "how_to_update_info": "Changes in income, household composition, or address should be reported to the specific utility assistance program(s) you are enrolled in. Each program will have its own reporting requirements and deadlines. Failure to report changes accurately and timely could affect eligibility or benefit amounts.",
    "key_rules": [
      "Eligibility criteria and benefit levels are determined by individual state and local programs.",
      "Assistance is often provided on a seasonal basis or for crisis situations.",
      "Funds are typically paid directly to utility companies.",
      "Some programs may have specific requirements regarding energy conservation or participation in related services."
    ],
    "official_links": [
      {
        "label": "USA.gov - Get help with energy bills",
        "url": "https://www.usa.gov/help-with-energy-bills"
      },
      {
        "label": "211.org - Find Help",
        "url": "http://www.211.org/get-help"
      },
      {
        "label": "National Energy Assistance Referral (NEAR)",
        "url": "https://energyhelp.us"
      },
      {
        "label": "Low Income Home Energy Assistance Program (LIHEAP)",
        "url": "https://acf.gov/ocs/programs/liheap"
      },
      {
        "label": "Low Income Household Water Assistance Program (LIHWAP)",
        "url": "https://www.acf.hhs.gov/ocs/programs/lihwap"
      }
    ],
    "common_mistakes": [
      "Waiting until a utility shut-off notice is received before seeking help.",
      "Not providing all required documentation, leading to delays.",
      "Failing to follow up on applications or provide additional requested information.",
      "Not being aware of state-specific programs or utility company-sponsored assistance."
    ],
    "related_programs": [
      "Low Income Home Energy Assistance Program (LIHEAP)",
      "Low Income Household Water Assistance Program (LIHWAP)",
      "Weatherization Assistance Program (WAP)",
      "Emergency Rental Assistance Program (ERAP)"
    ],
    "contact": {
      "phone": "211 (for local referrals)",
      "tty": "N/A (Contact local agencies)",
      "website": "https://www.usa.gov/help-with-energy-bills",
      "hours": "Varies by local agency"
    }
  },
  {
    "id": "ryan-white-hiv/aids-program",
    "program_name": "Ryan White HIV/AIDS Program",
    "agency": "Health Resources and Services Administration (HRSA) HIV/AIDS Bureau (HAB)",
    "category": "Healthcare",
    "overview": "The Ryan White HIV/AIDS Program (RWHAP) provides a comprehensive system of HIV primary medical care, medications, and essential support services for low-income people with HIV. It funds cities, counties, states, and local community-based organizations to deliver these services.",
    "eligibility": [
      "Diagnosed with HIV or AIDS",
      "Low income (based on where you live)",
      "No health insurance or insufficient insurance to cover needed care"
    ],
    "benefits": "Recipients receive medical care, medications (through programs like ADAP), and a wide range of support services including case management, mental health services, substance abuse outpatient care, housing assistance, legal services, and medical transportation.",
    "how_to_apply": {
      "steps": [
        "Use the Ryan White HIV/AIDS Program Medical Provider tool to search for HIV care and support services in your area.",
        "Call your state HIV/AIDS toll-free phone number to find services near you.",
        "Complete the Common Patient Assistance Program Application (HIV) to apply for medicines at little or no cost."
      ],
      "portal_url": "https://ryanwhite.hrsa.gov/hiv-care/services",
      "phone": "1-877-464-4772",
      "tty": "1-877-897-9910"
    },
    "how_to_update_info": "Specific procedures for individual recipients to update information such as income changes, address changes, household changes, or life events are generally managed through local service providers and clinics funded by the RWHAP. Beneficiaries should contact their case manager or local service provider directly to report any changes.",
    "key_rules": [
      "Eligibility is based on HIV/AIDS diagnosis, income level, and insurance status.",
      "Program requirements and specific deadlines for beneficiaries vary by local service provider and the specific RWHAP part.",
      "Grantees (cities, states, organizations) have specific reporting deadlines, such as for the Ryan White Services Report (RSR)."
    ],
    "official_links": [
      {
        "label": "Ryan White HIV/AIDS Program Home",
        "url": "https://ryanwhite.hrsa.gov/"
      },
      {
        "label": "Program Parts and Initiatives",
        "url": "https://ryanwhite.hrsa.gov/about/parts-and-initiatives"
      },
      {
        "label": "Available Care and Services",
        "url": "https://ryanwhite.hrsa.gov/hiv-care/services"
      },
      {
        "label": "HIV.gov Ryan White",
        "url": "https://www.hiv.gov/topics/ryanwhite"
      },
      {
        "label": "HRSA Contact",
        "url": "https://www.hrsa.gov/about/contact"
      },
      {
        "label": "State HIV/AIDS Hotlines",
        "url": "https://ryanwhite.hrsa.gov/hiv-care/hotlines"
      },
      {
        "label": "Recipient Resources",
        "url": "https://ryanwhite.hrsa.gov/about/recipient-resources"
      }
    ],
    "common_mistakes": [
      "Not reporting changes in income or insurance status to local service providers, which can affect eligibility.",
      "Failing to complete annual re-certification or required documentation.",
      "Not utilizing case management services to navigate available benefits and resources."
    ],
    "related_programs": [
      "AIDS Drug Assistance Program (ADAP)",
      "Medicaid",
      "ACA Marketplace plans"
    ],
    "contact": {
      "phone": "1-877-464-4772",
      "tty": "1-877-897-9910",
      "website": "https://ryanwhite.hrsa.gov/",
      "hours": "M - F | 8 a.m. - 8 p.m. ET (except holidays)"
    }
  },
  {
    "id": "americans-with-disabilities-act-ada",
    "program_name": "Americans with Disabilities Act (ADA)",
    "agency": "U.S. Department of Justice, Civil Rights Division",
    "category": "Legal Rights",
    "overview": "The Americans with Disabilities Act (ADA) is a comprehensive civil rights law that prohibits discrimination against individuals with disabilities in all areas of public life, including jobs, schools, transportation, and all public and private places that are open to the general public. The purpose of the law is to make sure that people with disabilities have the same rights and opportunities as everyone else. The ADA is divided into five titles (or sections) that relate to different areas of pub",
    "eligibility": [
      "An individual with a disability is defined by the ADA as a person who has a physical or mental impairment that substantially limits one or more major life activities, a person who has a history or record of such an impairment, or a person who is perceived by others as having such an impairment.",
      "The ADA does not specifically name all of the impairments that are covered."
    ],
    "benefits": "The ADA guarantees equal opportunity for individuals with disabilities in public accommodations, employment, transportation, state and local government services, and telecommunications. This includes protection from discrimination, requirements for reasonable accommodations in the workplace, and accessible design standards for new construction and alterations.",
    "how_to_apply": {
      "steps": [
        "If you believe you have been discriminated against on the basis of disability, you can file a complaint with the Department of Justice.",
        "Complaints can be filed online using the form on the ADA.gov website.",
        "The complaint will be reviewed by the Disability Rights Section of the Civil Rights Division.",
        "Possible outcomes include mediation, investigation, or referral to another agency."
      ],
      "portal_url": "https://www.ada.gov/file-a-complaint/",
      "phone": "800-514-0301",
      "tty": "1-833-610-1264"
    },
    "how_to_update_info": "The ADA is a civil rights law and not a benefits program, so there is no need to update personal information such as income or address. If you have an ongoing complaint or case, you should update your contact information with the relevant agency handling your case.",
    "key_rules": [
      "The ADA requires employers with 15 or more employees to provide reasonable accommodations for qualified applicants and employees with disabilities.",
      "Public accommodations (businesses and non-profit organizations that are public-facing) must comply with basic nondiscrimination requirements that prohibit exclusion, segregation, and unequal treatment.",
      "State and local governments are required to follow Title II of the ADA, which prohibits discrimination against qualified individuals with disabilities in all programs, activities, and services of public entities."
    ],
    "official_links": [
      {
        "label": "ADA.gov Home",
        "url": "https://www.ada.gov/"
      },
      {
        "label": "Introduction to the Americans with Disabilities Act",
        "url": "https://www.ada.gov/topics/intro-to-ada/"
      },
      {
        "label": "File a Complaint",
        "url": "https://www.ada.gov/file-a-complaint/"
      },
      {
        "label": "ADA Information Line",
        "url": "https://www.ada.gov/contact-us/"
      },
      {
        "label": "U.S. Equal Employment Opportunity Commission (EEOC)",
        "url": "https://www.eeoc.gov/"
      },
      {
        "label": "National Disability Rights Network",
        "url": "https://www.ndrn.org/"
      }
    ],
    "common_mistakes": [
      "Not understanding that the ADA applies to private businesses, not just government entities.",
      "Failing to request a reasonable accommodation in the workplace.",
      "Assuming that all disabilities are visible."
    ],
    "related_programs": [
      "Rehabilitation Act of 1973",
      "Fair Housing Act",
      "Individuals with Disabilities Education Act (IDEA)"
    ],
    "contact": {
      "phone": "800-514-0301",
      "tty": "1-833-610-1264",
      "website": "https://www.ada.gov/",
      "hours": "Monday-Friday"
    }
  }
];

export const TOTAL_SOCIAL_PROGRAMS = 16;
