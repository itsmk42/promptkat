"use client";

import React, { useState, useRef, useEffect } from 'react';

interface CryptoDropdownProps {
  currencies: string[];
  selectedCurrency: string;
  onChange: (currency: string) => void;
  disabled?: boolean;
}

const cryptoIcons: Record<string, string> = {
  BTC: '/crypto-icons/btc.svg',
  ETH: '/crypto-icons/eth.svg',
  LTC: '/crypto-icons/ltc.svg',
  USDT: '/crypto-icons/usdt.svg',
  XRP: '/crypto-icons/xrp.svg',
  // Add more crypto icons as needed
};

const CryptoDropdown: React.FC<CryptoDropdownProps> = ({
  currencies,
  selectedCurrency,
  onChange,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleSelect = (currency: string) => {
    onChange(currency);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`w-full flex items-center justify-between px-4 py-3 bg-gray-800/90 backdrop-blur-sm border ${
          isOpen ? 'border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'border-gray-700/50'
        } rounded-md text-white shadow-md hover:bg-gray-700/80 transition-all duration-200 dropdown-button ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          {cryptoIcons[selectedCurrency] ? (
            <img
              src={cryptoIcons[selectedCurrency]}
              alt={selectedCurrency}
              className="w-6 h-6 mr-3 crypto-icon"
            />
          ) : (
            <div className="w-6 h-6 mr-3 bg-gray-700 rounded-md flex items-center justify-center text-xs font-mono">
              {selectedCurrency.substring(0, 1)}
            </div>
          )}
          <span className="font-mono text-xs">{selectedCurrency}</span>
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
        <div className="absolute z-10 w-full mt-2 bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-md shadow-xl max-h-60 overflow-auto dropdown-menu crypto-dropdown-menu transform transition-all duration-150 ease-in-out">
          <ul className="py-1" role="listbox">
            {currencies.length === 0 ? (
              <li className="px-4 py-3 text-gray-400 text-center font-mono text-xs">Loading currencies...</li>
            ) : (
              currencies.map((currency) => (
                <li
                  key={currency}
                  className={`px-4 py-2.5 flex items-center hover:bg-gray-700/70 cursor-pointer transition-colors dropdown-option ${
                    selectedCurrency === currency ? 'bg-gray-700/40' : ''
                  }`}
                  onClick={() => handleSelect(currency)}
                  role="option"
                  aria-selected={selectedCurrency === currency}
                >
                  {cryptoIcons[currency] ? (
                    <img
                      src={cryptoIcons[currency]}
                      alt={currency}
                      className="w-6 h-6 mr-3 crypto-icon"
                    />
                  ) : (
                    <div className="w-6 h-6 mr-3 bg-gray-700 rounded-md flex items-center justify-center text-xs font-mono">
                      {currency.substring(0, 1)}
                    </div>
                  )}
                  <span className="text-white font-mono text-xs">{currency}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CryptoDropdown;
