import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { accounts, type Account } from "@/data/sales";
import { BriefingDialog } from "./briefing-dialog";

type BriefingState = {
  generatingId: number | null;
  generatedIds: number[];
  notes: Record<number, string[]>;
  generate: (account: Account) => void;
  open: (account: Account) => void;
  addNote: (accountId: number, note: string) => void;
};

const BriefingContext = createContext<BriefingState>({
  generatingId: null,
  generatedIds: [],
  notes: {},
  generate: () => {},
  open: () => {},
  addNote: () => {},
});

export function BriefingProvider({ children }: { children: ReactNode }) {
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [generatedIds, setGeneratedIds] = useState<number[]>([2, 4]);
  const [notes, setNotes] = useState<Record<number, string[]>>({});
  const [selected, setSelected] = useState<Account | null>(null);

  const generate = useCallback((account: Account) => {
    setGeneratingId(account.id);
    window.setTimeout(() => {
      setGeneratedIds((ids) => (ids.includes(account.id) ? ids : [...ids, account.id]));
      setGeneratingId(null);
      setSelected(account);
    }, 900);
  }, []);

  const addNote = useCallback((accountId: number, note: string) => {
    const trimmed = note.trim();
    if (!trimmed) return;
    setNotes((current) => ({
      ...current,
      [accountId]: [...(current[accountId] ?? []), trimmed],
    }));
  }, []);

  const value = useMemo<BriefingState>(
    () => ({ generatingId, generatedIds, notes, generate, open: setSelected, addNote }),
    [generatingId, generatedIds, notes, generate, addNote],
  );

  return (
    <BriefingContext.Provider value={value}>
      {children}
      <BriefingDialog
        account={selected}
        generating={selected ? generatingId === selected.id : false}
        notes={selected ? (notes[selected.id] ?? []) : []}
        onOpenChange={(open) => !open && setSelected(null)}
        onRegenerate={() => selected && generate(selected)}
        onAddNote={(note) => {
          if (!selected) return;
          addNote(selected.id, note);
          generate(selected);
        }}
      />
    </BriefingContext.Provider>
  );
}

export function useBriefing() {
  return useContext(BriefingContext);
}

export function generatedAccounts(ids: number[]) {
  return accounts.filter((account) => ids.includes(account.id));
}
