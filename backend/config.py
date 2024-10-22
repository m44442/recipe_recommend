import os
from dotenv import load_dotenv

# .envファイルから環境変数を読み込む
load_dotenv()

# Google (Gemini) APIキー
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

# フラスクの設定
SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'your-secret-key')

# データベース設定（必要な場合）
DATABASE_URI = os.getenv('DATABASE_URI', 'sqlite:///app.db')

# その他のアプリケーション設定
MAX_INGREDIENTS = int(os.getenv('MAX_INGREDIENTS', '10'))
DEFAULT_LANGUAGE = os.getenv('DEFAULT_LANGUAGE', 'ja')

# APIのベースURL
API_BASE_URL = os.getenv('API_BASE_URL', 'http://backend:5002/api/recommend')

# Gemini APIの設定
GEMINI_MODEL = os.getenv('GEMINI_MODEL', 'gemini-pro')

# 設定が正しく読み込まれているか確認
if not GOOGLE_API_KEY:
    raise ValueError("Google APIキーが設定されていません。.envファイルを確認してください。")
