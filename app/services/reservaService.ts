import Reserva from "../types/reserva/reserva";
import ReservaRequest from "../types/reserva/reservaRequest";
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
    try {
        const response = await api.post("/reservas", request)
        if (response.status === 200){
            alert("Sucesso ao cadastrar!")
        }
    } catch (error) {
        console.error(error)
    }
}