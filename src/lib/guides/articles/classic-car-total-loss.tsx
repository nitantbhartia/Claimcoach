import Link from "next/link";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { DataTable } from "@/components/guides/data-table";

export const headings = [
  { id: "why-standard-acv-fails", text: "Why Standard ACV Doesn't Work for Classic Cars", level: 2 },
  { id: "three-policy-types", text: "Three Policy Types for Classic and Collector Vehicles", level: 2 },
  { id: "agreed-value", text: "Agreed Value Policies", level: 3 },
  { id: "stated-value", text: "Stated Value Policies", level: 3 },
  { id: "standard-acv", text: "Standard ACV Policies (The Default Risk)", level: 3 },
  { id: "policy-comparison-table", text: "Policy Type Comparison", level: 2 },
  { id: "what-qualifies", text: "What Vehicles Qualify for Classic or Collector Coverage", level: 2 },
  { id: "documenting-classic-value", text: "Documenting Your Classic Car's Value", level: 2 },
  { id: "when-classic-is-totaled", text: "When Your Classic Is Declared a Total Loss", level: 2 },
  { id: "appraisal-clause-classic", text: "Using the Appraisal Clause for Classic Car Disputes", level: 2 },
  { id: "the-bottom-line", text: "The Bottom Line", level: 2 },
  { id: "related-guides", text: "Related Guides", level: 2 },
];

