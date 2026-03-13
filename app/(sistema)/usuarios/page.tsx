'use client'
import { UsuarioMock } from '@/app/mock/usuario';
import Usuario from '@/app/model/Usuario'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Usuarios() {

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const carregarDados = async () => {
    try{
      const dados = await UsuarioMock.listarTodos()
      setUsuarios(dados);
    }catch(err){
      console.error(err)
    }
  }

  const handlerAlterarStatus = async (usuario: Usuario) => {
    try{
      setUsuarios( prev => prev.map(u => 
        u.codigo === usuario.codigo ? new Usuario(u.codigo, u.name, u.cpf, !u.ativo) : u
      ))
    }catch(err){
      alert("Erro ao alterar status do usuario!")
    }
  }

  useEffect(() => {
    carregarDados();
  },[])



  return (
    <div>
      <div>
        <h1>Gestão de usuario</h1>
        <Link href="/usuarios/novo">+ Novo Usuario</Link>
      </div>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Cpf</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            { usuarios.map((usuario) => (
              <tr key={usuario.codigo}>
                <td>#{usuario.codigo}</td>
                <td>{usuario.name}</td>
                <td>{usuario.cpf}</td>
                <td>{usuario.ativo ? "Ativo" : "Inativo"}</td>
                <td>
                  <Link href={`/usuarios/${usuario.codigo}/editar`}>Editar</Link>
                  <button onClick={()=>handlerAlterarStatus(usuario)}>{usuario.ativo ? "Inativar" : "Ativar"}</button>
                </td>
              </tr>
            ))}
            {usuarios.length === 0 && (
              <tr>
                <td>Nenhum usuario encontrado!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Usuarios