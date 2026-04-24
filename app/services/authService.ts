
import { LoginResponse } from "../types/authentication/loginResponse";
import { TokenResponse } from "../types/authentication/tokenResponse";
import { CadastroEmpresa } from "../types/empresa/cadastroEmpresa";
import api from "./api";


export async function authenticar(email: string, senha: string): Promise<LoginResponse | null> {
    const loginResponse = await api.post<TokenResponse>('/auth/login', { email, senha });

    if (loginResponse.status === 200){
        const usuarioResponse = await api.get<UsuarioLogado>("/usuarios/logado", {
            headers: {
                Authorization: `Bearer ${loginResponse.data.token}`
            }
        });

        if(usuarioResponse.status === 200){
            return new LoginResponse(loginResponse.data.token, usuarioResponse.data)
        }
    }

    return null;
}

export async function cadastrarEmpresaUsuario(empresaData: CadastroEmpresa): Promise<void> {
    const response = await api.post("/auth/cadastro", empresaData);

    if (response.status !== 201) {
        throw new Error("Erro ao cadastrar empresa e usuário");
    }
}