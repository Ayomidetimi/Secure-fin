import express from "express";
import userRouter from "./routes/user.js"
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

app.use("/auth", userRouter);

app.listen(3000, ()=> {
  console.log("server running on port 3000")
});