import { createHash, timingSafeEqual } from "crypto";
import { log } from "firebase-functions/logger";

/**
 * Caller authentication for functions only our own server should invoke.
 *
 * These are deployed as public HTTPS functions, which is how the Nest API
 * reaches them — it calls over plain HTTP with no credential. That is fine for
 * a function whose entire input is a fixed template and a recipient. It is not
 * fine for one that accepts an arbitrary recipient, subject and body: without a
 * check, anyone who learns the URL can send mail from noreply@transcribr.org to
 * anywhere, which is an open relay and a straight path to phishing customers
 * and losing our sending reputation.
 *
 * A shared secret in a header is the smallest thing that closes it against the
 * architecture as it stands. The better answer is IAM — make the functions
 * private and have the API present a Google-signed ID token, so a request is
 * rejected at the edge and the secret does not exist to be leaked. That is
 * tracked as a follow-up rather than done here, because switching the whole
 * mail layer to authenticated invocation in the same change would put every
 * transactional email at risk at once.
 */

/**
 * Whether the caller presented the shared secret.
 *
 * Fails **closed**: if INTERNAL_API_KEY is not configured, nothing is
 * authorised. An unset secret is a misconfiguration, and treating it as
 * "allow everyone" would silently restore exactly the hole this exists to
 * close — which is the failure mode that never gets noticed.
 */
export function isInternalCaller(req: {
  headers: Record<string, unknown>;
}): boolean {
  const expected = process.env.INTERNAL_API_KEY;

  if (!expected) {
    log("INTERNAL_API_KEY is not set; refusing the request");
    return false;
  }

  const raw = req.headers["x-internal-key"];
  const supplied = Array.isArray(raw) ? raw[0] : raw;

  if (typeof supplied !== "string" || supplied.length === 0) return false;

  // Hashed before comparison so the buffers are always the same length —
  // timingSafeEqual throws on a length mismatch, and the length of the
  // supplied value is itself a small leak.
  const a = createHash("sha256").update(supplied).digest();
  const b = createHash("sha256").update(expected).digest();

  return timingSafeEqual(a, b);
}

/**
 * The response for a caller that is not our server.
 *
 * Deliberately says nothing about why. "Wrong key" and "no key" are the same
 * answer, and neither confirms that the endpoint is worth attacking.
 */
export const UNAUTHORISED_BODY = {
  error: "UNAUTHORIZED",
  message: "This endpoint is not publicly callable",
};
