import React from 'react';

const Logo: React.FC = () => {
  return (
    <svg 
      width="48" 
      height="48" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="#4f46e5" strokeWidth="2"/>
      <path 
        d="M19.364 4.636A10 10 0 0 0 4.636 19.364" 
        stroke="white" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      <path 
        d="M12 9a3 3 0 1 1 0 6a3 3 0 0 1 0-6Z"
        fill="#4f46e5"
      />
    </svg>
  );
};

export default Logo;