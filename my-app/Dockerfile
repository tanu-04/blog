# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build || (cat /root/.npm/_logs/*-debug-0.log && false)

# Expose Vite preview server port
EXPOSE 4173

# Use Vite's preview server (for production testing)
CMD ["npm", "run", "serve"]
