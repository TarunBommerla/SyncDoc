import Navbar from "../Components/layout/Navbar";
import Footer from "../Components/layout/Footer";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-600">
                About SyncDoc
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Collaboration made simple.
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-500">
                SyncDoc is a collaborative document platform designed to make
                creating, managing, and working on documents with your team
                simple and efficient.
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Text */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Our Purpose
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                  A better way to work with documents
                </h2>

                <p className="mt-5 leading-7 text-gray-500">
                  Working on documents with multiple people can quickly become
                  difficult when information is scattered across different
                  tools. SyncDoc brings documents and collaboration into one
                  focused workspace.
                </p>

                <p className="mt-4 leading-7 text-gray-500">
                  Whether you're creating a project document, sharing
                  information with your team, or managing structured content,
                  SyncDoc provides a simple environment to keep everything
                  organized.
                </p>
              </div>

              {/* Highlight Card */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white">
                      ✓
                    </div>

                    <h3 className="mt-4 font-semibold text-gray-900">Simple</h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      A focused interface without unnecessary complexity.
                    </p>
                  </div>

                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white">
                      ↗
                    </div>

                    <h3 className="mt-4 font-semibold text-gray-900">
                      Collaborative
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Built around teamwork and shared documents.
                    </p>
                  </div>

                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white">
                      ◇
                    </div>

                    <h3 className="mt-4 font-semibold text-gray-900">
                      Organized
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Keep your documents structured and easy to access.
                    </p>
                  </div>

                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white">
                      ⚡
                    </div>

                    <h3 className="mt-4 font-semibold text-gray-900">
                      Efficient
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Spend less time managing documents and more time working
                      on them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="border-y border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Our Mission
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
              Make collaboration feel effortless.
            </h2>

            <p className="mt-5 leading-7 text-gray-500">
              SyncDoc aims to provide teams with a clean and reliable workspace
              where documents can be created, organized, and shared without
              getting in the way of the work itself.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="rounded-2xl bg-gray-900 px-6 py-14 text-center sm:px-12">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Start working with SyncDoc
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-gray-400">
                Create and manage your documents from one simple collaborative
                workspace.
              </p>

              <a
                href="/documents"
                className="mt-8 inline-flex rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
              >
                View Documents
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
