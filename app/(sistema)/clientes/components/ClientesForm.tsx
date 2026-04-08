'use client'
import { useClientes } from '@/app/context/ClientesContext'
import { ClientesMock } from '@/app/mock/cliente'
import Cliente from '@/app/model/Cliente'
import { formatarCpfCnpj } from '@/app/utils/utils'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'



interface ClientesFormProps {
    clienteExistente?: Cliente
}


export default function ClientesForm({ clienteExistente }: ClientesFormProps) {
    const router = useRouter()
    const context = useClientes();
    const [cliente, setCliente] = useState<Cliente>(clienteExistente || new Cliente(0, '', '', '', ''))

    const handleChange = (campo: 'name' | 'email' | 'phone' | 'documento', valor: string) => {
        setCliente(prev =>
            new Cliente(
                prev.id,
                campo === 'name' ? valor : prev.nome,
                campo === 'phone' ? valor : prev.telefone,
                campo === 'documento' ? valor : prev.documento,
                prev.status
            )
        )
    }

    const handleCpfChange = (documento: string) => {
        if (!cliente) return;

        const formatado = formatarCpfCnpj(documento);

        setCliente({...cliente, documento: formatado});
    }

    const handleSalvar = async (formData: FormData) => {
        if (cliente.documento.length < 14) {
            alert("CPF/CNPJ inválido. Certifique-se de preencher corretamente.");
            return;
        }

        try {
            if (clienteExistente) {
                const response = await axios.put(`http://localhost:8080/clientes/${clienteExistente.id}`, {
                    nome: cliente.nome,
                    telefone: cliente.telefone,
                    documento: cliente.documento
                })
                if (response.status === 200) {
                    context.guardarCliente(response.data)
                }
                router.push("/clientes")
            } else {
                await axios.post('http://localhost:8080/clientes', {
                    nome: cliente.nome,
                    telefone: cliente.telefone,
                    documento: cliente.documento
                })
                router.push("/clientes")
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <form action={handleSalvar} className="space-y-8">
            <div className="space-y-6">

                <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-slate-400 ml-1">
                        Nome Completo
                    </label>
                    <input
                        type="text"
                        value={cliente.nome}
                        required
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Nome do cliente ou empresa"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300 placeholder:font-normal"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-slate-400 ml-1">
                            Telefone
                        </label>
                        <input
                            type="text"
                            value={cliente.telefone}
                            required
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder="(99) 99999-9999"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300 placeholder:font-normal"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-slate-400 ml-1">
                            Documento (CPF/CNPJ)
                        </label>
                        <input
                            type="text"
                            value={cliente.documento}
                            required
                            onChange={(e) => { handleChange("documento", e.target.value); handleCpfChange(e.target.value) }}
                            placeholder="000.000.000-00"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300 placeholder:font-normal"
                        />
                    </div>
                </div>

                {/* Divisor */}
                <div className="h-px bg-slate-100 my-8" />

                {/* Ações */}
                <div className="flex items-center justify-end gap-4">
                    <Link
                        href="/clientes"
                        className="px-8 py-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors hover:cursor-pointer rounded-2xl hover:bg-slate-50"
                    >
                        Cancelar
                    </Link>

                    <button
                        type="submit"
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-slate-900/10 transition-all active:scale-95 hover:cursor-pointer flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-emerald-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Confirmar Cadastro
                    </button>
                </div>
            </div>
        </form>
    )
}
