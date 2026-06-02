'use client'
import { login } from '@/app/redux/slices/auth.slice';
import { authenticar } from '@/app/services/auth.service';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { useNotification } from '@/app/hooks/useNotification';

export default function Login() {

    const router = useRouter();
    const dispatch = useDispatch();
    const { showError } = useNotification();

    const handleLogin = async (formData: FormData) => {
        
        const email = formData.get("email")?.toString() || "";
        const senha = formData.get("senha")?.toString() || "";
        
        try {
            const data = await authenticar(email, senha)

            if (data) {
                dispatch(login({ usuario: data.usuario, token: data.token}))
                router.push("/dashboard")
                console.log(`Autenticado com email: ${email}`)
            } else {
                throw new Error("Credenciais inválidas");
            }

        } catch (error: any) {
            showError(error.message || "Credenciais incorretos ou acesso inativo/deletado")
        }


    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-slate-50 px-4'>
            <div className="w-full max-w-md bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-2xl shadow-slate-200/50">

                <div className="flex flex-col items-center gap-4 mb-10">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                        <div className="h-5 w-5 bg-white rotate-45 rounded-sm" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                            WorkSpace<span className="text-emerald-600"> Hub</span>
                        </h2>
                        <p className="text-slate-500 text-sm font-medium mt-1">Acesse sua unidade de gestão</p>
                    </div>
                </div>

                <form className="space-y-6" action={handleLogin}>
                    <Input
                        label="E-mail Institucional"
                        type="email"
                        placeholder='ex: gestao@unidade.com'
                        name='email'
                        required
                    />

                    <Input
                        label="Senha de Acesso"
                        type="password"
                        name='senha'
                        required
                    />

                    <Button
                        type="submit"
                        className="w-full mt-4 group"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        }
                    >
                        Entrar no Painel
                    </Button>
                </form>

                <p className="text-center text-slate-400 text-xs mt-10">
                    Sistema de Gestão Multi-Tenant
                </p>
            </div>
        </div>
    )
}
