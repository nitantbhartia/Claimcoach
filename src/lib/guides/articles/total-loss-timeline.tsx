import Link from "next/link";
import { FairnessQuiz } from "@/components/tools/fairness-quiz";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { DataTable } from "@/components/guides/data-table";

/* ---------------------------------------------------------------------- */
/*  Headings                                                                */
/* ---------------------------------------------------------------------- */

export const headings = [
  {
    id: "timeline-at-a-glance",
    text: "The Total Loss Claim Timeline at a Glance",
    level: 2,
  },
  {
    id: "stage-1-reporting",
    text: "Stage 1: Reporting and Adjuster Assignment",
    level: 2,
  },
  {
    id: "stage-2-inspection",
    text: "Stage 2: Vehicle Inspection and Damage Assessment",
    level: 2,
  },
  {
    id: "stage-3-declaration",
    text: "Stage 3: Total Loss Declaration",
    level: 2,
  },
  {
    id: "stage-4-valuation",
    text: "Stage 4: Valuation and Settlement Offer",
    level: 2,
  },
  {
    id: "stage-5-negotiation",
    text: "Stage 5: Negotiation",
    level: 2,
  },
  {
    id: "stage-6-payment",
    text: "Stage 6: Payment",
    level: 2,
  },
  {
    id: "what-causes-delays",
    text: "What Causes Total Loss Claims to Take Longer",
    level: 2,
  },
  {
    id: "delay-factors",
    text: "Common Delay Factors and What to Do",
    level: 3,
  },
  {
    id: "your-rights-during-the-process",
    text: "Your Rights During the Process",
    level: 2,
  },
  {
    id: "check-your-offer-when-it-arrives",
    text: "Check Your Offer When It Arrives",
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

export default function TotalLossTimeline() {
  return (
    <>
      <p>
        After your car is declared a total loss, the wait for a settlement
        check can feel endless. In an uncomplicated claim where liability is
        clear and the ACV is not disputed, a total loss typically resolves in
        two to four weeks from declaration to payment. But disputed claims,
        lienholder payoffs, unresponsive adjusters, and valuation disagreements
        can stretch the process to six weeks or more. Knowing what stage your
        claim is in, who is responsible for moving it forward, and what you
        can do to keep it on track gives you a meaningful advantage. This
        guide breaks down the total loss process stage by stage, explains
        what commonly causes delays, and tells you exactly what to do at
        each point.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          A straightforward total loss claim typically takes two to four weeks
          from declaration to payment. The biggest delays come from valuation
          disputes, lienholder payoff processing, and adjuster unresponsiveness.
          Document every communication in writing and respond promptly at
          every stage to keep the process moving.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/*  Timeline at a Glance                                             */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="timeline-at-a-glance">The Total Loss Claim Timeline at a Glance</h2>

      <DataTable
        caption="Typical total loss claim timeline from accident to payment"
        headers={[
          "Stage",
          "Typical Duration",
          "Who Controls It",
          "Key Action",
        ]}
        rows={[
          [
            "Accident report and claim filing",
            "Day 1–2",
            "You",
            "File your claim promptly; photograph the vehicle thoroughly",
          ],
          [
            "Adjuster assignment",
            "1–3 business days after filing",
            "Insurer",
            "Follow up by email if you have not heard within 3 business days",
          ],
          [
            "Vehicle inspection",
            "2–7 business days after assignment",
            "Insurer",
            "Keep vehicle accessible; do not repair it before inspection",
          ],
          [
            "Repair estimate and total loss evaluation",
            "1–3 business days after inspection",
            "Insurer",
            "Ask adjuster for timeline; request a copy of the repair estimate",
          ],
          [
            "Total loss declaration",
            "Day 5–14 typically",
            "Insurer",
            "Request the declaration in writing with the repair estimate attached",
          ],
          [
            "Valuation report and settlement offer",
            "3–7 business days after declaration",
            "Insurer/valuation service",
            "Request the full valuation report when the offer arrives",
          ],
          [
            "Your review and counter-offer (if needed)",
            "5–10 business days",
            "You",
            "Review for missing line items and comparable errors; respond promptly",
          ],
          [
            "Negotiation resolution",
            "1–3 weeks",
            "Both parties",
            "Respond to each insurer communication within 2 business days",
          ],
          [
            "Settlement agreement and release signing",
            "1–3 business days after agreement",
            "Both parties",
            "Read the release carefully before signing; ask questions if unclear",
          ],
          [
            "Lienholder payoff processing",
            "3–7 business days",
            "Insurer and your lender",
            "Contact your lender proactively with your account number and payoff amount",
          ],
          [
            "Check issued to you",
            "3–7 business days after payoff",
            "Insurer",
            "Confirm mailing address; request direct deposit if available",
          ],
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/*  Stage 1: Reporting                                               */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="stage-1-reporting">Stage 1: Reporting and Adjuster Assignment</h2>

      <p>
        The clock starts when you file your claim. File it the same day as
        the accident if possible, or within 24 hours. Most insurers allow
        online claim filing, which creates an immediate timestamp. If you are
        filing a third-party claim against the at-fault driver&apos;s insurer,
        file directly with their insurer rather than going through yours first
        &mdash; it is usually faster for clear-liability third-party claims.
      </p>

      <p>
        Within one to three business days, the insurer should assign an
        adjuster to your claim and make contact. If you have not heard from
        an adjuster within three business days, follow up by email to the
        insurer&apos;s claims department with your claim number. Send it to
        the adjuster directly if you were given a name and email address at
        filing. Emailing creates a timestamp and a record of your follow-up.
      </p>

      <p>
        Take photographs of your vehicle immediately after the accident,
        before any towing or repair. Photograph all four sides, the interior,
        the odometer, and all visible damage. These photographs become evidence
        of your vehicle&apos;s pre-loss condition.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  Stage 2: Inspection                                              */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="stage-2-inspection">Stage 2: Vehicle Inspection and Damage Assessment</h2>

      <p>
        Your insurer will schedule an inspection of the vehicle, either at your
        location, at the body shop holding the vehicle, or at an insurer-owned
        drive-in claims center. The inspector documents all damage and produces
        a repair estimate. This estimate is what triggers the total loss
        determination at the next stage.
      </p>

      <p>
        Do not begin any repairs to the vehicle before the inspection is
        complete. Even temporary repairs can complicate the damage assessment.
        If the vehicle is at a storage facility or body shop, confirm that the
        insurer has the address and that the shop is expecting the inspector.
        Delays in getting the inspector access to the vehicle are one of the
        most common avoidable causes of timeline slippage.
      </p>

      <p>
        If the inspection is taking longer than seven business days to schedule,
        contact your adjuster and ask for a specific date. If the delay is due
        to inspector availability in your area, ask whether a drive-in
        inspection at a nearby claims center is possible to speed things up.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  Stage 3: Declaration                                             */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="stage-3-declaration">Stage 3: Total Loss Declaration</h2>

      <p>
        Once the repair estimate is complete, your insurer compares it to
        your vehicle&apos;s estimated actual cash value. If the repair cost
        meets or exceeds your state&apos;s total loss threshold (a fixed
        percentage of ACV in most states, or a Total Loss Formula in others),
        the vehicle is declared a total loss. For most claims, this happens
        within one to three business days of receiving the inspection results.
      </p>

      <p>
        When the total loss declaration is made, request a copy in writing
        along with the repair estimate that triggered it. These documents
        become important if you later dispute the ACV or the decision itself.
        Some policyholders believe they can dispute the total loss declaration
        by getting a lower repair estimate from an independent shop &mdash;
        this is sometimes possible, particularly if the insurer&apos;s estimate
        seems inflated. However, disputing the declaration itself is less
        common than disputing the ACV after it is made.
      </p>

      <p>
        Once your car is declared a total loss, your rental coverage clock
        often starts running faster. If you have a rental car, confirm your
        coverage limits and check when authorization will end. For more on
        this, see our{" "}
        <Link href="/guides/rental-car-after-total-loss" className="text-coral hover:underline">
          rental car coverage guide
        </Link>
        .
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  Stage 4: Valuation                                               */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="stage-4-valuation">Stage 4: Valuation and Settlement Offer</h2>

      <p>
        Within three to seven business days of the total loss declaration,
        your insurer should send you a formal settlement offer. This offer
        is based on a valuation report produced by CCC, Mitchell, or Audatex
        &mdash; third-party platforms that estimate your vehicle&apos;s actual
        cash value using comparable vehicles in your local market.
      </p>

      <p>
        The most important thing to do when the offer arrives is to{" "}
        <strong>not accept it immediately</strong>. Request the full valuation
        report first. The report contains the comparables and adjustments that
        produced your ACV, and errors in that report are the most common source
        of undervaluation. Our{" "}
        <Link href="/guides/how-to-read-valuation-report" className="text-coral hover:underline">
          guide to reading your valuation report
        </Link>{" "}
        walks through exactly what to check.
      </p>

      <p>
        Also verify that the offer includes all required line items for your
        state &mdash; particularly sales tax, title transfer fees, and
        registration fees. Missing line items are common even when the ACV
        itself is accurate. Use our{" "}
        <Link href="/tools/settlement-checklist" className="text-coral hover:underline">
          Settlement Checklist
        </Link>{" "}
        to confirm nothing is missing before responding.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  Stage 5: Negotiation                                             */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="stage-5-negotiation">Stage 5: Negotiation</h2>

      <p>
        If your offer is complete and accurate, you can accept it and move
        to settlement. If it has errors or missing items, this is the
        negotiation stage. Most negotiations on total loss claims involve
        either a valuation dispute (the ACV is too low), missing line items
        (sales tax, fees), or both.
      </p>

      <p>
        Submit your{" "}
        <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
          counter-offer in writing
        </Link>
        , citing specific line items and evidence. Be specific: which
        comparable was mismatched and why, which line item is missing and
        what state rule requires it, what your revised total demand is. Vague
        complaints take longer to resolve than specific, documented ones.
      </p>

      <p>
        Most straightforward negotiation disputes resolve within one to three
        weeks. Valuation disputes that involve an independent appraisal under
        your policy&apos;s{" "}
        <Link href="/guides/appraisal-clause-insurance" className="text-coral hover:underline">
          appraisal clause
        </Link>{" "}
        typically add three to six weeks to the timeline. If negotiation is
        stalled, a formal complaint to your state department of insurance can
        restart the conversation. See our{" "}
        <Link href="/guides/file-insurance-complaint" className="text-coral hover:underline">
          complaint guide
        </Link>{" "}
        for details.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  Stage 6: Payment                                                 */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="stage-6-payment">Stage 6: Payment</h2>

      <p>
        Once you and the insurer agree on a final settlement amount, you will
        be asked to sign a settlement release. Read this document carefully.
        The release typically states that you are accepting the payment in
        full and final settlement of all claims related to this loss, and
        that you waive any further claims. Make sure you understand and agree
        with the terms before signing. Do not sign if any part of the agreed
        settlement is still outstanding.
      </p>

      <p>
        If you have a loan on the vehicle, the insurer will pay your lender
        directly first (the lienholder payoff). Your lender receives what is
        owed on the loan, and any surplus above the loan balance is sent to
        you. This payoff process adds three to seven business days. To speed
        it up, contact your lender proactively as soon as the total loss is
        declared, confirm your account number and payoff address, and give
        your adjuster that information directly.
      </p>

      <p>
        If the ACV settlement is less than your outstanding loan balance, you
        are responsible for the difference unless you have GAP insurance. For
        more on this situation, see our{" "}
        <Link href="/guides/gap-insurance-total-loss" className="text-coral hover:underline">
          GAP insurance guide
        </Link>
        .
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  What Causes Delays                                               */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="what-causes-delays">What Causes Total Loss Claims to Take Longer</h2>

      <h3 id="delay-factors">Common Delay Factors and What to Do</h3>

      <DataTable
        caption="Common total loss claim delays and how to address them"
        headers={["Delay Factor", "Why It Happens", "What to Do"]}
        rows={[
          [
            "Disputed liability",
            "Insurer is waiting for fault determination before processing the claim",
            "File under your own collision coverage to start the process; recover from the at-fault insurer via subrogation later",
          ],
          [
            "Delayed vehicle inspection",
            "Inspector backlog or vehicle is not accessible",
            "Confirm the vehicle location with your adjuster; push for a specific inspection date",
          ],
          [
            "Lienholder payoff processing",
            "Coordination between insurer and lender takes time",
            "Contact your lender proactively; provide payoff information directly to your adjuster",
          ],
          [
            "Valuation dispute",
            "You submitted a counter-offer and are waiting for insurer review",
            "Follow up in writing every 5 business days; set a clear response deadline in your counter-offer",
          ],
          [
            "Appraisal clause process",
            "Independent appraisal adds significant time by design",
            "Weigh cost-benefit before invoking; use for large disputes only",
          ],
          [
            "Adjuster unresponsiveness",
            "High caseload, vacation, or handoff between adjusters",
            "Document every attempt to reach them by email; escalate to a supervisor after 2 missed responses",
          ],
          [
            "State insurance complaint",
            "Adds formal process but also requires insurer response",
            "File when other escalation fails; insurer must respond within state-mandated timeframe",
          ],
          [
            "Documentation requests",
            "Insurer requests additional documents you thought you already provided",
            "Confirm all documents in every email; keep a master document log with submission dates",
          ],
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/*  Your Rights                                                      */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="your-rights-during-the-process">Your Rights During the Process</h2>

      <p>
        Most states have specific requirements for how quickly insurers must
        acknowledge, investigate, and respond to claims. While the exact
        timeframes vary, the general framework in most states includes:
      </p>

      <ul>
        <li>
          Acknowledgment of your claim within 10 to 15 business days of filing
        </li>
        <li>
          A decision on coverage or request for additional information within
          15 to 40 days of receiving all necessary documentation
        </li>
        <li>
          A written explanation of any denial or partial denial that identifies
          the specific policy provision being relied upon
        </li>
        <li>
          Payment within 5 to 30 days after reaching a settlement agreement,
          depending on state
        </li>
      </ul>

      <p>
        California provides one of the more detailed regulatory frameworks as
        an example of what state rules can look like. California Code of
        Regulations Title 10, §2695 (the Fair Claims Settlement Practices
        Regulations) requires insurers to acknowledge a claim within 10 working
        days of receiving notice, to accept or deny a claim within 40 calendar
        days of receiving proof of claim, and to issue payment within 30 days
        of reaching a settlement agreement. If a California insurer misses
        these deadlines, a complaint to the California Department of Insurance
        creates an enforceable record of noncompliance. Your state may have
        similar or different specific deadlines &mdash; check your state
        department&apos;s website for the rules that apply to you.
      </p>

      <p>
        Your state&apos;s department of insurance website lists the specific
        timeframes that apply. If your insurer is not meeting these deadlines,
        a formal complaint creates a documented record of the delay and
        requires the insurer to explain it.
      </p>

      <p>
        You also have the right to:
      </p>

      <ul>
        <li>
          A copy of the valuation report used to calculate your ACV
        </li>
        <li>
          A copy of the repair estimate that triggered the total loss declaration
        </li>
        <li>
          A written explanation of any adjustment or line item denial
        </li>
        <li>
          Negotiate your settlement before accepting it
        </li>
        <li>
          Invoke the appraisal clause in your policy if valuation cannot be
          agreed upon through negotiation
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/*  Check Your Offer When It Arrives                                 */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="check-your-offer-when-it-arrives">
        Check Your Offer When It Arrives
      </h2>

      <p>
        When your settlement offer arrives, do not let time pressure push you
        into accepting before you have verified it. Take two minutes to score
        your offer with our Offer Fairness Quiz &mdash; it checks for the most
        common missing line items based on your state and vehicle:
      </p>

      <FairnessQuiz mode="mini" />

      <CTABox
        heading="Get a complete line-by-line analysis of your total loss offer"
        body="Upload your offer and ClaimCoach identifies missing line items, valuation errors, and provides a ready-to-send counter-offer with supporting evidence — typically in under 5 minutes."
        href="/claims/new"
        label="Analyze my offer"
      />

      {/* ---------------------------------------------------------------- */}
      {/*  Bottom Line                                                      */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          A total loss claim has six distinct stages, each with a typical
          duration and a clear owner. Uncomplicated claims resolve in two
          to four weeks. Delays most often come from disputed valuation,
          lienholder payoff coordination, and adjuster unresponsiveness &mdash;
          all of which are addressable by documenting everything in writing,
          following up on schedule, and escalating through the appropriate
          channels when needed. Know your rights, know the timeline, and do
          not accept your offer before verifying it is complete.
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
          <Link href="/guides/how-to-read-valuation-report" className="text-coral hover:underline">
            How to Read Your Valuation Report
          </Link>{" "}
          &mdash; what to check the moment your offer arrives
        </li>
        <li>
          <Link href="/guides/rental-car-after-total-loss" className="text-coral hover:underline">
            How Long Does Insurance Pay for a Rental Car?
          </Link>{" "}
          &mdash; managing rental coverage through the settlement process
        </li>
        <li>
          <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
            Counter-Offer Letter Template
          </Link>{" "}
          &mdash; respond to a low offer with a documented, professional letter
        </li>
        <li>
          <Link href="/guides/file-insurance-complaint" className="text-coral hover:underline">
            How to File a State Insurance Complaint
          </Link>{" "}
          &mdash; when negotiation stalls, escalate formally
        </li>
      </ul>

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational and
          educational purposes only and does not constitute legal, financial,
          or insurance advice. Claim timelines, state regulatory requirements,
          and insurer response obligations vary by state and are subject to
          change. Individual outcomes depend on the specifics of each claim.
          Consult a licensed professional in your state for advice specific
          to your situation. Nothing in this article should be interpreted
          as a promise or prediction of any particular outcome.
        </p>
      </div>
    </>
  );
}
