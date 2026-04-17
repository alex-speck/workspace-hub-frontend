import Link from 'next/link'
import React from 'react'
import ClientesForm from '../components/ClientesForm'



export default function NovoCliente() {
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
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">CRM & Vendas</span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Novo <span className="text-emerald-600">Cliente</span>
            </h1>
            <p className="text-sm text-slate-400 font-medium">Cadastre empresas ou coworkers individuais no sistema.</p>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-900/5 border border-slate-100 p-10 relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
  
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500/10" />

          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-800">Dados Cadastrais</h2>
          </div>

          <ClientesForm />
        </div>

        <div className="mt-8 px-6 py-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 flex items-start gap-4">
          <div className="p-2 bg-white rounded-xl shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-emerald-600">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider">Dica Prática</h4>
            <p className="text-xs text-emerald-700/70 font-medium leading-relaxed mt-0.5">
              Ao salvar, o cliente será vinculado automaticamente à lista de contatos ativos para novas reservas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
