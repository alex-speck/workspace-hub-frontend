'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Usuario from "../types/usuarios/usuario";
import { AuthContextType } from "../types/authentication/authentication";





const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();


    // Captura usuario e token dos cookies
    useEffect(() => {
        const usuarioRecover = Cookies.get('usuario');
        const tokenRecover = Cookies.get('token');

        if(usuarioRecover && tokenRecover){
        try{
            setUsuario(JSON.parse(usuarioRecover));
            setToken(tokenRecover);

            router.push(window.location.pathname)
        } catch(e){
            console.error(e);
        }
    }

    },[]);

    const login = (usuario: UsuarioLogado, token: string) => {
        debugger;
        setUsuario(usuario);
        setToken(token);
        Cookies.set('usuario', JSON.stringify(usuario), {
            expires: 1
        });
        Cookies.set('token', token, {
            expires: 1,
            secure: true
        })

    }

    const logout = () => {
        setUsuario(null);
        setToken(null);
        Cookies.remove('usuario');
        Cookies.remove('token');

    }

    return (
        <AuthContext.Provider value={{ usuario, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuth deve ser usado dentro do provider!")

    return context;
}