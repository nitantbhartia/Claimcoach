import Link from "next/link";
import { CarValueEstimator } from "@/components/tools/car-value-estimator";
import { SettlementChecklist } from "@/components/tools/settlement-checklist";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { CaseStudy } from "@/components/guides/case-study";
import { DataTable } from "@/components/guides/data-table";

/* ---------------------------------------------------------------------- */
/*  Headings                                                                */
/* ---------------------------------------------------------------------- */

export const headings = [
  {
    id: "what-is-total-loss-threshold",
    text: "What Is a Total Loss Threshold?",
    level: 2,
  },
  {
    id: "total-loss-threshold-all-states",
    text: "Total Loss Threshold by State: Complete Table",
    level: 2,
  },
  {
    id: "total-loss-formula-states",
    text: "Total Loss Formula States vs. Threshold States",
    level: 3,
  },
  {
    id: "how-repair-costs-are-estimated",
    text: "How Repair Costs Are Estimated (and Why They Matter)",
    level: 2,
  },
  {
    id: "real-total-loss-threshold-cases",
    text: "Real Cases: When the Threshold Made a Difference",
    level: 2,
  },
  {
    id: "what-to-do-when-car-is-totaled",
    text: "What to Do When Your Car Is Declared a Total Loss",
    level: 2,
  },
  {
    id: "verify-settlement-line-items",
    text: "Verify Your Settlement Line Items",
    level: 3,
  },
  {
    id: "how-to-challenge-repair-estimate",
    text: "How to Challenge an Inflated Repair Estimate",
    level: 3,
  },
  {
    id: "keeping-your-totaled-car",
    text: "Keeping Your Totaled Car: Salvage Title and Retained Value",
    level: 3,
  },
  {
    id: "estimate-your-vehicle-value",
    text: "Estimate Your Vehicle Value Before the Decision",
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

export default function TotalLossThresholdByState() {
  return (
    <>
      {/* Lead paragraph */}
      <p>
        A vehicle is declared a total loss when the estimated cost of
        repairs exceeds a specific threshold relative to the car&apos;s value.
        That threshold is set by your state &mdash; and it varies from as
        low as <strong>60%</strong> (in states like Oklahoma and Texas) to
        as high as <strong>100%</strong> of the vehicle&apos;s pre-loss value
        (in states like California, using the Total Loss Formula). If your
        car sits near the boundary, understanding your state&apos;s specific
        rule can mean the difference between a repair and a total loss
        settlement worth thousands of dollars. This guide explains every
        state&apos;s threshold, how repair cost estimates are built, and what
        your options are once a total loss declaration is made.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          Your state&apos;s total loss threshold determines whether your
          insurer must pay to repair your vehicle or write you a settlement
          check. In threshold states, if repairs exceed a fixed percentage
          of ACV (often 75–80%), the car is a total loss. In Total Loss
          Formula (TLF) states, the math is more nuanced — and the outcome
          depends on both the repair estimate and salvage value.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/* What Is a Total Loss Threshold                                    */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="what-is-total-loss-threshold">
        What Is a Total Loss Threshold?
      </h2>

      <p>
        When your vehicle is in an accident, your insurer estimates the
        cost to repair it. If that cost &mdash; relative to the
        vehicle&apos;s <strong>actual cash value (ACV)</strong> &mdash; hits
        or exceeds a certain level, the insurer determines the vehicle is
        an economic total loss: it costs more to fix it than the car is
        worth (or nearly so). At that point, the insurer takes ownership
        of the salvage (or pays you a reduced settlement if you keep it)
        and pays you the ACV.
      </p>

      <p>
        Two main systems exist across U.S. states:
      </p>

      <ul>
        <li>
          <strong>Percentage threshold states:</strong> A total loss is
          triggered when estimated repair costs exceed a fixed percentage of
          ACV &mdash; typically 75%, 80%, or another defined level. For
          example, if your car has an ACV of $20,000 and your state uses
          an 80% threshold, any repair estimate above $16,000 results in a
          total loss.
        </li>
        <li>
          <strong>Total Loss Formula (TLF) states:</strong> A total loss
          is declared when the repair cost plus the vehicle&apos;s salvage value
          exceeds the ACV. The formula is: if{" "}
          <em>Repair Cost + Salvage Value &gt; ACV</em>, the car is a total
          loss. States using TLF include California, Texas (hybrid), and
          several others.
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/* Total Loss Threshold All States                                   */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="total-loss-threshold-all-states">
        Total Loss Threshold by State: Complete Table
      </h2>

      <p>
        The following table shows each state&apos;s total loss threshold or
        formula. Note that thresholds may be updated by state regulation;
        always verify with your state&apos;s department of motor vehicles or
        department of insurance.
      </p>

      <DataTable
        caption="Total loss threshold by state (2026)"
        headers={["State", "Threshold / Rule", "System", "Notes"]}
        rows={[
          ["Alabama", "75%", "Percentage", ""],
          ["Alaska", "75%", "Percentage", ""],
          ["Arizona", "No fixed threshold", "TLF (insurer discretion)", "Insurer uses TLF; no statute sets a specific %"],
          ["Arkansas", "70%", "Percentage", ""],
          ["California", "TLF", "Total Loss Formula", "Repair + Salvage &gt; ACV"],
          ["Colorado", "100%", "Percentage", "Insurer may also use TLF"],
          ["Connecticut", "TLF", "Total Loss Formula", ""],
          ["Delaware", "TLF", "Total Loss Formula", ""],
          ["Florida", "80%", "Percentage", ""],
          ["Georgia", "75%", "Percentage", ""],
          ["Hawaii", "TLF", "Total Loss Formula", ""],
          ["Idaho", "TLF", "Total Loss Formula", ""],
          ["Illinois", "TLF", "Total Loss Formula", ""],
          ["Indiana", "70%", "Percentage", ""],
          ["Iowa", "TLF", "Total Loss Formula", ""],
          ["Kansas", "75%", "Percentage", ""],
          ["Kentucky", "75%", "Percentage", ""],
          ["Louisiana", "75%", "Percentage", ""],
          ["Maine", "TLF", "Total Loss Formula", ""],
          ["Maryland", "75%", "Percentage", ""],
          ["Massachusetts", "TLF", "Total Loss Formula", ""],
          ["Michigan", "75%", "Percentage", ""],
          ["Minnesota", "TLF", "Total Loss Formula", ""],
          ["Mississippi", "TLF", "Total Loss Formula", ""],
          ["Missouri", "80%", "Percentage", ""],
          ["Montana", "TLF", "Total Loss Formula", ""],
          ["Nebraska", "75%", "Percentage", ""],
          ["Nevada", "65%", "Percentage", "One of the lowest thresholds"],
          ["New Hampshire", "TLF", "Total Loss Formula", ""],
          ["New Jersey", "80%", "Percentage", ""],
          ["New Mexico", "TLF", "Total Loss Formula", ""],
          ["New York", "TLF", "Total Loss Formula", ""],
          ["North Carolina", "75%", "Percentage", ""],
          ["North Dakota", "75%", "Percentage", ""],
          ["Ohio", "TLF", "Total Loss Formula", ""],
          ["Oklahoma", "60%", "Percentage", "Lowest fixed threshold in U.S."],
          ["Oregon", "80%", "Percentage", ""],
          ["Pennsylvania", "TLF", "Total Loss Formula", ""],
          ["Rhode Island", "TLF", "Total Loss Formula", ""],
          ["South Carolina", "75%", "Percentage", ""],
          ["South Dakota", "TLF", "Total Loss Formula", ""],
          ["Tennessee", "75%", "Percentage", ""],
          ["Texas", "100% (TLF)", "Total Loss Formula", "Repair + Salvage &gt; ACV"],
          ["Utah", "TLF", "Total Loss Formula", ""],
          ["Vermont", "TLF", "Total Loss Formula", ""],
          ["Virginia", "75%", "Percentage", ""],
          ["Washington", "TLF", "Total Loss Formula", ""],
          ["West Virginia", "TLF", "Total Loss Formula", ""],
          ["Wisconsin", "70%", "Percentage", ""],
          ["Wyoming", "TLF", "Total Loss Formula", ""],
          ["Washington D.C.", "75%", "Percentage", ""],
        ]}
      />

      <h3 id="total-loss-formula-states">
        Total Loss Formula States vs. Threshold States
      </h3>

      <p>
        In TLF states, the key variable is salvage value &mdash; what the
        wrecked vehicle is worth to a salvage yard or auto auction. A
        higher salvage value makes it easier to trigger a total loss
        declaration even when repairs are under 80% of ACV. For example:
      </p>

      <ul>
        <li>
          ACV: $22,000 | Repair estimate: $15,000 (68% of ACV) | Salvage
          value: $8,500
        </li>
        <li>
          TLF: $15,000 + $8,500 = $23,500 &gt; $22,000 ACV →{" "}
          <strong>Total loss declared</strong>
        </li>
      </ul>

      <p>
        Under a fixed 75% threshold, the same vehicle would not be a total
        loss (68% &lt; 75%). This is why vehicles that could be repaired in
        a threshold state might be totaled in a TLF state with the same
        damage.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/* How Repair Costs Are Estimated                                    */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="how-repair-costs-are-estimated">
        How Repair Costs Are Estimated (and Why They Matter)
      </h2>

      <p>
        Your insurer&apos;s body shop estimator or independent appraiser
        generates a repair estimate using specialized software (Mitchell,
        CCC, or Audatex). This estimate drives the total loss
        determination. Understanding how it is built helps you identify
        if it is inflated (which could cause an unnecessary total loss) or
        if hidden damages were missed.
      </p>

      <DataTable
        caption="Components of a typical insurance repair estimate"
        headers={["Component", "What It Covers", "Potential Issue"]}
        rows={[
          [
            "Parts cost",
            "Replacement panels, glass, mechanical components",
            "Insurer may specify aftermarket or LKQ (used) parts over OEM",
          ],
          [
            "Labor hours",
            "Hours to remove, repair, and reinstall each component",
            "Labor rate may be below the prevailing local shop rate",
          ],
          [
            "Paint materials",
            "Paint, primer, clear coat, masking materials",
            "Some estimates use a flat rate instead of actual cost",
          ],
          [
            "Sublet work",
            "Specialized work sent to other shops (alignment, glass, etc.)",
            "May be underestimated or omitted",
          ],
          [
            "Supplemental damage",
            "Hidden damage discovered after teardown",
            "Initial estimates often miss frame and structural damage",
          ],
          [
            "Diminished value",
            "Post-repair reduction in resale value",
            "Not included in repair estimates — requires a separate claim",
          ],
        ]}
      />

      <p>
        If the repair estimate is borderline &mdash; close to your state&apos;s
        threshold &mdash; you can request that your insurer obtain a second
        estimate. You can also have an independent shop inspect the vehicle.
        Supplemental damage discovered after teardown frequently pushes
        estimates over the threshold.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/* Real Cases                                                        */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="real-total-loss-threshold-cases">
        Real Cases: When the Threshold Made a Difference
      </h2>

      <CaseStudy
        name="Carlos M."
        vehicle="2018 Chevrolet Silverado 1500 LTZ"
        state="Nevada"
        initialOffer="$27,500"
        finalSettlement="$30,200"
        gap="+$2,700 on settlement"
        narrative={
          <p>
            Carlos&apos;s Silverado sustained frame and mechanical damage in a
            rollover in Las Vegas. Nevada&apos;s 65% total loss threshold —
            one of the lowest in the country — meant that the truck was
            declared a total loss at a repair estimate of $18,500 on a
            $28,000 ACV vehicle (66%). In a state with a 75% threshold,
            the same truck would have been repaired. Once total loss was
            declared, ClaimCoach identified that the ACV comparables used
            were 2WD models, not 4WD, and that Nevada sales tax ($2,303)
            was missing. Carlos negotiated to $30,200 and received a full
            settlement.
          </p>
        }
      />

      <CaseStudy
        name="Natasha W."
        vehicle="2020 Honda Civic EX"
        state="Oklahoma"
        initialOffer="$16,400"
        finalSettlement="$18,100"
        gap="+$1,700"
        narrative={
          <p>
            Natasha&apos;s Civic was hit in a parking lot in Tulsa. The body
            shop estimated $10,200 in repairs. Oklahoma&apos;s 60% threshold
            meant that on a $16,800 ACV vehicle, any estimate above $10,080
            triggers a total loss &mdash; and $10,200 was just over the
            line. In most states, the vehicle would have been repaired and
            returned. Once total loss was declared, Natasha used ClaimCoach
            to verify the ACV and found that Oklahoma&apos;s 4.5% sales tax
            ($756) and title fees ($166) were both missing. She negotiated
            the settlement from $16,400 to $18,100.
          </p>
        }
      />

      <CaseStudy
        name="Eric P."
        vehicle="2019 BMW 330i xDrive"
        state="California"
        initialOffer="$28,600"
        finalSettlement="$31,800"
        gap="+$3,200"
        narrative={
          <p>
            Eric&apos;s BMW was rear-ended on the 405 in Los Angeles. California
            uses the Total Loss Formula: Repair ($21,500) + Salvage ($11,200)
            = $32,700 &gt; ACV ($30,000) → total loss. Under a fixed 75%
            threshold, the car would not have been totaled (repair estimate
            was 71.7% of ACV). The TLF result actually favored Eric, as
            the settlement process allowed him to negotiate the ACV using
            properly matched xDrive comparables in the LA market. A
            ClaimCoach analysis found the comparables were base 330i RWD
            models. Eric submitted 5 xDrive listings and the settlement
            increased to $31,800.
          </p>
        }
      />

      {/* ---------------------------------------------------------------- */}
      {/* What to Do When Car Is Totaled                                    */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="what-to-do-when-car-is-totaled">
        What to Do When Your Car Is Declared a Total Loss
      </h2>

      <p>
        Once your insurer declares a total loss, a specific sequence of
        steps protects your financial position:
      </p>

      <p>
        <strong>Step 1: Request the valuation report immediately.</strong>{" "}
        Ask your adjuster for the full ACV valuation report, including the
        comparables used, adjustments applied, and the methodology. You
        have a right to this document.
      </p>

      <p>
        <strong>Step 2: Review the comparables for accuracy.</strong> Check
        that each comparable is the same year, make, model, and trim as
        your vehicle. Verify mileage ranges and geographic proximity. Use
        our{" "}
        <Link href="/tools/car-value-estimator" className="text-coral hover:underline">
          Car Value Estimator
        </Link>{" "}
        to get an independent ACV benchmark.
      </p>

      <p>
        <strong>Step 3: Identify missing line items.</strong> Verify that
        sales tax, title fees, registration, and dealer documentation fees
        are included where required by your state. Use our{" "}
        <Link href="/tools/settlement-checklist" className="text-coral hover:underline">
          Settlement Checklist
        </Link>
        .
      </p>

      <p>
        <strong>Step 4: Submit a counter-offer if anything is wrong.</strong>{" "}
        See our{" "}
        <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
          counter-offer letter guide
        </Link>{" "}
        for a complete template and step-by-step instructions.
      </p>

      <p>
        <strong>Step 5: Decide whether to keep the vehicle.</strong> If you
        want to keep your totaled vehicle (salvage buy-back), you can
        negotiate to retain it. Your insurer will deduct the salvage value
        from your settlement. You will then receive a salvage title and
        must pass a state inspection before the vehicle can be re-registered.
      </p>

      <h3 id="verify-settlement-line-items">
        Verify Your Settlement Line Items
      </h3>

      <p>
        Once the total loss declaration is made, the settlement amount
        is determined by ACV plus required line items. In 70&ndash;80% of
        initial offers, at least one required line item is missing.
        Run through the checklist below before responding to any offer:
      </p>

      <SettlementChecklist mode="mini" />

      <h3 id="how-to-challenge-repair-estimate">
        How to Challenge an Inflated Repair Estimate
      </h3>

      <p>
        In threshold states, if you believe the repair estimate is
        inflated &mdash; pushing the vehicle over the threshold when it
        could reasonably be repaired &mdash; you have two options:
      </p>

      <ul>
        <li>
          <strong>Request a second estimate</strong> from an independent
          body shop. If it comes in significantly lower, you can challenge
          the insurer&apos;s estimate and potentially avoid a total loss
          declaration.
        </li>
        <li>
          <strong>Review supplemental damage items.</strong> Insurers
          sometimes include preliminary supplemental estimates for damage
          not yet confirmed. Ask which line items are confirmed vs.
          estimated, and whether final repair cost could land below the
          threshold.
        </li>
      </ul>

      <p>
        In TLF states, because the total loss math includes salvage value,
        this dispute is less common &mdash; even modest repair costs can
        trigger a total loss if the vehicle holds high salvage value.
      </p>

      <h3 id="keeping-your-totaled-car">
        Keeping Your Totaled Car: Salvage Title and Retained Value
      </h3>

      <p>
        If the damage is primarily cosmetic or the vehicle is still
        mechanically sound, you may choose to keep it under a salvage
        buy-back arrangement. Your settlement is reduced by the estimated
        salvage value (which the insurer would have received by selling the
        wreck). You then own the damaged vehicle, but it will carry a
        salvage title, which affects insurability and resale value.
      </p>

      <p>
        This option is most financially attractive when:
      </p>
      <ul>
        <li>The vehicle is mechanically intact and only cosmetically damaged</li>
        <li>The salvage deduction is modest (under 25% of ACV)</li>
        <li>You have access to low-cost repair options (family mechanic, etc.)</li>
        <li>You plan to keep the vehicle long-term rather than resell it</li>
      </ul>

      <h3 id="estimate-your-vehicle-value">
        Estimate Your Vehicle Value Before the Decision
      </h3>

      <p>
        Before accepting any settlement, verify your vehicle&apos;s ACV
        independently:
      </p>

      <CarValueEstimator mode="mini" />

      <CTABox
        heading="Get a full total loss analysis"
        body="ClaimCoach reviews your insurer's valuation against local comparables, verifies all required line items, and builds your counter-offer strategy in under 5 minutes."
        href="/claims/new"
        label="Start my analysis"
      />

      {/* ---------------------------------------------------------------- */}
      {/* The Bottom Line                                                   */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          Your state&apos;s total loss threshold determines whether your
          vehicle is repaired or settled. Threshold states use a fixed
          percentage (60%–100%); TLF states use a repair + salvage
          formula. In either case, once a total loss is declared, your
          settlement amount depends entirely on the ACV your insurer
          assigns — and that number is almost always negotiable. Check the
          comparables, verify all line items, and submit a counter-offer
          if anything is missing.
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
          &mdash; ACV calculation, valuation services, and comparable disputes
        </li>
        <li>
          <Link href="/guides/total-loss-settlement-amount" className="text-coral hover:underline">
            How Much Should My Settlement Be?
          </Link>{" "}
          &mdash; complete line-item guide to fair settlements
        </li>
        <li>
          <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
            Counter-Offer Letter Template
          </Link>{" "}
          &mdash; step-by-step negotiation after total loss is declared
        </li>
        <li>
          <Link href="/guides/insurance-lowball-offer" className="text-coral hover:underline">
            Is Your Offer a Lowball?
          </Link>{" "}
          &mdash; 7 warning signs your ACV is below fair market value
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/* Disclaimer                                                        */}
      {/* ---------------------------------------------------------------- */}

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational
          and educational purposes only and does not constitute legal,
          financial, or insurance advice. Total loss thresholds, state
          regulations, and insurer practices vary and are subject to change.
          The case studies presented are based on representative examples;
          individual outcomes depend on the specifics of each claim.
          ClaimCoach is not an insurance company, law firm, or licensed
          public adjuster. Always verify current rules with your state&apos;s
          department of motor vehicles and department of insurance.
        </p>
      </div>
    </>
  );
}
