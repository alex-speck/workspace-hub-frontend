'use client'
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { useNotification } from "@/app/hooks/useNotification";
import { cadastrarEmpresaUsuario } from "@/app/services/auth.service";
import { buscarDadosCnpj } from "@/app/services/empresa.service";
import CadastroEmpresa from "@/app/types/empresa/cadastro.empresa";
import { formatarCnpj, formatarTelefone } from "@/app/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function CadastrarEmpresa() {
   const router = useRouter()
   const { showError, showSuccess } = useNotification();
   const [step, setStep] = useState<number>(1);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [empresa, setEmpresa] = useState<CadastroEmpresa>({
      razaoSocial: "",
      nomeFantasia: "",
      cnpj: "",
      email: "",
      telefone: "",
      usuarioPadrao: {
         nome: "",
         email: "",
         senha: ""
      }
   });

   const handleChange = (valor: string, campo: string) => {
      setEmpresa(prev => ({
         ...prev,
         [campo]: valor
      }))
   }

   const handleUsuarioChange = (valor: string, campo: string) => {
      setEmpresa(prev => ({
         ...prev,
         usuarioPadrao: {
            ...prev.usuarioPadrao,
            [campo]: valor
         }
      }))
   }

   const buscarEmpresaPorCnpj = async (cnpj: string) => {
      const cnpjLimpo = cnpj.replace(/[^0-9]/g, "");

      if (cnpjLimpo.length === 14) {
         const dadosEmpresa = await buscarDadosCnpj(cnpjLimpo);
         if (dadosEmpresa !== null) {
            setEmpresa(prev => ({
               ...prev,
               razaoSocial: dadosEmpresa?.razao_social,
               nomeFantasia: dadosEmpresa?.nome_fantasia,
               email: dadosEmpresa?.email !== null ? dadosEmpresa?.email : "",
               telefone: dadosEmpresa?.ddd_telefone_1 !== null ? dadosEmpresa?.ddd_telefone_1 : ""
            }))
         }
      }
   }

   const handleCadastrar = async () => {
      try {
         setIsLoading(true);
         await cadastrarEmpresaUsuario(empresa);
         showSuccess("Empresa cadastrada com sucesso!");
         router.push("/login");
      } catch (error: any) {
         showError(error.message || "Erro ao cadastrar empresa.");
      } finally {
         setIsLoading(false);
      }
   }

   const nextStep = () => setStep(prev => prev + 1);
   const prevStep = () => setStep(prev => prev - 1);

   return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8">
         <div className="w-full max-w-xl bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100">

            <div className="flex flex-col items-center gap-4 mb-10">
               <div className="h-14 w-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-600/20">
                  <div className="h-6 w-6 bg-white rotate-45 rounded-sm" />
               </div>
               <div className="text-center">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                     WorkSpace<span className="text-emerald-600">Hub</span>
                  </h2>
                  <p className="text-slate-500 text-sm font-medium mt-2">
                     Cadastre sua Empresa e tenha acesso ao seu painel de gestão.
                  </p>
               </div>
            </div>

            <div className="relative mb-10 max-w-sm mx-auto">
               {/* Linha de fundo */}
               <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 rounded-full -translate-y-1/2"></div>

               <div
                  className="absolute top-1/2 left-0 h-1 bg-emerald-500 rounded-full -translate-y-1/2 transition-all duration-500 ease-out"
                  style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
               ></div>

               <div className="relative flex justify-between">
                  {[1, 2, 3].map((num) => (
                     <div
                        key={num}
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all duration-500 
              ${step >= num
                              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-110'
                              : 'bg-white text-slate-300 border-2 border-slate-100'
                           }`}
                     >
                        {num}
                     </div>
                  ))}
               </div>
            </div>

            <form action="" onSubmit={(e) => e.preventDefault()} className="min-h-[320px] flex flex-col justify-between">

               <div className="flex-1">
                  {step === 1 && (
                     <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Dados da Empresa</h3>
                        <div className="space-y-4">
                           <Input required label="CNPJ" name="cnpj" value={formatarCnpj(empresa.cnpj)} placeholder="Digite o CNPJ da empresa" onChange={(e) => { buscarEmpresaPorCnpj(e.target.value); handleChange(e.target.value, "cnpj") }} />
                           <Input required label="Razão Social" value={empresa.razaoSocial} name="razaoSocial" onChange={(e) => handleChange(e.target.value, "razaoSocial")} />
                           <Input required label="Nome Fantasia" value={empresa.nomeFantasia} name="nomeFantasia" onChange={(e) => handleChange(e.target.value, "nomeFantasia")} />
                        </div>
                     </div>
                  )}

                  {step === 2 && (
                     <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Contato</h3>
                        <div className="space-y-4">
                           <Input required label="Email" value={empresa.email} name="email" onChange={(e) => handleChange(e.target.value, "email")} />
                           <Input required label="Telefone" value={formatarTelefone(empresa.telefone)} name="telefone" onChange={(e) => handleChange(e.target.value, "telefone")} />
                        </div>
                     </div>
                  )}

                  {step === 3 && (
                     <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Usuário Padrão</h3>
                        <div className="space-y-4">
                           <Input required label="Nome Completo" name="nome" value={empresa.usuarioPadrao.nome} placeholder="Digite o nome do usuário" onChange={(e) => handleUsuarioChange(e.target.value, "nome")} />
                           <Input required label="Email" name="emailUsuario" value={empresa.usuarioPadrao.email} onChange={(e) => handleUsuarioChange(e.target.value, "email")} />
                           <Input required label="Senha" name="senha" type="password" value={empresa.usuarioPadrao.senha} onChange={(e) => handleUsuarioChange(e.target.value, "senha")} />
                        </div>
                     </div>
                  )}
               </div>

               <div className="flex gap-3 mt-10 pt-6 border-t border-slate-50">
                  {step > 1 && (
                     <div className="w-1/3">
                        <Button type="button" onClick={prevStep} variant="outline" className="w-full h-12">
                           Voltar
                        </Button>
                     </div>
                  )}

                  <div className="flex-1">
                     {step < 3 ? (
                        <Button type="button" onClick={nextStep} className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white">
                           Próximo
                        </Button>
                     ) : (
                        <Button isLoading={isLoading} onClick={handleCadastrar} className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20">
                           Cadastrar Empresa
                        </Button>
                     )}
                  </div>
               </div>
            </form>

            <div className="mt-8 text-center">
               <span className="text-sm font-medium text-slate-500">
                  Já é um cliente? <Link href={"/login"} className="font-bold underline underline-offset-2 text-emerald-600 hover:text-emerald-700 transition-colors">Clique aqui</Link> para acessar.
               </span>
            </div>

         </div>
      </div>
   )
}
