import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const baseUrl = process.env.VITE_REACT_APP_BACKEND_BASEURL || ''; // Use environment variable for the base URL

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
        <link rel="canonical" href={`${baseUrl}/`} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Dashboard für Finanzinstrumente",
              description:
                "Ein Dashboard zum Erkunden von Börsen-, Metadaten- und Candle-Daten.",
              url: `${baseUrl}/`,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Börsen-Daten | Finanzinstrumente Dashboard",
              description:
                "Sehen Sie Börsendaten, analysieren Sie Finanzinformationen und fügen Sie neue Daten hinzu.",
              url: `${baseUrl}/api/exchange`,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Metadaten-Daten | Finanzinstrumente Dashboard",
              description:
                "Sehen Sie Metadaten-Daten, analysieren Sie Finanzinformationen und fügen Sie neue Daten hinzu.",
              url: `${baseUrl}/api/metadata`,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Candle Data",
              description: "View and analyze candle data for financial symbols.",
              url: `${baseUrl}/api/candle`,
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
