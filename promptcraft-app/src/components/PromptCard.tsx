import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  price: number;
  rating: number;
  reviews: number;
  type: 'text' | 'image';
  image?: string;
}

const PromptCard: React.FC<PromptCardProps> = ({
  id,
  title,
  description,
  category,
  categoryColor,
  price,
  rating,
  reviews,
  type,
  image
}) => {
  return (
    <Link href={`/prompts/${id}`} className="group block h-full">
      <div className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all h-full flex flex-col relative">
        {type === 'text' && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-20 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden xs:inline">Text</span> Prompt
          </div>
        )}
        {type === 'image' && (
          <div className="relative h-40 xs:h-48 w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="transition-transform group-hover:scale-105"
                onError={(e) => {
                  // Fallback to placeholder on error
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder-image.svg';
                }}
              />
            ) : (
              <Image
                src="/images/placeholder-image.svg"
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="transition-transform group-hover:scale-105"
              />
            )}
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-20 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="hidden xs:inline">Image</span> Prompt
            </div>
          </div>
        )}
        <div className="p-4 sm:p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
            <span className={`px-2 py-1 rounded-full text-xs inline-block ${
              categoryColor === 'purple' ? 'bg-purple-500/20 text-purple-400' :
              categoryColor === 'pink' ? 'bg-pink-500/20 text-pink-400' :
              categoryColor === 'orange' ? 'bg-orange-500/20 text-orange-400' :
              categoryColor === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
              categoryColor === 'green' ? 'bg-green-500/20 text-green-400' :
              categoryColor === 'blue' ? 'bg-blue-500/20 text-blue-400' :
              categoryColor === 'teal' ? 'bg-teal-500/20 text-teal-400' :
              categoryColor === 'red' ? 'bg-red-500/20 text-red-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {category}
            </span>
            <span className="font-bold text-purple-400">${price.toFixed(2)}</span>
          </div>
          <h3 className="font-bold text-base sm:text-lg mb-2 group-hover:text-purple-400 transition line-clamp-2">{title}</h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-4 flex-grow line-clamp-3">{description}</p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-400">({reviews})</span>
            </div>
            <div className="flex items-center">
              {type === 'text' ? (
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ) : (
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
              <span className="text-xs text-gray-500 uppercase">{type}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PromptCard;