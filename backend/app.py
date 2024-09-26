from flask import Flask, request, jsonify
import secrets
from flask_cors import CORS
import google.generativeai as genai
from config import GOOGLE_API_KEY
import sys
import traceback

# 32バイト（256ビット）のランダムな文字列を生成
secret_key = secrets.token_hex(32)
print(secret_key)

print(f"Python path: {sys.path}")
print(f"Python version: {sys.version}")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://frontend:3000"}})

# GeminiAI APIキーの設定を確認
if not GOOGLE_API_KEY:
    raise ValueError("OPENAI_API_KEY is not set in config.py")
print(f"API Key prefix: {GOOGLE_API_KEY[:5]}..., suffix: ...{GOOGLE_API_KEY[-4:]}")

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

@app.route('/api/recommend', methods=['POST'])
def recommend():
    try:
        ingredients = request.json['ingredients']
        print(f"Received ingredients: {ingredients}")

        # Geminiを使用して料理のレシピを提案
        recipe_prompt = f"""あなたは様々な料理に精通した料理人アシスタントです。
        次の食材を使った料理のレシピを提案してください: {', '.join(ingredients)}。
        レシピ名、材料、作り方を具体的に詳しく教えてください。ただし、見やすく表示してください。行程ごとに改行すること。"""
        recipe_response = model.generate_content(recipe_prompt)
        recipe = recipe_response.text
        print(f"Generated recipe: {recipe[:100]}...")  # レシピの最初の100文字をログ出力

        # Geminiを使用して料理に合う酒やソフトドリンクを提案
        drink_prompt = f"""あなたは様々な飲み物に精通したソムリエアシスタントです。料理に合う飲み物を提案してください。
        この料理に合うお酒とソフトドリンクを提案してください: {recipe}
        なぜその飲み物が合うのかという理由と国やルーツなどの豆知識も添えてください。ただし、見やすく表示してください。飲み物の種類ごとに改行すること。"""
        drink_response = model.generate_content(drink_prompt)
        drink = drink_response.text
        print(f"Generated drink recommendation: {drink[:100]}...")  # ドリンク推薦の最初の100文字をログ出力

        return jsonify({
            'recipe': recipe,
            'drink': drink
        })
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)

@app.route('/health')
def health_check():
    return jsonify({"status": "healthy"}), 200

    
