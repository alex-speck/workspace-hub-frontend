import Cliente from "../model/Cliente";

export class ClientesMock {

    private static clienteDB: Cliente[] = [
        new Cliente(1, "Roberto Carlos", "robertocarlos@gmail.com", "48999999999", "00000000000", true),
        new Cliente(2, "Joao Vitor", "email@gmail.com", "51912341234", "11111111111", false),
        new Cliente(3, "Alex Speck", "alexspeck@gmail.com", "21344007676", "80880880880", true)
    ]

    static async listarTodos(): Promise<Cliente[]>{
        return [...this.clienteDB]
    }
}