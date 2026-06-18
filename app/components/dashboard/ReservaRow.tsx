import { useRouter } from "next/navigation";
import Reserva from "../../types/reserva/reserva";


const STATUS_STYLE: Record<Reserva["status"], string> = {
  ABERTA: "bg-blue-50 text-blue-700",
  CONCLUIDA: "bg-green-50 text-green-700",
  CANCELADA: "bg-red-50 text-red-700",
};

const STATUS_LABEL: Record<Reserva["status"], string> = {
  ABERTA: "Aberta",
  CONCLUIDA: "Concluída",
  CANCELADA: "Cancelada",
};

interface Props {
  reserva: Reserva;
  showDate?: boolean;
}

export function ReservaRow({ reserva, showDate = false }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/reservas/${reserva.id}`)}
      className="group flex cursor-pointer items-center justify-between gap-4 border-b border-slate-100 px-4 py-3.5 last:border-none rounded-2xl hover:bg-slate-50/80 transition-all duration-200"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors tracking-tight">
          {reserva.espaco.nomeNumero}
        </span>
        <span className="text-xs font-medium text-slate-400 truncate">
          {reserva.cliente.nome}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-3.5">
        {/* Data e Horário */}
        <span className="text-xs font-bold text-slate-400 tracking-tight bg-slate-100/50 group-hover:bg-white px-2.5 py-1 rounded-xl transition-colors">
          {showDate && (
            <span className="text-slate-500 font-extrabold">
              {reserva.data} <span className="text-slate-300 mx-1">·</span>
            </span>
          )}
          {reserva.horaInicio.slice(0, 5)} – {reserva.horaFim.slice(0, 5)}
        </span>

        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${STATUS_STYLE[reserva.status]}`}>
          {STATUS_LABEL[reserva.status]}
        </span>

        <div className="text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}