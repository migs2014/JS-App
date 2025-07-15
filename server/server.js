import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from "cors";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cloudinary from "cloudinary";
const app = express();
import fileUpload from "express-fileupload";
import cookie from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import classRoutes from "./routes/classRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"
import attendanceRoutes from "./routes/attendanceRoutes.js"
import examRoutes from  "./routes/examRoutes.js"
import feeRoutes from "./routes/feeRoutes.js"
import resultRoutes from "./routes/resultRoutes.js"
// cloudinary set up
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
//All port from dotenv
const port = process.env.PORT || 6060;
const url = process.env.MONGO_URL;

//Middleware
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
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

// Routes are here
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/class", classRoutes);
app.use("/api/v1/student",studentRoutes);
app.use("/api/v1/attendance",attendanceRoutes);
app.use("/api/v1/exam",examRoutes);
app.use("/api/v1/fee",feeRoutes)
app.use("/api/v1/result",resultRoutes)
// Server listen
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
app.use(errorMiddleware);
