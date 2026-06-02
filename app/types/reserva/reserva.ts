import Cliente from "../cliente/cliente";
import Espaco from "../espacos/espaco";

export default interface Reserva {
    id: number;
    data: string;
    horaInicio: string;
    horaFim: string;
    valorTotal: number;
    valorHora: number;
    status: "ABERTA" | "CONCLUIDA" | "CANCELADA";
    espaco: Espaco;
    cliente: Cliente;
}

export interface ReservasResponse {
    hoje: Reserva[];
    proximos: Reserva[];
}