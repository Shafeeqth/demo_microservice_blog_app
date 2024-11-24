# Use the lightweight Alpine-based Node.js image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json to leverage caching
COPY package.json ./

# Install dependencies
# If you have native modules, you may need to install build tools
RUN apk add --no-cache make g++ python3 && npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
# EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]
