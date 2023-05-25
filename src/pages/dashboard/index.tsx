import DashboardNavbar from "../components/dashboard/UI/DashboardNavbar";
import { Workstation, UserInterface } from "@/models";
import api from "@/services/api.service";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import Link from "next/link";
import WorkstationCard from "../components/dashboard/WorkStationCard";

interface props {
    workstation: Workstation[],
    userData: UserInterface,
    teste: string
}

export default function DashboardPage(props: props) {
    return (
        <main className="flex flex-col w-full ">
            <DashboardNavbar user={props.userData} workstations={props.workstation} />
            <p className="text-3xl font-semibold mx-5 mt-3">Bem vindo, {props.userData.first_name}</p>
            <section className="flex flex-wrap w-full h-full max-h-none p-5 gap-3">
            {
                props.workstation.map((service: Workstation) => {
                    let url = `/workstation/${service.id}`
                    return (
                        <div>
                            <Link href={url}>
                                <WorkstationCard />
                            </Link>
                        </div>

                    )
                })
            }
            </section>
        </main>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getServerSession(context.req, context.res, authOptions)
    if (!session) {
        context.res.setHeader('Location', '/auth/logoff')
        context.res.statusCode = 302
        context.res.end()
        return { props: {} }
    }

    const workstationData = await api.get(`/workstation?action=getAllWorkstationUserByEmail&email=${session?.user.email}`)
    const array = workstationData.data as Workstation
    return {
        props: {
            workstation: array,
            userData: session?.user
        },
    };
}

// import WorkstationCard from "../components/dashboard/WorkStationCard"
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";
// import Router from "next/router";
// import Head from "next/head";
// import { Workstation, UserInterface } from "@/models";
// import api from "@/services/api.service";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from '../api/auth/[...nextauth]'
// import { signOut } from "next-auth/react"
// import Link from "next/link";
// import LandpageNavbar from "../components/NavBar/LandpageNavbar";



// interface props {
//     workstation: Workstation[],
//     userData: UserInterface,
//     teste: string
// }

// export default function DashboardPage(Props: props) {

//     const { status } = useSession();

//     useEffect(() => {
//         if (status === "unauthenticated") {
//             Router.replace("/auth/login?error")
//         }
//     }, [status])

//     return (

//         <div className='flex flex-col w-screen h-screen'>
//             <>
//                 <Head>
//                     <title>Dashboard WorkFlow+</title>
//                 </Head>
//             </>
//             <div className='flex justify-center w-screen h-72 border-b-2 border-neutral-800 '>
//                 <div className='flex flex-col items-center w-[30rem] p-4 space-y-3 absolute'>
//                     <img className='h-28 w-28 rounded-full bg-sky-400 bg-cover' src={Props?.userData.image}></img>
//                     <span className='font-semibold text-2xl'>{Props?.userData.first_name} {Props?.userData.last_name}</span>
//                     <div className='flex space-x-3'>
//                         <button className='w-36 h-10 bg-white ring-1 ring-neutral-800 bg-transparent rounded-full font-semibold hover:bg-neutral-700'>Visitar perfil</button>
//                         <button className='w-36 h-10 bg-sky-400 rounded-full font-semibold'>Criar workstation</button>
//                     </div>
//                 </div>
//                 <button className='ml-auto mr-4 mt-4 w-20 h-10 bg-red-500 rounded-full font-semibold' onClick={() => signOut()}>Sair</button>
//             </div>
//             <div className='flex flex-wrap justify-center overflow-y-scroll h-auto max-h-none w-screen p-4 gap-4'>
//                 {
//                     Props.workstation.map((service: Workstation) => {
//                         let url = `/workstation/${service.id}`
//                         return (
//                             <div>
//                                 <Link href={url}>
//                                     <WorkstationCard />
//                                 </Link>
//                             </div>

//                         )
//                     })
//                 }
//             </div>
//         </div>
//     )
// }

// export async function getServerSideProps(context: any) {
//     const session = await getServerSession(context.req, context.res, authOptions)
//     if (!session) {
//         context.res.setHeader('Location', '/auth/logoff')
//         context.res.statusCode = 302
//         context.res.end()
//         return { props: {} }
//     }
//     console.log(session.user)

//     const workstationData = await api.get(`/workstation?action=getAllWorkstationUserByEmail&email=${session?.user.email}`)
//     const array = workstationData.data as Workstation
//     return {
//         props: {
//             workstation: array,
//             userData: session?.user
//         },
//     };
// }