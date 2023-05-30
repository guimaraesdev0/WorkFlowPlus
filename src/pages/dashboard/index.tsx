import DashboardNavbar from "../components/dashboard/UI/DashboardNavbar";
import { Workstation, UserInterface } from "@/models";
import api from "@/services/api.service";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import Link from "next/link";
import WorkstationCard from "../components/dashboard/WorkStationCard";
import Head from "next/head";
import {IoMdAddCircle} from "react-icons/io"

interface props {
    workstation: Workstation[],
    userData: UserInterface,
    teste: string
}

export default function DashboardPage(props: props) {
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
                <button className="flex flex-col w-64 h-52 rounded ring-1 ring-neutral-800 p-3 transition ease-in-out duration-100 hover:bg-neutral-800">
                    <span className="text-white font-semibold text-lg h-10">Entrar em um Workstation</span>
                    <span className="text-zinc-300 h-32 text-sm text-left overflow-hidden ...">Entrar em um workstations usando código de convite.</span>
                </button>
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
