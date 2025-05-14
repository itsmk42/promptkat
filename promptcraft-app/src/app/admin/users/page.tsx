"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
  purchaseCount: number;
  totalSpent: number;
}

export default function AdminUsers() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/admin/users');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin' && session?.user?.role !== 'superadmin') {
      router.push('/unauthorized');
    }
  }, [status, session, router]);
  
  // Fetch users
  useEffect(() => {
    if (status === 'authenticated' && (session?.user?.role === 'admin' || session?.user?.role === 'superadmin')) {
      // For now, we'll use mock data
      // In a real app, you would fetch this data from your API
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
          emailVerified: true,
          createdAt: '2023-04-15',
          purchaseCount: 5,
          totalSpent: 49.95
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'user',
          emailVerified: true,
          createdAt: '2023-04-20',
          purchaseCount: 3,
          totalSpent: 29.97
        },
        {
          id: '3',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          emailVerified: true,
          createdAt: '2023-03-10',
          purchaseCount: 0,
          totalSpent: 0
        },
        {
          id: '4',
          name: 'Bob Johnson',
          email: 'bob@example.com',
          role: 'user',
          emailVerified: false,
          createdAt: '2023-05-01',
          purchaseCount: 1,
          totalSpent: 9.99
        },
        {
          id: '5',
          name: 'Alice Williams',
          email: 'alice@example.com',
          role: 'user',
          emailVerified: true,
          createdAt: '2023-05-05',
          purchaseCount: 2,
          totalSpent: 22.98
        },
      ];
      
      setUsers(mockUsers);
      setLoading(false);
    }
  }, [status, session]);
  
  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      // Search filter
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Role filter
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      // Sort
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'purchases':
          return b.purchaseCount - a.purchaseCount;
        case 'spent':
          return b.totalSpent - a.totalSpent;
        default:
          return 0;
      }
    });
  
  // Handle role change
  const handleRoleChange = (id: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ));
    
    // In a real app, you would call your API to update the user's role
    // Example: await fetch(`/api/admin/users/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role: newRole }) });
  };
  
  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-white">Users Management</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-10 bg-gray-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="h-60 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-white">Users Management</h1>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-4">
          {/* Filters */}
          <div className="bg-gray-800 p-4 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-400">Search</label>
                <input
                  type="text"
                  id="search"
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Role filter */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-400">Role</label>
                <select
                  id="role"
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
              
              {/* Sort */}
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-400">Sort By</label>
                <select
                  id="sort"
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="name">Name</option>
                  <option value="purchases">Most Purchases</option>
                  <option value="spent">Most Spent</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Users table */}
          <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Purchases
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-400">
                        No users found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
                              {user.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{user.name}</div>
                              <div className="text-sm text-gray-400">{user.email}</div>
                              <div className="text-xs text-gray-500">Joined {new Date(user.createdAt).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.emailVerified ? (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900/30 text-green-400 border border-green-800/50">
                              Verified
                            </span>
                          ) : (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-900/30 text-yellow-400 border border-yellow-800/50">
                              Unverified
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            className="block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white text-sm"
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            disabled={user.id === session?.user?.id} // Prevent changing own role
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            {session?.user?.role === 'superadmin' && (
                              <option value="superadmin">Super Admin</option>
                            )}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{user.purchaseCount} purchases</div>
                          <div className="text-sm text-gray-400">${user.totalSpent.toFixed(2)} spent</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link href={`/admin/users/${user.id}`} className="text-purple-400 hover:text-purple-300">
                              View
                            </Link>
                            <Link href={`/admin/users/${user.id}/purchases`} className="text-blue-400 hover:text-blue-300">
                              Purchases
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
