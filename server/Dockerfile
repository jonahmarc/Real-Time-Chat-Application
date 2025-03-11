# Use official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including dev dependencies
RUN npm install --include=dev

# Copy the rest of the application files
COPY . .

# Expose the port
EXPOSE 3001

# Command to start the server
CMD ["npm", "run", "dev"]
