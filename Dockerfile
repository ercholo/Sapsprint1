FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build

# ==== RUN =======
FROM nginx:alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3009
ENTRYPOINT ["nginx", "-g", "daemon off;"]