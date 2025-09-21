import * as Handlebars from "handlebars";

export type SubscriptionRemiderBody = {
  name: string;
  plan: string;
  date: string;
  amount: string;
};

export class TemplateService {
  get year(): number {
    return new Date().getFullYear();
  }
  getWelcomeTemplate(name: string): string {
    const data = {
      name,
      year: this.year,
    };

    const source = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to Transcribr!</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Inter Regular'), local('Inter-Regular'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Inter Bold'), local('Inter-Bold'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
            }
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; }
            img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Inter', Helvetica, Arial, sans-serif; }
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
            @media screen and (max-width: 525px) {
                .wrapper { width: 100% !important; max-width: 100% !important; }
                .responsive-table { width: 100% !important; }
                .padding { padding: 10px 5% 10px 5% !important; }
                .section-padding { padding: 0 15px 50px 15px !important; }
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #6C63FF; /* Transcribr primary purple */
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 8px;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #554EDC;
            }
        </style>
    </head>
    <body style="margin: 0 !important; padding: 0 !important;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td bgcolor="#f8f8f8" align="center" style="padding: 20px 15px 20px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 8px 8px 0px 0px; color: #1a1a1a; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 700; line-height: 36px;">
                            <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="150" height="auto" style="display: block; border: 0px;" alt="Transcribr Logo">
                            <h1 style="font-size: 30px; font-weight: 700; margin: 30px 0 0 0;">Welcome to Transcribr!</h1>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                            <p style="margin: 0;">Hi {{name}},</p>
                            <p style="margin: 20px 0 0 0;">Welcome to the Transcribr family! We're thrilled to have you join us.</p>
                            <p style="margin: 20px 0 0 0;">Get ready to experience professional AI-powered transcription with synchronized playback, speaker identification, and real-time editing. We're here to make your audio-to-text journey seamless and accurate.</p>
                            <p style="margin: 30px 0 0 0; text-align: center;">
                                <a href="https://app.transcribr.org" target="_blank" class="button">Start Transcribing Now</a>
                            </p>
                            <p style="margin: 40px 0 0 0;">If you have any questions, don't hesitate to reach out to our <a href="mailto:support@transcribr.org" style="color: #6C63FF; text-decoration: none;">support team</a>.</p>
                            <p style="margin: 20px 0 0 0;">Happy Transcribing!</p>
                            <p style="margin: 0;">The Transcribr Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f8f8f8" align="center" style="padding: 20px 30px 20px 30px; color: #999999; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px;">
                            <p style="margin: 0;">&copy; {{year}} Transcribr. All rights reserved.</p>
                            <p style="margin: 5px 0 0 0;"><a href="https://transcribr.org" target="_blank" style="color: #999999; text-decoration: none;">transcribr.org</a></p>
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
    const data = {
      name,
      otp,
      year: this.year,
    };

    const source = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Your Transcribr Verification Code</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Inter Regular'), local('Inter-Regular'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }

                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Inter Bold'), local('Inter-Bold'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
            }

            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }

            img {
                -ms-interpolation-mode: bicubic;
            }

            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }

            table {
                border-collapse: collapse !important;
            }

            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                font-family: 'Inter', Helvetica, Arial, sans-serif;
            }

            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }

            @media screen and (max-width: 525px) {
                .wrapper {
                    width: 100% !important;
                    max-width: 100% !important;
                }

                .responsive-table {
                    width: 100% !important;
                }

                .padding {
                    padding: 10px 5% 10px 5% !important;
                }

                .section-padding {
                    padding: 0 15px 50px 15px !important;
                }
            }

            .otp-container {
                background-color: #f0f0f0;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
            }

            .otp-code {
                font-size: 32px;
                font-weight: 700;
                letter-spacing: 5px;
                color: #6C63FF;
            }

            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #6C63FF;
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 8px;
                transition: background-color 0.3s ease;
            }

            .button:hover {
                background-color: #554EDC;
            }
        </style>
    </head>

    <body style="margin: 0 !important; padding: 0 !important;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td bgcolor="#f8f8f8" align="center" style="padding: 20px 15px 20px 15px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="center" valign="top"
                                style="padding: 40px 20px 20px 20px; border-radius: 8px 8px 0px 0px; color: #1a1a1a; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 700; line-height: 36px;">
                                <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="150" height="auto" style="display: block; border: 0px;" alt="Transcribr Logo">
                                <h1 style="font-size: 30px; font-weight: 700; margin: 30px 0 0 0;">Your Verification Code
                                </h1>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left"
                                style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                <p style="margin: 0;">Hi {{name}},</p>
                                <p style="margin: 20px 0 0 0;">Thank you for signing up with Transcribr. Please use the
                                    following code to verify your email address:</p>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0;">
                                    <tr>
                                        <td align="center">
                                            <div class="otp-container">
                                                <p style="margin: 0; font-size: 14px; color: #999999;">Your verification
                                                    code is:</p>
                                                <p class="otp-code" style="margin: 10px 0 0 0;">{{otp}}</p>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <p style="margin: 20px 0 0 0;">This code will expire in 5 minutes. Please do not
                                    share this code with anyone. If you didn't sign up for Transcribr, please disregard this
                                    email.</p>
                                <p style="margin: 20px 0 0 0;">Thanks,</p>
                                <p style="margin: 0;">The Transcribr Team</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f8f8f8" align="center"
                                style="padding: 20px 30px 20px 30px; color: #999999; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px;">
                                <p style="margin: 0;">&copy; {{year}} Transcribr. All rights reserved.</p>
                                <p style="margin: 5px 0 0 0;"><a href="https://transcribr.org" target="_blank"
                                        style="color: #999999; text-decoration: none;">transcribr.org</a></p>
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
    const data = {
      name,
      email,
      year: this.year,
    };

    const source = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Your Transcribr Account is Fully Verified!</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Inter Regular'), local('Inter-Regular'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Inter Bold'), local('Inter-Bold'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
            }
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; }
            img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Inter', Helvetica, Arial, sans-serif; }
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
            @media screen and (max-width: 525px) {
                .wrapper { width: 100% !important; max-width: 100% !important; }
                .responsive-table { width: 100% !important; }
                .padding { padding: 10px 5% 10px 5% !important; }
                .section-padding { padding: 0 15px 50px 15px !important; }
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #6C63FF; /* Transcribr primary purple */
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 8px;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #554EDC;
            }
        </style>
    </head>
    <body style="margin: 0 !important; padding: 0 !important;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td bgcolor="#f8f8f8" align="center" style="padding: 20px 15px 20px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 8px 8px 0px 0px; color: #1a1a1a; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 700; line-height: 36px;">
                            <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="150" height="auto" style="display: block; border: 0px;" alt="Transcribr Logo">
                            <h1 style="font-size: 30px; font-weight: 700; margin: 30px 0 0 0;">Account Fully Verified!</h1>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                            <p style="margin: 0;">Hi {{name}},</p>
                            <p style="margin: 20px 0 0 0;">Congratulations! Your Transcribr account, associated with <strong>{{email}}</strong>, is now fully verified.</p>
                            <p style="margin: 20px 0 0 0;">You have full access to all Transcribr features, We're excited for you to get the most out of Transcribr!</p>
                            <p style="margin: 20px 0 0 0;">Best,</p>
                            <p style="margin: 0;">The Transcribr Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f8f8f8" align="center" style="padding: 20px 30px 20px 30px; color: #999999; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px;">
                            <p style="margin: 0;">&copy; {{year}} Transcribr. All rights reserved.</p>
                            <p style="margin: 5px 0 0 0;"><a href="https://transcribr.org" target="_blank" style="color: #999999; text-decoration: none;">transcribr.org</a></p>
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

  getTranscriptReadyTemplate(
    name: string,
    link: string,
    title: string
  ): string {
    const data = {
      name,
      link,
      title,
      year: this.year,
    };

    const source = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Your Transcribr Transcription is Ready!</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Inter Regular'), local('Inter-Regular'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Inter Bold'), local('Inter-Bold'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
            }
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; }
            img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Inter', Helvetica, Arial, sans-serif; }
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
            @media screen and (max-width: 525px) {
                .wrapper { width: 100% !important; max-width: 100% !important; }
                .responsive-table { width: 100% !important; }
                .padding { padding: 10px 5% 10px 5% !important; }
                .section-padding { padding: 0 15px 50px 15px !important; }
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #6C63FF; /* Transcribr primary purple */
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 8px;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #554EDC;
            }
        </style>
    </head>
    <body style="margin: 0 !important; padding: 0 !important;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td bgcolor="#f8f8f8" align="center" style="padding: 20px 15px 20px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 8px 8px 0px 0px; color: #1a1a1a; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 700; line-height: 36px;">
                            <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="150" height="auto" style="display: block; border: 0px;" alt="Transcribr Logo">
                            <h1 style="font-size: 30px; font-weight: 700; margin: 30px 0 0 0;">Your Transcript is Ready!</h1>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                            <p style="margin: 0;">Hi {{name}},</p>
                            <p style="margin: 20px 0 0 0;">Good news! Your transcription for "<strong>{{title}}</strong>" is complete and ready for you to review.</p>
                            <p style="margin: 20px 0 0 0;">You can access and edit your transcription here:</p>
                            <p style="margin: 30px 0 0 0; text-align: center;">
                                <a href="{{link}}" target="_blank" class="button">View Transcription</a>
                            </p>
                            <p style="margin: 40px 0 0 0;">We hope you find it accurate and useful!</p>
                            <p style="margin: 20px 0 0 0;">Best,</p>
                            <p style="margin: 0;">The Transcribr Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f8f8f8" align="center" style="padding: 20px 30px 20px 30px; color: #999999; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px;">
                            <p style="margin: 0;">&copy; {{year}} Transcribr. All rights reserved.</p>
                            <p style="margin: 5px 0 0 0;"><a href="https://transcribr.org" target="_blank" style="color: #999999; text-decoration: none;">transcribr.org</a></p>
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
    const data = {
      name,
      otp,
      year: this.year,
    };

    const source = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Your Transcribr Password Reset Code</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Inter Regular'), local('Inter-Regular'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Inter Bold'), local('Inter-Bold'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
            }
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; }
            img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Inter', Helvetica, Arial, sans-serif; }
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
            @media screen and (max-width: 525px) {
                .wrapper { width: 100% !important; max-width: 100% !important; }
                .responsive-table { width: 100% !important; }
                .padding { padding: 10px 5% 10px 5% !important; }
                .section-padding { padding: 0 15px 50px 15px !important; }
            }
            .otp-container {
                background-color: #f0f0f0;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
            }
            .otp-code {
                font-size: 32px;
                font-weight: 700;
                letter-spacing: 5px;
                color: #6C63FF;
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #6C63FF;
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 8px;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #554EDC;
            }
        </style>
    </head>
    <body style="margin: 0 !important; padding: 0 !important;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td bgcolor="#f8f8f8" align="center" style="padding: 20px 15px 20px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 8px 8px 0px 0px; color: #1a1a1a; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 700; line-height: 36px;">
                            <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="150" height="auto" style="display: block; border: 0px;" alt="Transcribr Logo">
                            <h1 style="font-size: 30px; font-weight: 700; margin: 30px 0 0 0;">Password Reset Code</h1>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                            <p style="margin: 0;">Hi {{name}},</p>
                            <p style="margin: 20px 0 0 0;">We received a request to reset your Transcribr password. Please use the following one-time code to proceed:</p>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <div class="otp-container">
                                            <p style="margin: 0; font-size: 14px; color: #999999;">Your password reset code is:</p>
                                            <p class="otp-code" style="margin: 10px 0 0 0;">{{otp}}</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin: 20px 0 0 0;">This code is valid for a limited time. For security reasons, do not share this code with anyone. If you did not request a password reset, please ignore this email.</p>
                            <p style="margin: 20px 0 0 0;">Sincerely,</p>
                            <p style="margin: 0;">The Transcribr Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f8f8f8" align="center" style="padding: 20px 30px 20px 30px; color: #999999; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px;">
                            <p style="margin: 0;">&copy; {{year}} Transcribr. All rights reserved.</p>
                            <p style="margin: 5px 0 0 0;"><a href="https://transcribr.org" target="_blank" style="color: #999999; text-decoration: none;">transcribr.org</a></p>
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
    const data = {
      name,
      email,
      year: this.year,
    };

    const source = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Important: Your Transcribr Account Has Been Suspended</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Inter Regular'), local('Inter-Regular'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Inter Bold'), local('Inter-Bold'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
            }
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; }
            img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Inter', Helvetica, Arial, sans-serif; }
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
            @media screen and (max-width: 525px) {
                .wrapper { width: 100% !important; max-width: 100% !important; }
                .responsive-table { width: 100% !important; }
                .padding { padding: 10px 5% 10px 5% !important; }
                .section-padding { padding: 0 15px 50px 15px !important; }
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #6C63FF; /* Transcribr primary purple */
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 8px;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #554EDC;
            }
        </style>
    </head>
    <body style="margin: 0 !important; padding: 0 !important;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td bgcolor="#f8f8f8" align="center" style="padding: 20px 15px 20px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 8px 8px 0px 0px; color: #1a1a1a; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 700; line-height: 36px;">
                            <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="150" height="auto" style="display: block; border: 0px;" alt="Transcribr Logo">
                            <h1 style="font-size: 30px; font-weight: 700; margin: 30px 0 0 0; color: #FF0000;">Account Suspended</h1>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                            <p style="margin: 0;">Hi {{name}},</p>
                            <p style="margin: 20px 0 0 0;">This is an important notification regarding your Transcribr account, associated with <strong>[User's Email]</strong>.</p>
                            <p style="margin: 20px 0 0 0;">Your account has been temporarily suspended due to <strong>[Reason for suspension, e.g., "a violation of our Terms of Service," "suspicious activity," "unpaid subscription"]</strong>.</p>
                            <p style="margin: 20px 0 0 0;">To understand the specific reason for the suspension and to discuss reinstatement, please contact our support team at <a href="mailto:support@transcribr.org" style="color: #6C63FF; text-decoration: none;">support@transcribr.org</a> or visit our Help Center:</p>
                            <p style="margin: 30px 0 0 0; text-align: center;">
                                <a href="mailto:support@transcribr.org" target="_blank" class="button" style="background-color: #FF0000;">Contact Support</a>
                            </p>
                            <p style="margin: 40px 0 0 0;">We take these actions to ensure a safe and fair environment for all our users.</p>
                            <p style="margin: 20px 0 0 0;">Sincerely,</p>
                            <p style="margin: 0;">The Transcribr Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f8f8f8" align="center" style="padding: 20px 30px 20px 30px; color: #999999; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px;">
                            <p style="margin: 0;">&copy; {{year}} Transcribr. All rights reserved.</p>
                            <p style="margin: 5px 0 0 0;"><a href="https://transcribr.org" target="_blank" style="color: #999999; text-decoration: none;">transcribr.org</a></p>
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
    const data = {
      name,
      email,
      year: this.year,
    };

    const source = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Your Transcribr Account Has Been Deleted</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Inter Regular'), local('Inter-Regular'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Inter Bold'), local('Inter-Bold'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
            }
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; }
            img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Inter', Helvetica, Arial, sans-serif; }
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
            @media screen and (max-width: 525px) {
                .wrapper { width: 100% !important; max-width: 100% !important; }
                .responsive-table { width: 100% !important; }
                .padding { padding: 10px 5% 10px 5% !important; }
                .section-padding { padding: 0 15px 50px 15px !important; }
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #6C63FF; /* Transcribr primary purple */
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 8px;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #554EDC;
            }
        </style>
    </head>
    <body style="margin: 0 !important; padding: 0 !important;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td bgcolor="#f8f8f8" align="center" style="padding: 20px 15px 20px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 8px 8px 0px 0px; color: #1a1a1a; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 700; line-height: 36px;">
                            <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="150" height="auto" style="display: block; border: 0px;" alt="Transcribr Logo">
                            <h1 style="font-size: 30px; font-weight: 700; margin: 30px 0 0 0;">Account Deleted</h1>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                            <p style="margin: 0;">Hi {{name}},</p>
                            <p style="margin: 20px 0 0 0;">This email confirms that your Transcribr account, associated with <strong>{{email}}</strong>, has been successfully deleted as per your request.</p>
                            <p style="margin: 20px 0 0 0;">We're sorry to see you go. If you ever decide to come back, we'd be happy to welcome you again.</p>
                            <p style="margin: 20px 0 0 0;">If you believe this was an error, please contact our <a href="mailto:support@transcribr.org" style="color: #6C63FF; text-decoration: none;">support team</a> immediately.</p>
                            <p style="margin: 20px 0 0 0;">Thank you for being a part of Transcribr.</p>
                            <p style="margin: 20px 0 0 0;">Sincerely,</p>
                            <p style="margin: 0;">The Transcribr Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f8f8f8" align="center" style="padding: 20px 30px 20px 30px; color: #999999; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px;">
                            <p style="margin: 0;">&copy; {{year}} Transcribr. All rights reserved.</p>
                            <p style="margin: 5px 0 0 0;"><a href="https://transcribr.org" target="_blank" style="color: #999999; text-decoration: none;">transcribr.org</a></p>
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
    const data = {
      ...body,
      year: this.year,
    };

    const source = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Your Transcribr Subscription is Renewing Soon</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Inter Regular'), local('Inter-Regular'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }

                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Inter Bold'), local('Inter-Bold'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
            }

            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }

            img {
                -ms-interpolation-mode: bicubic;
            }

            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }

            table {
                border-collapse: collapse !important;
            }

            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                font-family: 'Inter', Helvetica, Arial, sans-serif;
            }

            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }

            @media screen and (max-width: 525px) {
                .wrapper {
                    width: 100% !important;
                    max-width: 100% !important;
                }

                .responsive-table {
                    width: 100% !important;
                }

                .padding {
                    padding: 10px 5% 10px 5% !important;
                }

                .section-padding {
                    padding: 0 15px 50px 15px !important;
                }
            }

            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #6C63FF;
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 8px;
                transition: background-color 0.3s ease;
            }

            .button:hover {
                background-color: #554EDC;
            }
        </style>
    </head>

    <body style="margin: 0 !important; padding: 0 !important;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td bgcolor="#f8f8f8" align="center" style="padding: 20px 15px 20px 15px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="center" valign="top"
                                style="padding: 40px 20px 20px 20px; border-radius: 8px 8px 0px 0px; color: #1a1a1a; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 700; line-height: 36px;">
                                <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="150" height="auto" style="display: block; border: 0px;" alt="Transcribr Logo">
                                <h1 style="font-size: 30px; font-weight: 700; margin: 30px 0 0 0;">Subscription Renewal</h1>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left"
                                style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                <p style="margin: 0;">Hi {{name}},</p>
                                <p style="margin: 20px 0 0 0;">This is a friendly reminder that your
                                    <strong>{{plan}}</strong> subscription is set to renew on <strong>{{date}}</strong>.</p>
                                <p style="margin: 20px 0 0 0;">Your card on file will be charged
                                    <strong>{{amount}}</strong>. If you would like to manage your subscription or update
                                    your payment details, you can do so by clicking the button below:</p>
                                <p style="margin: 30px 0 0 0; text-align: center;">
                                    <a href="[Link to Billing Settings]" target="_blank" class="button">Manage
                                        Subscription</a>
                                </p>
                                <p style="margin: 40px 0 0 0;">If you have any questions, please don't hesitate to reach out
                                    to our <a href="mailto:support@transcribr.org">support team</a>.</p>
                                <p style="margin: 20px 0 0 0;">Best regards,</p>
                                <p style="margin: 0;">The Transcribr Team</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f8f8f8" align="center"
                                style="padding: 20px 30px 20px 30px; color: #999999; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px;">
                                <p style="margin: 0;">&copy; {{year}} Transcribr. All rights reserved.</p>
                                <p style="margin: 5px 0 0 0;"><a href="https://transcribr.org" target="_blank"
                                        style="color: #999999; text-decoration: none;">transcribr.org</a></p>
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
    const data = {
      name,
      year: this.year,
    };

    const source = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Your Transcribr Password Has Been Reset</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Inter Regular'), local('Inter-Regular'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Inter Bold'), local('Inter-Bold'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
            }
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; }
            img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Inter', Helvetica, Arial, sans-serif; }
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
            @media screen and (max-width: 525px) {
                .wrapper { width: 100% !important; max-width: 100% !important; }
                .responsive-table { width: 100% !important; }
                .padding { padding: 10px 5% 10px 5% !important; }
                .section-padding { padding: 0 15px 50px 15px !important; }
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #6C63FF;
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 8px;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #554EDC;
            }
        </style>
    </head>
    <body style="margin: 0 !important; padding: 0 !important;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td bgcolor="#f8f8f8" align="center" style="padding: 20px 15px 20px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 8px 8px 0px 0px; color: #1a1a1a; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 700; line-height: 36px;">
                            <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="150" height="auto" style="display: block; border: 0px;" alt="Transcribr Logo">
                            <h1 style="font-size: 30px; font-weight: 700; margin: 30px 0 0 0;">Password Successfully Reset</h1>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                            <p style="margin: 0;">Hi {{name}},</p>
                            <p style="margin: 20px 0 0 0;">This is a confirmation that the password for your Transcribr account has been successfully reset. You can now log in with your new password.</p>
                            <p style="margin: 30px 0 0 0; text-align: center;">
                                <a href="app.transcribr.org" target="_blank" class="button">Log In Now</a>
                            </p>
                            <p style="margin: 40px 0 0 0;">If you did not initiate this password reset, please contact our <a href="mailto:support@transcribr.org" style="color: #6C63FF; text-decoration: none;">support team</a> immediately.</p>
                            <p style="margin: 20px 0 0 0;">Sincerely,</p>
                            <p style="margin: 0;">The Transcribr Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f8f8f8" align="center" style="padding: 20px 30px 20px 30px; color: #999999; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px;">
                            <p style="margin: 0;">&copy; {{year}} Transcribr. All rights reserved.</p>
                            <p style="margin: 5px 0 0 0;"><a href="https://transcribr.org" target="_blank" style="color: #999999; text-decoration: none;">transcribr.org</a></p>
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
    const data = {
      name,
      timestamp,
      year: this.year,
    };

    const source = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Your Transcribr Password Has Been Updated</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Inter Regular'), local('Inter-Regular'), url([https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2](https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2)) format('woff2');
                }
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Inter Bold'), local('Inter-Bold'), url([https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2](https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2)) format('woff2');
                }
            }
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; }
            img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Inter', Helvetica, Arial, sans-serif; }
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
            @media screen and (max-width: 525px) {
                .wrapper { width: 100% !important; max-width: 100% !important; }
                .responsive-table { width: 100% !important; }
                .padding { padding: 10px 5% 10px 5% !important; }
                .section-padding { padding: 0 15px 50px 15px !important; }
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #6C63FF;
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 8px;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #554EDC;
            }
        </style>
    </head>
    <body style="margin: 0 !important; padding: 0 !important;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td bgcolor="#f8f8f8" align="center" style="padding: 20px 15px 20px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 8px 8px 0px 0px; color: #1a1a1a; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 700; line-height: 36px;">
                            <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="150" height="auto" style="display: block; border: 0px;" alt="Transcribr Logo">
                            <h1 style="font-size: 30px; font-weight: 700; margin: 30px 0 0 0;">Password Updated</h1>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                            <p style="margin: 0;">Hi {{name}},</p>
                            <p style="margin: 20px 0 0 0;">This email is to confirm that the password for your Transcribr account was successfully changed at <strong>{{timestamp}}</strong>.
                            </p>
                            <p style="margin: 20px 0 0 0;">If you did not make this change, please contact our <a href="mailto:support@transcribr.org" style="color: #6C63FF; text-decoration: none;">support team</a> immediately to secure your account.</p>
                            <p style="margin: 30px 0 0 0; text-align: center;">
                                <a href="https://app.transcribr.org/dashboard/transcript" target="_blank" class="button">Go to Dashboard</a>
                            </p>
                            <p style="margin: 40px 0 0 0;">Best regards,</p>
                            <p style="margin: 0;">The Transcribr Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f8f8f8" align="center" style="padding: 20px 30px 20px 30px; color: #999999; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px;">
                            <p style="margin: 0;">&copy; {{year}} Transcribr. All rights reserved.</p>
                            <p style="margin: 5px 0 0 0;"><a href="https://transcribr.org" target="_blank" style="color: #999999; text-decoration: none;">transcribr.org</a></p>
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
    const data = {
      email,
      year: this.year,
    };

    const source = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>You're on the Transcribr Waitlist!</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Inter Regular'), local('Inter-Regular'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Inter Bold'), local('Inter-Bold'), url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQsPP.woff2) format('woff2');
                }
            }
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; }
            img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Inter', Helvetica, Arial, sans-serif; }
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
            @media screen and (max-width: 525px) {
                .wrapper { width: 100% !important; max-width: 100% !important; }
                .responsive-table { width: 100% !important; }
                .padding { padding: 10px 5% 10px 5% !important; }
                .section-padding { padding: 0 15px 50px 15px !important; }
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #6C63FF;
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 8px;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #554EDC;
            }
        </style>
    </head>
    <body style="margin: 0 !important; padding: 0 !important;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td bgcolor="#f8f8f8" align="center" style="padding: 20px 15px 20px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 8px 8px 0px 0px; color: #1a1a1a; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 700; line-height: 36px;">
                            <img src="https://res.cloudinary.com/jesse-dirisu/image/upload/v1757712400/Transcribr_juxhs6.png" width="150" height="auto" style="display: block; border: 0px;" alt="Transcribr Logo">
                            <h1 style="font-size: 30px; font-weight: 700; margin: 30px 0 0 0;">You're on the Waitlist!</h1>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                            <p style="margin: 0;">Hi {{email}},</p>
                            <p style="margin: 20px 0 0 0;">Thank you for your interest in Transcribr! This email confirms that you have successfully joined our waitlist.</p>
                            <p style="margin: 20px 0 0 0;">We’re working hard to get Transcribr ready for everyone, and we appreciate your patience. We'll send you an email as soon as a spot opens up for you.</p>
                            <p style="margin: 20px 0 0 0;">In the meantime, feel free to visit our website to learn more about what's coming next.</p>
                            <p style="margin: 30px 0 0 0; text-align: center;">
                                <a href="https://transcribr.org" target="_blank" class="button">Visit Our Website</a>
                            </p>
                            <p style="margin: 40px 0 0 0;">Best regards,</p>
                            <p style="margin: 0;">The Transcribr Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f8f8f8" align="center" style="padding: 20px 30px 20px 30px; color: #999999; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px;">
                            <p style="margin: 0;">&copy; {{year}} Transcribr. All rights reserved.</p>
                            <p style="margin: 5px 0 0 0;"><a href="https://transcribr.org" target="_blank" style="color: #999999; text-decoration: none;">transcribr.org</a></p>
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
