import Link from "next/link";
import { CarValueEstimator } from "@/components/tools/car-value-estimator";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { DataTable } from "@/components/guides/data-table";

export const headings = [
  { id: "why-comparables-matter", text: "Why Comparable Vehicles Drive Your Settlement", level: 2 },
  { id: "where-to-find-comparables", text: "Where to Find Your Own Comparable Vehicles", level: 2 },
  { id: "what-makes-good-comparable", text: "What Makes a Good Comparable", level: 2 },
  { id: "good-vs-bad-comparable", text: "Good vs. Bad Comparable: Key Criteria", level: 3 },
  { id: "how-to-search-effectively", text: "How to Search Effectively on Each Platform", level: 2 },
  { id: "documenting-comparables", text: "Documenting and Presenting Your Comparables", level: 2 },
  { id: "how-many-comparables", text: "How Many Comparables Do You Need?", level: 2 },
  { id: "adjustments-to-expect", text: "Adjustments: What the Insurer Will Apply to Your Comparables", level: 2 },
  { id: "submitting-comparables", text: "Submitting Your Comparables in a Counter-Offer", level: 2 },
  { id: "the-bottom-line", text: "The Bottom Line", level: 2 },
  { id: "related-guides", text: "Related Guides", level: 2 },
];

export default function ComparableVehiclesTotalLoss() {
  return (
    <>
      <p>
        Your total loss settlement is built on comparable vehicle data &mdash;
        the sale listings that your insurer&apos;s valuation platform uses to
        estimate what your vehicle is worth in your local market. When those
        comparables are wrong (wrong trim, wrong geography, wrong mileage),
        your ACV is wrong. And because your insurer selects those comparables,
        you need your own. Finding, filtering, and documenting your own set of
        accurate comparables is the single most powerful step most policyholders
        can take in a total loss negotiation. This guide tells you exactly how
        to do it.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          Your own comparable vehicles are your most important evidence in a
          total loss dispute. Three to five accurate, well-matched comparables
          from the same geographic market &mdash; correct trim, similar mileage,
          same drivetrain &mdash; are usually sufficient to support a successful
          counter-offer. The goal is not to find the highest-priced listing;
          it is to find the most accurate representation of what your specific
          vehicle sells for.
        </p>
      </KeyTakeaway>

      <h2 id="why-comparables-matter">
        Why Comparable Vehicles Drive Your Settlement
      </h2>

      <p>
        Your insurer does not have an independent, objective way to determine
        what your vehicle was worth the day before the accident. They rely
        on third-party valuation platforms &mdash; CCC Intelligent Solutions,
        Mitchell International, or Audatex &mdash; that gather comparable
        vehicle listings from dealer lots, private sellers, and other market
        sources, then apply adjustments to arrive at an ACV.
      </p>

      <p>
        The accuracy of that ACV depends entirely on the accuracy of the
        comparables. If the platform selected a comparable that is the wrong
        trim level (base instead of your upgraded trim), too far away
        geographically (reflecting a different market), has significantly
        higher mileage than your vehicle, or is missing options your vehicle
        had, your ACV is understated. The platform&apos;s selection process
        is automated and imperfect. Finding and presenting better comparables
        is not cheating the system &mdash; it is giving the system more
        accurate inputs.
      </p>

      <h2 id="where-to-find-comparables">
        Where to Find Your Own Comparable Vehicles
      </h2>

      <p>
        The best sources for comparable vehicle data are the same platforms
        your insurer&apos;s valuation service draws from &mdash; plus a few
        more that provide strong market data:
      </p>

      <DataTable
        caption="Comparable vehicle search platforms and their strengths for total loss disputes"
        headers={["Platform", "Strengths", "Best For"]}
        rows={[
          [
            "Cars.com",
            "Large national inventory; detailed filter options including trim, mileage, features; consistent listing format",
            "Finding dealer-listed comparables that closely match your vehicle",
          ],
          [
            "AutoTrader",
            "Large inventory; strong geographic filtering; includes both dealer and private seller listings",
            "Broad market survey; finding price ranges for your year/make/model",
          ],
          [
            "CarGurus",
            "Price rating labels (good deal / fair deal) based on market data; shows days on market; strong mileage filtering",
            "Identifying market value range and finding listings with market-rate pricing",
          ],
          [
            "Carvana / CarMax",
            "Standardized pricing with no negotiation; inspected and certified inventory; useful as a floor for dealer retail prices",
            "Establishing a market price floor on a retail-standardized basis",
          ],
          [
            "Facebook Marketplace",
            "Real local market listings; often includes private sellers who reflect actual transaction prices",
            "Finding local market data; supplement to dealer listings",
          ],
          [
            "Bring a Trailer / Hemmings",
            "Auction results for classics and collector vehicles; actual transaction prices",
            "Classic, vintage, or collector vehicle comparables (not for standard daily drivers)",
          ],
        ]}
      />

      <h2 id="what-makes-good-comparable">
        What Makes a Good Comparable
      </h2>

      <h3 id="good-vs-bad-comparable">Good vs. Bad Comparable: Key Criteria</h3>

      <DataTable
        caption="Criteria that distinguish strong comparable vehicles from weak ones in a total loss dispute"
        headers={["Criterion", "Strong Comparable", "Weak Comparable"]}
        rows={[
          [
            "Trim level",
            "Exact same trim (e.g., EX-L vs. EX-L); all major options match",
            "Base trim substituted for a higher trim; missing key options like AWD or sunroof",
          ],
          [
            "Mileage",
            "Within 10,000–15,000 miles of your vehicle",
            "20,000–40,000+ more miles than your vehicle; each 10k miles changes value materially",
          ],
          [
            "Geography",
            "Within 50–100 miles of your location (same market)",
            "Different state or region; regional price variations make out-of-market comps inaccurate",
          ],
          [
            "Model year",
            "Same model year; ±1 year is acceptable with proper adjustment noted",
            "2+ year difference; price differences become difficult to adjust for accurately",
          ],
          [
            "Drivetrain",
            "Exact same drivetrain (AWD vs. AWD; 2WD vs. 2WD)",
            "AWD substituted for 2WD or vice versa; drivetrain differences are large value factors on trucks and SUVs",
          ],
          [
            "Condition",
            "Similar condition (clean title, no accident history, comparable wear)",
            "Vehicle with prior accidents, repaints, or noted mechanical issues",
          ],
          [
            "Listing type",
            "Dealer listing with visible VIN; recent listing (within past 30 days)",
            "Private sale with no photos or details; listing that has been active for 6+ months (suggests overpriced)",
          ],
        ]}
      />

      <h2 id="how-to-search-effectively">
        How to Search Effectively on Each Platform
      </h2>

      <p>
        The search process is the same across platforms. Start with your
        vehicle&apos;s exact year, make, model, and trim level. Apply a
        mileage range of roughly ±15,000 miles from your vehicle&apos;s
        odometer. Set a geographic radius of 50 to 100 miles from your
        zip code. If your vehicle has a specific drivetrain (AWD, 4WD,
        or a particular engine), filter for it.
      </p>

      <p>
        Sort results by price and look for the median range &mdash; not
        the highest-priced outlier. A single listing at an unusually high
        price is not a comparable; it is an outlier that your adjuster
        will dismiss. You want listings that represent the typical market
        for your vehicle. Three to five listings in a consistent price
        range are much more persuasive than a single listing.
      </p>

      <p>
        If no comparables exist within 50 miles, expand to 100 or 150 miles.
        Note the expanded geography in your counter-offer and be prepared for
        your insurer to apply a geographic adjustment. That adjustment should
        be transparent and quantifiable, not a reason to dismiss the
        comparable entirely.
      </p>

      <p>
        Be aware of seasonal price variation. Vehicle prices fluctuate
        predictably by season: convertibles and sports cars are priced higher
        in spring and summer; trucks, SUVs, and 4WD vehicles typically see
        stronger pricing in fall and winter. If your claim occurs during a
        low-demand season for your vehicle type, current listings may
        understate the typical market price. If this applies to your vehicle,
        note the seasonal context in your counter-offer and reference
        asking-price data from the higher-demand season as supporting evidence.
      </p>

      <p>
        If your vehicle is rare enough that no comparables exist in any
        reasonable geographic area &mdash; a limited-production trim, a
        heavily optioned configuration with very few examples sold, or a
        vehicle with specialized equipment &mdash; shift your evidence
        strategy. Auction results from platforms like Bring a Trailer, Mecum,
        and Barrett-Jackson document actual transaction prices for low-volume
        vehicles even when retail listings are absent. A professional appraisal
        becomes especially important in this scenario, and invoking the{" "}
        <Link href="/guides/appraisal-clause-insurance" className="text-coral hover:underline">
          appraisal clause
        </Link>{" "}
        may be the most direct path to a fair valuation when your insurer&apos;s
        platform cannot produce accurate comparables from available market data.
      </p>

      <p>
        Take screenshots of each listing with the price, mileage, location,
        and features visible in the screenshot. Include the listing URL.
        Listings disappear, and a URL that no longer works is not useful
        evidence. The screenshot is your proof.
      </p>

      <h2 id="documenting-comparables">
        Documenting and Presenting Your Comparables
      </h2>

      <p>
        When presenting comparables to your adjuster, organize them clearly:
      </p>

      <DataTable
        caption="How to document each comparable vehicle for submission to your adjuster"
        headers={["Item to Include", "Why It Matters"]}
        rows={[
          [
            "Screenshot of the full listing page",
            "Captures all details (price, mileage, location, options) in case the listing is removed",
          ],
          [
            "Listing URL",
            "Allows the adjuster to verify the listing; include even if you have a screenshot",
          ],
          [
            "Year, make, model, trim, and mileage for each comparable",
            "Allows the adjuster to see the match quality without reading the full listing",
          ],
          [
            "Listed price for each comparable",
            "The market data point you are citing",
          ],
          [
            "Geographic distance from your location",
            "Demonstrates the comparable is from the same local market",
          ],
          [
            "A note on any differences from your vehicle",
            "Proactively acknowledging a minor difference (e.g., 8,000 more miles) is more credible than ignoring it; you can note that this supports an upward adjustment",
          ],
        ]}
      />

      <h2 id="how-many-comparables">
        How Many Comparables Do You Need?
      </h2>

      <p>
        Three to five well-matched comparables are typically sufficient.
        Insurers are more likely to engage seriously with a focused set of
        accurate comparables than with a large dump of loosely matched
        listings. Quality beats quantity. If your three comparables are
        all the correct trim, within 15,000 miles of your vehicle, and
        within 75 miles of your location, that is a strong evidentiary set.
        If you submit fifteen comparables with significant trim and mileage
        variations, you give the adjuster room to pick apart individual
        entries and dismiss the whole package.
      </p>

      <h2 id="adjustments-to-expect">
        Adjustments: What the Insurer Will Apply to Your Comparables
      </h2>

      <p>
        Your insurer&apos;s adjuster will not simply accept your comparable
        prices at face value. They will apply adjustments for any differences
        between your comparables and your vehicle. Common adjustments include:
      </p>

      <DataTable
        caption="Common adjustments insurers apply to comparable vehicle listings"
        headers={["Adjustment Type", "Direction", "Notes"]}
        rows={[
          [
            "Mileage difference",
            "Positive (upward) if your vehicle had less mileage than the comparable",
            "Higher-mileage comparable supports an upward adjustment to your ACV",
          ],
          [
            "Option differences",
            "Positive or negative depending on which vehicle has more options",
            "If your comparable had fewer options than your vehicle, expect an upward adjustment",
          ],
          [
            "Geographic adjustment",
            "Positive or negative depending on whether the comparable market is higher or lower than yours",
            "Out-of-area comparables may receive a market-level adjustment",
          ],
          [
            "Condition adjustment",
            "Positive if your vehicle was in better condition than average comparable",
            "Well-documented pre-loss condition (maintenance records, clean photos) supports a favorable adjustment",
          ],
          [
            "Dealer vs. private listing",
            "Some platforms apply a negative adjustment to dealer listings reflecting negotiation off asking price",
            "Dealer asking price reflects retail; actual transaction prices may be lower",
          ],
        ]}
      />

      <p>
        Understanding that adjustments will be applied helps you present
        comparables strategically. If your comparables have slightly higher
        mileage, the adjustment is in your favor. If they have fewer options,
        make that note proactively.
      </p>

      <h2 id="submitting-comparables">
        Submitting Your Comparables in a Counter-Offer
      </h2>

      <p>
        Your comparables are supporting evidence for a written counter-offer
        to your adjuster. Do not submit them without context. A counter-offer
        letter should: identify specifically what errors exist in the
        insurer&apos;s comparables (wrong trim, too far, higher mileage);
        present your own comparables with the documentation described above;
        calculate a revised ACV based on the average of your comparables
        (or cite a specific number supported by the range); and request a
        specific response within 3 to 5 business days.
      </p>

      <p>
        See our{" "}
        <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
          counter-offer letter template
        </Link>{" "}
        for how to structure the full letter and present your evidence
        professionally.
      </p>

      <p>
        Use our value estimator to check the range for your vehicle before
        you search for comparables:
      </p>

      <CarValueEstimator />

      <CTABox
        heading="Let ClaimCoach identify the errors in your insurer's comparables"
        body="Upload your valuation report and ClaimCoach flags trim mismatches, geographic outliers, and mileage problems — then generates a counter-offer letter with corrected comparables."
        href="/claims/new"
        label="Review my valuation report"
      />

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          Finding your own comparables is the most direct way to dispute a
          low total loss offer. Three to five accurate listings &mdash; correct
          trim, similar mileage, local market &mdash; organized in a clear
          documentation package and submitted with a written counter-offer
          are usually sufficient to support a meaningful ACV increase. The
          goal is accuracy, not the highest possible price; presenting credible,
          well-matched evidence is far more effective than cherry-picking outliers.
        </p>
      </KeyTakeaway>

      <h2 id="related-guides" className="text-heading font-semibold text-black mt-10 mb-4">
        Related Guides
      </h2>

      <ul className="list-disc list-inside space-y-2 text-body text-[#4a555e] mb-6">
        <li>
          <Link href="/guides/how-to-read-valuation-report" className="text-coral hover:underline">
            How to Read Your Valuation Report
          </Link>{" "}
          &mdash; understand what errors to look for in the insurer&apos;s comparables
        </li>
        <li>
          <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
            Counter-Offer Letter Template
          </Link>{" "}
          &mdash; how to present your comparables in a formal demand
        </li>
        <li>
          <Link href="/guides/insurance-lowball-offer" className="text-coral hover:underline">
            Insurance Lowball Offer: What to Do Next
          </Link>{" "}
          &mdash; the full response strategy for a low ACV offer
        </li>
        <li>
          <Link href="/guides/appraisal-clause-insurance" className="text-coral hover:underline">
            How to Use the Appraisal Clause
          </Link>{" "}
          &mdash; if comparable negotiation fails, invoke an independent valuation
        </li>
      </ul>

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational and
          educational purposes only and does not constitute legal, financial,
          or insurance advice. Vehicle values, market conditions, and insurer
          practices vary and are subject to change. Consult a licensed
          professional in your state for advice specific to your situation.
        </p>
      </div>
    </>
  );
}
