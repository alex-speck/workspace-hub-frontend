'use client'
const stats = [
  { name: 'Faturamento Hoje', value: 'R$ 1.250,00', change: '+12%', icon: '💰' },
  { name: 'Reservas Ativas', value: '18', change: '5 agora', icon: '📅' },
  { name: 'Ocupação Atual', value: '75%', change: '+5% vs ontem', icon: '🚀' },
];



const statusColors: { [key: string]: string } = {
  'Concluído': 'bg-emerald-100 text-emerald-800',
  'Em andamento': 'bg-sky-100 text-sky-800',
  'Pendente': 'bg-amber-100 text-amber-800',
  'Agendado': 'bg-slate-100 text-slate-800',
};

export default function Dashboard() {


  return (
    <div className="space-y-10 p-2">

      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-500 font-medium">
          Bem-vindo de volta! Aqui está o resumo da sua unidade <span className="text-emerald-600 font-bold">hoje</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="relative overflow-hidden bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-900/5 group hover:border-emerald-200 transition-all duration-300">
            
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />

            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.name}</span>
              <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl text-2xl group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                {stat.icon}
              </div>
            </div>

            <div className="mt-6 relative z-10">
              <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.5-5.5a.75.75 0 011.08 0l5.5 5.5a.75.75 0 11-1.08 1.04l-3.96-3.908V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="text-sm text-emerald-600 font-bold">{stat.change}</p>
                <span className="text-xs text-slate-400 font-medium italic">vs. ontem</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    

    </div>
  );
}
