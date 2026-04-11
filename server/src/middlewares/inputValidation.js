import { z } from "zod";

// 1. Define the "Shape" of a valid registration
const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

// 2. The Middleware Function
export const validateRegister = (req, res, next) => {
  try {
    // This parses the data. If it fails, it throws an error.
    registerSchema.parse(req.body);
    next(); // Data is clean! Move to the Controller.
  } catch (error) {
    // If validation fails, return a clean error message
    return res.status(400).json({
      status: "fail",
      message: error.errors.map((err) => err.message),
    });
  }
};
