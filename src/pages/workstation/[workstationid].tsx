//Modules React/Next etc.
import { GetServerSideProps, NextPage, NextPageContext } from "next";
import dynamic from "next/dynamic";
const WinBox = dynamic(() => import("react-winbox"), { ssr: false });
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { BiHomeAlt2 } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa"
import { RiSuitcaseLine } from "react-icons/ri";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoSettingsOutline, IoGitPullRequest } from "react-icons/io5"
import { ServiceInterface, UserInterface, Workstation } from "@/models";
import ServiceList from "../components/ServiceList";
import api from "@/services/api.service";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

interface Props {
    services: ServiceInterface[];
    totalPages: number;
    workstationData: Workstation;
    userData: UserInterface,
}


const Home: NextPage<Props> = ({ services, totalPages, userData }: Props) => {
    const { status, data } = useSession();
    const router = useRouter()
    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/auth/login?error")
        }
    }, [status])
    const workstationid = router.query.workstationid as string;
    /* useState do WinboxJs */
    /* Variaveis de janelas WinBox */
    const [OpenOsWindow, setOpenOsWindow] = useState(false)
    const [OpenCreaditsWindow, setOpenCreaditsWindow] = useState(false)
    const [OpenConfigWindow, setOpenConfigWindow] = useState(false)
    const [OpenMemberList, setMemberList] = useState(false)
    const [WinboxColor, setWinboxColor] = useState<string>()
    /* Configurações do workstation */
    const [backgroundTheme, setbackgroundTheme] = useState("bg-gradient-to-bl from-slate-800 via-slate-900 to-slate-900")

    return (
        <div className={"flex antialised " + backgroundTheme + " transition"}>
            <>
                <Head>e
                    <title>Workstation</title>
                </Head>
            </>
            <div>
                <div className="flex flex-col space-y-1 items-center w-16 h-screen bg-zinc-900 bg-opacity-90 shadow-2xl py-1 z-50">
                    <div className="navItem">
                        <BiHomeAlt2 size={36} className="text-white" />
                    </div>
                    <button onClick={() => { setOpenOsWindow(!OpenOsWindow) }} className={OpenOsWindow ? "navItemActive" : "navItem"}>
                        <RiSuitcaseLine size={36} className="text-white" />
                    </button>
                    <button onClick={() => { setMemberList(!OpenMemberList) }} className={OpenMemberList ? "navItemActive" : "navItem"}>
                        <FaUserFriends size={36} className="text-white" />
                    </button>
                    <button onClick={() => { setOpenConfigWindow(!OpenConfigWindow) }} className={OpenConfigWindow ? "navItemActive " : "navItem "}>
                        <IoSettingsOutline size={36} className="text-white" />
                    </button>
                    <button onClick={() => router.replace("../dashboard")} className="mt-auto mb-3 ">
                        <RiArrowGoBackLine size={36} className="text-white" />
                    </button>

                </div>

                {/* All Window Content */}
                {OpenOsWindow && (
                    <WinBox
                        title={"Serviços"}
                        noMin={false}
                        noMax={false}
                        noFull={true}
                        noClose={false}
                        width={Math.min(document.body.clientWidth, 700)}
                        height={Math.min(document.body.clientHeight, 500)}
                        x="center"
                        y="center"
                        top={0}
                        right={0}
                        bottom={0}
                        left={64}
                        hide={false}
                        background={WinboxColor}
                        className={"rounded"}
                        onclose={() => {
                            // destroying actions while `onclose` must be wrapped within `setTimeout`
                            setTimeout(() => {
                                setOpenOsWindow(false);
                            });
                        }}
                    >
                        <ServiceList workstationid={workstationid} services={services} totalPages={totalPages} userData={userData} />
                    </WinBox>
                )}

                {OpenMemberList && (
                    <WinBox
                        title={"Membros do Workstation"}
                        noMin={false}
                        noMax={false}
                        noFull={true}
                        noClose={false}
                        width={1100}
                        height={500}
                        x="center"
                        y="center"
                        top={0}
                        right={0}
                        bottom={0}
                        left={64}
                        hide={false}
                        background={WinboxColor}
                        className={""}
                        onclose={() => {
                            // destroying actions while `onclose` must be wrapped within `setTimeout`
                            setTimeout(() => {
                                setMemberList(false);
                            });
                        }}
                    >

                    </WinBox>
                )}

                {OpenCreaditsWindow && (
                    <WinBox
                        title={"WorkFlow Plus | Creditos"}
                        noMin={false}
                        noMax={false}
                        noFull={true}
                        noClose={false}
                        width={1500}
                        height={500}
                        x="center"
                        y="center"
                        top={0}
                        right={0}
                        bottom={0}
                        left={64}
                        hide={false}
                        background={WinboxColor}
                        className={""}
                        onclose={() => {
                            // destroying actions while `onclose` must be wrapped within `setTimeout`
                            setTimeout(() => {
                                setOpenCreaditsWindow(false);
                            });
                        }}
                    >
                        <h1>Creditos</h1>
                    </WinBox>
                )}

                {OpenConfigWindow && (
                    <WinBox
                        title={"Configurações"}
                        noMin={true}
                        noMax={true}
                        noFull={true}
                        noResize={true}
                        noClose={false}
                        width={400}
                        height={500}
                        x="center"
                        y="center"
                        top={0}
                        right={0}
                        bottom={0}
                        background={WinboxColor}
                        left={64}
                        hide={false}
                        className={""}
                        onclose={() => {
                            // destroying actions while `onclose` must be wrapped within `setTimeout`
                            setTimeout(() => {
                                setOpenConfigWindow(false);
                            });
                        }}
                    >
                        <div>
                            <span className="text-2xl">Temas</span>
                            <div className="flex">
                                <div className="mr-5 h-16 w-16 rounded bg-gradient-to-r from-blue-800 to-indigo-900" onClick={() => { setbackgroundTheme("bg-gradient-to-r from-blue-800 to-indigo-900") }} />
                                <div className="mr-5 h-16 w-16 rounded bg-gradient-to-r from-green-400 via-cyan-900 to-blue-500" onClick={() => { setbackgroundTheme("bg-gradient-to-r from-green-400 via-cyan-900 to-blue-500") }} />
                                <div className="mr-5 h-16 w-16 rounded bg-gradient-to-t from-rose-500 via-purple-600 to-blue-400" onClick={() => { setbackgroundTheme("bg-gradient-to-t from-rose-500 via-purple-600 to-blue-400") }} />
                                <div className="mr-5 h-16 w-16 rounded bg-gradient-to-bl from-slate-700 via-neutral-800 to-green-800" onClick={() => { setbackgroundTheme("bg-gradient-to-bl from-slate-700 via-neutral-800 to-green-800") }} />
                                <div className="mr-5 h-16 w-16 rounded bg-gradient-to-bl from-slate-800 via-slate-900 to-slate-900" onClick={() => { setbackgroundTheme("bg-gradient-to-bl from-slate-800 via-slate-900 to-slate-900") }} />
                            </div>

                            <div className="mt-2 flex">
                                <div className="mr-5 h-16 w-16 rounded bg-gradient-to-tr from-green-600 via-blue-600 to-indigo-500" onClick={() => { setbackgroundTheme("bg-gradient-to-tr from-green-600 via-blue-600 to-indigo-500") }} />
                                <div className="mr-5 h-16 w-16 rounded bg-gradient-to-r from-green-400 via-cyan-900 to-blue-500" onClick={() => { setbackgroundTheme("bg-gradient-to-r from-green-400 via-cyan-900 to-blue-500") }} />
                                <div className="mr-5 h-16 w-16 rounded bg-gradient-to-t from-rose-500 via-purple-600 to-blue-400" onClick={() => { setbackgroundTheme("bg-gradient-to-t from-rose-500 via-purple-600 to-blue-400") }} />
                                <div className="mr-5 h-16 w-16 rounded bg-gradient-to-bl from-slate-700 via-neutral-800 to-green-800" onClick={() => { setbackgroundTheme("bg-gradient-to-bl from-slate-700 via-neutral-800 to-green-800") }} />
                                <div className="mr-5 h-16 w-16 rounded bg-gradient-to-bl from-slate-800 via-slate-900 to-slate-900" onClick={() => { setbackgroundTheme("bg-gradient-to-bl from-slate-800 via-slate-900 to-slate-900") }} />
                            </div>

                        </div>
                    </WinBox>
                )}
            </div>
            <span className="font-extrabold text-7xl mx-auto my-auto drop-shadow lg:drop-shadow-lg opacity-60">Workstation+</span>
        </div>
    )
}


export default Home


// essa função é executada no servidor e retorna as propriedades iniciais para a página
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { workstationid } = context.query;

    const session = await getServerSession(context.req, context.res, authOptions)
    if (session == undefined) {
        context.res.setHeader("Location", "/auth/login")
        context.res.statusCode = 302
        context.res.end()
        return { props: {} }
    }

    if (workstationid == undefined) {
        context.res.setHeader("Location", "/dashboard")
        context.res.statusCode = 302
        context.res.end()
        return { props: {} }
    }


    const WorkstationDoc = await api.get(`http://localhost:3000/api/v1/workstation?action=getWorkstationById&workstationId=${workstationid}`)
    const WorkstationData = WorkstationDoc.data as Workstation[]

    const dataService = await api.get(`/services?workstationId=${workstationid}`);
    return {
        props: {
            services: dataService.data.data,
            totalPages: dataService.data.totalPages,
            workstationData: WorkstationData,
            userData: session?.user
        }
    };
};

