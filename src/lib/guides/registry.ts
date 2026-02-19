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
