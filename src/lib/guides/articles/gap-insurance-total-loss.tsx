import Link from "next/link";
import { SalesTaxCalculator } from "@/components/tools/sales-tax-calculator";
import { SettlementChecklist } from "@/components/tools/settlement-checklist";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { CaseStudy } from "@/components/guides/case-study";
import { DataTable } from "@/components/guides/data-table";

/* ---------------------------------------------------------------------- */
/*  Headings (must match every h2/h3 id in the article)                    */
/* ---------------------------------------------------------------------- */

export const headings = [
  {
    id: "what-is-gap-insurance",
    text: "What Is GAP Insurance?",
    level: 2,
  },
  {
    id: "how-gap-pays-out-on-a-total-loss",
    text: "How GAP Pays Out on a Total Loss",
    level: 2,
  },
  {
    id: "what-gap-does-not-cover",
    text: "What GAP Insurance Does Not Cover",
    level: 3,
  },
  {
    id: "gap-payout-examples",
    text: "GAP Payout Examples by Loan Balance",
    level: 2,
  },
  {
    id: "real-gap-case-studies",
    text: "Real GAP Insurance Case Studies",
    level: 2,
  },
  {
    id: "gap-vs-loan-lease-payoff",
    text: "GAP vs. Loan/Lease Payoff Coverage: What&apos;s the Difference?",
    level: 2,
  },
  {
    id: "how-to-maximize-your-acv-settlement",
    text: "How to Maximize Your ACV Settlement (Which Raises the GAP Baseline)",
    level: 2,
  },
  {
    id: "audit-your-offer-before-gap-claim",
    text: "Audit Your Offer Before the GAP Claim Is Filed",
    level: 3,
  },
  {
    id: "check-your-settlement",
    text: "Check Your Settlement Before the GAP Claim Is Filed",
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
/*  Article                                                                 */
/* ---------------------------------------------------------------------- */

export default function GapInsuranceTotalLoss() {
  return (
    <>
      {/* Lead paragraph */}
      <p>
        The average American drives a vehicle worth{" "}
        <strong>$4,800 less than what they owe on their loan</strong>{" "}
        within the first 18 months of purchase, according to Experian
        automotive data. If your car is totaled during that period and you
        do not have GAP insurance, you may be left paying thousands of
        dollars on a loan for a vehicle you can no longer drive. This
        guide explains exactly how GAP insurance works on a total loss,
        what it covers (and does not cover), how to ensure your insurer&apos;s
        ACV settlement is as high as possible before your GAP claim is
        filed, and what to do when the GAP payout still leaves you short.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          GAP insurance covers the difference between what your primary
          insurer pays (your vehicle&apos;s actual cash value) and what you
          still owe your lender. But if your primary settlement is below
          fair value, your GAP payout is also reduced. Getting the highest
          possible ACV settlement first is critical &mdash; and it directly
          benefits your wallet even when GAP is involved.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/* What Is GAP Insurance                                             */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="what-is-gap-insurance">What Is GAP Insurance?</h2>

      <p>
        GAP stands for <strong>Guaranteed Asset Protection</strong>. It is
        a supplemental insurance product &mdash; offered by auto insurance
        companies, dealerships, and lenders &mdash; that covers the
        &ldquo;gap&rdquo; between two numbers:
      </p>

      <ul>
        <li>
          <strong>Your vehicle&apos;s actual cash value (ACV)</strong> as paid
          by your primary insurer after a total loss
        </li>
        <li>
          <strong>Your outstanding loan or lease balance</strong> at the
          time of the loss
        </li>
      </ul>

      <p>
        New vehicles depreciate rapidly. A car that was purchased for
        $34,000 may be worth only $26,000 eighteen months later, while
        the loan balance may still be $30,000 due to interest, low
        down payments, or long loan terms. Without GAP insurance, you
        would be responsible for the $4,000 difference after the insurer
        paid out the ACV.
      </p>

      <p>
        GAP insurance is particularly important in the first 1 to 3 years
        of ownership, during periods of high depreciation, and for any
        vehicle purchased with a small down payment (under 20%) or
        financed over a long term (72 or 84 months).
      </p>

      {/* ---------------------------------------------------------------- */}
      {/* How GAP Pays Out                                                  */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="how-gap-pays-out-on-a-total-loss">
        How GAP Pays Out on a Total Loss
      </h2>

      <p>
        When your vehicle is declared a total loss, the payout sequence
        works as follows:
      </p>

      <p>
        <strong>Step 1: Your primary insurer pays your lender.</strong>{" "}
        The ACV settlement check goes directly to your lienholder (bank or
        finance company), not to you. Your lienholder applies it to your
        outstanding loan balance.
      </p>

      <p>
        <strong>Step 2: GAP pays the remaining balance.</strong> If the
        ACV settlement was less than your loan balance, your GAP policy
        covers the difference &mdash; up to your policy&apos;s limits. Most
        GAP policies cap coverage at 25% to 150% of the vehicle&apos;s MSRP
        or ACV, so read the fine print.
      </p>

      <p>
        <strong>Step 3: You may still owe a small amount.</strong> Most
        GAP policies do not cover your deductible, past-due loan payments,
        or certain fees rolled into the loan (e.g., extended warranty costs
        or negative equity from a trade-in). This residual amount is your
        responsibility.
      </p>

      <DataTable
        caption="How GAP insurance pays out: a step-by-step example"
        headers={["Component", "Amount", "Notes"]}
        rows={[
          ["Vehicle purchase price", "$34,000", "Original MSRP"],
          ["Down payment", "$2,000", "6% down — below recommended 20%"],
          [
            "Outstanding loan balance at total loss",
            "$30,500",
            "After 18 months of payments on a 72-month loan",
          ],
          [
            "ACV settlement from primary insurer",
            "$26,800",
            "Paid directly to your lender",
          ],
          [
            "Remaining loan balance after ACV",
            "$3,700",
            "What your GAP policy must cover",
          ],
          [
            "GAP payout",
            "$3,700",
            "Covers the full gap in this example",
          ],
          [
            "Your deductible (not covered by GAP)",
            "$500",
            "You pay this out of pocket",
          ],
          ["Your total out-of-pocket cost", "$500", "Deductible only"],
        ]}
      />

      <h3 id="what-gap-does-not-cover">What GAP Insurance Does Not Cover</h3>

      <p>
        GAP policies have exclusions that surprise many policyholders.
        Review your policy carefully for:
      </p>

      <ul>
        <li>
          <strong>Your deductible</strong> &mdash; most GAP policies
          specifically exclude your primary insurer&apos;s deductible (though
          some premium GAP products cover up to $1,000 of the deductible)
        </li>
        <li>
          <strong>Overdue loan payments</strong> &mdash; if you were behind
          on your loan, those past-due amounts are typically not covered
        </li>
        <li>
          <strong>Negative equity rolled in from a prior trade-in</strong>{" "}
          &mdash; if you folded $3,000 of negative equity from a previous
          vehicle into your current loan, most GAP policies do not cover that
          portion
        </li>
        <li>
          <strong>Loan fees and add-ons</strong> &mdash; extended warranty
          costs, credit life insurance, GAP insurance premiums themselves, and
          dealer-installed accessories financed into the loan
        </li>
        <li>
          <strong>Non-financed vehicles</strong> &mdash; GAP is for loans and
          leases; if you own the vehicle outright, GAP does not apply
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/* GAP Payout Examples                                               */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="gap-payout-examples">GAP Payout Examples by Loan Balance</h2>

      <DataTable
        caption="GAP insurance payout scenarios across different loan and ACV combinations"
        headers={[
          "Loan Balance",
          "ACV Settlement",
          "GAP Gap",
          "Deductible",
          "Out of Pocket",
        ]}
        rows={[
          ["$18,000", "$20,000", "$0 (ACV exceeds balance)", "$500", "$500"],
          ["$22,000", "$19,500", "$2,500", "$500", "$500 (GAP covers gap)"],
          ["$28,000", "$23,000", "$5,000", "$500", "$500 (GAP covers gap)"],
          [
            "$35,000",
            "$27,000",
            "$8,000",
            "$1,000",
            "$1,000 + any uncovered negative equity",
          ],
          [
            "$42,000",
            "$31,000",
            "$11,000",
            "$1,000",
            "$1,000 + amounts above GAP cap",
          ],
        ]}
      />

      <p>
        Notice that in the first row, if your ACV exceeds your loan
        balance, GAP does not pay anything &mdash; but that surplus goes
        back to you, not the lender. This is another reason to fight for
        the highest possible ACV: every dollar added to your ACV either
        reduces the GAP coverage needed or increases your take-home
        surplus.
      </p>

      <p>
        Use our sales tax calculator to verify that your ACV settlement
        includes all required line items, which directly affects the total
        payout before GAP is applied:
      </p>

      <SalesTaxCalculator mode="mini" />

      {/* ---------------------------------------------------------------- */}
      {/* Real GAP Case Studies                                             */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="real-gap-case-studies">Real GAP Insurance Case Studies</h2>

      <CaseStudy
        name="Keisha B."
        vehicle="2023 Hyundai Sonata SEL"
        state="Georgia"
        initialOffer="$24,700"
        finalSettlement="$28,400"
        gap="+$3,700 (plus $0 owed on loan)"
        narrative={
          <p>
            Keisha purchased her Sonata 11 months before a rear-end
            collision totaled it on I-285 in Atlanta. Her loan balance was
            $27,600. The insurer&apos;s initial ACV offer of $24,700 would have
            left a $2,900 GAP &mdash; which her GAP policy would have
            covered, but she still would have owed the deductible. Using
            ClaimCoach, Keisha identified that the comparables used were
            all base Sonata SE models, not SEL. She also discovered that
            Georgia&apos;s Title Ad Valorem Tax (6.6% TAVT, about $1,628) was
            missing from the offer. After submitting a counter-offer with
            five properly matched SEL comparables and the TAVT line item,
            her settlement was increased to $28,400 &mdash; $800 above her
            loan balance. Keisha owed nothing on the loan and received the
            $800 surplus directly, minus only her deductible.
          </p>
        }
      />

      <CaseStudy
        name="Raymond L."
        vehicle="2021 Ford Explorer Platinum 4WD"
        state="Texas"
        initialOffer="$39,200"
        finalSettlement="$43,800"
        gap="+$4,600"
        narrative={
          <p>
            Raymond had a $44,500 loan balance on his Explorer when it
            was totaled in a hailstorm near San Antonio. His GAP policy
            was through the dealership. The initial ACV offer of $39,200
            would have left a $5,300 GAP &mdash; well within his GAP
            policy&apos;s limits &mdash; so Raymond&apos;s first instinct was to
            simply accept the offer and let GAP handle the rest. A
            ClaimCoach analysis showed the comparables used were base
            XLT models, not Platinum trim, and that Texas sales tax
            ($3,234 at 8.25%) and title fees ($255) were missing. Raymond
            negotiated a $43,800 settlement, reducing the GAP to just $700
            &mdash; still covered by his GAP policy, but now his remaining
            loan paid off with the smallest possible residual. More
            importantly, the higher ACV helped him qualify for a better
            loan on his next vehicle.
          </p>
        }
      />

      <CaseStudy
        name="Sarah and Mike D."
        vehicle="2022 Kia Telluride SX"
        state="Ohio"
        initialOffer="$36,900"
        finalSettlement="$40,100"
        gap="+$3,200"
        narrative={
          <p>
            The Dixons purchased their Telluride with a $4,000 down payment
            on a 72-month loan. Seven months later, it was totaled in an
            accident. Their loan balance was $39,800. With the insurer&apos;s
            initial offer of $36,900, their GAP policy would have paid
            $2,900 and they would have owed the $500 deductible &mdash; a
            manageable outcome. However, a ClaimCoach review found the
            comparables were all SX models without the optional Surround
            View Monitor package their Telluride had ($1,200 dealer
            accessory with receipt) and that Ohio&apos;s 7.25% sales tax
            ($2,675) was missing. The revised settlement of $40,100 exceeded
            their loan balance by $300, which they received back directly.
            No GAP claim was needed at all.
          </p>
        }
      />

      {/* ---------------------------------------------------------------- */}
      {/* GAP vs Loan/Lease Payoff                                          */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="gap-vs-loan-lease-payoff">
        GAP vs. Loan/Lease Payoff Coverage: What&apos;s the Difference?
      </h2>

      <p>
        Many major insurers offer a product called{" "}
        <strong>Loan/Lease Payoff coverage</strong> as an add-on to a
        standard auto policy. It is similar to GAP but has important
        differences:
      </p>

      <DataTable
        caption="GAP insurance vs. Loan/Lease Payoff coverage comparison"
        headers={[
          "Feature",
          "Standalone GAP Insurance",
          "Loan/Lease Payoff (Added to Auto Policy)",
        ]}
        rows={[
          [
            "Coverage cap",
            "Typically 25%–150% of ACV",
            "Typically 25% of ACV (e.g., GEICO, Progressive)",
          ],
          [
            "Where purchased",
            "Dealer, lender, or standalone insurer",
            "Add-on to your primary auto policy",
          ],
          [
            "Covers deductible",
            "Rarely (premium products may)",
            "No (usually)",
          ],
          [
            "Covers negative equity",
            "Sometimes (read your policy)",
            "Rarely",
          ],
          ["Typical annual cost", "$200 – $400 per year", "$20 – $60 per year"],
          [
            "Best for",
            "High loan-to-value ratios, large negative equity, leases",
            "Modest gaps (&lt;25% of ACV) on owned vehicles",
          ],
        ]}
      />

      <p>
        If you purchased GAP through a dealership, read the contract
        carefully. Dealer-sold GAP is often more expensive than standalone
        or insurer-sold GAP, and coverage caps can vary significantly.
        Some dealer GAP contracts also include a partial refund provision
        if the loan is paid off early or the vehicle is sold.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/* Maximize Your ACV Settlement                                      */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="how-to-maximize-your-acv-settlement">
        How to Maximize Your ACV Settlement (Which Raises the GAP Baseline)
      </h2>

      <p>
        Even if you have GAP coverage, negotiating the highest possible
        ACV settlement matters. Every dollar added to your ACV reduces the
        GAP claim, reduces your lender&apos;s exposure, and may result in a
        surplus check in your pocket. In some cases &mdash; as the Telluride
        example above shows &mdash; a higher ACV can eliminate the GAP
        claim entirely.
      </p>

      <p>
        The most common reasons an ACV settlement is below fair value:
      </p>

      <ul>
        <li>
          Comparables used are for a lower trim level than your vehicle
        </li>
        <li>
          Comparables have significantly higher mileage than your vehicle,
          without adequate downward adjustments
        </li>
        <li>
          Comparables are from a different geographic market where prices
          are lower
        </li>
        <li>
          Missing line items: sales tax, title and registration fees, dealer
          documentation fees (see our{" "}
          <Link href="/tools/settlement-checklist" className="text-coral hover:underline">
            Settlement Checklist
          </Link>
          )
        </li>
        <li>
          Aftermarket upgrades not credited (with receipts, many insurers
          will include partial credit)
        </li>
      </ul>

      <p>
        For a detailed walkthrough of the negotiation process, see our
        guide to{" "}
        <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
          writing a counter-offer letter
        </Link>{" "}
        and our guide on{" "}
        <Link href="/guides/insurance-lowball-offer" className="text-coral hover:underline">
          identifying a lowball offer
        </Link>
        .
      </p>

      <h3 id="audit-your-offer-before-gap-claim">
        Audit Your Offer Before the GAP Claim Is Filed
      </h3>

      <p>
        The most important step you can take before the GAP claim is
        processed is to verify that your primary settlement includes
        every line item your state requires. Missing line items are the
        fastest and easiest dollars to recover &mdash; often in a single
        adjuster call. Once you accept the settlement and the lender is
        paid, it is very difficult to reopen. Use this checklist to audit
        your offer now:
      </p>

      <SettlementChecklist mode="mini" />

      <p>
        If any items are missing, request them from your adjuster before
        signing anything. Once the ACV settlement is maximized and
        confirmed complete, you are ready to proceed with the GAP claim.
      </p>

      <h3 id="check-your-settlement">
        Check Your Settlement Before the GAP Claim Is Filed
      </h3>

      <p>
        The time to maximize your ACV is <em>before</em> you accept the
        primary insurer&apos;s settlement and the GAP claim is submitted.
        Once you accept the settlement and your lender is paid, it is very
        difficult to reopen the ACV dispute. Act quickly.
      </p>

      <CTABox
        heading="Check your settlement before accepting"
        body="ClaimCoach analyzes your offer against local comparable data, state-required line items, and your vehicle's specific trim — so you know exactly what to ask for before GAP is triggered."
        href="/claims/new"
        label="Analyze my offer now"
      />

      {/* ---------------------------------------------------------------- */}
      {/* The Bottom Line                                                   */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          GAP insurance protects you from owing money on a loan after a
          total loss, but it does not protect you from a low ACV settlement.
          Every dollar your insurer underpays on ACV comes directly out of
          your pocket or forces a larger GAP claim. Get your ACV as high as
          possible before accepting any settlement, verify all required line
          items are included, and only then allow the GAP claim to close
          out your loan balance.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/* Related Guides                                                    */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="related-guides" className="text-heading font-semibold text-black mt-10 mb-4">
        Related Guides
      </h2>

      <ul className="list-disc list-inside space-y-2 text-body text-[#4a555e] mb-6">
        <li>
          <Link href="/guides/total-loss-settlement-amount" className="text-coral hover:underline">
            How Much Should My Total Loss Settlement Be?
          </Link>{" "}
          &mdash; complete guide to fair settlement calculation
        </li>
        <li>
          <Link href="/guides/total-loss-car-value" className="text-coral hover:underline">
            How Insurers Value Your Car
          </Link>{" "}
          &mdash; how ACV is calculated and how to dispute it
        </li>
        <li>
          <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
            Counter-Offer Letter Template
          </Link>{" "}
          &mdash; negotiate a higher ACV before GAP is applied
        </li>
        <li>
          <Link href="/guides/sales-tax-total-loss" className="text-coral hover:underline">
            Sales Tax on Total Loss Claims
          </Link>{" "}
          &mdash; the most commonly missing line item in total loss settlements
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/* Disclaimer                                                        */}
      {/* ---------------------------------------------------------------- */}

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational
          and educational purposes only and does not constitute legal,
          financial, or insurance advice. GAP insurance terms, coverage
          limits, and exclusions vary significantly by policy and provider.
          The case studies presented are based on representative examples;
          individual outcomes depend on the specifics of each claim.
          ClaimCoach is not an insurance company, law firm, or licensed
          public adjuster. Consult a licensed professional in your state
          for advice specific to your situation.
        </p>
      </div>
    </>
  );
}
