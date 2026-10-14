# Using Node.js Alpine image 
FROM node:20-alpine

# Install Chromium and required dependencies by enabling Alpine community repository
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    --repository=http://dl-cdn.alpinelinux.org/alpine/v3.20/community

# Configure Puppeteer to use system Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Set working directory 
WORKDIR /app

# Copy package files 
COPY package*.json ./

# Install dependencies 
RUN npm install 

# Copy application code 
COPY . .

# Expose backend port
EXPOSE 3000

# Start backend 
CMD ["npm", "start"]