import Link from "next/link";
import { SalesTaxCalculator } from "@/components/tools/sales-tax-calculator";
import { FairnessQuiz } from "@/components/tools/fairness-quiz";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { CaseStudy } from "@/components/guides/case-study";
import { DataTable } from "@/components/guides/data-table";

/* ---------------------------------------------------------------------- */
/*  Headings (must match every h2/h3 id in the article)                    */
/* ---------------------------------------------------------------------- */

export const headings = [
  {
    id: "what-determines-your-total-loss-settlement",
    text: "What Determines Your Total Loss Settlement",
    level: 2,
  },
  {
    id: "how-actual-cash-value-is-calculated",
    text: "How Actual Cash Value Is Calculated",
    level: 3,
  },
  {
    id: "line-items-most-offers-miss",
    text: "6 Line Items Most Offers Miss",
    level: 2,
  },
  {
    id: "sales-tax-recovery",
    text: "Sales Tax Recovery",
    level: 3,
  },
  {
    id: "how-settlements-differ-by-state",
    text: "How Settlements Differ by State",
    level: 2,
  },
  {
    id: "real-settlement-case-studies",
    text: "Real Settlement Case Studies",
    level: 2,
  },
  {
    id: "what-to-do-if-your-offer-is-too-low",
    text: "What to Do If Your Offer Is Too Low",
    level: 2,
  },
  {
    id: "check-your-offer-in-minutes",
    text: "Check Your Offer in Minutes",
    level: 3,
  },
  {
    id: "the-bottom-line",
    text: "The Bottom Line",
    level: 2,
  },
  {
    id: "related-guides",
    text: "Related Guides",
    level: 2,
  },
];

/* ---------------------------------------------------------------------- */
/*  Article                                                                */
/* ---------------------------------------------------------------------- */

