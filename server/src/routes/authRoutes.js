import express from "express";
import { register } from "../controllers/register.js";
import { validateRegister } from "../middlewares/inputValidation.js";
import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";
import { protect } from "../middlewares/private.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", login);
router.post("/logout", protect, logout);

export default router;
