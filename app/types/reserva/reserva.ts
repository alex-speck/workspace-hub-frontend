import Cliente from "../cliente/cliente";
import Espaco from "../espacos/espaco";

export default class Reserva {
    constructor(
        public id: number,
        public dataHoraInicio: Date,
        public dataHoraFim: Date,
        public valorTotal: number,
        public valorHora: number,
        public status: "ABERTA" | "CONCLUIDA" | "CANCELADA",
        public espaco: Espaco,
        public cliente: Cliente
    ){}
}