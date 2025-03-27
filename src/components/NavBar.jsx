import logo from "../assets/logo/logo.png"
import { Login } from "./Login";
import { LoveCard } from "./LoveCard"
import { Signup } from "./Signup";
import { BrowserRouter, Route, Router, Routes, useNavigate } from "react-router-dom"
export const NavBar = () => {
    return (
                <div className="h-screen bg-rose-50 text-gray-900 flex flex-col">
                    
                <BrowserRouter>
                <Appbar/>
                <div className="flex flex-wrap justify-center gap-6">
                <Routes>

                        <Route path="/home" element={<LoveCard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes> 
                    </div>
                </BrowserRouter>
                </div>
    );
};

function Appbar() {
    const navigate=useNavigate()
  return  <div className="flex justify-between items-center px-6 py-4 ">
        <div className="flex gap-6">
            <button onClick={function(){
                navigate("/login")
            }} className="text-xl font-medium px-5 py-2 rounded-full bg-white shadow-md 
                        hover:bg-gray-100 transition-all duration-300">
                Login
            </button>
            <button onClick={function(){
                navigate("/signup")
            }} className="text-xl font-medium px-5 py-2 rounded-full bg-white shadow-md 
                        hover:bg-gray-100 transition-all duration-300">
                Signup
            </button>
        </div>
        <div>
            <button onClick={function () {
                navigate("/home")
            }} >
                <img src={logo} className="h-[150px] mx-auto drop-shadow-md transition-all duration-300 hover:scale-105" alt="Logo" />
            </button>
        </div>
        <div className="flex gap-6">
            <button className="text-xl font-medium px-5 py-2 rounded-full bg-white shadow-md 
                        hover:bg-gray-100 transition-all duration-300">
                About Us
            </button>
            <button className="text-xl font-medium px-5 py-2 rounded-full bg-white shadow-md 
                        hover:bg-gray-100 transition-all duration-300">
                Contact
            </button>
        </div>
    </div>
}

