import { Link } from "@tanstack/react-router";
import { Activity, BarChart3, Gauge, Settings, Target, TrendingUp, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const navItems = [
  { to: "/", label: "Dashboard", icon: Gauge },
  { to: "/pipeline", label: "Pipeline de Vendas", icon: Target },
  { to: "/clientes", label: "Clientes & Contas", icon: Users },
  { to: "/relatorios", label: "Relatórios", icon: BarChart3 },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
] as const;

export function AppSidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
}: {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-out ${
        collapsed ? "lg:w-20" : "lg:w-64"
      } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="grid size-9 shrink-0 place-items-center rounded-md bg-brand text-brand-foreground">
            <TrendingUp className="size-5" />
          </div>
          <div className={`min-w-0 ${collapsed ? "lg:hidden" : ""}`}>
            <p className="truncate font-display text-sm font-bold">Sales Intelligence</p>
            <p className="truncate text-[11px] text-sidebar-muted">Expansão de Mercado B2B</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-sidebar-foreground lg:hidden" onClick={onCloseMobile} aria-label="Fechar menu">
          <X className="size-5" />
        </Button>
      </div>

      <nav className="flex-1 space-y-1.5 p-3" aria-label="Navegação principal">
        <p className={`px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-widest text-sidebar-muted ${collapsed ? "lg:hidden" : ""}`}>
          Workspace
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              title={collapsed ? item.label : undefined}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
              inactiveProps={{ className: "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-foreground" }}
              className="flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors"
            >
              <Icon className="size-[18px] shrink-0" />
              <span className={collapsed ? "lg:hidden" : ""}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className={`rounded-md bg-sidebar-hover p-3 ${collapsed ? "lg:grid lg:place-items-center lg:p-2" : ""}`}>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Activity className="size-4 text-status" />
            <span className={collapsed ? "lg:hidden" : ""}>Ambiente operacional</span>
          </div>
          <p className={`mt-1 text-[10px] text-sidebar-muted ${collapsed ? "lg:hidden" : ""}`}>Sincronizado agora</p>
        </div>
      </div>
    </aside>
  );
}
