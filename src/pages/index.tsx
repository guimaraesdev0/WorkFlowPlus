import { NextPage } from "next"
import Router from "next/router"
import LandpageNavbar from "./components/NavBar/LandpageNavbar"
import { GiThink } from "react-icons/gi"

const Home: NextPage = () => {
  return (
    <div>
      <div className=""></div>
      <LandpageNavbar />
      <div className="flex flex-col w-full items-center p-10 space-y-12 lg:space-y-5">
        <div className="animate-button h-[150px] w-[150px] blur-[150px] bg-sky-500 -z-10 absolute">
        </div>
        <div className="flex flex-col items-center">
          <p className="mx-auto font-semibold text-lg mb-3 lg:text-base">Bem vindo ao  <span className="text-sky-400">WorkFlow+</span></p>
          <p className="font-bold text-center text-7xl w-[60rem] align-center whitespace-wrap mb-20 mt-16 lg:mb-12 lg:mt-0 lg:text-5xl">Sua ferramenta empresarial de  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-cyan-400">organização</span> interna!</p>
          <p className="w-[45rem] text-center text-2xl text-neutral-400 lg:w-[30rem] lg:text-lg">Com o  WorkFlow você torna o ambiente empresarial mais produtivo e dinâmico!</p>
        </div>
        <div className="flex space-x-3 mt-20">
          <button className="mt-10 w-64 h-14 text-lg font-semibold rounded ring-cyan-500 transition-all duration-500 ease-in-out bg-gradient-to-tl from-cyan-400 via-sky-500 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100" onClick={() => { Router.push("/auth/register") }}>  Começar agora</button>
        </div>
      </div>  
      <div>
        
      </div>

      <div className="h-32 mt-16 bg-zinc-900 ">
        <div  >
          <div className=" flex flex-col items-center ml-4 h-20 ">
            <span className="font-bold">Redes Sociais </span>
            <div className="flex">
            <a className="hover:text-white  hover:text-transparent bg-clip-text bg-gradient-to-tr hover:from-blue-400  hover:to-blue-700" href="#" target="_blank">Instagram</a>
            <a className="hover:text-white  hover:text-transparent bg-clip-text bg-gradient-to-tr hover:from-blue-400  hover:to-blue-700 ml-4" href="#" target="_blank">Linkdlin</a>
            <a className="hover:text-white  hover:text-transparent bg-clip-text bg-gradient-to-tr hover:from-blue-400  hover:to-blue-700 ml-4" href="#" target="_blank">Github</a>
            <a className="hover:text-white  hover:text-transparent bg-clip-text bg-gradient-to-tr hover:from-blue-400  hover:to-blue-700 ml-4" href="#" target="_blank">Documentação</a>
            </div>
            </div>
        </div>
        <div><span className="flex flex-col items-center text-neutral-700 text-lg font-bold"> Copyright © 2023 WorkFlow .</span></div>
      </div>
    </div>
  )
}

export default Home