import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="mb-6 flex items-center justify-center lg:justify-start">
      <Logo />
      <div className="ml-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Boosted<span className="text-indigo-400">In</span>
        </h1>
        <p className="text-slate-400 mt-1">Profile Frame Generator</p>
      </div>
    </header>
  );
};

export default Header;
