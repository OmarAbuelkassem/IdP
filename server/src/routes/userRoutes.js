import express from "express";
import { protect } from "../middlewares/private";

router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user, // req.user was attached by the protect middleware!
    },
  });
});
