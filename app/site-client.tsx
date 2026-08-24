"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CookieSettingsButton from "./cookie-settings-button";

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
  faviconVersion: string;
  socialImageData: string;
  socialImageVersion: string;
  logoData: string;
  heroImageData: string;
  aboutImageData: string;
  bannerImageData: string;
  bannerEnabled: boolean;
  bannerEyebrow: string;
  bannerTitle: string;
  bannerText: string;
  bannerButtonLabel: string;
  bannerButtonUrl: string;
  serviceStyle: "mixed" | "blue" | "light" | "graphite";
  gtmCode: string;
  metaPixelCode: string;
  basicPrice: string;
  essentialPrice: string;
  completePrice: string;
};

export const SETTINGS_KEY = "wakilon-site-settings-v1";

const previousHeroCopy = {
  eyebrow: "MARKETING E AQUISIÇÃO PARA ADVOGADOS",
  title: "Marketing para advogados que transforma posicionamento em oportunidades.",
  subtitle: "Estratégia, tráfego pago, funil e rastreamento trabalhando juntos para atrair, qualificar e acompanhar novas oportunidades com clareza.",
};

export const defaultSettings: SiteSettings = {
  brandName: "WAKILON GESTOR",
  heroEyebrow: "TRÁFEGO PAGO, FUNIL E RASTREAMENTO PARA ADVOGADOS",
  heroTitle: "Gestão de tráfego, funil e rastreamento para advogados.",
  heroSubtitle:
    "Planejo campanhas no Meta Ads, Google Ads e WhatsApp, estruturo landing pages e qualificação de leads e conecto os dados ao seu processo comercial.",
  email: "contato@wakilongestor.com.br",
  whatsapp: "5568999167371",
  instagram: "https://instagram.com/wakilongestor",
  youtube: "https://youtube.com/@wakilongestor",
  faviconData: "",
  faviconVersion: "",
  socialImageData: "",
  socialImageVersion: "",
  logoData: "",
  heroImageData: "",
  aboutImageData: "",
  bannerImageData: "",
  bannerEnabled: true,
  bannerEyebrow: "CONTEÚDO PARA ESCRITÓRIOS",
  bannerTitle: "Gestão, marketing e processo comercial em uma visão prática.",
  bannerText: "Acesse orientações objetivas para organizar a aquisição de clientes, o atendimento e a presença digital do seu escritório.",
  bannerButtonLabel: "Explorar o Blog",
  bannerButtonUrl: "/blog/",
  serviceStyle: "mixed",
  gtmCode: "",
  metaPixelCode: "",
  basicPrice: "R$ 800",
  essentialPrice: "R$ 1.200",
  completePrice: "R$ 1.500",
};

