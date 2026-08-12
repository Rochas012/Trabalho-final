import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { protect, admin } from "../Middlewares/authMiddleware.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/users", protect, admin, authController.getAllUsers);

export default router;