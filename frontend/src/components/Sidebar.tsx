import DocumentList from './DocumentList'

type SidebarProps = {
  documentList: any[]
  selectedDocumentId: number
  setSelectedDocumentId: (id: number) => void
  createDocument: () => void
}

function Sidebar({
  documentList,
  selectedDocumentId,
  setSelectedDocumentId,
  createDocument,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Documents</h2>

        <button
          className="new-button"
          onClick={createDocument}
        >
          +
        </button>
      </div>

      <DocumentList
        documentList={documentList}
        selectedDocumentId={selectedDocumentId}
        setSelectedDocumentId={setSelectedDocumentId}
      />
    </aside>
  )
}

export default Sidebar