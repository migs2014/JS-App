import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
console.log("🔑 JWT_SECRET loaded:", Boolean(process.env.JWT_SECRET));
import morgan from "morgan";
import cors from "cors";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cloudinary from "cloudinary";
const app = express();
import fileUpload from "express-fileupload";
import cookie from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";

// ——— Cloudinary Setup with Guard ———
if (!process.env.CLOUDINARY_API_KEY) {
  console.warn("⚠️  Missing CLOUDINARY_API_KEY, skipping uploads");
} else {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
}

//All port from dotenv
const port = process.env.PORT || 6060;
// const url = process.env.MONGO_URL;
// URI FOR CLOUD
const url = process.env.MONGO_URI_PRODUCTION;

// 1) Fall-back to the literal URL if the env var is missing
const allowedOrigins = [
  process.env.FRONTEND_URL || "https://js-app-sepia.vercel.app",
  process.env.DEV_FRONTEND_URL || "http://localhost:5173",
];
console.log("👉 Allowed Origins:", allowedOrigins);

// 2) Build the CORS options once
const corsOptions = {
  origin: (origin, callback) => {
    // Log every incoming Origin header
    console.log("↔️  Incoming Origin:", origin);

    // allow requests with no origin (mobile, curl, server-to-server)
    if (!origin) return callback(null, true);

    // only allow our two hosts
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // explicit “not allowed” response for all others
    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// 3) Register it before all routes & handlers
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookie());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    tempFileDir: "/tmp",
    useTempFiles: true,
  })
);
// mongodb connect
mongoose
  .connect(url)
  .then(() => {
    console.log(`Database connection successful`);
  })
  .catch((err) => console.log("Database error is", err));
// cookie Behavior
app.get("/test-cookie", (req, res) => {
  console.log("↔️  TEST-COOKIE Origin:", req.get("origin"));
  return res
    .cookie("ping", "pong", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
    })
    .send("🍪 cookie set");
});
  
// Routes are here
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/class", classRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/exam", examRoutes);
app.use("/api/v1/fee", feeRoutes);
app.use("/api/v1/result", resultRoutes);
app.use("/api/v1/subject", subjectRoutes);
// Server listen
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
app.use(errorMiddleware);
