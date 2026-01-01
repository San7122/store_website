FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Expose port 7860 (Hugging Face default)
EXPOSE 7860

# Use vite preview to serve the built app
CMD ["npm", "run", "start"]
to