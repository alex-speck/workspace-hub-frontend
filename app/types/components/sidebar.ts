import { UsuarioLogado } from "../usuarios/usuario.logado";

export interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
  usuarioLogado: UsuarioLogado;
}
