
import React from 'react';

const BananaIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.982 19.982a.75.75 0 0 1-1.06 0L3.939 5.001a.75.75 0 0 1 1.06-1.06l14.983 14.982a.75.75 0 0 1 0 1.06Z" />
        <path fillRule="evenodd" d="M3.25 10.2a9.721 9.721 0 0 1 8.204-9.693.75.75 0 0 1 .846.657l.084.417a.75.75 0 0 1-.417.846 8.221 8.221 0 0 0-7.01 8.232.75.75 0 0 1-1.402.392.75.75 0 0 1-.305-.751Zm15.541 5.342a.75.75 0 0 1 .305.751 9.721 9.721 0 0 1-8.204 9.693.75.75 0 0 1-.846-.657l-.084-.417a.75.75 0 0 1 .417-.846 8.221 8.221 0 0 0 7.01-8.232.75.75 0 0 1 1.402-.392Z" clipRule="evenodd" />
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="py-5 px-4 bg-gray-900/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
      <div className="container mx-auto flex items-center justify-center space-x-3">
        <BananaIcon className="w-8 h-8 text-banana" />
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Banana AI <span className="text-banana">Image Editor</span>
        </h1>
      </div>
      <p className="text-center text-gray-400 mt-1">Powered by Gemini Nano-Banana</p>
    </header>
  );
};

export default Header;
