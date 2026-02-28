import Link from "next/link";

export default function LandingPage() {
  const year = new Date().getFullYear();
  // URL de uma sala de reunião moderna (você pode substituir por uma local ou outra do Unsplash)
  const bgImage = "https://statics.forbesargentina.com/2023/04/6446cc8bd9410.jpg";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* NAVBAR: Ajustada para ser visível sobre o fundo da imagem */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/20 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-20">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="h-5 w-5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-white">WorkSpace<span className="text-emerald-400"> Hub</span></span>
          </div>

          <div className="flex items-center">
            <Link
              href="/login"
              className="group flex items-center gap-2 text-sm font-semibold text-slate-200 transition-all hover:text-white"
            >
              <span>Já é um cliente? <span className="text-emerald-400 font-bold group-hover:underline underline-offset-4">Faça login</span></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO: Com Imagem de Fundo e Overlay */}
      <section className="relative pt-48 pb-32 px-6 min-h-[90vh] flex items-center bg-slate-900">
        
        {/* Camada da Imagem */}
        <div className="absolute inset-0 z-0">
          <img 
            src={bgImage} 
            alt="Escritório moderno" 
            className="w-full h-full object-cover opacity-40 brightness-[0.6]"
          />
          {/* Gradiente para suavizar a transição com a próxima seção */}
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/60 via-slate-950/40 to-slate-50" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white mb-8 drop-shadow-md">
            Gerencie sua unidade de coworking com <span className="text-emerald-400">controle absoluto.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-12 font-medium drop-shadow-sm">
            Uma plataforma robusta para redes de coworking. Cada gestor com sua visão, cada unidade com sua autonomia. Segurança de dados e isolamento completo por empresa.
          </p>
          <div className="flex justify-center">
            <Link
              href="/registrar"
              className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-10 py-5 text-lg font-black text-white shadow-2xl shadow-emerald-500/20 transition-all hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Começar Agora</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
              <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </section>

      {/* CARDS DE REGRA DE NEGÓCIO */}
      <section className="py-24 px-6 relative z-10 -mt-10">
        <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-extrabold mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
              Isolamento de Dados
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Gestores visualizam exclusivamente seus espaços, clientes e faturamento. Privacidade total entre unidades da rede.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-extrabold mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
              Gestão de Inventário
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Controle mesas fixas, salas de reunião e posições de hot-desk. Atualização de status em tempo real.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-extrabold mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
              Dashboard de Unidade
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Métricas de ocupação e saúde financeira específicas para a sua unidade, sem interferência de terceiros.
            </p>
          </div>
        </div>
      </section>

      {/* SOBRE O CRIADOR */}
      <section className="py-24 bg-emerald-950 text-white px-6">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16">
          <div className="w-48 h-48 bg-emerald-800 rounded-full flex items-center justify-center text-4xl font-black border-4 border-emerald-500/30 shadow-2xl">
            AS
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6 italic">"A arquitetura por trás do WorkSpace Hub"</h2>
            <p className="text-emerald-100/70 text-lg mb-6 leading-relaxed">
              "Desenvolvi este sistema com foco na regra de negócio de isolamento total. O objetivo é que grandes redes de coworking possam oferecer uma ferramenta de gestão única para seus gerentes, garantindo que cada um foque na sua própria operação com segurança e performance."
            </p>
            <p className="font-bold text-emerald-400">— Alex Speck, Desenvolvedor de Software</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-200 text-center bg-white">
        <p className="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase">
          © {year} WorkSpace Hub — Enterprise Edition
        </p>
      </footer>
    </div>
  );
}
