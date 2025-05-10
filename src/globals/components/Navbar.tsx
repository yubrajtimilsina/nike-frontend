import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { fetchCartItems } from "../../store/cartSlice";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const reduxToken = useAppSelector((store) => store.auth.user.token);
  const { data } = useAppSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const localToken = localStorage.getItem("tokenauth");
    const loggedIn = !!reduxToken || !!localToken;

    setIsLogin(loggedIn);

    if (loggedIn && data.length > 0) {
      dispatch(fetchCartItems()); // Only dispatch when logged in
    }
  }, [reduxToken, dispatch]); // Only depend on reduxToken and dispatch

  const handleLogout = () => {
    localStorage.removeItem("tokenauth");
    setIsLogin(false);
    setMobileMenuOpen(false);
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            Nike
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="font-medium hover:text-indigo-600">
              Home
            </Link>
            <Link to="/man" className="font-medium hover:text-indigo-600">
              Men
            </Link>
            <Link to="/women" className="font-medium hover:text-indigo-600">
              Women
            </Link>
            <Link
              to="/collections"
              className="font-medium hover:text-indigo-600"
            >
              Collections
            </Link>
            <Link to="/contact" className="font-medium hover:text-indigo-600">
              Contact
            </Link>

            <div className="ml-4">
              {isLogin ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-sm"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-sm"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 hidden sm:inline-block">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <div className="relative">
              <Link to={"/my-cart"}>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </button>
              </Link>

              {isLogin && data.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {data.length}
                </span>
              )}
            </div>

            {!isLogin && (
              <Link
                to="/login"
                className="p-2 rounded-full hover:bg-gray-100 hidden sm:inline-block"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="sr-only">Account</span>
              </Link>
            )}

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium hover:text-indigo-600 py-2"
              >
                Home
              </Link>
              <Link
                to="/man"
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium hover:text-indigo-600 py-2"
              >
                Men
              </Link>
              <Link
                to="/women"
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium hover:text-indigo-600 py-2"
              >
                Women
              </Link>
              <Link
                to="/collections"
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium hover:text-indigo-600 py-2"
              >
                Collections
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium hover:text-indigo-600 py-2"
              >
                Contact
              </Link>

              <div className="pt-2">
                {isLogin ? (
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
