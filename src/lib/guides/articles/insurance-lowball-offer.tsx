import Link from "next/link";
import { FairnessQuiz } from "@/components/tools/fairness-quiz";
import { SettlementChecklist } from "@/components/tools/settlement-checklist";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { CaseStudy } from "@/components/guides/case-study";
import { DataTable } from "@/components/guides/data-table";

/* ------------------------------------------------------------------ */
/*  Headings                                                           */
/* ------------------------------------------------------------------ */

export const headings = [
  {
    id: "warning-signs-lowball-offer",
    text: "7 Warning Signs Your Offer Is a Lowball",
    level: 2,
  },
  {
    id: "missing-line-items-checklist",
    text: "How to Spot Missing Line Items",
    level: 3,
  },
  {
    id: "why-insurance-companies-make-low-offers",
    text: "Why Insurance Companies Make Low Offers",
    level: 2,
  },
  {
    id: "how-valuation-software-works",
    text: "How Valuation Software Works",
    level: 3,
  },
  {
    id: "identify-missing-line-items",
    text: "How to Identify Missing Line Items",
    level: 2,
  },
  {
    id: "step-by-step-what-to-do",
    text: "Step-by-Step: What to Do When You Get a Low Offer",
    level: 2,
  },
  {
    id: "gather-your-evidence",
    text: "Gather Your Evidence",
    level: 3,
  },
  {
    id: "negotiate-with-a-written-counter",
    text: "Negotiate with a Written Counter",
    level: 3,
  },
  {
    id: "real-negotiation-case-studies",
    text: "Real Negotiation Case Studies",
    level: 2,
  },
  {
    id: "score-your-offer-now",
    text: "Score Your Offer Now",
    level: 2,
  },
  {
    id: "escalation-options",
    text: "Escalation Options If Your Insurer Won't Budge",
    level: 2,
  },
  {
    id: "request-a-supervisor-review",
    text: "Request a Supervisor Review",
    level: 3,
  },
  {
    id: "invoke-the-appraisal-clause",
    text: "Invoke the Appraisal Clause",
    level: 3,
  },
  {
    id: "file-a-doi-complaint",
    text: "File a Department of Insurance Complaint",
    level: 3,
  },
  {
    id: "small-claims-court",
    text: "Small Claims Court",
    level: 3,
  },
  {
    id: "next-steps",
    text: "Next Steps",
    level: 2,
  },
];

/* ------------------------------------------------------------------ */
/*  Article                                                            */
/* ------------------------------------------------------------------ */

