const IconWarning = () => (
    <svg className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4m0 4h.01M10.29 3.86l-7.2 12.5A2 2 0 004.72 20h14.56a2 2 0 001.73-3.64l-7.2-12.5a2 2 0 00-3.46 0z"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const IconSuccess = () => (
    <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const IconError = () => (
    <svg
        className="w-6 h-6 text-red-500"
        viewBox="0 0 24 24"
        fill="none"
    >
        <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
        />
        <path
            d="M8 8L16 16M16 8L8 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

interface Props {
    type: 'warning' | 'success' | 'error',
    open: boolean,
    title?: string,
    message: string,
    onConfirm: () => void,
    onCancel: () => void
}


export default function ConfirmModal({ type, open, title, message, onConfirm, onCancel }: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-50 p-4">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/20 w-full max-w-sm p-8 border border-slate-100 animate-in fade-in zoom-in-95 duration-300">

                <div className="flex flex-col items-center text-center gap-4 mb-6">
                    <div className={`p-4 rounded-2xl ${type === 'warning' ? 'bg-amber-50 text-amber-500' :
                            type === 'success' ? 'bg-emerald-50 text-emerald-500' :
                                'bg-red-50 text-red-500'
                        }`}>
                        {type === 'warning' ? <IconWarning  /> :
                            type === 'success' ? <IconSuccess  /> :
                                <IconError  />}
                    </div>

                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">
                            {title || "Confirmação"}
                        </h2>
                        <p className="mt-2 text-sm text-slate-500 font-medium leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-8">
                    <button
                        onClick={onConfirm}
                        className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 hover:cursor-pointer ${type === 'warning' ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20' : 'hidden'
                            }`}
                    >
                        Sim, Confirmar
                    </button>

                    <button
                        onClick={onCancel}
                        className="w-full py-4 rounded-2xl bg-white text-slate-400 font-bold hover:text-slate-600 hover:bg-slate-50 transition-all hover:cursor-pointer"
                    >
                        {type === 'warning' ? <span>Cancelar</span> : <span>Ok</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}
