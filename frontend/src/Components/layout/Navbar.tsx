import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div>
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight text-gray-900"
          >
            SyncDoc
          </Link>
        </div>

        {/* Navigation Links */}
        <div>
          <ul className="flex items-center gap-8">
            <li>
              <Link
                to="/"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Contact
              </Link>
            </li>

            <li>
              <Link
                to="/documents"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Documents
              </Link>
            </li>
          </ul>
        </div>

        {/* Login */}
        <div>
          <Link
            to="/loginx"
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-gray-800 active:scale-95"
          >
            Login
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar