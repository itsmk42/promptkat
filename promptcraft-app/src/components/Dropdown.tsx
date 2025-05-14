"use client";

import React, { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  optionClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  buttonClassName = '',
  menuClassName = '',
  optionClassName = ''
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

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`w-full flex items-center justify-between px-4 py-3 bg-gray-800/90 backdrop-blur-sm border ${
          isOpen ? 'border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'border-gray-700/50'
        } rounded-md text-white shadow-md hover:bg-gray-700/80 transition-all duration-200 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        } dropdown-button ${buttonClassName}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          {selectedOption ? (
            <>
              {selectedOption.icon && <span className="mr-3">{selectedOption.icon}</span>}
              <span className="font-mono text-xs">{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-gray-400 font-mono text-xs">{placeholder}</span>
          )}
        </div>
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
        <div className={`absolute z-10 w-full mt-2 bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-md shadow-xl max-h-60 overflow-auto dropdown-menu transform transition-all duration-150 ease-in-out ${menuClassName}`}>
          <ul className="py-1" role="listbox">
            {options.length === 0 ? (
              <li className="px-4 py-3 text-gray-400 text-center font-mono text-xs">No options available</li>
            ) : (
              options.map((option) => (
                <li
                  key={option.value}
                  className={`px-4 py-2.5 flex items-center hover:bg-gray-700/70 cursor-pointer transition-colors dropdown-option ${
                    value === option.value ? 'bg-gray-700/40' : ''
                  } ${optionClassName}`}
                  onClick={() => handleSelect(option.value)}
                  role="option"
                  aria-selected={value === option.value}
                >
                  {option.icon && <span className="mr-3">{option.icon}</span>}
                  <span className="text-white font-mono text-xs">{option.label}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
