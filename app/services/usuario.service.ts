import Usuario from "../types/usuarios/usuario"
import api from "./api";


export async function buscarListaUsuarios(): Promise<Usuario[]> {
    debugger
    const response = await api.get<Usuario[]>("/usuarios")

    if (response.status === 200) {
        return response.data;
    }

    return [];
}

export async function buscarUsuarioPorId(id: number): Promise<Usuario | null> {
    const response = await api.get<Usuario>(`/usuarios/${id}`)

    if (response.status === 200) {
        return response.data;
    }

    return null;
}

export async function alterarStatusUsuario(usuario: Usuario): Promise<void> {

    const status = usuario.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
    const response = await api.put(`/usuarios/${usuario.id}/status`, { status })

    if (response.status !== 200) {
        alert("Erro ao atualizar status!")
    }

}

export async function criarUsuario(usuario: Usuario): Promise<void> {
    const response = await api.post("/usuarios", usuario)

    if (response.status !== 201) {
        alert("Erro ao criar usuário!")
    }
}

export async function editarUsuario(usuario: Usuario): Promise<void> {
    const response = await api.put(`/usuarios/${usuario.id}`, usuario)

    if (response.status !== 200) {
        alert("Erro ao editar usuário!")
    }
}