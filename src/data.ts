import { MonthlyMetric, SocialMediaData, CrisisManagement, ExecutiveInsight } from "./types";

export const bigNumbers = [
  {
    id: "publications",
    label: "Total de Publicações",
    value: "65",
    suffix: "posts",
    description: "Volume de produção editorial no H1",
    trend: "+12% vs S2 '25",
    isPositive: true,
  },
  {
    id: "reach",
    label: "Alcance / Visualizações",
    value: "2.348.606",
    suffix: "visitas",
    description: "Total de impressões de marca registradas",
    trend: "+28.4% vs S2 '25",
    isPositive: true,
  },
  {
    id: "interactions",
    label: "Interações Totais",
    value: "66.705",
    suffix: "ações",
    description: "Curtidas, comentários e compartilhamentos",
    trend: "+15.2% vs S2 '25",
    isPositive: true,
  },
  {
    id: "engagement",
    label: "Taxa de Engajamento Global",
    value: "2,84%",
    suffix: "média",
    description: "Engajamento ponderado entre todas as redes",
    trend: "+0.45% vs S2 '25",
    isPositive: true,
  },
];

export const monthlyData: MonthlyMetric[] = [
  {
    monthName: "Janeiro",
    reach: 565,
    interactions: 17,
    posts: 1,
    engagementRate: 3.01,
  },
  {
    monthName: "Fevereiro",
    reach: 307448,
    interactions: 7895,
    posts: 5,
    engagementRate: 2.57,
  },
  {
    monthName: "Março",
    reach: 844963,
    interactions: 21938,
    posts: 24,
    engagementRate: 2.60, // Pico de Visibilidade
  },
  {
    monthName: "Abril",
    reach: 514743,
    interactions: 21963,
    posts: 16,
    engagementRate: 4.27, // Pico de Eficiência
  },
  {
    monthName: "Maio",
    reach: 579944,
    interactions: 12437,
    posts: 16,
    engagementRate: 2.14,
  },
  {
    monthName: "Junho",
    reach: 100943,
    interactions: 2455,
    posts: 3,
    engagementRate: 2.43,
  },
];

export const socialMediaNetworks: SocialMediaData[] = [
  {
    id: "instagram-feed",
    name: "Instagram Feed",
    icon: "Instagram",
    summary: "O pilar de branding institucional e engajamento comunitário profundo, liderando em interações de valor.",
    topEngagement: {
      date: "13 de Fevereiro",
      title: "Festival do Churrasco",
      metricLabel: "Taxa de Engajamento",
      metricValue: "11,28%",
      reach: 47668,
      interactions: 5379,
      status: "Orgânico",
      type: "engagement",
      description: "Campanha promocional de ofertas focada em carnes e acompanhamentos, impulsionada de forma segmentada para públicos de interesse em gastronomia e finais de semana.",
      image: "https://i.imgur.com/XOenyd9.png"
    },
    topVolume: {
      date: "27 de Fevereiro",
      title: "Fun | Funcionário de Loja",
      metricLabel: "Alcance",
      metricValue: "250.528",
      status: "Impulsionado",
      type: "volume",
      description: "Vídeo Reels focado em humor corporativo retratando a vida de um funcionário de loja parceira. A linguagem leve e o alto fator de identificação geraram forte viralização orgânica.",
      image: "https://i.imgur.com/20avabW.png"
    }
  },
  {
    id: "instagram-stories",
    name: "Instagram Stories",
    icon: "Camera",
    summary: "Canal dinâmico ideal para ativações rápidas de conversão (cliques) e manutenção de recall diário com alta frequência.",
    topEngagement: {
      date: "22 de Maio",
      title: "Facilidades iFood",
      metricLabel: "Taxa de Engajamento",
      metricValue: "6,97%",
      status: "Orgânico",
      type: "engagement",
      description: "Sequência de Stories interativos com enquetes sobre preferências de entrega e rotinas alimentares semanais.",
      image: "https://i.imgur.com/FBLxEvk.png"
    },
    topVolume: {
      date: "02 de Abril",
      title: "Facilidades",
      metricLabel: "Visualizações / Cliques",
      metricValue: "138.625 alcance",
      reach: 138625,
      interactions: 8942,
      status: "Orgânico",
      type: "volume",
      description: "Campanha em formato Story com sticker de link direto para app. Registrou 4.633 cliques diretos no link da promoção.",
      image: "https://i.imgur.com/sYZCRMc.png"
    }
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "Facebook",
    summary: "Plataforma focada em alcance de audiências maduras e fomento de discussões focadas em grandes eventos e promoções.",
    topEngagement: {
      date: "11 de Março",
      title: "Rodrigo Faro - Economizasso",
      metricLabel: "Taxa de Engajamento",
      metricValue: "1,55%",
      status: "Orgânico",
      type: "engagement",
      description: "Vídeo promocional estrelado pelo apresentador Rodrigo Faro, detalhando a mecânica da campanha do iFood.",
      image: "https://i.imgur.com/98JJDMc.png"
    },
    topVolume: {
      date: "27 de Fevereiro",
      title: "Tipos de Clientes iFood",
      metricLabel: "Alcance",
      metricValue: "7.778",
      reach: 7778,
      interactions: 119,
      status: "Orgânico",
      type: "volume",
      description: "Post estático em formato carrossel ilustrando de forma bem-humorada os arquétipos clássicos de usuários do aplicativo.",
      image: "https://i.imgur.com/L1XL608.png"
    }
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "Video",
    summary: "Motor de viralização focado na geração Z, utilizando as últimas trends de áudio, esquetes dinâmicas e parcerias com creators.",
    topEngagement: {
      date: "27 de Fevereiro",
      title: "Fun | Vida de iFood",
      metricLabel: "Taxa de Engajamento",
      metricValue: "5,76%",
      status: "Orgânico",
      type: "engagement",
      description: "Esquete de humor curto gravada no formato nativo da plataforma.",
      image: "https://i.imgur.com/N564hQW.png"
    },
    topVolume: {
      date: "05 de Junho",
      title: "Copa da Torcida iFood",
      metricLabel: "Visualizações (Views)",
      metricValue: "2.693",
      interactions: 116,
      status: "Orgânico",
      type: "volume",
      description: "Cobertura em vídeo curto de ativação realizada junto a colaboradores.",
      image: "https://i.imgur.com/QSAmeIW.png"
    }
  }
];

