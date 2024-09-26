import { useState } from 'react'
import styles from '../styles/Home.module.css'

// RecipeFormProps型定義：onSubmit関数を受け取るプロップスの型
type RecipeFormProps = {
  onSubmit: (ingredients: string[]) => void
}

// RecipeFormコンポーネント：食材入力フォームを提供
export default function RecipeForm({ onSubmit }: RecipeFormProps) {
  // 状態管理：入力された食材リストと現在入力中の食材
  const [ingredients, setIngredients] = useState<string[]>([])
  const [currentIngredient, setCurrentIngredient] = useState('')

  // 食材追加関数：現在の入力を食材リストに追加
  const addIngredient = () => {
    if (currentIngredient.trim()) {
      setIngredients([...ingredients, currentIngredient.trim()])
      setCurrentIngredient('')
    }
  }

  // フォーム送信ハンドラ：食材リストを親コンポーネントに渡す
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ingredients.length > 0) {
      onSubmit(ingredients)
    } else {
      alert('食材を入力してください')
    }
  }

  // UIレンダリング
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        {/* 食材入力フィールド */}
        <input
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          placeholder="食材を入力（例：鮭、大根、味噌）"
          className={styles.input}
        />
        {/* 食材追加ボタン */}
        <button type="button" onClick={addIngredient} className={styles.button}>
          追加
        </button>
      </div>
      {/* 追加された食材リスト */}
      <ul className={styles.ingredientList}>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      {/* 送信ボタン */}
      <button type="submit" className={styles.submitButton}>
        おすすめを取得
      </button>
    </form>
  )
}