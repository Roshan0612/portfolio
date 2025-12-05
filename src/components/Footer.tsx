import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm flex items-center">
              Made with <Heart size={16} className="mx-2 text-red-400" fill="currentColor" /> by Roshan Gawade
            </p>
          </div>
          <div className="text-gray-400 text-sm">
            <p>&copy; 2024 Roshan Gawade. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;