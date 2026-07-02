import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth.slice";
import { notificationReducer } from "./slices/notification.slice";
import { filtroReducer } from "./slices/filtros.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        notification: notificationReducer,
        filtro: filtroReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;