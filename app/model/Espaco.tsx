export default class Espaco {
  constructor(
    public id: number,
    public nomeNumero: string,
    public tipo: 'Mesa Fixa' | 'Mesa Rotativa' | 'Sala Privativa',
    public valorHora: number,
    public status: 'Disponível' | 'Ocupado' | 'Manutenção' = 'Disponível'
  ) {}
}