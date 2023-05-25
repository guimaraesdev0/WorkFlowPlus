export default function createWorkstationModal() {
    return (
        <div className="flex flex-col p-5 bg-zinc-800 w-[30rem] h-64 transition-all rounded">
            <input className="h-12 w-full rounded bg-zinc-700 pl-3 ring-1 ring-zinc-600" placeholder="Nome do Workstation"/>
            <button className="mt-auto flex items-center justify-center bg-zinc-700 w-40 h-10 rounded font-semibold text-white transition hover:bg-zinc-700 hover:ring-1 hover:ring-zinc-600 ">Criar Workstation</button>
        </div>
    )
}