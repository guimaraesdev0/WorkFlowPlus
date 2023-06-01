import Head from "next/head"
import { useEffect, useState } from "react"
import { UserInterface } from "@/models"
import { AiOutlineCodepenCircle } from "react-icons/ai"
import { signIn, useSession } from "next-auth/react";
import axios from "axios"
import { Router, useRouter } from "next/router";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

const createUserSchema = z.object({
    first_name: z.string()
        .min(3, "O nome deve conter no mínimo 3 dígitos")
        .nonempty("Informe seu nome"),
    last_name: z.string()
        .nonempty("Informe seu sobrenome"),
    email: z.string()
        .email("Você não pode se registrar com esse email.")
        .nonempty("Informe seu email"),
    password: z.string().min(6, "A senha deve conter no mínimo 6 dígitos.")
        .nonempty("Informe a sua senha"),
    confirm_password: z.string().min(6, "A senha deve conter no mínimo 6 dígitos.")
        .nonempty("Confirme sua senha"),
}).superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password != password) {
        ctx.addIssue({
            code: "custom",
            message: "As senhas não batem."
        })
    }
})

type createUserSchemaData = z.infer<typeof createUserSchema>

export default function Register() {
    const [UserData, setUserData] = useState({ UserFirstName: "", UserLastname: "", UserEmail: "", UserPassword: "", UserPasswordRepeat: "" })
    const [errormsg, setError] = useState();
    const { status } = useSession();
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<createUserSchemaData>({
        resolver: zodResolver(createUserSchema)
    })

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/dashboard/")
        }
        console.log(status)
    }, [status])

    async function createUser(data: any) {
        console.log(data)
        const options = {
            method: "POST",
            url: "/api/v1/users",
            headers: {
                "content-type": "application/json",
            },
            data:
            {
                "first_name": data.first_name,
                "last_name": data.last_name,
                "email": data.email,
                "password": data.password
            },
        };

        await axios
            .request(options)
            .then(async res => {
                const resLogIn = await signIn("credentials", {
                    email: data.email,
                    password: data.password,
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

            <div className="flex flex-row items-center justify-center w-screen h-screen max-h-none lg:py-32 space-x-10">
                <form onSubmit={handleSubmit(createUser)} className="flex flex-col justify-center items-center mx-auto w-80 lg:w-[35rem] lg:h-[50rem] lg:p-14 space-y-4">
                    <AiOutlineCodepenCircle size={120} />
                    <span className="font-bold text-5xl">Register</span>
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Seu nome"
                            className="formInput"
                            required
                            {...register("first_name")}
                        />
                    </div>
                    <div className="w-full">
                        <input
                            type="text"
                            required
                            placeholder="Seu sobrenome"
                            className="formInput"
                            {...register("last_name")} />
                    </div>
                    <div className="w-full">
                        <input
                            type="email"
                            placeholder="Seu email"
                            className="formInput"
                            required
                            {...register("email")}
                        />
                    </div>
                    <div className="w-full">
                        <input
                            type="password"
                            placeholder="Sua senha (Minímo 6 characteres)"
                            className="formInput"
                            required
                            {...register("password")}
                        />
                    </div>
                    <div className="w-full">
                        <input
                            type="password"
                            placeholder="Confirme senha"
                            required
                            className="formInput"
                            {...register("confirm_password")}
                        />
                    </div>
                    <div className="w-full">
                        <input type="checkbox" placeholder="Informe sua senha" className="" required id="TOS" />
                        <label htmlFor="TOS" className="ml-2">Eu li e concordo  com os <a href="TOS" className="hover:text-white hover:underline font-bold">Termos de Serviços</a> do Workflow</label>

                    </div>
                    {errors.first_name && (<span>{errors.first_name.message}</span>)}
                    {errors.last_name && (<span>{errors.last_name.message}</span>)}
                    {errors.email && (<span>{errors.email.message}</span>)}
                    {errors.password && (<span>{errors.password.message}</span>)}
                    {errormsg && (<span>{errormsg}</span>)}
                    <button className="w-full h-12 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg shadow-lg font-bold text-lg">Concluir o Cadastro</button>
                    <span className="text-sm text-white">Já possui uma conta? Clique <a href="/auth/login" className="text-sky-500 hover:text-sky-600 visited:text-sky-500 underline font-bold">aqui</a></span>
                </form>
            </div>
        </div>
    )
}