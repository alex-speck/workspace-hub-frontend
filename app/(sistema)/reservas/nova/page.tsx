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
import { useNotification } from '@/app/hooks/useNotification';

export default function NovaReserva() {
    const router = useRouter()
    const { showError, showSuccess } = useNotification()

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [espacos, setEspacos] = useState<Espaco[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [request, setRequest] = useState<ReservaRequest>({
        clienteId: 0,
        espacoId: 0,
        data: new Date().toISOString().split("T")[0],
        horaInicio: "",
        horaFim: ""
    });

    const hoje = new Date().toISOString().split("T")[0];

    const handleChange = (campo: string, valor: any) => {
        setRequest(prev => ({
            ...prev,
            [campo]: valor
        }));
    }

    const totalHoras = () => {
        if (!request.horaInicio || !request.horaFim) return 0;
        const [h1, m1] = request.horaInicio.split(":").map(Number);
        const [h2, m2] = request.horaFim.split(":").map(Number);
        const inicio = h1 + m1 / 60;
        const fim = h2 + m2 / 60;
        const diff = fim - inicio;
        if (diff <= 0) return 0;
        return parseFloat(diff.toFixed(2));
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

    const handleCriarReserva = async (e: React.FormEvent) => {
        e.preventDefault();
        if (request.clienteId === 0 || request.espacoId === 0) {
            showError("Selecione um cliente e um espaço.", "Validação");
            return;
        }
        try {
            setIsLoading(true);
            await criarReserva(request);
            showSuccess("Reserva cadastrada com sucesso!");
            router.push("/reservas");
        } catch (error: any) {
            showError(error.message || "Erro ao cadastrar reserva!");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        buscarDados();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-6 mb-10">
                <Link
                    href="/reservas"
                    className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 hover:shadow-xl transition-all group active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </Link>

                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Nova Reserva</h1>
                    <p className="text-slate-500 font-medium mt-1">Agende um novo período de uso para seus clientes.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-200/40">
                        <form onSubmit={handleCriarReserva} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Espaço de Trabalho</label>
                                    <GenericCombobox
                                        items={espacos}
                                        getValue={(e) => e.id}
                                        getLabel={(e) => `${e.nomeNumero} - ${e.tipo.replace('_', ' ')}`}
                                        onChange={(e) => handleChange("espacoId", e ? e.id : 0)}
                                        placeholder="Pesquise pelo nome ou número do espaço"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Cliente</label>
                                    <GenericCombobox
                                        items={clientes}
                                        getValue={(c) => c.id}
                                        getLabel={(c) => c.nome}
                                        onChange={(c) => handleChange("clienteId", c ? c.id : 0)}
                                        placeholder="Selecione o cliente"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Data da Reserva</label>
                                    <div className="relative">
                                        <input
                                            required
                                            type="date"
                                            min={hoje}
                                            value={request.data}
                                            onChange={(e) => handleChange("data", e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Horário de Início</label>
                                    <input
                                        required
                                        type="time"
                                        value={request.horaInicio}
                                        onChange={(e) => handleChange("horaInicio", e.target.value)}
                                        className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Horário de Término</label>
                                    <input
                                        required
                                        type="time"
                                        value={request.horaFim}
                                        onChange={(e) => handleChange("horaFim", e.target.value)}
                                        className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type='submit'
                                    disabled={isLoading}
                                    className="w-full py-5 rounded-[2rem] font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/10 active:scale-[0.98] bg-slate-900 text-white hover:bg-emerald-600 disabled:bg-slate-300 disabled:shadow-none"
                                >
                                    {isLoading ? 'Processando...' : 'Confirmar Agendamento'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-600/20 flex flex-col justify-between h-48 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative">
                            <p className="text-[10px] font-black text-emerald-100 uppercase tracking-[0.2em] mb-1">Total Estimado</p>
                            <h2 className="text-4xl font-black tracking-tighter">
                                {valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h2>
                        </div>
                        <div className="relative flex justify-between items-end border-t border-white/20 pt-4">
                            <div>
                                <p className="text-[10px] font-black text-emerald-100 uppercase tracking-[0.2em]">Duração</p>
                                <p className="text-lg font-bold">{totalHoras()} <span className="text-sm font-medium opacity-80">horas</span></p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 opacity-20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            Resumo do Espaço
                        </h3>
                        {request.espacoId ? (
                            <div className="space-y-4 animate-in fade-in duration-500">
                                {espacos.find(e => e.id === request.espacoId) && (
                                    <>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome/Número</p>
                                            <p className="font-bold text-slate-700">{espacos.find(e => e.id === request.espacoId)?.nomeNumero}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor por Hora</p>
                                            <p className="font-bold text-slate-700">{formatarValor(espacos.find(e => e.id === request.espacoId)?.valorHora || 0)}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400 font-medium italic">Selecione um espaço para ver os detalhes.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}