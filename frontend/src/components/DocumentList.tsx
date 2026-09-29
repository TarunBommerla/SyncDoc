type DocumentListProps = {
  documentList: any[]
  selectedDocumentId: number
  setSelectedDocumentId: (id: number) => void
}

function DocumentList({
  documentList,
  selectedDocumentId,
  setSelectedDocumentId,
}: DocumentListProps) {
  return (
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
  )
}

export default DocumentList