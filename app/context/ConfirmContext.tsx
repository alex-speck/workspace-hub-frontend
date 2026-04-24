'use client'
import { createContext, useContext, useState } from "react";
import ConfirmModal from "../components/ConfirmModal";

type ContextType = {
    confirm: (message: string, title?: string) => Promise<boolean>;
    alert: (message: string, success: boolean, title?: string) => Promise<void>;
};

const ConfirmContext = createContext<ContextType | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
    const [type, setType] = useState<'warning' | 'success' | 'error'>('warning')
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [resolver, setResolver] = useState<any>(null);
    const [mode, setMode] = useState<"confirm" | "alert">("confirm");

    const confirm = (msg: string, ttl?: string) => {
        setType("warning")
        setMessage(msg);
        setTitle(ttl || "");
        setMode("confirm");
        setOpen(true);

        return new Promise<boolean>((resolve) => {
            setResolver(() => resolve);
        });
    };

    const alert = (msg: string, success: boolean = true, ttl?: string) => {
        setType(success ? "success" : "error")
        setMessage(msg);
        setTitle(ttl || "");
        setMode("alert");
        setOpen(true);

        return new Promise<void>((resolve) => {
            setResolver(() => resolve);
        });
    };

    const handleConfirm = () => {
        resolver?.(mode === "confirm" ? true : undefined);
        setOpen(false);
    };

    const handleCancel = () => {
        resolver?.(false);
        setOpen(false);
    };

    return (
        <ConfirmContext.Provider value={{ confirm, alert }}>
            {children}

            <ConfirmModal
                type={type}
                open={open}
                title={title}
                message={message}
                onConfirm={handleConfirm}
                onCancel={mode === "confirm" ? handleCancel : handleConfirm}
            />
        </ConfirmContext.Provider>
    );
}

export function useConfirm() {
    const ctx = useContext(ConfirmContext);
    if (!ctx) throw new Error("useConfirm precisa do provider");
    return ctx;
}