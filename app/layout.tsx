import type { Metadata, Viewport } from "next";
import AdBanner from "@/components/ads/AdBanner";
import PWARegister from "@/components/pwa/PWARegister";
import { seoDescription, seoKeywords, siteName, siteUrl } from "@/app/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "CryptoMind AI - Live AI Crypto News, Sentiment & Airdrops",
    template: `%s | ${siteName}`,
  },
  description: seoDescription,
  keywords: seoKeywords,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "finance",
  alternates: {
    canonical: "/",
    languages: {
      en: "/?lang=en",
      ur: "/?lang=ur",
      hi: "/?lang=hi",
      ar: "/?lang=ar",
      es: "/?lang=es",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "CryptoMind AI - Worldwide AI Crypto Intelligence",
    description: seoDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CryptoMind AI live crypto intelligence dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoMind AI - Live AI Crypto Trends",
    description: seoDescription,
    images: ["/opengraph-image"],
  },
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
  verification: {
    google: "9vxYNOP4n1_ha4rRJUMYBsTWhPLYc95W0uLN-Dq6ME8",
  },
};

export const viewport: Viewport = {
  themeColor: "#34d399",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";
  const adsenseSlotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "";
  const cryptoAdsZoneId = process.env.NEXT_PUBLIC_CRYPTO_ADS_ZONE_ID || "";
  const cryptoAdsEmbedHtml = process.env.NEXT_PUBLIC_CRYPTO_ADS_EMBED_HTML || "";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteName,
    url: siteUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: seoDescription,
    inLanguage: ["en", "ur", "hi", "ar", "es"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "AI crypto news analysis",
      "Live market sentiment",
      "Bitcoin and altcoin price cards",
      "Crypto airdrop tracker",
      "Automated article publishing",
      "Worldwide crypto trend monitoring",
    ],
  };

  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <PWARegister />
        {children}
        <div className="bg-[#070907] px-5 pb-10 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <AdBanner
              adsenseClientId={adsenseClientId}
              adsenseSlotId={adsenseSlotId}
              cryptoAdsZoneId={cryptoAdsZoneId}
              cryptoAdsEmbedHtml={cryptoAdsEmbedHtml}
            />
          </div>
        </div>
      </body>
    </html>
  );
}
