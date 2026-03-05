import Footer from "../components/Footer"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar";

export default function SistemaLayout({children}: {children:React.ReactNode}) {
    return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Header fixo no topo ocupando 100% da largura */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar fixa na esquerda */}
        <Sidebar />

        {/* Área de conteúdo principal:
          Adicionamos md:pl-64 para "empurrar" o conteúdo para a direita 
          e não ficar embaixo da Sidebar fixa.
        */}
        <div className="flex flex-1 flex-col md:pl-64">
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
          
          {/* Footer dentro da área de conteúdo para alinhar com o main */}
          <Footer />
        </div>
      </div>
    </div>
  );
}