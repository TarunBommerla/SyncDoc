import type { Request, Response, NextFunction } from "express";
import { Document } from "../models/document.model.js";
import type { DocumentAST } from "../types/ast.types.js";
import { validateDocumentAST } from "../utils/ast.validator.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { findBlockById } from "../utils/findBlock.js";
import type { ASTBlock } from "../types/ast.types.js";
import { removeBlockById } from "../utils/removeBlock.js";
import { findBlockLocation } from "../utils/findBlockLocation.js";

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

// ------------------------------------------------------------------------------------------
// ------------------------------------BLOCKS------------------------------------------------
// ------------------------------------------------------------------------------------------

// ------------------------------- UPDATE BLOCK
export const updateBlock = asyncHandler(
  async (
    req: Request<{ documentId: string; blockId: string }>,
    res: Response,
  ) => {
    const documentId = req.params.documentId;
    const blockId = req.params.blockId;
    if (!documentId || !blockId) {
      throw new apiError(400, "Document ID and Block ID are required");
    }

    const document = await Document.findById(documentId);
    if (!document) {
      throw new apiError(404, "Document Not Found");
    }

    const block = findBlockById(
      document.children as unknown as ASTBlock[],
      blockId,
    );

    if (!block) {
      throw new apiError(404, "Block Not Found");
    }

    const { content, language, level, metadata } = req.body;

    if (
      content === undefined &&
      language === undefined &&
      level === undefined &&
      metadata === undefined
    ) {
      throw new apiError(400, "No block data provided for update");
    }

    if (content !== undefined) {
      if (!Array.isArray(content)) {
        throw new apiError(400, "Block content should be an array");
      }

      block.content = content;
    }

    if (language !== undefined) {
      if (typeof language !== "string" || language.trim().length === 0) {
        throw new apiError(400, "Block language must be a non-empty string");
      }

      block.language = language.trim();
    }

    if (level !== undefined) {
      if (
        typeof level !== "number" ||
        !Number.isInteger(level) ||
        level < 1 ||
        level > 6
      ) {
        throw new apiError(400, "Block level must be between 1 to 6");
      }

      block.level = level;
    }

    if (metadata !== undefined) {
      if (
        typeof metadata !== "object" ||
        metadata === null ||
        Array.isArray(metadata)
      ) {
        throw new apiError(400, "Metadata must be an object");
      }

      block.metadata = metadata;
    }

    validateDocumentAST({
      title: document.title,
      children: document.children as unknown as ASTBlock[],
    });

    await document.save();

    res.status(200).json({
      success: true,
      message: "Block Updated Successfully",
      block,
    });
  },
);

// ------------------------------- CREATE/INSERT BLOCK
export const createBlock = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. GET DOCUMENT ID
    const { documentId } = req.params;
    if (!documentId) {
      throw new apiError(400, "Document ID is required");
    }

    // 2. FIND DOCUMENT
    const document = await Document.findById(documentId);
    if (!document) {
      throw new apiError(400, "Document Not Found");
    }

    // 3. GET REQUEST DATA
    const { block, position } = req.body;

    // 4. VALIDATE BLOCK
    if (!block || typeof block !== "object") {
      throw new apiError(400, "Block is required");
    }

    // 5. VALIDATE BLOCK ID
    if (typeof block.id !== "string" || block.id.trim().length === 0) {
      throw new apiError(400, "Block Id is Required");
    }

    // 6. CHECK DUPLICATE BLOCK ID
    const existingBlock = findBlockById(
      document.children as unknown as ASTBlock[],
      block.id,
    );

    if (existingBlock) {
      throw new apiError(400, "Block Id is already Exists");
    }

    // 7. VALIDATE BLOCK TYPE
    const validBlockTypes = [
      "heading",
      "paragraph",
      "code",
      "list",
      "listItem",
      "quote",
    ];

    if (
      typeof block.type !== "string" ||
      !validBlockTypes.includes(block.type)
    ) {
      throw new apiError(400, "Invalid block type");
    }

    // 8. VALIDATE POSITION
    if (
      position !== undefined &&
      (typeof position !== "number" ||
        !Number.isInteger(position) ||
        position < 0 ||
        position > document.children.length)
    ) {
      throw new apiError(400, "Invalid Block position");
    }

    // 9. DEFAULT POSITION
    const insertPosition = position ?? document.children.length;

    // 10. INSERT BLOCK
    document.children.splice(insertPosition, 0, block);

    // 11. VALIDATE COMPLETE AST
    validateDocumentAST({
      title: document.title,
      children: document.children as unknown as ASTBlock[],
    });

    // 12. SAVE DOCUMENT
    await document.save();

    // 13. RESPONSE
    res.status(200).json({
      success: true,
      message: "Block Created Successfully",
      block,
      document,
    });
  },
);

