export const Login = () => {
    return <div className="shadow-lg p-8 rounded-2xl">
        <div className="flex justify-center text-2xl">
            <h2>Sign In</h2>
        </div>
        <div className="flex flex-col m-4">
            <label>Name :</label>
            <input placeholder="Enter Your Name" className="border-3 border-gray-700 rounded-md p-2 outline-none"></input>
        </div>
        <div className="flex flex-col m-4" >
            <label >Password :</label>
            <input placeholder="Enter Your Password" className="border-3 border-gray-700 rounded-md p-2 outline-none"></input>
        </div>
        <div className="flex justify-center mt-6 w-full bg-gray-500 hover:bg-gray-600 rounded-2xl p-2">
            <button>
                Sign In
            </button>
        </div>
    </div>
}