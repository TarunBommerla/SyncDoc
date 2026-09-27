
import Navbar from "../Components/layout/Navbar";
import Footer from "../Components/layout/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>

                <span className="text-sm font-medium text-gray-600">
                  Collaborative documents, simplified
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Create. Collaborate.
                <span className="block text-gray-500">Sync everything.</span>
              </h1>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">
                SyncDoc makes it simple for teams to create, edit, and manage
                documents together in real time.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/documents"
                  className="w-full rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 active:scale-95 sm:w-auto"
                >
                  Get Started
                </Link>

                <Link
                  to="/about"
                  className="w-full rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95 sm:w-auto"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-y border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Everything you need to work together
              </h2>

              <p className="mt-4 text-gray-500">
                A simple workspace designed around collaboration, organization,
                and productivity.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white">
                  ✦
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  Real-time Collaboration
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Work together on documents and keep everyone synchronized as
                  changes happen.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white">
                  ✓
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  Organized Documents
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Create and manage your documents from one centralized
                  workspace.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white">
                  ⚡
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  Fast & Simple
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  A clean interface that keeps your workflow focused without
                  unnecessary complexity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="rounded-2xl bg-gray-900 px-6 py-16 text-center sm:px-12">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to start collaborating?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-gray-400">
                Create your first document and bring your team together in
                SyncDoc.
              </p>

              <div className="mt-8">
                <Link
                  to="/documents"
                  className="inline-flex rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-100 active:scale-95"
                >
                  Start Creating
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
