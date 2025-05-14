#!/bin/bash

echo "=== promptKat GitHub Upload Script ==="
echo "This script will help you push your code to GitHub."
echo "You'll need to enter your GitHub credentials when prompted."
echo ""

# Initialize Git repository
echo "Initializing Git repository..."
git init

# Add all files
echo "Adding files to Git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Initial commit of promptKat application"

# Add remote repository
echo "Adding remote repository..."
git remote add origin https://github.com/itsmk42/promptcat.git

# Create main branch if it doesn't exist
echo "Setting up main branch..."
git branch -M main

echo ""
echo "=== Ready to push to GitHub ==="
echo "When prompted, enter your GitHub username and password/token."
echo "If you use two-factor authentication, you'll need to use a personal access token instead of your password."
echo ""
echo "Press Enter to continue or Ctrl+C to cancel..."
read

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "If the push was successful, your code is now on GitHub!"
echo "Visit https://github.com/itsmk42/promptcat to see your repository."
