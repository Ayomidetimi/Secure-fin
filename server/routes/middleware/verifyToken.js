import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  console.log("Cookie header received:", Boolean(req.headers.cookie));
  console.log("Token received:", Boolean(token));

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token."
    });
  }
};