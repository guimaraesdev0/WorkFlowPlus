import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ServiceInterface, UserInterface } from '@/models';
import api from '../../../services/api.service';
import axios from 'axios';

interface Props {
    workstationid: string;
    services: ServiceInterface[];
    userData: UserInterface,
    totalPages: number;
}

const PAGE_SIZE = 20;

const ServiceList = ({ services, totalPages, workstationid, userData }: Props) => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(Number(router.query.page) || 1);
    const [limit] = useState(PAGE_SIZE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [servicesData, setServicesData] = useState(services);
    console.log(servicesData)

    useEffect(() => {
        setLoading(true);
        setError(false);

        api
            .get(`/services?workstationId=${workstationid}&page=${currentPage}&limit=${limit}`)
            .then((response) => {
                setLoading(false);
                setServicesData(response.data.data);
            })
            .catch((error) => {
                setLoading(false);
                setError(true);
                console.error(error);
            })
    }, [currentPage, limit]);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(

                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={currentPage === i ? 'btn btn-primary active' : 'btn btn-primary'}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <div>
            {loading ? (
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : error ? (
                <p>:( um erro interno ocorreu, confira o console e mande um e-mail para equipe técnica do WorkFlow Plus</p>
            ) : servicesData.length == 0 ? (
                <div className="text-center">
                    <p className='fs-1'>Nenhum serviço foi cadastrado.</p>
                    <hr />
                    <p className='fs-3'>Assim que um superior lançar um novo serviço irá aparecer aqui!</p>
                </div>
            ) : (

                <>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead
                                            className=" bg-black font-medium  text-center">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">ID</th>
                                                <th scope="col" className="px-6 py-4">Titulo</th>
                                                <th scope="col" className="px-6 py-4 max-h-1">Descrição</th>
                                                <th scope="col" className="px-6 py-4">Local </th>
                                                <th scope="col" className="px-6 py-4">Hora</th>
                                                <th scope="col" className="px-6 py-4">Requisitor</th>
                                                <th scope="col" className="px-6 py-4">prioridade</th>
                                                <th scope="col" className="px-6 py-4">status</th>
                                                <th scope="col" className="px-6 py-4">Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {servicesData.map((service: ServiceInterface, i) => {
                                                return (
                                                    <tr className=" bg-black" key={i}>
                                                        <th className="whitespace-nowrap px-6 py-4 font-medium text-center" scope="row">{i}</th>
                                                        <td className="whitespace-nowrap px-6 py-4 text-center">{service.title}</td>
                                                        <td className="px-6 py-4 break-words max-h-1">{service.description}</td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-center">{service.place}</td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-center">{service.created_date}</td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-center">{service.requester}</td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-center">{service.priority == 0 ? <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-700 dark:text-gray-300">Baixa</span> : service.priority == 1 ? <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-700 dark:text-gray-300">Média</span> : service.priority == 2 ? <span className="bg-gray-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-700 dark:text-gray-300">Alta</span> : <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-700 dark:text-gray-300">Error!</span>}</td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-center">{service.status == 0 ? <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Aguardando</span> : service.status == 1 ? <span className="bg-gray-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-700 dark:text-gray-300">Andamento</span> : service.status == 2 ? <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-700 dark:text-gray-300">Concluido</span> : <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-700 dark:text-gray-300">Error!</span>}</td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-center">{service.status == 0 ? <><button className="bg-green-700 hover:bg-green-600 rounded h-8 w-24 disabled:bg-green-900 transition disabled:text-gray-300" disabled>Concluir</button>
                                                        <button className="bg-blue-700 rounded h-8 w-24 hover:bg-blue-600 transition" onClick={() => service_status(service.id, 1)}>Iniciar</button></> : service.status == 1 ? <><button className="bg-green-700 hover:bg-green-600 rounded h-8 w-24 disabled:bg-green-900 transition" onClick={() => service_status(service.id, 2)}>Concluir</button> <button className="bg-blue-700 rounded h-8 w-24 disabled:bg-blue-900 transition disabled:text-gray-300" disabled>Iniciar</button></> : <><button className="bg-green-700 hover:bg-green-600 rounded h-8 w-24 disabled:bg-green-900 disabled:text-gray-300 transition" disabled>Concluir</button> <button className="bg-blue-700 rounded h-8 w-24 disabled:bg-blue-900 disabled:text-gray-300 transition" disabled>Iniciar</button></>} <button className="bg-red-700 hover:bg-red-900 rounded h-8 w-24 disabled:bg-red-900 disabled:text-gray-300 transition" onClick={() => service_status(service.id, 0)}>Reiniciar</button></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    <div className="pagination h-10">{renderPagination()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
    async function service_status(id: string, status: any) {
        if (status == 1) {
            await axios({
                method: 'patch',
                url: '/api/v1/services',
                data: {
                    id: id,
                    status: status
                }
            })
                .then(() => {
                    console.log(`Alterado com sucesos id: ${id}, status: ${status}`);
                    const servicesCopy = [...servicesData]; 
                    const serviceIndex = servicesCopy.findIndex(service => service.id === id); 
                    servicesCopy[serviceIndex].status = status; 
                    setServicesData(servicesCopy); 
                })
                .catch(() => {
                    console.log("Ocorreu um erro ao atualizar o serviço");
                })
        }
        if (status == 2) {
            await axios({
                method: 'patch',
                url: '/api/v1/services',
                data: {
                    id: id,
                    status: status
                }
            })
                .then(() => {
                    console.log(`Alterado com sucesos id: ${id}, status: ${status}`);
                    const servicesCopy = [...servicesData]; 
                    const serviceIndex = servicesCopy.findIndex(service => service.id === id); 
                    servicesCopy[serviceIndex].status = status; 
                    setServicesData(servicesCopy); 
                })
                .catch(() => {
                    console.log("Ocorreu um erro ao atualizar o serviço");
                })
        }

        if (status == 0) {
            await axios({
                method: 'patch',
                url: '/api/v1/services',
                data: {
                    id: id,
                    status: status
                }
            })
                .then(() => {
                    console.log(`Alterado com sucesos id: ${id}, status: ${status}`);
                    const servicesCopy = [...servicesData]; 
                    const serviceIndex = servicesCopy.findIndex(service => service.id === id); 
                    servicesCopy[serviceIndex].status = status; 
                    setServicesData(servicesCopy); 
                })
                .catch(() => {
                    console.log("Ocorreu um erro ao atualizar o serviço");
                })
        }

    }
};



export default ServiceList;
