import CadastroEmpresaForm from '@/app/components/CadastroEmpresa'
import Image from 'next/image'
import CadastroImg from '@/app/public/assets/cadastro-image.png'
import Link from 'next/link'

export default function CadastrarEmpresa() {

   return (
      <div className="min-h-screen w-full bg-white flex flex-col md:flex-row">

         <div className="relative w-full md:w-[45%] bg-slate-900 p-8 md:p-16 flex flex-col justify-between overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent" />

            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-12">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                     </svg>
                  </div>
                  <span className="text-white font-black tracking-tighter text-xl">WorkSpace<span className="text-emerald-500">Manager</span></span>
               </div>

               <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1]">
                  Comece a gerenciar seus <br />
                  <span className="text-emerald-500 italic">WorkSpaces</span> agora!
               </h1>
               <p className="mt-6 text-slate-400 text-lg max-w-md font-medium leading-relaxed">
                  Junte-se a centenas de unidades que profissionalizaram a gestão de coworking com nossa plataforma.
               </p>
            </div>

            <div className="relative z-10 mt-12 md:mt-0">
               <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="relative aspect-video bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden border border-white/5 shadow-2xl">
                     <Image
                        src={CadastroImg} // Use a variável importada aqui
                        alt="Preview do Dashboard WorkSpace Manager"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 45vw"
                        priority
                     />
                  </div>
               </div>
            </div>

            <div className="relative z-10 mt-12">
               <div className="flex gap-4 items-center">
                  <div className="flex -space-x-3">
                     {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700" />
                     ))}
                  </div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                     +500 gestores ativos
                  </p>
               </div>
            </div>
         </div>

         <div className="w-full md:w-[55%] bg-white p-8 md:p-24 flex items-center justify-center overflow-y-auto">
            <div className="w-full max-w-xl animate-in fade-in slide-in-from-right-8 duration-700">

               <div className="md:hidden mb-8 text-center">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Criar Conta</h2>
                  <p className="text-slate-500 font-medium">Preencha os dados da sua unidade.</p>
               </div>

               <div className="bg-white">
                  <CadastroEmpresaForm />
               </div>

               <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-slate-400 text-sm font-medium">
                     Já possui uma conta? <Link href={"/login"} className="text-emerald-600 font-bold hover:underline cursor-pointer">Fazer Login</Link>
                  </p>
                  <div className="flex gap-6 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                     <span className="hover:text-slate-500 cursor-pointer transition-colors">Privacidade</span>
                     <span className="hover:text-slate-500 cursor-pointer transition-colors">Termos</span>
                  </div>
               </div>
            </div>
         </div>

      </div>
   )
}
