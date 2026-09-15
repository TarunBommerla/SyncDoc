import mongoose from "mongoose";

/* =========================================================
   INLINE CONTENT SCHEMA
   ========================================================= */

const inlineContentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
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
  },
);

/* =========================================================
   BLOCK SCHEMA
   ========================================================= */

const blockSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["heading", "paragraph", "code", "list", "listItem", "quote"],
    },

    content: {
      type: [inlineContentSchema],
      default: [],
    },

    language: {
      type: String,
      default: null,
    },

    level: {
      type: Number,
      default: null,
    },

    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    _id: false,
  },
);

/* =========================================================
   RECURSIVE CHILDREN
   ========================================================= */

blockSchema.add({
  children: {
    type: [blockSchema],
    default: [],
  },
});

/* =========================================================
   DOCUMENT SCHEMA
   ========================================================= */

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    children: {
      type: [blockSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

/* =========================================================
   MODEL
   ========================================================= */

export const Document = mongoose.model("Document", documentSchema);
