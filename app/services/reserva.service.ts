import Reserva, { ReservaCancelamento, ReservasResponse } from "../types/reserva/reserva";
import ReservaRequest from "../types/reserva/reserva.request";
import api from "./api";

export async function buscarReservas(): Promise<ReservasResponse> {

    try{
        const response = await api.get<ReservasResponse>("/reservas");
        if (response.status === 200){
            return response.data
        }
    } catch {
        console.error("Erro ao buscar reservas")
    }

    return { hoje: [], proximos: [] }
}

export async function criarReserva(request: ReservaRequest): Promise<void> {
    const response = await api.post("/reservas", request)
    if (response.status !== 200 && response.status !== 201) {
        throw new Error("Erro ao criar reserva!");
    }
}

export async function concluirReserva(id: number): Promise<void> {
    const response = await api.put(`/reservas/${id}/concluir`);
    if (response.status !== 200) {
        throw new Error("Erro ao concluir reserva!");
    }
}

export async function cancelarReserva(id: number): Promise<void> {
    const response = await api.delete(`/reservas/${id}`);
    if (response.status !== 204 && response.status !== 200) {
        throw new Error("Erro ao cancelar reserva!");
    }
}


export async function buscarDetalhesCancelamento (codigo: string): Promise<ReservaCancelamento> {
    const response = await api.get<ReservaCancelamento>(`/reservas/detalhes-cancelamento/${codigo}`);
    if(response.status === 200){
        return response.data
    } else {
        throw new Error("Erro ao buscar detalhes do cancelamento!")
    }
}

export async function clienteCancelarReserva(codigo: string): Promise<void> {
    const response = await api.delete(`/reservas/cancelar/${codigo}`);
    if(response.status !== 204){
        throw new Error("Erro ao cancelar reserva!")
    }
}