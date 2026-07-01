# --- Stage 1: Build the React application ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci # Clean install for production
COPY . .
RUN npm run build

# --- Stage 2: Serve the app with Nginx ---
FROM nginx:stable-alpine
# Copy the built assets from the builder stage over to Nginx's public folder
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy custom nginx config if needed (optional)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]