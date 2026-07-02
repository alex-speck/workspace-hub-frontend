'use client'
import { buscarReservas, cancelarReserva, concluirReserva } from '@/app/services/reserva.service'
import Reserva, { ReservasResponse } from '@/app/types/reserva/reserva'
import { formatarValor, formatarEnum } from '@/app/utils/utils'
import Link from 'next/link'
import React, { useEffect, useState, useMemo } from 'react'
import DataTable from '@/app/components/DataTable'
import Calendar from '@/app/components/Calendar'
import { useNotification } from '@/app/hooks/useNotification'
import { useDispatch, useSelector } from 'react-redux'
import { PaginaFiltro } from '@/app/types/filtros/filtros'
import { addFiltro, buscarFiltroPorPagina } from '@/app/redux/slices/filtros.slice'
import { RootState } from '@/app/redux/store'

export default function Reservas() {
  const filtro = useSelector(buscarFiltroPorPagina("/reservas"))?.filtros.find((i)=>i.tipo === "viewMode")?.valor

  const [reservas, setReservas] = useState<ReservasResponse>({ hoje: [], proximos: [] })
  const [viewMode, setViewMode] = useState<'grouped' | 'table' | 'calendar'>(filtro ? filtro as 'grouped' | 'table' | 'calendar' : 'grouped')
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();
  const { showError } = useNotification()

  console.log(filtro)
  console.log(useSelector((state: RootState) => state.filtro.data))

  const buscarDados = async () => {
    try {
      setIsLoading(true)
      const data = await buscarReservas()
      setReservas(data)
    } catch (error: any) {
      showError(error.message || "Erro ao carregar reservas")
    } finally {
      setIsLoading(false)
    }
  }

  const concluir = async (id: number) => {
    try {
      await concluirReserva(id);
      setReservas(prev => ({
        ...prev,
        hoje: prev.hoje.map(r => r.id === id ? { ...r, status: "CONCLUIDA" } : r),
        proximos: prev.proximos.map(r => r.id === id ? { ...r, status: "CONCLUIDA" } : r)
      }))
    } catch (error: any) {
      showError(error.message || "Erro ao concluir reserva")
    }
  }

  const cancelar = async (id: number) => {
    try {
      await cancelarReserva(id);
      setReservas(prev => ({
        ...prev,
        hoje: prev.hoje.map(r => r.id === id ? { ...r, status: "CANCELADA" } : r),
        proximos: prev.proximos.map(r => r.id === id ? { ...r, status: "CANCELADA" } : r)
      }))
    } catch (error: any) {
      showError(error.message || "Erro ao cancelar reserva")
    }
  }

  const guardarFiltros = (novoValor: 'grouped' | 'table' | 'calendar') => {
    console.log(novoValor)
    const filtro: PaginaFiltro = {
      pagina: "/reservas",
      filtros: [
        {
          tipo: "viewMode",
          valor: novoValor
        }
      ]
    }
    console.log("Filtro do metodo guardar filtros: ")
    console.log(filtro)
    dispatch(addFiltro({ filtro }))
  }

  useEffect(() => {
    buscarDados()
  }, [])

  const todasReservas = useMemo(() => {
    return [...reservas.hoje, ...reservas.proximos].sort((a, b) => {
      const dateA = new Date(`${a.data}T${a.horaInicio}`)
      const dateB = new Date(`${b.data}T${b.horaInicio}`)
      return dateA.getTime() - dateB.getTime()
    })
  }, [reservas])

  const calendarEvents = useMemo(() => {
    return todasReservas.map(r => ({
      id: r.id,
      title: `${r.cliente.nome} (${r.espaco.nomeNumero})`,
      date: r.data,
      startTime: r.horaInicio,
      endTime: r.horaFim,
      status: r.status
    }))
  }, [todasReservas])

  const columns = [
    {
      header: 'Cliente',
      key: 'cliente',
      render: (r: Reserva) => (
        <div>
          <p className="font-bold text-slate-900">{r.cliente.nome}</p>
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{r.cliente.telefone}</p>
        </div>
      )
    },
    {
      header: 'Espaço',
      key: 'espaco',
      render: (r: Reserva) => (
        <div>
          <p className="font-bold text-slate-900">{r.espaco.nomeNumero}</p>
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{formatarEnum(r.espaco.tipo)}</p>
        </div>
      )
    },
    {
      header: 'Data/Hora',
      key: 'data',
      render: (r: Reserva) => (
        <div>
          <p className="font-bold text-slate-900">{r.data}</p>
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{r.horaInicio} - {r.horaFim}</p>
        </div>
      )
    },
    {
      header: 'Valor',
      key: 'valorTotal',
      render: (r: Reserva) => (
        <div>
          <p className="font-bold text-slate-900">{formatarValor(r.valorTotal)}</p>
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{formatarValor(r.valorHora)}/h</p>
        </div>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (r: Reserva) => (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${r.status === 'ABERTA' ? 'bg-emerald-100 text-emerald-700' :
            r.status === 'CONCLUIDA' ? 'bg-slate-100 text-slate-500' :
              'bg-red-100 text-red-700'
          }`}>
          {r.status}
        </span>
      )
    },
    {
      header: 'Ações',
      key: 'acoes',
      align: 'right' as const,
      render: (r: Reserva) => (
        <div className="flex justify-end gap-2">
          {r.status === 'ABERTA' && (
            <>
              <button
                onClick={() => concluir(r.id)}
                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                title="Concluir"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </button>
              <button
                onClick={() => cancelar(r.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                title="Cancelar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          )}
        </div>
      )
    }
  ]

  const { hoje: reservasHoje, proximos: reservasFuturas } = reservas;

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      {/* HEADER DA PÁGINA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Reservas</h1>
          <p className="text-slate-500 font-medium">Controle o fluxo e ocupação da sua unidade.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm flex gap-1">
            <button
              onClick={() => { 
                setViewMode('grouped')
                guardarFiltros('grouped')
              }}
              className={`p-2.5 rounded-xl cursor-pointer transition-all ${viewMode === 'grouped' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25a2.25 2.25 0 0 1-2.25 2.25h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
              </svg>
            </button>
            <button
              onClick={() => {
                setViewMode('table')
                guardarFiltros('table')
              }}
              className={`p-2.5 rounded-xl cursor-pointer transition-all ${viewMode === 'table' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
              </svg>
            </button>
            <button
              onClick={() => {
                setViewMode('calendar')
                guardarFiltros('calendar');
              }}
              className={`p-2.5 rounded-xl cursor-pointer transition-all ${viewMode === 'calendar' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </button>
          </div>
          <Link
            href="/reservas/nova"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Nova Reserva
          </Link>
        </div>
      </div>

      {viewMode === 'grouped' && (
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

                  {r.status === "ABERTA" ?
                    (<button onClick={() => concluir(r.id)} className="w-full mt-2 py-3 bg-slate-50 group-hover:bg-emerald-500 text-slate-600 group-hover:text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all">
                      Confirmar Chegada
                    </button>) : (
                      <div className={`w-full mt-2 py-3 text-center font-black text-xs uppercase tracking-widest rounded-xl ${r.status === 'CONCLUIDA' ? 'bg-slate-50 text-slate-400' : 'bg-red-50 text-red-400'}`}>
                        {r.status}
                      </div>
                    )
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
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded-md">Data: {r.data}</span>
                    </div>
                  </div>
                  {r.status === "ABERTA" ?
                    (
                      <button onClick={() => cancelar(r.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-3.375c0-.621-.504-1.125-1.125-1.125h-2.25c-.621 0-1.125.504-1.125 1.125V11.25" />
                        </svg>
                      </button>
                    ) : (
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${r.status === 'CONCLUIDA' ? 'bg-slate-100 text-slate-400' : 'bg-red-50 text-red-400'}`}>
                        {r.status}
                      </span>
                    )
                  }
                </div>
              )) : (
                <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-400 font-medium text-sm">
                  Sem reservas futuras agendadas.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'table' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <DataTable
            data={todasReservas}
            columns={columns}
            keyExtractor={(r) => r.id}
            isLoading={isLoading}
          />
        </div>
      )}

      {viewMode === 'calendar' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[700px]">
          <Calendar
            events={calendarEvents}
            onEventClick={(id) => {
              const reserva = todasReservas.find(r => r.id === id)
              if (reserva?.status === 'ABERTA') {
                if (confirm(`Deseja concluir a reserva de ${reserva.cliente.nome}?`)) {
                  concluir(id)
                }
              }
            }}
          />
        </div>
      )}
    </div>
  )
}
