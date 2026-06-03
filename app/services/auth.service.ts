

import AlterarSenha from "../types/authentication/alterar.senha";
import { LoginResponse } from "../types/authentication/login.response";
import { TokenResponse } from "../types/authentication/token.response";
import CadastroEmpresa from "../types/empresa/cadastro.empresa";
import { UsuarioLogado } from "../types/usuarios/usuario.logado";
import api from "./api";


export async function authenticar(email: string, senha: string): Promise<LoginResponse | null> {
    const loginResponse = await api.post<TokenResponse>('/auth/login', { email, senha });

    if (loginResponse.status !== 200){
        throw new Error("Email ou senha incorreto!")
    }

    if (loginResponse.status === 200){
        const usuarioResponse = await api.get<UsuarioLogado>("/usuarios/logado", {
            headers: {
                Authorization: `Bearer ${loginResponse.data.token}`
            }
        });

        if(usuarioResponse.status !== 200){
            throw new Error("Usuario inativo ou deletado!")
        }
        return { token: loginResponse.data.token, usuario: usuarioResponse.data };
    }

    return null;
}

export async function cadastrarEmpresaUsuario(empresaData: CadastroEmpresa): Promise<void> {
    const response = await api.post("/auth/cadastro", empresaData);

    if (response.status !== 201) {
        throw new Error("Erro ao cadastrar empresa e usuário");
    }
}

export async function alterarSenhaUsuario(body: AlterarSenha): Promise<void> {
    const response = await api.post("/auth/alterar-senha", body);

    if (response.status !== 200){
        throw new Error("Ocorreu algum erro ao tentar alterar a senha")
    }
}