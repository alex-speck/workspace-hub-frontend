'use client'
import Usuario from '@/app/types/usuarios/usuario'
import { UsuarioFormProps } from '@/app/types/usuarios/usuarioForm';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { useConfirm } from '@/app/context/ConfirmContext';
import { editarUsuario, criarUsuario } from '@/app/services/usuarioService';



export default function UsuarioForm({ usuarioExistente }: UsuarioFormProps) {
    const { alert } = useConfirm();
    const router = useRouter()
    const [usuario, setUsuario] = useState<Usuario>(usuarioExistente || new Usuario(null, '', '', "ATIVO"));



    const handleChange = (campo: 'nome' | 'email', valor: string) => {
        setUsuario(prev =>
            new Usuario(
                prev.id,
                campo === 'nome' ? valor : prev.nome,
                campo === 'email' ? valor : prev.email,
                prev.status
            )
        )
    }

    const handleSalvar = async (formData: FormData) => {

        if (usuarioExistente) {
            
            await editarUsuario(usuario);
            await alert("Usuario editado com sucesso!", true, `Usuario #${usuario.id} atualizado!`);
        } else {
            
            await criarUsuario(usuario);
            await alert("Usuario salvo com sucesso!", true, `Criado!`);
        
        }



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
                            value={usuario.nome}
                            required
                            onChange={(e) => handleChange('nome', e.target.value)}
                            placeholder="João da Silva"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300 placeholder:font-normal"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-slate-400 ml-1">
                        Email
                    </label>
                    <div className="relative group">
                        <input
                            type="email"
                            value={usuario.email}
                            required
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="usuario@email.com"
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
