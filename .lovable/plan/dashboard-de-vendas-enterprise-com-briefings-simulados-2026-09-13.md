# Dashboard de vendas enterprise com briefings simulados

## Objetivo
Criar uma aplicação demonstrativa, responsiva e totalmente navegável para apoiar um executivo de vendas B2B, com identidade corporativa inspirada no ecossistema Oracle e dados fictícios adequados a uma apresentação acadêmica.

## Estrutura da experiência
- Montar uma barra superior com o perfil de Miguel Santos e indicadores visuais de conexão ativa com Oracle Cloud Infrastructure e Oracle Database 23ai.
- Criar uma barra lateral azul-escura, recolhível no computador e acessível por menu no celular, com Painel Principal, Contas Alvo, Briefings de IA e Configurações.
- Fazer cada item do menu funcionar como uma visão interna da aplicação, mantendo o Painel Principal como tela inicial.

## Painel Principal
- Exibir quatro indicadores: negócios ativos, taxa de conversão, reuniões de hoje e briefings gerados por IA.
- Apresentar uma tabela responsiva de próximas reuniões com empresas B2B fictícias, incluindo horário, empresa, contato, setor e estágio comercial.
- Destacar em cada reunião a ação “Gerar Briefing com IA”, com estados visuais de geração simulada.

## Briefing Inteligente
- Ao acionar uma reunião, simular uma breve geração e abrir um painel detalhado do cliente selecionado.
- Organizar o conteúdo em visão geral, notícias recentes simuladas, dores identificadas, estratégia de vendas, argumentos de conversa e soluções Oracle recomendadas.
- Usar conteúdo específico por empresa para tornar a apresentação convincente, deixando claro na interface quando notícias e insights forem demonstrativos.
- Permitir fechar o painel, gerar novamente e acessar briefings já gerados pela seção correspondente.

## Demais seções
- **Contas Alvo:** lista pesquisável de contas corporativas, setor, potencial e estágio.
- **Briefings de IA:** histórico dos briefings simulados, com acesso aos detalhes.
- **Configurações:** preferências demonstrativas para fontes de dados, notificações e comportamento dos briefings.

## Direção visual e responsividade
- Aplicar fundo claro, superfícies brancas, sidebar azul-escura/slate e vermelho corporativo nos principais destaques e ações.
- Usar tipografia sóbria, ícones funcionais, bordas discretas e hierarquia adequada para leitura executiva.
- Adaptar KPIs, tabela, navegação e painel de briefing para desktop, tablet e celular, evitando cortes e sobreposições.
- Incluir transições curtas e estados interativos sem excessos visuais.

## Implementação técnica
- Construir a interface em React/TanStack Start com componentes reutilizáveis e ícones Lucide já disponíveis.
- Manter todos os dados e a geração do briefing simulados no navegador, sem banco de dados, login real ou consumo de IA.
- Definir tokens semânticos de cor e tipografia no sistema visual global.
- Incluir metadados próprios da página para título, descrição e compartilhamento.
- Validar a navegação, abertura do briefing e apresentação em tamanhos desktop e mobile.

## Fora do escopo
- Integração real com OCI, Oracle Database, CRM, notícias externas ou modelo de IA.
- Autenticação, persistência de dados e permissões de usuários.