export function mergeSiteSettings(saved: Partial<SiteSettings>) {
  const merged = { ...defaultSettings, ...saved };
  if (saved.heroEyebrow === previousHeroCopy.eyebrow) merged.heroEyebrow = defaultSettings.heroEyebrow;
  if (saved.heroTitle === previousHeroCopy.title) merged.heroTitle = defaultSettings.heroTitle;
  if (saved.heroSubtitle === previousHeroCopy.subtitle) merged.heroSubtitle = defaultSettings.heroSubtitle;
  return merged;
}

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
    number: "01",
    stage: "Atração",
    theme: "blue",
    image: "/services/trafego-pago.png",
    alt: "Representação visual de campanhas de tráfego pago para advogados",
    title: "Tráfego Pago",
    summary: "Campanhas para colocar sua proposta diante do público certo.",
    details: "Planejamento, gestão e otimização no Meta Ads e Google Ads, com TikTok Ads quando houver aderência ao projeto.",
    tags: ["Meta Ads", "Google Ads", "TikTok Ads"],
  },
  {
    number: "02",
    stage: "Conversão",
    theme: "light",
    image: "/services/landing-pages.png",
    alt: "Representação visual de landing page focada em conversão",
    title: "Landing Pages",
    summary: "Páginas rápidas que transformam atenção em contato.",
    details: "Estrutura responsiva, mensagem objetiva e chamadas para ação pensadas para reduzir distrações e facilitar a conversão.",
    tags: ["Conversão", "Mobile", "Performance"],
  },
  {
    number: "03",
    stage: "Qualificação",
    theme: "graphite",
    image: "/services/funil-qualificacao.png",
    alt: "Representação visual de funil de qualificação de oportunidades",
    title: "Funil de Qualificação",
    summary: "Perguntas que qualificam antes do atendimento.",
    details: "Formulários e caminhos inteligentes registram o contexto essencial e conduzem cada oportunidade ao atendimento adequado.",
    tags: ["Formulários", "Quiz", "WhatsApp"],
  },
  {
    number: "04",
    stage: "Medição",
    theme: "light",
    image: "/services/rastreamento-dados.png",
    alt: "Representação visual de rastreamento de dados e conversões",
    title: "Rastreamento de Dados",
    summary: "Dados claros para saber o que realmente funciona.",
    details: "GTM, pixels e eventos de conversão conectam as ações do site às plataformas de anúncio e apoiam decisões mais seguras.",
    tags: ["GTM", "Pixels", "Conversões"],
  },
  {
    number: "05",
    stage: "Autoridade",
    theme: "blue",
    image: "/services/presenca-local.png",
    alt: "Representação visual de presença local e localização no Google",
    title: "Presença Local",
    summary: "Mais autoridade para ser encontrado na sua região.",
    details: "Otimização da presença local para facilitar a descoberta do escritório e transmitir informações consistentes a quem pesquisa.",
    tags: ["Google", "Local", "Autoridade"],
  },
  {
    number: "06",
    stage: "Vendas",
    theme: "graphite",
    image: "/services/direcao-comercial.png",
    alt: "Representação visual de direção comercial e organização de oportunidades",
    title: "Direção Comercial",
    summary: "Organização para aproveitar melhor cada oportunidade.",
    details: "Orientação de CRM, rotina de atendimento e acompanhamento comercial para reduzir perdas depois da geração do contato.",
    tags: ["CRM", "Atendimento", "Processo"],
  },
];

const planCatalog = [
  {
    id: "basico",
    name: "Básico",
    eyebrow: "Primeiros passos",
    description: "Para iniciar campanhas com uma estrutura objetiva e acompanhamento profissional.",
    features: ["Gestão de Meta Ads", "Gestão de Google Ads", "Funil de qualificação", "Relatório periódico"],
    featured: false,
  },
  {
    id: "essencial",
    name: "Essencial",
    eyebrow: "Estrutura integrada",
    description: "Para conectar aquisição, conversão, rastreamento e apoio ao processo de vendas.",
    features: ["Meta Ads + Google Ads", "Landing page profissional", "Funil de qualificação", "Rastreamento de conversões", "Apoio no processo de vendas", "Relatório periódico"],
    featured: true,
  },
  {
    id: "completo",
    name: "Completo",
    eyebrow: "Mais canais e direção",
    description: "Para ampliar presença, canais de aquisição e organização comercial.",
    features: ["Tudo do Plano Essencial", "Gestão de TikTok Ads", "Direcionamento comercial", "Google Meu Negócio", "Orientação de CRM", "Relatório periódico"],
    featured: false,
  },
] as const;

type PlanId = (typeof planCatalog)[number]["id"];

function cleanPhone(value: string) {
  return value.replace(/\D/g, "");
}

