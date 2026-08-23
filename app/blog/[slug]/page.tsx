/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArrow, BlogFooter, BlogHeader } from "../blog-components";
import { blogPosts, getBlogPost } from "../blog-data";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const url = `https://wakilongestor.com.br/blog/${post.slug}/`;
  const image = `https://wakilongestor.com.br${post.image}`;

  return {
    title: `${post.title} | Wakilon Gestor`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [{ url: image, width: 640, height: 640, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const url = `https://wakilongestor.com.br/blog/${post.slug}/`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: url,
        headline: post.title,
        description: post.description,
        image: `https://wakilongestor.com.br${post.image}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        inLanguage: "pt-BR",
        author: { "@type": "Person", name: "Wakilon Ferreira" },
        publisher: { "@id": "https://wakilongestor.com.br/#organization" },
        keywords: post.keywords.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: "https://wakilongestor.com.br/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://wakilongestor.com.br/blog/" },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="blog-shell">
      <BlogHeader />
      <main>
        <article className="article-page">
          <header className="article-hero">
            <div className="container article-hero-grid">
              <div>
                <nav className="article-breadcrumb" aria-label="Navegação estrutural"><Link href="/">Início</Link><span>›</span><Link href="/blog/">Blog</Link><span>›</span><b>{post.category}</b></nav>
                <span className="section-kicker">{post.category.toUpperCase()}</span>
                <h1>{post.title}</h1>
                <p>{post.description}</p>
                <div className="article-meta"><span>{post.readTime}</span><span>Atualizado em 23 de agosto de 2026</span></div>
              </div>
              <div className="article-hero-visual">
                <span>{String(blogPosts.findIndex((item) => item.slug === post.slug) + 1).padStart(2, "0")}</span>
                <img src={post.image} alt={post.imageAlt} width="640" height="640" />
              </div>
            </div>
          </header>

          <div className="container article-layout">
            <aside className="article-aside">
              <span>NESTE CONTEÚDO</span>
              {post.sections.map((section, index) => <a href={`#secao-${index + 1}`} key={section.heading}><b>{String(index + 1).padStart(2, "0")}</b>{section.heading}</a>)}
              <a href="#resumo"><b>✓</b>Resumo prático</a>
            </aside>

            <div className="article-body">
              <p className="article-lead">{post.introduction}</p>
              {post.sections.map((section, index) => (
                <section id={`secao-${index + 1}`} key={section.heading}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}><i>✓</i>{bullet}</li>)}</ul>}
                </section>
              ))}

              <aside id="resumo" className="article-takeaway">
                <span>RESUMO PRÁTICO</span>
                <h2>O ponto principal</h2>
                <p>{post.takeaway}</p>
              </aside>

              {post.sources && (
                <section className="article-sources">
                  <span>FONTES</span>
                  <h2>Referências oficiais consultadas</h2>
                  <ul>{post.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} <BlogArrow /></a></li>)}</ul>
                </section>
              )}

              <p className="article-disclaimer">Conteúdo informativo e geral. Não substitui análise jurídica, ética, regulatória ou técnica aplicada ao caso concreto.</p>

              <div className="article-cta">
                <div><span>PRECISA DE DIREÇÃO?</span><h2>Organize marketing, funil e atendimento em uma estratégia conectada.</h2></div>
                <a href="https://wa.me/5568999167371?text=Ol%C3%A1%2C%20Wakilon%21%20Vi%20o%20site%20e%20%C3%A9%20realmente%20isso%20que%20estou%20procurando." target="_blank" rel="noreferrer" className="button button-primary" data-track-event="generate_lead" data-track-label={`CTA do artigo: ${post.title}`}>Conversar no WhatsApp <BlogArrow /></a>
              </div>
            </div>
          </div>
        </article>

        <section className="related-posts">
          <div className="container">
            <div className="related-head"><span className="section-kicker">CONTINUE EXPLORANDO</span><h2>Conteúdos relacionados</h2></div>
            <div className="related-grid">
              {related.map((item) => (
                <a href={`/blog/${item.slug}/`} key={item.slug} data-track-event="select_content" data-track-label={`Artigo relacionado: ${item.title}`}>
                  <img src={item.image} alt="" width="240" height="240" loading="lazy" />
                  <span><small>{item.category}</small><b>{item.title}</b><em>Saiba mais <BlogArrow /></em></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <BlogFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
