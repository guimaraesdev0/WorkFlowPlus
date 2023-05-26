import createWorkstationModal from "../createWorkstationModal";
import { UserInterface, Workstation } from "@/models";
import { useEffect, useRef, useState } from "react";


interface navProps {
    workstations: Workstation[],
    user: UserInterface
}

export default function DashboardNavbar(props: navProps) {
    const [showModal, setShowModal] = useState<boolean>(false)
    const modalRef = useRef<HTMLDivElement>(null);
    const [test, setTest] = useState<string>("hello nigga")

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const workstationNum = props.workstations.length

    return (
        <main className="flex px-10 items-center w-full h-16 border-b border-zinc-700" >
            <span className="font-bold text-2xl pr-3">Workflow+</span>
            <span className="flex items-center justify-center bg-[#101010] text-sm w-28 h-7 rounded opacity-70">{workstationNum} Workstations</span>
            <div className="flex ml-auto gap-4">
                <button onClick={() => setShowModal(true)}
                    className="flex items-center justify-center bg-zinc-800 w-40 h-10 rounded font-semibold text-white transition hover:bg-zinc-700 hover:ring-1 hover:ring-zinc-600">
                    criar workstation
                </button>
                <img
                    className="w-10 h-10 rounded-full"
                    src={props.user.image}
                />
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-zinc-900 opacity-80"></div>
            )}

            {showModal && (
                <div ref={modalRef} className="absolute left-[35%] top-[20%]">
                    {createWorkstationModal(test)}
                </div>
            )}
        </main>
    )
}