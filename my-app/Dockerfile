FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm build
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
