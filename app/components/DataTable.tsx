'use client'
import React from 'react'
import { DataTableProps } from '../types/components/data-table'

export default function DataTable<T>({
    data,
    columns,
    emptyMessage = 'Nenhum registro encontrado',
    emptyIcon,
    isLoading = false,
    keyExtractor
}: DataTableProps<T>) {
    return (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-50">
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={`px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ${
                                        column.align === 'right' ? 'text-right' : 
                                        column.align === 'center' ? 'text-center' : ''
                                    } ${column.className || ''}`}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {isLoading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-8 py-24 text-center">
                                    <div className="flex justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                                    </div>
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr className="bg-transparent">
                                <td colSpan={columns.length} className="px-8 py-24 text-center">
                                    <div className="flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500">
                                        <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300">
                                            {emptyIcon || (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-slate-900 font-black text-lg uppercase tracking-tight">
                                                {emptyMessage}
                                            </h3>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr key={keyExtractor(item)} className="group hover:bg-slate-50/50 transition-colors">
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={`px-8 py-5 text-slate-900 ${
                                                column.align === 'right' ? 'text-right' : 
                                                column.align === 'center' ? 'text-center' : ''
                                            } `}
                                        >
                                            {column.render ? column.render(item) : (item[column.key as keyof T] as React.ReactNode)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
