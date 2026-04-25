"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
  usuarioLogado: UsuarioLogado;
}

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  usuarioLogado
}: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    },
    {
      name: "Clientes",
      href: "/clientes",
      icon: (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </>
      ),
    },
    {
      name: "Espaços",
      href: "/espacos",
      icon: (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
          <line x1="3" y1="9" x2="21" y2="9" />
        </>
      ),
    },
    {
      name: "Reservas",
      href: "/reservas",
      icon: (
        <>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </>
      ),
    },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 z-50 h-screen border-r border-emerald-100 bg-white transition-all duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0 w-64 top-0" : "-translate-x-full md:translate-x-0"}
        ${isCollapsed ? "md:w-20 md:top-16 md:h-[calc(100vh-64px)]" : "md:w-64 lg:w-72 md:top-16 md:h-[calc(100vh-64px)]"}
      `}
      >
        {isMobileOpen && (
          <div className="flex justify-end p-4 md:hidden">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="text-slate-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="flex flex-col h-full p-4">
          <div
            className={`flex items-center mb-6 px-2 ${isCollapsed ? "md:justify-center" : "justify-between"}`}
          >
            {(!isCollapsed || isMobileOpen) && (
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Menu do Sistema
              </p>
            )}


            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:block p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-4 w-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)} // Fecha ao clicar no mobile
                  className={`group flex items-center rounded-xl transition-all duration-200 ${isCollapsed && !isMobileOpen
                    ? "md:justify-center px-0 py-3"
                    : "px-4 py-3 gap-3"
                    } ${isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                      : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                >
                  <div
                    className={`shrink-0 ${isActive ? "text-white" : "text-emerald-500 group-hover:text-emerald-600"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      {item.icon}
                    </svg>
                  </div>

                  {(!isCollapsed || isMobileOpen) && (
                    <span className="text-sm font-semibold whitespace-nowrap overflow-hidden">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {usuarioLogado.role !== "RECEPCIONISTA" && (<div className="mt-auto border-t border-slate-50 pt-4">
            <Link
              href="/usuarios"
              className={`
      flex items-center gap-3 p-2 rounded-xl transition-all duration-200
      hover:bg-emerald-50 group
      ${isCollapsed && !isMobileOpen ? "md:justify-center" : "justify-start"}
    `}
              title="Gerenciar Usuários"
            >
              {/* Avatar / Ícone de Usuários */}
              <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm group-active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
              </div>

              {/* Texto descritivo: Só aparece se a sidebar estiver aberta */}
              {(!isCollapsed || isMobileOpen) && (
                <span className="text-sm font-black text-slate-700 group-hover:text-emerald-700 transition-colors">
                  Usuários
                </span>
              )}
            </Link>
          </div>)}
        </div>
      </aside>
    </>
  );
}
