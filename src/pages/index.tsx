import { NextPage } from "next"
import Router from "next/router"
import LandpageNavbar from "./components/NavBar/LandpageNavbar"
import Head from "next/head"

const Home: NextPage = () => {
  return (
    <div>
      <Head><title>WorkflowPlus - Ferramente de ordem de serviço</title></Head>
      <LandpageNavbar />
      <article className="flex flex-col w-full items-center p-2 sm:space-y-7 space-y-2 lg:space-y-7 mt-10 lg:mt-24">
        <div className="w-[115px] h-[115px] blur-[115px] animate-button-1 sm:h-[300px] sm:w-[300px] sm:blur-[300px] bg-sky-400 -z-20 absolute"></div>
        <div className="flex flex-col items-center sm:space-y-5">
          <p className="flex items-center justify-center bg-opacity-50 mx-auto text-sm sm:text-base h-6 w-44 sm:h-8 sm:w-52 bg-zinc-600 rounded-full">Bem vindo ao <span className="text-sky-400 ml-1">WorkFlow+</span></p>
          <p className="font-bold text-center text-3xl w-90 sm:text-5xl lg:text-6xl sm:w-[45rem] lg:w-[65rem] align-center whitespace-wrap mb-4 sm:mb-20 mt-5 sm:mt-16 lg:mb-12 lg:mt-0 sm:font-extrabold">Sua ferramenta empresarial de  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-cyan-400">organização</span> interna!</p>
          <p className="w-80 sm:w-[45rem] text-center text-base sm:text-2xl text-neutral-400 lg:w-[30rem] lg:text-xl lg:pb-8">Com o  WorkFlow você torna o ambiente empresarial mais produtivo e dinâmico!</p>
        </div>
        <div className="flex space-x-3 mt-20">
          <button className="mt-10 w-44 h-12 sm:w-52 sm:h-14 text-base sm:text-lg font-semibold rounded ring-cyan-500 transition-all duration-500 ease-in-out bg-gradient-to-tl from-cyan-400 via-sky-500 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100 sm:mt-0 sm:items-center" onClick={() => { Router.push("/auth/register") }}>  Começar agora</button>
        </div>
        <div
          className="self-end w-[115px] h-[115px] blur-[115px] animate-button-2 sm:h-[300px] sm:w-[300px] sm:blur-[300px] bg-rose-800 -z-10 absolute">
        </div>
      </article>
      <article className="flex flex-col w-2/3 pt-32 sm:pt-44 gap-20 mx-auto">
        <div className="flex flex-col w-full h-32 justify-center items-center gap-7">
          <p className="text-3xl font-bold antialiased text-center sm:text-6xl ">E não termina por aí</p>
          <span className="text-center">WorkStation representa organização e elegância ao seu negócio</span>
        </div>
        {/* cards  */}
        <section className="flex flex-col justify-center items-center gap-3 w-full">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="flex flex-col justify-end gap-2 pl-5 py-3 bg-neutral-800 w-full h-64 sm:w-1/2 sm:h-72 rounded-lg ring-1 ring-neutral-700 transition ease-in-out hover:ring-neutral-500">
              <span className="text-5xl mb-auto">&#x1F680;</span>
              <p className="text-3xl font-semibold">Agilidade</p>
              <span className="opacity-70">Imagine ter um negócio onde a gestão das ordens de serviço é feita de forma ágil e eficiente. Com o Workflow, isso é possível! Nosso sistema simplifica o processo de gerenciamento de ordens de serviço, garantindo que você possa focar no que realmente importa: seus clientes.</span>
            </div>
            <div className="flex flex-col justify-end gap-2 pl-5 py-3 bg-neutral-800 w-full h-64 sm:w-1/2 sm:h-72 rounded-lg ring-1 ring-neutral-700 transition ease-in-out hover:ring-neutral-500">
              <span className="text-5xl mb-auto">&#127942;</span>
              <p className="text-3xl font-semibold">Agilidade</p>
              <span className="opacity-70">o Workflow é uma solução totalmente segura e confiável. Todos os dados são armazenados em servidores protegidos, com backups frequentes e criptografia avançada. Assim, você pode ficar tranquilo sabendo que suas informações estão sempre protegidas.</span>
            </div>
          </div>
          <a href="/auth/register" className="text-white overflow-hidden bg-zinc-950 flex flex-col card-bg items-center justify-center w-full h-52 sm:h-64 rounded-lg ring-1 ring-neutral-700 transition ease-in-out hover:ring-neutral-500 z-10">
            <span className="font-bold text-3xl">Registre-se agora, é de graça &#127881;</span>
          </a>
        </section>
        {/* end cards */}
      </article>
      <div className="h-32 mt-16 bg-zinc-900 sm:h-24">
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
      </div>
    </div>
  )
}


export default Home