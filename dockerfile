# 1. 使用官方 Node LTS 版本為 base image
FROM node:18-alpine AS base

# 2. 設定工作目錄
WORKDIR /app

# 3. 安裝依賴（先複製 package 檔案）
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

# 4. 複製其餘程式碼
COPY . .

# 5. 編譯專案
RUN pnpm build

# 6. 使用更小的 production image
FROM node:18-alpine AS deploy

WORKDIR /app

# 只複製必要檔案
COPY --from=base /app ./

ENV NODE_ENV production
EXPOSE 3000

# 啟動 Next.js
CMD ["pnpm", "start"]
