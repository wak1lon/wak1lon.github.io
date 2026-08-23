import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel de Edição | Wakilon Gestor",
  description: "Área administrativa de personalização do site.",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
