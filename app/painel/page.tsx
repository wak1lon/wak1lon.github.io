"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Brand, defaultSettings, SETTINGS_KEY, SiteSettings } from "../site-client";

type AssetKey = "faviconData" | "logoData" | "heroImageData" | "aboutImageData" | "bannerImageData";

function resizeImage(file: File, maxWidth: number, maxHeight: number, quality = 0.82) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Não foi possível ler a imagem."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Formato de imagem inválido."));
      image.onload = () => {
        const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * ratio));
        canvas.height = Math.max(1, Math.round(image.height * ratio));
        const context = canvas.getContext("2d");
        if (!context) return reject(new Error("Seu navegador não permitiu processar a imagem."));
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const usePng = file.type === "image/png" && file.size < 700_000;
        resolve(canvas.toDataURL(usePng ? "image/png" : "image/webp", quality));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [status, setStatus] = useState("Alterações salvas somente neste navegador.");
  const [busyAsset, setBusyAsset] = useState<AssetKey | "">("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(SETTINGS_KEY);
        if (saved) setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      } catch {
        setStatus("As configurações salvas não puderam ser carregadas.");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
    setStatus("Existem alterações ainda não salvas.");
  }

  function save() {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      window.dispatchEvent(new CustomEvent("wakilon:settings-updated"));
      setStatus("Tudo salvo. Abra a página principal para conferir.");
    } catch {
      setStatus("Não foi possível salvar. Reduza o tamanho das imagens e tente novamente.");
    }
  }

  function restore() {
    setSettings(defaultSettings);
    localStorage.removeItem(SETTINGS_KEY);
    window.dispatchEvent(new CustomEvent("wakilon:settings-updated"));
    setStatus("Configurações originais restauradas.");
  }

  async function handleAsset(event: ChangeEvent<HTMLInputElement>, key: AssetKey) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setStatus("Selecione um arquivo de imagem válido.");
      return;
    }
    setBusyAsset(key);
    try {
      const dimensions = key === "faviconData"
        ? { width: 256, height: 256, quality: 0.92 }
        : key === "logoData"
          ? { width: 700, height: 400, quality: 0.9 }
          : key === "bannerImageData"
            ? { width: 1800, height: 850, quality: 0.82 }
            : { width: 1600, height: 1100, quality: 0.8 };
      const data = await resizeImage(file, dimensions.width, dimensions.height, dimensions.quality);
      update(key, data);
      setStatus("Imagem pronta. Clique em Salvar alterações.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Não foi possível processar a imagem.");
    } finally {
      setBusyAsset("");
      event.target.value = "";
    }
  }

  function exportSettings() {
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wakilon-configuracoes.json";
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Backup das configurações exportado.");
  }

  function importSettings(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(String(reader.result));
        setSettings({ ...defaultSettings, ...imported });
        setStatus("Backup importado. Clique em Salvar alterações.");
      } catch {
        setStatus("Este arquivo de configuração não é válido.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <Brand settings={settings} />
        <div>
          <a href="/" target="_blank" rel="noreferrer" className="button button-outline">Ver site</a>
          <a href="/blog/" target="_blank" rel="noreferrer" className="button button-outline">Ver Blog</a>
          <button type="button" className="button button-primary" onClick={save}>Salvar alterações</button>
        </div>
      </header>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <span className="section-kicker">PAINEL DE EDIÇÃO</span>
          <h1>Personalize sem alterar o código.</h1>
          <p>Troque identidade, imagens, contatos, valores e códigos de rastreamento. As mudanças ficam salvas neste navegador.</p>
          <nav>
            <a href="#identidade">01. Identidade</a>
            <a href="#mensagem">02. Mensagem principal</a>
            <a href="#banner-editor">03. Banner e aparência</a>
            <a href="#contatos">04. Contatos</a>
            <a href="#planos-editor">05. Valores</a>
            <a href="#integracoes">06. Integrações</a>
            <a href="#backup">07. Backup</a>
          </nav>
          <div className="admin-notice"><i />{status}</div>
        </aside>

        <div className="admin-content">
          <section id="identidade" className="admin-card">
            <div className="admin-card-head"><span>01</span><div><h2>Identidade e imagens</h2><p>Favicon, logo, fundo principal e imagem do bloco sobre.</p></div></div>
            <label className="field-label">Nome da marca<input value={settings.brandName} onChange={(event) => update("brandName", event.target.value)} /></label>
            <div className="asset-grid">
              <AssetUpload title="Favicon" hint="Ícone quadrado, preferencialmente PNG" value={settings.faviconData} busy={busyAsset === "faviconData"} onChange={(event) => handleAsset(event, "faviconData")} onRemove={() => update("faviconData", "")} />
              <AssetUpload title="Logomarca" hint="PNG ou WebP transparente" value={settings.logoData} busy={busyAsset === "logoData"} onChange={(event) => handleAsset(event, "logoData")} onRemove={() => update("logoData", "")} />
              <AssetUpload title="Fundo da abertura" hint="Imagem horizontal" value={settings.heroImageData} busy={busyAsset === "heroImageData"} onChange={(event) => handleAsset(event, "heroImageData")} onRemove={() => update("heroImageData", "")} />
              <AssetUpload title="Foto do bloco sobre" hint="Retrato ou foto profissional" value={settings.aboutImageData} busy={busyAsset === "aboutImageData"} onChange={(event) => handleAsset(event, "aboutImageData")} onRemove={() => update("aboutImageData", "")} />
            </div>
          </section>

          <section id="mensagem" className="admin-card">
            <div className="admin-card-head"><span>02</span><div><h2>Mensagem principal</h2><p>Textos que aparecem no primeiro contato com o visitante.</p></div></div>
            <label className="field-label">Linha superior<input value={settings.heroEyebrow} onChange={(event) => update("heroEyebrow", event.target.value)} maxLength={70} /></label>
            <label className="field-label">Título principal<textarea value={settings.heroTitle} onChange={(event) => update("heroTitle", event.target.value)} rows={3} maxLength={110} /></label>
            <label className="field-label">Descrição<textarea value={settings.heroSubtitle} onChange={(event) => update("heroSubtitle", event.target.value)} rows={4} maxLength={240} /></label>
          </section>

          <section id="banner-editor" className="admin-card">
            <div className="admin-card-head"><span>03</span><div><h2>Banner e aparência dos serviços</h2><p>Controle o destaque da página inicial e o estilo dos contêineres.</p></div></div>
            <label className="switch-row">
              <span><b>Exibir banner de destaque</b><small>Desative quando não quiser mostrar este bloco na página inicial.</small></span>
              <input type="checkbox" checked={settings.bannerEnabled} onChange={(event) => update("bannerEnabled", event.target.checked)} />
              <i aria-hidden="true" />
            </label>
            <div className="banner-editor-grid">
              <AssetUpload title="Imagem do banner" hint="Horizontal, até 1800 × 850 px" value={settings.bannerImageData} busy={busyAsset === "bannerImageData"} onChange={(event) => handleAsset(event, "bannerImageData")} onRemove={() => update("bannerImageData", "")} />
              <div>
                <label className="field-label">Linha superior<input value={settings.bannerEyebrow} onChange={(event) => update("bannerEyebrow", event.target.value)} maxLength={55} /></label>
                <label className="field-label">Título do banner<textarea value={settings.bannerTitle} onChange={(event) => update("bannerTitle", event.target.value)} rows={3} maxLength={105} /></label>
                <label className="field-label">Texto de apoio<textarea value={settings.bannerText} onChange={(event) => update("bannerText", event.target.value)} rows={3} maxLength={210} /></label>
              </div>
            </div>
            <div className="form-grid">
              <label className="field-label">Texto do botão<input value={settings.bannerButtonLabel} onChange={(event) => update("bannerButtonLabel", event.target.value)} maxLength={32} /></label>
              <label className="field-label">Link do botão<input value={settings.bannerButtonUrl} onChange={(event) => update("bannerButtonUrl", event.target.value)} placeholder="/blog/ ou https://..." /></label>
            </div>
            <label className="field-label">
              Cores dos contêineres de serviços
              <select value={settings.serviceStyle} onChange={(event) => update("serviceStyle", event.target.value as SiteSettings["serviceStyle"])}>
                <option value="mixed">Azul, branco e grafite alternados</option>
                <option value="blue">Todos em azul</option>
                <option value="light">Todos em branco</option>
                <option value="graphite">Todos em grafite</option>
              </select>
              <small>O modo alternado cria mais profundidade e separação visual entre os serviços.</small>
            </label>
          </section>

          <section id="contatos" className="admin-card">
            <div className="admin-card-head"><span>04</span><div><h2>Contato e redes sociais</h2><p>Os botões usam o WhatsApp quando o número estiver preenchido; caso contrário, usam o e-mail.</p></div></div>
            <div className="form-grid">
              <label className="field-label">WhatsApp com DDI<input value={settings.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} placeholder="5568999999999" inputMode="tel" /></label>
              <label className="field-label">E-mail<input value={settings.email} onChange={(event) => update("email", event.target.value)} type="email" /></label>
              <label className="field-label">Link do Instagram<input value={settings.instagram} onChange={(event) => update("instagram", event.target.value)} type="url" /></label>
              <label className="field-label">Link do YouTube<input value={settings.youtube} onChange={(event) => update("youtube", event.target.value)} type="url" /></label>
            </div>
          </section>

          <section id="planos-editor" className="admin-card">
            <div className="admin-card-head"><span>05</span><div><h2>Valores dos planos</h2><p>Edite o valor exibido; “/mês” já aparece automaticamente.</p></div></div>
            <div className="form-grid three-fields">
              <label className="field-label">Plano Básico<input value={settings.basicPrice} onChange={(event) => update("basicPrice", event.target.value)} /></label>
              <label className="field-label">Plano Essencial<input value={settings.essentialPrice} onChange={(event) => update("essentialPrice", event.target.value)} /></label>
              <label className="field-label">Plano Completo<input value={settings.completePrice} onChange={(event) => update("completePrice", event.target.value)} /></label>
            </div>
          </section>

          <section id="integracoes" className="admin-card">
            <div className="admin-card-head"><span>06</span><div><h2>Integrações e rastreamento</h2><p>Cole os códigos completos fornecidos pelas plataformas.</p></div></div>
            <div className="integration-status">
              <div><span>GA4 ATIVO</span><b>G-L8HFJW94KT</b></div>
              <p>O GA4 principal está fixo no código do site. Não cole novamente o mesmo Google tag no GTM para evitar eventos duplicados.</p>
            </div>
            <label className="field-label code-field">
              Código completo do Google Tag Manager
              <textarea
                value={settings.gtmCode}
                onChange={(event) => update("gtmCode", event.target.value)}
                rows={9}
                spellCheck={false}
                placeholder={'<!-- Google Tag Manager -->\n<script>...</script>\n<!-- End Google Tag Manager -->'}
              />
              <small>Cole o bloco inteiro do GTM, incluindo a parte &lt;script&gt; e, se houver, &lt;noscript&gt;.</small>
            </label>
            <label className="field-label code-field">
              Código completo do Meta Pixel (Facebook)
              <textarea
                value={settings.metaPixelCode}
                onChange={(event) => update("metaPixelCode", event.target.value)}
                rows={11}
                spellCheck={false}
                placeholder={'<!-- Meta Pixel Code -->\n<script>...</script>\n<noscript>...</noscript>'}
              />
              <small>Cole o snippet oficial completo, não apenas o número do Pixel.</small>
            </label>
            <div className="code-warning"><b>Segurança</b><span>Esses campos executam JavaScript nas páginas públicas. Use somente códigos oficiais copiados do GTM e do Gerenciador de Eventos da Meta.</span></div>
            <div className="event-map">
              <b>Eventos já conectados</b>
              <span><i>generate_lead</i> botões de contato e planos</span>
              <span><i>select_content</i> etapas do funil</span>
              <span><i>navigation_click</i> navegação interna</span>
              <span><i>outbound_click</i> Instagram e YouTube</span>
            </div>
          </section>

          <section id="backup" className="admin-card">
            <div className="admin-card-head"><span>07</span><div><h2>Backup e restauração</h2><p>Leve suas configurações para outro navegador ou restaure o conteúdo original.</p></div></div>
            <div className="backup-actions">
              <button type="button" className="button button-outline" onClick={exportSettings}>Exportar backup</button>
              <label className="button button-outline file-button">Importar backup<input type="file" accept="application/json" onChange={importSettings} /></label>
              <button type="button" className="button danger-button" onClick={restore}>Restaurar padrão</button>
            </div>
          </section>

          <div className="admin-savebar">
            <span>{status}</span>
            <button type="button" className="button button-primary" onClick={save}>Salvar alterações</button>
          </div>
        </div>
      </div>
    </main>
  );
}

function AssetUpload({ title, hint, value, busy, onChange, onRemove }: { title: string; hint: string; value: string; busy: boolean; onChange: (event: ChangeEvent<HTMLInputElement>) => void; onRemove: () => void }) {
  return (
    <div className="asset-upload">
      <div className="asset-preview" style={value ? { backgroundImage: `url(${value})` } : undefined}>
        {!value && <span>SEM IMAGEM</span>}
      </div>
      <div><b>{title}</b><small>{hint}</small></div>
      <label className="upload-trigger">{busy ? "Processando..." : value ? "Trocar imagem" : "Enviar imagem"}<input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml,image/x-icon" onChange={onChange} disabled={busy} /></label>
      {value && <button type="button" className="remove-asset" onClick={onRemove}>Remover</button>}
    </div>
  );
}
