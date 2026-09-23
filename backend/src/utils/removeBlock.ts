import type { ASTBlock } from "../types/ast.types.js";

export const removeBlockById = (
  blocks: ASTBlock[],
  blockId: string,
): ASTBlock | null => {
  // Check the current level
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // Found the block
    if (block.id === blockId) {
      // Remove it from the array
      const [removedBlock] = blocks.splice(i, 1);

      return removedBlock;
    }

    // Search inside children
    if (block.children && block.children.length > 0) {
      const removedBlock = removeBlockById(
        block.children,
        blockId,
      );

      if (removedBlock) {
        return removedBlock;
      }
    }
  }

  // Block wasn't found
  return null;
};