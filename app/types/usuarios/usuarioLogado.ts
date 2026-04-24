interface UsuarioLogado {
    nome: string,
    email: string,
    role: string,
    empresa: {
        razaoSocial: string,
        nomeFantasia: string
    }
}