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
RUN npm install -g http-server
WORKDIR /app
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["sh", "-c", "http-server dist -p ${PORT:-3000} --ext html -c-1 --cors --proxy http://localhost:${PORT:-3000}/index.html?"]
