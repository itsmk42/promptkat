import './globals.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Providers from "@/providers/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "promptKat - Discover & Share AI Prompts",
    template: `%s | promptKat`,
  },
  description: "Explore, share, and discover high-quality AI prompts for various models. Unleash your creativity and boost productivity with promptKat, your central hub for the best AI prompts.",
  keywords: ["AI prompts", "prompt engineering", "GPT prompts", "AI tools", "creative writing prompts", "marketing prompts", "programming prompts"],
  authors: [{ name: "promptKat_Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://promptkat.com",
    title: "promptKat - Discover & Share AI Prompts",
    description: "Your central hub for high-quality, community-driven AI prompts.",
    siteName: "promptKat",
  },
  twitter: {
    card: "summary_large_image",
    title: "promptKat - Discover & Share AI Prompts",
    description: "Explore and share the best AI prompts on promptKat.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/promptkat-logo.svg" />
      </head>
      <body className="bg-black text-white flex flex-col min-h-screen antialiased selection:bg-purple-500 selection:text-white font-mono">
        <Providers>
          <div className="bg-gradient-to-b from-purple-900/20 to-transparent min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
