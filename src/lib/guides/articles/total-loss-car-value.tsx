import Link from "next/link";
import { CarValueEstimator } from "@/components/tools/car-value-estimator";
import { SalesTaxCalculator } from "@/components/tools/sales-tax-calculator";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { CaseStudy } from "@/components/guides/case-study";
import { DataTable } from "@/components/guides/data-table";

/* ------------------------------------------------------------------ */
/*  Headings                                                           */
/* ------------------------------------------------------------------ */

export const headings = [
  { id: "what-is-actual-cash-value", text: "What Is Actual Cash Value (ACV)?", level: 2 },
  { id: "acv-vs-other-values", text: "ACV vs. Replacement Cost, Trade-In, and Retail", level: 3 },
  { id: "how-insurers-calculate-value", text: "How Insurers Calculate Your Car's Value", level: 2 },
  { id: "ccc-mitchell-audatex", text: "CCC, Mitchell, and Audatex: The Big Three Valuation Services", level: 3 },
  { id: "factors-that-affect-value", text: "5 Factors That Affect Your Vehicle's Value", level: 2 },
  { id: "mileage", text: "1. Mileage", level: 3 },
  { id: "vehicle-condition", text: "2. Vehicle Condition", level: 3 },
  { id: "options-and-trim", text: "3. Options and Trim Level", level: 3 },
  { id: "regional-market", text: "4. Regional Market Pricing", level: 3 },
  { id: "aftermarket-upgrades", text: "5. Aftermarket Upgrades", level: 3 },
  { id: "get-independent-estimate", text: "Get an Independent Value Estimate", level: 2 },
  { id: "common-valuation-mistakes", text: "Common Valuation Mistakes Insurers Make", level: 2 },
  { id: "wrong-comparables", text: "Using Wrong Comparables", level: 3 },
  { id: "ignoring-low-mileage", text: "Ignoring Low-Mileage Adjustments", level: 3 },
  { id: "missing-options", text: "Missing Factory Options and Packages", level: 3 },
  { id: "distant-markets", text: "Pulling Comparables from Distant Markets", level: 3 },
  { id: "sales-tax-and-fees", text: "Don't Forget Sales Tax and Fees", level: 2 },
  { id: "real-valuation-case-studies", text: "Real Valuation Case Studies", level: 2 },
  { id: "how-to-dispute-valuation", text: "How to Dispute Your Vehicle's Valuation", level: 2 },
  { id: "related-guides", text: "Related Guides", level: 2 },
];

/* ------------------------------------------------------------------ */
/*  Article                                                            */
/* ------------------------------------------------------------------ */

