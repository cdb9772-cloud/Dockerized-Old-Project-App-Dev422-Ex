FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies in builder stage (includes local file dependency).
COPY package*.json ./
COPY src/companydata ./src/companydata
RUN npm install --omit=dev

# Copy app source after dependency install for better layer caching.
COPY src ./src

FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8282

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src

EXPOSE 8282

CMD ["node", "src/server.js"]
