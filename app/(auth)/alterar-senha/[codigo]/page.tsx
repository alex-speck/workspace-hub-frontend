'use client'
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { useNotification } from '@/app/hooks/useNotification';
import { alterarSenhaUsuario } from '@/app/services/auth.service';
import AlterarSenha from '@/app/types/authentication/alterar.senha';
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

function RecuperarSenha() {
    const router = useRouter();
    const { showError, showSuccess } = useNotification();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const codigo = useParams().codigo as string;
    const [request, setRequest] = useState<AlterarSenha>({
        token: codigo,
        senha: "",
        confirmacaoSenha: ""
    });

    const handleChange = (campo: string, valor: string) => {
        setRequest(prev => ({
            ...prev,
            [campo]: valor
        }))
    }

    const handleConfirmar = async () => {
        try {
            setIsLoading(true);
            await alterarSenhaUsuario(request);
            showSuccess("Senha alterada com sucesso!");
            router.push('/login');
        } catch (error: any) {
            showError(error?.message)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* HEADER / LOGO */}
                <header className="flex flex-col items-center gap-4 mb-8">
                    <div className="h-14 w-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-600/20">
                        <div className="h-6 w-6 bg-white rotate-45 rounded-sm" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                            WorkSpace<span className="text-emerald-600">Hub</span>
                        </h2>
                        <p className="text-slate-500 text-sm font-medium mt-1">Acesse sua unidade de gestão</p>
                    </div>
                </header>

                {/* LINHA DIVISÓRIA */}
                <div className="w-full h-px bg-slate-100 mb-8"></div>

                {/* FORMULÁRIO */}
                <div>
                    <form action="" onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">

                        {/* TÍTULO DO FORMULÁRIO */}
                        <div className="text-center mb-2">
                            <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase">Alterar Senha</h1>
                            <p className="text-slate-400 text-xs font-semibold mt-1">Crie uma nova credencial de acesso segura</p>
                        </div>

                        {/* INPUTS */}
                        <div className="space-y-4">
                            <Input
                                required
                                type="password"
                                label="Nova Senha"
                                name="senha"
                                value={request.senha}
                                onChange={(e) => handleChange("senha", e.target.value)}
                            />
                            <Input
                                required
                                type="password"
                                label="Confirme a Senha"
                                name="confirmacaoSenha"
                                value={request.confirmacaoSenha}
                                onChange={(e) => handleChange("confirmacaoSenha", e.target.value)}
                            />
                        </div>

                        {/* BOTÃO */}
                        <div className="pt-2">
                            <Button
                                isLoading={isLoading}
                                onClick={handleConfirmar}
                                className="w-full h-12 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-slate-900/10 active:scale-95"
                            >
                                Redefinir Senha
                            </Button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default RecuperarSenha