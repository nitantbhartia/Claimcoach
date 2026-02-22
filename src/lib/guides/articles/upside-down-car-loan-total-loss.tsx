import Link from "next/link";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { DataTable } from "@/components/guides/data-table";

export const headings = [
  { id: "what-upside-down-means", text: "What Upside Down Means in a Total Loss", level: 2 },
  { id: "how-the-settlement-math-works", text: "How the Settlement Math Works", level: 2 },
  { id: "payment-flow-table", text: "Who Gets Paid What: Payment Flow at Total Loss", level: 3 },
  { id: "gap-insurance-solution", text: "GAP Insurance: The Purpose-Built Solution", level: 2 },
  { id: "gap-types", text: "Dealer GAP vs. Policy Loan/Lease Payoff Coverage", level: 3 },
  { id: "no-gap-options", text: "What to Do If You Don't Have GAP Insurance", level: 2 },
  { id: "why-negotiate-acv-matters", text: "Why Negotiating Your ACV Matters Even More When Upside Down", level: 2 },
  { id: "prevent-negative-equity", text: "Preventing Negative Equity on Your Next Vehicle", level: 2 },
  { id: "the-bottom-line", text: "The Bottom Line", level: 2 },
  { id: "related-guides", text: "Related Guides", level: 2 },
];

