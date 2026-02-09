import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        <ErrorBoundaryWrapper>
          <CartProvider>
            <Header />
            <main className="min-h-screen pt-[104px]">{children}</main>
            <Footer />
          </CartProvider>
        </ErrorBoundaryWrapper>
      </body>
    </html>
  );
}

