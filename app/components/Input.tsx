'use client'
import React from 'react'
import { InputProps } from '../types/components/input'

export default function Input({
    label,
    error,
    className = '',
    ...props
}: InputProps) {
    return (
        <div className="space-y-2 w-full text-left">
            {label && (
                <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-slate-400 ml-1 block">
                    {label}
                </label>
            )}
            <input
                className={`w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300 placeholder:font-normal ${
                    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''
                } ${className}`}
                {...props}
            />
            {error && (
                <span className="text-[10px] text-red-500 font-bold ml-1">{error}</span>
            )}
        </div>
    )
}
