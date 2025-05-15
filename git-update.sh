#!/bin/bash

echo "=== Git Update Script ==="

# Add all files
echo "Adding files to Git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Add Request Category page and update navigation"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin main

echo "Done!"
