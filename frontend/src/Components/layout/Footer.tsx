import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Main Footer */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">

          {/* Brand */}
          <div className="max-w-sm">
            <Link
              to="/"
              className="text-xl font-semibold tracking-tight text-gray-900"
            >
              SyncDoc
            </Link>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              A simple and collaborative document platform built
              for teams to create, edit, and manage documents together.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">

            {/* Product */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Product
              </h3>

              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    to="/documents"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                  >
                    Documents
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Company
              </h3>

              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                  >
                    Contact
                  </Link>
                </li>

                <li>
                  <Link
                    to="/login"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-gray-100 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} SyncDoc. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="transition-colors hover:text-gray-900"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="transition-colors hover:text-gray-900"
            >
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer