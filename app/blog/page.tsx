/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import { BlogArrow, BlogFooter, BlogHeader } from "./blog-components";
import { blogPosts } from "./blog-data";

export const metadata: Metadata = {
  title: "Blog de Gestão e Marketing Jurídico | Wakilon Gestor",
  description: "Conteúdos práticos sobre gestão de escritório de advocacia, CRM jurídico, marketing jurídico, presença local e rastreamento de dados.",
  keywords: ["gestão de escritório de advocacia", "CRM jurídico", "marketing jurídico", "SEO para advogados", "Google Meu Negócio para advogados"],
  alternates: { canonical: "https://wakilongestor.com.br/blog/" },
  openGraph: {
    type: "website",
    url: "https://wakilongestor.com.br/blog/",
    title: "Blog de Gestão e Marketing Jurídico | Wakilon Gestor",
    description: "Orientações práticas para organizar gestão, aquisição, atendimento e presença digital de escritórios.",
    images: [{ url: "https://wakilongestor.com.br/og.png", width: 1200, height: 630, alt: "Blog Wakilon Gestor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Gestão e Marketing Jurídico | Wakilon Gestor",
    description: "Gestão, marketing e dados para escritórios de advocacia.",
    images: ["https://wakilongestor.com.br/og.png"],
  },
};

export default function BlogPage() {
  const [featured, ...posts] = blogPosts;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://wakilongestor.com.br/blog/#blog",
    url: "https://wakilongestor.com.br/blog/",
    name: "Blog Wakilon Gestor",
    description: metadata.description,
    inLanguage: "pt-BR",
    publisher: { "@id": "https://wakilongestor.com.br/#organization" },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://wakilongestor.com.br/blog/${post.slug}/`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
    })),
  };

  return (
    <div className="blog-shell">
      <BlogHeader />
      <main>
        <section className="blog-hero">
          <div className="container blog-hero-grid">
            <div>
              <span className="section-kicker">CENTRAL DE CONTEÚDO</span>
              <h1>Gestão e marketing jurídico com mais clareza.</h1>
              <p>Conteúdos objetivos para organizar aquisição, atendimento, presença digital e decisões no escritório — sem fórmulas mágicas.</p>
            </div>
            <div className="blog-hero-panel" aria-label="Temas do Blog">
              <span><b>01</b> Gestão do escritório</span>
              <span><b>02</b> Marketing jurídico</span>
              <span><b>03</b> CRM e atendimento</span>
              <span><b>04</b> Dados e presença local</span>
            </div>
          </div>
        </section>

        <section className="blog-content-section">
          <div className="container">
            <div className="blog-intro-row">
              <div><span className="section-kicker">LEITURA RECOMENDADA</span><h2>Soluções práticas para buscas reais do advogado.</h2></div>
              <p>Comece pelo tema que mais se aproxima do momento atual do seu escritório.</p>
            </div>

            <article className="featured-post">
              <div className="featured-post-visual">
                <span>01</span>
                <img src={featured.image} alt={featured.imageAlt} width="640" height="640" />
              </div>
              <div className="featured-post-copy">
                <span>{featured.category} • {featured.readTime}</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <a href={`/blog/${featured.slug}/`} className="button button-primary" data-track-event="select_content" data-track-label={`Artigo: ${featured.title}`}>Ler conteúdo <BlogArrow /></a>
              </div>
            </article>

            <div className="blog-grid">
              {posts.map((post, index) => (
                <article className={`blog-card blog-card-${index % 3}`} key={post.slug}>
                  <a href={`/blog/${post.slug}/`} className="blog-card-visual" aria-label={`Ler: ${post.title}`} data-track-event="select_content" data-track-label={`Artigo: ${post.title}`}>
                    <span>{String(index + 2).padStart(2, "0")}</span>
                    <img src={post.image} alt={post.imageAlt} width="420" height="420" loading="lazy" />
                  </a>
                  <div>
                    <small>{post.category} • {post.readTime}</small>
                    <h2><a href={`/blog/${post.slug}/`}>{post.title}</a></h2>
                    <p>{post.excerpt}</p>
                    <a href={`/blog/${post.slug}/`} className="blog-read-more" data-track-event="select_content" data-track-label={`Artigo: ${post.title}`}>Saiba mais <BlogArrow /></a>
                  </div>
                </article>
              ))}
            </div>

            <aside className="blog-principle">
              <div><span>BASE EDITORIAL</span><h2>Conteúdo útil antes de palavras-chave repetidas.</h2></div>
              <p>A estrutura segue boas práticas do Google: páginas organizadas para pessoas, títulos claros, navegação compreensível e conteúdo alinhado à intenção da busca.</p>
              <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" target="_blank" rel="noreferrer">Consultar o guia oficial do Google <BlogArrow /></a>
            </aside>
          </div>
        </section>
      </main>
      <BlogFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
