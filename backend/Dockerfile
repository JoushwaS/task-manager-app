# Step 1: Build the application
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Step 2: Serve the application
FROM node:16

# Set the working directory for the runtime image
WORKDIR /app

# Copy only the built application from the previous stage
COPY --from=build /app/dist ./dist

# Copy package.json and package-lock.json for runtime dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
