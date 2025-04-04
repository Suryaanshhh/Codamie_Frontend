import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { LoveCard } from "./LoveCard";
import { AboutUs } from "./AboutUs";
import { Contact } from "./Contact";
import { UserProfile } from "./UserProfile";


export const NavBar = () => {
  return (
    <div className="min-h-screen bg-rose-50 text-gray-900 flex flex-col">
      <BrowserRouter>
        <Appbar />
        <div className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<LoveCard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/userProfile" element={<UserProfile/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

function Appbar() {
  const navigate = useNavigate();
  
  return (
    <div className="sticky top-0 bg-rose-50/80 backdrop-blur-sm z-10 border-b border-rose-100 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <div className="flex gap-3">
          <NavButton onClick={() => navigate("/login")}>Login</NavButton>
          <NavButton onClick={() => navigate("/signup")}>Signup</NavButton>
        </div>
        
        <button 
          onClick={() => navigate("/")}
          className="transition-transform duration-300 hover:scale-105 focus:outline-none"
        >
          <img src={logo} className="h-20 drop-shadow-md" alt="Logo" />
        </button>
        
        <div className="flex gap-3">
          <NavButton onClick={() => navigate("/about")}>About Us</NavButton>
          <NavButton onClick={() => navigate("/contact")}>Contact</NavButton>
        </div>
      </div>
    </div>
  );
}

function NavButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-lg font-medium px-4 py-2 rounded-full bg-white shadow-md
        hover:bg-gray-100 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
    >
      {children}
    </button>
  );
}