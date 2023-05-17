import WorkstationCard from "../components/dashboard/WorkStationCard"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { Workstation, UserInterface } from "@/models";
import api from "@/services/api.service";
import NextAuth, { getServerSession } from "next-auth/next";
import { authOptions } from '../api/auth/[...nextauth]'
import { workstation } from "@/services/workstations.service";
import { signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import { NextApiRequest, NextApiResponse } from "next";



interface props {
    workstation: Workstation[],
    userData: UserInterface,
    teste: string
}

export default function DashboardPage(Props: props) {

    const { status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            Router.replace("/auth/login?error")
        }
    }, [status])
    console.log(Props.workstation)

    return (
        
        <div className='flex flex-col w-screen h-screen'>
            <>
                <Head>
                    <title>Workflow+</title>
                </Head>
            </>
            <div className='flex justify-center w-screen h-72 border-b-2 border-neutral-800 '>
                <div className='flex flex-col items-center w-[30rem] p-4 space-y-3 absolute'>
                    <img className='h-28 w-28 rounded-full bg-sky-400 bg-cover' src={Props?.userData.image}></img>
                    <span className='font-semibold text-2xl'>{Props?.userData.first_name} {Props?.userData.last_name}</span>
                    <div className='flex space-x-3'>
                        <button className='w-36 h-10 bg-white ring-1 ring-neutral-800 bg-transparent rounded-full font-semibold hover:bg-neutral-700'>Visitar perfil</button>
                        <button className='w-36 h-10 bg-sky-400 rounded-full font-semibold'>Criar workstation</button>
                    </div>
                </div>
                <button className='ml-auto mr-4 mt-4 w-20 h-10 bg-red-500 rounded-full font-semibold' onClick={() => signOut()}>Sair</button>
            </div>
            <div className='flex flex-wrap justify-center overflow-y-scroll h-auto max-h-none w-screen p-4 gap-4'>
                {
                    Props.workstation.map((service: Workstation) => {
                        return (
                            <div>
                            <WorkstationCard  />
                            <h1>{service.id}</h1>    
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}

export async function getServerSideProps(context:any) {
    const session = await getServerSession(context.req, context.res, authOptions)
    if (!session) {
        context.res.setHeader('Location', '/auth/logoff')
        context.res.statusCode = 302
        context.res.end()
        return { props: {} }
    }

    const workstationData = await api.get(`/workstation?action=getAllWorkstationUserByEmail&email=${session?.user.email}`)
    const array = workstationData.data as Workstation
    console.log(array)
    return {
        props: {
            workstation: array,
            userData: session?.user
        },
    };
}