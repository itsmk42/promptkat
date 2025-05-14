# PromptCraft Admin Dashboard Technical Reference

This technical reference provides detailed information for developers who need to extend or modify the PromptCraft admin dashboard.

## Architecture Overview

The admin dashboard is built using:
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Prisma ORM
- NextAuth.js for authentication

### Directory Structure

```
src/
├── app/
│   ├── admin/                  # Admin dashboard pages
│   │   ├── page.tsx            # Dashboard overview
│   │   ├── prompts/            # Prompts management
│   │   ├── categories/         # Categories management
│   │   ├── users/              # Users management
│   │   ├── analytics/          # Analytics
│   │   ├── settings/           # Settings
│   │   └── feedback/           # Feedback form
│   └── api/
│       └── admin/              # Admin API routes
│           ├── prompts/        # Prompts API
│           ├── categories/     # Categories API
│           ├── users/          # Users API
│           ├── analytics/      # Analytics API
│           └── feedback/       # Feedback API
├── components/
│   └── AdminLayout.tsx         # Admin layout component
└── middleware/
    └── adminAuth.ts           # Admin authentication middleware
```

## Authentication and Authorization

### User Roles

The system supports three user roles:
- `user`: Regular user with no admin access
- `admin`: User with access to the admin dashboard
- `superadmin`: User with full administrative privileges

### Role-Based Access Control

Access to admin routes is controlled by:
1. Middleware that checks the user's role
2. Server-side checks in API routes
3. Client-side checks in React components

### Authentication Flow

1. User logs in using NextAuth.js
2. User's role is added to the session token
3. Middleware checks the role when accessing admin routes
4. API routes verify the role before processing requests

## Admin API Reference

### Prompts API

#### GET /api/admin/prompts
- Returns a list of all prompts
- Query parameters:
  - `search`: Search term for filtering prompts
  - `category`: Category ID for filtering prompts
  - `type`: Prompt type for filtering prompts
  - `sort`: Sort order for prompts

#### POST /api/admin/prompts
- Creates a new prompt
- Request body:
  - `title`: Prompt title (required)
  - `description`: Prompt description (required)
  - `content`: Prompt content (required)
  - `price`: Prompt price (required)
  - `type`: Prompt type (required)
  - `categoryId`: Category ID (required)
  - `tags`: Array of tags (optional)
  - `image`: Image URL (optional)
  - `featured`: Featured status (optional)

#### GET /api/admin/prompts/[id]
- Returns a specific prompt
- URL parameters:
  - `id`: Prompt ID

#### PATCH /api/admin/prompts/[id]
- Updates a specific prompt
- URL parameters:
  - `id`: Prompt ID
- Request body: Same as POST, but all fields are optional

#### DELETE /api/admin/prompts/[id]
- Deletes a specific prompt
- URL parameters:
  - `id`: Prompt ID

#### PATCH /api/admin/prompts/[id]/feature
- Toggles the featured status of a prompt
- URL parameters:
  - `id`: Prompt ID

### Categories API

#### GET /api/admin/categories
- Returns a list of all categories
- Query parameters:
  - `search`: Search term for filtering categories
  - `sort`: Sort order for categories

#### POST /api/admin/categories
- Creates a new category
- Request body:
  - `name`: Category name (required)
  - `description`: Category description (required)
  - `color`: Category color (required)
  - `icon`: Category icon SVG path (optional)

#### GET /api/admin/categories/[id]
- Returns a specific category
- URL parameters:
  - `id`: Category ID

#### PATCH /api/admin/categories/[id]
- Updates a specific category
- URL parameters:
  - `id`: Category ID
- Request body: Same as POST, but all fields are optional

#### DELETE /api/admin/categories/[id]
- Deletes a specific category
- URL parameters:
  - `id`: Category ID

### Users API

