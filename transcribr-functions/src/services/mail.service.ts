import { log } from "firebase-functions/logger";
import * as nodemailer from "nodemailer";
import { SubscriptionRemiderBody, TemplateService } from "./template.service";

export class MailService {
  private templateService: TemplateService;
  private transporter: nodemailer.Transporter;
  private urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/gi;
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
    html: string
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: "noreply@transcribr.org", // Replace with your email
        to,
        subject,
        html,
      });
      log("Email sent successfully");
    } catch (error) {
      log(`Error sending email: ${error}`);
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
}
