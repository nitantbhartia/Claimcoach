import Link from "next/link";
import { FairnessQuiz } from "@/components/tools/fairness-quiz";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { DataTable } from "@/components/guides/data-table";

export const headings = [
  { id: "comprehensive-covers-flood", text: "Flood Damage Is a Comprehensive Claim", level: 2 },
  { id: "how-insurers-assess-flood", text: "How Insurers Assess Flood Damage", level: 2 },
  { id: "the-hidden-damage-problem", text: "The Hidden Damage Problem: Why Flood Totals Are Undervalued", level: 2 },
  { id: "flood-total-loss-thresholds", text: "When Flood Damage Triggers a Total Loss", level: 2 },
  { id: "flood-damage-severity", text: "Flood Damage Severity and What It Means for Your Claim", level: 3 },
  { id: "salvage-buyback-flood-warning", text: "Salvage Buyback After Flood: Proceed With Caution", level: 2 },
  { id: "documenting-flood-claim", text: "Documenting Your Flood Damage Claim", level: 2 },
  { id: "negotiating-flood-acv", text: "Negotiating Your ACV After a Flood Total Loss", level: 2 },
  { id: "check-your-flood-offer", text: "Check Your Settlement Offer", level: 2 },
  { id: "the-bottom-line", text: "The Bottom Line", level: 2 },
  { id: "related-guides", text: "Related Guides", level: 2 },
];

