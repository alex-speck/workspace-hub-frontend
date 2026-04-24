'use client'

import React from 'react'
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onMenuClick:()=>void
}

export default function Header({onMenuClick}: HeaderProps) {

  const { usuario, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 w-full border-b border-emerald-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          <button 
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-slate-100 md:hidden text-slate-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
          
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-emerald-600 flex items-center justify-center">
               <div className="h-3 w-3 bg-white rotate-45" />
            </div>
            <span className="font-bold text-slate-800 tracking-tight">WorkSpace<span className="text-emerald-600"> Hub</span></span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            
            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-sm font-semibold text-slate-700 leading-none">
                  {usuario?.nome || 'Usuario indefinido'}
                </span>
                <span className="text-[10px] font-medium text-emerald-600 uppercase mt-1">
                  {usuario?.role || 'Cargo indefinido'}
                </span>
              </div>
              
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-emerald-50 bg-emerald-100 text-emerald-600">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>

            <div className="h-8 w-px bg-slate-200 hidden sm:block" />

            <button 
              className="group flex items-center gap-2 rounded-md p-2 text-sm font-medium text-slate-500 transition-all hover:cursor-pointer hover:bg-red-50 hover:text-red-600"
              title="Sair do sistema"
              onClick={logout}
            >
              <span className="hidden md:inline font-semibold">Sair</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}

