import type { Metadata, Viewport } from "next";
import TrackingRuntime from "./tracking-runtime";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wakilongestor.com.br"),
  title: "Wakilon Gestor | Marketing para Advogados",
  description: "Estratégia, tráfego pago, landing pages, funis e rastreamento de dados para advogados que querem crescer com direção.",
  keywords: ["marketing para advogados", "tráfego pago jurídico", "funil para advogados", "Wakilon Gestor"],
  authors: [{ name: "Wakilon Gestor" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Wakilon Gestor | Marketing para Advogados",
    description: "Tráfego, funil e dados para crescer com direção.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Wakilon Gestor — Marketing para Advogados" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wakilon Gestor | Marketing para Advogados",
    description: "Tráfego, funil e dados para crescer com direção.",
    images: ["/og.png"],
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
  return (
    <html lang="pt-BR">
      <head>
        <meta name="codex-preview" content="development" />
        {/* Google tag (gtag.js) — GA4 principal do site */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-L8HFJW94KT" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L8HFJW94KT');
            `,
          }}
        />
      </head>
      <body>
        <TrackingRuntime />
        {children}
      </body>
    </html>
  );
}
