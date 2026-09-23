import type { ASTBlock } from "../types/ast.types.js";

interface BlockLocation {
  block: ASTBlock;
  parent: ASTBlock[] | null;
  index: number;
}

export const findBlockLocation = (
  blocks: ASTBlock[],
  blockId: string,
): BlockLocation | null => {
  // Search the current array
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // Block found
    if (block.id === blockId) {
      return {
        block,
        parent: blocks,
        index: i,
      };
    }

    // Search recursively inside children
    if (block.children && block.children.length > 0) {
      const result = findBlockLocation(
        block.children,
        blockId,
      );

      if (result) {
        return result;
      }
    }
  }

  return null;
};