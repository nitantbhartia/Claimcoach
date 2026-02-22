import Link from "next/link";
import { FairnessQuiz } from "@/components/tools/fairness-quiz";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { DataTable } from "@/components/guides/data-table";

export const headings = [
  { id: "comprehensive-not-collision", text: "Hail Is a Comprehensive Claim, Not Collision", level: 2 },
  { id: "how-hail-damage-is-assessed", text: "How Insurers Assess Hail Damage", level: 2 },
  { id: "when-hail-triggers-total-loss", text: "When Hail Damage Triggers a Total Loss", level: 2 },
  { id: "hail-repair-vs-total-loss", text: "Hail Repair vs. Total Loss: Decision Factors", level: 3 },
  { id: "the-driveable-total-loss", text: "The Driveable Total Loss: A Unique Hail Challenge", level: 2 },
  { id: "salvage-buyback-after-hail", text: "Salvage Buyback After Hail: Often the Right Call", level: 2 },
  { id: "documenting-hail-damage", text: "Documenting Your Hail Damage Claim", level: 2 },
  { id: "negotiating-hail-acv", text: "Negotiating Your ACV on a Hail Total Loss", level: 2 },
  { id: "check-your-offer", text: "Check Your Offer Before Accepting", level: 2 },
  { id: "the-bottom-line", text: "The Bottom Line", level: 2 },
  { id: "related-guides", text: "Related Guides", level: 2 },
];

