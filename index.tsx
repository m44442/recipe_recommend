import { useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'


export default function Home() {
  // 状態管理
  const [ingredients, setIngredients] = useState<string[]>([])
  const [currentIngredient, setCurrentIngredient] = useState('')
  const [recipe, setRecipe] = useState('')
  const [drink, setDrink] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // 食材追加関数
  const addIngredient = () => {
    if (currentIngredient.trim()) {
      setIngredients([...ingredients, currentIngredient.trim()])
      setCurrentIngredient('')
    }
  }

  // 食材削除関数
  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  // レコメンデーション取得関数
  const getRecommendation = async () => {
    if (ingredients.length === 0) {
      setError('少なくとも1つの食材を入力してください。')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      // ここでエンドポイントを '/api/recommend' に修正
      const response = await axios.post('/api/recommend', { ingredients })
      setRecipe(response.data.recipe)
      setDrink(response.data.drink)
    } catch (err) {
      console.error('Error fetching recommendation:', err)
      
      // エラーメッセージをより詳細に
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // サーバーからのレスポンスがある場合
          console.error('Response data:', err.response.data)
          console.error('Response status:', err.response.status)
          setError(`エラー (${err.response.status}): ${err.response.data.error || '不明なエラー'}`)
        } else if (err.request) {
          // リクエストは送信されたがレスポンスがない場合
          console.error('No response received:', err.request)
          setError('サーバーからの応答がありません。ネットワーク接続を確認してください。')
        } else {
          // リクエストの設定中にエラーが発生した場合
          console.error('Error setting up the request:', err.message)
          setError('リクエストの設定中にエラーが発生しました。')
        }
      } else {
        // 非Axiosエラーの場合
        setError('推薦の取得中に予期せぬエラーが発生しました。もう一度お試しください。')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>グルメアシスタント</h1>
      
      {/* 食材入力フォーム */}
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
          placeholder="食材を入力"
          className={styles.input}
        />
        <button onClick={addIngredient} className={styles.button}>追加</button>
      </div>
      
      {/* 食材リスト */}
      <ul className={styles.ingredientsList}>
        {ingredients.map((ingredient, index) => (
          <li key={index} className={styles.ingredientItem}>
            {ingredient}
            <button onClick={() => removeIngredient(index)} className={styles.removeButton}>×</button>
          </li>
        ))}
      </ul>
      
      {/* レコメンデーション取得ボタン */}
      <button
        onClick={getRecommendation}
        disabled={isLoading}
        className={`${styles.button} ${styles.recommendButton}`}
      >
        {isLoading ? '取得中...' : 'おすすめを取得'}
      </button>
      
      {/* エラーメッセージ表示 */}
      {error && <p className={styles.error}>{error}</p>}
      
      {/* レコメンデーション結果表示 */}
      <div className={styles.recommendationResult}>
        <h2 className={styles.subtitle}>レシピ</h2>
        <p className={styles.content}>{recipe}</p>
        <h2 className={styles.subtitle}>おすすめのドリンク</h2>
        <p className={styles.content}>{drink}</p>
      </div>
    </div>
  )
}