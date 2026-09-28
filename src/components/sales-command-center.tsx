import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleUserRound,
  Cloud,
  Database,
  FileText,
  Gauge,
  LoaderCircle,
  Menu,
  NotebookPen,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
  Search,
  Send,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Meeting = {
  id: number;
  time: string;
  company: string;
  initials: string;
  contact: string;
  role: string;
  sector: string;
  stage: string;
  value: string;
};

const meetings: Meeting[] = [
  { id: 1, time: "09:00", company: "Nexora Tecnologia", initials: "NT", contact: "Carla Menezes", role: "CIO", sector: "Tecnologia", stage: "Descoberta", value: "R$ 1,8 mi" },
  { id: 2, time: "11:30", company: "Vitta Varejo", initials: "VV", contact: "Rafael Lima", role: "Diretor de Dados", sector: "Varejo", stage: "Proposta", value: "R$ 2,4 mi" },
  { id: 3, time: "14:00", company: "Atlas Logística", initials: "AL", contact: "Marina Duarte", role: "VP de Operações", sector: "Logística", stage: "Qualificação", value: "R$ 980 mil" },
  { id: 4, time: "16:30", company: "Lumina Finance", initials: "LF", contact: "André Costa", role: "CTO", sector: "Serviços financeiros", stage: "Negociação", value: "R$ 3,1 mi" },
];

const briefs: Record<number, { overview: string; news: string[]; pains: string[]; strategy: string; talking: string[]; solutions: string[] }> = {
  1: {
    overview: "Empresa brasileira de software B2B em expansão regional, com 2.400 colaboradores e crescimento acelerado do volume de dados.",
    news: ["Anunciou expansão para três mercados da América Latina", "Nova diretoria prioriza governança e aplicações de IA"],
    pains: ["Dados de CRM dispersos entre unidades", "Ambiente híbrido com custos pouco previsíveis", "Pesquisa manual lenta para decisões comerciais"],
    strategy: "Conduza a conversa pela consolidação de dados como base para escalar a operação. Quantifique o tempo perdido em análises fragmentadas e conecte governança a velocidade de expansão.",
    talking: ["Como a expansão mudou os requisitos de disponibilidade?", "Qual é o custo atual para integrar dados entre países?", "Onde a IA pode gerar valor nos próximos 12 meses?"],
    solutions: ["Oracle Database 23ai", "OCI Data Integration", "Oracle Autonomous Database"],
  },
  2: {
    overview: "Rede omnichannel com mais de 180 lojas, operação digital crescente e foco estratégico em personalização da jornada do consumidor.",
    news: ["Acelerou a abertura de centros de distribuição regionais", "Programa de fidelidade ultrapassou 4 milhões de clientes"],
    pains: ["Visão fragmentada do cliente", "Picos sazonais elevam custos de infraestrutura", "Previsão de demanda ainda depende de processos manuais"],
    strategy: "Posicione uma plataforma de dados unificada como caminho para personalização em escala, melhor previsão de demanda e redução de ruptura sem elevar a complexidade operacional.",
    talking: ["Quais canais ainda não compartilham dados em tempo real?", "Como os picos de demanda afetam a experiência digital?", "Qual é a meta de redução de ruptura neste ano?"],
    solutions: ["OCI Data Lakehouse", "Oracle Retail Analytics", "Oracle Database 23ai"],
  },
  3: {
    overview: "Operadora logística nacional com frota conectada e presença em 14 estados, modernizando planejamento e rastreabilidade.",
    news: ["Iniciou projeto de telemetria para 70% da frota", "Firmou parceria para ampliar operações no Centro-Oeste"],
    pains: ["Dados operacionais isolados por filial", "Baixa previsibilidade de manutenção", "Relatórios gerenciais com defasagem"],
    strategy: "Explore ganhos de margem a partir de dados operacionais em tempo real. Priorize um caso inicial de manutenção preditiva com retorno mensurável.",
    talking: ["Onde ocorrem os maiores atrasos de informação?", "Como medem o custo de indisponibilidade da frota?", "Existe uma base única de telemetria?"],
    solutions: ["OCI Streaming", "Oracle Analytics Cloud", "Oracle Database 23ai"],
  },
  4: {
    overview: "Instituição financeira digital de médio porte, regulada e orientada à inovação, ampliando produtos para empresas.",
    news: ["Lançou nova plataforma de crédito para PMEs", "Reforçou sua área de segurança e conformidade"],
    pains: ["Processamento analítico compete com cargas transacionais", "Exigências crescentes de auditoria", "Modelos antifraude precisam de respostas mais rápidas"],
    strategy: "Enquadre a modernização como equilíbrio entre inovação e controle. Demonstre como consolidar cargas críticas com segurança e acelerar modelos de risco.",
    talking: ["Qual é o tempo atual de decisão de crédito?", "Como segregam dados sensíveis nas análises?", "Quais auditorias geram mais esforço operacional?"],
    solutions: ["Oracle Exadata Database Service", "OCI Security Zones", "Oracle Database 23ai"],
  },
};

