import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in localStorage when component mounts
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(token !== null);
    };

    // Initial check
    checkLoginStatus();

    // Listen for storage events
    window.addEventListener('storage', checkLoginStatus);

    // Create a custom event listener for local changes
    window.addEventListener('localStorageChange', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('localStorageChange', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);

    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event('localStorageChange'));

    navigate("/login");
  };


  const handleHomePage = () => { 

    navigate("/home");
  };


  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span onClick={function(){
            navigate('/')
          }} className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent cursor-pointer">Codamie</span>
        </div>

        <div className="hidden md:flex space-x-8">
          <span onClick={() => navigate('/how-it-works')} className="font-medium text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">How It Works</span>
          <span onClick={() => navigate('/story')} className="font-medium text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">Success Stories</span>
          <span onClick={() => navigate('/blogs')} className="font-medium text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">Blog</span>
        </div>

        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
            >
              Logout
            </button>
            <button
            onClick={handleHomePage}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            CodmaieVerse
          </button>
          </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}