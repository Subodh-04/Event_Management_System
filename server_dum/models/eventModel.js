const { z } = require("zod");

// Email validation: Must contain letters, numbers, and a valid email format
const emailRegex = /^(?=.*[a-zA-Z])(?=.*\d)[^\s@]{5,40}@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

// Login Schema
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .regex(emailRegex, {
      message: "Email must contain both letters, numbers, and a valid format.",
    })
    .email({ message: "Invalid Email Address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(24, { message: "Password too long (max 24 characters)" }),
});

// Signup Schema
const signupSchema = loginSchema.extend({
  userName: z.string({ required_error: "Name is required" }).trim(),
  role: z.enum(["user", "organizer", "admin"], { required_error: "Role is required" }),
});

// Event Schema Validation
const eventSchema = z.object({
  title: z.string({ required_error: "Event title is required" }).trim(),
  description: z.string({ required_error: "Description is required" }).trim(),
  date: z.string({ required_error: "Event date is required" }).refine(
    (value) => !isNaN(Date.parse(value)),
    { message: "Invalid date format" }
  ),
  venue: z.string({ required_error: "Venue is required" }).trim(),
  category: z.enum(
    ["Conference", "Wedding", "Concert", "Workshop", "Festival", "Other"],
    { required_error: "Category is required" }
  ),
  maxAttendees: z
    .number({ required_error: "Max attendees count is required" })
    .min(1, { message: "At least one attendee is required" }),
  image: z.string().optional(),
  status: z.enum(["Pending", "Approved", "Rejected"]).optional(),
});

module.exports = { signupSchema, loginSchema, eventSchema };
