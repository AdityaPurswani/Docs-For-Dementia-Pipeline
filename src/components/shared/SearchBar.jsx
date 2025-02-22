import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => (
  <div className="relative">
    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
      <Search className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type="text"
      className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      placeholder="Quick search..."
    />
  </div>
);

export default SearchBar;
