'use client'

import { useState } from "react";
import Footer from "../components/Footer"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar";

export default function SistemaLayout({children}: {children:React.ReactNode}) {
    // O estado agora vive no Layout para controlar os dois lados
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <div className="flex flex-1">
        {/* Passamos o estado e a função para a Sidebar */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* A mágica acontece aqui: 
            O padding-left muda de acordo com o estado da Sidebar.
        */}
        <div className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${
            isCollapsed ? "md:pl-20" : "md:pl-64 lg:pl-72"
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