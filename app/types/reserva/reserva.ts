import Cliente from "../cliente/cliente";
import Espaco from "../espacos/espaco";

export default interface Reserva {
    id: number;
    data: string;
    codigo: string;
    horaInicio: string;
    horaFim: string;
    valorTotal: number;
    valorHora: number;
    status: "ABERTA" | "CONCLUIDA" | "CANCELADA";
    espaco: Espaco;
    cliente: Cliente;
}

export interface ReservaCancelamento {
    nomeEmpresa: string;
    nomeCliente: string;
    dataReserva: string;
    horaInicio: string;
    horaFim: string;
    codigoReserva: string;
    localizacao: string;
    espaco: string;
}

export interface ReservasResponse {
    hoje: Reserva[];
    proximos: Reserva[];
}