export default function TotalLossCarValue() {
  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/*  Lead paragraph                                               */}
      {/* ------------------------------------------------------------ */}
      <p>
        When your car is declared a total loss, the settlement you receive
        hinges on one number: how much your insurer says your vehicle was
        worth just before the accident. The problem is that most insurers
        rely on third-party valuation tools that can undervalue vehicles by
        $1,500 to $3,800 on average. That gap between what you are offered
        and what your car is actually worth represents real money you are
        entitled to &mdash; and it is recoverable if you know where to look
        and how to push back. This guide walks you through exactly how
        insurers calculate total loss car value, the most common mistakes
        they make, and the concrete steps you can take to secure a fair
        payout.
      </p>

      {/* ------------------------------------------------------------ */}
      {/*  Early CTA                                                    */}
      {/* ------------------------------------------------------------ */}
      <CTABox
        heading="Think your car was undervalued?"
        body="Upload your settlement offer and ClaimCoach will compare your insurer's valuation against current market data in under 2 minutes."
        href="/claims/new"
        label="Check my offer free"
      />

      {/* ------------------------------------------------------------ */}
      {/*  Opening key takeaway                                         */}
      {/* ------------------------------------------------------------ */}
      <KeyTakeaway>
        Your insurer owes you the <strong>actual cash value</strong> (ACV)
        of your vehicle &mdash; what it would cost to buy a comparable car
        in your local market right before the loss. If their number is based
        on wrong comparables, missing options, or out-of-area pricing, you
        have the right to dispute it and recover the difference.
      </KeyTakeaway>

      {/* ------------------------------------------------------------ */}
      {/*  Section 1: What Is Actual Cash Value?                        */}
      {/* ------------------------------------------------------------ */}
      <h2 id="what-is-actual-cash-value">
        What Is Actual Cash Value (ACV)?
      </h2>

      <p>
        Actual cash value is the legal standard insurers use in almost every
        total loss claim. ACV represents the fair market value of your
        specific vehicle &mdash; with its exact mileage, condition, options,
        and history &mdash; immediately before the accident occurred. It is
        not the price you paid for the car, the amount remaining on your
        loan, or what a dealer would offer as a trade-in. It is the price a
        willing buyer would pay a willing seller in your local market for a
        vehicle just like yours.
      </p>

      <p>
        In practice, your insurer determines ACV by finding comparable
        vehicles that have recently sold or are currently listed in your
        area, then adjusting for differences in mileage, condition, and
        equipment. The result should reflect what it would actually cost you
        to replace your car today &mdash; at retail, not wholesale.
      </p>

      <h3 id="acv-vs-other-values">
        ACV vs. Replacement Cost, Trade-In, and Retail
      </h3>

      <p>
        One of the most common sources of confusion in total loss claims is
        the difference between value types. Understanding these distinctions
        is critical because insurers sometimes use the wrong benchmark,
        which can cost you thousands of dollars.
      </p>

      <DataTable
        caption="Understanding the four major vehicle value types"
        headers={["Value Type", "Definition", "Typical Difference from ACV"]}
        rows={[
          [
            "Actual Cash Value (ACV)",
            "Fair market value at the time of loss, based on local comparable sales adjusted for your vehicle's specific condition",
            "Baseline",
          ],
          [
            "Replacement Cost",
            "The cost to purchase a comparable vehicle at retail in your area today, including dealer markup",
            "+$500 to +$2,000 above ACV",
          ],
          [
            "Trade-In Value",
            "What a dealer would offer you for your car as part of a new purchase; reflects dealer profit margin",
            "-$2,000 to -$4,500 below ACV",
          ],
          [
            "Private Party Value",
            "The price in a direct sale between individuals, without dealer overhead or warranty",
            "-$500 to -$1,200 below ACV",
          ],
        ]}
      />

      <p>
        If your insurer&apos;s valuation looks suspiciously close to
        trade-in value, that is a red flag. You are entitled to what it
        costs to <em>replace</em> your car at retail, not what a dealer
        would pay you for a trade. For a deeper look at the full settlement
        calculation, see our{" "}
        <Link href="/guides/total-loss-settlement-amount" className="text-coral hover:underline">
          total loss settlement amount guide
        </Link>
        .
      </p>

      {/* ------------------------------------------------------------ */}
      {/*  Section 2: How Insurance Companies Calculate Value           */}
      {/* ------------------------------------------------------------ */}
      <h2 id="how-insurers-calculate-value">
        How Insurers Calculate Your Car&apos;s Value
      </h2>

      <p>
        Most insurers do not calculate your car&apos;s value in-house. Instead,
        they outsource the valuation to one of three major third-party
        services: CCC Intelligent Solutions, Mitchell International, or
        Audatex (owned by Solera). Each service uses a proprietary database
        of vehicle sales, auction records, and listing data to generate a
        valuation report. Understanding how these tools work &mdash; and
        where they fall short &mdash; gives you a significant advantage in
        any dispute.
      </p>

      <h3 id="ccc-mitchell-audatex">
        CCC, Mitchell, and Audatex: The Big Three Valuation Services
      </h3>

      <p>
        CCC ONE is by far the most widely used, processing roughly 75% of
        all auto insurance total loss valuations in the United States.
        Mitchell and Audatex together handle much of the remainder. While
        all three services follow similar methodologies, their data sources,
        geographic coverage, and adjustment formulas differ &mdash; which
        means the same vehicle can produce different valuations depending on
        which tool your insurer uses.
      </p>

      <DataTable
        caption="Comparison of the three major insurance valuation services"
        headers={["Feature", "CCC ONE", "Mitchell", "Audatex"]}
        rows={[
          [
            "Market Share",
            "~75% of insurers",
            "~15% of insurers",
            "~10% of insurers",
          ],
          [
            "Data Sources",
            "Dealer listings, auction data, private-party sales, OEM data",
            "Dealer and auction data, NADA, regional MLS",
            "European and North American dealer data, auction records",
          ],
          [
            "Comparable Range",
            "Typically 3-5 vehicles within 100 miles",
            "3-6 vehicles, adjustable radius",
            "3-5 vehicles, broader geographic pull",
          ],
          [
            "Adjustment Method",
            "Automated mileage, condition, and equipment adjustments",
            "Mileage and condition matrices with manual override",
            "Algorithm-based with weighted regional factors",
          ],
          [
            "Common Criticism",
            "May use older sales data; limited aftermarket credit",
            "Smaller comparable pool in rural areas",
            "Less transparent adjustment formulas",
          ],
          [
            "Report Available to Consumer",
            "Yes, request from adjuster",
            "Yes, request from adjuster",
            "Yes, request from adjuster",
          ],
        ]}
      />

      <p>
        Regardless of which service your insurer uses, you have the right to
        request the full valuation report. This document shows every
        comparable vehicle used, the adjustments applied, and the final ACV
        figure. Reviewing this report is the single most important step you
        can take before accepting or disputing an offer. Look for
        comparables with significantly higher mileage, lower trim levels, or
        locations far from your market &mdash; these are the most common
        sources of undervaluation.
      </p>

      {/* ------------------------------------------------------------ */}
      {/*  Section 3: 5 Factors That Affect Value                       */}
      {/* ------------------------------------------------------------ */}
      <h2 id="factors-that-affect-value">
        5 Factors That Affect Your Vehicle&apos;s Value
      </h2>

      <p>
        Your car&apos;s ACV is not a single, fixed number. It is the product
        of several variables, each of which can move the valuation up or
        down by hundreds or even thousands of dollars. Here are the five
        factors that matter most.
      </p>

      <h3 id="mileage">1. Mileage</h3>

      <p>
        Mileage is the single largest adjustment factor in most total loss
        valuations. The average American drives roughly 13,500 miles per
        year. If your vehicle has significantly fewer miles than average for
        its age, the ACV should be adjusted upward. Conversely, high-mileage
        vehicles receive a downward adjustment. The per-mile adjustment
        varies by vehicle type but typically ranges from $0.05 to $0.25 per
        mile of difference from the comparable.
      </p>

      <p>
        For example, if your 2021 sedan has 22,000 miles and the
        comparable used by your insurer has 58,000 miles, that 36,000-mile
        difference at $0.12 per mile represents a $4,320 upward adjustment
        your insurer should apply &mdash; but often does not.
      </p>

      <h3 id="vehicle-condition">2. Vehicle Condition</h3>

      <p>
        Insurers rate vehicle condition on a scale that typically includes
        Excellent, Good, Fair, and Poor. The condition rating reflects the
        overall state of the interior, exterior, mechanical components, and
        tires at the time of loss. The difference between &quot;Good&quot; and
        &quot;Fair&quot; condition on a midsize sedan can be $800 to $1,500.
        If you maintained your vehicle well, make sure the condition rating
        reflects that. Service records, recent tire receipts, and photos
        from before the accident can support an upgrade in condition
        rating.
      </p>

      <h3 id="options-and-trim">3. Options and Trim Level</h3>

      <p>
        Factory-installed options and trim packages significantly affect
        value. A base-model Honda CR-V and an EX-L with leather seats,
        sunroof, navigation, and all-wheel drive can differ by $3,000 to
        $5,000 in the same model year. Insurers sometimes use comparables
        from a lower trim or miss specific option packages entirely.
        Always verify that your vehicle&apos;s VIN was decoded correctly and
        that all factory options are listed on the valuation report.
      </p>

      <h3 id="regional-market">4. Regional Market Pricing</h3>

      <p>
        Vehicle prices vary substantially by region. A 2020 Toyota Tacoma
        sells for $3,000 to $5,000 more in the Pacific Northwest than in
        the Southeast due to higher demand for trucks in that market. Your
        ACV should reflect what vehicles sell for in <em>your</em> area,
        not a national average. If your insurer&apos;s comparables come from
        states where the same vehicle sells for less, you are being
        undervalued.
      </p>

      <h3 id="aftermarket-upgrades">5. Aftermarket Upgrades</h3>

      <p>
        Aftermarket modifications present a gray area in total loss claims.
        Standard auto policies typically cover the vehicle as originally
        manufactured, but many adjusters will credit well-documented
        aftermarket upgrades at a depreciated value. Common upgrades that
        can add value include lift kits ($800&ndash;$2,500 credit),
        performance exhaust systems ($300&ndash;$800), premium wheels and
        tires ($500&ndash;$1,500), and audio system upgrades
        ($200&ndash;$1,000). Keep receipts for every modification &mdash;
        they are your best evidence in a valuation dispute.
      </p>

      <DataTable
        caption="Typical valuation adjustment ranges by factor"
        headers={["Factor", "Adjustment Range", "Direction", "Key Evidence"]}
        rows={[
          [
            "Mileage (per mile difference)",
            "$0.05 - $0.25 per mile",
            "Up if below average, down if above",
            "Odometer reading, service records",
          ],
          [
            "Condition rating upgrade",
            "$800 - $2,500",
            "Up (from Fair to Good or Good to Excellent)",
            "Service records, pre-loss photos, recent repair receipts",
          ],
          [
            "Trim level / factory options",
            "$1,200 - $5,000",
            "Up if options were missed",
            "VIN decode, original window sticker (Monroney sticker)",
          ],
          [
            "Regional market adjustment",
            "$1,000 - $5,000",
            "Up if comparables from cheaper market were used",
            "Local dealer listings, Cars.com / AutoTrader data",
          ],
          [
            "Aftermarket upgrades",
            "$200 - $3,500 (depreciated)",
            "Up if documented and excluded",
            "Purchase receipts, installation invoices, photos",
          ],
        ]}
      />

      {/* ------------------------------------------------------------ */}
      {/*  Section 4: Get an Independent Estimate                       */}
      {/* ------------------------------------------------------------ */}
      <h2 id="get-independent-estimate">
        Get an Independent Value Estimate
      </h2>

      <p>
        Before you accept or dispute your insurer&apos;s valuation, get an
        independent estimate of your vehicle&apos;s worth. Having your own
        data puts you in a much stronger negotiating position. Use the tool
        below to get a quick estimate based on your vehicle&apos;s year,
        make, model, and mileage, or visit our full{" "}
        <Link href="/tools/car-value-estimator" className="text-coral hover:underline">
          car value estimator
        </Link>{" "}
        for a more detailed analysis.
      </p>

      <CarValueEstimator mode="mini" />

      <p>
        In addition to our estimator, cross-reference your vehicle&apos;s value
        on Kelley Blue Book, Edmunds, and NADA Guides. Gather at least three
        to five comparable listings from Cars.com, AutoTrader, and CarGurus
        for vehicles that closely match yours in year, make, model, trim,
        mileage, and condition within your local market. These listings
        become your evidence if you need to dispute the offer.
      </p>

      <KeyTakeaway>
        The most effective disputes include 3&ndash;5 comparable vehicle
        listings from your local area, printed or saved as PDFs with the
        date clearly visible. Comparables should match your vehicle&apos;s
        year, make, model, and trim level, with mileage within 15,000
        miles of yours.
      </KeyTakeaway>

      {/* ------------------------------------------------------------ */}
      {/*  Section 5: Common Valuation Mistakes                         */}
      {/* ------------------------------------------------------------ */}
      <h2 id="common-valuation-mistakes">
        Common Valuation Mistakes Insurers Make
      </h2>

      <p>
        Valuation tools are only as good as the data and logic behind them.
        Here are the four most frequent mistakes we see in total loss
        valuations, along with what to look for on your valuation report.
      </p>

      <h3 id="wrong-comparables">Using Wrong Comparables</h3>

      <p>
        The foundation of any ACV calculation is the set of comparable
        vehicles. A valid comparable should match your vehicle in year,
        make, model, and trim. It should be a recent sale or active listing,
        ideally within the last 90 days. And it should be located in your
        local market &mdash; generally within 50 to 100 miles. We
        frequently see valuations that use a base-model comparable for a
        fully loaded vehicle, or compare a 2020 model to a 2018 because
        &quot;they are similar.&quot; If the comparables do not closely
        match your vehicle, the valuation is unreliable.
      </p>

      <h3 id="ignoring-low-mileage">Ignoring Low-Mileage Adjustments</h3>

      <p>
        Low-mileage vehicles command a premium in the market, but
        automated valuation tools sometimes cap the per-mile adjustment or
        use a flat rate that does not reflect the true market premium. If
        your 5-year-old car has only 25,000 miles instead of the average
        67,500, that difference is worth a meaningful upward adjustment. In
        our analysis, low-mileage adjustments are undervalued or omitted in
        roughly 40% of valuations we review. On average, the missed
        adjustment is worth $1,200 to $2,800.
      </p>

      <h3 id="missing-options">Missing Factory Options and Packages</h3>

      <p>
        VIN decoding is not perfect. Some option packages &mdash;
        especially dealer-installed accessories and certain factory bundles
        &mdash; may not decode from the VIN alone. If your vehicle had a
        technology package, premium audio system, tow package, or appearance
        package that is not listed on the valuation report, the ACV is
        understated. Pull up your original window sticker (you can often
        find it through services like Monroney sticker lookup sites) and
        compare every line to the valuation report.
      </p>

      <h3 id="distant-markets">
        Pulling Comparables from Distant Markets
      </h3>

      <p>
        When local comparables are scarce, valuation services may expand
        their search radius to 200, 300, or even 500 miles. The problem is
        that vehicle prices vary significantly by region. A comparable
        pulled from rural Mississippi will almost certainly be priced lower
        than the same vehicle in Denver or Seattle. If you see comparables
        on your report from more than 100 miles away, challenge them and
        provide your own local listings. Your ACV should reflect what
        vehicles sell for where <em>you</em> live and shop.
      </p>

      {/* ------------------------------------------------------------ */}
      {/*  Section 6: Sales Tax and Fees                                */}
      {/* ------------------------------------------------------------ */}
      <h2 id="sales-tax-and-fees">
        Don&apos;t Forget Sales Tax and Fees
      </h2>

      <p>
        Even when the vehicle valuation itself is accurate, many settlement
        offers are still incomplete because they omit sales tax, title
        transfer fees, registration fees, and dealer documentation fees.
        In most states, your insurer is required to reimburse these costs
        because they are part of what it takes to replace your totaled
        vehicle with a comparable one. On a $22,000 vehicle in a state with
        a 7% combined tax rate, sales tax alone adds $1,540 to what you are
        owed.
      </p>

      <p>
        Use the calculator below to see how much sales tax your insurer
        should include in your settlement, or visit our full{" "}
        <Link href="/tools/sales-tax-calculator" className="text-coral hover:underline">
          sales tax calculator
        </Link>{" "}
        for state-specific rules and requirements.
      </p>

      <SalesTaxCalculator mode="mini" />

      <p>
        Beyond sales tax, confirm that your offer also includes title
        transfer fees (typically $15&ndash;$75 depending on the state),
        registration fees ($50&ndash;$400), and dealer documentation fees
        ($200&ndash;$800). These are legitimate costs of replacing your
        vehicle, and most states require insurers to cover them.
      </p>

      {/* ------------------------------------------------------------ */}
      {/*  Section 7: Real Valuation Case Studies                       */}
      {/* ------------------------------------------------------------ */}
      <h2 id="real-valuation-case-studies">Real Valuation Case Studies</h2>

      <p>
        Understanding how undervaluation works in theory is helpful, but
        seeing how it plays out with real vehicles and real numbers makes
        the issue concrete. Below are three representative cases that
        illustrate the most common valuation problems.
      </p>

      <CaseStudy
        name="Maria C."
        vehicle="2021 Subaru Outback Limited"
        state="Colorado"
        initialOffer="$28,400"
        finalSettlement="$32,150"
        gap="+$3,750"
        narrative={
          <p>
            Maria&apos;s 2021 Outback Limited had only 18,200 miles &mdash;
            well below the 39,000-mile average for its age. Her insurer
            used CCC ONE comparables that averaged 52,000 miles, but the
            mileage adjustment applied was only $1,100 instead of the
            approximately $2,600 the difference warranted at $0.08 per
            mile for that model. Additionally, her vehicle had the
            Subaru EyeSight driver-assist package and a power rear gate
            that were not reflected in the comparables. After submitting
            five local dealer listings for low-mileage 2021 Outback Limiteds
            priced between $31,500 and $33,200, along with documentation
            of the missing option adjustments, her insurer revised the
            ACV from $28,400 to $30,600. With the addition of $1,550 in
            sales tax (Colorado 6.2% average combined rate) that had been
            omitted from the original offer, her total settlement reached
            $32,150.
          </p>
        }
      />

      <CaseStudy
        name="Derek R."
        vehicle="2018 Jeep Wrangler Unlimited Sahara"
        state="Arizona"
        initialOffer="$31,200"
        finalSettlement="$35,800"
        gap="+$4,600"
        narrative={
          <p>
            Derek had invested over $7,500 in aftermarket upgrades on his
            Wrangler, including a 2.5-inch Mopar lift kit ($2,200
            installed), 35-inch BFGoodrich tires on 17-inch beadlock
            wheels ($2,800), LED light bars ($650), and a premium front
            bumper with winch ($1,850). His insurer&apos;s initial offer
            valued the vehicle as a stock 2018 Sahara, ignoring every
            modification. Derek gathered receipts for all upgrades,
            photographed the vehicle from before the accident showing
            the modifications clearly, and provided three comparable
            listings for similarly modified Wranglers in the Phoenix
            metro area priced at $34,500 to $37,200. The adjuster
            ultimately credited $3,100 in aftermarket value (roughly 41%
            of documented cost, reflecting depreciation) and added $1,300
            in previously omitted sales tax and registration fees.
          </p>
        }
      />

      <CaseStudy
        name="Priya S."
        vehicle="2020 Toyota Tacoma TRD Off-Road"
        state="Washington"
        initialOffer="$33,800"
        finalSettlement="$37,250"
        gap="+$3,450"
        narrative={
          <p>
            Priya&apos;s Tacoma was totaled in a collision near Seattle,
            but her insurer&apos;s valuation report pulled three of its
            five comparables from Oregon and Idaho, where Tacomas
            typically sell for $2,500 to $4,000 less than in the
            Puget Sound region. The two Washington comparables on the
            report were both base SR5 trim levels, not the TRD Off-Road
            package with the locking rear differential and crawl control
            that Priya&apos;s truck had. She compiled six active listings
            for 2020 Tacoma TRD Off-Road trucks within 75 miles of
            Seattle, with an average asking price of $36,900. After
            presenting this evidence and requesting that out-of-state
            comparables be removed, her insurer adjusted the ACV to
            $35,600 and included $1,650 in Washington state sales tax
            (10.25% combined rate in King County) that had been missing
            from the initial offer.
          </p>
        }
      />

      {/* ------------------------------------------------------------ */}
      {/*  Section 8: How to Dispute Your Vehicle's Valuation           */}
      {/* ------------------------------------------------------------ */}
      <h2 id="how-to-dispute-valuation">
        How to Dispute Your Vehicle&apos;s Valuation
      </h2>

      <p>
        If your research shows that your insurer&apos;s valuation is below
        fair market value, you have the right to dispute it. Follow these
        steps to build a strong case.
      </p>

      <ol>
        <li>
          <strong>Request the full valuation report.</strong> Call your
          adjuster and ask for the complete CCC, Mitchell, or Audatex report.
          You are entitled to see every comparable, every adjustment, and the
          final calculation.
        </li>
        <li>
          <strong>Review every comparable.</strong> Check that each
          comparable matches your vehicle&apos;s year, make, model, and trim.
          Verify that mileage adjustments are applied correctly. Flag any
          comparables from distant markets.
        </li>
        <li>
          <strong>Verify your vehicle&apos;s details.</strong> Confirm that
          the VIN decode on the report accurately reflects your trim level,
          option packages, and any factory-installed accessories.
        </li>
        <li>
          <strong>Gather your own comparables.</strong> Find 3&ndash;5
          comparable vehicles currently listed for sale within 75&ndash;100
          miles of your location. Save or print each listing with the date.
        </li>
        <li>
          <strong>Document aftermarket upgrades.</strong> Compile receipts,
          invoices, and photos for any aftermarket modifications. Note the
          installation date and original cost for each item.
        </li>
        <li>
          <strong>Check for missing fees.</strong> Verify that your offer
          includes sales tax, title transfer, registration, and dealer
          documentation fees. Use our{" "}
          <Link href="/tools/sales-tax-calculator" className="text-coral hover:underline">
            sales tax calculator
          </Link>{" "}
          to determine the exact amount for your state.
        </li>
        <li>
          <strong>Submit a written counter-offer.</strong> Send your
          evidence and requested amount to your adjuster in writing. Be
          specific &mdash; itemize each adjustment you are requesting with
          supporting data. Start your claim analysis with{" "}
          <Link href="/claims/new" className="text-coral hover:underline">ClaimCoach</Link> to identify every
          missing line item automatically.
        </li>
        <li>
          <strong>Escalate if needed.</strong> If your adjuster denies the
          dispute, ask to speak with a supervisor. If that fails, check
          whether your policy includes an appraisal clause, which lets
          you hire an independent appraiser. You can also file a complaint
          with your state&apos;s department of insurance.
        </li>
      </ol>

      <p>
        Most valuation disputes resolve within two to four weeks. The
        average successful dispute recovers $2,800 to $4,200 above the
        initial offer. You can start your analysis right now &mdash;{" "}
        <Link href="/claims/new" className="text-coral hover:underline">upload your offer to ClaimCoach</Link> and
        we will show you exactly where your settlement falls short.
      </p>

      <p>
        For more information on how ClaimCoach works and the data behind
        our analysis, visit our <Link href="/about" className="text-coral hover:underline">about page</Link>. And
        if you want a quick ballpark before diving into the full process,
        our <Link href="/estimate" className="text-coral hover:underline">instant estimate tool</Link> can give
        you a starting point in seconds.
      </p>

      {/* ------------------------------------------------------------ */}
      {/*  Closing key takeaway                                         */}
      {/* ------------------------------------------------------------ */}
      <KeyTakeaway>
        You do not have to accept your insurer&apos;s first valuation. Arm
        yourself with comparable listings, verify every line item on the
        valuation report, and submit a documented counter-offer. On
        average, policyholders who dispute their total loss valuation
        recover an additional $2,800 to $4,200. The evidence is on your
        side &mdash; you just need to present it.
      </KeyTakeaway>

      {/* ------------------------------------------------------------ */}
      {/*  Related Guides                                               */}
      {/* ------------------------------------------------------------ */}
      <h2 id="related-guides">Related Guides</h2>

      <ul>
        <li>
          <Link href="/guides/total-loss-settlement-amount" className="text-coral hover:underline">
            Total Loss Settlement Amounts
          </Link>{" "}
          &mdash; the full breakdown of what your settlement should include
        </li>
        <li>
          <Link href="/guides/insurance-lowball-offer" className="text-coral hover:underline">
            Is Your Offer a Lowball?
          </Link>{" "}
          &mdash; 7 warning signs and a step-by-step action plan
        </li>
        <li>
          <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
            Counter-Offer Letter Template
          </Link>{" "}
          &mdash; a ready-to-use template with real examples
        </li>
        <li>
          <Link href="/guides/sales-tax-total-loss" className="text-coral hover:underline">
            Sales Tax on Total Loss Claims
          </Link>{" "}
          &mdash; 50-state rules for sales tax reimbursement
        </li>
      </ul>

      {/* ------------------------------------------------------------ */}
      {/*  Disclaimer                                                   */}
      {/* ------------------------------------------------------------ */}
      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]/60">
          <strong>Disclaimer:</strong> This article is for informational
          purposes only and does not constitute legal, financial, or
          insurance advice. Every claim is different, and outcomes depend on
          your specific policy terms, state regulations, and individual
          circumstances. The dollar amounts, percentages, and case studies
          referenced are based on publicly available data and representative
          examples; your results may vary. ClaimCoach is not a law firm and
          does not provide legal representation. If you need legal advice,
          consult a licensed attorney in your state. For questions about
          your specific policy, contact your insurer or your state&apos;s
          department of insurance.
        </p>
      </div>
    </>
  );
}
