import Link from "next/link";
import { CarValueEstimator } from "@/components/tools/car-value-estimator";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { CaseStudy } from "@/components/guides/case-study";
import { DataTable } from "@/components/guides/data-table";

/* ---------------------------------------------------------------------- */
/*  Headings                                                                */
/* ---------------------------------------------------------------------- */

export const headings = [
  {
    id: "what-is-diminished-value",
    text: "What Is Diminished Value?",
    level: 2,
  },
  {
    id: "three-types-of-diminished-value",
    text: "The Three Types of Diminished Value",
    level: 3,
  },
  {
    id: "how-much-can-you-recover",
    text: "How Much Can You Recover on a Diminished Value Claim?",
    level: 2,
  },
  {
    id: "the-17c-formula",
    text: "The 17c Formula: How Most Insurers Calculate DV",
    level: 3,
  },
  {
    id: "state-rules-by-state",
    text: "Diminished Value Claims by State",
    level: 2,
  },
  {
    id: "how-to-file-a-dv-claim",
    text: "How to File a Diminished Value Claim Step by Step",
    level: 2,
  },
  {
    id: "hiring-a-dv-appraiser",
    text: "When to Hire a Diminished Value Appraiser",
    level: 3,
  },
  {
    id: "real-dv-case-studies",
    text: "Real Diminished Value Case Studies",
    level: 2,
  },
  {
    id: "dv-vs-total-loss",
    text: "Diminished Value vs. Total Loss: Key Differences",
    level: 2,
  },
  {
    id: "check-your-vehicle-value",
    text: "Check Your Vehicle&apos;s Pre- and Post-Repair Value",
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

export default function DiminishedValueClaim() {
  return (
    <>
      {/* Lead paragraph */}
      <p>
        After a car accident, even a perfectly repaired vehicle is worth
        less than it was before the collision. Carfax data and independent
        appraisal research consistently show that vehicles with accident
        history sell for <strong>10% to 25% less</strong> than identical
        vehicles with clean histories. On a $30,000 vehicle, that is a
        $3,000 to $7,500 permanent reduction in your asset&apos;s value &mdash;
        a loss your repair claim does not address. You may be entitled to
        recover this difference through a{" "}
        <strong>diminished value (DV) claim</strong>. Yet fewer than 5%
        of eligible policyholders ever file one. This guide explains what
        DV is, who can claim it, how much to expect, and exactly how to
        file a successful claim.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          Diminished value is the permanent reduction in your vehicle&apos;s
          resale value caused by having an accident on its history, even
          after full repair. In most states, if another driver caused the
          accident, you can file a diminished value claim against their
          liability insurer. In some states, you can also file against
          your own insurer.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/* What Is Diminished Value                                          */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="what-is-diminished-value">What Is Diminished Value?</h2>

      <p>
        Diminished value (also called &ldquo;diminution of value&rdquo;) is the
        difference between what your vehicle was worth before an accident
        and what it is worth after full repair. When you sell or trade in
        a repaired vehicle, buyers and dealers apply a discount because
        the accident history appears on Carfax, AutoCheck, and other
        vehicle history reports &mdash; even when repairs were flawless.
        That discount is your diminished value loss.
      </p>

      <p>
        DV is separate from your repair claim. Your repair claim covers
        the cost to fix the damage. Your DV claim covers the permanent
        stigma that follows the vehicle even after repairs are complete.
        Both are compensable in most circumstances.
      </p>

      <h3 id="three-types-of-diminished-value">
        The Three Types of Diminished Value
      </h3>

      <DataTable
        caption="Three types of diminished value and how they apply"
        headers={["Type", "Definition", "Most Common in Claims"]}
        rows={[
          [
            "Inherent diminished value",
            "The loss in value due to the accident history alone, even after perfect repairs. This is the standard type pursued in most DV claims.",
            "Yes — this is what you can typically recover",
          ],
          [
            "Repair-related diminished value",
            "The loss in value caused by poor-quality repairs, mismatched paint, non-OEM parts, or structural compromise that remains after repair.",
            "Yes — especially when OEM parts were not used or repairs are imperfect",
          ],
          [
            "Immediate diminished value",
            "The difference between the vehicle&apos;s pre-accident value and its damaged value immediately after the accident, before repairs. Used mainly in total loss situations.",
            "Rarely — mostly relevant to total loss ACV disputes",
          ],
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/* How Much Can You Recover                                          */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="how-much-can-you-recover">
        How Much Can You Recover on a Diminished Value Claim?
      </h2>

      <p>
        The amount of DV loss depends on four factors: the severity of
        the damage, the vehicle&apos;s pre-loss value, the vehicle&apos;s mileage,
        and the quality of repairs. Typically:
      </p>

      <ul>
        <li>
          Minor damage (fender, bumper only, under $3,000 in repairs):
          DV loss is typically 5% to 10% of pre-loss value
        </li>
        <li>
          Moderate damage (structural or airbag deployment, $5,000–$15,000
          in repairs): DV loss is typically 10% to 20% of pre-loss value
        </li>
        <li>
          Severe damage (frame damage, significant structural repair):
          DV loss can exceed 25% of pre-loss value
        </li>
      </ul>

      <p>
        On a $28,000 vehicle with moderate structural damage, a 15% DV
        loss represents <strong>$4,200</strong> you may be entitled to
        recover.
      </p>

      <h3 id="the-17c-formula">
        The 17c Formula: How Most Insurers Calculate DV
      </h3>

      <p>
        Many insurers use a methodology called the &ldquo;17c formula&rdquo; (named
        after a Georgia court case) to calculate DV. You should understand
        this formula because insurers often apply it in ways that
        significantly undervalue claims.
      </p>

      <p>
        The formula works in three steps:
      </p>

      <p>
        <strong>Step 1: Base loss value.</strong> Take 10% of the vehicle&apos;s
        pre-loss value. On a $28,000 vehicle: $2,800.
      </p>

      <p>
        <strong>Step 2: Damage multiplier.</strong> Apply a damage
        multiplier based on reported damage severity:
      </p>

      <DataTable
        caption="17c formula damage multipliers by severity"
        headers={["Damage Category", "Multiplier", "Examples"]}
        rows={[
          ["Severe structural damage", "1.00", "Frame damage, major airbag deployment, severe structural compromise"],
          ["Major damage", "0.75", "Multiple panel damage, deployed airbags, significant structural"],
          ["Moderate damage", "0.50", "Single panel damage, no structural impact"],
          ["Minor damage", "0.25", "Paint and minor panel damage only"],
          ["Minor/superficial damage", "0.00", "Scratch or small dent only"],
        ]}
      />

      <p>
        <strong>Step 3: Mileage multiplier.</strong> Apply a mileage-based
        multiplier to reflect the vehicle&apos;s age and remaining value:
      </p>

      <DataTable
        caption="17c formula mileage multipliers"
        headers={["Vehicle Mileage at Loss", "Mileage Multiplier"]}
        rows={[
          ["0 – 19,999 miles", "1.00"],
          ["20,000 – 39,999 miles", "0.80"],
          ["40,000 – 59,999 miles", "0.60"],
          ["60,000 – 79,999 miles", "0.40"],
          ["80,000 – 99,999 miles", "0.20"],
          ["100,000+ miles", "0.00"],
        ]}
      />

      <p>
        <strong>Example calculation:</strong> $28,000 vehicle, major
        damage, 35,000 miles:
      </p>

      <ul>
        <li>Base: $28,000 × 10% = $2,800</li>
        <li>Damage multiplier: $2,800 × 0.75 = $2,100</li>
        <li>Mileage multiplier: $2,100 × 0.80 = $1,680</li>
        <li>17c DV estimate: <strong>$1,680</strong></li>
      </ul>

      <KeyTakeaway>
        <p>
          The 17c formula is a starting point, not a ceiling. Independent
          DV appraisers often produce valuations significantly above 17c
          figures by using actual comparable sales data to document real
          market stigma. When the stakes justify it, an independent appraisal
          is almost always worthwhile.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/* State Rules                                                       */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="state-rules-by-state">Diminished Value Claims by State</h2>

      <p>
        Your ability to file a DV claim and who you can file it against
        depends significantly on your state&apos;s laws. The most important
        distinction is between first-party (against your own insurer) and
        third-party (against the at-fault driver&apos;s insurer) claims.
      </p>

      <DataTable
        caption="Diminished value claim availability by state (select high-volume states)"
        headers={[
          "State",
          "Third-Party DV Allowed",
          "First-Party DV Allowed",
          "Notes",
        ]}
        rows={[
          ["California", "Yes", "Limited", "Third-party strongly recognized; first-party complicated by policy language"],
          ["Texas", "Yes", "Yes (statute)", "Both allowed; TX law explicitly addresses DV"],
          ["Florida", "Yes", "Limited", "Third-party DV widely recognized"],
          ["Georgia", "Yes", "Yes", "17c formula originated here; one of the strongest DV states"],
          ["New York", "Yes", "Limited", "Third-party recognized; first-party case law unclear"],
          ["Illinois", "Yes", "No", "First-party DV generally excluded by policy language"],
          ["Ohio", "Yes", "Limited", "Third-party recognized; first-party varies by insurer"],
          ["Pennsylvania", "Yes", "Limited", "Third-party recognized; first-party disputed"],
          ["North Carolina", "Yes", "No", "First-party excluded by statute"],
          ["Washington", "Yes", "Yes", "Both recognized; robust DV claim environment"],
          ["Colorado", "Yes", "Yes", "Both allowed under state law"],
          ["Michigan", "Yes", "No", "No-fault state; first-party DV effectively excluded"],
          ["Minnesota", "Yes", "Limited", "Third-party recognized"],
          ["Virginia", "Yes", "Limited", "Third-party recognized; first-party contested"],
          ["Arizona", "Yes", "Limited", "Third-party recognized"],
        ]}
      />

      <p>
        In no-fault insurance states (Michigan, New Jersey, New York,
        Florida, and others), the DV claim landscape is more complex
        because no-fault rules limit your ability to pursue the at-fault
        driver for certain damages. Consult your state&apos;s department of
        insurance or a licensed professional before assuming your DV
        claim is straightforward in a no-fault state.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/* How to File                                                       */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="how-to-file-a-dv-claim">
        How to File a Diminished Value Claim Step by Step
      </h2>

      <p>
        <strong>Step 1: Confirm the accident was not your fault.</strong>{" "}
        Third-party DV claims are strongest when the other driver is
        clearly liable. If you were partially at fault, your recoverable
        DV may be reduced proportionally.
      </p>

      <p>
        <strong>Step 2: Wait until repairs are complete.</strong> You
        cannot calculate DV accurately until the vehicle has been fully
        repaired. The DV amount is based on the difference between the
        repaired vehicle&apos;s market value and its pre-accident value.
      </p>

      <p>
        <strong>Step 3: Obtain a written DV appraisal.</strong> A
        credentialed automotive appraiser can document your DV loss with
        market data. This report is your primary negotiating tool and
        will be substantially more persuasive than a formula calculation.
      </p>

      <p>
        <strong>Step 4: File the DV claim in writing.</strong> Submit a
        written demand to the at-fault driver&apos;s insurer (or your own, if
        applicable). Include your DV appraisal report, the repair estimate
        and completed repair documentation, and a statement of the
        pre-accident value with supporting market data.
      </p>

      <p>
        <strong>Step 5: Negotiate the offer.</strong> The insurer will
        likely respond with a 17c formula calculation significantly below
        your appraisal. Counter with your appraiser&apos;s documentation,
        real market data, and comparable sale prices of vehicles with and
        without accident history.
      </p>

      <p>
        <strong>Step 6: Escalate if needed.</strong> If the insurer
        refuses to engage with your appraisal, you may be able to invoke
        the appraisal clause (if your own insurer is involved), file a
        state complaint, or pursue the matter in small claims court for
        amounts within that limit (typically $5,000 to $15,000 depending
        on state).
      </p>

      <h3 id="hiring-a-dv-appraiser">
        When to Hire a Diminished Value Appraiser
      </h3>

      <p>
        A professional DV appraisal is worth the cost (typically $200 to
        $600) when:
      </p>

      <ul>
        <li>The vehicle is under 5 years old and has under 60,000 miles</li>
        <li>Repair costs exceeded $5,000</li>
        <li>The vehicle sustained structural or airbag damage</li>
        <li>The expected DV loss exceeds $2,000</li>
        <li>The insurer&apos;s initial DV offer is below the 17c calculation</li>
      </ul>

      <p>
        For lower-value claims or minor damage, the 17c formula applied
        yourself and a well-documented demand letter may be sufficient.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/* Real DV Case Studies                                              */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="real-dv-case-studies">Real Diminished Value Case Studies</h2>

      <CaseStudy
        name="Jessica M."
        vehicle="2022 BMW 5 Series 530i"
        state="Georgia"
        initialOffer="$2,200 DV"
        finalSettlement="$6,800 DV"
        gap="+$4,600 DV recovery"
        narrative={
          <p>
            Jessica&apos;s 5 Series was rear-ended on I-285 in Atlanta by an
            at-fault driver. Repairs totaled $14,200, including structural
            work. The at-fault insurer offered $2,200 in DV using a
            modified 17c formula. Jessica hired a certified DV appraiser
            who documented that comparable 2022 530i sedans with accident
            history sold for an average of $7,100 less than clean-history
            units in the Atlanta metro. The appraiser produced a formal
            written report citing 12 actual sales. The insurer settled at
            $6,800 after one round of negotiation with the appraiser&apos;s
            report attached.
          </p>
        }
      />

      <CaseStudy
        name="Robert and Kim H."
        vehicle="2021 Toyota Highlander Platinum"
        state="Texas"
        initialOffer="$1,800 DV"
        finalSettlement="$4,500 DV"
        gap="+$2,700 DV recovery"
        narrative={
          <p>
            The Hendersons&apos; Highlander was sideswiped in Dallas. The
            at-fault driver&apos;s insurer initially offered $1,800 DV using
            17c. The Hendersons researched Carfax data showing that
            2021 Highlander Platinum units with accident history listed on
            AutoTrader and Cars.com averaged 14.2% below clean-history
            comparables. On a $42,000 pre-accident vehicle, 14.2% equals
            $5,964. They filed a formal DV demand with this market data
            and two listings as exhibits. The insurer countered at $3,800,
            and after one further exchange agreed to $4,500 &mdash; resolved
            entirely through written correspondence without hiring an
            appraiser.
          </p>
        }
      />

      <CaseStudy
        name="Andre V."
        vehicle="2020 Mercedes-Benz GLC 300 4MATIC"
        state="California"
        initialOffer="$0 DV (denied)"
        finalSettlement="$5,100 DV"
        gap="+$5,100 DV recovery"
        narrative={
          <p>
            Andre&apos;s GLC was hit while parked in San Jose. The at-fault
            insurer initially denied the DV claim entirely, citing that
            &ldquo;California does not allow DV claims.&rdquo; This was incorrect;
            California law permits third-party DV claims. Andre obtained
            a DV appraisal ($325 fee) and filed a formal demand citing
            California Vehicle Code Section 17150 and relevant case law
            establishing DV rights. Facing a documented appraisal and a
            clear legal citation, the insurer agreed to settle the DV
            claim for $5,100. Andre also filed a complaint with the
            California Department of Insurance regarding the initial
            erroneous denial, resulting in a file notation.
          </p>
        }
      />

      {/* ---------------------------------------------------------------- */}
      {/* DV vs Total Loss                                                  */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="dv-vs-total-loss">
        Diminished Value vs. Total Loss: Key Differences
      </h2>

      <DataTable
        caption="Diminished value claim vs. total loss settlement: key differences"
        headers={["Factor", "Diminished Value Claim", "Total Loss Settlement"]}
        rows={[
          ["When it applies", "Vehicle is repaired, not totaled", "Vehicle declared a total loss by insurer"],
          ["What you recover", "Loss in resale value post-repair", "Actual cash value (ACV) of the vehicle"],
          ["Who you file against", "At-fault driver&apos;s insurer (third-party); sometimes your own", "Your own insurer (or at-fault insurer)"],
          ["Negotiation basis", "DV appraisal, comparable sale prices", "Comparable vehicle listings, ACV adjustments"],
          ["Typical recovery", "$1,500 – $7,000", "$2,800 – $5,300 above initial offer"],
          ["Timeline", "File after repairs are complete", "File immediately after total loss declaration"],
        ]}
      />

      <h3 id="check-your-vehicle-value">
        Check Your Vehicle&apos;s Pre- and Post-Repair Value
      </h3>

      <p>
        To accurately calculate your DV loss, you need a clear picture of
        your vehicle&apos;s pre-accident fair market value. Use our estimator
        to establish that baseline:
      </p>

      <CarValueEstimator mode="mini" />

      <CTABox
        heading="Get help with your total loss or DV claim"
        body="ClaimCoach helps you understand what you're owed — whether your vehicle was totaled or repaired. Get an itemized analysis of missing value in under 5 minutes."
        href="/claims/new"
        label="Start my claim analysis"
      />

      {/* ---------------------------------------------------------------- */}
      {/* The Bottom Line                                                   */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          Diminished value is real, measurable, and legally recoverable in
          most states &mdash; yet fewer than 5% of eligible drivers ever
          claim it. If your vehicle was repaired after an accident caused
          by another driver, you may be owed thousands of dollars in DV
          compensation on top of your repair costs. File a third-party DV
          claim, document it with an appraisal or market data, and
          negotiate. The insurer&apos;s first response is rarely their final one.
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
          <Link href="/guides/total-loss-car-value" className="text-coral hover:underline">
            How Insurers Value Your Car
          </Link>{" "}
          &mdash; ACV calculation and valuation dispute strategies
        </li>
        <li>
          <Link href="/guides/appraisal-clause-insurance" className="text-coral hover:underline">
            Using the Appraisal Clause
          </Link>{" "}
          &mdash; how to trigger a binding valuation dispute process
        </li>
        <li>
          <Link href="/guides/adjuster-call-script" className="text-coral hover:underline">
            What to Say to Your Adjuster
          </Link>{" "}
          &mdash; word-for-word scripts for negotiating effectively
        </li>
        <li>
          <Link href="/guides/insurance-lowball-offer" className="text-coral hover:underline">
            Is Your Offer a Lowball?
          </Link>{" "}
          &mdash; 7 warning signs your settlement is below fair value
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/* Disclaimer                                                        */}
      {/* ---------------------------------------------------------------- */}

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational
          and educational purposes only and does not constitute legal,
          financial, or insurance advice. Diminished value claim rights,
          recoverable amounts, and claim procedures vary significantly by
          state and policy. The case studies presented are based on
          representative examples; individual outcomes depend on the
          specifics of each claim. ClaimCoach is not an insurance company,
          law firm, or licensed public adjuster. Consult a licensed
          professional in your state for advice specific to your situation.
        </p>
      </div>
    </>
  );
}
