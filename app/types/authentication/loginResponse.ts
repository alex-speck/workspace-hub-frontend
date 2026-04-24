import { TokenResponse } from "./tokenResponse";

export class LoginResponse {
    constructor(
        public token: string,
        public usuario: UsuarioLogado
    ) {

    }
}