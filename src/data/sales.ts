export type Stage =
  | "Descoberta"
  | "Qualificação"
  | "Proposta"
  | "Negociação"
  | "Fechamento";

export type Account = {
  id: number;
  company: string;
  initials: string;
  sector: string;
  contact: string;
  role: string;
  time: string;
  stage: Stage;
  value: string;
  amount: number;
  probability: number;
  owner: string;
  health: "Saudável" | "Atenção" | "Risco";
  priority: boolean;
};

export type Briefing = {
  summary: string;
  signals: string[];
  spin: { situation: string; problem: string; implication: string; need: string };
  jobs: string[];
  pitch: string[];
  risks: { label: string; detail: string; level: "Alto" | "Médio" | "Baixo" }[];
  solutions: string[];
};

export const accounts: Account[] = [
  {
    id: 1,
    company: "Nexora Tecnologia",
    initials: "NT",
    sector: "Tecnologia",
    contact: "Carla Menezes",
    role: "CIO",
    time: "09:00",
    stage: "Descoberta",
    value: "R$ 1,8 mi",
    amount: 1800000,
    probability: 35,
    owner: "Miguel Santos",
    health: "Saudável",
    priority: true,
  },
  {
    id: 2,
    company: "Vitta Varejo",
    initials: "VV",
    sector: "Varejo",
    contact: "Rafael Lima",
    role: "Diretor de Dados",
    time: "11:30",
    stage: "Proposta",
    value: "R$ 2,4 mi",
    amount: 2400000,
    probability: 62,
    owner: "Miguel Santos",
    health: "Atenção",
    priority: true,
  },
  {
    id: 3,
    company: "Atlas Logística",
    initials: "AL",
    sector: "Logística",
    contact: "Marina Duarte",
    role: "VP de Operações",
    time: "14:00",
    stage: "Qualificação",
    value: "R$ 980 mil",
    amount: 980000,
    probability: 45,
    owner: "Miguel Santos",
    health: "Saudável",
    priority: true,
  },
  {
    id: 4,
    company: "Lumina Finance",
    initials: "LF",
    sector: "Serviços financeiros",
    contact: "André Costa",
    role: "CTO",
    time: "16:30",
    stage: "Negociação",
    value: "R$ 3,1 mi",
    amount: 3100000,
    probability: 74,
    owner: "Miguel Santos",
    health: "Risco",
    priority: true,
  },
  {
    id: 5,
    company: "Orbita Indústria",
    initials: "OI",
    sector: "Indústria",
    contact: "Helena Braga",
    role: "Diretora de TI",
    time: "—",
    stage: "Qualificação",
    value: "R$ 1,2 mi",
    amount: 1200000,
    probability: 30,
    owner: "Miguel Santos",
    health: "Atenção",
    priority: false,
  },
  {
    id: 6,
    company: "Praxis Saúde",
    initials: "PS",
    sector: "Saúde",
    contact: "Tiago Ferraz",
    role: "Head de Dados",
    time: "—",
    stage: "Fechamento",
    value: "R$ 2,0 mi",
    amount: 2000000,
    probability: 88,
    owner: "Miguel Santos",
    health: "Saudável",
    priority: false,
  },
];

