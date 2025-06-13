const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .max(100, "Name cannot exceed 100 characters")
    .trim(),
  email: z
    .string({ required_error: "Email is required" })
    .email("Please provide a valid email")
    .max(255)
    .trim()
    .toLowerCase(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
  address: z
    .string({ required_error: "Address is required" })
    .max(500, "Address cannot exceed 500 characters")
    .trim(),
  agreeTerms: z
    .boolean({ required_error: "You must agree to terms and conditions" })
    .refine((val) => val === true, {
      message: "You must agree to terms and conditions",
    }),
});

module.exports = { registerSchema };
