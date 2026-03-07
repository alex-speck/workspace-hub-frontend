'use client'
import { useAuth, Usuario } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Login() {

    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = async (formData:FormData) => {
        
        const email = formData.get("email");
        const senha = formData.get("senha");
        
        try {
            // Validar na API

            const usuarioMock = new Usuario(1, "Usuario Teste");
            const tokenMock = "jwt-token"

            login(usuarioMock, tokenMock);

        } catch{
            alert("Erro ao entrar no sistema!")
        }

        console.log(`Autenticado com email: ${email}`)

        router.push("/dashboard")
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-slate-50 px-4'>
            <div className="w-full max-w-md bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-2xl shadow-slate-200/50">

                <div className="flex flex-col items-center gap-4 mb-10">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                        <div className="h-5 w-5 bg-white rotate-45 rounded-sm" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                            WorkSpace<span className="text-emerald-600"> Hub</span>
                        </h2>
                        <p className="text-slate-500 text-sm font-medium mt-1">Acesse sua unidade de gestão</p>
                    </div>
                </div>

                <form className="space-y-6" action={handleLogin}>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-slate-400 ml-1">
                            E-mail Institucional
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder='ex: gestao@unidade.com'
                                name='email'
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-400 text-slate-700"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs uppercase tracking-widest font-bold text-slate-400">
                                Senha de Acesso
                            </label>
                            {/* <a href="#" className="text-xs font-bold text-emerald-600 hover:underline">Esqueceu?</a> */}
                        </div>
                        <input
                            type="password"
                            name='senha'
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-700"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2 group hover:cursor-pointer"
                    >
                        <span>Entrar no Painel</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </form>

                <p className="text-center text-slate-400 text-xs mt-10">
                    Sistema de Gestão Multi-Tenant
                </p>
            </div>
        </div>
    )
}
