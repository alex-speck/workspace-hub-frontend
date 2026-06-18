import { FaturamentoChart } from "@/app/components/dashboard/FaturamentoChart";
import { ReservaRow } from "@/app/components/dashboard/ReservaRow";
import { StatCard } from "@/app/components/dashboard/StatCard";
import { DashboardPageProps } from "@/app/types/dashboard/dashboard";


// icons inline para não depender de lib
const IconReceita = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#378ADD" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.107-.879-1.107-2.303 0-3.182s2.9-.879 4.006 0l.415.33" />
  </svg>
);
const IconReservas = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#639922" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
  </svg>
);
const IconClientes = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#BA7517" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
  </svg>
);

export default function DashboardPage({ dashboardData }: DashboardPageProps) {
  const { stats, faturamento, reservasHoje, proximasReservas } = dashboardData;

  return (
    <div className="space-y-10 p-2 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">Dashboard</h1>
        <p className="font-medium text-slate-500">
          Bem-vindo de volta! Aqui está o resumo da sua unidade{" "}
          <span className="font-bold text-emerald-600">hoje</span>.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard title={stats[0].title} value={stats[0].value} icon={<IconReceita />} iconBg="bg-blue-50" />
        <StatCard title={stats[1].title} value={stats[1].value} icon={<IconReservas />} iconBg="bg-green-50" />
        <StatCard title={stats[2].title} value={stats[2].value} icon={<IconClientes />} iconBg="bg-amber-50" />
      </div>

      <FaturamentoChart faturamento={faturamento} />

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="mb-2 text-sm font-medium text-slate-900">Reservas de hoje</h2>
        {reservasHoje.length === 0 ? (
          <p className="text-sm text-slate-400">Nenhuma reserva para hoje.</p>
        ) : (
          reservasHoje.map((r) => <ReservaRow key={r.id} reserva={r} />)
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="mb-2 text-sm font-medium text-slate-900">Próximas reservas</h2>
        {proximasReservas.length === 0 ? (
          <p className="text-sm text-slate-400">Nenhuma reserva futura.</p>
        ) : (
          proximasReservas.map((r) => <ReservaRow key={r.id} reserva={r} showDate />)
        )}
      </div>
    </div>
  );
}