'use client'
import Usuario from '@/app/model/Usuario'
import Link from 'next/link';
import React, { useState } from 'react'

export default function UsuarioForm() {

    const [usuario, setUsuario] = useState<Usuario>(new Usuario(0, '', '', true));

    const handleChange = (campo: 'nome' | 'cpf', valor: string) => {
        setUsuario( prev => 
            new Usuario(
                prev.codigo,
                campo === 'nome' ? valor : prev.name,
                campo === 'cpf' ? valor : prev.cpf,
                prev.ativo
            )
        )
    }

    const handleSalvar = async (formData: FormData) => {
        
    }

  return (
    <form action={handleSalvar}>
        <div>
            <div>
                <label>Nome Completo</label>
                <input 
                type="text"
                value={usuario.name}
                required
                onChange={(e)=>handleChange('nome', e.target.value)}
                placeholder="João da Silva"
                />
            </div>
            <div>
                <label>CPF</label>
                <input 
                type="text"
                value={usuario.cpf}
                maxLength={14}
                required
                onChange={(e)=>handleChange('cpf', e.target.value)}
                placeholder="000.000.000-00"
                />
            </div>
            <div>
                <Link href={"/usuarios"}>Cancelar</Link>
                <button type="submit">Salvar</button>
            </div>
        </div>
    </form>
  )
}
