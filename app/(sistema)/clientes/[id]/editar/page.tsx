'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ClientesForm from '../../components/ClientesForm'
import { useParams, useRouter } from 'next/navigation'
import Cliente from '@/app/model/Cliente'
import { ClientesMock } from '@/app/mock/cliente'
import axios from 'axios'

export default function EditarCliente() {
    const params = useParams()
    const router = useRouter()

    const [cliente, setCliente] = useState<Cliente|null>(null)

    const id = Number(params.id)

    useEffect(()=>{
        buscarDados()
    }, [])

    const buscarDados = async () =>{
        try {
            const response = await axios.get("http://localhost:8080/clientes/" + id);

            if(response.status === 200) setCliente(response.data)
                else router.push("/clientes")
        } catch (error) {
            console.error(error)
        }
    }

    if (!cliente) return (<div className="p-8">Carregando...</div>)

  return (
    <div>
        <div>
            <Link href={"/clientes"}>Voltar</Link>
            <h1>Editar Cliente</h1>
        </div>

        <ClientesForm clienteExistente={cliente}/>
    </div>
  )
}
