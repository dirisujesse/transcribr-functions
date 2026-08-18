import * as Handlebars from "handlebars";

export type SubscriptionRemiderBody = {
  name: string;
  plan: string;
  date: string;
  amount: string;
};

/**
 * Transcribr transactional email templates.
 * Redesigned to match the landing page / web app identity:
 *   indigo #5B50E8 · ink #1B1D26 · lavender panels #EFEDFD
 * Each template is table-based with fully inline styles, a hidden preheader,
 * bulletproof CTA buttons, and a prefers-color-scheme: dark block
 * (+ [data-ogsc] fallbacks for Outlook.com) that maps onto the dark app theme.
 * Method names, signatures and Handlebars variables are unchanged.
 */
export class TemplateService {
  get year(): number {
    return new Date().getFullYear();
  }

  getWelcomeTemplate(name: string): string {
    const data = { name, year: this.year };

    const source = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Welcome to Transcribr!</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    table { border-collapse:collapse !important; }
    body { height:100% !important; margin:0 !important; padding:0 !important; width:100% !important; }
    a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }
    @media screen and (max-width:600px) {
      .wrap { width:100% !important; }
      .gutter { padding-left:24px !important; padding-right:24px !important; }
      .h1 { font-size:26px !important; line-height:33px !important; }
    }
    @media (prefers-color-scheme: dark) {
      body, .e-bg { background-color:#0E0C24 !important; }
      .e-card { background-color:#17143E !important; border-color:#302A73 !important; }
      .e-ink, .e-ink strong { color:#F1EFFF !important; }
      .e-mut { color:#B7B4DD !important; }
      .e-sub { background-color:#1C1848 !important; border-color:#302A73 !important; }
      .e-hr { border-top-color:#302A73 !important; }
      .e-panel { background-color:#221C56 !important; border-color:#3A3388 !important; }
      .e-accent { color:#A79EFF !important; }
      .e-eyebrow { background-color:#262066 !important; }
      .e-chip-g { background-color:#12351F !important; color:#6FD79B !important; }
      .e-chip-p { background-color:#262066 !important; color:#B3AAFF !important; }
      .e-foot, .e-foot a { color:#9A97C4 !important; }
      .e-logo { background-color:#F3F2FA !important; border-radius:8px !important; padding:6px 8px !important; }
    }
    [data-ogsc] .e-card { background-color:#17143E !important; }
    [data-ogsc] .e-ink { color:#F1EFFF !important; }
    [data-ogsc] .e-mut { color:#B7B4DD !important; }
    [data-ogsc] .e-sub { background-color:#1C1848 !important; }
    [data-ogsc] .e-panel { background-color:#221C56 !important; }
    [data-ogsc] .e-accent { color:#A79EFF !important; }
  </style>
</head>
<body class="e-bg" style="margin:0 !important; padding:0 !important; background-color:#F3F2FA;">
  <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px;">Your account is live — upload your first file and get a transcript in seconds.</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-bg" style="width:100%; background-color:#F3F2FA;">
    <tr>
      <td align="center" style="padding:32px 12px 40px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrap" style="width:600px; max-width:600px;">
          <tr>
            <td align="left" class="e-logo" style="padding:0 8px 18px 8px;">
              <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="128" alt="Transcribr" style="display:block; border:0; width:128px; max-width:128px;" />
            </td>
          </tr>
          <tr>
            <td bgcolor="#FFFFFF" class="e-card" style="border:1px solid #E4E1F5; border-radius:18px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                <tr><td height="4" bgcolor="#5B50E8" style="height:4px; line-height:4px; font-size:0; border-radius:18px 18px 0 0;">&nbsp;</td></tr>
                <tr>
                  <td class="gutter" style="padding:38px 40px 40px 40px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;"><tr>
                      <td bgcolor="#EFEDFD" class="e-eyebrow e-accent" style="border-radius:20px; padding:7px 14px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:12px; font-weight:700; letter-spacing:0.6px; text-transform:uppercase; color:#5B50E8; line-height:16px; mso-line-height-rule:exactly;">Welcome</td>
                    </tr></table>
                    <h1 class="h1 e-ink" style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:32px; font-weight:700; letter-spacing:-0.7px; line-height:40px; mso-line-height-rule:exactly; color:#1B1D26;">Turn your audio into<br />perfect text</h1>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:0px 0 0 0;">Hi {{name}},</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Welcome to Transcribr. Your account is ready, so you can start turning recordings into accurate, editable text right away.</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-sub" style="width:100%; border:1px solid #E4E1F5; border-radius:14px; background-color:#FBFAFF;"><tr><td style="padding:6px 22px 8px 22px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                      <tr>
                        <td width="45%" class="e-mut" style="padding:14px 0;  font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; line-height:20px; mso-line-height-rule:exactly; color:#5C5F70;">Speaker labels</td>
                        <td width="55%" align="right" class="e-ink" style="padding:14px 0;  font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:15px; font-weight:700; line-height:20px; mso-line-height-rule:exactly; color:#1B1D26;">Automatic</td>
                      </tr>
                      <tr>
                        <td width="45%" class="e-mut e-hr" style="padding:14px 0; border-top:1px solid #E4E1F5; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; line-height:20px; mso-line-height-rule:exactly; color:#5C5F70;">Synced playback</td>
                        <td width="55%" align="right" class="e-ink e-hr" style="padding:14px 0; border-top:1px solid #E4E1F5; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:15px; font-weight:700; line-height:20px; mso-line-height-rule:exactly; color:#1B1D26;">Word-level</td>
                      </tr>
                      <tr>
                        <td width="45%" class="e-mut e-hr" style="padding:14px 0; border-top:1px solid #E4E1F5; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; line-height:20px; mso-line-height-rule:exactly; color:#5C5F70;">Exports</td>
                        <td width="55%" align="right" class="e-ink e-hr" style="padding:14px 0; border-top:1px solid #E4E1F5; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:15px; font-weight:700; line-height:20px; mso-line-height-rule:exactly; color:#1B1D26;">TXT, DOCX, SRT</td>
                      </tr>
                    </table>
                  </td></tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0;"><tr>
                    <td align="center" bgcolor="#5B50E8" class="e-btn" style="border-radius:10px; padding:15px 30px; mso-padding-alt:15px 30px;">
                      <a href="https://app.transcribr.org" target="_blank" style="display:block; color:#ffffff; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; font-weight:700; line-height:20px; mso-line-height-rule:exactly; text-decoration:none; letter-spacing:-0.1px;">Create your first transcript</a>
                    </td></tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Questions? Reply to this email or reach our <a href="mailto:support@transcribr.org" class="e-accent" style="color:#5B50E8; font-weight:700; text-decoration:none;">support team</a> any time.</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Happy transcribing,<br /><span class="e-ink" style="color:#1B1D26; font-weight:700;">The Transcribr Team</span></div></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="gutter e-foot" align="center" style="padding:26px 24px 0 24px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:13px; line-height:21px; mso-line-height-rule:exactly; color:#6E7186;">
              <div><a href="https://transcribr.org" target="_blank" style="color:#6E7186; text-decoration:underline;">transcribr.org</a> &nbsp;&middot;&nbsp; <a href="mailto:support@transcribr.org" style="color:#6E7186; text-decoration:underline;">support@transcribr.org</a> &nbsp;&middot;&nbsp; <a href="https://app.transcribr.org/dashboard/profile" target="_blank" style="color:#6E7186; text-decoration:underline;">Email preferences</a></div>
              <div style="padding-top:8px;">&copy; {{year}} Transcribr. All rights reserved.</div>
              <div style="padding-top:8px;">You received this because you have a Transcribr account. <a href="https://app.transcribr.org/dashboard/profile" target="_blank" style="color:#6E7186; text-decoration:underline;">Unsubscribe</a> from product notifications.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
    const template = Handlebars.compile(source);
    return template(data);
  }

  getEmailVerifyTemplate(name: string, otp: string): string {
    const data = { name, otp, year: this.year };

    const source = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Your Transcribr verification code</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    table { border-collapse:collapse !important; }
    body { height:100% !important; margin:0 !important; padding:0 !important; width:100% !important; }
    a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }
    @media screen and (max-width:600px) {
      .wrap { width:100% !important; }
      .gutter { padding-left:24px !important; padding-right:24px !important; }
      .h1 { font-size:26px !important; line-height:33px !important; }
    }
    @media (prefers-color-scheme: dark) {
      body, .e-bg { background-color:#0E0C24 !important; }
      .e-card { background-color:#17143E !important; border-color:#302A73 !important; }
      .e-ink, .e-ink strong { color:#F1EFFF !important; }
      .e-mut { color:#B7B4DD !important; }
      .e-sub { background-color:#1C1848 !important; border-color:#302A73 !important; }
      .e-hr { border-top-color:#302A73 !important; }
      .e-panel { background-color:#221C56 !important; border-color:#3A3388 !important; }
      .e-accent { color:#A79EFF !important; }
      .e-eyebrow { background-color:#262066 !important; }
      .e-chip-g { background-color:#12351F !important; color:#6FD79B !important; }
      .e-chip-p { background-color:#262066 !important; color:#B3AAFF !important; }
      .e-foot, .e-foot a { color:#9A97C4 !important; }
      .e-logo { background-color:#F3F2FA !important; border-radius:8px !important; padding:6px 8px !important; }
    }
    [data-ogsc] .e-card { background-color:#17143E !important; }
    [data-ogsc] .e-ink { color:#F1EFFF !important; }
    [data-ogsc] .e-mut { color:#B7B4DD !important; }
    [data-ogsc] .e-sub { background-color:#1C1848 !important; }
    [data-ogsc] .e-panel { background-color:#221C56 !important; }
    [data-ogsc] .e-accent { color:#A79EFF !important; }
  </style>
</head>
<body class="e-bg" style="margin:0 !important; padding:0 !important; background-color:#F3F2FA;">
  <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px;">Your Transcribr verification code — expires in 5 minutes.</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-bg" style="width:100%; background-color:#F3F2FA;">
    <tr>
      <td align="center" style="padding:32px 12px 40px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrap" style="width:600px; max-width:600px;">
          <tr>
            <td align="left" class="e-logo" style="padding:0 8px 18px 8px;">
              <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="128" alt="Transcribr" style="display:block; border:0; width:128px; max-width:128px;" />
            </td>
          </tr>
          <tr>
            <td bgcolor="#FFFFFF" class="e-card" style="border:1px solid #E4E1F5; border-radius:18px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                <tr><td height="4" bgcolor="#5B50E8" style="height:4px; line-height:4px; font-size:0; border-radius:18px 18px 0 0;">&nbsp;</td></tr>
                <tr>
                  <td class="gutter" style="padding:38px 40px 40px 40px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;"><tr>
                      <td bgcolor="#EFEDFD" class="e-eyebrow e-accent" style="border-radius:20px; padding:7px 14px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:12px; font-weight:700; letter-spacing:0.6px; text-transform:uppercase; color:#5B50E8; line-height:16px; mso-line-height-rule:exactly;">Verify email</td>
                    </tr></table>
                    <h1 class="h1 e-ink" style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:32px; font-weight:700; letter-spacing:-0.7px; line-height:40px; mso-line-height-rule:exactly; color:#1B1D26;">Confirm your email address</h1>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:0px 0 0 0;">Hi {{name}},</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Enter this code in Transcribr to finish setting up your account.</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-panel" style="width:100%; background-color:#EFEDFD; border:1px solid #E4E1F5; border-radius:14px;"><tr>
                    <td align="center" style="padding:26px 20px 28px 20px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
                      <div class="e-mut" style="font-size:12px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; color:#5C5F70; line-height:16px; mso-line-height-rule:exactly;">Verification code</div>
                      <div class="e-accent" style="font-family:'Courier New', Courier, monospace; font-size:38px; font-weight:700; letter-spacing:8px; color:#5B50E8; line-height:46px; mso-line-height-rule:exactly; padding-top:10px;">{{otp}}</div>
                    </td></tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-sub" style="width:100%; border-left:3px solid #5C5F70; background-color:#FBFAFF;"><tr>
                    <td class="e-mut" style="padding:14px 18px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; line-height:22px; mso-line-height-rule:exactly; color:#5C5F70;">This code expires in 5 minutes and can only be used once. If you did not sign up for Transcribr, you can safely ignore this email.</td>
                  </tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Thanks,<br /><span class="e-ink" style="color:#1B1D26; font-weight:700;">The Transcribr Team</span></div></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="gutter e-foot" align="center" style="padding:26px 24px 0 24px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:13px; line-height:21px; mso-line-height-rule:exactly; color:#6E7186;">
              <div><a href="https://transcribr.org" target="_blank" style="color:#6E7186; text-decoration:underline;">transcribr.org</a> &nbsp;&middot;&nbsp; <a href="mailto:support@transcribr.org" style="color:#6E7186; text-decoration:underline;">support@transcribr.org</a></div>
              <div style="padding-top:8px;">&copy; {{year}} Transcribr. All rights reserved.</div>
              
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
    const template = Handlebars.compile(source);
    return template(data);
  }

  getEmailVerifiedTemplate(name: string, email: string): string {
    const data = { name, email, year: this.year };

    const source = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Your Transcribr account is verified</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    table { border-collapse:collapse !important; }
    body { height:100% !important; margin:0 !important; padding:0 !important; width:100% !important; }
    a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }
    @media screen and (max-width:600px) {
      .wrap { width:100% !important; }
      .gutter { padding-left:24px !important; padding-right:24px !important; }
      .h1 { font-size:26px !important; line-height:33px !important; }
    }
    @media (prefers-color-scheme: dark) {
      body, .e-bg { background-color:#0E0C24 !important; }
      .e-card { background-color:#17143E !important; border-color:#302A73 !important; }
      .e-ink, .e-ink strong { color:#F1EFFF !important; }
      .e-mut { color:#B7B4DD !important; }
      .e-sub { background-color:#1C1848 !important; border-color:#302A73 !important; }
      .e-hr { border-top-color:#302A73 !important; }
      .e-panel { background-color:#221C56 !important; border-color:#3A3388 !important; }
      .e-accent { color:#A79EFF !important; }
      .e-eyebrow { background-color:#262066 !important; }
      .e-chip-g { background-color:#12351F !important; color:#6FD79B !important; }
      .e-chip-p { background-color:#262066 !important; color:#B3AAFF !important; }
      .e-foot, .e-foot a { color:#9A97C4 !important; }
      .e-logo { background-color:#F3F2FA !important; border-radius:8px !important; padding:6px 8px !important; }
    }
    [data-ogsc] .e-card { background-color:#17143E !important; }
    [data-ogsc] .e-ink { color:#F1EFFF !important; }
    [data-ogsc] .e-mut { color:#B7B4DD !important; }
    [data-ogsc] .e-sub { background-color:#1C1848 !important; }
    [data-ogsc] .e-panel { background-color:#221C56 !important; }
    [data-ogsc] .e-accent { color:#A79EFF !important; }
  </style>
</head>
<body class="e-bg" style="margin:0 !important; padding:0 !important; background-color:#F3F2FA;">
  <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px;">Verified — full access to transcription, exports and sync is now on.</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-bg" style="width:100%; background-color:#F3F2FA;">
    <tr>
      <td align="center" style="padding:32px 12px 40px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrap" style="width:600px; max-width:600px;">
          <tr>
            <td align="left" class="e-logo" style="padding:0 8px 18px 8px;">
              <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="128" alt="Transcribr" style="display:block; border:0; width:128px; max-width:128px;" />
            </td>
          </tr>
          <tr>
            <td bgcolor="#FFFFFF" class="e-card" style="border:1px solid #E4E1F5; border-radius:18px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                <tr><td height="4" bgcolor="#5B50E8" style="height:4px; line-height:4px; font-size:0; border-radius:18px 18px 0 0;">&nbsp;</td></tr>
                <tr>
                  <td class="gutter" style="padding:38px 40px 40px 40px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;"><tr>
                      <td bgcolor="#EFEDFD" class="e-eyebrow e-accent" style="border-radius:20px; padding:7px 14px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:12px; font-weight:700; letter-spacing:0.6px; text-transform:uppercase; color:#5B50E8; line-height:16px; mso-line-height-rule:exactly;">Verified</td>
                    </tr></table>
                    <h1 class="h1 e-ink" style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:32px; font-weight:700; letter-spacing:-0.7px; line-height:40px; mso-line-height-rule:exactly; color:#1B1D26;">You&rsquo;re all set</h1>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:0px 0 0 0;">Hi {{name}},</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;"><strong class="e-ink" style="color:#1B1D26;">{{email}}</strong> is now verified, so every Transcribr feature is unlocked on web and mobile.</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0;"><tr>
                    <td align="center" bgcolor="#5B50E8" class="e-btn" style="border-radius:10px; padding:15px 30px; mso-padding-alt:15px 30px;">
                      <a href="https://app.transcribr.org/dashboard/transcript" target="_blank" style="display:block; color:#ffffff; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; font-weight:700; line-height:20px; mso-line-height-rule:exactly; text-decoration:none; letter-spacing:-0.1px;">Open Transcribr</a>
                    </td></tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Best,<br /><span class="e-ink" style="color:#1B1D26; font-weight:700;">The Transcribr Team</span></div></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="gutter e-foot" align="center" style="padding:26px 24px 0 24px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:13px; line-height:21px; mso-line-height-rule:exactly; color:#6E7186;">
              <div><a href="https://transcribr.org" target="_blank" style="color:#6E7186; text-decoration:underline;">transcribr.org</a> &nbsp;&middot;&nbsp; <a href="mailto:support@transcribr.org" style="color:#6E7186; text-decoration:underline;">support@transcribr.org</a></div>
              <div style="padding-top:8px;">&copy; {{year}} Transcribr. All rights reserved.</div>
              
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
    const template = Handlebars.compile(source);
    return template(data);
  }

  getTranscriptReadyTemplate(name: string, link: string, title: string): string {
    const data = { name, link, title, year: this.year };

    const source = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Your transcript is ready</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    table { border-collapse:collapse !important; }
    body { height:100% !important; margin:0 !important; padding:0 !important; width:100% !important; }
    a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }
    @media screen and (max-width:600px) {
      .wrap { width:100% !important; }
      .gutter { padding-left:24px !important; padding-right:24px !important; }
      .h1 { font-size:26px !important; line-height:33px !important; }
    }
    @media (prefers-color-scheme: dark) {
      body, .e-bg { background-color:#0E0C24 !important; }
      .e-card { background-color:#17143E !important; border-color:#302A73 !important; }
      .e-ink, .e-ink strong { color:#F1EFFF !important; }
      .e-mut { color:#B7B4DD !important; }
      .e-sub { background-color:#1C1848 !important; border-color:#302A73 !important; }
      .e-hr { border-top-color:#302A73 !important; }
      .e-panel { background-color:#221C56 !important; border-color:#3A3388 !important; }
      .e-accent { color:#A79EFF !important; }
      .e-eyebrow { background-color:#262066 !important; }
      .e-chip-g { background-color:#12351F !important; color:#6FD79B !important; }
      .e-chip-p { background-color:#262066 !important; color:#B3AAFF !important; }
      .e-foot, .e-foot a { color:#9A97C4 !important; }
      .e-logo { background-color:#F3F2FA !important; border-radius:8px !important; padding:6px 8px !important; }
    }
    [data-ogsc] .e-card { background-color:#17143E !important; }
    [data-ogsc] .e-ink { color:#F1EFFF !important; }
    [data-ogsc] .e-mut { color:#B7B4DD !important; }
    [data-ogsc] .e-sub { background-color:#1C1848 !important; }
    [data-ogsc] .e-panel { background-color:#221C56 !important; }
    [data-ogsc] .e-accent { color:#A79EFF !important; }
  </style>
</head>
<body class="e-bg" style="margin:0 !important; padding:0 !important; background-color:#F3F2FA;">
  <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px;">{{title}} has finished transcribing and is ready to review.</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-bg" style="width:100%; background-color:#F3F2FA;">
    <tr>
      <td align="center" style="padding:32px 12px 40px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrap" style="width:600px; max-width:600px;">
          <tr>
            <td align="left" class="e-logo" style="padding:0 8px 18px 8px;">
              <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="128" alt="Transcribr" style="display:block; border:0; width:128px; max-width:128px;" />
            </td>
          </tr>
          <tr>
            <td bgcolor="#FFFFFF" class="e-card" style="border:1px solid #E4E1F5; border-radius:18px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                <tr><td height="4" bgcolor="#5B50E8" style="height:4px; line-height:4px; font-size:0; border-radius:18px 18px 0 0;">&nbsp;</td></tr>
                <tr>
                  <td class="gutter" style="padding:38px 40px 40px 40px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;"><tr>
                      <td bgcolor="#EFEDFD" class="e-eyebrow e-accent" style="border-radius:20px; padding:7px 14px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:12px; font-weight:700; letter-spacing:0.6px; text-transform:uppercase; color:#5B50E8; line-height:16px; mso-line-height-rule:exactly;">Transcript ready</td>
                    </tr></table>
                    <h1 class="h1 e-ink" style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:32px; font-weight:700; letter-spacing:-0.7px; line-height:40px; mso-line-height-rule:exactly; color:#1B1D26;">Your transcript is ready</h1>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:0px 0 0 0;">Hi {{name}},</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">&ldquo;{{title}}&rdquo; has finished processing. Open it to review the text, jump through synced playback, and export.</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-sub" style="width:100%; border:1px solid #E4E1F5; border-radius:14px; background-color:#FBFAFF;"><tr>
                    <td style="padding:22px 22px 24px 22px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
                      <div class="e-ink" style="font-size:17px; font-weight:700; color:#1B1D26; line-height:24px; mso-line-height-rule:exactly;">{{title}}</div>
                      <div class="e-mut" style="font-size:13px; color:#5C5F70; line-height:18px; mso-line-height-rule:exactly; padding-top:6px;">Transcription complete &middot; ready to review, edit and export</div>
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;"><tr>
                        <td bgcolor="#E4F5E9" class="e-chip-g" style="border-radius:20px; padding:6px 12px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:12px; font-weight:700; color:#0F8A46; line-height:16px; mso-line-height-rule:exactly;">&bull; Transcribed</td>
                        <td width="8" style="width:8px;">&nbsp;</td>
                        <td bgcolor="#EFEDFD" class="e-chip-p" style="border-radius:20px; padding:6px 12px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:12px; font-weight:700; color:#5B50E8; line-height:16px; mso-line-height-rule:exactly;">Standard</td>
                      </tr></table>
                    </td></tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0;"><tr>
                    <td align="center" bgcolor="#5B50E8" class="e-btn" style="border-radius:10px; padding:15px 30px; mso-padding-alt:15px 30px;">
                      <a href="{{link}}" target="_blank" style="display:block; color:#ffffff; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; font-weight:700; line-height:20px; mso-line-height-rule:exactly; text-decoration:none; letter-spacing:-0.1px;">View transcript</a>
                    </td></tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Best,<br /><span class="e-ink" style="color:#1B1D26; font-weight:700;">The Transcribr Team</span></div></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="gutter e-foot" align="center" style="padding:26px 24px 0 24px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:13px; line-height:21px; mso-line-height-rule:exactly; color:#6E7186;">
              <div><a href="https://transcribr.org" target="_blank" style="color:#6E7186; text-decoration:underline;">transcribr.org</a> &nbsp;&middot;&nbsp; <a href="mailto:support@transcribr.org" style="color:#6E7186; text-decoration:underline;">support@transcribr.org</a> &nbsp;&middot;&nbsp; <a href="https://app.transcribr.org/dashboard/profile" target="_blank" style="color:#6E7186; text-decoration:underline;">Email preferences</a></div>
              <div style="padding-top:8px;">&copy; {{year}} Transcribr. All rights reserved.</div>
              <div style="padding-top:8px;">You received this because you have a Transcribr account. <a href="https://app.transcribr.org/dashboard/profile" target="_blank" style="color:#6E7186; text-decoration:underline;">Unsubscribe</a> from product notifications.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
    const template = Handlebars.compile(source);
    return template(data);
  }

  getPasswordResetTemplate(name: string, otp: string): string {
    const data = { name, otp, year: this.year };

    const source = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Your Transcribr password reset code</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    table { border-collapse:collapse !important; }
    body { height:100% !important; margin:0 !important; padding:0 !important; width:100% !important; }
    a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }
    @media screen and (max-width:600px) {
      .wrap { width:100% !important; }
      .gutter { padding-left:24px !important; padding-right:24px !important; }
      .h1 { font-size:26px !important; line-height:33px !important; }
    }
    @media (prefers-color-scheme: dark) {
      body, .e-bg { background-color:#0E0C24 !important; }
      .e-card { background-color:#17143E !important; border-color:#302A73 !important; }
      .e-ink, .e-ink strong { color:#F1EFFF !important; }
      .e-mut { color:#B7B4DD !important; }
      .e-sub { background-color:#1C1848 !important; border-color:#302A73 !important; }
      .e-hr { border-top-color:#302A73 !important; }
      .e-panel { background-color:#221C56 !important; border-color:#3A3388 !important; }
      .e-accent { color:#A79EFF !important; }
      .e-eyebrow { background-color:#262066 !important; }
      .e-chip-g { background-color:#12351F !important; color:#6FD79B !important; }
      .e-chip-p { background-color:#262066 !important; color:#B3AAFF !important; }
      .e-foot, .e-foot a { color:#9A97C4 !important; }
      .e-logo { background-color:#F3F2FA !important; border-radius:8px !important; padding:6px 8px !important; }
    }
    [data-ogsc] .e-card { background-color:#17143E !important; }
    [data-ogsc] .e-ink { color:#F1EFFF !important; }
    [data-ogsc] .e-mut { color:#B7B4DD !important; }
    [data-ogsc] .e-sub { background-color:#1C1848 !important; }
    [data-ogsc] .e-panel { background-color:#221C56 !important; }
    [data-ogsc] .e-accent { color:#A79EFF !important; }
  </style>
</head>
<body class="e-bg" style="margin:0 !important; padding:0 !important; background-color:#F3F2FA;">
  <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px;">Use this code to reset your Transcribr password.</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-bg" style="width:100%; background-color:#F3F2FA;">
    <tr>
      <td align="center" style="padding:32px 12px 40px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrap" style="width:600px; max-width:600px;">
          <tr>
            <td align="left" class="e-logo" style="padding:0 8px 18px 8px;">
              <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="128" alt="Transcribr" style="display:block; border:0; width:128px; max-width:128px;" />
            </td>
          </tr>
          <tr>
            <td bgcolor="#FFFFFF" class="e-card" style="border:1px solid #E4E1F5; border-radius:18px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                <tr><td height="4" bgcolor="#5B50E8" style="height:4px; line-height:4px; font-size:0; border-radius:18px 18px 0 0;">&nbsp;</td></tr>
                <tr>
                  <td class="gutter" style="padding:38px 40px 40px 40px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;"><tr>
                      <td bgcolor="#EFEDFD" class="e-eyebrow e-accent" style="border-radius:20px; padding:7px 14px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:12px; font-weight:700; letter-spacing:0.6px; text-transform:uppercase; color:#5B50E8; line-height:16px; mso-line-height-rule:exactly;">Password reset</td>
                    </tr></table>
                    <h1 class="h1 e-ink" style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:32px; font-weight:700; letter-spacing:-0.7px; line-height:40px; mso-line-height-rule:exactly; color:#1B1D26;">Reset your password</h1>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:0px 0 0 0;">Hi {{name}},</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">We received a request to reset your Transcribr password. Use the code below to continue.</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-panel" style="width:100%; background-color:#EFEDFD; border:1px solid #E4E1F5; border-radius:14px;"><tr>
                    <td align="center" style="padding:26px 20px 28px 20px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
                      <div class="e-mut" style="font-size:12px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; color:#5C5F70; line-height:16px; mso-line-height-rule:exactly;">Reset code</div>
                      <div class="e-accent" style="font-family:'Courier New', Courier, monospace; font-size:38px; font-weight:700; letter-spacing:8px; color:#5B50E8; line-height:46px; mso-line-height-rule:exactly; padding-top:10px;">{{otp}}</div>
                    </td></tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-sub" style="width:100%; border-left:3px solid #C2352F; background-color:#FBFAFF;"><tr>
                    <td class="e-mut" style="padding:14px 18px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; line-height:22px; mso-line-height-rule:exactly; color:#5C5F70;">Never share this code with anyone. If you did not request a reset, ignore this email and your password stays unchanged.</td>
                  </tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Sincerely,<br /><span class="e-ink" style="color:#1B1D26; font-weight:700;">The Transcribr Team</span></div></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="gutter e-foot" align="center" style="padding:26px 24px 0 24px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:13px; line-height:21px; mso-line-height-rule:exactly; color:#6E7186;">
              <div><a href="https://transcribr.org" target="_blank" style="color:#6E7186; text-decoration:underline;">transcribr.org</a> &nbsp;&middot;&nbsp; <a href="mailto:support@transcribr.org" style="color:#6E7186; text-decoration:underline;">support@transcribr.org</a></div>
              <div style="padding-top:8px;">&copy; {{year}} Transcribr. All rights reserved.</div>
              
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
    const template = Handlebars.compile(source);
    return template(data);
  }

  getAccountSuspendedTemplate(name: string, email: string): string {
    const data = { name, email, year: this.year };

    const source = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Your Transcribr account has been suspended</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    table { border-collapse:collapse !important; }
    body { height:100% !important; margin:0 !important; padding:0 !important; width:100% !important; }
    a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }
    @media screen and (max-width:600px) {
      .wrap { width:100% !important; }
      .gutter { padding-left:24px !important; padding-right:24px !important; }
      .h1 { font-size:26px !important; line-height:33px !important; }
    }
    @media (prefers-color-scheme: dark) {
      body, .e-bg { background-color:#0E0C24 !important; }
      .e-card { background-color:#17143E !important; border-color:#302A73 !important; }
      .e-ink, .e-ink strong { color:#F1EFFF !important; }
      .e-mut { color:#B7B4DD !important; }
      .e-sub { background-color:#1C1848 !important; border-color:#302A73 !important; }
      .e-hr { border-top-color:#302A73 !important; }
      .e-panel { background-color:#221C56 !important; border-color:#3A3388 !important; }
      .e-accent { color:#A79EFF !important; }
      .e-eyebrow { background-color:#262066 !important; }
      .e-chip-g { background-color:#12351F !important; color:#6FD79B !important; }
      .e-chip-p { background-color:#262066 !important; color:#B3AAFF !important; }
      .e-foot, .e-foot a { color:#9A97C4 !important; }
      .e-logo { background-color:#F3F2FA !important; border-radius:8px !important; padding:6px 8px !important; }
    }
    [data-ogsc] .e-card { background-color:#17143E !important; }
    [data-ogsc] .e-ink { color:#F1EFFF !important; }
    [data-ogsc] .e-mut { color:#B7B4DD !important; }
    [data-ogsc] .e-sub { background-color:#1C1848 !important; }
    [data-ogsc] .e-panel { background-color:#221C56 !important; }
    [data-ogsc] .e-accent { color:#F0B860 !important; }
  </style>
</head>
<body class="e-bg" style="margin:0 !important; padding:0 !important; background-color:#F3F2FA;">
  <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px;">Action needed: your Transcribr account has been suspended.</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-bg" style="width:100%; background-color:#F3F2FA;">
    <tr>
      <td align="center" style="padding:32px 12px 40px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrap" style="width:600px; max-width:600px;">
          <tr>
            <td align="left" class="e-logo" style="padding:0 8px 18px 8px;">
              <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="128" alt="Transcribr" style="display:block; border:0; width:128px; max-width:128px;" />
            </td>
          </tr>
          <tr>
            <td bgcolor="#FFFFFF" class="e-card" style="border:1px solid #E4E1F5; border-radius:18px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                <tr><td height="4" bgcolor="#9A6212" style="height:4px; line-height:4px; font-size:0; border-radius:18px 18px 0 0;">&nbsp;</td></tr>
                <tr>
                  <td class="gutter" style="padding:38px 40px 40px 40px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;"><tr>
                      <td bgcolor="#EFEDFD" class="e-eyebrow e-accent" style="border-radius:20px; padding:7px 14px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:12px; font-weight:700; letter-spacing:0.6px; text-transform:uppercase; color:#9A6212; line-height:16px; mso-line-height-rule:exactly;">Action needed</td>
                    </tr></table>
                    <h1 class="h1 e-ink" style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:32px; font-weight:700; letter-spacing:-0.7px; line-height:40px; mso-line-height-rule:exactly; color:#1B1D26;">Your account has been suspended</h1>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:0px 0 0 0;">Hi {{name}},</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Access to the Transcribr account for <strong class="e-ink" style="color:#1B1D26;">{{email}}</strong> has been suspended, so transcription and exports are paused for now.</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-sub" style="width:100%; border-left:3px solid #9A6212; background-color:#FBFAFF;"><tr>
                    <td class="e-mut" style="padding:14px 18px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; line-height:22px; mso-line-height-rule:exactly; color:#5C5F70;">Your transcripts are not deleted. Our support team can explain the specific reason and walk you through reinstatement.</td>
                  </tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0;"><tr>
                    <td align="center" bgcolor="#9A6212" class="e-btn" style="border-radius:10px; padding:15px 30px; mso-padding-alt:15px 30px;">
                      <a href="mailto:support@transcribr.org" target="_blank" style="display:block; color:#ffffff; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; font-weight:700; line-height:20px; mso-line-height-rule:exactly; text-decoration:none; letter-spacing:-0.1px;">Contact support</a>
                    </td></tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Sincerely,<br /><span class="e-ink" style="color:#1B1D26; font-weight:700;">The Transcribr Team</span></div></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="gutter e-foot" align="center" style="padding:26px 24px 0 24px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:13px; line-height:21px; mso-line-height-rule:exactly; color:#6E7186;">
              <div><a href="https://transcribr.org" target="_blank" style="color:#6E7186; text-decoration:underline;">transcribr.org</a> &nbsp;&middot;&nbsp; <a href="mailto:support@transcribr.org" style="color:#6E7186; text-decoration:underline;">support@transcribr.org</a></div>
              <div style="padding-top:8px;">&copy; {{year}} Transcribr. All rights reserved.</div>
              
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
    const template = Handlebars.compile(source);
    return template(data);
  }

  getAccountDeletedTemplate(name: string, email: string): string {
    const data = { name, email, year: this.year };

    const source = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Your Transcribr account has been deleted</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    table { border-collapse:collapse !important; }
    body { height:100% !important; margin:0 !important; padding:0 !important; width:100% !important; }
    a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }
    @media screen and (max-width:600px) {
      .wrap { width:100% !important; }
      .gutter { padding-left:24px !important; padding-right:24px !important; }
      .h1 { font-size:26px !important; line-height:33px !important; }
    }
    @media (prefers-color-scheme: dark) {
      body, .e-bg { background-color:#0E0C24 !important; }
      .e-card { background-color:#17143E !important; border-color:#302A73 !important; }
      .e-ink, .e-ink strong { color:#F1EFFF !important; }
      .e-mut { color:#B7B4DD !important; }
      .e-sub { background-color:#1C1848 !important; border-color:#302A73 !important; }
      .e-hr { border-top-color:#302A73 !important; }
      .e-panel { background-color:#221C56 !important; border-color:#3A3388 !important; }
      .e-accent { color:#A79EFF !important; }
      .e-eyebrow { background-color:#262066 !important; }
      .e-chip-g { background-color:#12351F !important; color:#6FD79B !important; }
      .e-chip-p { background-color:#262066 !important; color:#B3AAFF !important; }
      .e-foot, .e-foot a { color:#9A97C4 !important; }
      .e-logo { background-color:#F3F2FA !important; border-radius:8px !important; padding:6px 8px !important; }
    }
    [data-ogsc] .e-card { background-color:#17143E !important; }
    [data-ogsc] .e-ink { color:#F1EFFF !important; }
    [data-ogsc] .e-mut { color:#B7B4DD !important; }
    [data-ogsc] .e-sub { background-color:#1C1848 !important; }
    [data-ogsc] .e-panel { background-color:#221C56 !important; }
    [data-ogsc] .e-accent { color:#A79EFF !important; }
  </style>
</head>
<body class="e-bg" style="margin:0 !important; padding:0 !important; background-color:#F3F2FA;">
  <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px;">Your Transcribr account and transcripts have been deleted.</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-bg" style="width:100%; background-color:#F3F2FA;">
    <tr>
      <td align="center" style="padding:32px 12px 40px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrap" style="width:600px; max-width:600px;">
          <tr>
            <td align="left" class="e-logo" style="padding:0 8px 18px 8px;">
              <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="128" alt="Transcribr" style="display:block; border:0; width:128px; max-width:128px;" />
            </td>
          </tr>
          <tr>
            <td bgcolor="#FFFFFF" class="e-card" style="border:1px solid #E4E1F5; border-radius:18px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                <tr><td height="4" bgcolor="#5B50E8" style="height:4px; line-height:4px; font-size:0; border-radius:18px 18px 0 0;">&nbsp;</td></tr>
                <tr>
                  <td class="gutter" style="padding:38px 40px 40px 40px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;"><tr>
                      <td bgcolor="#EFEDFD" class="e-eyebrow e-accent" style="border-radius:20px; padding:7px 14px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:12px; font-weight:700; letter-spacing:0.6px; text-transform:uppercase; color:#5B50E8; line-height:16px; mso-line-height-rule:exactly;">Account closed</td>
                    </tr></table>
                    <h1 class="h1 e-ink" style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:32px; font-weight:700; letter-spacing:-0.7px; line-height:40px; mso-line-height-rule:exactly; color:#1B1D26;">Your account has been deleted</h1>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:0px 0 0 0;">Hi {{name}},</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">This confirms that the Transcribr account for <strong class="e-ink" style="color:#1B1D26;">{{email}}</strong> has been deleted, along with its transcripts and uploads.</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">We&rsquo;re sorry to see you go. If you come back later, you can create a new account at any time.</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-sub" style="width:100%; border-left:3px solid #5C5F70; background-color:#FBFAFF;"><tr>
                    <td class="e-mut" style="padding:14px 18px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; line-height:22px; mso-line-height-rule:exactly; color:#5C5F70;">Think this was a mistake? Contact <a href="mailto:support@transcribr.org" class="e-accent" style="color:#5B50E8; font-weight:700; text-decoration:none;">support@transcribr.org</a> as soon as possible.</td>
                  </tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Sincerely,<br /><span class="e-ink" style="color:#1B1D26; font-weight:700;">The Transcribr Team</span></div></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="gutter e-foot" align="center" style="padding:26px 24px 0 24px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:13px; line-height:21px; mso-line-height-rule:exactly; color:#6E7186;">
              <div><a href="https://transcribr.org" target="_blank" style="color:#6E7186; text-decoration:underline;">transcribr.org</a> &nbsp;&middot;&nbsp; <a href="mailto:support@transcribr.org" style="color:#6E7186; text-decoration:underline;">support@transcribr.org</a></div>
              <div style="padding-top:8px;">&copy; {{year}} Transcribr. All rights reserved.</div>
              
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
    const template = Handlebars.compile(source);
    return template(data);
  }

  getSubscriptionReminderTemplate(body: SubscriptionRemiderBody): string {
    const data = { ...body, year: this.year };

    const source = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Your Transcribr subscription renews soon</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    table { border-collapse:collapse !important; }
    body { height:100% !important; margin:0 !important; padding:0 !important; width:100% !important; }
    a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }
    @media screen and (max-width:600px) {
      .wrap { width:100% !important; }
      .gutter { padding-left:24px !important; padding-right:24px !important; }
      .h1 { font-size:26px !important; line-height:33px !important; }
    }
    @media (prefers-color-scheme: dark) {
      body, .e-bg { background-color:#0E0C24 !important; }
      .e-card { background-color:#17143E !important; border-color:#302A73 !important; }
      .e-ink, .e-ink strong { color:#F1EFFF !important; }
      .e-mut { color:#B7B4DD !important; }
      .e-sub { background-color:#1C1848 !important; border-color:#302A73 !important; }
      .e-hr { border-top-color:#302A73 !important; }
      .e-panel { background-color:#221C56 !important; border-color:#3A3388 !important; }
      .e-accent { color:#A79EFF !important; }
      .e-eyebrow { background-color:#262066 !important; }
      .e-chip-g { background-color:#12351F !important; color:#6FD79B !important; }
      .e-chip-p { background-color:#262066 !important; color:#B3AAFF !important; }
      .e-foot, .e-foot a { color:#9A97C4 !important; }
      .e-logo { background-color:#F3F2FA !important; border-radius:8px !important; padding:6px 8px !important; }
    }
    [data-ogsc] .e-card { background-color:#17143E !important; }
    [data-ogsc] .e-ink { color:#F1EFFF !important; }
    [data-ogsc] .e-mut { color:#B7B4DD !important; }
    [data-ogsc] .e-sub { background-color:#1C1848 !important; }
    [data-ogsc] .e-panel { background-color:#221C56 !important; }
    [data-ogsc] .e-accent { color:#A79EFF !important; }
  </style>
</head>
<body class="e-bg" style="margin:0 !important; padding:0 !important; background-color:#F3F2FA;">
  <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px;">Your {{plan}} plan renews on {{date}} for {{amount}}.</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-bg" style="width:100%; background-color:#F3F2FA;">
    <tr>
      <td align="center" style="padding:32px 12px 40px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrap" style="width:600px; max-width:600px;">
          <tr>
            <td align="left" class="e-logo" style="padding:0 8px 18px 8px;">
              <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="128" alt="Transcribr" style="display:block; border:0; width:128px; max-width:128px;" />
            </td>
          </tr>
          <tr>
            <td bgcolor="#FFFFFF" class="e-card" style="border:1px solid #E4E1F5; border-radius:18px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                <tr><td height="4" bgcolor="#5B50E8" style="height:4px; line-height:4px; font-size:0; border-radius:18px 18px 0 0;">&nbsp;</td></tr>
                <tr>
                  <td class="gutter" style="padding:38px 40px 40px 40px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;"><tr>
                      <td bgcolor="#EFEDFD" class="e-eyebrow e-accent" style="border-radius:20px; padding:7px 14px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:12px; font-weight:700; letter-spacing:0.6px; text-transform:uppercase; color:#5B50E8; line-height:16px; mso-line-height-rule:exactly;">Billing</td>
                    </tr></table>
                    <h1 class="h1 e-ink" style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:32px; font-weight:700; letter-spacing:-0.7px; line-height:40px; mso-line-height-rule:exactly; color:#1B1D26;">Your subscription renews soon</h1>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:0px 0 0 0;">Hi {{name}},</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Just a heads-up before your plan renews. No action is needed if you would like to continue.</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-sub" style="width:100%; border:1px solid #E4E1F5; border-radius:14px; background-color:#FBFAFF;"><tr><td style="padding:6px 22px 8px 22px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                      <tr>
                        <td width="45%" class="e-mut" style="padding:14px 0;  font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; line-height:20px; mso-line-height-rule:exactly; color:#5C5F70;">Plan</td>
                        <td width="55%" align="right" class="e-ink" style="padding:14px 0;  font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:15px; font-weight:700; line-height:20px; mso-line-height-rule:exactly; color:#1B1D26;">{{plan}}</td>
                      </tr>
                      <tr>
                        <td width="45%" class="e-mut e-hr" style="padding:14px 0; border-top:1px solid #E4E1F5; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; line-height:20px; mso-line-height-rule:exactly; color:#5C5F70;">Renews on</td>
                        <td width="55%" align="right" class="e-ink e-hr" style="padding:14px 0; border-top:1px solid #E4E1F5; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:15px; font-weight:700; line-height:20px; mso-line-height-rule:exactly; color:#1B1D26;">{{date}}</td>
                      </tr>
                      <tr>
                        <td width="45%" class="e-mut e-hr" style="padding:14px 0; border-top:1px solid #E4E1F5; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; line-height:20px; mso-line-height-rule:exactly; color:#5C5F70;">Amount</td>
                        <td width="55%" align="right" class="e-ink e-hr" style="padding:14px 0; border-top:1px solid #E4E1F5; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:15px; font-weight:700; line-height:20px; mso-line-height-rule:exactly; color:#1B1D26;">{{amount}}</td>
                      </tr>
                    </table>
                  </td></tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0;"><tr>
                    <td align="center" bgcolor="#5B50E8" class="e-btn" style="border-radius:10px; padding:15px 30px; mso-padding-alt:15px 30px;">
                      <a href="https://app.transcribr.org/dashboard/subscription" target="_blank" style="display:block; color:#ffffff; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; font-weight:700; line-height:20px; mso-line-height-rule:exactly; text-decoration:none; letter-spacing:-0.1px;">Manage subscription</a>
                    </td></tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">You can change plans or cancel any time before the renewal date.</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Best regards,<br /><span class="e-ink" style="color:#1B1D26; font-weight:700;">The Transcribr Team</span></div></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="gutter e-foot" align="center" style="padding:26px 24px 0 24px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:13px; line-height:21px; mso-line-height-rule:exactly; color:#6E7186;">
              <div><a href="https://transcribr.org" target="_blank" style="color:#6E7186; text-decoration:underline;">transcribr.org</a> &nbsp;&middot;&nbsp; <a href="mailto:support@transcribr.org" style="color:#6E7186; text-decoration:underline;">support@transcribr.org</a> &nbsp;&middot;&nbsp; <a href="https://app.transcribr.org/dashboard/profile" target="_blank" style="color:#6E7186; text-decoration:underline;">Email preferences</a></div>
              <div style="padding-top:8px;">&copy; {{year}} Transcribr. All rights reserved.</div>
              <div style="padding-top:8px;">You received this because you have a Transcribr account. <a href="https://app.transcribr.org/dashboard/profile" target="_blank" style="color:#6E7186; text-decoration:underline;">Unsubscribe</a> from product notifications.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
    const template = Handlebars.compile(source);
    return template(data);
  }

  getPasswordResetSuccessTemplate(name: string): string {
    const data = { name, year: this.year };

    const source = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Your Transcribr password has been reset</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    table { border-collapse:collapse !important; }
    body { height:100% !important; margin:0 !important; padding:0 !important; width:100% !important; }
    a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }
    @media screen and (max-width:600px) {
      .wrap { width:100% !important; }
      .gutter { padding-left:24px !important; padding-right:24px !important; }
      .h1 { font-size:26px !important; line-height:33px !important; }
    }
    @media (prefers-color-scheme: dark) {
      body, .e-bg { background-color:#0E0C24 !important; }
      .e-card { background-color:#17143E !important; border-color:#302A73 !important; }
      .e-ink, .e-ink strong { color:#F1EFFF !important; }
      .e-mut { color:#B7B4DD !important; }
      .e-sub { background-color:#1C1848 !important; border-color:#302A73 !important; }
      .e-hr { border-top-color:#302A73 !important; }
      .e-panel { background-color:#221C56 !important; border-color:#3A3388 !important; }
      .e-accent { color:#A79EFF !important; }
      .e-eyebrow { background-color:#262066 !important; }
      .e-chip-g { background-color:#12351F !important; color:#6FD79B !important; }
      .e-chip-p { background-color:#262066 !important; color:#B3AAFF !important; }
      .e-foot, .e-foot a { color:#9A97C4 !important; }
      .e-logo { background-color:#F3F2FA !important; border-radius:8px !important; padding:6px 8px !important; }
    }
    [data-ogsc] .e-card { background-color:#17143E !important; }
    [data-ogsc] .e-ink { color:#F1EFFF !important; }
    [data-ogsc] .e-mut { color:#B7B4DD !important; }
    [data-ogsc] .e-sub { background-color:#1C1848 !important; }
    [data-ogsc] .e-panel { background-color:#221C56 !important; }
    [data-ogsc] .e-accent { color:#A79EFF !important; }
  </style>
</head>
<body class="e-bg" style="margin:0 !important; padding:0 !important; background-color:#F3F2FA;">
  <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px;">Your password was reset — you can sign in with it now.</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-bg" style="width:100%; background-color:#F3F2FA;">
    <tr>
      <td align="center" style="padding:32px 12px 40px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrap" style="width:600px; max-width:600px;">
          <tr>
            <td align="left" class="e-logo" style="padding:0 8px 18px 8px;">
              <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="128" alt="Transcribr" style="display:block; border:0; width:128px; max-width:128px;" />
            </td>
          </tr>
          <tr>
            <td bgcolor="#FFFFFF" class="e-card" style="border:1px solid #E4E1F5; border-radius:18px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                <tr><td height="4" bgcolor="#5B50E8" style="height:4px; line-height:4px; font-size:0; border-radius:18px 18px 0 0;">&nbsp;</td></tr>
                <tr>
                  <td class="gutter" style="padding:38px 40px 40px 40px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;"><tr>
                      <td bgcolor="#EFEDFD" class="e-eyebrow e-accent" style="border-radius:20px; padding:7px 14px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:12px; font-weight:700; letter-spacing:0.6px; text-transform:uppercase; color:#5B50E8; line-height:16px; mso-line-height-rule:exactly;">Security</td>
                    </tr></table>
                    <h1 class="h1 e-ink" style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:32px; font-weight:700; letter-spacing:-0.7px; line-height:40px; mso-line-height-rule:exactly; color:#1B1D26;">Password reset complete</h1>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:0px 0 0 0;">Hi {{name}},</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Your Transcribr password has been reset. You can sign in with your new password now.</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0;"><tr>
                    <td align="center" bgcolor="#5B50E8" class="e-btn" style="border-radius:10px; padding:15px 30px; mso-padding-alt:15px 30px;">
                      <a href="https://app.transcribr.org" target="_blank" style="display:block; color:#ffffff; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; font-weight:700; line-height:20px; mso-line-height-rule:exactly; text-decoration:none; letter-spacing:-0.1px;">Sign in</a>
                    </td></tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-sub" style="width:100%; border-left:3px solid #C2352F; background-color:#FBFAFF;"><tr>
                    <td class="e-mut" style="padding:14px 18px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; line-height:22px; mso-line-height-rule:exactly; color:#5C5F70;">Didn&rsquo;t do this? Contact <a href="mailto:support@transcribr.org" class="e-accent" style="color:#5B50E8; font-weight:700; text-decoration:none;">support@transcribr.org</a> immediately so we can secure your account.</td>
                  </tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Sincerely,<br /><span class="e-ink" style="color:#1B1D26; font-weight:700;">The Transcribr Team</span></div></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="gutter e-foot" align="center" style="padding:26px 24px 0 24px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:13px; line-height:21px; mso-line-height-rule:exactly; color:#6E7186;">
              <div><a href="https://transcribr.org" target="_blank" style="color:#6E7186; text-decoration:underline;">transcribr.org</a> &nbsp;&middot;&nbsp; <a href="mailto:support@transcribr.org" style="color:#6E7186; text-decoration:underline;">support@transcribr.org</a></div>
              <div style="padding-top:8px;">&copy; {{year}} Transcribr. All rights reserved.</div>
              
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
    const template = Handlebars.compile(source);
    return template(data);
  }

  getPasswordUpdatedTemplate(name: string, timestamp: string): string {
    const data = { name, timestamp, year: this.year };

    const source = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Your Transcribr password has been updated</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    table { border-collapse:collapse !important; }
    body { height:100% !important; margin:0 !important; padding:0 !important; width:100% !important; }
    a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }
    @media screen and (max-width:600px) {
      .wrap { width:100% !important; }
      .gutter { padding-left:24px !important; padding-right:24px !important; }
      .h1 { font-size:26px !important; line-height:33px !important; }
    }
    @media (prefers-color-scheme: dark) {
      body, .e-bg { background-color:#0E0C24 !important; }
      .e-card { background-color:#17143E !important; border-color:#302A73 !important; }
      .e-ink, .e-ink strong { color:#F1EFFF !important; }
      .e-mut { color:#B7B4DD !important; }
      .e-sub { background-color:#1C1848 !important; border-color:#302A73 !important; }
      .e-hr { border-top-color:#302A73 !important; }
      .e-panel { background-color:#221C56 !important; border-color:#3A3388 !important; }
      .e-accent { color:#A79EFF !important; }
      .e-eyebrow { background-color:#262066 !important; }
      .e-chip-g { background-color:#12351F !important; color:#6FD79B !important; }
      .e-chip-p { background-color:#262066 !important; color:#B3AAFF !important; }
      .e-foot, .e-foot a { color:#9A97C4 !important; }
      .e-logo { background-color:#F3F2FA !important; border-radius:8px !important; padding:6px 8px !important; }
    }
    [data-ogsc] .e-card { background-color:#17143E !important; }
    [data-ogsc] .e-ink { color:#F1EFFF !important; }
    [data-ogsc] .e-mut { color:#B7B4DD !important; }
    [data-ogsc] .e-sub { background-color:#1C1848 !important; }
    [data-ogsc] .e-panel { background-color:#221C56 !important; }
    [data-ogsc] .e-accent { color:#A79EFF !important; }
  </style>
</head>
<body class="e-bg" style="margin:0 !important; padding:0 !important; background-color:#F3F2FA;">
  <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px;">Your password was changed at {{timestamp}}.</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-bg" style="width:100%; background-color:#F3F2FA;">
    <tr>
      <td align="center" style="padding:32px 12px 40px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrap" style="width:600px; max-width:600px;">
          <tr>
            <td align="left" class="e-logo" style="padding:0 8px 18px 8px;">
              <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="128" alt="Transcribr" style="display:block; border:0; width:128px; max-width:128px;" />
            </td>
          </tr>
          <tr>
            <td bgcolor="#FFFFFF" class="e-card" style="border:1px solid #E4E1F5; border-radius:18px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                <tr><td height="4" bgcolor="#5B50E8" style="height:4px; line-height:4px; font-size:0; border-radius:18px 18px 0 0;">&nbsp;</td></tr>
                <tr>
                  <td class="gutter" style="padding:38px 40px 40px 40px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;"><tr>
                      <td bgcolor="#EFEDFD" class="e-eyebrow e-accent" style="border-radius:20px; padding:7px 14px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:12px; font-weight:700; letter-spacing:0.6px; text-transform:uppercase; color:#5B50E8; line-height:16px; mso-line-height-rule:exactly;">Security</td>
                    </tr></table>
                    <h1 class="h1 e-ink" style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:32px; font-weight:700; letter-spacing:-0.7px; line-height:40px; mso-line-height-rule:exactly; color:#1B1D26;">Your password was changed</h1>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:0px 0 0 0;">Hi {{name}},</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">The password for your Transcribr account was successfully updated.</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-sub" style="width:100%; border:1px solid #E4E1F5; border-radius:14px; background-color:#FBFAFF;"><tr><td style="padding:6px 22px 8px 22px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                      <tr>
                        <td width="45%" class="e-mut" style="padding:14px 0;  font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; line-height:20px; mso-line-height-rule:exactly; color:#5C5F70;">Changed at</td>
                        <td width="55%" align="right" class="e-ink" style="padding:14px 0;  font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:15px; font-weight:700; line-height:20px; mso-line-height-rule:exactly; color:#1B1D26;">{{timestamp}}</td>
                      </tr>
                    </table>
                  </td></tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0;"><tr>
                    <td align="center" bgcolor="#5B50E8" class="e-btn" style="border-radius:10px; padding:15px 30px; mso-padding-alt:15px 30px;">
                      <a href="https://app.transcribr.org/dashboard/transcript" target="_blank" style="display:block; color:#ffffff; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; font-weight:700; line-height:20px; mso-line-height-rule:exactly; text-decoration:none; letter-spacing:-0.1px;">Go to dashboard</a>
                    </td></tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-sub" style="width:100%; border-left:3px solid #C2352F; background-color:#FBFAFF;"><tr>
                    <td class="e-mut" style="padding:14px 18px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:14px; line-height:22px; mso-line-height-rule:exactly; color:#5C5F70;">If this wasn&rsquo;t you, contact <a href="mailto:support@transcribr.org" class="e-accent" style="color:#5B50E8; font-weight:700; text-decoration:none;">support@transcribr.org</a> right away.</td>
                  </tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Best regards,<br /><span class="e-ink" style="color:#1B1D26; font-weight:700;">The Transcribr Team</span></div></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="gutter e-foot" align="center" style="padding:26px 24px 0 24px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:13px; line-height:21px; mso-line-height-rule:exactly; color:#6E7186;">
              <div><a href="https://transcribr.org" target="_blank" style="color:#6E7186; text-decoration:underline;">transcribr.org</a> &nbsp;&middot;&nbsp; <a href="mailto:support@transcribr.org" style="color:#6E7186; text-decoration:underline;">support@transcribr.org</a></div>
              <div style="padding-top:8px;">&copy; {{year}} Transcribr. All rights reserved.</div>
              
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
    const template = Handlebars.compile(source);
    return template(data);
  }

  getWaitlistTemplate(email: string): string {
    const data = { email, year: this.year };

    const source = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>You&rsquo;re on the Transcribr waitlist</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    table { border-collapse:collapse !important; }
    body { height:100% !important; margin:0 !important; padding:0 !important; width:100% !important; }
    a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }
    @media screen and (max-width:600px) {
      .wrap { width:100% !important; }
      .gutter { padding-left:24px !important; padding-right:24px !important; }
      .h1 { font-size:26px !important; line-height:33px !important; }
    }
    @media (prefers-color-scheme: dark) {
      body, .e-bg { background-color:#0E0C24 !important; }
      .e-card { background-color:#17143E !important; border-color:#302A73 !important; }
      .e-ink, .e-ink strong { color:#F1EFFF !important; }
      .e-mut { color:#B7B4DD !important; }
      .e-sub { background-color:#1C1848 !important; border-color:#302A73 !important; }
      .e-hr { border-top-color:#302A73 !important; }
      .e-panel { background-color:#221C56 !important; border-color:#3A3388 !important; }
      .e-accent { color:#A79EFF !important; }
      .e-eyebrow { background-color:#262066 !important; }
      .e-chip-g { background-color:#12351F !important; color:#6FD79B !important; }
      .e-chip-p { background-color:#262066 !important; color:#B3AAFF !important; }
      .e-foot, .e-foot a { color:#9A97C4 !important; }
      .e-logo { background-color:#F3F2FA !important; border-radius:8px !important; padding:6px 8px !important; }
    }
    [data-ogsc] .e-card { background-color:#17143E !important; }
    [data-ogsc] .e-ink { color:#F1EFFF !important; }
    [data-ogsc] .e-mut { color:#B7B4DD !important; }
    [data-ogsc] .e-sub { background-color:#1C1848 !important; }
    [data-ogsc] .e-panel { background-color:#221C56 !important; }
    [data-ogsc] .e-accent { color:#A79EFF !important; }
  </style>
</head>
<body class="e-bg" style="margin:0 !important; padding:0 !important; background-color:#F3F2FA;">
  <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px;">You&rsquo;re on the list — we&rsquo;ll email you the moment a spot opens.</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="e-bg" style="width:100%; background-color:#F3F2FA;">
    <tr>
      <td align="center" style="padding:32px 12px 40px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrap" style="width:600px; max-width:600px;">
          <tr>
            <td align="left" class="e-logo" style="padding:0 8px 18px 8px;">
              <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="128" alt="Transcribr" style="display:block; border:0; width:128px; max-width:128px;" />
            </td>
          </tr>
          <tr>
            <td bgcolor="#FFFFFF" class="e-card" style="border:1px solid #E4E1F5; border-radius:18px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                <tr><td height="4" bgcolor="#5B50E8" style="height:4px; line-height:4px; font-size:0; border-radius:18px 18px 0 0;">&nbsp;</td></tr>
                <tr>
                  <td class="gutter" style="padding:38px 40px 40px 40px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;"><tr>
                      <td bgcolor="#EFEDFD" class="e-eyebrow e-accent" style="border-radius:20px; padding:7px 14px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:12px; font-weight:700; letter-spacing:0.6px; text-transform:uppercase; color:#5B50E8; line-height:16px; mso-line-height-rule:exactly;">Waitlist</td>
                    </tr></table>
                    <h1 class="h1 e-ink" style="margin:0; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:32px; font-weight:700; letter-spacing:-0.7px; line-height:40px; mso-line-height-rule:exactly; color:#1B1D26;">You&rsquo;re on the list</h1>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:0px 0 0 0;">Hi {{email}},</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Thanks for your interest in Transcribr. You&rsquo;re on the waitlist, and we&rsquo;ll email you as soon as a spot opens up.</div></td></tr>
                      <tr><td style="padding-top:22px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0;"><tr>
                    <td align="center" bgcolor="#5B50E8" class="e-btn" style="border-radius:10px; padding:15px 30px; mso-padding-alt:15px 30px;">
                      <a href="https://transcribr.org" target="_blank" style="display:block; color:#ffffff; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; font-weight:700; line-height:20px; mso-line-height-rule:exactly; text-decoration:none; letter-spacing:-0.1px;">See what&rsquo;s coming</a>
                    </td></tr></table></td></tr>
                      <tr><td style="padding-top:22px;">
                  <div class="e-mut" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#5C5F70; margin:18px 0 0 0;">Best regards,<br /><span class="e-ink" style="color:#1B1D26; font-weight:700;">The Transcribr Team</span></div></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="gutter e-foot" align="center" style="padding:26px 24px 0 24px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:13px; line-height:21px; mso-line-height-rule:exactly; color:#6E7186;">
              <div><a href="https://transcribr.org" target="_blank" style="color:#6E7186; text-decoration:underline;">transcribr.org</a> &nbsp;&middot;&nbsp; <a href="mailto:support@transcribr.org" style="color:#6E7186; text-decoration:underline;">support@transcribr.org</a> &nbsp;&middot;&nbsp; <a href="https://app.transcribr.org/dashboard/profile" target="_blank" style="color:#6E7186; text-decoration:underline;">Email preferences</a></div>
              <div style="padding-top:8px;">&copy; {{year}} Transcribr. All rights reserved.</div>
              <div style="padding-top:8px;">You received this because you have a Transcribr account. <a href="https://app.transcribr.org/dashboard/profile" target="_blank" style="color:#6E7186; text-decoration:underline;">Unsubscribe</a> from product notifications.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
    const template = Handlebars.compile(source);
    return template(data);
  }
}
