import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning';
}

const initialState: NotificationState = {
    isOpen: false,
    title: '',
    message: '',
    type: 'error',
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showError: (state, action: PayloadAction<{ message: string; title?: string }>) => {
            state.isOpen = true;
            state.message = action.payload.message;
            state.title = action.payload.title || 'Erro';
            state.type = 'error';
        },
        showSuccess: (state, action: PayloadAction<{ message: string; title?: string }>) => {
            state.isOpen = true;
            state.message = action.payload.message;
            state.title = action.payload.title || 'Sucesso';
            state.type = 'success';
        },
        showWarning: (state, action: PayloadAction<{ message: string; title?: string }>) => {
            state.isOpen = true;
            state.message = action.payload.message;
            state.title = action.payload.title || 'Atenção';
            state.type = 'warning';
        },
        hideNotification: (state) => {
            state.isOpen = false;
        },
    },
});

export const { showError, showSuccess, showWarning, hideNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
