import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Building2,
  Cloud,
  LoaderCircle,
  MessageSquareQuote,
  NotebookPen,
  RefreshCw,
  Send,
  Sparkles,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { briefings, type Account } from "@/data/sales";

const riskTone: Record<string, string> = {
  Alto: "border-destructive/30 bg-destructive/10 text-destructive",
  Médio: "border-warning/30 bg-warning/10 text-warning",
  Baixo: "border-status/30 bg-status/10 text-status",
};

export function BriefingDialog({
  account,
  generating,
  notes,
  onOpenChange,
  onRegenerate,
  onAddNote,
}: {
  account: Account | null;
  generating: boolean;
  notes: string[];
  onOpenChange: (open: boolean) => void;
  onRegenerate: () => void;
  onAddNote: (note: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const briefing = account ? briefings[account.id] : undefined;

  const submitNote = () => {
    const note = draft.trim();
    if (!note || generating) return;
    setDraft("");
    onAddNote(note);
  };

  const pitch = briefing
    ? [
        ...briefing.pitch,
        ...notes.map(
          (note) =>
            `Incorpore a fala do cliente — "${note}" — como gancho de abertura e conecte-a à dor principal`,
        ),
      ]
    : [];

  return (
    <Dialog open={Boolean(account && briefing)} onOpenChange={onOpenChange}>
      <DialogContent className="inset-0 left-0 top-0 block h-dvh max-h-none w-screen max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-none border-0 p-0 sm:rounded-none">
        {account && briefing && (
          <>
            <div className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur">
              <div className="mx-auto flex min-h-20 max-w-[1440px] items-center gap-3 px-5 py-4 sm:px-8">
              <div className="grid size-10 shrink-0 place-items-center rounded-md bg-brand text-brand-foreground">
                <Sparkles className="size-5" />
              </div>
              <div className="min-w-0 pr-10">
                <p className="text-xs font-bold uppercase tracking-wider text-brand">Briefing inteligente</p>
                <DialogTitle className="font-display text-lg font-bold">{account.company}</DialogTitle>
                <DialogDescription className="text-xs">
                  {account.time} · {account.contact} ({account.role})
                </DialogDescription>
              </div>
              </div>
            </div>

            <div className="mx-auto max-w-[1440px] space-y-5 px-5 py-6 sm:px-8">
              <div className="flex flex-wrap gap-2 text-xs">
                <Tag>{account.sector}</Tag>
                <Tag>{account.stage}</Tag>
                <Tag>{account.value}</Tag>
                <span className="rounded-full bg-brand-soft px-3 py-1.5 font-semibold text-brand">
                  Conteúdo demonstrativo
                </span>
                {notes.length > 0 && (
                  <span className="rounded-full bg-status/10 px-3 py-1.5 font-semibold text-status">
                    {notes.length} {notes.length === 1 ? "informação do cliente" : "informações do cliente"} incorporada{notes.length === 1 ? "" : "s"}
                  </span>
                )}
              </div>

              <section className="rounded-lg border border-brand/25 bg-brand-soft/40 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <NotebookPen className="size-4 text-brand" />
                  <h3 className="font-display text-sm font-bold">O que o cliente disse?</h3>
                </div>
                <p className="mb-3 text-xs text-muted-foreground">
                  Registre uma informação passada pelo cliente (ex: "o orçamento foi aprovado", "o concorrente fez uma proposta") e o briefing será regenerado considerando esse contexto.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <textarea
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        submitNote();
                      }
                    }}
                    rows={2}
                    maxLength={500}
                    placeholder="Ex: O cliente mencionou que a auditoria foi antecipada para o próximo mês..."
                    className="min-h-16 flex-1 resize-y rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40"
                  />
                  <Button onClick={submitNote} disabled={!draft.trim() || generating} className="sm:self-stretch">
                    {generating ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4" />}
                    {generating ? "Atualizando..." : "Adicionar e regenerar"}
                  </Button>
                </div>
                {notes.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {notes.map((note, index) => (
                      <li key={`${index}-${note}`} className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground">
                        <span className="mr-2 text-xs font-bold uppercase tracking-wide text-brand">Cliente</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <div className="grid items-start gap-5 lg:grid-cols-2">
                <div className="space-y-5">
                  <Block icon={Building2} title="Resumo da conta"><p>{briefing.summary}</p></Block>
                  <Block icon={Activity} title="Sinais de mercado recentes"><ul>{briefing.signals.map((signal) => <li key={signal}>{signal}</li>)}</ul><p className="mt-3 text-xs italic">Sinais simulados para uso acadêmico.</p></Block>
                  <Block icon={AlertTriangle} title="Alertas de risco"><div className="grid gap-3 sm:grid-cols-2">{briefing.risks.map((risk) => <div key={risk.label} className={`rounded-md border p-3 ${riskTone[risk.level]}`}><p className="text-xs font-bold uppercase tracking-wide">{risk.level}</p><p className="mt-1 text-sm font-semibold">{risk.label}</p><p className="mt-1 text-xs opacity-90">{risk.detail}</p></div>)}</div></Block>
                </div>
                <div className="space-y-5">
                  <Block icon={Target} title="Argumentos de venda · SPIN Selling"><dl className="grid gap-3 sm:grid-cols-2"><Spin label="Situação" value={briefing.spin.situation} /><Spin label="Problema" value={briefing.spin.problem} /><Spin label="Implicação" value={briefing.spin.implication} /><Spin label="Necessidade" value={briefing.spin.need} /></dl></Block>
                  <Block icon={MessageSquareQuote} title="Jobs to Be Done e discurso"><ul>{briefing.jobs.map((job) => <li key={job}>{job}</li>)}</ul><div className="mt-4 space-y-2 rounded-md border border-border bg-muted/50 p-4">{pitch.map((line) => <p key={line} className="text-sm text-foreground">{line}</p>)}</div></Block>
                  <Block icon={Cloud} title="Soluções recomendadas"><div className="flex flex-wrap gap-2">{briefing.solutions.map((solution) => <span key={solution} className="rounded-md border border-brand/25 bg-brand-soft px-3 py-2 text-xs font-bold text-brand">{solution}</span>)}</div></Block>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={onRegenerate} disabled={generating}>
                {generating ? <LoaderCircle className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
                {generating ? "Atualizando briefing..." : "Gerar novamente"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-secondary px-3 py-1.5 font-semibold text-secondary-foreground">{children}</span>;
}

function Spin({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-muted/40 p-3">
      <dt className="text-xs font-bold uppercase tracking-wide text-brand">{label}</dt>
      <dd className="mt-1 text-sm text-muted-foreground">{value}</dd>
    </div>
  );
}

function Block({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="size-4 text-brand" />
        <h3 className="font-display text-sm font-bold">{title}</h3>
      </div>
      <div className="brief-content text-sm leading-6 text-muted-foreground">{children}</div>
    </section>
  );
}
