export interface Document {
  id: number
  title: string
  updatedAt: string
  blocks: Block[]
}

export interface Block {
  id: number
  type: 'heading' | 'paragraph' | 'code'
  content: string
}

export const documents: Document[] = [
  {
    id: 1,
    title: 'API Design',
    updatedAt: '2 minutes ago',
    blocks: [
      {
        id: 1,
        type: 'heading',
        content: 'Introduction',
      },
      {
        id: 2,
        type: 'paragraph',
        content:
          'This document describes the API design and structure for the SyncDoc project.',
      },
      {
        id: 3,
        type: 'code',
        content: 'GET /api/users',
      },
    ],
  },
  {
    id: 2,
    title: 'Project Specification',
    updatedAt: '1 hour ago',
    blocks: [
      {
        id: 1,
        type: 'heading',
        content: 'SyncDoc Project',
      },
      {
        id: 2,
        type: 'paragraph',
        content:
          'SyncDoc is a collaborative document engine designed to resolve structural editing conflicts.',
      },
    ],
  },
  {
    id: 3,
    title: 'Meeting Notes',
    updatedAt: 'Yesterday',
    blocks: [
      {
        id: 1,
        type: 'heading',
        content: 'Team Meeting',
      },
      {
        id: 2,
        type: 'paragraph',
        content:
          'Discussed document collaboration, block editing and conflict resolution.',
      },
    ],
  },
]