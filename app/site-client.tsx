"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";

export type SiteSettings = {
  brandName: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  email: string;
  whatsapp: string;
  instagram: string;
  youtube: string;
  faviconData: string;
  logoData: string;
  heroImageData: string;
  aboutImageData: string;
  gtmCode: string;
  metaPixelCode: string;
  basicPrice: string;
  essentialPrice: string;
  completePrice: string;
};

export const SETTINGS_KEY = "wakilon-site-settings-v1";

export const defaultSettings: SiteSettings = {
  brandName: "WAKILON GESTOR",
  heroEyebrow: "MARKETING E AQUISIÇÃO PARA ADVOGADOS",
  heroTitle: "Transforme posicionamento em oportunidades de contratos.",
  heroSubtitle:
    "Estratégia, tráfego pago, funil e rastreamento trabalhando juntos para atrair, qualificar e acompanhar novas oportunidades com clareza.",
  email: "contato@wakilongestor.com.br",
  whatsapp: "",
  instagram: "https://instagram.com/wakilongestor",
  youtube: "https://youtube.com/@wakilongestor",
  faviconData: "",
  logoData: "",
  heroImageData: "",
  aboutImageData: "",
  gtmCode: "",
  metaPixelCode: "",
  basicPrice: "R$ 800",
  essentialPrice: "R$ 1.200",
  completePrice: "R$ 1.500",
};

const acquisitionSteps = [
  {
    number: "01",
    title: "Diagnóstico",
    short: "Entender o momento",
    detail:
      "Analisamos posicionamento, área de atuação, capacidade de atendimento, histórico de mídia e objetivo comercial.",
    metric: "Ponto de partida",
  },
  {
    number: "02",
    title: "Atração",
    short: "Gerar atenção qualificada",
    detail:
      "Campanhas no Meta Ads, Google Ads e, quando fizer sentido, TikTok Ads conectam sua mensagem ao público certo.",
    metric: "Tráfego direcionado",
  },
  {
    number: "03",
    title: "Qualificação",
    short: "Filtrar oportunidades",
    detail:
      "Landing pages e funis coletam as informações essenciais antes do contato, reduzindo conversas sem aderência.",
    metric: "Leads com contexto",
  },
  {
    number: "04",
    title: "Conversão",
    short: "Organizar o atendimento",
    detail:
      "Direcionamento comercial, CRM e WhatsApp ajudam sua equipe a acompanhar cada oportunidade com agilidade.",
    metric: "Processo comercial",
  },
  {
    number: "05",
    title: "Otimização",
    short: "Medir para evoluir",
    detail:
      "GTM, pixels e eventos revelam o que funciona. Os dados orientam ajustes de verba, criativos e etapas do funil.",
    metric: "Decisões por dados",
  },
];

const services = [
  {
    icon: "↗",
    title: "Tráfego Pago",
    text: "Gestão de campanhas no Meta Ads e Google Ads, com TikTok Ads nos projetos adequados.",
    tags: ["Meta Ads", "Google Ads", "TikTok Ads"],
  },
  {
    icon: "◇",
    title: "Landing Pages",
    text: "Páginas rápidas, objetivas e estruturadas para transformar atenção em contato qualificado.",
    tags: ["Conversão", "Mobile", "Performance"],
  },
  {
    icon: "⌁",
    title: "Funil de Qualificação",
    text: "Perguntas e caminhos que organizam a jornada e levam ao atendimento com mais contexto.",
    tags: ["Formulários", "Quiz", "WhatsApp"],
  },
  {
    icon: "⌖",
    title: "Rastreamento de Dados",
    text: "Eventos, pixels e painéis para acompanhar campanhas sem depender apenas de métricas superficiais.",
    tags: ["GTM", "Pixels", "Conversões"],
  },
  {
    icon: "◎",
    title: "Presença Local",
    text: "Otimização do Google Meu Negócio para reforçar autoridade e facilitar a descoberta regional.",
    tags: ["Google", "Local", "Autoridade"],
  },
  {
    icon: "＋",
    title: "Direção Comercial",
    text: "Apoio no processo de vendas, CRM e atendimento para aproveitar melhor cada oportunidade gerada.",
    tags: ["CRM", "Atendimento", "Processo"],
  },
];

