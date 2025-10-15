// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

// Função para gerar URLs absolutas (boa prática para metadados)
const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const metadata: Metadata = {
  title: "Nuuvik AI",
  description: "Plataforma de criação de fluxos simplificada",
  generator: "React",
  // Adicione a propriedade 'icon' aqui 👇
  icons: {
    icon: [
      // Para navegadores modernos
      { url: "logoNuvvikai.svg", type: "image/png", sizes: "32x32" },
      {
        url: "/logoNuvvikai.svg",
        rel: "icon",
        type: "image/x-icon",
        sizes: "any",
      },
    ],
    // Ícone para dispositivos Apple (quando salvo na tela inicial)
    apple: "/logoNuvvikai.svg",
  },
  // Opcional, mas recomendado: Adicionar a URL base
  metadataBase: new URL(getBaseUrl()),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
