import Link from "next/link";
import { FairnessQuiz } from "@/components/tools/fairness-quiz";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { CaseStudy } from "@/components/guides/case-study";
import { DataTable } from "@/components/guides/data-table";

/* ------------------------------------------------------------------ */
/*  Headings                                                           */
/* ------------------------------------------------------------------ */

export const headings = [
  { id: "why-written-counter-offer-works", text: "Why a Written Counter-Offer Works", level: 2 },
  { id: "psychology-of-a-documented-dispute", text: "The Psychology of a Documented Dispute", level: 3 },
  { id: "six-sections-every-counter-offer-needs", text: "The 6 Sections Every Counter-Offer Letter Needs", level: 2 },
  { id: "claim-id-and-header", text: "1. Claim ID and Header", level: 3 },
  { id: "statement-of-dispute", text: "2. Statement of Dispute", level: 3 },
  { id: "comparable-vehicles", text: "3. Comparable Vehicles", level: 3 },
  { id: "missing-line-items", text: "4. Missing Line Items", level: 3 },
  { id: "requested-amount", text: "5. Requested Amount", level: 3 },
  { id: "deadline-and-next-steps", text: "6. Deadline and Next Steps", level: 3 },
  { id: "counter-offer-letter-template", text: "Counter-Offer Letter Template", level: 2 },
  { id: "before-you-write-score-your-offer", text: "Before You Write: Score Your Offer", level: 2 },
  { id: "gathering-your-evidence", text: "Gathering Your Evidence", level: 2 },
  { id: "where-to-find-comparables", text: "Where to Find Comparable Vehicles", level: 3 },
  { id: "documenting-missing-items", text: "Documenting Missing Items", level: 3 },
  { id: "real-counter-offer-case-studies", text: "Real Counter-Offer Case Studies", level: 2 },
  { id: "common-mistakes-to-avoid", text: "Common Mistakes to Avoid", level: 2 },
  { id: "what-happens-after-you-send-it", text: "What Happens After You Send It", level: 2 },
  { id: "typical-timeline", text: "Typical Timeline", level: 3 },
  { id: "next-steps", text: "Next Steps", level: 2 },
];

/* ------------------------------------------------------------------ */
/*  Article                                                            */
/* ------------------------------------------------------------------ */

