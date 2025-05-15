// This file is used to configure Netlify deployments
// It's a simple script that can be run before or after the build process

const fs = require('fs');
const path = require('path');

// Ensure the public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create a _redirects file if it doesn't exist
const redirectsPath = path.join(publicDir, '_redirects');
if (!fs.existsSync(redirectsPath)) {
  const redirectsContent = `
# Netlify redirects file
# Handle Next.js routes
/_next/static/*  /_next/static/:splat  200
/_next/data/*    /_next/data/:splat    200
/_next/*         /_next/:splat         200
/api/*           /api/:splat           200

# Handle client-side routing
/*              /index.html            200
`;
  fs.writeFileSync(redirectsPath, redirectsContent.trim());
  console.log('Created _redirects file');
}

console.log('Netlify configuration complete');
