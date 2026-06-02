'use client'
import { useDispatch } from 'react-redux';
import { showError as showErrorAction, showSuccess as showSuccessAction, showWarning as showWarningAction } from '../redux/slices/notification.slice';

export function useNotification() {
    const dispatch = useDispatch();

    const showError = (message: string, title?: string) => {
        dispatch(showErrorAction({ message, title }));
    };

    const showSuccess = (message: string, title?: string) => {
        dispatch(showSuccessAction({ message, title }));
    };

    const showWarning = (message: string, title?: string) => {
        dispatch(showWarningAction({ message, title }));
    };

    return { showError, showSuccess, showWarning };
}
