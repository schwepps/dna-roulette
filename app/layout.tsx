import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://dna-roulette.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8B5CF6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // Basic metadata
  title: {
    default: "DNA Roulette | Découvre ton espèce jumelle",
    template: "%s | DNA Roulette",
  },
  description: "Fais tourner la roue et découvre avec quelle espèce tu partages le plus d'ADN ! Un jeu fun et éducatif sur la génétique. 🧬",

  // Keywords and categorization
  keywords: [
    "ADN",
    "génétique",
    "jeu éducatif",
    "espèces",
    "science",
    "biologie",
    "DNA",
    "genetics",
    "quiz",
    "fun facts",
    "partage ADN",
    "évolution",
  ],

  // Application info
  applicationName: "DNA Roulette",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  // Authors and creator
  authors: [{ name: "DNA Roulette Team" }],
  creator: "DNA Roulette",
  publisher: "DNA Roulette",

  // Canonical and alternate URLs
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
    },
  },

  // Category for app stores and directories
  category: "education",

  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons configuration
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "DNA Roulette",
    title: "DNA Roulette | Découvre ton espèce jumelle 🧬",
    description: "Je viens de découvrir que je suis 98.7% banane ! Fais tourner la DNA Roulette pour trouver ton match génétique.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DNA Roulette - Découvre avec quelle espèce tu partages ton ADN",
        type: "image/png",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "DNA Roulette | Découvre ton espèce jumelle 🧬",
    description: "Je viens de découvrir que je suis 98.7% banane ! Fais tourner la DNA Roulette pour trouver ton match génétique.",
    images: ["/og-image.png"],
    creator: "@dna_roulette",
  },

  // Disable automatic format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // App links for mobile
  appleWebApp: {
    capable: true,
    title: "DNA Roulette",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
