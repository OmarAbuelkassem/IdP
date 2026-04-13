import express from "express";
import { register } from "../controllers/register.js";
import { validateRegister } from "../middlewares/inputValidation.js";
import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";
import { protect } from "../middlewares/private.js";

const router = express.Router();

router.post("/register", validateRegister, register); //url : https://localhost:3000/auth/register
router.post("/login", login); //url : https://localhost:3000/auth/login
router.get("/ping", (req, res) => {
  res.status(200).json({ message: "Server says: Yup, got it!" });
}); //url : https://localhost:3000/auth/login

router.post("/logout", protect, logout); //url : https://localhost:3000/auth/logout

export default router;