const navItems = [
  { id: "dashboard", label: "Painel Principal", icon: Gauge },
  { id: "accounts", label: "Contas Alvo", icon: Target },
  { id: "briefings", label: "Briefings de IA", icon: FileText },
  { id: "settings", label: "Configurações", icon: Settings },
] as const;

type Section = (typeof navItems)[number]["id"];

export function SalesCommandCenter() {
  const [section, setSection] = useState<Section>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState<Meeting | null>(null);
  const [generating, setGenerating] = useState<number | null>(null);
  const [generatedIds, setGeneratedIds] = useState<number[]>([2, 4]);
  const [query, setQuery] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [autoContext, setAutoContext] = useState(true);

  const filteredMeetings = useMemo(
    () => meetings.filter((meeting) => `${meeting.company} ${meeting.sector} ${meeting.contact}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  function navigate(next: Section) {
    setSection(next);
    setMobileOpen(false);
  }

  function generateBrief(meeting: Meeting) {
    setGenerating(meeting.id);
    window.setTimeout(() => {
      setGeneratedIds((ids) => (ids.includes(meeting.id) ? ids : [...ids, meeting.id]));
      setGenerating(null);
      setSelected(meeting);
    }, 850);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {mobileOpen && <div className="fixed inset-0 z-30 bg-overlay lg:hidden" aria-hidden="true" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-200 ${collapsed ? "lg:w-20" : "lg:w-64"} ${mobileOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full lg:translate-x-0"}`}>
        <div className="flex h-20 items-center justify-between border-b border-sidebar-border px-5">
          <div className={`flex items-center gap-3 overflow-hidden ${collapsed ? "lg:justify-center" : ""}`}>
            <div className="grid size-9 shrink-0 place-items-center rounded-md bg-brand text-brand-foreground"><TrendingUp className="size-5" /></div>
            <div className={`min-w-0 ${collapsed ? "lg:hidden" : ""}`}><p className="font-display text-base font-bold">Sales Intelligence</p><p className="text-[11px] text-sidebar-muted">Enterprise Command Center</p></div>
          </div>
          <Button variant="ghost" size="icon" className="text-sidebar-foreground lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Fechar menu"><X className="size-5" /></Button>
        </div>
        <nav className="flex-1 space-y-2 p-3" aria-label="Navegação principal">
          <p className={`px-3 pb-2 pt-4 text-[10px] font-bold uppercase tracking-widest text-sidebar-muted ${collapsed ? "lg:hidden" : ""}`}>Workspace</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;
            return <Button key={item.id} variant="ghost" onClick={() => navigate(item.id)} title={collapsed ? item.label : undefined} className={`h-11 w-full justify-start px-3 ${active ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent" : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-foreground"}`}><Icon className="size-[18px] shrink-0" /><span className={collapsed ? "lg:hidden" : ""}>{item.label}</span>{active && <span className={`ml-auto size-1.5 rounded-full bg-brand ${collapsed ? "lg:hidden" : ""}`} />}</Button>;
          })}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <div className={`rounded-md bg-sidebar-hover p-3 ${collapsed ? "lg:grid lg:place-items-center lg:p-2" : ""}`}><div className="flex items-center gap-2 text-xs font-semibold"><Activity className="size-4 text-status" /><span className={collapsed ? "lg:hidden" : ""}>Ambiente operacional</span></div><p className={`mt-1 text-[10px] text-sidebar-muted ${collapsed ? "lg:hidden" : ""}`}>Última sincronização: agora</p></div>
        </div>
      </aside>

      <div className={`transition-[margin] duration-200 ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}>
        <header className="sticky top-0 z-20 flex min-h-20 items-center justify-between gap-4 border-b border-border bg-card/95 px-4 backdrop-blur md:px-7">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menu"><Menu className="size-5" /></Button>
            <Button variant="ghost" size="icon" className="hidden lg:inline-flex" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? "Expandir menu" : "Recolher menu"}>{collapsed ? <PanelLeftOpen className="size-5" /> : <PanelLeftClose className="size-5" />}</Button>
            <div className="hidden items-center gap-2 xl:flex"><StatusPill icon={Cloud} label="OCI" /><StatusPill icon={Database} label="Database 23ai" /></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block"><p className="text-sm font-bold">Miguel Santos</p><p className="text-xs text-muted-foreground">Executivo de Vendas Enterprise (B2B)</p></div>
            <div className="grid size-10 place-items-center rounded-full bg-secondary text-secondary-foreground"><CircleUserRound className="size-6" /></div>
          </div>
        </header>
        <main className="mx-auto max-w-[1600px] p-4 md:p-7 lg:p-8">
          {section === "dashboard" && <Dashboard generatedCount={generatedIds.length} generating={generating} onGenerate={generateBrief} />}
          {section === "accounts" && <Accounts query={query} setQuery={setQuery} meetings={filteredMeetings} onGenerate={generateBrief} generating={generating} />}
          {section === "briefings" && <BriefingHistory generatedIds={generatedIds} onOpen={setSelected} />}
          {section === "settings" && <SettingsView notifications={notifications} setNotifications={setNotifications} autoContext={autoContext} setAutoContext={setAutoContext} />}
        </main>
      </div>
      {selected && <BriefingPanel meeting={selected} onClose={() => setSelected(null)} onRegenerate={() => generateBrief(selected)} generating={generating === selected.id} />}
    </div>
  );
}

function StatusPill({ icon: Icon, label }: { icon: typeof Cloud; label: string }) {
  return <div className="flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold"><Icon className="size-3.5 text-status" /><span>{label}</span><span className="size-1.5 rounded-full bg-status" /></div>;
}

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mb-7"><p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand">{eyebrow}</p><h1 className="font-display text-2xl font-bold md:text-3xl">{title}</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p></div>;
}

function Dashboard({ generatedCount, generating, onGenerate }: { generatedCount: number; generating: number | null; onGenerate: (m: Meeting) => void }) {
  const kpis = [
    { label: "Negócios ativos", value: "24", meta: "+3 este mês", icon: BriefcaseBusiness, tone: "brand" },
    { label: "Taxa de conversão", value: "31,8%", meta: "+4,2 p.p. vs. trimestre", icon: TrendingUp, tone: "status" },
    { label: "Reuniões hoje", value: "4", meta: "Próxima às 09:00", icon: CalendarDays, tone: "info" },
    { label: "Briefings por IA", value: String(generatedCount), meta: "Atualizado agora", icon: Sparkles, tone: "warning" },
  ];
  return <>
    <PageIntro eyebrow="Visão executiva" title="Bom dia, Miguel." description="Acompanhe sua operação comercial e prepare cada conversa com contexto relevante." />
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicadores principais">
      {kpis.map((kpi) => { const Icon = kpi.icon; return <article key={kpi.label} className="rounded-lg border border-border bg-card p-5 shadow-card"><div className="flex items-start justify-between"><div><p className="text-sm font-medium text-muted-foreground">{kpi.label}</p><p className="mt-2 font-display text-3xl font-bold">{kpi.value}</p></div><div className={`metric-icon metric-${kpi.tone}`}><Icon className="size-5" /></div></div><p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><span className="size-1.5 rounded-full bg-status" />{kpi.meta}</p></article>; })}
    </section>
    <section className="mt-7 overflow-hidden rounded-lg border border-border bg-card shadow-card">
      <div className="flex flex-col justify-between gap-3 border-b border-border px-5 py-5 sm:flex-row sm:items-center"><div><h2 className="font-display text-lg font-bold">Próximas reuniões</h2><p className="mt-1 text-xs text-muted-foreground">Agenda corporativa de hoje · 13 de setembro</p></div><div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"><CalendarDays className="size-4" />4 compromissos</div></div>
      <MeetingTable meetings={meetings} onGenerate={onGenerate} generating={generating} />
    </section>
  </>;
}

function MeetingTable({ meetings: rows, onGenerate, generating }: { meetings: Meeting[]; onGenerate: (m: Meeting) => void; generating: number | null }) {
  return <div className="overflow-x-auto"><table className="w-full min-w-[920px] border-collapse text-left"><thead><tr className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground"><th className="px-5 py-3 font-bold">Horário</th><th className="px-5 py-3 font-bold">Conta</th><th className="px-5 py-3 font-bold">Contato</th><th className="px-5 py-3 font-bold">Setor</th><th className="px-5 py-3 font-bold">Estágio</th><th className="px-5 py-3 font-bold">Potencial</th><th className="px-5 py-3 text-right font-bold">Preparação</th></tr></thead><tbody>{rows.map((meeting) => <tr key={meeting.id} className="border-t border-border first:border-t-0 hover:bg-muted/35"><td className="px-5 py-4 text-sm font-bold">{meeting.time}</td><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-md bg-secondary text-xs font-bold text-secondary-foreground">{meeting.initials}</span><span className="text-sm font-bold">{meeting.company}</span></div></td><td className="px-5 py-4"><p className="text-sm font-semibold">{meeting.contact}</p><p className="text-xs text-muted-foreground">{meeting.role}</p></td><td className="px-5 py-4 text-sm text-muted-foreground">{meeting.sector}</td><td className="px-5 py-4"><span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">{meeting.stage}</span></td><td className="px-5 py-4 text-sm font-semibold">{meeting.value}</td><td className="px-5 py-4 text-right"><Button size="sm" onClick={() => onGenerate(meeting)} disabled={generating !== null}>{generating === meeting.id ? <LoaderCircle className="size-4 animate-spin" /> : <Sparkles className="size-4" />}{generating === meeting.id ? "Analisando..." : "Gerar Briefing com IA"}</Button></td></tr>)}</tbody></table></div>;
}

function Accounts({ query, setQuery, meetings: rows, onGenerate, generating }: { query: string; setQuery: (q: string) => void; meetings: Meeting[]; onGenerate: (m: Meeting) => void; generating: number | null }) {
  return <><PageIntro eyebrow="Inteligência de contas" title="Contas Alvo" description="Priorize oportunidades enterprise e acesse o contexto necessário para avançar cada negociação." /><div className="mb-5 flex max-w-md items-center gap-3 rounded-md border border-input bg-card px-3"><Search className="size-4 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar conta, contato ou setor" className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" /></div><section className="overflow-hidden rounded-lg border border-border bg-card shadow-card"><MeetingTable meetings={rows} onGenerate={onGenerate} generating={generating} />{rows.length === 0 && <p className="p-8 text-center text-sm text-muted-foreground">Nenhuma conta encontrada.</p>}</section></>;
}

function BriefingHistory({ generatedIds, onOpen }: { generatedIds: number[]; onOpen: (m: Meeting) => void }) {
  const generated = meetings.filter((meeting) => generatedIds.includes(meeting.id));
  return <><PageIntro eyebrow="Centro de preparação" title="Briefings de IA" description="Revise os dossiês inteligentes preparados para suas próximas conversas comerciais." /><div className="grid gap-4 md:grid-cols-2">{generated.map((meeting) => <article key={meeting.id} className="rounded-lg border border-border bg-card p-5 shadow-card"><div className="flex items-start justify-between"><div className="grid size-10 place-items-center rounded-md bg-brand-soft text-brand"><Bot className="size-5" /></div><span className="flex items-center gap-1 text-xs font-semibold text-status"><Check className="size-3.5" />Pronto</span></div><h2 className="mt-5 font-display text-lg font-bold">{meeting.company}</h2><p className="mt-1 text-sm text-muted-foreground">Reunião com {meeting.contact} · {meeting.time}</p><div className="my-4 h-px bg-border" /><Button variant="outline" className="w-full justify-between" onClick={() => onOpen(meeting)}>Abrir briefing <ChevronRight className="size-4" /></Button></article>)}</div></>;
}

function SettingsView({ notifications, setNotifications, autoContext, setAutoContext }: { notifications: boolean; setNotifications: (v: boolean) => void; autoContext: boolean; setAutoContext: (v: boolean) => void }) {
  return <><PageIntro eyebrow="Preferências" title="Configurações" description="Ajuste como o ambiente demonstrativo prepara e apresenta suas informações comerciais." /><section className="max-w-3xl rounded-lg border border-border bg-card shadow-card"><SettingRow icon={Bell} title="Alertas de reunião" description="Receber lembretes antes dos compromissos" enabled={notifications} onChange={setNotifications} /><SettingRow icon={Sparkles} title="Contexto inteligente" description="Incluir notícias simuladas e sinais de negócio" enabled={autoContext} onChange={setAutoContext} /><div className="flex items-center gap-4 border-t border-border p-5"><div className="grid size-10 place-items-center rounded-md bg-secondary"><Database className="size-5" /></div><div><p className="text-sm font-bold">Fontes de dados</p><p className="text-xs text-muted-foreground">OCI e Oracle Database 23ai · ambiente demonstrativo</p></div><span className="ml-auto flex items-center gap-2 text-xs font-bold text-status"><span className="size-2 rounded-full bg-status" />Ativas</span></div></section></>;
}

function SettingRow({ icon: Icon, title, description, enabled, onChange }: { icon: typeof Bell; title: string; description: string; enabled: boolean; onChange: (v: boolean) => void }) {
  return <div className="flex items-center gap-4 border-b border-border p-5 last:border-b-0"><div className="grid size-10 place-items-center rounded-md bg-secondary"><Icon className="size-5" /></div><div><p className="text-sm font-bold">{title}</p><p className="text-xs text-muted-foreground">{description}</p></div><Button variant="ghost" className={`ml-auto h-6 w-11 rounded-full p-0 ${enabled ? "bg-status hover:bg-status/90" : "bg-muted hover:bg-muted"}`} onClick={() => onChange(!enabled)} aria-label={`${enabled ? "Desativar" : "Ativar"} ${title}`}><span className={`size-4 rounded-full bg-card shadow-sm transition-transform ${enabled ? "translate-x-2.5" : "-translate-x-2.5"}`} /></Button></div>;
}

function BriefingPanel({ meeting, onClose, onRegenerate, generating }: { meeting: Meeting; onClose: () => void; onRegenerate: () => void; generating: boolean }) {
  const brief = briefs[meeting.id];
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!brief) return null;
  return <div className="fixed inset-0 z-50 overflow-y-auto bg-background" role="dialog" aria-modal="true" aria-label={`Briefing de ${meeting.company}`}><header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur"><div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-4 px-4 md:px-8"><div className="flex min-w-0 items-center gap-3"><div className="grid size-10 shrink-0 place-items-center rounded-md bg-brand text-brand-foreground"><Sparkles className="size-5" /></div><div className="min-w-0"><p className="text-xs font-bold uppercase tracking-wider text-brand">Preparação para reunião</p><h2 className="truncate font-display text-lg font-bold md:text-xl">{meeting.company}</h2></div></div><div className="flex items-center gap-2"><Button variant="outline" className="hidden sm:inline-flex" onClick={onRegenerate} disabled={generating}>{generating ? <LoaderCircle className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}{generating ? "Atualizando..." : "Gerar novamente"}</Button><Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar briefing"><X className="size-5" /></Button></div></div></header><main className="mx-auto max-w-[1440px] px-4 py-6 md:px-8 md:py-8"><div className="mb-7 flex flex-col justify-between gap-4 border-b border-border pb-6 lg:flex-row lg:items-end"><div><p className="text-sm font-semibold text-muted-foreground">{meeting.sector} · {meeting.stage} · Potencial {meeting.value}</p><h1 className="mt-2 font-display text-2xl font-bold md:text-3xl">Briefing executivo: {meeting.company}</h1><p className="mt-2 text-sm text-muted-foreground">Conversa com {meeting.contact}, {meeting.role}, às {meeting.time}</p></div><span className="w-fit rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">Conteúdo demonstrativo</span></div><div className="grid items-start gap-5 lg:grid-cols-2"><div><BriefSection icon={Building2} title="Visão geral da empresa"><p>{brief.overview}</p></BriefSection><BriefSection icon={Activity} title="Últimos sinais de mercado"><ul>{brief.news.map((item) => <li key={item}>{item}</li>)}</ul><p className="mt-3 text-xs italic text-muted-foreground">Notícias simuladas para fins acadêmicos.</p></BriefSection><BriefSection icon={Target} title="Dores identificadas"><ul>{brief.pains.map((item) => <li key={item}>{item}</li>)}</ul></BriefSection></div><div><BriefSection icon={TrendingUp} title="Estratégia sugerida pela IA"><p>{brief.strategy}</p></BriefSection><BriefSection icon={UsersRound} title="Argumentos para a conversa"><ul>{brief.talking.map((item) => <li key={item}>{item}</li>)}</ul></BriefSection><BriefSection icon={Cloud} title="Soluções Oracle recomendadas"><div className="flex flex-wrap gap-2">{brief.solutions.map((solution) => <span key={solution} className="rounded-md border border-brand/20 bg-brand-soft px-3 py-2 text-xs font-bold text-brand">{solution}</span>)}</div></BriefSection></div></div><Button variant="outline" className="mt-1 w-full sm:hidden" onClick={onRegenerate} disabled={generating}>{generating ? <LoaderCircle className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}{generating ? "Atualizando briefing..." : "Gerar novamente"}</Button></main></div>;
}

function BriefSection({ icon: Icon, title, children }: { icon: typeof Building2; title: string; children: React.ReactNode }) {
  return <section className="mb-5 rounded-lg border border-border bg-card p-5"><div className="mb-3 flex items-center gap-2"><Icon className="size-4 text-brand" /><h3 className="font-display text-sm font-bold">{title}</h3></div><div className="brief-content text-sm leading-6 text-muted-foreground">{children}</div></section>;
}
