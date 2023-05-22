import { AiOutlineCodepenCircle } from "react-icons/ai"
import Head from "next/head"
import { FormEventHandler, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { stringify } from "querystring";
import { Router, useRouter } from "next/router";

export default function Login() {
    const router = useRouter()
    const [errormsg, setError] = useState<string>();
    const [successmsg, setsucessmsg] = useState<string>();
    const [UserData, setUserData] = useState({ email: "", password: "" });
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/dashboard/")
        }
    }, [status])

    const HandleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        console.log(UserData)
        const res = await signIn("credentials", {
            email: UserData.email,
            password: UserData.password,
            redirect: false
        })
        if (res?.error) {
            setError(res?.error)
        } else {
            setsucessmsg("Logado com sucesso")
            setError("")
            router.replace("/dashboard/")
        }



    }

    return (
        <div className="flex flex-row items-center justify-center w-screen h-screen py-32 space-x-10">
            <>
                <Head>
                    <title>WorkSpace Plus - Login</title>
                </Head>
            </>
            <form onSubmit={HandleSubmit} className="flex flex-col justify-center items-center mx-auto w-80 lg:w-[35rem] lg:h-[50rem] lg:p-14 space-y-4">
                <AiOutlineCodepenCircle size={120} />
                <span className="font-bold text-5xl">Login</span>
                {errormsg && (
                    <div className="w-full h-min-14 h-auto rounded py-3 pl-4 font-semibold transition-opacity bg-red-500">
                        {errormsg}
                    </div>
                )}
                {successmsg && (
                    <div className="w-full h-min-14 h-auto rounded py-3 pl-4 font-semibold transition-opacity bg-green-500">
                        {successmsg}
                    </div>
                )}
                <div className="w-full">
                    <input type="email" placeholder="Informe o seu email" className="formInput" required
                        value={UserData.email}
                        onChange={({ target }) => setUserData({ ...UserData, email: target.value })} />
                </div>
                <div className="w-full">
                    <input type="password" placeholder="Informe sua senha" className="formInput" required
                        value={UserData.password}
                        onChange={({ target }) => setUserData({ ...UserData, password: target.value })} />
                </div>
                <button className="w-full h-12 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg shadow-lg font-bold text-lg">login</button>
                <span className="text-sm text-white">Não possui uma conta? Clique <a href="/auth/register" className="text-sky-500 hover:text-sky-600 visited:text-sky-500 underline font-bold">aqui</a></span>
            </form>
        </div>
    )
}