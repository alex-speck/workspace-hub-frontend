export default class Espaco {
  constructor(
    public id: number,
    public name: string,
    public type: 'Mesa Fixa' | 'Mesa Rotativa' | 'Sala Privativa',
    public hourlyRate: number,
    public status: 'Disponível' | 'Ocupado' | 'Manutenção' = 'Disponível',
    public description?: string,
    public imgSource?: string
  ) {}
}