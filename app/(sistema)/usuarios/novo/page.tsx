import Link from 'next/link'
import UsuarioForm from '../components/UsuarioForm'

export default function CadastrarUsuario() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">

        <div className="flex items-center gap-6 mb-10">
          <Link
            href="/usuarios"
            className="group flex items-center justify-center w-12 h-12 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-400 hover:text-emerald-600 transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>

          <div>
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">Painel de Controle</span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Novo <span className="text-emerald-600">Usuário</span>
            </h1>
            <p className="text-sm text-slate-400 font-medium">Preencha os campos abaixo para registrar um novo usuario.</p>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-900/5 border border-slate-100 p-10 relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-400" />
          <UsuarioForm />
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-500">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-xs font-medium italic">
            Por padrão, novos usuários são criados com o status <span className="text-emerald-600 font-bold">Ativo</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
