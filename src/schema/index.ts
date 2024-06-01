import * as z from "zod";

export const LoginSchema = z.object({
  identifier: z.string().min(3, {
    message: "Feild is required",
  }),
  password: z.string().min(3, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  fullName: z.string().min(3, {
    message: "Full name is required",
  }),

  username: z.string().min(3, {
    message: "username is required",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  passwordConfirm: z.string().min(5, {
    message: "Password confirmation must be at least 5 characters long",
  }),
  image: z.string(),
  gender: z.string(),
  department: z.string(),
  role: z.string(),
  phone: z.string(),
  location: z.string(),
});
