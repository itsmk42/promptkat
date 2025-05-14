"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Sample search results for demonstration
const sampleSearchResults = [
  {
    id: '1',
    title: 'Professional LinkedIn Profile Writer',
    category: 'Marketing',
    type: 'text'
  },
  {
    id: '2',
    title: 'Photorealistic Product Visualization',
    category: 'Design',
    type: 'image'
  },
  {
    id: '3',
    title: 'Code Debugging Assistant',
    category: 'Programming',
    type: 'text'
  }
];

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  fullWidth?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = '',
  placeholder = 'Search prompts...',
  fullWidth = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      setIsSearching(true);
      // Simulate API call with timeout
      setTimeout(() => {
        // Filter sample results based on query
        const filteredResults = sampleSearchResults.filter(
          result => result.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
        setIsSearching(false);
        setShowResults(true);
      }, 300);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowResults(false);
    }
  };

  return (
    <div className={`relative ${fullWidth ? 'w-full' : 'max-w-xs sm:max-w-sm md:max-w-md'} ${className}`} ref={searchRef}>
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 pl-8 text-xs font-mono"
            placeholder={placeholder}
            aria-label="Search"
          />
          <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 p-0.5"
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
                setShowResults(false);
              }}
              aria-label="Clear search"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute z-50 mt-2 w-full bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-md shadow-xl overflow-hidden max-h-[80vh] sm:max-h-[60vh] overflow-y-auto font-mono transform transition-all duration-150 ease-in-out">
          {isSearching ? (
            <div className="p-4 text-center text-gray-400 text-xs">
              <div className="w-10 h-10 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="animate-spin h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              searching_results()
            </div>
          ) : searchResults.length > 0 ? (
            <div>
              <div className="p-3 border-b border-gray-700/50 bg-gradient-to-r from-purple-900/30 to-gray-800/30">
                <h3 className="text-xs font-medium text-gray-300 font-mono">quick_results()</h3>
              </div>
              <ul className="py-1">
                {searchResults.map((result) => (
                  <li key={result.id} className="border-b border-gray-700/20 last:border-b-0">
                    <Link
                      href={`/prompts/${result.id}`}
                      className="block px-4 py-2.5 hover:bg-gray-700/70 active:bg-gray-600/70 transition"
                      onClick={() => setShowResults(false)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="pr-2">
                          <h4 className="text-white font-medium text-xs line-clamp-1">{result.title}</h4>
                          <p className="text-gray-400 text-[10px]">{result.category}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 bg-gray-700/70 rounded-md whitespace-nowrap ${
                          result.type === 'text' ? 'text-indigo-400' : 'text-emerald-400'
                        }`}>
                          {result.type === 'text' ? 'text()' : 'image()'}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="p-3 bg-gradient-to-r from-purple-900/20 to-gray-800/20 border-t border-gray-700/30">
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery)}`}
                  className="text-purple-400 hover:text-purple-300 active:text-purple-500 text-xs font-medium flex items-center justify-center font-mono group"
                  onClick={() => setShowResults(false)}
                >
                  view_all_results()
                  <svg className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center">
              <div className="w-10 h-10 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-gray-400 text-xs font-mono">no_results_found("<span className="text-purple-400">{searchQuery}</span>")</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
