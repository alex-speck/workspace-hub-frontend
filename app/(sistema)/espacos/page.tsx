"use client";

import EspacoModal from '@/app/components/EspacoModal';
import React, { useState } from 'react'; 


export class Espaco {
  constructor(
    public name: string,
    public type: 'Mesa Fixa' | 'Mesa Rotativa' | 'Sala Privativa' | 'Sala de Reunião',
    public hourlyRate: number,
    public id?: number,
    public status: 'Disponível' | 'Ocupado' | 'Manutenção' = 'Disponível',
    public description?: string,
    public imgSource?: string
  ) {}
}

const initialEspacos: Espaco[] = [
  new Espaco("Mesa 01", "Mesa Rotativa", 15.0, 1, "Disponível"),
  new Espaco("Sala Alpha", "Sala de Reunião", 90.0, 2, "Disponível", "Sala com TV e Ar-condicionado"),
  new Espaco("Estação 04", "Mesa Fixa", 25.0, 3, "Ocupado"),
];

export default function Espacos() {
  const [espacos, setEspacos] = useState<Espaco[]>(initialEspacos);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedEspaco, setSelectedEspaco] = useState<Espaco | undefined>(undefined);

  const handleOpenCreate = () => {
    setModalMode('create');
    setSelectedEspaco(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (espaco: Espaco) => {
    setModalMode('edit');
    setSelectedEspaco(espaco);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-end mb-10">
        <div>
          <span className="text-emerald-600 font-bold text-sm uppercase tracking-widest">Coworking</span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Espaços</h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-slate-900/20 transition-all active:scale-95 flex items-center gap-2 hover:cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Novo Espaço
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Espaço</th>
              <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tipo</th>
              <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Valor/Hora</th>
              <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {espacos.map((espaco) => (
              <tr key={espaco.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{espaco.name}</span>
                    {espaco.description && (
                      <span className="text-xs text-slate-400 truncate max-w-[200px]">{espaco.description}</span>
                    )}
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full text-[12px]">
                    {espaco.type}
                  </span>
                </td>
                <td className="px-8 py-5 text-sm font-bold text-slate-700">
                  {espaco.hourlyRate.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      espaco.status === 'Disponível' ? 'bg-emerald-500' : 
                      espaco.status === 'Ocupado' ? 'bg-amber-500' : 'bg-slate-400'
                    }`} />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">{espaco.status}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <button 
                    onClick={() => handleOpenEdit(espaco)}
                    className="p-2 text-slate-300 hover:text-emerald-600 transition-colors hover:cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EspacoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={selectedEspaco}
      />
    </div>
  );
}