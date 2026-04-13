import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import router from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// Setup CORS
const allowedOrigins = [
  "http://localhost:7860",
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

// 1. Define your options once (reusable)
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200, // Some legacy browsers/proxies (and online hosts) prefer 200 over 204
};

// 2. The "Preflight" Fix
// This tells Express: "If ANY route gets an OPTIONS request, respond with the CORS headers immediately"
app.options("/{*path}", cors(corsOptions));

// 3. The Global Policy
// This applies the headers to the actual GET/POST requests
app.use(cors(corsOptions));

app.use("/auth", router);
app.use("/", userRouter);

app.get("/server", (req, res) => {
  res.status(200).json({ status: "OK", message: "Identity Provider is live." });
});

// Global Error Handler
app.use((err, req, res, next) => {
  // 1. Log the full stack trace in your terminal so YOU can see it
  console.error("DEBUGGER LOG:", err.stack);

  // 2. Extract the status code (default to 500 if not set)
  const statusCode = err.statusCode || 500;

  // 3. Send the ACTUAL error message to the frontend
  res.status(statusCode).json({
    status: err.status || "error",
    message: err.message || "An unexpected error occurred", // <--- This is the key!
    // Optional: Only send the stack trace if you are in development mode
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});
export default app;
