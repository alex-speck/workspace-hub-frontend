'use client'
import { criarEspaco, editarEspaco } from '@/app/services/espaco.service'
import Espaco from '@/app/types/espacos/espaco'
import { EspacosFormProps } from '@/app/types/espacos/espaco.form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { useNotification } from '@/app/hooks/useNotification'

export default function EspacosForm({ espacoExistente }: EspacosFormProps) {
    const router = useRouter();
    const { showError } = useNotification();

    const [espaco, setEspaco] = useState<Espaco>(espacoExistente || { id: 0, nomeNumero: '', tipo: 'MESA_FIXA', valorHora: 0.00, status: 'DISPONIVEL' })
    const [isSaving, setIsSaving] = useState(false)

    const handleChange = (campo: 'nomeNumero' | 'tipo' | 'valorHora', valor: string) => {
        setEspaco(prev => ({
            ...prev,
            [campo]: campo === 'valorHora' ? parseFloat(valor) : valor
        }))
    }

    const handleSalvar = async (formData: FormData) => {
        try {
            setIsSaving(true)
            if (espacoExistente) {
                await editarEspaco(espaco);
            } else {
                await criarEspaco(espaco);
            }
            router.push("/espacos")
        } catch (error: any) {
            console.error(error);
            showError(error.message || "Erro ao salvar espaço")
        } finally {
            setIsSaving(false)
        }
    }


    return (
        <form action={handleSalvar} className="space-y-8">
            <div className="space-y-6">

                <Input
                    label="Identificação do Espaço"
                    type="text"
                    value={espaco.nomeNumero}
                    onChange={(e) => handleChange('nomeNumero', e.target.value)}
                    placeholder="Ex: Sala 04 ou Mesa Premium"
                    required
                />

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
                                required
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase">
                                / Hora
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-slate-100 my-8" />

                <div className="flex items-center justify-end gap-4">
                    <Link href="/espacos">
                        <Button variant="ghost" type="button">
                            Cancelar
                        </Button>
                    </Link>

                    <Button
                        type="submit"
                        isLoading={isSaving}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-emerald-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        }
                    >
                        Salvar Espaço
                    </Button>
                </div>
            </div>
        </form>
    )
}
