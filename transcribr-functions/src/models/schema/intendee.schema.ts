import * as yup from "yup";

const intendeeSchema = new yup.ObjectSchema({
  email: yup.string().email().required(),
});

export async function isValidIntendee(model: yup.AnyObject): Promise<boolean> {
  try {
    return await intendeeSchema.isValid(model);
  } catch (e) {
    return false;
  }
}

