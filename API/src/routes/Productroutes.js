import { Router } from "express";
import * as productController from "../controllers/productController.js";
import { protect, admin } from "../Middlewares/authMiddleware.js";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", protect, productController.createProduct);
router.put("/:id", protect, productController.updateProduct);
router.delete("/:id", protect, admin, productController.deleteProduct);

export default router;