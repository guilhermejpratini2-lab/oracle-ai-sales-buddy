import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { accounts, type Account } from "@/data/sales";
import { BriefingDialog } from "./briefing-dialog";

type BriefingState = {
  generatingId: number | null;
  generatedIds: number[];
  generate: (account: Account) => void;
  open: (account: Account) => void;
};

const BriefingContext = createContext<BriefingState>({
  generatingId: null,
  generatedIds: [],
  generate: () => {},
  open: () => {},
});

export function BriefingProvider({ children }: { children: ReactNode }) {
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [generatedIds, setGeneratedIds] = useState<number[]>([2, 4]);
  const [selected, setSelected] = useState<Account | null>(null);

  const generate = useCallback((account: Account) => {
    setGeneratingId(account.id);
    window.setTimeout(() => {
      setGeneratedIds((ids) => (ids.includes(account.id) ? ids : [...ids, account.id]));
      setGeneratingId(null);
      setSelected(account);
    }, 900);
  }, []);

  const value = useMemo<BriefingState>(
    () => ({ generatingId, generatedIds, generate, open: setSelected }),
    [generatingId, generatedIds, generate],
  );

  return (
    <BriefingContext.Provider value={value}>
      {children}
      <BriefingDialog
        account={selected}
        generating={selected ? generatingId === selected.id : false}
        onOpenChange={(open) => !open && setSelected(null)}
        onRegenerate={() => selected && generate(selected)}
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
