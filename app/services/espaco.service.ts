import Espaco from "../types/espacos/espaco";
import api from "./api";


export async function buscarListaEspacos(): Promise<Espaco[]> {
    const response = await api.get<Espaco[]>("/espacos");

    if (response.status === 200) {
        return response.data;
    }

    return [];
}

export async function deletarEspaco(id: number): Promise<void> {
    const response = await api.delete(`/espacos/${id}`)

    if (response.status !== 200) {
        console.log(response)
    }
}

export async function buscarEspacoPorId(id: number): Promise<Espaco | null> {
    const response = await api.get<Espaco>(`/espacos/${id}`)

    if (response.status === 200) {
        return response.data;
    }

    return null;

}

export async function criarEspaco(espaco: Espaco): Promise<void> {
    const response = await api.post(`/espacos`, {
        nomeNumero: espaco.nomeNumero,
        tipo: espaco.tipo,
        valorHora: espaco.valorHora
    })

    if (response.status !== 201) {
        console.log(response)
    }
}

export async function editarEspaco(espaco: Espaco): Promise<void> {
    const response = await api.put(`/espacos/${espaco.id}`, {
        nomeNumero: espaco.nomeNumero,
        tipo: espaco.tipo,
        valorHora: espaco.valorHora
    })

    if (response.status !== 200) {
        console.log(response)
    }
}