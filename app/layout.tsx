import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import ErrorBoundaryWrapper from "@/components/ErrorBoundaryWrapper";
import CookieConsent from "@/components/consent/CookieConsent";
import JsonLd from "@/components/seo/JsonLd";
import { localBusinessJsonLd } from "@/lib/structured-data";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
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
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Feesttenten van Party-Up.be" }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'denied',
              personalization_storage: 'denied',
              security_storage: 'granted',
              wait_for_update: 500
            });
            gtag('set', 'ads_data_redaction', true);
            gtag('set', 'url_passthrough', true);
          `}
        </Script>
        <a
          href="#inhoud"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:text-blue-700 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
        >
          Ga naar inhoud
        </a>
        <JsonLd data={localBusinessJsonLd()} />
        <ErrorBoundaryWrapper>
          <CartProvider>
            <Header />
            <main id="inhoud" className="min-h-screen pt-16">{children}</main>
            <Footer />
            <CookieConsent />
          </CartProvider>
        </ErrorBoundaryWrapper>
      </body>
    </html>
  );
}

