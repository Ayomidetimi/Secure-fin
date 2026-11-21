import express from "express";
import userRouter from "./routes/user.js"
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/securefin")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
  
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(express.json());

app.use(cookieParser());
app.listen(3000, () => {
  console.log("server running on port 3000")
});

app.use("/auth", userRouter);