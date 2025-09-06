import { log } from "firebase-functions/logger";
import * as yup from "yup";

const paginationSchema = new yup.ObjectSchema({
  page: yup.number().min(1).required(),
  limit: yup.number().max(50).default(20).notRequired(),
  orderBy: yup.string().notRequired(),
  ascending: yup.bool().notRequired(),
});

export async function isValidPageData(query: yup.AnyObject): Promise<boolean> {
  try {
    log(query);
    return await paginationSchema.isValid(query);
  } catch (e) {
    return false;
  }
}
