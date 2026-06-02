import { UsuarioLogado } from "../usuarios/usuario.logado";

export interface LoginResponse {
  token: string;
  usuario: UsuarioLogado;
}