
import React from 'react';
import Logo from './Logo';
import Auth from './Auth';
import Footer from './Footer';
import type { User } from '../types';

interface HomePageProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, onLogin, onLogout }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Logo />
            <span className="ml-3 text-2xl font-bold text-white">
              Boosted<span className="text-indigo-400">In</span>
            </span>
          </div>
          <Auth user={user} onLogin={onLogin} onLogout={onLogout} />
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center text-center px-4">
        <div className="max-w-3xl mx-auto animate-fade-in">
          {/* Hero Section */}
          <section aria-labelledby="hero-heading">
            <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Elevate Your Linked<span className="text-indigo-400">In</span> Profile.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300">
              BoostedIn provides a suite of powerful, easy-to-use tools designed to help you stand out and make a lasting impression on LinkedIn.
            </p>
            <div className="mt-10">
              <a
                href="#/tools/frame-generator"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 inline-block"
                aria-label="Explore tools, starting with the Profile Frame Generator"
              >
                Explore Tools
              </a>
            </div>
          </section>
          
          {/* Tools Section */}
          <section className="mt-20" aria-labelledby="tools-heading">
            <h2 id="tools-heading" className="text-3xl font-bold text-white mb-8">Our Tools</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {/* Profile Frame Generator Card */}
              <div 
                className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-sm w-full text-left transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex items-center mb-4">
                  {/* Icon for the tool */}
                  <div className="p-3 bg-indigo-500/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-white">Profile Frame Generator</h3>
                </div>
                <p className="text-slate-400 mb-6">
                  Create a custom, professional frame for your profile picture in seconds. Add text like #OpenToWork and customize colors to match your brand.
                </p>
                <a
                  href="#/tools/frame-generator"
                  className="w-full text-center font-semibold bg-slate-700 hover:bg-slate-600 rounded-md py-3 px-3 transition-colors block"
                  aria-label="Launch the Profile Frame Generator"
                >
                  Launch Generator
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer route="#/" />
    </div>
  );
};

export default HomePage;
