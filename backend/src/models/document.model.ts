import mongoose, { Document, Schema } from "mongoose";

import type {
  ASTBlock,
  BlockType,
  InlineContent,
} from "../types/ast.types.js";

import { validateAST } from "../utils/ast.validator.js";

/* =========================================================
   INLINE CONTENT SCHEMA
   ========================================================= */

const inlineContentSchema = new Schema<InlineContent>(
  {
    text: {
      type: String,
      required: true,
      trim: false,
    },

    bold: {
      type: Boolean,
      default: false,
    },

    italic: {
      type: Boolean,
      default: false,
    },

    underline: {
      type: Boolean,
      default: false,
    },

    code: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   AST BLOCK SCHEMA
   ========================================================= */

const astBlockSchema = new Schema<ASTBlock>(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "heading",
        "paragraph",
        "code",
        "list",
        "listItem",
        "quote",
      ] satisfies BlockType[],
      required: true,
    },

    content: {
      type: [inlineContentSchema],
      default: undefined,
    },

    language: {
      type: String,
      trim: true,
      default: undefined,
    },

    level: {
      type: Number,
      min: 1,
      max: 6,
      default: undefined,
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: undefined,
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   RECURSIVE CHILDREN
   ========================================================= */

astBlockSchema.add({
  children: {
    type: [astBlockSchema],
    default: undefined,
  },
});

/* =========================================================
   DOCUMENT MODEL INTERFACE
   ========================================================= */

export interface IDocument extends Document {
  title: string;
  children: ASTBlock[];
  createdAt: Date;
  updatedAt: Date;
}

/* =========================================================
   DOCUMENT SCHEMA
   ========================================================= */

const documentSchema = new Schema<IDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
    },

    children: {
      type: [astBlockSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

/* =========================================================
   RECURSIVE AST PRE-SAVE VALIDATION
   ========================================================= */

documentSchema.pre("save", function () {
  validateAST(this.children);
});

/* =========================================================
   DOCUMENT MODEL
   ========================================================= */

export const DocumentModel = mongoose.model<IDocument>(
  "Document",
  documentSchema
);