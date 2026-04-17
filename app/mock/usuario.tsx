import Usuario from "../types/usuarios/usuario";

export class UsuarioMock{

    private static usuarioDB: Usuario[] = [
        new Usuario(1, "Alex Speck", "000.000.000-00", true),
        new Usuario(2, "Pedro Paulo", "000.000.000-00", true),
        new Usuario(3, "Papa Americano", "000.000.000-00", true),
        new Usuario(4, "Antedegemon", "000.000.000-00", true),
        new Usuario(5, "True Man", "000.000.000-00", true),
        new Usuario(6, "Henrique Dias", "000.000.000-00", true),
        new Usuario(7, "Shrek V", "000.000.000-00", true),
        new Usuario(8, "Front End", "000.000.000-00", true),
    ]

    static async listarTodos(): Promise<Usuario[]>{
        return [...this.usuarioDB]
    }

    static async salvar( usuario: Usuario): Promise<void> {

        const indexExistente = this.usuarioDB.findIndex(u => u.codigo === usuario.codigo);

        if(indexExistente === -1){
            const novoCodigo = Math.max(...this.usuarioDB.map(u => u.codigo)) + 1;
            usuario.codigo = novoCodigo;
            this.usuarioDB.push(usuario);
            console.log(`Usuario de ID ${novoCodigo} salvo com sucesso!`)
        } else {
            this.usuarioDB[indexExistente].name = usuario.name;
            this.usuarioDB[indexExistente].cpf = usuario.cpf;
        }

    }

    static async buscarPorId(codigo: number): Promise<Usuario|undefined> {
        
        return this.usuarioDB.find(u => u.codigo === codigo);
    
    }

}