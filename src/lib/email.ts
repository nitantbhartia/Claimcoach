import { Resend } from "resend";

let resend: Resend | null = null;

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function getResendClient(): Resend {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const FROM = "ClaimCoach <noreply@claimcoach.app>";

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

function baseLayout(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ClaimCoach</title>
</head>
<body style="margin:0;padding:0;background:#f5f4f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4f2;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:#1a1a1a;padding:24px 32px;">
            <span style="color:#ffffff;font-size:18px;font-weight:600;letter-spacing:-0.3px;">ClaimCoach</span>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            ${bodyHtml}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #e8e6e3;background:#fafafa;">
            <p style="margin:0;font-size:12px;color:#888;line-height:1.5;">
              ClaimCoach &mdash; claimcoach.app<br />
              For educational purposes only. Not legal advice.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Per-claim purchase confirmation
// ---------------------------------------------------------------------------

interface PerClaimReceiptOptions {
  to: string;
  claimId?: string;
  vehicleDescription?: string; // e.g. "2019 Toyota Camry"
  amountCents: number;
  stripeReceiptUrl?: string;
}

export async function sendPerClaimReceipt(opts: PerClaimReceiptOptions) {
  if (!isEmailConfigured()) return;

  const amount = (opts.amountCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const vehicleLine = opts.vehicleDescription
    ? `<p style="margin:0 0 8px;font-size:15px;color:#444;">Vehicle: <strong>${opts.vehicleDescription}</strong></p>`
    : "";

  const claimLink = opts.claimId
    ? `<a href="${process.env.NEXT_PUBLIC_APP_URL}/claims/${opts.claimId}"
         style="display:inline-block;margin-top:24px;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:500;">
         Open Your Claim &rarr;
       </a>`
    : "";

  const receiptLink = opts.stripeReceiptUrl
    ? `<p style="margin:16px 0 0;font-size:13px;color:#888;">
         <a href="${opts.stripeReceiptUrl}" style="color:#555;text-decoration:underline;">View payment receipt</a>
       </p>`
    : "";

  const body = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:600;color:#1a1a1a;letter-spacing:-0.4px;">
      Your full toolkit is unlocked
    </h1>
    <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6;">
      Payment of <strong>${amount}</strong> was received. Your ClaimCoach Full Toolkit is now active for this claim.
    </p>
    <div style="background:#f5f4f2;border-radius:6px;padding:20px 24px;margin-bottom:8px;">
      ${vehicleLine}
      <p style="margin:0;font-size:15px;color:#444;">
        You now have access to full policy analysis, offer fairness breakdown, counter-offer letter, adjuster call script, state legal guide, and PDF export.
      </p>
    </div>
    ${claimLink}
    ${receiptLink}
  `;

  return getResendClient().emails.send({
    from: FROM,
    to: opts.to,
    subject: "Your ClaimCoach toolkit is ready",
    html: baseLayout(body),
  });
}

// ---------------------------------------------------------------------------
// Pro subscription activation
// ---------------------------------------------------------------------------

interface ProActivationOptions {
  to: string;
  stripeReceiptUrl?: string;
}

export async function sendProActivation(opts: ProActivationOptions) {
  if (!isEmailConfigured()) return;

  const receiptLink = opts.stripeReceiptUrl
    ? `<p style="margin:16px 0 0;font-size:13px;color:#888;">
         <a href="${opts.stripeReceiptUrl}" style="color:#555;text-decoration:underline;">View payment receipt</a>
       </p>`
    : "";

  const body = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:600;color:#1a1a1a;letter-spacing:-0.4px;">
      Welcome to ClaimCoach Pro
    </h1>
    <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6;">
      Your Pro subscription is now active. You have unlimited claims, priority support, and access to every feature in ClaimCoach.
    </p>
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
       style="display:inline-block;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:500;">
      Go to Dashboard &rarr;
    </a>
    ${receiptLink}
  `;

  return getResendClient().emails.send({
    from: FROM,
    to: opts.to,
    subject: "ClaimCoach Pro is active",
    html: baseLayout(body),
  });
}

// ---------------------------------------------------------------------------
// Pro subscription cancelled
// ---------------------------------------------------------------------------

export async function sendProCancelled(to: string) {
  if (!isEmailConfigured()) return;

  const body = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:600;color:#1a1a1a;letter-spacing:-0.4px;">
      Your Pro subscription has ended
    </h1>
    <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6;">
      Your ClaimCoach Pro subscription has been cancelled and your account has been moved to the free plan. Any claims you already paid for remain fully accessible.
    </p>
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/pricing"
       style="display:inline-block;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:500;">
      Resubscribe &rarr;
    </a>
  `;

  return getResendClient().emails.send({
    from: FROM,
    to,
    subject: "Your ClaimCoach Pro subscription has ended",
    html: baseLayout(body),
  });
}
