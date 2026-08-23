import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel de Gestão | Wakilon Gestor",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function PainelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
