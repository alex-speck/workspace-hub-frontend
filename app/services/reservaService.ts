import Reserva from "../types/reserva/reserva";
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