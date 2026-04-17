'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ClientesForm from '../../components/ClientesForm'
import { useParams, useRouter } from 'next/navigation'
import Cliente from '@/app/types/cliente/cliente'
import { ClientesMock } from '@/app/mock/cliente'
import axios from 'axios'

export default function EditarCliente() {
    const params = useParams()
    const router = useRouter()

    const [cliente, setCliente] = useState<Cliente | null>(null)

    const id = Number(params.id)

    useEffect(() => {
        buscarDados()
    }, [])

    const buscarDados = async () => {
        try {
            const response = await axios.get("http://localhost:8080/clientes/" + id);

            if (response.status === 200) setCliente(response.data)
            else router.push("/clientes")
        } catch (error) {
            console.error(error)
        }
    }

    

    if (!cliente) return (<div className="p-8">Carregando...</div>)

    return (
        <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl">

                <div className="flex items-center gap-6 mb-10">
                    <Link
                        href="/clientes"
                        className="group flex items-center justify-center w-12 h-12 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-400 hover:text-emerald-600 transition-all active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </Link>

                    <div>
                        <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.2em]">Gestão de CRM</span>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            Editar <span className="text-emerald-600">Cliente</span>
                        </h1>
                        <p className="text-sm text-slate-400 font-medium">
                            Atualizando: <span className="text-slate-600 font-bold">{cliente?.nome || 'Carregando...'}</span>
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-900/5 border border-slate-100 p-10 relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                    <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                        <div className="h-full bg-emerald-500 w-full opacity-20" />
                    </div>

                    <div className="mb-8 flex justify-between items-start">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Modificar Dados</h2>
                            <p className="text-sm text-slate-500 font-medium">Altere as informações de contato e documentos do cliente.</p>
                        </div>

                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${cliente?.status === "ATIVO" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                            }`}>
                            {cliente?.status || 'Status'}
                        </span>
                    </div>

                    <ClientesForm clienteExistente={cliente} />
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <p className="text-xs font-medium italic">
                        As alterações de documento podem afetar faturas pendentes.
                    </p>
                </div>
            </div>
        </div>
    )
}