#### GET /api/admin/users
- Returns a list of all users
- Query parameters:
  - `search`: Search term for filtering users
  - `role`: Role for filtering users
  - `sort`: Sort order for users

#### GET /api/admin/users/[id]
- Returns a specific user
- URL parameters:
  - `id`: User ID

#### PATCH /api/admin/users/[id]
- Updates a specific user
- URL parameters:
  - `id`: User ID
- Request body:
  - `name`: User name (optional)
  - `email`: User email (optional)
  - `role`: User role (optional)

### Analytics API

#### GET /api/admin/analytics
- Returns analytics data
- Query parameters:
  - `timeRange`: Time range for analytics (7days, 30days, 90days, year, all)

### Feedback API

#### POST /api/admin/feedback
- Submits admin dashboard feedback
- Request body:
  - `category`: Feedback category (required)
  - `title`: Feedback title (required)
  - `description`: Feedback description (required)
  - `rating`: Feedback rating (required)
  - `email`: Contact email (optional)
  - `name`: Contact name (optional)

## Extending the Admin Dashboard

### Adding a New Admin Page

1. Create a new page in the `src/app/admin/` directory:

```tsx
// src/app/admin/new-feature/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AdminLayout from '@/components/AdminLayout';

export default function AdminNewFeature() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/admin/new-feature');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin' && session?.user?.role !== 'superadmin') {
      router.push('/unauthorized');
    }
  }, [status, session, router]);
  
  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-white">New Feature</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Your content here */}
        </div>
      </div>
    </AdminLayout>
  );
}
```

2. Add the page to the navigation in `src/components/AdminLayout.tsx`:

```tsx
const navigation = [
  // ... existing navigation items
  { 
    name: 'New Feature', 
    href: '/admin/new-feature', 
    icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' 
  },
];
```

### Adding a New API Route

1. Create a new API route in the `src/app/api/admin/` directory:

```tsx
// src/app/api/admin/new-feature/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminApiAuth } from '@/middleware/adminAuth';

const prisma = new PrismaClient();

// GET /api/admin/new-feature
export async function GET(request: NextRequest) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    // Your implementation here
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/admin/new-feature
export async function POST(request: NextRequest) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    const data = await request.json();
    // Your implementation here
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

### Customizing the Admin Layout

The `AdminLayout` component in `src/components/AdminLayout.tsx` can be customized to change the appearance and behavior of the admin dashboard.

Key areas to customize:
- Navigation items
- Sidebar appearance
- Header content
- Footer content

## Testing

### Unit Testing

Unit tests for the admin dashboard are located in the `tests/` directory:
- `admin-dashboard.test.js`: Tests for admin pages
- `admin-api.test.js`: Tests for admin API routes

Run tests with:
```bash
npm test
```

### Manual Testing Checklist

Before deploying changes to the admin dashboard, verify:
1. All pages load correctly
2. All forms submit correctly
3. All API routes return the expected responses
4. Authentication and authorization work correctly
5. The UI is responsive on different screen sizes

## Deployment

See the `DEPLOYMENT.md` file for detailed deployment instructions.

## Troubleshooting

### Common Development Issues

1. **API routes returning 401 Unauthorized**:
   - Verify the user has admin privileges
   - Check the adminAuth middleware is working correctly

2. **Pages not updating after changes**:
   - Clear the Next.js cache: `rm -rf .next`
   - Restart the development server

3. **Database schema issues**:
   - Run `npx prisma migrate reset` to reset the database
   - Run `npx prisma generate` to regenerate the Prisma client

### Debugging Tips

1. Use the browser developer tools to inspect network requests and responses
2. Check the server logs for error messages
3. Add console.log statements to debug client-side code
4. Use the Prisma Studio to inspect the database: `npx prisma studio`

## Contributing

When contributing to the admin dashboard:
1. Follow the existing code style and conventions
2. Write tests for new features
3. Update documentation to reflect changes
4. Test thoroughly before submitting a pull request
