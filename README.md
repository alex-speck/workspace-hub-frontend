# WorkSpace Hub - Frontend

Frontend do sistema WorkSpace Hub para gestão e reserva de espaços de coworking.

## 🚀 Visão geral

O WorkSpace Hub é uma aplicação Next.js que oferece:

- Painel administrativo para gerenciamento de unidades, clientes, espaços e reservas.
- Login autenticado com persistência de token.
- Dashboard com navegação lateral e experiência responsiva.
- Formulários de criação/edição com validação e confirmação de ações.
- Integração com backend REST em `http://localhost:8080`.

## 🧭 Estrutura do projeto

Páginas principais:

- `/` - Landing page institucional.
- `/login` - Tela de autenticação.
- `/dashboard` - Visão geral do sistema após login.
- `/clientes` - Lista de clientes.
- `/clientes/novo` - Criação de cliente.
- `/clientes/[id]/editar` - Edição de cliente.
- `/espacos` - Lista de espaços.
- `/espacos/novo` - Criação de espaço.
- `/espacos/[id]/editar` - Edição de espaço.
- `/reservas` - Gestão de reservas.
- `/usuarios` - Lista de usuários.
- `/usuarios/novo` - Criação de usuário.
- `/usuarios/[codigo]/editar` - Edição de usuário.

Contextos globais:

- `app/context/AuthContext.tsx` - autenticação e token.
- `app/context/ClientesContext.tsx` - estado compartilhado de clientes.
- `app/context/ConfirmContext.tsx` - modais de confirmação e alertas.

Componentes chave:

- `app/components/Sidebar.tsx`
- `app/components/Header.tsx`
- `app/components/ConfirmModal.tsx`
- `app/components/MessageModal.tsx`
- `app/(sistema)/clientes/components/ClientesForm.tsx`
- `app/(sistema)/espacos/components/EspacosForm.tsx`
- `app/(sistema)/usuarios/components/UsuarioForm.tsx`

## 🛠️ Tecnologias

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Axios
- js-cookie
- ESLint

## 🚧 Requisitos

- Node.js 20+
- Backend REST disponível em `http://localhost:8080`
- Porta padrão do frontend: `3000`

## 🔧 Instalação e execução

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000` no navegador.

## 📡 Configuração de backend

A aplicação faz chamadas diretas para o backend em `http://localhost:8080`.

Endpoints usados no frontend incluem (mas não se limitam a):

- `POST /auth/login`
- `GET /usuarios`
- `GET /espacos`
- `DELETE /espacos/:id`
- `GET /clientes`
- `POST /clientes`
- `PUT /clientes/:id`

> Se necessário, ajuste as URLs de API diretamente nos componentes até substituir por uma camada de configuração de ambiente.

## 📁 Observações do projeto

- Os providers de contexto são carregados em `app/layout.tsx`.
- A landing page (`app/page.tsx`) usa imagem externa e fonte Geist otimizada.
- A navegação interna do painel acontece em `app/(sistema)/layout.tsx`.

## ✅ Scripts úteis

- `npm run dev` - inicia o servidor de desenvolvimento.
- `npm run build` - gera o build de produção.
- `npm run start` - inicia o build em modo de produção.
- `npm run lint` - executa o ESLint.
