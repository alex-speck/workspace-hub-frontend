import Link from 'next/link'
import React from 'react'
import UsuarioForm from '../components/UsuarioForm'

export default function CadastrarUsuario() {
  return (
    <div>
        <div>
            <Link href={"/usuarios"}>Voltar</Link>
            <h1>Cadastro de Novo Usuario</h1>
        </div>

        <UsuarioForm/>
    </div>
  )
}
