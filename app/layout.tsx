import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import ErrorBoundaryWrapper from "@/components/ErrorBoundaryWrapper";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://party-up.be"),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "nl_BE",
    type: "website",
  },
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

