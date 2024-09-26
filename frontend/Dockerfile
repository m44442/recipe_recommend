# ベースイメージとしてNode.js 20.17.0を使用（既存の設定を維持）
FROM node:20.17.0-alpine

# 作業ディレクトリを設定（既存の設定を維持）
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー（既存の設定を維持）
COPY package*.json ./

# 依存関係をインストール
RUN npm ci 

# ソースコードをコピー（既存の設定を維持）
COPY . .

# アプリケーションをビルド（既存の設定を維持）
RUN npm run build

# 環境変数を設定（新規追加）
ENV NODE_ENV production

# ポート3000を公開（既存の設定を維持）
EXPOSE 3000

# アプリケーションを起動（既存の設定を維持）
CMD ["npm", "start"]
