'use client'
import { alterarStatusUsuario, buscarListaUsuarios } from '@/app/services/usuarioService';
import Usuario from '@/app/types/usuarios/usuario'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Usuarios() {

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const carregarDados = async () => {
    try {
      setUsuarios(await buscarListaUsuarios());
    } catch (err) {
      alert(err)
      console.error(err)
    }
  }

  const handlerAlterarStatus = async (usuario: Usuario) => {
        await alterarStatusUsuario(usuario)
        setUsuarios([]);
        carregarDados();
  }

  useEffect(() => {
    carregarDados();
  }, [])



  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-end mb-10">
        <div>
          <span className="text-emerald-600 font-bold text-sm uppercase tracking-widest">Administração</span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Gestão de Usuários</h1>
        </div>

        <Link
          href="/usuarios/novo"
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-slate-900/20 transition-all active:scale-95 flex items-center gap-2 hover:cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Novo Usuário
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Código</th>
                <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Nome</th>
                <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Email</th>
                <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {usuarios.sort((a, b) => a.id - b.id).map((usuario) => usuario.status !== 'DELETADO' && (
                <tr key={usuario.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                      #{usuario.id}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-bold text-slate-900">{usuario.nome}</span>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-600">
                    {usuario.email}
                  </td>
                  <td className="px-8 py-5">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${usuario.status === 'ATIVO'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-red-50 text-red-600'
                      }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${usuario.status === 'ATIVO' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      <span className="text-[11px] font-black uppercase tracking-wider">
                        {usuario.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/usuarios/${usuario.id}/editar`}
                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                        title="Editar Usuário"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </Link>

                      <button
                        onClick={() => handlerAlterarStatus(usuario)}
                        className={`p-2 rounded-xl transition-all hover:cursor-pointer ${usuario.status === 'ATIVO'
                            ? 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                            : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                          }`}
                        title={usuario.status === 'ATIVO' ? "Desativar" : "Ativar"}
                      >
                        {usuario.status === 'ATIVO' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {usuarios.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 bg-slate-50 rounded-full text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <span className="text-slate-400 font-medium italic">Nenhum usuário encontrado!</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Usuarios