import Document, { Html, Head, Main, NextScript } from 'next/document'

// カスタムDocumentコンポーネント：アプリケーション全体のHTML構造をカスタマイズ
class MyDocument extends Document {
  render() {
    return (
      // HTML言語属性を日本語に設定
      <Html lang="ja">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <body>
          {/* Mainコンポーネント：ページコンテンツがここに挿入される */}
          <Main />
          {/* NextScriptコンポーネント：Next.jsが必要とするスクリプトを挿入 */}
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