export default function ClassicCarTotalLoss() {
  return (
    <>
      <p>
        A classic car, vintage truck, or collector vehicle is not like a
        standard daily driver, and standard auto insurance does not treat it
        like one. If you insure a classic car on a standard policy, a total
        loss will pay you the &quot;actual cash value&quot; &mdash; a
        depreciation-based figure that may be a fraction of what your vehicle
        is actually worth to buyers in the collector market. Understanding
        the difference between agreed value, stated value, and ACV policies
        &mdash; and documenting your vehicle&apos;s value before you need it
        &mdash; can be the difference between a fair settlement and a
        devastating loss.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          Standard ACV insurance is usually wrong for classic and collector
          vehicles. An agreed value policy guarantees a specific payout with
          no depreciation and no dispute. If you are insuring a vehicle whose
          market value exceeds standard depreciation-based ACV, review your
          coverage type now &mdash; before a loss occurs.
        </p>
      </KeyTakeaway>

      <h2 id="why-standard-acv-fails">
        Why Standard ACV Doesn&apos;t Work for Classic Cars
      </h2>

      <p>
        Standard auto insurance calculates your settlement using actual cash
        value: what a willing buyer would pay for your vehicle in the open
        market, accounting for age, mileage, and depreciation. For most
        vehicles, depreciation is continuous and ACV declines over time.
        But classic and collector vehicles defy this pattern &mdash; they
        often appreciate in value as they age, and their market value is
        driven by rarity, provenance, originality, restoration quality, and
        collector demand rather than standard retail book values.
      </p>

      <p>
        The platforms insurers use to calculate ACV &mdash; CCC, Mitchell,
        and Audatex &mdash; are designed for the standard used car market.
        They rely on comparable sales from retail listings, dealer lot data,
        and trade-in guides. These platforms may produce wildly inaccurate
        valuations for a 1968 Chevelle, a 1972 Ford Bronco, or a 1955 Porsche
        356, because the comparable sales data for those vehicles in the
        collector market is not the same data these platforms pull. A standard
        ACV settlement on a classic car can leave you with a check that does
        not come close to replacing what you lost.
      </p>

      <h2 id="three-policy-types">
        Three Policy Types for Classic and Collector Vehicles
      </h2>

      <h3 id="agreed-value">Agreed Value Policies</h3>

      <p>
        An agreed value policy (also called guaranteed value) sets a specific
        insured value at the time you purchase the policy, based on an
        appraisal or documentation you provide. In the event of a total loss,
        the insurer pays exactly that agreed amount &mdash; no depreciation
        calculation, no ACV dispute, no negotiation. The agreed value is what
        you get.
      </p>

      <p>
        One important caution: do not understate your agreed value to reduce
        your premium. If your vehicle is worth $85,000 in the collector market
        but you insure it for $60,000 to save on cost, you receive only $60,000
        at total loss &mdash; a $25,000 gap created by your own policy election.
        Keep your agreed value current and accurate, and reappraise whenever
        you complete significant restoration work or when the collector market
        for your specific model shifts materially.
      </p>

      <p>
        Agreed value policies are the gold standard for classic and collector
        vehicles. They require an upfront appraisal (from a recognized classic
        car appraiser or major auction house) and periodic reappraisal as your
        vehicle&apos;s value changes. The premium is typically higher than a
        standard policy, but for a vehicle worth $40,000 to $400,000 in the
        collector market, the premium difference is usually justified.
      </p>

      <p>
        Major insurers offering agreed value classic car policies include
        Hagerty, Grundy, American Collectors, and some specialty divisions of
        larger carriers. These insurers understand the collector market and
        have established processes for agreed value claims.
      </p>

      <h3 id="stated-value">Stated Value Policies</h3>

      <p>
        A stated value policy sounds similar to an agreed value policy but
        works very differently and can be significantly less protective.
        You state a value when you purchase the policy, but most stated value
        policies include language allowing the insurer to pay the lesser of
        (1) the stated value or (2) the actual cash value at the time of loss.
        This means that in a total loss, the insurer performs an ACV
        calculation and pays the lower number &mdash; potentially far below
        what you stated.
      </p>

      <p>
        Read your stated value policy language extremely carefully. A policy
        that pays the lesser of stated value and ACV provides much weaker
        protection than agreed value coverage. Some stated value policies
        are more protective and do cap at the stated amount in a total loss
        &mdash; but you need to verify this in your specific policy, not
        assume it.
      </p>

      <h3 id="standard-acv">Standard ACV Policies (The Default Risk)</h3>

      <p>
        If your classic vehicle is insured on a standard personal auto policy
        &mdash; the same type as your daily driver &mdash; your total loss
        settlement is calculated using standard ACV methodology. For a vehicle
        that has appreciated in value or that the standard market data cannot
        accurately price, this creates a serious risk of significant
        undercompensation.
      </p>

      <p>
        Many collectors discover this problem only at the time of a loss.
        If you are currently insuring a classic, collector, or vintage vehicle
        on a standard policy, this is worth reviewing immediately. The premium
        difference for proper agreed value coverage is usually modest relative
        to the value at risk.
      </p>

      <h2 id="policy-comparison-table">Policy Type Comparison</h2>

      <DataTable
        caption="Agreed value vs. stated value vs. standard ACV for classic and collector vehicles"
        headers={["Feature", "Agreed Value", "Stated Value", "Standard ACV"]}
        rows={[
          [
            "Total loss payout",
            "Guaranteed agreed amount; no depreciation",
            "Lesser of stated amount or ACV (in most policies)",
            "ACV as calculated by insurer's valuation platform; subject to dispute",
          ],
          [
            "Depreciation applied?",
            "No",
            "Usually yes, if ACV is lower than stated",
            "Yes",
          ],
          [
            "Upfront appraisal required?",
            "Yes — required to establish agreed value",
            "No — you state the value; appraisal recommended",
            "No",
          ],
          [
            "Premium cost",
            "Higher than standard; lower risk of underpayment",
            "Varies; moderate",
            "Lowest premium; highest risk for collector vehicles",
          ],
          [
            "Best for",
            "Restored classics, high-value collectors, appreciating vehicles",
            "Vehicles where you want a ceiling but don't need guaranteed payout",
            "Standard daily drivers; inappropriate for appreciating collector vehicles",
          ],
          [
            "Dispute risk at total loss",
            "Low — agreed number is contractual",
            "Moderate — insurer may argue ACV is below stated value",
            "High — insurer's ACV methodology may significantly undervalue the vehicle",
          ],
        ]}
      />

      <h2 id="what-qualifies">
        What Vehicles Qualify for Classic or Collector Coverage
      </h2>

      <p>
        Eligibility requirements vary by insurer, but most classic car
        insurers share common criteria. Qualifying factors typically include:
      </p>

      <DataTable
        caption="Typical eligibility criteria for classic and collector car insurance policies"
        headers={["Criterion", "Typical Requirement"]}
        rows={[
          [
            "Vehicle age",
            "Most insurers require vehicles to be at least 15–25 years old; some accept newer limited-production or specialty vehicles",
          ],
          [
            "Use restrictions",
            "Pleasure/show use only, not daily driving; typically limited to 2,500–7,500 miles per year",
          ],
          [
            "Storage requirements",
            "Enclosed, locked storage when not in use (garage or covered facility)",
          ],
          [
            "Primary vehicle",
            "You must have a separate daily driver insured elsewhere",
          ],
          [
            "Driver qualifications",
            "Clean driving record; minimum age (often 25+); varies by insurer",
          ],
        ]}
      />

      <h2 id="documenting-classic-value">
        Documenting Your Classic Car&apos;s Value
      </h2>

      <p>
        Whether you have agreed value coverage or are navigating a standard
        ACV dispute, strong documentation of your vehicle&apos;s value is
        essential. For classic and collector vehicles, the documentation
        standard is more demanding than for standard vehicles:
      </p>

      <DataTable
        caption="Documentation to establish classic car value for insurance purposes"
        headers={["Document", "Value It Provides"]}
        rows={[
          [
            "Professional appraisal from a recognized appraiser",
            "The strongest evidence of market value; required for agreed value policies; useful for ACV disputes",
          ],
          [
            "Recent auction sale results for comparable vehicles",
            "Collector car auctions (Mecum, Barrett-Jackson, Bring a Trailer) document actual sale prices for comparable vehicles",
          ],
          [
            "Receipts for restoration work",
            "Documents the investment made in the vehicle and the quality of restoration",
          ],
          [
            "Photographs documenting condition",
            "Establishes pre-loss condition for classic car standard purposes",
          ],
          [
            "NCRS or judging certification (for eligible vehicles)",
            "Recognized certification programs document restoration quality and affect value",
          ],
          [
            "Original window sticker or build sheet (if available)",
            "Documents factory options and provenance, both of which affect collector value",
          ],
        ]}
      />

      <h2 id="when-classic-is-totaled">
        When Your Classic Is Declared a Total Loss
      </h2>

      <p>
        If you are reading this in the middle of an active claim and have not
        yet signed any release: do not sign anything until you have established
        value. Take these steps immediately &mdash; ideally within the first
        week of the claim: request the full valuation report in writing; contact
        a collector car appraiser (Hagerty Valuation Tools offers an online
        reference; a certified appraiser from a recognized auction house or
        classic car club is stronger for dispute purposes) and get a written
        opinion of market value; and confirm you have not been asked to sign
        a release before receiving the report. Your insurer cannot require you
        to sign before providing the valuation document. Time matters: some
        states have relatively short windows for invoking appraisal rights, so
        starting the documentation process immediately is critical.
      </p>

      <p>
        If you have an agreed value policy and your vehicle is declared a
        total loss, the process is straightforward: verify the insurer is
        paying the agreed amount, confirm no improper deductions, and complete
        the title transfer and release paperwork. Disputes on agreed value
        policies are relatively rare because the number is contractually set.
      </p>

      <p>
        If you have a standard ACV policy or a stated value policy that
        results in an ACV calculation, you are in a valuation dispute. The
        standard rules apply: request the valuation report, identify errors,
        provide your own market evidence (auction comparables, appraisals,
        comparable listings on Bring a Trailer or Hemmings), and submit a
        written counter-offer. The key is providing collector-market evidence,
        not standard retail listings &mdash; a 1969 Camaro does not trade on
        Cars.com.
      </p>

      <p>
        If your classic is repaired rather than totaled, collector market value
        after a known accident is permanently reduced &mdash; even with a
        perfect restoration-quality repair. A vehicle with documented accident
        and repair history trades for less than an equivalent vehicle with a
        clean history, and the discount in the collector market can be
        significant on desirable models. Request a diminished value assessment
        from a collector car appraiser after the repair is complete and include
        a diminished value claim as part of your settlement. First-party
        diminished value claims are recognized under some state laws (Georgia
        is a well-established example) but not universally &mdash; consult an
        attorney familiar with your state&apos;s insurance law to assess your
        specific situation.
      </p>

      <h2 id="appraisal-clause-classic">
        Using the Appraisal Clause for Classic Car Disputes
      </h2>

      <p>
        For significant valuation disputes on classic vehicles, the appraisal
        clause is a particularly valuable tool. Invoking the appraisal clause
        allows each party to hire their own appraiser &mdash; and for a
        classic vehicle, a specialist appraiser from the collector car market
        will produce a far more accurate valuation than the standard platforms
        your insurer relies on. A neutral umpire resolves any remaining
        disagreement. See our{" "}
        <Link href="/guides/appraisal-clause-insurance" className="text-coral hover:underline">
          full appraisal clause guide
        </Link>{" "}
        for the process and cost considerations.
      </p>

      <CTABox
        heading="Reviewing a total loss offer on a specialty or collector vehicle?"
        body="ClaimCoach helps identify ACV errors and prepares a counter-offer with market evidence — including how to present non-standard comparable data to your adjuster."
        href="/claims/new"
        label="Review my settlement offer"
      />

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          Agreed value coverage is the right policy for virtually every classic
          and collector vehicle. Standard ACV methodology cannot accurately
          price collector vehicles and exposes you to significant undercompensation.
          If you currently have a classic car on a standard policy, review that
          coverage now. If you are already in a total loss dispute on a classic
          vehicle, provide collector-market evidence &mdash; auction results,
          professional appraisals, and collector-specific listings &mdash; not
          standard retail comparables.
        </p>
      </KeyTakeaway>

      <h2 id="related-guides" className="text-heading font-semibold text-black mt-10 mb-4">
        Related Guides
      </h2>

      <ul className="list-disc list-inside space-y-2 text-body text-[#4a555e] mb-6">
        <li>
          <Link href="/guides/appraisal-clause-insurance" className="text-coral hover:underline">
            How to Use the Appraisal Clause
          </Link>{" "}
          &mdash; force a specialist valuation for a disputed classic car claim
        </li>
        <li>
          <Link href="/guides/how-to-read-valuation-report" className="text-coral hover:underline">
            How to Read Your Valuation Report
          </Link>{" "}
          &mdash; understand what the standard ACV report gets wrong on collector vehicles
        </li>
        <li>
          <Link href="/guides/comparable-vehicles-total-loss" className="text-coral hover:underline">
            How to Find Your Own Comparable Vehicles
          </Link>{" "}
          &mdash; build a market evidence package for your counter-offer
        </li>
        <li>
          <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
            Counter-Offer Letter Template
          </Link>{" "}
          &mdash; how to present collector-market evidence in a formal demand
        </li>
      </ul>

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational and
          educational purposes only and does not constitute legal, financial,
          or insurance advice. Policy terms, coverage eligibility, and insurer
          practices vary and are subject to change. Consult a licensed
          professional and a qualified classic car appraiser for advice specific
          to your vehicle and situation.
        </p>
      </div>
    </>
  );
}
