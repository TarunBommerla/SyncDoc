import express from "express";
import {
  createBlock,
  createDocument,
  createNestedBlock,
  deleteBlock,
  deleteDocument,
  getSingleDocument,
  moveBlock,
  updateBlock,
  updateDocument,
} from "../controllers/document.controller.js";

const router = express.Router();

router.route("/document/create").post(createDocument);

router
  .route("/document/:id")
  .get(getSingleDocument)
  .put(updateDocument)
  .delete(deleteDocument);

router
  .route("/document/:documentId/block/:blockId")
  .patch(updateBlock)
  .delete(deleteBlock);

router.route("/document/:documentId/block").post(createBlock);

router.route("/document/:documentId/block/:blockId/move").patch(moveBlock);

router.route("/document/:documentId/block/:parentBlockId/children").post(createNestedBlock);

export default router;
