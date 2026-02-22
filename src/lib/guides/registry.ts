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
          "ClaimCoach analysis of more than 10,000 claims shows that 70\u201380% of initial total loss offers are missing at least one required line item, and the average shortfall is $2,800\u2013$4,200. This does not mean every offer is deliberately low, but most are incomplete.",
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

  /* ---- 6 ---- */
  {
    slug: "appraisal-clause-insurance",
    title: "How to Use Your Policy\u2019s Appraisal Clause to Dispute a Total Loss",
    metaTitle:
      "How to Use the Insurance Appraisal Clause to Dispute Your Total Loss (2026)",
    metaDescription:
      "The appraisal clause lets you force a binding independent valuation when your insurer\u2019s offer is too low. Step-by-step guide, costs, state rules, and real case studies.",
    published: "2026-02-19",
    modified: "2026-02-19",
    category: "negotiation",
    readingTimeMinutes: 13,
    keywords: [
      "appraisal clause insurance",
      "how to invoke appraisal clause",
      "insurance appraisal dispute",
      "total loss appraisal process",
      "dispute insurance valuation",
    ],
    faqs: [
      {
        question: "What is the appraisal clause in auto insurance?",
        answer:
          "The appraisal clause is a provision in most auto insurance policies that provides a structured way to resolve disagreements about your vehicle\u2019s actual cash value. Each side hires an independent appraiser; if they disagree, a neutral umpire issues a binding decision.",
      },
      {
        question: "How do I invoke the appraisal clause?",
        answer:
          "Send a written demand for appraisal to your adjuster by certified mail, referencing your policy number and claim number. Most policies require written notice. Once invoked, each party selects an independent appraiser within the timeframe specified in your policy.",
      },
      {
        question: "How much does the appraisal clause process cost?",
        answer:
          "Your appraiser fee typically runs $400\u2013$900. If a neutral umpire is needed, each side splits that cost, typically $250\u2013$600 per party. Total policyholder cost is usually $650\u2013$1,500. The process is most cost-effective when the valuation dispute exceeds $2,000.",
      },
      {
        question: "Is the appraisal clause umpire decision binding?",
        answer:
          "Yes. Once any two of the three parties (your appraiser, the insurer\u2019s appraiser, and the umpire) agree on a value, that figure is binding on both parties. The insurer must pay based on the agreed ACV.",
      },
      {
        question: "Can I invoke the appraisal clause before sending a counter-offer?",
        answer:
          "You can, but it is usually better to attempt direct negotiation first. Most valuation disputes resolve through a well-documented counter-offer without the cost and delay of formal appraisal. Invoke the appraisal clause when negotiation has failed or when the gap is large enough to justify the cost.",
      },
      {
        question: "Does the appraisal clause cover missing line items like sales tax?",
        answer:
          "No. The appraisal clause addresses the vehicle\u2019s actual cash value (ACV), not coverage questions or specific line items like sales tax. Missing line items like sales tax and registration fees are typically resolved through direct adjuster negotiation or a state insurance department complaint.",
      },
    ],
    sources: [
      {
        title: "How to Handle an Insurance Claim Dispute",
        url: "https://www.iii.org/article/how-to-handle-an-insurance-claim-dispute",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
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
        title: "State Insurance Department Directory",
        url: "https://content.naic.org/state-insurance-departments",
        publisher: "NAIC",
      },
    ],
    component: () => import("./articles/appraisal-clause-insurance"),
  },

  /* ---- 7 ---- */
  {
    slug: "gap-insurance-total-loss",
    title: "GAP Insurance and Total Loss: What Gets Paid and What You Still Owe",
    metaTitle:
      "GAP Insurance on a Total Loss: What\u2019s Covered and What You Owe (2026)",
    metaDescription:
      "GAP insurance covers your loan balance after a total loss, but only after your ACV settlement. Learn how GAP works, what it excludes, and how to maximize your primary settlement first.",
    published: "2026-02-19",
    modified: "2026-02-19",
    category: "settlement-basics",
    readingTimeMinutes: 12,
    keywords: [
      "GAP insurance total loss",
      "how does GAP insurance work",
      "GAP insurance payout",
      "GAP insurance what is covered",
      "total loss loan balance",
    ],
    faqs: [
      {
        question: "What does GAP insurance cover on a total loss?",
        answer:
          "GAP insurance covers the difference between your vehicle\u2019s actual cash value (ACV) as paid by your primary insurer and your outstanding loan or lease balance. It ensures you are not left paying a loan for a vehicle you can no longer drive.",
      },
      {
        question: "Does GAP insurance cover my deductible?",
        answer:
          "Most standard GAP policies do not cover your primary insurer\u2019s deductible. Some premium GAP products cover up to $1,000 of the deductible. Check your specific GAP policy language.",
      },
      {
        question: "What does GAP insurance not cover?",
        answer:
          "GAP typically does not cover: your deductible, past-due loan payments, negative equity rolled in from a prior trade-in, extended warranty or other costs financed into the loan, or amounts above the policy\u2019s coverage cap.",
      },
      {
        question: "Should I still negotiate my total loss settlement if I have GAP insurance?",
        answer:
          "Yes, absolutely. Every dollar added to your ACV settlement reduces the gap that GAP insurance must cover. In some cases, a higher ACV eliminates the GAP claim entirely and results in a surplus check paid directly to you. Never skip ACV negotiation just because you have GAP coverage.",
      },
      {
        question: "What is the difference between GAP insurance and Loan/Lease Payoff coverage?",
        answer:
          "Standalone GAP insurance (from a dealer or specialty provider) typically covers 25%\u2013150% of ACV and costs $200\u2013$400 per year. Loan/Lease Payoff coverage added to your auto policy is cheaper ($20\u2013$60 per year) but usually caps coverage at 25% of ACV, making it less protective for large loan-to-value gaps.",
      },
      {
        question: "What happens if my ACV settlement exceeds my loan balance?",
        answer:
          "If your total loss ACV settlement exceeds your loan balance, the surplus goes to you \u2014 not the lender. Your lender receives what is owed, and the remaining balance is paid to you directly. GAP insurance is not triggered in this case.",
      },
    ],
    sources: [
      {
        title: "What Is GAP Insurance?",
        url: "https://www.consumerfinance.gov/ask-cfpb/what-is-gap-insurance-en-2051/",
        publisher: "Consumer Financial Protection Bureau (CFPB)",
      },
      {
        title: "Understanding Auto Insurance Claims",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "Auto Loan Data",
        url: "https://www.experian.com/blogs/ask-experian/what-is-gap-insurance/",
        publisher: "Experian",
      },
      {
        title: "Consumer Guide to Auto Insurance",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Vehicle Depreciation Data",
        url: "https://www.kbb.com/car-advice/vehicle-depreciation/",
        publisher: "Kelley Blue Book",
      },
    ],
    component: () => import("./articles/gap-insurance-total-loss"),
  },

  /* ---- 8 ---- */
  {
    slug: "total-loss-threshold-by-state",
    title: "Total Loss Threshold by State: When Is a Car Declared a Total Loss?",
    metaTitle:
      "Total Loss Threshold by State: Complete 50-State Guide (2026)",
    metaDescription:
      "When is a car considered a total loss? See every state\u2019s total loss threshold percentage or Total Loss Formula, plus what to do once your car is declared totaled.",
    published: "2026-02-19",
    modified: "2026-02-19",
    category: "state-rules",
    readingTimeMinutes: 14,
    keywords: [
      "total loss threshold by state",
      "when is a car considered a total loss",
      "total loss percentage by state",
      "total loss formula states",
      "car totaled threshold",
    ],
    faqs: [
      {
        question: "When is a car considered a total loss?",
        answer:
          "A car is considered a total loss when the estimated cost of repairs exceeds a threshold relative to the vehicle\u2019s actual cash value (ACV). In percentage threshold states, this is a fixed percentage (typically 75\u201380% of ACV). In Total Loss Formula (TLF) states, a total loss is declared when repair cost plus salvage value exceeds the ACV.",
      },
      {
        question: "What state has the lowest total loss threshold?",
        answer:
          "Oklahoma has the lowest fixed total loss threshold in the U.S. at 60% of ACV. This means a vehicle with a $20,000 ACV and $12,001 in repair costs would be declared a total loss in Oklahoma, whereas in most other states it would be repaired.",
      },
      {
        question: "What is the Total Loss Formula (TLF)?",
        answer:
          "The Total Loss Formula is used in about half of U.S. states. Under TLF, a vehicle is declared a total loss when the repair cost plus the vehicle\u2019s salvage value exceeds its pre-loss actual cash value. California and Texas are major TLF states.",
      },
      {
        question: "Can I keep my car if it is declared a total loss?",
        answer:
          "Yes. Most states allow a \u201csalvage buy-back\u201d where you retain the totaled vehicle. Your insurer deducts the salvage value from your settlement. The vehicle will receive a salvage title, which affects insurability and resale value. You must typically pass a state inspection to re-register it.",
      },
      {
        question: "Can I dispute a total loss declaration?",
        answer:
          "You can dispute the valuation (ACV) used in a total loss declaration, but the total loss determination itself is typically based on the repair estimate, which is set by the insurer\u2019s adjuster or appraiser. If you believe the repair estimate is inflated, you can request a second estimate from an independent body shop.",
      },
      {
        question: "Does a total loss threshold affect my settlement amount?",
        answer:
          "The threshold determines whether you get a repair or a settlement, but once a total loss is declared, your settlement is based entirely on the vehicle\u2019s ACV \u2014 not the repair cost. The ACV is negotiable regardless of how the total loss was triggered.",
      },
    ],
    sources: [
      {
        title: "Total Loss Thresholds by State",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "State Department of Motor Vehicles Resources",
        url: "https://www.usa.gov/motor-vehicle-services",
        publisher: "USA.gov",
      },
      {
        title: "Auto Insurance Claims Process",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Total Loss Vehicle FAQs",
        url: "https://content.naic.org/consumer/file-complaint",
        publisher: "NAIC",
      },
      {
        title: "State Insurance Department Directory",
        url: "https://content.naic.org/state-insurance-departments",
        publisher: "NAIC",
      },
    ],
    component: () => import("./articles/total-loss-threshold-by-state"),
  },

  /* ---- 9 ---- */
  {
    slug: "adjuster-call-script",
    title: "What to Say to Your Insurance Adjuster: A Word-for-Word Call Script",
    metaTitle:
      "Insurance Adjuster Call Script: What to Say to Get a Higher Settlement (2026)",
    metaDescription:
      "Get word-for-word scripts for negotiating with your insurance adjuster, including how to dispute ACV, request missing line items, and escalate effectively.",
    published: "2026-02-19",
    modified: "2026-02-19",
    category: "negotiation",
    readingTimeMinutes: 13,
    keywords: [
      "what to say to insurance adjuster",
      "insurance adjuster negotiation script",
      "how to talk to insurance adjuster total loss",
      "adjuster call script",
      "negotiate with insurance adjuster",
    ],
    faqs: [
      {
        question: "What should I say to my insurance adjuster about a low offer?",
        answer:
          "Focus on specific, documented facts rather than emotional appeals. State the exact gap between the offer and your market research: \u201cBased on [N] comparable vehicles within 50 miles, I believe a fair settlement is $[Amount].\u201d Reference your claim number, comparables used, and any missing line items (sales tax, fees). Keep a professional tone throughout.",
      },
      {
        question: "Should I record my conversation with my insurance adjuster?",
        answer:
          "Recording laws vary by state \u2014 some require all-party consent. Instead of recording, document the call immediately after by sending a follow-up email summarizing what was discussed and any commitments made. This written record is usually more useful than an audio recording.",
      },
      {
        question: "What should I never say to an insurance adjuster?",
        answer:
          "Never express financial urgency or desperation (\u201cI really need this money now\u201d), make emotional appeals (\u201cthis offer is insulting\u201d), or make legal threats unless you are prepared to follow through. These statements signal weakness or lack of credibility. Stick to documented facts and specific dollar amounts.",
      },
      {
        question: "How many times should I call my adjuster before escalating?",
        answer:
          "One or two substantive calls with documented evidence is usually sufficient before moving to a written counter-offer. If the adjuster is unresponsive after two calls and a written follow-up, escalate to a supervisor. If a supervisor does not resolve the dispute, consider invoking the appraisal clause or filing a state complaint.",
      },
      {
        question: "What is the best way to dispute a comparable vehicle my adjuster used?",
        answer:
          "Be specific about the mismatch: trim level, mileage, geography, or options. Provide your own comparable listings that correctly match your vehicle. Phrase it as a question: \u201cComparable #2 is a base LX model; my vehicle was an EX-L. The market difference is typically $X. Can you review with EX-L comparables?\u201d",
      },
      {
        question: "What happens if my adjuster refuses to negotiate?",
        answer:
          "If direct negotiation fails, you have three escalation options: (1) request to speak with a claims supervisor, (2) invoke the appraisal clause in your policy for a binding independent valuation, or (3) file a complaint with your state\u2019s department of insurance. All three are legitimate and often effective.",
      },
    ],
    sources: [
      {
        title: "How to Handle an Insurance Claim Dispute",
        url: "https://www.iii.org/article/how-to-handle-an-insurance-claim-dispute",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Consumer Rights in Insurance Claims",
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
      {
        title: "File a Complaint Against an Insurance Company",
        url: "https://content.naic.org/consumer/file-complaint",
        publisher: "NAIC",
      },
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "Auto Claims Consumer Guide",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
    ],
    component: () => import("./articles/adjuster-call-script"),
  },

  /* ---- 10 ---- */
  {
    slug: "diminished-value-claim",
    title: "Diminished Value Claims: How to Recover Lost Car Value After an Accident",
    metaTitle:
      "Diminished Value Claim: How to File and What to Recover (2026 Guide)",
    metaDescription:
      "Your repaired car is worth less than before the accident. Learn how to file a diminished value claim, calculate your loss using the 17c formula, and negotiate a fair recovery.",
    published: "2026-02-19",
    modified: "2026-02-19",
    category: "valuation",
    readingTimeMinutes: 14,
    keywords: [
      "diminished value claim",
      "how to file diminished value claim",
      "car diminished value after accident",
      "diminished value insurance",
      "17c formula diminished value",
    ],
    faqs: [
      {
        question: "What is a diminished value claim?",
        answer:
          "A diminished value claim seeks compensation for the permanent reduction in your vehicle\u2019s resale value caused by having an accident on its history, even after full repair. Carfax and independent research show repaired vehicles sell for 10\u201325% less than identical clean-history vehicles.",
      },
      {
        question: "Who can file a diminished value claim?",
        answer:
          "In most states, you can file a diminished value claim against the at-fault driver\u2019s liability insurer if another driver caused the accident. In some states (Georgia, Texas, Washington, Colorado, and others), you may also file against your own insurer. Check your state\u2019s specific rules.",
      },
      {
        question: "How is diminished value calculated?",
        answer:
          "Many insurers use the 17c formula: start with 10% of the vehicle\u2019s pre-loss value, then multiply by a damage severity multiplier (0.00\u20131.00) and a mileage multiplier (0.00\u20131.00). Independent appraisers often document higher amounts using actual comparable sale data.",
      },
      {
        question: "Do I need a professional appraiser to file a diminished value claim?",
        answer:
          "You can file without one, using market data and the 17c formula. However, a professional DV appraisal ($200\u2013$600) significantly strengthens your claim and typically produces a higher documented value than a self-calculated formula result. It is worth the cost when the expected DV exceeds $2,000.",
      },
      {
        question: "How long do I have to file a diminished value claim?",
        answer:
          "Statutes of limitation for DV claims vary by state, typically 2\u20134 years from the date of the accident. File as soon as possible after repairs are completed, while comparable market data is current and the accident is recent.",
      },
      {
        question: "Can I file a diminished value claim if the accident was partly my fault?",
        answer:
          "In comparative negligence states, your DV recovery may be reduced in proportion to your percentage of fault. In contributory negligence states (Alabama, Maryland, North Carolina, Virginia, D.C.), any fault on your part may bar recovery. Consult a licensed professional in your state if fault is disputed.",
      },
    ],
    sources: [
      {
        title: "Diminished Value of Vehicles",
        url: "https://www.iii.org/article/how-to-handle-an-insurance-claim-dispute",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Vehicle History and Value",
        url: "https://www.carfax.com/vehicle-research/diminished-value",
        publisher: "Carfax",
      },
      {
        title: "Consumer Rights in Insurance Claims",
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
      {
        title: "File a Complaint Against an Insurance Company",
        url: "https://content.naic.org/consumer/file-complaint",
        publisher: "NAIC",
      },
      {
        title: "Auto Insurance Consumer Guide",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
    ],
    component: () => import("./articles/diminished-value-claim"),
  },

  /* ---- 11 ---- */
  {
    slug: "rental-car-after-total-loss",
    title: "How Long Does Insurance Pay for a Rental Car After a Total Loss?",
    metaTitle:
      "Rental Car After Total Loss: How Long Insurance Pays (2026 Guide)",
    metaDescription:
      "Find out exactly how long your insurer must cover a rental car after a total loss, what ends rental coverage, and what to do when authorization runs out before your settlement arrives.",
    published: "2026-02-19",
    modified: "2026-02-19",
    category: "settlement-basics",
    readingTimeMinutes: 10,
    keywords: [
      "rental car after total loss",
      "how long does insurance pay for rental car",
      "loss of use total loss",
      "rental reimbursement insurance total loss",
      "insurance rental car coverage total loss",
    ],
    faqs: [
      {
        question:
          "How long does insurance pay for a rental car after a total loss?",
        answer:
          "It depends on whether the claim is first-party or third-party. On a first-party claim (your own insurer), rental coverage lasts until the settlement offer is made or your policy cap is reached, whichever comes first. On a third-party claim against an at-fault driver\u2019s insurer, loss-of-use coverage continues until a reasonable settlement offer is made.",
      },
      {
        question: "Does my insurance automatically cover a rental car?",
        answer:
          "No. Rental reimbursement is an optional add-on coverage that must be purchased separately. Standard collision and comprehensive policies do not include rental coverage. Check your policy declarations page to see whether you have this coverage and what your daily and total limits are.",
      },
      {
        question: "What is \u201closs of use\u201d in a third-party claim?",
        answer:
          "Loss of use is the right to transportation reimbursement when the at-fault driver\u2019s insurer is responsible for your total loss. Unlike a per-day policy cap in a first-party claim, loss of use covers your actual reasonable transportation costs for the period the settlement process takes. Coverage ends when a reasonable settlement offer is made.",
      },
      {
        question: "What happens when my rental coverage runs out?",
        answer:
          "If your first-party rental cap is exhausted before the settlement is resolved, contact your adjuster in writing and request a coverage extension. If the delay is due to the insurer\u2019s own processing, many will extend as a goodwill measure. If not, pay out of pocket, keep all receipts, and include the out-of-pocket costs as a line item in your counter-offer.",
      },
      {
        question: "Can I include unpaid rental costs in my settlement demand?",
        answer:
          "Yes. If your rental coverage was terminated prematurely and you continued to pay for transportation while the settlement remained unresolved, those out-of-pocket costs are a legitimate damages item. Document every day and every dollar and include them in your written counter-offer.",
      },
      {
        question: "When does rental car coverage end after a total loss?",
        answer:
          "Coverage typically ends when (1) the insurer makes a settlement offer, (2) your policy rental cap is reached, (3) you sign the settlement release, or (4) you purchase a replacement vehicle. Do not sign the release until you have secured alternate transportation.",
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
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
      {
        title: "File a Complaint Against an Insurance Company",
        url: "https://content.naic.org/consumer/file-complaint",
        publisher: "NAIC",
      },
    ],
    component: () => import("./articles/rental-car-after-total-loss"),
  },

  /* ---- 12 ---- */
  {
    slug: "how-to-read-valuation-report",
    title: "How to Read Your Insurance Total Loss Valuation Report",
    metaTitle:
      "How to Read Your Total Loss Valuation Report (CCC, Mitchell, Audatex) \u2014 2026",
    metaDescription:
      "Your total loss settlement comes from a valuation report. Learn how to read it section by section, spot comparable errors, and dispute the report with specific evidence.",
    published: "2026-02-19",
    modified: "2026-02-19",
    category: "valuation",
    readingTimeMinutes: 12,
    keywords: [
      "how to read total loss valuation report",
      "CCC valuation report insurance",
      "Mitchell total loss report",
      "dispute insurance valuation report",
      "total loss comparable vehicles report",
    ],
    faqs: [
      {
        question: "What is a total loss valuation report?",
        answer:
          "A total loss valuation report is a document generated by a third-party software platform \u2014 typically CCC Intelligent Solutions, Mitchell International, or Audatex \u2014 that estimates your vehicle\u2019s actual cash value (ACV) by analyzing comparable vehicles in your local market and applying adjustments for mileage, condition, and equipment. Your settlement offer is based on this report.",
      },
      {
        question: "How do I get a copy of my valuation report?",
        answer:
          "Send a written request to your adjuster by email, referencing your claim number and asking for the complete valuation report including all comparable vehicles and adjustments. In most states, you are entitled to this document. Most adjusters provide it within one to three business days of a written request.",
      },
      {
        question: "What are the most common errors in a valuation report?",
        answer:
          "The most common errors are: using the wrong trim level (base trim instead of your loaded trim), selecting comparables from geographically distant markets, using comparables with significantly higher mileage without adequate upward adjustment to your ACV, and failing to account for factory options like AWD, leather, or a sunroof.",
      },
      {
        question: "What is a condition rating and how does it affect my settlement?",
        answer:
          "Valuation platforms rate your vehicle\u2019s condition on a scale \u2014 typically Excellent, Good, Average, Rough, and Very Rough. Each step down in condition reduces your ACV. If your vehicle was well-maintained and the report rated it below \u201cGood,\u201d you can dispute the rating using maintenance records, pre-loss photographs, and if needed, an independent appraisal.",
      },
      {
        question: "Can I dispute specific comparables in the valuation report?",
        answer:
          "Yes. You can identify specific comparables that are mismatched \u2014 wrong trim, too far geographically, higher mileage, missing options \u2014 and provide replacement comparables from Cars.com, AutoTrader, or CarGurus that correctly match your vehicle. Submit these to your adjuster in writing with a specific revised ACV calculation.",
      },
      {
        question:
          "What should I do if my adjuster refuses to correct errors in the report?",
        answer:
          "If your adjuster declines to correct specific, documented errors, ask for a written explanation for each point. You can then escalate to a supervisor, invoke the appraisal clause in your policy for an independent binding valuation, or file a complaint with your state\u2019s department of insurance.",
      },
    ],
    sources: [
      {
        title: "How Insurance Companies Value Your Car",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Understanding Vehicle Valuation",
        url: "https://www.kbb.com/what-is-my-car-worth/",
        publisher: "Kelley Blue Book",
      },
      {
        title: "NADA Used Car Guide",
        url: "https://www.nadaguides.com/",
        publisher: "J.D. Power / NADA",
      },
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "How to Handle an Insurance Claim Dispute",
        url: "https://www.iii.org/article/how-to-handle-an-insurance-claim-dispute",
        publisher: "Insurance Information Institute (III)",
      },
    ],
    component: () => import("./articles/how-to-read-valuation-report"),
  },

  /* ---- 13 ---- */
  {
    slug: "salvage-title-buyback",
    title:
      "Can I Keep My Totaled Car? A Complete Guide to Salvage Title Buyback",
    metaTitle:
      "Keeping a Totaled Car: Salvage Title Buyback Guide (2026)",
    metaDescription:
      "Can you keep your car after a total loss? Learn how salvage buyback works, how the salvage deduction is calculated, and when keeping your totaled car actually makes financial sense.",
    published: "2026-02-19",
    modified: "2026-02-19",
    category: "settlement-basics",
    readingTimeMinutes: 12,
    keywords: [
      "keep totaled car insurance",
      "salvage title buyback",
      "total loss buyback",
      "can I keep my car if it is totaled",
      "salvage title after total loss",
    ],
    faqs: [
      {
        question: "Can I keep my car if it is declared a total loss?",
        answer:
          "Yes. Most states allow a \u201csalvage buyback\u201d or vehicle retention option where you keep the totaled vehicle. In exchange, your insurer deducts the salvage value from your settlement payment. The vehicle receives a salvage title, which you can later convert to a rebuilt title after repairs and a state inspection.",
      },
      {
        question: "How is the salvage deduction calculated?",
        answer:
          "Your insurer submits your vehicle\u2019s information to a salvage auction platform (typically Copart or IAA) and receives competitive bids from licensed salvage dealers. The highest bid becomes the salvage value, which is deducted from your ACV settlement. You can ask your adjuster for the specific salvage value and how it was determined.",
      },
      {
        question: "What is a salvage title and what are its consequences?",
        answer:
          "A salvage title is a permanent brand issued by the state DMV when a vehicle has been declared a total loss. Salvage-titled vehicles cannot be legally registered or driven in most states until repaired and inspected. They are not eligible for standard insurance coverage, cannot typically be financed by lenders, and have significantly reduced resale value.",
      },
      {
        question: "What is a rebuilt title and how do I get one?",
        answer:
          "A rebuilt (or reconstructed) title is issued after a salvage-titled vehicle has been repaired and passed a state DMV inspection. The process varies by state but typically involves completing repairs, scheduling a state inspection, and filing paperwork with your DMV. A rebuilt title allows registration and road use, but the vehicle\u2019s history as a prior salvage remains permanently on its record.",
      },
      {
        question: "When does it make financial sense to keep a totaled car?",
        answer:
          "Keeping a totaled car makes financial sense when the cost to repair the vehicle is less than the salvage value that would be deducted from your settlement, when you do not need financing or full insurance coverage, and when the damage is repairable to a safe condition. It makes less sense when there is structural, airbag, or flood damage, or when you plan to sell the vehicle.",
      },
      {
        question: "Should I negotiate my ACV before deciding to exercise a buyback?",
        answer:
          "Yes \u2014 this is critical. The salvage deduction is applied to your ACV, so a higher ACV means a larger net settlement even after the deduction. Always negotiate your ACV to its highest possible value before making the buyback decision. Review your valuation report for errors before agreeing to any settlement amount.",
      },
    ],
    sources: [
      {
        title: "Total Loss Auto Claims Guide",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "State DMV Resources",
        url: "https://www.usa.gov/motor-vehicle-services",
        publisher: "USA.gov",
      },
      {
        title: "Auto Insurance Claims Process",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Vehicle Title Brands and Salvage",
        url: "https://content.naic.org/state-insurance-departments",
        publisher: "NAIC",
      },
    ],
    component: () => import("./articles/salvage-title-buyback"),
  },

  /* ---- 14 ---- */
  {
    slug: "file-insurance-complaint",
    title:
      "How to File a Complaint With Your State Insurance Department",
    metaTitle:
      "How to File an Insurance Complaint With Your State Department (2026 Guide)",
    metaDescription:
      "When your insurer ignores your counter-offer or refuses required line items, a state insurance complaint can restart the process. Step-by-step guide with what to include and what to expect.",
    published: "2026-02-19",
    modified: "2026-02-19",
    category: "negotiation",
    readingTimeMinutes: 11,
    keywords: [
      "how to file insurance complaint",
      "state insurance department complaint",
      "file complaint against insurance company",
      "insurance department complaint total loss",
      "insurance bad faith complaint",
    ],
    faqs: [
      {
        question:
          "How do I file a complaint against my insurance company?",
        answer:
          "Visit your state\u2019s department of insurance website and use their online complaint portal. The National Association of Insurance Commissioners (NAIC) maintains a directory at naic.org/state-insurance-departments that links to every state\u2019s portal. Include your policy number, claim number, a chronological timeline of events, copies of all correspondence, and a specific description of what you believe the insurer did wrong.",
      },
      {
        question: "Does filing a complaint with the state actually work?",
        answer:
          "It can be effective, particularly when the insurer has failed to comply with specific regulatory requirements \u2014 such as refusing to pay sales tax that your state mandates, or failing to respond within required timeframes. Complaints require the insurer to formally respond on record, which often prompts internal review of stalled claims. They do not guarantee a specific dollar outcome.",
      },
      {
        question:
          "How long does an insurance department complaint take to resolve?",
        answer:
          "Most states require insurers to respond to complaints within 30 to 45 days of receipt. The department then reviews the response and determines whether the insurer violated any regulations. The overall process typically takes 45 to 90 days, though timelines vary by state and case complexity.",
      },
      {
        question:
          "Should I file a complaint before or after sending a counter-offer?",
        answer:
          "After. A complaint is most effective when you have already attempted direct negotiation and can document the insurer\u2019s inadequate response. State departments will typically ask whether you attempted to resolve the dispute directly. A well-documented negotiation attempt \u2014 written counter-offer, specific evidence, adjuster non-response \u2014 makes your complaint substantially stronger.",
      },
      {
        question: "What is insurance bad faith?",
        answer:
          "Insurance bad faith is a legal doctrine that allows policyholders to sue their own insurer for damages beyond the original claim amount when the insurer unreasonably denies or delays a legitimate claim. It requires evidence that the insurer knew the claim was legitimate and denied or delayed it without a reasonable basis. Bad faith is more serious than a coverage dispute and typically requires an attorney.",
      },
      {
        question: "Is filing an insurance complaint free?",
        answer:
          "Yes. Filing a complaint with your state department of insurance is completely free. There is no filing fee and no attorney required. You can submit the complaint yourself through the state\u2019s online portal in under an hour.",
      },
    ],
    sources: [
      {
        title: "File a Complaint Against an Insurance Company",
        url: "https://content.naic.org/consumer/file-complaint",
        publisher: "National Association of Insurance Commissioners (NAIC)",
      },
      {
        title: "State Insurance Department Directory",
        url: "https://content.naic.org/state-insurance-departments",
        publisher: "NAIC",
      },
      {
        title: "Insurance Bad Faith Overview",
        url: "https://www.iii.org/article/how-to-handle-an-insurance-claim-dispute",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Consumer Rights in Insurance Claims",
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
    ],
    component: () => import("./articles/file-insurance-complaint"),
  },

  /* ---- 15 ---- */
  {
    slug: "total-loss-timeline",
    title: "How Long Does a Total Loss Claim Take? Stage-by-Stage Guide",
    metaTitle:
      "How Long Does a Total Loss Claim Take? Complete Timeline (2026)",
    metaDescription:
      "From accident to settlement check: a stage-by-stage breakdown of the total loss claim timeline, what causes delays, and what you can do at each step to keep the process on track.",
    published: "2026-02-19",
    modified: "2026-02-19",
    category: "settlement-basics",
    readingTimeMinutes: 13,
    keywords: [
      "how long does total loss claim take",
      "total loss settlement timeline",
      "total loss claim process time",
      "how long for insurance to pay total loss",
      "total loss claim steps",
    ],
    faqs: [
      {
        question: "How long does a total loss claim typically take?",
        answer:
          "An uncomplicated total loss claim \u2014 clear liability, no valuation dispute, no lienholder complications \u2014 typically resolves in two to four weeks from total loss declaration to settlement check. Disputed valuation, lienholder payoff processing, and adjuster delays can extend the timeline to six weeks or more.",
      },
      {
        question: "What is the slowest stage of a total loss claim?",
        answer:
          "The negotiation stage is typically the most variable in duration. A simple missing-line-item dispute (such as unpaid sales tax) may resolve in days with a written counter-offer. A valuation dispute involving independent appraisal under the appraisal clause can take three to six additional weeks.",
      },
      {
        question: "How long does the insurer have to make a settlement offer?",
        answer:
          "State regulations vary. Many states require insurers to acknowledge a claim within 10 to 15 business days and to respond within 15 to 40 days of receiving all necessary documentation. Check your state\u2019s department of insurance website for specific timeframes applicable to your claim.",
      },
      {
        question: "What causes total loss claims to take longer than normal?",
        answer:
          "The most common delays are: disputed liability (insurer waits for fault determination), lienholder payoff processing, valuation disputes requiring counter-offers or appraisal, adjuster unresponsiveness, and documentation requests for documents already submitted. Each can be addressed proactively through written follow-up and escalation.",
      },
      {
        question: "Can I speed up my total loss claim?",
        answer:
          "Yes. File your claim the same day as the accident, ensure your vehicle is accessible for inspection, provide all requested documents promptly in writing, and follow up by email (not phone) at each stage. If the claim stalls, escalate in writing to a supervisor within two business days of an unanswered communication.",
      },
      {
        question: "What should I do while waiting for my total loss settlement?",
        answer:
          "While waiting: confirm your rental car coverage and its limits, request the full valuation report when the offer arrives, research comparable vehicles to prepare a counter-offer if needed, contact your lender with payoff information if you have a loan, and document every communication by email. Do not sign the settlement release until you are satisfied with the offer.",
      },
    ],
    sources: [
      {
        title: "Auto Insurance Claims Process",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "Consumer Guide to Auto Insurance",
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
      {
        title: "State Insurance Department Directory",
        url: "https://content.naic.org/state-insurance-departments",
        publisher: "NAIC",
      },
      {
        title: "File a Complaint Against an Insurance Company",
        url: "https://content.naic.org/consumer/file-complaint",
        publisher: "NAIC",
      },
    ],
    component: () => import("./articles/total-loss-timeline"),
  },

  /* ---- 16 ---- */
  {
    slug: "aftermarket-upgrades-total-loss",
    title: "Aftermarket Parts and Custom Equipment in a Total Loss Claim",
    metaTitle: "Aftermarket Upgrades and Total Loss Insurance: What You Can Recover (2026)",
    metaDescription:
      "Did your totaled car have aftermarket wheels, a lift kit, or a custom audio system? Learn what factory options are covered automatically, what aftermarket upgrades require documentation, and how to negotiate recovery.",
    published: "2026-02-22",
    modified: "2026-02-22",
    category: "valuation",
    readingTimeMinutes: 11,
    keywords: [
      "aftermarket upgrades total loss",
      "custom parts insurance claim",
      "modified car total loss value",
      "aftermarket equipment insurance settlement",
      "custom equipment coverage total loss",
    ],
    faqs: [
      {
        question: "Does insurance cover aftermarket upgrades in a total loss?",
        answer:
          "Standard collision and comprehensive policies typically do not automatically cover aftermarket upgrades. Factory-installed options are included. Aftermarket equipment requires a custom equipment endorsement on your policy or a negotiated credit supported by receipts and market evidence.",
      },
      {
        question: "What documentation do I need to recover aftermarket upgrades?",
        answer:
          "You need purchase receipts, installation invoices, pre-loss photographs showing the upgrades, and market listings demonstrating that similar vehicles with the same upgrades sell at a premium. Without receipts, recovery is very difficult.",
      },
      {
        question: "What is a custom equipment endorsement?",
        answer:
          "A custom equipment or custom parts and equipment (CPE) endorsement is an add-on to your auto policy that explicitly covers aftermarket modifications up to a specified limit. It is the cleanest way to ensure full recovery of aftermarket equipment in a total loss.",
      },
      {
        question: "What factory options should be included in my ACV?",
        answer:
          "All factory-installed options — AWD, leather, sunroof, premium audio, towing package, safety packages — should be included. Valuation platforms pull these from VIN data. Verify the trim level on your valuation report is correct, as trim errors that omit factory options are among the most common ACV mistakes.",
      },
      {
        question: "Can I recover the full cost of aftermarket wheels?",
        answer:
          "Full recovery is unlikely without a custom equipment endorsement. With receipts and market evidence showing the wheels add value to your vehicle type, a partial depreciated credit is often achievable through negotiation.",
      },
      {
        question: "Should I negotiate factory option errors or aftermarket upgrades first?",
        answer:
          "Always fix factory option and trim level errors first. A trim correction (base to EX-L, for example) typically recovers more ACV than aftermarket negotiation and is easier to win because the evidence is the VIN itself.",
      },
    ],
    sources: [
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "How Insurance Companies Value Your Car",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Vehicle Valuation and Comparables",
        url: "https://www.kbb.com/what-is-my-car-worth/",
        publisher: "Kelley Blue Book",
      },
      {
        title: "Consumer Auto Insurance Guide",
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
    ],
    component: () => import("./articles/aftermarket-upgrades-total-loss"),
  },

  /* ---- 17 ---- */
  {
    slug: "total-loss-deductible",
    title: "Do I Pay a Deductible on a Total Loss? What Your Policy Actually Says",
    metaTitle: "Do I Pay a Deductible on a Total Loss? Complete Guide (2026)",
    metaDescription:
      "Your deductible applies to first-party total loss claims but not to third-party claims. Learn when your deductible applies, how it affects your settlement math, and how to recover it when the accident wasn't your fault.",
    published: "2026-02-22",
    modified: "2026-02-22",
    category: "settlement-basics",
    readingTimeMinutes: 10,
    keywords: [
      "do I pay deductible on total loss",
      "collision deductible total loss",
      "insurance deductible totaled car",
      "total loss deductible waived",
      "recover deductible total loss",
    ],
    faqs: [
      {
        question: "Do I have to pay my deductible on a total loss?",
        answer:
          "It depends on the claim type. On a first-party claim (your own collision or comprehensive coverage), your deductible is subtracted from your ACV settlement. On a third-party claim directly against the at-fault driver's insurer, no deductible applies.",
      },
      {
        question: "Does the deductible apply to a comprehensive total loss like hail or flood?",
        answer:
          "Yes. Your comprehensive deductible applies to comprehensive total losses including hail, flood, fire, and theft. Comprehensive deductibles are typically lower than collision deductibles.",
      },
      {
        question: "Can I recover my deductible if the accident was the other driver's fault?",
        answer:
          "Yes. If you filed under your own collision coverage for speed and the other driver was at fault, your insurer may pursue the at-fault driver's insurer through subrogation and return your deductible if successful. You can also file a separate property damage claim directly with the at-fault insurer for the deductible amount.",
      },
      {
        question: "Does GAP insurance cover my deductible?",
        answer:
          "Standard GAP insurance does not cover your deductible. Some premium GAP products cover up to $1,000 of the deductible. Check your specific GAP policy language.",
      },
      {
        question: "What is a vanishing deductible?",
        answer:
          "A vanishing or disappearing deductible is a policy feature that reduces your deductible by a set amount (typically $50–$100) for each accident-free year. After several clean years, the deductible may reach zero.",
      },
      {
        question: "How does my deductible affect my settlement math?",
        answer:
          "Your deductible is subtracted from your ACV before any check is issued. On a first-party claim with a lienholder, the insurer pays ACV minus deductible to your lender first; any surplus above the loan balance goes to you.",
      },
    ],
    sources: [
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "Auto Insurance Claims Process",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Consumer Guide to Auto Insurance",
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
      {
        title: "What Is GAP Insurance?",
        url: "https://www.consumerfinance.gov/ask-cfpb/what-is-gap-insurance-en-2051/",
        publisher: "Consumer Financial Protection Bureau (CFPB)",
      },
    ],
    component: () => import("./articles/total-loss-deductible"),
  },

  /* ---- 18 ---- */
  {
    slug: "insurance-bad-faith",
    title: "Insurance Bad Faith on a Total Loss Claim: When to Get a Lawyer",
    metaTitle: "Insurance Bad Faith Total Loss: What It Is and When to Act (2026)",
    metaDescription:
      "A low offer is not bad faith. Learn what actually qualifies as insurance bad faith, how to document it, and when to consult an attorney — after exhausting the standard escalation path.",
    published: "2026-02-22",
    modified: "2026-02-22",
    category: "negotiation",
    readingTimeMinutes: 12,
    keywords: [
      "insurance bad faith total loss",
      "suing insurance company bad faith",
      "bad faith insurance claim auto",
      "insurance company acting in bad faith",
      "bad faith insurance lawyer",
    ],
    faqs: [
      {
        question: "What is insurance bad faith?",
        answer:
          "Insurance bad faith is a legal doctrine that allows a policyholder to sue their own insurer for damages beyond the original claim amount when the insurer unreasonably denies or delays a legitimate claim. It requires evidence that the insurer knew the claim was valid and denied or delayed it without a reasonable basis.",
      },
      {
        question: "Is a low settlement offer bad faith?",
        answer:
          "Not automatically. A low offer based on a defensible valuation methodology is a coverage dispute, not bad faith. Bad faith requires more: evidence that the insurer had no reasonable basis for its position and acted with knowledge of that fact. Most total loss disputes are resolved through negotiation, state complaints, or the appraisal clause.",
      },
      {
        question: "What are bad faith indicators in a total loss claim?",
        answer:
          "Red flags include: refusing to provide the valuation report after written request, ignoring specific comparable evidence you submitted without explanation, deliberately misrepresenting policy language, complete communication silence for weeks, missing state-mandated response deadlines without explanation, and denying coverage under a policy provision that does not actually apply.",
      },
      {
        question: "What should I do before consulting a bad faith attorney?",
        answer:
          "Complete the standard escalation path first: written counter-offer with evidence, supervisor escalation, state insurance complaint, and appraisal clause if applicable. Document every communication. Courts and attorneys expect you to have attempted direct resolution.",
      },
      {
        question: "How does first-party bad faith differ from third-party bad faith?",
        answer:
          "First-party bad faith involves your own insurer. Third-party bad faith involves the at-fault driver's insurer acting unreasonably toward you. First-party bad faith is more clearly actionable because you have a direct contractual relationship with your own insurer. Third-party bad faith is more complex and varies significantly by state.",
      },
      {
        question: "Does bad faith law vary by state?",
        answer:
          "Yes, significantly. California, Texas, and Florida have specific bad faith statutes with defined remedies. Other states rely primarily on common law tort principles. The threshold for what constitutes actionable bad faith, the damages available, and the procedural requirements vary widely.",
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
        title: "State Insurance Department Directory",
        url: "https://content.naic.org/state-insurance-departments",
        publisher: "NAIC",
      },
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
    ],
    component: () => import("./articles/insurance-bad-faith"),
  },

  /* ---- 19 ---- */
  {
    slug: "hail-damage-total-loss",
    title: "Hail Damage Total Loss: What to Expect From a Comprehensive Claim",
    metaTitle: "Hail Damage Total Loss: How Comprehensive Claims Work (2026 Guide)",
    metaDescription:
      "Hail can total a perfectly driveable car. Learn how hail total losses are assessed, why the driveable total loss is frustrating but fixable, and when a salvage buyback makes sense for hail damage.",
    published: "2026-02-22",
    modified: "2026-02-22",
    category: "settlement-basics",
    readingTimeMinutes: 11,
    keywords: [
      "hail damage total loss",
      "comprehensive claim total loss hail",
      "hail totaled car insurance",
      "hail damage car settlement",
      "PDR total loss insurance",
    ],
    faqs: [
      {
        question: "Does comprehensive insurance cover hail total loss?",
        answer:
          "Yes. Hail damage is covered under comprehensive coverage, not collision. Your comprehensive deductible applies and fault is irrelevant. If your vehicle does not have comprehensive coverage, hail damage is your financial responsibility.",
      },
      {
        question: "Can a car be totaled from hail damage even if it still drives?",
        answer:
          "Yes. A total loss declaration is based on the repair cost-to-ACV ratio, not driveability. If the paintless dent repair estimate exceeds your state's total loss threshold relative to your vehicle's ACV, the car is declared a total loss even if it runs perfectly.",
      },
      {
        question: "What is paintless dent repair (PDR) and why does it matter?",
        answer:
          "PDR is a specialized repair technique using tools to massage dents out from behind the panel without repainting. It is cheaper than conventional repair for most hail damage. Insurers use PDR rates in hail repair estimates, which affects when the total loss threshold is crossed.",
      },
      {
        question: "Should I exercise a salvage buyback after a hail total loss?",
        answer:
          "It deserves serious consideration for hail totals because the vehicle is typically mechanically sound. Compare the salvage deduction from your settlement against an independent PDR estimate. If the PDR shop can fix the vehicle for less than the salvage deduction, keeping it may be financially justified.",
      },
      {
        question: "How does the condition rating on my valuation report affect my hail settlement?",
        answer:
          "The condition rating should reflect your pre-hail condition, not the post-hail state. The hail damage itself is what is being replaced. If the report applied a condition downgrade based on the hail damage rather than your vehicle's pre-loss condition, dispute it with maintenance records and pre-loss photographs.",
      },
      {
        question: "Will my insurance premium go up after a hail total loss claim?",
        answer:
          "Comprehensive claims typically have less impact on premiums than collision claims, and in many states a single comprehensive claim does not trigger a rate increase. However, this varies by insurer and state. Check with your agent to understand your specific policy's treatment of comprehensive claims.",
      },
    ],
    sources: [
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "Auto Insurance Claims Process",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Consumer Guide to Auto Insurance",
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
      {
        title: "State Insurance Department Directory",
        url: "https://content.naic.org/state-insurance-departments",
        publisher: "NAIC",
      },
    ],
    component: () => import("./articles/hail-damage-total-loss"),
  },

  /* ---- 20 ---- */
  {
    slug: "at-fault-total-loss",
    title: "Total Loss When the Accident Was Your Fault: How Collision Coverage Works",
    metaTitle: "At-Fault Total Loss: How Collision Coverage Pays You (2026 Guide)",
    metaDescription:
      "When the accident was your fault, collision coverage pays your total loss settlement. Learn how deductibles, rental coverage, and ACV negotiation work differently — and what you can still recover.",
    published: "2026-02-22",
    modified: "2026-02-22",
    category: "settlement-basics",
    readingTimeMinutes: 10,
    keywords: [
      "at fault total loss",
      "my fault car accident total loss",
      "collision coverage total loss at fault",
      "at fault accident totaled car",
      "collision claim total loss deductible",
    ],
    faqs: [
      {
        question: "Does insurance pay for my car if the accident was my fault?",
        answer:
          "Yes, if you have collision coverage. Collision coverage pays for damage to your vehicle regardless of fault. Your collision deductible is subtracted from your ACV, and the remainder is your settlement.",
      },
      {
        question: "Do I get a rental car if the accident was my fault?",
        answer:
          "Only if you purchased a rental reimbursement add-on on your own policy. There is no third-party loss-of-use claim when you are at fault. If you did not add rental reimbursement coverage, you pay for a rental car out of pocket.",
      },
      {
        question: "Can I negotiate my ACV settlement when the accident was my fault?",
        answer:
          "Yes. Your right to a fair ACV valuation is the same regardless of fault. The valuation report errors that understate ACV — trim level mistakes, mileage mismatches, geographic comparables — occur at the same rate on at-fault claims.",
      },
      {
        question: "What happens to the other driver's car when I'm at fault?",
        answer:
          "Your property damage liability coverage pays for damage to the other driver's vehicle and other property. Your liability limit determines the maximum your insurer will pay; if the other car's value exceeds your limit, you may be personally responsible for the difference.",
      },
      {
        question: "Will my premium go up after an at-fault total loss?",
        answer:
          "An at-fault accident is typically a chargeable event that may increase your premium at renewal. The amount of the increase varies by insurer, state, and your prior record. Accident forgiveness may apply if you have that endorsement.",
      },
      {
        question: "What if I don't have collision coverage and the accident was my fault?",
        answer:
          "Without collision coverage, your insurer owes you nothing for your own vehicle if you caused the accident. Liability covers the damage you caused to others but not your own car.",
      },
    ],
    sources: [
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "Auto Insurance Claims Process",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Consumer Guide to Auto Insurance",
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
      {
        title: "File a Complaint Against an Insurance Company",
        url: "https://content.naic.org/consumer/file-complaint",
        publisher: "NAIC",
      },
    ],
    component: () => import("./articles/at-fault-total-loss"),
  },

  /* ---- 21 ---- */
  {
    slug: "classic-car-total-loss",
    title: "Classic and Collector Car Total Loss: Agreed Value, Stated Value, and ACV",
    metaTitle: "Classic Car Total Loss Insurance: Agreed Value vs. ACV (2026 Guide)",
    metaDescription:
      "Standard ACV insurance can leave classic car owners devastated at total loss. Learn the difference between agreed value, stated value, and ACV policies — and how to protect a collector vehicle's true market value.",
    published: "2026-02-22",
    modified: "2026-02-22",
    category: "valuation",
    readingTimeMinutes: 12,
    keywords: [
      "classic car total loss insurance",
      "agreed value policy total loss",
      "stated value vs agreed value insurance",
      "vintage car total loss claim",
      "collector car insurance settlement",
    ],
    faqs: [
      {
        question: "Why is standard ACV insurance wrong for classic cars?",
        answer:
          "Standard ACV uses depreciation-based methodology and retail market comparables. Classic and collector vehicles often appreciate in value and trade in specialized collector markets that standard platforms cannot accurately price. An ACV settlement on a classic may be a fraction of actual market value.",
      },
      {
        question: "What is an agreed value policy?",
        answer:
          "An agreed value policy sets a specific insured amount at policy inception based on an appraisal. In a total loss, the insurer pays exactly that amount with no depreciation and no ACV calculation. Agreed value is the gold standard for classic and collector vehicles.",
      },
      {
        question: "What is the difference between agreed value and stated value?",
        answer:
          "An agreed value policy guarantees the stated amount in a total loss. Most stated value policies pay the lesser of the stated amount or ACV at the time of loss — which may be well below what you stated. Read your policy language carefully.",
      },
      {
        question: "What insurers offer agreed value coverage for classic cars?",
        answer:
          "Specialty insurers including Hagerty, Grundy, and American Collectors offer agreed value policies designed for classic and collector vehicles. Some standard carriers also offer classic car divisions. These insurers understand the collector market.",
      },
      {
        question: "What vehicles qualify for classic car insurance?",
        answer:
          "Eligibility varies by insurer but typically requires: vehicle age of 15–25+ years, limited use (pleasure/show only, typically under 7,500 miles/year), enclosed storage, and a separate daily driver. Some insurers accept newer limited-production or specialty vehicles.",
      },
      {
        question: "What documentation helps establish a classic car's value?",
        answer:
          "A professional appraisal from a recognized classic car appraiser or major auction house is the strongest evidence. Supplement with recent comparable auction results (Mecum, Barrett-Jackson, Bring a Trailer), restoration receipts, and photographs documenting condition.",
      },
    ],
    sources: [
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "How Insurance Companies Value Your Car",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Collector Car Valuation Resources",
        url: "https://www.hagerty.com/valuation-tools",
        publisher: "Hagerty",
      },
      {
        title: "Consumer Auto Insurance Information",
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
      {
        title: "Vehicle History and Value",
        url: "https://www.kbb.com/what-is-my-car-worth/",
        publisher: "Kelley Blue Book",
      },
    ],
    component: () => import("./articles/classic-car-total-loss"),
  },

  /* ---- 22 ---- */
  {
    slug: "insurance-adjuster-delay",
    title: "Insurance Adjuster Delay: Your Rights When the Settlement Process Stalls",
    metaTitle: "Insurance Adjuster Not Responding? Your Rights and What to Do (2026)",
    metaDescription:
      "When your insurance adjuster goes silent or the settlement process stalls, you have specific rights and a clear escalation path. Learn the state deadlines, documentation strategy, and escalation steps that get stalled claims moving.",
    published: "2026-02-22",
    modified: "2026-02-22",
    category: "negotiation",
    readingTimeMinutes: 11,
    keywords: [
      "insurance adjuster delay total loss",
      "insurance company delaying claim",
      "adjuster not responding total loss",
      "how to escalate insurance claim",
      "insurance claim taking too long",
    ],
    faqs: [
      {
        question: "How long should a total loss claim take?",
        answer:
          "An uncomplicated claim typically resolves in two to four weeks from declaration to check. If your claim is taking significantly longer and your adjuster is not communicating, check whether any state regulatory deadlines have been missed and document every communication attempt in writing.",
      },
      {
        question: "What state deadlines do insurers have to meet?",
        answer:
          "Most states require acknowledgment within 10 to 15 days of claim filing, a coverage decision within 15 to 40 days of receiving documentation, and payment within 5 to 30 days of settlement agreement. California CCR §2695 is a well-documented example with specific deadlines. Check your state department's website.",
      },
      {
        question: "What should I do if my adjuster is not responding?",
        answer:
          "Switch entirely to email (creates timestamps), request a supervisor's contact information in the same email, and set a specific response deadline. If two written attempts produce no response, escalate to a supervisor. If that fails, file a state insurance complaint.",
      },
      {
        question: "Is a state insurance complaint effective for delays?",
        answer:
          "It can be. A complaint requires the insurer to formally respond on record, creates an official regulatory file, and often prompts internal review that restarts stalled claims. It is free and appropriate when state regulatory deadlines have been missed.",
      },
      {
        question: "How does adjuster delay affect my rental car coverage?",
        answer:
          "Every extra day the claim is delayed costs you more in rental expenses. If your first-party rental cap runs out due to insurer delay, document the delay in writing and request a coverage extension. Out-of-pocket rental costs caused by insurer delay are a legitimate line item in your settlement demand.",
      },
      {
        question: "What if the insurer delays after I accept the settlement?",
        answer:
          "Most states require payment within a specific window after settlement agreement (often 5 to 30 days). If payment is delayed, contact your adjuster in writing citing the state deadline. If no action, a state complaint citing the payment delay is appropriate.",
      },
    ],
    sources: [
      {
        title: "File a Complaint Against an Insurance Company",
        url: "https://content.naic.org/consumer/file-complaint",
        publisher: "NAIC",
      },
      {
        title: "How to Handle an Insurance Claim Dispute",
        url: "https://www.iii.org/article/how-to-handle-an-insurance-claim-dispute",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "State Insurance Department Directory",
        url: "https://content.naic.org/state-insurance-departments",
        publisher: "NAIC",
      },
      {
        title: "Consumer Rights in Insurance Claims",
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
    ],
    component: () => import("./articles/insurance-adjuster-delay"),
  },

  /* ---- 23 ---- */
  {
    slug: "flood-car-total-loss",
    title: "Flood-Damaged Car Total Loss: Comprehensive Claims, Hidden Damage, and Buyback Risks",
    metaTitle: "Flood Damage Total Loss: What Your Comprehensive Claim Covers (2026)",
    metaDescription:
      "Flood damage triggers a comprehensive total loss claim. Learn how hidden electrical damage affects settlements, why you should not rush a flood settlement, and why salvage buybacks on flood vehicles carry serious risks.",
    published: "2026-02-22",
    modified: "2026-02-22",
    category: "settlement-basics",
    readingTimeMinutes: 11,
    keywords: [
      "flood damaged car total loss",
      "flood car insurance claim",
      "comprehensive claim flood total loss",
      "water damage car insurance settlement",
      "flooded car total loss payout",
    ],
    faqs: [
      {
        question: "Does car insurance cover flood damage?",
        answer:
          "Yes, if you have comprehensive coverage. Comprehensive covers flood damage along with other non-collision events. Standard vehicle flood insurance is not available separately — comprehensive auto insurance is the coverage.",
      },
      {
        question: "Why is flood damage harder to assess than collision damage?",
        answer:
          "Water damage to electronics, wiring harnesses, and mechanical systems is not always immediately visible. Corrosion develops over days and weeks after exposure. An initial inspection may significantly underestimate repair costs that only become apparent after disassembly.",
      },
      {
        question: "Should I accept a quick settlement on a flood claim?",
        answer:
          "No. The biggest risk in flood claims is settling before the full extent of hidden damage is documented. Request confirmation that the vehicle was fully disassembled and inspected before accepting. The initial visible damage is often a fraction of the true repair cost.",
      },
      {
        question: "Is a salvage buyback a good idea after flood damage?",
        answer:
          "For most flood totals, particularly those with above-seat waterline, the risks outweigh the benefits. Latent electronic failures can create safety hazards weeks after the vehicle appears functional. Flood-damaged vehicles have limited resale markets and significant disclosure requirements.",
      },
      {
        question: "Does standard NFIP flood insurance cover my car?",
        answer:
          "No. NFIP (National Flood Insurance Program) flood insurance covers structures and their contents but not personal vehicles. Vehicle flood coverage is provided through comprehensive auto insurance only.",
      },
      {
        question: "How does waterline height affect the total loss determination?",
        answer:
          "Higher waterline means more electrical and mechanical exposure and higher repair costs. Full submersion or dashboard-level water almost always triggers a total loss. Floor-level water in a lower-value vehicle may also total the car because interior replacement plus drying costs are significant.",
      },
    ],
    sources: [
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "Auto Insurance Claims Process",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "NFIP Flood Insurance Information",
        url: "https://www.floodsmart.gov/",
        publisher: "FEMA / FloodSmart",
      },
      {
        title: "Consumer Guide to Auto Insurance",
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
    ],
    component: () => import("./articles/flood-car-total-loss"),
  },

  /* ---- 24 ---- */
  {
    slug: "upside-down-car-loan-total-loss",
    title: "Upside Down on Your Car Loan After a Total Loss: What Happens Next",
    metaTitle: "Upside Down Car Loan After Total Loss: How It Works and What to Do (2026)",
    metaDescription:
      "Owe more than your car is worth? Learn exactly how total loss settlements are distributed when you're upside down, how GAP insurance works, and what your options are without it.",
    published: "2026-02-22",
    modified: "2026-02-22",
    category: "settlement-basics",
    readingTimeMinutes: 11,
    keywords: [
      "upside down car loan total loss",
      "owe more than car worth total loss",
      "negative equity total loss insurance",
      "car loan total loss deficiency",
      "total loss loan balance",
    ],
    faqs: [
      {
        question: "What happens if I owe more than my car is worth when it's totaled?",
        answer:
          "Your insurer pays your lender the vehicle's ACV (minus your deductible). If the ACV is less than your loan balance, you still owe your lender the difference. Unless you have GAP insurance, this deficiency is your responsibility.",
      },
      {
        question: "How does GAP insurance help when I'm upside down?",
        answer:
          "GAP insurance covers the difference between your ACV settlement and your outstanding loan or lease balance. Your primary insurer pays the lender the ACV; GAP pays the remaining deficiency. Your loan is satisfied.",
      },
      {
        question: "Does GAP insurance cover my deductible?",
        answer:
          "Standard GAP insurance does not cover your deductible. Some premium products cover up to $1,000 of it. Check your specific GAP policy language.",
      },
      {
        question: "What if I don't have GAP insurance and I'm upside down?",
        answer:
          "Negotiate your ACV as high as possible to reduce the deficiency. Verify your loan balance and check for refundable products financed into the loan. Contact your lender proactively to arrange a payment plan on the deficiency before it goes to collections.",
      },
      {
        question: "Should I still negotiate my ACV if I'm upside down?",
        answer:
          "Absolutely. Every dollar added to your ACV through negotiation reduces the deficiency you owe. The average initial offer is $2,800 to $4,200 below fair market value — correcting that shortfall directly reduces your out-of-pocket obligation.",
      },
      {
        question: "What is the difference between dealer GAP and policy loan/lease payoff coverage?",
        answer:
          "Dealer/standalone GAP often covers larger gaps (25%–150% of ACV or more). Policy add-on loan/lease payoff coverage is cheaper but typically caps coverage at 25% of ACV, which may not cover large negative equity gaps.",
      },
    ],
    sources: [
      {
        title: "What Is GAP Insurance?",
        url: "https://www.consumerfinance.gov/ask-cfpb/what-is-gap-insurance-en-2051/",
        publisher: "Consumer Financial Protection Bureau (CFPB)",
      },
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
      {
        title: "Auto Insurance Claims Process",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Vehicle Depreciation Data",
        url: "https://www.kbb.com/car-advice/vehicle-depreciation/",
        publisher: "Kelley Blue Book",
      },
      {
        title: "Consumer Financial Protection Information",
        url: "https://www.consumerfinance.gov/",
        publisher: "Consumer Financial Protection Bureau (CFPB)",
      },
    ],
    component: () => import("./articles/upside-down-car-loan-total-loss"),
  },

  /* ---- 25 ---- */
  {
    slug: "comparable-vehicles-total-loss",
    title: "How to Find Your Own Comparable Vehicles to Dispute a Total Loss Offer",
    metaTitle: "Finding Comparable Vehicles for a Total Loss Dispute (2026 Guide)",
    metaDescription:
      "The insurer's comparables drive your settlement. Learn how to find better-matched vehicles on Cars.com, AutoTrader, and CarGurus, document them correctly, and submit them in a winning counter-offer.",
    published: "2026-02-22",
    modified: "2026-02-22",
    category: "valuation",
    readingTimeMinutes: 12,
    keywords: [
      "comparable vehicles total loss",
      "how to find comparable cars insurance claim",
      "dispute comparable vehicles total loss",
      "find comparables for insurance settlement",
      "comparable cars ACV dispute",
    ],
    faqs: [
      {
        question: "Why do comparable vehicles matter in a total loss?",
        answer:
          "Your insurer's valuation report is built on comparable vehicle listings. When those comparables have the wrong trim level, too-high mileage, or are from a different geographic market, your ACV is understated. Providing corrected comparables is the most direct way to dispute a low offer.",
      },
      {
        question: "Where should I look for comparable vehicles?",
        answer:
          "Cars.com, AutoTrader, CarGurus, Carvana, and CarMax are the primary sources. For classic vehicles, Bring a Trailer, Hemmings, and Mecum/Barrett-Jackson auction results provide collector market data.",
      },
      {
        question: "What makes a comparable vehicle accurate?",
        answer:
          "An accurate comparable matches your vehicle's year, make, model, trim level, drivetrain, and major options. It should be within 10,000–15,000 miles of your vehicle's mileage, within 50–100 miles geographically, and from a current listing (within the past 30 days).",
      },
      {
        question: "How many comparables do I need for a counter-offer?",
        answer:
          "Three to five well-matched comparables are typically sufficient. Quality beats quantity. A small set of highly accurate comparables is more persuasive than a large collection of loosely matched listings.",
      },
      {
        question: "Will the insurer adjust my comparables?",
        answer:
          "Yes. Adjustments will be applied for mileage differences, option differences, and geographic variations. Understanding that adjustments will occur helps you present comparables that support your case even after adjustments are applied.",
      },
      {
        question: "Can I submit comparables from private sellers?",
        answer:
          "Yes, but dealer listings are generally more credible because they are professionally priced and verifiable. A mix of dealer and private seller listings is acceptable; note the source type for each comparable.",
      },
    ],
    sources: [
      {
        title: "How Insurance Companies Value Your Car",
        url: "https://www.iii.org/article/how-to-file-a-motor-vehicle-insurance-claim",
        publisher: "Insurance Information Institute (III)",
      },
      {
        title: "Understanding Vehicle Valuation",
        url: "https://www.kbb.com/what-is-my-car-worth/",
        publisher: "Kelley Blue Book",
      },
      {
        title: "NADA Used Car Guide",
        url: "https://www.nadaguides.com/",
        publisher: "J.D. Power / NADA",
      },
      {
        title: "Consumer Auto Insurance Guide",
        url: "https://www.usa.gov/car-insurance",
        publisher: "USA.gov",
      },
      {
        title: "Understanding Your Auto Insurance Policy",
        url: "https://content.naic.org/consumer/understanding-your-auto-insurance-policy",
        publisher: "NAIC",
      },
    ],
    component: () => import("./articles/comparable-vehicles-total-loss"),
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
