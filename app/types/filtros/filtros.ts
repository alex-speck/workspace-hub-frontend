export interface FiltroState {
    data: PaginaFiltro[]
}

export interface PaginaFiltro {
    pagina: string;
    filtros: Filtro[];
}

export interface Filtro {
    tipo: string;
    valor: string;
}