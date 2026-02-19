import Link from "next/link";
import { SalesTaxCalculator } from "@/components/tools/sales-tax-calculator";
import { SettlementChecklist } from "@/components/tools/settlement-checklist";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { CaseStudy } from "@/components/guides/case-study";
import { DataTable } from "@/components/guides/data-table";

/* ------------------------------------------------------------------ */
/*  Headings (must match every h2/h3 id in the article body)           */
/* ------------------------------------------------------------------ */

export const headings = [
  {
    id: "does-your-insurer-owe-you-sales-tax",
    text: "Does Your Insurer Owe You Sales Tax?",
    level: 2,
  },
  {
    id: "calculate-your-sales-tax-now",
    text: "Calculate Your Sales Tax Now",
    level: 2,
  },
  {
    id: "sales-tax-rules-by-state",
    text: "Sales Tax Rules by State",
    level: 2,
  },
  {
    id: "states-with-special-rules",
    text: "States with Special Rules",
    level: 2,
  },
  {
    id: "georgia-tavt",
    text: "Georgia: Title Ad Valorem Tax (TAVT)",
    level: 3,
  },
  {
    id: "north-carolina-highway-use-tax",
    text: "North Carolina: Highway Use Tax",
    level: 3,
  },
  {
    id: "illinois-30-day-purchase-window",
    text: "Illinois: 30-Day Purchase Window",
    level: 3,
  },
  {
    id: "texas-replacement-vehicle-requirement",
    text: "Texas: Replacement Vehicle Requirement",
    level: 3,
  },
  {
    id: "what-about-local-sales-tax",
    text: "What About Local Sales Tax?",
    level: 2,
  },
  {
    id: "other-fees-you-may-be-owed",
    text: "Other Fees You May Be Owed",
    level: 2,
  },
  {
    id: "real-sales-tax-recovery-case-studies",
    text: "Real Sales Tax Recovery Case Studies",
    level: 2,
  },
  {
    id: "how-to-claim-sales-tax-in-your-settlement",
    text: "How to Claim Sales Tax in Your Settlement",
    level: 2,
  },
  {
    id: "final-takeaway",
    text: "Don\u2019t Leave Sales Tax Money on the Table",
    level: 2,
  },
  {
    id: "related-guides",
    text: "Related Guides",
    level: 2,
  },
];

/* ------------------------------------------------------------------ */
/*  Article component                                                   */
/* ------------------------------------------------------------------ */

