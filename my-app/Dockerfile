FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build || (cat /root/.npm/_logs/*-debug-0.log && false)

CMD ["npx", "serve", "-s", "build", "-l", "3000"]