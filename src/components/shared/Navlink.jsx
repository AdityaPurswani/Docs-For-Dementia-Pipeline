import React from 'react';

const Navlink = ({ href, children }) => (
  <a
    href={href}
    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
  >
    {children}
  </a>
);

export default Navlink;
