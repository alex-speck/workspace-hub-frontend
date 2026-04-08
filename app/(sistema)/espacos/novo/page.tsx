import Link from 'next/link'
import React from 'react'
import EspacosForm from '../components/EspacosForm'

export default function NovoEspaco() {
    return (
        <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl">

                <div className="flex items-center gap-6 mb-10">
                    <Link
                        href="/espacos"
                        className="group flex items-center justify-center w-12 h-12 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-400 hover:text-emerald-600 transition-all active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </Link>

                    <div>
                        <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">Infraestrutura</span>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            Criar Novo <span className="text-emerald-600">Espaço</span>
                        </h1>
                        <p className="text-sm text-slate-400 font-medium">Adicione novas estações de trabalho ou salas privativas.</p>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-900/5 border border-slate-100 p-10 relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-20" />

                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-slate-800">Detalhes da Unidade</h2>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed text-pretty">
                            Defina o nome de identificação e o valor comercial para locação por hora deste espaço.
                        </p>
                    </div>

                    <EspacosForm />
                </div>

                <div className="mt-8 flex items-center justify-center gap-3 py-4 px-6 bg-slate-200/30 rounded-2xl border border-slate-200/50">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                        Novos espaços são listados automaticamente no Dashboard de Reservas
                    </p>
                </div>
            </div>
        </div>
    )
}
