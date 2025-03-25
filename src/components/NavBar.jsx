import logo from "../assets/logo/logo.png"
import { LoveCard } from "./LoveCard"


export const NavBar = () => {
    return (
        <div className="h-screen bg-rose-50 text-gray-900 flex flex-col">
            {/* Navbar */}
            <div className="flex justify-between items-center px-6 py-4 ">
                <div className="flex gap-6">
                    <button className="text-xl font-medium px-5 py-2 rounded-full bg-white shadow-md 
                        hover:bg-gray-100 transition-all duration-300">
                        Login
                    </button>
                    <button className="text-xl font-medium px-5 py-2 rounded-full bg-white shadow-md 
                        hover:bg-gray-100 transition-all duration-300">
                        Signup
                    </button>
                </div>
                <div>
                    <button>
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

            {/* Love Cards Section */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
                <LoveCard fileName="Love.js" importStatement='import heart from "Me"'
                    comment1={"// Use const only"}
                    comment2={"// As love is constant"}
                    codeLine1={"const Love = You ;"}
                    codeLine2={"heart.push(Love);"}
                    codeLine3={"heart.push(Affection);"}
                    codeLine4={"heart.push(care);"}
                    returnLine={"return heart ;"}
                />
                <LoveCard fileName="Us.js" importStatement='import bond from "Heart"'
                    comment1={"// Defined once only"}
                    comment2={"// As we are one"}
                    codeLine1={"const Us = You + Me;"}
                    codeLine2={"bond.push(Us);"}
                    codeLine3={"bond.push(Memories);"}
                    codeLine4={"bond.push(Moments);"}
                    returnLine={"return bond;"}
                />
                <LoveCard fileName="Together.js" importStatement='import time from "Life"'
                    comment1={"// Loop runs always"}
                    comment2={"// As love never ends"}
                    codeLine1={"const Together = Forever;"}
                    codeLine2={"time.push(Together);"}
                    codeLine3={"time.push(Laughter);"}
                    codeLine4={"time.push(Happiness);"}
                    returnLine={"return time;"}
                />
                <LoveCard fileName="Soul.js" importStatement='import destiny from "Fate"'
                    comment1={"// Matched once only"}
                    comment2={"// As we belong"}
                    codeLine1={"const Soul = You & Me;"}
                    codeLine2={"destiny.push(Soul);"}
                    codeLine3={"destiny.push(Heartbeat);"}
                    codeLine4={"destiny.push(Energy);"}
                    returnLine={"return destiny;"}
                />
            </div>
            <div className=" font-extrabold flex justify-center">
                <span className="p-1 text-rose-500">Made</span><span className="p-1">with</span><span className="p-1 text-rose-500">Love</span><span className="p-1">by</span><span className="p-1 text-rose-500">Suryansh ❤️</span>
            </div>

        </div>
    );
};
