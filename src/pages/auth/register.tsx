import Head from 'next/head'
import { FormEventHandler, useState } from 'react'
import { UserInterface } from '@/models'
import { AiOutlineCodepenCircle } from 'react-icons/ai'
import { signIn } from "next-auth/react";
import axios from 'axios'
import { toast } from 'react-toastify'


export default function Register() {


    const [UserData, setUserData] = useState({ UserFirstName: "", UserLastname: "", UserEmail: "", UserPassword: "", UserPasswordRepeat: "" })
    const [errormsg, setError] = useState();

    const HandleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const options = {
            method: 'POST',
            url: '/api/v1/users',
            headers: {
                'content-type': 'application/json',
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
                const resLogIn = await signIn('credentials', {
                    email: UserData.UserEmail,
                    password: UserData.UserPassword,
                    redirect: false
                })
                console.log(resLogIn)
            }).catch((err) => {
                setError(err.response.data.Error)
            })



    }
    return (
        <div className='flex flex-row items-center justify-center w-screen h-screen py-32 space-x-10'>
            <>
                <Head>
                    <title>WorkSpace Plus - Registro</title>
                </Head>
            </>
            <div>
                <img src='/auth.svg' className='sm:w-[38rem] ' />
            </div>
            <form onSubmit={HandleSubmit} className="flex flex-col justify-center items-center w-[35rem] h-[50rem] p-14 space-y-4">
                <AiOutlineCodepenCircle size={120} />
                <span className='font-bold text-5xl'>Register</span>
                {/*                 <div className=' w-full h-min-14 h-auto  rounded py-3 pl-4 font-semibold bg-green-500'>Mensagem de sucesso mensagem de sucesso mensagem de sucesso</div>
 */}

                {errormsg && (
                    <div className='w-full h-min-14 h-auto rounded py-3 pl-4 font-semibold transition-opacity bg-red-500 '>
                        {errormsg}
                    </div>
                )}


                <div className='w-full'>
                    <input
                        type='text'
                        placeholder='Nome'
                        className='formInput'
                        value={UserData.UserFirstName}
                        onChange={({ target }) => setUserData({ ...UserData, UserFirstName: target.value })}
                    />
                </div>
                <div className='w-full'>
                    <input
                        type='text'

                        placeholder='Sobrenome'
                        className='formInput'
                        onChange={({ target }) => setUserData({ ...UserData, UserLastname: target.value })}
                    />
                </div>
                <div className='w-full'>
                    <input
                        type='email'
                        placeholder='email'
                        className='formInput'

                        value={UserData.UserEmail}
                        onChange={({ target }) => setUserData({ ...UserData, UserEmail: target.value })}
                    />
                </div>
                <div className='w-full'>
                    <input
                        type='password'
                        placeholder='Senha'
                        className='formInput'

                        value={UserData.UserPassword}
                        onChange={({ target }) => setUserData({ ...UserData, UserPassword: target.value })}
                    />
                </div>
                <div className='w-full'>
                    <input
                        type='password'
                        placeholder='Confirme senha'

                        className='formInput'
                        value={UserData.UserPasswordRepeat}
                        onChange={({ target }) => setUserData({ ...UserData, UserPasswordRepeat: target.value })}
                    />
                </div>
                <button className='w-full h-12 bg-gradient-to-r from-sky-400 to-sky-500 rounded-lg shadow-lg font-bold text-lg'>register</button>
                <span className='text-sm text-zinc-600'>Já possui uma conta? Clique <a href='/auth/login' className='text-sky-500 hover:text-sky-600 visited:text-sky-500'>aqui</a></span>
            </form>
        </div>
    )
}

