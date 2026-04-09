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
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 md:py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-95 text-sm hover:cursor-pointer w-full md:w-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Novo Cliente</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {clientes.map((cliente) => (
          <div key={cliente.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-black text-xs">
                  {cliente.nome.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight">{cliente.nome}</h3>
                  <span className="text-[10px] font-mono text-slate-400">{cliente.documento}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${cliente.status === "ATIVO" ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                }`}>
                {cliente.status}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs py-2 border-y border-slate-50">
              <span className="text-slate-400">Telefone</span>
              <span className="font-medium text-slate-700">{cliente.telefone}</span>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/clientes/${cliente.id}/editar`}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 font-bold rounded-xl text-xs border border-slate-100"
              >
                Editar
              </Link>
              <button
                onClick={() => handleAlterarStatus(cliente.id, cliente.status === "ATIVO" ? "INATIVO" : "ATIVO")}
                className={`flex-1 py-3 font-bold rounded-xl text-xs border transition-colors ${cliente.status === "ATIVO"
                    ? 'bg-red-50 text-red-600 border-red-100'
                    : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  }`}
              >
                {cliente.status === "ATIVO" ? "Desativar" : "Ativar"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Cliente</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Contato</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Documento</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Status</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {clientes.sort((a, b) => a.id - b.id).map((cliente) => (
                <tr key={cliente.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <span className="font-bold text-slate-900 block">{cliente.nome}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs text-slate-400 font-medium">{cliente.telefone}</span>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-mono">
                    {cliente.documento}
                  </td>
                  <td className="px-8 py-5">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${cliente.status === "ATIVO" ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${cliente.status === "ATIVO" ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      <span className="text-[10px] font-black uppercase tracking-wider">{cliente.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/clientes/${cliente.id}/editar`} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </Link>
                      <button onClick={() => handleAlterarStatus(cliente.id, cliente.status === "ATIVO" ? "INATIVO" : "ATIVO")} className={`p-2 rounded-xl transition-all hover:cursor-pointer ${cliente.status === "ATIVO" ? 'text-slate-400 hover:text-red-600 hover:bg-red-50' : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'}`}>
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