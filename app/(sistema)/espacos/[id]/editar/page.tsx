'use client'
import Espaco from '@/app/types/espacos/espaco'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import EspacosForm from '../../components/EspacosForm'
import { formatarEnum } from '@/app/utils/utils'
import { buscarEspacoPorId } from '@/app/services/espacoService'

export default function EditarEspaco() {
    const params = useParams()
    const router = useRouter()

    const [espaco, setEspaco] = useState<Espaco | null>(null)

    const id = Number(params.id)

    useEffect(() => {
        buscarDados()
    }, [])

    const buscarDados = async () => {
        try {
            setEspaco(await buscarEspacoPorId(id))
        } catch (error) {
            router.push("/espacos")
        }
    }

    if (!espaco) return (<div className="p-8">Carregando...</div>)

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
                        <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.2em]">Configurações de Ativo</span>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            Editar <span className="text-slate-400">Espaço</span>
                        </h1>
                        <p className="text-sm text-slate-500 font-medium">
                            Identificação: <span className="text-emerald-600 font-bold">{espaco.nomeNumero}</span>
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-900/5 border border-slate-100 p-10 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">

                    <div className="absolute top-0 left-0 w-full h-2 bg-slate-100" />

                    <div className="mb-10 flex items-start justify-between">
                        <div className="max-w-[70%]">
                            <h2 className="text-lg font-bold text-slate-800">Atualizar Ativo</h2>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                Modifique as propriedades comerciais e o tipo de reserva para este espaço específico.
                            </p>
                        </div>

                        <div className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter block text-center">Tipo Atual</span>
                            <span className="text-xs font-bold text-slate-700 block text-center leading-none mt-1">{formatarEnum(espaco.tipo)}</span>
                        </div>
                    </div>

                    <EspacosForm espacoExistente={espaco} />
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">
                        ID Único do Sistema: <span className="font-mono text-slate-300">{espaco.id}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
