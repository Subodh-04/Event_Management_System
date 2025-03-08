const { z } = require("zod");

const emailRegex = /^(?=.*[a-zA-Z])(?=.*\d)[^\s@]{5,40}@[^\s@]+\.[^\s@]+$/;

const signupSchema = z.object({
  userName: z.string({ required_error: "Name is required" }).trim().min(3, "Name must be at least 3 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .regex(emailRegex, { message: "Invalid email format" })
    .email({ message: "Invalid Email Address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(24, { message: "Password too long" }),
  role: z.enum(["user", "organizer", "admin"], { required_error: "Role is required" }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .regex(emailRegex, { message: "Invalid email format" })
    .email({ message: "Invalid Email Address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(24, { message: "Password too long" }),
});

module.exports = {
  signupSchema,
  loginSchema,
};
