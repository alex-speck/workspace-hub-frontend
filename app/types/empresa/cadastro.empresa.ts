export class CadastroEmpresa {
    constructor(
        public razaoSocial: string,
        public nomeFantasia: string,
        public cnpj: string,
        public email: string,
        public telefone: string,
        public usuarioPadrao: {
            nome: string,
            email: string,
            senha: string
        }
    ){}

}