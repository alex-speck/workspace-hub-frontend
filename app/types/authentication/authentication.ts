
import { UsuarioLogado } from "../usuarios/usuario.logado"


export interface AuthState {
    usuario: UsuarioLogado | null,
    token: string
}
