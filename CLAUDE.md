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
