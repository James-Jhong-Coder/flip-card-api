# ---------------------
# 1️⃣ Builder
# ---------------------
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# ---------------------
# 2️⃣ Runner
# ---------------------
FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# 🧩 關鍵：一定要先 COPY 這兩個檔案
COPY package.json pnpm-lock.yaml ./

# 然後再安裝 prod 依賴
RUN pnpm install --frozen-lockfile --prod

# 再把 builder 的 dist 複製進來
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