export const crisisManagement: CrisisManagement = {
  context: "Detecção de picos de comentários negativos e menções de insatisfação do usuário nas redes sociais durante o período do semestre.",
  detectedIssues: [
    {
      topic: "Falta de produtos na entrega",
      description: "Pedidos entregues incompletos por erro.",
      status: "Monitorado",
      sentiment: "Negativo",
      volume: ""
    },
    {
      topic: "Pedidos incorretos / trocados",
      description: "Produto trocado ou alterado por outra marca.",
      status: "Mitigado",
      sentiment: "Negativo",
      volume: ""
    },
    {
      topic: "Problemas com reembolso no app",
      description: "Demora ou não realização do estorno de pedidos por parte do app.",
      status: "Sob Controle",
      sentiment: "Negativo",
      volume: ""
    }
  ],
  strategicResponse: {
    title: "Plano de Mitigação e Blindagem de Reputação H1 2026",
    description: "Atuação ágil e integrada do time de marca para conter impactos, preservar a reputação corporativa e otimizar processos.",
    actions: [
      "Ativação imediata do 'Manual de Crise de Marca': triagem de menções em comentarios negativos.",
      "Estudar formas de produzir conteudos para acabar com a crise detectada.",
      "Redirecionamento de ideias para o desenvolvimento dos criativos.",
      "Postando conteúdo de Crise: Reajustado estratégicamente o criativos para as reclamação ativas nos momentos, para evitar amplificação do ruídos."
    ]
  }
};

export const executiveInsights: ExecutiveInsight[] = [
  {
    id: "insight-stories",
    title: "Stories como Motor de Conversão",
    subtitle: "Eficiência de cliques",
    description: "Os dados de abril evidenciam que os Stories, com destaque para a publicação de 02/04, registraram mais de 4,6 mil cliques diretos em links. A interatividade e a transitoriedade do formato aceleram o gatilho de compra (FMO), mostrando-se o canal ideal para distribuição.",
    category: "Conversão"
  },
  {
    id: "insight-humor",
    title: "Humor e Criadores Geram Menor Rejeição",
    subtitle: "Entretenimento no Feed e TikTok",
    description: "Formatos humorísticos e esquetes focadas na identificação diária (como o Reels 'Funcionário de Loja' e o vídeo no TikTok) registraram alcances elevados e taxas de engajamento orgânico. Esse tipo de conteúdo reduz barreiras psicológicas contra anúncios e gera brand equity sustentável.",
    category: "Conteúdo"
  },
  {
    id: "insight-media",
    title: "Otimização de Mídia Paga Baseada em Picos",
    subtitle: "Aproveitando o 'Halo Effect' do Feed",
    description: "O pico de eficiência em Abril (4,27% de engajamento médio) aponta que alinhar o impulsionamento traz resultado em Alcance, mas Orgânico em engajamento.",
    category: "Mídia Paga"
  },
  {
    id: "insight-crisis",
    title: "Atuação de Crise Blindou Mídia de Performance",
    subtitle: "Preservação de reputação em picos de ruído",
    description: "O desvio de tráfego de reclamações estão sendo considerados para ajustes futudo com o Manual de Crise.",
    category: "Reputação"
  }
];
