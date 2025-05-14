# PromptCraft Payment Integration Setup

This document provides instructions for setting up the NOWPayments cryptocurrency payment gateway integration for PromptCraft.

## Prerequisites

1. A NOWPayments account (sign up at [nowpayments.io](https://nowpayments.io))
2. API keys from your NOWPayments dashboard
3. Node.js and npm installed
4. PromptCraft application codebase

## Setup Steps

### 1. Create a NOWPayments Account

1. Go to [nowpayments.io](https://nowpayments.io) and sign up for an account
2. Complete the verification process
3. Set up your wallet addresses for receiving payments

### 2. Get API Keys

1. Log in to your NOWPayments dashboard
2. Navigate to the API Keys section
3. Generate a new API key
4. Copy the API key and IPN secret

### 3. Configure Environment Variables

1. Copy the `.env.example` file to `.env.local`
2. Update the following variables:
   ```
   NOWPAYMENTS_API_KEY="your-nowpayments-api-key"
   NOWPAYMENTS_IPN_SECRET="your-nowpayments-ipn-secret"
   NEXT_PUBLIC_APP_URL="your-application-url" # e.g., http://localhost:3000 for development
   ```

### 4. Set Up IPN Callback URL

1. In your NOWPayments dashboard, navigate to the IPN settings
2. Add a new IPN callback URL: `https://your-domain.com/api/payments/ipn`
3. Make sure to use your actual domain in production

### 5. Run Database Migrations

The payment integration adds new models to the database schema. Run the following commands to update your database:

```bash
npx prisma migrate dev --name add-payment-models
npx prisma generate
```

### 6. Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Navigate to the pricing page: `http://localhost:3000/pricing`
3. Try to purchase a subscription or individual prompt
4. Complete the payment flow using the test mode in NOWPayments

## Payment Flow

1. User selects a prompt to purchase or a subscription plan
2. User is redirected to the payment page
3. User selects a cryptocurrency for payment
4. A payment is created through the NOWPayments API
5. User sends the exact amount to the provided crypto address
6. NOWPayments sends an IPN notification when the payment is received
7. The application updates the payment status and grants access to the purchased content

## Subscription Management

Users can manage their subscriptions from the dashboard:
- View active subscriptions
- Cancel auto-renewal
- See payment history

## Troubleshooting

### Payment Not Being Detected

1. Check the NOWPayments dashboard to see if the payment was received
2. Verify that the IPN callback URL is correctly set up
3. Check the server logs for any errors in the IPN handler

### API Key Issues

1. Ensure the API key and IPN secret are correctly set in the environment variables
2. Verify that the API key has the necessary permissions in the NOWPayments dashboard

### Database Issues

If you encounter database-related errors:

1. Check that all migrations have been applied
2. Run `npx prisma db push` to ensure the schema is up to date
3. Verify that the database URL is correctly set in the environment variables

## Support

For issues with the NOWPayments integration, contact their support at support@nowpayments.io.

For application-specific issues, please create an issue in the project repository.
