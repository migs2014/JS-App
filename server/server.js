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

// Server listen
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
app.use(errorMiddleware);
