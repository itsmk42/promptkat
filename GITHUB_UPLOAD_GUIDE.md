# GitHub Upload Guide for promptKat

This guide will help you manually upload your promptKat project to GitHub.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Your promptKat project files

## Step 1: Create a GitHub Repository

1. Log in to your GitHub account at [github.com](https://github.com)
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name your repository "promptcat"
4. Add a description (optional)
5. Keep the repository as "Public" or select "Private" if you prefer
6. Do NOT initialize the repository with a README, .gitignore, or license
7. Click "Create repository"

## Step 2: Initialize Git in Your Project

Open a terminal/command prompt and navigate to your promptKat project folder:

```bash
cd /path/to/PROMPTCRAFT
```

Initialize a Git repository:

```bash
git init
```

## Step 3: Add Your Files to Git

Add all your project files to Git:

```bash
git add .
```

Commit the changes:

```bash
git commit -m "Initial commit of promptKat application"
```

## Step 4: Connect to GitHub

Add the GitHub repository as a remote:

```bash
git remote add origin https://github.com/yourusername/promptcat.git
```

Replace `yourusername` with your actual GitHub username.

## Step 5: Push to GitHub

Push your code to GitHub:

```bash
git branch -M main
git push -u origin main
```

When prompted, enter your GitHub username and password or personal access token.

**Note:** If you have two-factor authentication enabled, you'll need to use a personal access token instead of your password.

## Step 6: Verify Upload

Visit your GitHub repository at `https://github.com/yourusername/promptcat` to verify that your files have been uploaded successfully.

## Troubleshooting

### Authentication Issues

If you're having trouble authenticating with GitHub, you may need to create a personal access token:

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Click "Generate new token"
3. Give it a name, select the "repo" scope
4. Click "Generate token"
5. Use this token instead of your password when pushing to GitHub

### Large Files

If you have large files that are causing issues, you may need to use Git LFS or add them to your .gitignore file.

## Next Steps

After successfully uploading your project to GitHub, you can:

- Add collaborators to your repository
- Set up GitHub Pages to showcase your project
- Connect your repository to deployment platforms like Vercel or Netlify
