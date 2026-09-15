import express from "express";
import {
  createDocument,
  deleteDocument,
  getSingleDocument,
  updateDocument,
} from "../controllers/document.controller.js";

const router = express.Router();

router.route("/document/create").post(createDocument);

router
  .route("/document/:id")
  .get(getSingleDocument)
  .put(updateDocument)
  .delete(deleteDocument);

export default router;
