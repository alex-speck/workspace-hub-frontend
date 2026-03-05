'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (name: string) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const menuItems = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    { 
      name: 'Clientes', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
      ),
      subItems: [
        { name: 'Listar Clientes', href: '/clientes' },
        { name: 'Novo Cliente', href: '/clientes/novo' },
      ]
    },
    { 
      name: 'Espaços', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
        </svg>
      ),
      subItems: [
        { name: 'Listar Espaços', href: '/espacos' },
        { name: 'Novo Espaço', href: '/espacos/novo' },
      ]
    },
    { 
      name: 'Reservas', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      subItems: [
        { name: 'Agenda', href: '/reservas' },
        { name: 'Nova Reserva', href: '/reservas/nova' },
      ]
    },
  ];

  return (
    /* h-[calc(100vh-64px)] desconta a altura do header */
    <aside className="fixed left-0 top-16 hidden h-[calc(100vh-64px)] w-64 border-r border-emerald-100 bg-white md:block lg:w-72">
      <div className="flex flex-col gap-2 p-6">
        <p className="px-2 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
          Menu do Sistema
        </p>
        
        <nav className="mt-4 flex flex-col gap-2">
          {menuItems.map((item) => {
            // Renderização para itens com Submenu (Clientes, Espaços, Reservas)
            if (item.subItems) {
              const isExpanded = openMenus[item.name];
              const isChildActive = item.subItems.some(sub => pathname === sub.href);
              
              return (
                <div key={item.name} className="flex flex-col hover:cursor-pointer">
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 hover:cursor-pointer ${
                      isChildActive 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`${isChildActive ? 'text-emerald-600' : 'text-emerald-500'}`}>
                        {item.icon}
                      </div>
                      {item.name}
                    </div>
                    {/* Ícone Chevron para indicar expansão */}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  
                  {/* Área do Submenu com animação simples de altura/opacidade */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="mt-1 flex flex-col gap-1 pl-11 pr-2">
                      {item.subItems.map((sub) => {
                        const isActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                              isActive
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-emerald-600'
                            }`}
                          >
                            {sub.name}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            }

            // Renderização para itens simples (Dashboard)
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href!}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' 
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                <div className={`${isActive ? 'text-white' : 'text-emerald-500'}`}>
                  {item.icon}
                </div>
                {item.name}
              </Link>
            );
          })}
        </nav>

        
      </div>
    </aside>
  );
}
