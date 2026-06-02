export interface MessageModalProps {
    isOpen: boolean;
    title: string;
    type?: 'success' | 'error' | 'warning';
    message?: string;
    onClose: () => void;
}
