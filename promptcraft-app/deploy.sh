#!/bin/bash

# Deployment script for PromptCraft application

# Exit on error
set -e

echo "Starting deployment process for PromptCraft..."

# Step 1: Install dependencies
echo "Installing dependencies..."
npm install

# Step 2: Run tests
echo "Running tests..."
npm test

# Step 3: Build the application
echo "Building the application..."
npm run build

# Step 4: Apply database migrations
echo "Applying database migrations..."
npx prisma migrate deploy

# Step 5: Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Step 6: Start the application (for production, you would use a process manager like PM2)
echo "Starting the application..."
npm start

echo "Deployment completed successfully!"
