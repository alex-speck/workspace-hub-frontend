export default class Espaco {
  constructor(
    public name: string,
    public type: 'Mesa Fixa' | 'Mesa Rotativa' | 'Sala Privativa' | 'Sala de Reunião',
    public hourlyRate: number,
    public id?: number,
    public status: 'Disponível' | 'Ocupado' | 'Manutenção' = 'Disponível',
    public description?: string,
    public imgSource?: string
  ) {}
}