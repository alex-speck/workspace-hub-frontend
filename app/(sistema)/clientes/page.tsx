'use client'
import { ClientesMock } from '@/app/mock/cliente';
import Cliente from '@/app/model/Cliente'
import Link from 'next/link'
import { useEffect, useState } from 'react'


//TODO: Criar contexto de cliente para atualizar a lista de clientes em tempo real ao criar/editar/desativar um cliente, sem precisar recarregar a pagina.
export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);


  const buscarDados = async () => {
    try {
      const data = await ClientesMock.listarTodos();
      setClientes(data);
    } catch (error) {
      console.error(error)
    }
  }

  const handleAlterarStatus = async (cliente: Cliente) => {

  }

  useEffect(()=>{
    buscarDados();
  },[])


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
          {!clientes ? (<div>Nenhum cliente encontrado <Link 
          href={"/clientes/novo"}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-95 text-sm hover:cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Novo Cliente</span>
        </Link></div>) : (
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
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.name}</td>
                  <td>{cliente.email} {cliente.phone}</td>
                  <td>{cliente.documento}</td>
                  <td>{cliente.ativo ? "Ativo" : "Inativo"}</td>
                  <td>
                    <Link href={`/clientes/${cliente.id}/editar`}>Editar</Link>
                    <button onClick={handleAlterarStatus}>{cliente.ativo ? "Desativar" : "Ativar"}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </div>
      </div>
    </div>
  )
}