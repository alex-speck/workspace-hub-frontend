'use client'
import React, { useState } from 'react'

import { CalendarProps } from '../types/components/calendar'

export default function Calendar({ events, onEventClick }: CalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date())

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const days = []
    const totalDays = daysInMonth(year, month)
    const firstDay = firstDayOfMonth(year, month)

    // Fill empty days at start
    for (let i = 0; i < firstDay; i++) {
        days.push(null)
    }

    // Fill days of month
    for (let i = 1; i <= totalDays; i++) {
        days.push(i)
    }

    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))
    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]

    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

    const getEventsForDay = (day: number) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        return events.filter(e => e.date === dateStr)
    }

    const isToday = (day: number) => {
        const today = new Date()
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
    }

    return (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
            {/* Calendar Header */}
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                        {monthNames[month]} <span className="text-slate-400">{year}</span>
                    </h2>
                </div>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-slate-900">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-slate-900">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 bg-slate-50/50 border-b border-slate-50">
                {dayNames.map(d => (
                    <div key={d} className="py-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 flex-1 min-h-[400px]">
                {days.map((day, idx) => (
                    <div 
                        key={idx} 
                        className={`min-h-[100px] border-r border-b border-slate-50 p-2 transition-colors hover:bg-slate-50/30 ${!day ? 'bg-slate-50/10' : ''}`}
                    >
                        {day && (
                            <>
                                <div className="flex justify-between items-center mb-1">
                                    <span className={`text-xs font-black ${isToday(day) ? 'bg-emerald-500 text-white w-6 h-6 flex items-center justify-center rounded-lg shadow-lg shadow-emerald-500/20' : 'text-slate-400'}`}>
                                        {day}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    {getEventsForDay(day).slice(0, 3).map(event => (
                                        <button
                                            key={event.id}
                                            onClick={() => onEventClick?.(event.id)}
                                            className={`w-full text-left px-2 py-1.5 rounded-lg text-[10px] font-bold truncate transition-all active:scale-95 ${
                                                event.status === 'CANCELADA' ? 'bg-red-50 text-red-600 border border-red-100' :
                                                event.status === 'CONCLUIDA' ? 'bg-slate-100 text-slate-500 border border-slate-200' :
                                                'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                            }`}
                                        >
                                            <div className="flex items-center gap-1">
                                                <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
                                                {event.startTime} - {event.title}
                                            </div>
                                        </button>
                                    ))}
                                    {getEventsForDay(day).length > 3 && (
                                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">
                                            + {getEventsForDay(day).length - 3} mais
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