export default function HailDamageTotalLoss() {
  return (
    <>
      <p>
        A severe hailstorm can produce hundreds of dents across every panel
        of your vehicle in minutes. When that damage is extensive enough,
        your insurer declares the car a total loss &mdash; even though it
        may start and drive perfectly. This creates a category of total loss
        claim that is uniquely frustrating: you have a functional vehicle
        that is suddenly worthless on paper. Understanding how hail total
        loss claims work, how the ACV is calculated, when a salvage buyback
        might make sense, and how to negotiate a complete settlement puts you
        in a much stronger position than most policyholders when hail season
        hits.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          Hail damage is covered under comprehensive, not collision, which
          means no fault and usually a lower deductible. When hail damage
          exceeds your state&apos;s total loss threshold, your insurer declares
          a total loss and pays ACV minus your deductible. Because hail totals
          are often driveable, a salvage buyback may make more sense here than
          in a collision scenario &mdash; but negotiate your ACV to its maximum
          before making that decision.
        </p>
      </KeyTakeaway>

      <h2 id="comprehensive-not-collision">
        Hail Is a Comprehensive Claim, Not Collision
      </h2>

      <p>
        Hail damage falls under your comprehensive coverage, which covers
        damage from events other than collisions &mdash; weather events, fire,
        theft, falling objects, and animal strikes. This matters in two
        important ways. First, fault is irrelevant: comprehensive claims do
        not involve another driver, and your premium impact from a
        comprehensive claim is typically lower than a collision claim in most
        states (though policies vary &mdash; check yours). Second, your
        comprehensive deductible applies, and it is usually lower than your
        collision deductible. If your comprehensive deductible is $250 and
        your collision deductible is $1,000, a hail total loss is less
        expensive on the deductible side than a collision would be.
      </p>

      <p>
        If you do not carry comprehensive coverage &mdash; which is optional
        on older vehicles or if you own your car outright &mdash; hail damage
        is entirely your financial responsibility. Comprehensive coverage is
        worth reviewing if you live in an area with seasonal hail risk.
      </p>

      <h2 id="how-hail-damage-is-assessed">
        How Insurers Assess Hail Damage
      </h2>

      <p>
        Hail damage assessment is specialized. Unlike collision damage, which
        is concentrated and visible, hail damage can involve hundreds of
        individual dents distributed across the hood, roof, trunk, and
        quarter panels. Repair techniques include conventional body shop
        work and paintless dent repair (PDR), a method that uses specialized
        tools to massage dents out from the inside without requiring paint.
        PDR is usually cheaper and faster than conventional repair, and it
        preserves the original factory finish.
      </p>

      <p>
        Your insurer will typically send either a staff appraiser or a
        third-party hail damage specialist to assess the damage. They count
        and document individual dents, estimate the repair cost using PDR
        rates where applicable, and compare that estimate to your vehicle&apos;s
        ACV. If the repair estimate plus salvage value exceeds ACV (in Total
        Loss Formula states like California and Texas) or if the repair cost
        alone exceeds the state threshold percentage (in percentage threshold
        states), the vehicle is declared a total loss.
      </p>

      <p>
        PDR rates are significantly lower than conventional body shop rates,
        which means a large number of dents may produce a repair estimate
        that is high relative to your vehicle&apos;s value even when the
        car looks driveable. This is the mechanism by which modest-looking
        hail damage can trigger a total loss on an older or lower-value
        vehicle.
      </p>

      <h2 id="when-hail-triggers-total-loss">
        When Hail Damage Triggers a Total Loss
      </h2>

      <p>
        The math is the same as any other total loss. In percentage threshold
        states, if the repair estimate is 75%, 80%, or whatever your state&apos;s
        threshold is relative to ACV, the car is totaled. In TLF states,
        if repair cost plus salvage value exceeds ACV, it is totaled. For
        hail claims, the PDR repair estimate is the key variable. The age
        and value of your vehicle determines how easily a hail estimate
        crosses the threshold.
      </p>

      <h3 id="hail-repair-vs-total-loss">
        Hail Repair vs. Total Loss: Decision Factors
      </h3>

      <DataTable
        caption="Factors that push a hail claim toward repair vs. total loss"
        headers={["Factor", "Pushes Toward Repair", "Pushes Toward Total Loss"]}
        rows={[
          [
            "Vehicle age and value",
            "Newer, higher-value vehicle",
            "Older vehicle with lower ACV — dent count crosses threshold more easily",
          ],
          [
            "Damage density",
            "Fewer than ~100 dents, concentrated on hood/roof only",
            "Dense denting across multiple panels, hood, roof, trunk, and doors",
          ],
          [
            "PDR eligibility",
            "Dents are accessible from behind, no paint cracking or torn metal",
            "Dents in locations inaccessible to PDR tools, or paint damage requiring conventional repair",
          ],
          [
            "Hail stone size",
            "Small to moderate hail (under 1 inch diameter)",
            "Large hail (1.5 inches or larger) — more likely to crack paint and damage trim",
          ],
          [
            "Roof liner damage",
            "No interior damage",
            "Hail penetrated sunroof seal, or dents created interior damage",
          ],
        ]}
      />

      <h2 id="the-driveable-total-loss">
        The Driveable Total Loss: A Unique Hail Challenge
      </h2>

      <p>
        One of the most frustrating aspects of a hail total loss is that your
        car often works perfectly. No mechanical damage, no airbag deployment,
        no structural compromise &mdash; just several hundred dents in the
        sheetmetal. Yet the insurer declares it a total loss because the repair
        cost-to-ACV ratio crosses their threshold. You lose your vehicle
        financially, even though you could theoretically drive it tomorrow.
      </p>

      <p>
        This situation highlights why understanding the salvage buyback option
        is especially important for hail claims. Unlike a collision total loss
        where there may be hidden structural damage or deployed airbags, a
        hail total loss vehicle is usually mechanically sound. The damage is
        cosmetic and repairable, just expensive relative to the vehicle&apos;s
        value. That changes the buyback calculus compared to a collision scenario.
      </p>

      <p>
        If your insurer declares a hail total loss but your rental coverage
        is limited, act quickly. Confirm coverage terms with your adjuster
        on day one. See our{" "}
        <Link href="/guides/rental-car-after-total-loss" className="text-coral hover:underline">
          rental car coverage guide
        </Link>{" "}
        for how long comprehensive claim rentals typically last.
      </p>

      <h2 id="salvage-buyback-after-hail">
        Salvage Buyback After Hail: Often the Right Call
      </h2>

      <p>
        For hail total losses specifically, the salvage buyback deserves
        serious consideration. Here is why: the vehicle is driveable and
        mechanically sound. The damage is cosmetic dents. PDR shops can
        often repair a hail-totaled vehicle for significantly less than the
        insurer&apos;s repair estimate because they can work on their own
        schedule, source parts competitively, and sometimes use techniques
        the insurance estimate did not account for.
      </p>

      <p>
        In a hail buyback, the salvage value is the key number. Hail-damaged
        vehicles typically have higher salvage bids than collision-damaged
        vehicles because the mechanicals are intact and the damage is visible
        and quantifiable. That higher salvage bid means a larger deduction
        from your settlement. Compare the salvage deduction against an
        independent PDR estimate before deciding. If a reputable PDR shop
        quotes you a repair cost well below the salvage deduction, surrendering
        the vehicle makes more sense. If the repair quote is below the salvage
        value deduction, keeping it may.
      </p>

      <p>
        See our full{" "}
        <Link href="/guides/salvage-title-buyback" className="text-coral hover:underline">
          salvage title buyback guide
        </Link>{" "}
        for the complete decision framework, step-by-step process, and the
        timing warning about declaring buyback intent before signing the release.
      </p>

      <h2 id="documenting-hail-damage">
        Documenting Your Hail Damage Claim
      </h2>

      <p>
        Hail damage documentation is straightforward but important. Before
        your insurer&apos;s appraiser visits, take your own photographs:
      </p>

      <DataTable
        caption="Hail damage documentation checklist before the adjuster inspects"
        headers={["Item to Photograph", "Why It Matters"]}
        rows={[
          [
            "All four sides of the vehicle, full-length shots",
            "Establishes the overall scope of damage before any adjuster measurement",
          ],
          [
            "Close-up shots of individual panel dents",
            "Documents dent density and size that may be missed or undercounted by the appraiser",
          ],
          [
            "Roof and hood close-ups (highest-impact zones)",
            "These panels typically absorb the most damage and drive the largest share of the repair estimate",
          ],
          [
            "Any paint cracking, chipping, or torn metal",
            "Documents damage that exceeds PDR eligibility and requires conventional repair",
          ],
          [
            "Windshield and glass damage",
            "Cracked or pitted glass is a separate line item; document it separately",
          ],
          [
            "Interior damage if any (roof liner, sunroof seal)",
            "Interior damage from hail penetration adds to the total repair estimate",
          ],
          [
            "Weather event record (news screenshot, weather app)",
            "Documents the event date if there is any dispute about when the damage occurred",
          ],
        ]}
      />

      <h2 id="negotiating-hail-acv">
        Negotiating Your ACV on a Hail Total Loss
      </h2>

      <p>
        Whether you accept the settlement or exercise a buyback, negotiating
        your ACV to its maximum is the critical first step. The same rules
        apply as any other total loss: request your full valuation report,
        check the trim level and options, identify mismatched comparables,
        and submit a written counter-offer with corrections.
      </p>

      <p>
        One area specific to hail claims: the condition rating on your
        valuation report reflects your vehicle&apos;s condition before the
        loss. If your vehicle was in excellent pre-hail condition
        &mdash; low mileage, full service history, no prior damage &mdash;
        and the report rates it average or below, dispute the condition
        rating with documentation. Useful evidence includes: maintenance
        records showing oil changes and scheduled services; a CarFax or
        AutoCheck report showing no prior accidents and clean title history;
        photographs of the exterior and interior taken within the past year
        before the hail event; and dealer or dealership service records.
        Your vehicle&apos;s pre-hail condition is what determines ACV;
        the hail damage itself is what is being compensated &mdash; it does
        not retroactively reduce the value of what you had before the storm.
      </p>

      <p>
        If your vehicle is being repaired rather than settled, watch for
        the supplement claim process. When a shop tears down a hail-damaged
        vehicle, they routinely discover additional damage not visible in
        the initial assessment &mdash; compressed weatherstripping, bent
        door frames, damaged roof seals, or interior headliner damage from
        severe impacts. The shop submits a supplement to your insurer for
        the additional cost. Request a copy of any supplements and confirm
        they are approved before you authorize repair completion. An
        incomplete or underpaid supplement is one of the most common reasons
        hail repairs are not fully resolved on the first attempt.
      </p>

      <h2 id="check-your-offer">Check Your Offer Before Accepting</h2>

      <p>
        Before accepting any hail total loss settlement, verify the offer
        includes all required line items: sales tax, title fees, and any
        registration prorations required by your state. Hail claims are
        subject to the same line-item requirements as collision claims.
        Take two minutes to score your offer:
      </p>

      <FairnessQuiz mode="mini" />

      <CTABox
        heading="Is your hail total loss offer complete?"
        body="ClaimCoach reviews your valuation report for trim errors, comparable mismatches, and missing line items — and generates a counter-offer letter with supporting evidence."
        href="/claims/new"
        label="Review my hail settlement"
      />

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          Hail total losses are comprehensive claims with your deductible
          applied and fault irrelevant. The most unusual feature is that
          the vehicle is often driveable and mechanically sound, making
          salvage buyback worth a serious look if the PDR repair cost is
          less than the salvage deduction. Regardless of whether you keep
          or surrender the vehicle, negotiate your ACV first &mdash; it
          is the number from which the salvage deduction and your check
          are both calculated.
        </p>
      </KeyTakeaway>

      <h2 id="related-guides" className="text-heading font-semibold text-black mt-10 mb-4">
        Related Guides
      </h2>

      <ul className="list-disc list-inside space-y-2 text-body text-[#4a555e] mb-6">
        <li>
          <Link href="/guides/salvage-title-buyback" className="text-coral hover:underline">
            Salvage Title Buyback Guide
          </Link>{" "}
          &mdash; full decision framework for keeping a hail-totaled vehicle
        </li>
        <li>
          <Link href="/guides/how-to-read-valuation-report" className="text-coral hover:underline">
            How to Read Your Valuation Report
          </Link>{" "}
          &mdash; find condition errors and comparable mismatches
        </li>
        <li>
          <Link href="/guides/total-loss-deductible" className="text-coral hover:underline">
            Deductibles on a Total Loss
          </Link>{" "}
          &mdash; how your comprehensive deductible affects your payout
        </li>
        <li>
          <Link href="/guides/rental-car-after-total-loss" className="text-coral hover:underline">
            How Long Does Insurance Pay for a Rental Car?
          </Link>{" "}
          &mdash; comprehensive rental coverage rules
        </li>
      </ul>

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational and
          educational purposes only and does not constitute legal, financial,
          or insurance advice. Total loss thresholds, deductible rules, and
          buyback options vary by state and policy. Consult a licensed
          professional in your state for advice specific to your situation.
        </p>
      </div>
    </>
  );
}
