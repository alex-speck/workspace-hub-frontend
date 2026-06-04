'use client'
import { useNotification } from '@/app/hooks/useNotification';
import { buscarDetalhesCancelamento } from '@/app/services/reserva.service';
import { ReservaCancelamento } from '@/app/types/reserva/reserva';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

function CancelarReserva() {
    const codigo = useParams().codigo as string;
    const { showError } = useNotification();
    const [success, setSuccess] = useState<boolean>(false);
    const [detalhes, setDetalhes] = useState<ReservaCancelamento | null>(null);

    const buscarDetalhes = async () => {
        try {
            setDetalhes(await buscarDetalhesCancelamento(codigo));
        } catch (error: any) {
            showError(error.message || "Erro ao buscar dados da reserva")
        }
    }

  return (
    <div>CancelarReserva</div>
  )
}

export default CancelarReserva