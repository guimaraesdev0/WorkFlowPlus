import { AiOutlineCodepenCircle } from "react-icons/ai"
import Head from "next/head"
import { FormEventHandler, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { stringify } from "querystring";
import { Router, useRouter } from "next/router";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signInWithCredentialsSchema = z.object({
    email: z.string()
    .email("Precisa ser um email"),
    password: z.string()
    .min(6, "A senha deve conter no mínimo seis caracteres")
})

type signInWithCredentialsSchemaData = z.infer<typeof signInWithCredentialsSchema>

export default function Login() {
    const router = useRouter()
    const [errormsg, setError] = useState<string>()
    const [successmsg, setsucessmsg] = useState<string>()
    const { status } = useSession();
    const { register, handleSubmit, formState: { errors } } = useForm<signInWithCredentialsSchemaData>({
        resolver: zodResolver(signInWithCredentialsSchema)
    })

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/dashboard/")
        }
    }, [status])

    async function signInWithCredentials(data: any) {
        console.log(data)
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
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
            <form onSubmit={handleSubmit(signInWithCredentials)} className="flex flex-col justify-center items-center mx-auto w-80 lg:w-[35rem] lg:h-[50rem] lg:p-14 space-y-4">
                <AiOutlineCodepenCircle size={120} />
                <span className="font-bold text-5xl">Login</span>
                <div className="w-full">
                    <input type="email" placeholder="Informe o seu email" className="formInput" required
                        {...register("email")}/>
                </div>
                <div className="w-full">
                    <input type="password" placeholder="Informe sua senha" className="formInput" required
                        {...register("password")} />
                </div>
                {errors.email && (<span>{errors.email.message}</span>)}
                {errors.password && (<span>{errors.password.message}</span>)}
                {errormsg && (<span>{errormsg}</span>)}
                <button type="submit" className="w-full h-12 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg shadow-lg font-bold text-lg">login</button>
                <span className="text-sm text-white">Não possui uma conta? Clique <a href="/auth/register" className="text-sky-500 hover:text-sky-600 visited:text-sky-500 underline font-bold">aqui</a></span>
            </form>
        </div>
    )
}