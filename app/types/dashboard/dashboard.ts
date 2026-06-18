
import Reserva from "../reserva/reserva";

export interface DashboardStats {
    title: string;
    value: string | number;
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





export interface DashboardData {
    stats: DashboardStats[];
    faturamento: FaturamentoResumo;
    reservasHoje: Reserva[]; 
    proximasReservas: Reserva[];
}

export interface DashboardPageProps {
    dashboardData: DashboardData
}
