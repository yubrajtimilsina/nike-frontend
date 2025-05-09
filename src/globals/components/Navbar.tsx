// components/Header.jsx
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { data, Link, useNavigate } from 'react-router-dom';
import { fetchCartItems } from '../../store/cartSlice';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const reduxToken = useAppSelector((store) => store.auth.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const localToken = localStorage.getItem('tokenauth');
      setIsLogin(!!reduxToken || !!localToken);
      if(isLogin)
        dispatch(fetchCartItems())
    };
    checkAuth();
  }, [reduxToken]);

  const handleLogout = () => {
    localStorage.removeItem('tokenauth');
    setIsLogin(false);
    setMobileMenuOpen(false);
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">Nike</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="font-medium hover:text-indigo-600">Home</Link>
            <Link to="/man" className="font-medium hover:text-indigo-600">Men</Link>
            <Link to="/women" className="font-medium hover:text-indigo-600">Women</Link>
            <Link to="/collection" className="font-medium hover:text-indigo-600">Collections</Link>
            <Link to="/contact" className="font-medium hover:text-indigo-600">Contact</Link>
            
            {/* Auth buttons - desktop */}
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="sr-only">Cart  <sup>{data.length > 0 ? data.length : 0}</sup>  </span>
            </button>
            {!isLogin && (
              <button className="p-2 rounded-full hover:bg-gray-100 hidden sm:inline-block">
                <Link to="/login">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="sr-only">Account</span>
                </Link>
              </button>
            )}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="font-medium hover:text-indigo-600 py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/men" className="font-medium hover:text-indigo-600 py-2" onClick={() => setMobileMenuOpen(false)}>Men</Link>
              <Link to="/women" className="font-medium hover:text-indigo-600 py-2" onClick={() => setMobileMenuOpen(false)}>Women</Link>
              <Link to="/collections" className="font-medium hover:text-indigo-600 py-2" onClick={() => setMobileMenuOpen(false)}>Collections</Link>
              <Link to="/contact" className="font-medium hover:text-indigo-600 py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              
              {/* Auth buttons - mobile */}
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