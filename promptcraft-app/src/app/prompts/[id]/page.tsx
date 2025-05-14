"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useParams } from 'next/navigation';
import FavoriteButton from '@/components/FavoriteButton';

// Sample prompt data - in a real app, this would come from an API or database
const promptsData = [
  {
    id: '1',
    title: 'Professional LinkedIn Profile Writer',
    description: 'Create a compelling LinkedIn profile that highlights your professional achievements and attracts recruiters.',
    category: 'Marketing',
    categoryColor: 'pink',
    price: 9.99,
    rating: 4.8,
    reviews: 124,
    author: 'CareerBoost AI',
    dateCreated: '2023-09-15',
    compatibility: ['ChatGPT', 'Claude', 'Gemini'],
    tags: ['LinkedIn', 'Career', 'Professional'],
    longDescription: `This premium prompt helps you craft a LinkedIn profile that stands out from the crowd. It guides AI to create compelling content for every section of your profile, including:

- Attention-grabbing headlines that include keywords recruiters search for
- Professional summaries that showcase your unique value proposition
- Experience descriptions that highlight achievements rather than just responsibilities
- Skills sections optimized for LinkedIn's algorithm
- Education entries that emphasize relevant coursework and accomplishments

The prompt includes specific instructions for tailoring content to different industries and career levels, from entry-level positions to C-suite executives.`,
    promptPreview: `I need to create a compelling LinkedIn profile. My name is [NAME] and I work as a [POSITION] in the [INDUSTRY] industry with [X] years of experience. My key skills include [SKILL 1], [SKILL 2], and [SKILL 3]. My career achievements include [ACHIEVEMENT 1] and [ACHIEVEMENT 2]. I'm looking to [CAREER GOAL].

Please help me write:
1. A headline that includes relevant keywords (max 220 characters)
2. A professional summary that showcases my value (max 2,600 characters)
3. Bullet points for my current role that emphasize achievements
4. A list of 10 relevant skills to include
5. A recommendation for how to describe my education

Optimize all content for LinkedIn's algorithm while maintaining a professional, confident tone that's not overly boastful.`,
    examples: [
      {
        title: 'Marketing Professional Example',
        content: `Headline: "Digital Marketing Strategist | Driving Growth Through Data-Driven Campaigns | SEO, PPC & Content Marketing Specialist"

Summary: "Results-oriented digital marketing professional with 7+ years of experience developing comprehensive marketing strategies that align with business objectives and drive measurable results. Proven track record of increasing organic traffic by 200% and reducing customer acquisition costs by 35% through optimized campaigns. Expertise in SEO, PPC advertising, content marketing, and analytics, with a passion for staying ahead of digital marketing trends and algorithm updates.

I help brands cut through the noise with data-backed strategies that connect with their target audience and convert prospects into loyal customers. My analytical approach combined with creative problem-solving allows me to identify opportunities others miss.

Specialties:
• Search Engine Optimization (SEO)
• Pay-Per-Click (PPC) Campaign Management
• Content Strategy Development
• Marketing Analytics & Reporting
• Conversion Rate Optimization
• A/B Testing & Experimentation"`,
        image: null
      }
    ],
    type: 'text'
  },
  {
    id: '2',
    title: 'Photorealistic Product Visualization',
    description: 'Generate stunning, photorealistic 3D product renders for marketing materials and presentations.',
    category: 'Design',
    categoryColor: 'teal',
    price: 14.99,
    rating: 4.9,
    reviews: 87,
    author: 'VisualCraft Pro',
    dateCreated: '2023-10-22',
    compatibility: ['Midjourney', 'DALL-E', 'Stable Diffusion'],
    tags: ['Product', 'Visualization', '3D', 'Marketing'],
    longDescription: `This premium prompt template helps you create stunning, photorealistic 3D product visualizations that are perfect for marketing materials, e-commerce listings, and presentations. The prompt is specifically engineered to:

- Generate ultra-realistic product renders with proper lighting, shadows, and reflections
- Create context-appropriate environments that showcase your product's features
- Produce multiple angles and perspectives of your product
- Highlight specific features with close-up detail shots
- Generate lifestyle images showing the product in use

The prompt works with Midjourney, DALL-E, and Stable Diffusion, with specific parameter adjustments for each platform to achieve the best results.`,
    promptPreview: `Create a photorealistic product visualization of a [PRODUCT TYPE] with the following specifications:

Product details:
- Material: [MATERIAL]
- Color: [COLOR]
- Key features: [FEATURE 1], [FEATURE 2]
- Brand style: [MINIMAL/LUXURY/TECHNICAL/ETC]

Environment:
- Setting: [STUDIO/LIFESTYLE/ENVIRONMENT]
- Lighting: [SOFT/DRAMATIC/NATURAL/ETC]
- Background: [SIMPLE/CONTEXTUAL/GRADIENT/ETC]

Technical specifications:
- Ultra-detailed, product photography
- 8k resolution
- Professional lighting setup with [MAIN LIGHT SOURCE]
- [FRONT VIEW/ANGLE VIEW/TOP VIEW]
- Shallow depth of field
- Product centered in frame

Style references: professional product photography, commercial advertising, [SPECIFIC STYLE REFERENCE]`,
    examples: [
      {
        title: 'Headphones Visualization',
        content: null,
        image: '/images/placeholder-image.svg'
      },
      {
        title: 'Watch Visualization',
        content: null,
        image: '/images/placeholder-image.svg'
      },
      {
        title: 'Sneaker Visualization',
        content: null,
        image: '/images/placeholder-image.svg'
      }
    ],
    type: 'image'
  },
  {
    id: '3',
    title: 'Advanced SQL Query Generator',
    description: 'Generate optimized SQL queries for complex database operations and data analysis.',
    category: 'Programming',
    categoryColor: 'orange',
    price: 12.99,
    rating: 4.7,
    reviews: 56,
    author: 'DataQuery Pro',
    dateCreated: '2023-11-05',
    compatibility: ['ChatGPT', 'Claude', 'Bard'],
    tags: ['SQL', 'Database', 'Data Analysis'],
    longDescription: `This premium prompt helps you generate optimized SQL queries for complex database operations and data analysis tasks. It's designed to:

- Create efficient queries that follow best practices for performance
- Handle complex joins, subqueries, and window functions
- Generate queries for specific database systems (MySQL, PostgreSQL, SQL Server, etc.)
- Include helpful comments explaining the query logic
- Provide alternative approaches when relevant

Whether you're a database administrator, data analyst, or developer, this prompt will help you write SQL that is both functional and optimized.`,
    promptPreview: `I need to create an SQL query for a [DATABASE_TYPE] database with the following requirements:

Database schema:
- Table 1: [TABLE_NAME] with columns [COLUMN1], [COLUMN2], etc.
- Table 2: [TABLE_NAME] with columns [COLUMN1], [COLUMN2], etc.
- Relationship: [DESCRIBE RELATIONSHIP BETWEEN TABLES]

Query requirements:
- I need to [DESCRIBE WHAT YOU WANT TO ACCOMPLISH]
- The query should filter for [SPECIFIC CONDITIONS]
- Results should be grouped by [GROUP BY CRITERIA]
- Results should be ordered by [ORDER CRITERIA]
- Performance considerations: [ANY SPECIFIC PERFORMANCE NEEDS]

Please provide:
1. An optimized SQL query that meets these requirements
2. Brief explanation of the query logic
3. Any indexes that would improve performance
4. Alternative approaches if relevant`,
    examples: [
      {
        title: 'E-commerce Sales Analysis Query',
        content: `-- Query to analyze monthly sales performance by product category
-- with comparison to previous month and filtering for high-value orders

WITH monthly_sales AS (
    SELECT
        DATE_TRUNC('month', o.order_date) AS sales_month,
        pc.category_name,
        SUM(oi.quantity * oi.unit_price) AS total_sales,
        COUNT(DISTINCT o.order_id) AS order_count
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    JOIN product_categories pc ON p.category_id = pc.category_id
    WHERE o.order_status = 'Completed'
    AND o.order_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '12 months')
    GROUP BY DATE_TRUNC('month', o.order_date), pc.category_name
),
previous_month_sales AS (
    SELECT
        (DATE_TRUNC('month', sales_month) + INTERVAL '1 month') AS next_month,
        category_name,
        total_sales AS prev_month_sales
    FROM monthly_sales
)

SELECT
    ms.sales_month,
    ms.category_name,
    ms.total_sales,
    ms.order_count,
    pms.prev_month_sales,
    CASE
        WHEN pms.prev_month_sales IS NULL OR pms.prev_month_sales = 0 THEN NULL
        ELSE ROUND(((ms.total_sales - pms.prev_month_sales) / pms.prev_month_sales) * 100, 2)
    END AS percentage_change
FROM monthly_sales ms
LEFT JOIN previous_month_sales pms
    ON ms.sales_month = pms.next_month
    AND ms.category_name = pms.category_name
ORDER BY ms.sales_month DESC, ms.total_sales DESC;

/*
Explanation:
- This query uses CTEs to first calculate monthly sales by product category
- Then it creates a previous_month_sales CTE to enable month-over-month comparison
- The main query joins these together to show the percentage change
- Results are ordered by month (newest first) and then by highest sales

Recommended indexes:
- orders(order_date, order_status)
- order_items(order_id, product_id)
- products(product_id, category_id)
*/`,
        image: null
      }
    ],
    type: 'text'
  }
];

