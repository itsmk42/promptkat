#!/bin/bash

# Initialize Git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit of promptKat application"

# Add remote repository
git remote add origin https://github.com/itsmk42/promptcat.git

# Create main branch if it doesn't exist
git branch -M main

# Push to GitHub
git push -u origin main

echo "Repository pushed to GitHub successfully!"
