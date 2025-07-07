import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"

const app = express();

//All port from dotenv
const port = process.env.PORT||6060;
const url = process.env.MONGO_URL;

//Middleware
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json())
app.use(morgan("dev"))

// mongodb connect
mongoose.connect(url).then(()=>{
    console.log(`Database connection successful`)
}).catch((err)=>console.log("Database error is",err));

// Routes are here
app.use("/api/v1/user",userRoutes)

// Server listen
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
