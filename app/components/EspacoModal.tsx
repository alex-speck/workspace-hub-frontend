'use client'
import React from 'react'
import { Espaco } from '../(sistema)/espacos/page';

interface EspacoModalProps {
  isOpen: boolean,
  onClose: () => void,
  mode: 'create' | 'edit',
  initialData?: Espaco
}

export default function EspacoModal({ isOpen, onClose, mode, initialData }: EspacoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      
      <div 
        className="fixed inset-0 h-screen w-screen bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/20 border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="px-8 pt-8 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {mode === 'create' ? 'Novo' : 'Editar'} <span className="text-emerald-600">Espaço</span>
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors hover:cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="p-8 pt-4 space-y-5">
          
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Nome ou Número</label>
            <input 
              type="text" 
              name='name' 
              defaultValue={initialData?.name || ''}
              placeholder="Ex: Mesa 01, Sala de Reunião A"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Tipo</label>
              <select 
                name='type'
                defaultValue={initialData?.type || 'Mesa Rotativa'}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all appearance-none cursor-pointer"
              >
                <option value="Mesa Fixa">Mesa Fixa</option>
                <option value="Mesa Rotativa">Mesa Rotativa</option>
                <option value="Sala Privativa">Sala Privativa</option>
                <option value="Sala de Reunião">Sala de Reunião</option>
              </select>
            </div>

            
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Valor por Hora</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">R$</span>
                <input 
                  type="number" 
                  step="0.01"
                  name='hourlyRate'
                  defaultValue={initialData?.hourlyRate || ''}
                  placeholder="0,00"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-5 py-3 text-sm outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                />
              </div>
            </div>
          </div>

          
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Descrição (Opcional)</label>
            <textarea 
              name='description'
              rows={3}
              defaultValue={initialData?.description || ''}
              placeholder="Detalhes sobre o equipamento, localização, etc."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none"
            />
          </div>

          
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-50">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors hover:cursor-pointer"
            >
              Descartar
            </button>
            <button 
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3 rounded-2xl shadow-lg transition-all active:scale-95 hover:cursor-pointer"
            >
              {mode === 'create' ? 'Cadastrar Espaço' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}