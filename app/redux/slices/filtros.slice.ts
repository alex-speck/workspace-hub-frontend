
import { FiltroState, PaginaFiltro } from "@/app/types/filtros/filtros";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";



const initialState: FiltroState = {
    data: []
}

const filtroSlice = createSlice(
    {
        name: 'filtro',
        initialState,
        reducers: {
            addFiltro: (state, action: PayloadAction<{ filtro: PaginaFiltro }>) => {
                const filtroNovo = action.payload.filtro;

                const index = state.data.findIndex((item) => item.pagina === filtroNovo.pagina);
                if (index !== -1) {
                    state.data[index] = filtroNovo;
                    return;
                }

                state.data.push(filtroNovo);
            }
        }
    }
);

export const buscarFiltroPorPagina = (pagina: string) =>
    createSelector(
        (state: RootState) => state.filtro.data,
        (itens: PaginaFiltro[]) => itens.find(item => item.pagina === pagina)
    );

export const { addFiltro } = filtroSlice.actions;
export const filtroReducer = filtroSlice.reducer;