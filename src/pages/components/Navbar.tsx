import { useState } from 'react'
import { AiFillZhihuCircle } from 'react-icons/ai'
import { FaRegUserCircle } from 'react-icons/fa'
import dynamic from 'next/dynamic';
const WinBox = dynamic(() => import('react-winbox'), { ssr: false });

export default function Navbar() {
    const [openWindow, setOpenWindow] = useState<boolean>(false)

    function windowHandler() {
        setOpenWindow(true)
    }

    return (
        <div className='flex justify-between items-center w-screen h-12 bg-zinc-700 px-20 shadow-2xl drop-shadow-sm'>
            <div className='flex items-center space-x-5'>
                <div><AiFillZhihuCircle className='text-white text-4xl font-bold' /></div>
                <div>
                    <button className='font-semibold text-white text-sm active:text-zinc-400'>Ordem de Serviço</button>
                </div>
            </div>
            <div>
                <FaRegUserCircle className='text-white text-3xl font-bold' />
            </div>
        </div >
    )
}
