import Reserva from "@/app/types/reserva/reserva";

interface ReservationsListProps {
    title: string;
    reservations: Reserva[];
}

export default function ReservationsList({ title, reservations }: ReservationsListProps) {
    const statusColors: { [key: string]: string } = {
        'CONCLUIDA': 'bg-emerald-100 text-emerald-800',
        'ABERTA': 'bg-sky-100 text-sky-800',
        'CANCELADA': 'bg-rose-100 text-rose-800',
    };

    return (
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-900/5 flex flex-col h-fit">
            <div className="mb-6">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">{title}</h3>
                <p className="text-sm text-slate-500 font-medium">Gestão de agendamentos</p>
            </div>

            <div className="flex-1 overflow-auto max-h-[400px] pr-2 custom-scrollbar">
                {reservations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                        <span className="text-4xl mb-2">📅</span>
                        <p className="font-medium">Nenhuma reserva encontrada</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {reservations.map((reserva) => (
                            <div 
                                key={reserva.id} 
                                className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-emerald-100 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white border border-slate-100 text-slate-900 group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-colors">
                                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Início</span>
                                        <span className="text-sm font-black tracking-tighter">{reserva.horaInicio}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900 leading-tight">{reserva.cliente.nome}</h4>
                                        <p className="text-xs text-slate-500 font-bold">{reserva.espaco.nomeNumero}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${statusColors[reserva.status] || 'bg-slate-100 text-slate-800'}`}>
                                        {reserva.status}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 italic">R$ {reserva.valorTotal.toLocaleString('pt-BR')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
