import User from "../models/user.js";

/**
 * @description Register New user
 * @Route POST /auth/register
 * @access Public
 */

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1 - Check if the user(email) is already used/registered
    const userExistence = await User.findOne({ email });
    if (userExistence) {
      return res.status(400).json({
        status: "fail",
        message: "Email is already registered. Please login instead.",
      });
    }

    // 2- If user is new , we create a new one
    const newUser = await User.create({
      email,
      password,
    });

    // 3- Send back a registration complete message
    res.status(201).json({
      status: "Success",
      message: "Account created successfully!",
      data: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
};
