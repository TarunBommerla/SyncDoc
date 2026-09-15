import type {
  ASTBlock,
  BlockType,
  DocumentAST,
  InlineContent,
} from "../types/ast.types.js";

/* =========================================================
   VALID BLOCK TYPES
   ========================================================= */

const validBlockTypes: BlockType[] = [
  "heading",
  "paragraph",
  "code",
  "list",
  "listItem",
  "quote",
];

/* =========================================================
   VALIDATE INLINE CONTENT
   ========================================================= */

const validateInlineContent = (
  content: InlineContent[],
  blockId: string,
): void => {
  if (!Array.isArray(content)) {
    throw new Error(`Content of block "${blockId}" must be an array`);
  }

  for (const item of content) {
    if (!item || typeof item !== "object" || typeof item.text !== "string") {
      throw new Error(`Invalid inline content in block "${blockId}"`);
    }

    if (typeof item.bold !== "undefined" && typeof item.bold !== "boolean") {
      throw new Error(`Invalid "bold" value in block "${blockId}"`);
    }

    if (
      typeof item.italic !== "undefined" &&
      typeof item.italic !== "boolean"
    ) {
      throw new Error(`Invalid "italic" value in block "${blockId}"`);
    }

    if (
      typeof item.underline !== "undefined" &&
      typeof item.underline !== "boolean"
    ) {
      throw new Error(`Invalid "underline" value in block "${blockId}"`);
    }

    if (typeof item.code !== "undefined" && typeof item.code !== "boolean") {
      throw new Error(`Invalid "code" value in block "${blockId}"`);
    }
  }
};

/* =========================================================
   RECURSIVE BLOCK VALIDATION
   ========================================================= */

const validateBlock = (block: ASTBlock, blockIds: Set<string>): void => {
  /* ---------------------------------------------------------
     BLOCK OBJECT
     --------------------------------------------------------- */

  if (!block || typeof block !== "object") {
    throw new Error("Invalid AST block");
  }

  /* ---------------------------------------------------------
     BLOCK ID
     --------------------------------------------------------- */

  if (!block.id || typeof block.id !== "string") {
    throw new Error("Every block must have a valid id");
  }

  /* ---------------------------------------------------------
     DUPLICATE BLOCK ID
     --------------------------------------------------------- */

  if (blockIds.has(block.id)) {
    throw new Error(`Duplicate block id found: "${block.id}"`);
  }

  blockIds.add(block.id);

  /* ---------------------------------------------------------
     BLOCK TYPE
     --------------------------------------------------------- */

  if (!validBlockTypes.includes(block.type)) {
    throw new Error(
      `Invalid block type "${block.type}" in block "${block.id}"`,
    );
  }

  /* ---------------------------------------------------------
     HEADING VALIDATION
     --------------------------------------------------------- */

  if (block.type === "heading") {
    if (
      typeof block.level !== "number" ||
      !Number.isInteger(block.level) ||
      block.level < 1 ||
      block.level > 6
    ) {
      throw new Error(
        `Heading block "${block.id}" must have a level between 1 and 6`,
      );
    }
  }

  /* ---------------------------------------------------------
     CODE BLOCK VALIDATION
     --------------------------------------------------------- */

  if (block.type === "code") {
    if (
      typeof block.language !== "string" ||
      block.language.trim().length === 0
    ) {
      throw new Error(`Code block "${block.id}" must have a language`);
    }
  }

  /* ---------------------------------------------------------
     CONTENT VALIDATION
     --------------------------------------------------------- */

  if (block.content !== undefined) {
    validateInlineContent(block.content, block.id);
  }

  /* ---------------------------------------------------------
     CHILDREN VALIDATION
     --------------------------------------------------------- */

  if (block.children !== undefined) {
    if (!Array.isArray(block.children)) {
      throw new Error(`Children of block "${block.id}" must be an array`);
    }

    for (const child of block.children) {
      validateBlock(child, blockIds);
    }
  }
};

/* =========================================================
   VALIDATE COMPLETE DOCUMENT
   ========================================================= */

export const validateDocumentAST = (document: DocumentAST): void => {
  /* ---------------------------------------------------------
     DOCUMENT OBJECT
     --------------------------------------------------------- */

  if (!document || typeof document !== "object") {
    throw new Error("Invalid document");
  }

  /* ---------------------------------------------------------
     TITLE
     --------------------------------------------------------- */

  if (
    typeof document.title !== "string" ||
    document.title.trim().length === 0
  ) {
    throw new Error("Document title is required");
  }

  /* ---------------------------------------------------------
     ROOT CHILDREN
     --------------------------------------------------------- */

  if (!Array.isArray(document.children)) {
    throw new Error("Document children must be an array");
  }

  /* ---------------------------------------------------------
     TRACK ALL BLOCK IDS
     --------------------------------------------------------- */

  const blockIds = new Set<string>();

  /* ---------------------------------------------------------
     VALIDATE ROOT BLOCKS
     --------------------------------------------------------- */

  for (const block of document.children) {
    validateBlock(block, blockIds);
  }
};
