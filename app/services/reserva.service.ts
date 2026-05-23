import Reserva from "../types/reserva/reserva";
import ReservaRequest from "../types/reserva/reserva.request";
import api from "./api";

export async function buscarReservas(): Promise<Reserva[]> {

    try{
        const response = await api.get<Reserva[]>("/reservas");
        if (response.status === 200){
            return response.data
        }
    } catch {
        console.error("Erro ao buscar reservas")
    }

    return []
}

export async function criarReserva(request: ReservaRequest): Promise<void> {
    const response = await api.post("/reservas", request)
    if (response.status !== 200 && response.status !== 201) {
        throw new Error("Erro ao criar reserva!");
    }
}

export async function concluirReserva(id: number): Promise<void> {
    try {
        const response = await api.put(`/reservas/${id}/concluir`);
        if(response.status === 200){
            console.log("atualizado!")
        }
    } catch (error) {
        console.error(error);
    }
}

export async function cancelarReserva(id: number): Promise<void> {
    try {
        const response = await api.delete(`/reservas/${id}`);
        if (response.status === 204) {
            console.log("reserva cancelada!")
        }
    } catch (error) {
        console.error(error)
    }
}