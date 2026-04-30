export default class ReservaRequest {
    constructor(
        public clienteId: number,
        public espacoId: number,
        public dataHoraInicio: Date,
        public dataHoraFim: Date
    ) { }

    public validarDatas(): void {
        if (this.dataHoraFim <= this.dataHoraInicio) {
            throw new Error(
                `Data de fim (${this.dataHoraFim.toISOString()}) não pode ser anterior ou igual à data de início (${this.dataHoraInicio.toISOString()}).`
            );
        }
    }

    public ehValida(): boolean {
        return this.dataHoraFim > this.dataHoraInicio;
    }
}