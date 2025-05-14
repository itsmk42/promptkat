#!/bin/bash

echo "=== GitHub Push Script ==="

# Add all files
echo "Adding files to Git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Initial commit of promptKat application"

# Add remote repository if it doesn't exist
if ! git remote | grep -q "origin"; then
  echo "Adding remote repository..."
  git remote add origin https://github.com/itsmk42/promptcat.git
fi

# Create main branch if it doesn't exist
echo "Setting up main branch..."
git branch -M main

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo "Done!"
