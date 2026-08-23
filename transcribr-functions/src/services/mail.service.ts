import { log } from "firebase-functions/logger";
import * as nodemailer from "nodemailer";
import { SubscriptionRemiderBody, TemplateService } from "./template.service";

export class MailService {
  private templateService: TemplateService;
  private transporter: nodemailer.Transporter;
  private urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/gi;
  private xmlRegex = /(?<=<TAG.*?>)(.*?)(?=<\/TAG>)/gi;

  constructor(password: string) {
    this.transporter = nodemailer.createTransport({
      host: "smtppro.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: "jessedirisu@transcribr.org",
        pass: password,
      },
    });
    this.templateService = new TemplateService();
  }

  private sanitiseInput(input: string): string {
    input = input.replace(this.urlRegex, "");
    return input.replace(this.xmlRegex, "");
  }

  private sanitiseName(name: string): string {
    name = this.sanitiseInput(name);
    return name.split(" ")[0];
  }

  private async sendMail(
    to: string,
    subject: string,
    html: string,
    headers?: Record<string, string>
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: "noreply@transcribr.org", // Replace with your email
        to,
        subject,
        html,
        ...(headers ? { headers } : {}),
      });
      log("Email sent successfully");
    } catch (error) {
      log(`Error sending email: ${error}`);
      // Rethrown so the caller can report a failed send. Campaign delivery is
      // counted per recipient, and swallowing this here would report every
      // message as delivered no matter what the SMTP server said.
      throw error;
    }
  }

  sendWelcomeEmail(to: string, name: string) {
    const html = this.templateService.getWelcomeTemplate(
      this.sanitiseName(name)
    );
    this.sendMail(to, "Welcome to Transcribr!", html);
  }

  sendVerifyEmail(to: string, name: string, otp: string) {
    const html = this.templateService.getEmailVerifyTemplate(
      this.sanitiseName(name),
      otp
    );
    this.sendMail(to, "Verify Your Email Address for Transcribr", html);
  }

  sendVerifiedEmail(to: string, name: string) {
    const html = this.templateService.getEmailVerifiedTemplate(
      this.sanitiseName(name),
      to
    );
    this.sendMail(to, "Your Transcribr Account is Fully Verified!", html);
  }

  sendTranscriptReadyEmail(
    to: string,
    name: string,
    link: string,
    title: string
  ) {
    const html = this.templateService.getTranscriptReadyTemplate(
      this.sanitiseName(name),
      link,
      title
    );
    this.sendMail(to, "Your Transcribr Transcription is Ready!", html);
  }

  sendPasswordResetEmail(to: string, name: string, otp: string) {
    const html = this.templateService.getPasswordResetTemplate(
      this.sanitiseName(name),
      otp
    );
    this.sendMail(to, "Transcribr Password Reset Request", html);
  }

  sendAccountSuspensionEmail(to: string, name: string) {
    const html = this.templateService.getAccountSuspendedTemplate(
      this.sanitiseName(name),
      to
    );
    this.sendMail(to, "Your Transcribr Account Has Been Suspended", html);
  }

  sendAccountDeletionEmail(to: string, name: string) {
    const html = this.templateService.getAccountDeletedTemplate(
      this.sanitiseName(name),
      to
    );
    this.sendMail(to, "Your Transcribr Account Has Been Deleted", html);
  }

  sendSubscriptionReminderEmail(to: string, data: SubscriptionRemiderBody) {
    const html = this.templateService.getSubscriptionReminderTemplate(data);
    this.sendMail(to, "Your Transcribr Subscription is Renewing Soon", html);
  }

  sendPasswordUpdatedEmail(to: string, name: string, timestamp: string) {
    const html = this.templateService.getPasswordUpdatedTemplate(
      this.sanitiseName(name),
      timestamp
    );
    this.sendMail(to, "Your Transcribr Password Has Been Updated", html);
  }

  sendPasswordResetSuccessEmail(to: string, name: string) {
    const html = this.templateService.getPasswordResetSuccessTemplate(
      this.sanitiseName(name)
    );
    this.sendMail(to, "Your Transcribr Password Has Been Reset", html);
  }

  sendJoinedWaitlistEmail(to: string) {
    const html = this.templateService.getWaitlistTemplate(to);
    this.sendMail(to, "Thanks for joining thewaitlist", html);
  }
  sendAdminOtpEmail(to: string, name: string, otp: string) {
    const html = this.templateService.getAdminOtpTemplate(
      this.sanitiseName(name),
      otp
    );
    return this.sendMail(to, "Your Transcribr back-office sign-in code", html);
  }

  /**
   * One campaign message.
   *
   * The subject is the sender's, so it is sanitised the same way any other
   * untrusted string is. `List-Unsubscribe` is set alongside the footer link:
   * Gmail and Outlook surface it as a one-click control, and its absence is one
   * of the things that pushes bulk mail into spam.
   */
  sendBroadcastEmail(
    to: string,
    name: string,
    subject: string,
    body: string,
    unsubscribeUrl?: string
  ) {
    const html = this.templateService.getBroadcastTemplate(
      this.sanitiseName(name),
      MailService.renderCampaignBody(body),
      unsubscribeUrl
    );

    const headers = unsubscribeUrl
      ? {
          "List-Unsubscribe": `<${unsubscribeUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        }
      : undefined;

    return this.sendMail(
      to,
      this.sanitiseInput(subject).slice(0, 200) || "A note from Transcribr",
      html,
      headers
    );
  }

  sendAdminInviteEmail(
    to: string,
    name: string,
    invitedBy: string,
    role: string,
    acceptUrl: string,
    expiresInDays: number
  ) {
    const html = this.templateService.getAdminInviteTemplate(
      this.sanitiseName(name),
      this.sanitiseName(invitedBy),
      role,
      acceptUrl,
      expiresInDays
    );
    return this.sendMail(
      to,
      "You have been invited to the Transcribr back office",
      html
    );
  }

  /**
   * Renders the small markdown subset campaigns are authored in.
   *
   * Escaping happens first and unconditionally; only then is the known-safe
   * markup introduced. Doing it the other way round — rendering then escaping,
   * or trusting the input because "only staff can write it" — is how a mailing
   * to the entire user base becomes an injection vector. A back-office account
   * is exactly what an attacker would want for that.
   */
  static renderCampaignBody(body: string): string {
    const escaped = (body ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

    const paragraphs = escaped
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);

    const inline = (text: string): string =>
      text
        // Links, restricted to http(s): a javascript: or data: href would
        // survive the escaping above, since neither uses angle brackets.
        .replace(
          /\[([^\]]{1,120})\]\((https?:\/\/[^\s)]{1,300})\)/g,
          '<a href="$2" target="_blank" style="color:#5B50E8; text-decoration:underline;">$1</a>'
        )
        .replace(/\*\*([^*]{1,300})\*\*/g, "<strong>$1</strong>")
        .replace(/(^|[^*])\*([^*]{1,300})\*/g, "$1<em>$2</em>")
        .replace(/\n/g, "<br />");

    return paragraphs
      .map((block) => {
        const lines = block.split("\n");
        const isList = lines.every((line) => /^\s*[-*]\s+/.test(line));

        if (isList) {
          const items = lines
            .map(
              (line) =>
                `<li style="margin:0 0 6px 0;">${inline(
                  line.replace(/^\s*[-*]\s+/, "")
                )}</li>`
            )
            .join("");
          return `<ul style="margin:0 0 18px 0; padding-left:22px;">${items}</ul>`;
        }

        return `<div style="margin:0 0 18px 0;">${inline(block)}</div>`;
      })
      .join("");
  }
}
