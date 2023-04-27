import { NextPage } from "next";
import { IoAlert } from "react-icons/io5";
import Router from "next/router";

const unverified: NextPage = () => {
    return (
        <div>
            <div className="flex justify-center mt-80">
                <img src="https://i.pinimg.com/280x280_RS/4b/2d/28/4b2d28ebea703bd47742857bac5f7ef2.jpg" width={100} className="rounded-full mb-2" />
            </div>
            <h1 className="font-bold text-center text-5xl">Não autorizado!</h1>
            <p className=" text-center text-3xl mt-2">Sua conta ainda não foi verificada e aceita por um superior.</p>
            <div className="flex justify-center">
                <button className="mt-4 text-center w-24 h-10 rounded bg-sky-500 hover:bg-sky-600 transition" onClick={() => {Router.push("http://localhost:3000")}}>Retornar</button>
            </div>
        </div>
    )
}

export default unverified