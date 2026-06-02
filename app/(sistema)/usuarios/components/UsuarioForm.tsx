'use client'
import Usuario from '@/app/types/usuarios/usuario'
import { UsuarioFormProps } from '@/app/types/usuarios/usuario.form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { editarUsuario, criarUsuario } from '@/app/services/usuario.service';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { useNotification } from '@/app/hooks/useNotification';

export default function UsuarioForm({ usuarioExistente }: UsuarioFormProps) {
    const router = useRouter();
    const { showError } = useNotification();
    const [usuario, setUsuario] = useState<Usuario>(usuarioExistente || { id: null, nome: '', email: '', senha: '', status: 'ATIVO' });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (campo: 'nome' | 'email' | 'senha', valor: string) => {
        setUsuario(prev => ({
            ...prev,
            [campo]: valor
        }))
    }

    const handleSalvar = async (formData: FormData) => {
        try {
            setIsSaving(true);
            if (usuarioExistente) {
                await editarUsuario(usuario);
            } else {
                await criarUsuario(usuario);
            }
            router.push("/usuarios");
        } catch (error: any) {
            showError(error.message || "Erro ao salvar usuário!");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <form action={handleSalvar} className="space-y-8">
            <div className="space-y-6">
                <Input
                    label="Nome Completo"
                    type="text"
                    value={usuario.nome}
                    required
                    onChange={(e) => handleChange('nome', e.target.value)}
                    placeholder="João da Silva"
                />

                <Input
                    label="Email"
                    type="email"
                    value={usuario.email}
                    required
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="usuario@email.com"
                />

                {!usuarioExistente && (
                    <Input
                        label="Senha"
                        type="password"
                        value={usuario.senha}
                        required
                        onChange={(e) => handleChange('senha', e.target.value)}
                        placeholder="••••••••"
                    />
                )}

                <div className="h-px bg-slate-100 my-8" />
                <div className="flex items-center justify-end gap-4">
                    <Link href="/usuarios">
                        <Button variant="ghost" type="button">
                            Cancelar
                        </Button>
                    </Link>

                    <Button
                        type="submit"
                        isLoading={isSaving}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        }
                    >
                        {usuarioExistente ? 'Salvar Alterações' : 'Confirmar Cadastro'}
                    </Button>
                </div>
            </div>
        </form>
    )
}