export const briefings: Record<number, Briefing> = {
  1: {
    summary:
      "Fabricante de software B2B com 2.400 colaboradores, em expansão para três países da América Latina e com crescimento acelerado do volume de dados operacionais.",
    signals: [
      "Anúncio de expansão regional com meta de dobrar a base corporativa",
      "Nova diretoria priorizando governança de dados e aplicações de IA",
      "Vagas abertas para engenharia de dados e plataforma",
    ],
    spin: {
      situation: "Dados de CRM e produto distribuídos em quatro ambientes distintos por unidade de negócio.",
      problem: "Cada análise comercial exige consolidação manual, com atraso médio de cinco dias.",
      implication: "A expansão multiplica o esforço de integração e atrasa decisões de preço e cobertura.",
      need: "Uma base unificada e governada que sustente análises e IA sem replicar dados a cada país.",
    },
    jobs: [
      "Escalar a operação regional sem multiplicar a equipe de dados",
      "Provar governança e conformidade para clientes corporativos",
      "Levar recursos de IA ao produto no próximo ciclo",
    ],
    pitch: [
      "Conecte governança de dados diretamente à velocidade de entrada em novos mercados",
      "Quantifique o custo dos cinco dias de defasagem em decisões comerciais",
      "Proponha um caso inicial de IA sobre a base consolidada, com resultado em 90 dias",
    ],
    risks: [
      { label: "Ciclo orçamentário", detail: "Aprovação depende do comitê do próximo trimestre.", level: "Médio" },
      { label: "Concorrência interna", detail: "Equipe avalia manter solução própria de integração.", level: "Alto" },
    ],
    solutions: ["Oracle Database 23ai", "OCI Data Integration", "Oracle Autonomous Database"],
  },
  2: {
    summary:
      "Rede omnichannel com 180 lojas, operação digital em crescimento e prioridade estratégica em personalização da jornada do consumidor.",
    signals: [
      "Abertura acelerada de centros de distribuição regionais",
      "Programa de fidelidade ultrapassou 4 milhões de participantes",
      "Meta pública de reduzir ruptura de estoque em 20%",
    ],
    spin: {
      situation: "Canais físico, e-commerce e aplicativo mantêm cadastros e históricos separados.",
      problem: "A visão do cliente é fragmentada e a previsão de demanda ainda depende de planilhas.",
      implication: "Campanhas perdem precisão e picos sazonais elevam custo de infraestrutura e ruptura.",
      need: "Plataforma única de dados de cliente e demanda, elástica nos picos de venda.",
    },
    jobs: [
      "Personalizar ofertas em escala sem aumentar o time de marketing",
      "Reduzir ruptura nas categorias de maior giro",
      "Absorver picos sazonais com custo previsível",
    ],
    pitch: [
      "Traduza a unificação de dados em aumento de recompra do programa de fidelidade",
      "Mostre elasticidade de custo entre picos e vales de demanda",
      "Use a meta de ruptura declarada como métrica conjunta do projeto",
    ],
    risks: [
      { label: "Janela de mudança", detail: "Congelamento técnico durante a alta temporada.", level: "Alto" },
      { label: "Múltiplos decisores", detail: "TI, marketing e supply dividem o orçamento.", level: "Médio" },
    ],
    solutions: ["OCI Data Lakehouse", "Oracle Retail Analytics", "Oracle Database 23ai"],
  },
  3: {
    summary:
      "Operadora logística nacional com frota conectada em 14 estados, modernizando planejamento, telemetria e rastreabilidade.",
    signals: [
      "Projeto de telemetria em curso para 70% da frota",
      "Parceria para ampliar operações no Centro-Oeste",
      "Pressão contratual por SLA de entrega mais rígido",
    ],
    spin: {
      situation: "Dados operacionais residem em sistemas isolados por filial.",
      problem: "Relatórios gerenciais chegam com defasagem e a manutenção é reativa.",
      implication: "Indisponibilidade de frota corrói margem e ameaça os novos SLAs contratados.",
      need: "Ingestão em tempo real e analítica única para manutenção preditiva e SLA.",
    },
    jobs: [
      "Cumprir SLA sem ampliar frota",
      "Antecipar manutenção com base em telemetria",
      "Consolidar indicadores por filial em uma visão nacional",
    ],
    pitch: [
      "Comece por um caso de manutenção preditiva com retorno mensurável",
      "Ligue disponibilidade de frota diretamente à margem por rota",
      "Ofereça painel único de SLA para a diretoria de operações",
    ],
    risks: [
      { label: "Maturidade de dados", detail: "Telemetria ainda parcial na frota terceirizada.", level: "Médio" },
      { label: "Capacidade do time", detail: "Equipe de TI enxuta e focada no projeto de telemetria.", level: "Baixo" },
    ],
    solutions: ["OCI Streaming", "Oracle Analytics Cloud", "Oracle Database 23ai"],
  },
  4: {
    summary:
      "Instituição financeira digital de médio porte, regulada, ampliando produtos de crédito para empresas com forte agenda de conformidade.",
    signals: [
      "Lançamento de plataforma de crédito para PMEs",
      "Reforço das áreas de segurança e conformidade",
      "Auditoria regulatória prevista para o próximo semestre",
    ],
    spin: {
      situation: "Cargas analíticas competem com o processamento transacional no mesmo ambiente.",
      problem: "Decisões de crédito e modelos antifraude respondem mais devagar do que o negócio exige.",
      implication: "Atraso na decisão reduz conversão de crédito e amplia exposição a fraude.",
      need: "Consolidação segura de cargas críticas com isolamento e trilha de auditoria.",
    },
    jobs: [
      "Reduzir o tempo de decisão de crédito",
      "Sustentar auditorias com menor esforço operacional",
      "Escalar modelos de risco sem afetar o transacional",
    ],
    pitch: [
      "Enquadre a modernização como equilíbrio entre inovação e controle",
      "Relacione tempo de decisão a conversão da nova oferta para PMEs",
      "Apresente isolamento de cargas e auditoria como redutores de risco regulatório",
    ],
    risks: [
      { label: "Exigência regulatória", detail: "Qualquer mudança precisa de validação de conformidade.", level: "Alto" },
      { label: "Negociação de preço", detail: "Compras solicitou nova rodada de desconto.", level: "Alto" },
    ],
    solutions: ["Oracle Exadata Database Service", "OCI Security Zones", "Oracle Database 23ai"],
  },
  5: {
    summary:
      "Grupo industrial de bens de capital com quatro plantas, iniciando modernização de sistemas de produção e qualidade.",
    signals: [
      "Investimento aprovado em automação de linha",
      "Novo diretor industrial com agenda de eficiência",
    ],
    spin: {
      situation: "Sistemas de produção e qualidade operam sem integração entre plantas.",
      problem: "Indicadores de eficiência são consolidados manualmente a cada mês.",
      implication: "Perdas de qualidade só aparecem depois do fechamento contábil.",
      need: "Integração de dados de planta com indicadores próximos do tempo real.",
    },
    jobs: ["Elevar eficiência de linha", "Reduzir retrabalho de qualidade"],
    pitch: [
      "Foque em eficiência de linha como métrica do primeiro projeto",
      "Mostre ganho de detectar desvio de qualidade no mesmo turno",
    ],
    risks: [{ label: "Priorização", detail: "Automação de linha concorre pelo mesmo orçamento.", level: "Médio" }],
    solutions: ["Oracle Autonomous Database", "Oracle Analytics Cloud"],
  },
  6: {
    summary:
      "Rede de serviços de saúde com 12 unidades, alta exigência de privacidade e projeto avançado de prontuário unificado.",
    signals: [
      "Prontuário unificado em fase final de implantação",
      "Comitê de privacidade recém-criado",
    ],
    spin: {
      situation: "Dados clínicos e administrativos convivem em bases distintas.",
      problem: "Relatórios assistenciais dependem de extrações pontuais.",
      implication: "Decisões de capacidade e escala médica ficam lentas.",
      need: "Base analítica segura, com controle de acesso granular.",
    },
    jobs: ["Ampliar capacidade sem perder qualidade assistencial", "Sustentar exigências de privacidade"],
    pitch: [
      "Trate privacidade como requisito de arquitetura, não como restrição",
      "Ligue analítica assistencial ao planejamento de capacidade",
    ],
    risks: [{ label: "Aprovação final", detail: "Contrato aguarda parecer jurídico.", level: "Baixo" }],
    solutions: ["Oracle Database 23ai", "OCI Security Zones"],
  },
};

