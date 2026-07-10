import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-10 h-10" }: LogoProps) {
  return (
    <img
      src="/src/assets/images/goldilocks_logo_1783415335663.jpg"
      alt="Goldilocks Logo"
      className={`${className} object-contain rounded-lg`}
      referrerPolicy="no-referrer"
    />
  );
}
