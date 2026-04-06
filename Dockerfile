FROM node:22-alpine AS build
RUN apk add --no-cache chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL=https://dispatch.y7agency.com
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM node:22-alpine
WORKDIR /app

# Copy package files and install ONLY production deps (including express)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy prerendered dist and server
COPY --from=build /app/dist ./dist
COPY server.js ./

EXPOSE 3000
CMD ["node", "server.js"]
