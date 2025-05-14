/**
 * Mock Database Service
 *
 * This file provides mock database functionality for development and testing.
 * It simulates database operations without requiring a real database connection.
 */

// Mock prompt data
const mockPrompts = [
  {
    id: 'mock-prompt-1',
    title: 'Creative Story Generator',
    description: 'Generate creative short stories based on a few keywords.',
    price: 4.99,
    category: 'creative-writing',
    type: 'text',
    userId: 'dev-user-id',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'mock-prompt-2',
    title: 'SEO Blog Post Outline',
    description: 'Create detailed blog post outlines optimized for SEO.',
    price: 7.99,
    category: 'marketing',
    type: 'text',
    userId: 'dev-user-id',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'mock-prompt-3',
    title: 'Code Refactoring Assistant',
    description: 'Get suggestions for refactoring and improving your code.',
    price: 9.99,
    category: 'programming',
    type: 'text',
    userId: 'dev-user-id',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// Mock user data
const mockUsers = [
  {
    id: 'dev-user-id',
    name: 'Development User',
    email: 'dev@example.com',
    role: 'user',
    emailVerified: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// Mock purchases
const mockPurchases: any[] = [];

// Mock payments
const mockPayments: any[] = [];

// Mock subscriptions
const mockSubscriptions: any[] = [];

// Mock database operations
export const mockDb = {
  // Prompt operations
  prompt: {
    findUnique: async ({ where }: { where: { id: string } }) => {
      return mockPrompts.find(prompt => prompt.id === where.id) || null;
    },
    findMany: async () => {
      return mockPrompts;
    },
    create: async ({ data }: { data: any }) => {
      const newPrompt = {
        id: `mock-prompt-${mockPrompts.length + 1}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPrompts.push(newPrompt);
      return newPrompt;
    },
  },

  // User operations
  user: {
    findUnique: async ({ where }: { where: { id: string } }) => {
      return mockUsers.find(user => user.id === where.id) || null;
    },
    findFirst: async ({ where }: { where: any }) => {
      // Simple matching logic for demo purposes
      return mockUsers.find(user => {
        for (const key in where) {
          if (user[key] !== where[key]) {
            return false;
          }
        }
        return true;
      }) || null;
    },
  },

  // Purchase operations
  purchase: {
    findFirst: async ({ where }: { where: any }) => {
      return mockPurchases.find(purchase => {
        for (const key in where) {
          if (purchase[key] !== where[key]) {
            return false;
          }
        }
        return true;
      }) || null;
    },
    create: async ({ data }: { data: any }) => {
      const newPurchase = {
        id: `mock-purchase-${mockPurchases.length + 1}`,
        ...data,
        purchaseDate: new Date(),
        status: 'pending',
      };
      mockPurchases.push(newPurchase);
      return newPurchase;
    },
  },

  // Payment operations
  payment: {
    create: async ({ data }: { data: any }) => {
      const newPayment = {
        id: `mock-payment-${mockPayments.length + 1}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPayments.push(newPayment);
      return newPayment;
    },
  },

  // Subscription operations
  subscription: {
    create: async ({ data }: { data: any }) => {
      const newSubscription = {
        id: `mock-subscription-${mockSubscriptions.length + 1}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'active',
      };
      mockSubscriptions.push(newSubscription);
      return newSubscription;
    },
    findMany: async ({ where }: { where?: any }) => {
      if (!where) {
        return mockSubscriptions;
      }

      return mockSubscriptions.filter(subscription => {
        for (const key in where) {
          if (subscription[key] !== where[key]) {
            return false;
          }
        }
        return true;
      });
    },
    findUnique: async ({ where }: { where: any }) => {
      return mockSubscriptions.find(subscription => {
        for (const key in where) {
          if (subscription[key] !== where[key]) {
            return false;
          }
        }
        return true;
      }) || null;
    },
    update: async ({ where, data }: { where: any, data: any }) => {
      const index = mockSubscriptions.findIndex(subscription => {
        for (const key in where) {
          if (subscription[key] !== where[key]) {
            return false;
          }
        }
        return true;
      });

      if (index === -1) {
        throw new Error('Subscription not found');
      }

      const updatedSubscription = {
        ...mockSubscriptions[index],
        ...data,
        updatedAt: new Date(),
      };

      mockSubscriptions[index] = updatedSubscription;
      return updatedSubscription;
    },
  },
};

// Function to get either the real Prisma client or the mock DB
export function getDbClient() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const useMockDb = process.env.USE_MOCK_DB === 'true';

  if (isDevelopment && useMockDb) {
    console.log('Using mock database for development');
    return mockDb;
  } else {
    // Import and return the real Prisma client
    const { PrismaClient } = require('@prisma/client');
    return new PrismaClient();
  }
}
