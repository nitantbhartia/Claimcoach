import Link from "next/link";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { DataTable } from "@/components/guides/data-table";

export const headings = [
  { id: "collision-coverage-basics", text: "How Collision Coverage Works for At-Fault Claims", level: 2 },
  { id: "your-deductible-applies", text: "Your Deductible Applies", level: 2 },
  { id: "no-loss-of-use-third-party", text: "No Third-Party Loss of Use — But You May Still Have Rental Coverage", level: 2 },
  { id: "at-fault-vs-not-at-fault", text: "At-Fault vs. Not-At-Fault: What Changes in Your Settlement", level: 2 },
  { id: "negotiating-acv-at-fault", text: "Negotiating Your ACV Still Matters When You Are At Fault", level: 2 },
  { id: "what-about-the-other-car", text: "What About the Other Car You Damaged?", level: 2 },
  { id: "premium-impact", text: "How a Total Loss Affects Your Insurance Premium", level: 2 },
  { id: "the-bottom-line", text: "The Bottom Line", level: 2 },
  { id: "related-guides", text: "Related Guides", level: 2 },
];

export default function AtFaultTotalLoss() {
  return (
    <>
      <p>
        When the accident was your fault and your car is declared a total loss,
        the claim process is different in several important ways. You do not
        have a third-party insurer to pursue for loss of use. Your deductible
        applies. And you are also potentially responsible for the other
        driver&apos;s vehicle through your liability coverage. Understanding
        exactly what your collision coverage pays for, what it does not cover,
        and how to protect your settlement even as the at-fault party gives
        you the clearest path through an already stressful situation.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          When the accident was your fault, your collision coverage pays ACV
          minus your deductible for your vehicle. You do not have a
          third-party loss-of-use claim against another insurer, but your
          own rental reimbursement add-on may cover a rental car. Your
          ACV is just as negotiable as in a not-at-fault claim.
        </p>
      </KeyTakeaway>

      <h2 id="collision-coverage-basics">
        How Collision Coverage Works for At-Fault Claims
      </h2>

      <p>
        Collision coverage pays for damage to your vehicle from an accident,
        regardless of who was at fault. When you cause an accident that
        totals your own vehicle, your collision coverage is what pays your
        total loss settlement. This is the core purpose of collision coverage:
        it protects your vehicle investment even when the accident was your
        fault.
      </p>

      <p>
        The settlement process for your vehicle is the same as a not-at-fault
        first-party claim. Your insurer assigns an adjuster, inspects the
        vehicle, applies the total loss threshold, and produces a valuation
        report from CCC, Mitchell, or Audatex. Your settlement offer is based
        on your vehicle&apos;s ACV. The only automatic differences are that
        your deductible applies, and no at-fault party&apos;s insurer owes
        you rental coverage.
      </p>

      <p>
        If you do not carry collision coverage &mdash; common on older, lower-value
        vehicles &mdash; your insurer owes you nothing for your own vehicle
        when the accident was your fault. Liability coverage only pays for the
        damage you caused to others. The decision whether to carry collision
        on a specific vehicle should factor in the vehicle&apos;s ACV and
        your ability to absorb the loss out of pocket.
      </p>

      <h2 id="your-deductible-applies">Your Deductible Applies</h2>

      <p>
        Your collision deductible is subtracted from your ACV settlement.
        If your ACV is $16,000 and your collision deductible is $1,000, your
        settlement check starts at $15,000 before any lienholder payoff.
        Common collision deductibles are $500, $1,000, and $2,000.
      </p>

      <p>
        Unlike a not-at-fault first-party claim where you can potentially
        recover your deductible through subrogation against the at-fault
        driver, there is no subrogation avenue when you caused the accident.
        You are responsible for your deductible. This is one of the practical
        costs of an at-fault accident that policyholders often underestimate
        when choosing a high deductible to save on premium.
      </p>

      <p>
        For more on how deductibles affect your total loss math, see our{" "}
        <Link href="/guides/total-loss-deductible" className="text-coral hover:underline">
          deductible guide
        </Link>
        .
      </p>

      <h2 id="no-loss-of-use-third-party">
        No Third-Party Loss of Use &mdash; But You May Still Have Rental Coverage
      </h2>

      <p>
        In a not-at-fault accident, the at-fault driver&apos;s insurer owes you
        loss of use &mdash; typically a rental car for the duration of the
        settlement process. When the accident was your fault, there is no
        at-fault third party, so that loss-of-use obligation does not exist.
      </p>

      <p>
        However, if you purchased a rental reimbursement add-on on your own
        policy, that coverage applies regardless of fault. Your rental
        reimbursement coverage is a first-party benefit you paid for separately,
        and it activates when you have a covered collision loss &mdash; at-fault
        or not. Check your policy declarations page for whether you have rental
        reimbursement and what your daily and total limits are.
      </p>

      <p>
        If you did not add rental reimbursement to your policy and the accident
        was your fault, you have no rental coverage and must arrange
        transportation at your own expense while your claim resolves. This is
        one of the strongest arguments for carrying rental reimbursement coverage,
        particularly if you depend on your vehicle for work or family obligations.
      </p>

      <h2 id="at-fault-vs-not-at-fault">
        At-Fault vs. Not-At-Fault: What Changes in Your Settlement
      </h2>

      <DataTable
        caption="How fault affects your total loss settlement components"
        headers={["Settlement Component", "At-Fault (Your Fault)", "Not-At-Fault (Other Driver's Fault)"]}
        rows={[
          [
            "Coverage source for your vehicle",
            "Your collision coverage",
            "Your collision coverage (if faster) or third-party's liability coverage",
          ],
          [
            "Deductible",
            "Your collision deductible applies; no subrogation recovery",
            "Your deductible applies on first-party claim; zero deductible on direct third-party claim",
          ],
          [
            "ACV and negotiation",
            "Same process; ACV fully negotiable",
            "Same process; ACV fully negotiable",
          ],
          [
            "Loss of use / rental car",
            "No third-party loss of use; only your own rental reimbursement add-on if purchased",
            "Third-party insurer owes loss of use for duration of reasonable settlement process",
          ],
          [
            "Sales tax and fees",
            "Required by state; same rules apply regardless of fault",
            "Required by state; same rules apply",
          ],
          [
            "GAP insurance",
            "GAP applies if loan exceeds ACV; same as any total loss",
            "GAP applies if loan exceeds ACV; same as any total loss",
          ],
          [
            "Premium impact",
            "At-fault accident typically triggers a premium increase at renewal",
            "Not-at-fault accidents have variable premium impact depending on insurer and state",
          ],
        ]}
      />

      <h2 id="negotiating-acv-at-fault">
        Negotiating Your ACV Still Matters When You Are At Fault
      </h2>

      <p>
        Policyholders sometimes assume that because they caused the accident,
        they have less leverage to negotiate. This is not correct. Your right
        to a fair ACV valuation exists regardless of fault. The valuation
        process is identical: you receive a settlement offer based on a
        valuation report, and you have the right to review that report,
        identify errors, and submit a counter-offer with evidence.
      </p>

      <p>
        Trim level errors, incorrect condition ratings, geographically
        mismatched comparables, and missing factory options reduce your ACV
        just as much in an at-fault claim as in a not-at-fault claim. The
        average initial offer in our database of total loss claims is
        $2,800 to $4,200 below fair market value &mdash; regardless of fault.
        That shortfall comes from systematic errors in the valuation report,
        not from the insurer penalizing at-fault parties.
      </p>

      <p>
        Request your full valuation report when the offer arrives. Check the
        trim level, comparables, and condition rating. If anything is wrong,
        submit a written counter-offer. See our{" "}
        <Link href="/guides/how-to-read-valuation-report" className="text-coral hover:underline">
          valuation report guide
        </Link>{" "}
        for exactly what to check.
      </p>

      <h2 id="what-about-the-other-car">
        What About the Other Car You Damaged?
      </h2>

      <p>
        Your liability coverage &mdash; specifically the property damage
        liability portion &mdash; pays for damage to the other party&apos;s
        vehicle (and other property) when you are at fault. Your liability
        coverage is separate from your collision coverage and has its own
        limit (your property damage liability limit, shown on your declarations
        page as something like $50,000 or $100,000).
      </p>

      <p>
        If the other driver&apos;s vehicle is totaled and their ACV exceeds
        your property damage liability limit, you may be personally responsible
        for the difference unless you have umbrella coverage. This is a risk
        to be aware of, particularly if your property damage limit is on the
        lower end of what your state requires. State minimums for property
        damage liability are often low enough that they may not cover the full
        value of a newer vehicle.
      </p>

      <p>
        The other driver&apos;s claim against your insurer is handled separately
        from your own vehicle claim. Your adjuster manages both, but they
        are distinct processes with distinct limits.
      </p>

      <h2 id="premium-impact">
        How a Total Loss Affects Your Insurance Premium
      </h2>

      <p>
        An at-fault accident is typically classified as a chargeable event
        on your driving record, which means your insurer may increase your
        premium at renewal. The amount of the increase varies significantly
        by insurer, state, and your prior driving record. Some insurers offer
        accident forgiveness for first-time at-fault accidents, either as a
        built-in feature after a certain number of clean years or as a
        purchasable add-on. Check your policy or call your agent to understand
        whether accident forgiveness applies to your situation.
      </p>

      <p>
        The total loss settlement itself does not affect your premium directly
        &mdash; the accident does. Whether your vehicle is repaired or declared
        a total loss, the at-fault accident event is the chargeable item.
      </p>

      <CTABox
        heading="Your ACV is negotiable even when the accident was your fault"
        body="ClaimCoach reviews your valuation report for trim errors, comparable mismatches, and missing line items — regardless of who caused the accident."
        href="/claims/new"
        label="Review my settlement offer"
      />

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          An at-fault total loss runs through your collision coverage with
          your deductible applied and no third-party loss-of-use claim.
          Your ACV is equally negotiable and equally subject to valuation
          errors as in a not-at-fault claim. If you have rental reimbursement
          coverage, it activates regardless of fault. If you do not, arrange
          transportation at your own expense and factor this gap into your
          future coverage decisions.
        </p>
      </KeyTakeaway>

      <h2 id="related-guides" className="text-heading font-semibold text-black mt-10 mb-4">
        Related Guides
      </h2>

      <ul className="list-disc list-inside space-y-2 text-body text-[#4a555e] mb-6">
        <li>
          <Link href="/guides/total-loss-deductible" className="text-coral hover:underline">
            Deductibles on a Total Loss
          </Link>{" "}
          &mdash; how your collision deductible affects the settlement math
        </li>
        <li>
          <Link href="/guides/how-to-read-valuation-report" className="text-coral hover:underline">
            How to Read Your Valuation Report
          </Link>{" "}
          &mdash; identify ACV errors regardless of fault
        </li>
        <li>
          <Link href="/guides/rental-car-after-total-loss" className="text-coral hover:underline">
            Rental Car After a Total Loss
          </Link>{" "}
          &mdash; what rental coverage you have when the accident was your fault
        </li>
        <li>
          <Link href="/guides/gap-insurance-total-loss" className="text-coral hover:underline">
            GAP Insurance and Total Loss
          </Link>{" "}
          &mdash; how GAP handles your loan balance in an at-fault total loss
        </li>
      </ul>

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational and
          educational purposes only and does not constitute legal, financial,
          or insurance advice. Coverage rules, deductible handling, and premium
          impact vary by policy, insurer, and state. Consult a licensed
          professional in your state for advice specific to your situation.
        </p>
      </div>
    </>
  );
}
