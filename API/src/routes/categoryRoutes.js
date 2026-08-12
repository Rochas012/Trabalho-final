import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js";
import { protect, admin } from "../Middlewares/authMiddleware.js";

const router = Router();

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.post("/", protect, categoryController.createCategory);
router.put("/:id", protect, categoryController.updateCategory);
router.delete("/:id", protect, admin, categoryController.deleteCategory);

export default router;