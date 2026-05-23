import { Router } from "express";
import * as commentController from "../controllers/comment.controller.ts";

const router = Router();

// POST /api/comments/:productId - Add comment to product (protected)
router.post("/:productId", commentController.createComment);

// DELETE /api/comments/:commentId - Delete comment (protected - owner only)
router.delete("/:commentId", commentController.deleteComment);

export default router;
