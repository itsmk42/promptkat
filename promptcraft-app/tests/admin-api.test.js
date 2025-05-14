/**
 * Admin API Test Script
 * 
 * This script contains tests for the admin API endpoints.
 * Run with: npm test -- admin-api.test.js
 */

import { createMocks } from 'node-mocks-http';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

// Import API handlers
import * as promptsHandler from '../src/app/api/admin/prompts/route';
import * as promptHandler from '../src/app/api/admin/prompts/[id]/route';
import * as categoriesHandler from '../src/app/api/admin/categories/route';
import * as categoryHandler from '../src/app/api/admin/categories/[id]/route';
import * as usersHandler from '../src/app/api/admin/users/route';
import * as userHandler from '../src/app/api/admin/users/[id]/route';
import * as analyticsHandler from '../src/app/api/admin/analytics/route';

// Mock NextAuth
jest.mock('next-auth');

// Mock Prisma
jest.mock('@prisma/client');

// Mock admin auth middleware
jest.mock('../src/middleware/adminAuth', () => ({
  adminApiAuth: jest.fn().mockResolvedValue(null),
  isAdmin: jest.fn().mockResolvedValue(true),
}));

// Mock session data
const mockAdminSession = {
  user: {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
};

// Test suite for admin API
describe('Admin API', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock getServerSession to return admin session
    getServerSession.mockResolvedValue(mockAdminSession);
    
    // Mock Prisma methods
    const mockPrisma = {
      prompt: {
        findMany: jest.fn().mockResolvedValue([]),
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({}),
      },
      category: {
        findMany: jest.fn().mockResolvedValue([]),
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({}),
      },
      user: {
        findMany: jest.fn().mockResolvedValue([]),
        findUnique: jest.fn().mockResolvedValue(null),
        update: jest.fn().mockResolvedValue({}),
        count: jest.fn().mockResolvedValue(0),
      },
      purchase: {
        findMany: jest.fn().mockResolvedValue([]),
      },
    };
    
    PrismaClient.mockImplementation(() => mockPrisma);
  });
  
  // Test prompts API
  describe('Prompts API', () => {
    test('GET /api/admin/prompts returns prompts list', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });
      
      await promptsHandler.GET(req);
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual([]);
    });
    
    test('POST /api/admin/prompts creates a new prompt', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          title: 'Test Prompt',
          description: 'Test description',
          content: 'Test content',
          price: 9.99,
          type: 'text',
          categoryId: '1',
          tags: ['test', 'prompt'],
        },
      });
      
      await promptsHandler.POST(req);
      
      expect(res._getStatusCode()).toBe(201);
    });
    
    test('GET /api/admin/prompts/[id] returns a prompt', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });
      
      await promptHandler.GET(req, { params: { id: '1' } });
      
      expect(res._getStatusCode()).toBe(200);
    });
    
    test('PATCH /api/admin/prompts/[id] updates a prompt', async () => {
      const { req, res } = createMocks({
        method: 'PATCH',
        body: {
          title: 'Updated Prompt',
        },
      });
      
      await promptHandler.PATCH(req, { params: { id: '1' } });
      
      expect(res._getStatusCode()).toBe(200);
    });
    
    test('DELETE /api/admin/prompts/[id] deletes a prompt', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
      });
      
      await promptHandler.DELETE(req, { params: { id: '1' } });
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({ success: true });
    });
  });
  
  // Test categories API
  describe('Categories API', () => {
    test('GET /api/admin/categories returns categories list', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });
      
      await categoriesHandler.GET(req);
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual([]);
    });
    
    test('POST /api/admin/categories creates a new category', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'Test Category',
          description: 'Test description',
          color: 'purple',
          icon: 'test-icon',
        },
      });
      
      await categoriesHandler.POST(req);
      
      expect(res._getStatusCode()).toBe(201);
    });
    
    test('GET /api/admin/categories/[id] returns a category', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });
      
      await categoryHandler.GET(req, { params: { id: '1' } });
      
      expect(res._getStatusCode()).toBe(200);
    });
    
    test('PATCH /api/admin/categories/[id] updates a category', async () => {
      const { req, res } = createMocks({
        method: 'PATCH',
        body: {
          name: 'Updated Category',
        },
      });
      
      await categoryHandler.PATCH(req, { params: { id: '1' } });
      
      expect(res._getStatusCode()).toBe(200);
    });
    
    test('DELETE /api/admin/categories/[id] deletes a category', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
      });
      
      await categoryHandler.DELETE(req, { params: { id: '1' } });
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({ success: true });
    });
  });
  
  // Test users API
  describe('Users API', () => {
    test('GET /api/admin/users returns users list', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });
      
      await usersHandler.GET(req);
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual([]);
    });
    
    test('GET /api/admin/users/[id] returns a user', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });
      
      await userHandler.GET(req, { params: { id: '1' } });
      
      expect(res._getStatusCode()).toBe(200);
    });
    
    test('PATCH /api/admin/users/[id] updates a user', async () => {
      const { req, res } = createMocks({
        method: 'PATCH',
        body: {
          name: 'Updated User',
          role: 'admin',
        },
      });
      
      await userHandler.PATCH(req, { params: { id: '1' } });
      
      expect(res._getStatusCode()).toBe(200);
    });
  });
  
  // Test analytics API
  describe('Analytics API', () => {
    test('GET /api/admin/analytics returns analytics data', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        url: '/api/admin/analytics?timeRange=30days',
      });
      
      await analyticsHandler.GET(req);
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toHaveProperty('totalSales');
      expect(JSON.parse(res._getData())).toHaveProperty('totalRevenue');
      expect(JSON.parse(res._getData())).toHaveProperty('totalUsers');
    });
  });
});
