
export default interface CadastroEmpresa {
    razaoSocial: string,
    nomeFantasia: string,
    cnpj: string,
    email: string,
    telefone: string,
    usuarioPadrao: UsuarioPadrao
}

interface UsuarioPadrao {
    nome: string,
    email: string,
    senha: string
}