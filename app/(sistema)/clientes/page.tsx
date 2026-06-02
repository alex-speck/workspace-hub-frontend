'use client'
import Cliente from '@/app/types/cliente/cliente'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { alterarStatusCliente, buscarListaClientes } from '@/app/services/cliente.service';
import Button from '@/app/components/Button';
import DataTable from '@/app/components/DataTable';
import { useNotification } from '@/app/hooks/useNotification';

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useNotification();

  const buscarDados = async () => {
    try {
      setIsLoading(true);
      setClientes(await buscarListaClientes());
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  const handleAlterarStatus = async (cliente: Cliente) => {
    try {
      await alterarStatusCliente(cliente);
      setClientes(prev => prev.map(c => c.id === cliente.id ? { ...c, status: c.status === 'ATIVO' ? 'INATIVO' : 'ATIVO' } : c))
      
    } catch (error: any) {
      showError(error.message || "Erro ao atualizar status.");
      console.error(error)
    }
  }

  useEffect(() => {
    buscarDados();
  }, [])

  const columns = [
    {
      header: 'Cliente',
      key: 'nome',
      render: (cliente: Cliente) => (
        <span className="font-bold text-slate-900 block">{cliente.nome}</span>
      )
    },
    {
      header: 'Contato',
      key: 'telefone',
      render: (cliente: Cliente) => (
        <span className="text-xs text-slate-400 font-medium">{cliente.telefone}</span>
      )
    },
    {
      header: 'Documento',
      key: 'documento',
      render: (cliente: Cliente) => (
        <span className="text-sm text-slate-500 font-mono">{cliente.documento}</span>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (cliente: Cliente) => (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${cliente.status === "ATIVO" ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
          }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${cliente.status === "ATIVO" ? 'bg-emerald-500' : 'bg-red-500'}`} />
          <span className="text-[10px] font-black uppercase tracking-wider">{cliente.status}</span>
        </div>
      )
    },
    {
      header: 'Ações',
      key: 'acoes',
      align: 'right' as const,
      render: (cliente: Cliente) => (
        <div className="flex justify-end gap-2">
          <Link href={`/clientes/${cliente.id}/editar`}>
            <Button variant="ghost" size="sm" className="p-2 hover:text-emerald-600 hover:bg-emerald-50" icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            } />
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 ${cliente.status === "ATIVO" ? 'hover:text-red-600 hover:bg-red-50' : 'hover:text-emerald-600 hover:bg-emerald-50'}`}
            onClick={() => handleAlterarStatus(cliente)}
            icon={
              cliente.status === "ATIVO" ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5L10.5 16L6.5 12" />
                </svg>
              )
            }
          />
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Gestão de <span className="text-emerald-600">Clientes</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Visualize e gerencie os coworkers.</p>
        </div>

        <Link href={"/clientes/novo"}>
          <Button
            className="w-full md:w-auto"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            }
          >
            Novo Cliente
          </Button>
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
              <Link href={`/clientes/${cliente.id}/editar`} className="flex-1">
                <Button variant="secondary" size="sm" className="w-full">
                  Editar
                </Button>
              </Link>
              <Button
                variant={cliente.status === "ATIVO" ? "danger" : "success"}
                size="sm"
                className="flex-1"
                onClick={() => handleAlterarStatus(cliente)}
              >
                {cliente.status === "ATIVO" ? "Desativar" : "Ativar"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <DataTable
          data={[...clientes].sort((a, b) => a.id - b.id)}
          columns={columns}
          keyExtractor={(c) => c.id}
          isLoading={isLoading}
          emptyMessage="Nenhum cliente encontrado"
          emptyIcon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          }
        />
      </div>
    </div>
  )
}