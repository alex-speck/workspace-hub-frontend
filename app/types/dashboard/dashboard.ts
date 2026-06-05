import { ReactNode } from "react";

export interface DashboardStats {
    title: string;
    value: string | number;
    change: string;
    trend: 'up' | 'down' | 'neutral';
    icon: ReactNode;
}

export interface FaturamentoDados {
    periodo: string;
    valor: number;
}

export interface FaturamentoResumo {
    diario: FaturamentoDados[];
    semanal: FaturamentoDados[];
    mensal: FaturamentoDados[];
}

export interface OcupacaoSala {
    id: number;
    nome: string;
    percentual: number;
}

export interface Notificacao {
    id: number;
    titulo: string;
    descricao: string;
    data: string;
    tipo: 'info' | 'warning' | 'success' | 'error';
}

export interface DashboardData {
    stats: DashboardStats[];
    faturamento: FaturamentoResumo;
    reservasHoje: any[]; // Usará o tipo Reserva já existente
    proximasReservas: any[]; // Usará o tipo Reserva já existente
    ocupacaoSalas: OcupacaoSala[];
    notificacoes: Notificacao[];
}
