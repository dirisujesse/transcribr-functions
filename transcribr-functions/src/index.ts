/* eslint-disable max-len */
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import { WaitlistService } from "./services/waitlist.service";
import * as corsLib from "cors";
import { isValidIntendee } from "./models/schema/intendee.schema";
import { IntendeeDto } from "./models/dto/intendee.dto";
import { ErrorService } from "./services/error.service";
import { isValidPageData } from "./models/schema/page.schema";
import { PaginationDto } from "./models/dto/pagination.dto";
import { MailService } from "./services/mail.service";

admin.initializeApp();
const db = new WaitlistService(admin.firestore());
const allowedOrigins = ["https://transcribr.org", /\.transcribr\.org$/];
const allowedMethods = [
  "GET",
  "HEAD",
  "PUT",
  "PATCH",
  "POST",
  "DELETE",
  "OPTIONS",
];

const cors = corsLib.default({
  methods: allowedMethods,
  origin: allowedOrigins,
});

export const joinWaitlist = functions.https.onRequest(
  { secrets: ["APP_EMAIL_PASSWORD"] },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", allowedOrigins.join(","));
    res.set("Access-Control-Allow-Methods", allowedMethods.join(","));
    res.set("Access-Control-Allow-Headers", "*");
    return await cors(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).json({
          error: "METHOD NOT ALLOWED",
          message: "Only POST requests are allowed",
        });
      }
      try {
        const body = req.body;
        if (!body) {
          return res.status(400).json({
            error: "NO BODY",
            message: "Please provide a valid email address",
          });
        }
        const isValid = await isValidIntendee(req.body);

        if (!isValid) {
          return res.status(400).json({
            error: "INVALID PAYLOAD",
            message: "The provided data is not a valid intendee",
          });
        }

        const intendee: IntendeeDto = {
          email: body.email,
        };

        await db.joinWaitlist(intendee);

        const response: ResponseDto<IntendeeDto> = {
          data: intendee,
          message: "Successfully joined waitlist",
        };
        const mailService = new MailService(
          process.env.APP_EMAIL_PASSWORD ?? ""
        );
        await mailService.sendJoinedWaitlistEmail(intendee.email);
        return res.status(201).json(response);
      } catch (e) {
        return res.status(400).json({
          error: "BAD REQUEST",
          message: ErrorService.extractMessage(e),
        });
      }
    });
  }
);

export const getIntendees = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", allowedOrigins.join(","));
  res.set("Access-Control-Allow-Methods", allowedMethods.join(","));
  res.set("Access-Control-Allow-Headers", "*");
  return await cors(req, res, async () => {
    if (req.method !== "GET") {
      return res.status(405).json({
        error: "METHOD NOT ALLOWED",
        message: "Only GET requests are allowed",
      });
    }
    try {
      const isValid = await isValidPageData(req.query);
      if (!isValid) {
        return res.status(400).json({
          error: "INVALID PAYLOAD",
          message: "The provided data is not a valid paginated request payload",
        });
      }
      const query = req.query;
      const paginationData: PaginationDto<IntendeeDto> = {
        page: +(query.page ?? 1),
        limit: +(query?.limit ?? 20),
        orderBy: `${query?.orderBy ?? "createdAt"}`,
        ascending: query?.acending == "true",
      };
      const data = await db.getUsers(paginationData);
      const response: ResponseDto<PaginationDto<IntendeeDto>> = {
        data,
        message: "List of intendees",
      };
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        error: "BAD REQUEST",
        message: ErrorService.extractMessage(e),
      });
    }
  });
});

export const sendWelcomeEmail = functions.https.onRequest(
  { secrets: ["APP_EMAIL_PASSWORD"] },
  async (req, res) => {
    return await cors(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).json({
          error: "METHOD NOT ALLOWED",
          message: "Only POST requests are allowed",
        });
      }
      try {
        const { to, name } = req.body;
        if (!to || !name) {
          return res.status(400).json({
            error: "INVALID PAYLOAD",
            message: "Missing 'to' or 'name' in request body",
          });
        }
        const mailService = new MailService(
          process.env.APP_EMAIL_PASSWORD ?? ""
        );
        await mailService.sendWelcomeEmail(to, name);
        return res
          .status(200)
          .json({ message: "Welcome email sent successfully." });
      } catch (e) {
        return res.status(500).json({
          error: "INTERNAL SERVER ERROR",
          message: ErrorService.extractMessage(e),
        });
      }
    });
  }
);

