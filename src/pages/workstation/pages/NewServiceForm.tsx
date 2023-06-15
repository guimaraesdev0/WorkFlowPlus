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
    const [successMsg, setsuccessMsg] = useState('')
    const [errMsg, seterrMsg] = useState('')
    const { register, handleSubmit } = useForm<createServiceSchemaData>({
        resolver: zodResolver(createServiceSchema)
    })

    async function createNewService(data: any) {
        axios.post('http://localhost:3000/api/v1/services', {

            workstationid: props.workstationId,
            title: data.serviceName,
            description: data.serviceDesc,
            place: data.serviceLocal,
            requester: props.userName,
            priority: data.servicePriority,
            created_date: dataAtual

        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
                setsuccessMsg("Serviço cadastrado com sucesso")
            })
            .catch(error => {
                console.error(error);
                seterrMsg("Ocorreu um erro ao cadastrar seu Serviço")
            });

    }

    return (
        <main className="flex flex-col p-10 gap-5">
            <p className="font-bold text-3xl">Criar novo serviço</p>
            {successMsg && (
                <span className="h-full pl-5 pt-2 bold pb-2 bg-green-500 bg-opacity-50 backdrop-blur-lg rounded">
                    {successMsg}
                </span>
            )}
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
                <select required
                    {...register("servicePriority")}
                    className="pl-3 h-10 rounded text-sm text-white bg-zinc-900 ring-1 ring-zinc-800"
                >
                    <option value="0" className="bg-zinc-900">Baixa</option>
                    <option value="1" className="bg-zinc-900">Média</option>
                    <option value="2" className="bg-zinc-900">Urgente</option>
                </select>

                <input type="submit" className="ring-1 ring-zinc-700 rounded h-10 cursor-pointer" />
            </form>
            {errMsg && (<span>{errMsg}</span>)}

        </main>
    )
}