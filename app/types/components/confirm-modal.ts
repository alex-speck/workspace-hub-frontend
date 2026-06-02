export interface ConfirmModalProps {
    type: 'warning' | 'success' | 'error';
    open: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}
