'use client'
import { buscarReservas, concluirReserva } from '@/app/services/reserva.service'
import Reserva from '@/app/types/reserva/reserva'
import { formatarValor } from '@/app/utils/utils'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



export default function Reservas() {
  const [reservas, setReservas] = useState<Reserva[]>([])
  const hoje = new Date().toLocaleDateString("pt-BR");

  const buscarDados = async () => {
    try {
      setReservas(await buscarReservas())

    } catch (error) {
      alert(error)
    }
  }

  const concluir = async (id: number) => {
    try {
      await concluirReserva(id);
      setReservas(prev => prev.map(r => r.id === id ? { ...r, status: "CONCLUIDA" } : r))
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    buscarDados()
  }, [])

  const reservasHoje = reservas.filter(reserva => {
    return new Date(reserva.dataHoraFim).getDate() === new Date().getDate();
  });

  const reservasFuturas = reservas.filter(reserva => {
    const dataReserva = new Date(reserva.dataHoraFim).getDate();
    const hoje = new Date().getDate();

    return dataReserva > hoje && !reservasHoje.includes(reserva);
  });

  console.log(reservas, reservasHoje, reservasFuturas)

  return (

    <div className="p-4 md:p-8 space-y-10 animate-in fade-in duration-700">
      {/* HEADER DA PÁGINA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Reservas</h1>
          <p className="text-slate-500 font-medium">Controle o fluxo e ocupação da sua unidade.</p>
        </div>
        <Link
          href="/reservas/nova"
          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-slate-900/10 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nova Reserva
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Check-ins de Hoje</h2>
          </div>

          <div className="grid gap-4">
            {reservasHoje.length > 0 ? reservasHoje.map(r => (
              <div key={r.id} className="group relative bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{r.espaco.nomeNumero}</p>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{r.cliente.nome}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900">{formatarValor(r.valorTotal)}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{formatarValor(r.valorHora)}/h</p>
                  </div>
                </div>

                {r.status !== "CONCLUIDA" &&
                  (<button onClick={() => concluir(r.id)} className="w-full mt-2 py-3 bg-slate-50 group-hover:bg-emerald-500 text-slate-600 group-hover:text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all">
                    Confirmar Chegada
                  </button>)
                }
              </div>
            )) : (
              <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-400 font-medium text-sm">
                Nenhuma reserva para hoje.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Próximos Dias</h2>
          </div>

          <div className="grid gap-4">
            {reservasFuturas.length > 0 ? reservasFuturas.map(r => (
              <div key={r.id} className="flex items-center gap-4 bg-slate-50/50 border border-slate-100 p-5 rounded-3xl hover:bg-white hover:shadow-md transition-all">
                <div className="flex-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{r.espaco.nomeNumero}</p>
                  <h3 className="font-bold text-slate-800">{r.cliente.nome}</h3>
                  <div className="flex gap-3 mt-1">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded-md">Total: {formatarValor(r.valorTotal)}</span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded-md">Data: {new Date(r.dataHoraFim).toLocaleDateString()}</span>
                  </div>
                </div>
                <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-3.375c0-.621-.504-1.125-1.125-1.125h-2.25c-.621 0-1.125.504-1.125 1.125V11.25" />
                  </svg>
                </button>
              </div>
            )) : (
              <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-400 font-medium text-sm">
                Sem reservas futuras agendadas.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>

  )
}