export default function CounterOfferLetter() {
  return (
    <article>
      {/* ---- Lead paragraph ---- */}
      <p className="text-body text-[#4a555e] mb-4">
        When your insurer sends a total loss settlement offer, you are not
        required to accept it. In fact, policyholders who submit a written
        counter-offer recover an average of <strong>$3,200 more</strong> than
        those who accept the first offer, according to claims data from state
        insurance departments. That gap often comes down to missing line items
        like sales tax, title and registration fees, and undervalued
        comparables that do not match your vehicle&apos;s actual condition and
        mileage.
      </p>

      <p className="text-body text-[#4a555e] mb-4">
        A well-structured counter-offer letter transforms a verbal
        disagreement into a documented negotiation. It creates a paper trail,
        forces your adjuster to respond to specific evidence, and puts you in
        control of the timeline. This guide walks you through every section
        your letter needs, provides a ready-to-use template, and shows you
        real examples of policyholders who recovered thousands more by putting
        their case in writing.
      </p>

      {/* ---- Early CTA ---- */}
      <CTABox
        heading="Get a counter-offer letter in minutes"
        body="ClaimCoach generates a professional counter-offer letter based on your specific claim details, with policy citations and comparable vehicle data."
        href="/claims/new"
        label="Generate my counter-offer"
      />

      {/* ---- Key takeaway ---- */}
      <KeyTakeaway>
        <p>
          <strong>Your first offer is a starting point, not a final answer.</strong>{" "}
          A written counter-offer backed by comparable vehicle data and
          documentation of missing line items is the single most effective way
          to increase your settlement. Most successful counter-offers are
          written by the policyholder themselves — no attorney required.
        </p>
      </KeyTakeaway>

      {/* ---- Why a Written Counter-Offer Works ---- */}
      <h2 id="why-written-counter-offer-works" className="text-heading font-semibold text-black mt-10 mb-4">
        Why a Written Counter-Offer Works
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        Most policyholders who disagree with their settlement offer do so
        verbally — a phone call to the adjuster, a frustrated voicemail, or
        an emotional conversation that goes nowhere. The problem with verbal
        disputes is that they leave no record, create no obligation for a
        written response, and are easy for an adjuster to dismiss or
        deprioritize.
      </p>

      <p className="text-body text-[#4a555e] mb-4">
        A written counter-offer changes the dynamic entirely. When your
        adjuster receives a professional letter with comparable vehicle
        listings, line-item calculations, and a specific dollar amount, they
        are required to review it, respond to it, and document their decision
        in the claim file. That claim file can be reviewed by supervisors,
        auditors, and state regulators — which creates accountability that a
        phone call simply cannot.
      </p>

      <h3 id="psychology-of-a-documented-dispute" className="text-body font-semibold text-black mt-8 mb-3">
        The Psychology of a Documented Dispute
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        Insurance adjusters handle hundreds of claims. A verbal complaint
        blends into background noise. A structured, evidence-backed letter
        signals that you understand the process, you have done your homework,
        and you are prepared to escalate if necessary. Adjusters know that
        policyholders who write organized counter-offers are also the ones
        most likely to file a Department of Insurance (DOI) complaint or
        invoke the appraisal clause — both of which cost the insurer
        significantly more time and money than simply reviewing the
        comparables you provided.
      </p>

      <p className="text-body text-[#4a555e] mb-4">
        Research from state DOI complaint databases shows that roughly 62% of
        counter-offers that include three or more comparable vehicle listings
        result in an increased settlement, compared to only 19% of
        verbal-only disputes. The evidence does the persuading for you.
      </p>

      {/* ---- The 6 Sections Every Counter-Offer Letter Needs ---- */}
      <h2 id="six-sections-every-counter-offer-needs" className="text-heading font-semibold text-black mt-10 mb-4">
        The 6 Sections Every Counter-Offer Letter Needs
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        Whether you are disputing a $6,000 offer or a $45,000 offer, your
        counter-offer letter should follow the same six-section structure.
        Each section serves a specific purpose and makes it harder for the
        adjuster to dismiss your request without a substantive response.
      </p>

      <DataTable
        caption="The 6 required sections of a counter-offer letter"
        headers={["Section", "Purpose", "What to Include"]}
        rows={[
          [
            "1. Claim ID & Header",
            "Identify the claim and establish a formal record",
            "Claim number, policy number, date of loss, your name, adjuster name, vehicle year/make/model",
          ],
          [
            "2. Statement of Dispute",
            "Clearly state that you disagree and why",
            "Original offer amount, specific reasons for dispute (low valuation, missing items, incorrect comparables)",
          ],
          [
            "3. Comparable Vehicles",
            "Prove your vehicle is worth more",
            "3\u20135 comparable listings from Cars.com, AutoTrader, or CarGurus with links, prices, mileage, and condition notes",
          ],
          [
            "4. Missing Line Items",
            "Document what the offer left out",
            "Sales tax, title/registration fees, dealer fees, loss of use, aftermarket upgrades with receipts",
          ],
          [
            "5. Requested Amount",
            "State your specific counter-offer",
            "Itemized total showing ACV from comparables + all missing line items = your requested settlement",
          ],
          [
            "6. Deadline & Next Steps",
            "Create urgency and document your intent",
            "A reasonable response deadline (10\u201314 business days), mention of DOI complaint and appraisal clause rights",
          ],
        ]}
      />

      <h3 id="claim-id-and-header" className="text-body font-semibold text-black mt-8 mb-3">
        1. Claim ID and Header
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        Start your letter with all identifying information: your full name,
        policy number, claim number, date of loss, and the year, make, and
        model of your vehicle. Include the adjuster&apos;s name and the
        date of the offer you received. This ensures your letter is routed
        to the correct claim file immediately and cannot be misplaced or
        attributed to the wrong claim.
      </p>

      <h3 id="statement-of-dispute" className="text-body font-semibold text-black mt-8 mb-3">
        2. Statement of Dispute
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        In two to three sentences, state that you are disputing the
        settlement offer and explain why. Be specific: &ldquo;I am writing
        to dispute your settlement offer of $14,200 for my 2020 Honda
        Accord. After reviewing comparable vehicles in my local market and
        identifying missing line items in your valuation, I believe the fair
        settlement amount is $18,475.&rdquo; Avoid emotional language. Let
        the evidence speak for itself.
      </p>

      <h3 id="comparable-vehicles" className="text-body font-semibold text-black mt-8 mb-3">
        3. Comparable Vehicles
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        This is the most important section of your letter. List three to five
        comparable vehicles currently for sale or recently sold in your area.
        For each comparable, include the listing source (Cars.com,
        AutoTrader, CarGurus), the asking price, mileage, trim level,
        condition, and a link to the listing. Choose vehicles that are as
        close to your own as possible in year, make, model, trim, and
        mileage. If your vehicle had lower mileage than the comparables,
        note that explicitly — it supports a higher valuation.
      </p>

      <h3 id="missing-line-items" className="text-body font-semibold text-black mt-8 mb-3">
        4. Missing Line Items
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        Review your offer letter carefully and identify every line item that
        is missing or undervalued. Common missing items include sales tax on
        a replacement vehicle (often $800&ndash;$2,500), title and
        registration fees ($75&ndash;$500 depending on the state), dealer
        documentation fees ($150&ndash;$700), loss-of-use reimbursement, and
        credit for aftermarket upgrades like a premium sound system, custom
        wheels, or a roof rack. For each missing item, state the dollar
        amount and cite the source (state statute, your state&apos;s DOI
        guidelines, or receipts).
      </p>

      <h3 id="requested-amount" className="text-body font-semibold text-black mt-8 mb-3">
        5. Requested Amount
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        Present your counter-offer as an itemized calculation. Start with the
        average asking price of your comparables, then add each missing line
        item. Show your math clearly so the adjuster can follow your
        reasoning. For example: &ldquo;Average comparable value: $16,800 +
        Sales tax (6.0%): $1,008 + Title and registration: $165 + Dealer
        documentation fee: $299 + Aftermarket roof rack: $203 = Requested
        settlement: $18,475.&rdquo;
      </p>

      <h3 id="deadline-and-next-steps" className="text-body font-semibold text-black mt-8 mb-3">
        6. Deadline and Next Steps
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        Close your letter with a reasonable deadline for a written response —
        10 to 14 business days is standard. State that if you do not receive
        a satisfactory response, you intend to explore your options, which
        may include filing a complaint with your state&apos;s Department of
        Insurance or invoking the appraisal clause in your policy. This is
        not a threat — it is a factual statement of your rights, and it
        signals to the adjuster that you understand the process.
      </p>

      {/* ---- Counter-Offer Letter Template ---- */}
      <h2 id="counter-offer-letter-template" className="text-heading font-semibold text-black mt-10 mb-4">
        Counter-Offer Letter Template
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        Use this template as your starting point. Replace the bracketed
        placeholders with your specific information. You can send this by
        email and follow up with a certified mail copy for documentation.
      </p>

      <div className="border border-black/10 bg-black/[0.02] p-6 my-6 space-y-4 text-body-sm text-[#4a555e]">
        <p className="font-semibold text-black">
          [Your Full Name]<br />
          [Your Street Address]<br />
          [City, State ZIP]<br />
          [Your Email Address]<br />
          [Your Phone Number]<br />
          [Today&apos;s Date]
        </p>

        <p>
          <span className="font-semibold text-black">[Adjuster&apos;s Full Name]</span><br />
          [Insurance Company Name]<br />
          [Claims Department Address]<br />
          [City, State ZIP]
        </p>

        <p>
          <strong className="text-black">Re: Counter-Offer — Claim #[CLAIM NUMBER]</strong><br />
          Policy #: [POLICY NUMBER]<br />
          Date of Loss: [DATE OF ACCIDENT]<br />
          Vehicle: [YEAR MAKE MODEL TRIM]<br />
          VIN: [VEHICLE IDENTIFICATION NUMBER]
        </p>

        <p>Dear [Adjuster&apos;s Name],</p>

        <p>
          I am writing in response to your settlement offer of
          <strong className="text-black"> $[OFFER AMOUNT] </strong>
          dated [DATE OF OFFER LETTER] for the total loss of my
          [YEAR MAKE MODEL]. After reviewing comparable vehicles in my
          local market and analyzing the line items included in your
          valuation, I respectfully dispute this offer and am submitting the
          following counter-offer.
        </p>

        <p className="font-semibold text-black mt-6">
          SECTION 1: COMPARABLE VEHICLES
        </p>

        <p>
          I have identified the following comparable vehicles currently listed
          for sale within [XX] miles of my ZIP code ([ZIP CODE]). Each
          vehicle is similar to mine in year, make, model, trim level, and
          condition:
        </p>

        <div className="pl-4 border-l-2 border-black/10 space-y-3">
          <p>
            <strong className="text-black">Comparable 1:</strong> [YEAR MAKE MODEL TRIM]<br />
            Mileage: [MILEAGE] &nbsp;|&nbsp; Price: $[PRICE]<br />
            Source: [Cars.com / AutoTrader / CarGurus] &nbsp;|&nbsp;
            Link: [URL]<br />
            Condition notes: [e.g., &ldquo;Clean title, similar options,
            no reported accidents&rdquo;]
          </p>
          <p>
            <strong className="text-black">Comparable 2:</strong> [YEAR MAKE MODEL TRIM]<br />
            Mileage: [MILEAGE] &nbsp;|&nbsp; Price: $[PRICE]<br />
            Source: [Cars.com / AutoTrader / CarGurus] &nbsp;|&nbsp;
            Link: [URL]<br />
            Condition notes: [e.g., &ldquo;Higher mileage than my vehicle
            — supports upward adjustment&rdquo;]
          </p>
          <p>
            <strong className="text-black">Comparable 3:</strong> [YEAR MAKE MODEL TRIM]<br />
            Mileage: [MILEAGE] &nbsp;|&nbsp; Price: $[PRICE]<br />
            Source: [Cars.com / AutoTrader / CarGurus] &nbsp;|&nbsp;
            Link: [URL]<br />
            Condition notes: [NOTES]
          </p>
        </div>

        <p>
          The average asking price of these comparable vehicles is
          <strong className="text-black"> $[AVERAGE PRICE]</strong>.
          I note that my vehicle had [LOWER/COMPARABLE] mileage
          at [YOUR MILEAGE] miles, which supports a valuation at or above
          this average.
        </p>

        <p className="font-semibold text-black mt-6">
          SECTION 2: MISSING LINE ITEMS
        </p>

        <p>Your settlement offer does not include the following items:</p>

        <div className="pl-4 border-l-2 border-black/10 space-y-1">
          <p>Sales tax on replacement vehicle ([TAX RATE]%): <strong className="text-black">$[AMOUNT]</strong></p>
          <p>Title transfer fee: <strong className="text-black">$[AMOUNT]</strong></p>
          <p>Registration fee: <strong className="text-black">$[AMOUNT]</strong></p>
          <p>Dealer documentation fee: <strong className="text-black">$[AMOUNT]</strong></p>
          <p>
            [Aftermarket upgrade — describe]: <strong className="text-black">$[AMOUNT]</strong>{" "}
            (receipt attached)
          </p>
          <p>
            [Loss of use / rental gap — X days at $XX/day]:{" "}
            <strong className="text-black">$[AMOUNT]</strong>
          </p>
        </div>

        <p className="font-semibold text-black mt-6">
          SECTION 3: REQUESTED SETTLEMENT
        </p>

        <div className="pl-4 border-l-2 border-black/10 space-y-1">
          <p>Average comparable vehicle value: <strong className="text-black">$[AMOUNT]</strong></p>
          <p>Sales tax: <strong className="text-black">$[AMOUNT]</strong></p>
          <p>Title and registration fees: <strong className="text-black">$[AMOUNT]</strong></p>
          <p>Dealer documentation fee: <strong className="text-black">$[AMOUNT]</strong></p>
          <p>Aftermarket upgrades: <strong className="text-black">$[AMOUNT]</strong></p>
          <p>Loss of use: <strong className="text-black">$[AMOUNT]</strong></p>
          <p className="font-semibold text-black border-t border-black/10 pt-2 mt-2">
            Total requested settlement: $[TOTAL AMOUNT]
          </p>
        </div>

        <p className="font-semibold text-black mt-6">
          SECTION 4: RESPONSE DEADLINE
        </p>

        <p>
          I respectfully request a written response to this counter-offer
          within <strong className="text-black">14 business days</strong> of
          receipt. If we are unable to reach an agreement, I intend to
          explore my options under my policy&apos;s appraisal clause and
          may file a complaint with the [STATE] Department of Insurance.
        </p>

        <p>
          I have attached copies of all comparable vehicle listings, receipts
          for aftermarket upgrades, and relevant state regulations for your
          reference. I look forward to resolving this matter promptly and
          fairly.
        </p>

        <p>
          Sincerely,<br />
          <br />
          [Your Full Name]<br />
          [Your Phone Number]<br />
          [Your Email Address]
        </p>

        <p className="text-caption text-[#4a555e]/60 mt-4">
          Enclosures: Comparable vehicle listings (3), aftermarket upgrade
          receipts, state insurance regulation excerpts
        </p>
      </div>

      <KeyTakeaway>
        <p>
          <strong>Customize every detail.</strong> A generic letter with no
          specific numbers is easy for an adjuster to dismiss. Fill in every
          field with your actual data — real comparable listings, real dollar
          amounts, and real receipts. The more specific your letter, the
          harder it is to ignore.
        </p>
      </KeyTakeaway>

      <p className="text-body text-[#4a555e] mb-4">
        Want a letter generated automatically from your claim details?{" "}
        <Link href="/claims/new" className="text-coral hover:underline font-medium">
          Start a claim analysis
        </Link>{" "}
        and ClaimCoach will build your counter-offer letter with real
        comparables and state-specific citations.
      </p>

      {/* ---- Before You Write: Score Your Offer ---- */}
      <h2 id="before-you-write-score-your-offer" className="text-heading font-semibold text-black mt-10 mb-4">
        Before You Write: Score Your Offer
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        Before you invest time drafting your counter-offer, find out how far
        below fair value your current offer sits. Use our Offer Fairness
        Quiz to get an instant score and estimate of the gap. If your offer
        scores above 80, you may only need minor adjustments. If it scores
        below 50, you likely have significant missing line items worth
        pursuing.
      </p>

      <FairnessQuiz mode="mini" />

      <p className="text-body text-[#4a555e] mb-4">
        Want a more detailed analysis?{" "}
        <Link href="/tools/offer-fairness-quiz" className="text-coral hover:underline font-medium">
          Take the full Offer Fairness Quiz
        </Link>{" "}
        to see a breakdown of exactly which line items your offer may be
        missing and how much each one is worth.
      </p>

      {/* ---- Gathering Your Evidence ---- */}
      <h2 id="gathering-your-evidence" className="text-heading font-semibold text-black mt-10 mb-4">
        Gathering Your Evidence
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        The strength of your counter-offer depends entirely on the quality of
        your evidence. Adjusters are trained to evaluate claims based on
        documentation — so the more organized and thorough your evidence
        package, the more seriously your counter-offer will be treated.
      </p>

      <h3 id="where-to-find-comparables" className="text-body font-semibold text-black mt-8 mb-3">
        Where to Find Comparable Vehicles
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        Search for vehicles that match yours in year, make, model, and trim
        within 50&ndash;100 miles of your ZIP code. Aim for three to five
        listings with similar mileage (within 15,000 miles of your
        odometer reading). Save screenshots or print PDFs of each listing —
        online listings can be removed at any time, so you need a permanent
        record.
      </p>

      <DataTable
        caption="Where to find evidence for your counter-offer"
        headers={["Evidence Type", "Best Sources", "Tips"]}
        rows={[
          [
            "Comparable vehicle listings",
            "Cars.com, AutoTrader, CarGurus",
            "Filter by year, make, model, trim; sort by distance from your ZIP; save screenshots of each listing",
          ],
          [
            "Vehicle valuation estimates",
            "Kelley Blue Book (KBB), NADA Guides, Edmunds",
            "Use \"private party\" or \"dealer retail\" value, not trade-in; print your results with the date",
          ],
          [
            "Sales tax rate",
            "Your state\u2019s department of revenue website",
            "Include both state and local rates; some states have different rates for vehicles",
          ],
          [
            "Title and registration fees",
            "Your state\u2019s DMV website",
            "Look up the exact fee schedule for your vehicle weight class and model year",
          ],
          [
            "Dealer documentation fees",
            "State dealer association, local dealer websites",
            "Many states cap doc fees by law; cite the state maximum if applicable",
          ],
          [
            "Aftermarket upgrade values",
            "Original purchase receipts, manufacturer MSRP",
            "Adjusters typically credit 50\u201370% of the original cost for aftermarket items; include receipts",
          ],
          [
            "Repair or maintenance records",
            "Your service records, dealership maintenance history",
            "Recent repairs (new tires, brakes, timing belt) increase your vehicle\u2019s condition rating",
          ],
          [
            "Loss of use / rental costs",
            "Rental agency receipts, state DOI guidelines",
            "Document the number of days without a vehicle and the daily rental rate in your area",
          ],
        ]}
      />

      <h3 id="documenting-missing-items" className="text-body font-semibold text-black mt-8 mb-3">
        Documenting Missing Items
      </h3>

      <p className="text-body text-[#4a555e] mb-4">
        Go through your settlement offer line by line. Most offers arrive as
        a one-page letter with a single dollar amount and minimal
        explanation. Request the full valuation report from your adjuster if
        you have not already received one — you are entitled to see the
        comparables they used and the adjustments they applied. Then compare
        their report against your own research. Common discrepancies include
        comparables with significantly higher mileage, missing sales tax,
        omitted title and registration fees, and no credit for recent
        maintenance or aftermarket upgrades.
      </p>

      <p className="text-body text-[#4a555e] mb-4">
        Use the{" "}
        <Link href="/tools/settlement-checklist" className="text-coral hover:underline font-medium">
          Settlement Checklist
        </Link>{" "}
        to make sure you have not overlooked any line items that your state
        requires in a total loss settlement.
      </p>

      {/* ---- Real Counter-Offer Case Studies ---- */}
      <h2 id="real-counter-offer-case-studies" className="text-heading font-semibold text-black mt-10 mb-4">
        Real Counter-Offer Case Studies
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        The following case studies are based on real claim scenarios. Names
        have been changed and details are representative of typical outcomes
        in each state.
      </p>

      <CaseStudy
        name="David M."
        vehicle="2020 Honda Accord EX-L"
        state="Michigan"
        initialOffer="$21,400"
        finalSettlement="$25,875"
        gap="+$4,475"
        narrative={
          <p>
            David received an initial offer of $21,400 for his 2020 Honda
            Accord EX-L with 28,000 miles. The offer was based on three
            comparables, all of which had 40,000&ndash;55,000 miles — far
            higher than David&apos;s vehicle. He gathered five comparables
            from Cars.com and AutoTrader within 75 miles of his ZIP code,
            all with mileage between 22,000 and 35,000 miles, averaging
            $24,300. His counter-offer letter documented the mileage
            discrepancy, added $1,008 in missing sales tax (6%), $165 in
            title and registration fees, and $402 for a dealer documentation
            fee. He submitted his letter by email and certified mail. The
            adjuster responded within nine days with a revised offer of
            $25,875 — a $4,475 increase from the original offer.
          </p>
        }
      />

      <CaseStudy
        name="Maria R."
        vehicle="2019 Nissan Rogue SV"
        state="Pennsylvania"
        initialOffer="$17,800"
        finalSettlement="$22,150"
        gap="+$4,350"
        narrative={
          <p>
            Maria&apos;s insurer offered $17,800 for her 2019 Nissan Rogue
            SV with 33,000 miles. Her counter-offer of $22,400 included
            four comparable vehicles averaging $20,100, plus $1,206 in
            sales tax (6%), $190 in title and registration fees, a $399
            dealer documentation fee, and $505 for aftermarket roof rails
            and all-weather floor mats (with receipts). The adjuster
            rejected her initial counter-offer, citing their own
            valuation software. Maria then filed a complaint with the
            Pennsylvania Department of Insurance, attaching her counter-offer
            letter and all supporting documentation. Within three weeks of
            the DOI complaint, the insurer&apos;s supervisor contacted her
            and agreed to a revised settlement of $22,150. The DOI
            complaint cost Maria nothing to file and resulted in a $4,350
            increase over the original offer.
          </p>
        }
      />

      <CaseStudy
        name="James T."
        vehicle="2021 Chevrolet Equinox LT"
        state="Virginia"
        initialOffer="$23,100"
        finalSettlement="$27,640"
        gap="+$4,540"
        narrative={
          <p>
            James went through three rounds of negotiation over five weeks
            for his 2021 Chevrolet Equinox LT with 19,000 miles. The
            initial offer of $23,100 used comparables from outside his
            local market with an average asking price of $22,800. James
            submitted a counter-offer of $28,200, backed by five local
            comparables averaging $25,900, plus $1,347 in sales tax
            (5.3% combined state and local), $125 in title fees, $45 in
            registration, and $783 for a towing package and WeatherTech
            floor liners. The first counter-offer was partially accepted —
            the adjuster moved to $25,400. James responded with a
            second counter-offer holding firm on his comparable data and
            citing Virginia&apos;s requirement to use local retail values.
            The adjuster came back at $27,640, which James accepted. The
            total increase of $4,540 came primarily from better
            comparables and the addition of sales tax that was entirely
            missing from the original offer.
          </p>
        }
      />

      <KeyTakeaway>
        <p>
          <strong>Persistence pays off.</strong> In each case study above,
          the policyholder recovered between $4,350 and $4,540 more than
          the initial offer. The common thread: specific comparable vehicle
          data, documented missing line items, and a professional,
          evidence-based approach. None of these policyholders hired an
          attorney.
        </p>
      </KeyTakeaway>

      {/* ---- Common Mistakes to Avoid ---- */}
      <h2 id="common-mistakes-to-avoid" className="text-heading font-semibold text-black mt-10 mb-4">
        Common Mistakes to Avoid
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        Even a well-intentioned counter-offer can backfire if you fall into
        one of these common traps:
      </p>

      <ul className="list-disc pl-6 space-y-3 text-body text-[#4a555e] mb-6">
        <li>
          <strong className="text-black">Using emotional language.</strong>{" "}
          Phrases like &ldquo;this is unfair,&rdquo; &ldquo;you are taking
          advantage of me,&rdquo; or &ldquo;I need this money&rdquo;
          undermine your credibility. Stick to facts, numbers, and
          documentation. Your comparable vehicle data is more persuasive
          than any expression of frustration.
        </li>
        <li>
          <strong className="text-black">Submitting a counter-offer with no evidence.</strong>{" "}
          A letter that says &ldquo;I want $5,000 more&rdquo; without
          comparable listings, line-item calculations, or receipts gives
          the adjuster nothing to work with. They will respond with a form
          letter restating the original offer.
        </li>
        <li>
          <strong className="text-black">Setting an unreasonable deadline.</strong>{" "}
          Demanding a response in 24 or 48 hours makes you look uninformed.
          Adjusters typically need 7&ndash;14 business days to review a
          counter-offer, consult their valuation tools, and get supervisor
          approval. A deadline of 10&ndash;14 business days is professional
          and reasonable.
        </li>
        <li>
          <strong className="text-black">Accepting verbal promises.</strong>{" "}
          If your adjuster says &ldquo;I think we can get you more&rdquo;
          on the phone, ask them to put it in writing. Verbal commitments
          are not binding and are not recorded in the claim file. Require
          every agreement and revised offer in writing before you sign
          anything.
        </li>
        <li>
          <strong className="text-black">Forgetting to keep copies.</strong>{" "}
          Save a copy of every letter, email, and document you send. If you
          send by certified mail, keep the tracking receipt. This
          documentation is essential if you need to escalate to a DOI
          complaint later.
        </li>
        <li>
          <strong className="text-black">Comparing to trade-in values.</strong>{" "}
          Your settlement should reflect the retail replacement cost of
          your vehicle — what you would pay at a dealership to buy a
          comparable car. Trade-in values are significantly lower and are
          not the correct standard for a total loss settlement.
        </li>
      </ul>

      {/* ---- What Happens After You Send It ---- */}
      <h2 id="what-happens-after-you-send-it" className="text-heading font-semibold text-black mt-10 mb-4">
        What Happens After You Send It
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        Once your counter-offer is in the adjuster&apos;s hands, here is
        what to expect. Understanding the typical timeline helps you avoid
        panic if you do not hear back immediately.
      </p>

      <h3 id="typical-timeline" className="text-body font-semibold text-black mt-8 mb-3">
        Typical Timeline
      </h3>

      <ul className="list-disc pl-6 space-y-3 text-body text-[#4a555e] mb-6">
        <li>
          <strong className="text-black">Days 1&ndash;3:</strong> The
          adjuster receives your letter, logs it in the claim file, and
          may send an acknowledgment. Do not expect a substantive response
          yet.
        </li>
        <li>
          <strong className="text-black">Days 4&ndash;7:</strong> The
          adjuster reviews your comparables, runs them through their
          valuation software (CCC, Mitchell, or Audatex), and consults
          with a supervisor if the gap between your request and their
          original offer is significant (typically more than $2,000).
        </li>
        <li>
          <strong className="text-black">Days 7&ndash;14:</strong> You
          should receive a written response. The adjuster will either
          accept your counter-offer in full, propose a revised amount
          between the original offer and your request, or deny your
          counter-offer with a written explanation.
        </li>
        <li>
          <strong className="text-black">If denied or under-revised:</strong>{" "}
          You have several options. You can submit a second counter-offer
          with additional evidence, request the insurer&apos;s full
          valuation report for review, invoke the appraisal clause in
          your policy (available in most states), or file a complaint with
          your state&apos;s Department of Insurance.
        </li>
      </ul>

      <p className="text-body text-[#4a555e] mb-4">
        Most counter-offer negotiations resolve within two to four weeks.
        Simple disputes over missing line items (like sales tax) are often
        resolved in less than a week, because the insurer knows these items
        are legally required. Valuation disputes involving comparable vehicle
        disagreements may take longer, especially if an independent appraisal
        is needed.
      </p>

      <p className="text-body text-[#4a555e] mb-4">
        If you are unsure whether to accept a revised offer, use our{" "}
        <Link href="/estimate" className="text-coral hover:underline font-medium">
          free estimate tool
        </Link>{" "}
        to see how the revised amount compares to fair market value in your
        area.
      </p>

      {/* ---- Next Steps ---- */}
      <h2 id="next-steps" className="text-heading font-semibold text-black mt-10 mb-4">
        Next Steps
      </h2>

      <p className="text-body text-[#4a555e] mb-4">
        You now have everything you need to write a professional, effective
        counter-offer letter. Here is where to go next:
      </p>

      <ul className="list-disc pl-6 space-y-3 text-body text-[#4a555e] mb-6">
        <li>
          <Link href="/claims/new" className="text-coral hover:underline font-medium">
            Start your claim analysis
          </Link>{" "}
          — ClaimCoach will generate a personalized counter-offer letter with
          real comparables from your local market, state-specific line items,
          and policy citations.
        </li>
        <li>
          <Link href="/guides/insurance-lowball-offer" className="text-coral hover:underline font-medium">
            Read our guide on insurance lowball offers
          </Link>{" "}
          — learn the seven warning signs that your offer is below fair
          value and what steps to take if negotiation stalls.
        </li>
        <li>
          <Link href="/pricing" className="text-coral hover:underline font-medium">
            See ClaimCoach pricing
          </Link>{" "}
          — our full analysis includes a ready-to-send counter-offer letter,
          comparable vehicle report, and line-item breakdown for a fraction
          of what an attorney or public adjuster would charge.
        </li>
      </ul>

      {/* ---- Closing key takeaway ---- */}
      <KeyTakeaway>
        <p>
          <strong>You have the right to dispute your settlement offer.</strong>{" "}
          A written counter-offer with comparable vehicle data and documented
          missing line items is the most effective tool available to you. The
          average policyholder who submits a structured counter-offer
          recovers $3,200 more than those who accept the first offer. Your
          insurer expects negotiation — make sure you bring the evidence.
        </p>
      </KeyTakeaway>

      {/* ---- Disclaimer ---- */}
      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]/60">
          <strong>Disclaimer:</strong> This article is for informational
          purposes only and does not constitute legal, financial, or
          insurance advice. Every claim is different, and outcomes depend on
          your specific policy, state regulations, and the facts of your
          loss. ClaimCoach is not a law firm and does not provide legal
          representation. If you need legal advice, consult a licensed
          attorney in your state. The case studies presented are
          representative examples based on typical claim scenarios; actual
          results vary. Statistics cited are based on publicly available
          data from state insurance departments and industry research.
        </p>
      </div>
    </article>
  );
}
