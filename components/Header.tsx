
import React from 'react';

const FoodIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 13.5a1 1 0 01-2 0V9a1 1 0 012 0v4.5zm4 0a1 1 0 01-2 0V9a1 1 0 012 0v4.5z"/>
        <path fillRule="evenodd" d="M10 4a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 100-8 4 4 0 000 8z" clipRule="evenodd" />
        <path d="M10 5a.5.5 0 01.5.5v2.5a.5.5 0 01-1 0V5.5A.5.5 0 0110 5zM6 10a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 016 10z"/>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-base-200/50 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.002 8.002 0 0117.657 18.657z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
            <h1 className="text-2xl font-bold tracking-tight text-base-content">
              AIFoodie
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
