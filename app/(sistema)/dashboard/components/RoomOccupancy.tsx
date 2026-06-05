import { OcupacaoSala } from "@/app/types/dashboard/dashboard";

interface RoomOccupancyProps {
    data: OcupacaoSala[];
}

export default function RoomOccupancy({ data }: RoomOccupancyProps) {
    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-900/5">
            <div className="mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Ocupação por Sala</h3>
                <p className="text-sm text-slate-500 font-medium">Uso em tempo real de cada ambiente</p>
            </div>

            <div className="space-y-6">
                {data.map((sala) => (
                    <div key={sala.id} className="space-y-2">
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-black text-slate-700 tracking-tight">{sala.nome}</span>
                            <span className={`text-xs font-black ${
                                sala.percentual > 80 ? 'text-rose-500' : 
                                sala.percentual > 50 ? 'text-amber-500' : 
                                'text-emerald-500'
                            }`}>
                                {sala.percentual}%
                            </span>
                        </div>
                        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                    sala.percentual > 80 ? 'bg-rose-500' : 
                                    sala.percentual > 50 ? 'bg-amber-500' : 
                                    'bg-emerald-500'
                                }`}
                                style={{ width: `${sala.percentual}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ideal</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alerta</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Crítico</span>
                </div>
            </div>
        </div>
    );
}
