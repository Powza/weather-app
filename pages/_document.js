import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css" />
          <style>{`#__next { height: 100vh; }`}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src={`https://kit.fontawesome.com/${process.env.FONT_AWESOME_KIT_ID}.js`} />
          <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_PLACES_KEY || ""}&libraries=places`} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