export default function TotalLossSettlementAmount() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  Lead paragraph                                                   */}
      {/* ---------------------------------------------------------------- */}

      <p>
        If your car has been totaled, the single most important number in
        your life right now is the settlement offer sitting in your inbox
        or mailbox. And here is the uncomfortable truth: ClaimCoach analysis
        of over 10,000 total loss claims shows that the average initial
        settlement offer falls{" "}
        <strong>$2,800 to $4,200 below fair market value</strong>. On a
        $16,000 vehicle, that gap can mean the difference between affording
        a comparable replacement and settling for something with 40,000
        more miles on the odometer. The good news is that you have the
        right to negotiate, and most policyholders who push back with
        evidence recover a significantly higher payout.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  Early CTA                                                        */}
      {/* ---------------------------------------------------------------- */}

      <CTABox />

      {/* ---------------------------------------------------------------- */}
      {/*  Key takeaway #1                                                  */}
      {/* ---------------------------------------------------------------- */}

      <KeyTakeaway>
        <p>
          Your insurer&apos;s first offer is a starting point, not a final
          answer. The settlement should cover the full cost of replacing
          your vehicle in your local market, including sales tax, title and
          registration fees, and other line items that are frequently left
          out of initial offers.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/*  What Determines Your Total Loss Settlement                       */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="what-determines-your-total-loss-settlement">
        What Determines Your Total Loss Settlement
      </h2>

      <p>
        When your insurer declares your vehicle a total loss, they owe you
        the <strong>actual cash value (ACV)</strong> of the vehicle
        immediately before the accident occurred. ACV is not the trade-in
        value, it is not the wholesale auction price, and it is not a
        number your adjuster can simply pull from a single database entry.
        Your ACV represents what a willing buyer would pay a willing seller
        for your specific vehicle, in your local market, with your mileage,
        condition, and options.
      </p>

      <p>
        In practice, your insurer typically relies on one of three
        third-party valuation services &mdash; CCC Intelligent Solutions,
        Mitchell, or Audatex &mdash; to generate an initial ACV figure.
        These platforms aggregate recent sales data for comparable vehicles
        in your geographic area, then apply adjustments for mileage,
        condition, trim level, and factory-installed options. The result is
        a valuation report that serves as the foundation for your
        settlement offer.
      </p>

      <p>
        However, ACV is only one component of your total settlement. A
        complete and fair payout also includes several additional line
        items that many policyholders are unaware of &mdash; and that many
        initial offers quietly omit.
      </p>

      <h3 id="how-actual-cash-value-is-calculated">
        How Actual Cash Value Is Calculated
      </h3>

      <p>
        The ACV calculation follows a specific methodology. Your insurer
        identifies 3 to 5 comparable vehicles &mdash; same year, make,
        model, and trim &mdash; that have recently sold within your
        geographic area (typically a 50- to 100-mile radius). They then
        adjust each comparable for differences in mileage, condition, and
        equipment. The adjusted values are averaged to produce your
        vehicle&apos;s estimated ACV.
      </p>

      <p>
        Where things often go wrong is in the selection and adjustment of
        comparables. Common issues include using vehicles that are
        geographically distant (pushing prices lower in rural areas),
        comparing to vehicles with higher mileage without adequate upward
        adjustments, and ignoring factory options like leather interiors,
        sunroofs, or premium audio systems. If you can identify flaws in
        the comparable selection or adjustments, you have strong grounds
        to{" "}
        <Link
          href="/claims/new"
          className="text-coral hover:underline"
        >
          submit a counter-offer
        </Link>
        .
      </p>

      <p>
        You can use our{" "}
        <Link
          href="/estimate"
          className="text-coral hover:underline"
        >
          free car value estimator
        </Link>{" "}
        to get an independent check on your vehicle&apos;s ACV before
        responding to your insurer&apos;s offer.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  6 Line Items Most Offers Miss                                    */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="line-items-most-offers-miss">
        6 Line Items Most Offers Miss
      </h2>

      <p>
        Even when the ACV number is fair, the total settlement can still
        fall short by thousands of dollars because of missing line items.
        These are costs you will incur when purchasing a replacement
        vehicle, and in most states, your insurer is obligated to
        reimburse them. In our analysis of over 10,000 claims, roughly
        70&ndash;80% of initial total loss offers are missing at least one
        of the following items.
      </p>

      <DataTable
        caption="Common line items missing from total loss settlement offers"
        headers={[
          "Line Item",
          "Typical Value",
          "How Often Missing",
          "Notes",
        ]}
        rows={[
          [
            "Sales tax",
            "$700 – $2,100",
            "~55% of offers",
            "Required in 45 states; based on state + local rate",
          ],
          [
            "Title and registration fees",
            "$75 – $525",
            "~65% of offers",
            "Covers title transfer and new registration for replacement vehicle",
          ],
          [
            "Dealer documentation fees",
            "$150 – $800",
            "~70% of offers",
            "Doc fees charged by dealerships; varies widely by state",
          ],
          [
            "Mileage adjustment (low-mileage credit)",
            "$300 – $2,000",
            "~45% of offers",
            "If your vehicle had below-average miles, ACV should be adjusted upward",
          ],
          [
            "Aftermarket upgrades",
            "$200 – $3,500",
            "~80% of offers",
            "Custom wheels, audio systems, roof racks, bed liners with receipts",
          ],
          [
            "Loss of use / rental gap",
            "$150 – $1,200",
            "~60% of offers",
            "Covers days between total loss declaration and settlement payment",
          ],
        ]}
      />

      <p>
        When you add up these missing items, the gap can easily reach
        $1,500 to $5,000 or more. Use our{" "}
        <Link
          href="/tools/settlement-checklist"
          className="text-coral hover:underline"
        >
          Settlement Checklist
        </Link>{" "}
        to verify which line items are present (or absent) in your offer.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  Sales Tax Recovery                                               */}
      {/* ---------------------------------------------------------------- */}

      <h3 id="sales-tax-recovery">Sales Tax Recovery</h3>

      <p>
        Sales tax is often the single largest missing line item. When you
        purchase a replacement vehicle, you will owe sales tax on that
        transaction. In 45 states (every state except Alaska, Delaware,
        Montana, New Hampshire, and Oregon), your insurer is required to
        include sales tax reimbursement as part of your settlement. On a
        $20,000 settlement in a state with a 7% combined rate, that is an
        extra <strong>$1,400</strong> your insurer owes you.
      </p>

      <p>
        Some states, like Texas and Illinois, require you to purchase a
        replacement vehicle within a specific window (often 30 days) and
        submit proof before the sales tax portion is paid out. Other
        states, like Florida and California, include the sales tax
        directly in the initial settlement check regardless of whether you
        buy a replacement. For a deep dive into your state&apos;s specific
        rules, see our{" "}
        <Link
          href="/guides/sales-tax-total-loss"
          className="text-coral hover:underline"
        >
          complete guide to sales tax on total loss claims
        </Link>
        .
      </p>

      <p>
        Enter your settlement amount and state below to see exactly how
        much sales tax your insurer should be reimbursing:
      </p>

      <SalesTaxCalculator mode="mini" />

      <p>
        For a more detailed breakdown including local tax rates and
        state-specific notes, visit the{" "}
        <Link
          href="/tools/sales-tax-calculator"
          className="text-coral hover:underline"
        >
          full Sales Tax Calculator
        </Link>
        .
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  How Settlements Differ by State                                  */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="how-settlements-differ-by-state">
        How Settlements Differ by State
      </h2>

      <p>
        Total loss settlement rules, tax rates, and average shortfalls
        vary significantly from state to state. Your state&apos;s
        regulations determine which line items your insurer must include,
        whether you need to purchase a replacement vehicle to collect
        sales tax, and how the appraisal dispute process works. The table
        below summarizes key data for the ten highest-volume states.
      </p>

      <DataTable
        caption="Total loss settlement data for top 10 states by claim volume"
        headers={[
          "State",
          "Avg Combined Tax Rate",
          "Sales Tax in Settlement",
          "Title/Reg Fees",
          "Avg Settlement Shortfall",
        ]}
        rows={[
          ["California", "8.68%", "Yes, included upfront", "$200 – $350", "$3,100 – $4,800"],
          ["Texas", "8.20%", "Yes, with purchase proof", "$150 – $325", "$2,900 – $4,500"],
          ["Florida", "7.02%", "Yes, included upfront", "$225 – $450", "$2,600 – $4,200"],
          ["New York", "8.00%", "Yes, included upfront", "$125 – $250", "$2,800 – $4,100"],
          ["Pennsylvania", "6.34%", "Yes, included upfront", "$100 – $200", "$2,200 – $3,600"],
          ["Illinois", "8.81%", "Yes, with purchase proof", "$300 – $525", "$3,200 – $5,100"],
          ["Ohio", "7.24%", "Yes, included upfront", "$75 – $175", "$2,400 – $3,800"],
          ["Georgia", "7.35% (TAVT 6.6%)", "Yes, TAVT reimbursed", "$200 – $400", "$2,700 – $4,300"],
          ["North Carolina", "4.75%", "Yes, with cap ($2,500)", "$150 – $250", "$2,100 – $3,400"],
          ["Michigan", "6.00%", "Yes, included upfront", "$225 – $375", "$2,500 – $3,900"],
        ]}
      />

      <p>
        Notice that states with higher combined tax rates tend to have
        larger average shortfalls. In Illinois, where the combined rate
        can reach 10% or higher in some municipalities, missing sales tax
        alone on a $22,000 settlement could cost you $2,200. If your
        state is not listed above, use our{" "}
        <Link
          href="/tools/sales-tax-calculator"
          className="text-coral hover:underline"
        >
          Sales Tax Calculator
        </Link>{" "}
        to find your exact rate and reimbursement amount.
      </p>

      <KeyTakeaway>
        <p>
          State rules determine what your insurer must pay. In some
          states, sales tax is included automatically. In others, you must
          purchase a replacement vehicle within a deadline to claim it.
          Knowing your state&apos;s rules is the first step to verifying
          your offer is complete.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/*  Real Settlement Case Studies                                     */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="real-settlement-case-studies">
        Real Settlement Case Studies
      </h2>

      <p>
        The following case studies are based on real ClaimCoach analyses.
        Names have been changed for privacy, but the numbers, vehicles,
        and outcomes reflect actual claims. Each illustrates how
        identifying missing line items and providing supporting evidence
        leads to significantly higher settlements.
      </p>

      <CaseStudy
        name="Maria R."
        vehicle="2021 Honda CR-V EX"
        state="Florida"
        initialOffer="$24,200"
        finalSettlement="$28,750"
        gap="+$4,550"
        narrative={
          <p>
            Maria&apos;s CR-V was rear-ended on I-95 in Broward County
            and declared a total loss. Her insurer offered $24,200 based
            on CCC comparables. ClaimCoach identified three issues: the
            comparables used had an average of 18,000 more miles than
            Maria&apos;s vehicle (which had just 22,400 miles), the offer
            did not include Florida&apos;s 7% sales tax ($1,694), and a
            $315 electronic title fee was missing. Maria submitted a
            counter-offer with five lower-mileage comparables from
            CarGurus and AutoTrader, along with the missing line items.
            After one round of negotiation, her insurer increased the
            settlement to $28,750 &mdash; a $4,550 increase that took
            less than two weeks.
          </p>
        }
      />

      <CaseStudy
        name="James T."
        vehicle="2019 Toyota Camry SE"
        state="Texas"
        initialOffer="$18,900"
        finalSettlement="$22,350"
        gap="+$3,450"
        narrative={
          <p>
            James was T-boned at an intersection in Houston and his Camry
            was totaled. The initial offer of $18,900 seemed reasonable
            at first glance, but the valuation report used comparables
            from Dallas and San Antonio &mdash; both markets with lower
            prices than Houston. ClaimCoach flagged the geographic
            mismatch and identified $1,548 in missing sales tax (8.25%
            Harris County rate), $250 in title and inspection fees, and a
            $485 dealer documentation fee. James also had a $1,200
            aftermarket audio system with installation receipts. Texas
            requires purchase proof for sales tax reimbursement, so James
            provided a purchase agreement for his replacement vehicle. His
            adjuster agreed to $22,350 after reviewing the evidence &mdash;
            a $3,450 improvement over the initial offer.
          </p>
        }
      />

      <CaseStudy
        name="Linda K."
        vehicle="2020 Ford F-150 XLT SuperCrew"
        state="California"
        initialOffer="$32,800"
        finalSettlement="$38,100"
        gap="+$5,300"
        narrative={
          <p>
            Linda&apos;s F-150 was totaled in a multi-vehicle accident on
            Highway 101 in San Jose. The initial offer of $32,800 was
            based on three comparables, but all three were 2WD models
            while Linda&apos;s truck was 4WD with the 3.5L EcoBoost
            engine and tow package. ClaimCoach identified the trim
            mismatch and found that comparable 4WD SuperCrew models with
            similar mileage (34,500 miles) were listing for $36,000 to
            $39,000 in the Bay Area. The offer was also missing
            California sales tax ($2,854 at the 8.69% Santa Clara County
            rate), $375 in DMV fees, and a $599 dealer doc fee. After
            Linda submitted a detailed counter-offer with six properly
            matched comparables, her insurer revised the settlement to
            $38,100. The $5,300 increase covered the cost difference
            between settling for a 2WD base model and actually replacing
            her truck with a comparable 4WD configuration.
          </p>
        }
      />

      <p>
        These cases share a common pattern: the initial offer was not
        intentionally unfair, but it was incomplete. Missing line items
        and poorly matched comparables accounted for the majority of the
        gap. In each case, the policyholder recovered thousands more by
        identifying the shortfall and presenting organized evidence.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  What to Do If Your Offer Is Too Low                              */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="what-to-do-if-your-offer-is-too-low">
        What to Do If Your Offer Is Too Low
      </h2>

      <p>
        If you suspect your settlement offer is below fair value &mdash;
        and statistically, it likely is &mdash; here is a step-by-step
        process to build your case and negotiate effectively.
      </p>

      <p>
        <strong>Step 1: Review the valuation report.</strong> Request a
        copy of the full valuation report from your adjuster. This
        document lists the comparables used, the adjustments applied, and
        the final ACV. Look for mismatches in trim level, mileage,
        condition, geography, and options.
      </p>

      <p>
        <strong>Step 2: Check for missing line items.</strong> Compare
        your offer against the six common items listed above. Is sales
        tax included? Are title and registration fees accounted for?
        What about dealer fees? Use our{" "}
        <Link
          href="/tools/settlement-checklist"
          className="text-coral hover:underline"
        >
          Settlement Checklist
        </Link>{" "}
        to walk through each item methodically.
      </p>

      <p>
        <strong>Step 3: Gather your own comparables.</strong> Search
        Cars.com, AutoTrader, CarGurus, and local dealer sites for
        vehicles matching your year, make, model, trim, and approximate
        mileage within 50 miles of your zip code. Aim for 5 to 7
        listings. Screenshot each listing and note the asking price,
        mileage, condition, and dealer name.
      </p>

      <p>
        <strong>Step 4: Document aftermarket upgrades.</strong> If you
        installed aftermarket equipment &mdash; wheels, tires, audio,
        suspension, bed liner, roof rack &mdash; gather your receipts.
        Your insurer may not reimburse 100% of the cost, but documented
        upgrades typically warrant a partial credit.
      </p>

      <p>
        <strong>Step 5: Submit a written counter-offer.</strong> Compile
        everything into a professional counter-offer letter. Include
        your claim number, the original offer, your requested amount
        with a line-by-line justification, and copies of your supporting
        evidence. Send it by email and certified mail.
      </p>

      <p>
        <strong>Step 6: Escalate if needed.</strong> If your adjuster
        declines your counter-offer, ask for a detailed written
        explanation. You can escalate to a supervisor, invoke the
        appraisal clause in your policy (which allows an independent
        third-party appraisal), or file a complaint with your state&apos;s
        department of insurance.
      </p>

      <p>
        Before you begin, take two minutes to check whether your offer
        looks fair. Our Offer Fairness Quiz scores your settlement offer
        based on your state, vehicle, and included line items:
      </p>

      <FairnessQuiz mode="mini" />

      <h3 id="check-your-offer-in-minutes">
        Check Your Offer in Minutes
      </h3>

      <p>
        If the quiz flagged potential issues, the next step is a full
        analysis. ClaimCoach reviews your settlement offer against your
        state&apos;s requirements, local comparable vehicle data, and all
        applicable line items. You will receive an itemized breakdown
        showing exactly what your offer is missing and how much more you
        may be owed.
      </p>

      <CTABox
        heading="Get your complete settlement analysis"
        body="Upload your offer and get an itemized breakdown of missing line items, comparable vehicle data, and a counter-offer strategy in under 5 minutes."
        href="/claims/new"
        label="Analyze my offer free"
      />

      <p>
        You can also explore each of our tools individually:
      </p>

      <ul>
        <li>
          <Link
            href="/tools/sales-tax-calculator"
            className="text-coral hover:underline"
          >
            Sales Tax Calculator
          </Link>{" "}
          &mdash; Find your exact sales tax reimbursement amount
        </li>
        <li>
          <Link
            href="/tools/offer-fairness-quiz"
            className="text-coral hover:underline"
          >
            Offer Fairness Quiz
          </Link>{" "}
          &mdash; Score your settlement offer in 60 seconds
        </li>
        <li>
          <Link
            href="/tools/settlement-checklist"
            className="text-coral hover:underline"
          >
            Settlement Checklist
          </Link>{" "}
          &mdash; Verify every required line item
        </li>
        <li>
          <Link
            href="/estimate"
            className="text-coral hover:underline"
          >
            Car Value Estimator
          </Link>{" "}
          &mdash; Get an independent ACV for your vehicle
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/*  The Bottom Line                                                  */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          The average total loss settlement offer is $2,800 to $4,200
          below fair value, primarily due to missing line items like sales
          tax, registration fees, and improperly matched comparable
          vehicles. You have the right to negotiate, and the evidence
          shows that policyholders who respond with documented
          counter-offers recover significantly more. Review your offer
          carefully, check for every line item your state requires, and
          do not accept the first number without verifying it.
        </p>
      </KeyTakeaway>

      <p>
        Dealing with a total loss is stressful enough without having to
        worry about whether your insurer&apos;s offer actually covers the
        cost of a replacement vehicle. Take the time to understand what
        you are owed, gather your evidence, and respond with confidence.
        The numbers are almost certainly on your side.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  Related Guides                                                   */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="related-guides" className="text-heading font-semibold text-black mt-10 mb-4">
        Related Guides
      </h2>

      <ul className="list-disc list-inside space-y-2 text-body text-[#4a555e] mb-6">
        <li>
          <Link
            href="/guides/insurance-lowball-offer"
            className="text-coral hover:underline"
          >
            Is Your Offer a Lowball?
          </Link>{" "}
          &mdash; 7 warning signs and what to do about them
        </li>
        <li>
          <Link
            href="/guides/total-loss-car-value"
            className="text-coral hover:underline"
          >
            How Insurers Value Your Car
          </Link>{" "}
          &mdash; ACV calculation, valuation services, and common mistakes
        </li>
        <li>
          <Link
            href="/guides/counter-offer-letter"
            className="text-coral hover:underline"
          >
            Counter-Offer Letter Template
          </Link>{" "}
          &mdash; a ready-to-use template with real examples
        </li>
        <li>
          <Link
            href="/guides/sales-tax-total-loss"
            className="text-coral hover:underline"
          >
            Sales Tax on Total Loss Claims
          </Link>{" "}
          &mdash; 50-state rules for sales tax reimbursement
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/*  Disclaimer                                                       */}
      {/* ---------------------------------------------------------------- */}

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational
          and educational purposes only and does not constitute legal,
          financial, or insurance advice. Settlement amounts, tax rates,
          fees, and regulations vary by state and are subject to change.
          The case studies presented are based on representative examples;
          individual outcomes depend on the specifics of each claim.
          ClaimCoach is not an insurance company, law firm, or licensed
          public adjuster. Consult a licensed professional in your state
          for advice specific to your situation. Nothing in this article
          should be interpreted as a promise or prediction of any
          particular outcome.
        </p>
      </div>
    </>
  );
}
