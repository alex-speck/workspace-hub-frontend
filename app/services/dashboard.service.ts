import { DashboardData } from "../types/dashboard/dashboard";
import api from "./api";

export async function buscarDadosDashboard(): Promise<DashboardData> {
    const response = await api.get<DashboardData>("/dashboard");
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error("Erro ao buscar dados do dashboard!");
    }
}