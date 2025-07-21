# ---------------------------------
# Next.js UI multi-stage build
# ---------------------------------

# Base image for building
FROM node:20-alpine AS deps
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
RUN npm install --omit=dev

# Build stage
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production runtime
FROM node:20-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV PORT=3000
# Copy built output and minimal files needed to run
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=deps /usr/src/app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]