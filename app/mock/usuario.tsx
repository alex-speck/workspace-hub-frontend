import Usuario from "../model/Usuario";

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

}