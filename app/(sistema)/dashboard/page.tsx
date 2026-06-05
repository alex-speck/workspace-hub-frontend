'use client'

import DashboardCard from "./components/DashboardCard";
import RevenueChart from "./components/RevenueChart";
import ReservationsList from "./components/ReservationsList";
import RoomOccupancy from "./components/RoomOccupancy";
import { mockDashboardData } from "./mockDashboard";
import { useEffect, useState } from "react";
import { DashboardData } from "@/app/types/dashboard/dashboard";
import { buscarDadosDashboard } from "@/app/services/dashboard.service";
import { useNotification } from "@/app/hooks/useNotification";

export default function Dashboard() {
  const { stats, faturamento, reservasHoje, proximasReservas, ocupacaoSalas } = mockDashboardData;
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const { showError } = useNotification();

  const buscarDados = async () => {
    try {
      setDashboardData(await buscarDadosDashboard());
    } catch (error: any) {
      showError(error.message);
    }
  }

  useEffect(() => {
    buscarDados();
  }, [])

  if (dashboardData === null) return (
    <div>
      Loading...
    </div>
  )

  return (

    <div className="space-y-10 p-2 pb-10">

      {/* Header */}
      < div className="flex flex-col gap-1" >
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-500 font-medium">
          Bem-vindo de volta! Aqui está o resumo da sua unidade <span className="text-emerald-600 font-bold">hoje</span>.
        </p>
      </ div >

      {/* Stats Grid */}
      < div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" >
        {
          dashboardData.stats.map((stat, index) => (
            <DashboardCard key={index} stat={stat} />
          ))
        }
      </ div >

      {/* Main Content Grid */}
      < div className="grid grid-cols-1 lg:grid-cols-12 gap-8" >

        {/* Left Column - Revenue and Occupancy */}
        < div className="lg:col-span-8 space-y-8" >
          <RevenueChart data={dashboardData.faturamento} />

          <div className="grid grid-cols-1 gap-8">
            <RoomOccupancy data={dashboardData.ocupacaoSalas} />
          </div>
        </div >

        {/* Right Column - Reservations */}
        < div className="lg:col-span-4 space-y-8 h-fit" >
          <ReservationsList title="Reservas de Hoje" reservations={dashboardData.reservasHoje} />
          <ReservationsList title="Próximas Reservas" reservations={dashboardData.proximasReservas} />
        </div >

      </div >

    </div >



  );
}
