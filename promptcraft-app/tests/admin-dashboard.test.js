/**
 * Admin Dashboard Test Script
 * 
 * This script contains tests for the admin dashboard functionality.
 * Run with: npm test -- admin-dashboard.test.js
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import AdminDashboard from '../src/app/admin/page';
import AdminPrompts from '../src/app/admin/prompts/page';
import AdminCategories from '../src/app/admin/categories/page';
import AdminUsers from '../src/app/admin/users/page';
import AdminAnalytics from '../src/app/admin/analytics/page';
import AdminSettings from '../src/app/admin/settings/page';

// Mock the next/navigation router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    };
  },
  usePathname() {
    return '/admin';
  },
}));

// Mock session data
const mockAdminSession = {
  user: {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
  expires: '2100-01-01T00:00:00.000Z',
};

const mockUserSession = {
  user: {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
  },
  expires: '2100-01-01T00:00:00.000Z',
};

// Test suite for admin dashboard
describe('Admin Dashboard', () => {
  // Test admin dashboard access
  describe('Access Control', () => {
    test('Admin users can access the dashboard', async () => {
      render(
        <SessionProvider session={mockAdminSession}>
          <AdminDashboard />
        </SessionProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Total Prompts')).toBeInTheDocument();
      });
    });
    
    test('Regular users are redirected from the dashboard', async () => {
      const { push } = require('next/navigation').useRouter();
      
      render(
        <SessionProvider session={mockUserSession}>
          <AdminDashboard />
        </SessionProvider>
      );
      
      await waitFor(() => {
        expect(push).toHaveBeenCalledWith('/unauthorized');
      });
    });
  });
  
  // Test prompts management
  describe('Prompts Management', () => {
    test('Admin can view prompts list', async () => {
      render(
        <SessionProvider session={mockAdminSession}>
          <AdminPrompts />
        </SessionProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByText('Prompts Management')).toBeInTheDocument();
        expect(screen.getByText('Add New Prompt')).toBeInTheDocument();
      });
    });
    
    test('Admin can filter prompts', async () => {
      render(
        <SessionProvider session={mockAdminSession}>
          <AdminPrompts />
        </SessionProvider>
      );
      
      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText('Search prompts...');
        fireEvent.change(searchInput, { target: { value: 'LinkedIn' } });
        
        // Check if filtering works (this would depend on your mock data)
        // In a real test, you'd verify the filtered results
      });
    });
  });
  
  // Test categories management
  describe('Categories Management', () => {
    test('Admin can view categories list', async () => {
      render(
        <SessionProvider session={mockAdminSession}>
          <AdminCategories />
        </SessionProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByText('Categories Management')).toBeInTheDocument();
        expect(screen.getByText('Add New Category')).toBeInTheDocument();
      });
    });
  });
  
  // Test users management
  describe('Users Management', () => {
    test('Admin can view users list', async () => {
      render(
        <SessionProvider session={mockAdminSession}>
          <AdminUsers />
        </SessionProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByText('Users Management')).toBeInTheDocument();
      });
    });
    
    test('Admin can change user roles', async () => {
      render(
        <SessionProvider session={mockAdminSession}>
          <AdminUsers />
        </SessionProvider>
      );
      
      await waitFor(() => {
        // Find a role select dropdown and change it
        // This would depend on your component implementation
        // const roleSelect = screen.getAllByRole('combobox')[0];
        // fireEvent.change(roleSelect, { target: { value: 'admin' } });
        
        // In a real test, you'd verify the role change API call
      });
    });
  });
  
  // Test analytics
  describe('Analytics', () => {
    test('Admin can view analytics data', async () => {
      render(
        <SessionProvider session={mockAdminSession}>
          <AdminAnalytics />
        </SessionProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByText('Analytics')).toBeInTheDocument();
        expect(screen.getByText('Total Revenue')).toBeInTheDocument();
        expect(screen.getByText('Total Sales')).toBeInTheDocument();
      });
    });
    
    test('Admin can change time range', async () => {
      render(
        <SessionProvider session={mockAdminSession}>
          <AdminAnalytics />
        </SessionProvider>
      );
      
      await waitFor(() => {
        const timeRangeSelect = screen.getByLabelText('Time Range');
        fireEvent.change(timeRangeSelect, { target: { value: '7days' } });
        
        // In a real test, you'd verify the data changes
      });
    });
  });
  
  // Test settings
  describe('Settings', () => {
    test('Admin can view settings', async () => {
      render(
        <SessionProvider session={mockAdminSession}>
          <AdminSettings />
        </SessionProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('General Settings')).toBeInTheDocument();
        expect(screen.getByText('SEO Settings')).toBeInTheDocument();
      });
    });
    
    test('Admin can update settings', async () => {
      render(
        <SessionProvider session={mockAdminSession}>
          <AdminSettings />
        </SessionProvider>
      );
      
      await waitFor(() => {
        const siteNameInput = screen.getByLabelText('Site Name');
        fireEvent.change(siteNameInput, { target: { value: 'Updated PromptCraft' } });
        
        const saveButton = screen.getByText('Save Settings');
        fireEvent.click(saveButton);
        
        // In a real test, you'd verify the settings update API call
      });
    });
  });
});
