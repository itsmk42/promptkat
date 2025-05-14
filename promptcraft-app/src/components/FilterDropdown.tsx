"use client";

import React, { useState, useRef, useEffect } from 'react';

interface FilterOption {
  name: string;
  value: string;
}

interface FilterDropdownProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  value,
  onChange,
  label,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(option => option.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Determine color based on selected option
  const getOptionColor = (optionValue: string) => {
    switch(optionValue) {
      case 'creative writing':
        return 'text-purple-400';
      case 'marketing':
        return 'text-pink-400';
      case 'programming':
        return 'text-orange-400';
      case 'personal development':
        return 'text-yellow-400';
      case 'business':
        return 'text-blue-400';
      case 'education':
        return 'text-green-400';
      case 'design':
        return 'text-teal-400';
      case 'lifestyle':
        return 'text-red-400';
      case 'text':
        return 'text-indigo-400';
      case 'image':
        return 'text-emerald-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className="block text-xs font-medium text-gray-400 mb-1 font-mono">{label}</label>
      <button
        type="button"
        className={`w-full flex items-center justify-between px-4 py-2.5 bg-gray-800/90 backdrop-blur-sm border ${
          isOpen ? 'border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'border-gray-700/50'
        } rounded-md text-white shadow-md hover:bg-gray-700/80 transition-all duration-200 text-left`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`font-mono text-xs ${value !== 'all' ? getOptionColor(value) : 'text-white'}`}>
          {selectedOption?.name || 'Select option'}
        </span>
        <svg 
          className={`w-4 h-4 text-purple-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-md shadow-xl max-h-60 overflow-auto transform transition-all duration-150 ease-in-out">
          <ul className="py-1" role="listbox">
            {options.map((option) => (
              <li 
                key={option.value}
                className={`px-4 py-2 flex items-center hover:bg-gray-700/70 cursor-pointer transition-colors ${
                  value === option.value ? 'bg-gray-700/40' : ''
                }`}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={value === option.value}
              >
                <span className={`font-mono text-xs ${option.value !== 'all' ? getOptionColor(option.value) : 'text-white'}`}>
                  {option.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
