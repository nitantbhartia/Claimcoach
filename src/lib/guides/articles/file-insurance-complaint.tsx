import Link from "next/link";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { DataTable } from "@/components/guides/data-table";

/* ---------------------------------------------------------------------- */
/*  Headings                                                                */
/* ---------------------------------------------------------------------- */

export const headings = [
  {
    id: "when-to-file",
    text: "When to File a Complaint",
    level: 2,
  },
  {
    id: "what-a-complaint-can-accomplish",
    text: "What a State Insurance Complaint Can Accomplish",
    level: 2,
  },
  {
    id: "how-to-file-step-by-step",
    text: "How to File a Complaint: Step by Step",
    level: 2,
  },
  {
    id: "what-to-include",
    text: "What to Include in Your Complaint",
    level: 3,
  },
  {
    id: "where-to-file",
    text: "Where to File: Finding Your State Department",
    level: 3,
  },
  {
    id: "what-happens-after-you-file",
    text: "What Happens After You File",
    level: 2,
  },
  {
    id: "insurer-response-requirements",
    text: "Insurer Response Requirements",
    level: 3,
  },
  {
    id: "complaint-outcomes",
    text: "Realistic Complaint Outcomes",
    level: 3,
  },
  {
    id: "bad-faith-claims",
    text: "When to Consider a Bad Faith Claim",
    level: 2,
  },
  {
    id: "bad-faith-indicators",
    text: "Common Bad Faith Indicators",
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

export default function FileInsuranceComplaint() {
  return (
    <>
      <p>
        When negotiation with your adjuster reaches a dead end &mdash; no
        substantive response to your counter-offer, repeated delays, or a flat
        refusal to acknowledge missing line items &mdash; you have a formal
        escalation path available at no cost: filing a complaint with your
        state&apos;s department of insurance. Every state maintains a
        regulatory body that oversees insurer conduct, and every insurer doing
        business in your state is required to respond to complaints filed
        through that body. A complaint does not guarantee a specific outcome,
        but it changes the dynamic of the negotiation, creates a formal record,
        and in many cases prompts the insurer to revisit a stalled claim.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          Filing a complaint with your state insurance department is free,
          takes under an hour, and requires the insurer to formally respond.
          It is most effective after you have already submitted a written
          counter-offer and received either no response or an inadequate
          written explanation for why specific items were denied.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/*  When to File                                                     */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="when-to-file">When to File a Complaint</h2>

      <p>
        A state insurance complaint is not a first-response tool. It is most
        effective &mdash; and most credible &mdash; when you have already
        attempted good-faith negotiation and can document the insurer&apos;s
        failure to respond adequately. File a complaint when one or more of
        the following is true:
      </p>

      <ul>
        <li>
          You submitted a written counter-offer with supporting evidence and
          received no substantive response within 10 to 14 business days
        </li>
        <li>
          Your adjuster acknowledged specific errors in the valuation report
          but refused to correct them without explanation
        </li>
        <li>
          The insurer is refusing to pay line items (sales tax, registration
          fees, rental reimbursement) that your state clearly requires
        </li>
        <li>
          Your adjuster has been unresponsive for an extended period and
          supervisor escalation produced no result
        </li>
        <li>
          The insurer made a settlement offer that is far below any reasonable
          market valuation without providing a documented basis for the figure
        </li>
        <li>
          The insurer is using delay tactics or repeatedly requesting
          documents you have already provided
        </li>
      </ul>

      <p>
        Filing a complaint before attempting direct negotiation or a written
        counter-offer is generally less effective. The department will typically
        ask whether you attempted to resolve the dispute directly, and a
        well-documented negotiation attempt strengthens your complaint
        substantially.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  What a Complaint Can Accomplish                                  */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="what-a-complaint-can-accomplish">
        What a State Insurance Complaint Can Accomplish
      </h2>

      <p>
        State insurance departments vary in how aggressively they intervene
        on behalf of individual claimants, but even in states with limited
        mediation authority, a complaint accomplishes several things:
      </p>

      <ul>
        <li>
          <strong>Requires a formal insurer response.</strong> The insurer must
          respond to the department within a specified timeframe, typically 30
          to 45 days. That response is a documented record of their position
          on your claim.
        </li>
        <li>
          <strong>Creates regulatory visibility.</strong> Patterns of
          complaints against a specific insurer or adjuster are tracked and
          used in market conduct examinations. Even if your individual
          complaint does not change your outcome immediately, it contributes
          to a record.
        </li>
        <li>
          <strong>Often prompts re-examination of the claim.</strong> In many
          cases, the act of filing a complaint causes the insurer&apos;s
          compliance team to review the claim independently. Items that were
          refused by the adjuster are sometimes approved at this stage.
        </li>
        <li>
          <strong>Strengthens any subsequent legal action.</strong> If you
          later pursue a bad faith claim or hire an attorney, a filed
          complaint and the insurer&apos;s response to it are useful pieces
          of evidence.
        </li>
        <li>
          <strong>Some states offer formal mediation.</strong> Florida, for
          example, has a mediation program through the Department of Financial
          Services where a mediator facilitates a binding or non-binding
          resolution. Check your state department&apos;s website for available
          programs.
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/*  How to File Step by Step                                         */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="how-to-file-step-by-step">How to File a Complaint: Step by Step</h2>

      <h3 id="what-to-include">What to Include in Your Complaint</h3>

      <p>
        A well-prepared complaint is specific, factual, and organized. A
        complaint that says &quot;my insurer is treating me unfairly&quot;
        is less effective than one that says &quot;my insurer refused to
        include $1,247 in required sales tax reimbursement (Texas law
        requires it) and has not responded to my written counter-offer dated
        [date].&quot; The more specific you are, the more actionable your
        complaint is for the department.
      </p>

      <DataTable
        caption="Information to include in a state insurance department complaint"
        headers={["Item", "Why It Matters"]}
        rows={[
          [
            "Your policy number",
            "Confirms coverage exists and identifies the relevant policy",
          ],
          [
            "Your claim number",
            "Links the complaint directly to the specific total loss claim",
          ],
          [
            "Insurer name and adjuster name",
            "Directs the complaint to the right entity and creates individual accountability",
          ],
          [
            "Date of loss",
            "Establishes the timeline and confirms the claim is within applicable deadlines",
          ],
          [
            "Chronological timeline of communications",
            "Documents the pattern of insurer conduct and any unreasonable delays",
          ],
          [
            "Copies of written correspondence",
            "Provides direct evidence of what was communicated and when",
          ],
          [
            "Your settlement demand and basis",
            "Establishes what you believe you are owed and why",
          ],
          [
            "Specific provisions or state laws you believe were violated",
            "Gives the department a clear legal peg to hang the investigation on",
          ],
          [
            "What resolution you are seeking",
            "A specific request (e.g., payment of $1,247 in missing sales tax) is more actionable than a general one",
          ],
        ]}
      />

      <h3 id="where-to-file">Where to File: Finding Your State Department</h3>

      <p>
        Every state has an insurance regulatory body. The National Association
        of Insurance Commissioners (NAIC) maintains a directory of all state
        departments at{" "}
        <strong>naic.org/state-insurance-departments</strong>, and their
        Consumer Insurance Search tool at{" "}
        <strong>content.naic.org/consumer/file-complaint</strong> links
        directly to each state&apos;s complaint portal.
      </p>

      <p>
        Most state departments have online complaint submission forms that
        allow you to attach documents (correspondence, valuation reports,
        counter-offer letters). Complete the online form and attach every
        document referenced in your complaint. Keep a copy of the submission
        confirmation and the complaint ID number.
      </p>

      <p>
        Common names for state insurance regulatory bodies include Department
        of Insurance, Division of Insurance, Office of Insurance Regulation,
        and Department of Financial Services. The NAIC directory lists all of
        them with direct links to their complaint portals.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  What Happens After You File                                      */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="what-happens-after-you-file">What Happens After You File</h2>

      <h3 id="insurer-response-requirements">Insurer Response Requirements</h3>

      <p>
        Once your complaint is filed, the state department forwards it to the
        insurer and requires a formal response. Most states specify a response
        timeframe, typically 30 to 45 days. The insurer&apos;s response
        must address the specific issues you raised, not simply restate their
        original position. Some departments require insurers to respond to
        each allegation individually.
      </p>

      <p>
        You will receive a copy of the insurer&apos;s response. If the
        department finds merit in your complaint, they may request additional
        information from the insurer, conduct a more formal inquiry, or refer
        the matter for a market conduct examination. If the department
        determines the insurer is in compliance with your state&apos;s
        regulations, they will close the complaint and notify you.
      </p>

      <h3 id="complaint-outcomes">Realistic Complaint Outcomes</h3>

      <p>
        Setting realistic expectations is important. A state department complaint
        is not a substitute for litigation, and the department does not
        adjudicate the dollar amount of your settlement. What the department
        can do is require the insurer to comply with applicable regulations
        and respond in good faith. The realistic range of outcomes includes:
      </p>

      <ul>
        <li>
          <strong>Insurer voluntarily resolves the issue</strong> during the
          complaint process, paying missing line items or reconsidering the ACV
          in order to close the complaint
        </li>
        <li>
          <strong>Department finds a regulatory violation</strong> and orders
          the insurer to correct it (e.g., pay required sales tax, respond
          within mandated timeframes)
        </li>
        <li>
          <strong>Department finds no violation</strong> but your complaint is
          now on record, strengthening any subsequent legal action
        </li>
        <li>
          <strong>Department refers matter for market conduct examination</strong>{" "}
          if the complaint is part of a pattern of similar complaints against
          the same insurer
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/*  Bad Faith                                                        */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="bad-faith-claims">When to Consider a Bad Faith Claim</h2>

      <p>
        Insurance bad faith is a legal doctrine that allows policyholders to
        sue their own insurer for damages beyond the original claim amount when
        the insurer unreasonably denies or delays a legitimate claim. Most
        states recognize first-party bad faith (claims against your own
        insurer) as either a statutory right or a common law tort.
      </p>

      <p>
        Bad faith is a serious allegation and is not appropriate in every
        coverage dispute. A mere disagreement about ACV, or a slow adjuster,
        does not constitute bad faith. Bad faith requires evidence that the
        insurer <em>knew</em> the claim was legitimate and either denied it
        or delayed payment without a reasonable basis.
      </p>

      <h3 id="bad-faith-indicators">Common Bad Faith Indicators</h3>

      <DataTable
        caption="Insurer conduct that may indicate bad faith — consult a licensed attorney in your state"
        headers={["Conduct", "Description"]}
        rows={[
          [
            "Unreasonable denial without investigation",
            "Refusing a claim without conducting a good-faith investigation into the facts",
          ],
          [
            "Failure to pay undisputed amounts",
            "Withholding portions of a settlement that the insurer agrees are owed while disputing other portions",
          ],
          [
            "Misrepresenting policy terms",
            "Telling you coverage does not exist when it clearly does based on the policy language",
          ],
          [
            "Unreasonable delay without explanation",
            "Failing to communicate, respond to counter-offers, or advance the claim for extended periods without a stated reason",
          ],
          [
            "Making an offer with no reasonable basis",
            "Offering a settlement far below documented market value without any explanation or supporting data",
          ],
          [
            "Repeated requests for documents already provided",
            "Using documentation requests as a delay tactic when the documents were already submitted",
          ],
        ]}
      />

      <p>
        If you believe your situation involves potential bad faith conduct,
        consult a licensed insurance attorney or public adjuster in your state.
        Many bad faith attorneys work on contingency for first-party claims,
        meaning they only collect a fee if you recover. Your state bar
        association can refer you to attorneys licensed in insurance law.
      </p>

      <CTABox
        heading="Build the documentation you need before you escalate"
        body="ClaimCoach organizes your claim evidence, identifies specific regulatory violations, and generates a counter-offer — the foundation for any complaint or escalation."
        href="/claims/new"
        label="Document my claim"
      />

      {/* ---------------------------------------------------------------- */}
      {/*  Bottom Line                                                      */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          Filing a state insurance complaint is a free, formal escalation
          tool that requires your insurer to respond on record. It is most
          effective when you have already attempted written negotiation,
          documented the insurer&apos;s inadequate response, and can point to
          specific regulatory requirements that were not met. It is not a
          guarantee of a specific outcome, but it changes the dynamic of a
          stalled claim and creates a record that supports any further action
          you may need to take.
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
          <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
            Counter-Offer Letter Template
          </Link>{" "}
          &mdash; the written negotiation step that should precede a complaint
        </li>
        <li>
          <Link href="/guides/adjuster-call-script" className="text-coral hover:underline">
            Insurance Adjuster Call Script
          </Link>{" "}
          &mdash; document these calls before escalating formally
        </li>
        <li>
          <Link href="/guides/appraisal-clause-insurance" className="text-coral hover:underline">
            How to Use the Appraisal Clause
          </Link>{" "}
          &mdash; an alternative escalation path for valuation disputes
        </li>
        <li>
          <Link href="/guides/insurance-lowball-offer" className="text-coral hover:underline">
            Insurance Company Lowball Offer: What to Do Next
          </Link>{" "}
          &mdash; identifying the problem before escalating
        </li>
      </ul>

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational and
          educational purposes only and does not constitute legal, financial,
          or insurance advice. State insurance department procedures, insurer
          response requirements, bad faith law, and mediation programs vary
          by state and are subject to change. This article does not address
          every state&apos;s specific rules. Consult a licensed professional
          in your state for advice specific to your situation. Nothing in
          this article should be interpreted as a promise or prediction of
          any particular outcome.
        </p>
      </div>
    </>
  );
}
