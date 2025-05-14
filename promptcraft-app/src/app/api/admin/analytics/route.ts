import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminApiAuth } from '@/middleware/adminAuth';

const prisma = new PrismaClient();

// GET /api/admin/analytics - Get analytics data (admin only)
export async function GET(request: NextRequest) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    // Get time range from query params
    const url = new URL(request.url);
    const timeRange = url.searchParams.get('timeRange') || '30days';
    
    // Calculate start date based on time range
    const now = new Date();
    let startDate = new Date(now);
    
    switch (timeRange) {
      case '7days':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30days':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90days':
        startDate.setDate(now.getDate() - 90);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'all':
        startDate = new Date(0); // Beginning of time
        break;
      default:
        startDate.setDate(now.getDate() - 30); // Default to 30 days
    }
    
    // Get total sales and revenue
    const salesData = await prisma.purchase.findMany({
      where: {
        purchaseDate: {
          gte: startDate,
        },
        status: 'completed',
      },
      select: {
        id: true,
        price: true,
        purchaseDate: true,
      },
    });
    
    const totalSales = salesData.length;
    const totalRevenue = salesData.reduce((sum, purchase) => sum + purchase.price, 0);
    
    // Get sales by date
    const salesByDate = new Map();
    
    // Initialize all dates in the range with zero values
    for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split('T')[0];
      salesByDate.set(dateString, { date: dateString, count: 0, amount: 0 });
    }
    
    // Fill in actual sales data
    salesData.forEach(purchase => {
      const dateString = purchase.purchaseDate.toISOString().split('T')[0];
      const existingData = salesByDate.get(dateString) || { date: dateString, count: 0, amount: 0 };
      
      existingData.count += 1;
      existingData.amount += purchase.price;
      
      salesByDate.set(dateString, existingData);
    });
    
    // Convert Map to Array and sort by date
    const salesDataArray = Array.from(salesByDate.values()).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Get sales by category
    const categorySales = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        color: true,
        prompts: {
          select: {
            purchases: {
              where: {
                purchaseDate: {
                  gte: startDate,
                },
                status: 'completed',
              },
              select: {
                price: true,
              },
            },
          },
        },
      },
    });
    
    const categoryData = categorySales.map(category => {
      const count = category.prompts.reduce((sum, prompt) => sum + prompt.purchases.length, 0);
      const revenue = category.prompts.reduce((sum, prompt) => 
        sum + prompt.purchases.reduce((purchaseSum, purchase) => purchaseSum + purchase.price, 0), 0
      );
      
      return {
        name: category.name,
        count,
        revenue,
        color: category.color,
      };
    }).sort((a, b) => b.revenue - a.revenue);
    
    // Get user growth data
    const userData = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        createdAt: true,
      },
    });
    
    const usersByDate = new Map();
    
    // Initialize all dates in the range with zero values
    for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split('T')[0];
      usersByDate.set(dateString, { date: dateString, count: 0 });
    }
    
    // Fill in actual user data
    userData.forEach(user => {
      const dateString = user.createdAt.toISOString().split('T')[0];
      const existingData = usersByDate.get(dateString) || { date: dateString, count: 0 };
      
      existingData.count += 1;
      
      usersByDate.set(dateString, existingData);
    });
    
    // Convert Map to Array and sort by date
    const userDataArray = Array.from(usersByDate.values()).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Get total users and new users
    const totalUsers = await prisma.user.count();
    const newUsers = userData.length;
    
    return NextResponse.json({
      totalSales,
      totalRevenue,
      totalUsers,
      newUsers,
      salesData: salesDataArray,
      categoryData,
      userData: userDataArray,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
