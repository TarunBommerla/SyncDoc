import type { ASTBlock, BlockType } from "../types/ast.types.js";

const BLOCK_TYPES: BlockType[] = [
  "heading",
  "paragraph",
  "code",
  "list",
  "listItem",
  "quote",
];

export const validateAST = (blocks: ASTBlock[]): void => {
  const visitedIds = new Set<string>();

  const traverse = (
    currentBlocks: ASTBlock[],
    parentId: string | null = null
  ): void => {
    for (const block of currentBlocks) {
      validateBlock(block, parentId, visitedIds);

      if (block.children && block.children.length > 0) {
        traverse(block.children, block.id);
      }
    }
  };

  traverse(blocks);
};

const validateBlock = (
  block: ASTBlock,
  parentId: string | null,
  visitedIds: Set<string>
): void => {
  /* ---------------------------------------------
     ID VALIDATION
     --------------------------------------------- */

  if (!block.id || block.id.trim().length === 0) {
    throw new Error(
      `AST validation failed: block ID is missing. Parent: ${parentId ?? "root"}`
    );
  }

  if (visitedIds.has(block.id)) {
    throw new Error(
      `AST validation failed: duplicate block ID "${block.id}"`
    );
  }

  visitedIds.add(block.id);

  /* ---------------------------------------------
     BLOCK TYPE VALIDATION
     --------------------------------------------- */

  if (!BLOCK_TYPES.includes(block.type)) {
    throw new Error(
      `AST validation failed: invalid block type "${block.type}" in block "${block.id}"`
    );
  }

  /* ---------------------------------------------
     HEADING VALIDATION
     --------------------------------------------- */

  if (block.type === "heading") {
    if (
      block.level === undefined ||
      block.level < 1 ||
      block.level > 6
    ) {
      throw new Error(
        `AST validation failed: heading "${block.id}" must have a level between 1 and 6`
      );
    }

    validateContent(block);
  }

  /* ---------------------------------------------
     PARAGRAPH VALIDATION
     --------------------------------------------- */

  if (block.type === "paragraph") {
    validateContent(block);
  }

  /* ---------------------------------------------
     CODE BLOCK VALIDATION
     --------------------------------------------- */

  if (block.type === "code") {
    if (!block.language || block.language.trim().length === 0) {
      throw new Error(
        `AST validation failed: code block "${block.id}" must have a language`
      );
    }

    validateContent(block);
  }

  /* ---------------------------------------------
     LIST VALIDATION
     --------------------------------------------- */

  if (block.type === "list") {
    if (!block.children || block.children.length === 0) {
      throw new Error(
        `AST validation failed: list "${block.id}" must contain at least one child`
      );
    }
  }

  /* ---------------------------------------------
     LIST ITEM VALIDATION
     --------------------------------------------- */

  if (block.type === "listItem") {
    if (!block.children || block.children.length === 0) {
      throw new Error(
        `AST validation failed: list item "${block.id}" must contain children`
      );
    }
  }

  /* ---------------------------------------------
     QUOTE VALIDATION
     --------------------------------------------- */

  if (block.type === "quote") {
    if (!block.children || block.children.length === 0) {
      throw new Error(
        `AST validation failed: quote "${block.id}" must contain children`
      );
    }
  }
};

/* =========================================================
   INLINE CONTENT VALIDATION
   ========================================================= */

const validateContent = (block: ASTBlock): void => {
  if (!block.content || block.content.length === 0) {
    throw new Error(
      `AST validation failed: block "${block.id}" of type "${block.type}" must contain content`
    );
  }

  for (const item of block.content) {
    if (typeof item.text !== "string") {
      throw new Error(
        `AST validation failed: inline content in block "${block.id}" must contain text`
      );
    }
  }
};