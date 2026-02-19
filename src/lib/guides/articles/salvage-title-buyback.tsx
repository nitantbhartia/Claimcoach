import Link from "next/link";
import { SettlementChecklist } from "@/components/tools/settlement-checklist";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { DataTable } from "@/components/guides/data-table";

/* ---------------------------------------------------------------------- */
/*  Headings                                                                */
/* ---------------------------------------------------------------------- */

export const headings = [
  {
    id: "what-is-salvage-buyback",
    text: "What Is a Salvage Title Buyback?",
    level: 2,
  },
  {
    id: "how-salvage-value-is-determined",
    text: "How Salvage Value Is Determined",
    level: 2,
  },
  {
    id: "what-happens-to-your-title",
    text: "What Happens to Your Title",
    level: 2,
  },
  {
    id: "salvage-title",
    text: "Salvage Title",
    level: 3,
  },
  {
    id: "rebuilt-title",
    text: "Rebuilt (Reconstructed) Title",
    level: 3,
  },
  {
    id: "salvage-vs-rebuilt-comparison",
    text: "Salvage vs. Rebuilt Title: Key Differences",
    level: 2,
  },
  {
    id: "when-keeping-makes-sense",
    text: "When Keeping Your Car Makes Sense",
    level: 2,
  },
  {
    id: "when-to-surrender",
    text: "When You Should Surrender the Vehicle",
    level: 2,
  },
  {
    id: "keep-vs-surrender-table",
    text: "Keep vs. Surrender: Decision Factors",
    level: 3,
  },
  {
    id: "step-by-step-buyback",
    text: "Step-by-Step: How to Exercise a Salvage Buyback",
    level: 2,
  },
  {
    id: "verify-your-settlement-first",
    text: "Verify Your Settlement Before Deciding",
    level: 2,
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

export default function SalvageTitleBuyback() {
  return (
    <>
      <p>
        When your insurer declares your car a total loss, they take title to
        the vehicle and sell it to a salvage yard or auction company to recover
        part of the payout they made you. But in most states, you have the
        right to stop that process and keep the vehicle yourself &mdash; a
        process called a{" "}
        <strong>salvage title buyback</strong> or vehicle retention. In
        exchange for keeping the car, the insurer deducts the estimated salvage
        value from your settlement. You walk away with a lower check, a
        salvage-titled vehicle, and the responsibility of deciding what to do
        with it next. Whether that trade-off makes sense depends on the
        damage, your plans for the car, and a handful of practical
        consequences most policyholders do not fully consider before saying yes.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          Keeping a totaled vehicle reduces your settlement by the salvage
          value and results in a salvage title, which limits insurability,
          resale options, and financing. Before exercising a buyback, verify
          that your settlement ACV is as high as possible &mdash; the salvage
          deduction is calculated from that number.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/*  What Is a Salvage Buyback                                         */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="what-is-salvage-buyback">What Is a Salvage Title Buyback?</h2>

      <p>
        In a standard total loss settlement, the insurer pays you the actual
        cash value (ACV) of your vehicle and takes ownership of it. The insurer
        then sells the vehicle to a salvage auction (typically Copart or
        IAA/Ritchie Bros.), which pays the insurer a salvage value. That salvage
        value is one of the inputs in their total cost calculation.
      </p>

      <p>
        In a salvage buyback, you essentially outbid the salvage yard. Instead
        of the insurer selling the vehicle at auction, you agree to pay the
        salvage value yourself &mdash; which means it is deducted from your
        settlement check rather than paid to you. You receive the reduced
        settlement, and the insurer transfers the title to you. The title is
        then branded as salvage by your state DMV, reflecting the fact that
        the vehicle was declared a total loss.
      </p>

      <p>
        The mechanics look like this: if your ACV is $18,000 and the salvage
        value is determined to be $4,500, the insurer pays you $13,500 and
        transfers the title. You now own a $18,000 ACV vehicle with $4,500
        worth of damage, on paper. Whether the math actually works depends on
        what it costs to repair the damage.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  How Salvage Value Is Determined                                  */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="how-salvage-value-is-determined">
        How Salvage Value Is Determined
      </h2>

      <p>
        Your insurer does not set salvage value arbitrarily. They submit your
        vehicle&apos;s information to an online salvage auction platform
        (typically Copart or IAA) and receive competitive bids from licensed
        salvage dealers and dismantlers. The highest bid becomes the salvage
        value that is deducted from your settlement.
      </p>

      <p>
        Salvage value varies enormously depending on the type and severity of
        damage. A vehicle with extensive front-end collision damage, deployed
        airbags, and a buckled frame will fetch a lower salvage value than a
        vehicle that was totaled due to hail or minor flood damage with
        otherwise intact mechanicals. The salvage bidders are primarily
        interested in usable parts, metals, and the possibility of
        professional repair and resale.
      </p>

      <p>
        You can ask your adjuster what the salvage value determination was and
        how it was calculated. In most states, you are entitled to this
        information. Some insurers will let you see the bid results. Knowing
        the salvage value before you decide to keep the vehicle is essential,
        because it directly determines how much your settlement check will be
        reduced.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  What Happens to Your Title                                       */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="what-happens-to-your-title">What Happens to Your Title</h2>

      <h3 id="salvage-title">Salvage Title</h3>

      <p>
        Every state in the U.S. requires that a vehicle issued a total loss
        settlement receive a branded title. The most common brand is
        &quot;salvage.&quot; A salvage title indicates that the vehicle was
        declared a total loss by an insurance company. In most states, a
        salvage-titled vehicle cannot be legally registered or driven on public
        roads until it is repaired and passes a state inspection. The exact
        rules for what constitutes &quot;repaired&quot; and what inspections
        are required vary by state.
      </p>

      <h3 id="rebuilt-title">Rebuilt (Reconstructed) Title</h3>

      <p>
        After you repair the vehicle, most states allow you to convert the
        salvage title to a rebuilt or reconstructed title by passing a state
        inspection and filing the appropriate DMV paperwork. A rebuilt title
        confirms that the vehicle was repaired and inspected. It is street-legal
        and can be registered and insured.
      </p>

      <p>
        However, a rebuilt title is a permanent mark on the vehicle&apos;s
        history. Even after conversion from salvage to rebuilt, the title
        brand follows the vehicle forever and appears on Carfax and AutoCheck
        reports. Most private buyers and many dealers discount rebuilt-title
        vehicles significantly, and most lenders will not finance them.
        Insurance companies vary in their willingness to offer full coverage
        on rebuilt-title vehicles &mdash; some offer liability-only, some
        offer full coverage with a reduced valuation, and some decline entirely.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  Comparison Table                                                 */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="salvage-vs-rebuilt-comparison">
        Salvage vs. Rebuilt Title: Key Differences
      </h2>

      <DataTable
        caption="Key differences between salvage and rebuilt vehicle titles"
        headers={[
          "Feature",
          "Salvage Title",
          "Rebuilt (Reconstructed) Title",
        ]}
        rows={[
          [
            "When issued",
            "At total loss declaration when insurer takes ownership",
            "After repairs and passage of state DMV inspection",
          ],
          [
            "Street-legal?",
            "No — cannot be registered or driven in most states",
            "Yes — after inspection and registration",
          ],
          [
            "Insurance eligibility",
            "Not eligible for standard coverage; liability-only at best",
            "Varies by insurer; some offer full coverage, many offer liability-only",
          ],
          [
            "Financing available?",
            "No — lenders will not finance",
            "Rarely — some credit unions will; most lenders decline",
          ],
          [
            "Resale impact",
            "Severely limited; effectively wholesale-only value",
            "Reduced 20–40% below clean-title equivalent, market-dependent",
          ],
          [
            "Appears on vehicle history?",
            "Yes — permanent brand on Carfax / AutoCheck",
            "Yes — permanently shown as prior salvage, now rebuilt",
          ],
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/*  When to Keep                                                     */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="when-keeping-makes-sense">When Keeping Your Car Makes Sense</h2>

      <p>
        There are legitimate situations where exercising a salvage buyback is
        the right financial decision. Consider keeping your vehicle if:
      </p>

      <ul>
        <li>
          <strong>Repair cost is less than the salvage deduction.</strong> If
          a trusted mechanic can fix the vehicle for less than the salvage value
          your insurer would deduct, you come out ahead. For example, if the
          salvage deduction is $5,000 but you can repair the damage for $2,500,
          you net $2,500 more by keeping the car.
        </li>
        <li>
          <strong>The damage is primarily cosmetic or panel work.</strong>{" "}
          Vehicles totaled because repair estimates exceed the insurer&apos;s
          threshold &mdash; but where the damage is repairable sheet metal,
          bumpers, or trim &mdash; may be economical to keep, especially if
          you have a trusted body shop with fair labor rates.
        </li>
        <li>
          <strong>You do not need financing.</strong> If you plan to drive the
          vehicle yourself and do not need to insure it at full coverage (beyond
          liability), the financing and insurance limitations may not affect you.
        </li>
        <li>
          <strong>The vehicle has irreplaceable personal value.</strong> Classic,
          custom, or rare vehicles that cannot be replaced on the open market
          at any price are sometimes worth keeping even with significant repair
          costs.
        </li>
        <li>
          <strong>You have the skills to repair it yourself.</strong> Experienced
          mechanics who can source parts and do their own bodywork can often
          restore a salvage-titled vehicle for far less than shop rates.
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/*  When to Surrender                                                */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="when-to-surrender">When You Should Surrender the Vehicle</h2>

      <p>
        For most policyholders in most total loss situations, surrendering the
        vehicle and taking the full settlement is the better financial outcome.
        Strongly consider surrendering if any of the following apply:
      </p>

      <h3 id="keep-vs-surrender-table">Keep vs. Surrender: Decision Factors</h3>

      <DataTable
        caption="Factors to consider when deciding whether to keep or surrender a totaled vehicle"
        headers={[
          "Factor",
          "Lean Toward Keeping",
          "Lean Toward Surrendering",
        ]}
        rows={[
          [
            "Repair cost vs. salvage deduction",
            "Repair cost is less than salvage deduction",
            "Repair cost equals or exceeds salvage deduction",
          ],
          [
            "Type of damage",
            "Cosmetic, panel, or single-system damage",
            "Structural, airbag deployment, flood, or fire damage",
          ],
          [
            "Financing needs",
            "No loan needed; you will own it free and clear",
            "You need a loan to buy a replacement vehicle",
          ],
          [
            "Insurance needs",
            "Liability-only coverage is sufficient",
            "You need comprehensive or collision coverage",
          ],
          [
            "Resale plans",
            "You plan to drive it long-term; resale not a priority",
            "You may sell within 1–3 years",
          ],
          [
            "Repair access",
            "Trusted mechanic or DIY capability at low cost",
            "Dependent on dealership or shop rates",
          ],
          [
            "Safety concerns",
            "Damage is clearly repairable to safe condition",
            "Structural or airbag damage raises safety questions",
          ],
        ]}
      />

      <KeyTakeaway>
        <p>
          Structural damage, deployed airbags, and flood damage make buyback
          particularly risky. These categories of damage are difficult to repair
          fully, may create latent safety hazards, and are very difficult to
          insure or sell afterward. If your vehicle had any of these, the case
          for surrendering it is strong in most situations.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/*  Step-by-Step                                                     */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="step-by-step-buyback">
        Step-by-Step: How to Exercise a Salvage Buyback
      </h2>

      <p>
        <strong>Step 1: Negotiate your ACV first.</strong> Before you decide
        to exercise a buyback, make sure your ACV is as high as possible.
        The salvage deduction is calculated from the ACV &mdash; a higher ACV
        means a higher net settlement even after the deduction. Review your
        valuation report for errors and submit a counter-offer if the ACV is
        below market. See our{" "}
        <Link href="/guides/how-to-read-valuation-report" className="text-coral hover:underline">
          guide to reading your valuation report
        </Link>{" "}
        for detailed steps.
      </p>

      <p>
        <strong>Step 2: Ask for the salvage value determination.</strong>{" "}
        Request the salvage value from your adjuster before agreeing to
        anything. This is the amount that will be deducted from your settlement.
        Compare it to repair estimates you get from one or two independent shops.
      </p>

      <p>
        <strong>Step 3: Get repair estimates before deciding.</strong> Do not
        rely on the insurer&apos;s repair estimate. Get at least one independent
        estimate from a shop that will actually do the repair. Factor in
        parts availability, hidden damage that may appear during teardown, and
        any specialty work like frame straightening.
      </p>

      <p>
        <strong>Step 4: Notify your insurer in writing.</strong> If you decide
        to keep the vehicle, notify your adjuster in writing and ask them to
        confirm the salvage deduction amount and the net settlement figure.
        Get this in writing before signing anything.
      </p>

      <p>
        <strong>Step 5: Complete the title transfer.</strong> The insurer
        will transfer the salvage title to you. Once you have the title, take
        it to your state DMV to understand the inspection requirements for
        converting it to a rebuilt title after repairs are complete.
      </p>

      <p>
        <strong>Step 6: Complete repairs and pursue rebuilt title.</strong>{" "}
        Have the repairs done by a licensed shop (some states require this).
        Schedule your state DMV inspection. Once the vehicle passes, apply
        for a rebuilt title and re-register the vehicle.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  Verify Your Settlement First                                     */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="verify-your-settlement-first">
        Verify Your Settlement Before Deciding
      </h2>

      <p>
        Before you decide whether to exercise a buyback, make sure your
        settlement offer is complete. The salvage deduction is applied after
        the ACV is set &mdash; any missing line items in your current offer
        reduce both your net settlement and the baseline from which the
        salvage deduction is calculated. Use our{" "}
        <Link href="/tools/settlement-checklist" className="text-coral hover:underline">
          Settlement Checklist
        </Link>{" "}
        to verify that sales tax, title fees, and all required line items
        are included in your current offer before making the buyback decision.
      </p>

      <SettlementChecklist mode="mini" />

      <CTABox
        heading="Make sure your settlement is complete before accepting"
        body="ClaimCoach analyzes your offer for missing line items, undervalued comparables, and incorrect adjustments — so you know exactly what your buyback math should be based on."
        href="/claims/new"
        label="Review my settlement offer"
      />

      {/* ---------------------------------------------------------------- */}
      {/*  Bottom Line                                                      */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          A salvage buyback can make financial sense when repair costs are
          genuinely less than the salvage deduction and you have no need for
          financing or full insurance coverage. But the long-term consequences
          &mdash; permanent title brand, limited insurability, restricted
          financing, and reduced resale value &mdash; are significant and
          permanent. Negotiate your ACV to its highest possible value before
          you make the buyback decision, because the deduction is applied
          to that number.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/*  Related Guides                                                   */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="related-guides" className="text-heading font-semibold text-black mt-10 mb-4">
        Related Guides
      </h2>

      <ul className="list-disc list-inside space-y-2 text-body text-[#4a555e] mb-6">
        <li>
          <Link href="/guides/total-loss-threshold-by-state" className="text-coral hover:underline">
            Total Loss Threshold by State
          </Link>{" "}
          &mdash; when your state considers a car totaled
        </li>
        <li>
          <Link href="/guides/how-to-read-valuation-report" className="text-coral hover:underline">
            How to Read Your Valuation Report
          </Link>{" "}
          &mdash; maximize ACV before the salvage deduction is applied
        </li>
        <li>
          <Link href="/guides/total-loss-settlement-amount" className="text-coral hover:underline">
            How Much Should My Total Loss Settlement Be?
          </Link>{" "}
          &mdash; all the line items your offer should include
        </li>
        <li>
          <Link href="/guides/gap-insurance-total-loss" className="text-coral hover:underline">
            GAP Insurance and Total Loss
          </Link>{" "}
          &mdash; how GAP interacts with a salvage buyback decision
        </li>
      </ul>

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational and
          educational purposes only and does not constitute legal, financial,
          or insurance advice. Salvage title laws, inspection requirements,
          insurance eligibility rules, and resale market conditions vary by
          state and are subject to change. Consult a licensed professional in
          your state for advice specific to your situation. Nothing in this
          article should be interpreted as a promise or prediction of any
          particular outcome.
        </p>
      </div>
    </>
  );
}
