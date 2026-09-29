type EditorProps = {
  selectedDocument: any
  updateDocument: (updatedDocument: any) => void
}

function Editor({
  selectedDocument,
  updateDocument,
}: EditorProps) {

  const saveBlock = (
    blockId: number,
    content: string
  ) => {

    const updatedDocument = {
      ...selectedDocument,

      blocks: selectedDocument.blocks.map(
        (block: any) =>
          block.id === blockId
            ? {
                ...block,
                content,
              }
            : block
      ),

      updatedAt: 'Just now',
    }

    updateDocument(updatedDocument)
  }


  return (
    <main className="editor">

      {/* HEADER */}

      <div className="editor-header">

        <div>
          <p className="editor-label">
            DOCUMENT
          </p>

          <h1>
            {selectedDocument.title}
          </h1>
        </div>


        <div className="collaborators">

          <span className="avatar">
            A
          </span>

          <span className="avatar second">
            T
          </span>

          <span className="collaborator-count">
            2 editors
          </span>

        </div>

      </div>


      {/* CONTENT */}

      <div className="editor-content">

        {selectedDocument.blocks.map(
          (block: any) => {

            {/* HEADING */}

            if (block.type === 'heading') {

              return (
                <h2
                  key={`${selectedDocument.id}-${block.id}`}
                  className="document-heading"

                  contentEditable
                  suppressContentEditableWarning

                  onBlur={(event) => {
                    saveBlock(
                      block.id,
                      event.currentTarget.textContent || ''
                    )
                  }}
                >
                  {block.content}
                </h2>
              )
            }


            {/* CODE */}

            if (block.type === 'code') {

              return (
                <pre
                  key={`${selectedDocument.id}-${block.id}`}
                  className="code-block"

                  contentEditable
                  suppressContentEditableWarning

                  onBlur={(event) => {
                    saveBlock(
                      block.id,
                      event.currentTarget.textContent || ''
                    )
                  }}
                >
                  <code>
                    {block.content}
                  </code>
                </pre>
              )
            }


            {/* PARAGRAPH */}

            return (
              <p
                key={`${selectedDocument.id}-${block.id}`}
                className="document-paragraph"

                contentEditable
                suppressContentEditableWarning

                onBlur={(event) => {
                  saveBlock(
                    block.id,
                    event.currentTarget.textContent || ''
                  )
                }}
              >
                {block.content}
              </p>
            )

          }
        )}

      </div>

    </main>
  )
}

export default Editor