import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-t from-black to-gray-950 border-t border-gray-800/50 py-8">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-8 lg:px-16 xl:px-24">
        <div className="flex justify-center items-center">
          <p className="text-gray-400 text-sm font-medium">
            &copy; {currentYear} <span className="text-teal-400 font-bold">Roshan Gawade</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;