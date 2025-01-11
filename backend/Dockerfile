# Use official Node.js image for backend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Expose the backend port (e.g., 5000)
EXPOSE 3001

# Run the backend application
CMD ["npm", "start"]
