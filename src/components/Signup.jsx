import React, { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from "axios";
export default function Signup() {
  const navigate=useNavigate()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const Data = {
    userName: fullName,
    userEmail: email,
    userPassword: password
  }


  function githubAuth() {
    window.location.href = "http://codamiebackend-production.up.railway.app/auth/github";
  }

  function submit() {
    if (!Data.userName || !Data.userEmail || !Data.userPassword) {
      alert("Fill all fields")
    }
    else {
    
        axios.post("http://codamiebackend-production.up.railway.app/registerUser", Data).then((res) => {
          console.log(res)
          alert("user Registered")
        navigate("/login")
        }).then((err) => {
          console.log(err)
        })
      
    }
  }
  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 min-h-screen font-sans flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mt-10 mb-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            Codamie
          </h1>
          <p className="text-gray-600 mt-2">Create your developer dating profile</p>
        </div>

        {/* Form */}
        <div className="mb-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input onChange={function (e) {
              setFullName(e.target.value)
            }}
              type="text"
              id="firstName"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="John"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input onChange={function (e) {
            setEmail(e.target.value)
          }}
            type="email"
            id="email"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input onChange={function (e) {
            setPassword(e.target.value)
          }}
            type="password"
            id="password"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="mb-6 flex items-start">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree to the{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Privacy Policy
            </a>
          </label>
        </div>
        <div className="mb-6">
          <button onClick={submit}
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </div>


        {/* Footer */}
        <div className="text-center text-gray-600">
          <p>
            Already have an account?{" "}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <div className="px-3 text-sm text-gray-500">Or sign up with</div>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* GitHub Signup Button */}
        <div className="flex justify-center">
          <button onClick={githubAuth} className="flex items-center justify-center py-3 px-6 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors w-full">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              ></path>
            </svg>
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}