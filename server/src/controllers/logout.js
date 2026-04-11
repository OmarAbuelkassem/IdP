/**
 * @description Logut user /remove the jwt
 * @route POST /auth/logout
 * @access private
 */

export const logout = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Logged out successfully. Please delete your token.",
  });
};
