"use client";
import Espaco from '@/app/model/Espaco';
import { formatarEnum, formatarValor } from '@/app/utils/utils';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Espacos() {
  const [espacos, setEspacos] = useState<Espaco[]>([]);

  const buscarDados = async () => {
    try {
      const response = await axios.get<Espaco[]>("http://localhost:8080/espacos");
      setEspacos(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    buscarDados();
  }, [])

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 md:mb-10">
        <div>
          <span className="text-emerald-600 font-bold text-xs md:text-sm uppercase tracking-widest">Infraestrutura</span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Espaços</h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">Gerencie sua unidade.</p>
        </div>

        <Link
          href="/espacos/novo"
          className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-4 md:py-3 rounded-2xl shadow-lg shadow-slate-900/20 transition-all active:scale-95 flex items-center justify-center gap-2 hover:cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-emerald-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Cadastrar Espaço
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {espacos.length === 0 ? (
          <div className="bg-white p-10 rounded-[2rem] text-center border border-slate-100">
            <span className="text-slate-400 font-medium italic">Nenhum espaço cadastrado.</span>
          </div>
        ) : (
          espacos.map((espaco) => (
            <div key={espaco.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">#{espaco.id}</span>
                  <h3 className="font-black text-slate-900 text-lg leading-tight">{espaco.nomeNumero}</h3>
                </div>
                {/* Status no Topo do Card */}
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

              <Link
                href={`/espacos/${espaco.id}/editar`}
                className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 font-bold rounded-xl text-sm border border-slate-100 active:bg-slate-100 transition-colors"
              >
                Editar Espaço
              </Link>
            </div>
          ))
        )}
      </div>

      <div className="hidden md:block bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">#</th>
                <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Nome / Número</th>
                <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tipo</th>
                <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Valor</th>
                <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {espacos.map((espaco) => (
                <tr key={espaco.id} className="group hover:bg-slate-50/50 transition-colors text-slate-900">
                  <td className="px-8 py-5 font-mono text-xs font-bold text-slate-400">{espaco.id}</td>
                  <td className="px-8 py-5 font-bold">{espaco.nomeNumero}</td>
                  <td className="px-8 py-5">
                    <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-lg font-medium">
                      {formatarEnum(espaco.tipo)}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{formatarValor(espaco.valorHora)}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">por hora</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${espaco.status === "DISPONIVEL" ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${espaco.status === "DISPONIVEL" ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <span className="text-[10px] font-black uppercase tracking-wider">{formatarEnum(espaco.status)}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Link href={`/espacos/${espaco.id}/editar`} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
                      <span>Editar</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}