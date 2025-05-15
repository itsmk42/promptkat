# PromptKat - AI Prompt Marketplace

PromptKat is a marketplace for AI prompts, where users can discover, share, and purchase high-quality prompts for various AI models.

## Features

- Browse and search for prompts by category, type, and more
- User authentication with email/password, GitHub, and Google
- Light and dark mode support
- Responsive design for all devices
- Secure payment processing
- User profiles and dashboard
- Admin panel for managing prompts, categories, and users

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Deployment**: Netlify

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Deployment to Netlify

### Prerequisites

1. A Netlify account
2. Git installed on your machine
3. Node.js and npm installed

### Steps to Deploy

1. **Fork or Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/promptkat.git
   cd promptkat
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables on Netlify**

   In the Netlify dashboard, go to Site settings > Build & deploy > Environment variables and add the following variables:

   ```
   DATABASE_URL=your_neon_postgresql_url
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=https://your-netlify-site.netlify.app
   NEXTAUTH_URL_INTERNAL=https://your-netlify-site.netlify.app
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   NOWPAYMENTS_API_KEY=your_nowpayments_api_key
   NOWPAYMENTS_IPN_SECRET=your_nowpayments_ipn_secret
   USE_MOCK_PAYMENTS=true
   USE_MOCK_DB=false
   NEXT_PUBLIC_APP_URL=https://your-netlify-site.netlify.app
   ```

4. **Deploy to Netlify**

   You can deploy to Netlify in two ways:

   **Option 1: Using the Netlify CLI**

   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login to Netlify
   netlify login

   # Initialize a new Netlify site
   netlify init

   # Deploy to Netlify
   netlify deploy --prod
   ```

   **Option 2: Connect to GitHub**

   1. Push your code to GitHub
   2. Log in to Netlify
   3. Click "New site from Git"
   4. Choose GitHub and select your repository
   5. Configure build settings:
      - Build command: `npm run build`
      - Publish directory: `.next`
   6. Click "Deploy site"

## Acknowledgements

- Built with Next.js and Tailwind CSS
- Coded with Augment AI
