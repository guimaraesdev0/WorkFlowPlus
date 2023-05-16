import Link from "next/link";

export default function LandpageNavbar() {
    return (
        <div className="flex font-semibold text-lg items-center justify-between px-3 sm:px-6 lg:justify-around w-full h-20">
            <span className="font-bold text-lg sm:text-2xl lg:text-3xl">WorkFlow+</span>
            <div className="space-x-5 hidden sm:flex">
                <Link href="/auth/login" className="flex items-center justify-center w-24 h-10 font-semibold text-base ring-1 ring-inset ring-white ring-opacity-30 rounded transition ease-in-out hover:bg-neutral-600 hover:bg-opacity-50 hover:text-white">
                    Login
                </Link>
                <Link href="/auth/register" className="flex items-center justify-center w-32 h-10 font-semibold text-base rounded ring-cyan-500 bg-sky-500 transition-all hover:scale-105 hover:text-white">Register</Link>
            </div>
        </div>
    )
}