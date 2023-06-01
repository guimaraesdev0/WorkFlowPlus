import createWorkstationModal from "../createWorkstationModal";
import { UserInterface, Workstation } from "@/models";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver} from '@hookform/resolvers/zod'
import { signOut } from "next-auth/react";
import Link from "next/link";

interface navProps {
  workstations: Workstation[];
  user: UserInterface;
}

//zod
const createWorkstationSchema = z.object({
    workstationName: z.string()
        .nonempty("O nome do Workstations não pode ser vazio")
        .min(3, "O nome do Workstation deve conter mais que três caracteres"),
    workstationDesc: z.string()
        .max(128, "A descrição deve conter menos que 128 caracteres.")
        .optional()
})

type createWorkstationSchemaData = z.infer<typeof createWorkstationSchema>
//end zod

export default function DashboardNavbar(props: navProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  //createWorkstationModal hooks
  const { register, handleSubmit, formState: { errors } } = useForm<createWorkstationSchemaData>({
    resolver: zodResolver(createWorkstationSchema)
  });
  const [output, setOutput] = useState();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const workstationNum = props.workstations.length;

  return (
    <main className="flex px-10 items-center w-full h-16 border-b border-zinc-700">
      <span className="font-bold text-2xl pr-3"><Link href="/" className="text-white">Workflow+</Link></span>
      <span className="flex items-center justify-center bg-[#101010] text-sm w-28 h-7 rounded opacity-70">
        {workstationNum} Workstations
      </span>
      <div className="flex ml-auto gap-4">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center bg-zinc-800 w-40 h-10 rounded font-semibold text-white transition hover:bg-zinc-700 hover:ring-1 hover:ring-zinc-600"
        >
          criar workstation
        </button>
        <img className="w-10 h-10 rounded-full" src={props.user.image} />

        <button
          onClick={() => signOut()}
          className="flex items-center justify-center bg-zinc-800 w-24 h-10 rounded font-semibold text-white transition hover:bg-zinc-700 hover:ring-1 hover:ring-zinc-600"
        >Sair</button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-zinc-900 opacity-80"></div>
      )}

      {showModal && (
        <div ref={modalRef} className="absolute left-[35%] top-[20%]">
          {createWorkstationModal(register, handleSubmit, output, setOutput, errors, props.user.email)}
        </div>
      )}
    </main>
  );
}
