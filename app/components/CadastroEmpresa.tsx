"use client"
import React, { useState } from 'react'
import { CadastroEmpresa } from '../types/empresa/cadastroEmpresa'
import { formatarCnpj, formatarCpfCnpj, formatarTelefone } from '../utils/utils'
import { cadastrarEmpresaUsuario } from '../services/authService'
import { useRouter } from 'next/navigation'
import { useConfirm } from '../context/ConfirmContext'

export default function CadastroEmpresaForm() {
    const router = useRouter();
    const { alert } = useConfirm();
    const [empresa, setEmpresa] = useState<CadastroEmpresa>(new CadastroEmpresa("", "", "", "", "", {
        nome: "",
        email: "",
        senha: ""
    }))

    const handleInputChange = (campo: string, valor: string) => {
        setEmpresa(prev => new CadastroEmpresa(
            campo === "razaoSocial" ? valor : prev.razaoSocial,
            campo === "nomeFantasia" ? valor : prev.nomeFantasia,
            campo === "cnpj" ? valor : prev.cnpj,
            campo === "email" ? valor : prev.email,
            campo === "telefone" ? valor : prev.telefone,
            {
                nome: campo === "nome" ? valor : prev.usuarioPadrao.nome,
                email: campo === "userEmail" ? valor : prev.usuarioPadrao.email,
                senha: campo === "senha" ? valor : prev.usuarioPadrao.senha
            }
        )
        )

        console.log(empresa)
    }

    const handleFormatCnpj = (cnpj: string) => {
        const formatado = formatarCnpj(cnpj)
        setEmpresa({ ...empresa, cnpj: formatado })
    }

    function handleFormatTelefone(value: string) {
        const formatado = formatarTelefone(value)
        setEmpresa({ ...empresa, telefone: formatado })
    }

    const handleSubmit = async (formData: FormData) => {
        try {
            await cadastrarEmpresaUsuario(empresa);
            await alert("Empresa e usuário cadastrados com sucesso!", true, "Sucesso!");
            router.push("/login");
        } catch (error) {
            await alert("Erro ao criar cadastro, tente novamente mais tarde.", false, "Erro");
            console.error(error)
        }
    }

    return (
        <form action={handleSubmit} className="space-y-10">
            <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">01</div>
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Dados da Empresa</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Razão Social</label>
                        <input
                            type="text"
                            name="razaoSocial"
                            placeholder="Ex: WorkSpace Solutions LTDA"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium"
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nome Fantasia</label>
                        <input
                            type="text"
                            name="nomeFantasia"
                            placeholder="Como sua unidade é conhecida"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium"
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Corporativo</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="contato@empresa.com"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium"
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">CNPJ</label>
                        <input
                            type="text"
                            name="cnpj"
                            value={empresa.cnpj}
                            placeholder="00.000.000/0000-00"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-mono font-medium"
                            onChange={(e) => { handleInputChange(e.target.name, e.target.value); handleFormatCnpj(e.target.value) }}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Telefone</label>
                        <input
                            type="text"
                            name="telefone"
                            value={empresa.telefone}
                            placeholder="(00) 00000-0000"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium"
                            onChange={(e) => { handleInputChange(e.target.name, e.target.value); handleFormatTelefone(e.target.value) }}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex flex-col gap-1 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-emerald-500/20">02</div>
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Usuário Gestor</h3>
                    </div>
                    <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider ml-11">
                        Acesso administrativo padrão habilitado
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Quem gerenciará a conta?"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium"
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email de Acesso</label>
                        <input
                            type="email"
                            name="userEmail"
                            placeholder="usuario@acesso.com"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium"
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Senha de Acesso</label>
                        <input
                            type="password"
                            name="senha"
                            placeholder="••••••••"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium"
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>

            <button
                type='submit'
                className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-slate-900/10 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
            >
                Finalizar e Abrir Unidade
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            </button>
        </form>
    )
}
