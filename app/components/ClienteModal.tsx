'use client'

import { useState } from "react";
import Cliente from "../model/Cliente";
import MessageModal from "./MessageModal";


interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: Cliente;
}

export default function ClienteModal({ isOpen, onClose, mode, initialData }: ClienteModalProps) {

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {

    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const documento = formData.get('documento');

    // fazer post na API
    // adicionar ao contexto

    setIsMessageModalOpen(true);
  }


  if (!isOpen && !isMessageModalOpen) return null;

  return (
    <>
      {isMessageModalOpen && (
        <MessageModal 
          isOpen={isMessageModalOpen} 
          title="Cliente criado com sucesso!" 
          onClose={() => {
            setIsMessageModalOpen(false);
            onClose(); 
          }} 
        />
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 h-screen w-screen bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={onClose}
          />

          <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/20 border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="px-8 pt-8 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  {mode === 'create' ? 'Novo' : 'Editar'} <span className="text-emerald-600">Cliente</span>
                </h2>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">
                  Dados do Coworker
                </p>
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

            <form className="p-8 pt-4 space-y-5" action={handleSubmit}>
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Nome</label>
                <input 
                  type="text" 
                  name='name' 
                  defaultValue={initialData?.name || ''}
                  placeholder="Nome completo"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Email</label>
                <input 
                  type="email" 
                  name='email' 
                  defaultValue={initialData?.email || ''}
                  placeholder="exemplo@email.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Telefone</label>
                  <input 
                    type="tel" 
                    name='phone'
                    defaultValue={initialData?.phone || ''}
                    placeholder="(00) 00000-0000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Documento</label>
                  <input 
                    type="text" 
                    name='documento'
                    defaultValue={initialData?.documento || ''}
                    placeholder="CPF/CNPJ"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6">
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
                  {mode === 'create' ? 'Cadastrar' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}