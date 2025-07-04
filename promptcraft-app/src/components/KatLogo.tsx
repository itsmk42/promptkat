import React from 'react';

interface KatLogoProps {
  className?: string;
  size?: number;
}

const KatLogo: React.FC<KatLogoProps> = ({ className = "", size = 40 }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dark cat silhouette */}
        <path d="M200 150C100 200 50 350 50 450C50 550 100 650 200 750C300 750 400 750 500 750C600 650 700 550 700 450C700 350 650 200 550 150C450 150 300 150 200 150Z" fill="#0F172A"/>

        {/* Cat ears */}
        <path d="M200 150L100 50C100 50 150 100 200 150Z" fill="#0F172A"/>
        <path d="M550 150L650 50C650 50 600 100 550 150Z" fill="#0F172A"/>

        {/* Cat body curves */}
        <path d="M200 750C150 650 150 550 200 450C250 350 300 300 350 250C400 200 450 200 500 250C550 300 600 350 650 450C700 550 700 650 650 750" fill="#0F172A"/>

        {/* Cat tail */}
        <path d="M650 750C700 700 750 650 750 600C750 550 700 500 650 500C600 500 550 550 550 600C550 650 600 700 650 750Z" fill="#0F172A"/>

        {/* Cat eyes */}
        <ellipse cx="250" cy="300" rx="50" ry="70" fill="#C4B5FD"/>
        <ellipse cx="500" cy="300" rx="50" ry="70" fill="#C4B5FD"/>

        {/* Cat mouth */}
        <path d="M350 400C375 425 425 425 450 400" stroke="#0F172A" strokeWidth="5"/>
      </svg>
    </div>
  );
};

export default KatLogo;
