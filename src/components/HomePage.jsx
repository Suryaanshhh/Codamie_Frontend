import { Login } from "./Login"

export const HomePage = () => {
    return <div className="h-screen bg-[#FFB6C1] ">
        <div className="flex justify-between">
            <div>
                <div className="text-4xl font-bold text-gray-600">
                    CODAMIE
                </div>
                <div className="font-semibold text-gray-600">
                    Find Your Coding Partner
                </div>
            </div>

            <div>
                <button className="font-semibold text-gray-600 m-2 cursor-pointer">Home</button>
                <button className="font-semibold text-gray-600 m-2 cursor-pointer">About</button>
                <button className="font-semibold text-gray-600 m-2 cursor-pointer">Contact Us</button>
            </div>

            <div className >
                <button className="font-semibold text-gray-600 m-2 cursor-pointer">Login</button>
                <button className="font-semibold text-gray-600 m-2 cursor-pointer">Signup</button>
            </div>
        </div>

        <div className="flex justify-center mt-30 ml-8">
            <Login />
        </div>

    </div>

}