export default class Usuario {
    constructor(
        public id: number | null,
        public nome: string,
        public email?: string,
        public status?: 'ATIVO' | 'INATIVO' | 'DELETADO'
    ) { }
}