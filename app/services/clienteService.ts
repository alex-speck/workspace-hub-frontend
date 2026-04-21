import Cliente from "../types/cliente/cliente";
import api from "./api";


export async function buscarListaClientes(): Promise<Cliente[]> {
    debugger
    const response = await api.get<Cliente[]>("/clientes")

    if (response.status === 200) {
        return response.data;
    }
    console.log(response);
    return [];
}

export async function buscarClientePorId(id: number): Promise<Cliente | null> {
    const response = await api.get<Cliente>(`/clientes/${id}`)

    if(response.status === 200){
        return response.data;
    }

    return null;
}

export async function criarCliente(cliente: Cliente): Promise<void> {

    const response = await api.post("/clientes", {
        nome: cliente.nome,
        telefone: cliente.telefone,
        documento: cliente.documento
    });

    if (response.status !== 200) {
        alert("Erro ao criar cliente!")
    }

}

export async function editarCliente(cliente: Cliente): Promise<void> {
    const response = await api.put(`/clientes/${cliente.id}`, {
        nome: cliente.nome,
        telefone: cliente.telefone,
        documento: cliente.documento
    });

    if (response.status !== 200) {
        alert("Erro ao editar cliente!")
    }
}

export async function alterarStatusCliente(cliente: Cliente): Promise<void> {
    console.log(cliente)
    const status = cliente.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
    const response = await api.put(`/clientes/${cliente.id}/status`, { status })

    if (response.status !== 200) {
        alert("Erro ao atualizar status!")
    }

}