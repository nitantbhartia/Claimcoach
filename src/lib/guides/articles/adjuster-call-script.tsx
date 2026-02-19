import Link from "next/link";
import { FairnessQuiz } from "@/components/tools/fairness-quiz";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { CaseStudy } from "@/components/guides/case-study";
import { DataTable } from "@/components/guides/data-table";

/* ---------------------------------------------------------------------- */
/*  Headings                                                                */
/* ---------------------------------------------------------------------- */

export const headings = [
  {
    id: "before-you-call",
    text: "What to Do Before You Call Your Adjuster",
    level: 2,
  },
  {
    id: "opening-the-call",
    text: "Opening the Call: Word-for-Word Script",
    level: 2,
  },
  {
    id: "disputing-the-acv",
    text: "Disputing the ACV: Scripts for Common Scenarios",
    level: 2,
  },
  {
    id: "requesting-missing-line-items",
    text: "Requesting Missing Line Items",
    level: 3,
  },
  {
    id: "disputing-comparables",
    text: "Disputing Comparable Vehicles",
    level: 3,
  },
  {
    id: "phrases-to-avoid",
    text: "Phrases to Avoid in Adjuster Conversations",
    level: 2,
  },
  {
    id: "escalating-to-a-supervisor",
    text: "Escalating to a Supervisor: When and How",
    level: 2,
  },
  {
    id: "real-call-case-studies",
    text: "Real Outcomes from Effective Adjuster Calls",
    level: 2,
  },
  {
    id: "documenting-the-call",
    text: "How to Document Every Adjuster Conversation",
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

export default function AdjusterCallScript() {
  return (
    <>
      {/* Lead paragraph */}
      <p>
        The single phone call that matters most after a total loss
        declaration is the one where you challenge the settlement offer
        with your adjuster. Policyholders who approach that conversation
        with prepared scripts and documented evidence recover an average
        of <strong>$1,800 more than those who improvise</strong>, according
        to ClaimCoach outcome data. The good news: you do not need to be
        confrontational, aggressive, or an insurance expert to succeed.
        You need to be organized, specific, and professional. This guide
        gives you word-for-word scripts, a pre-call checklist, and the
        exact language that moves the needle &mdash; along with the
        phrases that consistently backfire.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          Adjusters negotiate on the facts in their file. Your job is to
          give them documented evidence that changes what their file says.
          A professional tone, specific numbers, and references to actual
          comparable listings &mdash; not emotional appeals &mdash; are
          what produce results.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/* Before You Call                                                   */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="before-you-call">What to Do Before You Call Your Adjuster</h2>

      <p>
        Every successful adjuster negotiation begins with preparation.
        Walking into the call without documentation is the most common
        mistake policyholders make. Before you pick up the phone:
      </p>

      <DataTable
        caption="Pre-call checklist: what to have ready before calling your adjuster"
        headers={["Item", "Why You Need It", "Where to Find It"]}
        rows={[
          [
            "Your insurer&apos;s valuation report",
            "Lists every comparable used and every adjustment made — your primary target",
            "Request from adjuster; required to be provided in most states",
          ],
          [
            "Your own comparable listings (5–7)",
            "Same year/make/model/trim within 50 miles; found on CarGurus, AutoTrader, Cars.com",
            "Search online; screenshot price, mileage, location, dealer name",
          ],
          [
            "Your vehicle&apos;s complete spec sheet",
            "Trim level, engine, drivetrain, factory options, mileage at time of loss",
            "Window sticker, Carfax, insurance declaration page",
          ],
          [
            "Aftermarket upgrade receipts",
            "Documentation for any accessories you installed post-purchase",
            "Email receipts, credit card statements, installer invoices",
          ],
          [
            "State sales tax rate and rules",
            "Know whether your state requires sales tax in the settlement",
            "Our Sales Tax Calculator or your state department of insurance",
          ],
          [
            "Claim number and policy number",
            "Required to route the call to the correct adjuster",
            "Your original claim confirmation email",
          ],
          [
            "Your fairness score",
            "A quick benchmark before you call",
            "Our Offer Fairness Quiz (below)",
          ],
        ]}
      />

      <p>
        Before you call, take 60 seconds to score your offer:
      </p>

      <FairnessQuiz mode="mini" />

      {/* ---------------------------------------------------------------- */}
      {/* Opening the Call                                                  */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="opening-the-call">Opening the Call: Word-for-Word Script</h2>

      <p>
        Start every call by establishing key facts and confirming you are
        speaking to the right person. This also signals you are organized
        and that this is not a casual inquiry.
      </p>

      <blockquote className="border-l-4 border-coral pl-4 my-4 italic text-[#4a555e]">
        &ldquo;Hi, my name is [Your Name]. I&apos;m calling about claim number
        [Claim Number] under policy [Policy Number]. I recently received
        the total loss settlement offer and I have some questions and
        concerns I&apos;d like to walk through. Is now a good time, or should
        I schedule a call? And can you confirm that you are the adjuster
        assigned to this claim?&rdquo;
      </blockquote>

      <p>
        If the adjuster confirms they are assigned, continue. If not, ask
        to be transferred and note the name of the person you spoke to.
        Once you have the right adjuster:
      </p>

      <blockquote className="border-l-4 border-coral pl-4 my-4 italic text-[#4a555e]">
        &ldquo;I&apos;ve had a chance to review the valuation report you sent, and
        I want to make sure we&apos;re working from the same information. I
        have a few specific items I&apos;d like to address. I&apos;m also going to
        follow up this call with a written summary so we both have a
        record. Is that all right?&rdquo;
      </blockquote>

      <p>
        Announcing a follow-up written summary serves two purposes: it
        signals you are serious, and it makes the adjuster aware that the
        conversation is being recorded in some form (by you). This alone
        tends to raise the quality of the conversation.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/* Disputing the ACV                                                 */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="disputing-the-acv">
        Disputing the ACV: Scripts for Common Scenarios
      </h2>

      <p>
        The most effective disputes are specific, factual, and brief. Lead
        with your strongest point. Do not list every issue at once; address
        the most significant item first and gauge the adjuster&apos;s response.
      </p>

      <h3 id="requesting-missing-line-items">
        Requesting Missing Line Items
      </h3>

      <p>
        When sales tax or fees are missing from the offer:
      </p>

      <blockquote className="border-l-4 border-coral pl-4 my-4 italic text-[#4a555e]">
        &ldquo;I noticed that the settlement offer does not appear to include
        sales tax reimbursement. Based on [State]&apos;s insurance code and
        the [X%] combined tax rate in [County], I&apos;m calculating a sales
        tax amount of approximately [$Amount] on the replacement vehicle
        purchase. Can you confirm whether that&apos;s included in the offer,
        and if not, what the process is for adding it?&rdquo;
      </blockquote>

      <p>
        When title or registration fees are missing:
      </p>

      <blockquote className="border-l-4 border-coral pl-4 my-4 italic text-[#4a555e]">
        &ldquo;I also want to confirm whether the settlement includes title
        transfer and registration fees for a replacement vehicle. In
        [State], those typically run between $[Low] and $[High]. I have
        the DMV fee schedule here if that&apos;s helpful.&rdquo;
      </blockquote>

      <h3 id="disputing-comparables">Disputing Comparable Vehicles</h3>

      <p>
        When the comparables used are mismatched in trim, mileage, or
        geography:
      </p>

      <blockquote className="border-l-4 border-coral pl-4 my-4 italic text-[#4a555e]">
        &ldquo;Looking at the valuation report, Comparable #2 is a [Year Make
        Model Base/Lower Trim], while my vehicle was the [Your Trim].
        The [Your Trim] includes [key features: leather seats, sunroof,
        AWD, etc.] as standard equipment. The market price difference
        between these trims in [your market] is typically $[Estimated
        Difference]. I have five listings for [Your Exact Trim] within
        50 miles — would it be helpful if I emailed those over?&rdquo;
      </blockquote>

      <p>
        When comparables are from a distant or lower-priced market:
      </p>

      <blockquote className="border-l-4 border-coral pl-4 my-4 italic text-[#4a555e]">
        &ldquo;I noticed that two of the three comparables in the report are
        from [Other City/Region], which is about [X] miles from [Your
        City]. Prices in that market typically run $[Amount] lower for
        this model. I have three comparables from within 30 miles of my
        zip code that show a higher market value. Can I submit those for
        review?&rdquo;
      </blockquote>

      <p>
        When mileage adjustments appear insufficient:
      </p>

      <blockquote className="border-l-4 border-coral pl-4 my-4 italic text-[#4a555e]">
        &ldquo;My vehicle had [Your Mileage] miles at the time of loss.
        Comparable #1 has [Comp Mileage] miles &mdash; that&apos;s [Difference]
        miles more. The adjustment applied in the report was $[Adjustment],
        but typical market data suggests a [Mileage Per Mile Rate] per
        mile adjustment for this model. At [Difference] miles, that would
        be an upward adjustment of approximately $[Calculated Amount].
        How was the per-mile rate determined?&rdquo;
      </blockquote>

      {/* ---------------------------------------------------------------- */}
      {/* Phrases to Avoid                                                  */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="phrases-to-avoid">
        Phrases to Avoid in Adjuster Conversations
      </h2>

      <p>
        Certain phrases consistently undermine negotiations by making you
        seem emotional, uninformed, or easy to dismiss.
      </p>

      <DataTable
        caption="Language that hurts vs. helps in adjuster negotiations"
        headers={["Instead of saying...", "Say this instead"]}
        rows={[
          [
            "&ldquo;I know you&apos;re trying to lowball me&rdquo;",
            "&ldquo;I want to make sure the valuation reflects current market data&rdquo;",
          ],
          [
            "&ldquo;This offer is a joke / insulting&rdquo;",
            "&ldquo;The offer differs from my own market research by approximately $[Amount]&rdquo;",
          ],
          [
            "&ldquo;My car was in perfect condition&rdquo;",
            "&ldquo;The vehicle was maintained on schedule; here are the service records&rdquo;",
          ],
          [
            "&ldquo;KBB says it&apos;s worth more&rdquo;",
            "&ldquo;I have [N] comparable listings within 50 miles showing retail asking prices of $[Range]&rdquo;",
          ],
          [
            "&ldquo;I&apos;m going to sue you&rdquo;",
            "&ldquo;If we can&apos;t resolve this, I&apos;m prepared to invoke the appraisal clause in my policy&rdquo;",
          ],
          [
            "&ldquo;Everyone says your company is terrible&rdquo;",
            "(Omit entirely — it is irrelevant and counterproductive)",
          ],
          [
            "&ldquo;I really need this money now&rdquo;",
            "(Never express urgency — it signals willingness to accept less)",
          ],
          [
            "&ldquo;What can you offer me?&rdquo;",
            "&ldquo;Based on my research, a fair settlement would be $[Specific Amount]&rdquo;",
          ],
        ]}
      />

      <KeyTakeaway>
        <p>
          Never express urgency, desperation, or anger. Adjusters who
          sense urgency may slow-walk negotiations. State a specific
          number backed by evidence &mdash; &ldquo;based on comparable vehicles in
          my market, I believe a fair settlement is $[X]&rdquo; &mdash; and then
          wait in silence for a response. Silence works in your favor.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/* Escalating to a Supervisor                                        */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="escalating-to-a-supervisor">
        Escalating to a Supervisor: When and How
      </h2>

      <p>
        If an adjuster refuses to engage with your evidence or offers only
        a token increase after two rounds of negotiation, escalate
        professionally:
      </p>

      <blockquote className="border-l-4 border-coral pl-4 my-4 italic text-[#4a555e]">
        &ldquo;I appreciate your time on this, and I understand you&apos;ve
        explained the company&apos;s position. I still have concerns about
        [Specific Issue] that I haven&apos;t been able to resolve through our
        conversation. I&apos;d like to speak with your supervisor or a claims
        manager to continue this discussion. Can you transfer me, or have
        them reach out to me directly within [24–48 hours]?&rdquo;
      </blockquote>

      <p>
        If the supervisor also declines, you have two remaining escalation
        paths:
      </p>

      <ul>
        <li>
          <strong>Invoke the appraisal clause</strong> in your policy
          (see our guide on the{" "}
          <Link href="/guides/appraisal-clause-insurance" className="text-coral hover:underline">
            appraisal clause
          </Link>
          )
        </li>
        <li>
          <strong>File a complaint</strong> with your state&apos;s department
          of insurance &mdash; this is free, public record, and often
          resolves quickly
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/* Real Call Case Studies                                            */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="real-call-case-studies">
        Real Outcomes from Effective Adjuster Calls
      </h2>

      <CaseStudy
        name="Angela T."
        vehicle="2021 Jeep Wrangler Unlimited Rubicon"
        state="Colorado"
        initialOffer="$41,200"
        finalSettlement="$46,500"
        gap="+$5,300"
        narrative={
          <p>
            Angela&apos;s Wrangler was totaled in a flood event in Boulder
            County. The initial offer used Sport S comparables, not
            Rubicon. Armed with the valuation report and 6 Rubicon listings
            from Denver and Colorado Springs, Angela called her adjuster and
            opened with: &ldquo;I noticed all three comparables in the report are
            Sport S models; my vehicle is a Rubicon, which retails $7,000 to
            $9,000 above the Sport S in this market.&rdquo; She offered to email
            her comparables during the call. The adjuster requested 24 hours
            to review. The next day, the adjuster increased the offer to
            $46,500 without requiring a formal counter-offer letter. The
            call itself took 18 minutes.
          </p>
        }
      />

      <CaseStudy
        name="Marcus J."
        vehicle="2020 Nissan Altima SV"
        state="North Carolina"
        initialOffer="$17,400"
        finalSettlement="$19,200"
        gap="+$1,800"
        narrative={
          <p>
            Marcus received a $17,400 offer on his Altima after it was
            totaled in Charlotte. He noticed sales tax was missing (North
            Carolina charges 4.75%, capped at $2,500). He called his
            adjuster and read directly from the NC Department of Motor
            Vehicles fee schedule: &ldquo;Under North Carolina regulations, the
            settlement should include vehicle property tax and title
            transfer fees. I&apos;m calculating approximately $829 in sales tax
            and $267 in title and registration.&rdquo; The adjuster confirmed
            both items had been excluded and added them to the settlement
            immediately. The revised offer of $19,200 was accepted the
            same day. Total call time: 12 minutes.
          </p>
        }
      />

      <CaseStudy
        name="Diana R."
        vehicle="2019 Subaru Outback 3.6R Touring"
        state="Washington"
        initialOffer="$29,800"
        finalSettlement="$33,100"
        gap="+$3,300"
        narrative={
          <p>
            Diana&apos;s Outback was totaled in a rear-end collision in Bellevue.
            She called her adjuster and systematically addressed three issues:
            (1) two comparables were 2.5i Limited models, not the 3.6R
            Touring with its 6-cylinder engine and premium sound system;
            (2) one comparable was from Yakima, 140 miles away, where Outback
            prices average $2,400 less than the Eastside of Seattle; and (3)
            Washington state sales tax (10.2% in Bellevue) was missing. The
            adjuster pushed back on points (1) and (2), agreeing only to
            revise the Yakima comparable. Diana then sent a formal
            counter-offer letter covering all three points. The final
            settlement of $33,100 was reached after 10 days and two
            rounds of negotiation.
          </p>
        }
      />

      {/* ---------------------------------------------------------------- */}
      {/* Documenting the Call                                              */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="documenting-the-call">
        How to Document Every Adjuster Conversation
      </h2>

      <p>
        Documentation protects you if a dispute escalates. After every
        adjuster call:
      </p>

      <ul>
        <li>
          Note the date, time, adjuster&apos;s name and direct extension, and
          call duration
        </li>
        <li>
          Summarize what was discussed and any commitments made by the
          adjuster (&ldquo;adjuster agreed to review my comparables and respond
          by [Date]&rdquo;)
        </li>
        <li>
          Send a follow-up email within 2 hours: &ldquo;Per our call today, I
          wanted to confirm that [Summary of Agreement]. Please let me
          know by [Date] if I have captured anything incorrectly.&rdquo;
        </li>
        <li>
          Keep copies of every document you send or receive, including
          emails, valuation reports, counter-offer letters, and responses
        </li>
      </ul>

      <p>
        A written record strengthens your position if you later need to
        invoke the appraisal clause, file a state complaint, or
        demonstrate that the insurer failed to respond in a timely manner.
      </p>

      <p>
        If your call conversations are not producing results, move to a
        written counter-offer:
      </p>

      <CTABox
        heading="Get a counter-offer letter generated for you"
        body="ClaimCoach builds a professional counter-offer letter with your comparable data, missing line items, and state-specific legal citations — ready to send in minutes."
        href="/claims/new"
        label="Build my counter-offer"
      />

      {/* ---------------------------------------------------------------- */}
      {/* The Bottom Line                                                   */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          Effective adjuster conversations are prepared, specific, and
          professional. Come with the valuation report, your own
          comparables, and knowledge of your state&apos;s required line items.
          Open with your strongest factual point. Follow every call with a
          written summary. Never express urgency or emotion. State a
          specific number and explain exactly how you arrived at it.
          These habits alone recover an average of $1,800 more than
          improvised negotiations.
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
          <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
            Counter-Offer Letter Template
          </Link>{" "}
          &mdash; the written follow-up to a successful adjuster call
        </li>
        <li>
          <Link href="/guides/insurance-lowball-offer" className="text-coral hover:underline">
            Is Your Offer a Lowball?
          </Link>{" "}
          &mdash; identify the issues before you call
        </li>
        <li>
          <Link href="/guides/appraisal-clause-insurance" className="text-coral hover:underline">
            Using the Appraisal Clause
          </Link>{" "}
          &mdash; when calls and letters are not enough
        </li>
        <li>
          <Link href="/guides/total-loss-settlement-amount" className="text-coral hover:underline">
            How Much Should My Settlement Be?
          </Link>{" "}
          &mdash; know your target number before you pick up the phone
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/* Disclaimer                                                        */}
      {/* ---------------------------------------------------------------- */}

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational
          and educational purposes only and does not constitute legal,
          financial, or insurance advice. The scripts provided are general
          templates; adapt them to your specific situation. Settlement
          outcomes depend on the facts of each individual claim. ClaimCoach
          is not an insurance company, law firm, or licensed public
          adjuster. Consult a licensed professional in your state for
          advice specific to your situation.
        </p>
      </div>
    </>
  );
}
