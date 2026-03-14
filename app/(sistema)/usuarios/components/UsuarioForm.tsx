'use client'
import { UsuarioMock } from '@/app/mock/usuario';
import Usuario from '@/app/model/Usuario'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface UsuarioFormProps {
    usuarioExistente?: Usuario
}

export default function UsuarioForm({ usuarioExistente }: UsuarioFormProps) {

    const router = useRouter()
    const [usuario, setUsuario] = useState<Usuario>(usuarioExistente || new Usuario(0, '', '', true));



    const handleChange = (campo: 'nome' | 'cpf', valor: string) => {
        setUsuario(prev =>
            new Usuario(
                prev.codigo,
                campo === 'nome' ? valor : prev.name,
                campo === 'cpf' ? valor : prev.cpf,
                prev.ativo
            )
        )
    }

    const handleSalvar = async (formData: FormData) => {
        await UsuarioMock.salvar(usuario);
        alert("Usuario salvo com sucesso!");

        router.push("/usuarios");
    }

    return (
        <form action={handleSalvar} className="space-y-8">
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-slate-400 ml-1">
                        Nome Completo
                    </label>
                    <div className="relative group">
                        <input
                            type="text"
                            value={usuario.name}
                            required
                            onChange={(e) => handleChange('nome', e.target.value)}
                            placeholder="João da Silva"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300 placeholder:font-normal"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-slate-400 ml-1">
                        CPF
                    </label>
                    <div className="relative group">
                        <input
                            type="text"
                            value={usuario.cpf}
                            maxLength={14}
                            required
                            onChange={(e) => handleChange('cpf', e.target.value)}
                            placeholder="000.000.000-00"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300 placeholder:font-normal"
                        />
                    </div>
                </div>

                <div className="h-px bg-slate-100 my-8" />
                <div className="flex items-center justify-end gap-4">
                    <Link
                        href="/usuarios"
                        className="px-8 py-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors hover:cursor-pointer rounded-2xl hover:bg-slate-50"
                    >
                        Cancelar
                    </Link>

                    <button
                        type="submit"
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-slate-900/10 transition-all active:scale-95 hover:cursor-pointer flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </form>
    )
}
