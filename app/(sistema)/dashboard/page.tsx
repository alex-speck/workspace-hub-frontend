import React from 'react'

// --- DADOS MOCKADOS ---
const stats = [
  { name: 'Faturamento Hoje', value: 'R$ 1.250,00', change: '+12%', icon: '💰' },
  { name: 'Reservas Ativas', value: '18', change: '5 agora', icon: '📅' },
  { name: 'Ocupação Atual', value: '75%', change: '+5% vs ontem', icon: '🚀' },
];

const agendamentosDoDia = [
  { id: 1, cliente: 'Alex Speck', espaco: 'Sala de Reunião A', inicio: '09:00', fim: '11:00', status: 'Concluído' },
  { id: 2, cliente: 'Ana Silva', espaco: 'Mesa Rotativa 03', inicio: '10:00', fim: '18:00', status: 'Em andamento' },
  { id: 3, cliente: 'Pedro Souza', espaco: 'Sala Privativa 02', inicio: '14:00', fim: '16:00', status: 'Pendente' },
  { id: 4, cliente: 'Marina Lima', espaco: 'Sala de Reunião B', inicio: '15:30', fim: '17:00', status: 'Agendado' },
];

const statusColors: { [key: string]: string } = {
  'Concluído': 'bg-emerald-100 text-emerald-800',
  'Em andamento': 'bg-sky-100 text-sky-800',
  'Pendente': 'bg-amber-100 text-amber-800',
  'Agendado': 'bg-slate-100 text-slate-800',
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      
      {/* Header do Dashboard */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Bem-vindo de volta! Aqui está o resumo da sua unidade hoje.</p>
      </div>

      {/* --- CARDS DE MÉTRICAS --- */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">{stat.name}</span>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="mt-4 text-3xl font-black text-slate-900">{stat.value}</p>
            <p className="mt-1 text-sm text-emerald-600 font-semibold">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* --- TIMELINE DE AGENDAMENTOS DO DIA --- */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-slate-900">Agendamentos de Hoje</h2>
          <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Ver todas</button>
        </div>

        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {agendamentosDoDia.map((agendamento, agendamentoIdx) => (
              <li key={agendamento.id}>
                <div className="relative pb-8">
                  {/* Linha vertical da timeline */}
                  {agendamentoIdx !== agendamentosDoDia.length - 1 ? (
                    <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
                  ) : null}
                  
                  <div className="relative flex space-x-3">
                    {/* Ícone da timeline */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-100 ring-4 ring-white">
                      <span className="text-xs font-bold text-emerald-600">
                        {agendamento.inicio.split(':')[0]}h
                      </span>
                    </div>

                    {/* Conteúdo do item */}
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {agendamento.cliente} <span className="font-normal text-slate-500">em</span> {agendamento.espaco}
                        </p>
                        <p className="text-xs text-slate-500">
                          {agendamento.inicio} - {agendamento.fim}
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-slate-500">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusColors[agendamento.status]}`}>
                          {agendamento.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
    </div>
  );
}
