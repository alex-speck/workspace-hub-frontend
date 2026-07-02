import { AuthState } from "@/app/types/authentication/authentication";
import { UsuarioLogado } from "@/app/types/usuarios/usuario.logado";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie";

const usuarioRecover = Cookies.get("usuario");
const tokenRecover = Cookies.get("token");

const initialState: AuthState = {
    usuario: usuarioRecover ? JSON.parse(usuarioRecover) as UsuarioLogado : null,
    token: tokenRecover ?? ""
}

const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            login: (state, action: PayloadAction<{ usuario: UsuarioLogado, token: string }>) => {
                state.token = action.payload.token;
                state.usuario = action.payload.usuario;

                Cookies.set('usuario', JSON.stringify(action.payload.usuario), {
                    expires: new Date(new Date().getMinutes() + 60)
                });
                Cookies.set('token', action.payload.token, {
                    expires: new Date(new Date().getMinutes() + 60),
                    secure: true
                })
            },
            logout: (state) => {
                state.token = "";
                state.usuario = null;
                Cookies.remove('usuario');
                Cookies.remove('token');
            }
        }
    }
);

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;