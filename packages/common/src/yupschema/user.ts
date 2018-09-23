import * as yup from "yup";

export const emailNotLongEnough = "email must be at least 3 characters";
export const passwordNotLongEnough = "password must be at least 3 characters";
export const invalidEmail = "email must be a valid email";

export const passwordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
  .required();

export const validUserSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(),
  password: passwordValidation
});

// Validation for Login
const invalidLogin = "Invalid Login";
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, invalidLogin)
    .max(255, invalidLogin)
    .email(invalidLogin)
    .required(),
  password: passwordValidation
});
