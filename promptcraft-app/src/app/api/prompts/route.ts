import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/prompts - Get all prompts with filtering options
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const category = searchParams.get('category') || undefined;
    const type = searchParams.get('type') || undefined;
    const sort = searchParams.get('sort') || 'newest';
    const search = searchParams.get('search') || undefined;
    const featured = searchParams.get('featured') === 'true' ? true : undefined;

    // Set a very high limit to ensure all prompts are returned
    const limit = parseInt(searchParams.get('limit') || '1000');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    console.log('API Query Parameters:', {
      category, type, sort, search, featured, limit, page, skip
    });

    // Build where clause for filtering
    const where: any = {};

    if (category && category !== 'all') {
      where.category = {
        name: {
          equals: category,
          mode: 'insensitive'
        }
      };
    }

    if (type && type !== 'all') {
      where.type = {
        equals: type,
        mode: 'insensitive'
      };
    }

    if (featured !== undefined) {
      where.featured = featured;
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          content: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ];
    }

    // Build orderBy clause for sorting
    let orderBy: any = {};

    switch (sort) {
      case 'popular':
        orderBy = { _count: { purchases: 'desc' } };
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      case 'rating':
        orderBy = { rating: 'desc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    // Get total count for pagination
    const total = await prisma.prompt.count({ where });
    console.log('Total prompts in database:', total);

    // Get prompts with filtering, sorting, and pagination
    const prompts = await prisma.prompt.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        category: {
          select: {
            name: true,
            color: true
          }
        },
        tags: {
          select: {
            name: true
          }
        },
        author: {
          select: {
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            purchases: true,
            favorites: true
          }
        }
      }
    });

    console.log('Prompts fetched from database:', prompts.length);

    // Format the response
    const formattedPrompts = prompts.map(prompt => ({
      id: prompt.id,
      title: prompt.title,
      description: prompt.description,
      content: prompt.content,
      price: prompt.price,
      type: prompt.type,
      featured: prompt.featured,
      category: prompt.category.name,
      categoryColor: prompt.category.color || '#6366F1',
      tags: prompt.tags.map(tag => tag.name),
      author: prompt.author?.name || 'Anonymous',
      authorImage: prompt.author?.image || '/images/default-avatar.png',
      rating: prompt.rating || 4.5, // Default rating if not set
      reviews: prompt._count.purchases || 0,
      favorites: prompt._count.favorites || 0,
      createdAt: prompt.createdAt,
      updatedAt: prompt.updatedAt
    }));

    return NextResponse.json({
      prompts: formattedPrompts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error: any) {
    console.error('Error fetching prompts:', error);
    return NextResponse.json({ error: 'Failed to fetch prompts' }, { status: 500 });
  }
}
