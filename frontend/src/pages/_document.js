import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload Fonts */}
        <link
          rel="preload"
          href="/path-to-font.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Canonical URL */}
        <link 
          rel="canonical" 
          href={`http://localhost:3000/`} 
        />

        {/* Structured Data for Dashboard */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Dashboard für Finanzinstrumente",
              description:
                "Ein Dashboard zum Erkunden von Börsen-, Metadaten- und Candle-Daten.",
              url: "http://localhost:3000",
            }),
          }}
        />

        {/* Structured Data for Exchange Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Börsen-Daten | Finanzinstrumente Dashboard",
              description:
                "Sehen Sie Börsendaten, analysieren Sie Finanzinformationen und fügen Sie neue Daten hinzu.",
              url: `https://backend-inky-one-31.vercel.app/api/exchange`,
            }),
          }}
        />

        {/* Structured Data for Metadata Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Metadaten-Daten | Finanzinstrumente Dashboard",
              description:
                "Sehen Sie Metadaten-Daten, analysieren Sie Finanzinformationen und fügen Sie neue Daten hinzu.",
              url: `https://backend-inky-one-31.vercel.app/api/metadata`,
            }),
          }}
        />

        {/* Structured Data for Candle Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Candle Data",
              description: "View and analyze candle data for financial symbols.",
              url: `https://backend-inky-one-31.vercel.app/api/candle`,
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
