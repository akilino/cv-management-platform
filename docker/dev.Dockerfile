# Use a lightweight Node image
FROM node:20-alpine

WORKDIR /app

# Copy package dependencies first to leverage Docker caching
COPY package*.json ./

RUN npm install

# Copy the rest of your app code
COPY . .

EXPOSE 3000

# Start Vite in development mode, binding it to host 0.0.0.0 so Docker can expose it
CMD ["npm", "run", "dev", "--", "--host"]