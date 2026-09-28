# Oracle Sales Navigator

O design deve ser corporativo e limpo (barra lateral em azul escuro/slate, fundo claro e detalhes em vermelho corporativo estilo Oracle).

O aplicativo deve conter as seguintes seções e funcionalidades:

1. Cabeçalho Superior (Navbar):

   - Perfil do usuário logado: "Miguel Santos - Executivo de Vendas Enterprise (B2B)".

   - Status do sistema indicando conexão ativa com "Oracle Cloud Infrastructure (OCI)" e "Oracle Database 23ai".

2. Menu Lateral (Sidebar):

   - Opções de navegação para: Painel Principal, Contas Alvo, Briefings de IA e Configurações.

3. Tela do Painel Principal (Dashboard):

   - Cards de Indicadores (KPIs): Negócios Ativos, Taxa de Conversão (Win Rate), Reuniões Hoje e Briefings Gerados por IA.

   - Uma tabela com a lista de próximas reuniões com clientes corporativos B2B (ex: empresas de tecnologia e varejo).

   - Em cada linha da tabela, deve haver um botão interativo destacado com o texto: "Gerar Briefing com IA".

4. Painel / Modal de Briefing Inteligente (acionado pelo botão):

   - Uma tela detalhada de apoio ao executivo contendo:

     * Visão geral da empresa cliente e últimas notícias (simulando busca semântica).

     * Dores identificadas (ex: dados de CRM dispersos, pesquisa manual lenta).

     * Estratégia de vendas sugerida pela IA e argumentos de conversa.

     * Soluções Oracle Cloud e de Dados recomendadas para apresentar na reunião.

Toda a interface deve ser totalmente interativa, responsiva e pronta para ser utilizada em uma apresentação acadêmica.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cf99295f-ea08-4efe-be61-2e88628c2b04).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
