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

const cors = corsLib({
  methods: allowedMethods,
  origin: allowedOrigins,
});

export const joinWaitlist = functions.https.onRequest(async (req, res) => {
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
      return res.status(201).json(response);
    } catch (e) {
      return res.status(400).json({
        error: "BAD REQUEST",
        message: ErrorService.extractMessage(e),
      });
    }
  });
});

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
