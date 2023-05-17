import { NextPage } from "next";
import { IoAlert } from "react-icons/io5";
import Router from "next/router";

const logoff: NextPage = () => {
    return (
        <div>
            <div className="flex justify-center mt-80">
                <img src="https://www.freeiconspng.com/thumbs/sign-out-icon/sign-out-logout-icon-0.png" width={100} className="rounded-full mb-2" />
            </div>
            <h1 className="font-bold text-center text-4xl">Você encerrou a sua sessão com sucesso.</h1>
            <p className=" text-center text-2xl mt-2">Você efetuou o LogOff com sucesso, Volte sempre.</p>
            <div className="flex justify-center">
                <button className="mt-4 text-center w-24 h-10 rounded bg-red-500 hover:bg-red-600 transition" onClick={() => {Router.push("http://localhost:3000")}}>Retornar</button>
            </div>
        </div>
    )
}

export default logoff