import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Header from './Header';
import HeroSection from './HeroSection';
import Footer from './Footer';
import { AboutUs } from './AboutUs';
import ContactUs from "../components/Contact"
import { Features } from './Features';
import { FAQ } from './Faq';
const Blog = React.lazy(() => import('./Blog'));
import Signup from './Signup';
import Login from './Login';
import UserProfile from './UserProfile';
import HomePage from './HomePage';
import SuccessStories from './SuccessStory';
import HowItWorks from './HowItWorks';

export default function Codamie() {
    return (
        <div className="bg-white text-gray-800 min-h-screen font-sans ">
            <BrowserRouter>
                <Header />
                <div className='mt-15'>
                    <Routes>
                        <Route path='/' element={<HeroSection />} />
                        <Route path='/about' element={<AboutUs />} />
                        <Route path='/contact' element={<ContactUs />} />
                        <Route path='/features' element={<Features />} />
                        <Route path='/faq' element={<FAQ />} />
                        <Route path='/blogs' element={<Blog />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/createProfile' element={<UserProfile />} />
                        <Route path='/home' element={<HomePage />} />
                        <Route path='/story' element={<SuccessStories/>} />
                        <Route path='/how-it-works' element={<HowItWorks />} />
                        {/* Catch-all route for undefined paths */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
}