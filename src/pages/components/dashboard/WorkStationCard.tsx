
export default function WorkstationCard() {
    return (
        <button className='flex flex-col w-64 h-52 rounded ring-1 ring-neutral-800 p-3 transition ease-in-out duration-100 hover:bg-neutral-800'>
            <span className='text-white mt-auto font-semibold text-lg '>Whisky 🥃</span>
            <div className='flex w-full p-1 -space-x-2 overflow-hidden flex-wrap'>
                <div className='inline-block h-7 w-7 rounded-full ring-1 ring-white bg-zinc-400'></div>
                <div className='inline-block h-7 w-7 rounded-full ring-1 ring-white bg-rose-400'></div>
                <div className='inline-block h-7 w-7 rounded-full ring-1 ring-white bg-green-400'></div>
            </div>
        </button>
    )
}