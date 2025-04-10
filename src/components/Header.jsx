import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function Header(){
    return(
        <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Codamie</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#" className="font-medium text-gray-600 hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#" className="font-medium text-gray-600 hover:text-indigo-600 transition-colors">Success Stories</a>
            <a href="/blogs" className="font-medium text-gray-600 hover:text-indigo-600 transition-colors">Blog</a>
          </div>
          
          <div className="flex space-x-4">
            <button className="px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">Log in</button>
            <button className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">Sign up</button>
          </div>
        </div>
      </header>
    )
}