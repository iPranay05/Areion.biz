import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "/assets/css/styles.css";
import "/assets/css/section-fixes.css";
import "/assets/css/chatbot.css";
import "/assets/css/genai-features.css";
import "/assets/css/ai-assistant.css";
import "/assets/css/chatbot-page.css";
// External CSS will still need to be loaded via link tags

export const metadata: Metadata = {
  title: "Areion | Business Development & Digital Marketing Solutions",
  description: "Areion helps businesses grow with expert digital marketing, content creation, ecommerce support, SEO optimization, and business automation services.",
  keywords: "business development, digital marketing, content creation, SEO optimization, ecommerce support, business automation, realtime support",
  authors: [{ name: "Areion" }],
  openGraph: {
    title: "Areion | Business Development & Digital Marketing Solutions",
    description: "Transform your business with our expert digital marketing, content creation, and business automation services.",
    url: "https://areion.biz",
    siteName: "Areion",
    images: [
      {
        url: "/assets/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Areion - Business Development Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Areion | Business Development & Digital Marketing Solutions",
    description: "Transform your business with our expert digital marketing, content creation, and business automation services.",
    images: ["/assets/img/twitter-image.jpg"],
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
  verification: {
    google: "verification_token",
  },
  alternates: {
    canonical: "https://areion.biz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* External CSS resources */}
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/css/fontawesome.min.css" />
        <link href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="/assets/img/Favicon.png" />
      </head>
      <body>
        {children}
        <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" />
        <Script id="aos-init">
          {`
            AOS.init({
              duration: 1000,
              easing: 'ease-in-out',
              once: true,
              mirror: false
            });
          `}
        </Script>
      </body>
    </html>
  );
}
