'use client'
import React, { useState } from 'react'
import Espaco from '../model/Espaco';
import MessageModal from './MessageModal';

interface EspacoModalProps {
  isOpen: boolean,
  onClose: () => void,
  mode: 'create' | 'edit',
  initialData?: Espaco
}

export default function EspacoModal({ isOpen, onClose, mode, initialData }: EspacoModalProps) {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name');
    const type = formData.get('type');
    const hourlyRate = formData.get('hourlyRate');
    const description = formData.get('description');

    // fazer post na API

    setIsMessageModalOpen(true);
  }


  if (!isOpen && !isMessageModalOpen) return null;

  return (
    <>
      {/* Modal de Feedback de Sucesso */}
      <MessageModal 
        isOpen={isMessageModalOpen}
        type="success"
        title={mode === 'create' ? "Espaço Cadastrado!" : "Alterações Salvas!"}
        message={mode === 'create' 
          ? "O novo espaço já está disponível para reservas." 
          : "As informações do espaço foram atualizadas com sucesso."
        }
        onClose={() => {
          setIsMessageModalOpen(false);
          onClose(); // Fecha o modal de formulário junto
        }}
      />

      {/* Modal Principal de Formulário */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 h-screen w-screen bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={onClose}
          />

          <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/20 border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">

            {/* Header */}
            <div className="px-8 pt-8 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  {mode === 'create' ? 'Novo' : 'Editar'} <span className="text-emerald-600">Espaço</span>
                </h2>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">
                  {mode === 'create' ? 'Cadastrar novo posto ou sala' : `Editando: ${initialData?.name}`}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors hover:cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="p-8 pt-4 space-y-6" action={handleSubmit}>
              {/* Imagem do Espaço */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Imagem do Espaço</label>
                <div className="relative group mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-3xl hover:border-emerald-400 hover:bg-emerald-50/50 transition-all cursor-pointer">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-10 w-10 text-slate-400 group-hover:text-emerald-500 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l1.25 1.25m-18.375 2.625h16.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-16.5A2.25 2.25 0 003 6.75v8.25a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <div className="flex text-sm text-slate-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-bold text-emerald-600 hover:text-emerald-700">
                        <span>Upload</span>
                        <input id="file-upload" name="image" type="file" accept="image/*" className="sr-only" />
                      </label>
                      <p className="pl-1 text-slate-500">ou arraste e solte</p>
                    </div>
                    <p className="text-xs text-slate-400">PNG, JPG, WEBP até 5MB</p>
                  </div>
                </div>
              </div>

              {/* Nome ou Número */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Nome ou Número</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={initialData?.name || ''}
                  placeholder="Ex: Mesa 01, Sala de Reunião A"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none text-slate-900 font-medium placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:font-normal"
                />
              </div>

              {/* Grid: Tipo e Valor */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 relative">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Tipo</label>
                  <select
                    name="type"
                    defaultValue={initialData?.type || 'Mesa Rotativa'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none text-slate-900 font-medium focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Mesa Fixa">Mesa Fixa</option>
                    <option value="Mesa Rotativa">Mesa Rotativa</option>
                    <option value="Sala Privativa">Sala Privativa</option>
                    <option value="Sala de Reunião">Sala de Reunião</option>
                  </select>
                  <svg className="absolute right-4 top-[38px] h-5 w-5 text-slate-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Valor por Hora</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold tracking-wider">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      name="hourlyRate"
                      defaultValue={initialData?.hourlyRate || ''}
                      placeholder="0,00"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-3.5 text-sm outline-none text-slate-900 font-bold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:font-normal"
                    />
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Descrição (Opcional)</label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={initialData?.description || ''}
                  placeholder="Detalhes sobre o equipamento, localização, etc."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none text-slate-900 font-medium placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none placeholder:font-normal"
                />
              </div>

              {/* Ações */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors hover:cursor-pointer rounded-xl hover:bg-slate-50"
                >
                  Descartar
                </button>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-slate-900/10 transition-all active:scale-95 hover:cursor-pointer text-sm"
                >
                  {mode === 'create' ? 'Cadastrar Espaço' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}