export default function FloodCarTotalLoss() {
  return (
    <>
      <p>
        A flooded vehicle presents one of the most complicated total loss
        scenarios: damage that is partly visible and partly hidden, an
        insurer who may pressure a quick settlement before the full extent
        of damage is known, and a salvage buyback option that carries genuine
        safety risks. Whether your car was caught in a flash flood, a storm
        surge, or a parking lot drainage failure, understanding how flood
        claims work &mdash; what your comprehensive coverage pays, how
        damage is assessed, and why the hidden damage problem matters &mdash;
        is essential to getting a fair settlement.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          Flood damage is a comprehensive claim. The biggest risk in flood
          total losses is settling before the full extent of hidden electrical
          and mechanical damage is documented. Do not accept a settlement
          quickly on a flood claim. Insist on a thorough inspection, request
          your full valuation report, and be extremely cautious about exercising
          a salvage buyback on a flood-damaged vehicle.
        </p>
      </KeyTakeaway>

      <h2 id="comprehensive-covers-flood">
        Flood Damage Is a Comprehensive Claim
      </h2>

      <p>
        Water damage from flooding falls under comprehensive coverage, not
        collision. Comprehensive covers damage from events other than crashes:
        weather events, fire, theft, and natural disasters including flooding.
        If your vehicle was swept away in a flood or submerged in a storm
        surge, you file under comprehensive &mdash; your comprehensive
        deductible applies, and fault is not a factor.
      </p>

      <p>
        If you do not carry comprehensive coverage, flood damage to your
        vehicle is entirely your financial responsibility. Comprehensive
        is optional on owned vehicles, but the risk of a total loss from
        a single weather event makes it worth maintaining on any vehicle
        with meaningful value. Standard flood insurance (NFIP) for structures
        does not cover personal vehicles; vehicle flood coverage requires
        comprehensive auto insurance.
      </p>

      <p>
        Collision coverage does not apply to flood damage. Even if your
        vehicle was swept into a barrier by floodwater, that is a weather
        event, not a collision in the insurance sense.
      </p>

      <h2 id="how-insurers-assess-flood">
        How Insurers Assess Flood Damage
      </h2>

      <p>
        Flood damage assessment is specialized and time-sensitive. Your
        insurer will send an appraiser to inspect the vehicle. The inspection
        documents the waterline (how high the water reached inside and outside
        the vehicle), the extent of interior damage, and any visible mechanical
        or electrical damage. The appraiser produces a repair estimate that
        becomes the basis for the total loss evaluation.
      </p>

      <p>
        The challenge with flood assessment is that water damage to
        electronics, wiring harnesses, and mechanical systems is not always
        immediately visible. Corrosion develops over days and weeks after
        exposure. An inspection done 24 to 72 hours after the flooding may
        not capture the full extent of electrical damage that will manifest
        later. This is the core of the hidden damage problem.
      </p>

      <h2 id="the-hidden-damage-problem">
        The Hidden Damage Problem: Why Flood Totals Are Undervalued
      </h2>

      <p>
        Modern vehicles contain dozens of electronic control modules, sensors,
        and wiring harnesses. When contaminated water reaches these systems,
        the initial visible damage &mdash; wet carpet, soggy seats, wet
        footwells &mdash; significantly understates the true repair cost.
        Electronic components that were submerged or exposed to contaminated
        water may function briefly after drying but fail weeks later as
        corrosion progresses.
      </p>

      <p>
        A body shop that inspects a flood-damaged vehicle days after the event
        may produce an estimate that reflects the visible damage. That same
        vehicle may require three or four times the estimated repair cost
        once it is disassembled and the full extent of electrical corrosion
        is revealed. This means an initial repair estimate may cross the
        total loss threshold less obviously than the true cost of full repair
        would suggest.
      </p>

      <p>
        Do not accept a quick settlement on a flood claim. If your insurer
        offers a settlement within days of the event, ask whether the vehicle
        has been fully disassembled and inspected beyond the visible damage.
        Request the complete damage assessment documentation before accepting.
      </p>

      <h2 id="flood-total-loss-thresholds">
        When Flood Damage Triggers a Total Loss
      </h2>

      <p>
        The total loss threshold rules apply the same way as in any other
        claim: percentage-threshold states compare repair cost to ACV;
        TLF states compare repair cost plus salvage value to ACV. For
        flood damage, the key variable is waterline height. A vehicle
        that was fully submerged carries repair costs that almost always
        cross the total loss threshold on any vehicle of moderate or
        lower value. A vehicle that had shallow water intrusion &mdash;
        floor level only, no seat contact &mdash; may be repaired.
      </p>

      <h3 id="flood-damage-severity">
        Flood Damage Severity and What It Means for Your Claim
      </h3>

      <DataTable
        caption="Flood damage severity levels and typical implications for the total loss determination"
        headers={["Waterline Level", "Typical Damage", "Total Loss Likelihood"]}
        rows={[
          [
            "Below floor level (undercarriage only)",
            "Potential rust to undercarriage components; brake and suspension exposure",
            "Low — usually repairable; depends on vehicle ACV",
          ],
          [
            "Floor level (carpet and floor insulation wet)",
            "Carpet and insulation damage, potential for mold; low electrical exposure",
            "Low to moderate — often repairable with full interior replacement and drying",
          ],
          [
            "Seat level (water reached seat bottom or above)",
            "Interior replacement, significant electrical exposure (seat sensors, wiring harnesses under seats)",
            "Moderate to high — repair cost often approaches total loss threshold",
          ],
          [
            "Dashboard level (above seat, reaching instrument cluster)",
            "Major electrical system damage, HVAC, instrument cluster, airbag sensors",
            "High — repair costs almost always trigger total loss on any vehicle except high-value late-model",
          ],
          [
            "Full submersion (roof or above)",
            "Engine ingestion, complete electrical damage, structural corrosion risk",
            "Very high — total loss on virtually all vehicles; safety concerns make repair inadvisable",
          ],
        ]}
      />

      <h2 id="salvage-buyback-flood-warning">
        Salvage Buyback After Flood: Proceed With Caution
      </h2>

      <p>
        Unlike hail total losses &mdash; where the vehicle is mechanically
        sound and a buyback often makes sense &mdash; flood-damaged vehicles
        present serious risks in a salvage buyback scenario. Here is why:
      </p>

      <p>
        Flood damage to electronics can produce delayed failures that are
        difficult to diagnose and expensive to repair. Airbag sensors,
        antilock brake systems, traction control, engine management computers,
        and transmission controls may all have been exposed. Even if the
        vehicle starts and drives after drying, latent corrosion can cause
        these systems to fail weeks or months later &mdash; sometimes in
        ways that create safety hazards.
      </p>

      <p>
        A flood-damaged vehicle that is bought back and resold (even as a
        salvage title) creates potential liability for the seller if the buyer
        is not fully informed of the flood history. Most states require
        disclosure of flood damage in vehicle sales, and Carfax and AutoCheck
        reports will show the flood event. The resale market for
        flood-damaged vehicles is limited and deeply discounted.
      </p>

      <p>
        For most flood total losses, especially those involving above-seat
        waterline, surrendering the vehicle and taking the full settlement
        is the prudent choice. If you are considering a buyback on a
        flood-damaged vehicle, get a pre-purchase inspection from a
        mechanic who specializes in flood damage assessment &mdash; not a
        general shop &mdash; before deciding.
      </p>

      <p>
        See our{" "}
        <Link href="/guides/salvage-title-buyback" className="text-coral hover:underline">
          salvage buyback guide
        </Link>{" "}
        for the complete framework and timing requirements that apply to
        any buyback decision.
      </p>

      <h2 id="documenting-flood-claim">
        Documenting Your Flood Damage Claim
      </h2>

      <DataTable
        caption="Documentation to gather for a flood total loss claim"
        headers={["Item", "Why It Matters"]}
        rows={[
          [
            "Photographs of exterior waterline marks",
            "Establishes how high the water rose on the outside of the vehicle",
          ],
          [
            "Interior photographs showing waterline on seats, dashboard, door panels",
            "Documents interior exposure level before any drying or cleaning begins",
          ],
          [
            "Video of water remaining in the vehicle (if applicable)",
            "Provides clear evidence of submersion depth and interior exposure",
          ],
          [
            "Weather event documentation (news reports, weather service data)",
            "Confirms the event date and flooding severity in your area; useful if insurer disputes the cause",
          ],
          [
            "Photographs of mud, debris, or contamination in engine compartment",
            "Documents exposure beyond the passenger compartment",
          ],
          [
            "Pre-flood condition photos (if available)",
            "Establishes your vehicle's pre-loss condition for ACV purposes",
          ],
        ]}
      />

      <p>
        Take all photographs before any cleanup, drying, or towing if possible.
        Once the vehicle is moved and dried, evidence of waterline is lost.
        The first 24 hours after a flood event are the most important for
        documentation.
      </p>

      <h2 id="negotiating-flood-acv">
        Negotiating Your ACV After a Flood Total Loss
      </h2>

      <p>
        The ACV negotiation process for a flood claim is the same as any other
        total loss: request the full valuation report, check the trim level
        and comparables, verify the condition rating reflected your pre-flood
        condition, and submit a written counter-offer if errors exist.
      </p>

      <p>
        The pre-flood condition rating is particularly important. If your
        vehicle was in excellent mechanical and cosmetic condition before the
        flood event, the condition rating on the report should reflect that
        &mdash; not the post-flood condition. The flood damage itself is what
        is being replaced; it does not reduce your pre-loss ACV. If the report
        appears to have applied a condition downgrade based on the flood damage
        rather than the pre-loss condition, dispute it with maintenance records
        and pre-loss photographs.
      </p>

      <p>
        <strong>If your vehicle was towed without your authorization:</strong>{" "}
        After major flooding, municipalities and property owners sometimes have
        vehicles towed to commercial storage lots without owner consent.
        Storage fees at these facilities can reach $50 to $150 per day. Contact
        your insurer the same day you learn of the unauthorized tow and ask
        them to take title responsibility for the vehicle from the lot directly.
        Most insurers will coordinate with the storage facility to cap fees and
        arrange inspection once they take ownership of the total loss vehicle.
        If fees accumulate before the insurer steps in, recovering those costs
        becomes contested. Act quickly.
      </p>

      <p>
        If your vehicle is repaired rather than totaled, be aware that flood
        history permanently affects its resale value. Vehicle history reports
        (Carfax, AutoCheck) will flag the flood event, and both private buyers
        and dealers discount flood-history vehicles significantly even after a
        complete repair. Consider requesting a diminished value assessment from
        an independent appraiser after the repair is complete and including a
        diminished value claim in your settlement. First-party diminished value
        claims are recognized in some states but not all &mdash; consult an
        attorney familiar with your state&apos;s insurance law.
      </p>

      <h2 id="check-your-flood-offer">Check Your Settlement Offer</h2>

      <p>
        Before accepting any flood total loss settlement, verify the offer
        includes all required line items: sales tax on replacement, title fees,
        and registration prorations as required by your state. Flood claims
        are subject to the same line-item requirements as any other total
        loss. Score your offer before you sign:
      </p>

      <FairnessQuiz mode="mini" />

      <CTABox
        heading="Do not accept a flood settlement before verifying your ACV"
        body="ClaimCoach reviews your valuation report for condition errors, trim mismatches, and missing line items — and generates a counter-offer with supporting evidence."
        href="/claims/new"
        label="Review my flood settlement"
      />

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          Flood total losses are comprehensive claims. The biggest risk is
          accepting a settlement before the full hidden damage is documented.
          Do not rush. For most vehicles with significant water intrusion,
          the repair cost significantly exceeds initial estimates once
          electronics are assessed. Salvage buybacks on flood-damaged vehicles
          carry genuine safety risks and should be approached very cautiously,
          particularly for vehicles with above-seat waterline damage.
          Negotiate your pre-loss ACV to its maximum before accepting any
          settlement.
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
          &mdash; full framework for the buyback decision and timing requirements
        </li>
        <li>
          <Link href="/guides/how-to-read-valuation-report" className="text-coral hover:underline">
            How to Read Your Valuation Report
          </Link>{" "}
          &mdash; verify your pre-loss condition rating was applied correctly
        </li>
        <li>
          <Link href="/guides/total-loss-deductible" className="text-coral hover:underline">
            Deductibles on a Total Loss
          </Link>{" "}
          &mdash; how your comprehensive deductible applies to a flood claim
        </li>
        <li>
          <Link href="/guides/hail-damage-total-loss" className="text-coral hover:underline">
            Hail Damage Total Loss
          </Link>{" "}
          &mdash; how comprehensive total losses differ by event type
        </li>
      </ul>

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational and
          educational purposes only and does not constitute legal, financial,
          or insurance advice. Coverage terms, total loss thresholds, and
          assessment processes vary by insurer, state, and policy. Consult a
          licensed professional in your state for advice specific to your
          situation.
        </p>
      </div>
    </>
  );
}
