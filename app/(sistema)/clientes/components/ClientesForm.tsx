'use client'
import { ClientesMock } from '@/app/mock/cliente'
import Cliente from '@/app/model/Cliente'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

/**
 * 
 *  public id: number,
    public name: string,
    public email: string,
    public phone: string,
    public documento: string,
    public ativo: boolean
 */

interface ClientesFormProps{
    clienteExistente?: Cliente
}


export default function ClientesForm({ clienteExistente }: ClientesFormProps) {
    const router = useRouter()
    const [cliente, setCliente] = useState<Cliente>(clienteExistente || new Cliente(0, '', '', '', '', true))

    const handleChange = (campo: 'name' | 'email' | 'phone' | 'documento', valor: string) => {
        setCliente( prev => 
            new Cliente(
                prev.id,
                campo === 'name' ? valor : prev.name,
                campo === 'email' ? valor : prev.email,
                campo === 'phone' ? valor : prev.phone,
                campo === 'documento' ? valor : prev.documento,
                prev.ativo
            )
        )
    }

    const handleSalvar = async (formData: FormData) => {
        try {
            await ClientesMock.salvar(cliente)
            router.push("/clientes")
        } catch (error) {
            console.error(error)
        }
    }


  return (
    <form action={handleSalvar}>
        <div>
            <label>Nome Completo</label>
            <input
                type="text"
                value={cliente.name}
                required
                onChange={(e)=>handleChange("name", e.target.value)}
            />
        </div>
        <div>
            <label>Email</label>
            <input
                type="email"
                value={cliente.email}
                required
                onChange={(e)=>handleChange("email", e.target.value)}
                placeholder="ex.: cliente@gmail.com"
            />
        </div>
        <div>
            <label>Telefone</label>
            <input
                type="text"
                value={cliente.phone}
                required
                onChange={(e)=>handleChange("phone", e.target.value)}
                placeholder="ex.: (99) 99999-9999"
            />
        </div>
        <div>
            <label>Documento</label>
            <input
                type="text"
                value={cliente.documento}
                required
                onChange={(e)=>handleChange("documento", e.target.value)}
                placeholder="000.000.000-00"
            />
        </div>
        <div>
            <Link href={"/clientes"}>Cancelar</Link>
            <button type="submit">Salvar</button>
        </div>
    </form>
  )
}
