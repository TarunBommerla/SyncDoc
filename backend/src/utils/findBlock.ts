import type { ASTBlock } from "../types/ast.types.js";

export const findBlockById = (
  blocks: ASTBlock[],
  blockId: string,
): ASTBlock | null => {
  for (const block of blocks) {
    if (block.id === blockId) {
      return block;
    }

    if (block.children && block.children.length > 0) {
      const foundBlock = findBlockById(
        block.children,
        blockId,
      );

      if (foundBlock) {
        return foundBlock;
      }
    }
  }

  return null;
};