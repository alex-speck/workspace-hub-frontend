'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname()
  // Estado para controlar se a sidebar está recolhida

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> },
    { name: 'Clientes', href: '/clientes', icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></> },
    { name: 'Espaços', href: '/espacos', icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /><line x1="3" y1="9" x2="21" y2="9" /></> },
    { name: 'Reservas', href: '/reservas', icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></> },
  ];

  return (
    <aside 
      className={`fixed left-0 top-16 hidden h-[calc(100vh-64px)] border-r border-emerald-100 bg-white md:block transition-all duration-300 ease-in-out z-40 ${
        isCollapsed ? 'w-20' : 'w-64 lg:w-72'
      }`}
    >
      <div className="flex flex-col h-full p-4">
        
        {/* HEADER DA SIDEBAR: Título + Botão Toggle */}
        <div className={`flex items-center mb-6 px-2 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 animate-in fade-in duration-500">
              Menu do Sistema
            </p>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            title={isCollapsed ? "Expandir" : "Recolher"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
              className={`h-4 w-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>
        
        {/* NAVEGAÇÃO */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-xl transition-all duration-200 ${
                  isCollapsed ? 'justify-center px-0 py-3' : 'px-4 py-3 gap-3'
                } ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' 
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
                title={isCollapsed ? item.name : ""}
              >
                <div className={`shrink-0 ${isActive ? 'text-white' : 'text-emerald-500 transition-colors group-hover:text-emerald-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    {item.icon}
                  </svg>
                </div>
                
                {!isCollapsed && (
                  <span className="text-sm font-semibold whitespace-nowrap overflow-hidden animate-in slide-in-from-left-1 duration-300">
                    {item.name}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* RODAPÉ: PERFIL DA UNIDADE */}
        <div className={`mt-auto border-t border-slate-50 pt-4 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 shrink-0 rounded-lg bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">
              AS
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden animate-in fade-in duration-500">
                <p className="truncate text-xs font-bold text-slate-900">Unidade Paulista</p>
                <p className="truncate text-[10px] text-slate-500 italic">Gestor Logado</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </aside>
  )
}