'use client'
import { UsuarioMock } from '@/app/mock/usuario'
import Usuario from '@/app/types/usuarios/usuario'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import UsuarioForm from '../../components/UsuarioForm'
import axios from 'axios'

export default function EditarUsuario() {

  const params = useParams()
  const router = useRouter()

  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const codigo = Number(params.codigo)

  useEffect(() => {
    buscarDados()
  }, [])

  const buscarDados = async () => {
    try {
      const user = await axios.get<Usuario>(`http://localhost:8080/usuarios/${codigo}`)

      if (user.status === 200) setUsuario(user.data)
      else router.push("/usuarios")
    } catch (error) {
      console.error(error)
    }
  }

  if (!usuario) return (<div className="p-8">Carregando dados...</div>)

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/usuarios"
              className="group flex items-center justify-center w-12 h-12 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-400 hover:text-emerald-600 transition-all active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </Link>

            <div>
              <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">Configurações</span>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Editar Usuário <span className="text-slate-400 font-light">#{codigo}</span>
              </h1>
            </div>
          </div>

          <div className="hidden sm:block">
            <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter ${usuario?.status === 'ATIVO' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
              {usuario?.status === 'ATIVO' ? 'Conta Ativa' : 'Conta Inativa'}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-900/5 border border-slate-100 p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500/10" />

          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-800">Informações Pessoais</h2>
            <p className="text-sm text-slate-500 font-medium">Atualize os dados cadastrais do usuario.</p>
          </div>

          <UsuarioForm usuarioExistente={usuario} />
        </div>

        <p className="mt-8 text-center text-slate-400 text-xs font-medium">
          As alterações realizadas aqui afetarão imediatamente o acesso do usuário ao sistema.
        </p>
      </div>
    </div>
  )
}
