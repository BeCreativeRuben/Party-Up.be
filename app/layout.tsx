import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import ErrorBoundaryWrapper from "@/components/ErrorBoundaryWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Party-Up.be - No Nonsense Feestverhuur",
  description: "Verhuur van feest- en evenementmateriaal voor privé- en kleine professionele evenementen in België. Geen opslag, geen onderhoud, betrouwbare service.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-NESVHS9C11';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <link rel="preload" href="/hero-video.mp4" as="video" type="video/mp4" />
      </head>
      <body className={inter.className}>
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <ErrorBoundaryWrapper>
          <CartProvider>
            <Header />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
          </CartProvider>
        </ErrorBoundaryWrapper>
      </body>
    </html>
  );
}

