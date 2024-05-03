# Use an official Node.js runtime as a parent image (Alpine for smaller size)
FROM node:20.12.2-alpine3.18

# Set the working directory to /app inside the container
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json (if available) to the container
# Adjust the path according to the relative position from the Dockerfile to the frontend directory
COPY ../../frontend/package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of your app's source code
# Adjust the path according to the relative position from the Dockerfile to the frontend directory
COPY ../../frontend/ ./

# Build your app - this typically compiles the React app into static files
RUN npm install
RUN npm run build

# Command to run your app using npm start (for development)
# For production, consider serving with a more efficient web server like Nginx
CMD ["npx", "react-scripts", "start"]
