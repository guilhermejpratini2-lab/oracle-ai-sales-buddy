import { createFileRoute } from "@tanstack/react-router";
import { SalesCommandCenter } from "@/components/sales-command-center";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sales Intelligence | Painel Enterprise" },
      { name: "description", content: "Painel demonstrativo de inteligência de vendas enterprise com briefings de IA." },
      { property: "og:title", content: "Sales Intelligence | Painel Enterprise" },
      { property: "og:description", content: "Painel demonstrativo de inteligência de vendas enterprise com briefings de IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <SalesCommandCenter />;
}
