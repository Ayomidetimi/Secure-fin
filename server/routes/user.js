import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middleware/verifyToken.js";


const router = express.Router();

router.post("/register", async (req, res) => {

  try {
    const { userName, email, password, password2 } = req.body

    if (!userName || !email || !password || !password2) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters"
      });
    }

    const user = await User.findOne({ email: normalizedEmail })

    if (user) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    if (password !== password2) {
      return res.status(400).json({
        message: "Passwords do not match"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: userName,
      email: normalizedEmail,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ status: "success", message: "User created successfully" })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Registration failed"
    });
  }

})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });


  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }


  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1000
  });

  res.status(200).json({
    status: "success",
    message: "Login successful"
  });


})

router.get("/dashboard", verifyToken, (req, res) => {
  return res.json({
    status: "success",
    message: "Welcome to SecureFin dashboard",
    userId: req.user.userId
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });

  res.status(200).json({
    status: "success",
    message: "Logout successful"
  });

});

export default router;