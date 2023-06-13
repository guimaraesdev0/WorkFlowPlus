import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
const dataAtual = new Date();


const createServiceSchema = z.object({
    serviceName: z.string()
        .min(3, "O nome deve conter no mínimo três caracteres")
        .nonempty("Nome inválido"),
    serviceDesc: z.string(),
    servicePriority: z.string(),
    serviceLocal: z.string()
})

type createServiceSchemaData = z.infer<typeof createServiceSchema>

interface Props {
    workstationId: string,
    userName: string
}

export default function NewServiceForm(props: Props) {
    const [output, setOutput] = useState('')
    const { register, handleSubmit } = useForm<createServiceSchemaData>({
        resolver: zodResolver(createServiceSchema)
    })

    async function createNewService(data: any) {
        const output:any = JSON.stringify(data, null, 2)
        alert(data.serviceName)
        axios.post('http://localhost:3000/api/v1/services', {

                    workstationid: props.workstationId,
                    title: data.serviceName,
                    description: data.serviceDesc,
                    place: data.serviceDesc,
                    requester: data.serviceName,
                    priority: data.servicePriority,
                    created_date: dataAtual
                
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            console.log(response.data);
            setOutput(JSON.stringify(response.data))
          })
          .catch(error => {
            console.error(error);
            setOutput(JSON.stringify(error))
          }); 
       
    }

    return (
        <main className="flex flex-col p-10 gap-5">
            <p className="font-bold text-3xl">Criar novo serviço</p>
            <form onSubmit={handleSubmit(createNewService)}
             className="flex flex-col gap-5"
             
             >
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
                <input
                    type="text"
                    placeholder="Local ex: cozinha - banheiro"
                    className="pl-3 h-10 rounded text-sm text-white bg-zinc-900 ring-1 ring-zinc-800"
                    {...register("serviceLocal")}
                />
                <p>Prioridade</p>
                <select {...register("servicePriority")}>
                    <option value="0">Baixa</option>
                    <option value="1">Média</option>
                    <option value="2">Urgente</option>
                </select>
                <input type="submit" className="ring-1 ring-zinc-700 rounded h-10 cursor-pointer" />
            </form>
            <pre>{output}</pre>
        </main>
    )
}