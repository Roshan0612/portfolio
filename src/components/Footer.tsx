import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-slate-900 to-slate-900 border-t border-slate-800/50 py-12">
      <div className="max-w-[1920px] mx-auto px-8 sm:px-12 lg:px-16 xl:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-300">
              Built with <span className="text-teal-400 font-semibold">React</span> & <span className="text-blue-400 font-semibold">Tailwind CSS</span>
            </p>
            <p className="text-gray-500 text-xs mt-2">Deployed on <span className="text-gray-400 font-medium">Render</span></p>
          </div>
          
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-700 to-transparent md:block hidden"></div>
          
          <div className="text-center">
            <p className="text-gray-400 text-sm font-medium">
              &copy; {currentYear} <span className="text-teal-400 font-bold">Roshan Gawade</span>. All rights reserved.
            </p>
          </div>
          
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-700 to-transparent md:block hidden"></div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-xs">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 font-medium">Privacy</a>
              <span className="text-gray-600 mx-2">•</span>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 font-medium">Terms</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;