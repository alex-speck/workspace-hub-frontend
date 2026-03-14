import Link from 'next/link'
import React from 'react'
import ClientesForm from '../components/ClientesForm'



export default function NovoCliente() {
  return (
    <div>
        <div>
            <Link href={"/clientes"}>Voltar</Link>
            <h1>Cadastrar Novo Cliente</h1>
        </div>

        <ClientesForm/>
    </div>
  )
}