export const sendVerifyEmail = functions.https.onRequest(
  { secrets: ["APP_EMAIL_PASSWORD"] },
  async (req, res) => {
    return await cors(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).json({
          error: "METHOD NOT ALLOWED",
          message: "Only POST requests are allowed",
        });
      }
      try {
        const { to, name, otp } = req.body;
        if (!to || !name || !otp) {
          return res.status(400).json({
            error: "INVALID PAYLOAD",
            message: "Missing 'to', 'name', or 'otp' in request body",
          });
        }
        const mailService = new MailService(
          process.env.APP_EMAIL_PASSWORD ?? ""
        );
        await mailService.sendVerifyEmail(to, name, otp);
        return res
          .status(200)
          .json({ message: "Verification email sent successfully." });
      } catch (e) {
        return res.status(500).json({
          error: "INTERNAL SERVER ERROR",
          message: ErrorService.extractMessage(e),
        });
      }
    });
  }
);

export const sendVerifiedEmail = functions.https.onRequest(
  { secrets: ["APP_EMAIL_PASSWORD"] },
  async (req, res) => {
    return await cors(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).json({
          error: "METHOD NOT ALLOWED",
          message: "Only POST requests are allowed",
        });
      }
      try {
        const { to, name } = req.body;
        if (!to || !name) {
          return res.status(400).json({
            error: "INVALID PAYLOAD",
            message: "Missing 'to' or 'name' in request body",
          });
        }
        const mailService = new MailService(
          process.env.APP_EMAIL_PASSWORD ?? ""
        );
        await mailService.sendVerifiedEmail(to, name);
        return res
          .status(200)
          .json({ message: "Verification email sent successfully." });
      } catch (e) {
        return res.status(500).json({
          error: "INTERNAL SERVER ERROR",
          message: ErrorService.extractMessage(e),
        });
      }
    });
  }
);

export const sendTranscriptReadyEmail = functions.https.onRequest(
  { secrets: ["APP_EMAIL_PASSWORD"] },
  async (req, res) => {
    return await cors(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).json({
          error: "METHOD NOT ALLOWED",
          message: "Only POST requests are allowed",
        });
      }
      try {
        const { to, name, link, title } = req.body;
        if (!to || !name || !link || !title) {
          return res.status(400).json({
            error: "INVALID PAYLOAD",
            message: "Missing 'to', 'name', 'link', or 'title' in request body",
          });
        }
        const mailService = new MailService(
          process.env.APP_EMAIL_PASSWORD ?? ""
        );
        await mailService.sendTranscriptReadyEmail(to, name, link, title);
        return res
          .status(200)
          .json({ message: "Transcript ready email sent successfully." });
      } catch (e) {
        return res.status(500).json({
          error: "INTERNAL SERVER ERROR",
          message: ErrorService.extractMessage(e),
        });
      }
    });
  }
);

export const sendPasswordResetEmail = functions.https.onRequest(
  { secrets: ["APP_EMAIL_PASSWORD"] },
  async (req, res) => {
    return await cors(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).json({
          error: "METHOD NOT ALLOWED",
          message: "Only POST requests are allowed",
        });
      }
      try {
        const { to, name, otp } = req.body;
        if (!to || !name || !otp) {
          return res.status(400).json({
            error: "INVALID PAYLOAD",
            message: "Missing 'to', 'name', or 'otp' in request body",
          });
        }
        const mailService = new MailService(
          process.env.APP_EMAIL_PASSWORD ?? ""
        );
        await mailService.sendPasswordResetEmail(to, name, otp);
        return res
          .status(200)
          .json({ message: "Password reset email sent successfully." });
      } catch (e) {
        return res.status(500).json({
          error: "INTERNAL SERVER ERROR",
          message: ErrorService.extractMessage(e),
        });
      }
    });
  }
);

