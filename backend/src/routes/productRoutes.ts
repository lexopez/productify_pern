import { Router } from "express";
import * as productController from "../controllers/product.controller.ts";

const router = Router();

// GET /api/products => Get all products (public)
router.get("/", productController.getAllProducts);

// GET /api/products/my - Get current user's products (protected)
router.get("/my", productController.getMyProducts);

// GET /api/products/:id - Get single product by ID (public)
router.get("/:id", productController.getProductById);

// POST /api/products - Create new product (protected)
router.post("/", productController.createProduct);

// PUT /api/products/:id - Update product (protected - owner only)
router.put("/:id", productController.updateProduct);

// DELETE /api/products/:id - Delete product (protected - owner only)
router.delete("/:id", productController.deleteProduct);

export default router;
