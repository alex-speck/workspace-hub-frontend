import Cliente from "../types/cliente/cliente";

export class ClientesMock {

    private static clienteDB: Cliente[] = [
        new Cliente(1, "Roberto Carlos", "robertocarlos@gmail.com", "48999999999", "00000000000", true),
        new Cliente(2, "Joao Vitor", "email@gmail.com", "51912341234", "11111111111", false),
        new Cliente(3, "Alex Speck", "alexspeck@gmail.com", "21344007676", "80880880880", true)
    ]

    static async listarTodos(): Promise<Cliente[]>{
        return [...this.clienteDB]
    }

    static async salvar(cliente: Cliente): Promise<void>{
        const indexExistente = this.clienteDB.findIndex(c => c.id === cliente.id)

        if(indexExistente === -1) {
            const novoId = Math.max(...this.clienteDB.map(c => c.id)) + 1
            cliente.id = novoId
            this.clienteDB.push(cliente)
            alert("Cliente criado com sucesso!")
        } else {
            this.clienteDB[indexExistente].name = cliente.name;
            this.clienteDB[indexExistente].email = cliente.email;
            this.clienteDB[indexExistente].phone = cliente.phone;
            this.clienteDB[indexExistente].documento = cliente.documento;
        }
    }

    static async buscarPorId(id: number): Promise<Cliente|undefined>{
        return this.clienteDB.find(c => c.id === id)
    }

    static async alterarStatus(cliente: Cliente): Promise<void>{
    }
}