import { useState } from 'react'
import { documents } from './data/documents'
import './App.css'

function App() {
 const [documentList, setDocumentList] = useState(documents)
const [selectedDocumentId, setSelectedDocumentId] = useState(documents[0].id)
const createDocument = () => {
  const newDocument = {
    id: Date.now(),
    title: 'New Document',
    updatedAt: 'Just now',
    blocks: [
      {
        id: 1,
        type: 'heading' as const,
        content: 'New Document',
      },
      {
        id: 2,
        type: 'paragraph' as const,
        content: 'Start writing your document here...',
      },
    ],
  }

  setDocumentList((currentDocuments) => [
    ...currentDocuments,
    newDocument,
  ])

  setSelectedDocumentId(newDocument.id)
}

const selectedDocument =
  documentList.find((document) => document.id === selectedDocumentId) ??
  documentList[0]

  return (
    <div className="syncdoc">
      <header className="topbar">
        <div className="logo">
          <span className="logo-mark">S</span>
          <span>SyncDoc</span>
        </div>

        <div className="user-area">
          <span className="online-dot"></span>
          <span>Online</span>
          <span className="user-name">TONY</span>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>Documents</h2>
            <button className="new-button" onClick={createDocument}>
  +
</button>
          </div>

          <div className="document-list">
           {documentList.map((document) => (
              <button
                key={document.id}
                className={`document-item ${
                  document.id === selectedDocumentId ? 'active' : ''
                }`}
                onClick={() => setSelectedDocumentId(document.id)}
              >
                <span className="document-icon">📄</span>

                <span className="document-info">
                  <span className="document-title">{document.title}</span>
                  <span className="document-time">
                    {document.updatedAt}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <main className="editor">
          <div className="editor-header">
            <div>
              <p className="editor-label">DOCUMENT</p>
              <h1>{selectedDocument.title}</h1>
            </div>

            <div className="collaborators">
              <span className="avatar">A</span>
              <span className="avatar second">T</span>
              <span className="collaborator-count">2 editors</span>
            </div>
          </div>

          <div className="editor-content">
            {selectedDocument.blocks.map((block) => {
              if (block.type === 'heading') {
                return (
                  <h2 className="document-heading" key={block.id}>
                    {block.content}
                  </h2>
                )
              }

              if (block.type === 'code') {
                return (
                  <pre className="code-block" key={block.id}>
                    <code>{block.content}</code>
                  </pre>
                )
              }

              return (
                <p className="document-paragraph" key={block.id}>
                  {block.content}
                </p>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App