import { DashboardData } from "@/app/types/dashboard/dashboard";

export const mockDashboardData: DashboardData = {
    stats: [
        { title: 'Faturamento Hoje', value: 'R$ 2.450,00', change: '+15.2%', trend: 'up', icon: '💰' },
        { title: 'Reservas Ativas', value: '24', change: '+3', trend: 'up', icon: '📅' },
        { title: 'Ocupação Atual', value: '82%', change: '+5%', trend: 'up', icon: '🚀' },
        { title: 'Cancelamentos', value: '2', change: '-12%', trend: 'down', icon: '❌' },
    ],
    faturamento: {
        diario: [
            { periodo: '08:00', valor: 120 },
            { periodo: '10:00', valor: 450 },
            { periodo: '12:00', valor: 890 },
            { periodo: '14:00', valor: 1250 },
            { periodo: '16:00', valor: 1800 },
            { periodo: '18:00', valor: 2450 },
            { periodo: '20:00', valor: 2450 },
        ],
        semanal: [
            { periodo: 'Seg', valor: 2100 },
            { periodo: 'Ter', valor: 1850 },
            { periodo: 'Qua', valor: 2400 },
            { periodo: 'Qui', valor: 3100 },
            { periodo: 'Sex', valor: 4200 },
            { periodo: 'Sab', valor: 1500 },
            { periodo: 'Dom', valor: 800 },
        ],
        mensal: [
            { periodo: 'Jan', valor: 45000 },
            { periodo: 'Fev', valor: 52000 },
            { periodo: 'Mar', valor: 48000 },
            { periodo: 'Abr', valor: 61000 },
            { periodo: 'Mai', valor: 75000 },
            { periodo: 'Jun', valor: 82000 },
        ]
    },
    reservasHoje: [
        {
            id: 1,
            horaInicio: '09:00',
            cliente: { nome: 'João Silva' },
            espaco: { nomeNumero: 'Sala de Reunião A' },
            status: 'CONCLUIDA',
            valorTotal: 150
        },
        {
            id: 2,
            horaInicio: '14:30',
            cliente: { nome: 'Maria Oliveira' },
            espaco: { nomeNumero: 'Mesa Fixa 04' },
            status: 'ABERTA',
            valorTotal: 45
        },
        {
            id: 3,
            horaInicio: '16:00',
            cliente: { nome: 'Tech Solutions' },
            espaco: { nomeNumero: 'Sala Privativa B' },
            status: 'ABERTA',
            valorTotal: 350
        }
    ],
    proximasReservas: [
        {
            id: 4,
            horaInicio: '08:00',
            cliente: { nome: 'Lucas Santos' },
            espaco: { nomeNumero: 'Mesa Rotativa' },
            status: 'ABERTA',
            valorTotal: 30
        },
        {
            id: 5,
            horaInicio: '10:00',
            cliente: { nome: 'Ana Costa' },
            espaco: { nomeNumero: 'Sala de Reunião B' },
            status: 'ABERTA',
            valorTotal: 150
        }
    ],
    ocupacaoSalas: [
        { id: 1, nome: 'Sala de Reunião A', percentual: 90 },
        { id: 2, nome: 'Sala de Reunião B', percentual: 45 },
        { id: 3, nome: 'Sala Privativa 01', percentual: 100 },
        { id: 4, nome: 'Sala Privativa 02', percentual: 60 },
        { id: 5, nome: 'Área Comum', percentual: 30 },
    ],
    notificacoes: [
        {
            id: 1,
            titulo: 'Nova Reserva pendente',
            descricao: 'Aguardando confirmação de pagamento para Sala A.',
            data: 'Há 5 minutos',
            tipo: 'warning'
        },
        {
            id: 2,
            titulo: 'Reserva iniciando em breve',
            descricao: 'Maria Oliveira chega em 15 minutos (Mesa 04).',
            data: 'Há 10 minutos',
            tipo: 'info'
        },
        {
            id: 3,
            titulo: 'Pagamento Confirmado',
            descricao: 'Reserva #1234 de Tech Solutions foi paga.',
            data: 'Há 30 minutos',
            tipo: 'success'
        }
    ]
};
