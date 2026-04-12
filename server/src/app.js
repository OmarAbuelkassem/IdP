import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import router from "./routes/authRoutes.js";

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

app.get("/server", (req, res) => {
  res.status(200).json({ status: "OK", message: "Identity Provider is live." });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong on the server!",
  });
});
export default app;
