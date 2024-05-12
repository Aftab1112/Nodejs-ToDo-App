import express from "express";
import {
  getMyProfile,
  registerNewUser,
  userLogin,
  userLogout,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Creating a router to use in app.js file
const router = express.Router();

router.post("/new", registerNewUser);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.get("/me", isAuthenticated, getMyProfile);

export default router;
