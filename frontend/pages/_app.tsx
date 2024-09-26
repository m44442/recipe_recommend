import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/global.css'
// カスタムAppコンポーネント：アプリケーション全体のレイアウトとグローバル設定を管理
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Head コンポーネント：ページのメタデータを設定 */}
      <Head>
        <title>グルメアシスタント</title>
        {/* 必要に応じて、ここに他のメタタグ（description, viewport など）を追加 */}
      </Head>

      {/* アプリケーションのメインコンテナ */}
      <div id="app">
        {/* 現在のページコンポーネントをレンダリング */}
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
