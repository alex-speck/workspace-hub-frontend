'use client'
import ClienteModal from '@/app/components/ClienteModal'
import { useState } from 'react'

/**
 * Tela de clientes, onde serão listados os clientes cadastrados e será possível criar, editar e desativar clientes.
 * Todos usuarios podem cadastrar clientes, mas apenas gestores ou superiores podem editar informações especificas ou desativar clientes.
 * Ao carregar a pagina, deve ser feita uma requisição para a API para buscar os clientes cadastrados e exibi-los em uma tabela ou lista.
 * Caso não exista nenhum cliente cadastrado, deve ser exibida uma mensagem informando que não existem clientes cadastrados e um botão para cadastrar um novo cliente.
 * Cada cliente exibira as seguintes informações:
 * @param name: nome do cliente
 * @param email: email do cliente
 * @param phone: telefone de contato
 * @param documento: CPF ou CNPJ com máscara e alguns digitos censurados
 * @param status: ativo ou blacklist, clientes em blacklist devem ser impedidos de realizar novas reservas.
 * @param psa: campo de observação para citar motivo de blacklist.
 * @param actions: botões para editar ou desativar o cliente, dependendo do perfil do usuário logado.
 * @param ultimas_reservas: exibir as ultimas 3 reservas do cliente, com data, espaço reservado e status da reserva.
 * 
 * A pagina deve conter um botão para cadastrar um novo cliente, que abrirá um modal com um formulário para cadastrar/editar o cliente.
 * 
 */

export class Cliente {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public documento: string,
    public status: string = "Ativo",
    public psa: string = "",
    public id?: number
  ){}
}

const ClientesMock = [
  {
    id: 1,
    name: "Alberto Silva",
    email: "albertosilva@gmail.com",
    phone: "(11) 98765-4321",
    documento: "123.456.789-**",
    status: "Ativo",
    psa: "",
    ultimas_reservas: [
      {
        data: "01/01/2023",
        espaco: "Sala de Reunião 1",
        status: "Concluída"
      },
      {
        data: "02/01/2023",
        espaco: "Sala de Reunião 2",
        status: "Pendente"
      },
      {
        data: "03/01/2023",
        espaco: "Hot Desk",
        status: "Cancelada"
      }
    ]
  },
  {
    id: 2,
    name: "Mariana Costa",
    email: "marianacosta@gmail.com",
    phone: "(21) 99876-1234",
    documento: "234.567.890-**",
    status: "Ativo",
    psa: "",
    ultimas_reservas: [
      { data: "04/01/2023", espaco: "Sala de Reunião 3", status: "Concluída" },
      { data: "05/01/2023", espaco: "Hot Desk", status: "Pendente" },
      { data: "06/01/2023", espaco: "Sala de Reunião 1", status: "Cancelada" }
    ]
  },
  {
    id: 3,
    name: "Carlos Eduardo",
    email: "carloseduardo@gmail.com",
    phone: "(31) 98712-4567",
    documento: "345.678.901-**",
    status: "Blacklisted",
    psa: "Não compareceu a múltiplas reservas",
    ultimas_reservas: [
      { data: "07/01/2023", espaco: "Hot Desk", status: "Concluída" },
      { data: "08/01/2023", espaco: "Sala de Reunião 2", status: "Concluída" },
      { data: "09/01/2023", espaco: "Sala de Reunião 3", status: "Pendente" }
    ]
  },
  {
    id: 4,
    name: "Fernanda Rocha",
    email: "fernandarocha@gmail.com",
    phone: "(41) 99855-7788",
    documento: "456.789.012-**",
    status: "Ativo",
    psa: "",
    ultimas_reservas: [
      { data: "10/01/2023", espaco: "Sala de Reunião 1", status: "Cancelada" },
      { data: "11/01/2023", espaco: "Hot Desk", status: "Concluída" },
      { data: "12/01/2023", espaco: "Sala de Reunião 2", status: "Concluída" }
    ]
  },
  {
    id: 5,
    name: "Lucas Martins",
    email: "lucasmartins@gmail.com",
    phone: "(51) 98766-2233",
    documento: "567.890.123-**",
    status: "Blacklisted",
    psa: "Danos ao espaço durante reserva",
    ultimas_reservas: [
      { data: "13/01/2023", espaco: "Hot Desk", status: "Pendente" },
      { data: "14/01/2023", espaco: "Sala de Reunião 3", status: "Concluída" },
      { data: "15/01/2023", espaco: "Sala de Reunião 2", status: "Cancelada" }
    ]
  },
  {
    id: 6,
    name: "Juliana Pereira",
    email: "julianapereira@gmail.com",
    phone: "(61) 99822-3344",
    documento: "678.901.234-**",
    status: "Ativo",
    psa: "",
    ultimas_reservas: [
      { data: "16/01/2023", espaco: "Sala de Reunião 1", status: "Concluída" },
      { data: "17/01/2023", espaco: "Hot Desk", status: "Concluída" },
      { data: "18/01/2023", espaco: "Sala de Reunião 2", status: "Pendente" }
    ]
  },
  {
    id: 7,
    name: "Rafael Gomes",
    email: "rafaelgomes@gmail.com",
    phone: "(71) 98744-5566",
    documento: "789.012.345-**",
    status: "Blacklisted",
    psa: "Comportamento inadequado reportado",
    ultimas_reservas: [
      { data: "19/01/2023", espaco: "Sala de Reunião 3", status: "Cancelada" },
      { data: "20/01/2023", espaco: "Hot Desk", status: "Concluída" },
      { data: "21/01/2023", espaco: "Sala de Reunião 1", status: "Concluída" }
    ]
  },
  {
    id: 8,
    name: "Patricia Alves",
    email: "patriciaalves@gmail.com",
    phone: "(81) 99811-6677",
    documento: "890.123.456-**",
    status: "Ativo",
    psa: "",
    ultimas_reservas: [
      { data: "22/01/2023", espaco: "Hot Desk", status: "Concluída" },
      { data: "23/01/2023", espaco: "Sala de Reunião 2", status: "Pendente" },
      { data: "24/01/2023", espaco: "Sala de Reunião 3", status: "Cancelada" }
    ]
  },
  {
    id: 9,
    name: "Bruno Fernandes",
    email: "brunofernandes@gmail.com",
    phone: "(85) 98777-8899",
    documento: "901.234.567-**",
    status: "Ativo",
    psa: "",
    ultimas_reservas: [
      { data: "25/01/2023", espaco: "Sala de Reunião 1", status: "Concluída" },
      { data: "26/01/2023", espaco: "Hot Desk", status: "Pendente" },
      { data: "27/01/2023", espaco: "Sala de Reunião 2", status: "Concluída" }
    ]
  },
  {
    id: 10,
    name: "Camila Duarte",
    email: "camiladuarte@gmail.com",
    phone: "(91) 99888-1122",
    documento: "012.345.678-**",
    status: "Blacklisted",
    psa: "Tentativa de uso indevido da conta",
    ultimas_reservas: [
      { data: "28/01/2023", espaco: "Sala de Reunião 3", status: "Concluída" },
      { data: "29/01/2023", espaco: "Hot Desk", status: "Cancelada" },
      { data: "30/01/2023", espaco: "Sala de Reunião 1", status: "Pendente" }
    ]
  },
  {
    id: 11,
    name: "Eduardo Santana",
    email: "eduardosantana@gmail.com",
    phone: "(19) 98733-4455",
    documento: "123.890.456-**",
    status: "Ativo",
    psa: "",
    ultimas_reservas: [
      { data: "31/01/2023", espaco: "Hot Desk", status: "Concluída" },
      { data: "01/02/2023", espaco: "Sala de Reunião 2", status: "Pendente" },
      { data: "02/02/2023", espaco: "Sala de Reunião 3", status: "Concluída" }
    ]
  }
]

