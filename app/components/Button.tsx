'use client'
import React from 'react'
import { ButtonProps } from '../types/components/button'

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-2xl hover:cursor-pointer'
    
    const variants = {
        primary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/10',
        secondary: 'bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100',
        outline: 'border-2 border-slate-200 bg-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50',
        ghost: 'text-slate-400 hover:text-slate-600 hover:bg-slate-50',
        danger: 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100',
        success: 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100'
    }

    const sizes = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-sm'
    }

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <>
                    {icon}
                    {children}
                </>
            )}
        </button>
    )
}
