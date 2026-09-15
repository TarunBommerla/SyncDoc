/* =========================================================
   BLOCK TYPES
   ========================================================= */

export type BlockType =
  | "heading"
  | "paragraph"
  | "code"
  | "list"
  | "listItem"
  | "quote";

/* =========================================================
   INLINE CONTENT
   ========================================================= */

export interface InlineContent {
  text: string;

  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

/* =========================================================
   AST BLOCK
   ========================================================= */

export interface ASTBlock {
  id: string;
  type: BlockType;
  content?: InlineContent[];
  language?: string;
  level?: number;
  children?: ASTBlock[];
  metadata?: Record<string, unknown>;
}

/* =========================================================
   DOCUMENT AST
   ========================================================= */

export interface DocumentAST {
  title: string;
  children: ASTBlock[];
}