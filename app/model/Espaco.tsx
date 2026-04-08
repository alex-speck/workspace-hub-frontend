export default class Espaco {
  constructor(
    public id: number,
    public nomeNumero: string,
    public tipo: 'MESA_FIXA' | 'MESA_ROTATIVA' | 'SALA_PRIVATIVA',
    public valorHora: number,
    public status: 'DISPONIVEL' | 'OCUPADO' | 'EM_MANUTENCAO'
  ) {}
}