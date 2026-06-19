"use client";
import { buscarListaEspacos, deletarEspaco } from '@/app/services/espaco.service';
import Espaco from '@/app/types/espacos/espaco';
import { formatarEnum, formatarValor } from '@/app/utils/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '@/app/components/Button';
import DataTable from '@/app/components/DataTable';
import { useNotification } from '@/app/hooks/useNotification';

export default function Espacos() {
  const [espacos, setEspacos] = useState<Espaco[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showError, showSuccess } = useNotification();

  const buscarDados = async () => {
    try {
      setIsLoading(true);
      setEspacos(await buscarListaEspacos());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeletarEspaco = async (id: number) => {
    const confirma = confirm("Deseja deletar o espaço #" + id)

    if (confirma) {
      try {
        await deletarEspaco(id);
        showSuccess("Espaço deletado com sucesso!")
        setEspacos(prev => prev.filter(espaco => espaco.id !== id))
      } catch (error: any) {
        showError(error.message || "Erro ao deletar espaço")
      }
    }

  }

  useEffect(() => {
    buscarDados();
  }, [])

  const columns = [
    {
      header: '#',
      key: 'id',
      className: 'font-mono text-xs font-bold text-slate-400'
    },
    {
      header: 'Nome / Número',
      key: 'nomeNumero',
      className: 'font-bold'
    },
    {
      header: 'Tipo',
      key: 'tipo',
      render: (espaco: Espaco) => (
        <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-lg font-medium">
          {formatarEnum(espaco.tipo)}
        </span>
      )
    },
    {
      header: 'Valor',
      key: 'valorHora',
      render: (espaco: Espaco) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold">{formatarValor(espaco.valorHora)}</span>
          <span className="text-[10px]  uppercase font-bold">por hora</span>
        </div>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (espaco: Espaco) => (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${espaco.status === "DISPONIVEL" ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
          }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${espaco.status === "DISPONIVEL" ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <span className="text-[10px] font-black uppercase tracking-wider">{formatarEnum(espaco.status)}</span>
        </div>
      )
    },
    {
      header: 'Ações',
      key: 'acoes',
      align: 'right' as const,
      render: (espaco: Espaco) => (
        <div className="flex justify-end gap-2">
          <Link href={`/espacos/${espaco.id}/editar`}>
            <Button variant="ghost" size="sm" className="hover:text-emerald-600 hover:bg-emerald-50" icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            }>
              Editar
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="hover:text-red-600 hover:bg-red-50"
            onClick={() => handleDeletarEspaco(espaco.id!)}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14m-9 0V5a2 2 0 012-2h2a2 2 0 012 2v2M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6" />
              </svg>
            }
          />
        </div>
      )
    }
  ]

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 md:mb-10">
        <div>
          <span className="text-emerald-600 font-bold text-xs md:text-sm uppercase tracking-widest">Infraestrutura</span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Espaços</h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">Gerencie sua unidade.</p>
        </div>

        <Link href="/espacos/novo">
          <Button
            className="w-full md:w-auto"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-emerald-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            }
          >
            Cadastrar Espaço
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {espacos.filter(e => e.status !== "DELETADO").length === 0 ? (
          <div className="bg-white p-10 rounded-[2rem] text-center border border-slate-100">
            <span className="text-slate-400 font-medium italic">Está vazio aqui.</span>
          </div>
        ) : (
          espacos.map((espaco) => espaco.status !== "DELETADO" && (
            <div key={espaco.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">#{espaco.id}</span>
                  <h3 className="font-black text-slate-900 text-lg leading-tight">{espaco.nomeNumero}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${espaco.status === "DISPONIVEL" ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                  {formatarEnum(espaco.status)}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-lg font-bold">
                  {formatarEnum(espaco.tipo)}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-900 leading-none">{formatarValor(espaco.valorHora)}</span>
                  <span className="text-[9px] text-slate-400 uppercase font-bold">por hora</span>
                </div>
              </div>

              <Link href={`/espacos/${espaco.id}/editar`}>
                <Button variant="secondary" className="w-full">
                  Editar Espaço
                </Button>
              </Link>
            </div>
          ))
        )}
      </div>

      <div className="hidden md:block">
        <DataTable
          data={espacos.filter(e => e.status !== "DELETADO")}
          columns={columns}
          keyExtractor={(e) => e.id!}
          isLoading={isLoading}
          emptyMessage="Nenhum espaço encontrado"
          emptyIcon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6.75h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
            </svg>
          }
        />
      </div>
    </div>
  );
}