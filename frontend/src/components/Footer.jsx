import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-12 border-t border-lightgrey text-center text-xs text-slategrey-light font-medium bg-beige-light">
      <p>© {new Date().getFullYear()} TaskFlow. Design & functionality optimized for productivity.</p>
    </footer>
  );
};

export default Footer;
