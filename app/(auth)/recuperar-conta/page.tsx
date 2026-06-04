'use client'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { recuperarContaUsuario } from '@/app/services/auth.service';
import Link from 'next/link';
import { useState } from 'react'

function RecuperarConta() {
    const [mensagem, setMensagem] = useState<string>("");

    const handleRecuperarSenha = async (formData: FormData) => {
        const email = formData.get("email")?.toString() || "";

        try {
            await recuperarContaUsuario(email);
            setMensagem(`Email enviado para: ${email}`);
        } catch (error: any) {
            console.log();
        }
    }


    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* HEADER / LOGO */}
                <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="h-14 w-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-600/20">
                        <div className="h-6 w-6 bg-white rotate-45 rounded-sm" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                            WorkSpace<span className="text-emerald-600">Hub</span>
                        </h2>
                        <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">
                            Recuperação de Conta
                        </p>
                    </div>
                </div>

                {/* LINHA DIVISÓRIA */}
                <div className="w-full h-px bg-slate-100 mb-8"></div>

                {/* FORMULÁRIO */}
                <div>
                    <form action={handleRecuperarSenha} className="flex flex-col gap-6">

                        {/* INSTRUÇÃO PREVIA */}
                        <div className="text-center mb-2">
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                Digite o email associado à sua conta corporativa. Enviaremos as instruções para redefinir sua senha.
                            </p>
                        </div>

                        {/* INPUTS */}
                        <div className="space-y-4">
                            <Input
                                label="Email corporativo"
                                name="email"
                                type="email"
                                placeholder="exemplo@suaempresa.com.br"
                                required
                            />
                        </div>

                        {/* MENSAGEM DE FEEDBACK CONDICIONAL */}
                        {mensagem && (
                            <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold rounded-2xl text-center animate-in fade-in zoom-in-95 duration-300">
                                {mensagem}
                            </div>
                        )}

                        {/* BOTÃO */}
                        <div className="pt-2">
                            <Button className="w-full h-12 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-slate-900/10 active:scale-95">
                                Enviar Link de Acesso
                            </Button>
                        </div>

                    </form>
                </div>

                {/* FOOTER: VOLTAR AO LOGIN */}
                <div className="mt-10 text-center">
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Voltar para o Login
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default RecuperarConta