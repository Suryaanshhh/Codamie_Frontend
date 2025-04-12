import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './Header';
import HeroSection from './HeroSection';
import Footer from './Footer';
import { AboutUs } from './AboutUs';
import ContactUs from "../components/Contact"
import { Features } from './Features';
import { FAQ } from './Faq';
import Blog from './Blog';
import Signup from './Signup';
import Login from './Login';
import UserProfile from './UserProfile';

export default function Codamie() {


    return (
        <div className="bg-white text-gray-800 min-h-screen font-sans ">
            <BrowserRouter>
                <Header />
           <div className='mt-15'>
                <Routes>
                    <Route path='/' element={<HeroSection />} />
                    <Route path='/about' element={<AboutUs />} />
                    <Route path='/contact' element={<ContactUs/>} />
                    <Route path='/features' element={<Features/>}/>
                    <Route path='/faq' element={<FAQ/>}/>
                    <Route path='/blogs' element={<Blog/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/createProfile' element={<UserProfile/>} />
                 </Routes>
           </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
}