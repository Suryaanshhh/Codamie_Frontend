import { useState } from "react";
import axios from "axios";

export const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const userDetails = {
    userEmail: email,
    userPassword: password
  }

 function userLogin() {
    axios.post("http://localhost:3000/loginUser", userDetails).then((response) => {
      console.log(response)
      alert("UserLogged In")
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="h-auto w-[320px] shadow-2xl rounded-2xl bg-white p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>

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
          type="password"
          className="border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-rose-400"
          placeholder="********"
        />
      </div>

      <button onClick={userLogin} className="w-full bg-rose-500 text-white font-semibold py-2 rounded-lg hover:bg-rose-600 transition">
        Login
      </button>

      <p className="text-center text-gray-600 text-sm">
        Don't have an account? <span className="text-rose-500 cursor-pointer hover:underline">Sign Up</span>
      </p>
    </div>
  );
};