export function contactHref(settings: SiteSettings, planName?: string) {
  const phone = cleanPhone(settings.whatsapp) || "5568999167371";
  const complement = planName
    ? ` Quero saber mais sobre o Plano ${planName}.`
    : " Quero entender qual estrutura de marketing faz sentido para o meu escritório.";
  const message = encodeURIComponent(`Olá, Wakilon! Vi o site e é realmente isso que estou procurando.${complement}`);
  return `https://wa.me/${phone}?text=${message}`;
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

function VerifiedIcon() {
  return (
    <svg className="verified-icon" viewBox="0 0 20 20" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path d="M10 1.8l2.1 1.35 2.5-.08.82 2.36 2.08 1.4-.7 2.4.7 2.4-2.08 1.4-.82 2.36-2.5-.08L10 18.2l-2.1-1.35-2.5.08-.82-2.36-2.08-1.4.7-2.4-.7-2.4 2.08-1.4.82-2.36 2.5.08L10 1.8z" fill="currentColor" />
      <path d="M6.8 10.1l2.05 2.05 4.35-4.4" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckoutSealIcon({ type }: { type: "shield" | "chat" | "direction" }) {
  return (
    <svg className="checkout-seal-icon" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {type === "shield" && <><path d="M12 2.7 19 5.5v5.7c0 4.4-2.7 8.2-7 10.1-4.3-1.9-7-5.7-7-10.1V5.5L12 2.7Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>}
      {type === "chat" && <><path d="M4.2 5.1h15.6v10.3H10l-4.6 3v-3H4.2V5.1Z" /><path d="M8 9.1h8M8 12h5.4" /></>}
      {type === "direction" && <><circle cx="12" cy="12" r="8.7" /><path d="m14.9 8.3-1.6 5-5 1.6 1.6-5 5-1.6Z" /></>}
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.5 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4zm-8.4 18.2c-1.7 0-3.4-.5-4.9-1.3l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.3 4.6zm5.4-7.3c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.9-.9-3.2-1.7-4.5-3.9-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.1.2 2.5 3.8 6 5.3.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z" fill="currentColor" />
    </svg>
  );
}

export default function SiteClient() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [activeStep, setActiveStep] = useState(0);
  const [openService, setOpenService] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>("essencial");
  const [aboutExpanded, setAboutExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadLocal = () => {
      try {
        const saved = window.localStorage.getItem(SETTINGS_KEY);
        if (saved && !cancelled) setSettings(mergeSiteSettings(JSON.parse(saved)));
      } catch {
        if (!cancelled) setSettings(defaultSettings);
      }
    };
    const loadPublished = async () => {
      loadLocal();
      try {
        const { loadPublishedSiteSettings } = await import("./site-settings-store");
        const published = await loadPublishedSiteSettings();
        if (!published || cancelled) return;
        setSettings(published);
        window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(published));
        window.dispatchEvent(new CustomEvent("wakilon:settings-updated"));
      } catch {
        // O conteúdo padrão/local mantém o site utilizável se o Firebase estiver indisponível.
      }
    };
    const handleStorage = (event: StorageEvent) => {
      if (!event.key || event.key === SETTINGS_KEY) loadLocal();
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") void loadPublished();
    };
    const syncTimer = window.setInterval(() => { void loadPublished(); }, 60_000);
    void loadPublished();
    window.addEventListener("storage", handleStorage);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      cancelled = true;
      window.clearInterval(syncTimer);
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!items.length) return;
    items.forEach((item) => item.classList.add("reveal-ready"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6%" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const contact = useMemo(() => contactHref(settings), [settings]);
  const planPrices: Record<PlanId, string> = {
    basico: settings.basicPrice,
    essencial: settings.essentialPrice,
    completo: settings.completePrice,
  };
  const selectedPlan = planCatalog.find((plan) => plan.id === selectedPlanId) ?? planCatalog[1];

  function selectPlan(planId: PlanId) {
    setSelectedPlanId(planId);
    window.requestAnimationFrame(() => document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "center" }));
  }

  function moveServiceCard(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty("--service-tilt-x", `${(-y * 3.5).toFixed(2)}deg`);
    card.style.setProperty("--service-tilt-y", `${(x * 4.5).toFixed(2)}deg`);
    card.style.setProperty("--service-glow-x", `${((x + 0.5) * 100).toFixed(0)}%`);
    card.style.setProperty("--service-glow-y", `${((y + 0.5) * 100).toFixed(0)}%`);
  }

  function resetServiceCard(event: React.PointerEvent<HTMLElement>) {
    const card = event.currentTarget;
    card.style.setProperty("--service-tilt-x", "0deg");
    card.style.setProperty("--service-tilt-y", "0deg");
  }
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
          <Link href="/blog/" data-track-event="navigation_click" data-track-label="Blog" onClick={() => setMenuOpen(false)}>Blog</Link>
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

        {settings.bannerEnabled && (
          <section className="spotlight-section" aria-label="Destaque editorial">
            <div className="container">
              <div
                className={settings.bannerImageData ? "spotlight-banner spotlight-banner-image reveal" : "spotlight-banner reveal"}
                style={settings.bannerImageData ? { backgroundImage: `linear-gradient(90deg,rgba(2,9,24,.98),rgba(2,9,24,.76)),url(${settings.bannerImageData})` } : undefined}
              >
                <div className="spotlight-copy">
                  <span>{settings.bannerEyebrow}</span>
                  <h2>{settings.bannerTitle}</h2>
                  <p>{settings.bannerText}</p>
                  <a
                    href={settings.bannerButtonUrl || "/blog/"}
                    className="button spotlight-button"
                    data-track-event="blog_banner_click"
                    data-track-label={settings.bannerButtonLabel || "Explorar o Blog"}
                  >
                    {settings.bannerButtonLabel || "Explorar o Blog"} <ArrowIcon />
                  </a>
                </div>
                {!settings.bannerImageData && (
                  <div className="spotlight-visual" aria-hidden="true">
                    <span className="spotlight-orbit" />
                    <img src="/services/direcao-comercial.png" alt="" width="480" height="480" loading="lazy" />
                    <div><b>CONTEÚDO PRÁTICO</b><small>Gestão • Marketing • Dados</small></div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        <section id="processo" className="section process-section">
          <div className="container">
            <div className="section-heading split-heading reveal">
              <div>
                <span className="section-kicker">PROCESSO DE AQUISIÇÃO</span>
                <h2>Não é apenas anúncio.<br />É uma jornada conectada.</h2>
              </div>
              <p>Clique em cada etapa e veja como a estratégia transforma atenção em oportunidades acompanháveis.</p>
            </div>

            <div className="funnel-shell reveal">
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
            <div className="section-heading centered-heading reveal">
              <span className="section-kicker">MARKETING PARA ADVOGADOS</span>
              <h2>Serviços conectados em<br />uma estratégia mais inteligente.</h2>
              <p>Veja o essencial primeiro. Abra apenas o serviço que deseja entender melhor.</p>
            </div>
            <div className="services-grid reveal">
              {services.map((service, index) => {
                const theme = settings.serviceStyle === "mixed" ? service.theme : settings.serviceStyle;
                return (
                <article
                  className={`service-card service-${theme}${openService === index ? " service-card-open" : ""}`}
                  key={service.title}
                  onPointerMove={moveServiceCard}
                  onPointerLeave={resetServiceCard}
                >
                  <div className="service-visual">
                    <span className="service-number">{service.number}</span>
                    <img src={service.image} alt={service.alt} width="320" height="320" loading="lazy" />
                  </div>
                  <div className="service-card-copy">
                    <span className="service-stage">{service.stage}</span>
                    <h3>{service.title}</h3>
                    <p className="service-summary">{service.summary}</p>
                    <button
                      className="service-toggle"
                      type="button"
                      aria-expanded={openService === index}
                      aria-controls={`service-detail-${index}`}
                      data-track-event={openService === index ? "service_detail_close" : "service_detail_view"}
                      data-track-label={`Serviço: ${service.title}`}
                      onClick={() => setOpenService((current) => current === index ? null : index)}
                    >
                      <span>{openService === index ? "Mostrar menos" : "Saiba mais"}</span>
                      <i aria-hidden="true">+</i>
                    </button>
                    <div
                      id={`service-detail-${index}`}
                      className="service-disclosure"
                      aria-hidden={openService !== index}
                    >
                      <div className="service-disclosure-inner">
                        <p>{service.details}</p>
                        <div className="tag-row">{service.tags.map((tag) => <span key={tag}>✓ {tag}</span>)}</div>
                      </div>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section method-section">
          <div className="container method-grid reveal">
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
            <div className="section-heading centered-heading reveal">
              <span className="section-kicker">INVESTIMENTO E ESTRUTURA</span>
              <h2>Planos claros para avançar<br />com estratégia e direção.</h2>
              <p>Compare as entregas, selecione a estrutura mais coerente com o seu momento e fale diretamente comigo pelo WhatsApp.</p>
            </div>
            <div className="pricing-grid reveal">
              {planCatalog.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <article className={`price-card${plan.featured ? " featured-price" : ""}${isSelected ? " selected-price" : ""}`} key={plan.id}>
                    {plan.featured && <div className="recommended"><VerifiedIcon /> MAIS ESCOLHIDO</div>}
                    <div className="price-head"><span>PLANO {plan.name.toUpperCase()}</span><small>{plan.eyebrow}</small></div>
                    <div className="price"><strong>{planPrices[plan.id]}</strong><span>/mês</span></div>
                    <p>{plan.description}</p>
                    <ul>
                      {plan.features.map((feature) => <li key={feature}><VerifiedIcon /><span>{feature}</span></li>)}
                    </ul>
                    <button
                      type="button"
                      className={plan.featured ? "button button-primary plan-select" : "button button-outline plan-select"}
                      aria-pressed={isSelected}
                      onClick={() => selectPlan(plan.id)}
                      data-track-event="select_item"
                      data-track-label={`Selecionar Plano ${plan.name}`}
                      data-track-plan={plan.name}
                    >
                      {isSelected ? "PLANO SELECIONADO" : "ESCOLHER ESTE PLANO"} <ArrowIcon />
                    </button>
                  </article>
                );
              })}
            </div>

            <div id="checkout" className="checkout-shell reveal">
              <div className="checkout-content">
                <span className="section-kicker">PRÓXIMO PASSO</span>
                <h3>Confirme sua escolha e fale diretamente comigo.</h3>
                <p>O contato inicial serve para entender seu cenário, confirmar o escopo e verificar se o plano selecionado realmente faz sentido para o escritório.</p>
                <div className="checkout-steps" aria-label="Etapas para iniciar">
                  <span><b>01</b><small>Você seleciona o plano</small></span>
                  <span><b>02</b><small>Conversamos no WhatsApp</small></span>
                  <span><b>03</b><small>Você recebe o direcionamento</small></span>
                </div>
                <div className="checkout-seals" aria-label="Compromissos do atendimento">
                  <span><i><CheckoutSealIcon type="shield" /></i><span><b>Escopo confirmado</b><small>Antes de qualquer início</small></span></span>
                  <span><i><CheckoutSealIcon type="chat" /></i><span><b>Contato direto</b><small>Pelo WhatsApp</small></span></span>
                  <span><i><CheckoutSealIcon type="direction" /></i><span><b>Direção responsável</b><small>Sem promessa de resultado</small></span></span>
                </div>
              </div>
              <aside className="checkout-summary" aria-label={`Resumo do Plano ${selectedPlan.name}`}>
                <div className="summary-topline"><span>SEU PLANO</span><i>SELECIONADO</i></div>
                <div className="summary-plan"><div><small>PLANO</small><strong>{selectedPlan.name}</strong></div><div className="summary-price"><strong>{planPrices[selectedPlan.id]}</strong><small>por mês</small></div></div>
                <ul>
                  {selectedPlan.features.slice(0, 4).map((feature) => <li key={feature}><VerifiedIcon />{feature}</li>)}
                </ul>
                <a
                  href={contactHref(settings, selectedPlan.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="button whatsapp-button"
                  data-track-event="generate_lead"
                  data-track-label={`Checkout Plano ${selectedPlan.name}`}
                  data-track-plan={selectedPlan.name}
                >
                  <WhatsAppIcon /> CHAMAR NO WHATSAPP
                </a>
                <p className="summary-note">Mensagem pronta: “Vi o site e é realmente isso que estou procurando.”</p>
              </aside>
            </div>

            <div className="market-anchor reveal">
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
          <div className="container about-grid reveal">
            <div className="about-visual" style={settings.aboutImageData ? { backgroundImage: `url(${settings.aboutImageData})` } : undefined}>
              {!settings.aboutImageData && (
                <div className="about-monogram"><span>WG</span><small>ESTRATÉGIA • DADOS • CRESCIMENTO</small></div>
              )}
              <div className="location-chip"><i /> Rio Branco/AC e atendimento online</div>
            </div>
            <div className="about-copy">
              <span className="section-kicker">WAKILON GESTOR</span>
              <h2>Experiência prática em campanhas, vendas e aquisição digital.</h2>
              <p>Sou Wakilon Ferreira, profissional de marketing com mais de cinco anos de experiência em tráfego pago e campanhas de vendas.</p>
              <p>Hoje atuo com foco em advogados, conectando anúncios, páginas, funis, WhatsApp, rastreamento e organização comercial em uma estrutura clara.</p>
              <div className="about-values"><span><b>5+ anos</b><small>Em tráfego pago</small></span><span><b>Meta + Google</b><small>Gestão de campanhas</small></span><span><b>WhatsApp</b><small>Funis e conversas</small></span></div>
              <button
                type="button"
                className="about-toggle"
                aria-expanded={aboutExpanded}
                aria-controls="about-details"
                onClick={() => setAboutExpanded((current) => !current)}
              >
                {aboutExpanded ? "Mostrar menos" : "Saiba mais sobre minha experiência"}<i aria-hidden="true">+</i>
              </button>
              <div id="about-details" className={aboutExpanded ? "about-disclosure is-open" : "about-disclosure"} aria-hidden={!aboutExpanded}>
                <div className="about-disclosure-inner">
                  <p>Minha experiência inclui campanhas de venda para e-commerce, geração e qualificação de oportunidades para o mercado imobiliário, negócios locais e outros segmentos. Essa visão de diferentes operações ajuda a adaptar a estratégia ao momento, à oferta e à capacidade real de atendimento de cada cliente.</p>
                  <div className="experience-track">
                    <span><i>01</i><b>Campanhas para WhatsApp</b><small>Anúncios de conversa, mensagens coerentes, qualificação, rastreamento e organização do atendimento.</small></span>
                    <span><i>02</i><b>E-commerce e vendas</b><small>Campanhas orientadas a produto, oferta, criativos, jornada de compra e leitura de desempenho.</small></span>
                    <span><i>03</i><b>Mercado imobiliário</b><small>Geração de contatos para imóveis, segmentação regional, apresentação da oferta e acompanhamento dos leads.</small></span>
                  </div>
                  <h3>Competências aplicadas aos projetos</h3>
                  <div className="competency-grid">
                    <span>Planejamento de campanhas</span><span>Meta Ads e Google Ads</span><span>Campanhas para WhatsApp</span><span>Landing pages e funis</span><span>GTM, pixels e eventos</span><span>CRM e processo comercial</span><span>Análise e otimização</span><span>Direção de criativos</span>
                  </div>
                  <a href={contact} target="_blank" rel="noreferrer" className="text-link strong-link" data-track-event="generate_lead" data-track-label="Experiência no bloco sobre">Conversar sobre meu projeto <ArrowIcon /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-grid reveal">
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
          <div className="container cta-inner reveal">
            <div><span className="section-kicker">PRÓXIMO PASSO</span><h2>Quer construir uma aquisição mais clara para o seu escritório?</h2><p>Conte seu momento. A conversa inicial serve para entender o cenário e indicar a estrutura que realmente faz sentido.</p></div>
            <a className="button button-light" href={contact} target="_blank" rel="noreferrer" data-track-event="generate_lead" data-track-label="CTA final">QUERO CONVERSAR <ArrowIcon /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand"><Brand settings={settings} /><p>Marketing, tráfego e processos de aquisição para advogados que querem crescer com direção.</p></div>
          <div><span className="footer-title">NAVEGAÇÃO</span><a href="#processo">Processo</a><a href="#servicos">Serviços</a><a href="#planos">Planos</a><a href="#sobre">Sobre</a><Link href="/blog/">Blog</Link></div>
          <div><span className="footer-title">CANAIS</span><a href={`mailto:${settings.email}`} data-track-event="generate_lead" data-track-label="E-mail do rodapé">{settings.email}</a><a href={settings.instagram} target="_blank" rel="noreferrer" data-track-event="outbound_click" data-track-label="Instagram">Instagram</a><a href={settings.youtube} target="_blank" rel="noreferrer" data-track-event="outbound_click" data-track-label="YouTube">YouTube</a></div>
          <div><span className="footer-title">INFORMAÇÕES</span><a href="/privacidade">Política de Privacidade</a><a href="/termos">Termos de Uso</a><CookieSettingsButton /></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 {settings.brandName}. Todos os direitos reservados.</span><span>Desenvolvido com estratégia e propósito.</span></div>
      </footer>
    </div>
  );
}
