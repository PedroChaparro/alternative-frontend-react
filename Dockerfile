# --- Build stage ---
FROM node:20.5.1-alpine3.18 AS builder
WORKDIR /app

RUN npm install -g npm@latest
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

ENV VITE_PROXY_BASE_URL=http://capyfile1.bucaramanga.upb.edu.co/api/python

COPY . .
RUN pnpm build

# --- Run stage ---
FROM nginx:mainline-alpine3.18-slim AS runner
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]