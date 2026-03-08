export default class Cliente {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public documento: string,
    public status: string = "Ativo",
    public psa: string = "",
    public id?: number
  ){}
}
