import type { Request, Response, NextFunction } from "express";
import { Document } from "../models/document.model.js";
import type { DocumentAST } from "../types/ast.types.js";
import { validateDocumentAST } from "../utils/ast.validator.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// ------------------------------- CREATING DOCUMENT
export const createDocument = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, children } = req.body as DocumentAST;

    if (!title || typeof title !== "string") {
      throw new apiError(400, "Document Title is required");
    }

    if (title.trim().length === 0) {
      throw new apiError(400, "Document Title can't be empty");
    }

    if (!Array.isArray(children)) {
      throw new apiError(400, "Document children must be an array");
    }

    const documentData: DocumentAST = {
      title: title.trim(),
      children,
    };

    validateDocumentAST(documentData);

    const document = await Document.create(documentData);

    res.status(201).json({
      success: true,
      message: "Document Created Successfully",
      document,
    });
  },
);

// ------------------------------- GETTING A SINGLE DOCUMENT
export const getSingleDocument = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const document = await Document.findById(req.params.id);
    if (!document) {
      throw new apiError(404, "Document Not Found!");
    }

    res.status(200).json({
      success: true,
      document,
    });
  },
);

// ------------------------------- UPDATING DOCUMENT
export const updateDocument = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, children } = req.body;

    // VALIDATE UPDATE DATA
    if (title !== undefined) {
      if (typeof title !== "string") {
        throw new apiError(400, "Document title must be a string");
      }

      if (title.trim().length === 0) {
        throw new apiError(400, "Document title can't be empty");
      }
    }

    if (children !== undefined && !Array.isArray(children)) {
      throw new apiError(400, "Document children must be an array");
    }

    // FIND EXISTING DOCUMENT
    const document = await Document.findById(req.params.id);

    if (!document) {
      throw new apiError(404, "Document Not Found!");
    }

    // PREPARE UPDATED DATA
    const updatedTitle = title !== undefined ? title.trim() : document.title;

    const updatedChildren =
      children !== undefined ? children : document.children;

    //   VALIDATE COMPLETE AST
    const documentAST: DocumentAST = {
      title: updatedTitle,
      children: updatedChildren,
    };

    validateDocumentAST(documentAST);

    // UPDATE MONGODB
    document.title = updatedTitle;
    document.children = updatedChildren;

    await document.save();

    // RESPONSE
    res.status(200).json({
      success: true,
      message: "Document Updated Successfully",
      document,
    });
  },
);

// ------------------------------- DELETE DOCUMENT
export const deleteDocument = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) {
      throw new apiError(404, "Document Not Found!");
    }

    res.status(200).json({
      success: true,
      message: "Document Deleted Successfully",
    });
  },
);
