'use client'

import { useState } from "react";
import { FaturamentoResumo } from "@/app/types/dashboard/dashboard";

interface RevenueChartProps {
    data: FaturamentoResumo;
}

export default function RevenueChart({ data }: RevenueChartProps) {
    const [period, setPeriod] = useState<'diario' | 'semanal' | 'mensal'>('diario');

    const currentData = data[period];
    const maxValue = Math.max(...currentData.map(d => d.valor), 1);

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-900/5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Gráfico de Faturamento</h3>
                    <p className="text-sm text-slate-500 font-medium">Acompanhamento de receita por período</p>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl">
                    {(['diario', 'semanal', 'mensal'] as const).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                                period === p 
                                ? 'bg-white text-emerald-600 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative h-64 w-full flex items-end justify-between gap-2 pt-10">
                {/* Linhas de grade simples */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-b border-slate-100">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full border-t border-slate-50" />
                    ))}
                </div>

                {currentData.map((d, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center group relative z-10">
                        <div 
                            className="w-full max-w-[40px] bg-emerald-500 rounded-t-lg transition-all duration-300 relative flex items-end justify-center group-hover:bg-emerald-600 shadow-sm"
                            style={{ 
                                height: `${(d.valor / maxValue) * 100}%`,
                                animation: `growUp 1s ease-out forwards ${index * 0.1}s`,
                                opacity: 0
                            }}
                        >
                            {/* Tooltip */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                                R$ {d.valor.toLocaleString('pt-BR')}
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-tighter truncate w-full text-center">
                            {d.periodo}
                        </span>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes growUp {
                    from { 
                        height: 0%;
                        opacity: 0;
                    }
                    to { 
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}
