'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cliente from "../model/Cliente";
import Cookies from "js-cookie";


interface ClientesContextType {
    clientes: Cliente[],
    guardarCliente: (cliente: Cliente)=>void,
}

const ClientesContext = createContext<ClientesContextType | undefined>(undefined);


export function ClientesProvider({ children }: { children: ReactNode }){
    const clientes = new Array<Cliente>;

    useEffect(()=>{
        const clientesRecover = Cookies.get('clientes');
        if(clientesRecover){
            try{
                const clientesParsed = JSON.parse(clientesRecover) as Cliente[];
                clientes.push(...clientesParsed);
            } catch(e){
                console.error(e);
            }
        }
    }, []);

    const guardarCliente = (cliente: Cliente) => {
        if (clientes.length >= 10){
            debugger
            clientes.shift();
        }
        clientes.push(cliente);
        Cookies.set('clientes', JSON.stringify(clientes), {
            expires: 1
        })
    }

    return (
        <ClientesContext.Provider value={{ clientes, guardarCliente }}>
            {children}
        </ClientesContext.Provider>
    )
}

export const useClientes = () => {
    const context = useContext(ClientesContext);

    if (!context) throw new Error("useClientes deve ser usado dentro do provider!")

    return context;
}