import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import { WaitlistService } from "./services/waitlist.service";
import * as corsLib from "cors";
import { isValidIntendee } from "./models/schema/intendee.schema";
import { IntendeeDto } from "./models/dto/intendee.dto";
import { ErrorService } from "./services/error.service";
import { isValidPageData } from "./models/schema/page.schema";
import { PaginationDto } from "./models/dto/pagination.dto";
import { ResponseDto } from "./models/dto/response.dto";
import { MailService } from "./services/mail.service";
import { PushService } from "./services/push.service";

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
          process.env.APP_EMAIL_PASSWORD ?? "",
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
  },
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

export const sendPush = functions.https.onRequest(async (req, res) => {
  return await cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "METHOD NOT ALLOWED",
        message: "Only POST requests are allowed",
      });
    }
    try {
      const { topic, title, body, data } = req.body;
      if (!topic || !title || !body) {
        return res.status(400).json({
          error: "INVALID PAYLOAD",
          message: "Missing 'topic', 'title', or 'body' in request body",
        });
      }
      const pushService = new PushService(admin.messaging());
      await pushService.sendPush(topic, title, body, data);
      return res
        .status(200)
        .json({ message: "Push notification sent successfully." });
    } catch (e) {
      return res.status(500).json({
        error: "INTERNAL SERVER ERROR",
        message: ErrorService.extractMessage(e),
      });
    }
  });
});

export const subscribeToTopic = functions.https.onRequest(async (req, res) => {
  return await cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "METHOD NOT ALLOWED",
        message: "Only POST requests are allowed",
      });
    }
    try {
      const { topic, token } = req.body;
      if (!topic || !token) {
        return res.status(400).json({
          error: "INVALID PAYLOAD",
          message: "Missing 'topic', 'title', or 'body' in request body",
        });
      }

      const pushService = new PushService(admin.messaging());
      await pushService.subscribe(token, topic);
      return res
        .status(200)
        .json({ message: "Push notification sent successfully." });
    } catch (e) {
      return res.status(500).json({
        error: "INTERNAL SERVER ERROR",
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
          process.env.APP_EMAIL_PASSWORD ?? "",
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
  },
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
          process.env.APP_EMAIL_PASSWORD ?? "",
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
  },
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
          process.env.APP_EMAIL_PASSWORD ?? "",
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
  },
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
          process.env.APP_EMAIL_PASSWORD ?? "",
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
  },
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
          process.env.APP_EMAIL_PASSWORD ?? "",
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
  },
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
          process.env.APP_EMAIL_PASSWORD ?? "",
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
  },
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
          process.env.APP_EMAIL_PASSWORD ?? "",
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
  },
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
          process.env.APP_EMAIL_PASSWORD ?? "",
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
  },
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
          process.env.APP_EMAIL_PASSWORD ?? "",
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
  },
);

/**
 * Sign-in code for the back office.
 *
 * Separate from sendVerifyEmail because the two are different things wearing
 * similar shapes: this one admits somebody to a console that can delete
 * customer accounts, and it says so.
 */
export const sendAdminOtpEmail = functions.https.onRequest(
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
        const { to, name, otp } = req.body ?? {};
        if (!to || !otp) {
          return res.status(400).json({
            error: "INVALID PAYLOAD",
            message: "Missing 'to' or 'otp' in request body",
          });
        }

        // Refused outright for anything but a company address. The caller
        // already checks this, but an endpoint that mails a sign-in code
        // anywhere it is told to is worth locking down on its own.
        if (!`${to}`.toLowerCase().endsWith("@transcribr.org")) {
          return res.status(403).json({
            error: "FORBIDDEN",
            message: "Back-office codes are only sent to transcribr.org addresses",
          });
        }

        const mailService = new MailService(
          process.env.APP_EMAIL_PASSWORD ?? "",
        );
        await mailService.sendAdminOtpEmail(to, name ?? to, otp);
        return res.status(200).json({ message: "Sign-in code sent." });
      } catch (e) {
        return res.status(500).json({
          error: "INTERNAL SERVER ERROR",
          message: ErrorService.extractMessage(e),
        });
      }
    });
  },
);

/**
 * One message of a campaign.
 *
 * Called once per recipient by the back office's broadcast worker, which owns
 * batching, pacing and the opt-out check. This endpoint's only jobs are to
 * render safely and to report honestly whether the send succeeded — the caller
 * counts failures per recipient, so a swallowed error here would make every
 * campaign look fully delivered.
 */
export const sendBroadcastEmail = functions.https.onRequest(
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
        const { to, name, subject, body, unsubscribe_url: unsubscribeUrl } =
          req.body ?? {};

        if (!to || !subject || !body) {
          return res.status(400).json({
            error: "INVALID PAYLOAD",
            message: "Missing 'to', 'subject', or 'body' in request body",
          });
        }

        const mailService = new MailService(
          process.env.APP_EMAIL_PASSWORD ?? "",
        );
        await mailService.sendBroadcastEmail(
          to,
          name ?? to,
          subject,
          body,
          typeof unsubscribeUrl === "string" ? unsubscribeUrl : undefined,
        );
        return res.status(200).json({ message: "Message sent." });
      } catch (e) {
        return res.status(500).json({
          error: "INTERNAL SERVER ERROR",
          message: ErrorService.extractMessage(e),
        });
      }
    });
  },
);

/**
 * Invitation to the back office.
 *
 * Locked to company addresses like the sign-in code endpoint: the caller checks
 * too, but a function that mails an access-granting link anywhere it is told to
 * is worth constraining on its own.
 */
export const sendAdminInviteEmail = functions.https.onRequest(
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
        const {
          to,
          name,
          invited_by: invitedBy,
          role,
          accept_url: acceptUrl,
          expires_in_days: expiresInDays,
        } = req.body ?? {};

        if (!to || !acceptUrl || !role) {
          return res.status(400).json({
            error: "INVALID PAYLOAD",
            message: "Missing 'to', 'role', or 'accept_url' in request body",
          });
        }

        if (!`${to}`.toLowerCase().endsWith("@transcribr.org")) {
          return res.status(403).json({
            error: "FORBIDDEN",
            message: "Invitations are only sent to transcribr.org addresses",
          });
        }

        const mailService = new MailService(
          process.env.APP_EMAIL_PASSWORD ?? "",
        );
        await mailService.sendAdminInviteEmail(
          to,
          name ?? to,
          invitedBy ?? "A colleague",
          role,
          acceptUrl,
          Number(expiresInDays) || 7,
        );
        return res.status(200).json({ message: "Invitation sent." });
      } catch (e) {
        return res.status(500).json({
          error: "INTERNAL SERVER ERROR",
          message: ErrorService.extractMessage(e),
        });
      }
    });
  },
);
