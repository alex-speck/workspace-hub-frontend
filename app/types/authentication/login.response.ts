import { UsuarioLogado } from "../usuarios/usuario.logado";

export class LoginResponse {
    constructor(
        public token: string,
        public usuario: UsuarioLogado
    ) {

    }
}