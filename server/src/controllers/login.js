import User from "../models/user.js";
import generateToken from "../util/generateToken.js";
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password"); // password is hidden so we have to explicitly ask for it.

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password.",
      });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      status: "success",
      token,
      message: "Logged in successfully",
      data: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
