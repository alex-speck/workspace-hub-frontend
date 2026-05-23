'use client'

import { useEffect, useState } from "react";
import Footer from "../components/Footer"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function SistemaLayout({ children }: { children: React.ReactNode }) {
  // O estado agora vive no Layout para controlar os dois lados
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();

  const usuario = useSelector((state: RootState) => state.auth.usuario);

  useEffect(() => {
    if (usuario == null) {
      router.push("/login")
    }
  }, [usuario, router]);

  if (usuario == null) return null;

  return (


    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header onMenuClick={() => setIsMobileOpen(!isMobileOpen)} />

      <div className="flex flex-1">

        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} usuarioLogado={usuario} />


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
  );
}