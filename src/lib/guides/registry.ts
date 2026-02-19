import { ComponentType } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface GuideSource {
  title: string;
  url: string;
  publisher: string;
}

export type GuideCategory =
  | "settlement-basics"
  | "negotiation"
  | "valuation"
  | "state-rules";

export interface GuideHeading {
  id: string;
  text: string;
  level: number;
}

export interface GuideRegistryEntry {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  published: string;
  modified: string;
  category: GuideCategory;
  readingTimeMinutes: number;
  faqs: GuideFAQ[];
  sources: GuideSource[];
  keywords: string[];
  component: () => Promise<{
    default: ComponentType;
    headings: GuideHeading[];
  }>;
}

/* ------------------------------------------------------------------ */
/*  Registry                                                           */
/* ------------------------------------------------------------------ */

const GUIDES: GuideRegistryEntry[] = [
  /* ---- 1 ---- */
  {
    slug: "total-loss-settlement-amount",
    title: "How Much Should My Total Loss Settlement Be?",
    metaTitle: "How Much Should My Total Loss Settlement Be? (2026 Guide)",
    metaDescription:
      "The average total loss settlement is $2,800\u2013$4,200 below fair value. Learn how to calculate what your insurer actually owes, with state-specific data and real case studies.",
    published: "2026-02-19",
    modified: "2026-02-19",
    category: "settlement-basics",
    readingTimeMinutes: 12,
    keywords: [
      "total loss settlement amount",
      "how much should I get for my totaled car",
      "total loss payout calculator",
      "total loss settlement calculator",
      "insurance total loss value",
    ],
    faqs: [
      {
        question: "How is a total loss settlement amount calculated?",
        answer:
          "Your total loss settlement is based on the actual cash value (ACV) of your vehicle immediately before the accident, plus applicable sales tax, title and registration fees, and other line items required by your state. The ACV is determined using comparable vehicle sales in your local market, adjusted for mileage, condition, and options.",
      },
      {
        question: "What line items should be included in a total loss settlement?",
        answer:
          "A complete settlement should include the vehicle\u2019s actual cash value, sales tax on a replacement vehicle, title transfer and registration fees, any applicable dealer documentation fees, and adjustments for low mileage or aftermarket upgrades. Many states also require loss-of-use reimbursement.",
      },
      {
        question: "Can I negotiate a total loss settlement offer?",
        answer:
          "Yes. Insurance settlement offers are not final. You can submit a counter-offer with supporting evidence such as comparable vehicle listings, receipts for aftermarket upgrades, and documentation of missing line items like sales tax and fees.",
      },
      {
        question: "How long do I have to accept a total loss settlement?",
        answer:
          "Deadlines vary by state. Most states give you 30 days to respond, but some states like California provide a 35-day reopener right. Check your state\u2019s insurance department website for specific deadlines.",
      },
      {
        question: "What if my insurance company\u2019s valuation is too low?",
        answer:
          "You can dispute the valuation by providing your own comparable vehicle data, getting an independent appraisal, or filing a complaint with your state\u2019s department of insurance. Most policyholders who negotiate recover an additional $2,800\u2013$4,200.",
      },
      {
        question: "Does my insurer have to pay sales tax on a total loss?",
        answer:
          "In most states, yes. Your insurer is required to reimburse the sales tax you will pay when purchasing a replacement vehicle. The exact rules and any purchase-window requirements vary by state.",
      },
    ],
    sources: [
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "National Association of Insurance Commissioners (NAIC)",
      },
      {
        title: "Auto Insurance Claims Process",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Consumer Guide to Auto Insurance",
        url: "https://www.naic.org/documents/consumer_guide_auto.pdf",
        publisher: "NAIC",
      },
      {
        title: "Total Loss Claims: What You Need to Know",
        url: "https://www.consumerfinance.gov/ask-cfpb/what-is-gap-insurance-en-2051/",
        publisher: "Consumer Financial Protection Bureau (CFPB)",
      },
      {
        title: "Insurance Complaint Process by State",
        url: "https://content.naic.org/consumer/file-complaint",
        publisher: "NAIC",
      },
    ],
    component: () => import("./articles/total-loss-settlement-amount"),
  },

  /* ---- 2 ---- */
  {
    slug: "insurance-lowball-offer",
    title: "Insurance Company Lowball Offer: What to Do Next",
    metaTitle:
      "Insurance Company Lowball Offer? Here\u2019s What to Do (2026 Guide)",
    metaDescription:
      "Got a lowball insurance settlement offer? Learn the 7 warning signs, how to identify missing line items, and step-by-step instructions to negotiate a fair payout.",
    published: "2026-02-19",
    modified: "2026-02-19",
    category: "negotiation",
    readingTimeMinutes: 14,
    keywords: [
      "insurance lowball offer",
      "lowball settlement offer",
      "insurance company low offer",
      "how to fight lowball insurance offer",
      "insurance underpayment",
    ],
    faqs: [
      {
        question: "How do I know if my insurance offer is a lowball?",
        answer:
          "Common signs include: the offer is below Kelley Blue Book or NADA values, sales tax is not included, title and registration fees are missing, the comparables used have higher mileage or worse condition than your vehicle, and the offer arrives unusually quickly after the claim is filed.",
      },
      {
        question: "What percentage of insurance offers are lowball offers?",
        answer:
          "Industry data suggests that 70\u201380% of initial total loss offers are missing at least one required line item, and the average shortfall is $2,800\u2013$4,200. This does not mean every offer is deliberately low, but most are incomplete.",
      },
      {
        question: "Should I accept the first settlement offer?",
        answer:
          "In most cases, no. The first offer is a starting point for negotiation. Review it carefully against comparable vehicle values, verify all required line items are included, and submit a counter-offer if anything is missing.",
      },
      {
        question: "How do I respond to a lowball insurance offer?",
        answer:
          "Respond in writing with a formal counter-offer that includes comparable vehicle listings, documentation of missing line items, and any receipts for upgrades or maintenance. Keep your tone professional and cite specific policy provisions or state regulations.",
      },
      {
        question: "Can I file a complaint about a lowball offer?",
        answer:
          "Yes. If your insurer refuses to adjust an incomplete offer, you can file a complaint with your state\u2019s department of insurance. You can also request an independent appraisal if your policy includes an appraisal clause.",
      },
      {
        question:
          "How long does it take to negotiate a higher settlement?",
        answer:
          "Most negotiations resolve within 2\u20134 weeks. Simple missing-line-item disputes may be resolved in days, while valuation disputes requiring independent appraisals can take 4\u20136 weeks.",
      },
    ],
    sources: [
      {
        title: "How to Handle an Insurance Claim Dispute",
        url: "https://www.iii.org/article/how-to-handle-an-insurance-claim-dispute",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "File a Complaint Against an Insurance Company",
        url: "https://content.naic.org/consumer/file-complaint",
        publisher: "NAIC",
      },
      {
        title: "Consumer Rights in Insurance Claims",
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
      {
        title: "Understanding Auto Insurance Claims",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "Insurance Bad Faith Laws by State",
        url: "https://www.iii.org/article/understanding-insurance-bad-faith",
        publisher: "Insurance Information Institute (III)",
      },
    ],
    component: () => import("./articles/insurance-lowball-offer"),
  },

  /* ---- 3 ---- */
  {
    slug: "total-loss-car-value",
    title:
      "Total Loss Car Value: How Insurance Companies Calculate Your Payout",
    metaTitle:
      "How Insurance Companies Calculate Total Loss Car Value (2026)",
    metaDescription:
      "Learn exactly how insurers determine your totaled car\u2019s value using ACV, comparables, and depreciation. Includes calculator, state rules, and negotiation tips.",
    published: "2026-02-19",
    modified: "2026-02-19",
    category: "valuation",
    readingTimeMinutes: 13,
    keywords: [
      "total loss car value",
      "how insurance calculates total loss",
      "actual cash value car",
      "totaled car value calculator",
      "insurance car valuation",
    ],
    faqs: [
      {
        question: "How do insurance companies determine the value of a totaled car?",
        answer:
          "Insurers calculate actual cash value (ACV) by finding 3\u20135 comparable vehicles sold recently in your local market, then adjusting for differences in mileage, condition, options, and trim level. Some use third-party valuation services like CCC, Mitchell, or Audatex.",
      },
      {
        question: "What is actual cash value (ACV)?",
        answer:
          "Actual cash value is the fair market value of your vehicle immediately before the loss occurred. It reflects what a buyer would reasonably pay for your specific vehicle in your local market, accounting for age, mileage, condition, and equipment.",
      },
      {
        question: "Can I dispute my car\u2019s total loss valuation?",
        answer:
          "Yes. You can gather your own comparable vehicle listings from sites like Cars.com, AutoTrader, and CarGurus, then submit them to your adjuster. If you still disagree, most policies include an appraisal clause that allows an independent appraisal.",
      },
      {
        question: "Does mileage affect total loss value?",
        answer:
          "Yes, significantly. Lower-than-average mileage increases your vehicle\u2019s ACV, while higher mileage decreases it. If the comparables your insurer used have much higher mileage, you may be owed an upward adjustment.",
      },
      {
        question: "Are aftermarket upgrades included in total loss value?",
        answer:
          "Standard insurance policies typically cover factory-installed options but may not fully cover aftermarket upgrades. However, if you can document the upgrades with receipts, many insurers will include a partial credit. Some policies offer optional equipment coverage.",
      },
      {
        question:
          "What is the difference between ACV and replacement cost?",
        answer:
          "ACV is the depreciated value of your specific vehicle. Replacement cost is what it would cost to buy a comparable vehicle at retail. Your settlement should be based on replacement cost in your market, which includes dealer markup, not just wholesale or trade-in value.",
      },
    ],
    sources: [
      {
        title: "Understanding Vehicle Valuation",
        url: "https://www.kbb.com/what-is-my-car-worth/",
        publisher: "Kelley Blue Book",
      },
      {
        title: "Total Loss Auto Claims Guide",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "How Insurance Companies Value Your Car",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "NADA Used Car Guide",
        url: "https://www.nadaguides.com/",
        publisher: "J.D. Power / NADA",
      },
      {
        title: "Consumer Auto Insurance Information",
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
    ],
    component: () => import("./articles/total-loss-car-value"),
  },

  /* ---- 4 ---- */
  {
    slug: "counter-offer-letter",
    title: "How to Write a Counter Offer Letter for an Insurance Claim",
    metaTitle:
      "How to Write a Counter Offer Letter for Insurance (2026 Template)",
    metaDescription:
      "Step-by-step guide to writing an effective insurance counter-offer letter. Includes template, real examples, and the 6 sections every letter needs.",
    published: "2026-02-19",
    modified: "2026-02-19",
    category: "negotiation",
    readingTimeMinutes: 11,
    keywords: [
      "counter offer letter insurance",
      "insurance counter offer template",
      "how to write counter offer insurance claim",
      "total loss counter offer letter",
      "insurance settlement counter offer",
    ],
    faqs: [
      {
        question: "What should I include in an insurance counter-offer letter?",
        answer:
          "A strong counter-offer letter should include: your claim number and policy details, the original offer amount, your requested amount with justification, comparable vehicle listings, documentation of missing line items (sales tax, fees), and a professional closing with a response deadline.",
      },
      {
        question: "How long should I wait before sending a counter-offer?",
        answer:
          "Send your counter-offer promptly\u2014ideally within 7\u201310 days of receiving the initial offer. This shows you are serious and organized. Waiting too long can signal acceptance or disinterest.",
      },
      {
        question: "Should I send my counter-offer by email or mail?",
        answer:
          "Send it by email for speed, but also send a copy by certified mail so you have proof of delivery. Always keep copies of everything you send and receive.",
      },
      {
        question: "What if my counter-offer is rejected?",
        answer:
          "If your counter-offer is rejected, ask your adjuster to explain specifically why each item was denied. You can then escalate to a supervisor, invoke the appraisal clause in your policy, or file a complaint with your state\u2019s department of insurance.",
      },
      {
        question:
          "How much more should I ask for in a counter-offer?",
        answer:
          "Base your counter-offer on documented evidence, not an arbitrary increase. Calculate the fair market value of your vehicle using comparables, add all missing line items (sales tax, title, registration, fees), and request that specific total. The average successful counter-offer recovers $2,800\u2013$4,200 above the initial offer.",
      },
      {
        question: "Can I write a counter-offer letter myself?",
        answer:
          "Yes. Most successful counter-offers are written by the policyholder, not an attorney. The key is to be organized, cite specific evidence, and maintain a professional tone. Tools like ClaimCoach can generate a complete counter-offer letter based on your claim details.",
      },
    ],
    sources: [
      {
        title: "How to Negotiate an Insurance Settlement",
        url: "https://www.iii.org/article/how-to-handle-an-insurance-claim-dispute",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Consumer Guide: Filing Insurance Complaints",
        url: "https://content.naic.org/consumer/file-complaint",
        publisher: "NAIC",
      },
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "Auto Claims Tips for Consumers",
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
      {
        title: "Appraisal Clause in Auto Insurance",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
    ],
    component: () => import("./articles/counter-offer-letter"),
  },

  /* ---- 5 ---- */
  {
    slug: "sales-tax-total-loss",
    title: "Sales Tax on Total Loss Car Insurance Claims by State",
    metaTitle:
      "Sales Tax on Total Loss Insurance Claims: 50-State Guide (2026)",
    metaDescription:
      "Does your insurer owe you sales tax on a totaled car? See every state\u2019s rules, rates, and purchase-window requirements in our complete 2026 guide with calculator.",
    published: "2026-02-19",
    modified: "2026-02-19",
    category: "state-rules",
    readingTimeMinutes: 15,
    keywords: [
      "sales tax total loss insurance",
      "do I get sales tax on totaled car",
      "insurance sales tax reimbursement",
      "total loss sales tax by state",
      "car insurance sales tax recovery",
    ],
    faqs: [
      {
        question:
          "Does insurance pay sales tax on a total loss vehicle?",
        answer:
          "In most states, yes. Your insurer is required to include sales tax reimbursement as part of your total loss settlement so you can purchase a comparable replacement vehicle. Some states require proof of purchase within a specific window.",
      },
      {
        question:
          "Which states do not require sales tax reimbursement?",
        answer:
          "Five states have no sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. In these states, sales tax reimbursement does not apply. All other states generally require it, though rules vary.",
      },
      {
        question: "Do I need to buy a replacement car to get sales tax back?",
        answer:
          "It depends on your state. Some states like Texas and Illinois require you to purchase a replacement vehicle within a specified window (often 30 days) and provide proof. Other states include sales tax in the settlement regardless of whether you buy a replacement.",
      },
      {
        question: "How much is sales tax on a total loss settlement?",
        answer:
          "The amount depends on your state and local tax rate and your vehicle\u2019s settlement value. On a $20,000 settlement in a state with a 7% combined rate, the sales tax reimbursement would be $1,400. Use our calculator for your exact amount.",
      },
      {
        question:
          "What is Georgia\u2019s TAVT and how does it affect my settlement?",
        answer:
          "Georgia uses a Title Ad Valorem Tax (TAVT) instead of traditional sales tax on vehicles. The TAVT rate is currently 6.6% of the vehicle\u2019s fair market value, paid at the time of title transfer. Your insurer should include this in your settlement.",
      },
      {
        question: "Can I get sales tax reimbursed if I keep my totaled car?",
        answer:
          "Generally, if you retain the salvage vehicle instead of purchasing a replacement, you are not entitled to sales tax reimbursement since you are not paying sales tax on a new purchase. However, rules vary by state, so check your specific state\u2019s requirements.",
      },
    ],
    sources: [
      {
        title: "State Tax Rates and Rules",
        url: "https://taxfoundation.org/data/all/state/2024-sales-tax-rates/",
        publisher: "Tax Foundation",
      },
      {
        title: "Auto Insurance Consumer Guide",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "Georgia TAVT Information",
        url: "https://dor.georgia.gov/title-ad-valorem-tax-tavt",
        publisher: "Georgia Department of Revenue",
      },
      {
        title: "State Insurance Department Directory",
        url: "https://content.naic.org/state-insurance-departments",
        publisher: "NAIC",
      },
      {
        title: "Vehicle Sales Tax by State",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
    ],
    component: () => import("./articles/sales-tax-total-loss"),
  },
];

/* ------------------------------------------------------------------ */
/*  Accessors                                                          */
/* ------------------------------------------------------------------ */

export function listGuides(): GuideRegistryEntry[] {
  return GUIDES.filter((g) => new Date(g.published) <= new Date());
}

export function getGuideBySlug(
  slug: string
): GuideRegistryEntry | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}

export function getGuidesByCategory(
  category: GuideCategory
): GuideRegistryEntry[] {
  return listGuides().filter((g) => g.category === category);
}
