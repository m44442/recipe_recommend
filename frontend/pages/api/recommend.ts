import type { NextApiRequest, NextApiResponse } from 'next'

// APIハンドラ関数：食材リストを受け取り、レシピ推薦を返す
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // POSTリクエストの処理
  if (req.method === 'POST') {
    try {
      // リクエストボディから食材リストを取得
      const { ingredients } = req.body

      // バックエンドサーバーにリクエストを送信
      const backendResponse = await fetch('http://backend:5002/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      })

      // バックエンドサーバーからのレスポンスを確認
      if (!backendResponse.ok) throw new Error('Backend server error')

      // レスポンスデータをJSONとしてパース
      const data = await backendResponse.json()

      // クライアントに成功レスポンスを返す
      res.status(200).json(data)
    } catch (error) {
      // エラー発生時は500 Internal Server Errorを返す
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    // POST以外のメソッドは許可しない
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
