import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './Header';
import HeroSection from './HeroSection';
import Footer from './Footer';
import { AboutUs } from './AboutUs';
import { Contact } from './Contact';

export default function Codamie() {


    return (
        <div className="bg-white text-gray-800 min-h-screen font-sans">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<HeroSection />} />
                    <Route path='/about' element={<AboutUs />} />
                    <Route path='/contact' element={<Contact/>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}