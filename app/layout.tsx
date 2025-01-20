import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider";
import Header from '@/components/header';
import Footer from '@/components/footer';
import Script from 'next/script';

export const metadata: Metadata = {
    metadataBase: new URL('https://idphotographic.com/'),
    title: 'ID Photographic - Online ID Photo Maker & Passport Photo Generator',
    description: 'Create professional ID photos for passports, visas, and official documents with our free online photo maker. Get perfectly sized, compliant ID photos instantly with AI-powered tools.',
    keywords: ['ID photos', 'passport photos', 'AI photo processing', 'professional photos'],
    authors: [{ name: 'TellerLin' }], // Changed 'author' to 'authors' and provided an array
    viewport: 'width=device-width, initial-scale=1',
    robots: 'index, follow',
    openGraph: {
        title: 'ID Photo Pro - Professional ID Photos in Seconds',
        description: 'Transform your photos into professional ID pictures using advanced AI technology. Perfect for passports, licenses, and official documents.',
        url: 'https://idphotographic.com/',
        siteName: 'ID Photo Pro',
        images: [
            {
                url: 'https://idphotographic.com/og-image.png',
                width: 1200,
                height: 630,
                alt: 'ID Photo Pro',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ID Photo Pro - Professional ID Photos in Seconds',
        description: 'Transform your photos into professional ID pictures using advanced AI technology. Perfect for passports, licenses, and official documents.',
        images: ['https://idphotographic.com/twitter-image.png'],
        creator: '@TellerLin',
    },
    // 微信分享设置
    other: {
        'wechat-title': '证件照生成器 - 在线制作专业证件照',
        'wechat-description': '在线生成专业证件照，自动去除背景。上传照片，裁剪，并立即下载您的证件照。',
        'wechat-image': 'https://idphotographic.com/wechat-image.png',
        'schema': `<script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "ID Photo Pro",
          "url": "https://idphotographic.com/",
          "description": "Transform your photos into professional ID pictures using advanced AI technology. Perfect for passports, licenses, and official documents.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://idphotographic.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
        </script>`,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
<head>
  <Script
    strategy="afterInteractive"
    src="https://www.googletagmanager.com/gtag/js?id=G-JETP2SPYQK"
  />
  <Script id="google-analytics" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JETP2SPYQK');
    `}
  </Script>
</head>
            <body className="min-h-screen bg-background font-sans">
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
