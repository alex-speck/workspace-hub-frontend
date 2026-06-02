'use client'
import { criarCliente, editarCliente } from '@/app/services/cliente.service'
import Cliente from '@/app/types/cliente/cliente'
import { ClientesFormProps } from '@/app/types/cliente/cliente.form'
import { formatarCpfCnpj } from '@/app/utils/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { useNotification } from '@/app/hooks/useNotification'

export default function ClientesForm({ clienteExistente }: ClientesFormProps) {
    const router = useRouter();
    const { showError } = useNotification();
    const [cliente, setCliente] = useState<Cliente>(clienteExistente || { id: 0, nome: '', email: '', telefone: '', documento: '', status: 'ATIVO' })
    const [isSaving, setIsSaving] = useState(false)

    const handleChange = (campo: keyof Cliente, valor: string) => {
        setCliente(prev => ({
            ...prev,
            [campo]: valor
        }))
    }

    const handleCpfChange = (documento: string) => {
        if (!cliente) return;

        const formatado = formatarCpfCnpj(documento);

        setCliente({...cliente, documento: formatado});
    }

    const handleSalvar = async (formData: FormData) => {
        if (cliente.documento.length < 14) {
            showError("CPF/CNPJ inválido.", "Validação");
            return;
        }

        try {
            setIsSaving(true)
            if (clienteExistente) {
                await editarCliente(cliente);
            } else {
                await criarCliente(cliente);
            }
            router.push("/clientes")
        } catch (error: any) {
            showError(error.message || "Erro ao salvar cliente.");
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }


    return (
        <form action={handleSalvar} className="space-y-8">
            <div className="space-y-6">

                <Input
                    label="Nome Completo"
                    type="text"
                    value={cliente.nome}
                    required
                    onChange={(e) => handleChange("nome", e.target.value)}
                    placeholder="Nome do cliente ou empresa"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Email"
                        type="email"
                        value={cliente.email}
                        required
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="email@exemplo.com"
                    />

                    <Input
                        label="Telefone"
                        type="text"
                        value={cliente.telefone}
                        required
                        onChange={(e) => handleChange("telefone", e.target.value)}
                        placeholder="(99) 99999-9999"
                    />

                    <Input
                        label="Documento (CPF/CNPJ)"
                        type="text"
                        value={cliente.documento}
                        required
                        onChange={(e) => { handleChange("documento", e.target.value); handleCpfChange(e.target.value) }}
                        placeholder="000.000.000-00"
                    />
                </div>

                {/* Divisor */}
                <div className="h-px bg-slate-100 my-8" />

                {/* Ações */}
                <div className="flex items-center justify-end gap-4">
                    <Link href="/clientes">
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
                        Confirmar Cadastro
                    </Button>
                </div>
            </div>
        </form>
    )
}
