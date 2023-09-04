# Use an official node runtime as a parent image
FROM node:latest

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json /app
RUN npm install

# Add rest of the client code
COPY . /app

# Build the application for production
RUN npm run build

# Install a simple server for serving static content
RUN npm install -g serve

# Specify which port your application will run on
EXPOSE 5173

# Start the server and serve the built application
CMD ["serve", "-s", "dist", "-l", "5173"]