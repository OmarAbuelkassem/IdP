import jwt from "jsonwebtoken";
import User from "../models/user";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in. Please log in to get access.",
      });
    }
    const tokenData = jwt.verify(token, process.env.JWT_SECRET); // it returns an error if there is something wrong like expired tokens.

    const currentUser = await User.findById(tokenData.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token no longer exists.",
      });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "fail",
        message: "Your session has expired. Please log in again.",
      });
    }

    return res.status(401).json({
      status: "fail",
      message: "Invalid token. Access denied.",
    });
  }
};
