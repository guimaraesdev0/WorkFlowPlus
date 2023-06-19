import { useState, useEffect, useRef, FormEventHandler } from "react";
import DashboardNavbar from "../components/dashboard/UI/DashboardNavbar";
import { Workstation, UserInterface } from "@/models";
import api from "@/services/api.service";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import Link from "next/link";
import WorkstationCard from "../components/dashboard/WorkStationCard";
import Head from "next/head";
import axios from "axios";


interface props {
    workstation: Workstation[],
    userData: UserInterface,
    teste: string
}

export default function DashboardPage(props: props) {
    const [showModal, setShowModal] = useState<boolean>(false)
    const modalRef = useRef<HTMLDivElement>(null);
    const [workstationCode, setWorkstationCode] = useState('');
    const [successMsg, setSuccessMsg] = useState<string>()
    const [errorMsg, seterrorMsg] = useState<string>()

    const HandleSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const options = {
            method: "PATCH",
            url: "http://localhost:3000/api/v1/workstation",
            headers: {
                "content-type": "application/json",
            },
            data:
            {
                "action": "addColaborators",
                "email": props.userData.email,
                "code": workstationCode
            },
        };

        await axios
            .request(options)
            .then((success) => {
                setWorkstationCode('')
                setSuccessMsg('Você entrou no workstation com sucesso.')
                console.log(success)
            }).catch((error) => {
                seterrorMsg('Ocorreu um erro ao entrar no workstation.')
                console.log(error)
        })
    };
    

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
          ) {
            setShowModal(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    return (
        <main className="flex flex-col w-full ">
            <Head>
                <title>Dashboard | Workflow+</title>
            </Head>
            <DashboardNavbar user={props.userData} workstations={props.workstation} />
            <p className="text-3xl font-semibold mx-5 mt-3">Bem vindo, {props.userData.first_name}</p>
            <section className="flex flex-wrap w-full h-full max-h-none p-5 gap-3">
                {
                    props.workstation.map((service: Workstation) => {
                        let url = `/workstation/${service.id}`
                        return (
                            // eslint-disable-next-line react/jsx-key
                            <div>
                                <Link href={url}>
                                    <WorkstationCard workstationName={service.workstationName} workstationDesc={service.description} />
                                </Link>
                            </div>

                        )
                    })
                }
                <button onClick={() => {setShowModal(true)}} className="flex flex-col w-64 h-52 rounded ring-1 ring-neutral-800 p-3 transition ease-in-out duration-100 hover:bg-neutral-800">
                    <span className="text-white font-semibold text-lg h-10">Entrar em um Workstation</span>
                    <span className="text-zinc-300 h-32 text-sm text-left overflow-hidden ...">Entrar em um workstations usando código de convite.</span>
                </button>
            </section>

            {showModal && (
                <div className="bg-zinc-900 bg-opacity-80 w-screen h-screen flex absolute items-center justify-center">
                    <div ref={modalRef} className="flex flex-col p-4 pt-12 space-y-5 items-center w-[30rem] h-96 bg-zinc-800 rounded-lg">
                        <p className="text-4xl font-bold text-center">Entrar em um Workstation</p>
                        {successMsg && (<span className="h-10 pt-2 w-full rounded bg-green-500">{successMsg}</span>)}
                        {errorMsg && (<span className="h-10 pt-2 w-full rounded bg-red-500">{errorMsg}</span>)}
                        <form onSubmit={HandleSubmit} className=" w-full">
                        <input value={workstationCode} onChange={(e) => { setWorkstationCode(e.target.value)}} type="text" className="block h-12 w-full rounded bg-zinc-700 pl-3 ring-1 ring-zinc-600" placeholder="Insira código de Workstation" />
                        <input
                            type="submit"
                            className=" mt-7 text-center self-end cursor-pointer bg-zinc-700 w-40 h-10 rounded font-semibold text-white transition hover:bg-zinc-700 hover:ring-1 hover:ring-zinc-600"
                        />
                        </form>
                    </div>
                </div>
            )}
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
