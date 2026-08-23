import Link from "next/link";

type LegalSection = { title: string; content: React.ReactNode };

export default function LegalPage({ kicker, title, intro, sections }: { kicker: string; title: string; intro: string; sections: LegalSection[] }) {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <Link href="/" className="brand-wordmark"><span className="brand-mark">W</span><span>WAKILON GESTOR</span></Link>
        <Link href="/" className="legal-back">← Voltar ao site</Link>
      </header>
      <section className="legal-hero">
        <div className="legal-wrap"><span className="section-kicker">{kicker}</span><h1>{title}</h1><p>{intro}</p><small>Última atualização: 23 de agosto de 2026</small></div>
      </section>
      <article className="legal-wrap legal-content">
        {sections.map((section, index) => <section key={section.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{section.title}</h2>{section.content}</div></section>)}
        <div className="legal-contact"><b>Dúvidas ou solicitações?</b><p>Entre em contato pelo e-mail <a href="mailto:contato@wakilongestor.com.br">contato@wakilongestor.com.br</a>.</p></div>
      </article>
      <footer className="legal-footer"><div className="legal-wrap"><span>© 2026 Wakilon Gestor</span><div><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos de Uso</Link></div></div></footer>
    </main>
  );
}
