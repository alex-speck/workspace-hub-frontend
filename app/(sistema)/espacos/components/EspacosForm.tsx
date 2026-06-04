'use client'
import { buscarEnderecoPeloCep, criarEspaco, editarEspaco } from '@/app/services/espaco.service'
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

    const [erroCep, setErroCep] = useState<boolean>(false);
    const [espaco, setEspaco] = useState<Espaco>(espacoExistente || {
        id: 0,
        nomeNumero: '',
        tipo: 'MESA_FIXA',
        valorHora: 0.00,
        endereco: {
            logradouro: "",
            numero: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: ""
        },
        status: 'DISPONIVEL'
    })
    const [isSaving, setIsSaving] = useState(false)

    console.log(espaco)

    const handleChange = (campo: 'nomeNumero' | 'tipo' | 'valorHora', valor: string) => {
        setEspaco(prev => ({
            ...prev,
            [campo]: campo === 'valorHora' ? parseFloat(valor) : valor
        }))
    }

    const handleEnderecoChange = async (campo: string, valor: string) => {
        if (campo === "cep" && valor.length === 8) {
            try {
                const dadosEndereco = await buscarEnderecoPeloCep(valor);

                setEspaco(prev => ({
                    ...prev,
                    endereco: {
                        logradouro: dadosEndereco?.street,
                        numero: prev.endereco.numero,
                        bairro: dadosEndereco?.neighborhood,
                        cidade: dadosEndereco?.city,
                        uf: dadosEndereco?.state,
                        cep: valor
                    }
                }))
            } catch (error) {
                setErroCep(true);
            }
        } else if (campo === "numero") {
            setEspaco(prev => ({
                ...prev,
                endereco: {
                    ...prev.endereco,
                    numero: valor
                }
            }))
        }
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
        <form action={handleSalvar} className="space-y-8 animate-in fade-in duration-500">
            <div className="space-y-8">

                {/* SEÇÃO 1: DADOS BÁSICOS DO ESPAÇO */}
                <div className="space-y-6">
                    <div className="border-b border-slate-100 pb-2">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                            Informações do Espaço
                        </h3>
                    </div>

                    <Input
                        label="Identificação do Espaço"
                        type="text"
                        value={espaco.nomeNumero}
                        onChange={(e) => handleChange('nomeNumero', e.target.value)}
                        placeholder="Ex: Sala 04 ou Mesa Premium"
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tipo de Unidade */}
                        <div className="space-y-2">
                            <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-slate-400 ml-1">
                                Tipo de Unidade
                            </label>
                            <div className="relative">
                                <select
                                    value={espaco.tipo}
                                    onChange={(e) => handleChange('tipo', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-semibold outline-none text-slate-900 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="MESA_FIXA">Mesa Fixa</option>
                                    <option value="MESA_ROTATIVA">Mesa Rotativa</option>
                                    <option value="SALA_PRIVATIVA">Sala Privada</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Preço da Hora */}
                        <div className="space-y-2">
                            <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-slate-400 ml-1">
                                Preço da Hora
                            </label>
                            <div className="relative group">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm border-r border-slate-200 pr-3">
                                    R$
                                </div>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={espaco.valorHora}
                                    onChange={(e) => handleChange('valorHora', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-20 py-4 text-sm font-bold outline-none text-slate-900 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all"
                                    required
                                />
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                    / Hora
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEÇÃO 2: ENDEREÇO / LOCALIZAÇÃO */}
                <div className="space-y-6 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                    <div className="border-b border-slate-100 pb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                            Localização e Endereço
                        </h3>
                    </div>

                    {/* Grid do Endereço */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

                        {/* CEP */}
                        <div className="md:col-span-4 relative">
                            <Input
                                label="CEP"
                                className={`${erroCep ? "border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-red-500/10" : ""}`}
                                value={espaco.endereco.cep}
                                onChange={(e) => handleEnderecoChange("cep", e.target.value)}
                                placeholder="00000-000"
                                required
                            />
                            {erroCep && (
                                <span className="text-[11px] font-semibold text-red-500 mt-1 block animate-in fade-in duration-200">
                                    ⚠️ Erro ao buscar o CEP informado.
                                </span>
                            )}
                        </div>

                        {/* Número */}
                        <div className="md:col-span-3">
                            <Input
                                label="Número"
                                value={espaco.endereco.numero}
                                onChange={(e) => handleEnderecoChange("numero", e.target.value)}
                                placeholder="Ex: 123"
                                required
                            />
                        </div>

                        {/* Logradouro (Rua/Av) - Ocupa o restante da linha superior ou quebra elegantemente */}
                        <div className="md:col-span-5">
                            <Input
                                label="Logradouro"
                                value={espaco.endereco.logradouro}
                                className="bg-slate-100/80 text-slate-500 cursor-not-allowed opacity-80"
                                readOnly
                            />
                        </div>

                        {/* Bairro */}
                        <div className="md:col-span-5">
                            <Input
                                label="Bairro"
                                value={espaco.endereco.bairro}
                                className="bg-slate-100/80 text-slate-500 cursor-not-allowed opacity-80"
                                readOnly
                            />
                        </div>

                        {/* Cidade */}
                        <div className="md:col-span-5">
                            <Input
                                label="Cidade"
                                value={espaco.endereco.cidade}
                                className="bg-slate-100/80 text-slate-500 cursor-not-allowed opacity-80"
                                readOnly
                            />
                        </div>

                        {/* UF */}
                        <div className="md:col-span-2">
                            <Input
                                label="UF"
                                value={espaco.endereco.uf}
                                className="bg-slate-100/80 text-slate-500 text-center cursor-not-allowed opacity-80"
                                readOnly
                            />
                        </div>

                    </div>
                </div>

                {/* LINHA SEPARADORA DE AÇÕES */}
                <div className="h-px bg-slate-100 my-4" />

                {/* BOTÕES DE AÇÃO */}
                <div className="flex items-center justify-end gap-4 pt-2">
                    <Link href="/espacos">
                        <Button variant="ghost" type="button" className="text-slate-500 hover:text-slate-800 font-bold px-6 h-12 rounded-2xl transition-colors">
                            Cancelar
                        </Button>
                    </Link>

                    <Button
                        type="submit"
                        isLoading={isSaving}
                        className="h-12 px-6 bg-slate-900 hover:bg-emerald-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-slate-900/5 hover:shadow-emerald-600/20 flex items-center gap-2"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors">
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
