import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userDetails = {
    userEmail: email,
    userPassword: password
  };

  function userLogin() {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    axios.post("http://localhost:3000/loginUser", userDetails)
      .then((response) => {
        const jwt = response.data.jsonWebToken;
        localStorage.setItem("Token", jwt);
        
        // Show success animation
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.response?.data?.message || "Login failed. Please check your credentials.");
      });
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Top banner with hearts */}
        <div className="bg-gradient-to-r from-rose-400 to-pink-500 h-16 flex items-center justify-center relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-white opacity-70"></div>
            ))}
          </div>
          <h1 className="text-white font-bold text-2xl">Welcome Back</h1>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to Your Account</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Email Address</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-rose-500 focus:border-rose-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-lg shadow-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Password</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-rose-500 focus:border-rose-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-lg shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a href="#" className="font-medium text-rose-600 hover:text-rose-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={userLogin}
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all duration-300 relative ${loading ? 'bg-rose-400 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div>
              <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
                GitHub
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 bg-gray-50 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button 
              onClick={() => navigate("/signup")}
              className="font-medium text-rose-600 hover:text-rose-500 transition-colors focus:outline-none"
            >
              Sign up now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};