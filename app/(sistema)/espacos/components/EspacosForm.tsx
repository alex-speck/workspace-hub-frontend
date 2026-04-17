'use client'
import { useConfirm } from '@/app/context/ConfirmContext'
import Espaco from '@/app/types/espacos/espaco'
import { EspacosFormProps } from '@/app/types/espacos/espacoForm'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'



export default function EspacosForm({ espacoExistente }: EspacosFormProps) {
    const router = useRouter();
    const { alert } = useConfirm();

    const [espaco, setEspaco] = useState<Espaco>(espacoExistente || new Espaco(0, '', 'MESA_FIXA', 0.00, 'DISPONIVEL'))

    const handleChange = (campo: 'nomeNumero' | 'tipo' | 'valorHora', valor: string) => {
        setEspaco(prev =>
            new Espaco(
                prev.id,
                campo === 'nomeNumero' ? valor : prev.nomeNumero,
                campo === 'tipo' ? valor as 'MESA_FIXA' | 'MESA_ROTATIVA' | 'SALA_PRIVATIVA' : prev.tipo,
                campo === 'valorHora' ? parseFloat(valor) : prev.valorHora,
                prev.status
            )
        )
    }

    const handleSalvar = async (formData: FormData) => {
        if (espacoExistente) {
            try {
                const response = await axios.put(`http://localhost:8080/espacos/${espacoExistente.id}`, {
                    nomeNumero: espaco.nomeNumero,
                    tipo: espaco.tipo,
                    valorHora: espaco.valorHora
                })
                if (response.status === 200) {
                    await alert("Espaço atualizado com sucesso!", true, "Atualizado!")
                    router.push("/espacos")
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await axios.post(`http://localhost:8080/espacos`, {
                    nomeNumero: espaco.nomeNumero,
                    tipo: espaco.tipo,
                    valorHora: espaco.valorHora
                })

                if (response.status === 201) {
                    await alert("Espaço criado com sucesso!", true, "Sucesso!")
                    router.push("/espacos")
                }
            } catch (error) {
                console.error(error);
            }
        }
    }


    return (
        <form action={handleSalvar} className="space-y-8">
            <div className="space-y-6">

                <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-slate-400 ml-1">
                        Identificação do Espaço
                    </label>
                    <input
                        type="text"
                        value={espaco.nomeNumero}
                        onChange={(e) => handleChange('nomeNumero', e.target.value)}
                        placeholder="Ex: Sala 04 ou Mesa Premium"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="space-y-2">
                        <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-slate-400 ml-1">
                            Tipo de Unidade
                        </label>
                        <div className="relative">
                            <select
                                value={espaco.tipo}
                                onChange={(e) => handleChange('tipo', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all appearance-none cursor-pointer"
                            >
                                <option value="MESA_FIXA">Mesa Fixa</option>
                                <option value="MESA_ROTATIVA">Mesa Rotativa</option>
                                <option value="SALA_PRIVATIVA">Sala Privada</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-slate-400 ml-1">
                            Preço da Hora
                        </label>
                        <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm border-r border-slate-200 pr-3">
                                R$
                            </div>
                            <input
                                type="number"
                                step="0.01"
                                value={espaco.valorHora}
                                onChange={(e) => handleChange('valorHora', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-16 pr-20 py-4 text-sm font-bold outline-none text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase">
                                / Hora
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-slate-100 my-8" />

                <div className="flex items-center justify-end gap-4">
                    <Link
                        href="/espacos"
                        className="px-8 py-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors rounded-2xl hover:bg-slate-50"
                    >
                        Cancelar
                    </Link>

                    <button
                        type="submit"
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-slate-900/10 transition-all active:scale-95 flex items-center gap-2 hover:cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-emerald-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Salvar Espaço
                    </button>
                </div>
            </div>
        </form>
    )
}
