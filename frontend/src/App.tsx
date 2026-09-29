import { useState } from 'react'
import { documents } from './data/documents'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import './App.css'

function App() {
  const [documentList, setDocumentList] = useState(documents)

  const [selectedDocumentId, setSelectedDocumentId] =
    useState(documents[0].id)

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
const updateDocument = (updatedDocument: any) => {
  setDocumentList((currentDocuments) =>
    currentDocuments.map((document) =>
      document.id === updatedDocument.id
        ? updatedDocument
        : document
    )
  )
}

const selectedDocument =
  documentList.find(
    (document) => document.id === selectedDocumentId
  ) ?? documentList[0]

return (
  
    <div className="syncdoc">
      <Header />

      <div className="workspace">
        <Sidebar
          documentList={documentList}
          selectedDocumentId={selectedDocumentId}
          setSelectedDocumentId={setSelectedDocumentId}
          createDocument={createDocument}
        />

       <Editor
  selectedDocument={selectedDocument}
  updateDocument={updateDocument}
/>
      </div>
    </div>
  )
}

export default App