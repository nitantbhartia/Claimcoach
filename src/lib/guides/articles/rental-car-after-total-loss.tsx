import Link from "next/link";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { DataTable } from "@/components/guides/data-table";

/* ---------------------------------------------------------------------- */
/*  Headings                                                                */
/* ---------------------------------------------------------------------- */

export const headings = [
  {
    id: "two-types-of-rental-coverage",
    text: "Two Types of Rental Coverage",
    level: 2,
  },
  {
    id: "first-party-rental",
    text: "First-Party Claims: Your Own Rental Reimbursement Add-On",
    level: 3,
  },
  {
    id: "third-party-loss-of-use",
    text: "Third-Party Claims: Loss of Use From the At-Fault Insurer",
    level: 3,
  },
  {
    id: "um-uim-rental",
    text: "Uninsured/Underinsured Motorist Claims: A Third Scenario",
    level: 3,
  },
  {
    id: "coverage-comparison",
    text: "First-Party vs. Third-Party Coverage at a Glance",
    level: 2,
  },
  {
    id: "how-long-coverage-lasts",
    text: "How Long Does Rental Coverage Last?",
    level: 2,
  },
  {
    id: "what-ends-coverage",
    text: "What Triggers the End of Rental Coverage",
    level: 3,
  },
  {
    id: "when-coverage-runs-out",
    text: "What to Do When Rental Authorization Runs Out",
    level: 2,
  },
  {
    id: "loss-of-use-as-negotiating-point",
    text: "Loss of Use as a Negotiating Point",
    level: 2,
  },
  {
    id: "step-by-step",
    text: "Step-by-Step: Managing Your Rental During a Total Loss",
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

export default function RentalCarAfterTotalLoss() {
  return (
    <>
      <p>
        Your car was totaled and you need a way to get around. The natural
        assumption is that your insurance will cover a rental car until the
        claim is resolved &mdash; but the reality is more complicated. Whether
        you have rental coverage at all, how long it lasts, and who pays for it
        depends on which insurer is handling your claim, what coverage you
        purchased, and in some cases, which state you live in. This guide
        explains exactly how rental car coverage works after a total loss,
        what triggers the end of coverage, and how to protect yourself if
        authorization runs out before your settlement arrives.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          Rental coverage after a total loss is not automatic. On a
          first-party claim it requires a separate add-on you must have
          purchased in advance. On a third-party claim, the at-fault
          driver&apos;s insurer owes you loss of use &mdash; but they can end
          coverage once a reasonable settlement offer has been made, even if
          you have not yet accepted it.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/*  Two Types of Rental Coverage                                     */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="two-types-of-rental-coverage">Two Types of Rental Coverage</h2>

      <p>
        When a car is declared a total loss, rental car reimbursement can come
        from two very different sources depending on who is at fault. The rules,
        limits, and duration of coverage differ significantly between the two.
      </p>

      <h3 id="first-party-rental">
        First-Party Claims: Your Own Rental Reimbursement Add-On
      </h3>

      <p>
        A first-party claim is one you file with your own insurer &mdash;
        typically under your collision or comprehensive coverage. Rental car
        reimbursement is <strong>not included</strong> in standard collision or
        comprehensive coverage. It must be added to your policy as a separate
        endorsement, often listed as &quot;rental reimbursement&quot; or
        &quot;transportation expense&quot; coverage.
      </p>

      <p>
        If you added this coverage, your policy specifies a daily limit (most
        commonly $30, $40, or $50 per day) and a total coverage cap (often
        expressed as a number of days or a dollar maximum such as $900 or
        $1,500). Once you reach either limit, reimbursement stops. You are
        responsible for any rental cost above the daily limit and any cost
        incurred after the cap is exhausted.
      </p>

      <p>
        If you did not add rental reimbursement coverage to your policy and the
        accident was not the other driver&apos;s fault, your own insurer owes
        you nothing for a rental car. This is one of the most common &mdash;
        and expensive &mdash; gaps policyholders discover after a total loss.
      </p>

      <h3 id="third-party-loss-of-use">
        Third-Party Claims: Loss of Use From the At-Fault Insurer
      </h3>

      <p>
        If the accident was the other driver&apos;s fault, their liability
        insurance is responsible for your rental car costs under a legal
        concept called <strong>loss of use</strong>. Unlike your own
        first-party coverage, loss of use under a third-party claim is not
        capped by a per-day policy limit. The at-fault insurer is obligated to
        cover your actual and reasonable transportation costs for the period of
        time it would reasonably take to resolve the claim.
      </p>

      <p>
        In practice, the at-fault insurer will typically authorize a rental at
        a standard economy or mid-size rate, regardless of what you were
        driving. If you were driving a full-size truck or SUV, you may need
        to negotiate for an appropriately sized rental, or document why a
        smaller vehicle is insufficient for your needs.
      </p>

      <p>
        Loss-of-use coverage is not unlimited. The at-fault insurer can end
        the rental once they have made you a reasonable settlement offer,
        because at that point they have provided the means for you to
        replace your vehicle. If you dispute the offer and the settlement
        process extends, the rental question becomes more complicated &mdash;
        more on that below.
      </p>

      <h3 id="um-uim-rental">
        Uninsured/Underinsured Motorist Claims: A Third Scenario
      </h3>

      <p>
        If the at-fault driver had no insurance &mdash; or not enough to cover
        your vehicle &mdash; and you have uninsured motorist property damage
        (UMPD) or underinsured motorist (UIM) coverage on your own policy,
        that coverage may pay for your vehicle. Whether it includes rental
        reimbursement depends on your specific policy language. Some UMPD
        endorsements include a rental component; many do not.
      </p>

      <p>
        In states where UMPD includes a rental benefit, the coverage typically
        functions like your own first-party rental reimbursement add-on, with
        a daily cap and a dollar maximum. If UMPD does not include rental
        coverage and the at-fault driver is uninsured, you may have no rental
        coverage at all unless you separately purchased the rental reimbursement
        add-on. This is one of the most overlooked gaps in standard policies.
        If an uninsured driver hit you, contact your adjuster immediately to
        confirm whether any rental coverage applies under your policy.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  Coverage Comparison                                              */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="coverage-comparison">
        First-Party vs. Third-Party Coverage at a Glance
      </h2>

      <DataTable
        caption="Rental car coverage comparison: first-party vs. third-party total loss claims"
        headers={[
          "Feature",
          "First-Party Claim (Your Insurer)",
          "Third-Party Claim (At-Fault Insurer)",
        ]}
        rows={[
          [
            "Who pays",
            "Your insurer (if rental add-on purchased)",
            "At-fault driver's liability insurer",
          ],
          [
            "Coverage required?",
            "Must be added to your policy in advance",
            "No add-on needed; covered by their liability",
          ],
          [
            "Daily rate limit",
            "Fixed by your policy (e.g., $30–$50/day)",
            "Reasonable rate for your vehicle class; no fixed cap",
          ],
          [
            "Total coverage cap",
            "Dollar maximum or day maximum per your policy",
            "No fixed cap; ends when settlement is offered",
          ],
          [
            "When coverage ends",
            "Settlement offer made, or policy cap reached",
            "Settlement offer made, or rental deemed unreasonable",
          ],
          [
            "If coverage runs out early",
            "Pay out of pocket; request adjuster extension in writing",
            "Document all rental costs; include in claim demand",
          ],
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/*  How Long Coverage Lasts                                          */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="how-long-coverage-lasts">How Long Does Rental Coverage Last?</h2>

      <p>
        The length of rental coverage depends on which type of claim you have
        and how quickly the settlement process moves. In an uncomplicated
        third-party total loss claim where liability is clear, the at-fault
        insurer may offer a settlement within one to two weeks, at which point
        rental coverage ends. On a disputed first-party claim where ACV is
        contested, your policy&apos;s rental reimbursement cap may expire
        before you have received a fair settlement.
      </p>

      <p>
        Most rental reimbursement add-ons cover 30 days or a dollar maximum,
        whichever comes first. At a $40/day rate, a 30-day cap yields $1,200
        in coverage. If a full replacement takes longer &mdash; due to
        valuation disputes, lienholder delays, or adjuster backlog &mdash;
        you may exhaust your rental coverage before your settlement check
        arrives.
      </p>

      <h3 id="what-ends-coverage">What Triggers the End of Rental Coverage</h3>

      <DataTable
        caption="Events that trigger the end of rental car coverage after a total loss"
        headers={[
          "Trigger",
          "First-Party Claim",
          "Third-Party Claim",
          "What to Do",
        ]}
        rows={[
          [
            "Insurer makes settlement offer",
            "Coverage typically ends",
            "Coverage typically ends",
            "Do not sign a release until you are satisfied with the offer",
          ],
          [
            "Your policy rental cap is reached",
            "Coverage ends",
            "Coverage continues (if third-party)",
            "Request a written extension from your adjuster; document delays",
          ],
          [
            "You sign the settlement release",
            "Coverage ends",
            "Coverage ends",
            "Review the release carefully before signing",
          ],
          [
            "You purchase a replacement vehicle",
            "Coverage ends on purchase date",
            "Coverage ends on purchase date",
            "Confirm with adjuster; keep rental through final payment day",
          ],
          [
            "Claim is denied",
            "Coverage ends",
            "Coverage ends",
            "Dispute the denial in writing; document rental costs as a damages item",
          ],
        ]}
      />

      <KeyTakeaway>
        <p>
          Do not sign your settlement release until you have a rental car lined
          up or are ready to purchase a replacement. Once you sign, your right
          to rental coverage typically ends immediately, even if the check has
          not yet cleared.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/*  When Coverage Runs Out                                           */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="when-coverage-runs-out">
        What to Do When Rental Authorization Runs Out
      </h2>

      <p>
        If your rental coverage is expiring before your settlement is resolved,
        you have several options depending on which type of claim you have.
      </p>

      <p>
        <strong>For first-party claims (your own insurer):</strong> Contact
        your adjuster in writing and request a rental authorization extension.
        Explain why the delay is occurring &mdash; if your insurer is the
        source of the delay (slow valuation report, slow response to your
        counter-offer), make that point explicitly. While your insurer has no
        obligation to extend beyond your policy limits, many will extend as a
        goodwill measure when the delay is on their end. Document every
        communication.
      </p>

      <p>
        <strong>For third-party claims (at-fault insurer):</strong> The
        at-fault insurer can only cut off your rental once they have made a
        reasonable settlement offer. If they terminate your rental before
        making an offer, or before giving you enough time to evaluate an
        offer, send a written demand for rental continuation, citing your
        ongoing loss of use. If they refuse, include the out-of-pocket rental
        costs in your total claim demand, and document every day and expense.
      </p>

      <p>
        In either situation, continue to pay for the rental with your own
        funds if needed and keep every receipt. Out-of-pocket rental costs
        incurred due to insurer delay can be included in a formal complaint
        to your state&apos;s department of insurance or in a bad faith demand.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  Loss of Use as a Negotiating Point                               */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="loss-of-use-as-negotiating-point">
        Loss of Use as a Negotiating Point
      </h2>

      <p>
        In third-party claims, loss of use is a legitimate line item in your
        total claim, not just a courtesy provided by the insurer. If your
        rental costs exceeded what the at-fault insurer authorized, or if your
        rental authorization was prematurely terminated, you can include the
        unpaid balance as part of your overall property damage demand.
      </p>

      <p>
        Keep a running record of all rental activity: the vehicle rented,
        daily rate, dates, and total amount. If you were unable to rent a
        vehicle because coverage was denied and you used alternative
        transportation (rideshare, public transit), document those costs as
        well. Loss of use covers actual transportation costs you incurred,
        not just a formal rental car agreement.
      </p>

      <p>
        In some states, the right to loss of use is specified in statute. Most
        states follow common law principles that entitle you to reasonable
        transportation costs for the period a reasonably diligent claimant
        would need to resolve a property damage claim. Your state&apos;s
        department of insurance website typically lists the specific rules.
      </p>

      <p>
        State rules vary meaningfully. In California, the Department of
        Insurance considers it an unfair claims settlement practice to terminate
        loss-of-use coverage before the insurer has made a formal written
        settlement offer and given the claimant a reasonable opportunity to
        respond. In Texas, the Insurance Code requires insurers to pay loss-of-use
        damages for the period of time it would take to repair or replace the
        vehicle using reasonable diligence &mdash; which in a disputed total
        loss scenario can extend beyond the date a settlement offer was made.
        If your rental was cut off before you received a written offer, check
        your state&apos;s specific rules and document the termination date in
        writing to your adjuster.
      </p>

      <DataTable
        caption="Documentation to maintain for a loss-of-use claim in a third-party total loss"
        headers={["Item", "Why It Matters"]}
        rows={[
          [
            "Rental agreement (start date, vehicle class, daily rate)",
            "Establishes the baseline rental period and rate",
          ],
          [
            "All rental receipts",
            "Documents actual out-of-pocket costs if insurer authorization was terminated early",
          ],
          [
            "Date and method of insurer's settlement offer (if any)",
            "Establishes whether coverage termination was legally justified",
          ],
          [
            "Rideshare or transit receipts (if no rental was available)",
            "Loss of use covers actual alternative transportation costs, not just rental cars",
          ],
          [
            "Written communications showing insurer-caused delays",
            "Supports a claim that extended rental costs were due to insurer delay, not your failure to resolve the claim",
          ],
          [
            "Date you received a written settlement offer",
            "Insurers can only cut off rental after a reasonable written offer; documenting the offer date protects you",
          ],
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/*  Step-by-Step                                                     */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="step-by-step">
        Step-by-Step: Managing Your Rental During a Total Loss
      </h2>

      <p>
        <strong>Step 1: Confirm your coverage before renting.</strong> Call
        your insurer or log into your policy portal to verify whether rental
        reimbursement is on your policy and what the daily and total limits
        are. If the other driver is at fault, contact their insurer the same
        day to open a third-party property damage claim and request rental
        authorization.
      </p>

      <p>
        <strong>Step 2: Use an in-network rental agency if possible.</strong>{" "}
        Many insurers have preferred rental partners (Enterprise, Hertz, etc.)
        that bill the insurer directly, eliminating the need to pay upfront
        and seek reimbursement. Ask your adjuster which agencies are in
        the direct-billing network.
      </p>

      <p>
        <strong>Step 3: Track your rental period against your cap.</strong>{" "}
        Know exactly when your first-party rental reimbursement limit will be
        reached. Set a calendar reminder three to five days before you hit the
        cap so you have time to act if the claim is not resolved.
      </p>

      <p>
        <strong>Step 4: Document delays in writing.</strong> If the settlement
        process is stalled because of your insurer&apos;s delays &mdash; slow
        valuation report, unresponsive adjuster, repeated requests for the
        same documents &mdash; document each instance in a written email to
        your adjuster. This creates a record that supports a rental extension
        request and, if needed, a formal complaint.
      </p>

      <p>
        <strong>Step 5: Request a written extension before the cap hits.</strong>{" "}
        Do not wait until the day your coverage runs out. Submit a written
        extension request three to five business days before your rental cap
        is reached. State the reason the claim is unresolved, identify the
        specific outstanding step, and request a defined extension (e.g.,
        seven additional days).
      </p>

      <p>
        <strong>Step 6: If denied, pay and document.</strong> If your extension
        is denied and the settlement is still unresolved, continue renting at
        your own expense, keep every receipt, and include the out-of-pocket
        costs in your final settlement demand. Flag this as a damages item when
        you submit your{" "}
        <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
          counter-offer letter
        </Link>
        .
      </p>

      <CTABox
        heading="Is your total loss settlement covering everything you're owed?"
        body="ClaimCoach checks your offer for missing line items — including loss of use — and generates a complete counter-offer with supporting evidence."
        href="/claims/new"
        label="Check my settlement offer"
      />

      {/* ---------------------------------------------------------------- */}
      {/*  The Bottom Line                                                  */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          On a first-party claim, rental coverage requires a policy add-on
          with defined daily and total limits that can expire before your
          claim is settled. On a third-party claim, you are owed loss of use
          as long as the settlement process is ongoing and a reasonable offer
          has not been made. In either case, document every day, every dollar,
          and every communication &mdash; rental costs you paid out of pocket
          due to insurer delay are a legitimate part of your total claim.
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
          <Link href="/guides/total-loss-settlement-amount" className="text-coral hover:underline">
            How Much Should My Total Loss Settlement Be?
          </Link>{" "}
          &mdash; all the line items your offer should include
        </li>
        <li>
          <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
            Counter-Offer Letter Template
          </Link>{" "}
          &mdash; how to add loss of use to a formal demand
        </li>
        <li>
          <Link href="/guides/total-loss-timeline" className="text-coral hover:underline">
            How Long Does a Total Loss Claim Take?
          </Link>{" "}
          &mdash; stage-by-stage timeline and delay factors
        </li>
        <li>
          <Link href="/guides/file-insurance-complaint" className="text-coral hover:underline">
            How to File a Complaint With Your State Insurance Department
          </Link>{" "}
          &mdash; when to escalate and what to expect
        </li>
      </ul>

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational and
          educational purposes only and does not constitute legal, financial,
          or insurance advice. Rental coverage terms, loss-of-use rules, and
          state regulations vary and are subject to change. Consult a licensed
          professional in your state for advice specific to your situation.
          Nothing in this article should be interpreted as a promise or
          prediction of any particular outcome.
        </p>
      </div>
    </>
  );
}
