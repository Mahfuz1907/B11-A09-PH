import Link from 'next/link';
import React from 'react';

const AuthButtons = () => {
    return (
        <div className="hidden md:flex items-center space-x-3">
            <Link 
              href="/login"
              className="px-5 py-2.5 rounded-xl text-gray-700 hover:text-indigo-600 font-medium transition-colors text-sm"
            >
              Login
            </Link>
            <Link 
              href="/register"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm hover:shadow-indigo-200 hover:shadow-lg transition-all text-sm"
            >
              Register
            </Link>
          </div>
    );
};

export default AuthButtons;