export const pipelineByQuarter = [
  { quarter: "1T", pipeline: 8.2, fechado: 3.1 },
  { quarter: "2T", pipeline: 10.4, fechado: 4.2 },
  { quarter: "3T", pipeline: 12.9, fechado: 5.6 },
  { quarter: "4T", pipeline: 15.3, fechado: 6.9 },
];

export const leadsBySector = [
  { sector: "Tecnologia", leads: 34 },
  { sector: "Varejo", leads: 26 },
  { sector: "Financeiro", leads: 19 },
  { sector: "Logística", leads: 13 },
  { sector: "Saúde", leads: 8 },
];

export const reportSeries = [
  { month: "Jan", receita: 4.1, meta: 4.0 },
  { month: "Fev", receita: 4.4, meta: 4.2 },
  { month: "Mar", receita: 4.9, meta: 4.5 },
  { month: "Abr", receita: 5.2, meta: 4.8 },
  { month: "Mai", receita: 5.6, meta: 5.1 },
  { month: "Jun", receita: 6.1, meta: 5.4 },
];

export const stages: Stage[] = ["Descoberta", "Qualificação", "Proposta", "Negociação", "Fechamento"];

export const notifications = [
  { id: 1, title: "Vitta Varejo revisou a proposta", time: "há 12 min" },
  { id: 2, title: "Lumina Finance solicitou nova condição comercial", time: "há 1 h" },
  { id: 3, title: "Briefing de Atlas Logística atualizado", time: "há 3 h" },
];
