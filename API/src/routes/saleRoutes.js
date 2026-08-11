import { Router } from "express";
import * as saleController from "../controllers/saleController.js";

const router = Router();

router.get("/", saleController.getAllSales);
router.get("/:id", saleController.getSaleById);
router.post("/", saleController.createSale);
router.put("/:id/cancel", saleController.cancelSale);

export default router;