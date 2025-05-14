# PromptCraft Deployment Guide

This guide provides instructions for deploying the PromptCraft application, including the admin dashboard.

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- PostgreSQL 14.x or later (for production)
- Docker and Docker Compose (optional, for containerized deployment)

## Deployment Options

### Option 1: Manual Deployment

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/promptcraft.git
   cd promptcraft/promptcraft-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   # Database
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/promptcraft"
   
   # NextAuth
   NEXTAUTH_URL="https://your-domain.com"
   NEXTAUTH_SECRET="your-secret-key"
   
   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   
   # NOWPayments (for crypto payments)
   NOWPAYMENTS_API_KEY="your-nowpayments-api-key"
   NOWPAYMENTS_IPN_SECRET="your-nowpayments-ipn-secret"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

5. Build the application:
   ```bash
   npm run build
   ```

6. Start the application:
   ```bash
   npm start
   ```

### Option 2: Deployment Script

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/promptcraft.git
   cd promptcraft/promptcraft-app
   ```

2. Set up environment variables as described in Option 1.

3. Make the deployment script executable:
   ```bash
   chmod +x deploy.sh
   ```

4. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

### Option 3: Docker Deployment

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/promptcraft.git
   cd promptcraft/promptcraft-app
   ```

2. Set up environment variables as described in Option 1.

3. Build and start the Docker containers:
   ```bash
   docker-compose up -d
   ```

## Production Deployment Considerations

### Database

For production, we recommend using a managed PostgreSQL service like:
- Amazon RDS
- Google Cloud SQL
- Azure Database for PostgreSQL
- DigitalOcean Managed Databases

Update the `DATABASE_URL` environment variable to point to your production database.

### Web Server

For production, we recommend using a process manager like PM2:

1. Install PM2:
   ```bash
   npm install -g pm2
   ```

2. Start the application with PM2:
   ```bash
   pm2 start npm --name "promptcraft" -- start
   ```

3. Set up PM2 to start on system boot:
   ```bash
   pm2 startup
   pm2 save
   ```

### HTTPS

For production, you should set up HTTPS using a reverse proxy like Nginx:

1. Install Nginx:
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. Configure Nginx:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl;
       server_name your-domain.com;

       ssl_certificate /path/to/your/certificate.crt;
       ssl_certificate_key /path/to/your/private.key;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. Obtain SSL certificates using Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### Continuous Integration/Continuous Deployment (CI/CD)

For automated deployments, consider setting up a CI/CD pipeline using:
- GitHub Actions
- GitLab CI/CD
- Jenkins
- CircleCI

## Admin Dashboard Access

After deployment, you'll need to create an admin user:

1. Register a new user through the application.
2. Connect to the database and update the user's role to 'admin':
   ```sql
   UPDATE "User" SET role = 'admin' WHERE email = 'admin@example.com';
   ```

3. Access the admin dashboard at `https://your-domain.com/admin`.

## Monitoring and Maintenance

- Set up application monitoring using services like New Relic, Datadog, or Sentry.
- Configure regular database backups.
- Set up log rotation for application logs.
- Implement a health check endpoint for monitoring the application status.

## Troubleshooting

If you encounter issues during deployment:

1. Check the application logs:
   ```bash
   npm run logs
   ```

2. Verify environment variables are correctly set.
3. Ensure the database is accessible and migrations have been applied.
4. Check for any errors in the browser console or network tab.

For additional help, please refer to the project documentation or contact the development team.