// ------------------------------- DELETE BLOCK
export const deleteBlock = asyncHandler(
  async (
    req: Request<{ documentId: string; blockId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { documentId, blockId } = req.params;

    if (!documentId || !blockId) {
      throw new apiError(400, "Document Id and Block id are required");
    }

    const document = await Document.findById(documentId);
    if (!document) {
      throw new apiError(404, "Document Not Found");
    }

    const removeBlock = removeBlockById(
      document.children as unknown as ASTBlock[],
      blockId,
    );

    if (!removeBlock) {
      throw new apiError(404, "Block Not Found");
    }

    validateDocumentAST({
      title: document.title,
      children: document.children as unknown as ASTBlock[],
    });

    await document.save();

    res.status(200).json({
      success: true,
      message: "Block Deleted Successfully",
      block: removeBlock,
    });
  },
);

// ------------------------------- MOVE BLOCK
export const moveBlock = asyncHandler(
  async (
    req: Request<{
      documentId: string;
      blockId: string;
    }>,
    res: Response,
  ) => {

    // 1. GET PARAMS
    const { documentId, blockId } = req.params;

    if (!documentId || !blockId) {
      throw new apiError(
        400,
        "Document ID and Block ID are required",
      );
    }

    // 2. GET REQUEST DATA
    const { parentBlockId, position } = req.body;

    // position is always required
    if (
      typeof position !== "number" ||
      !Number.isInteger(position)
    ) {
      throw new apiError(
        400,
        "Position must be an integer",
      );
    }

    // 3. FIND DOCUMENT
    const document = await Document.findById(documentId);

    if (!document) {
      throw new apiError(
        404,
        "Document Not Found",
      );
    }

    // 4. FIND BLOCK LOCATION
    const blockLocation = findBlockLocation(
      document.children as unknown as ASTBlock[],
      blockId,
    );

    if (!blockLocation) {
      throw new apiError(
        404,
        "Block Not Found",
      );
    }

    // 5. GET SOURCE ARRAY
    const sourceParent = blockLocation.parent;

    if (!sourceParent) {
      throw new apiError(
        400,
        "Source block parent not found",
      );
    }

    const sourceIndex = blockLocation.index;

    // 6. CASE 1 — NO parentBlockId
    // Move block to the document's top-level children.
    if (parentBlockId === undefined) {
      const targetParent =
        document.children as unknown as ASTBlock[];

      if (
        position < 0 ||
        position > targetParent.length
      ) {
        throw new apiError(
          400,
          "Invalid block position",
        );
      }

      // Already at the requested top-level position
      if (
        sourceParent === targetParent &&
        sourceIndex === position
      ) {
        res.status(200).json({
          success: true,
          message: "Block is already at this position",
          block: blockLocation.block,
        });
        return;
      }

      // Remove from old location
      const [block] = sourceParent.splice(
        sourceIndex,
        1,
      );

      // Adjust position when moving inside the same array
      let finalPosition = position;

      if (
        sourceParent === targetParent &&
        sourceIndex < position
      ) {
        finalPosition--;
      }

      targetParent.splice(
        finalPosition,
        0,
        block,
      );

      validateDocumentAST({
        title: document.title,
        children:
          document.children as unknown as ASTBlock[],
      });

      await document.save();

      res.status(200).json({
        success: true,
        message: "Block Moved Successfully",
        block,
      });
      return;
    }

    // 7. FIND TARGET PARENT
    const targetParent = findBlockById(
      document.children as unknown as ASTBlock[],
      parentBlockId,
    );

    if (!targetParent) {
      throw new apiError(
        404,
        "Target Parent Block Not Found",
      );
    }

    // 8. PREVENT MOVING BLOCK INTO ITSELF
    if (blockId === parentBlockId) {
      throw new apiError(
        400,
        "A block cannot be moved inside itself",
      );
    }

    // 9. MAKE SURE TARGET HAS CHILDREN
    if (!targetParent.children) {
      targetParent.children = [];
    }

    // 10. VALIDATE POSITION
    if (
      position < 0 ||
      position > targetParent.children.length
    ) {
      throw new apiError(
        400,
        "Invalid target position",
      );
    }

    // 11. PREVENT CIRCULAR STRUCTURE
    const isInsideBlock = findBlockById(
      blockLocation.block.children ?? [],
      parentBlockId,
    );

    if (isInsideBlock) {
      throw new apiError(
        400,
        "A block cannot be moved inside its own child",
      );
    }

    // 12. REMOVE FROM SOURCE
    const [block] = sourceParent.splice(
      sourceIndex,
      1,
    );

    // 13. INSERT INTO TARGET
    let finalPosition = position;

    if (
      sourceParent === targetParent.children &&
      sourceIndex < position
    ) {
      finalPosition--;
    }

    targetParent.children.splice(
      finalPosition,
      0,
      block,
    );

    // 14. VALIDATE COMPLETE AST
    validateDocumentAST({
      title: document.title,
      children:
        document.children as unknown as ASTBlock[],
    });

    // 15. SAVE
    await document.save();


    // 16. RESPONSE
    res.status(200).json({
      success: true,
      message: "Block Moved Successfully",
      block,
      targetParent,
    });
  },
);

// ------------------------------------------------------------------------------------------
// -----------------------------NESTED BLOCK OPERATIONS--------------------------------------
// ------------------------------------------------------------------------------------------

// ------------------------------- CREATE NESTED BLOCK
export const createNestedBlock = asyncHandler(
  async (
    req: Request<{ documentId: string; parentBlockId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { documentId, parentBlockId } = req.params;
    if (!documentId || !parentBlockId) {
      throw new apiError(400, "Document Id and Parent Block Id are Required");
    }

    const document = await Document.findById(documentId);
    if (!document) {
      throw new apiError(400, "Document Not Found");
    }

    const parentBlock = findBlockById(
      document.children as unknown as ASTBlock[],
      parentBlockId,
    );
    if (!parentBlock) {
      throw new apiError(400, "Parent Block not Found");
    }

    const { block, position } = req.body;
    if (!block || typeof block !== "object") {
      throw new apiError(400, "Block is Required");
    }

    if (typeof block.id !== "string" || block.id.trim().length === 0) {
      throw new apiError(400, "Block Id is Required");
    }

    const existingBlock = findBlockById(
      document.children as unknown as ASTBlock[],
      block.id,
    );
    if (existingBlock) {
      throw new apiError(400, "Block Id already exists");
    }

    const validBlockTypes = [
      "heading",
      "paragraph",
      "code",
      "list",
      "listItem",
      "quote",
    ];

    if (
      typeof block.type !== "string" ||
      !validBlockTypes.includes(block.type)
    ) {
      throw new apiError(400, "Invalid block type");
    }

    if (!parentBlock.children) {
      parentBlock.children = [];
    }

    if (
      position !== undefined &&
      (typeof position !== "number" ||
        !Number.isInteger(position) ||
        position < 0 ||
        position > parentBlock.children.length)
    ) {
      throw new apiError(400, "Invalid block position");
    }

    const insertPosition = position ?? parentBlock.children.length;

    parentBlock.children.splice(insertPosition, 0, block);

    validateDocumentAST({
      title: document.title,
      children: document.children as unknown as ASTBlock[],
    });

    await document.save()

    res.status(200).json({
      success: true,
      message: "Nested Block Created Successfully",
      block,
      parentBlock
    })
  },
);
