// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta name="charset" content="utf-8" key="charset" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" key="viewport" />
          <meta
            name="description"
            content="Xavier Deroeux - Full Stack Web Developer - JS/React/Node/Express/MongoDB"
            key="description"
          />
          <link rel="apple-touch-icon" sizes="57x57" href="/static/images/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/static/images/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/static/images/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/static/images/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/static/images/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/static/images/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/static/images/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/static/images/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/images/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/static/images/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/static/images/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicon-16x16.png" />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/static/images/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="msapplication-config" content="/static/browserconfig.xml" />
          <meta httpEquiv="Content-Security-Policy" content="font-src 'self' https://fonts.gstatic.com;" />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <body className="js-loading">
          <Main />
          <NextScript />
          <script src="/static/js/recaptchaOptions.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
