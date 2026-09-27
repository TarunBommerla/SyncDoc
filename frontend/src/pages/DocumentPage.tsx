import DocumentCard from "../Components/layout/DocumentCard";
import Footer from "../Components/layout/Footer";
import Navbar from "../Components/layout/Navbar";

const DocumentPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-col gap-6 border-b border-gray-200 pb-8 sm:flex-row sm:items-center sm:justify-between">
            {/* Heading */}
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Documents
              </h1>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Manage and access your SyncDoc documents.
              </p>
            </div>

            {/* New Document Button */}
            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-gray-800 active:scale-95"
            >
              <span className="text-lg leading-none">+</span>
              New Document
            </button>
          </div>

          {/* Documents */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">
                Your Documents
              </h2>

              <span className="text-sm text-gray-500">1 document</span>
            </div>

            <div className="space-y-3">
              <DocumentCard />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DocumentPage;
