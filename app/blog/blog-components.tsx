import Link from "next/link";

export function BlogBrand() {
  return (
    <span className="brand-wordmark" aria-label="Wakilon Gestor">
      <span className="brand-mark">W</span>
      <span>WAKILON GESTOR</span>
    </span>
  );
}

export function BlogArrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BlogHeader() {
  return (
    <header className="blog-header">
      <Link href="/" className="brand-link" aria-label="Voltar para a página inicial"><BlogBrand /></Link>
      <nav aria-label="Navegação do Blog">
        <Link href="/">Início</Link>
        <Link href="/blog/" aria-current="page">Blog</Link>
        <Link href="/#servicos">Serviços</Link>
        <a href="https://wa.me/5568999167371?text=Ol%C3%A1%2C%20Wakilon%21%20Vi%20o%20site%20e%20%C3%A9%20realmente%20isso%20que%20estou%20procurando." target="_blank" rel="noreferrer" className="blog-header-cta" data-track-event="generate_lead" data-track-label="Cabeçalho do Blog">Conversar</a>
      </nav>
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="blog-footer">
      <div className="container blog-footer-grid">
        <div><BlogBrand /><p>Conteúdo sobre gestão, marketing e aquisição responsável para escritórios de advocacia.</p></div>
        <div><b>NAVEGAÇÃO</b><Link href="/">Página inicial</Link><Link href="/blog/">Todos os artigos</Link><Link href="/#planos">Planos</Link></div>
        <div><b>INFORMAÇÕES</b><a href="/privacidade/">Privacidade</a><a href="/termos/">Termos de uso</a><a href="/painel/" rel="nofollow">Painel de edição</a></div>
      </div>
      <div className="container blog-footer-bottom">© 2026 Wakilon Gestor. Conteúdo informativo, sem promessa de resultado.</div>
    </footer>
  );
}
