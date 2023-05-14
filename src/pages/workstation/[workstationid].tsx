//Modules React/Next etc.
import { GetServerSideProps, NextPage, NextPageContext } from "next";
import dynamic from "next/dynamic";
const WinBox = dynamic(() => import('react-winbox'), { ssr: false });
import React, { useEffect, useRef, useState } from 'react';
import Head from "next/head";
import { BiHomeAlt2 } from 'react-icons/bi';
import { RiSuitcaseLine } from 'react-icons/ri';
import { MdSupportAgent } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5'
import { ServiceInterface } from "@/models";
import ServiceList from "../components/ServiceList";
import SupportMenu from "../components/supportMenu";
import api from "@/services/api.service";
import { useRouter } from "next/router";
import { workstationController } from "@/controller";

interface Props {
    services: ServiceInterface[];
    totalPages: number;
}


const Home: NextPage<Props> = ({ services, totalPages }: Props) => {
    const router = useRouter()
    const workstationid = router.query.workstationid as string;
    /* useState do WinboxJs */
    /* Variaveis de janelas WinBox */
    const [OpenOsWindow, setOpenOsWindow] = useState(false)
    const [OpenCreaditsWindow, setOpenCreaditsWindow] = useState(false)
    const [OpenConfigWindow, setOpenConfigWindow] = useState(false)
    const [OpenSupportWindow, setSupportOpen] = useState(false)
    const [WinboxColor, setWinboxColor] = useState<string>()
    /* Configurações do workstation */
    const [backgroundTheme, setbackgroundTheme] = useState("bg-gradient-to-r from-blue-800 to-indigo-900")

    return (
        <div className={"flex antialised " + backgroundTheme + " transition"}>
            <>
                <Head>
                    <title>{workstationid}</title>
                </Head>
            </>
            <div>
                <div className='flex flex-col space-y-1 items-center w-16 h-screen bg-zinc-900 bg-opacity-90 shadow-2xl py-1 z-50'>
                    <div className='navItem'>
                        <BiHomeAlt2 size={36} className='text-white' />
                    </div>
                    <button onClick={() => { setOpenOsWindow(!OpenOsWindow) }} className={OpenOsWindow ? 'navItemActive' : 'navItem'}>
                        <RiSuitcaseLine size={36} className='text-white' />
                    </button>
                    <button onClick={() => { setSupportOpen(!OpenSupportWindow) }} className={OpenSupportWindow ? 'navItemActive' : 'navItem'}>
                        <MdSupportAgent size={36} className='text-white' />
                    </button>
                    <button onClick={() => { setOpenConfigWindow(!OpenConfigWindow) }} className={OpenConfigWindow ? 'navItemActive mt-auto' : 'navItem mt-auto'}>
                        <IoSettingsOutline size={36} className='text-white' />
                    </button>
                    <a onClick={() => { setOpenConfigWindow(!OpenConfigWindow) }}>
                        <i className=""></i>
                    </a>
                </div>

                {/* All Window Content */}
                {OpenOsWindow && (
                    <WinBox
                        title={'Serviços'}
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
                        className={''}
                        onclose={() => {
                            // destroying actions while `onclose` must be wrapped within `setTimeout`
                            setTimeout(() => {
                                setOpenOsWindow(false);
                            });
                        }}
                    >
                        <ServiceList workstationid={workstationid} services={services} totalPages={totalPages} />
                    </WinBox>
                )}

                {OpenSupportWindow && (
                    <WinBox
                        title={'Suporte'}
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
                        className={''}
                        onclose={() => {
                            // destroying actions while `onclose` must be wrapped within `setTimeout`
                            setTimeout(() => {
                                setSupportOpen(false);
                            });
                        }}
                    >
                        <SupportMenu />
                    </WinBox>
                )}

                {OpenCreaditsWindow && (
                    <WinBox
                        title={'WorkFlow Plus | Creditos'}
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
                        className={''}
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
                        title={'Configurações'}
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
                        className={''}
                        onclose={() => {
                            // destroying actions while `onclose` must be wrapped within `setTimeout`
                            setTimeout(() => {
                                setOpenConfigWindow(false);
                            });
                        }}
                    >
                        <div>
                            <span className=" text-2xl">Temas</span>

                            <div className=" flex">

                                <div className=" mr-5 h-16 w-16 rounded bg-gradient-to-r from-blue-800 to-indigo-900" onClick={() => { setbackgroundTheme("bg-gradient-to-r from-blue-800 to-indigo-900") }} />

                                <div className=" mr-5 h-16 w-16 rounded bg-gradient-to-r from-green-400 via-cyan-900 to-blue-500" onClick={() => { setbackgroundTheme("bg-gradient-to-r from-green-400 via-cyan-900 to-blue-500") }} />

                                <div className=" mr-5 h-16 w-16 rounded bg-gradient-to-t from-rose-500 via-purple-600 to-blue-400" onClick={() => { setbackgroundTheme("bg-gradient-to-t from-rose-500 via-purple-600 to-blue-400") }} />

                                <div className=" mr-5 h-16 w-16 rounded bg-gradient-to-bl from-slate-700 via-neutral-800 to-green-800" onClick={() => { setbackgroundTheme("bg-gradient-to-bl from-slate-700 via-neutral-800 to-green-800") }} />

                                <div className=" mr-5 h-16 w-16 rounded bg-gradient-to-bl from-slate-800 via-slate-900 to-slate-900" onClick={() => { setbackgroundTheme("bg-gradient-to-bl from-slate-800 via-slate-900 to-slate-900") }} />

                            </div>


                            <div className=" mt-2 flex">

                                <div className=" mr-5 h-16 w-16 rounded bg-gradient-to-tr from-green-600 via-blue-600 to-indigo-500" onClick={() => { setbackgroundTheme("bg-gradient-to-tr from-green-600 via-blue-600 to-indigo-500") }} />

                                <div className=" mr-5 h-16 w-16 rounded bg-gradient-to-r from-green-400 via-cyan-900 to-blue-500" onClick={() => { setbackgroundTheme("bg-gradient-to-r from-green-400 via-cyan-900 to-blue-500") }} />

                                <div className=" mr-5 h-16 w-16 rounded bg-gradient-to-t from-rose-500 via-purple-600 to-blue-400" onClick={() => { setbackgroundTheme("bg-gradient-to-t from-rose-500 via-purple-600 to-blue-400") }} />

                                <div className=" mr-5 h-16 w-16 rounded bg-gradient-to-bl from-slate-700 via-neutral-800 to-green-800" onClick={() => { setbackgroundTheme("bg-gradient-to-bl from-slate-700 via-neutral-800 to-green-800") }} />

                                <div className=" mr-5 h-16 w-16 rounded bg-gradient-to-bl from-slate-800 via-slate-900 to-slate-900" onClick={() => { setbackgroundTheme("bg-gradient-to-bl from-slate-800 via-slate-900 to-slate-900") }} />

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

    if (workstationid == undefined) {
         
    }

    const { data } = await api.get(`/services?workstationId=${workstationid}`);
    return {
        props: {
            services: data.data,
            totalPages: data.totalPages
        }
    };
};