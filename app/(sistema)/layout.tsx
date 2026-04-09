'use client'

import { useEffect, useState } from "react";
import Footer from "../components/Footer"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { ClientesProvider } from "../context/ClientesContext";
import { ConfirmProvider } from "../context/ConfirmContext";

export default function SistemaLayout({ children }: { children: React.ReactNode }) {
  // O estado agora vive no Layout para controlar os dois lados
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { usuario } = useAuth();
  const router = useRouter();

  useEffect(() => {
    debugger;
    if (usuario == null) {
      router.push("/login")
    }
  })

  if (usuario == null) return null;

  return (
    <ConfirmProvider>
      <ClientesProvider>
        <div className="flex min-h-screen flex-col bg-slate-50">
          <Header onMenuClick={() => setIsMobileOpen(!isMobileOpen)} />

          <div className="flex flex-1">

            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />


            <div className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${isCollapsed ? "md:pl-20" : "md:pl-64 lg:pl-72"
              }`}>
              <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                  {children}
                </div>
              </main>

              <Footer />
            </div>
          </div>
        </div>
      </ClientesProvider >
    </ConfirmProvider>
  );
}