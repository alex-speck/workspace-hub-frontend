'use client'
import Button from '@/app/components/Button';
import { useNotification } from '@/app/hooks/useNotification';
import { buscarDetalhesCancelamento, clienteCancelarReserva } from '@/app/services/reserva.service';
import { ReservaCancelamento } from '@/app/types/reserva/reserva';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function CancelarReserva() {
    const codigo = useParams().codigo as string;
    const { showError } = useNotification();
    const [success, setSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [detalhes, setDetalhes] = useState<ReservaCancelamento | null>(null);

    const buscarDetalhes = async () => {
        try {
            setDetalhes(await buscarDetalhesCancelamento(codigo));
        } catch (error: any) {
            showError(error.message || "Erro ao buscar dados da reserva");
        }
    }

    const handleConfirmarCancelar = async () => {
        try {
            setIsLoading(true);
            await clienteCancelarReserva(codigo);
            setSuccess(true);
        } catch (error: any) {
            showError(error.message || "Erro ao cancelar reserva");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        buscarDetalhes();
    }, [])

    if (detalhes === null) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="h-12 w-12 bg-slate-200 rounded-2xl"></div>
                    <div className="h-4 w-32 bg-slate-200 rounded-full"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700 relative overflow-hidden">

                {/* HEADER FIXO */}
                <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="h-14 w-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-600/20">
                        <div className="h-6 w-6 bg-white rotate-45 rounded-sm" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                            WorkSpace<span className="text-emerald-600">Hub</span>
                        </h2>
                        <p className="text-red-500 text-sm font-bold mt-1 uppercase tracking-widest">
                            {success ? "Reserva Cancelada" : "Cancelar Reserva"}
                        </p>
                    </div>
                </div>

                <div className="w-full h-px bg-slate-100 mb-8"></div>

                <div>
                    {!success ? (
                        <div className="flex flex-col gap-8">

                            {/* INSTRUÇÃO */}
                            <p className="text-center text-slate-500 text-sm font-medium">
                                Você está prestes a cancelar a reserva abaixo. Por favor, confirme os detalhes antes de prosseguir.
                            </p>

                            {/* CARD TIPO TICKET DE DETALHES */}
                            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 relative">
                                {/* Recortes laterais estilo Ticket (Opcional, dá um charme) */}
                                <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full border-r border-slate-100 -translate-y-1/2"></div>
                                <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full border-l border-slate-100 -translate-y-1/2"></div>

                                <div className="flex justify-between items-center mb-6 pb-4 border-b border-dashed border-slate-200">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Código</span>
                                    <span className="text-sm font-black text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-100 shadow-sm">
                                        #{detalhes.codigoReserva}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {/* Cliente */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Cliente</p>
                                            <p className="text-sm font-bold text-slate-800 leading-tight">{detalhes.nomeCliente}</p>
                                            <p className="text-xs font-medium text-slate-400">{detalhes.nomeEmpresa}</p>
                                        </div>
                                    </div>

                                    {/* Espaço e Localização */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Espaço</p>
                                            <p className="text-sm font-bold text-slate-800 leading-tight">{detalhes.espaco}</p>
                                            <p className="text-xs font-medium text-slate-400 truncate max-w-[200px]">{detalhes.localizacao}</p>
                                        </div>
                                    </div>

                                    {/* Data e Horário */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Data e Período</p>
                                            <p className="text-sm font-bold text-slate-800 leading-tight">{new Date(detalhes.dataReserva).toLocaleDateString()}</p>
                                            <p className="text-xs font-medium text-slate-400">{detalhes.horaInicio} às {detalhes.horaFim}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BOTÃO DE AÇÃO */}
                            <div className="pt-2">
                                <Button
                                    onClick={() => handleConfirmarCancelar()} // Apenas para simular, substitua pelo seu handler real
                                    className="w-full h-12 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 hover:border-transparent rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-none hover:shadow-lg hover:shadow-red-500/30 active:scale-95"
                                >
                                    Confirmar Cancelamento
                                </Button>
                            </div>

                        </div>
                    ) : (

                        /* ESTADO DE SUCESSO */
                        <div className="flex flex-col items-center justify-center gap-6 py-6 animate-in zoom-in-95 duration-500">
                            <div className="relative">
                                {/* Fundo decorativo suave */}
                                <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-50 scale-150"></div>

                                {/* O seu SVG estilizado */}
                                <svg className="w-32 h-32 relative z-10" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="55" y="75" width="120" height="130" rx="12" fill="#F8FAFC" />
                                    <rect x="45" y="65" width="120" height="130" rx="12" fill="#FFFFFF" stroke="#0F172A" strokeWidth="8" />
                                    <path d="M45 105H165" stroke="#0F172A" strokeWidth="8" />
                                    <rect x="65" y="45" width="12" height="40" rx="6" fill="#0F172A" stroke="#0F172A" strokeWidth="4" />
                                    <rect x="135" y="45" width="12" height="40" rx="6" fill="#0F172A" stroke="#0F172A" strokeWidth="4" />
                                    <line x1="80" y1="135" x2="130" y2="185" stroke="#EF4444" strokeWidth="10" strokeLinecap="round" />
                                    <line x1="130" y1="135" x2="80" y2="185" stroke="#EF4444" strokeWidth="10" strokeLinecap="round" />
                                    <circle cx="175" cy="185" r="35" fill="#22C55E" stroke="#FFFFFF" strokeWidth="8" />
                                    <path d="M158 185L170 197L192 175" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <div className="text-center space-y-2">
                                <h1 className="text-xl font-black text-slate-900 tracking-tight">Feito!</h1>
                                <p className="text-slate-500 text-sm font-medium">
                                    A reserva foi cancelada com sucesso no sistema. Você já pode fechar esta aba.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default CancelarReserva