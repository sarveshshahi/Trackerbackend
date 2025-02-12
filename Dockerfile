# Use the latest Node.js image as the base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Rebuild native modules
RUN npm rebuild bcrypt --build-from-source

# Expose the port the app runs on
EXPOSE 8000

# Start the application
CMD ["node", "src/index.js"]