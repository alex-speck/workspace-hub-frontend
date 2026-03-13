export default class Cliente {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: string,
    public documento: string,
    public status: boolean
  ){}
}
