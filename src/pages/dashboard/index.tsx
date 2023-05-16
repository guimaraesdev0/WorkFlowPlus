import WorkstationCard from "../components/dashboard/WorkStationCard"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";



export default function DashboardPage() {
    const { status, data } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            Router.replace("/auth/login?error")
        }
    }, [status])

    return (
        <div className='flex flex-col w-screen h-screen'>
            <>
              <Head>
                <title>Workstation de {data?.user.first_name} {data?.user.last_name}</title>
              </Head>
            </>  
            <div className='flex justify-center w-screen h-72 border-b-2 border-neutral-800 '>
                <div className='flex flex-col items-center w-[30rem] p-4 space-y-3 absolute'>
                    <img className='h-28 w-28 rounded-full bg-sky-400 bg-cover' src={data?.user.image}></img>
                    <span className='font-semibold text-2xl'>{data?.user.first_name} {data?.user.last_name}</span>
                    <div className='flex space-x-3'>
                        <button className='w-36 h-10 bg-white ring-1 ring-neutral-800 bg-transparent rounded-full font-semibold hover:bg-neutral-700'>Visitar perfil</button>
                        <button className='w-36 h-10 bg-sky-400 rounded-full font-semibold'>Criar workstation</button>
                    </div>
                </div>
                <button className='ml-auto mr-4 mt-4 w-20 h-10 bg-red-500 rounded-full font-semibold'>Sair</button>
            </div>
            <div className='flex flex-wrap justify-center overflow-y-scroll h-auto max-h-none w-screen p-4 gap-4'>
                
                <WorkstationCard />
                <WorkstationCard />
                <WorkstationCard />
            </div>
        </div>
    )
}