import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-emerald-100 bg-white py-6 md:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">
              © {currentYear} <span className="font-semibold text-emerald-600 tracking-tight">WorkSpace Hub</span>.
            </span>
            <span className="hidden text-sm text-slate-400 md:inline">Todos os direitos reservados.</span>
          </div>

          <nav className="flex items-center gap-6">
            <a 
              href="https://forms.gle/7P5R1f8kAvAcQbvT8" 
              target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-4 w-4"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Suporte
            </a>

            <a 
              href="https://www.youtube.com/watch?v=Aq5WXmQQooo" 
              target="_blank" rel="noopener noreferrer"
              //TODO: Adicionar rota no backend que baixa arquivo placeholder de termos de uso
              className="group flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-4 w-4"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Termos de Uso
            </a>
          </nav>
          
        </div>

        {/* Mensagem mobile-only simplificada (opcional) */}
        <div className="mt-4 block text-center md:hidden">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            Coworking Management System v1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
