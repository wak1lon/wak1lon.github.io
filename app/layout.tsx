import type { Metadata, Viewport } from "next";
import CookieConsent from "./cookie-consent";
import TrackingRuntime from "./tracking-runtime";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wakilongestor.com.br"),
  title: "Gestão de Tráfego para Advogados | Wakilon Gestor",
  description: "Gestão de Meta Ads e Google Ads, campanhas para WhatsApp, landing pages, funil de qualificação e rastreamento para advogados em todo o Brasil.",
  applicationName: "Wakilon Gestor",
  keywords: [
    "marketing para advogados",
    "marketing jurídico",
    "tráfego pago para advogados",
    "gestor de tráfego jurídico",
    "marketing para advogados previdenciaristas",
    "funil de captação para advogados",
    "campanhas de WhatsApp para advogados",
    "landing page para advocacia",
    "Wakilon Gestor",
  ],
  authors: [{ name: "Wakilon Ferreira", url: "https://wakilongestor.com.br" }],
  creator: "Wakilon Gestor",
  publisher: "Wakilon Gestor",
  alternates: { canonical: "https://wakilongestor.com.br/" },
  category: "Marketing Digital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://wakilongestor.com.br/",
    siteName: "Wakilon Gestor",
    title: "Gestão de Tráfego para Advogados | Wakilon Gestor",
    description: "Meta Ads, Google Ads, campanhas para WhatsApp, landing pages, funil e rastreamento para advogados.",
    images: [{ url: "/og-share.jpg", width: 1200, height: 630, alt: "Wakilon Gestor — Marketing para Advogados" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gestão de Tráfego para Advogados | Wakilon Gestor",
    description: "Meta Ads, Google Ads, campanhas para WhatsApp, landing pages, funil e rastreamento.",
    images: ["/og-share.jpg"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#020918",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": "https://wakilongestor.com.br/#organization",
        name: "Wakilon Gestor",
        legalName: "Wakilon Gestor",
        url: "https://wakilongestor.com.br/",
        logo: "https://wakilongestor.com.br/favicon.svg",
        image: "https://wakilongestor.com.br/og.png",
        description: "Gestão de tráfego, campanhas para WhatsApp, landing pages, funis e rastreamento de dados para advogados.",
        telephone: "+55 68 99916-7371",
        email: "contato@wakilongestor.com.br",
        priceRange: "R$ 800 a R$ 1.500 por mês",
        founder: { "@id": "https://wakilongestor.com.br/#wakilon-ferreira" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Rio Branco",
          addressRegion: "AC",
          addressCountry: "BR",
        },
        areaServed: [
          { "@type": "Country", name: "Brasil" },
          { "@type": "AdministrativeArea", name: "Acre" },
        ],
        sameAs: [
          "https://instagram.com/wakilongestor",
          "https://youtube.com/@wakilongestor",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+55 68 99916-7371",
          contactType: "sales",
          areaServed: "BR",
          availableLanguage: "Portuguese",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Planos de marketing para advogados",
          itemListElement: [
            { "@type": "Offer", price: "800", priceCurrency: "BRL", itemOffered: { "@type": "Service", name: "Plano Básico de Marketing Jurídico" } },
            { "@type": "Offer", price: "1200", priceCurrency: "BRL", itemOffered: { "@type": "Service", name: "Plano Essencial de Marketing Jurídico" } },
            { "@type": "Offer", price: "1500", priceCurrency: "BRL", itemOffered: { "@type": "Service", name: "Plano Completo de Marketing Jurídico" } },
          ],
        },
      },
      {
        "@type": "Person",
        "@id": "https://wakilongestor.com.br/#wakilon-ferreira",
        name: "Wakilon Ferreira",
        jobTitle: "Gestor de Tráfego e Estrategista de Marketing",
        description: "Profissional de marketing com mais de cinco anos de experiência em tráfego pago e campanhas de vendas.",
        worksFor: { "@id": "https://wakilongestor.com.br/#organization" },
        knowsAbout: [
          "Meta Ads",
          "Google Ads",
          "Campanhas para WhatsApp",
          "Landing pages",
          "Funis de qualificação",
          "Rastreamento de conversões",
          "Marketing para e-commerce",
          "Marketing imobiliário",
          "CRM e processo comercial",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://wakilongestor.com.br/#website",
        url: "https://wakilongestor.com.br/",
        name: "Wakilon Gestor",
        description: "Marketing para advogados previdenciaristas.",
        inLanguage: "pt-BR",
        publisher: { "@id": "https://wakilongestor.com.br/#organization" },
      },
      {
        "@type": "WebPage",
        "@id": "https://wakilongestor.com.br/#webpage",
        url: "https://wakilongestor.com.br/",
        name: "Gestão de Tráfego para Advogados | Wakilon Gestor",
        description: "Gestão de tráfego, campanhas para WhatsApp, funil, landing pages e rastreamento para advogados.",
        isPartOf: { "@id": "https://wakilongestor.com.br/#website" },
        about: { "@id": "https://wakilongestor.com.br/#organization" },
        inLanguage: "pt-BR",
      },
    ],
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <TrackingRuntime />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
