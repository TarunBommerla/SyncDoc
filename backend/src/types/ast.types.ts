export type BlockType =
  | "heading"
  | "paragraph"
  | "code"
  | "list"
  | "listItem"
  | "quote";

export interface InlineContent {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

export interface ASTBlock {
  id: string;
  type: BlockType;
  content?: InlineContent[];
  language?: string;
  level?: number;
  children?: ASTBlock[];
  metadata?: Record<string, unknown>;
}

export interface DocumentAST {
  title: string;
  children: ASTBlock[];
}
