import { useState } from "react";
import axios from "axios"
export const Signup = () => {




    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userDate = {
        userName: name,
        userEmail: email,
        userPassword: password
    }

    function registerUser() {
        axios.post("http://localhost:3000/registerUser", userDate).then((response) => {
            console.log(response.data);
            alert("User Registered")
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="h-auto w-[320px] shadow-2xl rounded-2xl bg-white p-6 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-center text-gray-700">Sign Up</h2>

            <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Enter Your Name:</label>
                <input onChange={function (e) {
                    setName(e.target.value)
                }}
                    type="text"
                    className="border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="Your Pretty Name"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Enter Your Email:</label>
                <input onChange={function (e) {
                    setEmail(e.target.value)
                }}
                    type="email"
                    className="border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="example@email.com"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Enter Your Password:</label>
                <input onChange={function (e) {
                    setPassword(e.target.value)
                }}
                    type="texy"
                    className="border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="********"
                />
            </div>

            <button onClick={registerUser} className="w-full bg-rose-500 text-white font-semibold py-2 rounded-lg hover:bg-rose-700 transition">
                Sign Up
            </button>
        </div>
    );
};
