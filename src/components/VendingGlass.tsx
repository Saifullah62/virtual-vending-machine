import React from 'react';

export function VendingGlass() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Glass Reflection Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-[0.02]" />
      
      {/* Glass Border */}
      <div className="absolute inset-0 border-2 border-gray-700 rounded-lg" />
      
      {/* Corner Screws */}
      {[
        'top-2 left-2',
        'top-2 right-2',
        'bottom-2 left-2',
        'bottom-2 right-2'
      ].map((position, index) => (
        <div
          key={index}
          className={`absolute w-3 h-3 bg-gray-600 rounded-full ${position}`}
        >
          <div className="absolute inset-[2px] bg-gray-700 rounded-full" />
        </div>
      ))}
    </div>
  );
}