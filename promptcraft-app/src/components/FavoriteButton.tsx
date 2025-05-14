"use client";
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface FavoriteButtonProps {
  promptId: string;
  initialFavorited?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  promptId,
  initialFavorited = false,
  className = '',
  size = 'md',
  showText = false
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isLoading, setIsLoading] = useState(false);

  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Handle favorite toggle
  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if button is inside a link
    e.stopPropagation(); // Prevent event bubbling
    
    if (!session?.user) {
      // Redirect to login if not authenticated
      router.push('/login?callbackUrl=' + encodeURIComponent(`/prompts/${promptId}`));
      return;
    }

    setIsLoading(true);
    
    try {
      // This would be an API call in a real application
      // For now, we'll just toggle the state locally
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setIsFavorited(!isFavorited);
      
      // Show a toast or notification here
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`group flex items-center justify-center ${className}`}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      {isLoading ? (
        <svg className={`animate-spin ${sizeClasses[size]} text-gray-400`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          <svg 
            className={`${sizeClasses[size]} ${isFavorited ? 'text-pink-500 fill-current' : 'text-gray-400 group-hover:text-pink-400'}`} 
            viewBox="0 0 24 24"
            fill={isFavorited ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {showText && (
            <span className={`ml-1 ${isFavorited ? 'text-pink-500' : 'text-gray-400 group-hover:text-pink-400'}`}>
              {isFavorited ? 'Favorited' : 'Favorite'}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default FavoriteButton;
