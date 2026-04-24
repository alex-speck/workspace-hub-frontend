import Usuario from "../usuarios/usuario"

export interface AuthContextType {
    usuario: UsuarioLogado | null,
    token: string | null
    login: (usuario: UsuarioLogado, token: string) => void,
    logout: () => void
}
