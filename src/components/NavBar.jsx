import logo from "../assets/logo/logo.png"
import { LoveCard } from "./LoveCard"


export const NavBar = () => {
    return <div className="h-screen">
        <div className="flex justify-between">
            <div className="m-3 p-2" >
                <button className="text-2xl font-bold m-2  ">Login</button>
                <button className="text-2xl font-bold m-2  ">Signup</button>
            </div>
            <div>
                <button>
                    <img src={logo} className="h-[300px] ml-4 "></img>
                </button>
            </div>
            <div className="m-3 p-2">
                <button className="text-2xl font-bold m-2 ">About Us</button>
                <button className="text-2xl font-bold m-2  ">Contact</button>
            </div>
        </div>

        <div className="flex">
            <LoveCard />
            <LoveCard />
            <LoveCard />
            <LoveCard />
        </div>

    </div>
}