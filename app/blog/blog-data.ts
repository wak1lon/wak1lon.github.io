export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  description: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
  introduction: string;
  sections: BlogSection[];
  takeaway: string;
  sources?: { label: string; url: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "gestao-de-escritorio-de-advocacia",
    category: "Gestão jurídica",
    title: "Gestão de escritório de advocacia: um processo simples para organizar o crescimento",
    description: "Veja como organizar atendimento, responsabilidades, indicadores e rotina comercial na gestão de um escritório de advocacia.",
    excerpt: "Um modelo prático para transformar tarefas dispersas em uma operação acompanhável, sem aumentar a complexidade.",
    image: "/services/direcao-comercial.png",
    imageAlt: "Representação de processo organizado para gestão de escritório de advocacia",
    readTime: "7 min de leitura",
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["gestão de escritório de advocacia", "gestão jurídica", "processo comercial jurídico", "organização de escritório"],
    introduction: "A gestão de um escritório não melhora apenas com mais ferramentas. Ela melhora quando cada oportunidade, tarefa e responsabilidade possui um próximo passo claro. O objetivo é criar uma rotina que possa ser acompanhada sem depender da memória de uma única pessoa.",
    sections: [
      {
        heading: "1. Desenhe a jornada antes de escolher a ferramenta",
        paragraphs: [
          "Comece registrando o caminho real: entrada do contato, triagem, reunião, proposta, contratação e acompanhamento. Uma etapa só deve existir quando representa uma decisão ou responsabilidade diferente.",
          "Esse desenho revela onde os contatos ficam parados, onde informações são perdidas e quais atividades ainda dependem de mensagens soltas.",
        ],
        bullets: ["Defina quem recebe cada contato", "Determine o prazo esperado de resposta", "Registre o próximo passo obrigatório", "Crie um motivo claro para perdas e pausas"],
      },
      {
        heading: "2. Separe indicadores de movimento e de resultado",
        paragraphs: [
          "Quantidade de mensagens e reuniões mostra movimento, mas não explica sozinha a qualidade da operação. Acompanhe também tempo de resposta, contatos qualificados, comparecimento e avanço entre etapas.",
          "Uma leitura semanal curta é mais útil do que um painel complexo que ninguém consulta. O indicador precisa levar a uma decisão: manter, corrigir ou testar.",
        ],
      },
      {
        heading: "3. Crie uma rotina que caiba na equipe atual",
        paragraphs: [
          "O melhor processo é aquele que a equipe consegue executar todos os dias. Comece com poucas etapas, campos essenciais e uma revisão semanal. Automatizações entram depois que o fluxo manual está claro.",
          "Para escritórios menores, uma pessoa pode acumular funções, mas o momento de cada responsabilidade ainda deve estar definido.",
        ],
        bullets: ["Revisão rápida dos novos contatos", "Lista diária de retornos", "Reunião semanal de oportunidades", "Análise mensal de origem e qualidade"],
      },
    ],
    takeaway: "Organização comercial não significa transformar a advocacia em uma operação agressiva de vendas. Significa responder com clareza, registrar contexto e reduzir perdas entre o interesse e o atendimento profissional.",
  },
  {
    slug: "crm-juridico-para-advogados",
    category: "CRM jurídico",
    title: "CRM jurídico para advogados: o que organizar antes de automatizar o atendimento",
    description: "Entenda como estruturar um CRM jurídico para acompanhar contatos, retornos e oportunidades com mais clareza.",
    excerpt: "Campos, etapas e indicadores essenciais para usar um CRM sem transformar o atendimento em burocracia.",
    image: "/services/funil-qualificacao.png",
    imageAlt: "Funil de qualificação representando um CRM jurídico organizado",
    readTime: "6 min de leitura",
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["CRM jurídico", "CRM para advogados", "gestão de clientes advocacia", "funil jurídico"],
    introduction: "Um CRM jurídico deve funcionar como memória organizada do atendimento. Ele não substitui a análise profissional nem a relação humana; centraliza informações para que nenhum contato dependa de conversas dispersas ou retornos esquecidos.",
    sections: [
      {
        heading: "Quais etapas usar no CRM jurídico",
        paragraphs: ["Evite copiar um funil genérico. As etapas precisam representar o atendimento do escritório e permitir que qualquer responsável entenda o que aconteceu e qual é a próxima ação."],
        bullets: ["Novo contato", "Aguardando informações", "Triagem concluída", "Reunião agendada", "Em análise", "Contratado, pausado ou encerrado"],
      },
      {
        heading: "Quais informações realmente importam",
        paragraphs: [
          "Registre origem do contato, área de interesse, responsável, data do último atendimento e próxima ação. Informações sensíveis devem ser tratadas com cuidado, acesso limitado e finalidade definida.",
          "Quanto mais campos obrigatórios, maior a chance de abandono pela equipe. Comece pelo mínimo necessário para tomar decisões e acompanhar retornos.",
        ],
      },
      {
        heading: "Automatize apenas o que já está claro",
        paragraphs: [
          "Lembretes, distribuição de responsáveis e confirmações podem reduzir tarefas repetitivas. Porém, uma automação aplicada sobre um processo confuso apenas acelera o erro.",
          "Antes de integrar WhatsApp, formulários e campanhas, teste o fluxo com casos reais e revise onde a equipe ainda precisa decidir manualmente.",
        ],
      },
    ],
    takeaway: "O CRM é útil quando ajuda o escritório a responder melhor e acompanhar cada situação com contexto. A ferramenta vem depois da definição de etapas, responsabilidades e critérios.",
  },
  {
    slug: "marketing-juridico-no-google",
    category: "Marketing jurídico",
    title: "Marketing jurídico no Google: como construir presença sem comunicação excessiva",
    description: "Conheça uma estrutura informativa para presença jurídica no Google, com conteúdo útil, páginas claras e atenção às regras da OAB.",
    excerpt: "Uma presença digital encontrável começa com conteúdo útil, informações verdadeiras e uma jornada simples para o visitante.",
    image: "/services/landing-pages.png",
    imageAlt: "Página digital representando marketing jurídico no Google",
    readTime: "8 min de leitura",
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["marketing jurídico no Google", "SEO para advogados", "site para advogado", "publicidade jurídica"],
    introduction: "Estar presente no Google não exige uma comunicação apelativa. Uma estratégia sustentável combina páginas tecnicamente acessíveis, conteúdo que responde dúvidas reais e informações objetivas sobre atuação e contato.",
    sections: [
      {
        heading: "Comece pela intenção da busca",
        paragraphs: [
          "Uma pessoa pode pesquisar para entender um tema, comparar caminhos ou localizar um profissional. Cada página deve responder uma intenção principal, sem misturar vários assuntos apenas para repetir palavras-chave.",
          "O Google orienta que sites sejam criados primeiro para pessoas e que títulos, estrutura e links ajudem usuários e mecanismos de busca a compreender o conteúdo.",
        ],
      },
      {
        heading: "Crie páginas com informação verificável",
        paragraphs: [
          "Apresente área de atuação, localização, canais de contato e conteúdo explicativo com linguagem compreensível. Evite garantias, casos usados como promessa e afirmações que possam induzir o visitante a uma conclusão automática.",
          "O Provimento 205/2021 da OAB disciplina a publicidade e a informação na advocacia. O conteúdo deve ser analisado conforme o caso, com sobriedade e responsabilidade profissional.",
        ],
      },
      {
        heading: "Conecte conteúdo, página e atendimento",
        paragraphs: [
          "Uma página encontrada precisa carregar rápido, funcionar no celular e indicar o próximo passo sem pressão. O formulário deve solicitar apenas o necessário para iniciar a triagem.",
          "Depois do contato, o escritório precisa registrar origem, contexto e andamento. SEO sem atendimento organizado pode gerar visitas sem criar uma experiência confiável.",
        ],
      },
    ],
    takeaway: "SEO jurídico é um trabalho de clareza, consistência e utilidade. Não existe código isolado capaz de garantir posicionamento; a base é conteúdo relevante, experiência técnica adequada e comunicação responsável.",
    sources: [
      { label: "Guia de SEO do Google Search Central", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
      { label: "Provimento 205/2021 do CFOAB", url: "https://eticaedisciplina.oab.org.br/provimento" },
      { label: "Cartilha da OAB sobre publicidade na advocacia", url: "https://www.oab.org.br/noticia/62451/cartilha-oferece-esclarecimentos-e-diretrizes-eticas-sobre-publicidade-para-advogados" },
    ],
  },
  {
    slug: "google-meu-negocio-para-advogados",
    category: "Presença local",
    title: "Google Meu Negócio para advogados: estrutura para uma presença local consistente",
    description: "Veja como organizar informações, localização, conteúdo e acompanhamento do Perfil da Empresa no Google para escritórios de advocacia.",
    excerpt: "Informações consistentes e uma presença local bem cuidada facilitam a descoberta do escritório em pesquisas e no Maps.",
    image: "/services/presenca-local.png",
    imageAlt: "Marcador de localização representando presença local de escritório de advocacia",
    readTime: "6 min de leitura",
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["Google Meu Negócio para advogados", "Perfil da Empresa Google advocacia", "marketing jurídico local", "advogado no Google Maps"],
    introduction: "O Perfil da Empresa no Google ajuda pessoas a encontrar informações locais na Busca e no Maps. Para um escritório, a prioridade deve ser precisão: nome, endereço, horários, contato e apresentação precisam refletir a atividade real.",
    sections: [
      {
        heading: "Mantenha as informações essenciais consistentes",
        paragraphs: ["Use o nome real do escritório, a categoria adequada, endereço ou área de atendimento permitida, telefone e horário atualizado. Diferenças entre site, perfil e outros diretórios podem criar dúvida para o visitante."],
      },
      {
        heading: "Use imagens e conteúdo com caráter informativo",
        paragraphs: [
          "Fotos reais do ambiente, identidade visual e informações institucionais ajudam a pessoa a reconhecer o escritório. O conteúdo deve continuar alinhado às normas aplicáveis à publicidade jurídica.",
          "Evite práticas artificiais para avaliações ou informações criadas apenas para manipular a descoberta. O Google exige representação fiel do negócio e pode restringir perfis que violem suas diretrizes.",
        ],
      },
      {
        heading: "Acompanhe o que acontece depois da descoberta",
        paragraphs: ["Registre ligações, mensagens e acessos ao site que chegam pela presença local. Essa leitura ajuda a identificar dúvidas frequentes, horários com maior demanda e páginas que precisam de mais clareza."],
        bullets: ["Revise informações mensalmente", "Responda dúvidas com objetividade", "Mantenha o site e o perfil coerentes", "Acompanhe cliques e contatos sem prometer resultados"],
      },
    ],
    takeaway: "Presença local não é apenas preencher um cadastro. É manter informações confiáveis, uma identidade reconhecível e um atendimento capaz de continuar a experiência iniciada na pesquisa.",
    sources: [
      { label: "Diretrizes do Perfil da Empresa no Google", url: "https://support.google.com/business/answer/3038177" },
      { label: "Perfil da Empresa no Google", url: "https://business.google.com/" },
      { label: "Provimento 205/2021 do CFOAB", url: "https://eticaedisciplina.oab.org.br/provimento" },
    ],
  },
  {
    slug: "rastreamento-de-marketing-juridico",
    category: "Dados e aquisição",
    title: "Rastreamento de marketing jurídico: quais números ajudam a decidir melhor",
    description: "Organize eventos, origens e indicadores para avaliar o marketing jurídico além de cliques e visualizações.",
    excerpt: "Uma estrutura simples para conectar campanhas, páginas, contatos e decisões sem depender de métricas superficiais.",
    image: "/services/rastreamento-dados.png",
    imageAlt: "Painel representando rastreamento de dados no marketing jurídico",
    readTime: "7 min de leitura",
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    keywords: ["rastreamento de marketing jurídico", "métricas para advogados", "GTM para advogados", "conversões marketing jurídico"],
    introduction: "Cliques e alcance descrevem parte da campanha, mas não mostram sozinhos se a jornada está funcionando. O rastreamento precisa ligar a origem do acesso às ações relevantes do site e ao acompanhamento responsável do atendimento.",
    sections: [
      {
        heading: "Defina eventos que representam intenção",
        paragraphs: ["Visualização de página é um sinal amplo. Cliques no contato, início de formulário, conclusão de triagem e escolha de serviço indicam etapas diferentes. Nomeie os eventos com padrão e registre somente o que será analisado."],
      },
      {
        heading: "Leia o funil por etapa",
        paragraphs: [
          "Compare visitas, interações, contatos e oportunidades qualificadas. Quando a perda aumenta em uma etapa, investigue mensagem, velocidade, formulário ou atendimento antes de apenas aumentar a verba.",
          "O dado deve orientar uma hipótese. Mudanças simultâneas em anúncio, página e processo dificultam saber o que realmente influenciou o comportamento.",
        ],
      },
      {
        heading: "Proteja dados e limite o acesso",
        paragraphs: ["Coleta técnica não elimina responsabilidades de privacidade. Evite enviar informações sensíveis às plataformas de anúncio, documente finalidades e limite o acesso aos dados conforme a necessidade da operação."],
        bullets: ["Padronize nomes de eventos", "Teste antes de publicar", "Evite dados pessoais nos parâmetros", "Revise integrações periodicamente"],
      },
    ],
    takeaway: "O melhor painel não é o que possui mais números. É aquele que permite entender onde a jornada perde clareza e qual decisão deve ser testada em seguida.",
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
