import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const router = express.Router();

router.post("/register", async (req, res) => {


  try {
    const { userName, email, password, password2 } = req.body
    const user = await User.findOne({ email })

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
      email,
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

export default router;