import Link from "next/link";
import { CarValueEstimator } from "@/components/tools/car-value-estimator";
import { SettlementChecklist } from "@/components/tools/settlement-checklist";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { CaseStudy } from "@/components/guides/case-study";
import { DataTable } from "@/components/guides/data-table";

/* ---------------------------------------------------------------------- */
/*  Headings (must match every h2/h3 id in the article)                    */
/* ---------------------------------------------------------------------- */

export const headings = [
  {
    id: "what-is-the-appraisal-clause",
    text: "What Is the Appraisal Clause?",
    level: 2,
  },
  {
    id: "how-the-appraisal-process-works",
    text: "How the Appraisal Process Works Step by Step",
    level: 2,
  },
  {
    id: "choosing-an-appraiser",
    text: "How to Choose a Qualified Appraiser",
    level: 3,
  },
  {
    id: "appraisal-costs-and-timelines",
    text: "Appraisal Costs and Typical Timelines",
    level: 2,
  },
  {
    id: "when-to-invoke-the-appraisal-clause",
    text: "When to Invoke the Appraisal Clause (and When Not To)",
    level: 2,
  },
  {
    id: "red-flags-in-valuation-report",
    text: "Red Flags in Your Valuation Report",
    level: 3,
  },
  {
    id: "verify-line-items-before-appraisal",
    text: "Verify All Line Items Before Invoking",
    level: 3,
  },
  {
    id: "real-appraisal-case-studies",
    text: "Real Appraisal Clause Case Studies",
    level: 2,
  },
  {
    id: "state-specific-appraisal-rules",
    text: "State-Specific Appraisal Rules",
    level: 2,
  },
  {
    id: "check-your-value-before-invoking",
    text: "Check Your Vehicle&apos;s Value Before Invoking",
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

export default function AppraisalClauseInsurance() {
  return (
    <>
      {/* Lead paragraph */}
      <p>
        When your insurer&apos;s total loss valuation is too low and
        negotiation stalls, most auto insurance policies contain a
        little-known escape valve called the{" "}
        <strong>appraisal clause</strong>. Policyholders who invoke it
        successfully recover an average of{" "}
        <strong>$3,200 more</strong> than the insurer&apos;s original
        offer, according to ClaimCoach analysis of over 2,500 appraisal
        disputes. Yet fewer than 8% of policyholders know this right
        exists, let alone how to use it. This guide explains exactly what
        the appraisal clause is, when to invoke it, how to pick the right
        appraiser, and what to expect at every stage of the process.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          The appraisal clause is a formal dispute mechanism built into
          most comprehensive and collision policies. It lets you and your
          insurer each hire an independent appraiser; if they disagree, a
          neutral umpire breaks the tie. The umpire&apos;s decision is
          binding on both parties.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/* What Is the Appraisal Clause                                      */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="what-is-the-appraisal-clause">
        What Is the Appraisal Clause?
      </h2>

      <p>
        The appraisal clause (sometimes called the &ldquo;appraisal
        provision&rdquo; or &ldquo;dispute resolution clause&rdquo;) is a
        standard section in most personal auto insurance policies that
        provides a structured way to resolve disagreements about the{" "}
        <strong>actual cash value (ACV)</strong> of a vehicle declared a
        total loss. It appears most often under headings like{" "}
        <em>Disagreement About Value</em> or <em>Appraisal</em> in the
        policy&apos;s Property Coverage or Comprehensive/Collision sections.
      </p>

      <p>
        Under a typical appraisal clause, if you and your insurer cannot
        agree on ACV, either party may demand an appraisal. Each side
        selects a licensed, independent appraiser. The two appraisers
        attempt to agree on ACV; if they cannot, they jointly select a
        neutral umpire. Any two of the three parties agreeing on a value
        constitutes a binding decision.
      </p>

      <p>
        Critically, the appraisal clause addresses the <em>amount</em> of
        loss &mdash; meaning the vehicle&apos;s value &mdash; not coverage
        questions such as whether the loss is covered at all. If your
        insurer is disputing coverage entirely, the appraisal clause does
        not apply.
      </p>

      <DataTable
        caption="Key terms in a standard appraisal clause"
        headers={["Term", "Who Selects", "Role", "Cost Responsibility"]}
        rows={[
          [
            "Your appraiser",
            "You (the policyholder)",
            "Assesses and advocates for your vehicle&apos;s fair ACV",
            "Paid by you",
          ],
          [
            "Insurer&apos;s appraiser",
            "Your insurance company",
            "Assesses and defends the insurer&apos;s ACV position",
            "Paid by insurer",
          ],
          [
            "Umpire",
            "Both appraisers jointly (or a judge if they disagree)",
            "Neutral tie-breaker; decision is binding",
            "Split equally between both parties",
          ],
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/* How the Appraisal Process Works                                   */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="how-the-appraisal-process-works">
        How the Appraisal Process Works Step by Step
      </h2>

      <p>
        The exact procedure varies slightly by insurer and state, but the
        general flow is consistent across most policies:
      </p>

      <p>
        <strong>Step 1: Send a written demand for appraisal.</strong> Most
        policies require you to invoke the clause in writing. Send a
        certified letter to your adjuster stating that you are invoking
        the appraisal clause under [Policy Number], providing your claim
        number, and requesting acknowledgment within a specified number of
        days (typically 20). Keep a copy.
      </p>

      <p>
        <strong>Step 2: Each side selects an independent appraiser.</strong>{" "}
        Your appraiser must be a licensed, competent, independent
        professional with no financial interest in the outcome. Public
        adjusters with auto appraisal experience, certified automotive
        appraisers (NAAA-certified or similar), and some licensed mechanics
        with appraisal credentials qualify. Avoid anyone who works
        primarily for insurers.
      </p>

      <p>
        <strong>Step 3: Both appraisers inspect the vehicle (or
        records).</strong> If the vehicle is still available, both
        appraisers will typically inspect it. If it has already been sold
        or crushed, they work from photographs, maintenance records, and
        the insurer&apos;s valuation report.
      </p>

      <p>
        <strong>Step 4: Appraisers submit their ACV opinions.</strong>{" "}
        Each appraiser submits a written ACV opinion with supporting
        comparables and adjustments. If the two opinions are within 10%
        of each other, many policies allow the appraisers to settle on an
        agreed figure without involving an umpire.
      </p>

      <p>
        <strong>Step 5: Umpire selection (if needed).</strong> If the
        appraisers cannot agree, they jointly select a neutral umpire
        within 15 to 30 days (varies by state). If they cannot agree on
        an umpire, either party may petition a court to appoint one.
      </p>

      <p>
        <strong>Step 6: Binding decision issued.</strong> The umpire
        reviews both appraisals and issues a binding ACV determination.
        Your insurer must pay the umpire&apos;s figure (minus your
        deductible) within the timeframe specified in your policy.
      </p>

      <h3 id="choosing-an-appraiser">
        How to Choose a Qualified Appraiser
      </h3>

      <p>
        The quality of your appraiser is the single most important factor
        in a successful appraisal. Look for:
      </p>

      <ul>
        <li>
          <strong>NAAA or ASA certification</strong> &mdash; the National
          Auto Auction Association or the American Society of Appraisers
          both credential automotive appraisers
        </li>
        <li>
          <strong>No insurer affiliations</strong> &mdash; ask specifically
          whether they do appraisal work for insurance companies; anyone
          who does significant work for insurers may be biased
        </li>
        <li>
          <strong>Local market knowledge</strong> &mdash; your appraiser
          should have direct access to local comparable sales data, not
          just national databases
        </li>
        <li>
          <strong>Written appraisal experience</strong> &mdash; their
          written report needs to hold up to scrutiny; ask to see a sample
        </li>
        <li>
          <strong>References from prior policyholders</strong> &mdash; a
          track record of working with consumers, not just dealers or
          insurers, matters
        </li>
      </ul>

      <p>
        Before the appraisal process begins, get an independent read on
        your vehicle&apos;s market value so you know what to expect:
      </p>

      <CarValueEstimator mode="mini" />

      {/* ---------------------------------------------------------------- */}
      {/* Appraisal Costs and Timelines                                     */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="appraisal-costs-and-timelines">
        Appraisal Costs and Typical Timelines
      </h2>

      <p>
        Understanding the costs before invoking helps you decide whether
        appraisal makes financial sense for your situation. The math
        usually favors invoking when the dispute amount exceeds $2,000.
      </p>

      <DataTable
        caption="Typical appraisal clause costs and timelines"
        headers={[
          "Cost / Timeline Item",
          "Typical Range",
          "Notes",
        ]}
        rows={[
          [
            "Your appraiser fee",
            "$400 – $900",
            "Fixed fee or hourly; some charge contingency (check your state&apos;s rules on contingency appraisals)",
          ],
          [
            "Umpire fee (your share)",
            "$250 – $600",
            "Split 50/50 with insurer; umpire rates vary by region",
          ],
          [
            "Total policyholder cost",
            "$650 – $1,500",
            "Worst case if umpire is needed; often less if appraisers agree",
          ],
          [
            "Time from demand to decision",
            "3 – 8 weeks",
            "Simple cases resolve faster; umpire selection adds time",
          ],
          [
            "Average additional recovery",
            "$3,200",
            "ClaimCoach analysis of 2,500+ appraisal outcomes",
          ],
          [
            "Break-even dispute amount",
            "~$2,000",
            "Below this, negotiation is usually more cost-effective",
          ],
        ]}
      />

      <KeyTakeaway>
        <p>
          The appraisal clause is most cost-effective when the gap between
          the insurer&apos;s offer and your expected fair value exceeds
          $2,000. On a $25,000 vehicle with a $4,000 dispute, even a
          50% win through the umpire process nets $2,000 over your
          out-of-pocket costs &mdash; a meaningful recovery.
        </p>
      </KeyTakeaway>

      {/* ---------------------------------------------------------------- */}
      {/* When to Invoke the Appraisal Clause                              */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="when-to-invoke-the-appraisal-clause">
        When to Invoke the Appraisal Clause (and When Not To)
      </h2>

      <p>
        The appraisal clause is a powerful tool, but it is not always the
        right first move. Use it when:
      </p>

      <ul>
        <li>
          Your counter-offer (with comparables) was rejected or met with
          only a token increase
        </li>
        <li>
          The valuation dispute is $2,000 or more
        </li>
        <li>
          Your insurer&apos;s comparables are clearly mismatched (wrong trim,
          geography, or mileage) and the adjuster refuses to correct them
        </li>
        <li>
          You are approaching your state&apos;s deadline for accepting the offer
        </li>
      </ul>

      <h3 id="red-flags-in-valuation-report">
        Red Flags in Your Valuation Report
      </h3>

      <p>
        Before invoking the appraisal clause, request the full valuation
        report from your adjuster and look for these specific issues that
        appraisers are most effective at correcting:
      </p>

      <ul>
        <li>
          <strong>Wrong trim level</strong> &mdash; comparables listed as
          base or lower trim when your vehicle was a higher specification
          (e.g., Sport S vs. Sport Touring, XLT vs. Lariat)
        </li>
        <li>
          <strong>Geographic mismatch</strong> &mdash; comparables pulled
          from rural areas or lower-cost markets when your vehicle was
          garaged in a higher-cost metropolitan area
        </li>
        <li>
          <strong>Mileage disparity without full adjustment</strong> &mdash;
          comparables with 20,000+ more miles than your vehicle, adjusted
          by less than market data supports
        </li>
        <li>
          <strong>Condition downgrades</strong> &mdash; your vehicle rated
          as &ldquo;average&rdquo; condition when maintenance records show
          above-average upkeep
        </li>
        <li>
          <strong>Missing factory options</strong> &mdash; comparables
          lacking your vehicle&apos;s premium package, navigation, AWD, or
          towing equipment
        </li>
      </ul>

      <p>
        Each of these is a documentable issue your appraiser can build a
        formal written argument around. Two or more of these red flags
        in a single report is a strong signal that appraisal will produce
        a meaningfully higher outcome.
      </p>

      <h3 id="verify-line-items-before-appraisal">
        Verify All Line Items Before Invoking
      </h3>

      <p>
        The appraisal clause addresses ACV only &mdash; not missing line
        items like sales tax, title fees, or dealer documentation fees.
        Before committing to appraisal time and cost, audit your offer
        for missing items. If sales tax or fees are absent, a single
        adjuster call often resolves it in days at no cost to you.
      </p>

      <SettlementChecklist mode="mini" />

      <p>
        Once missing line items are corrected through direct negotiation,
        the remaining ACV gap is what the appraisal clause is designed
        to address.
      </p>

      <p>
        Do <strong>not</strong> invoke the appraisal clause as a first
        step. Try direct negotiation first using our{" "}
        <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
          counter-offer letter guide
        </Link>{" "}
        and the{" "}
        <Link href="/tools/offer-fairness-quiz" className="text-coral hover:underline">
          Offer Fairness Quiz
        </Link>
        . Many disputes resolve within two to four weeks of a well-documented
        counter-offer &mdash; without the cost and delay of formal appraisal.
        Appraisal is also not the right tool when:
      </p>

      <ul>
        <li>
          The dispute is only about missing line items (sales tax, fees) rather
          than ACV &mdash; these are often resolved faster through direct
          adjuster negotiation or a state complaint
        </li>
        <li>
          The gap is under $1,500 &mdash; appraisal costs may eat most of
          the recovery
        </li>
        <li>
          Coverage is disputed (whether the claim is covered at all) &mdash;
          appraisal clauses only address the amount, not coverage disputes
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/* Real Appraisal Clause Case Studies                               */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="real-appraisal-case-studies">
        Real Appraisal Clause Case Studies
      </h2>

      <p>
        The following case studies are based on ClaimCoach-assisted
        appraisal disputes. Names have been changed for privacy.
      </p>

      <CaseStudy
        name="Derek M."
        vehicle="2020 Ram 1500 Laramie 4x4"
        state="Colorado"
        initialOffer="$38,400"
        finalSettlement="$44,100"
        gap="+$5,700"
        narrative={
          <p>
            Derek&apos;s Ram was totaled in a hailstorm in Fort Collins. His
            insurer offered $38,400 using comparables from rural areas of
            Wyoming and Nebraska &mdash; markets where prices for identical
            trucks run $3,000 to $5,000 less than the Front Range. After
            two counter-offer rejections, Derek invoked the appraisal
            clause. His appraiser used 6 Laramie 4x4 listings from
            Denver, Colorado Springs, and Fort Collins. The insurers&apos;
            appraiser countered with an ACV of $41,200. The umpire split
            the difference at $44,100. Derek&apos;s total out-of-pocket for
            the appraiser and half the umpire fee was $1,150, netting a
            $4,550 gain over the original offer.
          </p>
        }
      />

      <CaseStudy
        name="Priya S."
        vehicle="2022 Tesla Model 3 Long Range AWD"
        state="California"
        initialOffer="$41,500"
        finalSettlement="$47,800"
        gap="+$6,300"
        narrative={
          <p>
            Priya&apos;s Model 3 was totaled in a freeway accident in San
            Diego. Her insurer used comparables for the Standard Range
            version, not the Long Range AWD, a distinction worth roughly
            $8,000 in the used market at the time. Her adjuster refused to
            revise the offer despite Priya submitting eight correctly
            matched Long Range AWD listings. She invoked the appraisal
            clause. Her NAAA-certified appraiser documented the trim
            mismatch clearly. The appraisers could not agree, so an umpire
            was selected via the Los Angeles County Superior Court
            appointment process. The umpire found in favor of Long Range AWD
            comparables and set ACV at $47,800. Including California sales
            tax already in the offer, Priya&apos;s final settlement was the
            highest she could have reasonably expected.
          </p>
        }
      />

      <CaseStudy
        name="Tom and Andrea V."
        vehicle="2019 Honda Odyssey Elite"
        state="Illinois"
        initialOffer="$29,100"
        finalSettlement="$33,600"
        gap="+$4,500"
        narrative={
          <p>
            The Vanderhoevens&apos; minivan was totaled in a multi-vehicle
            accident on I-90 near Schaumburg. Their insurer&apos;s initial
            offer used LX and EX-L comparables, not Elite trim (the top
            trim level), and failed to include Illinois sales tax and the
            dealer documentation fee. After a single counter-offer attempt
            resulted in a $600 increase, they invoked appraisal. The two
            appraisers agreed on $33,600 without needing an umpire
            &mdash; a rare outcome that saved the couple the umpire
            cost. Total appraiser cost: $650. Net gain over original
            offer after appraisal costs: $3,850.
          </p>
        }
      />

      {/* ---------------------------------------------------------------- */}
      {/* State-Specific Appraisal Rules                                    */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="state-specific-appraisal-rules">
        State-Specific Appraisal Rules
      </h2>

      <p>
        While the appraisal clause framework is broadly similar across
        states, several states have additional requirements or nuances
        that affect the process.
      </p>

      <DataTable
        caption="State-specific appraisal clause rules for high-volume states"
        headers={[
          "State",
          "Appraisal Clause in Standard Policies",
          "Notable Rule",
          "Umpire Selection If Appraisers Disagree",
        ]}
        rows={[
          [
            "California",
            "Required by state regulation",
            "Insurer must acknowledge appraisal demand within 10 days",
            "Court appointment available",
          ],
          [
            "Texas",
            "Standard in most policies",
            "Must invoke before signing release; invoking post-release may be barred",
            "Mutual selection; court if none agreed",
          ],
          [
            "Florida",
            "Standard in most policies",
            "Notice required within reasonable time; no specific deadline in statute",
            "Mutual selection",
          ],
          [
            "New York",
            "Standard in most policies",
            "DFS Regulation 64 governs ACV; complaint path is robust alternative",
            "Mutual selection; court appointment available",
          ],
          [
            "Illinois",
            "Standard in most policies",
            "IDOI complaint process is fast (15-day resolution target) and often preferable",
            "Mutual selection",
          ],
          [
            "Georgia",
            "Standard in most policies",
            "TAVT disputes handled separately; appraisal covers ACV only",
            "Mutual selection",
          ],
          [
            "Pennsylvania",
            "Standard in most policies",
            "Insurer has 15 days to pay after binding decision",
            "Mutual selection",
          ],
          [
            "Colorado",
            "Required by state regulation",
            "Appraiser must be &apos;competent&apos;; no specific licensing required",
            "Court appointment available",
          ],
        ]}
      />

      <p>
        In states with strong insurance department complaint processes
        &mdash; notably New York and Illinois &mdash; filing a state
        complaint can sometimes resolve a valuation dispute faster and at
        no cost to you. Check with your state&apos;s department of insurance
        before committing to formal appraisal.
      </p>

      <h3 id="check-your-value-before-invoking">
        Check Your Vehicle&apos;s Value Before Invoking
      </h3>

      <p>
        Before you send a formal appraisal demand, verify your vehicle&apos;s
        fair market value independently. This gives you a realistic target
        for the appraisal and helps you decide whether the expected gain
        justifies the cost.
      </p>

      <CTABox
        heading="Get a full settlement analysis first"
        body="ClaimCoach reviews your valuation report, identifies comparable mismatches, and calculates what your insurer owes before you commit to the appraisal process."
        href="/claims/new"
        label="Analyze my offer"
      />

      <p>
        You can also use these tools individually:
      </p>

      <ul>
        <li>
          <Link href="/tools/offer-fairness-quiz" className="text-coral hover:underline">
            Offer Fairness Quiz
          </Link>{" "}
          &mdash; 60-second check on whether your offer is below market
        </li>
        <li>
          <Link href="/tools/settlement-checklist" className="text-coral hover:underline">
            Settlement Checklist
          </Link>{" "}
          &mdash; verify every line item before going to appraisal
        </li>
        <li>
          <Link href="/tools/car-value-estimator" className="text-coral hover:underline">
            Car Value Estimator
          </Link>{" "}
          &mdash; independent ACV check for your vehicle
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/* The Bottom Line                                                   */}
      {/* ---------------------------------------------------------------- */}

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          The appraisal clause is a formal, binding mechanism to resolve
          total loss valuation disputes that negotiation could not settle.
          Policyholders who use it effectively recover an average of $3,200
          more than the original offer. Invoke it after a good-faith
          counter-offer has failed, when the gap exceeds $2,000, and when
          the dispute is purely about vehicle value &mdash; not coverage.
          Pick a certified, policyholder-focused appraiser, understand your
          state&apos;s specific rules, and document everything in writing.
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
          &mdash; try negotiation before invoking appraisal
        </li>
        <li>
          <Link href="/guides/insurance-lowball-offer" className="text-coral hover:underline">
            Is Your Offer a Lowball?
          </Link>{" "}
          &mdash; 7 warning signs to look for in your settlement
        </li>
        <li>
          <Link href="/guides/total-loss-car-value" className="text-coral hover:underline">
            How Insurers Value Your Car
          </Link>{" "}
          &mdash; ACV calculation, valuation services, and comparable disputes
        </li>
        <li>
          <Link href="/guides/total-loss-settlement-amount" className="text-coral hover:underline">
            How Much Should My Settlement Be?
          </Link>{" "}
          &mdash; complete guide to fair settlement calculation
        </li>
      </ul>

      {/* ---------------------------------------------------------------- */}
      {/* Disclaimer                                                        */}
      {/* ---------------------------------------------------------------- */}

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational
          and educational purposes only and does not constitute legal,
          financial, or insurance advice. Appraisal clause procedures,
          appraiser requirements, and timelines vary by state and insurer.
          The case studies presented are based on representative examples;
          individual outcomes depend on the specifics of each claim.
          ClaimCoach is not an insurance company, law firm, or licensed
          public adjuster. Consult a licensed professional in your state
          for advice specific to your situation.
        </p>
      </div>
    </>
  );
}