export default function UpsideDownCarLoanTotalLoss() {
  return (
    <>
      <p>
        Being upside down on your car loan means you owe more on your loan
        than your vehicle is worth. When that vehicle is declared a total
        loss, the insurance settlement pays the vehicle&apos;s actual cash
        value &mdash; not your loan balance. If your ACV is less than what
        you owe, the difference comes out of your pocket. For many
        policyholders, this comes as a genuine shock: they receive a total
        loss settlement, their lender takes the full ACV, and they are still
        left with a loan payment for a car they no longer have. This guide
        explains exactly how the payment flow works, what GAP insurance does,
        and what your options are if you are upside down without it.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          When you owe more than your vehicle is worth, a total loss settlement
          pays your lender first. Any gap between the ACV and your loan balance
          is your responsibility unless you have GAP insurance. Negotiating
          your ACV upward reduces or eliminates that gap.
        </p>
      </KeyTakeaway>

      <h2 id="what-upside-down-means">
        What Upside Down Means in a Total Loss
      </h2>

      <p>
        Negative equity &mdash; being upside down &mdash; occurs most
        commonly in three situations: you purchased a vehicle with a minimal
        down payment, you rolled negative equity from a previous trade-in
        into your current loan, or your vehicle depreciated faster than you
        have paid down the loan. New vehicles lose a significant portion of
        their value quickly after purchase; a vehicle financed at full MSRP
        with a small down payment may be underwater for the first several
        years of a long loan term.
      </p>

      <p>
        In a total loss, the insurance company does not care about your loan
        balance. They owe you the vehicle&apos;s actual cash value at the
        time of loss &mdash; what the vehicle was worth in the market that
        day. If your ACV is $19,000 and you owe $24,000, the insurer pays
        $19,000 (minus your deductible). Your lender receives $19,000 (or
        the net after deductible), and you still owe $5,000 on a vehicle
        that no longer exists.
      </p>

      <h2 id="how-the-settlement-math-works">
        How the Settlement Math Works
      </h2>

      <p>
        The payment sequence at total loss follows a specific order. First,
        the insurer calculates ACV and deducts your deductible. The net
        amount goes to your lender first (the lienholder), because they
        have a security interest in the vehicle. The lender applies the
        payment to your outstanding loan balance. If ACV minus deductible
        exceeds your loan balance, the surplus is paid to you. If ACV
        minus deductible is less than your loan balance, your lender
        receives everything and you still owe the remainder.
      </p>

      <h3 id="payment-flow-table">
        Who Gets Paid What: Payment Flow at Total Loss
      </h3>

      <DataTable
        caption="How total loss settlement proceeds are distributed based on equity position"
        headers={["Scenario", "ACV", "Deductible", "Net to Lender", "Loan Balance", "Your Result"]}
        rows={[
          [
            "Positive equity",
            "$22,000",
            "$1,000",
            "$21,000",
            "$18,000",
            "You receive $3,000 surplus check",
          ],
          [
            "At par (breaking even)",
            "$19,000",
            "$500",
            "$18,500",
            "$18,500",
            "Loan paid off; no check to you",
          ],
          [
            "Upside down (no GAP)",
            "$17,000",
            "$1,000",
            "$16,000",
            "$22,000",
            "You still owe $6,000 to your lender",
          ],
          [
            "Upside down (with GAP)",
            "$17,000",
            "$1,000",
            "$16,000 + $6,000 from GAP",
            "$22,000",
            "Loan paid off; GAP covers the deficiency (subject to GAP exclusions)",
          ],
        ]}
      />

      <KeyTakeaway>
        <p>
          The lender always gets paid first. Your settlement is not a check
          to you &mdash; it is a payment applied to your loan. Only the
          surplus above the loan balance, if any, comes to you.
        </p>
      </KeyTakeaway>

      <h2 id="gap-insurance-solution">
        GAP Insurance: The Purpose-Built Solution
      </h2>

      <p>
        Guaranteed Asset Protection (GAP) insurance is specifically designed
        for this scenario. When your total loss ACV settlement is less than
        your outstanding loan or lease balance, GAP insurance covers the
        difference. The insurer pays the lender the ACV; GAP pays the lender
        the remaining deficiency. Your loan obligation is satisfied.
      </p>

      <p>
        GAP coverage does not typically cover your deductible (though some
        premium products cover up to $1,000 of it), past-due loan payments,
        negative equity rolled in from a prior trade-in on some products,
        or amounts above the GAP policy&apos;s coverage cap. Read your specific
        GAP policy for exclusions. For a full breakdown of what GAP covers
        and what it does not, see our{" "}
        <Link href="/guides/gap-insurance-total-loss" className="text-coral hover:underline">
          GAP insurance guide
        </Link>
        .
      </p>

      <h3 id="gap-types">
        Dealer GAP vs. Policy Loan/Lease Payoff Coverage
      </h3>

      <DataTable
        caption="Differences between dealer/lender GAP and insurer loan/lease payoff add-ons"
        headers={["Feature", "Dealer/Lender GAP (Standalone)", "Policy Add-On (Loan/Lease Payoff)"]}
        rows={[
          [
            "Typical coverage cap",
            "Often 25%–150% of ACV or no cap; varies by product",
            "Usually capped at 25% of ACV — may not cover large gaps",
          ],
          [
            "Cost",
            "$200–$800 upfront at purchase or financed into the loan",
            "$20–$60/year added to your auto premium",
          ],
          [
            "Deductible coverage",
            "Some products include deductible coverage; most do not",
            "Typically does not cover deductible",
          ],
          [
            "Best for",
            "Large loan-to-value gaps, low down payment, long loan terms",
            "Smaller gaps, shorter loan terms, vehicles that depreciate slowly",
          ],
          [
            "Watch out for",
            "Exclusions for rolled-in negative equity; cancellation refund if you sell the car early",
            "The 25% ACV cap can leave meaningful gaps uncovered on rapidly depreciating vehicles",
          ],
        ]}
      />

      <h2 id="no-gap-options">
        What to Do If You Don&apos;t Have GAP Insurance
      </h2>

      <p>
        If your vehicle is totaled, you are upside down, and you do not have
        GAP insurance, you have limited but real options:
      </p>

      <p>
        <strong>Negotiate your ACV upward.</strong> Every dollar added to
        your ACV through the counter-offer process reduces the deficiency
        you owe. If your current offer is $17,000 and a fair value is
        $19,500, that $2,500 difference directly reduces what you owe your
        lender. Negotiating ACV when you are upside down is not just about
        a settlement check &mdash; it is about minimizing a debt obligation.
      </p>

      <p>
        <strong>Verify your loan balance and check for refundable charges.</strong>{" "}
        Contact your lender and request a formal payoff quote (valid for 10
        days). Verify that the balance does not include charges that were
        already paid or that do not belong on the loan. Check whether you
        paid for GAP insurance at the dealership and then forgot &mdash;
        it is often bundled with the loan paperwork and not highlighted.
      </p>

      <p>
        <strong>Check for MBI or credit insurance refunds.</strong> If
        you purchased mechanical breakdown insurance or credit life/disability
        insurance that was financed into your loan, you may be entitled to
        a prorated refund of the unearned premium now that the vehicle is
        gone. This refund would be applied to your loan balance or paid to
        you. Ask your lender about any refundable products.
      </p>

      <p>
        <strong>Negotiate a payment plan for the deficiency.</strong> If
        you truly cannot pay the remaining balance in full, contact your
        lender before they send the deficiency to collections. Many lenders
        will work with borrowers to create a structured payment plan on
        the deficiency rather than pursuing collection action.
      </p>

      <p>
        <strong>Understand your credit impact.</strong> If the deficiency
        goes unpaid, your lender may eventually charge it off and report it
        as a collection. This has a significant negative impact on your credit
        score. Addressing the deficiency proactively &mdash; either through
        negotiation, payment, or a payment plan &mdash; is almost always better
        than ignoring it.
      </p>

      <h2 id="why-negotiate-acv-matters">
        Why Negotiating Your ACV Matters Even More When Upside Down
      </h2>

      <p>
        When you have positive equity, negotiating your ACV results in a
        larger check to you. When you are upside down, negotiating your
        ACV reduces a debt you owe. The motivation is even stronger.
      </p>

      <p>
        The average initial total loss offer is $2,800 to $4,200 below fair
        market value, based on our analysis of over 10,000 total loss claims.
        For a policyholder who is upside down by $5,000, correcting a $3,000
        ACV shortfall means the deficiency is $2,000 instead of $5,000.
        Request your full valuation report the moment your offer arrives,
        check it for trim errors and comparable mismatches, and submit a
        counter-offer if anything is wrong.
      </p>

      <p>
        See our{" "}
        <Link href="/guides/how-to-read-valuation-report" className="text-coral hover:underline">
          valuation report guide
        </Link>{" "}
        for exactly what to check and how to submit evidence.
      </p>

      <h2 id="prevent-negative-equity">
        Preventing Negative Equity on Your Next Vehicle
      </h2>

      <p>
        Once you have experienced the consequences of a total loss while
        upside down, the practical steps for your next vehicle purchase
        are clear: put at least 10–20% down to create immediate equity
        buffer; avoid rolling negative equity from a trade-in into the new
        loan; choose a loan term short enough that the payoff schedule
        keeps pace with depreciation; purchase GAP insurance &mdash;
        from your auto insurer rather than through the dealership where
        the markup is typically substantial; and consider vehicles with
        lower depreciation rates for your situation.
      </p>

      <CTABox
        heading="Maximize your ACV before the lender takes their share"
        body="ClaimCoach reviews your total loss offer for valuation errors and missing line items — every dollar recovered reduces what you owe on your loan."
        href="/claims/new"
        label="Review my settlement offer"
      />

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          A total loss when you are upside down means the insurer pays your
          lender up to the ACV and you owe the difference. GAP insurance
          is the solution; if you do not have it, negotiate your ACV as
          high as possible to minimize the deficiency, verify your loan
          balance and any refundable products, and address the deficiency
          with your lender proactively before it becomes a collections
          problem.
        </p>
      </KeyTakeaway>

      <h2 id="related-guides" className="text-heading font-semibold text-black mt-10 mb-4">
        Related Guides
      </h2>

      <ul className="list-disc list-inside space-y-2 text-body text-[#4a555e] mb-6">
        <li>
          <Link href="/guides/gap-insurance-total-loss" className="text-coral hover:underline">
            GAP Insurance and Total Loss
          </Link>{" "}
          &mdash; how GAP works, what it covers, and what it excludes
        </li>
        <li>
          <Link href="/guides/how-to-read-valuation-report" className="text-coral hover:underline">
            How to Read Your Valuation Report
          </Link>{" "}
          &mdash; find ACV errors before the lender is paid
        </li>
        <li>
          <Link href="/guides/total-loss-settlement-amount" className="text-coral hover:underline">
            How Much Should My Total Loss Settlement Be?
          </Link>{" "}
          &mdash; all line items included in a complete settlement
        </li>
        <li>
          <Link href="/guides/salvage-title-buyback" className="text-coral hover:underline">
            Salvage Title Buyback
          </Link>{" "}
          &mdash; how a buyback interacts with an outstanding loan
        </li>
      </ul>

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational and
          educational purposes only and does not constitute legal, financial,
          or insurance advice. GAP coverage terms, loan deficiency obligations,
          and lender practices vary. Consult a licensed professional for advice
          specific to your situation.
        </p>
      </div>
    </>
  );
}
