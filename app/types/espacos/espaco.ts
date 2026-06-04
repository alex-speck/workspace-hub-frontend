export default interface Espaco {
  id?: number;
  nomeNumero: string;
  tipo: 'MESA_FIXA' | 'MESA_ROTATIVA' | 'SALA_PRIVATIVA';
  valorHora: number;
  endereco: Endereco
  status: 'DISPONIVEL' | 'OCUPADO' | 'EM_MANUTENCAO' | 'DELETADO';
}

interface Endereco {
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}