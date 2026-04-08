'use client'
import { useClientes } from '@/app/context/ClientesContext';
import Cliente from '@/app/model/Cliente'
import axios from 'axios';
import Link from 'next/link'
import { useEffect, useState } from 'react'


export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const context = useClientes();


  const buscarDados = async () => {
    try {
      const response = await axios.get<Cliente[]>("http://localhost:8080/clientes");
      setClientes(response.data);
    } catch (error) {
      console.error(error)
    }
  }

  const handleAlterarStatus = async (id: number, status: string) => {
    try {
      const response = await axios.put<Cliente>(`http://localhost:8080/clientes/${id}/status`, { status });
      if (response.status === 200) {
        context.guardarCliente(response.data)
      }
      setClientes([])
      buscarDados();
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    buscarDados();
  }, [])

  console.log(clientes)


  return (
    <div className="space-y-6">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Gestão de <span className="text-emerald-600">Clientes</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Visualize e gerencie os coworkers.</p>
        </div>

        <Link
          href={"/clientes/novo"}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-95 text-sm hover:cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Novo Cliente</span>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:border-emerald-500 transition-all text-slate-900"

          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Cliente</th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Contato</th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Documento</th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Status</th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {clientes.sort((a, b) => a.id - b.id).map((cliente) => (
                <tr key={cliente.id} className="group hover:bg-slate-50/50 transition-colors">
                  {/* Nome do Cliente */}
                  <td className="px-8 py-5">
                    <span className="font-bold text-slate-900 block">{cliente.nome}</span>
                  </td>

                  {/* Contato (Email e Telefone empilhados) */}
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400">{cliente.telefone}</span>
                    </div>
                  </td>

                  {/* Documento */}
                  <td className="px-8 py-5 text-sm text-slate-500 font-mono">
                    {cliente.documento}
                  </td>

                  {/* Status Pill */}
                  <td className="px-8 py-5">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${cliente.status === "ATIVO"
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-red-50 text-red-600'
                      }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${cliente.status === "ATIVO" ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      <span className="text-[10px] font-black uppercase tracking-wider">
                        {cliente.status === "ATIVO" ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </td>

                  {/* Ações */}
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      {/* Botão Editar */}
                      <Link
                        href={`/clientes/${cliente.id}/editar`}
                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                        title="Editar Cliente"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </Link>

                      {/* Botão Alterar Status */}
                      <button
                        onClick={() => handleAlterarStatus(cliente.id, cliente.status === "ATIVO" ? "INATIVO" : "ATIVO")}
                        className={`p-2 rounded-xl transition-all hover:cursor-pointer ${cliente.status === "ATIVO"
                            ? 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                            : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                          }`}
                        title={cliente.status === "ATIVO" ? "Desativar" : "Ativar"}
                      >
                        {cliente.status === "ATIVO" ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5L10.5 16L6.5 12" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}