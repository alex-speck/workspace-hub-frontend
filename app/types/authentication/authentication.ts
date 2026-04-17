import Usuario from "../usuarios/usuario"

export interface AuthContextType {
    usuario: Usuario | null,
    token: string | null
    login: (usuario: Usuario, token: string) => void,
    logout: () => void
}
