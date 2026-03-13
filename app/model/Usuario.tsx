export default class Usuario {
    constructor(
        public codigo: number,
        public name: string,
        public cpf?: string,
        public ativo?: boolean
    ) { }
}