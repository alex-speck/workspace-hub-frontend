export default interface Espaco {
  id: number;
  nomeNumero: string;
  tipo: 'MESA_FIXA' | 'MESA_ROTATIVA' | 'SALA_PRIVATIVA';
  valorHora: number;
  status: 'DISPONIVEL' | 'OCUPADO' | 'EM_MANUTENCAO' | 'DELETADO';
}