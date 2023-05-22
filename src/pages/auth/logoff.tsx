import { NextPage } from "next";
import { IoAlert } from "react-icons/io5";
import Router from "next/router";

const logoff: NextPage = () => {
    return (
        <div>
            <div className="flex justify-center mt-80 text-8xl mb-10">
                <p>👋</p>
            </div>
            <h1 className="font-bold text-center text-4xl">Você encerrou a sua sessão com sucesso.</h1>
            <p className=" text-center text-2xl mt-2">Você encerrou a sua sessão no WorkFlow+ com sucesso, volte sempre.</p>
            <div className="flex justify-center">
                <button className="mt-4 text-center w-24 h-10 rounded bg-gray-500 hover:bg-gray-600 transition" onClick={() => {Router.push("http://localhost:3000")}}>Retornar</button>
            </div>
        </div>
    )
}

export default logoff