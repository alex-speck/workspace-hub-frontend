'use client'
import { useState } from 'react'

interface MessageModalProps {
    isOpen: boolean,
    title: string,
    type?: 'success' | 'error' | 'warning',
    message?: string,
    onClose: () => void
}

export default function MessageModal({ isOpen, title, type = 'success', message, onClose }: MessageModalProps) {
  if (!isOpen) return null;

    const configs = {
        success: {
            bgIcon: 'bg-emerald-50',
            textColor: 'text-emerald-500',
            buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            )
        },
        error: {
            bgIcon: 'bg-red-50',
            textColor: 'text-red-500',
            buttonBg: 'bg-red-600 hover:bg-red-700',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            )
        },
        warning: {
            bgIcon: 'bg-amber-50',
            textColor: 'text-amber-500',
            buttonBg: 'bg-amber-600 hover:bg-amber-700',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            )
        }
    };

    const current = configs[type];

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
           
            <div 
                className="fixed inset-0 h-screen w-screen bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" 
                onClick={onClose}
            />

            <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 text-center animate-in zoom-in-95 duration-200">
                
                <div className={`mx-auto flex items-center justify-center h-24 w-24 rounded-full ${current.bgIcon} mb-6 transition-colors duration-500`}>
                    <svg 
                        className={`h-12 w-12 ${current.textColor}`} 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="2.5" 
                        stroke="currentColor"
                    >
                        {current.icon}
                    </svg>
                </div>

                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                    {title}
                </h2>
                
                {message && (
                    <p className="text-slate-500 font-medium leading-relaxed mb-8 px-2">
                        {message}
                    </p>
                )}

                <button 
                    onClick={onClose}
                    className={`w-full ${current.buttonBg} text-white font-bold py-4 rounded-2xl shadow-lg shadow-slate-200 transition-all active:scale-95 hover:cursor-pointer text-sm tracking-wide`}
                >
                    {type === 'error' ? 'Tentar novamente' : 'Entendido'}
                </button>
            </div>
        </div>
    )
}
