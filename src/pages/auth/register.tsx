import Head from "next/head"
import { FormEventHandler, useEffect, useState } from "react"
import { UserInterface } from "@/models"
import { AiOutlineCodepenCircle } from "react-icons/ai"
import { signIn, useSession } from "next-auth/react";
import axios from "axios"
import { toast } from "react-toastify"
import { Router, useRouter } from "next/router";
import LandpageNavbar from "../components/NavBar/LandpageNavbar";


export default function Register() {


    const [UserData, setUserData] = useState({ UserFirstName: "", UserLastname: "", UserEmail: "", UserPassword: "", UserPasswordRepeat: "" })
    const [errormsg, setError] = useState();
    const { status } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/dashboard/")
        }
    }, [status])


    const HandleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const options = {
            method: "POST",
            url: "/api/v1/users",
            headers: {
                "content-type": "application/json",
            },
            data:
            {
                "first_name": UserData.UserFirstName,
                "last_name": UserData.UserLastname,
                "email": UserData.UserEmail,
                "password": UserData.UserPassword
            },
        };

        await axios
            .request(options)
            .then(async res => {
                const resLogIn = await signIn("credentials", {
                    email: UserData.UserEmail,
                    password: UserData.UserPassword,
                    redirect: false
                })
                console.log(resLogIn)
            }).catch((err) => {
                setError(err.response.data.error)
            })
    }
    return (
            <div>
            <>
                <Head>
                    <title>WorkSpace Plus - Registro</title>
                </Head>
            </>
            
        <div className="flex flex-row items-center justify-center w-screen h-screen lg:py-32 space-x-10">
            <form onSubmit={HandleSubmit} className="flex flex-col justify-center items-center mx-auto w-80 lg:w-[35rem] lg:h-[50rem] lg:p-14 space-y-4">
                <AiOutlineCodepenCircle size={120} />
                <span className="font-bold text-5xl">Register</span>
                {/*                 <div className=" w-full h-min-14 h-auto  rounded py-3 pl-4 font-semibold bg-green-500">Mensagem de sucesso mensagem de sucesso mensagem de sucesso</div>
 */}

                {errormsg && (
                    <div className="w-full h-min-14 h-auto rounded py-3 pl-4 font-semibold transition-opacity bg-red-500 ">
                        {errormsg}
                    </div>
                )}


                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Seu nome"
                        className="formInput"
                        required
                        value={UserData.UserFirstName}
                        onChange={({ target }) => setUserData({ ...UserData, UserFirstName: target.value })}
                    />
                </div>
                <div className="w-full">
                    <input
                        type="text"
                        required
                        placeholder="Seu sobrenome"
                        className="formInput"
                        onChange={({ target }) => setUserData({ ...UserData, UserLastname: target.value })}
                    />
                </div>
                <div className="w-full">
                    <input
                        type="email"
                        placeholder="Seu email"
                        className="formInput"
                        required
                        value={UserData.UserEmail}
                        onChange={({ target }) => setUserData({ ...UserData, UserEmail: target.value })}
                    />
                </div>
                <div className="w-full">
                    <input
                        type="password"
                        placeholder="Sua senha (Minímo 6 characteres)"
                        className="formInput"
                        required
                        value={UserData.UserPassword}
                        onChange={({ target }) => setUserData({ ...UserData, UserPassword: target.value })}
                    />
                </div>
                <div className="w-full">
                    <input
                        type="password"
                        placeholder="Confirme senha"
                        required
                        className="formInput"
                        value={UserData.UserPasswordRepeat}
                        onChange={({ target }) => setUserData({ ...UserData, UserPasswordRepeat: target.value })}
                    />
                </div>
                <div className="w-full">
                    <input type="checkbox" placeholder="Informe sua senha" className="" required id="TOS"/>
                    <label htmlFor="TOS" className="ml-2">Eu li e concordo  com os <a href="TOS" className="hover:text-white hover:underline font-bold">Termos de Serviços</a> do Workflow</label>

                </div>
                <button className="w-full h-12 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg shadow-lg font-bold text-lg">Concluir o Cadastro</button>
                <span className="text-sm text-white">Já possui uma conta? Clique <a href="/auth/login" className="text-sky-500 hover:text-sky-600 visited:text-sky-500 underline font-bold">aqui</a></span>
            </form>
        </div>
        </div>
    )
}

