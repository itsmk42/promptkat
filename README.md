# promptKat - AI Prompt Marketplace

promptKat is a modern marketplace for AI prompts, allowing users to discover, share, and purchase high-quality prompts for various AI models.

![promptKat Logo](/promptcraft-app/public/promptkat-logo.svg)

## Features

- **Browse Prompts**: Explore a wide variety of AI prompts across different categories
- **User Authentication**: Secure login with email/password, GitHub, and Google
- **Admin Dashboard**: Manage prompts, users, and site content
- **CSV Import**: Bulk import prompts using CSV files
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development), PostgreSQL (production)
- **Authentication**: NextAuth.js

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/itsmk42/promptcat.git
   cd promptcat
   ```

2. Install dependencies:
   ```bash
   cd promptcraft-app
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

Use the following credentials for admin access:
- Username: `ballery`
- Password: `ballery@619`

## Project Structure

```
promptcraft-app/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts
│   ├── lib/            # Utility functions
│   ├── middleware/     # Next.js middleware
│   ├── providers/      # Context providers
│   └── styles/         # Global styles
├── prisma/             # Database schema and migrations
└── tests/              # Test files
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js and Tailwind CSS
- Icons from Heroicons
- SVG illustrations custom-created for promptKat
