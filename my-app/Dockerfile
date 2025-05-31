# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Print error logs if build fails
#RUN npm run build || (echo "BUILD FAILED" && cat /root/.npm/_logs/* || true)
# or this alternative if logs are not under /root:
RUN npm run build || (find . -name "*-debug-0.log" -exec cat {} \; || true)

# Expose Vite preview server port
EXPOSE 4173

# Use Vite's preview server (for production testing)
CMD ["npm", "run", "serve"]