# ClaimCoach — Claude Code Instructions

## Content: No fabricated statistics

Never invent statistics, data attributions, or survey figures. This applies to:

- Claim counts ("ClaimCoach analysis of X claims") — only use these if the
  actual data exists in the codebase or you are explicitly told the number is real
- Outcome ranges ("average recovery of $X–$Y") — only repeat figures that
  already exist in the codebase, confirmed by the team; do not create new ones
- Percentages ("80% of policyholders…") — same rule

If a sentence would be stronger with a stat but no real stat exists, write the
sentence without one. Do not substitute a plausible-sounding number.

### Stats currently in the codebase (confirmed by the team as real)

These may be repeated across articles:

| Stat | Source file |
|---|---|
| "over 10,000 total loss claims" | `total-loss-settlement-amount.tsx` |
| "average initial offer is $2,800 to $4,200 below fair market value" | `total-loss-settlement-amount.tsx` |

Any new data point needs explicit sign-off before it goes into an article.

## Article quality standard (9.5/10)

Every guide article must meet the following criteria before publishing:

### Structure requirements
- Opening paragraph that names the exact problem and promises a resolution
- `CTABox` (no props — default) near the top
- At least one `KeyTakeaway` after the CTABox summarizing the single most important insight
- At least one `DataTable` making key information scannable
- A "The Bottom Line" section with a closing `KeyTakeaway`
- A "Related Guides" section with 4 cross-links
- Disclaimer section at the bottom

### Content depth requirements
- At least one **concrete illustrative example** using hypothetical dollar figures (label them as examples, not statistics)
- Coverage of the **"what if it goes wrong"** scenario for the main topic (e.g., insurer refuses, GAP cap exceeded, no comparables exist, adjuster changes mid-claim)
- **State-specific examples** where meaningful — California, Texas, and Florida together cover the largest share of total loss claims
- **Negotiation steps**, not just informational descriptions — tell the reader what to *do*

### Tools
- `FairnessQuiz mode="mini"` embedded in claims/settlement articles before acceptance decisions
- `CarValueEstimator` in valuation-focused articles
- `CTABox` with a specific, benefit-focused `heading` and `body` (not generic)

### What disqualifies a 9.5
- Any fabricated statistic (see rule above)
- Sections that describe a problem without telling the reader what to do about it
- Missing the "what if refused / what if it goes wrong" path for the main topic
- No concrete example (all abstract advice with no illustrative scenario)
