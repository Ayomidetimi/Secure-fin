import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.post("/login", async (req, res)=> {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  res.json({ message: "Login route working" });
  console.log("Login route reached");
  console.log("Email received:", email);
  console.log("User found:", user);
})

export default router;