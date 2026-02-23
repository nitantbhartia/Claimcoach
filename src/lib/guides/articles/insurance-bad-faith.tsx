import Link from "next/link";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { DataTable } from "@/components/guides/data-table";

export const headings = [
  { id: "what-is-bad-faith", text: "What Is Insurance Bad Faith?", level: 2 },
  { id: "dispute-vs-bad-faith", text: "Coverage Dispute vs. Bad Faith: The Critical Difference", level: 2 },
  { id: "bad-faith-indicators", text: "Bad Faith Indicators vs. Mere Disputes", level: 3 },
  { id: "first-party-vs-third-party", text: "First-Party vs. Third-Party Bad Faith", level: 2 },
  { id: "what-to-document", text: "What to Document Before You Consult an Attorney", level: 2 },
  { id: "escalation-before-litigation", text: "Escalation Steps Before Bad Faith Litigation", level: 2 },
  { id: "when-to-hire-attorney", text: "When to Hire a Bad Faith Attorney", level: 2 },
  { id: "state-specific-standards", text: "Bad Faith Standards Vary Significantly by State", level: 2 },
  { id: "the-bottom-line", text: "The Bottom Line", level: 2 },
  { id: "related-guides", text: "Related Guides", level: 2 },
];

export default function InsuranceBadFaith() {
  return (
    <>
      <p>
        Most disputes with an insurance company over a total loss settlement
        are exactly that: disputes. The insurer and policyholder disagree on
        ACV, on which line items are owed, or on how quickly the claim must
        be resolved. These are ordinary negotiation problems with ordinary
        solutions &mdash; counter-offers, valuation reports, state complaints.
        Insurance bad faith is something different and more serious: it is
        the legal doctrine that allows a policyholder to sue their own insurer
        for damages that go beyond the original claim amount when the insurer
        unreasonably denies or delays a legitimate claim. This guide explains
        the line between a hard negotiation and actionable bad faith, what
        to document, when to escalate, and when to bring in an attorney.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          Insurance bad faith requires evidence that the insurer knew your
          claim was legitimate and denied or delayed it without a reasonable
          basis. A low offer, a slow adjuster, or a disputed comparable are
          not bad faith &mdash; they are negotiation problems. Before
          consulting a bad faith attorney, exhaust the standard escalation
          path: written counter-offer, supervisor escalation, and state
          insurance complaint.
        </p>
      </KeyTakeaway>

      <h2 id="what-is-bad-faith">What Is Insurance Bad Faith?</h2>

      <p>
        Insurance policies create a contract between you and your insurer.
        Embedded in that contract &mdash; and in most states, in statute &mdash;
        is an implied duty of good faith and fair dealing. Your insurer must
        handle your claim honestly, promptly, and with a genuine effort to pay
        what is legitimately owed. When an insurer falls so far below that
        standard that courts recognize it as a knowing or reckless disregard
        for your rights, that is bad faith.
      </p>

      <p>
        A successful bad faith claim can result in damages beyond the policy
        limits &mdash; including consequential damages, emotional distress, and
        in some states punitive damages designed to punish egregious insurer
        conduct. This potential for extracontractual damages is what makes bad
        faith different from an ordinary coverage dispute, and why it requires
        a higher evidentiary bar to prove.
      </p>

      <p>
        To illustrate what extracontractual damages look like in practice: if
        a court finds your insurer acted in bad faith by refusing to pay a
        legitimate $18,000 total loss claim for eight months, a judgment might
        award the $18,000 policy benefit plus consequential damages (storage
        fees, rental car costs, lost income if the vehicle was a work vehicle),
        emotional distress damages, and &mdash; in egregious cases &mdash;
        punitive damages. The total judgment can reach several multiples of
        the original claim value. This potential outcome is why bad faith
        litigation is taken seriously by insurers and why the evidentiary bar
        to prove it is intentionally high.
      </p>

      <h2 id="dispute-vs-bad-faith">
        Coverage Dispute vs. Bad Faith: The Critical Difference
      </h2>

      <p>
        The vast majority of total loss disputes &mdash; low ACV offers,
        missing line items, slow adjusters, disputed comparables &mdash;
        are coverage disputes, not bad faith. An insurer that offers you
        $15,000 when your car is worth $18,500 is not necessarily acting
        in bad faith; they may simply be wrong, and they are entitled to
        disagree with your valuation. Bad faith requires more: it requires
        evidence that the insurer&apos;s conduct was unreasonable, and in
        most states, that they knew or should have known the claim was valid
        and denied or delayed it anyway.
      </p>

      <h3 id="bad-faith-indicators">
        Bad Faith Indicators vs. Mere Disputes
      </h3>

      <DataTable
        caption="Distinguishing ordinary coverage disputes from potential bad faith conduct"
        headers={["Conduct", "Likely a Dispute", "Potential Bad Faith Indicator"]}
        rows={[
          [
            "Low ACV offer",
            "Insurer used a defensible valuation methodology, even if you disagree with the result",
            "Insurer ignored specific comparables you provided, gave no explanation, and refused to revise",
          ],
          [
            "Missing sales tax or fees",
            "Honest oversight; corrected when pointed out in writing",
            "Refused to pay after written demand citing the specific state statute requiring it",
          ],
          [
            "Slow claim processing",
            "Adjuster has high caseload; responds within state-mandated window",
            "No response to multiple written contacts over weeks; state deadline missed with no explanation",
          ],
          [
            "Disputed repair vs. total loss threshold",
            "Insurer used a standard methodology; you disagree with the result",
            "Insurer manipulated the repair estimate to avoid a total loss declaration to limit payout",
          ],
          [
            "Denied coverage",
            "Insurer cited a specific policy exclusion that plausibly applies",
            "Insurer denied coverage citing an exclusion without investigating facts, or miscited the policy language",
          ],
          [
            "Misrepresenting policy terms",
            "Adjuster gave incorrect information that was later corrected",
            "Insurer repeatedly cited policy provisions that do not exist or deliberately misread exclusions",
          ],
        ]}
      />

      <KeyTakeaway>
        <p>
          The threshold for bad faith is intentionally high. An insurer that
          makes a mistake, moves slowly, or disagrees with your valuation
          is not acting in bad faith. An insurer that ignores documented
          evidence, refuses to explain denials, or deliberately misrepresents
          policy terms may be.
        </p>
      </KeyTakeaway>

      <h2 id="first-party-vs-third-party">
        First-Party vs. Third-Party Bad Faith
      </h2>

      <p>
        <strong>First-party bad faith</strong> involves your own insurer
        &mdash; the company you pay premiums to &mdash; handling your claim
        unreasonably. Because your insurer owes you a direct contractual duty
        of good faith, first-party bad faith is recognized in virtually every
        state and is the most common basis for bad faith litigation. Most
        state bad faith statutes are designed for first-party claims.
      </p>

      <p>
        <strong>Third-party bad faith</strong> involves the at-fault
        driver&apos;s liability insurer acting unreasonably toward you as a
        third-party claimant. Third-party bad faith is harder to pursue because
        you have no direct contractual relationship with the at-fault
        driver&apos;s insurer. Some states recognize a limited duty of good
        faith owed to third parties in liability claims; others do not.
        Third-party bad faith is more commonly pursued when an insurer refuses
        to settle within policy limits and exposes their insured to a judgment
        above those limits. Consult a licensed attorney in your state if you
        believe a third-party insurer is acting in bad faith.
      </p>

      <h2 id="what-to-document">
        What to Document Before You Consult an Attorney
      </h2>

      <p>
        If you believe your insurer&apos;s conduct has crossed from a dispute
        into potential bad faith territory, build a documentation file before
        contacting an attorney. A bad faith attorney evaluating your case will
        want to see:
      </p>

      <DataTable
        caption="Documentation a bad faith attorney will want to review before taking your case"
        headers={["Document", "What It Shows"]}
        rows={[
          [
            "Complete claim timeline (dates of every communication)",
            "Documents the pace of the insurer's conduct relative to state regulatory deadlines",
          ],
          [
            "All written communications (emails, letters)",
            "Shows what was requested, what was promised, and what was ignored",
          ],
          [
            "Your written counter-offers and the insurer's responses",
            "Documents whether the insurer engaged with specific evidence or ignored it",
          ],
          [
            "Valuation report and your comparable evidence",
            "Shows whether the insurer had a reasonable basis for their valuation or ignored clear market data",
          ],
          [
            "Adjuster names, supervisor names, and dates of escalation",
            "Identifies the individuals involved in the claim handling decisions",
          ],
          [
            "Any written denial letters and the policy provisions cited",
            "Allows comparison of the cited provision with the actual policy language",
          ],
          [
            "State complaint filing confirmation and insurer's response",
            "Shows formal record of noncompliance if the insurer failed to respond adequately",
          ],
        ]}
      />

      <h2 id="escalation-before-litigation">
        Escalation Steps Before Bad Faith Litigation
      </h2>

      <p>
        Before any bad faith litigation makes sense, you should have completed
        the standard escalation path. Courts and attorneys will expect this.
        Most genuine bad faith cases are ones where the standard path was fully
        exhausted and the insurer still refused to act reasonably.
      </p>

      <p>
        <strong>Step 1: Written counter-offer with evidence.</strong> A formal
        written counter-offer citing specific policy provisions, comparable
        evidence, and missing line items is the foundation. If the insurer
        ignores this or refuses to explain their denial, you have your first
        documented piece of unreasonable conduct.
      </p>

      <p>
        <strong>Step 2: Supervisor escalation.</strong> Request in writing
        that your file be escalated to a claims supervisor. Document the date
        and recipient of this request. Note whether and when a supervisor
        responded.
      </p>

      <p>
        <strong>Step 3: State insurance department complaint.</strong> A formal
        complaint creates an official record of your claim and requires the
        insurer to respond. See our{" "}
        <Link href="/guides/file-insurance-complaint" className="text-coral hover:underline">
          complaint filing guide
        </Link>{" "}
        for the complete process. An insurer that does not respond adequately
        to a state complaint is building your bad faith record.
      </p>

      <p>
        <strong>Step 4: Appraisal clause.</strong> If the dispute is about
        ACV rather than coverage, invoking your policy&apos;s{" "}
        <Link href="/guides/appraisal-clause-insurance" className="text-coral hover:underline">
          appraisal clause
        </Link>{" "}
        forces a binding independent valuation. An insurer that refuses to
        participate in the appraisal process despite a valid demand may be
        adding to a bad faith record.
      </p>

      <h2 id="when-to-hire-attorney">
        When to Hire a Bad Faith Attorney
      </h2>

      <p>
        Consult a bad faith attorney when: you have completed the escalation
        path above; the insurer has continued to refuse, delay, or misrepresent
        without a reasonable explanation; and the dollar amount at issue
        justifies legal fees. Most bad faith attorneys work on contingency in
        total loss cases, meaning they take a percentage of the recovery rather
        than an upfront fee, which lowers the cost barrier.
      </p>

      <p>
        Red flags that warrant an attorney consultation sooner rather than
        later include: a written denial that cites policy language that
        does not actually support the denial; a refusal to provide the
        valuation report after written request; complete communication
        silence for multiple weeks after multiple written attempts; or a
        settlement offer that is so far below any defensible market value
        that no legitimate methodology could produce it.
      </p>

      <p>
        To find a bad faith attorney: your state bar association&apos;s
        attorney referral service is the most reliable starting point for
        licensed, vetted attorneys in your jurisdiction. Most bad faith
        attorneys handle total loss cases on contingency &mdash; meaning they
        receive a percentage of any recovery (typically 25% to 40%) with no
        upfront fee from you. This aligns the attorney&apos;s incentive with
        yours: they only get paid if you win. Search specifically for attorneys
        who list insurance bad faith, insurance coverage disputes, or
        first-party insurance litigation as practice areas, rather than
        general personal injury practitioners.
      </p>

      <h2 id="state-specific-standards">
        Bad Faith Standards Vary Significantly by State
      </h2>

      <p>
        Bad faith law is primarily state law, and standards differ
        significantly. Some states have detailed insurance bad faith statutes
        with specific remedies and fee-shifting provisions. Others rely
        primarily on common law tort principles. A few key distinctions:
      </p>

      <DataTable
        caption="How bad faith standards differ across states — illustrative examples"
        headers={["State", "Notable Feature"]}
        rows={[
          [
            "California",
            "California Insurance Code §790.03 prohibits specific unfair claims settlement practices. The Unfair Insurance Practices Act provides a private right of action in some circumstances. Courts have awarded significant extracontractual damages.",
          ],
          [
            "Texas",
            "Texas Insurance Code Chapter 541 (Unfair Claim Settlement Practices) provides a private right of action for bad faith with provisions for attorney fees and, in egregious cases, treble damages.",
          ],
          [
            "Florida",
            "Florida Statutes §624.155 allows a civil remedy for bad faith after a 60-day cure period. The insured must give the insurer written notice of the violation and an opportunity to cure before filing suit.",
          ],
          [
            "Many other states",
            "Recognize bad faith through common law tort principles rather than specific statutes. The standard typically requires proof that the insurer acted unreasonably or without proper cause in denying or delaying the claim.",
          ],
        ]}
      />

      <p>
        The Florida requirement deserves specific attention: before filing a
        civil bad faith lawsuit in Florida, the insured must give the insurer
        written notice of the alleged violation through a Civil Remedy Notice
        (CRN), filed with the Florida Department of Financial Services. The
        insurer then has 60 days to cure the violation. If the insurer cures
        within that window, the lawsuit cannot proceed. If they do not cure,
        the insured may file suit. This pre-suit CRN requirement is
        procedurally mandatory and must be completed before any bad faith
        litigation begins in Florida.
      </p>

      <p>
        Because bad faith law is so state-specific, the threshold for what
        constitutes actionable bad faith, the damages available, and the
        procedural requirements to pursue a claim vary widely. An attorney
        licensed in your state is the only source you should rely on for
        a bad faith assessment of your specific situation.
      </p>

      <CTABox
        heading="Build a documented claim record before you escalate"
        body="ClaimCoach organizes your claim evidence, identifies regulatory violations, and generates a counter-offer with supporting documentation — the foundation for any escalation or bad faith assessment."
        href="/claims/new"
        label="Document my claim"
      />

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          Insurance bad faith is a high threshold that goes well beyond a
          low offer or a slow adjuster. Most total loss disputes resolve
          through written counter-offers, supervisor escalation, state
          complaints, or the appraisal clause. Reserve bad faith litigation
          for situations where you have exhausted those options, have a
          documented record of unreasonable conduct, and the dollar amount
          justifies attorney involvement. Consult a bad faith attorney
          licensed in your state if you believe you have crossed that line.
        </p>
      </KeyTakeaway>

      <h2 id="related-guides" className="text-heading font-semibold text-black mt-10 mb-4">
        Related Guides
      </h2>

      <ul className="list-disc list-inside space-y-2 text-body text-[#4a555e] mb-6">
        <li>
          <Link href="/guides/file-insurance-complaint" className="text-coral hover:underline">
            How to File a State Insurance Complaint
          </Link>{" "}
          &mdash; the formal escalation step before bad faith litigation
        </li>
        <li>
          <Link href="/guides/appraisal-clause-insurance" className="text-coral hover:underline">
            How to Use the Appraisal Clause
          </Link>{" "}
          &mdash; force a binding independent valuation for ACV disputes
        </li>
        <li>
          <Link href="/guides/insurance-adjuster-delay" className="text-coral hover:underline">
            Insurance Adjuster Delay: Your Rights
          </Link>{" "}
          &mdash; what to do when the settlement process stalls
        </li>
        <li>
          <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
            Counter-Offer Letter Template
          </Link>{" "}
          &mdash; the first step in building a documented claim record
        </li>
      </ul>

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational and
          educational purposes only and does not constitute legal advice.
          Insurance bad faith law is complex, highly state-specific, and
          fact-dependent. Nothing in this article should be interpreted as
          legal advice or an assessment of your specific claim. Consult a
          licensed attorney in your state for advice about your situation.
        </p>
      </div>
    </>
  );
}
