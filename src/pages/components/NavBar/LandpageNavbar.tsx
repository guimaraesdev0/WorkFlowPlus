export default function LandpageNavbar() {
    return (
        <div className="flex font-semibold text-lg items-center justify-around w-full h-20">
            <span className="font-bold text-3xl">WorkFlow+</span>
            <div className="flex space-x-5">
                <button className="w-24 h-10 font-semibold text-base ring-1 ring-inset ring-white rounded ring-opacity-70">
                    Login
                </button>
                <button className="w-32 h-10 font-semibold text-base rounded ring-cyan-500 bg-sky-500 ">Register</button>
            </div>
        </div>
    )
}