function cleanPhone(value: string) {
  return value.replace(/\D/g, "");
}

export function contactHref(settings: SiteSettings) {
  const phone = cleanPhone(settings.whatsapp);
  if (phone) {
    const message = encodeURIComponent(
      "Olá, Wakilon! Quero entender qual estrutura de marketing faz sentido para meu escritório.",
    );
    return `https://wa.me/${phone}?text=${message}`;
  }
  return `mailto:${settings.email}?subject=${encodeURIComponent("Quero estruturar meu marketing jurídico")}`;
}

export function Brand({ settings }: { settings: SiteSettings }) {
  if (settings.logoData) {
    return <img className="brand-image" src={settings.logoData} alt={settings.brandName} />;
  }
  return (
    <span className="brand-wordmark" aria-label={settings.brandName}>
      <span className="brand-mark">W</span>
      <span>{settings.brandName}</span>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SiteClient() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [activeStep, setActiveStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(SETTINGS_KEY);
        if (saved) setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      } catch {
        setSettings(defaultSettings);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const contact = useMemo(() => contactHref(settings), [settings]);
  const heroStyle = settings.heroImageData
    ? { backgroundImage: `linear-gradient(90deg, rgba(2,9,24,.98) 0%, rgba(2,9,24,.86) 47%, rgba(2,9,24,.24) 100%), url(${settings.heroImageData})` }
    : undefined;

  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="#inicio" className="brand-link" aria-label="Voltar ao início">
          <Brand settings={settings} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Navegação principal">
          <a href="#processo" data-track-event="navigation_click" data-track-label="Processo" onClick={() => setMenuOpen(false)}>Processo</a>
          <a href="#servicos" data-track-event="navigation_click" data-track-label="Serviços" onClick={() => setMenuOpen(false)}>Serviços</a>
          <a href="#planos" data-track-event="navigation_click" data-track-label="Planos" onClick={() => setMenuOpen(false)}>Planos</a>
          <a href="#sobre" data-track-event="navigation_click" data-track-label="Sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
          <a className="nav-cta" href={contact} target="_blank" rel="noreferrer" data-track-event="generate_lead" data-track-label="Cabeçalho">Falar com Wakilon</a>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero-section" style={heroStyle}>
          <div className="hero-grid container">
            <div className="hero-copy">
              <div className="eyebrow"><span />{settings.heroEyebrow}</div>
              <h1>{settings.heroTitle}</h1>
              <p>{settings.heroSubtitle}</p>
              <div className="hero-actions">
                <a className="button button-primary" href={contact} target="_blank" rel="noreferrer" data-track-event="generate_lead" data-track-label="Hero principal">
                  Quero crescer com direção <ArrowIcon />
                </a>
                <a className="text-link" href="#processo" data-track-event="navigation_click" data-track-label="Ver processo">Ver como funciona <span>↓</span></a>
              </div>
              <div className="trust-row" aria-label="Principais diferenciais">
                <span><i>✓</i> Estratégia personalizada</span>
                <span><i>✓</i> Publicidade jurídica responsável</span>
                <span><i>✓</i> Decisões orientadas por dados</span>
              </div>
            </div>

            <div className="hero-visual" aria-label="Visão integrada do processo de aquisição">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="data-card main-data-card">
                <div className="card-topline"><span>PROCESSO INTEGRADO</span><i className="live-dot" /></div>
                <div className="mini-chart" aria-hidden="true">
                  <span style={{ height: "28%" }} />
                  <span style={{ height: "44%" }} />
                  <span style={{ height: "39%" }} />
                  <span style={{ height: "67%" }} />
                  <span style={{ height: "82%" }} />
                  <span style={{ height: "94%" }} />
                </div>
                <div className="pipeline-line">
                  <span>Atrair</span><b>→</b><span>Qualificar</span><b>→</b><span>Converter</span>
                </div>
              </div>
              <div className="data-card float-card float-one"><b>GTM</b><span>Eventos rastreados</span></div>
              <div className="data-card float-card float-two"><b>CRM</b><span>Leads organizados</span></div>
              <div className="platform-pill pill-meta">META</div>
              <div className="platform-pill pill-google">GOOGLE</div>
            </div>
          </div>
          <div className="hero-fade" />
        </section>

        <section className="platform-strip" aria-label="Plataformas e tecnologia">
          <div className="container platform-track">
            <span>TECNOLOGIA A SERVIÇO DA ESTRATÉGIA</span>
            <strong>META ADS</strong><i />
            <strong>GOOGLE ADS</strong><i />
            <strong>TIKTOK ADS</strong><i />
            <strong>GTM</strong><i />
            <strong>CRM</strong><i />
            <strong>WHATSAPP</strong>
          </div>
        </section>

        <section id="processo" className="section process-section">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <span className="section-kicker">PROCESSO DE AQUISIÇÃO</span>
                <h2>Não é apenas anúncio.<br />É uma jornada conectada.</h2>
              </div>
              <p>Clique em cada etapa e veja como a estratégia transforma atenção em oportunidades acompanháveis.</p>
            </div>

            <div className="funnel-shell">
              <div className="funnel-tabs" role="tablist" aria-label="Etapas do processo">
                {acquisitionSteps.map((step, index) => (
                  <button
                    key={step.number}
                    type="button"
                    role="tab"
                    aria-selected={activeStep === index}
                    className={activeStep === index ? "funnel-tab active" : "funnel-tab"}
                    data-track-event="select_content"
                    data-track-label={`Funil: ${step.title}`}
                    data-track-step={step.number}
                    onClick={() => setActiveStep(index)}
                  >
                    <span>{step.number}</span>
                    <div><b>{step.title}</b><small>{step.short}</small></div>
                  </button>
                ))}
              </div>
              <div className="funnel-detail" role="tabpanel" key={acquisitionSteps[activeStep].number}>
                <div className="detail-copy">
                  <span className="detail-number">ETAPA {acquisitionSteps[activeStep].number}</span>
                  <h3>{acquisitionSteps[activeStep].title}</h3>
                  <p>{acquisitionSteps[activeStep].detail}</p>
                  <div className="metric-chip"><i /> {acquisitionSteps[activeStep].metric}</div>
                </div>
                <div className="funnel-graphic" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((item) => (
                    <div key={item} className={item === activeStep ? "funnel-layer highlighted" : "funnel-layer"}>
                      <span>{acquisitionSteps[item].title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="servicos" className="section services-section">
          <div className="container">
            <div className="section-heading centered-heading">
              <span className="section-kicker">ESTRUTURA COMPLETA</span>
              <h2>Os serviços que sustentam<br />uma aquisição mais inteligente.</h2>
              <p>Cada solução entra quando faz sentido para o momento e a capacidade do seu escritório.</p>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <div className="tag-row">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section method-section">
          <div className="container method-grid">
            <div className="method-copy">
              <span className="section-kicker">CLAREZA ANTES DA ESCALA</span>
              <h2>Mais controle sobre o que acontece depois do clique.</h2>
              <p>Tráfego sem processo comercial e sem dados cria volume, mas não necessariamente evolução. A proposta é conectar marketing, atendimento e decisão.</p>
              <ul className="check-list">
                <li><span>01</span><div><b>Mensagem alinhada</b><small>Comunicação coerente com o público e com as regras da publicidade jurídica.</small></div></li>
                <li><span>02</span><div><b>Captação organizada</b><small>Formulários e funis que registram o contexto antes do atendimento.</small></div></li>
                <li><span>03</span><div><b>Leitura de dados</b><small>Métricas que ajudam a decidir onde manter, ajustar ou interromper investimentos.</small></div></li>
              </ul>
            </div>
            <div className="insight-panel">
              <div className="panel-head"><span>VISÃO DA OPERAÇÃO</span><i>● ONLINE</i></div>
              <div className="signal-grid">
                <div><small>Entrada</small><b>Campanhas</b><span className="signal-bar"><i style={{ width: "86%" }} /></span></div>
                <div><small>Qualificação</small><b>Funil</b><span className="signal-bar"><i style={{ width: "72%" }} /></span></div>
                <div><small>Atendimento</small><b>CRM + WhatsApp</b><span className="signal-bar"><i style={{ width: "64%" }} /></span></div>
              </div>
              <div className="insight-core"><span>ANÁLISE CONTÍNUA</span><strong>Dados → decisões → melhoria</strong></div>
              <p>O investimento em mídia é separado da gestão e definido conforme objetivo, região e capacidade de atendimento.</p>
            </div>
          </div>
        </section>

        <section id="planos" className="section pricing-section">
          <div className="container">
            <div className="section-heading centered-heading">
              <span className="section-kicker">PLANOS MENSAIS</span>
              <h2>Escolha a estrutura ideal<br />para o seu momento.</h2>
              <p>Planos objetivos, com entregas claras e sem incluir a verba investida diretamente nas plataformas.</p>
            </div>
            <div className="pricing-grid">
              <article className="price-card">
                <div className="price-head"><span>BÁSICO</span><small>Primeiros passos</small></div>
                <div className="price"><strong>{settings.basicPrice}</strong><span>/mês</span></div>
                <p>Para quem precisa começar a anunciar com uma estrutura enxuta.</p>
                <ul>
                  <li>Meta Ads</li><li>Google Ads</li><li>Funil de qualificação</li><li>Relatório periódico</li>
                </ul>
                <a href={contact} target="_blank" rel="noreferrer" className="button button-outline" data-track-event="generate_lead" data-track-label="Plano Básico" data-track-plan="Básico">Quero o Básico <ArrowIcon /></a>
              </article>
              <article className="price-card featured-price">
                <div className="recommended">MAIS ESCOLHIDO</div>
                <div className="price-head"><span>ESSENCIAL</span><small>Estrutura completa</small></div>
                <div className="price"><strong>{settings.essentialPrice}</strong><span>/mês</span></div>
                <p>Para conectar aquisição, conversão e leitura de dados.</p>
                <ul>
                  <li>Meta Ads + Google Ads</li><li>Landing page profissional</li><li>Funil de qualificação</li><li>Rastreamento de conversões</li><li>Apoio no processo de vendas</li><li>Relatório periódico</li>
                </ul>
                <a href={contact} target="_blank" rel="noreferrer" className="button button-primary" data-track-event="generate_lead" data-track-label="Plano Essencial" data-track-plan="Essencial">Quero o Essencial <ArrowIcon /></a>
              </article>
              <article className="price-card">
                <div className="price-head"><span>COMPLETO</span><small>Mais canais</small></div>
                <div className="price"><strong>{settings.completePrice}</strong><span>/mês</span></div>
                <p>Para operações que desejam ampliar presença e organização.</p>
                <ul>
                  <li>Tudo do Essencial</li><li>TikTok Ads</li><li>Direcionamento comercial</li><li>Google Meu Negócio</li><li>Orientação de CRM</li><li>Relatório periódico</li>
                </ul>
                <a href={contact} target="_blank" rel="noreferrer" className="button button-outline" data-track-event="generate_lead" data-track-label="Plano Completo" data-track-plan="Completo">Quero o Completo <ArrowIcon /></a>
              </article>
            </div>

            <div className="market-anchor">
              <div>
                <span className="section-kicker">REFERÊNCIA DE MERCADO</span>
                <h3>Compare o conjunto, não apenas uma entrega isolada.</h3>
                <p>Em referências públicas consultadas em agosto de 2026, a gestão de tráfego aparece entre R$ 1.000 e R$ 10.000/mês e landing pages profissionais entre R$ 1.200 e R$ 4.000 por projeto. O escopo e a complexidade alteram os valores.</p>
              </div>
              <div className="anchor-numbers">
                <span><small>GESTÃO DE TRÁFEGO</small><b>R$ 1 mil–10 mil</b><em>referência mensal</em></span>
                <span><small>LANDING PAGE</small><b>R$ 1,2 mil–4 mil</b><em>referência por projeto</em></span>
              </div>
              <p className="source-note">Fontes de referência: <a href="https://rocketmidia.com/trafego-pago/quanto-custa-contratar-um-gestor-de-trafego/" target="_blank" rel="noreferrer">Rocket Mídia</a> e <a href="https://gabrieldosite.com.br/quanto-custa-uma-landing-page/" target="_blank" rel="noreferrer">Gabriel do Site</a>. Valores informativos, sem constituir tabela oficial.</p>
            </div>
          </div>
        </section>

        <section id="sobre" className="section about-section">
          <div className="container about-grid">
            <div className="about-visual" style={settings.aboutImageData ? { backgroundImage: `url(${settings.aboutImageData})` } : undefined}>
              {!settings.aboutImageData && (
                <div className="about-monogram"><span>WG</span><small>ESTRATÉGIA • DADOS • CRESCIMENTO</small></div>
              )}
              <div className="location-chip"><i /> Rio Branco/AC e atendimento online</div>
            </div>
            <div className="about-copy">
              <span className="section-kicker">WAKILON GESTOR</span>
              <h2>Marketing que respeita o seu momento e a responsabilidade da advocacia.</h2>
              <p>Eu ajudo advogados, especialmente previdenciaristas, a organizar sua presença digital e o processo de aquisição com estratégia, tecnologia e acompanhamento próximo.</p>
              <p>O trabalho vai além de colocar campanhas no ar: conecto tráfego, páginas, qualificação, rastreamento e processo comercial para você investir com mais clareza.</p>
              <div className="about-values"><span><b>Direção</b><small>Antes de investir</small></span><span><b>Transparência</b><small>Na leitura dos dados</small></span><span><b>Evolução</b><small>Com melhoria contínua</small></span></div>
              <a href={contact} target="_blank" rel="noreferrer" className="text-link strong-link" data-track-event="generate_lead" data-track-label="Bloco sobre">Vamos conversar <ArrowIcon /></a>
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-grid">
            <div className="section-heading"><span className="section-kicker">PERGUNTAS FREQUENTES</span><h2>Clareza antes de começar.</h2><p>Respostas diretas para as principais dúvidas sobre a parceria.</p></div>
            <div className="accordion-list">
              <details open><summary>O investimento em anúncios está incluso?<span>+</span></summary><p>Não. A verba de mídia é paga diretamente às plataformas e definida conforme objetivo, região e capacidade de atendimento.</p></details>
              <details><summary>Você promete quantidade de contratos?<span>+</span></summary><p>Não. Marketing melhora processos e oportunidades, mas resultados dependem de mercado, oferta, atendimento e outros fatores. O trabalho é orientado por dados, sem promessa de resultado.</p></details>
              <details><summary>Os anúncios respeitam as regras da OAB?<span>+</span></summary><p>A comunicação é planejada com sobriedade, caráter informativo e sem captação indevida, promessa ou mercantilização. A aprovação final das peças é feita em conjunto.</p></details>
              <details><summary>Preciso ter equipe comercial?<span>+</span></summary><p>Não necessariamente. O diagnóstico considera sua estrutura atual e propõe um fluxo viável para o seu momento.</p></details>
            </div>
          </div>
        </section>

        <section id="contato" className="cta-section">
          <div className="container cta-inner">
            <div><span className="section-kicker">PRÓXIMO PASSO</span><h2>Quer construir uma aquisição mais clara para o seu escritório?</h2><p>Conte seu momento. A conversa inicial serve para entender o cenário e indicar a estrutura que realmente faz sentido.</p></div>
            <a className="button button-light" href={contact} target="_blank" rel="noreferrer" data-track-event="generate_lead" data-track-label="CTA final">QUERO CONVERSAR <ArrowIcon /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand"><Brand settings={settings} /><p>Marketing, tráfego e processos de aquisição para advogados que querem crescer com direção.</p></div>
          <div><span className="footer-title">NAVEGAÇÃO</span><a href="#processo">Processo</a><a href="#servicos">Serviços</a><a href="#planos">Planos</a><a href="#sobre">Sobre</a></div>
          <div><span className="footer-title">CANAIS</span><a href={`mailto:${settings.email}`} data-track-event="generate_lead" data-track-label="E-mail do rodapé">{settings.email}</a><a href={settings.instagram} target="_blank" rel="noreferrer" data-track-event="outbound_click" data-track-label="Instagram">Instagram</a><a href={settings.youtube} target="_blank" rel="noreferrer" data-track-event="outbound_click" data-track-label="YouTube">YouTube</a></div>
          <div><span className="footer-title">INFORMAÇÕES</span><a href="/privacidade">Política de Privacidade</a><a href="/termos">Termos de Uso</a><a href="/painel" className="admin-link">Painel de edição</a></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 {settings.brandName}. Todos os direitos reservados.</span><span>Desenvolvido com estratégia e propósito.</span></div>
      </footer>
    </div>
  );
}
