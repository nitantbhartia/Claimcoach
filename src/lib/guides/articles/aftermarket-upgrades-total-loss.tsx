import Link from "next/link";
import { CarValueEstimator } from "@/components/tools/car-value-estimator";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { DataTable } from "@/components/guides/data-table";

export const headings = [
  { id: "factory-vs-aftermarket", text: "Factory Options vs. Aftermarket Upgrades: The Key Distinction", level: 2 },
  { id: "how-insurers-handle-factory", text: "How Insurers Handle Factory Options", level: 3 },
  { id: "how-insurers-handle-aftermarket", text: "How Insurers Handle Aftermarket Upgrades", level: 3 },
  { id: "upgrade-treatment-table", text: "Common Upgrades and How Insurers Typically Treat Them", level: 2 },
  { id: "documentation-you-need", text: "The Documentation You Need Before the Claim", level: 2 },
  { id: "custom-equipment-coverage", text: "Custom Equipment Coverage: The Add-On You May Have Missed", level: 2 },
  { id: "negotiating-upgrade-value", text: "Negotiating for Your Upgrades: A Step-by-Step Approach", level: 2 },
  { id: "the-bottom-line", text: "The Bottom Line", level: 2 },
  { id: "related-guides", text: "Related Guides", level: 2 },
];

