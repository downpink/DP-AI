
import React from 'react';
import { WandIcon } from './icons/WandIcon';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <WandIcon className="h-8 w-8 text-brand-purple" />
          <h1 className="ml-3 text-2xl font-bold text-gray-800 tracking-tight">
            AI Background Remover
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
