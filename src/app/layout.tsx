import type { Metadata } from "next";
import { Noto_Sans_Devanagari, Inter, Public_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import SmartHeader from "@/components/SmartHeader";
import SmartFooter from "@/components/SmartFooter";
// import Maintenance from "./Maintainance";
import { PageStateProvider } from "@/context/PageStateContext";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { DesignSystemProvider } from "@/lib/design-system/DesignSystemProvider";
import { brandConfig } from "@/config/brand";

// Noto Sans Devanagari for Editorial design system
const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["devanagari", "latin"],
  display: "swap",
  preload: true,
  variable: "--font-noto-sans-devanagari",
});

// Inter for Baby Bloom headings
const inter = Inter({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

// Public Sans for Baby Bloom body text
const publicSans = Public_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: brandConfig.seo.title,
  description: brandConfig.seo.description,
  keywords: brandConfig.seo.keywords,
  icons: [
    {
      rel: "apple-touch-icon",
      url: brandConfig.assets.appleTouchIcon,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: brandConfig.assets.favicon,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: brandConfig.assets.favicon,
    },
    {
      rel: "icon",
      url: brandConfig.assets.faviconIco,
    },
  ],
  openGraph: {
    title: brandConfig.seo.title,
    description: brandConfig.seo.description,
    siteName: brandConfig.seo.siteName,
    type: brandConfig.seo.type as "website",
    locale: brandConfig.seo.locale,
    images: [
      {
        url: brandConfig.assets.ogImage,
      },
    ],
  },
  twitter: {
    card: brandConfig.seo.twitterCard as "summary_large_image" | "summary",
    title: brandConfig.seo.title,
    description: brandConfig.seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link
          rel='preconnect'
          href='https://d38c45qguy2pwg.cloudfront.net'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://res.cloudinary.com'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://prior-image.s3.eu-north-1.amazonaws.com'
          crossOrigin='anonymous'
        />

        {/* <link rel='dns-prefetch' href='https://cdn.socket.io' />

        <link rel='dns-prefetch' href='https://yuki.priorbd.com' />
        <link rel='dns-prefetch' href='https://app.priorbd.com' /> */}
        <link rel='dns-prefetch' href='https://www.googletagmanager.com' />

        {/* Google Tag Manager - changed to lazyOnload for better initial performance */}
        <Script
          id='google-tag-manager'
          strategy='lazyOnload'
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${brandConfig.services.gtmId}');
            `,
          }}
        />

        {/* Chat Widget Scripts - Load after page is interactive */}
        {/* <Script
          src='https://cdn.socket.io/4.7.2/socket.io.min.js'
          strategy='lazyOnload'
        />

        <Script
          src='https://app.priorbd.com/widget/yuki-widget.js'
          data-socket-url='https://yuki.priorbd.com'
          data-position='bottom-right'
          strategy='lazyOnload'
        /> */}
      </head>
      <body className={`${notoSansDevanagari.variable} ${inter.variable} ${publicSans.variable}`}>
        {/* Google Tag Manager - noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${brandConfig.services.gtmId}`}
            height='0'
            width='0'
            style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>
        <DesignSystemProvider>
          <PageStateProvider>
            <AuthProvider>
              <WishlistProvider>
                <CartProvider>
                  <>
                    <SmartHeader />
                    {children}
                    <SmartFooter />
                  </>
                  {/* <Maintenance /> */}
                </CartProvider>
              </WishlistProvider>
            </AuthProvider>
          </PageStateProvider>
        </DesignSystemProvider>
        <Toaster position='top-center' />
        {/* <Script
          id='myalice-chat'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var e = document.createElement("div");
                e.id = "myAliceWebChat";

                var t = document.createElement("script");
                t.type = "text/javascript";
                t.async = true;
                t.src = "https://livechat.myalice.ai/index.js";

                var a = document.body.getElementsByTagName("script");
                a = a[a.length - 1];

                a.parentNode.insertBefore(t, a);
                a.parentNode.insertBefore(e, a);

                t.addEventListener("load", function () {
                  MyAliceWebChat.init({
                    selector: "#myAliceWebChat",
                    platformId: "${process.env.NEXT_PUBLIC_MYALICE_PLATFORM_ID}",
                    primaryId: "${process.env.NEXT_PUBLIC_MYALICE_PRIMARY_ID}",
                    token: "${process.env.NEXT_PUBLIC_MYALICE_TOKEN}"
                  });
                });
              })();
            `,
          }}
        /> */}
      </body>
    </html>
  );
}
