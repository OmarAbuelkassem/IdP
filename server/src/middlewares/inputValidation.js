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
    registerSchema.parse(req.body);
    next();
  } catch (error) {
    // FIX: Check if the 'errors' property exists and is an array before calling .map()
    if (error.issues && Array.isArray(error.issues)) {
      return res.status(400).json({
        status: "fail",
        message: error.issues.map((err) => err.message).join(", "),
      });
    }

    // If it's a different type of error entirely
    console.error("Non-Zod Error Caught:", error);
    next(error);
  }
};
