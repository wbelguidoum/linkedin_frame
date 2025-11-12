import React from 'react';

interface ConsentBannerProps {
  onAccept: () => void;
}

const ConsentBanner: React.FC<ConsentBannerProps> = ({ onAccept }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-50 animate-fade-in" role="dialog" aria-modal="true" aria-label="Cookie consent">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="p-2 rounded-lg bg-slate-800 shadow-lg sm:p-3 border border-slate-700">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <p className="ml-3 font-medium text-white truncate">
                <span className="md:hidden">We use cookies to improve your experience.</span>
                <span className="hidden md:inline">This website uses cookies to save your settings and for analytics.</span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <button
                onClick={onAccept}
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