export default function AftermarketUpgradesTotalLoss() {
  return (
    <>
      <p>
        You spent thousands customizing your car &mdash; upgraded wheels, a
        premium audio system, a lift kit, a backup camera, or a tonneau cover
        &mdash; and now it has been declared a total loss. Whether you get
        credit for those upgrades in your settlement depends on two things:
        what your policy says about custom equipment, and how well you
        documented the upgrades before the accident. This guide explains
        exactly how insurers evaluate factory options versus aftermarket
        additions, which upgrades are most commonly disputed, and how to
        build a documentation package that maximizes your recovery.
      </p>

      <CTABox />

      <KeyTakeaway>
        <p>
          Factory-installed options are generally included in your ACV
          automatically. Aftermarket upgrades are typically excluded from
          standard coverage unless you purchased a custom equipment endorsement
          or can negotiate their inclusion with documented receipts. Document
          every upgrade before you need to claim it.
        </p>
      </KeyTakeaway>

      <h2 id="factory-vs-aftermarket">
        Factory Options vs. Aftermarket Upgrades: The Key Distinction
      </h2>

      <p>
        Insurance policies draw a clear line between what came with the vehicle
        from the factory and what was added afterward. This distinction
        determines how your ACV is calculated and whether a given upgrade is
        included at all.
      </p>

      <h3 id="how-insurers-handle-factory">
        How Insurers Handle Factory Options
      </h3>

      <p>
        Factory-installed options &mdash; features that came with the vehicle
        when it left the manufacturer&apos;s assembly line &mdash; are built
        into the vehicle&apos;s trim level and VIN data. Valuation platforms
        like CCC, Mitchell, and Audatex have access to manufacturer build data
        and can identify most factory options from the VIN. If your vehicle
        came from the factory with leather seating, a sunroof, all-wheel drive,
        a premium audio system, or a towing package, those features should be
        reflected in your ACV without you needing to document them separately.
      </p>

      <p>
        However, VIN decoding is not perfect. Errors in trim level
        identification &mdash; where the report shows a base trim instead of
        your actual higher trim &mdash; are among the most common valuation
        mistakes. Always verify the trim level listed on your valuation report
        matches your actual vehicle. If it does not, this is a straightforward
        error to dispute with your adjuster. See our{" "}
        <Link href="/guides/how-to-read-valuation-report" className="text-coral hover:underline">
          guide to reading your valuation report
        </Link>{" "}
        for how to identify and correct trim-level errors.
      </p>

      <h3 id="how-insurers-handle-aftermarket">
        How Insurers Handle Aftermarket Upgrades
      </h3>

      <p>
        Aftermarket upgrades are items installed after the vehicle left the
        factory. Standard collision and comprehensive policies typically exclude
        aftermarket equipment from ACV calculations &mdash; not because the
        insurer is acting in bad faith, but because the policy language
        defines covered property as the vehicle as originally manufactured.
        Custom equipment is a separate coverage line item that must be added
        to your policy.
      </p>

      <p>
        That said, many insurers will consider aftermarket upgrades on a
        case-by-case basis if you have receipts and can demonstrate the
        upgrade added measurable market value to the vehicle. The key is
        documentation. An undocumented upgrade is nearly impossible to recover.
        A well-documented upgrade &mdash; with a purchase receipt, installation
        receipt, and photographs &mdash; at least gives you grounds for a
        negotiated inclusion.
      </p>

      <p>
        Even with documentation, recovery is usually partial. Aftermarket
        upgrades depreciate, and the insurer will typically apply a depreciation
        factor to the upgrade&apos;s original cost when calculating how much
        to credit you. The percentage varies by the type of upgrade, its age,
        and the insurer. Some upgrades &mdash; such as a custom paint job or
        aftermarket stereo &mdash; depreciate quickly; others &mdash; such as
        a performance engine or suspension lift on a truck &mdash; may retain
        more of their value.
      </p>

      <h2 id="upgrade-treatment-table">
        Common Upgrades and How Insurers Typically Treat Them
      </h2>

      <DataTable
        caption="Common aftermarket upgrades and typical insurer treatment in a total loss claim"
        headers={["Upgrade Type", "Typically Included in ACV?", "Documentation Needed", "Notes"]}
        rows={[
          [
            "Factory options (AWD, sunroof, leather, premium audio)",
            "Yes — built into VIN/trim data",
            "Verify trim level on valuation report",
            "Errors in trim identification are common; always verify",
          ],
          [
            "Aftermarket wheels and tires",
            "Not automatically — requires negotiation",
            "Purchase receipts, photos before loss",
            "High-end wheels can add meaningful value; tires depreciate quickly",
          ],
          [
            "Aftermarket audio and navigation",
            "Usually excluded without custom equipment endorsement",
            "Purchase receipt, installation receipt",
            "Factory-installed infotainment is included; aftermarket additions are not",
          ],
          [
            "Lift kits and suspension upgrades",
            "Sometimes partially included on trucks/SUVs with documentation",
            "Shop invoice, parts receipts, photos",
            "Adds market value on trucks; harder to document on sedans",
          ],
          [
            "Bed liners, tonneau covers (non-factory)",
            "Not automatically included",
            "Purchase receipt or dealer invoice",
            "Factory-offered accessories from the dealership may be documented in the original window sticker",
          ],
          [
            "Performance exhaust or engine modifications",
            "Usually excluded; may require specialty insurer",
            "Shop invoices, dyno results if applicable",
            "Standard insurers often decline; specialty collectors/enthusiast coverage may apply",
          ],
          [
            "Window tint and vinyl wrap",
            "Usually excluded",
            "Installer receipt, photos",
            "Cosmetic modifications have very limited recovery potential without custom equipment coverage",
          ],
          [
            "Backup cameras, dash cams, blind-spot systems (aftermarket)",
            "Usually excluded",
            "Purchase receipt",
            "Factory-installed safety tech is covered; aftermarket additions are typically not",
          ],
        ]}
      />

      <KeyTakeaway>
        <p>
          The single most important variable is whether you have receipts.
          An insurer cannot credit what cannot be verified. Photograph every
          upgrade, keep every receipt, and store them somewhere other than
          the vehicle.
        </p>
      </KeyTakeaway>

      <h2 id="documentation-you-need">
        The Documentation You Need Before the Claim
      </h2>

      <p>
        The best time to document your upgrades is the day you install them,
        not after an accident. If you are reading this after a loss, pull
        together what you have. If you are reading this before any accident,
        build this file now:
      </p>

      <DataTable
        caption="Documentation package for aftermarket upgrade recovery in a total loss"
        headers={["Document", "What It Proves", "Where to Get It"]}
        rows={[
          [
            "Dealer window sticker (Monroney label)",
            "Confirms all factory-installed options at purchase",
            "Your original purchase file, or request from the dealer who sold you the car",
          ],
          [
            "Purchase receipts for aftermarket parts",
            "Establishes original cost as a baseline for depreciated recovery",
            "Your email inbox, credit card records, Amazon order history",
          ],
          [
            "Installation invoices from shops",
            "Confirms the upgrade was professionally installed and the date it was added",
            "Shop records; most shops can reprint invoices",
          ],
          [
            "Pre-loss photographs showing the upgrades",
            "Visually confirms the upgrades were present and their condition before the loss",
            "Phone camera; date-stamped photos are most useful",
          ],
          [
            "Online listings of similar vehicles with same upgrades",
            "Demonstrates that the upgrades add market value recognized by buyers",
            "Cars.com, AutoTrader, CarGurus — search for your model with the specific upgrades listed",
          ],
        ]}
      />

      <p>
        If you do not have receipts, check your credit card statements and
        bank records for the purchase dates and amounts. A bank statement
        combined with a photo showing the upgrade in place before the accident
        is not as strong as a receipt, but it is better than nothing.
      </p>

      <h2 id="custom-equipment-coverage">
        Custom Equipment Coverage: The Add-On You May Have Missed
      </h2>

      <p>
        Most major insurers offer a custom equipment or custom parts and
        equipment (CPE) endorsement that explicitly covers aftermarket
        modifications up to a specified limit. If you have this endorsement
        on your policy, file the custom equipment portion of your claim
        separately from your standard total loss ACV claim.
      </p>

      <p>
        Common custom equipment coverage limits range from $1,500 to $5,000,
        though some insurers offer higher limits for a higher premium. If your
        policy includes this endorsement, read it carefully: it may define
        covered equipment specifically (audio systems, custom wheels, navigation,
        etc.), may require itemized documentation, and may apply a separate
        deductible.
      </p>

      <p>
        If you do not currently have this endorsement and your vehicle has
        meaningful aftermarket equipment, add it now. The premium cost is
        modest relative to the potential recovery gap on a total loss.
      </p>

      <h2 id="negotiating-upgrade-value">
        Negotiating for Your Upgrades: A Step-by-Step Approach
      </h2>

      <p>
        <strong>Step 1: Review your valuation report for trim errors first.</strong>{" "}
        Before arguing about aftermarket equipment, confirm the report has the
        right trim level and all factory options correctly listed. Trim-level
        corrections can recover more value than aftermarket negotiation, and
        they are easier to win.
      </p>

      <p>
        <strong>Step 2: Compile your upgrade documentation package.</strong>{" "}
        Gather receipts, photos, and installation invoices for every aftermarket
        item. Calculate the original cost of each item and estimate a reasonable
        depreciation based on age and condition.
      </p>

      <p>
        <strong>Step 3: Find market evidence that the upgrade adds value.</strong>{" "}
        Search for comparable vehicles on Cars.com, AutoTrader, or CarGurus
        that include the same upgrade and are listed at a premium over base
        models. Dealers often list truck options like lift kits and bed covers
        as features in the listing description. Screenshot those listings as
        evidence.
      </p>

      <p>
        <strong>Step 4: Submit a written request with itemized evidence.</strong>{" "}
        Write to your adjuster with a clear list: each upgrade, its original
        cost, its age, and a requested depreciated credit. Attach your receipts
        and market listings. Keep the request factual and specific.
      </p>

      <p>
        <strong>Step 5: Accept partial recovery as a reasonable outcome.</strong>{" "}
        Full recovery of aftermarket equipment costs is rare in the absence of
        a custom equipment endorsement. A partial credit &mdash; particularly
        for high-value items with solid documentation &mdash; is a common and
        reasonable outcome. The goal is to recover something you would otherwise
        receive nothing for.
      </p>

      <p>
        Use our value estimator below to check the baseline ACV for your
        vehicle before factoring in upgrades:
      </p>

      <CarValueEstimator />

      <CTABox
        heading="ClaimCoach checks your valuation report for trim errors and missing options"
        body="Upload your total loss offer and ClaimCoach identifies missing factory options, trim-level mismatches, and comparable errors — plus generates a complete counter-offer letter."
        href="/claims/new"
        label="Review my settlement offer"
      />

      <h2 id="the-bottom-line">The Bottom Line</h2>

      <KeyTakeaway>
        <p>
          Factory options are included in your ACV automatically if the
          valuation report has the correct trim level. Aftermarket upgrades
          require documentation and, ideally, a custom equipment endorsement
          to recover fully. If you have neither, a partial negotiated credit
          is possible with receipts and market evidence. Always fix trim-level
          errors in your valuation report before arguing about aftermarket
          additions &mdash; it is the higher-value target.
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
          &mdash; spot trim errors and comparable mismatches
        </li>
        <li>
          <Link href="/guides/total-loss-car-value" className="text-coral hover:underline">
            How Insurance Calculates Total Loss Car Value
          </Link>{" "}
          &mdash; how ACV is built from the ground up
        </li>
        <li>
          <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
            Counter-Offer Letter Template
          </Link>{" "}
          &mdash; how to present upgrade evidence in a formal demand
        </li>
        <li>
          <Link href="/guides/comparable-vehicles-total-loss" className="text-coral hover:underline">
            How to Find Your Own Comparable Vehicles
          </Link>{" "}
          &mdash; build market evidence to support your counter-offer
        </li>
      </ul>

      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational and
          educational purposes only and does not constitute legal, financial,
          or insurance advice. Policy terms, custom equipment coverage rules,
          and insurer practices vary and are subject to change. Consult a
          licensed professional in your state for advice specific to your
          situation.
        </p>
      </div>
    </>
  );
}