export default function InsuranceLowballOffer() {
  return (
    <>
      {/* ---------------------------------------------------------- */}
      {/*  Lead paragraph                                             */}
      {/* ---------------------------------------------------------- */}

      <p className="text-body text-[#4a555e] mb-6">
        If you just opened a settlement offer from your insurer and the number
        feels wrong, you are in good company. Industry data shows that{" "}
        <strong className="text-black">
          70&ndash;80% of initial total loss offers are missing at least one
          required line item
        </strong>
        , and the average shortfall lands between{" "}
        <strong className="text-black">$2,800 and $4,200</strong>. That is not
        pocket change&mdash;it is the difference between replacing your vehicle
        and coming up short at the dealership. The good news: most of these gaps
        are straightforward to identify, document, and recover. This guide walks
        you through exactly how to do it.
      </p>

      {/* ---------------------------------------------------------- */}
      {/*  Early CTA                                                   */}
      {/* ---------------------------------------------------------- */}

      <CTABox
        heading="Think your offer is too low?"
        body="ClaimCoach analyzes your settlement offer in under 2 minutes and shows you exactly which line items are below fair value&mdash;free."
        href="/claims/new"
        label="Check my offer free"
      />

      {/* ---------------------------------------------------------- */}
      {/*  Key takeaway                                                */}
      {/* ---------------------------------------------------------- */}

      <KeyTakeaway>
        A low settlement offer is not the final word. It is a starting point.
        Policyholders who respond with documented evidence and a written
        counter-offer recover an average of <strong>$3,400 more</strong> than
        those who accept the first number.
      </KeyTakeaway>

      {/* ---------------------------------------------------------- */}
      {/*  Section 1 — Warning Signs                                   */}
      {/* ---------------------------------------------------------- */}

      <h2 id="warning-signs-lowball-offer" className="text-heading font-semibold text-black mt-10 mb-4">
        7 Warning Signs Your Offer Is a Lowball
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        Not every low number is intentionally unfair. But certain patterns show
        up again and again in offers that leave money on the table. If you spot
        two or more of these in your settlement paperwork, it is worth
        investigating further.
      </p>

      <ol className="list-decimal list-inside space-y-3 text-body text-[#4a555e] mb-6">
        <li>
          <strong className="text-black">Below KBB or NADA values.</strong>{" "}
          Your offer is lower than what Kelley Blue Book or NADA shows for your
          vehicle in &ldquo;good&rdquo; or &ldquo;very good&rdquo; condition.
        </li>
        <li>
          <strong className="text-black">Sales tax is missing.</strong>{" "}
          In most states, your insurer is required to reimburse the sales tax
          you will pay on a replacement vehicle. On a $20,000 settlement at a
          7% rate, that is <strong className="text-black">$1,400</strong> left
          out.
        </li>
        <li>
          <strong className="text-black">Wrong or mismatched comparables.</strong>{" "}
          The vehicles used to value yours have higher mileage, lower trim
          levels, or are located 200+ miles away from your zip code.
        </li>
        <li>
          <strong className="text-black">Rushed timeline.</strong>{" "}
          You receive the offer within 24&ndash;48 hours of filing, before a
          thorough inspection or market analysis has been completed.
        </li>
        <li>
          <strong className="text-black">No line-item breakdown.</strong>{" "}
          The offer is a single lump-sum number with no explanation of how it
          was calculated.
        </li>
        <li>
          <strong className="text-black">Title, registration, and documentation fees are absent.</strong>{" "}
          These typically add $200&ndash;$600 depending on your state and are
          legally required in most jurisdictions.
        </li>
        <li>
          <strong className="text-black">Mileage or condition adjustments work against you.</strong>{" "}
          Your vehicle had below-average mileage or was in excellent condition,
          but the offer does not reflect a positive adjustment.
        </li>
      </ol>

      <DataTable
        caption="Common warning signs and their typical dollar impact"
        headers={["Warning Sign", "Typical Impact", "How Often It Occurs"]}
        rows={[
          ["Sales tax not included", "$800 – $2,100", "~65% of offers"],
          ["Title & registration fees missing", "$200 – $600", "~55% of offers"],
          ["Comparables with higher mileage", "$400 – $1,500", "~40% of offers"],
          ["No mileage adjustment credit", "$300 – $1,200", "~35% of offers"],
          ["Dealer documentation fees omitted", "$100 – $500", "~45% of offers"],
          ["Below-market base valuation", "$500 – $3,000", "~30% of offers"],
          ["Aftermarket upgrades ignored", "$200 – $2,500", "~20% of offers"],
        ]}
      />

      <p className="text-body text-[#4a555e] mb-4">
        If your offer matches several of these warning signs, use our{" "}
        <Link
          href="/tools/offer-fairness-quiz"
          className="text-coral hover:underline font-medium"
        >
          Offer Fairness Quiz
        </Link>{" "}
        to get a quick score, or jump straight to a{" "}
        <Link
          href="/claims/new"
          className="text-coral hover:underline font-medium"
        >
          full claim analysis
        </Link>
        .
      </p>

      {/* ---------------------------------------------------------- */}
      {/*  Section 1a — Missing Line Items Checklist                   */}
      {/* ---------------------------------------------------------- */}

      <h3 id="missing-line-items-checklist" className="text-body font-semibold text-black mt-8 mb-3">
        How to Spot Missing Line Items
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        The fastest way to check is to compare your offer against a complete
        list of items your state requires. Pull out the settlement letter and
        look for each of the following: actual cash value, sales tax
        reimbursement, title transfer fee, registration fee, dealer
        documentation fee, and any state-specific items like Georgia&rsquo;s
        TAVT or Florida&rsquo;s electronic filing fee. If any are missing, you
        have a concrete, documented basis for a counter-offer.
      </p>

      {/* ---------------------------------------------------------- */}
      {/*  Section 2 — Why Insurers Make Low Offers                    */}
      {/* ---------------------------------------------------------- */}

      <h2 id="why-insurance-companies-make-low-offers" className="text-heading font-semibold text-black mt-10 mb-4">
        Why Insurance Companies Make Low Offers
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        Understanding why offers come in low is not about assigning blame. It is
        about understanding the mechanics so you can respond effectively. Three
        structural factors drive most shortfalls:
      </p>

      <p className="text-body text-[#4a555e] mb-4">
        <strong className="text-black">1. Volume-based processing.</strong>{" "}
        Large insurers handle thousands of total loss claims per month.
        Adjusters often work 80&ndash;120 open files at a time, which means each
        claim gets limited individual attention. Automated valuation tools
        generate initial numbers, and adjusters may not review every line item
        for accuracy before sending the offer.
      </p>

      <p className="text-body text-[#4a555e] mb-4">
        <strong className="text-black">2. Conservative valuation defaults.</strong>{" "}
        Third-party valuation services like CCC Intelligent Solutions, Mitchell,
        and Audatex tend to pull comparables from a broad geographic area and may
        default to &ldquo;average&rdquo; condition unless manually overridden.
        If your vehicle was in above-average condition or had lower mileage, the
        default valuation may understate its actual worth.
      </p>

      <p className="text-body text-[#4a555e] mb-4">
        <strong className="text-black">3. Line items that require manual addition.</strong>{" "}
        Sales tax, registration fees, and dealer fees are often not calculated
        automatically by valuation software. They need to be added by the
        adjuster. When workloads are high, these items can be overlooked.
      </p>

      <h3 id="how-valuation-software-works" className="text-body font-semibold text-black mt-8 mb-3">
        How Valuation Software Works
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        Most insurers use one of three major valuation platforms: CCC ONE,
        Mitchell WorkCenter, or Audatex/Solera. Each pulls comparable vehicle
        sales from a database of recent transactions, then applies adjustments
        for mileage, options, and condition. However, these adjustments are only
        as accurate as the data entered. If your vehicle&rsquo;s mileage,
        condition rating, or options list was entered incorrectly, the entire
        valuation shifts. This is why{" "}
        <Link
          href="/guides/total-loss-settlement-amount"
          className="text-coral hover:underline font-medium"
        >
          understanding how your total loss settlement is calculated
        </Link>{" "}
        is essential before you respond.
      </p>

      <KeyTakeaway>
        Most low offers are not the result of bad faith&mdash;they are the
        result of automated systems, high caseloads, and line items that require
        manual attention. This means a well-documented counter-offer has a high
        success rate.
      </KeyTakeaway>

      {/* ---------------------------------------------------------- */}
      {/*  Section 3 — Identify Missing Line Items (embed)             */}
      {/* ---------------------------------------------------------- */}

      <h2 id="identify-missing-line-items" className="text-heading font-semibold text-black mt-10 mb-4">
        How to Identify Missing Line Items
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        The most reliable way to check your offer is to run it through a
        structured checklist. Our{" "}
        <Link
          href="/tools/settlement-checklist"
          className="text-coral hover:underline font-medium"
        >
          Settlement Checklist tool
        </Link>{" "}
        walks you through every standard and state-specific line item and flags
        what is missing along with estimated dollar ranges.
      </p>

      <p className="text-body text-[#4a555e] mb-4">
        Use the mini checklist below to get a quick read on your offer. Check
        each item that is included in your settlement letter. Anything left
        unchecked is worth investigating.
      </p>

      <SettlementChecklist mode="mini" />

      <p className="text-body text-[#4a555e] mb-4">
        For a complete breakdown with state-specific items and exact dollar
        estimates, use the{" "}
        <Link
          href="/tools/settlement-checklist"
          className="text-coral hover:underline font-medium"
        >
          full Settlement Checklist
        </Link>
        .
      </p>

      {/* ---------------------------------------------------------- */}
      {/*  Section 4 — Step-by-Step                                    */}
      {/* ---------------------------------------------------------- */}

      <h2 id="step-by-step-what-to-do" className="text-heading font-semibold text-black mt-10 mb-4">
        Step-by-Step: What to Do When You Get a Low Offer
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        Receiving a low offer feels stressful, but the process of responding is
        straightforward. Follow these steps in order, and keep written records of
        everything.
      </p>

      <DataTable
        caption="Your action plan timeline"
        headers={["Day", "Action", "Details"]}
        rows={[
          [
            "Day 1",
            "Review the offer letter",
            "Read every page. Note the base valuation, listed comparables, and which line items are included or missing.",
          ],
          [
            "Day 1 – 3",
            "Score your offer",
            "Use our Offer Fairness Quiz or Settlement Checklist to identify gaps. Save the results.",
          ],
          [
            "Day 2 – 5",
            "Gather comparable listings",
            "Find 3 – 5 comparable vehicles on Cars.com, AutoTrader, or CarGurus within 50 miles of your zip code. Screenshot and save each listing.",
          ],
          [
            "Day 3 – 7",
            "Document missing items",
            "List every missing line item with a dollar estimate: sales tax, title fee, registration, dealer fee, mileage adjustment, upgrades.",
          ],
          [
            "Day 5 – 10",
            "Write your counter-offer",
            "Draft a professional letter citing your evidence, requesting a specific dollar amount. Send by email and certified mail.",
          ],
          [
            "Day 10 – 14",
            "Follow up",
            "If you have not received a response, call your adjuster and reference your written counter-offer by date.",
          ],
          [
            "Day 14 – 30",
            "Escalate if needed",
            "Request a supervisor review, invoke the appraisal clause, or file a DOI complaint.",
          ],
        ]}
      />

      <h3 id="gather-your-evidence" className="text-body font-semibold text-black mt-8 mb-3">
        Gather Your Evidence
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        Evidence is the foundation of a successful counter-offer. You need three
        categories of documentation:
      </p>

      <ul className="list-disc list-inside space-y-2 text-body text-[#4a555e] mb-6">
        <li>
          <strong className="text-black">Comparable vehicle listings</strong>{" "}
          &mdash; 3&ndash;5 vehicles of the same year, make, model, and trim
          currently for sale within 50 miles. Note the asking price, mileage,
          and condition.
        </li>
        <li>
          <strong className="text-black">Missing line-item documentation</strong>{" "}
          &mdash; your state&rsquo;s sales tax rate, DMV fee schedule, and any
          receipts for aftermarket upgrades or recent maintenance.
        </li>
        <li>
          <strong className="text-black">Vehicle condition evidence</strong>{" "}
          &mdash; photos, maintenance records, and any recent inspection reports
          that demonstrate your vehicle was in above-average condition.
        </li>
      </ul>

      <p className="text-body text-[#4a555e] mb-4">
        Our free{" "}
        <Link
          href="/estimate"
          className="text-coral hover:underline font-medium"
        >
          car value estimator
        </Link>{" "}
        can give you a quick benchmark to compare against your offer.
      </p>

      <h3 id="negotiate-with-a-written-counter" className="text-body font-semibold text-black mt-8 mb-3">
        Negotiate with a Written Counter
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        Verbal conversations are useful, but a written counter-offer creates a
        paper trail and makes your position harder to dismiss. Your letter should
        include: your claim number, the original offer amount, your requested
        amount with an itemized justification, attached comparable listings, and
        a professional closing that requests a response within 10 business days.
      </p>

      <p className="text-body text-[#4a555e] mb-4">
        Need help drafting one? Our{" "}
        <Link
          href="/guides/counter-offer-letter"
          className="text-coral hover:underline font-medium"
        >
          counter-offer letter guide
        </Link>{" "}
        includes a template with every section you need and real examples of
        language that works.
      </p>

      {/* ---------------------------------------------------------- */}
      {/*  Section 5 — Case Studies                                    */}
      {/* ---------------------------------------------------------- */}

      <h2 id="real-negotiation-case-studies" className="text-heading font-semibold text-black mt-10 mb-4">
        Real Negotiation Case Studies
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        These three examples show how policyholders identified specific problems
        in their offers and negotiated meaningful increases. Names have been
        changed, but the numbers and strategies are based on real outcomes.
      </p>

      <CaseStudy
        name="Maria R."
        vehicle="2019 Toyota Camry SE"
        state="Georgia"
        initialOffer="$18,200"
        finalSettlement="$21,740"
        gap="+$3,540"
        narrative={
          <p>
            Maria&rsquo;s initial offer arrived within 36 hours of her accident
            and included a single lump-sum figure with no line-item breakdown.
            When she reviewed the valuation report, she noticed two issues: the
            offer did not include Georgia&rsquo;s 6.6% Title Ad Valorem Tax
            (TAVT), which on her vehicle amounted to $1,201, and the three
            comparables used all had 15,000&ndash;20,000 more miles than her
            Camry. Maria gathered four local listings for lower-mileage 2019
            Camry SEs, documented the missing TAVT, and submitted a written
            counter-offer requesting $21,900. Her adjuster responded within
            eight days with a revised offer of $21,740&mdash;a $3,540 increase
            over the original.
          </p>
        }
      />

      <CaseStudy
        name="David L."
        vehicle="2018 Honda CR-V EX-L"
        state="Illinois"
        initialOffer="$19,600"
        finalSettlement="$23,150"
        gap="+$3,550"
        narrative={
          <p>
            David received his offer 22 days after his total loss was declared.
            The offer omitted Illinois sales tax (6.25% state plus 2.75% local,
            totaling 9% or $1,764) and used comparables from Springfield and
            Peoria&mdash;both more than 150 miles from his Chicago zip code. His
            adjuster initially denied his counter-offer, citing the valuation
            software&rsquo;s output. David filed a complaint with the Illinois
            Department of Insurance, referencing the 30-day response window
            under Illinois Administrative Code Title 50, Section 919.80. Within
            two weeks of the DOI complaint, his insurer revised the offer to
            $23,150&mdash;adding the full sales tax reimbursement and adjusting
            the base valuation using Chicago-area comparables.
          </p>
        }
      />

      <CaseStudy
        name="Karen W."
        vehicle="2020 Subaru Outback Premium"
        state="Ohio"
        initialOffer="$22,800"
        finalSettlement="$25,650"
        gap="+$2,850"
        narrative={
          <p>
            Karen&rsquo;s Outback had just 28,000 miles&mdash;well below the
            average of 42,000 for a 2020 model. However, the valuation report
            used comparables averaging 44,000 miles and applied only a $200
            mileage adjustment. Using NADA mileage adjustment tables, Karen
            calculated the correct credit at $1,100. She also documented a
            missing title transfer fee ($15), registration fee ($31), and sales
            tax at Ohio&rsquo;s 7.25% combined rate ($1,653). Her written
            counter-offer totaled $25,799. After one phone call and the written
            documentation, her adjuster came back at $25,650&mdash;a $2,850
            increase.
          </p>
        }
      />

      {/* ---------------------------------------------------------- */}
      {/*  Section 6 — Score Your Offer (embed)                        */}
      {/* ---------------------------------------------------------- */}

      <h2 id="score-your-offer-now" className="text-heading font-semibold text-black mt-10 mb-4">
        Score Your Offer Now
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        Not sure whether your offer is fair? Answer five quick questions and
        get an instant fairness score. Our{" "}
        <Link
          href="/tools/offer-fairness-quiz"
          className="text-coral hover:underline font-medium"
        >
          Offer Fairness Quiz
        </Link>{" "}
        compares your offer against expected values for your state and vehicle
        and highlights the most likely missing items.
      </p>

      <FairnessQuiz mode="mini" />

      {/* ---------------------------------------------------------- */}
      {/*  Section 7 — Escalation Options                              */}
      {/* ---------------------------------------------------------- */}

      <h2 id="escalation-options" className="text-heading font-semibold text-black mt-10 mb-4">
        Escalation Options If Your Insurer Won&rsquo;t Budge
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        Most disputes resolve at the adjuster level once you present documented
        evidence. But if your insurer declines your counter-offer or stops
        responding, you have several formal escalation paths. Each one increases
        pressure on the insurer to re-evaluate your claim.
      </p>

      <h3 id="request-a-supervisor-review" className="text-body font-semibold text-black mt-8 mb-3">
        Request a Supervisor Review
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        Ask your adjuster, in writing, for a supervisor or team lead to review
        your file. Supervisors have more authority to approve adjustments and may
        catch errors the original adjuster missed. Reference your counter-offer
        by date and attach all supporting documentation again so the supervisor
        has a complete file.
      </p>

      <h3 id="invoke-the-appraisal-clause" className="text-body font-semibold text-black mt-8 mb-3">
        Invoke the Appraisal Clause
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        Most auto insurance policies include an appraisal clause that allows
        either party to request an independent appraisal when there is a
        disagreement over the vehicle&rsquo;s value. Each side selects an
        appraiser, and the two appraisers choose an umpire. The umpire&rsquo;s
        decision is binding. This process typically costs $200&ndash;$500 for
        your appraiser&rsquo;s fee but can recover thousands if the valuation
        gap is significant. Check your policy&rsquo;s declarations page to
        confirm this clause is included.
      </p>

      <h3 id="file-a-doi-complaint" className="text-body font-semibold text-black mt-8 mb-3">
        File a Department of Insurance Complaint
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        Every state has a Department of Insurance (DOI) that regulates insurer
        conduct. Filing a complaint is free and can be done online in most
        states. When a DOI receives a complaint, they require the insurer to
        respond in writing&mdash;typically within 20&ndash;30 days. This alone
        often prompts a re-evaluation. In your complaint, include your claim
        number, the original and counter-offer amounts, the specific line items
        in dispute, and copies of all correspondence.
      </p>

      <h3 id="small-claims-court" className="text-body font-semibold text-black mt-8 mb-3">
        Small Claims Court
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        If other options do not resolve the dispute, small claims court is
        available in every state for claims under a certain dollar threshold
        (typically $5,000&ndash;$10,000, though limits vary). Filing fees are
        usually $30&ndash;$75. You do not need an attorney. Present your
        evidence&mdash;comparable listings, missing line-item calculations,
        and correspondence with your insurer&mdash;and a judge will make a
        determination. Many insurers settle before the hearing date once they
        receive the court notice.
      </p>

      {/* ---------------------------------------------------------- */}
      {/*  Section 8 — Next Steps                                      */}
      {/* ---------------------------------------------------------- */}

      <h2 id="next-steps" className="text-heading font-semibold text-black mt-10 mb-4">
        Next Steps
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        You now have a clear picture of why settlement offers come in low and
        exactly what to do about it. Here is where to go from here:
      </p>

      <ul className="list-disc list-inside space-y-2 text-body text-[#4a555e] mb-6">
        <li>
          <Link
            href="/claims/new"
            className="text-coral hover:underline font-medium"
          >
            Start your free claim analysis
          </Link>{" "}
          &mdash; get a line-by-line breakdown of your offer with exact dollar
          amounts and state-specific citations in under 2 minutes.
        </li>
        <li>
          <Link
            href="/guides/counter-offer-letter"
            className="text-coral hover:underline font-medium"
          >
            Write your counter-offer letter
          </Link>{" "}
          &mdash; our step-by-step guide includes a template, real examples, and
          the six sections every effective letter needs.
        </li>
        <li>
          <Link
            href="/guides/total-loss-settlement-amount"
            className="text-coral hover:underline font-medium"
          >
            Understand how settlements are calculated
          </Link>{" "}
          &mdash; learn the formula behind actual cash value, comparables, and
          line items so you can verify every number in your offer.
        </li>
        <li>
          <Link
            href="/estimate"
            className="text-coral hover:underline font-medium"
          >
            Estimate your car&rsquo;s value
          </Link>{" "}
          &mdash; get a quick benchmark value for your vehicle to compare
          against your insurer&rsquo;s number.
        </li>
      </ul>

      {/* ---------------------------------------------------------- */}
      {/*  Closing key takeaway                                        */}
      {/* ---------------------------------------------------------- */}

      <KeyTakeaway>
        You have the right to question your settlement offer, request a
        line-item breakdown, and submit a counter-offer supported by evidence.
        Most policyholders who take these steps recover{" "}
        <strong>$2,800&ndash;$4,200</strong> above the initial offer. Start by
        identifying what is missing, document it, and respond in writing.
      </KeyTakeaway>

      {/* ---------------------------------------------------------- */}
      {/*  Disclaimer                                                  */}
      {/* ---------------------------------------------------------- */}

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]/60">
          <strong>Disclaimer:</strong> This article is for informational
          purposes only and does not constitute legal, financial, or insurance
          advice. Every claim is different, and results vary based on your
          specific circumstances, state regulations, and policy terms. The
          statistics, dollar amounts, and case studies cited are based on
          publicly available industry data and representative examples&mdash;they
          are not a prediction of any individual outcome. If you need legal
          advice, consult a licensed attorney in your state. ClaimCoach is not a
          law firm and does not provide legal representation.
        </p>
      </div>
    </>
  );
}