export default function PromptDetailPage() {
  const params = useParams();
  const promptId = params.id as string;

  // Find the prompt data based on the ID
  const promptData = promptsData.find(prompt => prompt.id === promptId);

  // State for copy button
  const [copied, setCopied] = useState(false);

  // Handle copy to clipboard
  const handleCopy = () => {
    if (promptData) {
      navigator.clipboard.writeText(promptData.promptPreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // If prompt not found
  if (!promptData) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
          <h1 className="text-4xl font-bold mb-4">Prompt Not Found</h1>
          <p className="text-gray-400 mb-8">The prompt you're looking for doesn't exist or has been removed.</p>
          <Link href="/prompts" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition">
            Browse Prompts
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/prompts" className="hover:text-white transition">Prompts</Link>
              <span className="mx-2">/</span>
              <Link href={`/categories/${promptData.category.toLowerCase()}`} className="hover:text-white transition">{promptData.category}</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-300">{promptData.title}</span>
            </div>
          </div>

          {/* Prompt Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{promptData.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{promptData.description}</p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${promptData.categoryColor}-500/20 text-${promptData.categoryColor}-400`}>
                  {promptData.category}
                </span>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < Math.floor(promptData.rating) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-300">{promptData.rating} ({promptData.reviews} reviews)</span>
                </div>
                <span className="text-gray-400">By {promptData.author}</span>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex-1 min-w-[200px]">
                  <button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition flex items-center justify-center"
                    onClick={() => alert('Purchase functionality coming soon!')}
                  >
                    <span className="mr-2">Buy for ${promptData.price}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 min-w-[200px] flex gap-2">
                  <button
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center"
                    onClick={handleCopy}
                  >
                    <span className="mr-2">{copied ? 'Copied!' : 'Copy Prompt'}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                  <div className="bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center px-4">
                    <FavoriteButton
                      promptId={promptData.id}
                      size="lg"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Compatible With</h2>
                <div className="flex flex-wrap gap-2">
                  {promptData.compatibility.map((platform, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {promptData.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/3 bg-gray-800/40 rounded-xl p-6 border border-gray-700 h-fit">
              <h2 className="text-xl font-bold mb-4">Prompt Preview</h2>
              <div className="bg-gray-900 rounded-lg p-4 mb-4 text-gray-300 text-sm font-mono whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                {promptData.promptPreview}
              </div>
              <div className="text-xs text-gray-400">
                This is a preview of the prompt template. Purchase to get the full version with detailed instructions and variations.
              </div>
            </div>
          </div>

          {/* Prompt Description */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">About This Prompt</h2>
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <div className="prose prose-invert max-w-none">
                {promptData.longDescription.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n- ');
                    return (
                      <ul key={index} className="list-disc pl-5 mb-4">
                        {items.map((item, i) => (
                          <li key={i}>{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={index} className="mb-4">{paragraph}</p>;
                })}
              </div>
            </div>
          </div>

          {/* Examples Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promptData.examples.map((example, index) => (
                <div key={index} className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all">
                  {example.image && (
                    <div className="relative h-48 w-full group">
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
                      <Image
                        src={example.image}
                        alt={example.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform group-hover:scale-105"
                        onError={(e) => {
                          // Fallback to placeholder on error
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder-image.svg';
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h3 className="font-bold text-white text-lg drop-shadow-lg">{example.title}</h3>
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    {!example.image && <h3 className="font-bold mb-2">{example.title}</h3>}
                    {example.content && (
                      <div className="bg-gray-900 rounded-lg p-3 text-gray-300 text-xs font-mono max-h-[200px] overflow-y-auto">
                        {example.content}
                      </div>
                    )}
                    {!example.content && example.image && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Generated with {promptData.compatibility[0]}</span>
                        <button
                          className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full transition"
                          onClick={() => alert('View full size image coming soon!')}
                        >
                          View Full Size
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Prompts */}
          <div>
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {promptsData
                .filter(p => p.id !== promptId)
                .slice(0, 3)
                .map((prompt, index) => (
                  <Link href={`/prompts/${prompt.id}`} key={index} className="bg-gray-800/40 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all">
                    <h3 className="font-bold text-lg mb-2">{prompt.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{prompt.description}</p>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded-full text-xs bg-${prompt.categoryColor}-500/20 text-${prompt.categoryColor}-400`}>
                        {prompt.category}
                      </span>
                      <span className="font-bold text-purple-400">${prompt.price}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
