# PromptCraft Admin Dashboard Guide

This guide provides detailed information on using the PromptCraft admin dashboard to manage your marketplace.

## Table of Contents

1. [Accessing the Admin Dashboard](#accessing-the-admin-dashboard)
2. [Dashboard Overview](#dashboard-overview)
3. [Prompts Management](#prompts-management)
4. [Categories Management](#categories-management)
5. [Users Management](#users-management)
6. [Analytics](#analytics)
7. [Settings](#settings)
8. [Providing Feedback](#providing-feedback)
9. [Troubleshooting](#troubleshooting)

## Accessing the Admin Dashboard

The admin dashboard is accessible only to users with admin privileges.

1. Log in to your PromptCraft account.
2. Navigate to `/admin` in your browser.
3. If you have admin privileges, you'll see the admin dashboard.
4. If you don't have admin privileges, you'll be redirected to an unauthorized page.

## Dashboard Overview

The dashboard provides a quick overview of your marketplace:

- **Total Prompts**: The number of prompts in your marketplace.
- **Categories**: The number of categories in your marketplace.
- **Users**: The total number of registered users.
- **Total Sales**: The total revenue generated from prompt sales.

You'll also see:
- **Recent Sales**: The most recent prompt purchases.
- **Top Selling Prompts**: The prompts with the highest sales.
- **Quick Actions**: Shortcuts to common admin tasks.

## Prompts Management

The Prompts Management page allows you to manage all prompts in your marketplace.

### Viewing Prompts

1. Navigate to **Admin > Prompts**.
2. You'll see a list of all prompts with key information:
   - Title and description
   - Category
   - Price
   - Sales count
   - Featured status

### Filtering and Sorting Prompts

1. Use the search box to find prompts by title or description.
2. Use the category filter to show prompts from a specific category.
3. Use the type filter to show text or image prompts.
4. Use the sort dropdown to order prompts by:
   - Newest
   - Oldest
   - Price (High to Low)
   - Price (Low to High)
   - Most Sales

### Adding a New Prompt

1. Click the **Add New Prompt** button.
2. Fill in the prompt details:
   - Title
   - Description
   - Content (the actual prompt text)
   - Price
   - Type (text or image)
   - Category
   - Tags (optional)
   - Featured status (optional)
3. Click **Save** to create the prompt.

### Editing a Prompt

1. Find the prompt you want to edit in the list.
2. Click the **Edit** link in the Actions column.
3. Update the prompt details.
4. Click **Save** to update the prompt.

### Featuring a Prompt

Featured prompts appear on the homepage and in featured sections.

1. Find the prompt you want to feature in the list.
2. Toggle the Featured switch in the Featured column.

### Deleting a Prompt

1. Find the prompt you want to delete in the list.
2. Click the **Delete** link in the Actions column.
3. Confirm the deletion when prompted.

## Categories Management

The Categories Management page allows you to manage the categories for organizing prompts.

### Viewing Categories

1. Navigate to **Admin > Categories**.
2. You'll see a grid of all categories with key information:
   - Name
   - Description
   - Number of prompts
   - Icon and color

### Filtering and Sorting Categories

1. Use the search box to find categories by name or description.
2. Use the sort dropdown to order categories by:
   - Name (A-Z)
   - Name (Z-A)
   - Prompts (High to Low)
   - Prompts (Low to High)

### Adding a New Category

1. Click the **Add New Category** button.
2. Fill in the category details:
   - Name
   - Description
   - Color
   - Icon (SVG path)
3. Click **Save** to create the category.

### Editing a Category

1. Find the category you want to edit in the grid.
2. Click the **Edit** link.
3. Update the category details.
4. Click **Save** to update the category.

### Deleting a Category

1. Find the category you want to delete in the grid.
2. Click the **Delete** link.
3. Confirm the deletion when prompted.

**Note**: You cannot delete a category that contains prompts. You must first reassign or delete all prompts in the category.

## Users Management

The Users Management page allows you to manage user accounts and roles.

### Viewing Users

1. Navigate to **Admin > Users**.
2. You'll see a list of all users with key information:
   - Name and email
   - Verification status
   - Role
   - Purchase count and total spent

### Filtering and Sorting Users

1. Use the search box to find users by name or email.
2. Use the role filter to show users with a specific role.
3. Use the sort dropdown to order users by:
   - Newest
   - Oldest
   - Name
   - Most Purchases
   - Most Spent

### Changing User Roles

1. Find the user you want to update in the list.
2. Use the Role dropdown to change their role:
   - User: Regular user with no admin privileges
   - Admin: User with access to the admin dashboard
   - Superadmin: User with full administrative privileges

**Note**: You cannot change your own role (except for superadmins).

### Viewing User Details

1. Find the user you want to view in the list.
2. Click the **View** link in the Actions column.
3. You'll see detailed information about the user, including:
   - Account details
   - Purchase history
   - Created prompts

### Viewing User Purchases

1. Find the user you want to view in the list.
2. Click the **Purchases** link in the Actions column.
3. You'll see a list of all purchases made by the user.

## Analytics

The Analytics page provides insights into your marketplace performance.

### Viewing Analytics

1. Navigate to **Admin > Analytics**.
2. You'll see key metrics:
   - Total Revenue
   - Total Sales
   - Total Users
   - New Users

You'll also see:
- **Sales Overview**: A chart showing sales over time.
- **Sales by Category**: A breakdown of sales by category.
- **User Growth**: A chart showing user registrations over time.
- **Recent Sales**: A table of recent sales.

### Changing the Time Range

Use the time range dropdown to view analytics for different periods:
- Last 7 Days
- Last 30 Days
- Last 90 Days
- Last Year
- All Time

## Settings

The Settings page allows you to configure your marketplace.

### General Settings

1. Navigate to **Admin > Settings**.
2. Update general settings:
   - Site Name
   - Site Description
   - Contact Email
   - Featured Prompts Count
   - New Prompts Count
   - Enable/Disable Payments
   - Enable/Disable User Registration
   - Enable/Disable Maintenance Mode

### SEO Settings

Update SEO settings to improve search engine visibility:
- Meta Title
- Meta Description
- OG Image URL

### Social Media Settings

Update social media account information:
- Twitter Handle
- Facebook Page
- Instagram Handle

### Saving Settings

Click the **Save Settings** button to apply your changes.

## Providing Feedback

We value your feedback on the admin dashboard.

1. Navigate to **Admin > Feedback**.
2. Fill in the feedback form:
   - Category
   - Title
   - Description
   - Rating
   - Contact Information (optional)
3. Click **Submit Feedback** to send your feedback.

## Troubleshooting

### Common Issues

1. **Cannot access admin dashboard**:
   - Verify you're logged in.
   - Verify your account has admin privileges.
   - Contact a superadmin to grant you admin access.

2. **Changes not saving**:
   - Refresh the page and try again.
   - Check your internet connection.
   - Clear your browser cache.

3. **Analytics not loading**:
   - Verify your database connection.
   - Try changing the time range.
   - Refresh the page.

### Getting Help

If you encounter issues not covered in this guide:

1. Use the Feedback form to report the issue.
2. Contact the development team at support@promptcraft.com.
3. Check the developer documentation for technical details.
