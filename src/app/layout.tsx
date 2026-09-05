import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vasnova-delta.vercel.app/'),
  title: {
    default: "VAS NOVA | Solar-Powered Emergency EV Charging",
    template: "%s | VAS NOVA"
  },
  description: "VAS NOVA (Vision for Advanced Sustainability) is a university technology startup developing portable, solar-powered emergency EV charging systems and renewable-energy infrastructure.",
  keywords: ["VAS NOVA", "VASNova", "Vas Nova", "solar EV charging", "emergency EV charger", "renewable energy infrastructure", "Vision for Advanced Sustainability"],
  authors: [{ name: "VAS NOVA" }],
  creator: "VAS NOVA",
  publisher: "VAS NOVA",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "VAS NOVA | Solar-Powered Emergency EV Charging",
    description: "Portable, solar-powered emergency EV charging systems by university startup VAS NOVA.",
    url: 'https://vasnova-delta.vercel.app/',
    siteName: 'VAS NOVA',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "VAS NOVA | Solar-Powered Emergency EV Charging",
    description: "Portable, solar-powered emergency EV charging systems by university startup VAS NOVA.",
    creator: '@vasnova_',
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
  icons: {
    icon: '/vas-title-logo-square.png',
    apple: '/vas-title-logo-square.png',
  },
  verification: {
    google: 'DWCBBbprtzlZc0JnQBB6N3464XCC-SPzbUpCdnSLRK8',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://vasnova-delta.vercel.app/#organization",
        "name": "VAS NOVA",
        "alternateName": ["Vision for Advanced Sustainability", "VASNova", "VAS Nova"],
        "url": "https://vasnova-delta.vercel.app/",
        "description": "University technology startup developing portable solar-powered emergency EV charging systems and renewable-energy infrastructure.",
        "sameAs": [
          "https://www.linkedin.com/company/vas-nova/",
          "https://instagram.com/vasnova_",
          "https://x.com/vasnova_"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://vasnova-delta.vercel.app/#website",
        "url": "https://vasnova-delta.vercel.app/",
        "name": "VAS NOVA",
        "description": "Solar-Powered Emergency EV Charging",
        "publisher": {
          "@id": "https://vasnova-delta.vercel.app/#organization"
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col text-foreground bg-background">{children}</body>
    </html>
  );
}
