import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    const enableTesting = false;

    return (
      <Html>
        <Head>
          {enableTesting && (
            <script
              src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              defer
            ></script>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
