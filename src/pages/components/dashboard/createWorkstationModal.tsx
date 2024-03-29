import axios from "axios"

export default function createWorkstationModal(register: any, handleSubmit: any, output: any, setOutput: Function, errors: any, user_email: string) {
    async function createWorkstation(data: any) {

        const options = {
            method: "POST",
            url: "http://localhost:3000/api/v1/workstation",
            headers: {
                "content-type": "application/json",
            },
            data:
            {
                "email": user_email,
                "workstationName": data.workstationName,
                "description": data.workstationDesc,
                "image": "aosdoasdksaodkoasd"
            },
        };

        await axios
            .request(options)
            .then((success) => {
                setOutput(success.data.invite_code);
            }).catch((error) => {
                setOutput(JSON.stringify(error));
            })

    }

    return (
        <div>
            {!output ? (
                <div className="flex flex-col bg-zinc-800 w-[30rem] h-[25rem] transition-all rounded p-4 ">
                    <p className="text-4xl mx-auto font-bold text-center w-64">Criar novo Workstation</p>
                    <form onSubmit={handleSubmit(createWorkstation)} className="w-full h-full flex flex-col p-4 space-y-4">
                        <input type="text" className="block h-12 w-full rounded bg-zinc-700 pl-3 ring-1 ring-zinc-600" placeholder="Nome do Workstation" {...register("workstationName")} />
                        <input type="text" className="block h-12 w-full rounded bg-zinc-700 pl-3 ring-1 ring-zinc-600" placeholder="Descrição do Workstation" {...register("workstationDesc")} />
                        {errors.workstationName && (<span>{errors.workstationName.message}</span>)}
                        {errors.workstationDesc && (<span>{errors.workstationDesc.message}</span>)}
                        <input
                            type="submit"
                            className=" mt-7 text-center self-end cursor-pointer bg-zinc-700 w-40 h-10 rounded font-semibold text-white transition hover:bg-zinc-700 hover:ring-1 hover:ring-zinc-600"
                        />
                    </form>
                </div>
            ) : (
                <div className="flex flex-col bg-zinc-800 w-[30rem] h-96 transition-all rounded pt-12 items-center">
                    <p className="text-3xl mx-auto font-bold w-72 text-center">Parabéns! Seu workstation foi criado com sucesso</p>
                    <div className="mt-24 flex justify-center">
                        <div className="w-44 h-11 text-center bg-zinc-600 rounded pt-2 font-semibold text-centert">{output}</div>
                    </div>
                    <div className="text-center text-zinc-300">Código de convite</div>
                </div>
            )
            }
        </div>
    )
}
