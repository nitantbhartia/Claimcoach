import Link from "next/link";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { DataTable } from "@/components/guides/data-table";

export const headings = [
  { id: "does-deductible-apply", text: "Does a Deductible Apply to a Total Loss?", level: 2 },
  { id: "collision-vs-comprehensive", text: "Collision Claims vs. Comprehensive Claims", level: 3 },
  { id: "third-party-no-deductible", text: "Third-Party Claims: No Deductible", level: 3 },
  { id: "how-deductible-affects-math", text: "How Your Deductible Affects the Settlement Math", level: 2 },
  { id: "deductible-scenarios", text: "Deductible Scenarios at a Glance", level: 2 },
  { id: "recovering-your-deductible", text: "Recovering Your Deductible From the At-Fault Driver", level: 2 },
  { id: "waived-deductible-situations", text: "When Your Deductible May Be Waived", level: 2 },
  { id: "choosing-your-deductible", text: "Choosing the Right Deductible for Total Loss Risk", level: 2 },
  { id: "the-bottom-line", text: "The Bottom Line", level: 2 },
  { id: "related-guides", text: "Related Guides", level: 2 },
];

export default function TotalLossDeductible() {
  return (
    <>
      <p>
        After a total loss, one of the first questions policyholders ask is:
        do I have to pay my deductible? The answer depends on which type of
        claim you are filing and who was at fault. In some scenarios your
        deductible is subtracted from your settlement; in others it does not
        apply at all. Understanding how deductibles work in a total loss
        context &mdash; and what options you have to recover yours &mdash;
        can put hundreds or thousands of dollars back in your settlement.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          Your deductible applies when you file under your own collision or
          comprehensive coverage. It does not apply when you file a third-party
          claim directly against the at-fault driver&apos;s insurer. If you
          use your own coverage for speed and the other driver was at fault,
          you can pursue your deductible back through subrogation.
        </p>
      </KeyTakeaway>

      <h2 id="does-deductible-apply">
        Does a Deductible Apply to a Total Loss?
      </h2>

      <p>
        A deductible is your share of a covered loss. It is subtracted from
        the total settlement amount before you receive payment. Whether it
        applies to a total loss depends on which coverage is paying the claim.
      </p>

      <h3 id="collision-vs-comprehensive">
        Collision Claims vs. Comprehensive Claims
      </h3>

      <p>
        <strong>Collision coverage</strong> applies when your vehicle is
        damaged in a crash &mdash; regardless of fault. If you file a total
        loss claim under your own collision coverage, your collision deductible
        applies. Common collision deductibles are $250, $500, $1,000, or
        $2,000. This amount is subtracted from your ACV before your check
        is issued.
      </p>

      <p>
        <strong>Comprehensive coverage</strong> applies when your vehicle is
        damaged by a non-collision event: hail, flood, fire, theft, falling
        objects, or animal strikes. Comprehensive deductibles are usually
        lower than collision deductibles &mdash; many policyholders carry
        $100 to $500 comprehensive deductibles. If hail or a flood declares
        your car a total loss, your comprehensive deductible is subtracted
        from your settlement.
      </p>

      <h3 id="third-party-no-deductible">
        Third-Party Claims: No Deductible
      </h3>

      <p>
        If the accident was the other driver&apos;s fault and you file your
        total loss claim directly with <em>their</em> liability insurer, your
        deductible does not apply at all. The at-fault insurer is responsible
        for the full ACV of your vehicle with no deductible offset. This is
        one of the significant advantages of pursuing a third-party claim
        when liability is clear: you receive the full settlement amount without
        any deductible subtraction.
      </p>

      <p>
        The trade-off is speed and leverage. Third-party claims can move
        more slowly because you are dealing with another insurer that does not
        have a direct contractual duty to you. Many policyholders file under
        their own collision coverage to start the process faster, accepting
        the deductible offset in exchange for quicker resolution, and then
        pursue the deductible back through their own insurer&apos;s subrogation
        process.
      </p>

      <h2 id="how-deductible-affects-math">
        How Your Deductible Affects the Settlement Math
      </h2>

      <p>
        When your own insurer pays a first-party total loss, the settlement
        calculation runs like this: your vehicle&apos;s ACV, minus your
        deductible, minus any lienholder payoff, equals the check to you (or
        a surplus if ACV exceeds the payoff). For example, if your ACV is
        $22,000, your deductible is $1,000, and your loan payoff is $18,000,
        your insurer pays your lender $18,000 and issues you a check for $3,000.
      </p>

      <p>
        This math makes negotiating your ACV particularly important when you
        are carrying a meaningful deductible. Every dollar added to your ACV
        in negotiation &mdash; by correcting comparable errors, fixing trim
        mismatches, or adding missing line items like sales tax &mdash; goes
        directly to your check. A $500 deductible on a $20,000 ACV is already
        painful; a $500 deductible on an understated $17,000 ACV is much more
        so. Negotiate the ACV before accepting the deductible math.
      </p>

      <h2 id="deductible-scenarios">Deductible Scenarios at a Glance</h2>

      <DataTable
        caption="When your deductible applies in a total loss claim"
        headers={["Claim Type", "Deductible Applies?", "Notes"]}
        rows={[
          [
            "First-party collision claim (your own insurer, accident with another vehicle)",
            "Yes — your collision deductible is subtracted from ACV",
            "Even if the other driver was at fault, your deductible applies when using your own coverage",
          ],
          [
            "First-party comprehensive claim (hail, flood, fire, theft)",
            "Yes — your comprehensive deductible is subtracted from ACV",
            "Comprehensive deductibles are typically lower than collision deductibles",
          ],
          [
            "Third-party claim against at-fault driver's insurer",
            "No deductible",
            "You receive the full ACV with no offset; the trade-off is slower process and less leverage",
          ],
          [
            "UM/UIM property damage claim (uninsured at-fault driver, using your own policy)",
            "Depends on policy and state",
            "Some UMPD policies have a separate deductible (e.g., $200–$300); others waive it when the other driver is uninsured",
          ],
          [
            "GAP insurance payout (covers loan balance above ACV)",
            "Deductible usually not covered by GAP",
            "Standard GAP does not reimburse your deductible; some premium GAP products cover up to $1,000 of it",
          ],
        ]}
      />

      <h2 id="recovering-your-deductible">
        Recovering Your Deductible From the At-Fault Driver
      </h2>

      <p>
        If the other driver caused the accident and you filed under your own
        collision coverage (to move faster), you paid a deductible you should
        not ultimately owe. You can recover that deductible through two routes:
      </p>

      <p>
        <strong>Subrogation through your insurer:</strong> When your insurer
        pays your collision claim, they have the right to seek reimbursement
        from the at-fault driver&apos;s insurer. This process is called
        subrogation. If your insurer successfully recovers from the at-fault
        insurer, they are required to return your deductible to you. Ask your
        adjuster whether a subrogation claim has been opened and whether your
        deductible is being pursued.
      </p>

      <p>
        <strong>Direct pursuit against the at-fault insurer:</strong> You can
        also file a separate property damage claim directly with the at-fault
        driver&apos;s insurer for the amount of your deductible. This is a
        small claims option for the deductible amount specifically. Keep a
        written record of your deductible payment to your own insurer as
        documentation.
      </p>

      <p>
        Subrogation timelines vary. If your insurer reaches a resolution with
        the at-fault insurer, you should receive your deductible reimbursement
        within a few weeks of that resolution. Follow up with your insurer
        every 30 days to check subrogation status.
      </p>

      <h2 id="waived-deductible-situations">
        When Your Deductible May Be Waived
      </h2>

      <p>
        A few policy features and insurer practices can reduce or eliminate
        your deductible obligation in specific situations:
      </p>

      <DataTable
        caption="Situations where a deductible may be waived or reduced on a total loss"
        headers={["Situation", "How It Works"]}
        rows={[
          [
            "Vanishing or disappearing deductible endorsement",
            "Some policies include a provision that reduces your deductible by a set amount (e.g., $50–$100) for each accident-free year. After several years, the deductible may reach zero.",
          ],
          [
            "Comprehensive deductible waiver for windshield",
            "A handful of states (Arizona, Florida, Kentucky, Massachusetts, South Carolina) allow policyholders to add a full glass waiver that eliminates the comprehensive deductible for glass claims only. Windshields are not total loss scenarios, but this illustrates that waivers exist.",
          ],
          [
            "Not-at-fault accident provision (some insurers)",
            "A small number of insurers offer a deductible waiver when the other driver was clearly at fault and their insurer has accepted liability. Check your policy for this endorsement.",
          ],
          [
            "Insurer error causing delay",
            "While not a formal waiver, if insurer delays cause your rental coverage to expire and you incur out-of-pocket costs, these can sometimes offset a deductible dispute in a global settlement negotiation.",
          ],
        ]}
      />

      <h2 id="choosing-your-deductible">
        Choosing the Right Deductible for Total Loss Risk
      </h2>

      <p>
        Your deductible has a direct impact on your settlement recovery in a
        total loss. When selecting a deductible, consider: how much cash you
        can realistically absorb as an immediate out-of-pocket cost after an
        accident? The premium savings from a higher deductible are real, but
        so is the settlement reduction.
      </p>

      <p>
        A $1,000 collision deductible may save $200 to $400 per year in
        premium, depending on your vehicle and market. After three to five
        years, the cumulative savings may justify the higher deductible. But
        if a total loss happens in year one, the $1,000 deductible costs you
        far more than you saved. There is no universal right answer &mdash;
        the right deductible depends on your savings buffer, your vehicle&apos;s
        value, and your risk tolerance.
      </p>

      <CTABox
        heading="Make sure your ACV is as high as possible before your deductible comes out"
        body="ClaimCoach reviews your valuation report for errors that understate your ACV — so you negotiate from the highest possible number before the deductible is applied."
        href="/claims/new"
        label="Check my settlement offer"
      />

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          Your deductible is subtracted from your ACV on first-party collision
          and comprehensive claims. It does not apply on direct third-party
          claims against an at-fault insurer. If you paid a deductible because
          you filed under your own coverage, track your insurer&apos;s
          subrogation claim and follow up to recover it. Regardless of your
          deductible situation, negotiating your ACV upward before settlement
          is the highest-value action you can take.
        </p>
      </KeyTakeaway>

      <h2 id="related-guides" className="text-heading font-semibold text-black mt-10 mb-4">
        Related Guides
      </h2>

      <ul className="list-disc list-inside space-y-2 text-body text-[#4a555e] mb-6">
        <li>
          <Link href="/guides/total-loss-settlement-amount" className="text-coral hover:underline">
            How Much Should My Total Loss Settlement Be?
          </Link>{" "}
          &mdash; complete line-item breakdown of what your offer should include
        </li>
        <li>
          <Link href="/guides/gap-insurance-total-loss" className="text-coral hover:underline">
            GAP Insurance and Total Loss
          </Link>{" "}
          &mdash; how GAP interacts with your deductible and loan payoff
        </li>
        <li>
          <Link href="/guides/at-fault-total-loss" className="text-coral hover:underline">
            Total Loss When the Accident Was Your Fault
          </Link>{" "}
          &mdash; how collision coverage and deductibles work for at-fault claims
        </li>
        <li>
          <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
            Counter-Offer Letter Template
          </Link>{" "}
          &mdash; negotiate your ACV before the deductible is applied
        </li>
      </ul>

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational and
          educational purposes only and does not constitute legal, financial,
          or insurance advice. Deductible rules, subrogation processes, and
          state regulations vary and are subject to change. Consult a licensed
          professional in your state for advice specific to your situation.
        </p>
      </div>
    </>
  );
}
