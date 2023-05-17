import { NextPage } from "next"
import Router from "next/router"
import LandpageNavbar from "./components/NavBar/LandpageNavbar"
import { GiThink } from "react-icons/gi"
import Head from "next/head"


const Home: NextPage = () => {
  return (
    <div>
      <Head><title>WorkflowPlus - Ferramente de ordem de serviço</title></Head>
      <div className=""></div>
      <LandpageNavbar />
      <article className="flex flex-col w-full items-center p-2 sm:space-y-12 space-y-2 lg:space-y-5 mt-20">
        <div className="w-[115px] h-[115px] blur-[115px] animate-button-1 sm:h-[300px] sm:w-[300px] sm:blur-[300px] bg-sky-400 -z-20 absolute"></div>
        <div className="flex flex-col items-center">
          <p className="flex items-center justify-center bg-opacity-50 mx-auto text-base sm:text-base h-8 w-52 bg-zinc-600 rounded-full">Bem vindo ao <span className="text-sky-400 ml-1">WorkFlow+</span></p>
          <p className="font-bold text-center text-3xl w-96 sm:text-5xl lg:text-6xl sm:w-[45rem] lg:w-[65rem] align-center whitespace-wrap mb-5 sm:mb-20 mt-5 sm:mt-16 lg:mb-12 lg:mt-0 sm:font-extrabold">Sua ferramenta empresarial de  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-cyan-400">organização</span> interna!</p>
          <p className="w-80 sm:w-[45rem] text-center text-base sm:text-2xl text-neutral-400 lg:w-[30rem] lg:text-xl lg:pb-8">Com o  WorkFlow você torna o ambiente empresarial mais produtivo e dinâmico!</p>
        </div>
        <div className="flex space-x-3 mt-20">
          <button className="mt-10 w-44 h-12 sm:w-64 sm:h-14 text-base sm:text-lg font-semibold rounded ring-cyan-500 transition-all duration-500 ease-in-out bg-gradient-to-tl from-cyan-400 via-sky-500 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100 sm:mt-0 sm:items-center" onClick={() => { Router.push("/auth/register") }}>  Começar agora</button>
        </div>
        <div className="self-end w-[115px] h-[115px] blur-[115px] animate-button-2 sm:h-[300px] sm:w-[300px] sm:blur-[300px] bg-rose-800 -z-10 absolute"></div>
      </article>
      <article className="flex flex-row flex-wrap justify-center items-center">
          <div className="flex flex-col items-center justify-center w-80 h-[450px] mx-16 mt-4 max-[500px]:w-64 max-[500px]:h-64 rounded-lg border-2 border-neutral-600 hover:transition-all hover:border-neutral-200">
            <p className="font-extrabold text-5xl min-[500px]:font-semibold max-[500px]:text-xl">teste</p>
          </div>
          <div className="flex flex-col items-center justify-center w-80 h-[450px] mx-16 mt-4 max-[500px]:w-64 max-[500px]:h-64 rounded-lg border-2 border-neutral-600 hover:transition-all hover:border-neutral-200">
            <p className="font-extrabold text-5xl min-[500px]:font-semibold max-[500px]:text-xl">teste</p>
          </div>
          <div className="flex flex-col items-center justify-center w-80 h-[450px] mx-16 mt-4 max-[500px]:w-64 max-[500px]:h-64 rounded-lg border-2 border-neutral-600 hover:transition-all hover:border-neutral-200">
            <p className="font-extrabold text-5xl min-[500px]:font-semibold max-[500px]:text-xl">teste</p>
          </div>
          <div className="flex flex-col items-center justify-center w-80 h-[450px] mx-16 mt-4 max-[500px]:w-64 max-[500px]:h-64 rounded-lg border-2 border-neutral-600 hover:transition-all hover:border-neutral-200">
            <p className="font-extrabold text-5xl min-[500px]:font-semibold max-[500px]:text-xl">teste</p>
          </div>
          <div className="flex flex-col items-center justify-center w-80 h-[450px] mx-16 mt-4 max-[500px]:w-64 max-[500px]:h-64 rounded-lg border-2 border-neutral-600 hover:transition-all hover:border-neutral-200">
            <p className="font-extrabold text-5xl min-[500px]:font-semibold max-[500px]:text-xl">teste</p>
          </div>
          <div className="flex flex-col items-center justify-center w-80 h-[450px] mx-16 mt-4 max-[500px]:w-64 max-[500px]:h-64 rounded-lg border-2 border-neutral-600 hover:transition-all hover:border-neutral-200">
            <p className="font-extrabold text-5xl min-[500px]:font-semibold max-[500px]:text-xl">teste</p>
          </div>
        
      </article>
      {/* <div className="h-32 mt-16 bg-zinc-900 sm:h-24">
        <div  >
          <div className=" flex flex-col items-center ml-4 h-20 lg:h-20  sm:h-10">
            <span className="font-bold sm:text-sm">Redes Sociais </span>
            <div className="flex">
            <a className="hover:text-white  hover:text-transparent bg-clip-text bg-gradient-to-tr hover:from-blue-400  hover:to-blue-700  sm:text-xs lg:text-base" href="#" target="_blank">Instagram</a>
            <a className="hover:text-white  hover:text-transparent bg-clip-text bg-gradient-to-tr hover:from-blue-400  hover:to-blue-700 ml-4 sm:text-xs lg:text-base" href="#" target="_blank">Linkdlin</a>
            <a className="hover:text-white  hover:text-transparent bg-clip-text bg-gradient-to-tr hover:from-blue-400  hover:to-blue-700 ml-4 sm:text-xs lg:text-base" href="#" target="_blank">Github</a>
            <a className="hover:text-white  hover:text-transparent bg-clip-text bg-gradient-to-tr hover:from-blue-400  hover:to-blue-700 ml-4 sm:text-xs lg:text-base" href="#" target="_blank">Documentação</a>
            </div>
            </div>
        </div>
        <div><span className="flex flex-col items-center text-neutral-700 text-lg font-bold sm:text-sm "> Copyright © 2023 WorkFlow .</span></div>
      </div> */}
    </div>
  )
}


export default Home