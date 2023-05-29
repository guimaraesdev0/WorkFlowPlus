import { NextPage } from "next";
import dynamic from "next/dynamic";
const WinBox = dynamic(() => import('react-winbox'), { ssr: false });
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head'
import ServiceList from '../ServiceList/index'
import { BiHomeAlt2 } from 'react-icons/bi';
import { RiSuitcaseLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5'
import LandpageNavbar from "./LandpageNavbar";


const NavBar: NextPage = () => {
    /* useState do WinboxJs */
    const ref = useRef();
    /* Variaveis de janelas WinBox */
    const [OpenOsWindow, setOpenOsWindow] = useState(false)
    const [OpenCreaditsWindow, setOpenCreaditsWindow] = useState(false)
    const [OpenConfigWindow, setOpenConfigWindow] = useState(false)
    const [WinboxColor, setWinboxColor] = useState<string>()

    return (
        <div>
            <LandpageNavbar />
            <div className='flex flex-col space-y-2 items-center w-20 h-screen bg-zinc-900 shadow-2xl p-2 py-3 z-50'>
                <div className='navItem'>
                    <BiHomeAlt2 size={36} className='text-white' />
                </div>

                <button onClick={() => { setOpenOsWindow(true) }} className={OpenOsWindow ? 'navItemActive' : 'navItem'}>
                    <RiSuitcaseLine size={36} className='text-white' />
                </button>

                <div>

                </div>

                <button onClick={() => { setOpenConfigWindow(true) }} className={OpenConfigWindow ? 'navItemActive mt-auto' : 'navItem mt-auto'}>
                    <IoSettingsOutline size={36} className='text-white' />
                </button>

                <a onClick={() => { setOpenCreaditsWindow(true) }}>
                    <i className=""></i>
                </a>
                <a onClick={() => { setOpenConfigWindow(true) }}>
                    <i className=""></i>
                </a>
            </div>


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
                    left={80}
                    hide={false}
                    splitscreen={true}
                    background={WinboxColor}
                    className={''}
                    onclose={() => {
                        // destroying actions while `onclose` must be wrapped within `setTimeout`
                        setTimeout(() => {
                            setOpenOsWindow(false);
                        });
                    }}
                >
                    <ServiceList services={[]} totalPages={0} />
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
                    left={80}
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
                    width={500}
                    height={500}
                    x="center"
                    y="center"
                    top={0}
                    right={0}
                    bottom={0}
                    background={WinboxColor}
                    left={80}
                    hide={false}
                    className={''}
                    onclose={() => {
                        // destroying actions while `onclose` must be wrapped within `setTimeout`
                        setTimeout(() => {
                            setOpenConfigWindow(false);
                        });
                    }}
                >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 p-2">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label>
                                </div>
                            </div>
                            <div className="col-12 p-2">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label>
                                </div>
                            </div>
                            <div className="col-12 p-2">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label>
                                </div>
                            </div>
                            <div className="col-12 p-2">
                                <div className="form-check form-switch">
                                    <input type="color" role="switch" id="flexSwitchCheckDefault"
                                        onChange={({ target }) => setWinboxColor(target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label>
                                </div>
                            </div>
                            <div className="col-12 p-2">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label>
                                </div>
                            </div>
                            <div className="col-12 p-2">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label>
                                </div>
                            </div>
                            <div className="col-12 p-2">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label>
                                </div>
                            </div>
                            <div className="col-12 p-2">
                                <div className="form-check form-switch">
                                    <input type="color" role="switch" id="flexSwitchCheckDefault"
                                        onChange={({ target }) => setWinboxColor(target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </WinBox>
            )}


        </div>
    )
}

export default NavBar