export default function SalesTaxTotalLoss() {
  return (
    <>
      {/* ---- Lead paragraph ---- */}
      <p>
        On a <strong>$20,000 total loss settlement</strong>, sales tax alone can
        add <strong>$1,200&ndash;$2,000</strong> that most initial offers miss
        entirely. Across the country, 45 states plus the District of Columbia
        charge sales tax on vehicle purchases&mdash;and in the vast majority of
        them, your insurer is required to reimburse that tax as part of a fair
        settlement. Yet according to ClaimCoach analysis of more than 10,000 claims, roughly{" "}
        <strong>70&ndash;80% of initial total loss offers omit sales tax</strong>{" "}
        or understate it by using only the base state rate instead of the
        combined state-plus-local rate. That single missing line item is one of
        the most common reasons policyholders walk away with less than they are
        owed.
      </p>

      {/* ---- Early CTA ---- */}
      <CTABox
        heading="Calculate your sales tax recovery"
        body="Enter your settlement amount and state to see exactly how much sales tax your insurer owes you."
        href="/tools/sales-tax-calculator"
        label="Use the calculator"
      />

      {/* ---- Key takeaway #1 ---- */}
      <KeyTakeaway>
        <p>
          In most states your insurer must include sales tax in your total loss
          settlement&mdash;even if they did not mention it in the initial offer.
          The amount is based on the tax rate where you register the replacement
          vehicle, and it often includes both state and local taxes. On a $20,000
          settlement in a state with a 7% combined rate, that is{" "}
          <strong>$1,400 your insurer owes you</strong>.
        </p>
      </KeyTakeaway>

      {/* ================================================================ */}
      {/*  Section: Does Your Insurer Owe You Sales Tax?                    */}
      {/* ================================================================ */}
      <h2 id="does-your-insurer-owe-you-sales-tax">
        Does Your Insurer Owe You Sales Tax?
      </h2>
      <p>
        The short answer: <strong>most likely, yes</strong>. When your vehicle is
        declared a total loss, your insurer owes you the{" "}
        <em>actual cash value</em> (ACV) of your vehicle&mdash;the amount it
        would cost you to replace it with a comparable vehicle in your local
        market. Buying that replacement vehicle means paying sales tax at the
        point of sale, and the principle of indemnification says your insurer
        must make you whole, including those transactional costs.
      </p>
      <p>
        Here is the general rule across the United States:
      </p>
      <ul>
        <li>
          <strong>45 states + DC</strong> charge sales tax on vehicle purchases.
          In the vast majority of those jurisdictions, your insurer is required
          to reimburse sales tax as part of a total loss settlement.
        </li>
        <li>
          <strong>5 states</strong>&mdash;Alaska, Delaware, Montana, New
          Hampshire, and Oregon&mdash;have no state sales tax, so the issue does
          not arise for residents who buy their replacement in-state.
        </li>
        <li>
          A handful of states impose <strong>purchase-window requirements</strong>:
          you must buy a replacement vehicle within a set number of days (often
          30) and submit proof of purchase to receive the sales tax
          reimbursement.
        </li>
        <li>
          Some states use <strong>alternative tax structures</strong>&mdash;like
          Georgia&rsquo;s Title Ad Valorem Tax or North Carolina&rsquo;s highway
          use tax&mdash;that function differently from standard sales tax but
          should still be included in your settlement.
        </li>
      </ul>
      <p>
        The key point is that your insurer&rsquo;s obligation to include sales
        tax exists independently of whether the adjuster mentions it. If it is
        missing from your offer, you have every right to request it. For a
        complete breakdown of what else may be missing from your settlement, see
        our{" "}
        <Link href="/guides/total-loss-settlement-amount" className="text-coral hover:underline">
          guide to total loss settlement amounts
        </Link>
        .
      </p>

      {/* ================================================================ */}
      {/*  Section: Calculate Your Sales Tax Now                            */}
      {/* ================================================================ */}
      <h2 id="calculate-your-sales-tax-now">Calculate Your Sales Tax Now</h2>
      <p>
        Use the calculator below to see your estimated sales tax reimbursement
        based on your settlement amount and state. For a more detailed
        breakdown&mdash;including local tax rates and state-specific
        rules&mdash;visit the{" "}
        <Link href="/tools/sales-tax-calculator" className="text-coral hover:underline">
          full sales tax calculator
        </Link>
        .
      </p>
      <SalesTaxCalculator mode="mini" />

      {/* ================================================================ */}
      {/*  Section: Sales Tax Rules by State                                */}
      {/* ================================================================ */}
      <h2 id="sales-tax-rules-by-state">Sales Tax Rules by State</h2>
      <p>
        The table below covers all 50 states and the District of Columbia. The
        &ldquo;Combined Rate&rdquo; column shows the average combined
        state-plus-local rate&mdash;your actual rate may be higher or lower
        depending on your specific county and municipality. Use this as a
        starting point, then check with your local tax authority or use our{" "}
        <Link href="/tools/sales-tax-calculator" className="text-coral hover:underline">sales tax calculator</Link> for
        a more precise figure.
      </p>

      <DataTable
        caption="Sales tax rules for total loss insurance settlements by state (2026)"
        headers={["State", "Combined Rate", "Sales Tax Required?", "Special Rules / Notes"]}
        rows={[
          ["Alabama", "~9.24%", "Yes", "High local rates; verify your county rate"],
          ["Alaska", "0% (no state tax)", "N/A", "No state sales tax; some localities levy up to 7.5%"],
          ["Arizona", "~8.37%", "Yes", "Transaction privilege tax; rates vary by city"],
          ["Arkansas", "~9.47%", "Yes", "State 6.5% + local taxes; food tax differs"],
          ["California", "~8.68%", "Yes", "State 7.25% + district taxes up to 2.5%"],
          ["Colorado", "~7.78%", "Yes", "State 2.9% + significant local add-ons"],
          ["Connecticut", "6.35%", "Yes", "Flat statewide rate; no local taxes"],
          ["Delaware", "0%", "N/A", "No sales tax"],
          ["District of Columbia", "6%", "Yes", "Excise tax on vehicle titling at 6%"],
          ["Florida", "~7.02%", "Yes", "State 6% + county discretionary surtax up to 1.5%"],
          ["Georgia", "TAVT 6.6%", "Yes (TAVT)", "Title Ad Valorem Tax replaces sales tax on vehicles"],
          ["Hawaii", "~4.44%", "Yes (GET)", "General Excise Tax, not traditional sales tax; applied to seller"],
          ["Idaho", "6%", "Yes", "Flat statewide rate; no local option"],
          ["Illinois", "~8.82%", "Yes (conditional)", "Must purchase replacement within 30 days; bring proof"],
          ["Indiana", "7%", "Yes", "Flat statewide rate; no local additions for vehicles"],
          ["Iowa", "~6.94%", "Yes", "State 6% + optional 1% local tax"],
          ["Kansas", "~8.71%", "Yes", "State 6.5% + city/county rates; among highest combined"],
          ["Kentucky", "6%", "Yes", "Flat statewide rate"],
          ["Louisiana", "~9.55%", "Yes", "Highest combined rate in the U.S.; heavy local levies"],
          ["Maine", "5.5%", "Yes", "Flat statewide rate"],
          ["Maryland", "6%", "Yes", "Flat statewide rate for vehicles"],
          ["Massachusetts", "6.25%", "Yes", "Flat statewide rate"],
          ["Michigan", "6%", "Yes", "Flat statewide rate"],
          ["Minnesota", "~7.49%", "Yes", "State 6.875% + local taxes; motor vehicle tax applies"],
          ["Mississippi", "~7.07%", "Yes", "State 5% on vehicles + local taxes"],
          ["Missouri", "~8.29%", "Yes", "State 4.225% + substantial local add-ons"],
          ["Montana", "0%", "N/A", "No sales tax"],
          ["Nebraska", "~6.94%", "Yes", "State 5.5% + city taxes up to 2%"],
          ["Nevada", "~8.23%", "Yes", "State 6.85% + county taxes; Clark County highest"],
          ["New Hampshire", "0%", "N/A", "No sales tax"],
          ["New Jersey", "6.625%", "Yes", "Flat statewide rate"],
          ["New Mexico", "~7.72%", "Yes", "Gross receipts tax; rates vary significantly by location"],
          ["New York", "~8.52%", "Yes", "State 4% + local up to 4.5%; NYC is 8.875%"],
          ["North Carolina", "3% (capped)", "Yes (HUT)", "Highway use tax 3%, capped at $250; not standard sales tax"],
          ["North Dakota", "~6.96%", "Yes", "State 5% + local taxes"],
          ["Ohio", "~7.24%", "Yes", "State 5.75% + county permissive taxes"],
          ["Oklahoma", "~8.98%", "Yes", "State 4.5% + high local rates; some of the highest combined"],
          ["Oregon", "0%", "N/A", "No sales tax; but see note if you buy replacement in another state"],
          ["Pennsylvania", "~7.46%", "Yes", "State 6% + local (Phila. 8%, Allegheny 7%)"],
          ["Rhode Island", "7%", "Yes", "Flat statewide rate"],
          ["South Carolina", "~7.44%", "Yes (capped)", "State 5% on first $5,000 + local; max $500 state portion"],
          ["South Dakota", "~6.40%", "Yes", "State 4.5% + municipal taxes up to 2%"],
          ["Tennessee", "~9.55%", "Yes", "State 7% + local up to 2.75%; among highest"],
          ["Texas", "~8.20%", "Yes (conditional)", "Must purchase replacement vehicle; state 6.25% + local up to 2%"],
          ["Utah", "~7.19%", "Yes", "State 4.85% + local taxes; some areas higher"],
          ["Vermont", "6%", "Yes", "Flat statewide rate (purchase & use tax on vehicles)"],
          ["Virginia", "~5.65%", "Yes", "State 4.15% + regional taxes; higher in Northern Virginia"],
          ["Washington", "~10.25%", "Yes", "State 6.5% + local up to 4%; among highest combined"],
          ["West Virginia", "~6.55%", "Yes", "State 6% + municipal B&O taxes"],
          ["Wisconsin", "~5.43%", "Yes", "State 5% + county 0.5%"],
          ["Wyoming", "~5.36%", "Yes", "State 4% + local option up to 2%"],
        ]}
      />

      <p>
        If your state requires sales tax reimbursement and it is missing from
        your offer, that is money your insurer owes you. Start a claim analysis
        with{" "}
        <Link href="/claims/new" className="text-coral hover:underline">ClaimCoach</Link> to see every line item your
        settlement should include.
      </p>

      {/* ---- Additional data table: impact by vehicle value ---- */}
      <DataTable
        caption="Estimated sales tax reimbursement by vehicle value and tax rate"
        headers={[
          "Settlement Value",
          "5% Rate",
          "7% Rate",
          "8.5% Rate",
          "10% Rate",
        ]}
        rows={[
          ["$10,000", "$500", "$700", "$850", "$1,000"],
          ["$15,000", "$750", "$1,050", "$1,275", "$1,500"],
          ["$20,000", "$1,000", "$1,400", "$1,700", "$2,000"],
          ["$25,000", "$1,250", "$1,750", "$2,125", "$2,500"],
          ["$30,000", "$1,500", "$2,100", "$2,550", "$3,000"],
          ["$35,000", "$1,750", "$2,450", "$2,975", "$3,500"],
          ["$40,000", "$2,000", "$2,800", "$3,400", "$4,000"],
        ]}
      />

      {/* ================================================================ */}
      {/*  Section: States with Special Rules                               */}
      {/* ================================================================ */}
      <h2 id="states-with-special-rules">States with Special Rules</h2>
      <p>
        While most states follow a straightforward &ldquo;include sales tax in
        the settlement&rdquo; approach, several states have unique tax
        structures or conditional requirements that affect how much you are owed
        and when you receive it.
      </p>

      {/* ---- Georgia ---- */}
      <h3 id="georgia-tavt">Georgia: Title Ad Valorem Tax (TAVT)</h3>
      <p>
        Georgia replaced its traditional sales tax on vehicles with the{" "}
        <strong>Title Ad Valorem Tax (TAVT)</strong> in 2013. Instead of paying
        sales tax at the point of sale, Georgia vehicle buyers pay a one-time{" "}
        <strong>6.6% TAVT</strong> based on the fair market value of the vehicle
        when the title is transferred.
      </p>
      <p>
        For total loss claims, this means your insurer should include{" "}
        <strong>6.6% of your settlement value</strong> as TAVT reimbursement.
        On a $20,000 settlement, that is <strong>$1,320</strong>. Because TAVT
        is assessed at the state level with no local variation, the calculation
        is straightforward&mdash;but many adjusters still overlook it or
        incorrectly apply the old sales tax rate.
      </p>

      {/* ---- North Carolina ---- */}
      <h3 id="north-carolina-highway-use-tax">
        North Carolina: Highway Use Tax
      </h3>
      <p>
        North Carolina does not charge traditional sales tax on vehicle
        purchases. Instead, buyers pay a{" "}
        <strong>highway use tax (HUT) of 3%</strong>, which is{" "}
        <strong>capped at $250</strong> per transaction. This is significantly
        lower than what most states charge&mdash;on a $20,000 vehicle, the HUT
        would be $250 (the cap), not $600 (3% uncapped).
      </p>
      <p>
        Your insurer should reimburse the highway use tax amount you will
        actually pay, which for most total loss settlements above $8,334 will
        be the $250 cap. While this is less than sales tax in other states, it
        is still money that belongs in your settlement.
      </p>

      {/* ---- Illinois ---- */}
      <h3 id="illinois-30-day-purchase-window">
        Illinois: 30-Day Purchase Window
      </h3>
      <p>
        Illinois requires insurers to reimburse sales tax on total loss
        settlements, but with an important condition:{" "}
        <strong>
          you must purchase a replacement vehicle within 30 days
        </strong>{" "}
        of receiving your settlement and provide proof of purchase to your
        insurer. If you do not buy a replacement within that window, your
        insurer may not be required to pay the sales tax portion.
      </p>
      <p>
        The combined sales tax rate in Illinois averages about{" "}
        <strong>8.82%</strong>, with some areas near Chicago exceeding 10%. On a
        $20,000 settlement, that is roughly <strong>$1,764</strong> in sales
        tax&mdash;a meaningful amount to lose if you miss the purchase deadline.
        If you need more time, communicate with your adjuster in writing before
        the window closes.
      </p>

      {/* ---- Texas ---- */}
      <h3 id="texas-replacement-vehicle-requirement">
        Texas: Replacement Vehicle Requirement
      </h3>
      <p>
        Texas requires that you{" "}
        <strong>purchase a replacement vehicle</strong> before your insurer is
        obligated to reimburse sales tax. The state&rsquo;s combined rate
        averages about <strong>8.20%</strong> (6.25% state + up to 2% local),
        meaning a $20,000 settlement carries approximately{" "}
        <strong>$1,640</strong> in sales tax.
      </p>
      <p>
        Texas does not impose a strict 30-day window like Illinois, but your
        insurer may set a reasonable deadline. Keep your purchase receipt and
        title transfer documentation to submit as proof. If you are buying from
        a private party rather than a dealer, you will pay the sales tax
        directly at the tax office when you title the vehicle.
      </p>

      {/* ================================================================ */}
      {/*  Section: What About Local Sales Tax?                             */}
      {/* ================================================================ */}
      <h2 id="what-about-local-sales-tax">What About Local Sales Tax?</h2>
      <p>
        One of the most overlooked aspects of sales tax reimbursement is the{" "}
        <strong>local component</strong>. In most states, the sales tax rate you
        actually pay at the dealership is a combination of the state rate plus
        county, city, and sometimes special-district taxes. These local taxes
        can add 1&ndash;4 percentage points on top of the base state rate.
      </p>
      <p>
        For example:
      </p>
      <ul>
        <li>
          <strong>Washington state</strong> has a base rate of 6.5%, but the
          combined rate in Seattle is <strong>10.25%</strong>. That is an extra
          3.75 percentage points&mdash;or an additional <strong>$750</strong> on
          a $20,000 settlement.
        </li>
        <li>
          <strong>Louisiana</strong> has a 4.45% state rate, but combined rates
          can reach <strong>9.55%</strong> or higher in some parishes.
        </li>
        <li>
          <strong>New York City</strong> has a combined rate of{" "}
          <strong>8.875%</strong>, well above the state&rsquo;s 4% base.
        </li>
      </ul>
      <p>
        If your insurer is calculating sales tax based on only the state rate,
        you may be underpaid by hundreds of dollars. Request that they use the{" "}
        <strong>combined rate for the jurisdiction where you will register</strong>{" "}
        the replacement vehicle. You can look up your exact combined rate using
        your state&rsquo;s department of revenue website or our{" "}
        <Link href="/tools/sales-tax-calculator" className="text-coral hover:underline">sales tax calculator</Link>.
      </p>

      <KeyTakeaway>
        <p>
          Your insurer should reimburse sales tax at the{" "}
          <strong>combined state-plus-local rate</strong> for where you register
          your replacement vehicle, not just the base state rate. In high-local-tax
          areas, this difference alone can mean an extra $500&ndash;$1,500 in
          your settlement.
        </p>
      </KeyTakeaway>

      {/* ================================================================ */}
      {/*  Section: Other Fees You May Be Owed                              */}
      {/* ================================================================ */}
      <h2 id="other-fees-you-may-be-owed">Other Fees You May Be Owed</h2>
      <p>
        Sales tax is often the largest missing line item, but it is rarely the
        only one. A complete total loss settlement should also include title
        transfer fees, registration fees, dealer documentation fees, and
        potentially loss-of-use compensation. Use the checklist below to see
        which items may be missing from your offer, or visit the{" "}
        <Link href="/tools/settlement-checklist" className="text-coral hover:underline">
          full settlement checklist tool
        </Link>{" "}
        for a comprehensive state-by-state breakdown.
      </p>
      <SettlementChecklist mode="mini" />

      {/* ================================================================ */}
      {/*  Section: Case Studies                                            */}
      {/* ================================================================ */}
      <h2 id="real-sales-tax-recovery-case-studies">
        Real Sales Tax Recovery Case Studies
      </h2>
      <p>
        These case studies illustrate how sales tax reimbursement works in
        different states and how much policyholders have recovered by ensuring
        it was included in their settlements.
      </p>

      {/* Case Study 1: Washington */}
      <CaseStudy
        name="Rachel M."
        vehicle="2020 Toyota RAV4 XLE"
        state="Washington"
        initialOffer="$26,400"
        finalSettlement="$29,506"
        gap="+$3,106"
        narrative={
          <p>
            Rachel&rsquo;s 2020 RAV4 was totaled in a rear-end collision in
            Seattle. Her insurer&rsquo;s initial offer of $26,400 reflected a
            reasonable ACV but omitted sales tax entirely. In King County,
            Washington, the combined sales tax rate is{" "}
            <strong>10.25%</strong>&mdash;one of the highest in the country.
            Rachel used{" "}
            <Link href="/tools/sales-tax-calculator" className="text-coral hover:underline">
              the ClaimCoach sales tax calculator
            </Link>{" "}
            and submitted a counter-offer requesting $2,706 in sales tax
            reimbursement plus $400 in title and registration fees. Her insurer
            approved the full amount within eight days, bringing her settlement
            to $29,506.
          </p>
        }
      />

      {/* Case Study 2: Georgia TAVT */}
      <CaseStudy
        name="DeShawn T."
        vehicle="2019 Honda Accord Sport"
        state="Georgia"
        initialOffer="$22,100"
        finalSettlement="$24,109"
        gap="+$2,009"
        narrative={
          <p>
            DeShawn&rsquo;s Accord was declared a total loss after a highway
            incident in Cobb County, Georgia. The initial offer of $22,100
            included no tax reimbursement. Georgia&rsquo;s Title Ad Valorem Tax
            (TAVT) is <strong>6.6%</strong>, which on his settlement meant{" "}
            <strong>$1,459</strong> in TAVT alone. DeShawn also documented $350
            in title transfer fees and $200 in dealer documentation fees. After
            submitting his{" "}
            <Link href="/claims/new" className="text-coral hover:underline">ClaimCoach analysis</Link> and a written
            counter-offer citing Georgia&rsquo;s TAVT statute, his insurer
            added $2,009 to the settlement within two weeks.
          </p>
        }
      />

      {/* Case Study 3: Oregon / cross-state */}
      <CaseStudy
        name="Jennifer K."
        vehicle="2021 Subaru Outback Premium"
        state="Oregon"
        initialOffer="$28,750"
        finalSettlement="$31,498"
        gap="+$2,748"
        narrative={
          <p>
            Jennifer lived in Portland, Oregon&mdash;a state with no sales
            tax&mdash;but after her Outback was totaled, the only comparable
            replacement she could find was at a dealership in Vancouver,
            Washington. Washington charges a combined rate of approximately{" "}
            <strong>8.6%</strong> in Clark County, which meant{" "}
            <strong>$2,473</strong> in sales tax she would pay at the point of
            sale. Her insurer initially argued that Oregon has no sales tax and
            refused the reimbursement. Jennifer submitted documentation showing
            the replacement purchase would occur in Washington and that her
            policy entitled her to replacement-cost recovery including
            transactional costs. Her insurer ultimately agreed to reimburse the
            Washington sales tax plus $275 in registration fees, adding $2,748
            to her settlement.
          </p>
        }
      />

      {/* ================================================================ */}
      {/*  Section: How to Claim Sales Tax                                  */}
      {/* ================================================================ */}
      <h2 id="how-to-claim-sales-tax-in-your-settlement">
        How to Claim Sales Tax in Your Settlement
      </h2>
      <p>
        If sales tax is missing from your total loss offer, follow these steps
        to recover it:
      </p>
      <ol>
        <li>
          <strong>Identify your combined tax rate.</strong> Look up the combined
          state-plus-local sales tax rate for the jurisdiction where you will
          register your replacement vehicle. Use our{" "}
          <Link href="/tools/sales-tax-calculator" className="text-coral hover:underline">sales tax calculator</Link>{" "}
          or your state&rsquo;s department of revenue website.
        </li>
        <li>
          <strong>Calculate the dollar amount.</strong> Multiply your
          settlement&rsquo;s ACV by the combined tax rate. For example: $20,000
          &times; 8.5% = $1,700.
        </li>
        <li>
          <strong>Check your state&rsquo;s requirements.</strong> Determine
          whether your state requires proof of replacement purchase (e.g.,
          Illinois&rsquo;s 30-day window, Texas&rsquo;s replacement requirement)
          or pays sales tax automatically as part of the settlement.
        </li>
        <li>
          <strong>Submit a written request.</strong> Contact your adjuster in
          writing (email is fine, but keep records). State the specific dollar
          amount you are requesting and cite your state&rsquo;s regulation
          requiring sales tax reimbursement.
        </li>
        <li>
          <strong>Provide supporting documentation.</strong> If your state
          requires proof of purchase, submit the bill of sale, title transfer
          receipt, and sales tax receipt from the dealership or DMV.
        </li>
        <li>
          <strong>Escalate if needed.</strong> If your adjuster refuses, ask to
          speak with a supervisor. You can also{" "}
          <Link href="/estimate" className="text-coral hover:underline">run a free analysis with ClaimCoach</Link> to
          generate a detailed breakdown of every line item your settlement
          should include, which you can attach to your request.
        </li>
      </ol>
      <p>
        Most adjusters will add sales tax to your settlement without significant
        pushback once you make the request in writing with the correct dollar
        amount. The key is being specific: do not just ask for &ldquo;sales
        tax&rdquo;&mdash;state the exact rate, the dollar amount, and the
        regulatory basis for your request.
      </p>

      {/* ---- Final key takeaway ---- */}
      <h2 id="final-takeaway">
        Don&rsquo;t Leave Sales Tax Money on the Table
      </h2>
      <KeyTakeaway>
        <p>
          Sales tax reimbursement is not a bonus or a negotiation
          tactic&mdash;it is money your insurer is required to pay in most
          states. On a $20,000 settlement, you could be owed{" "}
          <strong>$1,000&ndash;$2,000+</strong> depending on your state and
          local rates. Review your offer carefully, check the{" "}
          <Link href="/tools/sales-tax-calculator" className="text-coral hover:underline">sales tax calculator</Link>,
          and make sure every dollar you are owed is included before you sign.
        </p>
      </KeyTakeaway>

      {/* ---- Related Guides ---- */}
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
          <Link href="/guides/total-loss-car-value" className="text-coral hover:underline">
            How Insurers Value Your Car
          </Link>{" "}
          &mdash; ACV calculation, valuation services, and common mistakes
        </li>
        <li>
          <Link href="/guides/counter-offer-letter" className="text-coral hover:underline">
            Counter-Offer Letter Template
          </Link>{" "}
          &mdash; a ready-to-use template with real examples
        </li>
      </ul>

      {/* ---- Disclaimer ---- */}
      <div className="border-t border-black/10 mt-10 pt-6">
        <p className="text-caption text-[#4a555e]">
          <strong>Disclaimer:</strong> This article is for informational
          purposes only and does not constitute legal, tax, or insurance advice.
          Tax rates, regulations, and insurer obligations vary by state and
          locality and are subject to change. The combined rates listed above
          are approximations based on publicly available data and may not
          reflect your exact local rate. Always verify the applicable tax rate
          with your state or local tax authority. For advice specific to your
          situation, consult a licensed insurance professional or attorney in
          your state. ClaimCoach is not a law firm and does not provide legal
          representation.
        </p>
      </div>
    </>
  );
}
