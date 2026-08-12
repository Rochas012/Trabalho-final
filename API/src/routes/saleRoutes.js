import { Router } from "express";
import * as saleController from "../controllers/saleController.js";
import { protect } from "../Middlewares/authMiddleware.js";

const router = Router();

router.get("/", protect, saleController.getAllSales);
router.get("/:id", protect, saleController.getSaleById);
router.post("/", protect, saleController.createSale);
router.put("/:id/cancel", protect, saleController.cancelSale);

export default router;