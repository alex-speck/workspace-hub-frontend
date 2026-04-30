'use client'
import { GenericCombobox } from '@/app/components/GenericCombobox';
import { buscarListaClientes } from '@/app/services/clienteService';
import { buscarListaEspacos } from '@/app/services/espacoService';
import Cliente from '@/app/types/cliente/cliente'
import Espaco from '@/app/types/espacos/espaco';
import ReservaRequest from '@/app/types/reserva/reservaRequest';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function NovaReserva() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [espacos, setEspacos] = useState<Espaco[]>([]);
    const [request, setRequest] = useState<ReservaRequest>(new ReservaRequest(0, 0, new Date(), new Date()));


    const handleChange = (campo: string, valor: number | Date) => {
        setRequest(prev =>
            new ReservaRequest(
                campo === "cliente" ? valor as number : prev.clienteId,
                campo === "espaco" ? valor as number : prev.espacoId,
                campo === "inicio" ? valor as Date : prev.dataHoraInicio,
                campo === "fim" ? valor as Date : prev.dataHoraFim
            )
        )

        console.log(request)
    }

    const buscarDadosClienteEspaco = async () => {
        try {
            setClientes(await buscarListaClientes())
            setEspacos(await buscarListaEspacos())
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        buscarDadosClienteEspaco()
    }, [])

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            <div className="flex items-center gap-4 mb-10">
                <Link
                    href="/reservas"
                    className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 hover:shadow-md transition-all group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Criar Reserva</h1>
                    <p className="text-sm text-slate-500 font-medium">Agende um novo período de uso para seus clientes.</p>
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Selecione o Espaço</label>
                        <GenericCombobox
                            items={espacos}
                            getValue={(e) => e.id}
                            getLabel={(e) => e.nomeNumero}
                            onChange={(e) => handleChange("espaco", e.id)}
                            className={"px - 5 py-4 bg-slate-50 border-slate-100 rounded-2xl"}
                        />
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Selecione o Cliente</label>
                        <GenericCombobox
                            items={clientes}
                            getValue={(c) => c.id}
                            getLabel={(c) => c.nome}
                            onChange={(c) => handleChange("cliente", c.id)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Início da Reserva</label>
                        <input
                            type="datetime-local"
                            className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium appearance-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Término da Reserva</label>
                        <input
                            type="datetime-local"
                            className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium appearance-none"
                        />
                    </div>

                    <div className="md:col-span-2 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 flex justify-between items-center">
                        <div>
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Estimativa de Valor</p>
                            <p className="text-2xl font-black text-slate-900 leading-none">R$ 0,00</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Duração</p>
                            <p className="text-sm font-bold text-slate-600">-- horas</p>
                        </div>
                    </div>

                    <div className="md:col-span-2 pt-4">
                        <button
                            className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 bg-slate-900 text-white hover:bg-emerald-600 shadow-slate-900/10`}
                        >
                            Confirmar Agendamento
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
