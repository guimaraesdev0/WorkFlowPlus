interface WorkstationCardProps {
    workstationName: string;
    workstationDesc: string;
}

export default function WorkstationCard(props: WorkstationCardProps) {
    return (
        <button className="flex flex-col w-64 h-52 rounded ring-1 ring-neutral-800 p-3 transition ease-in-out duration-100 hover:bg-neutral-800">
            <span className="text-white font-semibold text-lg h-10">{props.workstationName}</span>
                <div className="flex justify-items-start">
{/*                 <div className="bg-sky-800 rounded pl-2 pr-2 hover:text-white text-white">Adminstradores</div>  */}
                </div>
            <span className=" text-zinc-300 h-32 text-sm text-left overflow-hidden ...">{props.workstationDesc}</span>
        </button>
    )
}