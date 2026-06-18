'use client'

import { useEffect, useState } from "react";
import { DashboardData } from "@/app/types/dashboard/dashboard";
import { buscarDadosDashboard } from "@/app/services/dashboard.service";
import { useNotification } from "@/app/hooks/useNotification";
import DashboardPage from "./components/DashboardPage";

export default function Dashboard() {
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

    <>
      <DashboardPage dashboardData={dashboardData} />
    </>

  );
}