export const sendSubscriptionReminderEmail = functions.https.onRequest(
  { secrets: ["APP_EMAIL_PASSWORD"] },
  async (req, res) => {
    return await cors(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).json({
          error: "METHOD NOT ALLOWED",
          message: "Only POST requests are allowed",
        });
      }
      try {
        const { to, data } = req.body;
        if (!to || !data) {
          return res.status(400).json({
            error: "INVALID PAYLOAD",
            message: "Missing 'to' or 'data' in request body",
          });
        }
        const mailService = new MailService(
          process.env.APP_EMAIL_PASSWORD ?? ""
        );
        await mailService.sendSubscriptionReminderEmail(to, data);
        return res
          .status(200)
          .json({ message: "Subscription reminder email sent successfully." });
      } catch (e) {
        return res.status(500).json({
          error: "INTERNAL SERVER ERROR",
          message: ErrorService.extractMessage(e),
        });
      }
    });
  }
);

export const sendPasswordUpdatedEmail = functions.https.onRequest(
  { secrets: ["APP_EMAIL_PASSWORD"] },
  async (req, res) => {
    return await cors(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).json({
          error: "METHOD NOT ALLOWED",
          message: "Only POST requests are allowed",
        });
      }
      try {
        const { to, name, timestamp } = req.body;
        if (!to || !name || !timestamp) {
          return res.status(400).json({
            error: "INVALID PAYLOAD",
            message: "Missing 'to', 'name', or 'timestamp' in request body",
          });
        }
        const mailService = new MailService(
          process.env.APP_EMAIL_PASSWORD ?? ""
        );
        await mailService.sendPasswordUpdatedEmail(to, name, timestamp);
        return res
          .status(200)
          .json({ message: "Password updated email sent successfully." });
      } catch (e) {
        return res.status(500).json({
          error: "INTERNAL SERVER ERROR",
          message: ErrorService.extractMessage(e),
        });
      }
    });
  }
);

export const sendAccountSuspensionEmail = functions.https.onRequest(
  { secrets: ["APP_EMAIL_PASSWORD"] },
  async (req, res) => {
    return await cors(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).json({
          error: "METHOD NOT ALLOWED",
          message: "Only POST requests are allowed",
        });
      }
      try {
        const { to, name } = req.body;
        if (!to || !name) {
          return res.status(400).json({
            error: "INVALID PAYLOAD",
            message: "Missing 'to' or 'name' in request body",
          });
        }
        const mailService = new MailService(
          process.env.APP_EMAIL_PASSWORD ?? ""
        );
        await mailService.sendAccountSuspensionEmail(to, name);
        return res
          .status(200)
          .json({ message: "Password updated email sent successfully." });
      } catch (e) {
        return res.status(500).json({
          error: "INTERNAL SERVER ERROR",
          message: ErrorService.extractMessage(e),
        });
      }
    });
  }
);

export const sendAccountDeletionEmail = functions.https.onRequest(
  { secrets: ["APP_EMAIL_PASSWORD"] },
  async (req, res) => {
    return await cors(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).json({
          error: "METHOD NOT ALLOWED",
          message: "Only POST requests are allowed",
        });
      }
      try {
        const { to, name } = req.body;
        if (!to || !name) {
          return res.status(400).json({
            error: "INVALID PAYLOAD",
            message: "Missing 'to' or 'name', or 'timestamp' in request body",
          });
        }
        const mailService = new MailService(
          process.env.APP_EMAIL_PASSWORD ?? ""
        );
        await mailService.sendAccountDeletionEmail(to, name);
        return res
          .status(200)
          .json({ message: "Password updated email sent successfully." });
      } catch (e) {
        return res.status(500).json({
          error: "INTERNAL SERVER ERROR",
          message: ErrorService.extractMessage(e),
        });
      }
    });
  }
);
