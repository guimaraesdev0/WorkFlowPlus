import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const createServiceSchema = z.object({
    serviceName: z.string()
        .min(3, "O nome deve conter no mínimo três caracteres")
        .nonempty("Nome inválido"),
    serviceDesc: z.string()
})

type createServiceSchemaData = z.infer<typeof createServiceSchema>

export default function NewServiceForm() {
    const [output, setOutput] = useState('')
    const { register, handleSubmit } = useForm<createServiceSchemaData>({
        resolver: zodResolver(createServiceSchema)
    })

    function createNewService(data: any) {
        const output = JSON.stringify(data, null, 2)
        setOutput(output)
    }

    return (
        <main className="flex flex-col p-10 gap-5">
            <p className="font-bold text-3xl">Criar novo serviço</p>
            <form onSubmit={handleSubmit(createNewService)} className="flex flex-col gap-5">
                <input
                    type="text"
                    placeholder="Nome do serviço"
                    className="pl-3 h-10 rounded text-sm text-white bg-zinc-900 ring-1 ring-zinc-800"
                    {...register("serviceName")}
                />
                <input
                    type="text"
                    placeholder="Descrição do serviço"
                    className="pl-3 h-10 rounded text-sm text-white bg-zinc-900 ring-1 ring-zinc-800"
                    {...register("serviceDesc")}
                />
                <input type="submit" className="ring-1 ring-zinc-700 rounded h-10 cursor-pointer" />
            </form>
            <pre>{output}</pre>
        </main>
    )
}