'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import Cliente from "../model/Cliente"


interface ClientesContextType {
    clientes: Cliente[],
    guardarCliente: (cliente: Cliente)=>void,
}

const ClientesContext = createContext<ClientesContextType | undefined>(undefined);


export function ClientesProvider({ children }: { children: ReactNode }){
    const clientes = new Array<Cliente>;


    const guardarCliente = (cliente: Cliente) => {
        if (clientes.length >= 10){
            debugger
            clientes.shift();
        }
        clientes.push(cliente);
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