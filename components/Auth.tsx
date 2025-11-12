import React from 'react';
import type { User } from '../types';
import LinkedInIcon from './LinkedInIcon';

interface AuthProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Auth: React.FC<AuthProps> = ({ user, onLogin, onLogout }) => {
  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img src={user.picture} alt="User profile" className="w-8 h-8 rounded-full" />
          <span className="text-sm font-medium text-white hidden sm:inline">{user.name}</span>
        </div>
        <button
          onClick={onLogout}
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onLogin}
      className="flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
    >
      <LinkedInIcon />
      <span className="ml-2 text-sm">Sign in with LinkedIn</span>
    </button>
  );
};

export default Auth;
