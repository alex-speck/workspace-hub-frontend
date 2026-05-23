'use client'
import { GenericCombobox } from '@/app/components/GenericCombobox';
import { buscarListaClientes } from '@/app/services/cliente.service';
import { buscarListaEspacos } from '@/app/services/espaco.service';
import { criarReserva } from '@/app/services/reserva.service';
import Cliente from '@/app/types/cliente/cliente'
import Espaco from '@/app/types/espacos/espaco';
import ReservaRequest from '@/app/types/reserva/reserva.request';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useMemo } from 'react'

export default function NovaReserva() {
    const router = useRouter()

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [espacos, setEspacos] = useState<Espaco[]>([]);

    const [request, setRequest] = useState<ReservaRequest>(new ReservaRequest(0, 0, new Date(), new Date()));
    const [dataBase, setDataBase] = useState(new Date().toISOString().split("T")[0]);

    const hoje = new Date().toISOString().split("T")[0];

    const atualizarDataHora = (tipo: 'inicio' | 'fim', horaMinuto: string, dataStr: string) => {
        return new Date(`${dataStr}T${horaMinuto}:00`);
    };

    const handleChange = (campo: string, valor: any) => {
        if (campo === "data") {
            const novaData = valor;
            setDataBase(novaData);
            setRequest(prev => ({
                ...prev,
                dataHoraInicio: atualizarDataHora('inicio', prev.dataHoraInicio.toTimeString().slice(0, 5), novaData),
                dataHoraFim: atualizarDataHora('fim', prev.dataHoraFim.toTimeString().slice(0, 5), novaData)
            } as ReservaRequest));
            return;
        }

        setRequest(prev => {
            const novoRequest = { ...prev };
            if (campo === "cliente") novoRequest.clienteId = valor;
            if (campo === "espaco") novoRequest.espacoId = valor;
            if (campo === "inicio") novoRequest.dataHoraInicio = atualizarDataHora('inicio', valor, dataBase);
            if (campo === "fim") novoRequest.dataHoraFim = atualizarDataHora('fim', valor, dataBase);
            return novoRequest as ReservaRequest;
        });
    }

    const totalHoras = () => {
        const diff = request.dataHoraFim.getTime() - request.dataHoraInicio.getTime();
        if (diff <= 0) return 0;
        return parseFloat((diff / (1000 * 60 * 60)).toFixed(2));
    }

    const valorTotal = useMemo(() => {
        const espaco = espacos.find(e => e.id === request.espacoId);
        if (espaco && totalHoras() > 0) {
            return espaco.valorHora * totalHoras();
        }
        return 0;
    }, [request, espacos]);

    const buscarDados = async () => {
        try {
            const [listaClientes, listaEspacos] = await Promise.all([
                buscarListaClientes(),
                buscarListaEspacos()
            ]);
            setClientes(listaClientes);
            setEspacos(listaEspacos);
        } catch (error) {
            console.error(error);
        }
    }

    const handleCriarReserva = async () => {
        try {
            await criarReserva(request);
            alert("Reserva cadastrada com sucesso!");
            router.push("/reservas");
        } catch (error: any) {
            alert(error.message || "Erro ao cadastrar reserva!");
        }
    }

    useEffect(() => {
        buscarDados();
    }, []);

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
                <form action={handleCriarReserva} 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Espaço</label>
                        <GenericCombobox
                            items={espacos}
                            getValue={(e) => e.id}
                            getLabel={(e) => e.nomeNumero}
                            onChange={(e) => handleChange("espaco", e ? e.id : null)}
                        />
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Cliente</label>
                        <GenericCombobox
                            items={clientes}
                            getValue={(c) => c.id}
                            getLabel={(c) => c.nome}
                            onChange={(c) => handleChange("cliente", c ? c.id : null)}
                        />
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Data da Reserva</label>
                        <input
                            required
                            type="date"
                            min={hoje}
                            value={dataBase}
                            onChange={(e) => handleChange("data", e.target.value)}
                            className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Início</label>
                        <input
                            required
                            type="time"
                            onChange={(e) => handleChange("inicio", e.target.value)}
                            className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 transition-all text-slate-900"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Término</label>
                        <input
                            required
                            type="time"
                            onChange={(e) => handleChange("fim", e.target.value)}
                            className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 transition-all text-slate-900"
                        />
                    </div>

                    <div className="md:col-span-2 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 flex justify-between items-center">
                        <div>
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Estimativa de Valor</p>
                            <p className="text-2xl font-black text-slate-900 leading-none">
                                {valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duração</p>
                            <p className="text-sm font-bold text-slate-600">{totalHoras()} horas</p>
                        </div>
                    </div>

                    <div className="md:col-span-2 pt-4">
                        <button
                            type='submit'
                            className="w-full py-5 rounded-[2rem] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 bg-slate-900 text-white hover:bg-emerald-600"
                        >
                            Confirmar Agendamento
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}