//TODO: Criar contexto de cliente para atualizar a lista de clientes em tempo real ao criar/editar/desativar um cliente, sem precisar recarregar a pagina.
export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)

  const isManager = true // TODO: Role vem do backend

  const handleCreate = () => {
    setSelectedCliente(null)
    setIsModalOpen(true)
  }

  const handleEdit = (cliente: Cliente) => {
    setSelectedCliente(cliente)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <ClienteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        mode={selectedCliente ? 'edit' : 'create'}
        initialData={selectedCliente} 
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Gestão de <span className="text-emerald-600">Clientes</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Visualize e gerencie os coworkers.</p>
        </div>

        <button 
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-95 text-sm hover:cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Novo Cliente</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Buscar..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:border-emerald-500 transition-all text-slate-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Cliente</th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Contato</th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Documento</th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Status</th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ClientesMock.map((cliente) => (
                <tr key={cliente.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold text-xs ${
                        cliente.status === 'Blacklisted' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {cliente.name.substring(0,2).toUpperCase()}
                      </div>
                      <p className="font-bold text-slate-800 text-sm leading-none">{cliente.name}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600 font-medium">{cliente.email}</p>
                    <p className="text-[11px] text-slate-400">{cliente.phone}</p>
                  </td>

                  <td className="px-6 py-4 font-mono text-[11px] text-slate-500">
                    {cliente.documento}
                  </td>

                  <td className="px-6 py-4">
                    <div className="relative flex items-center group/tooltip w-fit ">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-text ${
                        cliente.status === 'Blacklisted' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {cliente.status}
                      </span>
                      {cliente.status === 'Blacklisted' && cliente.psa && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-48 p-3 bg-slate-900 text-white text-[10px] rounded-xl shadow-xl z-50 hover:cursor-auto">
                           <div className="flex items-center gap-1.5 text-red-400 font-black uppercase tracking-widest mb-1">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                             </svg>
                             Motivo Blacklist
                           </div>
                           <p className="font-medium leading-relaxed text-slate-300 italic">"{cliente.psa}"</p>
                           <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right text-slate-900">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(cliente)}
                        className="p-2 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-xl transition-colors hover:cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      {isManager && (
                        <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-colors hover:cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}