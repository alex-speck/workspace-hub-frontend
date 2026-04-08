'use client'
import { useClientes } from '@/app/context/ClientesContext';
import Cliente from '@/app/model/Cliente';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'

// --- DADOS MOCKADOS ---
const stats = [
  { name: 'Faturamento Hoje', value: 'R$ 1.250,00', change: '+12%', icon: '💰' },
  { name: 'Reservas Ativas', value: '18', change: '5 agora', icon: '📅' },
  { name: 'Ocupação Atual', value: '75%', change: '+5% vs ontem', icon: '🚀' },
];



const statusColors: { [key: string]: string } = {
  'Concluído': 'bg-emerald-100 text-emerald-800',
  'Em andamento': 'bg-sky-100 text-sky-800',
  'Pendente': 'bg-amber-100 text-amber-800',
  'Agendado': 'bg-slate-100 text-slate-800',
};

export default function Dashboard() {
  const clienteContext = useClientes();
  const [clientes, setClientes] = useState<Cliente[]>(clienteContext.clientes);


  return (
    <div className="space-y-10 p-2">

      {/* Header do Dashboard */}
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-500 font-medium">
          Bem-vindo de volta! Aqui está o resumo da sua unidade <span className="text-emerald-600 font-bold">hoje</span>.
        </p>
      </div>

      {/* --- CARDS DE MÉTRICAS --- */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="relative overflow-hidden bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-900/5 group hover:border-emerald-200 transition-all duration-300">
            {/* Efeito de brilho no hover */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />

            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.name}</span>
              <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl text-2xl group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                {stat.icon}
              </div>
            </div>

            <div className="mt-6 relative z-10">
              <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.5-5.5a.75.75 0 011.08 0l5.5 5.5a.75.75 0 11-1.08 1.04l-3.96-3.908V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="text-sm text-emerald-600 font-bold">{stat.change}</p>
                <span className="text-xs text-slate-400 font-medium italic">vs. ontem</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- TIMELINE DE AGENDAMENTOS / CLIENTES --- */}
      <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-900/5 border border-slate-100 p-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Últimos Clientes Editados</h2>
            <p className="text-sm text-slate-400 font-medium">Histórico recente de interações na plataforma</p>
          </div>
          <button className="px-6 py-3 text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-2xl transition-colors">
            Ver todos
          </button>
        </div>

        <div className="relative overflow-x-auto">
          {clientes.length === 0 ? (
            <div className="py-10 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium italic">Nenhuma atividade recente registrada.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {clientes.map((cliente, index) => (
                <div key={index} className="flex items-center justify-between p-6 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 border border-transparent hover:border-slate-100 rounded-[2rem] transition-all group">
                  <div className="flex items-center gap-5">
                    {/* Avatar Fake com Inicial */}
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xl font-black text-slate-900 shadow-sm group-hover:border-emerald-200 transition-colors">
                      {cliente.nome.charAt(0)}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-base font-bold text-slate-900">{cliente.nome}</span>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-400 font-medium">{cliente.telefone}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-xs text-slate-400 font-mono tracking-tighter">{cliente.documento}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Status Badge */}
                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider ${cliente.status === "ATIVO" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
                      }`}>
                      {cliente.status}
                    </span>

                    {/* Botão de Atalho */}
                    <Link
                      href={`/clientes/${cliente.id}/editar`}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
